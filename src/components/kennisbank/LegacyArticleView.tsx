/**
 * Renderer for the legacy (JSX-body) Yoga Gids articles.
 *
 * Reads the article synchronously from the per-slug cache that the route
 * loader has already filled via `loadLegacyArticle`, so only this one
 * article's body chunk (and its own image assets) is ever downloaded — never
 * the other 26 — and SSR still renders the full article HTML without a
 * Suspense shell. Rendering behaviour is unchanged.
 */
import { notFound } from "@tanstack/react-router";
import { getLoadedLegacyArticle } from "@/lib/kennisbank/article-bodies";
import { ArticleFigure } from "@/components/kennisbank/ArticleFigure";
import type { ArticleRef } from "@/lib/kennisbank/types";
import {
  ArticleShell,
  FaqList,
  RelatedGrid,
  SourcesList,
  TocBlock,
} from "@/components/kennisbank/ArticleShell";

export function LegacyArticleView({ slug, related }: { slug: string; related: ArticleRef[] }) {
  const a = getLoadedLegacyArticle(slug);
  if (!a) throw notFound();
  const Body = a.body;
  return (
    <ArticleShell
      categoryTitle={a.category.title}
      categorySlug={a.category.slug}
      title={a.title}
      h1={a.h1}
      publishedAt={a.publishedAt}
      updatedAt={a.updatedAt}
      readingTimeMin={a.readingTimeMin}
      intro={
        a.intro ??
        "Praktische, warme uitleg over hoe een eerste yogales in Amsterdam Oost werkt — zonder marketingtaal en zonder prestatiedruk."
      }
      hero={
        a.heroImage ? <ArticleFigure image={a.heroImage} priority className="mb-10" /> : undefined
      }
    >
      {a.template.showTOC && <TocBlock toc={a.toc} />}
      <Body />
      {a.template.showFAQ && <FaqList faqs={a.faqs} />}
      {a.template.showRelated && <RelatedGrid related={related} />}
      {a.template.showSources && a.sources && a.sources.length > 0 && (
        <SourcesList sources={a.sources} nofollow={false} />
      )}
    </ArticleShell>
  );
}
