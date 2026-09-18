/**
 * Shared article chrome for the Yoga Gids detail pages.
 *
 * Extracted from the route file so the route's eager options (loader/head)
 * never pull article rendering code — and, crucially, so the legacy article
 * bodies stay out of the initial client bundle.
 */
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ArticleCard } from "@/components/kennisbank/ArticleCard";
import type { ArticleRef } from "@/lib/kennisbank/types";

const INTRO_URL = "/trial";

export function formatDateNL(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

export function ArticleShell({
  categoryTitle,
  categorySlug,
  title,
  h1,
  publishedAt,
  updatedAt,
  readingTimeMin,
  intro,
  hero,
  cta,
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
  cta?: { label: string; subtext?: string };
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
                    <Link to="/kennisbank" className="hover:text-foreground">
                      Yoga Gids
                    </Link>
                  </li>
                  <li aria-hidden="true">›</li>
                  <li>
                    <Link
                      to="/kennisbank/categorie/$slug"
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
              <FinalCta cta={cta} />
              <BackLink updatedAt={updatedAt} />
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

function FinalCta({ cta }: { cta?: { label: string; subtext?: string } }) {
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
          {cta?.label ?? "Bekijk de 14-daagse Intro Pass"}
        </a>
        <p className="mt-3 text-sm text-primary-foreground/75">
          {cta?.subtext ?? "Voor nieuwe studenten. Stopt automatisch."}
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
          to="/kennisbank"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Terug naar Yoga Gids
        </Link>
      </div>
    </footer>
  );
}

export function RelatedGrid({ related }: { related: ArticleRef[] }) {
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

export function FaqList({ faqs }: { faqs: { question: string; answer: string }[] }) {
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

export function TocBlock({ toc }: { toc: { id: string; label: string }[] }) {
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

export function SourcesList({
  sources,
  nofollow = true,
}: {
  sources: { title: string; url: string }[];
  nofollow?: boolean;
}) {
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
              rel={nofollow ? "noopener noreferrer nofollow" : "noopener noreferrer"}
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
