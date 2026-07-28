// Server-only preview-run orchestrator for a SINGLE article of the
// `yoga-zeeburg-kennisbank` publication project. Generic over
// planning_number and slug; one invocation processes exactly one article.
//
// Composes existing building blocks — nothing new is added to
// pipeline, placement or DB surfaces:
//   - runPipeline (src/lib/publications/runner/pipeline.ts)
//   - placementFromArtifacts (placement-entrypoint.server.ts)
//   - existing Supabase RPCs (claim_next_publication_run, heartbeat,
//     advance_publication_run, complete_publication_failure,
//     admin_release_stale_lock, list_publication_run_artifacts,
//     upsert_publication_run_artifact)
//
// SAFETY INVARIANTS (also asserted by tests):
//   * automation_enabled in the DB is NEVER written to. This module reads
//     the row via the base ConfigProvider and then reports
//     automationEnabled=true only for the current invocation via an
//     in-memory wrapper. Nothing is persisted.
//   * publication_stopped is respected: when true, we refuse with "stopped".
//   * Idempotent: if the target article currently holds a non-expired lock
//     or has an active_run_id, we refuse.
//   * On failure the pipeline itself calls complete_publication_failure,
//     which clears lock_token/lock_expires_at/locked_by/active_run_id and
//     marks the run failed|blocked|retry_pending. A failed run does NOT
//     silently skip the article — the same planning_number remains next in
//     line for a retry invocation.
//   * planning_number > 180 → hard stop (wrong_target).
//   * Placement is always preview; public registry/sitemap read only
//     'published' rows, so the article cannot leak onto any public surface.

import { runPipeline, type PipelineResult } from "./runner/pipeline";
import { placementFromArtifacts } from "./placement-entrypoint.server";
import {
  createDefaultRunnerDeps,
  createSupabaseArtifactStore,
  createSupabaseConfigProvider,
  createSupabaseRunControl,
} from "./runner/adapters.server";
import {
  createSupabasePlacementStore,
  derivePreviewToken,
  type LegacyArticleIndex,
  type PlacementStore,
} from "./placement.server";
import type { ArtifactStore, ConfigProvider, RunnerDeps } from "./runner/providers";
import { MAX_PLANNING_NUMBER } from "./scheduler/cadence";

export const YOGA_PROJECT_KEY = "yoga-zeeburg-kennisbank" as const;

export type PreviewRunOutcome =
  | { status: "wrong_target"; message: string }
  | { status: "stopped"; message: string }
  | {
      status: "already_running";
      articleId: string;
      activeRunId: string;
      lockExpiresAt: string | null;
    }
  | { status: "pipeline_disabled_noop" }
  | { status: "pipeline_claim_noop" }
  | {
      status: "pipeline_failed" | "pipeline_blocked";
      runId?: string;
      articleId?: string;
      errors: PipelineResult["errors"];
    }
  | {
      status: "preview_ready";
      runId: string;
      articleId: string;
      slug: string;
      contentHash: string;
      placementDisposition: "placed" | "updated" | "noop";
      previewPath: string;
    };

interface PreflightRow {
  articleId: string;
  status: string;
  activeRunId: string | null;
  lockExpiresAt: string | null;
  lockToken: string | null;
}

export interface PreviewRunInput {
  /** Publication project key. Defaults to yoga-zeeburg-kennisbank. */
  projectKey?: string;
  /** Target article's planning_number. Must be 1..180 inclusive. */
  planningNumber: number;
  /** Externally-authored, fully-reviewed article package. */
  finalPackage: unknown;
}

export interface PreviewRunDeps {
  runner?: RunnerDeps;
  placementStore?: PlacementStore;
  legacyIndex?: LegacyArticleIndex;
  preflight?: (input: {
    projectId: string;
    planningNumber: number;
  }) => Promise<PreflightRow | null>;
  sequenceCheck?: (input: {
    projectId: string;
    planningNumber: number;
  }) => Promise<number[]>;
  readLockToken?: (articleId: string) => Promise<string | null>;
  releaseLock?: (input: { articleId: string; reason: string }) => Promise<void>;
  now?: () => Date;
}

/** Non-persistent in-memory config wrapper. Reads the real project row and
 *  flips automationEnabled=true for this single invocation only. Fails
 *  closed on publication_stopped. */
export function wrapConfigProviderForPreview(base: ConfigProvider): ConfigProvider {
  return {
    async loadProjectConfig(projectKey) {
      const cfg = await base.loadProjectConfig(projectKey);
      if (cfg.publicationStopped) {
        throw new Error("publication_stopped");
      }
      return { ...cfg, automationEnabled: true };
    },
  };
}

