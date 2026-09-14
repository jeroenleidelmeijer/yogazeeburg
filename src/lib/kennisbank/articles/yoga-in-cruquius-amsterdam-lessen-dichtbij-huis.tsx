// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: yoga-in-cruquius-amsterdam-lessen-dichtbij-huis

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import cruquiusHeroAsset from "@/assets/yoga-cruquius-amsterdam-hoofdbeeld.webp.asset.json";
import cruquiusInlineAsset from "@/assets/yoga-cruquius-dichtbij-huis.webp.asset.json";
import { type Article, CATEGORY_AMSTERDAM_OOST } from "../article-types";

const CRUQUIUS_HERO_IMAGE: ArticleImageRef = {
  url: cruquiusHeroAsset.url,
  alt: "Illustratie van een yogamat en kurkblok aan het water in een rustige Cruquius-omgeving.",
  width: 1600,
  height: 900,
};

const CRUQUIUS_INLINE_IMAGE: ArticleImageRef = {
  url: cruquiusInlineAsset.url,
  alt: "Illustratie van yogaspullen die klaarstaan bij de voordeur met uitzicht op het water.",
  width: 1600,
  height: 900,
};

export const article: Article = {
  slug: "yoga-in-cruquius-amsterdam-lessen-dichtbij-huis",
  title: "Yoga in Cruquius Amsterdam: lessen dichtbij huis",
  h1: "Yoga in Cruquius Amsterdam: lessen dichtbij huis",
  seoTitle: "Yoga in Cruquius Amsterdam: lessen dichtbij huis",
  description:
    "Zoek je yoga in Cruquius, Amsterdam? Ontdek hoe locatie, route, rooster en lesstijl bepalen welke yogales dichtbij huis echt bij je week past.",
  intro:
    "Woon of werk je in Cruquius en zoek je een yogales dichtbij huis? Kijk dan niet alleen naar de afstand. Een studio past pas echt bij je week als ook de route, lestijd, lesstijl en sfeer praktisch voelen.",
  category: CATEGORY_AMSTERDAM_OOST,
  type: "local-guide",
  pillar: false,
  publishedAt: "2026-08-12",
  updatedAt: "2026-08-12",
  readingTimeMin: 7,
  toc: [
    {
      id: "waarom-yoga-dichtbij-huis-verschil-maakt",
      label: "Waarom yoga dichtbij huis verschil maakt",
    },
    { id: "waar-ligt-yoga-zeeburg-in-cruquius", label: "Waar ligt Yoga Zeeburg in Cruquius?" },
    { id: "welke-yogales-past-bij-jouw-week", label: "Welke yogales past bij jouw week?" },
    { id: "hoe-vergelijk-je-route-tijd-en-ritme", label: "Hoe vergelijk je route, tijd en ritme?" },
    {
      id: "wat-kun-je-bij-een-eerste-bezoek-verwachten",
      label: "Wat kun je bij een eerste bezoek verwachten?",
    },
    {
      id: "kies-een-buurtstudio-die-je-wilt-blijven-bezoeken",
      label: "Kies een buurtstudio die je wilt blijven bezoeken",
    },
    {
      id: "de-beste-yogales-in-cruquius-is-de-les-waar-je-naartoe-gaat",
      label: "De beste yogales in Cruquius is de les waar je naartoe gaat",
    },
  ],
  faqs: [
    {
      question: "Waar zit Yoga Zeeburg in Cruquius?",
      answer:
        "Yoga Zeeburg zit aan de Cruquiusweg 96F in Amsterdam Oost, boven CrossFit Zeeburg en vlak bij het water. Plan bij een eerste bezoek wat extra tijd om de ingang rustig te vinden.",
    },
    {
      question: "Welke yogalessen zijn er in Cruquius?",
      answer:
        "Het reguliere rooster van Yoga Zeeburg bevat rustige en actievere lessen op verschillende dagen en tijden. Bekijk de lesbeschrijvingen en controleer voor actuele wijzigingen, beschikbaarheid en reserveringen altijd Sportbit.",
    },
    {
      question: "Is yoga in Cruquius geschikt voor beginners?",
      answer:
        "Ja, er zijn lessen die toegankelijk zijn voor beginners of alle niveaus. Lees vooraf de beschrijving, vertel de docent dat je nieuw bent en kies een tempo waarbij je de aanwijzingen rustig kunt volgen.",
    },
    {
      question: "Hoe kies ik een yogales dichtbij huis?",
      answer:
        "Vergelijk de volledige route, lestijd, lesstijl en sfeer. Test bij voorkeur een werkelijk tijdstip in plaats van alleen de afstand op een kaart te bekijken. De beste keuze is de les die je ook in een drukke week kunt blijven volgen.",
    },
    {
      question: "Kan ik meerdere lessen proberen voordat ik kies?",
      answer:
        "Ja. Met een introductiepas kun je verschillende lessen, docenten en tijden vergelijken. Zo ontdek je welk moment, tempo en ritme het beste bij je dagelijkse leven passen.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg — homepage en studio-informatie",
      url: "https://www.yogazeeburg.com/",
    },
    {
      title: "Yoga Zeeburg — regulier weekrooster",
      url: "https://www.yogazeeburg.com/rooster",
    },
    {
      title: "Yoga Zeeburg — contact en adres",
      url: "https://www.yogazeeburg.com/contact",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  heroImage: CRUQUIUS_HERO_IMAGE,
  body: () => <CruquiusBody />,
};

function CruquiusBody() {
  return (
    <>
      <section
        id="kort-antwoord"
        aria-labelledby="kort-antwoord-heading"
        className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8"
      >
        <h2
          id="kort-antwoord-heading"
          className="font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl"
        >
          Kort antwoord
        </h2>
        <div className="mt-3 space-y-3 text-foreground">
          <p>
            Voor yoga in Cruquius kun je kiezen voor een buurtstudio die lopend of met de fiets
            logisch op je dagelijkse route ligt. Yoga Zeeburg zit aan de Cruquiusweg 96F in
            Amsterdam Oost, boven CrossFit Zeeburg en vlak bij het water. Controleer vóór je boekt
            het actuele rooster, kies een les die past bij je gewenste tempo en probeer zo mogelijk
            meerdere momenten. De beste keuze is niet automatisch de dichtstbijzijnde studio op de
            kaart, maar de plek waar reistijd, lestijd en leservaring samen haalbaar genoeg zijn om
            regelmatig terug te komen.
          </p>
        </div>
      </section>

      <p className="mt-10">
        Woon of werk je in Cruquius en zoek je een yogales dichtbij huis? Kijk dan niet alleen naar
        de afstand. Een studio past pas echt bij je week als ook de route, lestijd, lesstijl en
        sfeer praktisch voelen.
      </p>

      <h2
        id="waarom-yoga-dichtbij-huis-verschil-maakt"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Waarom yoga dichtbij huis verschil maakt
      </h2>
      <p className="mt-4">
        Een yogales vraagt meer tijd dan de minuten op de mat. Je moet je spullen pakken, naar de
        studio gaan en weer thuiskomen. Een korte, eenvoudige route verlaagt die praktische drempel.
        Zeker op een drukke werkdag kan tien minuten extra reistijd het verschil maken tussen gaan
        en afzeggen.
      </p>
      <p className="mt-4">
        Dichtbij is daarom geen doel op zichzelf. Het voordeel ontstaat vooral wanneer de locatie
        goed aansluit op je dagelijkse bewegingen. Misschien ligt een studio vlak bij huis, maar
        past de lestijd niet. Een andere plek ligt iets verder, maar precies op je route vanaf werk.
        Kijk naar de totale combinatie.
      </p>
      <p className="mt-4">
        In{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-dicht-bij-huis-waarom-locatie-helpt-om-vol-te-houden" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Yoga dicht bij huis: waarom locatie helpt om vol te houden
        </Link>{" "}
        lees je uitgebreider hoe gemak kan helpen om een routine op te bouwen.
      </p>

      <h2
        id="waar-ligt-yoga-zeeburg-in-cruquius"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Waar ligt Yoga Zeeburg in Cruquius?
      </h2>
      <p className="mt-4">
        Yoga Zeeburg is gevestigd aan de Cruquiusweg 96F in Amsterdam Oost. De studio bevindt zich
        boven CrossFit Zeeburg, in de omgeving van Cruquius en de Eastern Docklands, vlak bij het
        water.
      </p>
      <p className="mt-4">
        Cruquius combineert wonen, werken en oude havenarchitectuur. Daardoor komen bezoekers
        mogelijk uit verschillende richtingen: vanuit het eiland zelf, vanaf de Indische Buurt, uit
        Zeeburg of vanuit andere delen van Amsterdam Oost. Test de route die jij werkelijk gebruikt.
        Een kaartinschatting zegt minder dan een rit op het tijdstip waarop je normaal naar de les
        gaat.
      </p>
      <p className="mt-4">
        Kom je voor het eerst? Plan dan vijf tot tien minuten extra. Zo kun je de ingang rustig
        vinden, je spullen wegleggen en zonder haast beginnen.
      </p>

      <h2
        id="welke-yogales-past-bij-jouw-week"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Welke yogales past bij jouw week?
      </h2>
      <p className="mt-4">
        De handigste locatie werkt alleen als het lesaanbod aansluit op wat je zoekt. Een rustige
        les kan prettig zijn wanneer je wilt vertragen of spanning wilt loslaten. Een actievere flow
        past mogelijk beter als je energie wilt opbouwen en graag doorbeweegt.
      </p>
      <p className="mt-4">
        Lees daarom altijd de volledige lesbeschrijving. Namen als Vinyasa, Yin of Pilates Fusion
        geven richting, maar tempo, opbouw en intensiteit kunnen per les en docent verschillen. Kijk
        ook of een les geschikt is voor alle niveaus of dat enige ervaring handig is.
      </p>
      <p className="mt-4">
        Op het{" "}
        <Link
          to="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          reguliere rooster van Yoga Zeeburg
        </Link>{" "}
        staan lessen op verschillende dagen en tijden. Voor actuele wijzigingen, vrije plekken en
        reserveringen is Sportbit leidend.
      </p>

      <h2
        id="hoe-vergelijk-je-route-tijd-en-ritme"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Hoe vergelijk je route, tijd en ritme?
      </h2>
      <p className="mt-4">Gebruik voor je keuze deze vier praktische vragen:</p>
      <ol className="mt-4 list-decimal space-y-2 pl-6">
        <li>Hoeveel minuten kost de volledige reis van deur tot deur?</li>
        <li>Past de lestijd bij werk, eten en andere afspraken?</li>
        <li>Voelt de route ook in het donker of bij slecht weer logisch?</li>
        <li>Kun je dit moment waarschijnlijk vaker dan één keer vrijhouden?</li>
      </ol>
      <p className="mt-4">
        De vierde vraag is het belangrijkst. Een losse les kun je altijd ergens tussendoor plannen.
        Voor een routine heb je een tijdstip nodig dat ook in een gewone, volle week haalbaar
        blijft.
      </p>
      <p className="mt-4">
        Kies eventueel twee kansrijke lessen: één voorkeursmoment en één alternatief. Dan hoeft een
        drukke avond niet meteen te betekenen dat je die hele week overslaat.
      </p>

      <ArticleFigure
        image={CRUQUIUS_INLINE_IMAGE}
        caption="Als je yogaspullen klaarstaan en de route eenvoudig is, wordt vertrekken een stuk makkelijker."
        className="mt-10"
      />

      <section
        aria-labelledby="contextuele-cta-heading"
        className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8"
      >
        <h3
          id="contextuele-cta-heading"
          className="font-display text-lg font-medium tracking-tight text-foreground"
        >
          Wil je ontdekken welk moment echt werkt?
        </h3>
        <p className="mt-3 text-foreground">
          Met de 14-daagse introductiepas kun je verschillende lessen, docenten en tijden proberen.
          Zo vergelijk je niet alleen de inhoud van de les, maar ook de route en het ritme eromheen.{" "}
          <a
            href="/trial"
            className="font-medium text-primary underline underline-offset-4 hover:no-underline"
          >
            Bekijk de introductiepas
          </a>
          .
        </p>
      </section>

      <h2
        id="wat-kun-je-bij-een-eerste-bezoek-verwachten"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat kun je bij een eerste bezoek verwachten?
      </h2>
      <p className="mt-4">
        Boek je plek vooraf en controleer de actuele lesinformatie. Draag kleding waarin je prettig
        kunt bewegen. Je hoeft geen speciale yoga-outfit te kopen en je hoeft houdingen niet perfect
        uit te voeren.
      </p>
      <p className="mt-4">
        Vertel de docent gerust dat het je eerste bezoek is. Geef ook aan wanneer je nieuw bent met
        yoga of ergens rekening mee wilt houden. Tijdens de les mag je altijd rust nemen, een
        houding overslaan of een eenvoudigere variant kiezen.
      </p>
      <p className="mt-4">
        Een volledig stappenplan vind je in{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Proefles yoga in Amsterdam Oost: wat kun je verwachten?
        </Link>
        .
      </p>

      <h2
        id="kies-een-buurtstudio-die-je-wilt-blijven-bezoeken"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Kies een buurtstudio die je wilt blijven bezoeken
      </h2>
      <p className="mt-4">
        Een korte route is waardevol, maar sfeer en begeleiding bepalen mede of je terug wilt komen.
        Let tijdens een proefperiode op hoe je wordt ontvangen, of de uitleg duidelijk is en of de
        groep en ruimte prettig voelen.
      </p>
      <p className="mt-4">
        Yoga Zeeburg omschrijft zichzelf als een kleine, persoonlijke en down-to-earth studio. De
        lessen variëren van rustiger tot actiever. Dat maakt het mogelijk om binnen dezelfde locatie
        te zoeken naar een les die bij je lichaam, ervaring en week past.
      </p>
      <p className="mt-4">
        Vergelijk je breder in Amsterdam Oost? Lees dan ook{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-in-amsterdam-oost-welke-yogastudio-past-bij-jou" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Yoga in Amsterdam Oost: welke yogastudio past bij jou?
        </Link>
        .
      </p>

      <h2
        id="de-beste-yogales-in-cruquius-is-de-les-waar-je-naartoe-gaat"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        De beste yogales in Cruquius is de les waar je naartoe gaat
      </h2>
      <p className="mt-4">
        Voor yoga in Cruquius hoef je niet alleen te zoeken naar de kleinste afstand op de kaart.
        Zoek naar de combinatie die je gedrag makkelijker maakt: een haalbare route, een passend
        tijdstip, een les die bij je energie past en een plek waar je je op je gemak voelt.
      </p>
      <p className="mt-4">
        Probeer vervolgens meerdere momenten in een normale week. Als de reis eenvoudig voelt en je
        na de les graag terugkomt, heb je waarschijnlijk een betere keuze gemaakt dan wanneer je
        alleen op afstand of prijs vergelijkt.
      </p>
    </>
  );
}
