import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

/* ------------------------------------------------------------------
   Easy-to-edit constants
   ------------------------------------------------------------------ */
const INTRO_PASS_URL = "https://trial.yogazeeburg.com/";

// TODO: replace with real Sportbit product URLs when available
const SPORTBIT_WEEKLY_YOGA_URL = "# TODO";
const SPORTBIT_YOGA_PLUS_URL = "# TODO";
const SPORTBIT_UNLIMITED_YOGA_URL = "# TODO";
const SPORTBIT_WEEKLY_ANNUAL_URL = "# TODO";
const SPORTBIT_YOGA_PLUS_ANNUAL_URL = "# TODO";
const SPORTBIT_UNLIMITED_ANNUAL_URL = "# TODO";
const SPORTBIT_10_CLASS_PASS_URL = "# TODO";
const SPORTBIT_SINGLE_CLASS_URL = "# TODO";

const CONTACT_EMAIL = "hello@yogazeeburg.com";
const PAY_IN_FULL_PRICE = "€699";
const SPORTBIT_PAY_IN_FULL_URL = "# TODO";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Yoga Zeeburg Pricing | Yoga Memberships in Amsterdam East" },
      {
        name: "description",
        content:
          "View Yoga Zeeburg pricing for the 14-Day Unlimited Intro Pass, memberships, class passes and single classes. Down-to-earth yoga in Amsterdam East, by the water in Zeeburg/Cruquius.",
      },
      {
        property: "og:title",
        content: "Yoga Zeeburg Pricing | Yoga Memberships in Amsterdam East",
      },
      {
        property: "og:description",
        content:
          "Intro Pass, memberships and class passes at Yoga Zeeburg — down-to-earth yoga in Amsterdam East, by the water in Zeeburg / Cruquius.",
      },
      { property: "og:url", content: "https://www.yogazeeburg.com/pricing" },
    ],
    links: [{ rel: "canonical", href: "https://www.yogazeeburg.com/pricing" }],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
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
      <SiteFooter />
    </div>
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
          Pricing · Yoga Zeeburg
        </span>
        <h1 className="mx-auto mt-7 max-w-4xl font-display text-[2.25rem] leading-[1.05] tracking-tight text-foreground sm:text-[3.25rem] md:text-[4rem]">
          Choose the yoga routine{" "}
          <span className="text-primary italic">that fits your life.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:mt-8 md:text-xl">
          Start with the 14-Day Unlimited Intro Pass, then choose the
          membership or pass that fits your week. The more yoga becomes part of
          your routine, the better the value gets.
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
            href="#annual-routine-builder"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-4 text-base font-medium text-foreground transition-colors hover:bg-muted"
          >
            Compare plans
          </a>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          14-Day Unlimited Intro Pass · memberships every 4 weeks · no fake
          urgency
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   INTRO PASS
   ------------------------------------------------------------------ */
const INTRO_BULLETS = [
  "14 days unlimited yoga",
  "New students only",
  "Try different classes, teachers and times",
  "Stops automatically",
  "No hidden subscription",
  "Easy first step before choosing a membership",
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
                Step 1 · The easiest first step
              </span>
              <h2 className="mt-4 font-display text-[2rem] leading-[1.05] text-foreground sm:text-4xl md:text-[2.75rem]">
                Start with the 14-Day Unlimited Intro Pass
              </h2>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-display text-5xl text-foreground md:text-6xl">
                  €30
                </span>
                <span className="text-sm text-muted-foreground">
                  one-time · 14 days
                </span>
              </div>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                New to Yoga Zeeburg? Start with 14 days of unlimited yoga. Try
                different classes, teachers and times, then choose the routine
                that fits your body, energy and schedule.
              </p>
              <div className="mt-8">
                <a
                  href={INTRO_PASS_URL}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                >
                  Start with 14 days unlimited
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
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
   ANNUAL ROUTINE BUILDER — dominant section
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
    name: "Weekly Annual",
    badge: "For one steady weekly reset",
    price: "€49",
    priceSuffix: "every 4 weeks",
    perClass: [{ label: "per class", value: "€11.31" }],
    routine: "Best for one steady weekly reset.",
    firstYear: "€588 first-year total",
    usage: "52 classes/year",
    cta: "Choose Weekly Annual",
    href: SPORTBIT_WEEKLY_ANNUAL_URL,
  },
  {
    name: "Yoga Plus Annual",
    badge: "Recommended annual routine",
    price: "€69",
    priceSuffix: "every 4 weeks",
    perClass: [{ label: "per class", value: "€7.96" }],
    routine: "The better-value upgrade if you want yoga to become part of your week.",
    firstYear: "€828 first-year total",
    usage: "104 classes/year",
    cta: "Choose Yoga Plus Annual",
    href: SPORTBIT_YOGA_PLUS_ANNUAL_URL,
    recommended: true,
  },
  {
    name: "Unlimited Annual",
    badge: "For 3+ times per week",
    price: "€89",
    priceSuffix: "every 4 weeks",
    perClass: [
      { label: "per class at 3×/week", value: "€6.85" },
      { label: "per class at 4×/week", value: "€5.13" },
    ],
    routine: "Best for 3+ times per week.",
    firstYear: "€1068 first-year total",
    usage: "156 classes/year at 3×/week",
    cta: "Choose Unlimited Annual",
    href: SPORTBIT_UNLIMITED_ANNUAL_URL,
  },
];

