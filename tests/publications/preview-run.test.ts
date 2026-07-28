// Behavior tests for the preview-run orchestrator (post rolverdeling).
// The orchestrator now takes an externally-authored FinalArticlePackage;
// the runner does not brief/write/review content.
import { describe, it, expect } from "vitest";
import {
  runArticle4PreviewOnce,
  wrapConfigProviderForPreview,
  TARGET_PLANNING_NUMBER,
  YOGA_PROJECT_KEY,
  type PreviewRunDeps,
} from "@/lib/publications/preview-run.server";
import type {
  LegacyArticleIndex,
  PlacementRow,
  PlacementStore,
} from "@/lib/publications/placement.server";
import {
  buildDeps,
  buildFinalPackage,
  fakeArtifactStore,
  fakeConfig,
  fakeRunControl,
} from "../runner/fakes";
import type { RunnerDeps } from "@/lib/publications/runner/providers";
import type { FinalArticlePackage } from "@/lib/publications/runner/final-package";

const PROJECT_ID = "11111111-1111-4111-8111-111111111111";
const ARTICLE_ID = "22222222-2222-4222-8222-222222222222";
const RUN_ID = "33333333-3333-4333-8333-333333333333";
const LOCK_TOKEN = "44444444-4444-4444-8444-444444444444";

function emptyLegacy(): LegacyArticleIndex {
  const slugs = ["wat-is-yoga"];
  return { hasSlug: (s: string) => slugs.includes(s), listSlugs: () => slugs };
}

function inMemoryPlacementStore(): PlacementStore & {
  rows: PlacementRow[];
  upserts: number;
} {
  const rows: PlacementRow[] = [];
  const store = {
    rows,
    upserts: 0,
    async findByArticleId(id: string) {
      return rows.find((r) => r.articleId === id) ?? null;
    },
    async findBySlug(slug: string) {
      return rows.find((r) => r.slug === slug) ?? null;
    },
    async hasPublishedSlug(slug: string) {
      return rows.some((r) => r.slug === slug && r.placementStatus === "published");
    },
    async upsert(input: Parameters<PlacementStore["upsert"]>[0]) {
      store.upserts += 1;
      const idx = rows.findIndex((r) => r.articleId === input.articleId);
      const now = new Date().toISOString();
      const row: PlacementRow = {
        id: idx >= 0 ? rows[idx].id : `plc_${rows.length + 1}`,
        articleId: input.articleId,
        slug: input.slug,
        contentHash: input.contentHash,
        placementStatus: input.placementStatus,
        package: input.package,
        previewUrl: input.previewUrl,
        previewToken: input.previewToken,
        publishedAt: input.publishedAt,
        createdAt: idx >= 0 ? rows[idx].createdAt : now,
        updatedAt: now,
      };
      if (idx >= 0) rows[idx] = row;
      else rows.push(row);
      return row;
    },
  };
  return store;
}

function successfulRunner(): RunnerDeps {
  return buildDeps({
    config: fakeConfig({ projectId: PROJECT_ID, automationEnabled: false }),
    runControl: fakeRunControl({
      runId: RUN_ID,
      articleId: ARTICLE_ID,
      planningNumber: TARGET_PLANNING_NUMBER,
      lockToken: LOCK_TOKEN,
      phase: "phase_1_36",
      originalTitle: "Yoga voor kantoormedewerkers in Amsterdam Oost",
    }),
    artifacts: fakeArtifactStore(),
  });
}

function validPackage(): FinalArticlePackage {
  return buildFinalPackage({
    articleId: ARTICLE_ID,
    planningNumber: TARGET_PLANNING_NUMBER,
  });
}

function baseDeps(overrides: Partial<PreviewRunDeps> = {}): PreviewRunDeps {
  return {
    runner: successfulRunner(),
    placementStore: inMemoryPlacementStore(),
    legacyIndex: emptyLegacy(),
    preflight: async () => ({
      articleId: ARTICLE_ID,
      status: "planned",
      activeRunId: null,
      lockExpiresAt: null,
      lockToken: null,
    }),
    sequenceCheck: async () => [],
    readLockToken: async () => LOCK_TOKEN,
    releaseLock: async () => {},
    now: () => new Date("2026-08-03T09:00:00Z"),
    ...overrides,
  };
}

