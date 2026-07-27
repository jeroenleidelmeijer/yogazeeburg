import { describe, it, expect } from "vitest";
import { runPipeline } from "@/lib/publications/runner";
import {
  TEST_PROJECT_KEY,
  buildDeps,
  buildBrief,
  buildPackage,
  buildSources,
  fakeAi,
  fakeArtifactStore,
  fakeConfig,
  fakeRunControl,
  passingReview,
} from "./fakes";
import {
  ArticleBriefSchema,
  ValidatedSourcePackSchema,
  REVIEW_ORDER,
} from "@/lib/publications/runner/schemas";
import { FIXED_CTA } from "@/lib/publications/runner/cta";
import { packageContentHash } from "@/lib/publications/runner/hash";

describe("runner: safety rails", () => {
  it("returns disabled_noop when automation_enabled=false without touching claim, AI, or artifacts", async () => {
    const deps = buildDeps({ config: fakeConfig({ automationEnabled: false }) });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("disabled_noop");
    expect(deps.runControl.claims).toBe(0);
    expect(deps.ai.calls).toHaveLength(0);
    expect(deps.artifacts.upserts).toBe(0);
    expect(deps.artifacts.lists).toBe(0);
  });

  it("returns disabled_noop when publication_stopped=true", async () => {
    const deps = buildDeps({ config: fakeConfig({ publicationStopped: true }) });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("disabled_noop");
    expect(deps.runControl.claims).toBe(0);
    expect(deps.ai.calls).toHaveLength(0);
    expect(deps.artifacts.upserts).toBe(0);
  });

  it("returns claim_noop when nothing is claimable", async () => {
    const deps = buildDeps({ runControl: fakeRunControl(null) });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("claim_noop");
    expect(deps.ai.calls).toHaveLength(0);
  });
});

describe("runner: happy path", () => {
  it("runs exactly three review rounds in fixed order and reaches content_ready", async () => {
    const deps = buildDeps();
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("content_ready");
    expect(res.step).toBe("content_ready");
    expect(res.reviews).toHaveLength(3);
    expect(res.reviews.map((r) => r.round)).toEqual(REVIEW_ORDER);
    expect(deps.runControl.heartbeats).toBeGreaterThan(0);
    // Every step artifact + content_ready evidence persisted.
    const stepKeys = deps.artifacts.records.map((r) => r.stepKey).sort();
    expect(stepKeys).toContain("brief");
    expect(stepKeys).toContain("source_validation");
    expect(stepKeys).toContain("generation");
    expect(stepKeys).toContain("review_1");
    expect(stepKeys).toContain("review_2");
    expect(stepKeys).toContain("review_3");
    expect(stepKeys).toContain("content_ready");
    // advance was called on the brief transition.
    expect(deps.runControl.advances.some((a) => a.stepKey === "brief")).toBe(true);
  });

  it("overrides AI-supplied contentHash with the runner's deterministic hash", async () => {
    const deps = buildDeps({
      ai: fakeAi({
        generateArticle: async () =>
          buildPackage({ contentHash: "attacker-supplied-value" }),
      }),
    });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("content_ready");
    const expectedHash = packageContentHash({ ...buildPackage(), contentHash: undefined } as Record<string, unknown>);
    expect(res.pkg!.contentHash).toBe(expectedHash);
    expect(res.pkg!.contentHash).not.toBe("attacker-supplied-value");
  });
});

describe("runner: schema + invariants", () => {
  it("rejects malformed brief and retries up to 3 times before recording validation_error", async () => {
    let attempts = 0;
    const deps = buildDeps({
      ai: fakeAi({
        generateBrief: async () => {
          attempts += 1;
          return { nope: true };
        },
      }),
    });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("failed");
    expect(attempts).toBe(3);
    expect(res.attempts.brief).toBe(3);
    expect(deps.runControl.failures[0]?.category).toBe("validation_error");
  });

  it("rejects mismatched articleId between claim and brief", async () => {
    const deps = buildDeps({
      ai: fakeAi({ generateBrief: async () => buildBrief({ articleId: "wrong_id" }) }),
    });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("failed");
    expect(deps.runControl.failures[0]?.category).toBe("validation_error");
    expect(deps.runControl.failures[0]?.retryable).toBe(false);
  });

  it("rejects source pack with mismatched articleId", async () => {
    const deps = buildDeps({
      ai: fakeAi({ validateSources: async () => buildSources({ articleId: "other" }) }),
    });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("failed");
    expect(deps.runControl.failures[0]?.category).toBe("validation_error");
  });

  it("blocks when sources are marked blocked (source_conflict, non-retryable)", async () => {
    const deps = buildDeps({
      ai: fakeAi({
        validateSources: async () => buildSources({ blocked: true, blockedReason: "prijs onbekend" }),
      }),
    });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("failed");
    expect(deps.runControl.failures[0]?.category).toBe("source_conflict");
  });

  it("brief and source pack contain their required fields (schema smoke)", () => {
    expect(ArticleBriefSchema.safeParse(buildBrief()).success).toBe(true);
    expect(ValidatedSourcePackSchema.safeParse(buildSources()).success).toBe(true);
  });

  it("blocks internal links that don't resolve to brief.relatedPublishedArticles", async () => {
    const deps = buildDeps({
      ai: fakeAi({
        generateArticle: async () =>
          buildPackage({ internalLinks: [{ slug: "not-in-brief", anchor: "hallucination" }] }),
      }),
    });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("blocked");
  });
});

