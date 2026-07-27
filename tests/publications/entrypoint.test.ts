// Contract tests for placementFromArtifacts. Uses fully in-memory fakes for
// the artifact store, placement store and legacy index. No Supabase or
// network. The runner writes artifacts using exactly the keys tested here:
// `generation`, `source_validation`, `review_1|2|3`, `content_ready`.
import { describe, it, expect, beforeEach } from "vitest";
import {
  placementFromArtifacts,
  type PlacementEntrypointDeps,
} from "@/lib/publications/placement-entrypoint.server";
import { PlacementValidationError, type PlacementRow, type PlacementStore, type LegacyArticleIndex } from "@/lib/publications/placement.server";
import type { ArtifactRecord, ArtifactStore } from "@/lib/publications/runner/providers";
import { packageContentHash, contentHashOf } from "@/lib/publications/runner/hash";
import { REVIEW_ORDER } from "@/lib/publications/runner/schemas";
import { buildPackage, buildSources, passingReview } from "../runner/fakes";

const RUN_ID = "11111111-1111-4111-8111-111111111111";
const ARTICLE_ID = "22222222-2222-4222-8222-222222222222";
const LOCK = "33333333-3333-4333-8333-333333333333";
const SCHEMA_VERSION = "1";
const PROMPT_VERSION = "runner.v1";

function seal(pkg = buildPackage({ articleId: ARTICLE_ID })) {
  const hash = packageContentHash({ ...pkg, contentHash: "" });
  return { ...pkg, contentHash: hash };
}

function makeArtifactStore(records: ArtifactRecord[]): ArtifactStore {
  return {
    async list() {
      return records;
    },
    async upsert() {
      /* no-op */
    },
  };
}