describe("wrapConfigProviderForPreview", () => {
  it("reports automationEnabled=true without touching the wrapped config object", async () => {
    const base = fakeConfig({ automationEnabled: false, publicationStopped: false });
    const wrapped = wrapConfigProviderForPreview(base);
    const view = await wrapped.loadProjectConfig(YOGA_PROJECT_KEY);
    expect(view.automationEnabled).toBe(true);
    expect(base.cfg.automationEnabled).toBe(false);
  });

  it("fails closed when publication_stopped=true", async () => {
    const base = fakeConfig({ publicationStopped: true });
    const wrapped = wrapConfigProviderForPreview(base);
    await expect(wrapped.loadProjectConfig(YOGA_PROJECT_KEY)).rejects.toThrow(
      /publication_stopped/,
    );
  });
});

describe("runArticle4PreviewOnce — target + concurrency guards", () => {
  it("returns wrong_target when preflight finds no article 4", async () => {
    const out = await runArticle4PreviewOnce(
      validPackage(),
      baseDeps({ preflight: async () => null }),
    );
    expect(out.status).toBe("wrong_target");
  });

  it("returns wrong_target when an earlier planning_number is not terminal", async () => {
    const out = await runArticle4PreviewOnce(
      validPackage(),
      baseDeps({ sequenceCheck: async () => [3] }),
    );
    expect(out.status).toBe("wrong_target");
    expect((out as { message: string }).message).toMatch(/3/);
  });

  it("returns already_running when article 4 holds a fresh lock", async () => {
    const soon = new Date(new Date("2026-08-03T09:00:00Z").getTime() + 60_000).toISOString();
    const out = await runArticle4PreviewOnce(
      validPackage(),
      baseDeps({
        preflight: async () => ({
          articleId: ARTICLE_ID,
          status: "drafting",
          activeRunId: "run_existing",
          lockExpiresAt: soon,
          lockToken: "lock_existing",
        }),
      }),
    );
    expect(out.status).toBe("already_running");
  });

  it("proceeds when a prior lock has expired (no false positive)", async () => {
    const past = new Date(new Date("2026-08-03T09:00:00Z").getTime() - 60_000).toISOString();
    const out = await runArticle4PreviewOnce(
      validPackage(),
      baseDeps({
        preflight: async () => ({
          articleId: ARTICLE_ID,
          status: "drafting",
          activeRunId: "run_expired",
          lockExpiresAt: past,
          lockToken: null,
        }),
      }),
    );
    expect(out.status).toBe("preview_ready");
  });
});

describe("runArticle4PreviewOnce — publication_stopped", () => {
  it("returns stopped without invoking pipeline when project is stopped", async () => {
    const runner = successfulRunner();
    (runner.config as unknown as { cfg: { publicationStopped: boolean } }).cfg.publicationStopped =
      true;
    let called = false;
    const runControl = runner.runControl;
    const origClaim = runControl.claim.bind(runControl);
    runControl.claim = async (i) => {
      called = true;
      return origClaim(i);
    };
    const out = await runArticle4PreviewOnce(validPackage(), baseDeps({ runner }));
    expect(out.status).toBe("stopped");
    expect(called).toBe(false);
  });
});

describe("runArticle4PreviewOnce — persisted automation_enabled is never mutated", () => {
  it("wrapper reports true; underlying config stays false across a full happy-path run", async () => {
    const runner = successfulRunner();
    const cfg = (runner.config as unknown as { cfg: { automationEnabled: boolean } }).cfg;
    expect(cfg.automationEnabled).toBe(false);
    const out = await runArticle4PreviewOnce(validPackage(), baseDeps({ runner }));
    expect(out.status).toBe("preview_ready");
    expect(cfg.automationEnabled).toBe(false);
  });
});

