// Behavior tests for the claim-lock renewal ("lease") added to
// withBoundedRetry in src/lib/publications/runner/pipeline.ts.
//
// These do NOT exercise the DB. Concurrency and ownership are enforced by
// heartbeat_publication_run server-side (validated in fase A-1 integration
// tests). Here we prove the runner-side contract:
//   1. A single AI step that runs longer than the original 120s TTL keeps
//      the lock alive through background heartbeats.
//   2. Every heartbeat carries the current owner's exact (runId,
//      articleId, lockToken) triple.
//   3. A real heartbeat failure mid-step surfaces as a non-retryable
//      pipeline failure that finalizes the run (recordFailure invoked).
//   4. When recordFailure ALSO fails, runPipeline never leaks the
//      exception; the result carries a `finalize_error` entry so the
//      caller can run a safety-net stale-lock release.

import { describe, it, expect } from "vitest";
import { runPipeline } from "@/lib/publications/runner";
import { runArticle4PreviewOnce } from "@/lib/publications/preview-run.server";
import {
  TEST_PROJECT_KEY,
  buildDeps,
  buildBrief,
  fakeAi,
  fakeArtifactStore,
  fakeConfig,
  fakeRunControl,
  defaultClaim,
} from "./fakes";
import type { RunControl } from "@/lib/publications/runner/providers";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("runner: lock lease renewal", () => {
  it("keeps the lock alive across an AI step that outlasts the original 120s TTL", async () => {
    // With intervalMs=20 and a brief step of ~200ms, we expect at least
    // one up-front heartbeat plus multiple background renewals during the
    // step (~10 renewals for that step). The proof is that heartbeats
    // grew beyond one-per-step during a single step.
    const slowAi = fakeAi({
      generateBrief: async () => {
        await delay(200);
        return buildBrief();
      },
    });
    const runControl = fakeRunControl();
    const deps = buildDeps({
      ai: slowAi,
      runControl,
      heartbeatIntervalMs: 20,
    });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("content_ready");
    // 7 steps (brief, source_validation, generation, review×3, content_ready)
    // → 6 up-front heartbeats at minimum. Renewals during the slow brief
    // step should add several more. We assert a comfortable lower bound
    // that would fail without the background renewal timer.
    expect(runControl.heartbeats).toBeGreaterThanOrEqual(12);
  });

  it("every heartbeat carries the exact owner (runId, articleId, lockToken) triple", async () => {
    const claim = defaultClaim();
    const seen: Array<{ runId: string; articleId: string; lockToken: string }> = [];
    const strictRc: RunControl = {
      claim: async () => claim,
      heartbeat: async ({ runId, articleId, lockToken }) => {
        seen.push({ runId, articleId, lockToken });
      },
      advance: async () => undefined,
      recordFailure: async () => undefined,
    };
    const deps = buildDeps({
      // Use a fresh runControl-like object; we only need the spy interface
      // for other adapters, and the pipeline is happy with a plain
      // RunControl for heartbeat verification.
      runControl: strictRc as unknown as ReturnType<typeof fakeRunControl>,
      heartbeatIntervalMs: 5,
      ai: fakeAi({
        generateBrief: async () => {
          await delay(30);
          return buildBrief();
        },
      }),
    });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("content_ready");
    expect(seen.length).toBeGreaterThan(0);
    for (const call of seen) {
      expect(call.runId).toBe(claim.runId);
      expect(call.articleId).toBe(claim.articleId);
      expect(call.lockToken).toBe(claim.lockToken);
    }
  });

  it("renewal failure mid-step finalizes as a non-retryable pipeline failure (recordFailure called)", async () => {
    const claim = defaultClaim();
    let hbCount = 0;
    const failures: Array<{ category: string; retryable: boolean; stepKey: string }> = [];
    const rc: RunControl = {
      claim: async () => claim,
      heartbeat: async () => {
        hbCount += 1;
        // First heartbeat (initial lease) succeeds; subsequent background
        // renewals fail — simulates DB "lock expired" mid-step.
        if (hbCount >= 2) throw new Error("heartbeat failed: lock expired");
      },
      advance: async () => undefined,
      recordFailure: async (input) => {
        failures.push({
          category: input.category,
          retryable: input.retryable,
          stepKey: input.stepKey,
        });
      },
    };
    const deps = buildDeps({
      runControl: rc as unknown as ReturnType<typeof fakeRunControl>,
      heartbeatIntervalMs: 10,
      ai: fakeAi({
        generateBrief: async () => {
          // Long enough for at least one background renewal to fire.
          await delay(80);
          return buildBrief();
        },
      }),
    });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("failed");
    expect(failures).toHaveLength(1);
    expect(failures[0].retryable).toBe(false);
    // Sanity: no finalize_error means recordFailure itself succeeded and
    // the DB path cleared active_run_id atomically.
    expect(res.errors.some((e) => e.category === "finalize_error")).toBe(false);
  });

  it("recordFailure failure never leaks; result surfaces finalize_error for safety-net release", async () => {
    const claim = defaultClaim();
    const rc: RunControl = {
      claim: async () => claim,
      heartbeat: async () => undefined,
      advance: async () => undefined,
      // Force a step failure by throwing from advance is not possible
      // in the brief step; instead we fail generateBrief AND make
      // recordFailure throw.
      recordFailure: async () => {
        throw new Error("recordFailure failed: lock expired");
      },
    };
    const deps = buildDeps({
      runControl: rc as unknown as ReturnType<typeof fakeRunControl>,
      ai: fakeAi({
        generateBrief: async () => {
          throw new Error("simulated brief AI failure");
        },
      }),
    });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("failed");
    const finalizeErrors = res.errors.filter((e) => e.category === "finalize_error");
    expect(finalizeErrors).toHaveLength(1);
    expect(finalizeErrors[0].message).toContain("recordFailure failed");
  });
});