const ANNUAL_TERMS = [
  "Minimum commitment: 13 × 4-week periods",
  "Paid every 4 weeks",
  "First 4 weeks free",
  "One 4-week pause included",
  "Switch plan once in the first 8 weeks",
  "Continues every 4 weeks after the minimum commitment until cancelled",
];

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
            Annual Routine Builder · Paid every 4 weeks
          </span>
          <h2 className="mt-5 font-display text-[2.25rem] leading-[1.05] text-foreground sm:text-5xl md:text-[3.25rem]">
            Want annual value, but keep paying every 4 weeks?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            If you know you want yoga to become part of your year, Annual Routine Builder gives you better first-year value while you keep paying every 4 weeks. You commit to your routine for one year, get the first 4 weeks free, and keep a little flexibility with one included pause and one early plan switch.
          </p>
        </div>

        <ul className="mt-10 grid gap-3 rounded-2xl border border-border/60 bg-background/70 p-6 backdrop-blur sm:grid-cols-2 sm:p-8 md:grid-cols-3">
          {ANNUAL_TERMS.map((t) => (
            <li
              key={t}
              className="flex items-start gap-3 text-[15px] text-foreground/90"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{t}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:items-stretch">
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
          Recommended best value
        </span>
      )}

      <h3 className="font-display text-2xl text-foreground">{plan.name}</h3>
      <p className="mt-1 text-sm font-medium text-clay">{plan.badge}</p>

      <div className="mt-5 flex items-baseline gap-2">
        <span className="font-display text-[2.5rem] leading-none text-foreground">
          {plan.price}
        </span>
        <span className="text-base text-muted-foreground">{plan.priceSuffix}</span>
      </div>

      <div className="mt-3 space-y-1 text-sm text-muted-foreground">
        <p>First 8 weeks free</p>
        <p>{plan.firstYear}</p>
        {plan.perClass.map((pc) => (
          <p key={pc.label}>
            {pc.value} {pc.label}
          </p>
        ))}
        <p>{plan.usage}</p>
      </div>

      <p className="mt-5 text-[15.5px] leading-relaxed text-foreground/85">
        {plan.routine}
      </p>

      <div className="mt-auto pt-7">
        <a
          href={plan.href}
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
    perClass: "€12.25 per class",
    price: "€49",
    priceSuffix: "every 4 weeks",
    classes: "4 classes every 4 weeks",
    bestFor: "Best for one steady weekly reset.",
    cta: "Choose Weekly Yoga",
    href: SPORTBIT_WEEKLY_YOGA_URL,
  },
  {
    name: "Yoga Plus",
    perClass: "€8.63 per class",
    price: "€69",
    priceSuffix: "every 4 weeks",
    classes: "8 classes every 4 weeks",
    bestFor: "Recommended for building a routine.",
    cta: "Choose Yoga Plus",
    href: SPORTBIT_YOGA_PLUS_URL,
    recommended: true,
  },
  {
    name: "Unlimited Yoga",
    perClass: "€7.42 per class at 3×/week",
    price: "€89",
    priceSuffix: "every 4 weeks",
    classes: "Unlimited classes",
    extraPerClass: "€5.56 per class at 4×/week",
    bestFor: "Best for 3+ times per week.",
    cta: "Choose Unlimited Yoga",
    href: SPORTBIT_UNLIMITED_YOGA_URL,
  },
];

