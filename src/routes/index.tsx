import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowRight, ArrowUpRight } from "lucide-react";
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
      { property: "og:url", content: "https://www.yogazeeburg.com/" },
    ],
    links: [{ rel: "canonical", href: "https://www.yogazeeburg.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ExerciseGym",
          name: "Yoga Zeeburg",
          description:
            "Down-to-earth yoga studio in Amsterdam East, by the water in Zeeburg / Cruquius. Small, calm and beginner-friendly. Yoga for stress, tension, mobility and relaxation.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Cruquiusweg 96F",
            addressLocality: "Amsterdam",
            postalCode: "1019 AH",
            addressCountry: "NL",
          },
          areaServed: ["Amsterdam East", "Zeeburg", "Cruquius", "Eastern Docklands"],
          url: "https://www.yogazeeburg.com/",
          email: "hello@yogazeeburg.com",
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

/* ============================================================
   HERO — editorial, single strong promise
   ============================================================ */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* soft warm glow backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70%] bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--color-sage)_18%,transparent),transparent_70%)]"
      />
      <div className="mx-auto grid max-w-6xl gap-14 px-4 pb-24 pt-16 sm:px-6 md:grid-cols-[1.15fr_1fr] md:gap-16 md:pb-32 md:pt-24 lg:px-8">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-clay" />
            Yoga Zeeburg · Amsterdam East
          </span>
          <h1 className="mt-7 font-display text-[2.75rem] leading-[1.03] tracking-tight text-foreground sm:text-[3.5rem] md:text-[4.25rem] lg:text-[4.75rem]">
            Too busy for yoga?{" "}
            <span className="text-primary italic">That's probably why you need it.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            For weeks that feel too full, shoulders that won't unclench, and a
            head that won't switch off. A calm, down-to-earth yoga studio in
            Amsterdam East — by the water in Zeeburg and Cruquius — where you
            move, breathe, release tension and land back in your body.
          </p>
          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={INTRO_URL}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              Start with 14 days unlimited
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-medium text-foreground underline-offset-4 hover:underline"
            >
              View pricing
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            14-Day Unlimited Intro Pass · stops automatically · new students only
          </p>
        </div>

        {/* Hero image — softer, more integrated frame */}
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-sage/15 blur-2xl" aria-hidden />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border/50 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.25)]">
            <img
              src="/hero.jpg"
              alt="Warm morning light on the water — Yoga Zeeburg in Amsterdam East"
              className="h-full w-full object-cover"
              width={1600}
              height={1008}
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/25 to-transparent" aria-hidden />
            <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-background/85 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              Cruquiusweg 96F · by the water
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   BENEFITS — editorial numbered list, not tiny cards
   ============================================================ */
const BENEFITS = [
  { title: "Feel calmer", body: "Step out of the noise and land back in your body." },
  { title: "Release tension", body: "Unwind tight shoulders, hips and lower back." },
  { title: "Move better", body: "Build mobility and ease without forcing it." },
  { title: "Breathe deeper", body: "Slow down, breathe wider and feel more grounded." },
  { title: "Build a weekly routine", body: "A rhythm you can actually keep up." },
];

