import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Waves,
  Wind,
  Activity,
  Sparkles,
  CalendarCheck,
  MapPin,
  ArrowRight,
  Check,
} from "lucide-react";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const INTRO_URL = "https://trial.yogazeeburg.com/";
const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Cruquiusweg+96F+Amsterdam";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yoga Zeeburg | Down-to-Earth Yoga in Amsterdam East" },
      {
        name: "description",
        content:
          "Yoga Zeeburg is a calm, down-to-earth yoga studio in Amsterdam East, by the water in Zeeburg/Cruquius. Start with 14 days unlimited yoga and build a routine that fits your life.",
      },
      { property: "og:title", content: "Yoga Zeeburg | Down-to-Earth Yoga in Amsterdam East" },
      {
        property: "og:description",
        content:
          "Calm, down-to-earth yoga in Amsterdam East, by the water in Zeeburg/Cruquius. Start with 14 days unlimited yoga.",
      },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/hero.jpg" },
      { name: "twitter:image", content: "/hero.jpg" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ExerciseGym",
          name: "Yoga Zeeburg",
          description:
            "Down-to-earth yoga studio in Amsterdam East, by the water in Zeeburg / Cruquius. Small, calm and beginner-friendly.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Cruquiusweg 96F",
            addressLocality: "Amsterdam",
            postalCode: "1019 AH",
            addressCountry: "NL",
          },
          areaServed: ["Amsterdam East", "Zeeburg", "Cruquius", "Eastern Docklands"],
          url: "/",
          image: "/hero.jpg",
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
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
      <SiteFooter />
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-16 sm:px-6 md:grid-cols-2 md:gap-16 md:pb-28 md:pt-24 lg:px-8">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-clay" />
            Yoga Zeeburg · Amsterdam East
          </span>
          <h1 className="mt-6 font-display text-[2.5rem] leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem]">
            Your week is loud.
            <br />
            <span className="text-primary">This is where it slows down.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Down-to-earth yoga in Amsterdam East, by the water in Zeeburg and
            Cruquius. Move, breathe, release tension — and build a simple weekly
            routine that actually fits your life.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={INTRO_URL}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              Start with 14 days unlimited
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
            >
              View pricing
            </Link>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            14-Day Unlimited Intro Pass · stops automatically · new students only
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-sage/20 blur-2xl" aria-hidden />
          <div className="overflow-hidden rounded-3xl border border-border/60 shadow-xl">
            <img
              src="/hero.jpg"
              alt="Warm morning light and calm water — Yoga Zeeburg in Amsterdam East"
              className="h-full w-full object-cover"
              width={1600}
              height={1008}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Benefits ---------- */
const BENEFITS = [
  {
    icon: Waves,
    title: "Feel calmer",
    body: "Step out of the noise and land back in your body.",
  },
  {
    icon: Activity,
    title: "Release tension",
    body: "Unwind tight shoulders, hips and lower back.",
  },
  {
    icon: Sparkles,
    title: "Move better",
    body: "Build mobility and ease without forcing it.",
  },
  {
    icon: Wind,
    title: "Breathe better",
    body: "Slow down, breathe deeper and feel more grounded.",
  },
  {
    icon: CalendarCheck,
    title: "Build a weekly routine",
    body: "A rhythm you can actually keep up.",
  },
];

