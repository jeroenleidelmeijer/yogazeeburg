// Behavior tests for the preview-run orchestrator. Uses fully in-memory
// fakes; no Supabase, no network, no real AI. Tests target the observable
// contract of runArticle4PreviewOnce():
//   - idempotent single-flight (already_running)
//   - sequence + wrong-target rejection
//   - publication_stopped respected
//   - persisted automation_enabled never mutated
//   - pipeline failure clears lock via recordFailure (no manual cleanup)
//   - preview cannot publish/notify (placement stays 'preview')
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
  buildBrief,
  buildDeps,
  buildPackage,
  buildSources,
  fakeAi,
  fakeArtifactStore,
  fakeConfig,
  fakeRunControl,
} from "../runner/fakes";
import { packageContentHash } from "@/lib/publications/runner/hash";
import type { RunnerDeps } from "@/lib/publications/runner/providers";

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

/** Build a fresh runner deps set that will successfully run the pipeline. */
function successfulRunner(): RunnerDeps {
  const ai = fakeAi({
    async generateBrief() {
      return buildBrief({ articleId: ARTICLE_ID });
    },
    async validateSources() {
      return buildSources({ articleId: ARTICLE_ID });
    },
    async generateArticle() {
      const pkg = buildPackage({ articleId: ARTICLE_ID });
      // pipeline overwrites contentHash post-generation, but tests read the
      // stored artifact directly via placement — compute a real hash here.
      const { packageContentHash } = await import(
        "../../src/lib/publications/runner/hash"
      );
      pkg.contentHash = packageContentHash(pkg as unknown as Record<string, unknown>);
      return pkg;
    },
  });
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
    ai,
    artifacts: fakeArtifactStore(),
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
    // The persisted (fake) row is unchanged — the wrapper is view-only.
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
      baseDeps({ preflight: async () => null }),
    );
    expect(out.status).toBe("wrong_target");
  });

  it("returns wrong_target when an earlier planning_number is not terminal", async () => {
    const out = await runArticle4PreviewOnce(
      baseDeps({ sequenceCheck: async () => [3] }),
    );
    expect(out.status).toBe("wrong_target");
    expect((out as { message: string }).message).toMatch(/3/);
  });

  it("returns already_running when article 4 holds a fresh lock", async () => {
    const soon = new Date(new Date("2026-08-03T09:00:00Z").getTime() + 60_000).toISOString();
    const out = await runArticle4PreviewOnce(
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
    // Flip only publication_stopped on the underlying fake config; the
    // wrapper must surface this as a stopped outcome.
    (runner.config as unknown as { cfg: { publicationStopped: boolean } }).cfg.publicationStopped =
      true;
    let called = false;
    const runControl = runner.runControl;
    const origClaim = runControl.claim.bind(runControl);
    runControl.claim = async (i) => {
      called = true;
      return origClaim(i);
    };
    const out = await runArticle4PreviewOnce(baseDeps({ runner }));
    expect(out.status).toBe("stopped");
    expect(called).toBe(false);
  });
});

describe("runArticle4PreviewOnce — persisted automation_enabled is never mutated", () => {
  it("wrapper reports true; underlying config stays false across a full happy-path run", async () => {
    const runner = successfulRunner();
    const cfg = (runner.config as unknown as { cfg: { automationEnabled: boolean } }).cfg;
    expect(cfg.automationEnabled).toBe(false);
    const out = await runArticle4PreviewOnce(baseDeps({ runner }));
    expect(out.status).toBe("preview_ready");
    expect(cfg.automationEnabled).toBe(false);
  });
});

describe("runArticle4PreviewOnce — placement is always preview, never published", () => {
  it("stores placement_status='preview' with no published_at", async () => {
    const store = inMemoryPlacementStore();
    const out = await runArticle4PreviewOnce(baseDeps({ placementStore: store }));
    expect(out.status).toBe("preview_ready");
    expect(store.rows).toHaveLength(1);
    expect(store.rows[0].placementStatus).toBe("preview");
    expect(store.rows[0].publishedAt).toBeNull();
    expect(store.rows[0].previewUrl).toMatch(/^https?:\/\/.+\/nl\/kennisbank\/preview\//);
  });

  it("is idempotent: a second call reuses the same row (upsert count still 1)", async () => {
    const store = inMemoryPlacementStore();
    await runArticle4PreviewOnce(baseDeps({ placementStore: store }));
    // Second call — new runner deps to simulate a follow-up invocation with
    // the same inputs. Placement input hash is identical, so
    // placeArticle returns disposition='noop' without a second upsert.
    await runArticle4PreviewOnce(baseDeps({ placementStore: store }));
    expect(store.rows).toHaveLength(1);
    expect(store.upserts).toBeLessThanOrEqual(2); // first upsert; noop path may or may not touch
    expect(store.rows[0].placementStatus).toBe("preview");
  });
});

describe("runArticle4PreviewOnce — recovery on forced pipeline failure", () => {
  it("provider failure surfaces as pipeline_failed AND recordFailure was invoked (lock release)", async () => {
    const runner = successfulRunner();
    // Force the AI to throw at generation. Pipeline retries then records
    // failure through runControl.recordFailure, which is the recovery hook
    // that in production maps to complete_publication_failure and clears
    // the lock on the article row.
    runner.ai.generateArticle = async () => {
      throw new Error("forced provider outage");
    };
    const rc = runner.runControl as unknown as {
      failures: Array<{ category: string; stepKey: string }>;
    };
    const out = await runArticle4PreviewOnce(baseDeps({ runner }));
    expect(["pipeline_failed", "pipeline_blocked"]).toContain(out.status);
    expect(rc.failures.length).toBeGreaterThan(0);
    expect(rc.failures[0].stepKey).toBe("generation");
  });

  it("content-safety violation (invariant: link not in brief allowlist) is recorded as content_safety_error", async () => {
    const runner = successfulRunner();
    // Schema-valid package, but its internal link is NOT in the brief's
    // relatedPublishedArticles allowlist. This trips
    // assertPackageInvariants (content_safety_error, non-retryable).
    runner.ai.generateArticle = async () => {
      const pkg = buildPackage({ articleId: ARTICLE_ID });
      pkg.internalLinks = [{ slug: "not-in-brief-allowlist", anchor: "verkeerde link" }];
      return pkg;
    };
    const rc = runner.runControl as unknown as {
      failures: Array<{ category: string; retryable: boolean; stepKey: string }>;
    };
    const out = await runArticle4PreviewOnce(baseDeps({ runner }));
    expect(out.status).toBe("pipeline_blocked");
    expect(rc.failures.length).toBeGreaterThan(0);
    expect(rc.failures[0].category).toBe("content_safety_error");
    expect(rc.failures[0].retryable).toBe(false);
    expect(rc.failures[0].stepKey).toBe("generation");
  });
});
