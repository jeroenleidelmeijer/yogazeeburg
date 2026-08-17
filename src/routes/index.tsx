import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { commercialLinks } from "@/lib/i18n";

const INTRO_URL = "/trial";
const MAPS_URL = "https://www.google.com/maps/dir/?api=1&destination=Cruquiusweg+96F+Amsterdam";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yoga Zeeburg | Down-to-earth yoga in Amsterdam Oost" },
      {
        name: "description",
        content:
          "Rustige, down-to-earth yoga in Amsterdam Oost bij Yoga Zeeburg. Start met 14 dagen onbeperkt yoga en bouw een wekelijk ritme dat bij je leven past.",
      },
      { property: "og:title", content: "Yoga Zeeburg | Down-to-earth yoga in Amsterdam Oost" },
      {
        property: "og:description",
        content:
          "Rustige, down-to-earth yoga in Amsterdam Oost, aan het water in Zeeburg/Cruquius. Start met 14 dagen onbeperkt yoga.",
      },
      { property: "og:url", content: "https://www.yogazeeburg.com/" },
    ],
    links: commercialLinks("nl", "home"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ExerciseGym",
          name: "Yoga Zeeburg",
          description:
            "Kleine, down-to-earth yogastudio in Amsterdam Oost, aan het water in Zeeburg / Cruquius. Laagdrempelige lessen, persoonlijke begeleiding en een rustige plek om te bewegen en adem te halen.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Cruquiusweg 96F",
            addressLocality: "Amsterdam",
            postalCode: "1019 AH",
            addressCountry: "NL",
          },
          areaServed: ["Amsterdam Oost", "Zeeburg", "Cruquius", "Oostelijk Havengebied"],
          url: "https://www.yogazeeburg.com/",
          email: "hello@yogazeeburg.com",
          inLanguage: "nl-NL",
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader locale="nl" page="home" />
      <main>
        <Hero />
        <Benefits />
        <IntroPass />
        <WhyUs />
        <ClassDirections />
        <PricingTeaser />
        <Location />
        <FinalCTA />
      </main>
      <SiteFooter locale="nl" />
    </div>
  );
}

/* ============================================================
   HERO — editorial, typography-led. No stock image.
   ============================================================ */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80%] bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--color-sage)_18%,transparent),transparent_70%)]"
      />
      <div className="mx-auto max-w-4xl px-4 pb-20 pt-12 text-center sm:px-6 md:pb-28 md:pt-20 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-clay" />
          Yoga Zeeburg · Amsterdam Oost
        </span>
        <h1 className="mx-auto mt-7 max-w-4xl font-display text-[2.5rem] leading-[1.05] tracking-tight text-foreground sm:text-[3.5rem] md:text-[4.25rem] lg:text-[4.75rem]">
          Te druk voor yoga?{" "}
          <span className="text-primary italic">Dat is waarschijnlijk precies waarom je het nodig hebt.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:mt-8 md:text-xl">
          Yoga Zeeburg is een kleine, down-to-earth yogastudio in Amsterdam Oost voor drukke mensen
          die willen bewegen, ademhalen en weer landen in hun lijf. Denk aan laagdrempelige lessen,
          persoonlijke begeleiding en een rustige plek aan het water.
        </p>
        <div className="mx-auto mt-9 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
          <a
            href={INTRO_URL}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Start met 14 dagen onbeperkt
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/prijzen"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-4 text-base font-medium text-foreground transition-colors hover:bg-muted"
          >
            Bekijk prijzen
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          14 dagen onbeperkt introductiepas · stopt automatisch · alleen voor nieuwe leerlingen
        </p>
        <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            Cruquiusweg 96F · aan het water
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
          <span>Kleine, persoonlijke studio · laagdrempelig</span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   BENEFITS — editorial numbered list, not tiny cards
   ============================================================ */
const BENEFITS = [
  { title: "Voel je rustiger", body: "Stap uit de herrie en kom weer terug in je lichaam." },
  {
    title: "Laat spanning los",
    body: "Geef vastzittende schouders, heupen en je onderrug de ruimte om te ontspannen.",
  },
  { title: "Beweeg soepeler", body: "Bouw mobiliteit en gemak op zonder je lichaam te forceren." },
  { title: "Adem dieper", body: "Vertraag je ademhaling en voel je meer geaard." },
  { title: "Bouw een wekelijks ritme", body: "Creëer een ritme dat bij het echte leven past." },
];