describe("preview-run: safety-net release on finalize_error", () => {
  it("calls releaseLock when the pipeline surfaces a finalize_error", async () => {
    // Compose a full RunnerDeps where the pipeline reaches content_ready
    // ... no. Instead, use the injectable deps hooks on runArticle4PreviewOnce
    // to force the pipeline to fail with a finalize_error, and assert the
    // safety-net releaseLock is invoked.
    const claim = defaultClaim();
    const releaseCalls: Array<{ articleId: string; reason: string }> = [];
    const rc: RunControl = {
      claim: async () => claim,
      heartbeat: async () => undefined,
      advance: async () => undefined,
      recordFailure: async () => {
        throw new Error("recordFailure failed: lock expired");
      },
    };
    const deps = buildDeps({
      config: fakeConfig({ automationEnabled: false }),
      runControl: rc as unknown as ReturnType<typeof fakeRunControl>,
      ai: fakeAi({
        generateBrief: async () => {
          throw new Error("simulated brief failure");
        },
      }),
      artifacts: fakeArtifactStore(),
    });
    // wrapConfigProviderForPreview flips automationEnabled=true; use the
    // injectable deps hooks to bypass DB preflight / release paths.
    const outcome = await runArticle4PreviewOnce({
      runner: deps,
      preflight: async () => ({
        articleId: claim.articleId,
        status: "planned",
        activeRunId: null,
        lockExpiresAt: null,
        lockToken: null,
      }),
      sequenceCheck: async () => [],
      releaseLock: async (input) => {
        releaseCalls.push(input);
      },
      readLockToken: async () => claim.lockToken,
    });
    expect(outcome.status).toBe("pipeline_failed");
    // Safety-net release fired with the recovery reason.
    expect(releaseCalls).toHaveLength(1);
    expect(releaseCalls[0].articleId).toBe(claim.articleId);
    expect(releaseCalls[0].reason).toBe(
      "preview_run_recovery:pipeline_finalize_error",
    );
  });

  it("does NOT release when recordFailure succeeded (finalize_error absent)", async () => {
    const claim = defaultClaim();
    const releaseCalls: Array<{ articleId: string; reason: string }> = [];
    const rc: RunControl = {
      claim: async () => claim,
      heartbeat: async () => undefined,
      advance: async () => undefined,
      recordFailure: async () => undefined,
    };
    const deps = buildDeps({
      config: fakeConfig({ automationEnabled: false }),
      runControl: rc as unknown as ReturnType<typeof fakeRunControl>,
      ai: fakeAi({
        generateBrief: async () => {
          throw new Error("simulated brief failure");
        },
      }),
    });
    const outcome = await runArticle4PreviewOnce({
      runner: deps,
      preflight: async () => ({
        articleId: claim.articleId,
        status: "planned",
        activeRunId: null,
        lockExpiresAt: null,
        lockToken: null,
      }),
      sequenceCheck: async () => [],
      releaseLock: async (input) => {
        releaseCalls.push(input);
      },
      readLockToken: async () => claim.lockToken,
    });
    expect(outcome.status).toBe("pipeline_failed");
    expect(releaseCalls).toHaveLength(0);
  });
});
