import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { getArticleBySlug, type ArticleTOCItem, type ArticleFAQ } from "@/lib/kennisbank/articles";
import { listPublishedArticlesFn, resolveArticleBySlugFn } from "@/lib/kennisbank/data.functions";
import { related as relatedRefs } from "@/lib/kennisbank/compose";
import type { ArticleRef, ArticleResolvedRef, DbArticleViewModel } from "@/lib/kennisbank/types";
import { ArticleCard } from "@/components/kennisbank/ArticleCard";
import { SafeMarkdownBody } from "@/components/kennisbank/SafeMarkdownBody";
import { ArticleFigure } from "@/components/kennisbank/ArticleFigure";

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

export const Route = createFileRoute("/nl/kennisbank/$slug")({
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

    const canonical = `${BASE}/nl/kennisbank/${params.slug}`;
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
                item: `${BASE}/nl/kennisbank`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: seo.categoryTitle,
                item: `${BASE}/nl/kennisbank/categorie/${seo.categorySlug}`,
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

type SeoView = {
  seoTitle: string;
  title: string;
  h1: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  categoryTitle: string;
  categorySlug: string;
  faqs: { question: string; answer: string }[];
  /** Absolute production URL of the hero image, when the article has one. */
  heroImageUrl: string | null;
};

function seoFor(resolved: ArticleResolvedRef): SeoView | null {
  if (resolved.kind === "legacy") {
    const a = getArticleBySlug(resolved.slug);
    if (!a) return null;
    return {
      seoTitle: a.seoTitle,
      title: a.title,
      h1: a.h1,
      description: a.description,
      publishedAt: a.publishedAt,
      updatedAt: a.updatedAt,
      categoryTitle: a.category.title,
      categorySlug: a.category.slug,
      faqs: a.template.showFAQ ? a.faqs : [],
      heroImageUrl: a.heroImage ? `${BASE}${a.heroImage.url}` : null,
    };
  }
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

function formatDateNL(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

function ArticlePage() {
  const { resolved, related } = Route.useLoaderData();
  if (resolved.kind === "legacy") {
    return <LegacyArticleView slug={resolved.slug} related={related} />;
  }
  return <DbArticleView view={resolved.view} related={related} />;
}

// -- Layout shared shell ---------------------------------------------------

function ArticleShell({
  categoryTitle,
  categorySlug,
  title,
  h1,
  publishedAt,
  updatedAt,
  readingTimeMin,
  intro,
  hero,
  children,
}: {
  categoryTitle: string;
  categorySlug: string;
  title: string;
  h1: string;
  publishedAt: string;
  updatedAt: string;
  readingTimeMin: number;
  intro?: string;
  hero?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div lang="nl" className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <article>
          <header className="border-b border-border/60 bg-secondary/30">
            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
              <nav aria-label="Kruimelpad" className="text-sm text-muted-foreground">
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <li>
                    <Link to="/nl/kennisbank" className="hover:text-foreground">
                      Yoga Gids
                    </Link>
                  </li>
                  <li aria-hidden="true">›</li>
                  <li>
                    <Link
                      to="/nl/kennisbank/categorie/$slug"
                      params={{ slug: categorySlug }}
                      className="hover:text-foreground"
                    >
                      {categoryTitle}
                    </Link>
                  </li>
                  <li aria-hidden="true">›</li>
                  <li aria-current="page" className="text-foreground/80">
                    {title}
                  </li>
                </ol>
              </nav>
              <p className="mt-6 font-sans text-sm font-medium uppercase tracking-widest text-primary">
                {categoryTitle}
              </p>
              <h1 className="mt-2 font-display text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {h1}
              </h1>
              {intro && <p className="mt-5 text-lg text-muted-foreground">{intro}</p>}
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-foreground/70">Door</span>
                  <span className="font-medium text-foreground">Yoga Zeeburg</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <span>
                    Gepubliceerd <time dateTime={publishedAt}>{formatDateNL(publishedAt)}</time>
                  </span>
                </span>
                {updatedAt !== publishedAt && (
                  <span className="inline-flex items-center gap-1.5">
                    <span>
                      Bijgewerkt <time dateTime={updatedAt}>{formatDateNL(updatedAt)}</time>
                    </span>
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>{readingTimeMin} min lezen</span>
                </span>
              </div>
            </div>
          </header>
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
            <div className="text-[17px] leading-relaxed text-foreground/90">
              {hero}
              {children}
              <FinalCta />
              <BackLink updatedAt={updatedAt} />
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

function FinalCta() {
  return (
    <section aria-labelledby="artikel-cta-heading" className="mt-14">
      <div className="rounded-3xl bg-primary p-8 text-primary-foreground shadow-lg sm:p-12">
        <h2
          id="artikel-cta-heading"
          className="font-display text-2xl font-medium tracking-tight sm:text-3xl"
        >
          Zelf ervaren wat yoga voor je doet?
        </h2>
        <p className="mt-4 max-w-2xl text-primary-foreground/90">
          Probeer 14 dagen onbeperkt verschillende lessen, docenten en tijden bij Yoga Zeeburg in
          Amsterdam Oost.
        </p>
        <a
          href={INTRO_URL}
          className="mt-7 inline-flex min-h-[44px] items-center rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-background/90"
        >
          Bekijk de 14-daagse Intro Pass
        </a>
        <p className="mt-3 text-sm text-primary-foreground/75">
          Voor nieuwe studenten. Stopt automatisch.
        </p>
      </div>
    </section>
  );
}

function BackLink({ updatedAt }: { updatedAt: string }) {
  return (
    <footer className="mt-14 border-t border-border/60 pt-6 text-sm text-muted-foreground">
      <p>
        Geschreven door <span className="font-medium text-foreground">Yoga Zeeburg</span> · Laatst
        bijgewerkt <time dateTime={updatedAt}>{formatDateNL(updatedAt)}</time>
      </p>
      <div className="mt-4">
        <Link
          to="/nl/kennisbank"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Terug naar Yoga Gids
        </Link>
      </div>
    </footer>
  );
}

function RelatedGrid({ related }: { related: ArticleRef[] }) {
  if (related.length === 0) return null;
  return (
    <section aria-labelledby="gerelateerd-heading" className="mt-14">
      <h2
        id="gerelateerd-heading"
        className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Gerelateerde artikelen
      </h2>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2">
        {related.map((r) => (
          <ArticleCard key={r.slug} article={r} />
        ))}
      </ul>
    </section>
  );
}

function FaqList({ faqs }: { faqs: ArticleFAQ[] }) {
  if (faqs.length === 0) return null;
  return (
    <section id="faq" aria-labelledby="faq-heading" className="mt-14">
      <h2
        id="faq-heading"
        className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Veelgestelde vragen
      </h2>
      <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
        {faqs.map((f) => (
          <div key={f.question} className="p-6">
            <dt className="font-display text-lg font-medium text-foreground">{f.question}</dt>
            <dd className="mt-2 text-foreground/85">{f.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function TocBlock({ toc }: { toc: ArticleTOCItem[] }) {
  if (toc.length === 0) return null;
  return (
    <nav
      aria-labelledby="toc-heading"
      className="mb-10 rounded-2xl border border-border bg-card p-6"
    >
      <h2
        id="toc-heading"
        className="font-display text-lg font-medium tracking-tight text-foreground"
      >
        Inhoud
      </h2>
      <ol className="mt-3 space-y-1.5 text-sm">
        {toc.map((item, i) => (
          <li key={item.id} className="flex gap-2">
            <span aria-hidden="true" className="tabular-nums text-muted-foreground">
              {String(i + 1).padStart(2, "0")}.
            </span>
            <a
              href={`#${item.id}`}
              className="text-foreground/85 underline-offset-4 hover:text-primary hover:underline"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// -- Legacy article rendering (unchanged behaviour) -----------------------

function LegacyArticleView({ slug, related }: { slug: string; related: ArticleRef[] }) {
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
        <section aria-labelledby="bronnen-heading" className="mt-14">
          <h2
            id="bronnen-heading"
            className="font-display text-xl font-medium tracking-tight text-foreground"
          >
            Bronnen
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {a.sources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4 hover:no-underline"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </ArticleShell>
  );
}

// -- DB article rendering (SafeMarkdownBody) -------------------------------

function DbSourcesList({ sources }: { sources: { title: string; url: string }[] }) {
  if (!sources || sources.length === 0) return null;
  return (
    <section aria-labelledby="bronnen-heading" className="mt-14">
      <h2
        id="bronnen-heading"
        className="font-display text-xl font-medium tracking-tight text-foreground"
      >
        Bronnen
      </h2>
      <ul className="mt-3 space-y-2 text-sm">
        {sources.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-primary underline underline-offset-4 hover:no-underline"
            >
              {s.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

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
      {view.template.showSources && <DbSourcesList sources={view.sources} />}
      {view.template.showRelated && <RelatedGrid related={related} />}
    </ArticleShell>
  );
}

export { DbSourcesList };

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
              to="/nl/kennisbank"
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
              to="/nl/kennisbank"
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