async function defaultPreflight(input: {
  projectId: string;
  planningNumber: number;
}): Promise<PreflightRow | null> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("publication_articles")
    .select("id, status, active_run_id, lock_expires_at, lock_token")
    .eq("project_id", input.projectId)
    .eq("planning_number", input.planningNumber)
    .maybeSingle();
  if (error) throw new Error(`preflight failed: ${error.message}`);
  if (!data) return null;
  return {
    articleId: data.id as string,
    status: data.status as string,
    activeRunId: (data.active_run_id ?? null) as string | null,
    lockExpiresAt: (data.lock_expires_at ?? null) as string | null,
    lockToken: (data.lock_token ?? null) as string | null,
  };
}

async function defaultSequenceCheck(input: {
  projectId: string;
  planningNumber: number;
}): Promise<number[]> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("publication_articles")
    .select("planning_number, status")
    .eq("project_id", input.projectId)
    .lt("planning_number", input.planningNumber);
  if (error) throw new Error(`sequence check failed: ${error.message}`);
  return (data ?? [])
    .filter((r: { status: string }) => r.status !== "published" && r.status !== "preview_ready")
    .map((r: { planning_number: number }) => r.planning_number);
}

async function defaultReadLockToken(articleId: string): Promise<string | null> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("publication_articles")
    .select("lock_token")
    .eq("id", articleId)
    .maybeSingle();
  if (error) throw new Error(`lock_token read failed: ${error.message}`);
  return (data?.lock_token ?? null) as string | null;
}

async function defaultReleaseLock(input: { articleId: string; reason: string }): Promise<void> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabaseAdmin.rpc as any)("admin_release_stale_lock", {
    p_article_id: input.articleId,
    p_reason: input.reason,
  });
  if (error) throw new Error(`release lock failed: ${error.message}`);
}

async function defaultLegacyIndex(): Promise<LegacyArticleIndex> {
  const { listLegacyRefs } = await import("@/lib/kennisbank/registry");
  const slugs = new Set(listLegacyRefs().map((r) => r.slug));
  return {
    hasSlug: (s: string) => slugs.has(s),
    listSlugs: () => Array.from(slugs),
  };
}

/**
 * Run the pipeline+placement for a single article in preview-only mode.
 * Idempotent: refuses to start a second concurrent run for the same
 * planning_number. Never publishes, never mutates automation_enabled,
 * never notifies. On failure the same planning_number stays next in line
 * — this function never silently skips.
 */