function Benefits() {
  return (
    <Section id="benefits" tone="muted">
      <SectionHeader
        eyebrow="Why people practise here"
        title="A weekly reset that actually fits your life"
      />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {BENEFITS.map(({ icon: Icon, title, body }) => (
          <li
            key={title}
            className="rounded-2xl border border-border/60 bg-card p-7 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-display text-xl text-foreground">{title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              {body}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------- Intro Pass ---------- */
function IntroPass() {
  const bullets = [
    "14 days unlimited yoga",
    "Simple way to start",
    "Stops automatically",
    "No strings, no hidden subscription",
  ];
  return (
    <Section id="intro">
      <div className="grid gap-10 rounded-3xl border border-border/60 bg-secondary/60 p-10 md:grid-cols-[1.15fr_1fr] md:gap-14 md:p-14">
        <div>
          <span className="text-sm font-medium uppercase tracking-wide text-clay">
            Intro Pass
          </span>
          <h2 className="mt-4 font-display text-[2rem] leading-[1.1] text-foreground sm:text-4xl md:text-[2.5rem]">
            The easiest way to start
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Start with 14 days of unlimited yoga. Try different classes,
            teachers and times, then discover what fits your body, energy and
            schedule.
          </p>
          <a
            href={INTRO_URL}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Start with 14 days unlimited
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-4 text-sm text-muted-foreground">
            For new students. Pricing details on the{" "}
            <Link to="/pricing" className="underline underline-offset-2 hover:text-foreground">
              pricing page
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl border border-border/60 bg-card p-8 shadow-sm md:p-10">
          <div className="text-sm font-medium uppercase tracking-wide text-clay">
            14-Day Unlimited Intro Pass
          </div>
          <p className="mt-3 text-base text-muted-foreground">
            Two weeks of unlimited yoga to help you find your rhythm at
            Yoga Zeeburg.
          </p>
          <ul className="mt-6 space-y-3.5">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[15px] text-foreground">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Why Yoga Zeeburg ---------- */
const WHY = [
  {
    title: "Down-to-earth atmosphere",
    body: "Come as you are. No performance, no pressure.",
  },
  {
    title: "Small, personal studio",
    body: "You're a person here, not a class number.",
  },
  {
    title: "Beginner-friendly, always",
    body: "Clear guidance so you never feel lost on the mat.",
  },
  {
    title: "Clear class descriptions",
    body: "You know what you're walking into before you arrive.",
  },
  {
    title: "Calm location by the water",
    body: "A quiet corner of Amsterdam East to actually breathe.",
  },
  {
    title: "Rooted in Zeeburg & Cruquius",
    body: "Your neighbourhood studio in the Eastern Docklands.",
  },
];

function WhyUs() {
  return (
    <Section id="why" tone="muted">
      <div className="grid gap-12 md:grid-cols-[1fr_1.25fr] md:gap-16">
        <div>
          <span className="text-sm font-medium uppercase tracking-wide text-clay">
            Why Yoga Zeeburg
          </span>
          <h2 className="mt-4 font-display text-[2rem] leading-[1.1] text-foreground sm:text-4xl md:text-[2.5rem]">
            A yoga studio that feels like Amsterdam East
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            Grounded, unpretentious and quietly modern — a place to move,
            breathe and feel better afterwards. No spiritual performance,
            no pressure to be anything but yourself.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {WHY.map((point) => (
            <li
              key={point.title}
              className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                <h3 className="font-display text-lg text-foreground">{point.title}</h3>
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {point.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ---------- Class direction preview ---------- */
const CATEGORIES = [
  {
    title: "Slow down",
    body: "Gentle, grounding classes to unwind and downshift.",
  },
  {
    title: "Move and flow",
    body: "Stronger, moving classes to build energy and focus.",
  },
  {
    title: "Release tension",
    body: "Targeted work for stiff hips, shoulders and lower back.",
  },
  {
    title: "Start as a beginner",
    body: "Clear guidance and no assumptions — a soft place to begin.",
  },
];

function ClassDirections() {
  return (
    <Section id="classes">
      <SectionHeader
        eyebrow="Classes"
        title="Different weeks, different needs"
        sub="Choose the kind of class that matches how you actually feel — not how you're supposed to feel."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border border-border/60 bg-card p-7 shadow-sm transition-shadow hover:shadow-md"
          >
            <h3 className="font-display text-xl text-foreground">{c.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              {c.body}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Link
          to="/classes"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
        >
          View classes
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}

/* ---------- Pricing teaser ---------- */
function PricingTeaser() {
  return (
    <Section id="pricing">
      <div className="grid items-center gap-10 rounded-3xl border border-border/60 bg-card p-10 md:grid-cols-[1.4fr_auto] md:p-14">
        <div>
          <span className="text-sm font-medium uppercase tracking-wide text-clay">
            Pricing
          </span>
          <h2 className="mt-4 font-display text-[2rem] leading-[1.1] text-foreground sm:text-4xl md:text-[2.5rem]">
            The more yoga becomes part of your week, the better the value gets.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Start with the Intro Pass, then choose the routine that fits your
            life. Regular memberships give you the best value when you want
            yoga to become part of your week.
          </p>
        </div>
        <Link
          to="/pricing"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          View pricing
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}

/* ---------- Location ---------- */
function Location() {
  return (
    <Section id="location" tone="muted">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <span className="text-sm font-medium uppercase tracking-wide text-clay">
            Find us
          </span>
          <h2 className="mt-4 font-display text-[2rem] leading-[1.1] text-foreground sm:text-4xl md:text-[2.5rem]">
            By the water in Amsterdam East
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            Yoga Zeeburg sits above CrossFit Zeeburg on Cruquiusweg, in the
            calm corner of the Eastern Docklands where Zeeburg meets Cruquius.
          </p>
          <address className="mt-6 text-base not-italic text-foreground">
            <div className="font-medium">Yoga Zeeburg</div>
            <div className="text-muted-foreground">Cruquiusweg 96F</div>
            <div className="text-muted-foreground">1019 AH Amsterdam</div>
          </address>
          <ul className="mt-5 flex flex-wrap gap-2 text-xs text-muted-foreground">
            {[
              "Amsterdam East",
              "Zeeburg",
              "Cruquius",
              "Eastern Docklands",
              "Above CrossFit Zeeburg",
            ].map((t) => (
              <li
                key={t}
                className="rounded-full border border-border bg-background px-3 py-1"
              >
                {t}
              </li>
            ))}
          </ul>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Get directions
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-sage/25 via-secondary to-primary/15 shadow-sm"
          aria-label="Open directions to Cruquiusweg 96F, Amsterdam"
        >
          <div className="aspect-[4/3] w-full sm:aspect-[5/4]">
            <svg viewBox="0 0 400 320" className="h-full w-full" aria-hidden>
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="400" height="320" fill="url(#grid)" className="text-foreground" />
              <path d="M0 210 Q 100 190 200 205 T 400 200 L 400 320 L 0 320 Z" className="fill-primary/25" />
              <path d="M-10 120 L 410 140" stroke="currentColor" strokeOpacity="0.25" strokeWidth="6" className="text-foreground" />
              <path d="M 140 -10 L 160 330" stroke="currentColor" strokeOpacity="0.2" strokeWidth="4" className="text-foreground" />
              <path d="M 260 -10 L 280 330" stroke="currentColor" strokeOpacity="0.15" strokeWidth="3" className="text-foreground" />
            </svg>
          </div>
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg">
              <MapPin className="h-6 w-6" />
            </span>
            <span className="rounded-full bg-background/90 px-3.5 py-1.5 text-sm font-medium text-foreground shadow-sm backdrop-blur">
              Cruquiusweg 96F
            </span>
          </div>
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-full bg-background/90 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur transition-transform group-hover:translate-x-0.5">
            Open in Maps
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </a>
      </div>
    </Section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCTA() {
  return (
    <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground shadow-xl sm:px-12 md:py-24">
        <h2 className="mx-auto max-w-2xl font-display text-[2rem] leading-tight sm:text-4xl md:text-5xl">
          Give your week fourteen calmer days.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-primary-foreground/85">
          Start with 14 days of unlimited yoga at Yoga Zeeburg. No auto-renew,
          no pressure — just space to move, breathe and see how it fits.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={INTRO_URL}
            className="inline-flex items-center gap-2 rounded-full bg-background px-7 py-3.5 text-base font-medium text-foreground shadow-sm transition-colors hover:bg-background/90"
          >
            Start with 14 days unlimited
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3.5 text-base font-medium text-primary-foreground hover:bg-primary-foreground/10"
          >
            View pricing
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Shared layout helpers ---------- */
function Section({
  id,
  tone = "default",
  children,
}: {
  id?: string;
  tone?: "default" | "muted";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={
        tone === "muted"
          ? "bg-secondary/40 px-4 py-20 sm:px-6 md:py-28 lg:px-8"
          : "px-4 py-20 sm:px-6 md:py-28 lg:px-8"
      }
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <span className="text-sm font-medium uppercase tracking-wide text-clay">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 font-display text-[2rem] leading-[1.1] text-foreground sm:text-4xl md:text-[2.5rem]">
        {title}
      </h2>
      {sub && <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">{sub}</p>}
    </div>
  );
}
