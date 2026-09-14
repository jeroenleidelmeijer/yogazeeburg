// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: hoe-vroeg-moet-je-aanwezig-zijn-voor-een-yogales

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import aanwezigHeroAsset from "@/assets/hoe-vroeg-aanwezig-yogales-hero.webp.asset.json";
import aanwezigInlineAsset from "@/assets/yogales-voorbereiding-op-tijd.webp.asset.json";
import { type Article, CATEGORY_BEGINNEN_MET_YOGA } from "../article-types";

const AANWEZIG_HERO_IMAGE: ArticleImageRef = {
  url: aanwezigHeroAsset.url,
  alt: "Rustige lege entree met een klaargelegde yogamat, blokken en deken vóór een yogales.",
  width: 1536,
  height: 1024,
};

const AANWEZIG_INLINE_IMAGE: ArticleImageRef = {
  url: aanwezigInlineAsset.url,
  alt: "Een yogamat, blokken, handdoek, waterfles, tas en sleutels liggen klaar voor vertrek naar een yogales.",
  width: 1536,
  height: 1024,
};

export const article: Article = {
  slug: "hoe-vroeg-moet-je-aanwezig-zijn-voor-een-yogales",
  title: "Hoe vroeg moet je aanwezig zijn voor een yogales?",
  h1: "Hoe vroeg moet je aanwezig zijn voor een yogales?",
  seoTitle: "Hoe vroeg aanwezig voor een yogales? | Yoga Zeeburg",
  description:
    "Kom bij voorkeur 10 tot 15 minuten voor een yogales. Lees hoeveel tijd je bij je eerste bezoek nodig hebt en wat je doet als je te laat bent.",
  intro:
    "Kom bij voorkeur 10 tot 15 minuten vóór een yogales. Ben je voor het eerst in de studio, houd dan de volle 15 minuten aan. Je hebt dan tijd om de ingang te vinden, je spullen op te bergen, je plek klaar te maken en een aandachtspunt rustig met de docent te bespreken.",
  category: CATEGORY_BEGINNEN_MET_YOGA,
  type: "how-to",
  pillar: false,
  publishedAt: "2026-09-04",
  updatedAt: "2026-09-04",
  readingTimeMin: 7,
  toc: [
    { id: "waarom-buffer", label: "Waarom 10 tot 15 minuten eerder prettig is" },
    { id: "eerste-les-ruimer", label: "Kom bij je eerste yogales iets ruimer op tijd" },
    { id: "bespreken-met-docent", label: "Wat bespreek je vóór de les met de docent?" },
    { id: "vaker-komen", label: "Als je al vaker komt, is 10 minuten meestal genoeg" },
    { id: "vertrek-voorbereiden", label: "Bereid je vertrek thuis al voor" },
    { id: "te-laat", label: "Wat doe je als je te laat dreigt te komen?" },
    { id: "te-vroeg", label: "Kun je ook te vroeg zijn?" },
    { id: "hele-afspraak", label: "Plan de hele afspraak, niet alleen de starttijd" },
    { id: "faq", label: "Veelgestelde vragen" },
    { id: "conclusie", label: "Conclusie" },
  ],
  faqs: [
    {
      question: "Hoe vroeg moet je aanwezig zijn voor een yogales?",
      answer:
        "Kom bij voorkeur 10 tot 15 minuten vóór de starttijd. Bij je eerste bezoek is 15 minuten prettig. Volg een afwijkende aankomstinstructie in je reserveringsbevestiging altijd op.",
    },
    {
      question: "Hoe vroeg moet ik bij mijn eerste yogales zijn?",
      answer:
        "Houd ongeveer 15 minuten aan. Je hebt dan tijd om de ingang te vinden, je spullen op te bergen, je plek klaar te maken en kort aan de docent te vertellen dat je nieuw bent.",
    },
    {
      question: "Wat gebeurt er in de minuten vóór de yogales?",
      answer:
        "Je bergt je jas, tas en schoenen op, legt je mat en eventuele hulpmiddelen klaar en kunt een kort aandachtspunt met de docent bespreken. Daarna neem je rustig plaats voor de gezamenlijke start.",
    },
    {
      question: "Kan ik nog meedoen als ik te laat ben?",
      answer:
        "Dat hangt af van de toegangsafspraken en de situatie in de les. Ga er niet automatisch van uit dat binnenkomen na de start mogelijk is. Controleer je reserveringsinformatie en volg de aanwijzing van de docent.",
    },
    {
      question: "Hoe lang van tevoren kan ik een yogales afzeggen?",
      answer:
        "Bij Yoga Zeeburg kun je via Sportbit tot twee uur vóór de les afzeggen zonder een credit te verliezen. Binnen twee uur kost de afmelding een credit. Zeg zo vroeg mogelijk af zodat iemand op de wachtlijst je plek kan gebruiken.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg, “Zo gebruik je Sportbit bij Yoga Zeeburg”, geraadpleegd op 4 september 2026",
      url: "https://www.yogazeeburg.com/sportbit",
    },
    {
      title: "Yoga Zeeburg, “Contact”, geraadpleegd op 4 september 2026",
      url: "https://www.yogazeeburg.com/contact",
    },
    {
      title: "Yoga Zeeburg, “Rooster”, geraadpleegd op 4 september 2026",
      url: "https://www.yogazeeburg.com/rooster",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  heroImage: AANWEZIG_HERO_IMAGE,
  body: () => <AanwezigBody />,
};

function AanwezigBody() {
  const h2 = "mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl";
  const link = "font-medium text-primary underline underline-offset-4 hover:no-underline";
  return (
    <>
      <p className="mt-4">
        <strong>Kort antwoord:</strong> kom bij voorkeur{" "}
        <strong>10 tot 15 minuten vóór de starttijd</strong> van je yogales. Bij je eerste bezoek is
        15 minuten een prettige marge. Je kunt dan zonder haast de ingang vinden, je jas en schoenen
        opbergen, je plek klaarmaken en zo nodig iets kort met de docent bespreken. Volg altijd de
        informatie in je reserveringsbevestiging als daarin een andere aankomsttijd staat.
      </p>
      <p className="mt-4">
        Je hoeft meestal geen half uur vooraf aanwezig te zijn. Te vroeg komen kan juist onhandig
        zijn wanneer de vorige les nog bezig is of de ruimte wordt klaargemaakt. Het doel van de
        extra minuten is eenvoudig: van reizen en regelen rustig overstappen naar de les.
      </p>

      <h2 id="waarom-buffer" className={h2}>
        Waarom 10 tot 15 minuten eerder prettig is
      </h2>
      <p className="mt-4">
        Een yogales begint op de aangegeven starttijd. Die tijd is bedoeld voor de les, niet voor
        binnenkomen, omkleden en spullen neerleggen. Met een kleine buffer kun je:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>de juiste ingang rustig vinden;</li>
        <li>je jas, tas en schoenen opbergen;</li>
        <li>naar het toilet gaan als dat nodig is;</li>
        <li>je mat en eventuele hulpmiddelen klaarleggen;</li>
        <li>de docent vooraf iets vragen;</li>
        <li>op je plek zitten voordat de gezamenlijke start begint.</li>
      </ul>
      <p className="mt-4">
        Dat laatste is ook prettig voor de rest van de groep. Wanneer iedereen vóór de start klaar
        is, hoeft de docent de uitleg niet te onderbreken en blijft de sfeer rustig.
      </p>
      <p className="mt-4">
        Tien tot vijftien minuten is een praktische aanbeveling, geen universele yogaregel. Studios
        kunnen andere afspraken hebben. Kijk daarom altijd naar de boekingsinformatie van de locatie
        waar je les volgt.
      </p>

      <h2 id="eerste-les-ruimer" className={h2}>
        Kom bij je eerste yogales iets ruimer op tijd
      </h2>
      <p className="mt-4">
        Voor je eerste bezoek is <strong>15 minuten vooraf</strong> een goede richtlijn. Alles is nog
        nieuw: de route, het gebouw, de plek voor je spullen en de manier waarop de les is
        georganiseerd. Die extra minuten voorkomen dat een kleine vertraging meteen stress oplevert.
      </p>
      <p className="mt-4">
        Yoga Zeeburg zit aan de <strong>Cruquiusweg 96F in Amsterdam Oost</strong>, boven CrossFit
        Zeeburg. Plan vóór je eerste les je route en kijk niet alleen naar de reistijd, maar ook naar
        de tijd die je nodig hebt om vanaf je fiets, auto of het openbaar vervoer bij de studio te
        komen.
      </p>
      <p className="mt-4">
        Wil je weten wat er na binnenkomst gebeurt? In{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "hoe-ziet-een-eerste-yogales-eruit" }}
          className={link}
        >
          eerste yogales stap voor stap
        </Link>{" "}
        lees je de hele les van aankomst tot eindontspanning.
      </p>

      <h2 id="bespreken-met-docent" className={h2}>
        Wat bespreek je vóór de les met de docent?
      </h2>
      <p className="mt-4">
        Je hoeft geen uitgebreid intakegesprek te voeren. Wel is het verstandig om vóór de start kort
        te zeggen dat het je eerste les is. Meld ook relevante aandachtspunten, bijvoorbeeld dat je
        zwanger bent, herstelt van een blessure, pijn ervaart of een bepaalde beweging niet kunt
        doen.
      </p>
      <p className="mt-4">
        De docent kan dan tijdens de groepsles beter rekening houden met jouw situatie en waar
        passend een optie geven. Een yogadocent stelt geen diagnose en een groepsles vervangt geen
        medisch advies. Bij twijfel over deelname bespreek je dat vooraf met een passende
        zorgverlener.
      </p>
      <p className="mt-4">
        Heb je een praktische vraag die meer tijd vraagt? Stuur die liever vóór de les via de{" "}
        <Link to="/contact" className={link}>
          contactpagina
        </Link>
        . Zo hoeft het gesprek niet in de laatste minuut plaats te vinden.
      </p>

      <h2 id="vaker-komen" className={h2}>
        Als je al vaker komt, is 10 minuten meestal genoeg
      </h2>
      <p className="mt-4">
        Ken je de route en de studio, dan is ongeveer <strong>10 minuten vooraf</strong> meestal een
        comfortabele planning. Je weet waar je moet zijn en hebt minder uitleg nodig. Toch blijft een
        kleine marge nuttig. Verkeer, een open brug, een vertraagde tram of het zoeken naar een plek
        voor je fiets kan ook op een bekende route tijd kosten.
      </p>
      <p className="mt-4">
        Probeer niet structureel precies op de starttijd binnen te lopen. Dan wordt iedere kleine
        vertraging een probleem en begin je de les gehaast. Een aankomstroutine van tien minuten is
        vaak makkelijker vol te houden dan telkens rekenen op een perfecte reis.
      </p>

      <h2 id="vertrek-voorbereiden" className={h2}>
        Bereid je vertrek thuis al voor
      </h2>
      <p className="mt-4">
        Rustig aankomen begint vóórdat je de deur uitgaat. Leg daarom eerder op de dag klaar wat je
        nodig hebt:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>comfortabele kleding waarin je vrij kunt bewegen;</li>
        <li>eventueel een extra laag voor de eindontspanning;</li>
        <li>een fles water;</li>
        <li>je reservering in Sportbit;</li>
        <li>route en actuele reistijd;</li>
        <li>alleen de persoonlijke spullen die je echt nodig hebt.</li>
      </ul>
      <p className="mt-4">
        Controleer in Sportbit of je daadwerkelijk bij Yoga Zeeburg hebt geboekt. In de app zijn ook
        roosters van CrossFit Zeeburg zichtbaar; kies dus het juiste rooster. Op de pagina{" "}
        <Link to="/sportbit" className={link}>
          zo gebruik je Sportbit
        </Link>{" "}
        staat dit stap voor stap uitgelegd.
      </p>

      <ArticleFigure
        image={AANWEZIG_INLINE_IMAGE}
        caption="Door je spullen vooraf klaar te leggen, vertrek je makkelijker op tijd naar je yogales."
        className="mt-10"
      />

      <h2 id="te-laat" className={h2}>
        Wat doe je als je te laat dreigt te komen?
      </h2>
      <p className="mt-4">Het kan gebeuren. Pak het dan rustig en praktisch aan:</p>
      <ol className="mt-4 list-decimal space-y-2 pl-6">
        <li>Controleer de informatie bij je reservering voor eventuele toegangsafspraken.</li>
        <li>Ga er niet automatisch van uit dat je na de start nog naar binnen kunt.</li>
        <li>Kom je binnen, doe dat zo stil mogelijk en volg de aanwijzing van de docent.</li>
        <li>
          Kun je de les niet meer volgen, meld je dan volgens de geldende boekingsvoorwaarden af.
        </li>
      </ol>
      <p className="mt-4">
        Yoga Zeeburg gebruikt Sportbit voor reserveringen. Je kunt daar tot twee uur vóór de les
        zonder verlies van een credit afzeggen; bij afzeggen binnen twee uur kost het een credit.
        Zeg daarom zo vroeg mogelijk af wanneer je weet dat je de les niet haalt. Daarmee geef je
        iemand op de wachtlijst ook kans om mee te doen.
      </p>
      <p className="mt-4">
        Maak van snel fietsen, rennen of onveilig reizen nooit de oplossing. Eén gemiste les is
        vervelend, maar niet belangrijker dan veilig aankomen.
      </p>

      <h2 id="te-vroeg" className={h2}>
        Kun je ook te vroeg zijn?
      </h2>
      <p className="mt-4">
        Ja. Meer marge is niet altijd beter. Wanneer je 25 of 30 minuten vooraf arriveert, kan er nog
        een andere les bezig zijn. Gesprekken, deuren en het neerzetten van spullen kunnen dan de
        eindontspanning van die groep verstoren.
      </p>
      <p className="mt-4">
        Houd daarom ongeveer 10 tot 15 minuten aan, tenzij je reserveringsinformatie iets anders
        zegt. Ben je door je reis toch veel eerder, wacht dan rustig tot het passende moment om naar
        binnen te gaan.
      </p>

      <h2 id="hele-afspraak" className={h2}>
        Plan de hele afspraak, niet alleen de starttijd
      </h2>
      <p className="mt-4">
        Op tijd komen wordt makkelijker wanneer je de yogales als één compleet agendablok behandelt.
        Noteer dus niet alleen wanneer de les begint. Neem ook reistijd, aankomstbuffer, lestijd en
        een paar minuten na afloop mee.
      </p>
      <p className="mt-4">
        Bij Yoga Zeeburg duren de meeste lessen 75 minuten en Relax Yin &amp; Nidra 90 minuten. In{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "hoe-lang-duurt-een-yogales" }}
          className={link}
        >
          hoe lang duurt een yogales?
        </Link>{" "}
        staat hoe je het hele tijdsblok berekent.
      </p>
      <p className="mt-4">
        Wil je eerst verschillende lestijden en stijlen proberen? Met de{" "}
        <Link to="/trial" className={link}>
          14-daagse Intro Pass
        </Link>{" "}
        kun je ontdekken welk moment realistisch in jouw week past.
      </p>

      <h2 id="conclusie" className={h2}>
        Conclusie
      </h2>
      <p className="mt-4">
        Voor de meeste yogalessen is 10 tot 15 minuten vooraf een fijne aankomsttijd. Kies bij je
        eerste bezoek voor 15 minuten en houd daarna ongeveer 10 minuten als vaste buffer aan. Zo
        hoef je niet te haasten, verstoor je de start niet en begint je yogales al met het gevoel dat
        je echt even ruimte hebt gemaakt.
      </p>

      <section
        aria-labelledby="cta-hoe-vroeg-aanwezig"
        className="mt-14 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8"
      >
        <h2
          id="cta-hoe-vroeg-aanwezig"
          className="font-display text-2xl font-medium tracking-tight text-foreground"
        >
          Zelf ervaren wat yoga voor je doet?
        </h2>
        <p className="mt-3">
          Probeer 14 dagen onbeperkt verschillende lessen, docenten en tijden bij Yoga Zeeburg in
          Amsterdam Oost.
        </p>
        <a
          href="/trial"
          className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Start je 14 dagen onbeperkt
        </a>
      </section>
    </>
  );
}
