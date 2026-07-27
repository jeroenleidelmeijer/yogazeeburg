// Shared, fully-serializable article types for the Yoga Gids read layer.
// Legacy JSX bodies and Lucide icons live in `articles.tsx` and never travel
// through loaders. Every public surface consumes these plain-JSON shapes.

export type ArticleSource = "legacy" | "db";

export interface ArticleCategoryRef {
  slug: string;
  title: string;
}

/** Card-shaped reference. Used by every listing/filter/related/sitemap. */
export interface ArticleRef {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategoryRef;
  readingTimeMin: number;
  publishedAt: string;
  updatedAt: string;
  pillar: boolean;
  source: ArticleSource;
  /** Free-text index used by hub search. Legacy: title+description+category.
   *  DB: title+meta+keywords. Never contains rendered HTML. */
  searchText: string;
  /** Category filter tokens matching the hub's QuickChoice filter values. */
  filters: string[];
}

/** Extended shape for the article detail route. Includes structured content
 *  for safe rendering plus FAQ/TOC/sources/SEO metadata. */
export interface DbArticleViewModel {
  articleId: string;
  slug: string;
  title: string;
  h1: string;
  seoTitle: string;
  description: string;
  category: ArticleCategoryRef;
  type: "explainer" | "how-to" | "local-guide";
  pillar: boolean;
  publishedAt: string;
  updatedAt: string;
  readingTimeMin: number;
  directAnswer: string;
  bodyMarkdown: string;
  toc: { id: string; label: string }[];
  faqs: { question: string; answer: string }[];
  sources: { title: string; url: string }[];
  internalLinks: { slug: string; anchor: string }[];
  tags: string[];
  primaryKeyword: string;
  audiences: string[];
  featured: boolean;
  cta: { heading: string; body: string; button: string; subtext: string };
  canonicalUrl: string;
  template: { showTOC: boolean; showFAQ: boolean; showSources: boolean; showRelated: boolean };
}

/** Union used by the article route loader — legacy uses only `slug`. */
export type ArticleResolvedRef =
  | { kind: "legacy"; slug: string }
  | { kind: "db"; view: DbArticleViewModel };
