import { createFileRoute, Link } from "@tanstack/react-router";
import type { ArticleRef } from "@/lib/kennisbank/types";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ArticleCard } from "@/components/kennisbank/ArticleCard";
import { listPublishedArticlesFn } from "@/lib/kennisbank/data.functions";
import { byCategory, sortByNewest } from "@/lib/kennisbank/compose";
import { CATEGORY_BY_SLUG } from "@/lib/kennisbank/categories";

const BASE = "https://www.yogazeeburg.com";

export const Route = createFileRoute("/kennisbank/categorie/$slug")({
  loader: async ({ params }) => {
    const meta = CATEGORY_BY_SLUG[params.slug];
    const all = await listPublishedArticlesFn();
    const articles = sortByNewest(byCategory(all, params.slug));
    return {
      slug: params.slug,
      title: meta?.title ?? null,
      intro: meta?.intro ?? null,
      seoTitle: meta?.seoTitle ?? null,
      seoDescription: meta?.seoDescription ?? null,
      ogImage: meta ? `${BASE}${meta.ogImagePath}` : null,
      articles,
    };
  },
  head: ({ loaderData }) => {
    const known = loaderData?.title != null;
    const articles = loaderData?.articles ?? [];
    // A category page is only an indexable topical hub when we know it AND it
    // actually has published articles. Unknown slugs and empty (but valid)
    // categories stay noindex, follow and out of the sitemap — they must not
    // become misleading landing pages.
    const indexable = known && articles.length > 0;

    if (!indexable) {
      return {
        meta: [
          {
            title: known
              ? `${loaderData!.title} — Yoga Gids | Yoga Zeeburg`
              : "Categorie — Yoga Gids | Yoga Zeeburg",
          },
          { name: "robots", content: "noindex, follow" },
          {
            name: "description",
            content: known
              ? `Artikelen in de categorie ${loaderData!.title} van de Yoga Gids van Yoga Zeeburg. Deze categorie wordt binnenkort gevuld.`
              : "Deze categoriepagina van de Yoga Gids wordt binnenkort gevuld.",
          },
        ],
      };
    }

    const canonical = `${BASE}/kennisbank/categorie/${loaderData!.slug}`;
    const title = loaderData!.seoTitle!;
    const description = loaderData!.seoDescription!;
    const ogImage = loaderData!.ogImage!;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
        { property: "og:image", content: ogImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: ogImage },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: loaderData!.title,
            headline: loaderData!.title,
            description,
            url: canonical,
            inLanguage: "nl-NL",
            image: [ogImage],
            isPartOf: {
              "@type": "WebSite",
              name: "Yoga Zeeburg",
              url: `${BASE}/`,
            },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: articles.map((a: ArticleRef, i: number) => ({
                "@type": "ListItem",
                position: i + 1,
                name: a.title,
                url: `${BASE}/kennisbank/${a.slug}`,
              })),
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
              { "@type": "ListItem", position: 2, name: "Yoga Gids", item: `${BASE}/kennisbank` },
              { "@type": "ListItem", position: 3, name: loaderData!.title, item: canonical },
            ],
          }),
        },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { title, intro, articles } = Route.useLoaderData();

  return (
    <div lang="nl" className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border/60 bg-secondary/30">
          <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 md:py-16 lg:px-8">
            <p className="font-sans text-sm font-medium uppercase tracking-widest text-primary">
              Yoga Gids
            </p>
            <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
              {title ?? "Categorie"}
            </h1>
            {intro && articles.length > 0 && (
              <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p>
            )}
            {articles.length === 0 && (
              <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
                We werken aan de artikelen voor deze categorie. Kom binnenkort terug of bekijk de
                andere onderwerpen in de Yoga Gids.
              </p>
            )}
          </div>
        </section>
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          {articles.length > 0 ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a: ArticleRef) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </ul>
          ) : (
            <div className="text-center">
              <Link
                to="/kennisbank"
                className="inline-flex min-h-[44px] items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Terug naar Yoga Gids
              </Link>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
