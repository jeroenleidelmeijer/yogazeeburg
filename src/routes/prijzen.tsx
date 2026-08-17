import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Copy, Sparkles } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { commercialLinks } from "@/lib/i18n";

/* ------------------------------------------------------------------
   Sportbit checkout links
   ------------------------------------------------------------------ */
const INTRO_PASS_URL = "/trial";

const SPORTBIT_WEEKLY_YOGA_URL =
  "https://crossfitzeeburg.sportbitapp.nl/web/nl/registreren/lidmaatschap?a=45";
const SPORTBIT_YOGA_PLUS_URL =
  "https://crossfitzeeburg.sportbitapp.nl/web/nl/registreren/lidmaatschap?a=46";
const SPORTBIT_UNLIMITED_YOGA_URL =
  "https://crossfitzeeburg.sportbitapp.nl/web/nl/registreren/lidmaatschap?a=47";

const SPORTBIT_WEEKLY_ANNUAL_URL =
  "https://crossfitzeeburg.sportbitapp.nl/web/nl/registreren/lidmaatschap?a=48";
const SPORTBIT_YOGA_PLUS_ANNUAL_URL =
  "https://crossfitzeeburg.sportbitapp.nl/web/nl/registreren/lidmaatschap?a=49";
const SPORTBIT_UNLIMITED_ANNUAL_URL =
  "https://crossfitzeeburg.sportbitapp.nl/web/nl/registreren/lidmaatschap?a=50";

const SPORTBIT_PAY_IN_FULL_URL =
  "https://crossfitzeeburg.sportbitapp.nl/web/nl/registreren/lidmaatschap?r=43";

const SPORTBIT_10_CLASS_PASS_URL =
  "https://crossfitzeeburg.sportbitapp.nl/web/nl/registreren/lidmaatschap?r=12";
const SPORTBIT_SINGLE_CLASS_URL =
  "https://crossfitzeeburg.sportbitapp.nl/web/nl/registreren/lidmaatschap?r=11";

const PAY_IN_FULL_PRICE = "€699";
const DISCOUNT_CODE = "YOGA4WEEKS";
const REGULAR_TERMS =
  "Betaald per 4 weken, met een minimale looptijd van 3 maanden. Na die 3 maanden op elk moment opzegbaar.";
const SPORTBIT_NOTICE =
  "Je gaat verder naar Sportbit, ons boekingssysteem. Log in of maak een account aan, kies Yoga Zeeburg en selecteer daarna het hier getoonde lidmaatschap.";
const SPORTBIT_REMINDER = "Het afrekenen gaat verder in Sportbit, ons boekingssysteem.";

