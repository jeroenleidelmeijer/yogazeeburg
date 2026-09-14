/**
 * Renderer for the legacy (JSX-body) Yoga Gids articles.
 *
 * This is the ONLY client module that imports `@/lib/kennisbank/articles`, so
 * the large article bodies live in a lazily loaded route-component chunk and
 * never in the initial bundle of commercial pages, the hub or category pages.
 * Rendering behaviour is unchanged.
 */
import { notFound } from "@tanstack/react-router";
import { getArticleBySlug } from "@/lib/kennisbank/articles";
import { ArticleFigure } from "@/components/kennisbank/ArticleFigure";
import type { ArticleRef } from "@/lib/kennisbank/types";
import {
  ArticleShell,
  FaqList,
  RelatedGrid,
  SourcesList,
  TocBlock,
} from "@/components/kennisbank/ArticleShell";

export function LegacyArticleView({
  slug,
  related,
}: {
  slug: string;
  related: ArticleRef[];
}) {
  const a = getArticleBySlug(slug);
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
        <SourcesList sources={a.sources} />
      )}
    </ArticleShell>
  );
}
