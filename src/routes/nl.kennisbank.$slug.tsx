import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  getArticleBySlug,
  getRelatedArticles,
  type Article,
  type ArticleTOCItem,
  type ArticleFAQ,
} from "@/lib/kennisbank/articles";
import { ArticleCard } from "@/components/kennisbank/ArticleCard";

const BASE = "https://www.yogazeeburg.com";

export const Route = createFileRoute("/nl/kennisbank/$slug")({
  loader: ({ params }) => {
    const article = getArticleBySlug(params.slug);
    if (!article) throw notFound();
    return { article };
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
    const a = loaderData.article;
    const canonical = `${BASE}/nl/kennisbank/${params.slug}`;
    return {
      meta: [
        { title: a.seoTitle },
        { name: "description", content: a.description },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: a.seoTitle },
        { property: "og:description", content: a.description },
        { property: "og:url", content: canonical },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: a.publishedAt },
        { property: "article:modified_time", content: a.updatedAt },
        { property: "article:author", content: "Yoga Zeeburg" },
        { property: "article:section", content: a.category.title },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: a.seoTitle },
        { name: "twitter:description", content: a.description },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.h1,
            description: a.description,
            inLanguage: "nl-NL",
            datePublished: a.publishedAt,
            dateModified: a.updatedAt,
            mainEntityOfPage: canonical,
            author: {
              "@type": "Organization",
              name: "Yoga Zeeburg",
              url: `${BASE}/`,
            },
            publisher: {
              "@type": "Organization",
              name: "Yoga Zeeburg",
              url: `${BASE}/`,
            },
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
                name: a.category.title,
                item: `${BASE}/nl/kennisbank/categorie/${a.category.slug}`,
              },
              { "@type": "ListItem", position: 4, name: a.title, item: canonical },
            ],
          }),
        },
        ...(a.template.showFAQ && a.faqs.length > 0
          ? [
              {
                type: "application/ld+json" as const,
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: a.faqs.map((f: ArticleFAQ) => ({
                    "@type": "Question",
                    name: f.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: f.answer,
                    },
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
  const { article: a } = Route.useLoaderData() as { article: Article };
  const Body = a.body;
  const related = a.template.showRelated ? getRelatedArticles(a.slug, 2) : [];


  return (
    <div lang="nl" className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <article>
          {/* Header */}
          <header className="border-b border-border/60 bg-secondary/30">
            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
              <nav
                aria-label="Kruimelpad"
                className="text-sm text-muted-foreground"
              >
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
                      params={{ slug: a.category.slug }}
                      className="hover:text-foreground"
                    >
                      {a.category.title}
                    </Link>
                  </li>
                  <li aria-hidden="true">›</li>
                  <li aria-current="page" className="text-foreground/80">
                    {a.title}
                  </li>
                </ol>
              </nav>

              <p className="mt-6 font-sans text-sm font-medium uppercase tracking-widest text-primary">
                {a.category.title}
              </p>
              <h1 className="mt-2 font-display text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {a.h1}
              </h1>
              <p className="mt-5 text-lg text-muted-foreground">
                Praktische, warme uitleg over hoe een eerste yogales in
                Amsterdam Oost werkt — zonder marketingtaal en zonder
                prestatiedruk.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-foreground/70">Door</span>
                  <span className="font-medium text-foreground">Yoga Zeeburg</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <span>
                    Gepubliceerd{" "}
                    <time dateTime={a.publishedAt}>
                      {formatDateNL(a.publishedAt)}
                    </time>
                  </span>
                </span>
                {a.updatedAt !== a.publishedAt && (
                  <span className="inline-flex items-center gap-1.5">
                    <span>
                      Bijgewerkt{" "}
                      <time dateTime={a.updatedAt}>
                        {formatDateNL(a.updatedAt)}
                      </time>
                    </span>
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>{a.readingTimeMin} min lezen</span>
                </span>
              </div>
            </div>
          </header>

          {/* Body */}
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
            <div className="text-[17px] leading-relaxed text-foreground/90">
              {/* TOC */}
              {a.template.showTOC && a.toc.length > 0 && (
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
                    {a.toc.map((item: ArticleTOCItem, i: number) => (
                      <li key={item.id} className="flex gap-2">
                        <span
                          aria-hidden="true"
                          className="tabular-nums text-muted-foreground"
                        >
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
              )}

              <Body />

              {/* FAQ */}
              {a.template.showFAQ && a.faqs.length > 0 && (
                <section
                  id="faq"
                  aria-labelledby="faq-heading"
                  className="mt-14"
                >
                  <h2
                    id="faq-heading"
                    className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
                  >
                    Veelgestelde vragen
                  </h2>
                  <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
                    {a.faqs.map((f: ArticleFAQ) => (
                      <div key={f.question} className="p-6">
                        <dt className="font-display text-lg font-medium text-foreground">
                          {f.question}
                        </dt>
                        <dd className="mt-2 text-foreground/85">{f.answer}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {/* Final CTA */}
              <section
                aria-labelledby="artikel-cta-heading"
                className="mt-14"
              >
                <div className="rounded-3xl bg-primary p-8 text-primary-foreground shadow-lg sm:p-12">
                  <h2
                    id="artikel-cta-heading"
                    className="font-display text-2xl font-medium tracking-tight sm:text-3xl"
                  >
                    Zelf ervaren wat yoga voor je doet?
                  </h2>
                  <p className="mt-4 max-w-2xl text-primary-foreground/90">
                    Probeer 14 dagen onbeperkt verschillende lessen, docenten
                    en tijden bij Yoga Zeeburg in Amsterdam Oost.
                  </p>
                  <a
                    href="https://crossfitzeeburg.sportbitapp.nl/web/nl/registreren/lidmaatschap?r=42"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex min-h-[44px] items-center rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-background/90"
                  >
                    Start je 14 dagen onbeperkt
                  </a>
                  <p className="mt-3 text-sm text-primary-foreground/75">
                    Voor nieuwe studenten. Stopt automatisch.
                  </p>
                </div>
              </section>

              {/* Sources */}
              {a.template.showSources && a.sources && a.sources.length > 0 && (
                <section aria-labelledby="bronnen-heading" className="mt-14">
                  <h2
                    id="bronnen-heading"
                    className="font-display text-xl font-medium tracking-tight text-foreground"
                  >
                    Bronnen
                  </h2>
                  <ul className="mt-3 space-y-2 text-sm">
                    {a.sources.map((s: { title: string; url: string }) => (
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

              {/* Footer meta + back */}
              <footer className="mt-14 border-t border-border/60 pt-6 text-sm text-muted-foreground">
                <p>
                  Geschreven door{" "}
                  <span className="font-medium text-foreground">Yoga Zeeburg</span>{" "}
                  · Laatst bijgewerkt{" "}
                  <time dateTime={a.updatedAt}>{formatDateNL(a.updatedAt)}</time>
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
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
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
            Dit artikel bestaat niet of is verplaatst. Bekijk de Yoga Gids voor
            de beschikbare onderwerpen.
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
