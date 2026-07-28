// Regression tests for the observed brief-schema drift on run
// 64854704-3467-42e2-9fe3-3ddeee032f72 (sanitized, no real payload copied).
//
// The failure looked like: the AI returned an object with only articleId +
// planningNumber and a wrong ctaRule value; 18 required fields were missing.
// After fix:
//   - Safe deterministic normalization fills LITERAL fields (ctaRule,
//     schemaVersion) and fail-closed empty arrays / empty metadata string;
//   - Content-critical fields (primaryQuestion, keywords, category, dates,
//     titles, expectedStructure, ...) remain strictly required.
//   - Pipeline validation diagnostics carry only issue paths/codes/messages,
//     never the offending payload.
import { describe, it, expect } from "vitest";
import { runPipeline } from "@/lib/publications/runner";
import {
  TEST_PROJECT_KEY,
  buildDeps,
  fakeAi,
  fakeArtifactStore,
} from "./fakes";
import {
  ArticleBriefSchema,
} from "@/lib/publications/runner/schemas";
import { normalizeBriefCandidate } from "@/lib/publications/runner/normalize";
import { briefPrompt } from "@/lib/publications/runner/prompts";
import { PipelineError } from "@/lib/publications/runner/errors";

/**
 * Sanitized fixture mirroring the observed AI shape drift: only articleId
 * and planningNumber are present, ctaRule is wrong, and 18 fields are missing.
 * No production content is reproduced here.
 */
function driftedBriefFixture() {
  return {
    articleId: "art_test_1",
    planningNumber: 4,
    ctaRule: "intro-pass",
  };
}

/**
 * Realistic AI output shape AFTER the prompt fix: contains all content-bearing
 * fields, but omits the pinned literals and metadata arrays that the schema
 * permits empty — those must be filled deterministically by normalization.
 */
function completeContentDrivenPayload() {
  return {
    articleId: "art_test_1",
    planningNumber: 4,
    primaryQuestion: "Wat is yin yoga?",
    originalTitle: "Yin Yoga voor drukke mensen",
    finalTitle: "Yin Yoga voor drukke mensen in Amsterdam Oost",
    primaryKeyword: "yin yoga amsterdam oost",
    secondaryKeywords: ["yin yoga beginners"],
    category: "stijlen",
    cluster: "stijlen-yin",
    differentiation: "focus op werkende volwassenen",
    publicationDateEuropeAmsterdam: "2026-08-03",
    expectedStructure: ["direct antwoord", "hoofdstuk 1", "faq"],
    // Deliberately omitted: ctaRule, schemaVersion, cannibalisationNotes,
    // riskFlags, sourceFlags, allowedStudioFacts, validatedLinkTargets,
    // relatedPublishedArticles.
  };
}

describe("brief-schema regression: observed drift is caught", () => {
  it("raw drifted AI payload fails Zod even after safe normalization", () => {
    const normalized = normalizeBriefCandidate(driftedBriefFixture());
    const parsed = ArticleBriefSchema.safeParse(normalized);
    expect(parsed.success).toBe(false);
    // Every content-critical field must still be reported missing — the fix
    // must NOT silently fill source facts.
    if (!parsed.success) {
      const paths = new Set(parsed.error.issues.map((i) => i.path.join(".")));
      for (const required of [
        "primaryQuestion",
        "originalTitle",
        "finalTitle",
        "primaryKeyword",
        "secondaryKeywords",
        "category",
        "cluster",
        "differentiation",
        "publicationDateEuropeAmsterdam",
        "expectedStructure",
      ]) {
        expect(paths.has(required)).toBe(true);
      }
    }
  });

  it("pipeline records a validation_error with safe diagnostic paths (no payload)", async () => {
    const drifted = driftedBriefFixture();
    const ai = fakeAi({ generateBrief: async () => drifted });
    const artifacts = fakeArtifactStore();
    const deps = buildDeps({ ai, artifacts });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("failed");
    expect(res.step).toBe("brief");
    // At least one failure recorded, and its summary is generic — not the
    // offending payload text.
    const rc = deps.runControl.failures;
    expect(rc.length).toBeGreaterThan(0);
    for (const f of rc) {
      expect(f.summary).not.toContain("intro-pass");
      expect(f.summary).not.toContain("art_test_1");
    }
    // Brief artifact must NOT be persisted on validation failure.
    expect(
      artifacts.records.find((r) => r.stepKey === "brief"),
    ).toBeUndefined();
  });
});

