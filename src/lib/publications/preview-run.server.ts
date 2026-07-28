// Server-only preview-run orchestrator for planning_number=4 of the
// `yoga-zeeburg-kennisbank` publication project.
//
// This module composes existing building blocks — nothing new is added to
// the pipeline, placement or DB surfaces:
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
//   * Refuses any target other than (project=yoga-zeeburg-kennisbank,
//     planning_number=4).
//   * Idempotent: if article 4 currently holds a non-expired lock or has an
//     active_run_id, we refuse. The DB claim RPC is the ultimate
//     single-source-of-truth for concurrency — this preflight is a fast
//     rejection path.
//   * On failure the pipeline itself calls complete_publication_failure via
//     runControl.recordFailure, which clears lock_token/lock_expires_at/
//     locked_by/active_run_id and marks the run failed|blocked|retry_pending.
//     No manual cleanup required for expected provider/schema/QA failures.
//   * On success we release the article lock via admin_release_stale_lock
//     so the article is not left in a locked-with-active_run_id shape.
//     Article status stays at whatever the pipeline left it (drafting) —
//     `publication_articles.status` has NO influence on the public registry
//     which reads only `kennisbank_placements`.
//   * Placement is written with placement_status='preview'. The placement
//     service structurally refuses to set 'published' or fill published_at.
//     The public registry and sitemap read only 'published' rows, so
//     article 4 cannot leak onto any public surface via this call.
//   * No LOVABLE_API_KEY, SUPABASE_SERVICE_ROLE_KEY or any other secret is
//     returned or logged.

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

export const YOGA_PROJECT_KEY = "yoga-zeeburg-kennisbank" as const;
export const TARGET_PLANNING_NUMBER = 4 as const;

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

