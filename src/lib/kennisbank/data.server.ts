// Server-only data access for the Yoga Gids registry.
//
// This module is the SINGLE place where DB placements are read. It is guarded
// by the `.server.ts` suffix so it can never leak into a client bundle. It
// composes the browser-safe legacy list from `articles.tsx` with rows from
// `kennisbank_placements` joined onto `publication_articles` for the
// canonical category slug/title.
//
// Fail-closed: any DB error, schema surprise or invalid row is turned into a
// thrown Error at the caller (server function). Silent empty results are not
// used — bugs must surface, not disappear into "no articles".
//
// Cross-source uniqueness: a legacy slug or articleId always wins over a DB
// row so the legacy pillar articles stay pinned even if a placement ever
// happens to collide.

import { ARTICLES } from "./articles";
import { CATEGORY_META, legacyArticleToRef, listLegacyRefs } from "./registry";
import type {
  ArticleRef,
  DbArticleViewModel,
} from "./types";

export { CATEGORY_META, legacyArticleToRef, listLegacyRefs };

const CANONICAL_BASE = "https://www.yogazeeburg.com";

// -- Pure legacy conversion (safe to call anywhere) -----------------------

export function legacyArticleToRef(a: Article): ArticleRef {
  const meta = CATEGORY_META[a.category.slug];
  const filters = meta?.filters ?? [];
  const searchText = [
    a.title,
    a.description,
    a.category.title,
    a.h1,
    a.seoTitle,
    ...a.faqs.map((f) => `${f.question} ${f.answer}`),
  ]
    .join(" ")
    .toLowerCase();
  return {
    slug: a.slug,
    title: a.title,
    description: a.description,
    category: { slug: a.category.slug, title: a.category.title },
    readingTimeMin: a.readingTimeMin,
    publishedAt: a.publishedAt,
    updatedAt: a.updatedAt,
    pillar: a.pillar,
    source: "legacy",
    searchText,
    filters,
  };
}

export function listLegacyRefs(): ArticleRef[] {
  return ARTICLES.map(legacyArticleToRef);
}

// -- DB reads -------------------------------------------------------------

interface PlacementRowDb {
  id: string;
  article_id: string;
  slug: string;
  content_hash: string;
  placement_status: "draft" | "preview" | "published";
  package: Record<string, unknown>;
  preview_url: string | null;
  preview_token: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  publication_articles?: {
    id: string;
    category: string | null;
    cluster: string | null;
    primary_keyword: string | null;
    original_title: string | null;
    final_title: string | null;
  } | null;
}

/**
 * Read every published placement joined with its publication_articles row
 * so we can derive the canonical category slug + title.
 */
async function fetchPublishedRows(): Promise<PlacementRowDb[]> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabaseAdmin as any)
    .from("kennisbank_placements")
    .select(
      "id, article_id, slug, content_hash, placement_status, package, preview_url, preview_token, published_at, created_at, updated_at, publication_articles!inner(id, category, cluster, primary_keyword, original_title, final_title)",
    )
    .eq("placement_status", "published");
  if (error) throw new Error(`kennisbank_placements read failed: ${error.message}`);
  return (data ?? []) as PlacementRowDb[];
}

/**
 * Fetch a single preview row for the given articleId. Only rows with
 * placement_status='preview' are returned — draft/published are never
 * exposed through this path.
 */
export async function fetchPreviewByArticleId(articleId: string): Promise<PlacementRowDb | null> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabaseAdmin as any)
    .from("kennisbank_placements")
    .select(
      "id, article_id, slug, content_hash, placement_status, package, preview_url, preview_token, published_at, created_at, updated_at, publication_articles!inner(id, category, cluster, primary_keyword, original_title, final_title)",
    )
    .eq("article_id", articleId)
    .eq("placement_status", "preview")
    .maybeSingle();
  if (error) throw new Error(`kennisbank_placements preview read failed: ${error.message}`);
  return data as PlacementRowDb | null;
}

/**
 * Verify that the caller (auth.uid()) is registered as a publication admin
 * on ANY project. This is the ONLY authorization gate for the preview route;
 * a query token by itself is never sufficient.
 */
export async function assertCallerIsPublicationAdmin(userId: string): Promise<void> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabaseAdmin as any)
    .from("publication_admins")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(`admin check failed: ${error.message}`);
  if (!data) throw new Error("Forbidden: caller is not a publication admin");
}

// -- Row → viewmodel mapping ---------------------------------------------

