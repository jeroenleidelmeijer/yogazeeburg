/**
 * Renderer for the legacy (JSX-body) Yoga Gids articles.
 *
 * Only this article's body chunk (and its own image assets) is downloaded —
 * never the other 26.
 *
 * Two read paths, both without serializing bodies into loaderData:
 *  - Server render and every client-side navigation: the route loader already
 *    awaited the body module, so the article is read synchronously from the
 *    module cache and the full HTML is produced in one pass.
 *  - First client render after a hard page load: the loader does not re-run,
 *    so the browser's module cache is still empty. We then suspend on the
 *    per-slug cached promise via `use()`. React keeps the server-rendered HTML
 *    for this boundary and hydrates it as soon as the chunk arrives, so there
 *    is no blank shell and no client-only content.
 */
import { use } from "react";
import { notFound } from "@tanstack/react-router";
import { getLegacyArticlePromise, getLoadedLegacyArticle } from "@/lib/kennisbank/article-bodies";
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
  const preloaded = getLoadedLegacyArticle(slug);
  const a = preloaded ?? use(getLegacyArticlePromise(slug));
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
      cta={a.cta}
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
