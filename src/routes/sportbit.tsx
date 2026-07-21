import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Smartphone, Calendar, Clock, ListChecks, Mail, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const SPORTBIT_WEB_URL = "https://crossfitzeeburg.sportbitapp.nl/web/nl/";
const CONTACT_EMAIL = "hello@yogazeeburg.com";

export const Route = createFileRoute("/sportbit")({
  head: () => ({
    meta: [
      { title: "Sportbit Guide — How to Book Classes | Yoga Zeeburg" },
      {
        name: "description",
        content:
          "How to use Sportbit at Yoga Zeeburg: choose the Yoga Zeeburg schedule, book classes, use the waiting list and cancel on time.",
      },
      { property: "og:title", content: "Sportbit Guide — Yoga Zeeburg" },
      {
        property: "og:description",
        content:
          "A calm, clear guide to booking your yoga classes at Yoga Zeeburg through Sportbit.",
      },
      { property: "og:url", content: "https://www.yogazeeburg.com/sportbit" },
    ],
    links: [{ rel: "canonical", href: "https://www.yogazeeburg.com/sportbit" }],
  }),
  component: SportbitPage,
});

function SportbitPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <Steps />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
          Sportbit guide
        </p>
        <h1 className="mt-4 font-display text-4xl leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          How to use Sportbit at Yoga Zeeburg
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Sportbit is the booking system for Yoga Zeeburg. This page walks you
          through choosing the right schedule, booking a class, using the
          waiting list, and cancelling on time — so your routine stays simple.
        </p>
      </div>
    </section>
  );
}

type Step = {
  n: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: React.ReactNode;
};

function Steps() {
  const steps: Step[] = [
    {
      n: "01",
      icon: Smartphone,
      title: "Download Sportbit or use the web version",
      body: (
        <>
          <p>
            You can use the Sportbit app on iPhone or Android, or open Sportbit
            in your browser. Both work the same way — pick whichever fits your
            routine.
          </p>
          <div className="mt-5">
            <a
              href={SPORTBIT_WEB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Open Sportbit in your browser
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </>
      ),
    },
    {
      n: "02",
      icon: MapPin,
      title: "Select the Yoga Zeeburg schedule",
      body: (
        <>
          <p>
            Sportbit also contains the CrossFit Zeeburg schedules. Before you
            book anything, switch to <strong className="font-medium text-foreground">Yoga Zeeburg</strong> at
            the top of the app. This is the most common source of mistaken
            bookings — check it every time.
          </p>
          <div className="mt-5 rounded-lg border-l-2 border-accent bg-secondary/60 px-5 py-4 text-sm text-foreground/90">
            Tip: if you see WODs or CrossFit classes, you are still on the
            wrong schedule. Tap the schedule name at the top and choose Yoga
            Zeeburg.
          </div>
        </>
      ),
    },
    {
      n: "03",
      icon: Calendar,
      title: "Book your class",
      body: (
        <p>
          Classes can be booked up to two weeks in advance. Each day, the same
          weekday two weeks ahead becomes available — so a Tuesday opens up
          every Tuesday.
        </p>
      ),
    },
    {
      n: "04",
      icon: ListChecks,
      title: "Use the waiting list",
      body: (
        <>
          <p>
            If a class is full, join the waiting list. Places open up more
            often than you think.
          </p>
          <ul className="mt-4 space-y-2 text-foreground/90">
            <li>
              <span className="font-medium text-foreground">More than 2 hours before class:</span>{" "}
              if someone cancels, the first person on the waiting list is
              moved into the class automatically.
            </li>
            <li>
              <span className="font-medium text-foreground">Less than 2 hours before class:</span>{" "}
              everyone on the waiting list gets a notification and email. The
              first person to book gets the spot.
            </li>
          </ul>
        </>
      ),
    },
    {
      n: "05",
      icon: Clock,
      title: "Cancel as early as possible",
      body: (
        <>
          <p>
            You can cancel without losing a credit up to two hours before
            class. Cancelling within two hours costs a credit.
          </p>
          <p className="mt-3">
            Please cancel as early as you can, so someone on the waiting list
            gets to join.
          </p>
        </>
      ),
    },
    {
      n: "06",
      icon: Mail,
      title: "Need help?",
      body: (
        <>
          <p>
            Stuck on a booking, membership or Sportbit login? Send us a short
            message and we’ll help you sort it.
          </p>
          <div className="mt-5">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Email {CONTACT_EMAIL}
            </a>
          </div>
        </>
      ),
    },
  ];

  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <ol className="space-y-10 md:space-y-14">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <li
                key={s.n}
                className="grid gap-6 md:grid-cols-[8rem_1fr] md:gap-10"
              >
                <div className="flex items-center gap-3 md:block">
                  <div className="font-display text-4xl text-accent md:text-5xl">
                    {s.n}
                  </div>
                  <Icon className="h-6 w-6 text-muted-foreground md:mt-3" aria-hidden />
                </div>
                <div>
                  <h2 className="font-display text-2xl leading-tight text-foreground md:text-3xl">
                    {s.title}
                  </h2>
                  <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {s.body}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-secondary/60">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl leading-tight tracking-tight text-foreground md:text-4xl">
            Ready to book your next class?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Have a look at the weekly schedule and pick a moment that fits
            your week.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/schedule"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              View the schedule
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              to="/classes"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Explore our classes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
