// State-machine orchestrator for the Yoga Zeeburg kennisbank content pipeline.
// Scope of THIS step: init -> claim -> brief -> source_validation -> generation
// -> review_1 -> review_2 -> review_3 -> content_ready. Website placement,
// deployment and live QA belong to step 3 and are intentionally out of scope.
//
// This orchestrator is fully deterministic and resumable: every produced
// artifact is written idempotently to the injected ArtifactStore keyed by
// (runId, stepKey), and every step first consults the store for a matching
// prior artifact (schemaVersion + promptVersion) before making an AI call.
import {
  ArticleBriefSchema,
  GeneratedArticlePackageSchema,
  REVIEW_ORDER,
  ReviewOutputSchema,
  ValidatedSourcePackSchema,
  type ArticleBrief,
  type GeneratedArticlePackage,
  type ReviewOutput,
  type ValidatedSourcePack,
} from "./schemas";
import { PipelineError, MAX_RETRIES_PER_STEP } from "./errors";
import type {
  ArtifactRecord,
  ClaimedRun,
  Disposition,
  RunnerDeps,
  StepKey,
} from "./providers";
import { FIXED_CTA } from "./cta";
import { contentHashOf, packageContentHash } from "./hash";
import { normalizeBriefCandidate } from "./normalize";

export interface PipelineResult {
  disposition: Disposition;
  step: StepKey;
  projectKey: string;
  runId?: string;
  articleId?: string;
  brief?: ArticleBrief;
  sources?: ValidatedSourcePack;
  pkg?: GeneratedArticlePackage;
  reviews: ReviewOutput[];
  attempts: Record<string, number>;
  repairCycles: number;
  resumedSteps: StepKey[];
  errors: Array<{ step: StepKey; category: string; message: string }>;
}

export interface RunPipelineInput {
  projectKey: string;
  trigger?: "manual" | "scheduled";
}

function newResult(projectKey: string): PipelineResult {
  return {
    disposition: "failed",
    step: "init",
    projectKey,
    reviews: [],
    attempts: {},
    repairCycles: 0,
    resumedSteps: [],
    errors: [],
  };
}

// Non-cryptographic deterministic hash (djb2). Retained as a light helper for
// evidence tags. Real content hashing uses `hash.ts` (sha256 canonical JSON).
export function deterministicHash(input: string): string {
  let h = 5381;
  for (let i = 0; i < input.length; i++) h = ((h << 5) + h + input.charCodeAt(i)) | 0;
  return "h_" + (h >>> 0).toString(16);
}

// Lease/heartbeat renewal for long-running AI steps.
//
// The DB claim RPC issues a bounded lock (see adapters.server.ts). A single
// heartbeat before an AI call is not enough: individual reviewRound / brief
// / generation calls routinely exceed the TTL. We therefore:
//   1) heartbeat once up-front to extend the lease before starting fn(),
//   2) run a background renewal timer every `heartbeatIntervalMs` while fn()
//      is in flight — each renewal extends the lock by LEASE_EXTEND_SECONDS,
//   3) tear the timer down in `finally`, so nothing renews after fn resolves,
//   4) if any renewal throws (lock expired / stolen / RPC error), we capture
//      the error and treat the failure as non-retryable: the run has lost
//      ownership and cannot safely continue.
//
// Ownership is enforced server-side by heartbeat_publication_run, which
// runs _pub_lock_run — only the owner of the exact (runId, articleId,
// lockToken) triple can extend. A caller with a stale token gets a hard
// RPC error, which we surface as a non-retryable pipeline failure so the
// top-level catch runs recordFailure once (with the still-current token
// when possible) and never leaves active_run_id in place.
const LEASE_EXTEND_SECONDS = 300;

