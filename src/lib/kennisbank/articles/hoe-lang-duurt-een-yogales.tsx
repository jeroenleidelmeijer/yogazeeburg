// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: hoe-lang-duurt-een-yogales

import { Link } from "@tanstack/react-router";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import lesduurHeroAsset from "@/assets/hoe-lang-duurt-een-yogales-hero.webp.asset.json";
import lesduurInlineAsset from "@/assets/yogales-duur-opbouw-en-ontspanning.webp.asset.json";
import { type Article, CATEGORY_BEGINNEN_MET_YOGA } from "../article-types";

const LESDUUR_HERO_IMAGE: ArticleImageRef = {
  url: lesduurHeroAsset.url,
  alt: "Lege yogamat met bolster en blokken in zacht daglicht als rustige voorbereiding op een yogales.",
  width: 1536,
  height: 1024,
};

const LESDUUR_INLINE_IMAGE: ArticleImageRef = {
  url: lesduurInlineAsset.url,
  alt: "Yogamat, blokken, deken en een zandloper als verbeelding van de duur en opbouw van een yogales.",
  width: 1536,
  height: 1024,
};

export const article: Article = {
  slug: "hoe-lang-duurt-een-yogales",
  title: "Hoe lang duurt een yogales?",
  h1: "Hoe lang duurt een yogales?",
  seoTitle: "Hoe lang duurt een yogales? | Yoga Zeeburg",
  description:
    "Een yogales duurt bij Yoga Zeeburg meestal 75 minuten; één les duurt 90 minuten. Lees hoeveel tijd je het beste rond je les plant.",
  intro:
    "De meeste reguliere lessen bij Yoga Zeeburg duren 75 minuten. Relax Yin & Nidra duurt 90 minuten. Voor een ontspannen bezoek is het slim om daarnaast ongeveer 10 tot 15 minuten vóór de les en 5 tot 10 minuten erna vrij te houden.",
  category: CATEGORY_BEGINNEN_MET_YOGA,
  type: "how-to",
  pillar: false,
  publishedAt: "2026-09-02",
  updatedAt: "2026-09-02",
  readingTimeMin: 7,
  toc: [
    { id: "hoeveel-tijd-reserveren", label: "Hoeveel tijd moet je werkelijk reserveren?" },
    { id: "waarom-langer", label: "Waarom duurt een yogales vaak langer dan alleen de houdingen?" },
    { id: "duur-per-soort", label: "Verschilt de duur per soort yogales?" },
    { id: "hoe-vroeg-aanwezig", label: "Hoe vroeg moet je aanwezig zijn?" },
    { id: "weinig-tijd", label: "Wat als je maar weinig tijd hebt?" },
    { id: "eerste-yogales-langer", label: "Duurt je eerste yogales langer?" },
    { id: "passende-lesduur", label: "Zo kies je een passende lesduur" },
    { id: "faq", label: "Veelgestelde vragen" },
    { id: "conclusie", label: "Conclusie" },
  ],
  faqs: [
    {
      question: "Hoe lang duurt een yogales bij Yoga Zeeburg?",
      answer:
        "De meeste reguliere lessen duren 75 minuten. Relax Yin & Nidra duurt 90 minuten. Controleer voor de actuele begin- en eindtijd altijd het rooster.",
    },
    {
      question: "Hoeveel tijd moet ik inclusief aankomst reserveren?",
      answer:
        "Reken voor een les van 75 minuten op ongeveer 90 tot 100 minuten exclusief reistijd. Daarin zit 10 tot 15 minuten vóór de les en 5 tot 10 minuten erna.",
    },
    {
      question: "Waarom duurt Relax Yin & Nidra 90 minuten?",
      answer:
        "Deze les combineert ongeveer 60 minuten Yin Yoga met 30 minuten Yoga Nidra. De langere duur geeft beide rustige onderdelen voldoende ruimte.",
    },
    {
      question: "Kan ik een yogales eerder verlaten?",
      answer:
        "Plan bij voorkeur zo dat je de hele les kunt blijven, inclusief de eindontspanning. Moet je bij hoge uitzondering eerder weg, bespreek dat dan vóór de les met de docent en vertrek zo stil mogelijk.",
    },
    {
      question: "Moet ik bij mijn eerste yogales extra vroeg komen?",
      answer:
        "Ja, ongeveer 15 minuten vooraf is prettig. Je hebt dan tijd om de ruimte te vinden, je spullen op te bergen en eventuele aandachtspunten kort met de docent te delen.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg, “Rooster”, geraadpleegd op 2 september 2026",
      url: "https://www.yogazeeburg.com/rooster",
    },
    {
      title: "Yoga Zeeburg, “Lessen”, geraadpleegd op 2 september 2026",
      url: "https://www.yogazeeburg.com/lessen",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  heroImage: LESDUUR_HERO_IMAGE,
  body: () => <LesduurBody />,
};

function LesduurBody() {
  const h2 = "mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl";
  const link = "font-medium text-primary underline underline-offset-4 hover:no-underline";
  return (
    <>
      <p className="mt-4">
        <strong>Kort antwoord:</strong> de meeste reguliere yogalessen bij Yoga Zeeburg duren{" "}
        <strong>75 minuten</strong>. De les Relax Yin & Nidra duurt <strong>90 minuten</strong>. Tel
        voor je agenda niet alleen de les zelf: plan ook ongeveer 10 tot 15 minuten om rustig aan te
        komen en 5 tot 10 minuten om na afloop je spullen te pakken. Zo reserveer je voor een les van
        75 minuten in de praktijk ongeveer anderhalf uur, exclusief reistijd.
      </p>
      <p className="mt-4">
        Dat klinkt misschien ruim, maar juist die kleine buffer maakt verschil. Je hoeft niet gehaast
        binnen te komen, kunt je plek rustig inrichten en hoeft de ontspanning aan het einde niet
        meteen kwijt te raken omdat je volgende afspraak al begint.
      </p>

      <h2 id="hoeveel-tijd-reserveren" className={h2}>
        Hoeveel tijd moet je werkelijk reserveren?
      </h2>
      <p className="mt-4">Voor een gewone les kun je deze eenvoudige planning gebruiken:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>
          <strong>10 tot 15 minuten vóór de les:</strong> aankomen, omkleden, schoenen en jas
          opbergen en je mat klaarleggen;
        </li>
        <li>
          <strong>75 minuten lestijd:</strong> bij de meeste lessen op het rooster van Yoga Zeeburg;
        </li>
        <li>
          <strong>5 tot 10 minuten na de les:</strong> rustig opstaan, materialen opruimen en
          vertrekken.
        </li>
      </ul>
      <p className="mt-4">
        Zonder reistijd kom je daarmee uit op ongeveer <strong>90 tot 100 minuten</strong>. Volg je
        Relax Yin & Nidra, reserveer dan ongeveer <strong>105 tot 115 minuten</strong>. Deze les
        duurt 90 minuten en bestaat bij Yoga Zeeburg uit ongeveer 60 minuten Yin Yoga en 30 minuten
        Yoga Nidra.
      </p>
      <p className="mt-4">
        Bekijk vóór vertrek altijd het actuele{" "}
        <Link to="/rooster" className={link}>
          lesrooster
        </Link>
        . Een rooster kan wijzigen en de begin- en eindtijd bij de geboekte les zijn leidend.
      </p>

      <h2 id="waarom-langer" className={h2}>
        Waarom duurt een yogales vaak langer dan alleen de houdingen?
      </h2>
      <p className="mt-4">
        Een yogales is geen aaneenschakeling van oefeningen die precies op het laatste moment stopt.
        De docent bouwt de les bewust op. Meestal is er eerst tijd om aan te komen en de aandacht
        naar het lichaam en de adem te brengen. Daarna volgt het actieve of rustige hoofddeel. Aan
        het einde is er ruimte om af te bouwen en te ontspannen.
      </p>
      <p className="mt-4">
        Die laatste minuten horen dus bij de les. Ze zijn geen extraatje dat je probleemloos kunt
        overslaan. Als je direct vóór het einde weg moet, mis je niet alleen een deel van de opbouw,
        maar verstoor je mogelijk ook de rust voor anderen. Kies daarom liever een les die goed in je
        agenda past dan een les waarvoor je moet haasten.
      </p>
      <p className="mt-4">
        Wil je vooraf weten wat er in zo&apos;n les gebeurt? Lees dan ook{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "hoe-ziet-een-eerste-yogales-eruit" }}
          className={link}
        >
          hoe een eerste yogales stap voor stap verloopt
        </Link>
        .
      </p>

      <h2 id="duur-per-soort" className={h2}>
        Verschilt de duur per soort yogales?
      </h2>
      <p className="mt-4">
        Ja. De duur hangt samen met het doel en de opbouw van de les. Op het huidige rooster van Yoga
        Zeeburg duren de meeste lessen 75 minuten. Dat geldt voor zowel dynamische lessen als Strong
        Flow en Weekend Flow, als voor rustigere lessen zoals Stress Release en Slow Flow.
      </p>
      <p className="mt-4">
        Relax Yin & Nidra duurt 90 minuten. De extra tijd is logisch: rustige yin-houdingen krijgen
        de ruimte en daarna volgt een langer begeleid Yoga Nidra-gedeelte. Daardoor kan de les zonder
        haast van bewegen naar diepe rust gaan.
      </p>
      <p className="mt-4">
        Een langere les is niet automatisch beter en een kortere les is niet automatisch minder
        effectief. Belangrijker is dat de duur past bij de lesvorm én bij jouw aandacht, energie en
        agenda. Op de pagina met{" "}
        <Link to="/lessen" className={link}>
          alle yogalessen
        </Link>{" "}
        kun je rustig vergelijken wat bij je past.
      </p>

      <ArticleFigure
        image={LESDUUR_INLINE_IMAGE}
        caption="Voldoende tijd reserveren helpt om zonder haast aan een yogales te beginnen en deze rustig af te sluiten."
        className="mt-10"
      />

      <h2 id="hoe-vroeg-aanwezig" className={h2}>
        Hoe vroeg moet je aanwezig zijn?
      </h2>
      <p className="mt-4">
        Kom bij voorkeur <strong>10 tot 15 minuten vóór de starttijd</strong>. Dat geeft je genoeg
        ruimte om binnen te komen en je klaar te maken zonder dat je hoeft te rennen. Zeker bij je
        eerste bezoek is die marge prettig: je moet de ingang vinden, je spullen een plek geven en
        misschien nog kort iets aan de docent vertellen.
      </p>
      <p className="mt-4">
        Een half uur te vroeg komen is meestal niet nodig. Het kan bovendien zijn dat er nog een
        andere les bezig is of dat de ruimte wordt klaargemaakt. Houd daarom de aanwijzingen bij je
        reservering aan.
      </p>
      <p className="mt-4">
        Ben je nieuw en wil je eerst ontdekken of de studio en lessen bij je passen? Met de{" "}
        <a href="/trial" className={link}>
          14-daagse Intro Pass
        </a>{" "}
        kun je verschillende lessen ervaren zonder na één les al een definitieve keuze te hoeven
        maken.
      </p>

      <h2 id="weinig-tijd" className={h2}>
        Wat als je maar weinig tijd hebt?
      </h2>
      <p className="mt-4">
        Kijk eerlijk naar het hele tijdsblok, niet alleen naar de 75 minuten op het rooster. Als je
        tot vlak vóór de les werkt of meteen daarna ergens moet zijn, ontstaat al snel onnodige
        haast. Dit helpt:
      </p>
      <ol className="mt-4 list-decimal space-y-2 pl-6">
        <li>Kies een les met voldoende ruimte vóór en na de starttijd.</li>
        <li>Leg je kleding en andere spullen vooraf klaar.</li>
        <li>Controleer route en reistijd voordat je vertrekt.</li>
        <li>Boek niet op een moment waarop vijf minuten vertraging meteen een probleem wordt.</li>
        <li>
          Laat de docent vóór de les weten als je vanwege een uitzonderlijke situatie eerder weg
          moet.
        </li>
      </ol>
      <p className="mt-4">
        Kun je structureel geen volledig lesblok vrijmaken, dan is een ander tijdstip waarschijnlijk
        een betere keuze. Regelmaat ontstaat makkelijker wanneer de les realistisch in je week past.
      </p>

      <h2 id="eerste-yogales-langer" className={h2}>
        Duurt je eerste yogales langer?
      </h2>
      <p className="mt-4">
        De geplande lestijd blijft hetzelfde, maar voor jou kan het eerste bezoek wat meer tijd
        vragen. Je kent de route en de ruimte nog niet en wilt misschien iets vragen over blessures,
        zwangerschap of andere aandachtspunten. Kom daarom bij je eerste les liever 15 minuten
        vooraf dan precies op de starttijd.
      </p>
      <p className="mt-4">
        Je hoeft niet eerder te komen om houdingen te oefenen. De docent begeleidt de les vanaf het
        begin en geeft waar nodig opties. In de uitgebreide gids{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "beginnen-met-yoga-alles-wat-je-moet-weten" }}
          className={link}
        >
          beginnen met yoga: alles wat je moet weten
        </Link>{" "}
        vind je praktische antwoorden over kleding, materialen en je eerste weken.
      </p>

      <h2 id="passende-lesduur" className={h2}>
        Zo kies je een passende lesduur
      </h2>
      <p className="mt-4">Gebruik drie vragen:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>Heb ik vóór de les genoeg tijd om zonder haast aan te komen?</li>
        <li>Kan ik de volledige les blijven, inclusief de eindontspanning?</li>
        <li>Past het totale tijdsblok — les, buffer en reis — regelmatig in mijn week?</li>
      </ul>
      <p className="mt-4">
        Kun je drie keer ja antwoorden, dan is de duur waarschijnlijk realistisch. De beste yogales
        is niet de les die op papier het langst of intensiefst is, maar de les waarvoor je
        daadwerkelijk ruimte kunt blijven maken.
      </p>

      <h2 id="conclusie" className={h2}>
        Conclusie
      </h2>
      <p className="mt-4">
        Bij Yoga Zeeburg duurt een yogales meestal 75 minuten en Relax Yin & Nidra 90 minuten.
        Reserveer daarnaast een kleine buffer vóór en na de les. Dan begint je yogamoment niet met
        haast en eindigt het niet bij de laatste houding, maar krijgt ook de overgang terug naar je
        dag voldoende ruimte.
      </p>

      <section
        aria-labelledby="cta-hoe-lang-duurt-een-yogales"
        className="mt-14 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8"
      >
        <h2
          id="cta-hoe-lang-duurt-een-yogales"
          className="font-display text-2xl font-medium tracking-tight text-foreground"
        >
          Rustig ontdekken welke les bij je past?
        </h2>
        <p className="mt-3">
          Probeer verschillende lessen met de 14-daagse Intro Pass en ervaar welk ritme prettig
          voelt.
        </p>
        <a
          href="/trial"
          className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Bekijk de 14-daagse Intro Pass
        </a>
      </section>
    </>
  );
}
