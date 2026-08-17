import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Smartphone, Calendar, Clock, ListChecks, Mail, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { commercialLinks } from "@/lib/i18n";

const SPORTBIT_WEB_URL = "https://crossfitzeeburg.sportbitapp.nl/web/nl/";
const CONTACT_EMAIL = "hello@yogazeeburg.com";

export const Route = createFileRoute("/sportbit")({
  head: () => ({
    meta: [
      { title: "Sportbit-uitleg — Zo boek je een les | Yoga Zeeburg" },
      {
        name: "description",
        content:
          "Zo gebruik je Sportbit bij Yoga Zeeburg: kies het juiste rooster, boek je les, gebruik de wachtlijst en zeg op tijd af.",
      },
      { property: "og:title", content: "Sportbit-uitleg — Yoga Zeeburg" },
      {
        property: "og:description",
        content:
          "Een rustige, duidelijke gids om je yogalessen bij Yoga Zeeburg te boeken via Sportbit.",
      },
      { property: "og:url", content: "https://www.yogazeeburg.com/sportbit" },
    ],
    links: commercialLinks("nl", "sportbit"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Zo gebruik je Sportbit bij Yoga Zeeburg",
          description:
            "Sportbit is het boekingssysteem van Yoga Zeeburg. Op deze pagina lees je stap voor stap hoe je het juiste rooster kiest, een les boekt, de wachtlijst gebruikt en op tijd afzegt — zodat het simpel blijft.",
          inLanguage: "nl-NL",
          url: "https://www.yogazeeburg.com/sportbit",
          step: [
            {
              "@type": "HowToStep",
              position: 1,
              name: "Download Sportbit of gebruik de webversie",
              text: "Je kunt de Sportbit-app gebruiken op iPhone of Android, of Sportbit openen in je browser. Beide werken hetzelfde — kies wat het beste bij je past.",
              url: "https://www.yogazeeburg.com/sportbit#01",
            },
            {
              "@type": "HowToStep",
              position: 2,
              name: "Kies het rooster van Yoga Zeeburg",
              text: "In Sportbit vind je ook de roosters van CrossFit Zeeburg. Wissel bovenin de app eerst naar Yoga Zeeburg voordat je iets boekt. Dit is de meest gemaakte fout — check het elke keer.",
              url: "https://www.yogazeeburg.com/sportbit#02",
            },
            {
              "@type": "HowToStep",
              position: 3,
              name: "Boek je les",
              text: "Je kunt lessen tot twee weken van tevoren boeken. Elke dag komt dezelfde weekdag twee weken later beschikbaar — een dinsdag opent dus elke dinsdag.",
              url: "https://www.yogazeeburg.com/sportbit#03",
            },
            {
              "@type": "HowToStep",
              position: 4,
              name: "Gebruik de wachtlijst",
              text: "Is een les vol, zet je dan op de wachtlijst. Er komen vaker plekken vrij dan je denkt. Meer dan 2 uur van tevoren: als iemand afzegt, schuift de eerste op de wachtlijst automatisch door naar de les. Minder dan 2 uur van tevoren: iedereen op de wachtlijst krijgt een melding en e-mail. Wie het eerst boekt, heeft de plek.",
              url: "https://www.yogazeeburg.com/sportbit#04",
            },
            {
              "@type": "HowToStep",
              position: 5,
              name: "Zeg zo vroeg mogelijk af",
              text: "Je kunt tot twee uur van tevoren afzeggen zonder een credit te verliezen. Afzeggen binnen twee uur kost een credit. Zeg zo vroeg mogelijk af, zodat iemand op de wachtlijst mee kan doen.",
              url: "https://www.yogazeeburg.com/sportbit#05",
            },
            {
              "@type": "HowToStep",
              position: 6,
              name: "Hulp nodig?",
              text: "Loop je vast bij het boeken, je lidmaatschap of inloggen in Sportbit? Stuur ons een kort berichtje, dan helpen we je verder. E-mail hello@yogazeeburg.com.",
              url: "https://www.yogazeeburg.com/sportbit#06",
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.yogazeeburg.com/" },
            { "@type": "ListItem", position: 2, name: "Sportbit", item: "https://www.yogazeeburg.com/sportbit" },
          ],
        }),
      },
    ],
  }),
  component: SportbitPage,
});

function SportbitPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader locale="nl" page="sportbit" />
      <main>
        <Hero />
        <Steps />
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
          Sportbit-uitleg
        </p>
        <h1 className="mt-4 font-display text-4xl leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Zo gebruik je Sportbit bij Yoga Zeeburg
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Sportbit is ons boekingssysteem: boek een les, zet jezelf op de wachtlijst en zeg tot
          twee uur van tevoren af. Zo werkt het, stap voor stap.
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
      title: "Download Sportbit of gebruik de webversie",
      body: (
        <>
          <p>
            Je kunt de Sportbit-app gebruiken op iPhone of Android, of Sportbit
            openen in je browser. Beide werken hetzelfde — kies wat het beste
            bij je past.
          </p>
          <div className="mt-5">
            <a
              href={SPORTBIT_WEB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Open Sportbit in je browser
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </>
      ),
    },
    {
      n: "02",
      icon: MapPin,
      title: "Kies het rooster van Yoga Zeeburg",
      body: (
        <>
          <p>
            In Sportbit vind je ook de roosters van CrossFit Zeeburg. Wissel
            bovenin de app eerst naar <strong className="font-medium text-foreground">Yoga Zeeburg</strong> voordat
            je iets boekt. Dit is de meest gemaakte fout — check het elke keer.
          </p>
          <div className="mt-5 rounded-lg border-l-2 border-accent bg-secondary/60 px-5 py-4 text-sm text-foreground/90">
            Tip: zie je CrossFit-lessen? Dan sta je nog op het verkeerde
            rooster. Tik bovenin op de roosternaam en kies Yoga Zeeburg.
          </div>
        </>
      ),
    },
    {
      n: "03",
      icon: Calendar,
      title: "Boek je les",
      body: (
        <p>
          Je kunt lessen tot twee weken van tevoren boeken. Elke dag komt
          dezelfde weekdag twee weken later beschikbaar — een dinsdag opent dus
          elke dinsdag.
        </p>
      ),
    },
    {
      n: "04",
      icon: ListChecks,
      title: "Gebruik de wachtlijst",
      body: (
        <>
          <p>
            Is een les vol, zet je dan op de wachtlijst. Er komen vaker plekken
            vrij dan je denkt.
          </p>
          <ul className="mt-4 space-y-2 text-foreground/90">
            <li>
              <span className="font-medium text-foreground">Meer dan 2 uur van tevoren:</span>{" "}
              als iemand afzegt, schuift de eerste op de wachtlijst automatisch
              door naar de les.
            </li>
            <li>
              <span className="font-medium text-foreground">Minder dan 2 uur van tevoren:</span>{" "}
              iedereen op de wachtlijst krijgt een melding en e-mail. Wie het
              eerst boekt, heeft de plek.
            </li>
          </ul>
        </>
      ),
    },
    {
      n: "05",
      icon: Clock,
      title: "Zeg zo vroeg mogelijk af",
      body: (
        <>
          <p>
            Je kunt tot twee uur van tevoren afzeggen zonder een credit te
            verliezen. Afzeggen binnen twee uur kost een credit.
          </p>
          <p className="mt-3">
            Zeg zo vroeg mogelijk af, zodat iemand op de wachtlijst mee kan
            doen.
          </p>
        </>
      ),
    },
    {
      n: "06",
      icon: Mail,
      title: "Hulp nodig?",
      body: (
        <>
          <p>
            Loop je vast bij het boeken, je lidmaatschap of inloggen in
            Sportbit? Stuur ons een kort berichtje, dan helpen we je verder.
          </p>
          <div className="mt-5">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Mail naar {CONTACT_EMAIL}
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
            Klaar om je volgende les te boeken?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Kies een moment in het weekrooster dat bij jouw week past.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/rooster"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Bekijk het rooster
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              to="/lessen"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Ontdek onze lessen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
