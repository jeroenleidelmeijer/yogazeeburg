// Unified registry for the Yoga Gids read layer. This module bridges the
// legacy static ARTICLES list with future DB-backed placements so any public
// surface (sitemap, article route, hubs, related lists) can source everything
// through one function.
//
// Legacy articles are treated as implicitly-published. DB placements only
// contribute rows whose `placement_status = 'published'`; `draft` and
// `preview` rows MUST NOT appear on any public surface.
//
// This file is safe to import from both server routes and browser code — the
// browser-friendly path resolves only legacy data synchronously. The DB path
// is guarded behind an async server-only import so no service-role key ever
// reaches the client bundle.

import { ARTICLES, type Article } from "./articles";

export type PublicArticleRef = {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  publishedAt: string;
  source: "legacy" | "db";
  category: { slug: string; title: string };
};

/** Synchronous list of legacy pillar articles (1-3). */
export function listLegacyArticleRefs(): PublicArticleRef[] {
  return ARTICLES.map(articleToRef);
}

function articleToRef(a: Article): PublicArticleRef {
  return {
    slug: a.slug,
    title: a.title,
    description: a.description,
    updatedAt: a.updatedAt,
    publishedAt: a.publishedAt,
    source: "legacy",
    category: { slug: a.category.slug, title: a.category.title },
  };
}

/**
 * Server-only: fetch published placements from Supabase. On the client this
 * returns an empty array so components remain deterministic during SSR/CSR.
 *
 * The service-role client is loaded lazily inside the function body — never
 * at module scope — so this file stays safe to import from client-reachable
 * modules.
 */
export async function listPublishedDbArticleRefs(): Promise<PublicArticleRef[]> {
  if (typeof window !== "undefined") return [];
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabaseAdmin as any)
      .from("kennisbank_placements")
      .select("slug, package, published_at, updated_at")
      .eq("placement_status", "published");
    if (error || !data) return [];
    return (data as Array<Record<string, unknown>>).map((row) => {
      const pkg = (row.package ?? {}) as Record<string, unknown>;
      const publishedAt = (row.published_at as string | null) ?? "";
      return {
        slug: row.slug as string,
        title: (pkg.finalTitle as string) ?? (row.slug as string),
        description: (pkg.metaDescription as string) ?? "",
        publishedAt: publishedAt ? publishedAt.slice(0, 10) : "",
        updatedAt: (row.updated_at as string).slice(0, 10),
        source: "db" as const,
        category: { slug: "", title: "" },
      };
    });
  } catch {
    return [];
  }
}

/**
 * Combined public list. Includes:
 *   - every legacy static article (all considered published)
 *   - every DB placement with `placement_status = 'published'`
 * Preview and draft placements are excluded by construction.
 */
export async function listAllPublishedArticleRefs(): Promise<PublicArticleRef[]> {
  const [db] = await Promise.all([listPublishedDbArticleRefs()]);
  return [...listLegacyArticleRefs(), ...db];
}