export async function runArticlePreviewOnce(
  input: PreviewRunInput,
  deps: PreviewRunDeps = {},
): Promise<PreviewRunOutcome> {
  const projectKey = input.projectKey ?? YOGA_PROJECT_KEY;
  const planningNumber = input.planningNumber;

  if (!Number.isInteger(planningNumber) || planningNumber < 1) {
    return { status: "wrong_target", message: `invalid planning_number: ${planningNumber}` };
  }
  if (planningNumber > MAX_PLANNING_NUMBER) {
    return {
      status: "wrong_target",
      message: `planning_number ${planningNumber} exceeds hard stop at ${MAX_PLANNING_NUMBER}`,
    };
  }

  const baseRunner = deps.runner
    ? deps.runner
    : createDefaultRunnerDeps({
        config: createSupabaseConfigProvider(),
        runControl: createSupabaseRunControl(),
        artifacts: createSupabaseArtifactStore(),
      });
  const runnerDeps: RunnerDeps = {
    ...baseRunner,
    config: wrapConfigProviderForPreview(baseRunner.config),
  };

  let cfg;
  try {
    cfg = await runnerDeps.config.loadProjectConfig(projectKey);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { status: "stopped", message: msg };
  }

  const preflight = deps.preflight ?? defaultPreflight;
  const pre = await preflight({ projectId: cfg.projectId, planningNumber });
  if (!pre) {
    return { status: "wrong_target", message: `planning_number=${planningNumber} not found` };
  }
  const now = (deps.now ?? (() => new Date()))();
  if (
    pre.activeRunId &&
    pre.lockExpiresAt &&
    Date.parse(pre.lockExpiresAt) > now.getTime()
  ) {
    return {
      status: "already_running",
      articleId: pre.articleId,
      activeRunId: pre.activeRunId,
      lockExpiresAt: pre.lockExpiresAt,
    };
  }

  const sequenceCheck = deps.sequenceCheck ?? defaultSequenceCheck;
  const earlier = await sequenceCheck({ projectId: cfg.projectId, planningNumber });
  if (earlier.length > 0) {
    return {
      status: "wrong_target",
      message: `earlier planning_numbers not published: ${earlier.join(",")}`,
    };
  }

  const result = await runPipeline(
    { projectKey, trigger: "manual", finalPackage: input.finalPackage },
    runnerDeps,
  );

  if (result.disposition === "disabled_noop") return { status: "pipeline_disabled_noop" };
  if (result.disposition === "claim_noop") return { status: "pipeline_claim_noop" };
  if (result.disposition === "failed" || result.disposition === "blocked") {
    const errors = [...result.errors];
    const needsSafetyRelease =
      !!result.articleId && errors.some((e) => e.category === "finalize_error");
    if (needsSafetyRelease && result.articleId) {
      try {
        await (deps.releaseLock ?? defaultReleaseLock)({
          articleId: result.articleId,
          reason: "preview_run_recovery:pipeline_finalize_error",
        });
      } catch (relErr) {
        errors.push({
          step: "placement_ready",
          category: "finalize_error",
          message: `safety releaseLock failed: ${
            relErr instanceof Error ? relErr.message : String(relErr)
          }`,
        });
      }
    }
    return {
      status: result.disposition === "blocked" ? "pipeline_blocked" : "pipeline_failed",
      runId: result.runId,
      articleId: result.articleId,
      errors,
    };
  }

  if (!result.runId || !result.articleId || !result.pkg) {
    return {
      status: "pipeline_failed",
      errors: [
        {
          step: "placement_ready",
          category: "invariant_violation",
          message: "missing runId/articleId/pkg after content_ready",
        },
      ],
    };
  }

  const readLockToken = deps.readLockToken ?? defaultReadLockToken;
  const releaseLock = deps.releaseLock ?? defaultReleaseLock;

  const finalizeFailed = async (
    stepKey: "placement_ready",
    category: string,
    summary: string,
    lockTokenForFinalize: string | null,
    details: Record<string, unknown> = {},
  ): Promise<PreviewRunOutcome> => {
    const errors: PipelineResult["errors"] = [
      { step: stepKey, category, message: summary },
    ];
    if (lockTokenForFinalize) {
      try {
        await runnerDeps.runControl.recordFailure({
          runId: result.runId!,
          articleId: result.articleId!,
          lockToken: lockTokenForFinalize,
          stepKey,
          category,
          summary,
          retryable: false,
          details,
        });
      } catch (err) {
        errors.push({
          step: stepKey,
          category: "finalize_error",
          message: `recordFailure failed: ${err instanceof Error ? err.message : String(err)}`,
        });
      }
    }
    try {
      await releaseLock({
        articleId: result.articleId!,
        reason: `preview_run_recovery:${category}`,
      });
    } catch (err) {
      errors.push({
        step: stepKey,
        category: "finalize_error",
        message: `releaseLock failed: ${err instanceof Error ? err.message : String(err)}`,
      });
    }
    return {
      status: "pipeline_failed",
      runId: result.runId,
      articleId: result.articleId,
      errors,
    };
  };

  let lockToken: string | null;
  try {
    lockToken = await readLockToken(result.articleId);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return finalizeFailed(
      "placement_ready",
      "invariant_violation",
      `lock_token read failed: ${msg}`,
      null,
    );
  }
  if (!lockToken) {
    return finalizeFailed(
      "placement_ready",
      "invariant_violation",
      "lock lost after content_ready; artifact list would fail",
      null,
    );
  }

  const legacy = deps.legacyIndex ?? (await defaultLegacyIndex());
  const store = deps.placementStore ?? createSupabasePlacementStore();
  const previewPath = `https://www.yogazeeburg.com/nl/kennisbank/preview/${result.articleId}`;
  const previewToken = derivePreviewToken(result.articleId, result.pkg.contentHash);

  let placement;
  try {
    placement = await placementFromArtifacts(
      {
        runId: result.runId,
        articleId: result.articleId,
        lockToken,
        schemaVersion: runnerDeps.schemaVersion,
        promptVersion: runnerDeps.promptVersion,
        preview: { previewUrl: previewPath, previewToken },
      },
      { store, legacy, artifacts: runnerDeps.artifacts as ArtifactStore },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return finalizeFailed(
      "placement_ready",
      "placement_error",
      `placementFromArtifacts failed: ${msg}`,
      lockToken,
    );
  }

  try {
    await releaseLock({
      articleId: result.articleId,
      reason: "preview_run_complete",
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return finalizeFailed(
      "placement_ready",
      "finalize_error",
      `releaseLock failed after successful placement: ${msg}`,
      lockToken,
      { placementDisposition: placement.disposition, slug: placement.row.slug },
    );
  }

  return {
    status: "preview_ready",
    runId: result.runId,
    articleId: result.articleId,
    slug: placement.row.slug,
    contentHash: placement.row.contentHash,
    placementDisposition: placement.disposition,
    previewPath,
  };
}
