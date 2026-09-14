// Browser-safe registry helpers for the Yoga Gids.
//
// This module MUST stay pure and client-safe: no imports of
// `@/integrations/supabase/client.server`, no `.server` modules. Server-side
// DB access lives in `data.server.ts`; server-function wrappers live in
// `data.functions.ts`. Component code and route loaders reach the DB
// exclusively through those server functions.

import { ARTICLES, type Article } from "./articles";
import type { ArticleRef } from "./types";

export type {
  ArticleRef,
  ArticleResolvedRef,
  ArticleCategoryRef,
  ArticleSource,
  DbArticleViewModel,
} from "./types";

// Category slug → human title + filter tokens. Single-sourced from
// `categories.ts` (light, article-free) and re-exported for existing callers.
export { CATEGORY_META } from "./categories";
import { CATEGORY_META } from "./categories";

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
