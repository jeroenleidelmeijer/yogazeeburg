// Behavior tests for the post-rolverdeling runner. The runner accepts an
// externally-authored FinalArticlePackage; there is no AI content path.
import { describe, it, expect } from "vitest";
import { runPipeline } from "@/lib/publications/runner/pipeline";
import {
  TEST_PROJECT_KEY,
  buildDeps,
  buildFinalPackage,
  defaultClaim,
  fakeArtifactStore,
  fakeConfig,
  fakeRunControl,
} from "./fakes";
import { REVIEW_ORDER } from "@/lib/publications/runner/schemas";
import { toGeneratedArticlePackage } from "@/lib/publications/runner/final-package";
import { packageContentHash } from "@/lib/publications/runner/hash";

describe("runner: safety rails", () => {
  it("returns disabled_noop when automation_enabled=false", async () => {
    const deps = buildDeps({ config: fakeConfig({ automationEnabled: false }) });
    const res = await runPipeline(
      { projectKey: TEST_PROJECT_KEY, finalPackage: buildFinalPackage() },
      deps,
    );
    expect(res.disposition).toBe("disabled_noop");
    expect(deps.runControl.claims).toBe(0);
    expect(deps.artifacts.upserts).toBe(0);
  });

  it("returns disabled_noop when publication_stopped=true", async () => {
    const deps = buildDeps({ config: fakeConfig({ publicationStopped: true }) });
    const res = await runPipeline(
      { projectKey: TEST_PROJECT_KEY, finalPackage: buildFinalPackage() },
      deps,
    );
    expect(res.disposition).toBe("disabled_noop");
    expect(deps.runControl.claims).toBe(0);
  });

  it("returns claim_noop when nothing is claimable", async () => {
    const deps = buildDeps({ runControl: fakeRunControl(null) });
    const res = await runPipeline(
      { projectKey: TEST_PROJECT_KEY, finalPackage: buildFinalPackage() },
      deps,
    );
    expect(res.disposition).toBe("claim_noop");
    expect(deps.artifacts.upserts).toBe(0);
  });
});

describe("runner: pre-claim FinalArticlePackage validation", () => {
  it("rejects malformed package BEFORE claim and BEFORE any artifact write", async () => {
    const deps = buildDeps();
    const res = await runPipeline(
      { projectKey: TEST_PROJECT_KEY, finalPackage: { nope: true } },
      deps,
    );
    expect(res.disposition).toBe("failed");
    expect(res.step).toBe("validate_package");
    expect(deps.runControl.claims).toBe(0);
    expect(deps.artifacts.upserts).toBe(0);
    expect(res.errors[0]?.category).toBe("validation_error");
  });

  it("rejects package with unknown extra fields (strict)", async () => {
    const bad = { ...buildFinalPackage(), rogueField: "x" } as unknown;
    const deps = buildDeps();
    const res = await runPipeline(
      { projectKey: TEST_PROJECT_KEY, finalPackage: bad },
      deps,
    );
    expect(res.disposition).toBe("failed");
    expect(deps.runControl.claims).toBe(0);
  });

  it("rejects package with authoredBy != chatgpt-external", async () => {
    const bad = { ...buildFinalPackage(), authoredBy: "someone-else" } as unknown;
    const deps = buildDeps();
    const res = await runPipeline(
      { projectKey: TEST_PROJECT_KEY, finalPackage: bad },
      deps,
    );
    expect(res.disposition).toBe("failed");
    expect(deps.runControl.claims).toBe(0);
  });
});

