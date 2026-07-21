import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/nl/kennisbank/categorie/$slug")({
  head: () => ({
    meta: [
      { title: "Categorie — Yoga Gids | Yoga Zeeburg" },
      { name: "robots", content: "noindex, follow" },
      {
        name: "description",
        content: "Deze categoriepagina van de Yoga Gids wordt binnenkort gevuld.",
      },
    ],
  }),
  component: ComingSoon,
});

function ComingSoon() {
  const { slug } = Route.useParams();
  return (
    <div lang="nl" className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="font-sans text-sm font-medium uppercase tracking-widest text-primary">
            Yoga Gids
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Deze categorie komt eraan
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            We werken aan de artikelen voor deze categorie
            {slug ? ` (${slug})` : ""}. Kom binnenkort terug of bekijk de andere onderwerpen in de Yoga Gids.
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