function Benefits() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div className="md:sticky md:top-28 md:self-start">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
              Wat er verandert als je komt
            </span>
            <h2 className="mt-5 font-display text-[2.25rem] leading-[1.05] text-foreground sm:text-5xl md:text-[3.25rem]">
              Je hebt geen extra druk nodig.
              <br />
              <span className="text-primary italic">Je hebt een wekelijkse reset nodig.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              Een rustig uur op de mat kan de rest van je week veranderen. Geen perfecte houdingen
              of prestatiedruk — gewoon ruimte om te vertragen, te bewegen en adem te halen.
            </p>
          </div>

          <ol className="divide-y divide-border/70 border-y border-border/70">
            {BENEFITS.map((b, i) => (
              <li key={b.title} className="grid grid-cols-[auto_1fr] items-baseline gap-6 py-7">
                <span className="font-display text-3xl text-clay tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl text-foreground">{b.title}</h3>
                  <p className="mt-1.5 text-[15.5px] leading-relaxed text-muted-foreground">
                    {b.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   INTRO PASS — full-width warm panel, three-step feel, no price
   ============================================================ */
const INTRO_STEPS = [
  {
    label: "Stap 1",
    title: "Start je introductiepas",
    body: "Boek je eerste les en kom zoals je bent. Je hebt geen yoga-ervaring of uitzonderlijke lenigheid nodig.",
  },
  {
    label: "Stap 2",
    title: "Probeer verschillende lessen",
    body: "Ontdek rustigere, kalmerende sessies en meer actieve lessen bij verschillende docenten en tijden.",
  },
  {
    label: "Stap 3",
    title: "Kies je ritme",
    body: "Na 14 dagen bepaal je welke lessen en welk abonnement bij je leven passen.",
  },
];

function IntroPass() {
  return (
    <section className="px-4 pb-24 sm:px-6 md:pb-32 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-border/60 bg-secondary/60 shadow-sm">
        <div className="relative px-8 pb-14 pt-12 sm:px-12 md:px-16 md:pb-20 md:pt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-clay/15 blur-3xl"
          />
          <div
            className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-sage/20 blur-3xl"
            aria-hidden
          />

          <div className="relative">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
              De makkelijkste eerste stap
            </span>
            <h2 className="mt-4 max-w-3xl font-display text-[2.25rem] leading-[1.05] text-foreground sm:text-5xl md:text-[3rem]">
              14 dagen onbeperkt yoga. Dan weet je het.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Met de 14-daagse onbeperkte introductiepas kunnen nieuwe leerlingen 14 dagen achter
              elkaar verschillende lessen, docenten en tijden uitproberen. Kies daarna het ritme
              dat past bij je lichaam, energie en week.
            </p>

            <ol className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
              {INTRO_STEPS.map((s) => (
                <li key={s.label} className="border-t border-border/70 pt-5">
                  <span className="text-xs font-medium uppercase tracking-wide text-clay">
                    {s.label}
                  </span>
                  <h3 className="mt-2 font-display text-xl text-foreground">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
                </li>
              ))}
            </ol>

            <div className="mt-12 flex flex-wrap items-center gap-6">
              <a
                href={INTRO_URL}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Start met 14 dagen onbeperkt
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="text-sm text-muted-foreground">
                Stopt automatisch · geen verborgen abonnement · alleen voor nieuwe leerlingen
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   WHY — warm positioning, prose + inline points, no card grid
   ============================================================ */
const WHY_POINTS = [
  "Down-to-earth",
  "Klein & persoonlijk",
  "Laagdrempelig",
  "Duidelijke lesbeschrijvingen",
  "Geworteld in Amsterdam Oost",
];

function WhyUs() {
  return (
    <section className="relative bg-[color-mix(in_oklab,var(--color-clay)_5%,var(--color-background))] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1fr_1fr] md:items-center md:gap-20">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
            Waarom Yoga Zeeburg
          </span>
          <h2 className="mt-5 font-display text-[2.25rem] leading-[1.05] text-foreground sm:text-5xl md:text-[3.25rem]">
            Een kleine yogastudio in Amsterdam Oost, gemaakt voor het echte leven.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/90">
            <p>
              Yoga Zeeburg zit aan de Cruquiusweg 96F, boven CrossFit Zeeburg in Cruquius — waar
              Zeeburg het Oostelijk Havengebied ontmoet, vlak aan het water.
            </p>
            <p className="text-muted-foreground">
              De studio is klein, persoonlijk en laagdrempelig. Docenten begeleiden duidelijk en
              zonder druk, terwijl lesbeschrijvingen je vertellen wat je kunt verwachten voordat je
              boekt. Praktische, down-to-earth yoga voor echte lichamen en drukke weken.
            </p>
          </div>
          <div className="mt-8">
            <a
              href={INTRO_URL}
              className="inline-flex items-center gap-2 text-base font-medium text-primary hover:underline"
            >
              Kom een les proberen
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-sage/25 blur-3xl" aria-hidden />
          <div className="rounded-[2rem] border border-border/60 bg-background/80 p-8 shadow-sm backdrop-blur sm:p-10">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
              In de buurt
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {WHY_POINTS.map((p) => (
                <li
                  key={p}
                  className="rounded-full border border-border bg-background px-3.5 py-1.5 text-sm text-foreground/85"
                >
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-border/70 pt-6">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <span className="text-foreground">Cruquiusweg 96F</span>, Amsterdam Oost · Zeeburg
                  / Cruquius · Oostelijk Havengebied · boven CrossFit Zeeburg
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CLASS DIRECTIONS — question-led guidance list
   ============================================================ */
const DIRECTIONS = [
  {
    q: "Moet je vertragen?",
    a: "Zachte, aardende lessen voor wanneer je hoofd vol zit en je lichaam moet uitademen.",
  },
  {
    q: "Wil je bewegen?",
    a: "Actievere yogalessen voor energie, focus en een gezond zweetje.",
  },
  {
    q: "Voel je je stijf?",
    a: "Rustigere sessies die meer ruimte en gemak in je lichaam creëren.",
  },
  {
    q: "Nieuw met yoga?",
    a: "Laagdrempelige begeleiding, duidelijke beschrijvingen en geen prestatiedruk.",
  },
];

function ClassDirections() {
  return (
    <section className="px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-clay">Lessen</span>
          <h2 className="mt-5 font-display text-[2.25rem] leading-[1.05] text-foreground sm:text-5xl md:text-[3.25rem]">
            Kies op basis van wat je vandaag nodig hebt.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Sommige dagen vragen om rust, andere om beweging. Kies een les die past bij hoe je je
            voelt.
          </p>
        </div>

        <ul className="mt-14 divide-y divide-border/70 border-y border-border/70">
          {DIRECTIONS.map((d) => (
            <li
              key={d.q}
              className="grid grid-cols-1 items-baseline gap-3 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:gap-14"
            >
              <h3 className="font-display text-2xl text-foreground md:text-3xl">{d.q}</h3>
              <p className="text-[15.5px] leading-relaxed text-muted-foreground md:text-base">
                {d.a}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            to="/lessen"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
          >
            Bekijk alle lessen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PRICING TEASER — short editorial band, no prices
   ============================================================ */
function PricingTeaser() {
  return (
    <section className="px-4 pb-24 sm:px-6 md:pb-32 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-border/60 bg-background px-8 py-14 shadow-sm sm:px-12 md:px-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.4fr_auto] md:items-end md:gap-14">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
              Prijzen
            </span>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.08] text-foreground sm:text-4xl md:text-[2.75rem]">
              Bouw een yogaritme dat bij je week past.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Begin met de introductiepas. Zodra je weet wat werkt, kies je een abonnement dat yoga
              onderdeel maakt van je week. Hoe consistenter je oefent, hoe beter de waarde.
            </p>
          </div>
          <Link
            to="/prijzen"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Bekijk prijzen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   LOCATION — clean, trustworthy location card. No fake map.
   ============================================================ */
function Location() {
  return (
    <section className="bg-[color-mix(in_oklab,var(--color-sage)_10%,var(--color-background))] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1fr_1fr] md:items-center md:gap-20">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-clay">Vind ons</span>
          <h2 className="mt-5 font-display text-[2.25rem] leading-[1.05] text-foreground sm:text-5xl md:text-[3.25rem]">
            Een rustige ruimte, net weg van de drukte.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Onze yogastudio zit boven CrossFit Zeeburg, aan het water in Cruquius. Makkelijk te
            bereiken vanuit Zeeburg, Amsterdam Oost en het Oostelijk Havengebied.
          </p>
        </div>

        <div className="rounded-[2rem] border border-border/60 bg-background/90 p-8 shadow-sm backdrop-blur sm:p-10">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-clay">
            <MapPin className="h-3.5 w-3.5" />
            Adres studio
          </div>
          <address className="mt-5 not-italic">
            <div className="font-display text-[1.75rem] leading-tight text-foreground">
              Yoga Zeeburg
            </div>
            <div className="mt-3 text-lg text-foreground/90">Cruquiusweg 96F</div>
            <div className="text-lg text-foreground/90">1019 AH Amsterdam</div>
          </address>
          <div className="mt-6 space-y-1.5 text-[15px] text-muted-foreground">
            <div>Boven CrossFit Zeeburg</div>
            <div>Aan het water in Cruquius</div>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
            {["Amsterdam Oost", "Zeeburg", "Oostelijk Havengebied"].map((t) => (
              <li key={t} className="rounded-full border border-border bg-background px-3 py-1">
                {t}
              </li>
            ))}
          </ul>
          <a
            href={MAPS_URL}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:w-auto"
          >
            Open in Google Maps
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FINAL CTA — warm invitation, not a loud banner
   ============================================================ */
function FinalCTA() {
  return (
    <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-border/50 bg-primary/95 px-8 py-16 text-center text-primary-foreground shadow-[0_10px_40px_-20px_rgba(0,0,0,0.25)] sm:px-12 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-clay/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-sage/15 blur-3xl"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl font-display text-[2.25rem] leading-[1.08] sm:text-5xl md:text-[3.25rem]">
            Begin waar je bent.
            <br />
            <span className="italic text-primary-foreground/90">Bouw een ritme dat blijft.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/85">
            Begin met 14 dagen onbeperkt yoga, probeer verschillende lessen en ontdek het ritme dat
            je helpt om te blijven komen.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={INTRO_URL}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-background px-7 py-4 text-base font-medium text-foreground shadow-sm transition-colors hover:bg-background/90 sm:w-auto"
            >
              Start met 14 dagen onbeperkt
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/prijzen"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-4 text-base font-medium text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
            >
              Bekijk prijzen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Kept exports for potential reuse */
export type _KeepShared = ReactNode;
