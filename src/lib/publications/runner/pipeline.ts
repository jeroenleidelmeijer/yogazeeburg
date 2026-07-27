// State-machine orchestrator for the Yoga Zeeburg kennisbank content pipeline.
// Scope of THIS step: init -> claim -> brief -> source_validation -> generation
// -> review_1 -> review_2 -> review_3 -> content_ready. Website placement,
// deployment and live QA belong to step 3 and are intentionally out of scope.
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
  ClaimedRun,
  Disposition,
  RunnerDeps,
  StepKey,
} from "./providers";
import { FIXED_CTA } from "./cta";

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
    errors: [],
  };
}

// Non-cryptographic deterministic hash (djb2). Runner deps supply real hashes
// for real content; this fallback is used only if the package omits one.
export function deterministicHash(input: string): string {
  let h = 5381;
  for (let i = 0; i < input.length; i++) h = ((h << 5) + h + input.charCodeAt(i)) | 0;
  return "h_" + (h >>> 0).toString(16);
}

async function withBoundedRetry<T>(
  step: StepKey,
  attempts: Record<string, number>,
  deps: RunnerDeps,
  claim: ClaimedRun,
  fn: () => Promise<T>,
): Promise<T> {
  let lastError: unknown;
  for (let i = 1; i <= MAX_RETRIES_PER_STEP; i++) {
    attempts[step] = i;
    try {
      // Heartbeat around each attempt for long-running AI calls.
      await deps.runControl.heartbeat({
        runId: claim.runId,
        articleId: claim.articleId,
        lockToken: claim.lockToken,
        extendSeconds: 120,
      });
      const value = await fn();
      return value;
    } catch (err) {
      lastError = err;
      const isPipelineErr = err instanceof PipelineError;
      const retryable = isPipelineErr ? err.retryable : true;
      if (!retryable) break;
      if (i === MAX_RETRIES_PER_STEP) break;
    }
  }
  if (lastError instanceof PipelineError) throw lastError;
  throw new PipelineError({
    category: "infrastructure_error",
    step,
    message: lastError instanceof Error ? lastError.message : String(lastError),
  });
}

function parseOrThrow<T>(
  step: StepKey,
  schema: { safeParse: (v: unknown) => { success: boolean; data?: T; error?: unknown } },
  value: unknown,
): T {
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

function assertCtaMatches(pkg: GeneratedArticlePackage): void {
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

  // Step: init — read config first.
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

  try {
    // Step: brief
    result.step = "brief";
    const rawBrief = await withBoundedRetry("brief", result.attempts, deps, claim, () =>
      deps.ai.generateBrief({ claim, context: {} }),
    );
    const brief = parseOrThrow<ArticleBrief>("brief", ArticleBriefSchema, rawBrief);
    result.brief = brief;
    await deps.runControl.advance({
      runId: claim.runId,
      articleId: claim.articleId,
      lockToken: claim.lockToken,
      fromStatus: "locked",
      toStatus: "drafting",
      stepKey: "brief",
      evidence: { schemaVersion: brief.schemaVersion, promptVersion: deps.promptVersion },
    });

    // Step: source_validation
    result.step = "source_validation";
    const rawSources = await withBoundedRetry(
      "source_validation",
      result.attempts,
      deps,
      claim,
      () => deps.ai.validateSources({ brief }),
    );
    const sources = parseOrThrow<ValidatedSourcePack>(
      "source_validation",
      ValidatedSourcePackSchema,
      rawSources,
    );
    result.sources = sources;
    if (sources.blocked) {
      throw new PipelineError({
        category: "source_conflict",
        step: "source_validation",
        message: sources.blockedReason ?? "sources blocked",
        retryable: false,
      });
    }

    // Step: generation
    result.step = "generation";
    let pkg = await generateAndValidatePackage(brief, sources, deps, claim, result);

    // Step: review 1..3 in fixed order. A repair triggers re-check of prior gates.
    for (let i = 0; i < REVIEW_ORDER.length; i++) {
      const round = REVIEW_ORDER[i];
      const stepKey = (`review_${i + 1}`) as StepKey;
      result.step = stepKey;

      const review = await runReviewRound(round, brief, sources, pkg, result.reviews, deps, claim, stepKey);
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
        // Apply repair, re-validate through schema + CTA, then re-run prior review rounds.
        pkg = parseOrThrow<GeneratedArticlePackage>(
          stepKey,
          GeneratedArticlePackageSchema,
          review.repairedPackage,
        );
        assertCtaMatches(pkg);
        for (let j = 0; j < i; j++) {
          const priorRound = REVIEW_ORDER[j];
          const priorStep = (`review_${j + 1}`) as StepKey;
          const recheck = await runReviewRound(
            priorRound,
            brief,
            sources,
            pkg,
            result.reviews.slice(0, j),
            deps,
            claim,
            priorStep,
          );
          // Replace the prior review record with the recheck outcome.
          result.reviews[j] = recheck;
          if (!recheck.pass || recheck.blocked) {
            throw new PipelineError({
              category: "validation_error",
              step: priorStep,
              message: `regression after repair at ${priorRound}`,
              retryable: false,
            });
          }
        }
      }
      result.pkg = pkg;
    }

    // Step: content_ready. Terminal for THIS step of the automation.
    result.step = "content_ready";
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
    process.stderr.write(`\n[DBG] category=${pe.category} step=${pe.step} msg=${pe.message}\n`);
    result.errors.push({ step: pe.step as StepKey, category: pe.category, message: pe.message });
    result.disposition = pe.category === "content_safety_error" ? "blocked" : "failed";
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
    return result;
  }
}

async function generateAndValidatePackage(
  brief: ArticleBrief,
  sources: ValidatedSourcePack,
  deps: RunnerDeps,
  claim: ClaimedRun,
  result: PipelineResult,
): Promise<GeneratedArticlePackage> {
  const raw = await withBoundedRetry("generation", result.attempts, deps, claim, () =>
    deps.ai.generateArticle({ brief, sources }),
  );
  const pkg = parseOrThrow<GeneratedArticlePackage>("generation", GeneratedArticlePackageSchema, raw);
  assertCtaMatches(pkg);
  return pkg;
}

async function runReviewRound(
  round: (typeof REVIEW_ORDER)[number],
  brief: ArticleBrief,
  sources: ValidatedSourcePack,
  pkg: GeneratedArticlePackage,
  priorReviews: ReviewOutput[],
  deps: RunnerDeps,
  claim: ClaimedRun,
  stepKey: StepKey,
): Promise<ReviewOutput> {
  const raw = await withBoundedRetry(stepKey, { [stepKey]: 0 } as Record<string, number>, deps, claim, () =>
    deps.ai.reviewRound({ round, brief, sources, pkg, priorReviews }),
  );
  const review = parseOrThrow<ReviewOutput>(stepKey, ReviewOutputSchema, raw);
  if (review.round !== round) {
    throw new PipelineError({
      category: "validation_error",
      step: stepKey,
      message: `review round mismatch: expected ${round}, got ${review.round}`,
    });
  }
  return review;
}