function RegularMemberships() {
  return (
    <section id="four-week-memberships" className="px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
            4-week memberships
          </span>
          <h2 className="mt-5 font-display text-[2rem] leading-[1.05] text-foreground sm:text-4xl md:text-[2.75rem]">
            Choose your 4-week rhythm.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Start with the membership that fits your week. If you already know you want yoga to become part of your year, the Annual Routine Builder below gives you better first-year value.
          </p>
        </div>

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
        (recommended
          ? "border-primary/30 bg-secondary/40"
          : "border-border/60 bg-background")
      }
    >
      {recommended && (
        <span className="absolute -top-3 left-7 inline-flex items-center rounded-full border border-primary/30 bg-background px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
          Recommended
        </span>
      )}
      <h3 className="font-display text-xl text-foreground">{plan.name}</h3>

      <div className="mt-4 flex items-baseline gap-2">
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

      <p className="mt-5 text-[15px] leading-relaxed text-foreground/85">
        {plan.bestFor}
      </p>

      <div className="mt-auto pt-6">
        <a
          href={plan.href}
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
   PAY-IN-FULL NOTE
   ------------------------------------------------------------------ */
function PayInFullNote() {
  return (
    <section className="bg-primary px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
              Best annual value
            </span>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.05] text-primary-foreground sm:text-4xl md:text-[2.75rem]">
              Pay once. Practice all year.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/85">
              Make Yoga Zeeburg part of your week without thinking about 4-week payments. Yoga Plus Annual Pay-in-Full is built for a steady twice-a-week rhythm: enough to feel the difference, simple enough to keep up.
            </p>
            <p className="mt-4 text-base leading-relaxed text-primary-foreground/70">
              A clear commitment to your routine — and the best value if you know you want to keep showing up twice a week.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-primary-foreground/15 bg-primary-foreground/10 p-7 sm:p-8">
            <h3 className="font-display text-xl text-primary-foreground">Yoga Plus Annual Pay-in-Full</h3>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="font-display text-[2.5rem] leading-none text-primary-foreground">
                {PAY_IN_FULL_PRICE}
              </span>
              <span className="text-base text-primary-foreground/80">/ year</span>
            </div>
            <div className="mt-3 space-y-1 text-sm text-primary-foreground/75">
              <p>One upfront payment</p>
              <p>Ideal for 2 classes per week</p>
              <p>Around €6.72 per class when coming twice per week</p>
            </div>
            <div className="mt-7 flex flex-col gap-3">
              <a
                href={SPORTBIT_PAY_IN_FULL_URL}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-clay px-6 py-3.5 text-[15px] font-medium text-clay-foreground shadow-sm transition-colors hover:bg-clay/90"
              >
                Choose Pay-in-Full
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#four-week-memberships"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary-foreground/25 px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Compare all memberships
              </a>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-primary-foreground/60">
              For direct Yoga Zeeburg members. New students can start with the Intro Pass first. Terms and pause options are shown before checkout.
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
    perClass: "€18 per class",
    price: "€180",
    meta: "10 classes · valid 3 months",
    bestFor: "Good if your schedule changes a lot.",
    cta: "Choose 10-Class Pass",
    href: SPORTBIT_10_CLASS_PASS_URL,
  },
  {
    name: "Single Class",
    perClass: "€25 per class",
    price: "€25",
    meta: "One class",
    bestFor: "Good for one-off visits.",
    cta: "Book single class",
    href: SPORTBIT_SINGLE_CLASS_URL,
  },
];

