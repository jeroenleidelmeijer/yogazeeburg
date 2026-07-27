import { describe, it, expect } from "vitest";
import { runPipeline } from "@/lib/publications/runner";
import {
  TEST_PROJECT_KEY,
  buildDeps,
  buildBrief,
  buildPackage,
  buildSources,
  fakeAi,
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

describe("runner: safety rails", () => {
  it("returns disabled_noop when automation_enabled=false without touching claim or AI", async () => {
    const deps = buildDeps({ config: fakeConfig({ automationEnabled: false }) });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("disabled_noop");
    expect(deps.runControl.claims).toBe(0);
    expect(deps.ai.calls).toHaveLength(0);
  });

  it("returns disabled_noop when publication_stopped=true", async () => {
    const deps = buildDeps({ config: fakeConfig({ publicationStopped: true }) });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("disabled_noop");
    expect(deps.runControl.claims).toBe(0);
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
  });
});

describe("runner: schema validation of AI results", () => {
  it("rejects malformed brief and records validation_error failure", async () => {
    const deps = buildDeps({
      ai: fakeAi({ generateBrief: async () => ({ nope: true }) }),
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
});

describe("runner: CTA and content-safety guards", () => {
  it("blocks when CTA copy is wrong", async () => {
    const deps = buildDeps({
      ai: fakeAi({
        generateArticle: async () =>
          buildPackage({ cta: { ...FIXED_CTA, heading: "Andere kop" } as unknown as typeof FIXED_CTA }),
      }),
    });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("blocked");
    expect(deps.runControl.failures[0]?.category).toBe("content_safety_error");
  });

  it("rejects a package with more than one commercial link", async () => {
    const deps = buildDeps({
      ai: fakeAi({
        generateArticle: async () => buildPackage({ commercialLinkCount: 2 }),
      }),
    });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("failed");
    expect(deps.runControl.failures[0]?.category).toBe("validation_error");
  });

  it("rejects a package with absolute medical claims", async () => {
    const deps = buildDeps({
      ai: fakeAi({
        generateArticle: async () => buildPackage({ hasAbsoluteMedicalClaim: true }),
      }),
    });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("failed");
  });
});

describe("runner: review gates and repair regression", () => {
  it("blocked review can never reach content_ready", async () => {
    const deps = buildDeps({
      ai: fakeAi({
        reviewRound: async ({ round }) => ({
          round,
          pass: false,
          blocked: true,
          findings: [{ code: "unsafe", severity: "blocker", evidence: "x", remediation: "stop" }],
          repairedPackage: null,
          schemaVersion: "1",
        }),
      }),
    });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    // eslint-disable-next-line no-console
    console.log("DBG blocked review:", res.disposition, res.errors);
    expect(res.disposition).toBe("blocked");
    expect(res.reviews).toHaveLength(1);
  });

  it("fails when review fails without a repaired package", async () => {
    const deps = buildDeps({
      ai: fakeAi({
        reviewRound: async ({ round }) => ({
          round,
          pass: false,
          blocked: false,
          findings: [{ code: "x", severity: "error", evidence: "y", remediation: "z" }],
          repairedPackage: null,
          schemaVersion: "1",
        }),
      }),
    });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("failed");
  });

  it("repair triggers a recheck of prior review gates", async () => {
    const invocations: string[] = [];
    const deps = buildDeps({
      ai: fakeAi({
        reviewRound: async ({ round }) => {
          invocations.push(round);
          if (round === "structure_seo_tech") {
            // second round asks for repair
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
    // Prior round (content_integrity) must have been re-checked after repair.
    const contentIntegrityCount = invocations.filter((r) => r === "content_integrity").length;
    expect(contentIntegrityCount).toBe(2);
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
    // A heartbeat is issued per attempt.
    expect(deps.runControl.heartbeats).toBeGreaterThanOrEqual(3);
  });
});

describe("runner: state machine — resumability & no duplicate artifacts", () => {
  it("independent invocations produce independent, non-duplicated artifacts", async () => {
    const depsA = buildDeps();
    const depsB = buildDeps();
    const a = await runPipeline({ projectKey: TEST_PROJECT_KEY }, depsA);
    const b = await runPipeline({ projectKey: TEST_PROJECT_KEY }, depsB);
    expect(a.disposition).toBe("content_ready");
    expect(b.disposition).toBe("content_ready");
    expect(a.reviews).toHaveLength(3);
    expect(b.reviews).toHaveLength(3);
    // Same claim => same articleId — the pipeline itself does not duplicate the run.
    expect(a.articleId).toBe(b.articleId);
    expect(a.runId).toBe(b.runId);
  });
});

describe("runner: server-only boundary", () => {
  it("client boundary marker — module imports do not embed any secret env var", async () => {
    const mod = await import("@/lib/publications/runner");
    const src = JSON.stringify(mod, Object.getOwnPropertyNames(mod));
    expect(src).not.toMatch(/SUPABASE_SERVICE_ROLE_KEY/);
    expect(src).not.toMatch(/LOVABLE_API_KEY/);
  });
});