export function dbRowToRef(row: PlacementRowDb): ArticleRef {
  const view = dbRowToViewModel(row);
  const searchText = [
    view.title,
    view.description,
    view.category.title,
    view.primaryKeyword,
    ...view.tags,
    ...view.faqs.map((f) => `${f.question} ${f.answer}`),
  ]
    .join(" ")
    .toLowerCase();
  return {
    slug: view.slug,
    title: view.title,
    description: view.description,
    category: view.category,
    readingTimeMin: view.readingTimeMin,
    publishedAt: view.publishedAt,
    updatedAt: view.updatedAt,
    pillar: view.featured,
    source: "db",
    searchText,
    filters: CATEGORY_META[view.category.slug]?.filters ?? [],
  };
}

export function dbRowToViewModel(row: PlacementRowDb): DbArticleViewModel {
  const pkg = row.package as Record<string, unknown>;
  const requiredStrings = [
    "articleId",
    "finalTitle",
    "slug",
    "metaTitle",
    "metaDescription",
    "directAnswer",
    "bodyMarkdown",
  ] as const;
  for (const k of requiredStrings) {
    if (typeof pkg[k] !== "string" || !(pkg[k] as string).trim()) {
      throw new Error(`kennisbank_placements row ${row.id} package.${k} missing or invalid`);
    }
  }

  const categorySlug =
    (row.publication_articles?.category && String(row.publication_articles.category)) ||
    "yoga-amsterdam-oost";
  const categoryTitle =
    CATEGORY_META[categorySlug]?.title ?? "Yoga in Amsterdam Oost";

  const faq = Array.isArray(pkg.faq) ? (pkg.faq as { question: string; answer: string }[]) : [];
  const internalLinks = Array.isArray(pkg.internalLinks)
    ? (pkg.internalLinks as { slug: string; anchor: string }[])
    : [];
  const tags = Array.isArray(pkg.seoIntents) ? (pkg.seoIntents as string[]) : [];
  const structuredDataIntents = Array.isArray(pkg.structuredDataIntents)
    ? (pkg.structuredDataIntents as string[])
    : [];

  const bodyMarkdown = pkg.bodyMarkdown as string;
  const readingTimeMin = Math.max(3, Math.round(bodyMarkdown.trim().split(/\s+/).length / 220));

  const publishedAt = (row.published_at ?? row.created_at).slice(0, 10);
  const updatedAt = row.updated_at.slice(0, 10);

  return {
    articleId: row.article_id,
    slug: row.slug,
    title: pkg.finalTitle as string,
    h1: pkg.finalTitle as string,
    seoTitle: pkg.metaTitle as string,
    description: pkg.metaDescription as string,
    category: { slug: categorySlug, title: categoryTitle },
    type: "explainer",
    pillar: false,
    publishedAt,
    updatedAt,
    readingTimeMin,
    directAnswer: pkg.directAnswer as string,
    bodyMarkdown,
    toc: extractTocFromMarkdown(bodyMarkdown),
    faqs: faq,
    sources: [],
    internalLinks,
    tags,
    primaryKeyword:
      (row.publication_articles?.primary_keyword as string | undefined) ??
      (Array.isArray(pkg.seoIntents) ? String(tags[0] ?? "") : ""),
    audiences: [],
    featured: structuredDataIntents.includes("featured"),
    cta: pkg.cta as DbArticleViewModel["cta"],
    canonicalUrl: `${CANONICAL_BASE}/nl/kennisbank/${row.slug}`,
    template: {
      showTOC: true,
      showFAQ: faq.length > 0,
      showSources: false,
      showRelated: true,
    },
  };
}

function extractTocFromMarkdown(md: string): { id: string; label: string }[] {
  const out: { id: string; label: string }[] = [];
  const seen = new Set<string>();
  const lines = md.split(/\r?\n/);
  for (const line of lines) {
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const label = m[1].trim();
    const id = slugifyHeading(label);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push({ id, label });
  }
  return out;
}

function slugifyHeading(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

// -- High-level composition (server-only) --------------------------------

/**
 * Combined published list: legacy + DB. Deduplicated by slug and articleId
 * (legacy wins on collision).
 */
export async function listPublishedRefs(): Promise<ArticleRef[]> {
  const legacy = listLegacyRefs();
  const legacySlugs = new Set(legacy.map((r) => r.slug));
  const rows = await fetchPublishedRows();
  const dbRefs: ArticleRef[] = [];
  for (const r of rows) {
    if (legacySlugs.has(r.slug)) continue;
    dbRefs.push(dbRowToRef(r));
  }
  return [...legacy, ...dbRefs];
}

/** Resolve a slug to a full article payload; returns null if unknown. */
export async function resolveArticleBySlug(
  slug: string,
): Promise<
  | { kind: "legacy"; slug: string }
  | { kind: "db"; view: DbArticleViewModel }
  | null
> {
  if (ARTICLES.some((a) => a.slug === slug)) return { kind: "legacy", slug };
  const rows = await fetchPublishedRows();
  const row = rows.find((r) => r.slug === slug);
  if (!row) return null;
  return { kind: "db", view: dbRowToViewModel(row) };
}