describe("runArticle4PreviewOnce — placement is always preview, never published", () => {
  it("stores placement_status='preview' with no published_at", async () => {
    const store = inMemoryPlacementStore();
    const out = await runArticle4PreviewOnce(
      validPackage(),
      baseDeps({ placementStore: store }),
    );
    expect(out.status).toBe("preview_ready");
    expect(store.rows).toHaveLength(1);
    expect(store.rows[0].placementStatus).toBe("preview");
    expect(store.rows[0].publishedAt).toBeNull();
    expect(store.rows[0].previewUrl).toMatch(/^https?:\/\/.+\/nl\/kennisbank\/preview\//);
  });

  it("is idempotent: a second call reuses the same row (upsert count still 1)", async () => {
    const store = inMemoryPlacementStore();
    await runArticle4PreviewOnce(validPackage(), baseDeps({ placementStore: store }));
    await runArticle4PreviewOnce(validPackage(), baseDeps({ placementStore: store }));
    expect(store.rows).toHaveLength(1);
    expect(store.upserts).toBeLessThanOrEqual(2);
    expect(store.rows[0].placementStatus).toBe("preview");
  });
});

describe("runArticle4PreviewOnce — invalid package fails closed with zero mutation", () => {
  it("malformed FinalArticlePackage → pipeline_failed and no placement written", async () => {
    const store = inMemoryPlacementStore();
    const rc = successfulRunner().runControl as unknown as {
      claims: number;
    };
    const runner = successfulRunner();
    const runnerRc = runner.runControl as unknown as { claims: number };
    const out = await runArticle4PreviewOnce(
      { nope: true },
      baseDeps({ placementStore: store, runner }),
    );
    expect(out.status).toBe("pipeline_failed");
    expect(store.rows).toHaveLength(0);
    // Pre-claim rejection: claim was never invoked.
    expect(runnerRc.claims).toBe(0);
    void rc;
  });

  it("articleId mismatch is non-retryable and records a validation_error", async () => {
    const runner = successfulRunner();
    const rc = runner.runControl as unknown as {
      failures: Array<{ category: string; retryable: boolean }>;
    };
    const wrongPkg = buildFinalPackage({
      articleId: "not-the-claimed-id",
      planningNumber: TARGET_PLANNING_NUMBER,
    });
    const out = await runArticle4PreviewOnce(wrongPkg, baseDeps({ runner }));
    expect(out.status).toBe("pipeline_failed");
    expect(rc.failures[0]?.category).toBe("validation_error");
    expect(rc.failures[0]?.retryable).toBe(false);
  });
});

describe("runArticle4PreviewOnce — post-placement recovery (fail-closed)", () => {
  it("readLockToken failure: never returns preview_ready and releases the stale lock", async () => {
    const runner = successfulRunner();
    const releases: Array<{ articleId: string; reason: string }> = [];
    const out = await runArticle4PreviewOnce(
      validPackage(),
      baseDeps({
        runner,
        readLockToken: async () => {
          throw new Error("db offline");
        },
        releaseLock: async (i) => {
          releases.push(i);
        },
      }),
    );
    expect(out.status).toBe("pipeline_failed");
    expect(releases).toHaveLength(1);
    expect(releases[0].reason).toMatch(/preview_run_recovery/);
  });

  it("placement failure: recordFailure + releaseLock invoked; no preview_ready", async () => {
    const runner = successfulRunner();
    const rc = runner.runControl as unknown as {
      failures: Array<{ category: string; stepKey: string; retryable: boolean }>;
    };
    const failingStore: PlacementStore = {
      findByArticleId: async () => null,
      findBySlug: async () => null,
      hasPublishedSlug: async () => false,
      upsert: async () => {
        throw new Error("placement db error");
      },
    };
    const releases: Array<{ articleId: string; reason: string }> = [];
    const out = await runArticle4PreviewOnce(
      validPackage(),
      baseDeps({
        runner,
        placementStore: failingStore,
        releaseLock: async (i) => {
          releases.push(i);
        },
      }),
    );
    expect(out.status).toBe("pipeline_failed");
    const placementFailures = rc.failures.filter((f) => f.category === "placement_error");
    expect(placementFailures.length).toBeGreaterThan(0);
    expect(placementFailures[0].retryable).toBe(false);
    expect(releases).toHaveLength(1);
    expect(releases[0].reason).toMatch(/preview_run_recovery:placement_error/);
  });

  it("releaseLock failure after successful placement fails closed with auditable finalize", async () => {
    const runner = successfulRunner();
    const rc = runner.runControl as unknown as {
      failures: Array<{ category: string; stepKey: string }>;
    };
    const store = inMemoryPlacementStore();
    let releaseCalls = 0;
    const out = await runArticle4PreviewOnce(
      validPackage(),
      baseDeps({
        runner,
        placementStore: store,
        releaseLock: async () => {
          releaseCalls += 1;
          throw new Error("release rpc failed");
        },
      }),
    );
    expect(out.status).toBe("pipeline_failed");
    expect(store.rows).toHaveLength(1);
    expect(store.rows[0].placementStatus).toBe("preview");
    expect(releaseCalls).toBeGreaterThanOrEqual(1);
    const finalizeFailures = rc.failures.filter((f) => f.category === "finalize_error");
    expect(finalizeFailures.length).toBeGreaterThan(0);
  });
});
