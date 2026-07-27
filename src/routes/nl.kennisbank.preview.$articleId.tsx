import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { getPreviewByArticleIdFn } from "@/lib/kennisbank/data.functions";
import { SafeMarkdownBody } from "@/components/kennisbank/SafeMarkdownBody";
import type { DbArticleViewModel } from "@/lib/kennisbank/types";

/**
 * Admin-only preview route. Never indexed, never in the sitemap, never in
 * lists/search/related. Requires an authenticated Supabase user who is a
 * `publication_admins` member; the server function validates both.
 *
 * The optional `?token=` query parameter is defence-in-depth only. A token
 * without a valid admin session is refused.
 */
export const Route = createFileRoute("/nl/kennisbank/preview/$articleId")({
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === "string" ? search.token : undefined,
  }),
  loaderDeps: ({ search }) => ({ token: search.token }),
  loader: async ({ params, deps }) => {
    const result = await getPreviewByArticleIdFn({
      data: { articleId: params.articleId, token: deps.token },
    });
    if (!result) throw notFound();
    return { view: result.view };
  },
  head: () => ({
    meta: [
      { title: "Voorvertoning — Yoga Gids | Yoga Zeeburg" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Interne voorvertoning." },
    ],
    // No canonical, no og:*, no JSON-LD — this page must never be indexable.
  }),
  component: PreviewPage,
  notFoundComponent: PreviewNotFound,
  errorComponent: PreviewError,
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

function PreviewPage() {
  const { view } = Route.useLoaderData();
  return <PreviewView view={view} />;
}

function PreviewView({ view }: { view: DbArticleViewModel }) {
  return (
    <div lang="nl" className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="border-b border-amber-500/50 bg-amber-100 text-amber-900">
          <div className="mx-auto max-w-3xl px-4 py-3 text-center text-sm font-medium sm:px-6 lg:px-8">
            Voorvertoning — deze pagina is niet openbaar en wordt niet geïndexeerd.
          </div>
        </div>
        <article>
          <header className="border-b border-border/60 bg-secondary/30">
            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
              <p className="font-sans text-sm font-medium uppercase tracking-widest text-primary">{view.category.title}</p>
              <h1 className="mt-2 font-display text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">{view.h1}</h1>
              <p className="mt-5 text-lg text-muted-foreground">{view.directAnswer}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <span>Voorvertoning bijgewerkt <time dateTime={view.updatedAt}>{formatDateNL(view.updatedAt)}</time></span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>{view.readingTimeMin} min lezen</span>
                </span>
              </div>
            </div>
          </header>
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
            <div className="text-[17px] leading-relaxed text-foreground/90">
              {view.template.showTOC && view.toc.length > 0 && (
                <nav aria-label="Inhoudsopgave" className="mb-10 rounded-2xl border border-border bg-card p-5">
                  <p className="font-display text-sm font-medium uppercase tracking-widest text-muted-foreground">Inhoud</p>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {view.toc.map((t) => (
                      <li key={t.id}><a href={`#${t.id}`} className="text-primary hover:underline">{t.label}</a></li>
                    ))}
                  </ul>
                </nav>
              )}
              <SafeMarkdownBody markdown={view.bodyMarkdown} />
              {view.template.showFAQ && view.faqs.length > 0 && (
                <section className="mt-14">
                  <h2 className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">Veelgestelde vragen</h2>
                  <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
                    {view.faqs.map((f) => (
                      <div key={f.question} className="p-6">
                        <dt className="font-display text-lg font-medium text-foreground">{f.question}</dt>
                        <dd className="mt-2 text-foreground/85">{f.answer}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}
              {view.template.showSources && view.sources.length > 0 && (
                <section aria-labelledby="preview-bronnen-heading" className="mt-14">
                  <h2 id="preview-bronnen-heading" className="font-display text-xl font-medium tracking-tight text-foreground">Bronnen</h2>
                  <ul className="mt-3 space-y-2 text-sm">
                    {view.sources.map((s) => (
                      <li key={s.url}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="text-primary underline underline-offset-4 hover:no-underline">{s.title}</a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              <section aria-labelledby="preview-cta-heading" className="mt-14 rounded-2xl border border-border bg-secondary/40 p-6">
                <h2 id="preview-cta-heading" className="font-display text-xl font-medium tracking-tight text-foreground">{view.cta.heading}</h2>
                <p className="mt-2 text-foreground/85">{view.cta.body}</p>
                <p className="mt-4 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">{view.cta.button}</p>
                <p className="mt-3 text-xs text-muted-foreground">{view.cta.subtext}</p>
              </section>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

function PreviewNotFound() {
  return (
    <div lang="nl" className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-medium tracking-tight text-foreground">Voorvertoning niet beschikbaar</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Er is geen voorvertoning voor dit artikel, of je hebt geen rechten om het te bekijken.</p>
          <div className="mt-8">
            <Link to="/nl/kennisbank" className="inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Terug naar Yoga Gids
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function PreviewError() {
  return (
    <div lang="nl" className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-medium tracking-tight text-foreground">Voorvertoning niet beschikbaar</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Log in als beheerder om de voorvertoning te bekijken.</p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