export interface PreviewRunDeps {
  /** Full RunnerDeps to use. When omitted, production adapters are wired. */
  runner?: RunnerDeps;
  /** Placement deps. When omitted, production Supabase store + legacy index. */
  placementStore?: PlacementStore;
  legacyIndex?: LegacyArticleIndex;
  /** Pre-flight lookup for article 4. Injectable for tests. */
  preflight?: (input: {
    projectId: string;
    planningNumber: number;
  }) => Promise<PreflightRow | null>;
  /** Sequence check: any earlier planning_number not in a terminal state. */
  sequenceCheck?: (input: { projectId: string }) => Promise<number[]>;
  /** Look up the current lock_token after pipeline completes (for artifact list). */
  readLockToken?: (articleId: string) => Promise<string | null>;
  /** Release the lock post-success. Injectable for tests. */
  releaseLock?: (input: { articleId: string; reason: string }) => Promise<void>;
  /** Clock override for tests. */
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

async function defaultSequenceCheck(input: { projectId: string }): Promise<number[]> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("publication_articles")
    .select("planning_number, status")
    .eq("project_id", input.projectId)
    .lt("planning_number", TARGET_PLANNING_NUMBER);
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
 * Run the pipeline+placement for planning_number=4 of yoga-zeeburg-kennisbank
 * in preview-only mode. Idempotent: refuses to start a second concurrent run.
 * Never publishes, never mutates automation_enabled, never notifies.
 */
export async function runArticle4PreviewOnce(
  deps: PreviewRunDeps = {},
): Promise<PreviewRunOutcome> {
  // Wire runner deps with a preview-scoped config wrapper. If the caller
  // supplied a full RunnerDeps we still wrap its config so the automation
  // override is uniformly applied.
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

  // Load config through the wrapper to fail closed on publication_stopped.
  let cfg;
  try {
    cfg = await runnerDeps.config.loadProjectConfig(YOGA_PROJECT_KEY);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { status: "stopped", message: msg };
  }

  // Preflight: article 4 must exist and not hold a fresh lock.
  const preflight = deps.preflight ?? defaultPreflight;
  const pre = await preflight({
    projectId: cfg.projectId,
    planningNumber: TARGET_PLANNING_NUMBER,
  });
  if (!pre) return { status: "wrong_target", message: "planning_number=4 not found" };
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

  // Sequence check: refuse if any earlier planning_number is not terminal.
  // Articles 1-3 are 'published' → empty list, allow.
  const sequenceCheck = deps.sequenceCheck ?? defaultSequenceCheck;
  const earlier = await sequenceCheck({ projectId: cfg.projectId });
  if (earlier.length > 0) {
    return {
      status: "wrong_target",
      message: `earlier planning_numbers not published: ${earlier.join(",")}`,
    };
  }

  // Run the pipeline. Trigger is 'manual' so the DB claim RPC's
  // automation guard (scheduled-only) is not triggered. The pipeline's own
  // guard is bypassed by the config wrapper (in-memory, non-persistent).
  const result = await runPipeline(
    { projectKey: YOGA_PROJECT_KEY, trigger: "manual" },
    runnerDeps,
  );

  if (result.disposition === "disabled_noop") return { status: "pipeline_disabled_noop" };
  if (result.disposition === "claim_noop") return { status: "pipeline_claim_noop" };
  if (result.disposition === "failed") {
    return {
      status: "pipeline_failed",
      runId: result.runId,
      articleId: result.articleId,
      errors: result.errors,
    };
  }
  if (result.disposition === "blocked") {
    return {
      status: "pipeline_blocked",
      runId: result.runId,
      articleId: result.articleId,
      errors: result.errors,
    };
  }

  // content_ready — place as preview.
  if (!result.runId || !result.articleId || !result.pkg) {
    return {
      status: "pipeline_failed",
      errors: [
        {
          step: "content_ready",
          category: "invariant_violation",
          message: "missing runId/articleId/pkg after content_ready",
        },
      ],
    };
  }

  const readLockToken = deps.readLockToken ?? defaultReadLockToken;
  const releaseLock = deps.releaseLock ?? defaultReleaseLock;

  // Helper: fail-closed finalization. Attempts (in order):
  //   1) auditable runControl.recordFailure when we have a lockToken
  //   2) admin_release_stale_lock to clear active_run_id/lock fields
  // Individual sub-failures are captured and returned as errors, but the
  // function always returns a "pipeline_failed" outcome — never preview_ready.
  const finalizeFailed = async (
    stepKey: string,
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

  // 1) Read the lock token needed for the artifact list + placement.
  let lockToken: string | null;
  try {
    lockToken = await readLockToken(result.articleId);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    // We do NOT have a lock token — recordFailure requires one, so skip it
    // and rely on admin_release_stale_lock to clear active_run_id/lock.
    return finalizeFailed(
      "content_ready",
      "invariant_violation",
      `lock_token read failed: ${msg}`,
      null,
    );
  }
  if (!lockToken) {
    return finalizeFailed(
      "content_ready",
      "invariant_violation",
      "lock lost after content_ready; artifact list would fail",
      null,
    );
  }

  const legacy = deps.legacyIndex ?? (await defaultLegacyIndex());
  const store = deps.placementStore ?? createSupabasePlacementStore();
  const previewPath = `https://www.yogazeeburg.com/nl/kennisbank/preview/${result.articleId}`;
  const previewToken = derivePreviewToken(result.articleId, result.pkg.contentHash);

  // 2) Placement — durable preview row via placementFromArtifacts.
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
      "placement",
      "placement_error",
      `placementFromArtifacts failed: ${msg}`,
      lockToken,
    );
  }

  // 3) Release the article lock post-success. Fail closed: if we cannot
  //    release the lock we do NOT return preview_ready — the article row
  //    would remain locked-with-active_run_id, which violates the
  //    idempotency invariant. Record an auditable failure and surface it.
  try {
    await releaseLock({
      articleId: result.articleId,
      reason: "preview_run_complete",
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return finalizeFailed(
      "release_lock",
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
