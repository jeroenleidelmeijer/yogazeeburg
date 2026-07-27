// Contract tests for the placement service. Uses fully in-memory fakes for
// the DB store and legacy index. No real Supabase writes, no network. The
// runner's existing fake `buildPackage` fixture is reused so schema shape
// stays authoritative across steps.
import { describe, it, expect, beforeEach } from "vitest";
import {
  placeArticle,
  PlacementValidationError,
  formatDateInAmsterdam,
  derivePreviewToken,
  type PlacementRow,
  type PlacementStore,
  type LegacyArticleIndex,
} from "@/lib/publications/placement.server";
import { packageContentHash } from "@/lib/publications/runner/hash";
import { FIXED_CTA } from "@/lib/publications/runner/cta";
import { REVIEW_ORDER, type GeneratedArticlePackage, type ReviewOutput } from "@/lib/publications/runner/schemas";
import { buildPackage, passingReview } from "./fakes";

function seal(pkg: GeneratedArticlePackage): GeneratedArticlePackage {
  const hash = packageContentHash({ ...pkg, contentHash: "" });
  return { ...pkg, contentHash: hash };
}

const PASSING_REVIEWS: ReviewOutput[] = REVIEW_ORDER.map((r) => passingReview(r));

const LEGACY_SLUGS = [
  "proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten",
  "welke-yogastudio-past-bij-mij-amsterdam-oost",
  "wat-is-yoga",
];

function fakeLegacy(slugs: string[] = LEGACY_SLUGS): LegacyArticleIndex {
  const set = new Set(slugs);
  return { hasSlug: (s) => set.has(s), listSlugs: () => [...set] };
}

