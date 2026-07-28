// Fake providers & fixture builders for runner tests. Fully in-memory —
// no real network, no Supabase calls. Production article rows are never
// touched.
//
// Post-rolverdeling (July 2026): the runner accepts a FinalArticlePackage
// as its authoritative content input. The legacy `AiProviders` fake and
// the `buildBrief` / `buildSources` / `buildPackage` / `passingReview`
// helpers are RETAINED because legacy tests (placement.test.ts,
// entrypoint.test.ts, adapters.test.ts) still need them to exercise the
// artifact-shape contract that placement-entrypoint.server.ts enforces.
// The active pipeline never invokes `AiProviders`.

import type {
  AiProviders,
  ArtifactRecord,
  ArtifactStore,
  ClaimedRun,
  ConfigProvider,
  ProjectConfig,
  RunControl,
  RunnerDeps,
} from "@/lib/publications/runner/providers";
import { FIXED_CTA } from "@/lib/publications/runner/cta";
import type {
  ArticleBrief,
  GeneratedArticlePackage,
  ReviewOutput,
  ReviewRoundKind,
  ValidatedSourcePack,
} from "@/lib/publications/runner/schemas";
import {
  AUTHORED_BY_EXTERNAL,
  type FinalArticlePackage,
} from "@/lib/publications/runner/final-package";
import { packageContentHash } from "@/lib/publications/runner/hash";

export const TEST_PROJECT_KEY = "TEST-runner";

// --------------------------------------------------------------------------
// FinalArticlePackage — authoritative fixture builder for the new pipeline.
// --------------------------------------------------------------------------

export function buildFinalPackage(
  over: Partial<FinalArticlePackage> = {},
): FinalArticlePackage {
  const pkg: FinalArticlePackage = {
    authoredBy: AUTHORED_BY_EXTERNAL,
    authoredAt: "2026-08-03T09:00:00.000Z",
    articleId: "art_test_1",
    planningNumber: 4,
    slug: "yin-yoga-drukke-mensen-amsterdam-oost",
    title: "Yin Yoga voor drukke mensen in Amsterdam Oost",
    h1: "Yin yoga voor drukke mensen",
    seoTitle: "Yin Yoga voor drukke mensen — Yoga Zeeburg",
    metaDescription:
      "Rustige yin yoga in Amsterdam Oost voor werkende volwassenen die stress willen loslaten. Beginners welkom.",
    category: { slug: "stijlen", title: "Stijlen" },
    type: "explainer",
    pillar: false,
    readingTimeMin: 6,
    publishedAt: "2026-08-03",
    updatedAt: "2026-08-03",
    directAnswer:
      "Yin yoga is een rustige stijl waarin je houdingen langer vasthoudt, ideaal voor drukke mensen.",
    intro:
      "Een rustige stijl waarin je houdingen langer vasthoudt en het lichaam tijd geeft om te ontladen.",
    bodyMarkdown:
      "# Yin yoga\n\nEen rustige stijl waarin je houdingen langer vasthoudt. ".repeat(20),
    toc: [{ id: "intro", label: "Introductie" }],
    faqs: [{ question: "Voor wie is yin yoga?", answer: "Iedereen die wil onthaasten." }],
    sources: [{ title: "Yoga Zeeburg tarieven", url: "https://www.yogazeeburg.com/pricing" }],
    internalLinks: [{ slug: "wat-is-yoga", anchor: "wat is yoga" }],
    template: { showTOC: true, showFAQ: true, showSources: true, showRelated: true },
    cta: { ...FIXED_CTA },
    tags: ["yin", "beginners"],
    primaryKeyword: "yin yoga amsterdam oost",
    audiences: ["werkende volwassenen"],
    seoIntents: ["primary-keyword-in-title"],
    geoIntents: ["mentions-amsterdam-oost"],
    structuredDataIntents: ["FAQPage"],
    commercialLinkCount: 1,
    hasAbsoluteMedicalClaim: false,
    schemaVersion: "1",
    contentHash: "placeholder-runner-recomputes",
    ...over,
  };
  return pkg;
}

// --------------------------------------------------------------------------
// Legacy builders — kept for placement-layer tests only.
// --------------------------------------------------------------------------