function FlexibleOptions() {
  return (
    <section className="px-4 pb-24 sm:px-6 md:pb-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
            Flexible options
          </span>
          <h2 className="mt-4 font-display text-3xl leading-tight text-foreground sm:text-4xl">
            Need more flexibility?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Membership is the best value when yoga becomes part of your week.
            If your schedule changes a lot, these options are here too.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {FLEX_PLANS.map((p) => (
            <div
              key={p.name}
              className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-background/70 p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <h3 className="font-display text-lg text-foreground">
                  {p.name}
                </h3>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-3">
                  <span className="font-display text-2xl text-foreground">
                    {p.perClass}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {p.price} · {p.meta}
                </p>
                <p className="mt-2 text-sm text-foreground/85">{p.bestFor}</p>
              </div>
              <a
                href={p.href}
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
  { q: "New here?", a: "Start with the Intro Pass." },
  { q: "Want a simple weekly routine?", a: "Choose Yoga Plus." },
  { q: "Want the best one-payment annual value?", a: "Choose Yoga Plus Annual Pay-in-Full." },
  { q: "Want annual value but prefer paying every 4 weeks?", a: "Choose Yoga Plus Annual Routine Builder." },
  { q: "Coming 3+ times per week?", a: "Choose Unlimited Yoga." },
  { q: "Need maximum flexibility?", a: "Choose the 10-Class Pass." },
];

function PlanChooser() {
  return (
    <section className="bg-[color-mix(in_oklab,var(--color-sage)_10%,var(--color-background))] px-4 py-24 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
            Not sure?
          </span>
          <h2 className="mt-5 font-display text-[2rem] leading-[1.05] text-foreground sm:text-4xl md:text-[2.75rem]">
            Still unsure? Here’s the simple version.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Most people do not need every option. They need the next right step.
          </p>
        </div>

        <ul className="mt-12 divide-y divide-border/70 border-y border-border/70">
          {CHOOSER.map((c) => (
            <li
              key={c.q}
              className="grid grid-cols-1 items-baseline gap-2 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-14"
            >
              <h3 className="font-display text-xl text-foreground md:text-2xl">
                {c.q}
              </h3>
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
    q: "Does the Intro Pass renew automatically?",
    a: "No. The 14-Day Unlimited Intro Pass stops automatically.",
  },
  {
    q: "Can I try different classes?",
    a: "Yes. That is the point. Use the Intro Pass to try different classes, teachers and times.",
  },
  {
    q: "Can beginners join?",
    a: "Yes. Check the class name and description before booking, and start with a class that fits how you feel today.",
  },
  {
    q: "Do memberships continue automatically?",
    a: "Yes. All memberships continue automatically after the minimum period until cancelled.",
    highlight: true,
  },
  {
    q: "What is the difference between Pay-in-Full and Annual Routine Builder?",
    a: "Pay-in-Full is one upfront payment for Yoga Plus Annual. Annual Routine Builder is a yearly commitment where you keep paying every 4 weeks.",
    highlight: true,
  },
  {
    q: "Can I pause my annual membership?",
    a: "The Annual Routine Builder includes one 4-week pause.",
  },
  {
    q: "Can I switch plans?",
    a: "The Annual Routine Builder includes one plan switch in the first 8 weeks.",
  },
  {
    q: "What happens after the annual commitment?",
    a: "After the minimum commitment period, your membership continues every 4 weeks until cancelled.",
  },
  {
    q: "What if I am pregnant, injured or unsure?",
    a: "Always tell the teacher before class. If there is pain, injury, pregnancy or medical uncertainty, check with a medical professional if needed.",
  },
];

function FAQ() {
  return (
    <section className="px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
            Practical
          </span>
          <h2 className="mt-5 font-display text-[2rem] leading-[1.05] text-foreground sm:text-4xl md:text-[2.75rem]">
            Practical things to know
          </h2>
        </div>

        <dl className="mt-14 space-y-0">
          {FAQ_ITEMS.map((f, i) => (
            <div
              key={f.q}
              className={
                "border-t border-border/70 py-8 " +
                (i === FAQ_ITEMS.length - 1 ? "border-b" : "")
              }
            >
              <dt className="font-display text-xl text-foreground md:text-2xl">
                {f.q}
              </dt>
              <dd className={
                "mt-3 text-base leading-relaxed " +
                (f.highlight
                  ? "rounded-xl bg-secondary/60 px-5 py-4 text-foreground/90"
                  : "text-muted-foreground")
              }>
                {f.a}
              </dd>
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
          Start simple.{" "}
          <span className="text-primary italic">Choose your routine after.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Begin with 14 days of unlimited yoga at Yoga Zeeburg. Try different
          classes, find what fits your week and choose the plan that helps you
          keep showing up.
        </p>
        <div className="mx-auto mt-9 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
          <a
            href={INTRO_PASS_URL}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Start with 14 days unlimited
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#annual-routine-builder"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-4 text-base font-medium text-foreground transition-colors hover:bg-muted"
          >
            Compare memberships
          </a>
        </div>
      </div>
    </section>
  );
}
