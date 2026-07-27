// Public re-exports for the Yoga Gids registry.
//
// This module stays browser-safe. Anything that touches Supabase lives in
// `data.server.ts`; anything that touches only the legacy static articles
// stays synchronous and importable from the client. Server functions in
// `data.functions.ts` are the glue between the two.

export type {
  ArticleRef,
  ArticleResolvedRef,
  ArticleCategoryRef,
  ArticleSource,
  DbArticleViewModel,
} from "./types";

export {
  listLegacyRefs,
  legacyArticleToRef,
  CATEGORY_META,
} from "./data.server";
