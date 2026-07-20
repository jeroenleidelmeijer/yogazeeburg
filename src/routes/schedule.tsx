import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const INTRO_URL = "https://trial.yogazeeburg.com/";

type Lesson = { time: string; name: string; teacher: string };
type Day = { day: string; lessons: Lesson[] };

const SCHEDULE: Day[] = [
  {
    day: "Monday",
    lessons: [
      { time: "18:00–19:15", name: "Vinyasa & Aroma", teacher: "Csenge van der Heijden" },
      { time: "19:30–20:45", name: "Slow Flow & Soundbath", teacher: "Csenge van der Heijden" },
    ],
  },
  {
    day: "Tuesday",
    lessons: [
      { time: "18:45–20:00", name: "Strong Flow", teacher: "Csenge van der Heijden" },
      { time: "20:15–21:30", name: "Restorative & Reiki & Aroma", teacher: "Csenge van der Heijden" },
    ],
  },
  {
    day: "Wednesday",
    lessons: [
      { time: "17:30–18:45", name: "Stress Release (Yin style)", teacher: "Nicky Kuiper" },
      { time: "19:00–20:30", name: "Relax Yin & Nidra (1,5 hour class)", teacher: "Nicky Kuiper" },
    ],
  },
  {
    day: "Thursday",
    lessons: [
      { time: "08:00–09:15", name: "Pilates Fusion", teacher: "Kelsey van Os" },
      { time: "18:00–19:15", name: "Strength & Stretch Yoga", teacher: "Veronica Torri" },
    ],
  },
  {
    day: "Friday",
    lessons: [
      { time: "10:00–11:15", name: "Stress Release (Yin style)", teacher: "Nicky Kuiper" },
    ],
  },
  {
    day: "Saturday",
    lessons: [
      { time: "09:00–10:15", name: "Weekend Warm-up Flow", teacher: "Veronica Torri" },
      { time: "10:30–11:45", name: "Yin Yang Yoga", teacher: "Veronica Torri" },
    ],
  },
  {
    day: "Sunday",
    lessons: [
      { time: "09:30–10:45", name: "Vinyasa + Somatic Movement", teacher: "Mila Vasina" },
      { time: "11:00–12:15", name: "Deep Stretch Yin & Breathwork", teacher: "Mila Vasina" },
    ],
  },
];

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Yoga Class Schedule Amsterdam East | Yoga Zeeburg" },
      {
        name: "description",
        content:
          "View the weekly Yoga Zeeburg schedule in Amsterdam East, with Vinyasa, Yin, Nidra, Pilates Fusion and more.",
      },
      { property: "og:title", content: "Yoga Class Schedule Amsterdam East | Yoga Zeeburg" },
      {
        property: "og:description",
        content:
          "View the weekly Yoga Zeeburg schedule in Amsterdam East, with Vinyasa, Yin, Nidra, Pilates Fusion and more.",
      },
      { property: "og:url", content: "https://www.yogazeeburg.com/schedule" },
    ],
    links: [{ rel: "canonical", href: "https://www.yogazeeburg.com/schedule" }],
  }),
  component: SchedulePage,
});

function SchedulePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <WeeklySchedule />
        <SportbitNotice />
        <ClassesLink />
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
          Weekly schedule
        </p>
        <h1 className="mt-4 font-display text-4xl leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Find a class that fits your week.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Whether you want to move, slow down or release some tension, there is a class for
          you throughout the week.
        </p>
      </div>
    </section>
  );
}

function WeeklySchedule() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <ul className="divide-y divide-border/60">
          {SCHEDULE.map((day) => (
            <li key={day.day} className="py-6 lg:py-8">
              <div className="lg:grid lg:grid-cols-[10rem_1fr] lg:gap-10">
                <div className="font-display text-2xl text-foreground lg:text-[1.75rem]">
                  {day.day}
                </div>
                <ul className="mt-4 divide-y divide-border/50 lg:mt-0">
                  {day.lessons.map((l, i) => (
                    <li
                      key={i}
                      className="py-3 first:pt-0 last:pb-0 lg:grid lg:grid-cols-[9rem_1fr] lg:gap-6 lg:py-4"
                    >
                      <div className="text-sm font-medium tabular-nums text-muted-foreground lg:pt-1 lg:text-base lg:text-foreground/80">
                        {l.time}
                      </div>
                      <div className="mt-1 lg:mt-0">
                        <div className="text-base font-medium text-foreground lg:text-lg">
                          {l.name}
                        </div>
                        <div className="mt-0.5 text-sm text-muted-foreground">
                          {l.teacher}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SportbitNotice() {
  return (
    <section className="border-b border-border/60 bg-secondary/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-12 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-xl text-foreground md:text-2xl">
            Always check Sportbit
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            This page shows our regular weekly timetable. For the latest schedule changes,
            availability and reservations, current members always use Sportbit.
          </p>
        </div>
      </div>
    </section>
  );
}

function ClassesLink() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
          Choosing your class
        </p>
        <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-foreground md:text-4xl">
          Not sure which class suits you?
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          From energising Vinyasa to calming Yin and Nidra, every class has its own pace and
          focus. Explore our classes to find the one that matches what you need.
        </p>
        <Link
          to="/classes"
          className="mt-6 inline-flex items-center gap-1.5 text-base font-medium text-foreground underline-offset-4 hover:underline"
        >
          Explore our classes
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary-foreground/75">
          New to Yoga Zeeburg?
        </p>
        <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl">
          Start with 14 days unlimited.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/85">
          Try different classes, teachers and times before choosing the routine that works
          for you.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
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
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
