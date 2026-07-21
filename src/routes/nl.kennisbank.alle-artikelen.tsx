import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/nl/kennisbank/alle-artikelen")({
  head: () => ({
    meta: [
      { title: "Alle artikelen — Yoga Gids | Yoga Zeeburg" },
      { name: "robots", content: "noindex, follow" },
      {
        name: "description",
        content:
          "Overzicht van alle artikelen in de Yoga Gids. Deze pagina wordt binnenkort gevuld.",
      },
    ],
  }),
  component: AllArticlesPlaceholder,
});

function AllArticlesPlaceholder() {
  return (
    <div lang="nl" className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="font-sans text-sm font-medium uppercase tracking-widest text-primary">
            Yoga Gids
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Alle artikelen
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            De volledige artikelenlijst verschijnt hier zodra de eerste
            praktische gidsen gepubliceerd zijn. We werken aan zorgvuldige,
            Nederlandstalige stukken.
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