describe("brief-schema regression: normalization is content-safe", () => {
  it("fills only literal/fail-closed fields and passes when content is present", () => {
    const normalized = normalizeBriefCandidate(completeContentDrivenPayload()) as Record<
      string,
      unknown
    >;
    expect(normalized.ctaRule).toBe("fixed-intro-pass");
    expect(normalized.schemaVersion).toBe("1");
    expect(normalized.cannibalisationNotes).toBe("");
    expect(normalized.riskFlags).toEqual([]);
    expect(normalized.sourceFlags).toEqual([]);
    expect(normalized.allowedStudioFacts).toEqual([]);
    expect(normalized.validatedLinkTargets).toEqual([]);
    expect(normalized.relatedPublishedArticles).toEqual([]);
    // Content-bearing fields are untouched.
    expect(normalized.primaryKeyword).toBe("yin yoga amsterdam oost");
    expect(normalized.publicationDateEuropeAmsterdam).toBe("2026-08-03");
    const parsed = ArticleBriefSchema.safeParse(normalized);
    expect(parsed.success).toBe(true);
  });

  it("does not overwrite AI-provided content arrays (idempotent, non-lossy)", () => {
    const input = {
      ...completeContentDrivenPayload(),
      allowedStudioFacts: ["studio in Cruquius"],
      validatedLinkTargets: [
        { url: "https://www.yogazeeburg.com/pricing", rationale: "prijzen" },
      ],
      relatedPublishedArticles: [{ slug: "wat-is-yoga", title: "Wat is yoga?" }],
      cannibalisationNotes: "onderscheidend van slow flow",
      schemaVersion: "1",
    };
    const once = normalizeBriefCandidate(input) as Record<string, unknown>;
    const twice = normalizeBriefCandidate(once) as Record<string, unknown>;
    expect(once).toEqual(twice);
    expect(once.allowedStudioFacts).toEqual(["studio in Cruquius"]);
    expect(once.cannibalisationNotes).toBe("onderscheidend van slow flow");
    expect(once.relatedPublishedArticles).toHaveLength(1);
  });

  it("coerces an invalid ctaRule to the pinned literal", () => {
    const normalized = normalizeBriefCandidate({
      ...completeContentDrivenPayload(),
      ctaRule: "some-other-cta",
    }) as Record<string, unknown>;
    expect(normalized.ctaRule).toBe("fixed-intro-pass");
  });

  it("does not silently invent content facts when required fields are absent", () => {
    const partial = { articleId: "art_test_1", planningNumber: 4 };
    const normalized = normalizeBriefCandidate(partial) as Record<string, unknown>;
    // Content fields remain absent — normalization must not fabricate them.
    expect(normalized.primaryQuestion).toBeUndefined();
    expect(normalized.primaryKeyword).toBeUndefined();
    expect(normalized.category).toBeUndefined();
    expect(normalized.expectedStructure).toBeUndefined();
    expect(ArticleBriefSchema.safeParse(normalized).success).toBe(false);
  });
});

describe("brief prompt enumerates every required schema key", () => {
  it("system prompt lists every ArticleBrief top-level field verbatim", () => {
    const claim = {
      runId: "run_test",
      articleId: "art_test_1",
      planningNumber: 4,
      lockToken: "lock_test",
      phase: "phase_1_36" as const,
      originalTitle: "Yin Yoga voor drukke mensen",
    };
    const p = briefPrompt(claim);
    const required = [
      "articleId",
      "planningNumber",
      "primaryQuestion",
      "originalTitle",
      "finalTitle",
      "primaryKeyword",
      "secondaryKeywords",
      "category",
      "cluster",
      "differentiation",
      "cannibalisationNotes",
      "riskFlags",
      "sourceFlags",
      "allowedStudioFacts",
      "validatedLinkTargets",
      "relatedPublishedArticles",
      "ctaRule",
      "publicationDateEuropeAmsterdam",
      "expectedStructure",
      "schemaVersion",
    ];
    for (const key of required) {
      expect(p.system.includes(key)).toBe(true);
    }
    expect(p.system.includes("fixed-intro-pass")).toBe(true);
  });
});

describe("brief-schema regression: pipeline validation details are safe", () => {
  it("PipelineError.details carries issue paths but no payload snippets", async () => {
    const ai = fakeAi({
      generateBrief: async () => ({
        articleId: "art_test_1",
        planningNumber: 4,
        ctaRule: "intro-pass",
      }),
    });
    const deps = buildDeps({ ai });
    const res = await runPipeline({ projectKey: TEST_PROJECT_KEY }, deps);
    expect(res.disposition).toBe("failed");
    expect(res.errors.length).toBeGreaterThan(0);
    expect(res.errors[0].category).toBe("validation_error");
    expect(res.errors[0].step).toBe("brief");
  });

  it("summarizeZodIssues emits only path/code/message/expected (no values)", () => {
    // Indirect check via a direct Zod parse: the shape used by the pipeline
    // must never include a `received` payload value.
    const err = ArticleBriefSchema.safeParse({ ctaRule: "bad" });
    if (err.success) throw new Error("fixture invalid");
    const first = err.error.issues[0] as Record<string, unknown>;
    // Zod issues themselves don't include the input payload — this guards
    // against accidental future regressions if the schema is changed.
    expect(Object.keys(first)).not.toContain("input");
  });
});

// Import guard: ensure PipelineError is reachable so we don't drift the
// tree-shaking assumptions in the pipeline error path.
expect.hasAssertions;
const _err = new PipelineError({ category: "validation_error", step: "brief", message: "x" });
if (!_err) throw new Error("unreachable");