async function withBoundedRetry<T>(
  step: StepKey,
  attempts: Record<string, number>,
  deps: RunnerDeps,
  claim: ClaimedRun,
  fn: () => Promise<T>,
): Promise<T> {
  let lastError: unknown;
  const prior = attempts[step] ?? 0;
  const intervalMs = deps.heartbeatIntervalMs ?? 60_000;
  for (let i = 1; i <= MAX_RETRIES_PER_STEP; i++) {
    attempts[step] = prior + i;
    let leaseErr: unknown = null;
    let timer: ReturnType<typeof setInterval> | null = null;
    try {
      // Up-front lease extension. If this fails we never start fn().
      await deps.runControl.heartbeat({
        runId: claim.runId,
        articleId: claim.articleId,
        lockToken: claim.lockToken,
        extendSeconds: LEASE_EXTEND_SECONDS,
      });
      // Background renewal. Only the current owner can renew; the DB RPC
      // rejects any other token. On failure we stop the timer and surface
      // the error after fn resolves so we never race with the AI call.
      timer = setInterval(() => {
        void deps.runControl
          .heartbeat({
            runId: claim.runId,
            articleId: claim.articleId,
            lockToken: claim.lockToken,
            extendSeconds: LEASE_EXTEND_SECONDS,
          })
          .catch((e: unknown) => {
            leaseErr = e;
            if (timer) {
              clearInterval(timer);
              timer = null;
            }
          });
      }, intervalMs);
      const out = await fn();
      if (leaseErr) throw leaseErr;
      return out;
    } catch (err) {
      const fromLease = leaseErr != null;
      lastError = fromLease ? leaseErr : err;
      const isPipelineErr = lastError instanceof PipelineError;
      // Lock loss during renewal is never retryable: we have no valid
      // lock to run another attempt with. Let the top-level catch finalize.
      const retryable = fromLease
        ? false
        : isPipelineErr
        ? (lastError as PipelineError).retryable
        : true;
      if (!retryable) break;
      if (i === MAX_RETRIES_PER_STEP) break;
    } finally {
      if (timer) clearInterval(timer);
    }
  }
  if (lastError instanceof PipelineError) throw lastError;
  throw new PipelineError({
    category: "infrastructure_error",
    step,
    message: lastError instanceof Error ? lastError.message : String(lastError),
    retryable: false,
  });
}

interface ParsingSchema<T> {
  safeParse(v: unknown): { success: boolean; data?: T; error?: unknown };
}

function parseOrThrow<T>(step: StepKey, schema: ParsingSchema<T>, value: unknown): T {
  const parsed = schema.safeParse(value);
  if (!parsed.success) {
    throw new PipelineError({
      category: "validation_error",
      step,
      message: `runtime validation failed at ${step}`,
      details: parsed.error,
      retryable: true,
    });
  }
  return parsed.data as T;
}

function assertPackageInvariants(
  claim: ClaimedRun,
  brief: ArticleBrief,
  pkg: GeneratedArticlePackage,
): void {
  if (pkg.articleId !== claim.articleId) {
    throw new PipelineError({
      category: "validation_error",
      step: "generation",
      message: `package.articleId ${pkg.articleId} != claim.articleId ${claim.articleId}`,
      retryable: false,
    });
  }
  const cta = pkg.cta;
  if (
    cta.heading !== FIXED_CTA.heading ||
    cta.body !== FIXED_CTA.body ||
    cta.button !== FIXED_CTA.button ||
    cta.subtext !== FIXED_CTA.subtext
  ) {
    throw new PipelineError({
      category: "content_safety_error",
      step: "generation",
      message: "fixed CTA copy mismatch",
    });
  }
  if (pkg.commercialLinkCount > 1) {
    throw new PipelineError({
      category: "content_safety_error",
      step: "generation",
      message: "more than one commercial in-text link",
    });
  }
  if (pkg.hasAbsoluteMedicalClaim) {
    throw new PipelineError({
      category: "content_safety_error",
      step: "generation",
      message: "absolute medical claim detected",
    });
  }
  // Internal links must resolve to validated targets or previously published
  // articles known to the brief. This closes the door on hallucinated links.
  const allowedSlugs = new Set(brief.relatedPublishedArticles.map((a) => a.slug));
  const allowedUrls = new Set(brief.validatedLinkTargets.map((t) => t.url));
  for (const link of pkg.internalLinks) {
    if (!allowedSlugs.has(link.slug)) {
      throw new PipelineError({
        category: "content_safety_error",
        step: "generation",
        message: `internal link '${link.slug}' not in brief.relatedPublishedArticles`,
      });
    }
  }
  // Any absolute URL surfaced by the package (via markdown) that points to
  // yogazeeburg.com must be one of the validated link targets. We only assert
  // presence of at least one validated target when the package contains a
  // yogazeeburg.com URL.
  const yzUrlRegex = /https?:\/\/(?:www\.)?yogazeeburg\.com[^\s)]*/gi;
  const urls = pkg.bodyMarkdown.match(yzUrlRegex) ?? [];
  for (const u of urls) {
    if (!allowedUrls.has(u)) {
      throw new PipelineError({
        category: "content_safety_error",
        step: "generation",
        message: `unvalidated yogazeeburg.com link in body: ${u}`,
      });
    }
  }
}

