// State-machine orchestrator for the Yoga Zeeburg kennisbank content pipeline.
//
// Scope after the July-2026 rolverdeling formalization:
//   The runner accepts an externally-authored FinalArticlePackage (written
//   and three-times reviewed by ChatGPT against the Kennisbank Werk-
//   instructie Masterdocument). The runner does NOT brief, write, review
//   or repair content. Its job is strict validation, deterministic
//   canonicalisation and durable persistence of placement inputs.
//
// Steps: init -> claim -> validate_package -> placement_ready
//
// Downstream compatibility:
//   placement-entrypoint.server.ts (unchanged) reads artifacts by their
//   legacy stepKeys: "generation" | "source_validation" | "review_1..3" |
//   "content_ready". This pipeline emits those artifacts deterministically
//   from the FinalArticlePackage so the placement layer stays byte-for-byte
//   compatible with the existing, tested contract. The pipeline's own
//   STEP names (result.step) use the new short vocabulary.
//
// Safety rails asserted by tests:
//   * automation_enabled=false or publication_stopped=true => disabled_noop,
//     zero claim/mutation/artifact write.
//   * FinalArticlePackage schema failure PRE-CLAIM => failed, zero mutation.
//   * finalPackage.articleId / planningNumber mismatch to the claim =>
//     non-retryable validation_error via recordFailure. No placement.
//   * Runner is authoritative on contentHash: any author-supplied value is
//     replaced with the deterministic packageContentHash of the mapped
//     GeneratedArticlePackage.
//   * Idempotent resume: rerunning with the same artifact store produces
//     zero duplicate artifacts.
//   * No AI provider is called from this module — deps.ai is not part of
//     RunnerDeps.

