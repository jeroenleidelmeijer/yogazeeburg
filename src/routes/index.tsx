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
      { title: "Yoga Zeeburg — Down-to-earth yoga in Amsterdam East" },
      {
        name: "description",
        content:
          "A calm, modern yoga studio in Amsterdam East (Zeeburg / Cruquius). Small classes, clear guidance, no spiritual performance. Try 14 days unlimited for €30.",
      },
      { property: "og:title", content: "Yoga Zeeburg — Down-to-earth yoga in Amsterdam East" },
      {
        property: "og:description",
        content:
          "Small, modern yoga studio by the water in Amsterdam East. Start with 14 days unlimited for €30.",
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
            "Down-to-earth yoga studio in Amsterdam East. Small, calm and beginner-friendly.",
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
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-14 sm:px-6 md:grid-cols-2 md:gap-14 md:pb-24 md:pt-20 lg:px-8">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary/70 px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-clay" />
            Yoga in Amsterdam East · Zeeburg
          </span>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Your week is loud.
            <br />
            <span className="text-primary">This is where it slows down.</span>
          </h1>
          <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
            A small, down-to-earth yoga studio by the water in Amsterdam East.
            No spiritual performance, no pressure — just a weekly reset for
            your body and head.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={INTRO_URL}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              Start with 14 days unlimited
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              View pricing
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            14-Day Unlimited Intro Pass — €30 · stops automatically
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
  { icon: Waves, title: "Calm", body: "Step out of the noise. Land back in your body." },
  { icon: Activity, title: "Tension release", body: "Unwind tight shoulders, hips and lower back." },
  { icon: Sparkles, title: "Mobility", body: "Move better in daily life — not just on the mat." },
  { icon: Wind, title: "Breathing", body: "Slow, steady breath that carries into your week." },
  { icon: CalendarCheck, title: "Weekly routine", body: "A rhythm you can actually keep up." },
];

function Benefits() {
  return (
    <Section id="benefits" tone="muted">
      <SectionHeader
        eyebrow="What you get"
        title="A weekly reset that actually fits your life"
      />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {BENEFITS.map(({ icon: Icon, title, body }) => (
          <li
            key={title}
            className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg text-foreground">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
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
    "One simple way to start",
    "Stops automatically — no cancellation stress",
    "Try any class, at your own pace",
  ];
  return (
    <Section id="intro">
      <div className="grid gap-10 rounded-3xl border border-border/60 bg-secondary/60 p-8 md:grid-cols-[1.1fr_1fr] md:p-12">
        <div>
          <span className="text-sm font-medium text-clay">Intro Pass</span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">
            The easiest way to try Yoga Zeeburg
          </h2>
          <p className="mt-4 text-muted-foreground">
            Two weeks of unlimited yoga so you can find the classes and times
            that fit your week — without a subscription commitment.
          </p>
          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-center rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
          <div className="text-sm text-muted-foreground">14-Day Unlimited Intro Pass</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-5xl text-foreground">€30</span>
            <span className="text-sm text-muted-foreground">/ 14 days</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            No auto-renew. No pressure. Just yoga.
          </p>
          <a
            href={INTRO_URL}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Start with 14 days unlimited
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Why Yoga Zeeburg ---------- */
const WHY = [
  "Down-to-earth atmosphere — come as you are",
  "Small, personal studio",
  "Beginner-friendly, always",
  "Clear class descriptions, so you know what to expect",
  "Calm location by the water",
  "In the heart of Amsterdam East — Zeeburg / Cruquius",
  "No pressure, no spiritual performance",
  "Simple, honest pricing",
];

function WhyUs() {
  return (
    <Section id="why" tone="muted">
      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
        <div>
          <span className="text-sm font-medium text-clay">Why Yoga Zeeburg</span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">
            A yoga studio that feels like Amsterdam East
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Grounded, unpretentious and quietly modern. Built for people who
            just want to move, breathe and feel better afterwards.
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {WHY.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 rounded-xl border border-border/60 bg-card px-4 py-3 text-sm text-foreground shadow-sm"
            >
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ---------- Class direction preview ---------- */
const CATEGORIES = [
  { title: "Slow & calm", body: "Gentle, grounding classes to unwind and downshift." },
  { title: "Active flow", body: "Stronger, moving classes to build energy and focus." },
  { title: "Mobility & recovery", body: "Targeted work for stiff hips, shoulders and lower back." },
  { title: "Beginner-friendly", body: "Clear guidance, no assumptions — a soft place to start." },
];

function ClassDirections() {
  return (
    <Section id="classes">
      <SectionHeader
        eyebrow="Classes"
        title="Different weeks, different needs"
        sub="Pick the kind of class that fits how you actually feel — not how you're supposed to feel."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <h3 className="font-display text-xl text-foreground">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link
          to="/classes"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
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
      <div className="grid items-center gap-8 rounded-3xl border border-border/60 bg-card p-8 md:grid-cols-[1.4fr_auto] md:p-12">
        <div>
          <span className="text-sm font-medium text-clay">Pricing</span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">
            The more yoga becomes part of your week, the better the value gets.
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Flexible options for drop-ins, regulars and true weekly practice.
          </p>
        </div>
        <Link
          to="/pricing"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
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
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <span className="text-sm font-medium text-clay">Find us</span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">
            By the water in Amsterdam East
          </h2>
          <address className="mt-5 text-base not-italic text-foreground">
            <div className="font-medium">Yoga Zeeburg</div>
            <div className="text-muted-foreground">Cruquiusweg 96F</div>
            <div className="text-muted-foreground">Amsterdam</div>
          </address>
          <ul className="mt-5 flex flex-wrap gap-2 text-xs text-muted-foreground">
            {["Zeeburg", "Cruquius", "Eastern Docklands", "Amsterdam East", "Above CrossFit Zeeburg"].map((t) => (
              <li key={t} className="rounded-full border border-border bg-background px-3 py-1">
                {t}
              </li>
            ))}
          </ul>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
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
            <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg">
              <MapPin className="h-6 w-6" />
            </span>
            <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur">
              Cruquiusweg 96F
            </span>
          </div>
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur transition-transform group-hover:translate-x-0.5">
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
    <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-primary px-8 py-14 text-center text-primary-foreground shadow-xl sm:px-12 md:py-20">
        <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
          Give your week fourteen calmer days.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/85">
          Start with 14 days unlimited yoga for €30. No auto-renew, no pressure.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={INTRO_URL}
            className="inline-flex items-center gap-2 rounded-full bg-background px-5 py-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-background/90"
          >
            Start with 14 days unlimited
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10"
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
          ? "bg-secondary/40 px-4 py-16 sm:px-6 md:py-24 lg:px-8"
          : "px-4 py-16 sm:px-6 md:py-24 lg:px-8"
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
      {eyebrow && <span className="text-sm font-medium text-clay">{eyebrow}</span>}
      <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}