describe("runner: CTA and content-safety guards", () => {
  it("rejects a package whose CTA copy deviates from the fixed CTA", async () => {
    const deps = buildDeps({
      ai: fakeAi({
        generateArticle: async () =>
          buildPackage({ cta: { ...FIXED_CTA, heading: "Andere kop" } as unknown as typeof FIXED_CTA }),
      }),
    });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).not.toBe("content_ready");
    expect(deps.runControl.failures[0]?.stepKey).toBe("generation");
  });

  it("rejects a package with more than one commercial link", async () => {
    const deps = buildDeps({
      ai: fakeAi({ generateArticle: async () => buildPackage({ commercialLinkCount: 2 }) }),
    });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("failed");
  });

  it("rejects a package with absolute medical claims", async () => {
    const deps = buildDeps({
      ai: fakeAi({ generateArticle: async () => buildPackage({ hasAbsoluteMedicalClaim: true }) }),
    });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("failed");
  });
});

describe("runner: review gates, repair and cycle limit", () => {
  it("blocked review can never reach content_ready", async () => {
    const deps = buildDeps({
      ai: fakeAi({
        reviewRound: async ({ round }) => ({
          round,
          pass: false,
          blocked: true,
          findings: [{ code: "unsafe", severity: "blocker", evidence: "xx", remediation: "stop" }],
          repairedPackage: null,
          schemaVersion: "1",
        }),
      }),
    });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("blocked");
    expect(res.reviews).toHaveLength(1);
  });

  it("repair restarts review sequence from round 1 and content_ready only when ALL three pass consecutively", async () => {
    const invocations: string[] = [];
    let repaired = false;
    const deps = buildDeps({
      ai: fakeAi({
        reviewRound: async ({ round }) => {
          invocations.push(round);
          if (round === "structure_seo_tech" && !repaired) {
            repaired = true;
            return {
              round,
              pass: false,
              blocked: false,
              findings: [{ code: "seo", severity: "error", evidence: "meta", remediation: "shorten" }],
              repairedPackage: buildPackage({ metaTitle: "Yin Yoga — Yoga Zeeburg" }),
              schemaVersion: "1",
            };
          }
          return passingReview(round);
        },
      }),
    });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("content_ready");
    expect(res.repairCycles).toBe(1);
    // After repair we restart from round 1 — content_integrity is invoked twice.
    expect(invocations.filter((r) => r === "content_integrity").length).toBe(2);
    // Every attempt is registered per review step.
    expect(res.attempts.review_1).toBeGreaterThanOrEqual(2);
  });

  it("repair cycle limit is enforced", async () => {
    const deps = buildDeps({
      maxRepairCycles: 2,
      ai: fakeAi({
        reviewRound: async ({ round }) => ({
          round,
          pass: false,
          blocked: false,
          findings: [{ code: "seo01", severity: "error", evidence: "ev", remediation: "fix" }],
          repairedPackage: buildPackage(),
          schemaVersion: "1",
        }),
      }),
    });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("failed");
    expect(res.repairCycles).toBe(2);
    expect(deps.runControl.failures[0]?.summary).toMatch(/repair cycle limit/);
  });
});

describe("runner: retries + heartbeat", () => {
  it("bounded retry: succeeds on third attempt of a flaky AI step", async () => {
    let attempts = 0;
    const deps = buildDeps({
      ai: fakeAi({
        generateBrief: async () => {
          attempts += 1;
          if (attempts < 3) throw new Error("flake");
          return buildBrief();
        },
      }),
    });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("content_ready");
    expect(attempts).toBe(3);
    expect(res.attempts.brief).toBe(3);
  });

  it("bounded retry: gives up after 3 attempts and records infrastructure_error", async () => {
    let attempts = 0;
    const deps = buildDeps({
      ai: fakeAi({
        generateBrief: async () => {
          attempts += 1;
          throw new Error("permanent flake");
        },
      }),
    });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("failed");
    expect(attempts).toBe(3);
    expect(deps.runControl.failures[0]?.category).toBe("infrastructure_error");
    expect(deps.runControl.heartbeats).toBeGreaterThanOrEqual(3);
  });
});

describe("runner: resumability with shared artifact store", () => {
  it("second invocation with the same artifact store produces zero duplicate artifacts and zero duplicate AI calls for completed steps", async () => {
    const store = fakeArtifactStore();
    const depsA = buildDeps({ artifacts: store });
    const a = await runPipeline({ projectKey: TEST_PROJECT_KEY }, depsA);
    expect(a.disposition).toBe("content_ready");

    // Snapshot artifact hashes and count. All 7 step artifacts present.
    const snapshot = store.records.map((r) => ({ step: r.stepKey, hash: r.contentHash }));
    expect(snapshot.length).toBe(7);
    const initialAiCalls = depsA.ai.calls.length;
    expect(initialAiCalls).toBeGreaterThan(0);

    // Second run reuses the same store. All AI providers throw — proving no
    // AI call happens when resumable artifacts already exist. Provide a
    // permissive fallback for the content_ready re-persist path (which does
    // not require AI but does require another list call).
    const depsB = buildDeps({
      artifacts: store,
      ai: fakeAi({
        generateBrief: async () => {
          throw new Error("MUST NOT CALL — resume path");
        },
        validateSources: async () => {
          throw new Error("MUST NOT CALL — resume path");
        },
        generateArticle: async () => {
          throw new Error("MUST NOT CALL — resume path");
        },
        reviewRound: async () => {
          throw new Error("MUST NOT CALL — resume path");
        },
      }),
    });
    const b = await runPipeline({ projectKey: TEST_PROJECT_KEY }, depsB);
    expect(b.disposition).toBe("content_ready");
    expect(b.resumedSteps).toEqual(
      expect.arrayContaining([
        "brief",
        "source_validation",
        "generation",
        "review_1",
        "review_2",
        "review_3",
      ]),
    );
    expect(depsB.ai.calls).toHaveLength(0);
    // Store size unchanged (idempotent upsert by (run_id, step_key)).
    expect(store.records.length).toBe(7);
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
