// Server-only runner adapters. This module wires the pure pipeline to the
// production Supabase RPC surface + Lovable AI Gateway. It MUST NOT be
// imported from any client-graph module (routes, *.functions.ts). Import
// protection blocks it by the `.server.ts` suffix.
//
// SAFETY: this file exports factories. No top-level side effects, no network
// calls at import time. LOVABLE_API_KEY is read lazily inside the AI provider
// only when a method actually runs — the pipeline never invokes AI while
// automation is disabled, so importing this module has zero cost.

import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type {
  AiProviders,
  ArtifactStore,
  ClaimedRun,
  ConfigProvider,
  ProjectConfig,
  RunControl,
  RunnerDeps,
} from "./providers";
import { PROMPT_VERSION, SCHEMA_VERSION } from "./prompts";
import { createLovableAiProviders } from "./ai-provider.server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AdminRpc = (name: string, args: Record<string, unknown>) => Promise<{ data: any; error: any }>;
const rpc: AdminRpc = (name, args) =>
  // Cast for RPCs not yet in the generated types file after migration D.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (supabaseAdmin.rpc as any)(name, args);

export function createSupabaseConfigProvider(): ConfigProvider {
  return {
    async loadProjectConfig(projectKey: string): Promise<ProjectConfig> {
      const { data, error } = await supabaseAdmin
        .from("publication_projects")
        .select("id, project_key, automation_enabled, publication_stopped, timezone")
        .eq("project_key", projectKey)
        .maybeSingle();
      if (error) throw new Error(`config load failed: ${error.message}`);
      if (!data) throw new Error(`unknown project: ${projectKey}`);
      return {
        projectId: data.id,
        projectKey: data.project_key,
        automationEnabled: data.automation_enabled,
        publicationStopped: data.publication_stopped,
        timezone: data.timezone,
      };
    },
  };
}

export function createSupabaseRunControl(): RunControl {
  return {
    async claim({ projectKey, trigger }): Promise<ClaimedRun | null> {
      const { data, error } = await rpc("claim_next_publication_run", {
        p_project_key: projectKey,
        p_trigger: trigger,
        p_scheduler_slot: null,
        p_lock_ttl_seconds: 300,
      });
      if (error) throw new Error(`claim failed: ${error.message}`);
      if (!data || data.disposition !== "claimed") return null;
      return {
        runId: data.run_id,
        articleId: data.article_id,
        planningNumber: data.planning_number,
        lockToken: data.lock_token,
        phase: data.brief?.phase ?? "",
        originalTitle: data.brief?.original_title ?? "",
      };
    },
    async heartbeat({ runId, articleId, lockToken, extendSeconds }) {
      const { error } = await rpc("heartbeat_publication_run", {
        p_run_id: runId,
        p_article_id: articleId,
        p_lock_token: lockToken,
        p_extend_seconds: extendSeconds,
      });
      if (error) throw new Error(`heartbeat failed: ${error.message}`);
    },
    async advance({ runId, articleId, lockToken, fromStatus, toStatus, stepKey, evidence }) {
      const { error } = await rpc("advance_publication_run", {
        p_run_id: runId,
        p_article_id: articleId,
        p_lock_token: lockToken,
        p_from_status: fromStatus,
        p_to_status: toStatus,
        p_step_key: stepKey,
        p_evidence: evidence,
      });
      if (error) throw new Error(`advance failed: ${error.message}`);
    },
    async recordFailure({ runId, articleId, lockToken, stepKey, category, summary, retryable, details }) {
      const disposition = retryable ? "retry" : category === "content_safety_error" ? "blocked" : "failed";
      const { error } = await rpc("complete_publication_failure", {
        p_run_id: runId,
        p_article_id: articleId,
        p_lock_token: lockToken,
        p_step_key: stepKey,
        p_disposition: disposition,
        p_error_category: category,
        p_reason_code: null,
        p_error_summary: summary,
        p_error_details: details,
        p_backoff_seconds: null,
      });
      if (error) throw new Error(`recordFailure failed: ${error.message}`);
    },
  };
}

export function createSupabaseArtifactStore(): ArtifactStore {
  return {
    async list({ runId, articleId, lockToken }) {
      const { data, error } = await rpc("list_publication_run_artifacts", {
        p_run_id: runId,
        p_article_id: articleId,
        p_lock_token: lockToken,
      });
      if (error) throw new Error(`artifact list failed: ${error.message}`);
      return (data ?? []).map((r: Record<string, unknown>) => ({
        stepKey: r.step_key as string,
        schemaVersion: r.schema_version as string,
        promptVersion: r.prompt_version as string,
        contentHash: r.content_hash as string,
        payload: r.payload,
      }));
    },
    async upsert({ runId, articleId, lockToken, stepKey, schemaVersion, promptVersion, contentHash, payload }) {
      const { error } = await rpc("upsert_publication_run_artifact", {
        p_run_id: runId,
        p_article_id: articleId,
        p_lock_token: lockToken,
        p_step_key: stepKey,
        p_schema_version: schemaVersion,
        p_prompt_version: promptVersion,
        p_content_hash: contentHash,
        p_payload: payload,
      });
      if (error) throw new Error(`artifact upsert failed: ${error.message}`);
    },
  };
}

/**
 * AI provider stub. Deliberately throws configuration_error so no real AI
 * traffic can happen in step 2. Step 3 replaces this with a Lovable AI
 * Gateway implementation.
 */
export function createStubAiProviders(): AiProviders {
  const notImplemented = (kind: string) => {
    throw Object.assign(new Error(`AI provider '${kind}' not wired in step 2`), {
      category: "configuration_error",
    });
  };
  return {
    async generateBrief() {
      return notImplemented("generateBrief");
    },
    async validateSources() {
      return notImplemented("validateSources");
    },
    async generateArticle() {
      return notImplemented("generateArticle");
    },
    async reviewRound() {
      return notImplemented("reviewRound");
    },
  };
}

/**
 * Compose default production RunnerDeps. Callers can override individual
 * fields — in particular the AI providers for future step-3 wiring.
 *
 * SAFETY: this function does not read secrets at module scope; env vars are
 * read only when a wrapped RPC actually runs (inside supabaseAdmin proxy).
 */
export function createDefaultRunnerDeps(overrides: Partial<RunnerDeps> = {}): RunnerDeps {
  return {
    config: overrides.config ?? createSupabaseConfigProvider(),
    runControl: overrides.runControl ?? createSupabaseRunControl(),
    artifacts: overrides.artifacts ?? createSupabaseArtifactStore(),
    ai: overrides.ai ?? createStubAiProviders(),
    now: overrides.now,
    heartbeatIntervalMs: overrides.heartbeatIntervalMs,
    promptVersion: overrides.promptVersion ?? PROMPT_VERSION,
    schemaVersion: overrides.schemaVersion ?? SCHEMA_VERSION,
    maxRepairCycles: overrides.maxRepairCycles,
  };
}