async function persistArtifact(
  deps: RunnerDeps,
  claim: ClaimedRun,
  stepKey: StepKey,
  contentHash: string,
  payload: unknown,
): Promise<void> {
  await deps.artifacts.upsert({
    runId: claim.runId,
    articleId: claim.articleId,
    lockToken: claim.lockToken,
    stepKey,
    schemaVersion: deps.schemaVersion,
    promptVersion: deps.promptVersion,
    contentHash,
    payload,
  });
}

function findValidArtifact(
  records: ArtifactRecord[],
  stepKey: StepKey,
  deps: RunnerDeps,
): ArtifactRecord | undefined {
  const r = records.find((x) => x.stepKey === stepKey);
  if (!r) return undefined;
  if (r.schemaVersion !== deps.schemaVersion) return undefined;
  if (r.promptVersion !== deps.promptVersion) return undefined;
  return r;
}

/**
 * Runs the content-generation pipeline. All external effects (Supabase, AI)
 * go through `deps`. When automation is off, returns `disabled_noop`
 * BEFORE any claim or AI call is issued.
 */
export async function runPipeline(
  input: RunPipelineInput,
  deps: RunnerDeps,
): Promise<PipelineResult> {
  const result = newResult(input.projectKey);
  const trigger = input.trigger ?? "manual";
  const maxRepairCycles = deps.maxRepairCycles ?? 3;

  // Step: init — read config first. No claim, no AI, no artifact write.
  result.step = "init";
  const config = await deps.config.loadProjectConfig(input.projectKey);
  if (!config.automationEnabled || config.publicationStopped) {
    result.disposition = "disabled_noop";
    return result;
  }

  // Step: claim
  result.step = "claim";
  const claim = await deps.runControl.claim({ projectKey: input.projectKey, trigger });
  if (!claim) {
    result.disposition = "claim_noop";
    return result;
  }
  result.runId = claim.runId;
  result.articleId = claim.articleId;

  // Load any prior artifacts for resume.
  const prior = await deps.artifacts.list({
    runId: claim.runId,
    articleId: claim.articleId,
    lockToken: claim.lockToken,
  });

  try {
    // Step: brief
    result.step = "brief";
    const brief = await resumeOrProduce<ArticleBrief>({
      step: "brief",
      prior,
      deps,
      claim,
      result,
      schema: ArticleBriefSchema,
      produce: () => deps.ai.generateBrief({ claim, context: {} }),
      hash: (v) => contentHashOf(v),
      validate: (v) => {
        if (v.articleId !== claim.articleId) {
          throw new PipelineError({
            category: "validation_error",
            step: "brief",
            message: `brief.articleId ${v.articleId} != claim.articleId ${claim.articleId}`,
            retryable: false,
          });
        }
      },
      onFresh: async (v) => {
        await deps.runControl.advance({
          runId: claim.runId,
          articleId: claim.articleId,
          lockToken: claim.lockToken,
          fromStatus: "locked",
          toStatus: "drafting",
          stepKey: "brief",
          evidence: { schemaVersion: v.schemaVersion, promptVersion: deps.promptVersion },
        });
      },
    });
    result.brief = brief;

    // Step: source_validation
    result.step = "source_validation";
    const sources = await resumeOrProduce<ValidatedSourcePack>({
      step: "source_validation",
      prior,
      deps,
      claim,
      result,
      schema: ValidatedSourcePackSchema,
      produce: () => deps.ai.validateSources({ brief }),
      hash: (v) => contentHashOf(v),
      validate: (v) => {
        if (v.articleId !== claim.articleId) {
          throw new PipelineError({
            category: "validation_error",
            step: "source_validation",
            message: `sources.articleId ${v.articleId} != claim.articleId ${claim.articleId}`,
            retryable: false,
          });
        }
      },
    });
    if (sources.blocked) {
      throw new PipelineError({
        category: "source_conflict",
        step: "source_validation",
        message: sources.blockedReason ?? "sources blocked",
        retryable: false,
      });
    }
    result.sources = sources;

    // Step: generation
    result.step = "generation";
    let pkg = await resumeOrProduce<GeneratedArticlePackage>({
      step: "generation",
      prior,
      deps,
      claim,
      result,
      schema: GeneratedArticlePackageSchema,
      produce: () => deps.ai.generateArticle({ brief, sources }),
      hash: (v) => packageContentHash(v as unknown as Record<string, unknown>),
      validate: (v) => assertPackageInvariants(claim, brief, v),
    });
    // Runner is authoritative on contentHash; AI cannot manipulate it.
    pkg = { ...pkg, contentHash: packageContentHash(pkg as unknown as Record<string, unknown>) };

    // Reviews — with repair-triggered restart-from-round-1, bounded by
    // maxRepairCycles. Attempt counters accumulate across restarts so runaway
    // cycles surface as retry-budget exhaustion.
    let roundIdx = 0;
    result.reviews = [];
    while (roundIdx < REVIEW_ORDER.length) {
      const round = REVIEW_ORDER[roundIdx];
      const stepKey = (`review_${roundIdx + 1}`) as StepKey;
      result.step = stepKey;

      // Reviews are always re-run after a repair. We only resume the review
      // that has an artifact whose input contentHash matches the current
      // package; otherwise we run fresh. Encode the input package's hash into
      // the resume key by including it in the artifact contentHash.
      const currentPkgHash = pkg.contentHash;
      const priorReview = prior.find(
        (r) =>
          r.stepKey === stepKey &&
          r.schemaVersion === deps.schemaVersion &&
          r.promptVersion === deps.promptVersion &&
          (r.payload as Record<string, unknown> | null)?.__inputPkgHash === currentPkgHash,
      );

      let review: ReviewOutput;
      if (priorReview) {
        const inner = (priorReview.payload as Record<string, unknown>).review;
        review = parseOrThrow<ReviewOutput>(stepKey, ReviewOutputSchema, inner);
        result.resumedSteps.push(stepKey);
      } else {
        review = await withBoundedRetry(stepKey, result.attempts, deps, claim, async () => {
          const raw = await deps.ai.reviewRound({
            round,
            brief,
            sources,
            pkg,
            priorReviews: result.reviews.slice(),
          });
          const parsed = parseOrThrow<ReviewOutput>(stepKey, ReviewOutputSchema, raw);
          if (parsed.round !== round) {
            throw new PipelineError({
              category: "validation_error",
              step: stepKey,
              message: `review round mismatch: expected ${round}, got ${parsed.round}`,
            });
          }
          return parsed;
        });
        await persistArtifact(deps, claim, stepKey, contentHashOf(review), {
          review,
          __inputPkgHash: currentPkgHash,
        });
      }
      result.reviews.push(review);

      if (review.blocked) {
        throw new PipelineError({
          category: "content_safety_error",
          step: stepKey,
          message: `review ${round} blocked`,
          retryable: false,
        });
      }
      if (!review.pass) {
        if (!review.repairedPackage) {
          throw new PipelineError({
            category: "validation_error",
            step: stepKey,
            message: `review ${round} failed without repair`,
            retryable: false,
          });
        }
        if (result.repairCycles >= maxRepairCycles) {
          throw new PipelineError({
            category: "validation_error",
            step: stepKey,
            message: `repair cycle limit (${maxRepairCycles}) exhausted`,
            retryable: false,
          });
        }
        // Apply repair — full schema + invariant re-validation, then restart
        // review sequence from round 1 with the repaired package.
        const repaired = parseOrThrow<GeneratedArticlePackage>(
          stepKey,
          GeneratedArticlePackageSchema,
          review.repairedPackage,
        );
        assertPackageInvariants(claim, brief, repaired);
        pkg = {
          ...repaired,
          contentHash: packageContentHash(repaired as unknown as Record<string, unknown>),
        };
        await persistArtifact(deps, claim, "generation", pkg.contentHash, pkg);
        result.repairCycles += 1;
        result.reviews = [];
        roundIdx = 0;
        continue;
      }
      roundIdx += 1;
    }
    result.pkg = pkg;

    // Step: content_ready. Terminal for THIS step of the automation. We
    // persist a durable evidence artifact but do NOT change the article's
    // database status — that belongs to step 3 (preview / publish).
    result.step = "content_ready";
    const evidence = {
      articleId: claim.articleId,
      runId: claim.runId,
      packageHash: pkg.contentHash,
      reviews: result.reviews.map((r) => ({ round: r.round, pass: r.pass })),
      schemaVersion: deps.schemaVersion,
      promptVersion: deps.promptVersion,
    };
    await persistArtifact(
      deps,
      claim,
      "content_ready",
      contentHashOf(evidence),
      evidence,
    );
    result.disposition = "content_ready";
    return result;
  } catch (err) {
    const pe =
      err instanceof PipelineError
        ? err
        : new PipelineError({
            category: "infrastructure_error",
            step: result.step,
            message: err instanceof Error ? err.message : String(err),
          });
    result.errors.push({ step: pe.step as StepKey, category: pe.category, message: pe.message });
    result.disposition = pe.category === "content_safety_error" ? "blocked" : "failed";
    // Finalization must never throw out of runPipeline. If recordFailure
    // itself fails (e.g. lock genuinely expired before this point) we
    // surface a `finalize_error` on the result and let the caller run a
    // service-side safety-net release. That guarantees article rows never
    // stay in status=locked with a non-null active_run_id after this fn
    // returns.
    try {
      await deps.runControl.recordFailure({
        runId: claim.runId,
        articleId: claim.articleId,
        lockToken: claim.lockToken,
        stepKey: pe.step,
        category: pe.category,
        summary: pe.message,
        retryable: pe.retryable,
        details: { details: pe.details ?? null },
      });
    } catch (recErr) {
      result.errors.push({
        step: pe.step as StepKey,
        category: "finalize_error",
        message: `recordFailure failed: ${
          recErr instanceof Error ? recErr.message : String(recErr)
        }`,
      });
    }
    return result;
  }
}

