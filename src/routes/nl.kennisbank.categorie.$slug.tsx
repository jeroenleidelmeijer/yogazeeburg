import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ArticleCard } from "@/components/kennisbank/ArticleCard";
import { getArticlesByCategory } from "@/lib/kennisbank/articles";

// Category slug → human title. Kept in sync with hub CATEGORIES.
const CATEGORY_TITLES: Record<string, string> = {
  "beginnen-met-yoga": "Beginnen met yoga",
  yogastijlen: "Yogastijlen uitgelegd",
  "stress-ontspanning-slaap": "Stress, ontspanning en slaap",
  "flexibiliteit-kracht-houding": "Flexibiliteit, kracht en houding",
  "klachten-en-levensfasen": "Yoga bij klachten en levensfasen",
  "yoga-amsterdam-oost": "Yoga in Amsterdam Oost",
};

export const Route = createFileRoute("/nl/kennisbank/categorie/$slug")({
  loader: ({ params }) => {
    const title = CATEGORY_TITLES[params.slug] ?? null;
    const articles = getArticlesByCategory(params.slug);
    return { slug: params.slug, title, articles };
  },
  head: ({ loaderData }) => {
    const known = loaderData?.title !== null;
    const hasArticles = (loaderData?.articles?.length ?? 0) > 0;
    const title = known
      ? `${loaderData!.title} — Yoga Gids | Yoga Zeeburg`
      : "Categorie — Yoga Gids | Yoga Zeeburg";
    return {
      meta: [
        { title },
        // Categorie-pagina's zijn nog beperkt in content; houd ze uit index
        // tot ze meerdere artikelen bevatten.
        {
          name: "robots",
          content: hasArticles ? "index, follow" : "noindex, follow",
        },
        {
          name: "description",
          content: hasArticles
            ? `Artikelen in de categorie ${loaderData!.title} van de Yoga Gids van Yoga Zeeburg.`
            : "Deze categoriepagina van de Yoga Gids wordt binnenkort gevuld.",
        },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { title, articles } = Route.useLoaderData() as { title: string | null; articles: import("@/lib/kennisbank/articles").Article[] };

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
            {articles.length === 0 && (
              <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
                We werken aan de artikelen voor deze categorie. Kom binnenkort
                terug of bekijk de andere onderwerpen in de Yoga Gids.
              </p>
            )}
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
            <div className="text-center">
              <Link
                to="/nl/kennisbank"
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