function Benefits() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div className="md:sticky md:top-28 md:self-start">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
              What changes when you show up
            </span>
            <h2 className="mt-5 font-display text-[2.25rem] leading-[1.05] text-foreground sm:text-5xl md:text-[3.25rem]">
              You don't need another class.
              <br />
              <span className="text-primary italic">You need a weekly reset.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              A calm hour on the mat that changes the rest of your week.
              No perfect poses, no performance — just space to slow down.
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
    label: "Step 1",
    title: "Start with 14 days unlimited",
    body: "Book in, roll out your mat, come as you are. No commitment beyond two weeks.",
  },
  {
    label: "Step 2",
    title: "Try different classes and times",
    body: "Explore slower, calmer sessions and stronger, moving ones. Find teachers you click with.",
  },
  {
    label: "Step 3",
    title: "Discover what fits your routine",
    body: "After 14 days, choose the rhythm that makes sense for your life.",
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
          <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-sage/20 blur-3xl" aria-hidden />

          <div className="relative">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
              The easiest first step
            </span>
            <h2 className="mt-4 max-w-3xl font-display text-[2.25rem] leading-[1.05] text-foreground sm:text-5xl md:text-[3rem]">
              14 days of unlimited yoga. Then you'll know.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Start with 14 days of unlimited yoga at Yoga Zeeburg. Try
              different classes, teachers and times, then discover what fits
              your body, energy and schedule.
            </p>

            <ol className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
              {INTRO_STEPS.map((s) => (
                <li
                  key={s.label}
                  className="border-t border-border/70 pt-5"
                >
                  <span className="text-xs font-medium uppercase tracking-wide text-clay">
                    {s.label}
                  </span>
                  <h3 className="mt-2 font-display text-xl text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-12 flex flex-wrap items-center gap-6">
              <a
                href={INTRO_URL}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Start with 14 days unlimited
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="text-sm text-muted-foreground">
                Easy first step · stops automatically · no hidden subscription
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
  "Small & personal",
  "Beginner-friendly",
  "Clear class descriptions",
  "Calm location by the water",
  "Rooted in Amsterdam East",
  "No pressure",
  "No spiritual performance",
];

function WhyUs() {
  return (
    <section className="relative bg-[color-mix(in_oklab,var(--color-clay)_5%,var(--color-background))] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1fr_1fr] md:items-center md:gap-20">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
            Why Yoga Zeeburg
          </span>
          <h2 className="mt-5 font-display text-[2.25rem] leading-[1.05] text-foreground sm:text-5xl md:text-[3.25rem]">
            A neighbourhood yoga studio for people who live here.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/90">
            <p>
              Yoga Zeeburg is a small, personal studio in Amsterdam East,
              tucked above CrossFit Zeeburg on Cruquiusweg — a quiet corner
              of the Eastern Docklands, right by the water.
            </p>
            <p className="text-muted-foreground">
              You'll find beginner-friendly classes, clear descriptions of what
              each class actually is, and teachers who guide without preaching.
              No spiritual performance. No pressure. Just down-to-earth yoga
              for real bodies and real weeks.
            </p>
          </div>
          <div className="mt-8">
            <a
              href={INTRO_URL}
              className="inline-flex items-center gap-2 text-base font-medium text-primary hover:underline"
            >
              Come try a class
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-sage/25 blur-3xl" aria-hidden />
          <div className="rounded-[2rem] border border-border/60 bg-background/80 p-8 shadow-sm backdrop-blur sm:p-10">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
              In the neighbourhood
            </div>
            <p className="mt-3 text-[15.5px] leading-relaxed text-foreground/85">
              A small studio you'll get to know quickly — familiar faces at the
              door, calm teachers on the mat, and a room that feels like a
              little exhale from the city.
            </p>
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
                  <span className="text-foreground">Cruquiusweg 96F</span>, Amsterdam East ·
                  Zeeburg / Cruquius · Eastern Docklands · above CrossFit Zeeburg
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
    q: "Need to slow down?",
    a: "Gentle, grounding classes for when your head is full and your body needs to exhale.",
  },
  {
    q: "Want to move?",
    a: "More active classes for energy, focus and a healthy sweat.",
  },
  {
    q: "Feeling stiff?",
    a: "Slower sessions to release tension and create more space in your body.",
  },
  {
    q: "New to yoga?",
    a: "Beginner-friendly guidance, clear descriptions and no pressure to perform.",
  },
];

function ClassDirections() {
  return (
    <section className="px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
            Classes
          </span>
          <h2 className="mt-5 font-display text-[2.25rem] leading-[1.05] text-foreground sm:text-5xl md:text-[3.25rem]">
            Choose based on what you need today.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Some weeks call for stillness, others for motion. Pick the direction
            that matches how you actually feel — not how you're supposed to feel.
          </p>
        </div>

        <ul className="mt-14 divide-y divide-border/70 border-y border-border/70">
          {DIRECTIONS.map((d) => (
            <li key={d.q} className="grid grid-cols-1 items-baseline gap-3 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:gap-14">
              <h3 className="font-display text-2xl text-foreground md:text-3xl">
                {d.q}
              </h3>
              <p className="text-[15.5px] leading-relaxed text-muted-foreground md:text-base">
                {d.a}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            to="/classes"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
          >
            View all classes
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
              Pricing
            </span>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.08] text-foreground sm:text-4xl md:text-[2.75rem]">
              The more yoga becomes part of your week, the better the value gets.
            </h2>
            <p className="mt-6 max-w-2xl font-display text-2xl italic leading-snug text-primary sm:text-[1.75rem]">
              A single class can help for a day. A routine can change your week.
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Start with the Intro Pass, then choose the routine that fits your
              life. Regular memberships are designed for people who want yoga
              to become part of their week.
            </p>
          </div>
          <Link
            to="/pricing"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            View pricing
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   LOCATION — warm local advantage, image + stylized map
   ============================================================ */
function Location() {
  return (
    <section className="bg-[color-mix(in_oklab,var(--color-sage)_10%,var(--color-background))] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2 md:gap-20">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
            Find us
          </span>
          <h2 className="mt-5 font-display text-[2.25rem] leading-[1.05] text-foreground sm:text-5xl md:text-[3.25rem]">
            A calm room, just away from the noise.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Yoga Zeeburg sits above CrossFit Zeeburg on Cruquiusweg — a quiet
            corner of Amsterdam East where Zeeburg meets Cruquius, right by
            the water in the Eastern Docklands. Easy to reach, easy to leave
            the day behind.
          </p>
          <address className="mt-8 text-base not-italic">
            <div className="font-display text-2xl text-foreground">Yoga Zeeburg</div>
            <div className="mt-1 text-foreground/85">Cruquiusweg 96F</div>
            <div className="text-foreground/85">1019 AH Amsterdam</div>
          </address>
          <ul className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
            {[
              "Amsterdam East",
              "Zeeburg",
              "Cruquius",
              "Eastern Docklands",
              "Above CrossFit Zeeburg",
              "By the water",
            ].map((t) => (
              <li key={t} className="rounded-full border border-border bg-background px-3 py-1">
                {t}
              </li>
            ))}
          </ul>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Get directions
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-[2rem] border border-border/60 shadow-sm"
          aria-label="Open directions to Cruquiusweg 96F, Amsterdam"
          style={{ backgroundColor: "#eef1e8" }}
        >
          <div className="aspect-[4/5] w-full md:aspect-[5/6]">
            <svg viewBox="0 0 400 480" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
              {/* Land base (warm off-white) */}
              <rect width="400" height="480" fill="#efeee6" />

              {/* Water — IJ / Buiten-IJ across the top, harbour basins,
                  Nieuwevaart canal beside the pin, and pockets to the SE */}
              <g fill="#cfe2e6">
                {/* Top: IJ / Buiten-IJ */}
                <path d="M0,0 L400,0 L400,150 C 330,165 260,120 190,140 C 120,158 60,120 0,140 Z" />
                {/* Harbour inlet dipping south (Oostelijk Havengebied basin) */}
                <path d="M60,140 C 80,190 130,200 150,235 C 165,260 130,260 100,255 C 70,250 55,220 55,190 Z" />
                {/* Nieuwevaart canal — runs east-west just above the pin */}
                <path d="M0,258 C 90,246 180,254 260,250 C 320,247 360,252 400,248 L400,268 C 360,272 320,266 260,270 C 180,274 90,266 0,278 Z" />
                {/* Small basin north-east of pin (near Camping Zeeburg) */}
                <path d="M300,205 C 335,205 355,225 350,250 C 345,270 315,270 300,255 C 290,240 285,215 300,205 Z" />
                {/* South-east water pocket (Amsterdam-Rijnkanaal hint) */}
                <path d="M330,360 C 370,355 400,370 400,410 L400,480 L320,480 C 310,440 300,395 330,360 Z" />
                {/* Small pond bottom-left (Flevopark waters) */}
                <path d="M85,405 C 115,400 135,420 130,438 C 122,455 95,455 85,440 C 78,428 78,412 85,405 Z" />
              </g>

              {/* Parks — subtle sage patches (Flevopark, Diemerpark hints) */}
              <g fill="#d7e1c9" opacity="0.85">
                <path d="M40,370 C 80,360 130,370 150,395 C 165,420 130,455 90,460 C 55,462 30,435 40,370 Z" />
                <path d="M260,390 C 300,385 335,395 340,420 C 342,445 305,465 275,460 C 250,455 245,420 260,390 Z" />
              </g>

              {/* A10 ring road — soft curve on the right */}
              <path d="M300,20 C 330,90 345,170 335,260 C 325,340 335,410 370,480"
                fill="none" stroke="#e8c98a" strokeWidth="7" strokeLinecap="round" />
              <path d="M300,20 C 330,90 345,170 335,260 C 325,340 335,410 370,480"
                fill="none" stroke="#f2d9a5" strokeWidth="3" strokeLinecap="round" />

              {/* Local roads — Cruquiusweg / Zeeburgerdijk / cross streets */}
              <g fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round">
                {/* Zeeburgerdijk — horizontal, south of pin */}
                <path d="M0,315 C 90,310 180,318 260,312 C 310,308 360,316 400,312" />
                {/* Cruquiusweg — the street of the pin */}
                <path d="M0,295 C 90,285 180,292 260,286 C 310,283 360,290 400,286" />
                {/* Cross street heading south */}
                <path d="M175,286 L 190,470" />
                {/* Cross street east */}
                <path d="M230,283 L 250,470" />
              </g>
              <g fill="none" stroke="#e5e2d4" strokeWidth="1.5">
                <path d="M0,315 C 90,310 180,318 260,312 C 310,308 360,316 400,312" />
                <path d="M0,295 C 90,285 180,292 260,286 C 310,283 360,290 400,286" />
                <path d="M175,286 L 190,470" />
                <path d="M230,283 L 250,470" />
              </g>

              {/* Neighbourhood label */}
              <text x="70" y="360" fill="#9a9585" fontSize="10" letterSpacing="2" fontFamily="ui-sans-serif, system-ui">
                ZEEBURG
              </text>
              <text x="230" y="200" fill="#9a9585" fontSize="10" letterSpacing="2" fontFamily="ui-sans-serif, system-ui">
                EASTERN DOCKLANDS
              </text>
            </svg>
          </div>

          {/* Pin overlay — positioned near where Cruquiusweg 96F would sit */}
          <div className="pointer-events-none absolute left-[46%] top-[54%] flex -translate-x-1/2 -translate-y-full flex-col items-center gap-2">
            <span className="rounded-full bg-background/95 px-3 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur">
              Yoga Zeeburg
            </span>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background/70">
              <MapPin className="h-5 w-5" />
            </span>
          </div>

          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-full bg-background/95 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur transition-transform group-hover:translate-x-0.5">
            Open in Maps
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </a>
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
            Start where you are.
            <br />
            <span className="italic text-primary-foreground/90">
              Build a routine that lasts.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/85">
            Begin with 14 days of unlimited yoga at Yoga Zeeburg. Try different
            classes, find what fits your week, and take the first step toward
            feeling calmer, more confident and more at home in your body.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={INTRO_URL}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-background px-7 py-4 text-base font-medium text-foreground shadow-sm transition-colors hover:bg-background/90 sm:w-auto"
            >
              Start with 14 days unlimited
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/pricing"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-4 text-base font-medium text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
            >
              View pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Kept exports for potential reuse */
export type _KeepShared = ReactNode;
