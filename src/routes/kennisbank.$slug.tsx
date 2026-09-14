import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { listPublishedArticlesFn, resolveArticleBySlugFn } from "@/lib/kennisbank/data.functions";
import { related as relatedRefs } from "@/lib/kennisbank/compose";
import type {
  ArticleRef,
  ArticleResolvedRef,
  DbArticleViewModel,
  LegacyArticleSeo,
} from "@/lib/kennisbank/types";
import { SafeMarkdownBody } from "@/components/kennisbank/SafeMarkdownBody";
import { LegacyArticleView } from "@/components/kennisbank/LegacyArticleView";
import {
  ArticleShell,
  FaqList,
  RelatedGrid,
  SourcesList,
  TocBlock,
} from "@/components/kennisbank/ArticleShell";

const BASE = "https://www.yogazeeburg.com";
const INTRO_URL = "/trial";

/**
 * Loader viewmodel. Legacy articles keep their rich JSX body in the client
 * bundle via `getArticleBySlug`; DB articles carry a fully-serializable
 * viewmodel here. `related` is always a plain ArticleRef[].
 */
type LoaderData = {
  resolved: ArticleResolvedRef;
  related: ArticleRef[];
};

export const Route = createFileRoute("/kennisbank/$slug")({
  loader: async ({ params }): Promise<LoaderData> => {
    const resolved = await resolveArticleBySlugFn({ data: { slug: params.slug } });
    if (!resolved) throw notFound();
    const all = await listPublishedArticlesFn();
    return { resolved, related: relatedRefs(all, params.slug, 2) };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Artikel niet gevonden — Yoga Gids | Yoga Zeeburg" },
          { name: "robots", content: "noindex, follow" },
        ],
      };
    }
    const seo = seoFor(loaderData.resolved);
    if (!seo) {
      return {
        meta: [
          { title: "Artikel niet gevonden — Yoga Gids | Yoga Zeeburg" },
          { name: "robots", content: "noindex, follow" },
        ],
      };
    }

    const canonical = `${BASE}/kennisbank/${params.slug}`;
    return {
      meta: [
        { title: seo.seoTitle },
        { name: "description", content: seo.description },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: seo.seoTitle },
        { property: "og:description", content: seo.description },
        { property: "og:url", content: canonical },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: seo.publishedAt },
        { property: "article:modified_time", content: seo.updatedAt },
        { property: "article:author", content: "Yoga Zeeburg" },
        { property: "article:section", content: seo.categoryTitle },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: seo.seoTitle },
        { name: "twitter:description", content: seo.description },
        ...(seo.heroImageUrl
          ? [
              { property: "og:image", content: seo.heroImageUrl },
              { name: "twitter:image", content: seo.heroImageUrl },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: seo.h1,
            description: seo.description,
            ...(seo.heroImageUrl ? { image: [seo.heroImageUrl] } : {}),
            inLanguage: "nl-NL",
            datePublished: seo.publishedAt,
            dateModified: seo.updatedAt,
            mainEntityOfPage: canonical,
            author: { "@type": "Organization", name: "Yoga Zeeburg", url: `${BASE}/` },
            publisher: { "@type": "Organization", name: "Yoga Zeeburg", url: `${BASE}/` },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
              {
                "@type": "ListItem",
                position: 2,
                name: "Yoga Gids",
                item: `${BASE}/kennisbank`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: seo.categoryTitle,
                item: `${BASE}/kennisbank/categorie/${seo.categorySlug}`,
              },
              { "@type": "ListItem", position: 4, name: seo.title, item: canonical },
            ],
          }),
        },
        ...(seo.faqs.length > 0
          ? [
              {
                type: "application/ld+json" as const,
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: seo.faqs.map((f) => ({
                    "@type": "Question",
                    name: f.question,
                    acceptedAnswer: { "@type": "Answer", text: f.answer },
                  })),
                }),
              },
            ]
          : []),
      ],
    };
  },
  component: ArticlePage,
  notFoundComponent: ArticleNotFound,
  errorComponent: ArticleError,
});

// -- SEO viewmodel bridge -------------------------------------------------
//
// Legacy SEO metadata arrives pre-computed and serialized from the server, so
// this route's eager options never import the legacy article module.

type SeoView = LegacyArticleSeo;

function seoFor(resolved: ArticleResolvedRef): SeoView | null {
  if (resolved.kind === "legacy") return resolved.seo;
  const v = resolved.view;
  return {
    seoTitle: v.seoTitle,
    title: v.title,
    h1: v.h1,
    description: v.description,
    publishedAt: v.publishedAt,
    updatedAt: v.updatedAt,
    categoryTitle: v.category.title,
    categorySlug: v.category.slug,
    faqs: v.template.showFAQ ? v.faqs : [],
    heroImageUrl: null,
  };
}

function ArticlePage() {
  const { resolved, related } = Route.useLoaderData();
  if (resolved.kind === "legacy") {
    return <LegacyArticleView slug={resolved.slug} related={related} />;
  }
  return <DbArticleView view={resolved.view} related={related} />;
}

// -- DB article rendering (SafeMarkdownBody) -------------------------------

function DbArticleView({ view, related }: { view: DbArticleViewModel; related: ArticleRef[] }) {
  return (
    <ArticleShell
      categoryTitle={view.category.title}
      categorySlug={view.category.slug}
      title={view.title}
      h1={view.h1}
      publishedAt={view.publishedAt}
      updatedAt={view.updatedAt}
      readingTimeMin={view.readingTimeMin}
      intro={view.directAnswer}
    >
      {view.template.showTOC && <TocBlock toc={view.toc} />}
      <SafeMarkdownBody markdown={view.bodyMarkdown} />
      {view.template.showFAQ && <FaqList faqs={view.faqs} />}
      {view.template.showSources && <SourcesList sources={view.sources} />}
      {view.template.showRelated && <RelatedGrid related={related} />}
    </ArticleShell>
  );
}

function ArticleNotFound() {
  return (
    <div lang="nl" className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-medium tracking-tight text-foreground">
            Artikel niet gevonden
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Dit artikel bestaat niet of is verplaatst. Bekijk de Yoga Gids voor de beschikbare
            onderwerpen.
          </p>
          <div className="mt-8">
            <Link
              to="/kennisbank"
              className="inline-flex min-h-[44px] items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Terug naar Yoga Gids
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function ArticleError({ reset }: { reset: () => void }) {
  return (
    <div lang="nl" className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-medium tracking-tight text-foreground">
            Er ging iets mis
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Probeer het opnieuw of ga terug naar de Yoga Gids.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-[44px] items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Opnieuw proberen
            </button>
            <Link
              to="/kennisbank"
              className="inline-flex min-h-[44px] items-center rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground hover:bg-muted"
            >
              Terug naar Yoga Gids
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