export const Route = createFileRoute("/prijzen")({
  head: () => ({
    meta: [
      { title: "Prijzen Yoga Zeeburg | Yogalidmaatschappen in Amsterdam-Oost" },
      {
        name: "description",
        content:
          "Prijzen van Yoga Zeeburg in Amsterdam-Oost: 14-daagse onbeperkte Intro Pass, lidmaatschappen, lessenkaarten en losse lessen. Simpel en transparant.",
      },
      {
        property: "og:title",
        content: "Prijzen Yoga Zeeburg | Yogalidmaatschappen in Amsterdam-Oost",
      },
      {
        property: "og:description",
        content:
          "Intro Pass, lidmaatschappen en lessenkaarten bij Yoga Zeeburg — laagdrempelige yoga in Amsterdam-Oost, aan het water in Zeeburg / Cruquius.",
      },
      { property: "og:url", content: "https://www.yogazeeburg.com/prijzen" },
    ],
    links: commercialLinks("nl", "pricing"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: "nl-NL",
          mainEntity: FAQ_ITEMS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader locale="nl" page="pricing" />
      <main>
        <Hero />
        <IntroPass />
        <RegularMemberships />
        <AnnualRoutineBuilder />
        <PayInFullNote />
        <FlexibleOptions />
        <PlanChooser />
        <FAQ />
        <FinalCTA />
      </main>
      <SiteFooter locale="nl" />
    </div>
  );
}

/* ------------------------------------------------------------------
   Shared: external Sportbit link
   ------------------------------------------------------------------ */
function sportbitLinkProps(href: string) {
  return {
    href,
    target: "_blank" as const,
    rel: "noopener noreferrer",
  };
}

function SportbitNotice({
  className = "",
  short = false,
}: {
  className?: string;
  short?: boolean;
}) {
  return (
    <p
      className={
        "rounded-2xl border border-border/60 bg-secondary/40 px-4 py-3 text-sm leading-relaxed text-foreground/80 " +
        className
      }
    >
      {short ? SPORTBIT_REMINDER : SPORTBIT_NOTICE}
    </p>
  );
}

/* ------------------------------------------------------------------
   HERO
   ------------------------------------------------------------------ */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80%] bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--color-sage)_18%,transparent),transparent_70%)]"
      />
      <div className="mx-auto max-w-4xl px-4 pb-16 pt-12 text-center sm:px-6 md:pb-24 md:pt-20 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-clay" />
          Prijzen · Yoga Zeeburg
        </span>
        <h1 className="mx-auto mt-7 max-w-4xl font-display text-[2.25rem] leading-[1.05] tracking-tight text-foreground sm:text-[3.25rem] md:text-[4rem]">
          Kies de yogaroutine <span className="text-primary italic">die bij jouw leven past.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:mt-8 md:text-xl">
          Yoga Zeeburg biedt een 14-daagse onbeperkte Intro Pass voor nieuwe leerlingen,
          vierwekelijkse lidmaatschappen, jaarplannen en lessenkaarten. Begin met de Intro Pass en
          kies daarna wat bij jouw week past.
        </p>
        <div className="mx-auto mt-9 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
          <a
            href={INTRO_PASS_URL}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Start Intro Pass
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#four-week-memberships"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-4 text-base font-medium text-foreground transition-colors hover:bg-muted"
          >
            Vergelijk lidmaatschappen
          </a>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          14-daagse onbeperkte Intro Pass · lidmaatschappen per 4 weken · simpele, transparante prijzen
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   INTRO PASS
   ------------------------------------------------------------------ */
const INTRO_BULLETS = [
  "14 dagen onbeperkt yoga",
  "Alleen voor nieuwe leerlingen",
  "Probeer verschillende lessen, docenten en tijden",
  "Stopt automatisch",
  "Geen verborgen abonnement",
  "Fijne eerste stap voordat je een lidmaatschap kiest",
];

