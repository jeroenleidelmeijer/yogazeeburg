// Adapter test: verifies argument mapping from RunControl.claim into the
// `claim_next_publication_run` RPC and disposition handling. We do NOT touch
// production data — the adapter's supabaseAdmin.rpc call is intercepted by
// replacing the module's rpc function via a lightweight mock at import time.
import { describe, it, expect, vi } from "vitest";

vi.mock("@/integrations/supabase/client.server", () => {
  const calls: Array<{ name: string; args: Record<string, unknown> }> = [];
  const rpcResponders: Record<string, () => Promise<{ data: unknown; error: unknown }>> = {
    claim_next_publication_run: async () => ({
      data: {
        disposition: "claimed",
        run_id: "run-1",
        article_id: "art-1",
        planning_number: 4,
        lock_token: "lock-1",
        brief: { phase: "phase_1_36", original_title: "titel" },
      },
      error: null,
    }),
    list_publication_run_artifacts: async () => ({ data: [], error: null }),
    upsert_publication_run_artifact: async () => ({ data: "id", error: null }),
    heartbeat_publication_run: async () => ({ data: null, error: null }),
    advance_publication_run: async () => ({ data: null, error: null }),
    complete_publication_failure: async () => ({ data: null, error: null }),
  };
  const supabaseAdmin = {
    from: () => ({
      select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: null, error: null }) }) }),
    }),
    rpc: (name: string, args: Record<string, unknown>) => {
      calls.push({ name, args });
      return rpcResponders[name]!();
    },
    __calls: calls,
  };
  return { supabaseAdmin };
});

describe("adapters: argument mapping", () => {
  it("claim maps args to claim_next_publication_run RPC and unwraps claimed disposition", async () => {
    const mod = await import("@/lib/publications/runner/adapters.server");
    const rc = mod.createSupabaseRunControl();
    const claim = await rc.claim({ projectKey: "yoga-zeeburg-kennisbank", trigger: "manual" });
    expect(claim).toEqual({
      runId: "run-1",
      articleId: "art-1",
      planningNumber: 4,
      lockToken: "lock-1",
      phase: "phase_1_36",
      originalTitle: "titel",
    });
    const { supabaseAdmin } = (await import("@/integrations/supabase/client.server")) as unknown as {
      supabaseAdmin: { __calls: Array<{ name: string; args: Record<string, unknown> }> };
    };
    const c = supabaseAdmin.__calls.find((x) => x.name === "claim_next_publication_run");
    expect(c?.args).toMatchObject({
      p_project_key: "yoga-zeeburg-kennisbank",
      p_trigger: "manual",
      p_scheduler_slot: null,
      p_lock_ttl_seconds: 600,
    });
  });

  it("recordFailure picks the right disposition for a content_safety_error", async () => {
    const mod = await import("@/lib/publications/runner/adapters.server");
    const rc = mod.createSupabaseRunControl();
    await rc.recordFailure({
      runId: "r",
      articleId: "a",
      lockToken: "l",
      stepKey: "generation",
      category: "content_safety_error",
      summary: "medical claim",
      retryable: false,
      details: {},
    });
    const { supabaseAdmin } = (await import("@/integrations/supabase/client.server")) as unknown as {
      supabaseAdmin: { __calls: Array<{ name: string; args: Record<string, unknown> }> };
    };
    const c = supabaseAdmin.__calls.filter((x) => x.name === "complete_publication_failure").pop();
    expect(c?.args.p_disposition).toBe("blocked");
    expect(c?.args.p_error_category).toBe("content_safety_error");
  });

  it("createDefaultRunnerDeps composes a runtime dep set without an AI provider (external authorship)", async () => {
    const mod = await import("@/lib/publications/runner/adapters.server");
    const deps = mod.createDefaultRunnerDeps();
    expect(deps.promptVersion).toBe("external.chatgpt-v1");
    expect(deps.schemaVersion).toBe("1");
    // The runner no longer exposes an AI provider on its dep surface.
    expect((deps as unknown as { ai?: unknown }).ai).toBeUndefined();
  });
});
