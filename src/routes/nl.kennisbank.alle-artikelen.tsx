import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ArticleCard } from "@/components/kennisbank/ArticleCard";
import { getArticlesSortedByNewest } from "@/lib/kennisbank/articles";

const CANONICAL = "https://www.yogazeeburg.com/nl/kennisbank/alle-artikelen";

export const Route = createFileRoute("/nl/kennisbank/alle-artikelen")({
  loader: () => ({ articles: getArticlesSortedByNewest() }),
  head: ({ loaderData }) => {
    const hasArticles = (loaderData?.articles?.length ?? 0) > 0;
    return {
      meta: [
        { title: "Alle artikelen — Yoga Gids | Yoga Zeeburg" },
        {
          name: "robots",
          content: hasArticles ? "index, follow" : "noindex, follow",
        },
        {
          name: "description",
          content: hasArticles
            ? "Alle artikelen uit de Yoga Gids van Yoga Zeeburg: praktische, Nederlandstalige uitleg over yoga in Amsterdam Oost."
            : "Overzicht van alle artikelen in de Yoga Gids. Deze pagina wordt binnenkort gevuld.",
        },
      ],
      links: hasArticles ? [{ rel: "canonical", href: CANONICAL }] : [],
    };
  },
  component: AllArticlesPage,
});

function AllArticlesPage() {
  const { articles } = Route.useLoaderData();

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
              Alle artikelen
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
              Alle gepubliceerde artikelen in de Yoga Gids, met de nieuwste
              bovenaan.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          {articles.length > 0 ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </ul>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-card/70 p-8 text-center">
              <p className="text-foreground">
                Nog geen artikelen gepubliceerd.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Kom binnenkort terug voor de eerste praktische gidsen.
              </p>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