describe("runner: happy path", () => {
  it("reaches placement_ready with 6 legacy artifacts + advance", async () => {
    const deps = buildDeps();
    const res = await runPipeline(
      { projectKey: TEST_PROJECT_KEY, finalPackage: buildFinalPackage() },
      deps,
    );
    expect(res.disposition).toBe("placement_ready");
    expect(res.step).toBe("placement_ready");
    const stepKeys = deps.artifacts.records.map((r) => r.stepKey).sort();
    // Legacy artifact bundle: generation, source_validation, review_1..3, content_ready
    expect(stepKeys).toEqual(
      ["content_ready", "generation", "review_1", "review_2", "review_3", "source_validation"].sort(),
    );
    // Reviews emitted in REVIEW_ORDER.
    expect(res.reviews.map((r) => r.round)).toEqual(REVIEW_ORDER);
    // Advance called exactly once with the validate_package step key.
    expect(deps.runControl.advances).toEqual([
      expect.objectContaining({
        stepKey: "validate_package",
        fromStatus: "locked",
        toStatus: "drafting",
      }),
    ]);
  });

  it("overrides author-supplied contentHash with the deterministic runner hash", async () => {
    const deps = buildDeps();
    const attacker = buildFinalPackage({ contentHash: "attacker-supplied-value" });
    const res = await runPipeline(
      { projectKey: TEST_PROJECT_KEY, finalPackage: attacker },
      deps,
    );
    expect(res.disposition).toBe("placement_ready");
    const expectedHash = packageContentHash({
      ...toGeneratedArticlePackage(attacker),
      contentHash: "",
    });
    expect(res.pkg!.contentHash).toBe(expectedHash);
    expect(res.pkg!.contentHash).not.toBe("attacker-supplied-value");
  });

  it("emits generation artifact whose contentHash matches recomputed package hash", async () => {
    const deps = buildDeps();
    await runPipeline(
      { projectKey: TEST_PROJECT_KEY, finalPackage: buildFinalPackage() },
      deps,
    );
    const gen = deps.artifacts.records.find((r) => r.stepKey === "generation");
    expect(gen).toBeDefined();
    const pkg = gen!.payload as { contentHash: string };
    expect(gen!.contentHash).toBe(pkg.contentHash);
    const recomputed = packageContentHash({ ...pkg, contentHash: "" } as unknown as Record<string, unknown>);
    expect(pkg.contentHash).toBe(recomputed);
  });
});

describe("runner: identity mismatches are non-retryable", () => {
  it("rejects finalPackage.articleId != claim.articleId", async () => {
    const deps = buildDeps();
    const pkg = buildFinalPackage({ articleId: "wrong_id" });
    const res = await runPipeline(
      { projectKey: TEST_PROJECT_KEY, finalPackage: pkg },
      deps,
    );
    expect(res.disposition).toBe("failed");
    expect(deps.runControl.failures[0]?.category).toBe("validation_error");
    expect(deps.runControl.failures[0]?.retryable).toBe(false);
    // No placement bundle written.
    expect(deps.artifacts.records.some((r) => r.stepKey === "generation")).toBe(false);
  });

  it("rejects finalPackage.planningNumber != claim.planningNumber", async () => {
    const deps = buildDeps({
      runControl: fakeRunControl({ ...defaultClaim(), planningNumber: 4 }),
    });
    const pkg = buildFinalPackage({ planningNumber: 5 });
    const res = await runPipeline(
      { projectKey: TEST_PROJECT_KEY, finalPackage: pkg },
      deps,
    );
    expect(res.disposition).toBe("failed");
    expect(deps.runControl.failures[0]?.retryable).toBe(false);
  });
});

describe("runner: resumability", () => {
  it("second invocation with the same artifact store re-uses artifacts (zero duplicates)", async () => {
    const store = fakeArtifactStore();
    const depsA = buildDeps({ artifacts: store });
    const a = await runPipeline(
      { projectKey: TEST_PROJECT_KEY, finalPackage: buildFinalPackage() },
      depsA,
    );
    expect(a.disposition).toBe("placement_ready");
    const snapshot = store.records.map((r) => ({ step: r.stepKey, hash: r.contentHash }));
    expect(snapshot.length).toBe(6);

    // Second run against the same store — no new artifacts because
    // hasValidArtifact() short-circuits every emit.
    const depsB = buildDeps({ artifacts: store });
    const b = await runPipeline(
      { projectKey: TEST_PROJECT_KEY, finalPackage: buildFinalPackage() },
      depsB,
    );
    expect(b.disposition).toBe("placement_ready");
    expect(store.records.length).toBe(6);
    for (const r of store.records) {
      const before = snapshot.find((s) => s.step === r.stepKey);
      expect(r.contentHash).toBe(before!.hash);
    }
  });
});

describe("runner: server-only boundary", () => {
  it("barrel does not embed secret env vars", async () => {
    const mod = await import("@/lib/publications/runner");
    const src = JSON.stringify(mod, Object.getOwnPropertyNames(mod));
    expect(src).not.toMatch(/SUPABASE_SERVICE_ROLE_KEY/);
    expect(src).not.toMatch(/LOVABLE_API_KEY/);
  });
});
