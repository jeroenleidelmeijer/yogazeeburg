import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { IntroPassCTA } from "@/components/site/IntroPassCTA";
import { commercialLinks } from "@/lib/i18n";

type Lesson = { time: string; name: string; teacher: string };
type Day = { day: string; lessons: Lesson[] };

const SCHEDULE: Day[] = [
  {
    day: "Maandag",
    lessons: [
      { time: "18:00–19:15", name: "Vinyasa & Aroma", teacher: "Csenge van der Heijden" },
      { time: "19:30–20:45", name: "Slow Flow & Soundbath", teacher: "Csenge van der Heijden" },
    ],
  },
  {
    day: "Dinsdag",
    lessons: [
      { time: "18:45–20:00", name: "Strong Flow", teacher: "Csenge van der Heijden" },
      { time: "20:15–21:30", name: "Restorative & Reiki & Aroma", teacher: "Csenge van der Heijden" },
    ],
  },
  {
    day: "Woensdag",
    lessons: [
      { time: "17:30–18:45", name: "Stress Release (Yin style)", teacher: "Nicky Kuiper" },
      { time: "19:00–20:30", name: "Relax Yin & Nidra (1,5 uur les)", teacher: "Nicky Kuiper" },
    ],
  },
  {
    day: "Donderdag",
    lessons: [
      { time: "08:00–09:15", name: "Pilates Fusion", teacher: "Mila Vasina" },
      { time: "18:00–19:15", name: "Pilates Fusion", teacher: "Mila Vasina" },
    ],
  },
  {
    day: "Vrijdag",
    lessons: [
      { time: "10:00–11:15", name: "Stress Release (Yin style)", teacher: "Nicky Kuiper" },
    ],
  },
  {
    day: "Zaterdag",
    lessons: [
      { time: "09:00–10:15", name: "Weekend Warm-up Flow", teacher: "Veronica Torri" },
      { time: "10:30–11:45", name: "Yin Yang Yoga", teacher: "Veronica Torri" },
    ],
  },
  {
    day: "Zondag",
    lessons: [
      { time: "09:30–10:45", name: "Vinyasa + Somatic Movement", teacher: "Mila Vasina" },
      { time: "11:00–12:15", name: "Deep Stretch Yin & Breathwork", teacher: "Mila Vasina" },
    ],
  },
];

export const Route = createFileRoute("/rooster")({
  head: () => ({
    meta: [
      { title: "Lesrooster Yoga Amsterdam Oost | Yoga Zeeburg" },
      {
        name: "description",
        content:
          "Bekijk het wekelijkse rooster van Yoga Zeeburg in Amsterdam Oost. Ontdek Vinyasa, Yin, Pilates Fusion en meer, en kies de les die bij jouw week past.",
      },
      { property: "og:title", content: "Lesrooster Yoga Amsterdam Oost | Yoga Zeeburg" },
      {
        property: "og:description",
        content:
          "Bekijk het wekelijkse rooster van Yoga Zeeburg in Amsterdam Oost, met Vinyasa, Yin, Nidra, Pilates Fusion en meer.",
      },
      { property: "og:url", content: "https://www.yogazeeburg.com/rooster" },
    ],
    links: commercialLinks("nl", "schedule"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Lesrooster Yoga Amsterdam Oost",
          url: "https://www.yogazeeburg.com/rooster",
          inLanguage: "nl-NL",
          description:
            "Bekijk het wekelijkse rooster van Yoga Zeeburg in Amsterdam Oost. Ontdek Vinyasa, Yin, Pilates Fusion en meer, en kies de les die bij jouw week past.",
          isPartOf: {
            "@type": "WebSite",
            name: "Yoga Zeeburg",
            url: "https://www.yogazeeburg.com/",
          },
          about: { "@type": "ExerciseGym", name: "Yoga Zeeburg", url: "https://www.yogazeeburg.com/" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.yogazeeburg.com/" },
            { "@type": "ListItem", position: 2, name: "Rooster", item: "https://www.yogazeeburg.com/rooster" },
          ],
        }),
      },
    ],
  }),
  component: SchedulePage,
});

function SchedulePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader locale="nl" page="schedule" />
      <main>
        <Hero />
        <WeeklySchedule />
        <SportbitNotice />
        <ClassesLink />
        <FinalCTA />
      </main>
      <SiteFooter locale="nl" />
    </div>
  );
}

function Hero() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
          Wekelijks rooster
        </p>
        <h1 className="mt-4 font-display text-4xl leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Vind een les die bij jouw week past.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Yoga Zeeburg geeft zeven dagen per week les aan de Cruquiusweg 96F in Amsterdam Oost, van
          vroege ochtenden tot avonden. Hieronder vind je ons vaste weekrooster.
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
            Check altijd Sportbit
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Voor de laatste wijzigingen in het rooster, beschikbaarheid en reserveringen gebruiken
            huidige leden altijd Sportbit.
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
          Jouw les kiezen
        </p>
        <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-foreground md:text-4xl">
          Nog niet zeker welke les bij je past?
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Elke les heeft zijn eigen tempo en focus, van energieke Vinyasa tot rustgevende Yin en
          Nidra. Bekijk onze lessen en ontdek welke bij jou past.
        </p>
        <Link
          to="/lessen"
          className="mt-6 inline-flex items-center gap-1.5 text-base font-medium text-foreground underline-offset-4 hover:underline"
        >
          Bekijk onze lessen
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function FinalCTA() {
  return <IntroPassCTA locale="nl" />;
}
