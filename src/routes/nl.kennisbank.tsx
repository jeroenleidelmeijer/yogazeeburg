import { createFileRoute, Link } from "@tanstack/react-router";
import { useId, useMemo, useState } from "react";
import {
  Sparkles,
  Leaf,
  Moon,
  Activity,
  HeartPulse,
  MapPin,
  Search,
  X,
  BookOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ArticleCard } from "@/components/kennisbank/ArticleCard";
import {
  ARTICLES,
  getRecommendedArticles,
  getArticlesSortedByNewest,
  getArticlesByCategory,
} from "@/lib/kennisbank/articles";

const INTRO_URL =
  "https://crossfitzeeburg.sportbitapp.nl/web/nl/registreren/lidmaatschap?r=42";
const CANONICAL = "https://www.yogazeeburg.com/nl/kennisbank";

type QuickChoice = {
  value: "beginner" | "ontspanning" | "flexibiliteit" | "yogastijlen";
  label: string;
};

const QUICK_CHOICES: QuickChoice[] = [
  { value: "beginner", label: "Ik ben beginner" },
  { value: "ontspanning", label: "Ik zoek ontspanning" },
  { value: "flexibiliteit", label: "Ik wil soepeler worden" },
  { value: "yogastijlen", label: "Ik zoek een yogastijl" },
];

type Category = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  keywords: string[];
  filters: QuickChoice["value"][];
};

const CATEGORIES: Category[] = [
  {
    slug: "beginnen-met-yoga",
    title: "Beginnen met yoga",
    description:
      "Rustige uitleg voor wie net start: wat je nodig hebt, wat je kunt verwachten en hoe je zonder stress je eerste les kiest.",
    icon: Sparkles,
    keywords: ["beginner", "starten", "eerste les", "proefles", "basics"],
    filters: ["beginner"],
  },
  {
    slug: "yogastijlen",
    title: "Yogastijlen uitgelegd",
    description:
      "Vinyasa, Hatha, Yin, restorative en meer. Ontdek welke stijl bij jouw energie, doel en week past.",
    icon: Leaf,
    keywords: ["stijlen", "vinyasa", "hatha", "yin", "restorative", "ashtanga"],
    filters: ["yogastijlen"],
  },
  {
    slug: "stress-ontspanning-slaap",
    title: "Stress, ontspanning en slaap",
    description:
      "Praktische yoga en ademhaling om je zenuwstelsel te kalmeren, spanning los te laten en beter te slapen.",
    icon: Moon,
    keywords: ["stress", "ontspanning", "slaap", "ademhaling", "rust", "burn-out"],
    filters: ["ontspanning"],
  },
  {
    slug: "flexibiliteit-kracht-houding",
    title: "Flexibiliteit, kracht en houding",
    description:
      "Soepeler worden, meer kracht opbouwen en je houding verbeteren — stap voor stap, zonder forceren.",
    icon: Activity,
    keywords: ["flexibiliteit", "soepel", "kracht", "houding", "mobiliteit", "rug"],
    filters: ["flexibiliteit"],
  },
  {
    slug: "klachten-en-levensfasen",
    title: "Yoga bij klachten en levensfasen",
    description:
      "Voorzichtige informatie over yoga bij rugpijn, zwangerschap, menopauze en andere levensfasen.",
    icon: HeartPulse,
    keywords: [
      "klachten",
      "rugpijn",
      "nek",
      "zwangerschap",
      "menopauze",
      "ouder",
      "blessure",
    ],
    filters: [],
  },
  {
    slug: "yoga-amsterdam-oost",
    title: "Yoga in Amsterdam Oost",
    description:
      "Alles over yoga in de buurt: Zeeburg, Cruquius, IJburg en Indische Buurt — inclusief tips om vol te houden.",
    icon: MapPin,
    keywords: [
      "amsterdam",
      "oost",
      "zeeburg",
      "cruquius",
      "ijburg",
      "indische buurt",
      "buurt",
    ],
    filters: [],
  },
];

export const Route = createFileRoute("/nl/kennisbank")({
  head: () => ({
    meta: [
      {
        title: "Yoga Gids | Praktische informatie over yoga | Yoga Zeeburg",
      },
      {
        name: "description",
        content:
          "Yoga Gids van Yoga Zeeburg in Amsterdam Oost: heldere, praktische uitleg over yoga, yogastijlen, ontspanning, flexibiliteit en beginnen met yoga.",
      },
      { property: "og:title", content: "Yoga Gids | Yoga Zeeburg" },
      {
        property: "og:description",
        content:
          "Heldere, praktische informatie over yoga, yogastijlen, ontspanning en flexibiliteit — voor iedereen in Amsterdam Oost.",
      },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Yoga Gids | Yoga Zeeburg" },
      {
        name: "twitter:description",
        content:
          "Heldere, praktische informatie over yoga, yogastijlen, ontspanning en flexibiliteit.",
      },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Yoga Gids",
          url: CANONICAL,
          inLanguage: "nl-NL",
          description:
            "Heldere en praktische informatie over yoga, yogastijlen, ontspanning, flexibiliteit en beginnen met yoga.",
          isPartOf: {
            "@type": "WebSite",
            name: "Yoga Zeeburg",
            url: "https://www.yogazeeburg.com/",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.yogazeeburg.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Yoga Gids",
              item: CANONICAL,
            },
          ],
        }),
      },
    ],
  }),
  component: KennisbankPage,
});

function KennisbankPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<QuickChoice["value"] | null>(
    null,
  );
  const searchId = useId();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATEGORIES.filter((c) => {
      if (activeFilter && !c.filters.includes(activeFilter)) return false;
      if (!q) return true;
      const hay = [c.title, c.description, ...c.keywords].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [query, activeFilter]);

  const hasActiveFilter = query.trim() !== "" || activeFilter !== null;

  const clearFilters = () => {
    setQuery("");
    setActiveFilter(null);
  };

  return (
    <div lang="nl" className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border/60 bg-secondary/40">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
            <p className="font-sans text-sm font-medium uppercase tracking-widest text-primary">
              Yoga Zeeburg
            </p>
            <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Yoga Gids
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Heldere en praktische informatie over yoga, yogastijlen,
              ontspanning, flexibiliteit en beginnen met yoga. Geschreven voor
              iedereen die yoga beter wil begrijpen of zelf wil ervaren.
            </p>
          </div>
        </section>

        {/* Search + Filters */}
        <section className="border-b border-border/60">
          <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
            <form
              role="search"
              onSubmit={(e) => e.preventDefault()}
              className="relative"
            >
              <label htmlFor={searchId} className="sr-only">
                Zoek in de Yoga Gids
              </label>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Waar wil je meer over weten?"
                className="w-full rounded-full border border-border bg-card py-3.5 pl-12 pr-4 text-base text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              />
            </form>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {QUICK_CHOICES.map((choice) => {
                const active = activeFilter === choice.value;
                return (
                  <button
                    key={choice.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      setActiveFilter(active ? null : choice.value)
                    }
                    className={`inline-flex min-h-[44px] items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground/85 hover:bg-muted"
                    }`}
                  >
                    {choice.label}
                  </button>
                );
              })}
              {hasActiveFilter && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                  Filters wissen
                </button>
              )}
            </div>

            <p role="status" aria-live="polite" className="sr-only">
              {filtered.length}{" "}
              {filtered.length === 1 ? "categorie gevonden" : "categorieën gevonden"}
            </p>
          </div>
        </section>

        {/* Categories */}
        <section aria-labelledby="categorieen-heading" className="bg-background">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2
                  id="categorieen-heading"
                  className="font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl"
                >
                  Kies een onderwerp
                </h2>
                <p className="mt-2 max-w-xl text-muted-foreground">
                  Zes duidelijke categorieën om snel te vinden wat past bij
                  jouw vraag of moment.
                </p>
              </div>
              {hasActiveFilter && (
                <p className="text-sm text-muted-foreground" aria-hidden="true">
                  {filtered.length} van {CATEGORIES.length} categorieën
                </p>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="mt-10 rounded-2xl border border-border bg-card p-8 text-center">
                <p className="text-foreground">
                  Geen categorieën gevonden voor je zoekopdracht.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 inline-flex min-h-[44px] items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Filters wissen
                </button>
              </div>
            ) : (
              <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((c) => {
                  const Icon = c.icon;
                  return (
                    <li key={c.slug}>
                      <Link
                        to="/nl/kennisbank/categorie/$slug"
                        params={{ slug: c.slug }}
                        className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <span
                          aria-hidden="true"
                          className="grid h-12 w-12 place-items-center rounded-xl bg-sage/30 text-primary"
                        >
                          <Icon className="h-6 w-6" />
                        </span>
                        <h3 className="mt-5 font-display text-xl font-medium text-foreground">
                          {c.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {c.description}
                        </p>
                        <span className="mt-5 text-sm font-medium text-primary group-hover:underline">
                          Bekijk alle artikelen →
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>

        {/* Recommended */}
        <section
          aria-labelledby="aanbevolen-heading"
          className="border-t border-border/60 bg-secondary/30"
        >
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
            <h2
              id="aanbevolen-heading"
              className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
            >
              Aanbevolen artikelen
            </h2>
            {recommended.length > 0 ? (
              <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                {recommended.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </ul>
            ) : (
              <div className="mt-5 rounded-2xl border border-dashed border-border bg-card/70 p-8 text-center">
                <BookOpen
                  aria-hidden="true"
                  className="mx-auto h-8 w-8 text-primary"
                />
                <p className="mt-4 text-foreground">
                  We werken aan de eerste praktische gidsen.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Binnenkort verschijnen hier zorgvuldig geschreven artikelen om
                  je op weg te helpen.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Intro Pass CTA */}
        <section aria-labelledby="cta-heading" className="bg-background">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
            <div className="rounded-3xl bg-primary p-8 text-primary-foreground shadow-lg sm:p-12">
              <h2
                id="cta-heading"
                className="font-display text-3xl font-medium tracking-tight sm:text-4xl"
              >
                Zelf ervaren wat yoga voor je doet?
              </h2>
              <p className="mt-4 max-w-2xl text-primary-foreground/90">
                Probeer 14 dagen onbeperkt verschillende lessen, docenten en
                tijden bij Yoga Zeeburg in Amsterdam Oost.
              </p>
              <a
                href={INTRO_URL}
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
          </div>
        </section>

        {/* Newest */}
        <section
          aria-labelledby="nieuwste-heading"
          className="border-t border-border/60 bg-secondary/30"
        >
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
            <h2
              id="nieuwste-heading"
              className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
            >
              Nieuw in de Yoga Gids
            </h2>
            <div className="mt-5 rounded-2xl border border-dashed border-border bg-card/70 p-8 text-center">
              <p className="text-foreground">
                Nog geen artikelen gepubliceerd.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                De redactie werkt aan de eerste reeks praktische stukken.
                Kom binnenkort terug.
              </p>
            </div>

            <div className="mt-8 text-center">
              <Link
                to="/nl/kennisbank/alle-artikelen"
                className="inline-flex min-h-[44px] items-center rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Bekijk alle artikelen
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
