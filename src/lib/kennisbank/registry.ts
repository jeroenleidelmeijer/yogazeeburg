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

// Category slug → human title + filter tokens. Mirrors the hub's CATEGORIES.
export const CATEGORY_META: Record<string, { title: string; filters: string[] }> = {
  "beginnen-met-yoga": { title: "Beginnen met yoga", filters: ["beginner"] },
  yogastijlen: { title: "Yogastijlen uitgelegd", filters: ["yogastijlen"] },
  "stress-ontspanning-slaap": { title: "Stress, ontspanning en slaap", filters: ["ontspanning"] },
  "flexibiliteit-kracht-houding": { title: "Flexibiliteit, kracht en houding", filters: ["flexibiliteit"] },
  "klachten-en-levensfasen": { title: "Yoga bij klachten en levensfasen", filters: [] },
  "yoga-amsterdam-oost": { title: "Yoga in Amsterdam Oost", filters: ["beginner"] },
};

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
