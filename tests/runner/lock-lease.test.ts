// Behavior tests for the claim-lock renewal ("lease") added to
// withBoundedRetry. Even though the external-authorship pipeline has no
// long-running AI step, the lease renewal remains active during
// validate_package to protect against long-tail latency and future
// heavier validation work.
import { describe, it, expect } from "vitest";
import { runPipeline } from "@/lib/publications/runner/pipeline";
import {
  TEST_PROJECT_KEY,
  buildDeps,
  buildFinalPackage,
  fakeRunControl,
} from "./fakes";
import type { RunControl } from "@/lib/publications/runner/providers";

describe("runner: lock lease renewal", () => {
  it("heartbeats at least once for the validate_package step", async () => {
    const runControl = fakeRunControl();
    const deps = buildDeps({ runControl, heartbeatIntervalMs: 20 });
    const res = await runPipeline(
      { projectKey: TEST_PROJECT_KEY, finalPackage: buildFinalPackage() },
      deps,
    );
    expect(res.disposition).toBe("placement_ready");
    expect(runControl.heartbeats).toBeGreaterThanOrEqual(1);
  });

  it("passes the current (runId, articleId, lockToken) triple on every heartbeat", async () => {
    const seen: Array<{ runId: string; articleId: string; lockToken: string }> = [];
    const rc = fakeRunControl();
    const originalHeartbeat = rc.heartbeat.bind(rc);
    rc.heartbeat = async (i) => {
      seen.push({ runId: i.runId, articleId: i.articleId, lockToken: i.lockToken });
      return originalHeartbeat(i);
    };
    const deps = buildDeps({ runControl: rc });
    await runPipeline(
      { projectKey: TEST_PROJECT_KEY, finalPackage: buildFinalPackage() },
      deps,
    );
    expect(seen.length).toBeGreaterThan(0);
    for (const s of seen) {
      expect(s.runId).toBe("run_test");
      expect(s.articleId).toBe("art_test_1");
      expect(s.lockToken).toBe("lock_test");
    }
  });

  it("heartbeat failure is non-retryable and finalizes via recordFailure", async () => {
    const failing: RunControl = {
      async claim() {
        return {
          runId: "run_test",
          articleId: "art_test_1",
          planningNumber: 4,
          lockToken: "lock_test",
          phase: "phase_1_36",
          originalTitle: "t",
        };
      },
      async heartbeat() {
        throw new Error("lock lost");
      },
      async advance() {},
      async recordFailure() {},
    };
    let recordedFailure: unknown = null;
    failing.recordFailure = async (i) => {
      recordedFailure = i;
    };
    const deps = buildDeps({ runControl: failing as ReturnType<typeof fakeRunControl> });
    const res = await runPipeline(
      { projectKey: TEST_PROJECT_KEY, finalPackage: buildFinalPackage() },
      deps,
    );
    expect(res.disposition).toBe("failed");
    expect(recordedFailure).toBeTruthy();
  });

  it("finalize failure surfaces as a finalize_error entry (never leaks the exception)", async () => {
    const rc = fakeRunControl();
    let heartbeatCalls = 0;
    rc.heartbeat = async () => {
      heartbeatCalls += 1;
      throw new Error("lease gone");
    };
    rc.recordFailure = async () => {
      throw new Error("finalize also failed");
    };
    const deps = buildDeps({ runControl: rc });
    const res = await runPipeline(
      { projectKey: TEST_PROJECT_KEY, finalPackage: buildFinalPackage() },
      deps,
    );
    expect(res.disposition).toBe("failed");
    expect(heartbeatCalls).toBeGreaterThan(0);
    expect(res.errors.some((e) => e.category === "finalize_error")).toBe(true);
  });
});
