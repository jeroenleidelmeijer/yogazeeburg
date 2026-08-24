// Real behavior tests for the published-only guarantee: listPublishedRefs
// and the sitemap route MUST expose ONLY placement_status='published' DB
// rows, plus the legacy 1–3 articles. Draft/preview rows must never leak.
//
// We drive the actual functions (no shadow re-implementations of the merge)
// through a mocked server-only Supabase admin client.
import { describe, it, expect, vi, beforeEach } from "vitest";

type Route = (state: { table: string; filters: [string, unknown][] }) => {
  data: unknown;
  error: unknown;
};

function makeSupabase(route: Route) {
  return {
    from(table: string) {
      const state = { table, filters: [] as [string, unknown][] };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const chain: any = {
        select() {
          return chain;
        },
        eq(col: string, val: unknown) {
          state.filters.push([col, val]);
          return chain;
        },
        maybeSingle() {
          return Promise.resolve(route(state));
        },
        then(
          res: (v: { data: unknown; error: unknown }) => unknown,
          rej?: (e: unknown) => unknown,
        ) {
          return Promise.resolve(route(state)).then(res, rej);
        },
      };
      return chain;
    },
  };
}

function pkg(finalTitle: string, slug: string) {
  return {
    articleId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    finalTitle,
    slug,
    metaTitle: `${finalTitle} — Yoga Zeeburg`,
    metaDescription: "Praktische gids voor yoga in Amsterdam Oost.",
    directAnswer: "Kort antwoord voor lezers.",
    bodyMarkdown:
      "## Introductie\n\nDit is een testartikel met genoeg woorden voor een leestijdschatting. ".repeat(
        10,
      ),
    faq: [],
    internalLinks: [],
    seoIntents: ["beginner"],
    structuredDataIntents: [],
    cta: { label: "Boek een proefles", href: "/prijzen" },
  };
}

function dbRow(status: "draft" | "preview" | "published", slug: string, title: string) {
  return {
    id: `row_${status}_${slug}`,
    article_id: `art-${slug}`,
    slug,
    content_hash: "sha256:x",
    placement_status: status,
    package: pkg(title, slug),
    preview_url: null,
    preview_token: null,
    published_at: "2026-09-01T00:00:00Z",
    created_at: "2026-09-01T00:00:00Z",
    updated_at: "2026-09-01T00:00:00Z",
    publication_articles: {
      id: `art-${slug}`,
      project_id: "proj",
      category: "yoga-amsterdam-oost",
      cluster: null,
      primary_keyword: "yoga amsterdam oost",
      original_title: title,
      final_title: title,
    },
  };
}

async function withRows(
  rows: ReturnType<typeof dbRow>[],
  captureFilters?: (f: [string, unknown][]) => void,
) {
  vi.doMock("@/integrations/supabase/client.server", () => ({
    supabaseAdmin: makeSupabase((s) => {
      if (s.table !== "kennisbank_placements") return { data: null, error: null };
      if (captureFilters) captureFilters(s.filters);
      const statusFilter = s.filters.find((f) => f[0] === "placement_status")?.[1];
      const filtered = statusFilter
        ? rows.filter((r) => r.placement_status === statusFilter)
        : rows;
      return { data: filtered, error: null };
    }),
  }));
  vi.resetModules();
  return await import("@/lib/kennisbank/data.server");
}

beforeEach(() => {
  vi.resetModules();
  vi.doUnmock("@/integrations/supabase/client.server");
});

describe("listPublishedRefs — published-only merge", () => {
  it("includes a fake published DB row and excludes fake draft + preview rows", async () => {
    const rows = [
      dbRow("draft", "draft-only-fake", "Draft only"),
      dbRow("preview", "preview-only-fake", "Preview only"),
      dbRow("published", "published-only-fake", "Published only"),
    ];
    let capturedFilters: [string, unknown][] = [];
    const { listPublishedRefs } = await withRows(rows, (f) => {
      capturedFilters = f;
    });
    const refs = await listPublishedRefs();
    const slugs = refs.map((r) => r.slug);

    // Legacy pillars 1–3 are still present.
    expect(slugs).toContain("proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten");
    expect(slugs).toContain("yoga-in-amsterdam-oost-welke-yogastudio-past-bij-jou");
    expect(slugs).toContain("yoga-voor-beginners-in-amsterdam-oost-zo-start-je");

    // Published DB row is exposed.
    expect(slugs).toContain("published-only-fake");
    // Draft/preview rows are not exposed.
    expect(slugs).not.toContain("draft-only-fake");
    expect(slugs).not.toContain("preview-only-fake");

    // The DB read pinned placement_status='published' at the query level.
    expect(capturedFilters.some(([c, v]) => c === "placement_status" && v === "published")).toBe(
      true,
    );
  });

  it("preserves legacy articles when the DB has zero rows", async () => {
    const { listPublishedRefs } = await withRows([]);
    const refs = await listPublishedRefs();
    expect(refs).toHaveLength(18);
    for (const r of refs) expect(r.source).toBe("legacy");
  });
});

describe("sitemap.xml — published-only URL emission", () => {
  it("emits published DB slugs and omits draft/preview slugs", async () => {
    const rows = [
      dbRow("draft", "draft-only-fake", "Draft only"),
      dbRow("preview", "preview-only-fake", "Preview only"),
      dbRow("published", "published-only-fake", "Published only"),
    ];
    await withRows(rows);
    // Re-import the sitemap route after the mock is installed and modules reset.
    const routeMod = await import("@/routes/sitemap[.]xml");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (routeMod as any).Route.options.server.handlers.GET as (
      ctx: unknown,
    ) => Promise<Response>;
    const res = await handler({ request: new Request("https://www.yogazeeburg.com/sitemap.xml") });
    const xml = await res.text();

    // Published slug present.
    expect(xml).toContain("/kennisbank/published-only-fake");
    // Draft + preview slugs absent.
    expect(xml).not.toContain("/kennisbank/draft-only-fake");
    expect(xml).not.toContain("/kennisbank/preview-only-fake");
    // Legacy 1–3 still present.
    expect(xml).toContain("/kennisbank/proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten");
    // No category archive URLs (functional archives are noindex, not in sitemap).
    expect(xml).not.toContain("/kennisbank/categorie/");
  });
});
