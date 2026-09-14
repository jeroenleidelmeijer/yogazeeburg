// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: kan-ik-alleen-naar-een-yogales-komen

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import alleenHeroAsset from "@/assets/alleen-naar-yogales-hero.webp.asset.json";
import alleenInlineAsset from "@/assets/eigen-plek-in-yogales.webp.asset.json";
import { type Article, CATEGORY_BEGINNEN_MET_YOGA } from "../article-types";

const ALLEEN_HERO_IMAGE: ArticleImageRef = {
  url: alleenHeroAsset.url,
  alt: "Eén yogamat ligt klaar bij de ingang van een rustige ruimte met meerdere lege yogaplekken.",
  width: 1536,
  height: 1024,
};

const ALLEEN_INLINE_IMAGE: ArticleImageRef = {
  url: alleenInlineAsset.url,
  alt: "Een rustige yogaplek met mat, blokken, deken en waterfles in zacht daglicht.",
  width: 1536,
  height: 1024,
};

export const article: Article = {
  slug: "kan-ik-alleen-naar-een-yogales-komen",
  title: "Kan ik alleen naar een yogales komen?",
  h1: "Kan ik alleen naar een yogales komen?",
  seoTitle: "Alleen naar een yogales? Dit kun je verwachten | Yoga Zeeburg",
  description:
    "Alleen naar een yogales gaan is heel normaal. Lees hoe je binnenkomt, je plek vindt en de eerste minuten ontspannen en zelfstandig doorkomt.",
  intro:
    "Ja, je kunt prima alleen naar een yogales komen. Veel deelnemers boeken voor zichzelf en richten zich tijdens de les op hun eigen mat, ademhaling en beweging. Je hoeft niemand te kennen, met anderen te praten of samen oefeningen te doen. Kom bij je eerste bezoek 10 tot 15 minuten eerder, zeg kort tegen de docent dat je nieuw bent en kies rustig een vrije plek. Zodra de les begint, volgt iedereen dezelfde uitleg en verdwijnt de sociale drempel meestal snel naar de achtergrond.",
  category: CATEGORY_BEGINNEN_MET_YOGA,
  type: "guide",
  pillar: false,
  publishedAt: "2026-09-09",
  updatedAt: "2026-09-09",
  readingTimeMin: 6,
  toc: [
    { id: "alleen-binnenkomen", label: "Alleen binnenkomen voelt groter dan het is" },
    { id: "zo-verloopt-binnenkomen", label: "Zo verloopt binnenkomen als je alleen bent" },
    { id: "eerste-minuten-makkelijker", label: "Maak de eerste minuten makkelijker" },
    { id: "met-anderen-praten", label: "Moet je met anderen praten?" },
    { id: "enige-beginner", label: "Wat als jij de enige beginner bent?" },
    { id: "bij-yoga-zeeburg", label: "Alleen naar yoga bij Yoga Zeeburg" },
    { id: "faq", label: "Veelgestelde vragen" },
    { id: "cta-eerste-les", label: "Klaar voor je eerste les?" },
  ],
  faqs: [
    {
      question: "Is het normaal om alleen naar yoga te gaan?",
      answer:
        "Ja. Je volgt de les vanaf je eigen mat en hebt geen partner nodig. De docent begeleidt de groep, dus je hoeft niemand te kennen.",
    },
    {
      question: "Waar ga ik liggen als ik nieuw ben?",
      answer:
        "Kies een vrije plek waar je de docent goed kunt zien en horen. Achteraan voelt niet altijd veiliger, omdat je dan misschien vooral naar andere deelnemers kijkt. Vraag de docent gerust welke plek handig is.",
    },
    {
      question: "Wat zeg ik tegen de docent bij mijn eerste les?",
      answer:
        "“Ik ben hier voor het eerst” is voldoende. Noem daarnaast kort iets dat praktisch relevant is voor de les. Een lang kennismakingsgesprek is niet nodig.",
    },
    {
      question: "Moet ik tijdens een yogales samenwerken met anderen?",
      answer:
        "Gewoonlijk niet. De meeste reguliere groepslessen bestaan uit houdingen, beweging, adem en ontspanning op je eigen mat. Als een les een afwijkend onderdeel heeft, legt de docent dat uit.",
    },
    {
      question: "Wat als ik me ongemakkelijk voel als ik alleen kom?",
      answer:
        "Kom iets eerder, meld dat je nieuw bent en geef jezelf één eenvoudige taak: je spullen neerleggen en je mat klaarmaken. Je hoeft je niet meteen sociaal of volledig ontspannen te voelen om toch aan de les te beginnen.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg — lessen, geraadpleegd 9 september 2026",
      url: "https://www.yogazeeburg.com/lessen",
    },
    {
      title: "Yoga Zeeburg — weekrooster, geraadpleegd 9 september 2026",
      url: "https://www.yogazeeburg.com/rooster",
    },
    {
      title: "Yoga Zeeburg — contact, geraadpleegd 9 september 2026",
      url: "https://www.yogazeeburg.com/contact",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  heroImage: ALLEEN_HERO_IMAGE,
  body: () => <AlleenBody />,
};

function AlleenBody() {
  const h2 = "mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl";
  const link = "font-medium text-primary underline underline-offset-4 hover:no-underline";
  return (
    <>
      <h2 id="alleen-binnenkomen" className={h2}>
        Alleen binnenkomen voelt groter dan het is
      </h2>
      <p className="mt-4">
        De lastigste minuut is vaak niet de yogales, maar het moment vóór de deur. Misschien verwacht
        je een hechte groep of weet je niet waar je moet staan en wat je met je spullen doet.
      </p>
      <p className="mt-4">
        Voor de oefeningen maakt het weinig verschil of deelnemers elkaar kennen: je krijgt uitleg
        van de docent en werkt vanaf je eigen mat. Je hoeft geen partner mee te nemen.
      </p>
      <p className="mt-4">
        Maak je eerste bezoek klein: kom binnen, leg je plek klaar en volg de eerste aanwijzing.
      </p>

      <h2 id="zo-verloopt-binnenkomen" className={h2}>
        Zo verloopt binnenkomen als je alleen bent
      </h2>
      <p className="mt-4">
        Kom bij voorkeur 10 tot 15 minuten vóór de start. Dan hoef je niet gehaast een volle ruimte
        binnen te stappen. Je kunt rustig je jas en tas opbergen, een plek kiezen en eventuele
        hulpmiddelen pakken.
      </p>
      <p className="mt-4">
        Zie je de docent, dan is één zin genoeg: “Hoi, ik ben hier voor het eerst.” De docent kan je
        vertellen waar alles ligt en of er voor deze les iets bijzonders nodig is. Heb je een korte
        praktische vraag of aandachtspunt, bespreek dat vóór de les. In het artikel over{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "hoe-vroeg-moet-je-aanwezig-zijn-voor-een-yogales" }}
          className={link}
        >
          hoe vroeg je aanwezig bent voor een yogales
        </Link>{" "}
        lees je hoeveel tijd je het beste plant.
      </p>
      <p className="mt-4">
        Zodra je mat ligt, kun je gaan zitten of liggen. De docent opent de les en neemt de groep
        stap voor stap mee. Wil je vooraf precies weten wat er gebeurt, bekijk dan{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "hoe-ziet-een-eerste-yogales-eruit" }}
          className={link}
        >
          de eerste yogales stap voor stap
        </Link>
        .
      </p>

      <ArticleFigure
        image={ALLEEN_INLINE_IMAGE}
        caption="Een eigen plek kiezen en je spullen klaarleggen geeft je meteen iets eenvoudigs om te doen."
        className="mt-10"
      />

      <h2 id="eerste-minuten-makkelijker" className={h2}>
        Maak de eerste minuten makkelijker
      </h2>
      <p className="mt-4">Deze keuzes verlagen de drempel:</p>
      <ul className="mt-3 list-disc space-y-2 pl-6">
        <li>Boek een les waarvan niveau en tempo duidelijk bij je passen.</li>
        <li>Controleer vooraf de locatie en starttijd.</li>
        <li>Leg thuis kleding en water klaar, zodat je niet hoeft te haasten.</li>
        <li>Kom iets eerder en vertel de docent dat je nieuw bent.</li>
        <li>Kies een plek waar jij je prettig voelt; dat hoeft niet per se achteraan te zijn.</li>
        <li>Kijk bij twijfel naar de docent in plaats van naar de persoon naast je.</li>
      </ul>
      <p className="mt-4">
        Bij Yoga Zeeburg kun je op de pagina met{" "}
        <Link to="/lessen" className={link}>
          alle lessen
        </Link>{" "}
        filteren op wat je nodig hebt, hoe actief je wilt bewegen en of je nieuw bent met yoga. De
        meeste lessen zijn beginnersvriendelijk. Controleer voor actuele tijden altijd het{" "}
        <Link to="/rooster" className={link}>
          weekrooster
        </Link>
        .
      </p>

      <h2 id="met-anderen-praten" className={h2}>
        Moet je met anderen praten?
      </h2>
      <p className="mt-4">
        Nee. Een vriendelijke begroeting is genoeg. Sommige mensen vinden het gezellig om vóór of na
        de les iets te zeggen; anderen komen juist voor stilte. Beide zijn normaal.
      </p>
      <p className="mt-4">
        Je hoeft niet uit te leggen waarom je alleen bent. Je hebt simpelweg een les voor jezelf
        geboekt.
      </p>
      <p className="mt-4">
        Na een paar bezoeken herken je gezichten en weet je waar alles ligt. Contact kan vanzelf
        ontstaan, maar hoeft niet.
      </p>

      <h2 id="enige-beginner" className={h2}>
        Wat als jij de enige beginner bent?
      </h2>
      <p className="mt-4">
        Ook dan hoef je niemand bij te houden. Luister naar de docent, gebruik aangeboden variaties
        en neem rust wanneer dat nodig is. De persoon naast je kan heel andere ervaring hebben.
      </p>
      <p className="mt-4">
        Vind je een dynamische les voor een eerste keer spannend, kies dan een zachtere of duidelijk
        beginnersvriendelijke optie. Je kunt ook met de{" "}
        <Link to="/trial" className={link}>
          14-daagse Intro Pass
        </Link>{" "}
        verschillende lessen en docenten proberen voordat je een vast ritme kiest.
      </p>

      <h2 id="bij-yoga-zeeburg" className={h2}>
        Alleen naar yoga bij Yoga Zeeburg
      </h2>
      <p className="mt-4">
        Yoga Zeeburg is een kleinschalige, nuchtere yogastudio aan de Cruquiusweg 96F in Amsterdam
        Oost. Er zijn twaalf wekelijkse groepslessen, verspreid over zeven dagen, van zachte Yin en
        Nidra tot Vinyasa, Pilates Fusion en stevigere flows. Je kiest en reserveert de les die bij
        jouw week en gewenste tempo past.
      </p>
      <p className="mt-4">
        Heb je vóór je eerste bezoek een praktische vraag, dan kun je mailen naar
        hello@yogazeeburg.com of het{" "}
        <Link to="/contact" className={link}>
          contactformulier
        </Link>{" "}
        gebruiken. Je hoeft echter geen bekende, partner of vriend mee te nemen: jouw reservering en
        jouw mat zijn genoeg.
      </p>

      <section
        aria-labelledby="cta-eerste-les"
        className="mt-14 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8"
      >
        <h2
          id="cta-eerste-les"
          className="font-display text-2xl font-medium tracking-tight text-foreground"
        >
          Klaar voor je eerste les?
        </h2>
        <p className="mt-3">
          Kom gerust alleen. Met de 14-daagse Intro Pass kun je verschillende groepslessen, docenten
          en tijden bij Yoga Zeeburg proberen. De pas kost €30, stopt automatisch en is alleen voor
          nieuwe leerlingen.
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