function IntroPass() {
  return (
    <section className="px-4 pb-20 sm:px-6 md:pb-28 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-border/60 bg-secondary/60 shadow-sm">
        <div className="relative px-8 pb-12 pt-12 sm:px-12 md:px-16 md:pb-16 md:pt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-clay/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-sage/20 blur-3xl"
          />

          <div className="relative grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start md:gap-16">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
                Stap 1 · De makkelijkste eerste stap
              </span>
              <h2 className="mt-4 font-display text-[2rem] leading-[1.05] text-foreground sm:text-4xl md:text-[2.75rem]">
                14-daagse onbeperkte Intro Pass
              </h2>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-display text-5xl text-foreground md:text-6xl">€30</span>
                <span className="text-sm text-muted-foreground">eenmalig · 14 dagen</span>
              </div>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Onbeperkt yoga voor 14 aaneengesloten dagen. Alleen voor nieuwe leerlingen, stopt
                automatisch. Probeer verschillende lessen, docenten en tijden, en kies daarna de
                routine die bij jouw lijf, energie en week past.
              </p>
              <div className="mt-8">
                <a
                  href={INTRO_PASS_URL}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                >
                  Start met 14 dagen onbeperkt
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <SportbitNotice className="mt-6 max-w-xl" />
            </div>

            <ul className="space-y-3 rounded-2xl border border-border/70 bg-background/70 p-6 backdrop-blur sm:p-8">
              {INTRO_BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[15.5px] text-foreground/90">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   REGULAR 4-WEEK MEMBERSHIPS
   ------------------------------------------------------------------ */
type RegularPlan = {
  name: string;
  perClass: string;
  price: string;
  priceSuffix: string;
  classes: string;
  extraPerClass?: string;
  bestFor: string;
  cta: string;
  href: string;
  recommended?: boolean;
};

const REGULAR_PLANS: RegularPlan[] = [
  {
    name: "Weekly Yoga",
    perClass: "€12,25 per les",
    price: "€49",
    priceSuffix: "per 4 weken",
    classes: "4 lessen per 4 weken",
    bestFor: "Ideaal voor één vast wekelijks moment voor jezelf.",
    cta: "Kies Weekly Yoga",
    href: SPORTBIT_WEEKLY_YOGA_URL,
  },
  {
    name: "Yoga Plus",
    perClass: "€8,63 per les",
    price: "€69",
    priceSuffix: "per 4 weken",
    classes: "8 lessen per 4 weken",
    bestFor: "Aanbevolen om een routine op te bouwen.",
    cta: "Kies Yoga Plus",
    href: SPORTBIT_YOGA_PLUS_URL,
    recommended: true,
  },
  {
    name: "Unlimited Yoga",
    perClass: "€7,42 per les bij 3×/week",
    price: "€89",
    priceSuffix: "per 4 weken",
    classes: "Onbeperkt aantal lessen",
    extraPerClass: "€5,56 per les bij 4×/week",
    bestFor: "Ideaal als je 3 keer per week of vaker komt.",
    cta: "Kies Unlimited Yoga",
    href: SPORTBIT_UNLIMITED_YOGA_URL,
  },
];

function RegularMemberships() {
  return (
    <section id="four-week-memberships" className="px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
            Lidmaatschappen per 4 weken
          </span>
          <h2 className="mt-5 font-display text-[2rem] leading-[1.05] text-foreground sm:text-4xl md:text-[2.75rem]">
            Kies jouw ritme van 4 weken.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {REGULAR_TERMS} Dit is de meest flexibele route, zonder de jaarkorting.
          </p>
        </div>

        <SportbitNotice short className="mt-8 max-w-3xl" />

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:items-stretch">
          {REGULAR_PLANS.map((p) => (
            <RegularCard key={p.name} plan={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RegularCard({ plan }: { plan: RegularPlan }) {
  const recommended = plan.recommended;
  return (
    <div
      className={
        "relative flex flex-col rounded-[1.5rem] border p-7 transition-colors " +
        (recommended ? "border-primary/30 bg-secondary/40" : "border-border/60 bg-background")
      }
    >
      {recommended && (
        <span className="absolute -top-3 left-7 inline-flex items-center rounded-full border border-primary/30 bg-background px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
          Aanbevolen
        </span>
      )}
      <h3 className="font-display text-xl text-foreground">{plan.name}</h3>

      <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="font-display text-[2.25rem] leading-none text-foreground">
          {plan.price}
        </span>
        <span className="text-base text-muted-foreground">{plan.priceSuffix}</span>
      </div>

      <p className="mt-2 text-sm text-muted-foreground">{plan.classes}</p>
      <p className="mt-1 text-sm text-muted-foreground">{plan.perClass}</p>
      {plan.extraPerClass && (
        <p className="mt-1 text-sm text-muted-foreground">{plan.extraPerClass}</p>
      )}

      <p className="mt-5 text-[15px] leading-relaxed text-foreground/85">{plan.bestFor}</p>

      <div className="mt-auto pt-6">
        <a
          {...sportbitLinkProps(plan.href)}
          className={
            "inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors " +
            (recommended
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "border border-border bg-background text-foreground hover:bg-muted")
          }
        >
          {plan.cta}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   ANNUAL ROUTINE BUILDER
   ------------------------------------------------------------------ */
type AnnualPlan = {
  name: string;
  badge: string;
  price: string;
  priceSuffix: string;
  perClass: { label: string; value: string }[];
  routine: string;
  firstYear: string;
  usage: string;
  cta: string;
  href: string;
  recommended?: boolean;
};

const ANNUAL_PLANS: AnnualPlan[] = [
  {
    name: "Weekly Yoga Annual",
    badge: "Voor één vast wekelijks moment",
    price: "€49",
    priceSuffix: "per 4 weken",
    perClass: [{ label: "per les", value: "€11,31" }],
    routine: "",
    firstYear: "€588 totaal eerste jaar, na de gratis periode",
    usage: "52 lessen per jaar",
    cta: "Kies Weekly Yoga Annual",
    href: SPORTBIT_WEEKLY_ANNUAL_URL,
  },
  {
    name: "Yoga Plus Annual",
    badge: "Aanbevolen jaarroutine",
    price: "€69",
    priceSuffix: "per 4 weken",
    perClass: [{ label: "per les", value: "€7,96" }],
    routine: "De betere upgrade als je wilt dat yoga echt onderdeel van je week wordt.",
    firstYear: "€828 totaal eerste jaar, na de gratis periode",
    usage: "104 lessen per jaar",
    cta: "Kies Yoga Plus Annual",
    href: SPORTBIT_YOGA_PLUS_ANNUAL_URL,
    recommended: true,
  },
  {
    name: "Unlimited Yoga Annual",
    badge: "Voor 3 keer per week of vaker",
    price: "€89",
    priceSuffix: "per 4 weken",
    perClass: [
      { label: "per les bij 3×/week", value: "€6,85" },
      { label: "per les bij 4×/week", value: "€5,13" },
    ],
    routine: "Ideaal als je 3 keer per week of vaker komt.",
    firstYear: "€1068 totaal eerste jaar, na de gratis periode",
    usage: "156 lessen per jaar bij 3×/week",
    cta: "Kies Unlimited Yoga Annual",
    href: SPORTBIT_UNLIMITED_ANNUAL_URL,
  },
];

const ANNUAL_TERMS = [
  "12 maanden looptijd",
  "Betaald per 4 weken",
  "Eerste 4 weken gratis met code YOGA4WEEKS",
  "Eén pauze van 4 weken inbegrepen",
  "Eén keer wisselen van plan in de eerste 8 weken",
  "Loopt na de looptijd elke 4 weken door tot je opzegt",
];

const DISCOUNT_STEPS = [
  "Open het jaarlidmaatschap van je keuze en log in bij Sportbit.",
  `Vul kortingscode ${DISCOUNT_CODE} in en tik op Toepassen.`,
  "Controleer dat de eerste betaling €0 laat zien voordat je verdergaat.",
];

function DiscountCodePanel() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(DISCOUNT_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // klembord geblokkeerd — stil falen, code blijft zichtbaar
    }
  };

  return (
    <div className="mt-10 overflow-hidden rounded-[1.75rem] border-2 border-clay/40 bg-background shadow-sm">
      <div className="grid gap-8 p-7 md:grid-cols-[1.1fr_1fr] md:items-start md:gap-10 md:p-10">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-clay">
            <Sparkles className="h-3.5 w-3.5" />
            Belangrijk · Mis dit niet
          </span>
          <h3 className="mt-4 font-display text-[1.75rem] leading-[1.1] text-foreground sm:text-3xl md:text-[2.25rem]">
            Zo krijg je je eerste 4 weken gratis
          </h3>
          <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
            De eerste 4 weken zijn niet automatisch gratis: vul de code in tijdens het afrekenen bij
            Sportbit.
          </p>
          <ol className="mt-6 space-y-3">
            {DISCOUNT_STEPS.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-[15px] text-foreground/90">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-clay/15 text-xs font-semibold text-clay">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border border-border/60 bg-secondary/40 p-6 sm:p-7">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Kortingscode
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <code className="rounded-xl border border-clay/40 bg-background px-4 py-3 font-display text-2xl tracking-[0.15em] text-foreground sm:text-3xl">
              {DISCOUNT_CODE}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              aria-live="polite"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Copy className="h-4 w-4" />
              {copied ? "Gekopieerd" : "Kopieer code"}
            </button>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-foreground/80">
            Je eerste periode van vier weken is €0; daarna geldt het reguliere vierwekelijkse
            tarief.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Alleen geldig op de drie jaarlijkse vierwekelijkse lidmaatschappen — niet op reguliere
            lidmaatschappen, lessenkaarten, de Intro Pass of Pay-in-Full.
          </p>
        </div>
      </div>
    </div>
  );
}

function AnnualRoutineBuilder() {
  return (
    <section
      id="annual-routine-builder"
      className="relative bg-[color-mix(in_oklab,var(--color-clay)_5%,var(--color-background))] px-4 py-24 sm:px-6 md:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-clay">
            <Sparkles className="h-3.5 w-3.5" />
            Annual Routine Builder · Betaald per 4 weken
          </span>
          <h2 className="mt-5 font-display text-[2.25rem] leading-[1.05] text-foreground sm:text-5xl md:text-[3.25rem]">
            Jaarvoordeel, maar toch per 4 weken betalen?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Annual Routine Builder geeft je een beter eerstejaars voordeel, terwijl je gewoon per 4
            weken blijft betalen. Hieronder alle details.
          </p>
        </div>

        <ul className="mt-10 grid gap-3 rounded-2xl border border-border/60 bg-background/70 p-6 backdrop-blur sm:grid-cols-2 sm:p-8 md:grid-cols-3">
          {ANNUAL_TERMS.map((t) => (
            <li key={t} className="flex items-start gap-3 text-[15px] text-foreground/90">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{t}</span>
            </li>
          ))}
        </ul>

        <DiscountCodePanel />

        <SportbitNotice short className="mt-8" />

        <div className="mt-10 grid gap-6 md:grid-cols-3 md:items-stretch">
          {ANNUAL_PLANS.map((p) => (
            <AnnualCard key={p.name} plan={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AnnualCard({ plan }: { plan: AnnualPlan }) {
  const recommended = plan.recommended;
  return (
    <div
      className={
        "relative flex flex-col rounded-[1.75rem] border p-7 shadow-sm transition-colors " +
        (recommended
          ? "border-primary/40 bg-background md:-my-3 md:scale-[1.02]"
          : "border-border/60 bg-background/80")
      }
    >
      {recommended && (
        <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary-foreground shadow-sm">
          <Sparkles className="h-3 w-3" />
          Aanbevolen jaarroutine
        </span>
      )}

      <h3 className="font-display text-2xl text-foreground">{plan.name}</h3>
      <p className="mt-1 text-sm font-medium text-clay">{plan.badge}</p>

      <div className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="font-display text-[2.5rem] leading-none text-foreground">
          {plan.price}
        </span>
        <span className="text-base text-muted-foreground">{plan.priceSuffix}</span>
      </div>

      <div className="mt-3 space-y-1 text-sm text-muted-foreground">
        <p>12 maanden looptijd</p>
        <p>{plan.firstYear}</p>
        {plan.perClass.map((pc) => (
          <p key={pc.label}>
            {pc.value} {pc.label}
          </p>
        ))}
        <p>{plan.usage}</p>
      </div>

      <p className="mt-5 text-sm font-medium leading-relaxed text-foreground/85">
        Eerste 4 weken gratis met code {DISCOUNT_CODE}.
      </p>

      {plan.routine && (
        <p className="mt-4 text-[15.5px] leading-relaxed text-foreground/85">{plan.routine}</p>
      )}

      <div className="mt-auto pt-7">
        <a
          {...sportbitLinkProps(plan.href)}
          className={
            "inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium transition-colors " +
            (recommended
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "border border-border bg-background text-foreground hover:bg-muted")
          }
        >
          {plan.cta}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   PAY-IN-FULL
   ------------------------------------------------------------------ */
function PayInFullNote() {
  return (
    <section className="bg-primary px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground/90">
              Beste jaarvoordeel
            </span>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.05] text-primary-foreground sm:text-4xl md:text-[2.75rem]">
              Eén keer betalen. Het hele jaar beoefenen.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/95">
              Yoga Plus Annual Pay-in-Full is één vooruitbetaling voor een heel jaar — 104 lessen,
              52 weken geldig. Gemaakt voor een vast ritme van twee keer per week, en het meest
              voordelig als je weet dat je wilt blijven komen.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-primary-foreground/15 bg-primary-foreground/10 p-7 sm:p-8">
            <h3 className="font-display text-xl text-primary-foreground">
              Yoga Plus Annual Pay-in-Full
            </h3>
            <div className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="font-display text-[2.5rem] leading-none text-primary-foreground">
                {PAY_IN_FULL_PRICE}
              </span>
              <span className="text-base text-primary-foreground/90">eenmalig</span>
            </div>
            <div className="mt-3 space-y-1 text-sm text-primary-foreground/90">
              <p>104 lessen</p>
              <p>52 weken geldig</p>
              <p>€6,72 per les</p>
              <p>Ongebruikte lessen vervallen na 52 weken.</p>
              <p>Verlengt niet automatisch.</p>
            </div>
            <div className="mt-7 flex flex-col gap-3">
              <a
                {...sportbitLinkProps(SPORTBIT_PAY_IN_FULL_URL)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-clay px-6 py-3.5 text-[15px] font-medium text-clay-foreground shadow-sm transition-colors hover:bg-clay/90"
              >
                Kies Pay-in-Full
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#four-week-memberships"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary-foreground/25 px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Vergelijk alle lidmaatschappen
              </a>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-primary-foreground/85">
              De kortingscode {DISCOUNT_CODE} geldt niet voor Pay-in-Full. Nieuwe leerlingen kunnen
              eerst starten met de Intro Pass.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   FLEXIBLE OPTIONS
   ------------------------------------------------------------------ */
type FlexPlan = {
  name: string;
  perClass: string;
  price: string;
  meta: string;
  bestFor: string;
  cta: string;
  href: string;
};

const FLEX_PLANS: FlexPlan[] = [
  {
    name: "10-Class Pass",
    perClass: "€18 per les",
    price: "€180",
    meta: "10 lessen · 3 maanden geldig",
    bestFor: "Fijn als je rooster vaak wisselt.",
    cta: "Kies 10-Class Pass",
    href: SPORTBIT_10_CLASS_PASS_URL,
  },
  {
    name: "Single Class",
    perClass: "€25 per les",
    price: "€25",
    meta: "1 les · 1 maand geldig",
    bestFor: "Fijn voor een eenmalig bezoek.",
    cta: "Boek losse les",
    href: SPORTBIT_SINGLE_CLASS_URL,
  },
];

function FlexibleOptions() {
  return (
    <section className="px-4 pt-12 pb-24 sm:px-6 md:pt-16 md:pb-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
            Flexibele opties
          </span>
          <h2 className="mt-4 font-display text-3xl leading-tight text-foreground sm:text-4xl">
            Meer flexibiliteit nodig?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Een lidmaatschap is het voordeligst als yoga onderdeel van je week wordt. Wisselt jouw
            rooster veel, dan zijn deze opties er ook.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {FLEX_PLANS.map((p) => (
            <div
              key={p.name}
              className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-background/70 p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <h3 className="font-display text-lg text-foreground">{p.name}</h3>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-3">
                  <span className="font-display text-2xl text-foreground">{p.perClass}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {p.price} · {p.meta}
                </p>
                <p className="mt-2 text-sm text-foreground/85">{p.bestFor}</p>
              </div>
              <a
                {...sportbitLinkProps(p.href)}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                {p.cta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
    PLAN CHOOSER
   ------------------------------------------------------------------ */
const CHOOSER = [
  { q: "Nieuw hier?", a: "Begin met de Intro Pass." },
  { q: "Op zoek naar een simpele flexibele routine?", a: "Kies Yoga Plus." },
  {
    q: "Jaarvoordeel, maar liever per 4 weken betalen?",
    a: "Kies Yoga Plus Annual — vul YOGA4WEEKS in bij het afrekenen voor de eerste 4 weken gratis.",
  },
  { q: "Op zoek naar het beste voordeel in één betaling?", a: "Kies Yoga Plus Annual Pay-in-Full." },
  { q: "Kom je 3 keer per week of vaker?", a: "Kies Unlimited Yoga." },
  { q: "Maximale flexibiliteit nodig?", a: "Kies de 10-Class Pass." },
];

function PlanChooser() {
  return (
    <section className="bg-[color-mix(in_oklab,var(--color-sage)_10%,var(--color-background))] px-4 py-24 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
            Twijfel je nog?
          </span>
          <h2 className="mt-5 font-display text-[2rem] leading-[1.05] text-foreground sm:text-4xl md:text-[2.75rem]">
            De simpele versie.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Je hoeft niet elke optie te kennen — alleen de volgende juiste stap.
          </p>
        </div>

        <ul className="mt-12 divide-y divide-border/70 border-y border-border/70">
          {CHOOSER.map((c) => (
            <li
              key={c.q}
              className="grid grid-cols-1 items-baseline gap-2 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-14"
            >
              <h3 className="font-display text-xl text-foreground md:text-2xl">{c.q}</h3>
              <p className="text-[15.5px] leading-relaxed text-muted-foreground md:text-base">
                {c.a}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   FAQ
   ------------------------------------------------------------------ */
const FAQ_ITEMS = [
  {
    q: "Verlengt de Intro Pass automatisch en kan ik verschillende lessen proberen?",
    a: "De 14-daagse onbeperkte Intro Pass stopt automatisch na 14 dagen en verlengt niet. Gebruik die 14 dagen om verschillende lessen, docenten en tijden te proberen.",
  },
  {
    q: "Kunnen beginners meedoen?",
    a: "Ja. Bekijk de lesnaam en beschrijving voordat je boekt, en start met een les die past bij hoe je je vandaag voelt.",
  },
  {
    q: "Hoe werken de reguliere lidmaatschappen per 4 weken?",
    a: "Reguliere lidmaatschappen worden per 4 weken betaald met een minimale looptijd van 3 maanden. Daarna zijn ze opzegbaar en lopen ze elke 4 weken door tot je opzegt.",
  },
  {
    q: "Hoe gebruik ik YOGA4WEEKS, en waar geldt hij voor?",
    a: "Vul tijdens het afrekenen bij Sportbit voor een van de drie jaarlijkse vierwekelijkse lidmaatschappen (Weekly Yoga Annual, Yoga Plus Annual, Unlimited Yoga Annual) de code YOGA4WEEKS in, druk op Toepassen en controleer dat de eerste betaling €0 laat zien. De code geldt niet voor reguliere lidmaatschappen per 4 weken, de 10-Class Pass, losse lessen, de Intro Pass of Pay-in-Full.",
  },
  {
    q: "Wat is het verschil tussen Annual Routine Builder en Pay-in-Full?",
    a: "Annual Routine Builder is een lidmaatschap van 12 maanden waarbij je per 4 weken blijft betalen, met de eerste 4 weken gratis via code YOGA4WEEKS, en dat na de looptijd elke 4 weken doorloopt volgens de bestaande opzegvoorwaarden. Pay-in-Full is één vooruitbetaling van €699 voor Yoga Plus Annual (104 lessen, 52 weken geldig) en verlengt niet automatisch.",
  },
  {
    q: "Kan ik mijn jaarplan pauzeren of wisselen?",
    a: "De Annual Routine Builder biedt één pauze van 4 weken en één keer wisselen van plan binnen de eerste 8 weken.",
  },
];

function FAQ() {
  return (
    <section className="px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
            Praktisch
          </span>
          <h2 className="mt-5 font-display text-[2rem] leading-[1.05] text-foreground sm:text-4xl md:text-[2.75rem]">
            Praktische dingen om te weten
          </h2>
        </div>

        <dl className="mt-14 space-y-0">
          {FAQ_ITEMS.map((f, i) => (
            <div
              key={f.q}
              className={
                "border-t border-border/70 py-8 " + (i === FAQ_ITEMS.length - 1 ? "border-b" : "")
              }
            >
              <dt className="font-display text-xl text-foreground md:text-2xl">{f.q}</dt>
              <dd className="mt-3 text-base leading-relaxed text-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   FINAL CTA
   ------------------------------------------------------------------ */
function FinalCTA() {
  return (
    <section className="px-4 pb-24 sm:px-6 md:pb-32 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-border/60 bg-secondary/60 px-8 py-14 text-center sm:px-12 md:py-20">
        <h2 className="font-display text-[2rem] leading-[1.05] text-foreground sm:text-4xl md:text-[3rem]">
          Begin simpel. <span className="text-primary italic">Kies je routine later.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Begin met 14 dagen onbeperkt yoga bij Yoga Zeeburg. Probeer verschillende lessen, ontdek
          wat bij jouw week past en kies daarna het plan dat je helpt om te blijven komen.
        </p>
        <div className="mx-auto mt-9 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
          <a
            href={INTRO_PASS_URL}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Start met 14 dagen onbeperkt
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#four-week-memberships"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-4 text-base font-medium text-foreground transition-colors hover:bg-muted"
          >
            Vergelijk lidmaatschappen
          </a>
        </div>
      </div>
    </section>
  );
}