export function buildBrief(over: Partial<ArticleBrief> = {}): ArticleBrief {
  return {
    articleId: "art_test_1",
    planningNumber: 4,
    primaryQuestion: "Wat is yin yoga?",
    originalTitle: "Yin Yoga voor drukke mensen",
    finalTitle: "Yin Yoga voor drukke mensen in Amsterdam Oost",
    primaryKeyword: "yin yoga amsterdam oost",
    secondaryKeywords: ["yin yoga beginners", "yoga voor stress"],
    category: "stijlen",
    cluster: "stijlen-yin",
    differentiation: "focus op werkende volwassenen; geen fitness-hype",
    cannibalisationNotes: "onderscheidend van slow flow artikel",
    riskFlags: [],
    sourceFlags: [],
    allowedStudioFacts: ["studio in Cruquius", "14-daagse intro pass 30 euro"],
    validatedLinkTargets: [
      { url: "https://www.yogazeeburg.com/pricing", rationale: "intro pass detailpagina" },
    ],
    relatedPublishedArticles: [{ slug: "wat-is-yoga", title: "Wat is yoga?" }],
    ctaRule: "fixed-intro-pass",
    publicationDateEuropeAmsterdam: "2026-08-03",
    expectedStructure: ["direct antwoord", "hoofdstuk 1", "faq"],
    schemaVersion: "1",
    ...over,
  };
}

export function buildSources(over: Partial<ValidatedSourcePack> = {}): ValidatedSourcePack {
  return {
    articleId: "art_test_1",
    firstPartyFacts: [
      {
        fact: "Intro pass kost 30 euro voor 14 dagen onbeperkt.",
        url: "https://www.yogazeeburg.com/pricing",
        capturedAt: "2026-07-27T09:00:00.000Z",
      },
    ],
    externalSources: [],
    claimSourceMap: [
      { claim: "Intro pass kost 30 euro.", supportingUrls: ["https://www.yogazeeburg.com/pricing"] },
    ],
    conflicts: [],
    missingSubstantiation: [],
    blocked: false,
    blockedReason: null,
    schemaVersion: "1",
    ...over,
  };
}

export function buildPackage(over: Partial<GeneratedArticlePackage> = {}): GeneratedArticlePackage {
  const base: GeneratedArticlePackage = {
    articleId: "art_test_1",
    finalTitle: "Yin Yoga voor drukke mensen in Amsterdam Oost",
    slug: "yin-yoga-drukke-mensen-amsterdam-oost",
    metaTitle: "Yin Yoga voor drukke mensen — Yoga Zeeburg",
    metaDescription:
      "Rustige yin yoga in Amsterdam Oost voor werkende volwassenen die stress willen loslaten. Beginners welkom.",
    directAnswer:
      "Yin yoga is een rustige stijl waarin je houdingen langer vasthoudt, ideaal voor drukke mensen.",
    bodyMarkdown:
      "# Yin yoga\n\nEen rustige stijl waarin je houdingen langer vasthoudt. ".repeat(20),
    commercialLinkCount: 1,
    hasAbsoluteMedicalClaim: false,
    faq: [{ question: "Voor wie is yin yoga?", answer: "Iedereen die wil onthaasten." }],
    internalLinks: [{ slug: "wat-is-yoga", anchor: "wat is yoga" }],
    seoIntents: ["primary-keyword-in-title"],
    geoIntents: ["mentions-amsterdam-oost"],
    structuredDataIntents: ["FAQPage"],
    cta: { ...FIXED_CTA },
    language: "nl",
    contentHash: "placeholder",
    promptVersion: "runner.v1",
    schemaVersion: "1",
    ...over,
  };
  // Placement-entrypoint verifies pkg.contentHash === packageContentHash(pkg with empty hash).
  base.contentHash = packageContentHash({ ...base, contentHash: "" } as unknown as Record<string, unknown>);
  return base;
}

export function passingReview(round: ReviewRoundKind): ReviewOutput {
  return {
    round,
    pass: true,
    blocked: false,
    findings: [],
    repairedPackage: null,
    schemaVersion: "1",
  };
}

// --------------------------------------------------------------------------
// Provider fakes.
// --------------------------------------------------------------------------

export interface FakeConfig extends ConfigProvider {
  cfg: ProjectConfig;
}
export function fakeConfig(over: Partial<ProjectConfig> = {}): FakeConfig {
  const cfg: ProjectConfig = {
    projectId: "proj_test",
    projectKey: TEST_PROJECT_KEY,
    automationEnabled: true,
    publicationStopped: false,
    timezone: "Europe/Amsterdam",
    ...over,
  };
  return { cfg, loadProjectConfig: async () => cfg };
}