function makePlacementStore(): PlacementStore & { rows: PlacementRow[]; upserts: number } {
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
      store.upserts++;
      const now = new Date().toISOString();
      const idx = rows.findIndex((r) => r.articleId === input.articleId);
      const row: PlacementRow = {
        id: idx >= 0 ? rows[idx].id : `row_${rows.length + 1}`,
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

const legacy: LegacyArticleIndex = {
  hasSlug: (s) => s === "wat-is-yoga",
  listSlugs: () => ["wat-is-yoga"],
};

function goodRecords() {
  const pkg = seal();
  const sources = buildSources({ articleId: ARTICLE_ID });
  const wrapReview = (round: (typeof REVIEW_ORDER)[number]) => ({
    review: passingReview(round),
    __inputPkgHash: pkg.contentHash,
  });
  const reviews = REVIEW_ORDER.map(wrapReview);
  const evidence = {
    articleId: ARTICLE_ID,
    runId: RUN_ID,
    packageHash: pkg.contentHash,
    reviews: REVIEW_ORDER.map((r) => ({ round: r, pass: true })),
    schemaVersion: SCHEMA_VERSION,
    promptVersion: PROMPT_VERSION,
  };
  const base = { schemaVersion: SCHEMA_VERSION, promptVersion: PROMPT_VERSION };
  const records: ArtifactRecord[] = [
    { stepKey: "generation", contentHash: pkg.contentHash, payload: pkg, ...base },
    {
      stepKey: "source_validation",
      contentHash: contentHashOf(sources),
      payload: sources,
      ...base,
    },
    ...reviews.map((r, i) => ({
      stepKey: `review_${i + 1}`,
      contentHash: contentHashOf(r),
      payload: r,
      ...base,
    })),
    { stepKey: "content_ready", contentHash: contentHashOf(evidence), payload: evidence, ...base },
  ];
  return { pkg, sources, records };
}

function baseDeps(records: ArtifactRecord[]): PlacementEntrypointDeps & {
  placementStore: ReturnType<typeof makePlacementStore>;
} {
  const placementStore = makePlacementStore();
  return {
    artifacts: makeArtifactStore(records),
    store: placementStore,
    legacy,
    placementStore,
  } as PlacementEntrypointDeps & { placementStore: ReturnType<typeof makePlacementStore> };
}

const input = {
  runId: RUN_ID,
  articleId: ARTICLE_ID,
  lockToken: LOCK,
  schemaVersion: SCHEMA_VERSION,
  promptVersion: PROMPT_VERSION,
};

describe("placementFromArtifacts contract", () => {
  it("places when every artifact is valid", async () => {
    const { records } = goodRecords();
    const deps = baseDeps(records);
    const res = await placementFromArtifacts(input, deps);
    expect(res.disposition).toBe("placed");
    expect(deps.placementStore.upserts).toBe(1);
  });

  it("is idempotent on repeat: second call is a no-op", async () => {
    const { records } = goodRecords();
    const deps = baseDeps(records);
    await placementFromArtifacts(input, deps);
    const res2 = await placementFromArtifacts(input, deps);
    expect(res2.disposition).toBe("noop");
    expect(deps.placementStore.upserts).toBe(1);
  });

  it("fails when generation artifact is missing", async () => {
    const { records } = goodRecords();
    const filtered = records.filter((r) => r.stepKey !== "generation");
    await expect(placementFromArtifacts(input, baseDeps(filtered))).rejects.toThrow(
      /generation/,
    );
  });

  it("fails when source_validation artifact is missing", async () => {
    const { records } = goodRecords();
    const filtered = records.filter((r) => r.stepKey !== "source_validation");
    await expect(placementFromArtifacts(input, baseDeps(filtered))).rejects.toThrow(
      /source_validation/,
    );
  });

  it("fails when content_ready evidence is missing", async () => {
    const { records } = goodRecords();
    const filtered = records.filter((r) => r.stepKey !== "content_ready");
    await expect(placementFromArtifacts(input, baseDeps(filtered))).rejects.toThrow(
      /content_ready/,
    );
  });

  it("fails when review payload lacks the {review,__inputPkgHash} wrapper", async () => {
    const { records, pkg } = goodRecords();
    const bad = records.map((r) =>
      r.stepKey === "review_2" ? { ...r, payload: passingReview("editorial_qa") } : r,
    );
    await expect(placementFromArtifacts(input, baseDeps(bad))).rejects.toThrow(
      /review_2 payload missing/,
    );
    // Sanity: original pkg hash is available.
    expect(pkg.contentHash).toMatch(/^sha256:/);
  });

  it("fails when a review's __inputPkgHash disagrees with the final package hash", async () => {
    const { records } = goodRecords();
    const bad = records.map((r) =>
      r.stepKey === "review_1"
        ? {
            ...r,
            payload: { review: passingReview("factual_qa"), __inputPkgHash: "sha256:stale" },
          }
        : r,
    );
    await expect(placementFromArtifacts(input, baseDeps(bad))).rejects.toThrow(
      /__inputPkgHash/,
    );
  });

  it("fails when review is blocked or did not pass", async () => {
    const { records, pkg } = goodRecords();
    const failing = {
      ...passingReview("editorial_qa"),
      pass: false,
    };
    const bad = records.map((r) =>
      r.stepKey === "review_2"
        ? { ...r, payload: { review: failing, __inputPkgHash: pkg.contentHash } }
        : r,
    );
    await expect(placementFromArtifacts(input, baseDeps(bad))).rejects.toThrow(
      /review_2/,
    );
  });

  it("fails when generation artifact schemaVersion mismatches run", async () => {
    const { records } = goodRecords();
    const bad = records.map((r) =>
      r.stepKey === "generation" ? { ...r, schemaVersion: "999" } : r,
    );
    await expect(placementFromArtifacts(input, baseDeps(bad))).rejects.toThrow(
      /generation/,
    );
  });

  it("fails when generation artifact contentHash disagrees with recomputed hash", async () => {
    const { records } = goodRecords();
    const bad = records.map((r) =>
      r.stepKey === "generation" ? { ...r, contentHash: "sha256:tampered" } : r,
    );
    await expect(placementFromArtifacts(input, baseDeps(bad))).rejects.toThrow(
      /hash/,
    );
  });

  it("fails when content_ready evidence disagrees with run/article/package", async () => {
    const { records } = goodRecords();
    const bad = records.map((r) =>
      r.stepKey === "content_ready"
        ? {
            ...r,
            payload: {
              articleId: ARTICLE_ID,
              runId: RUN_ID,
              packageHash: "sha256:other",
              reviews: REVIEW_ORDER.map((rd) => ({ round: rd, pass: true })),
              schemaVersion: SCHEMA_VERSION,
              promptVersion: PROMPT_VERSION,
            },
          }
        : r,
    );
    await expect(placementFromArtifacts(input, baseDeps(bad))).rejects.toThrow(
      /content_ready evidence disagrees/,
    );
  });

  it("fails when source_validation is blocked", async () => {
    const { records } = goodRecords();
    const bad = records.map((r) => {
      if (r.stepKey !== "source_validation") return r;
      const sources = buildSources({
        articleId: ARTICLE_ID,
        blocked: true,
        blockedReason: "test",
      });
      return { ...r, contentHash: contentHashOf(sources), payload: sources };
    });
    await expect(placementFromArtifacts(input, baseDeps(bad))).rejects.toThrow(
      /source_validation is blocked/,
    );
  });

  it("persists sources into the placement JSONB under _sourcesPack", async () => {
    const { records, sources } = goodRecords();
    const deps = baseDeps(records);
    await placementFromArtifacts(input, deps);
    const stored = deps.placementStore.rows[0].package as Record<string, unknown>;
    expect(stored._sourcesPack).toBeTruthy();
    expect((stored._sourcesPack as { articleId: string }).articleId).toBe(sources.articleId);
  });
});