interface ResumeOrProduceArgs<T> {
  step: StepKey;
  prior: ArtifactRecord[];
  deps: RunnerDeps;
  claim: ClaimedRun;
  result: PipelineResult;
  schema: ParsingSchema<T>;
  produce: () => Promise<unknown>;
  hash: (parsed: T) => string;
  validate?: (parsed: T) => void;
  onFresh?: (parsed: T) => Promise<void>;
}

/**
 * Reuse a prior artifact when its schema/prompt versions match, otherwise
 * run the AI call bounded by retries and persist the resulting artifact.
 */
async function resumeOrProduce<T>(args: ResumeOrProduceArgs<T>): Promise<T> {
  const { step, prior, deps, claim, result, schema, produce, hash, validate, onFresh } = args;
  const existing = findValidArtifact(prior, step, deps);
  if (existing) {
    const parsed = parseOrThrow<T>(step, schema, existing.payload);
    if (validate) validate(parsed);
    result.resumedSteps.push(step);
    return parsed;
  }
  const parsed = await withBoundedRetry(step, result.attempts, deps, claim, async () => {
    const raw = await produce();
    const p = parseOrThrow<T>(step, schema, raw);
    if (validate) validate(p);
    return p;
  });
  await persistArtifact(deps, claim, step, hash(parsed), parsed);
  if (onFresh) await onFresh(parsed);
  return parsed;
}