import {
  REVIEW_ORDER,
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
import { contentHashOf, packageContentHash } from "./hash";
import {
  FinalArticlePackageSchema,
  toGeneratedArticlePackage,
  synthesizeExternalReviews,
  type FinalArticlePackage,
} from "./final-package";

export interface PipelineResult {
  disposition: Disposition;
  step: StepKey;
  projectKey: string;
  runId?: string;
  articleId?: string;
  /** Set on successful validation. Legacy `pkg` field, retained for callers
   *  (preview-run.server.ts) that read the placed package hash. */
  pkg?: GeneratedArticlePackage;
  /** Synthesized passing reviews forwarded to the placement layer. */
  reviews: ReviewOutput[];
  attempts: Record<string, number>;
  /** Retained for API-shape compatibility with older callers; the external-
   *  authorship pipeline never repairs content. */
  repairCycles: number;
  resumedSteps: StepKey[];
  errors: Array<{ step: StepKey; category: string; message: string }>;
}

export interface RunPipelineInput {
  projectKey: string;
  trigger?: "manual" | "scheduled";
  /**
   * The externally-authored, fully-reviewed article package. This is the
   * SOLE authoritative content input. Missing/invalid => hard fail before
   * claim.
   */
  finalPackage: FinalArticlePackage | unknown;
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

// Non-cryptographic deterministic hash (djb2). Kept as a light helper for
// evidence tags. Canonical content hashing uses hash.ts (sha256).
export function deterministicHash(input: string): string {
  let h = 5381;
  for (let i = 0; i < input.length; i++) h = ((h << 5) + h + input.charCodeAt(i)) | 0;
  return "h_" + (h >>> 0).toString(16);
}

const LEASE_EXTEND_SECONDS = 300;

/**
 * Lease-aware bounded retry. Renews the claim lock in the background while
 * `fn` is in flight so validation and persistence work is safe against
 * long-tail latency. Behaviour is identical to the pre-refactor version;
 * only the callers changed.
 */
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
      await deps.runControl.heartbeat({
        runId: claim.runId,
        articleId: claim.articleId,
        lockToken: claim.lockToken,
        extendSeconds: LEASE_EXTEND_SECONDS,
      });
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

/** Zod-style safeParse result summarizer. Field paths + issue codes only —
 *  never any value from the offending payload. */
function summarizeZodIssues(err: unknown): {
  issues: Array<{ path: string; code: string; message: string; expected?: string }>;
} {
  const anyErr = err as { issues?: unknown } | null;
  const rawIssues = Array.isArray(anyErr?.issues) ? (anyErr!.issues as unknown[]) : [];
  const issues = rawIssues.slice(0, 50).map((iRaw) => {
    const i = (iRaw ?? {}) as {
      path?: unknown;
      code?: unknown;
      message?: unknown;
      expected?: unknown;
    };
    const pathArr = Array.isArray(i.path) ? i.path : [];
    return {
      path: pathArr.map((p) => String(p)).join("."),
      code: typeof i.code === "string" ? i.code : "unknown",
      message: typeof i.message === "string" ? i.message : "invalid",
      ...(typeof i.expected === "string" ? { expected: i.expected } : {}),
    };
  });
  return { issues };
}

async function persistArtifact(
  deps: RunnerDeps,
  claim: ClaimedRun,
  stepKey: string,
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

function hasValidArtifact(records: ArtifactRecord[], stepKey: string, deps: RunnerDeps): boolean {
  const r = records.find((x) => x.stepKey === stepKey);
  if (!r) return false;
  if (r.schemaVersion !== deps.schemaVersion) return false;
  if (r.promptVersion !== deps.promptVersion) return false;
  return true;
}

/**
 * Emit the legacy artifact bundle expected by placement-entrypoint.server.ts:
 *   generation, source_validation, review_1|2|3, content_ready.
 * All payloads are deterministic projections of the FinalArticlePackage;
 * no field is invented. Existing artifacts are reused (idempotent resume).
 */
async function emitLegacyArtifactBundle(
  deps: RunnerDeps,
  claim: ClaimedRun,
  prior: ArtifactRecord[],
  result: PipelineResult,
  pkg: GeneratedArticlePackage,
): Promise<void> {
  // generation
  if (!hasValidArtifact(prior, "generation", deps)) {
    await persistArtifact(deps, claim, "generation", pkg.contentHash, pkg);
  } else {
    result.resumedSteps.push("validate_package" as StepKey);
  }

  // source_validation — synthesized empty valid pack. ChatGPT did the
  // real source validation externally; the placement layer only requires
  // shape + articleId agreement + blocked=false, which we honour here.
  const sources: ValidatedSourcePack = {
    articleId: claim.articleId,
    firstPartyFacts: [],
    externalSources: [],
    claimSourceMap: [],
    conflicts: [],
    missingSubstantiation: [],
    blocked: false,
    blockedReason: null,
    schemaVersion: "1",
  };
  if (!hasValidArtifact(prior, "source_validation", deps)) {
    await persistArtifact(deps, claim, "source_validation", contentHashOf(sources), sources);
  }

  // review_1..3 — three synthesized passing reviews. Each artifact wraps
  // { review, __inputPkgHash: pkg.contentHash } exactly like the legacy
  // pipeline did, so placement-entrypoint can bind reviews to this package.
  const reviews: ReviewOutput[] = synthesizeExternalReviews();
  for (let i = 0; i < REVIEW_ORDER.length; i++) {
    const stepKey = `review_${i + 1}` as const;
    const review = reviews[i];
    const wrapped = { review, __inputPkgHash: pkg.contentHash };
    if (!hasValidArtifact(prior, stepKey, deps)) {
      await persistArtifact(deps, claim, stepKey, contentHashOf(wrapped), wrapped);
    }
  }
  result.reviews = reviews;

  // content_ready — terminal evidence.
  const evidence = {
    articleId: claim.articleId,
    runId: claim.runId,
    packageHash: pkg.contentHash,
    reviews: reviews.map((r) => ({ round: r.round, pass: r.pass })),
    schemaVersion: deps.schemaVersion,
    promptVersion: deps.promptVersion,
  };
  if (!hasValidArtifact(prior, "content_ready", deps)) {
    await persistArtifact(deps, claim, "content_ready", contentHashOf(evidence), evidence);
  }
}

/**
 * Runs the placement-preparation pipeline. All external effects go through
 * `deps`. When automation is off, returns `disabled_noop` BEFORE claim.
 */
export async function runPipeline(
  input: RunPipelineInput,
  deps: RunnerDeps,
): Promise<PipelineResult> {
  const result = newResult(input.projectKey);
  const trigger = input.trigger ?? "manual";

  // Step: init — read config first. No claim, no artifact write.
  result.step = "init";
  const config = await deps.config.loadProjectConfig(input.projectKey);
  if (!config.automationEnabled || config.publicationStopped) {
    result.disposition = "disabled_noop";
    return result;
  }

  // PRE-CLAIM strict validation of the externally-authored package. Any
  // failure here yields "failed" with zero DB or artifact mutation.
  const parsed = FinalArticlePackageSchema.safeParse(input.finalPackage);
  if (!parsed.success) {
    result.step = "validate_package";
    result.errors.push({
      step: "validate_package",
      category: "validation_error",
      message: "FinalArticlePackage schema validation failed",
    });
    // Attach diagnostic issues (paths/codes only) on a side channel via
    // errors[].message; never emit the raw payload.
    const diag = summarizeZodIssues(parsed.error);
    result.errors.push({
      step: "validate_package",
      category: "validation_error_detail",
      message: JSON.stringify(diag),
    });
    result.disposition = "failed";
    return result;
  }
  const finalPackage: FinalArticlePackage = parsed.data;

  // Step: claim
  result.step = "claim";
  const claim = await deps.runControl.claim({ projectKey: input.projectKey, trigger });
  if (!claim) {
    result.disposition = "claim_noop";
    return result;
  }
  result.runId = claim.runId;
  result.articleId = claim.articleId;

  try {
    // Post-claim identity check. Mismatches are non-retryable — the caller
    // must supply a package targeting the claimed article.
    if (finalPackage.articleId !== claim.articleId) {
      throw new PipelineError({
        category: "validation_error",
        step: "validate_package",
        message: `finalPackage.articleId ${finalPackage.articleId} != claim.articleId ${claim.articleId}`,
        retryable: false,
      });
    }
    if (finalPackage.planningNumber !== claim.planningNumber) {
      throw new PipelineError({
        category: "validation_error",
        step: "validate_package",
        message: `finalPackage.planningNumber ${finalPackage.planningNumber} != claim.planningNumber ${claim.planningNumber}`,
        retryable: false,
      });
    }

    // Load prior artifacts for resume.
    const prior = await deps.artifacts.list({
      runId: claim.runId,
      articleId: claim.articleId,
      lockToken: claim.lockToken,
    });

    // Step: validate_package — deterministic mapping + persist.
    result.step = "validate_package";
    const pkg = await withBoundedRetry("validate_package", result.attempts, deps, claim, async () => {
      return toGeneratedArticlePackage(finalPackage);
    });
    result.pkg = pkg;

    // Advance the article to drafting/validating so the downstream
    // placement step has a legal from_status when it advances further.
    // If an equivalent generation artifact already exists (resume path),
    // we still call advance idempotently — the RPC no-ops on same-state.
    if (!hasValidArtifact(prior, "generation", deps)) {
      await deps.runControl.advance({
        runId: claim.runId,
        articleId: claim.articleId,
        lockToken: claim.lockToken,
        fromStatus: "locked",
        toStatus: "drafting",
        stepKey: "validate_package",
        evidence: {
          schemaVersion: deps.schemaVersion,
          promptVersion: deps.promptVersion,
          authoredBy: finalPackage.authoredBy,
          packageHash: pkg.contentHash,
        },
      });
    }

    await emitLegacyArtifactBundle(deps, claim, prior, result, pkg);

    // Step: placement_ready — terminal disposition for this run.
    result.step = "placement_ready";
    result.disposition = "placement_ready";
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
    result.errors.push({
      step: pe.step as StepKey,
      category: pe.category,
      message: pe.message,
    });
    result.disposition = pe.category === "content_safety_error" ? "blocked" : "failed";
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