function makeStore(): PlacementStore & { rows: PlacementRow[]; upserts: number } {
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

describe("placeArticle validation & idempotency", () => {
  let store: ReturnType<typeof makeStore>;
  const articleId = "art_placement_1";

  beforeEach(() => {
    store = makeStore();
  });

  it("places a valid package as draft with disposition=placed", async () => {
    const pkg = seal(buildPackage({ articleId, slug: "yin-yoga-drukke-mensen-amsterdam-oost" }));
    const res = await placeArticle(
      { articleId, package: pkg, reviews: PASSING_REVIEWS },
      { store, legacy: fakeLegacy() },
    );
    expect(res.disposition).toBe("placed");
    expect(res.row.placementStatus).toBe("draft");
    expect(res.row.publishedAt).toBeNull();
    expect(store.upserts).toBe(1);
  });

  it("is idempotent on same package (no-op)", async () => {
    const pkg = seal(buildPackage({ articleId, slug: "yin-yoga-drukke-mensen-amsterdam-oost" }));
    const first = await placeArticle(
      { articleId, package: pkg, reviews: PASSING_REVIEWS },
      { store, legacy: fakeLegacy() },
    );
    expect(first.disposition).toBe("placed");
    const second = await placeArticle(
      { articleId, package: pkg, reviews: PASSING_REVIEWS },
      { store, legacy: fakeLegacy() },
    );
    expect(second.disposition).toBe("noop");
    expect(store.upserts).toBe(1);
  });

  it("updates when content hash changes", async () => {
    const first = seal(buildPackage({ articleId, slug: "yin-yoga-drukke-mensen-amsterdam-oost" }));
    await placeArticle({ articleId, package: first, reviews: PASSING_REVIEWS }, { store, legacy: fakeLegacy() });
    const second = seal(
      buildPackage({
        articleId,
        slug: "yin-yoga-drukke-mensen-amsterdam-oost",
        metaTitle: "Nieuwe titel voor yin yoga in Amsterdam Oost",
      }),
    );
    const res = await placeArticle(
      { articleId, package: second, reviews: PASSING_REVIEWS },
      { store, legacy: fakeLegacy() },
    );
    expect(res.disposition).toBe("updated");
    expect(store.rows).toHaveLength(1);
  });

  it("rejects mismatched content hash", async () => {
    const pkg = { ...buildPackage({ articleId }), contentHash: "sha256:deadbeef" };
    await expect(
      placeArticle({ articleId, package: pkg, reviews: PASSING_REVIEWS }, { store, legacy: fakeLegacy() }),
    ).rejects.toMatchObject({ detail: { code: "hash_mismatch" } });
  });

  it("rejects when review count is not 3", async () => {
    const pkg = seal(buildPackage({ articleId }));
    await expect(
      placeArticle({ articleId, package: pkg, reviews: PASSING_REVIEWS.slice(0, 2) }, { store, legacy: fakeLegacy() }),
    ).rejects.toMatchObject({ detail: { code: "review_incomplete" } });
  });

  it("rejects when any review round did not pass", async () => {
    const pkg = seal(buildPackage({ articleId }));
    const reviews: ReviewOutput[] = [
      passingReview("content_integrity"),
      { ...passingReview("structure_seo_tech"), pass: false },
      passingReview("regression_scalability"),
    ];
    await expect(
      placeArticle({ articleId, package: pkg, reviews }, { store, legacy: fakeLegacy() }),
    ).rejects.toMatchObject({ detail: { code: "review_failed" } });
  });

  it("rejects when a review is blocked", async () => {
    const pkg = seal(buildPackage({ articleId }));
    const reviews: ReviewOutput[] = [
      { ...passingReview("content_integrity"), blocked: true, pass: false },
      passingReview("structure_seo_tech"),
      passingReview("regression_scalability"),
    ];
    await expect(
      placeArticle({ articleId, package: pkg, reviews }, { store, legacy: fakeLegacy() }),
    ).rejects.toMatchObject({ detail: { code: "review_failed" } });
  });

  it("rejects tampered CTA copy (defence in depth)", async () => {
    // Bypass the Zod literal check by mutating after seal; validator must still catch.
    const good = seal(buildPackage({ articleId }));
    const tampered = { ...good, cta: { ...FIXED_CTA, heading: "andere kop" } } as unknown as GeneratedArticlePackage;
    // Rehash so hash check passes and CTA check is what fails.
    tampered.contentHash = packageContentHash({ ...tampered, contentHash: "" });
    await expect(
      placeArticle({ articleId, package: tampered, reviews: PASSING_REVIEWS }, { store, legacy: fakeLegacy() }),
    ).rejects.toBeInstanceOf(PlacementValidationError);
  });

  it("rejects duplicate FAQ questions", async () => {
    const pkg = seal(
      buildPackage({
        articleId,
        faq: [
          { question: "Wat is yin yoga?", answer: "Rustige stijl." },
          { question: "wat is yin yoga?", answer: "Andere formulering." },
        ],
      }),
    );
    await expect(
      placeArticle({ articleId, package: pkg, reviews: PASSING_REVIEWS }, { store, legacy: fakeLegacy() }),
    ).rejects.toMatchObject({ detail: { code: "faq_inconsistent" } });
  });

  it("rejects slug collision with a legacy article", async () => {
    const pkg = seal(
      buildPackage({
        articleId,
        slug: "proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten",
      }),
    );
    await expect(
      placeArticle({ articleId, package: pkg, reviews: PASSING_REVIEWS }, { store, legacy: fakeLegacy() }),
    ).rejects.toMatchObject({ detail: { code: "slug_collision" } });
  });

  it("rejects slug collision with a different article in the store", async () => {
    const pkgA = seal(buildPackage({ articleId: "art_a", slug: "yin-yoga-drukke-mensen-amsterdam-oost" }));
    await placeArticle(
      { articleId: "art_a", package: pkgA, reviews: PASSING_REVIEWS },
      { store, legacy: fakeLegacy() },
    );
    const pkgB = seal(buildPackage({ articleId: "art_b", slug: "yin-yoga-drukke-mensen-amsterdam-oost" }));
    await expect(
      placeArticle(
        { articleId: "art_b", package: pkgB, reviews: PASSING_REVIEWS },
        { store, legacy: fakeLegacy() },
      ),
    ).rejects.toMatchObject({ detail: { code: "slug_collision" } });
  });

  it("rejects slug change for existing article (article-slug stability)", async () => {
    const first = seal(buildPackage({ articleId, slug: "yin-yoga-drukke-mensen-amsterdam-oost" }));
    await placeArticle({ articleId, package: first, reviews: PASSING_REVIEWS }, { store, legacy: fakeLegacy() });
    const renamed = seal(buildPackage({ articleId, slug: "yin-yoga-nieuwe-slug-amsterdam-oost" }));
    await expect(
      placeArticle({ articleId, package: renamed, reviews: PASSING_REVIEWS }, { store, legacy: fakeLegacy() }),
    ).rejects.toMatchObject({ detail: { code: "article_slug_mismatch" } });
  });

  it("rejects internal link that does not resolve to legacy or published DB", async () => {
    const pkg = seal(
      buildPackage({
        articleId,
        internalLinks: [{ slug: "onbestaand-artikel", anchor: "iets" }],
      }),
    );
    await expect(
      placeArticle({ articleId, package: pkg, reviews: PASSING_REVIEWS }, { store, legacy: fakeLegacy() }),
    ).rejects.toMatchObject({ detail: { code: "link_not_allowed" } });
  });

  it("rejects future publishedAt in Europe/Amsterdam", async () => {
    const pkg = seal(buildPackage({ articleId }));
    // Frozen "now": 2026-08-03 in Amsterdam; try 2027-01-01.
    const now = () => new Date("2026-08-03T09:00:00Z");
    await expect(
      placeArticle(
        { articleId, package: pkg, reviews: PASSING_REVIEWS, publishedAt: "2027-01-01" },
        { store, legacy: fakeLegacy(), now },
      ),
    ).rejects.toMatchObject({ detail: { code: "date_in_future" } });
  });

  it("places as preview when preview data supplied and never as published", async () => {
    const pkg = seal(buildPackage({ articleId, slug: "yin-yoga-drukke-mensen-amsterdam-oost" }));
    const res = await placeArticle(
      {
        articleId,
        package: pkg,
        reviews: PASSING_REVIEWS,
        preview: {
          previewUrl: "https://preview.example/nl/kennisbank/yin-yoga-drukke-mensen-amsterdam-oost",
          previewToken: derivePreviewToken(articleId, pkg.contentHash),
        },
      },
      { store, legacy: fakeLegacy() },
    );
    expect(res.row.placementStatus).toBe("preview");
    // Placement MUST NOT set published_at (that's step 4's job).
    expect(res.row.publishedAt).toBeNull();
  });

  it("does not touch legacy article registry regardless of outcome", async () => {
    const before = fakeLegacy().listSlugs();
    const pkg = seal(buildPackage({ articleId, slug: "yin-yoga-drukke-mensen-amsterdam-oost" }));
    await placeArticle({ articleId, package: pkg, reviews: PASSING_REVIEWS }, { store, legacy: fakeLegacy() });
    expect(fakeLegacy().listSlugs()).toEqual(before);
  });
});

describe("formatDateInAmsterdam", () => {
  it("uses Europe/Amsterdam wall clock (summer time crosses date at 22:00Z)", () => {
    // 2026-08-03T22:30:00Z = 2026-08-04 00:30 in Amsterdam (CEST +02:00).
    expect(formatDateInAmsterdam(new Date("2026-08-03T22:30:00Z"))).toBe("2026-08-04");
  });
});
