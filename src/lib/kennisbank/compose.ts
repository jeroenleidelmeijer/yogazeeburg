// Client-safe registry composition helpers. Pure functions over ArticleRef[].
// Everything here is deterministic and free of I/O so both server loaders,
// client filters, and unit tests can share the same logic.

import type { ArticleRef } from "./types";

export type QuickFilter =
  | "beginner"
  | "ontspanning"
  | "flexibiliteit"
  | "yogastijlen";

export function sortByNewest(refs: ArticleRef[]): ArticleRef[] {
  return [...refs].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function byCategory(refs: ArticleRef[], categorySlug: string): ArticleRef[] {
  return refs.filter((r) => r.category.slug === categorySlug);
}

export function pillars(refs: ArticleRef[], limit = 3): ArticleRef[] {
  return refs.filter((r) => r.pillar).slice(0, limit);
}

/**
 * "New in the Yoga Gids" surface: newest N excluding the featured/pillar
 * set to avoid duplicate cards on the hub.
 */
export function newestExcluding(
  refs: ArticleRef[],
  excludeSlugs: Iterable<string>,
  limit = 3,
): ArticleRef[] {
  const skip = new Set(excludeSlugs);
  return sortByNewest(refs)
    .filter((r) => !skip.has(r.slug))
    .slice(0, limit);
}

export function related(
  refs: ArticleRef[],
  slug: string,
  limit = 2,
): ArticleRef[] {
  const current = refs.find((r) => r.slug === slug);
  if (!current) return [];
  const same = refs.filter(
    (r) => r.slug !== slug && r.category.slug === current.category.slug,
  );
  const others = refs.filter(
    (r) => r.slug !== slug && r.category.slug !== current.category.slug,
  );
  return [...same, ...others].slice(0, limit);
}

/**
 * Case-insensitive full-text search across the pre-computed `searchText`.
 * Also honours the QuickFilter chip when set.
 */
export function searchAndFilter(
  refs: ArticleRef[],
  query: string,
  filter: QuickFilter | null,
): ArticleRef[] {
  const q = query.trim().toLowerCase();
  return refs.filter((r) => {
    if (filter && !r.filters.includes(filter)) return false;
    if (!q) return true;
    return r.searchText.includes(q);
  });
}