export interface RunControlSpy extends RunControl {
  claims: number;
  heartbeats: number;
  advances: Array<{ stepKey: string; fromStatus: string; toStatus: string }>;
  failures: Array<{ category: string; summary: string; stepKey: string; retryable: boolean }>;
  claim_out: ClaimedRun | null;
}
export function fakeRunControl(claim: ClaimedRun | null = defaultClaim()): RunControlSpy {
  const spy: RunControlSpy = {
    claims: 0,
    heartbeats: 0,
    advances: [],
    failures: [],
    claim_out: claim,
    async claim() {
      spy.claims += 1;
      return spy.claim_out;
    },
    async heartbeat() {
      spy.heartbeats += 1;
    },
    async advance(input) {
      spy.advances.push({
        stepKey: input.stepKey,
        fromStatus: input.fromStatus,
        toStatus: input.toStatus,
      });
    },
    async recordFailure(input) {
      spy.failures.push({
        category: input.category,
        summary: input.summary,
        stepKey: input.stepKey,
        retryable: input.retryable,
      });
    },
  };
  return spy;
}

export function defaultClaim(): ClaimedRun {
  return {
    runId: "run_test",
    articleId: "art_test_1",
    planningNumber: 4,
    lockToken: "lock_test",
    phase: "phase_1_36",
    originalTitle: "Yin Yoga voor drukke mensen",
  };
}

// Legacy AiProviders fake — retained for placement-layer / adapters tests
// that assert nothing calls it. The active pipeline never touches it.
export interface AiSpy extends AiProviders {
  calls: string[];
}
export function fakeAi(over: Partial<AiProviders> = {}): AiSpy {
  const calls: string[] = [];
  const spy: AiSpy = {
    calls,
    async generateBrief(input) {
      calls.push("brief");
      if (over.generateBrief) return over.generateBrief(input);
      return buildBrief();
    },
    async validateSources(input) {
      calls.push("sources");
      if (over.validateSources) return over.validateSources(input);
      return buildSources();
    },
    async generateArticle(input) {
      calls.push("generate");
      if (over.generateArticle) return over.generateArticle(input);
      return buildPackage();
    },
    async reviewRound(input) {
      calls.push(`review:${input.round}`);
      if (over.reviewRound) return over.reviewRound(input);
      return passingReview(input.round);
    },
  };
  return spy;
}

export interface ArtifactStoreSpy extends ArtifactStore {
  records: ArtifactRecord[];
  upserts: number;
  lists: number;
}
export function fakeArtifactStore(seed: ArtifactRecord[] = []): ArtifactStoreSpy {
  const records: ArtifactRecord[] = [...seed];
  const spy: ArtifactStoreSpy = {
    records,
    upserts: 0,
    lists: 0,
    async list() {
      spy.lists += 1;
      return records.slice();
    },
    async upsert(input) {
      spy.upserts += 1;
      const idx = records.findIndex((r) => r.stepKey === input.stepKey);
      const rec: ArtifactRecord = {
        stepKey: input.stepKey,
        schemaVersion: input.schemaVersion,
        promptVersion: input.promptVersion,
        contentHash: input.contentHash,
        payload: input.payload,
      };
      if (idx >= 0) records[idx] = rec;
      else records.push(rec);
    },
  };
  return spy;
}

export function buildDeps(over: Partial<RunnerDeps> = {}): RunnerDeps & {
  config: FakeConfig;
  runControl: RunControlSpy;
  artifacts: ArtifactStoreSpy;
} {
  const config = (over.config as FakeConfig) ?? fakeConfig();
  const runControl = (over.runControl as RunControlSpy) ?? fakeRunControl();
  const artifacts = (over.artifacts as ArtifactStoreSpy) ?? fakeArtifactStore();
  return {
    config,
    runControl,
    artifacts,
    now: over.now ?? (() => new Date("2026-08-03T09:00:00Z")),
    heartbeatIntervalMs: over.heartbeatIntervalMs ?? 60_000,
    promptVersion: over.promptVersion ?? "external.chatgpt-v1",
    schemaVersion: over.schemaVersion ?? "1",
    maxRepairCycles: over.maxRepairCycles ?? 3,
  };
}
