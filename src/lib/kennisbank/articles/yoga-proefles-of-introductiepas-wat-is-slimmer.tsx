// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: yoga-proefles-of-introductiepas-wat-is-slimmer

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import proeflesPasHeroAsset from "@/assets/yoga-proefles-introductiepas-hoofdbeeld.webp.asset.json";
import proeflesPasInlineAsset from "@/assets/yoga-proefles-introductiepas-vergelijken.webp.asset.json";
import { type Article, CATEGORY_BEGINNEN_MET_YOGA } from "../article-types";

const PROEFLES_PAS_HERO_IMAGE: ArticleImageRef = {
  url: proeflesPasHeroAsset.url,
  alt: "Lege yogamat met één kurkblok en meerdere yogaprops in een rustige ruimte aan het water.",
  width: 1600,
  height: 900,
};

const PROEFLES_PAS_INLINE_IMAGE: ArticleImageRef = {
  url: proeflesPasInlineAsset.url,
  alt: "Bovenaanzicht van één yogamat naast een uitgebreidere set matten, blokken, bolster, deken en riem.",
  width: 1600,
  height: 900,
};

export const article: Article = {
  slug: "yoga-proefles-of-introductiepas-wat-is-slimmer",
  title: "Yoga proefles of introductiepas: wat is slimmer?",
  h1: "Yoga proefles of introductiepas: wat is slimmer?",
  seoTitle: "Yoga proefles of introductiepas: wat is slimmer?",
  description:
    "Kies je een losse yoga-proefles of een introductiepas? Vergelijk doel, waarde en zekerheid en ontdek welke kennismaking het beste bij jou past.",
  intro:
    "Een losse proefles is slim als je één specifieke les of docent wilt ervaren met zo min mogelijk verplichting. Een introductiepas is meestal slimmer als je wilt bepalen of een studio echt bij je past: je kunt meerdere lessen, docenten en tijden vergelijken en voorkomt dat één toevallig goede of mindere les je keuze bepaalt.",
  category: CATEGORY_BEGINNEN_MET_YOGA,
  type: "how-to",
  pillar: false,
  publishedAt: "2026-08-19",
  updatedAt: "2026-08-19",
  readingTimeMin: 7,
  toc: [
    { id: "kort-antwoord", label: "Kort antwoord" },
    {
      id: "wat-is-het-verschil",
      label: "Wat is het verschil tussen een proefles en een introductiepas?",
    },
    { id: "wanneer-is-een-proefles-slimmer", label: "Wanneer is een proefles slimmer?" },
    {
      id: "wanneer-is-een-introductiepas-slimmer",
      label: "Wanneer is een introductiepas slimmer?",
    },
    {
      id: "vergelijk-waarde-niet-alleen-prijs",
      label: "Vergelijk de waarde, niet alleen de prijs",
    },
    {
      id: "zo-gebruik-je-een-introductiepas",
      label: "Zo gebruik je een introductiepas verstandig",
    },
    { id: "snelle-keuzehulp", label: "Snelle keuzehulp" },
    { id: "yoga-zeeburg", label: "Proefperiode bij Yoga Zeeburg" },
    { id: "conclusie", label: "Conclusie" },
    { id: "faq", label: "Veelgestelde vragen" },
  ],
  faqs: [
    {
      question: "Is één proefles genoeg om te weten of yoga bij je past?",
      answer:
        "Eén proefles geeft een bruikbare eerste indruk, maar geen volledig beeld. De yogastijl, docent, groepssfeer en jouw energie van die dag beïnvloeden de ervaring. Probeer meerdere lessen wanneer je na de eerste les twijfelt.",
    },
    {
      question: "Hoeveel lessen moet je tijdens een introductiepas proberen?",
      answer:
        "Drie verschillende lessen geven vaak al meer informatie dan drie keer vrijwel dezelfde les. Vergelijk bij voorkeur minstens twee docenten of tempo's en één tijdstip dat je later structureel zou kunnen volgen.",
    },
    {
      question: "Moet je als beginner voor een rustige yogales kiezen?",
      answer:
        "Niet altijd. Een duidelijke, beginnersvriendelijke actieve les kan goed passen. Kijk vooral naar de lesbeschrijving, het tempo en de aangeboden opties. Kies een les waarin je aanwijzingen rustig kunt volgen zonder jezelf te forceren.",
    },
    {
      question: "Wanneer is een introductiepas geen goede keuze?",
      answer:
        "Een introductiepas is minder zinvol als je binnen de geldigheidsperiode nauwelijks beschikbaar bent of als het rooster geen passende lessen bevat. Controleer daarom vóór aankoop de startdatum, geldigheid en haalbare lestijden.",
    },
    {
      question: "Loopt de Intro Pass van Yoga Zeeburg automatisch door?",
      answer:
        "Nee. De 14-daagse Intro Pass is voor nieuwe studenten en stopt automatisch. Controleer voor aankoop altijd de actuele voorwaarden op de officiële aanbodpagina.",
    },
  ],
  sources: [
    { title: "Yoga Zeeburg — homepage en studio-informatie", url: "https://www.yogazeeburg.com/" },
    {
      title: "Yoga Zeeburg — actuele prijzen en voorwaarden",
      url: "https://www.yogazeeburg.com/prijzen",
    },
    { title: "Yoga Zeeburg — actueel lesrooster", url: "https://www.yogazeeburg.com/rooster" },
    { title: "Yoga Zeeburg — 14-daagse Intro Pass", url: "https://www.yogazeeburg.com/trial" },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  heroImage: PROEFLES_PAS_HERO_IMAGE,
  body: () => <ProeflesPasBody />,
};

function ProeflesPasBody() {
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
            Een losse yoga-proefles is de slimste keuze wanneer je één specifieke les, docent of
            studio met zo min mogelijk verplichting wilt ervaren. Je krijgt snel een eerste indruk
            van de begeleiding, sfeer en ruimte.
          </p>
          <p>
            Een introductiepas is meestal slimmer wanneer je een betrouwbare keuze voor de langere
            termijn wilt maken. Door meerdere lessen, docenten en tijdstippen te proberen, ontdek je
            niet alleen of yoga je bevalt, maar ook welke vorm en welk weekritme je kunt volhouden.
            Eén toevallig goede of mindere les weegt dan minder zwaar.
          </p>
        </div>
      </section>

      <h2
        id="wat-is-het-verschil"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat is het verschil tussen een proefles en een introductiepas?
      </h2>
      <p className="mt-4">
        Een proefles is doorgaans één losse kennismaking. Je boekt een les, doet mee en beoordeelt
        daarna hoe dat specifieke moment voelde. Dat is overzichtelijk en vraagt weinig tijd. Het
        nadeel is dat je oordeel sterk wordt beïnvloed door één docent, één yogastijl, één tijdstip
        en hoe jij je die dag voelde.
      </p>
      <p className="mt-4">
        Een introductiepas geeft toegang tot meerdere lessen binnen een korte, vaste periode. Het
        doel is niet alleen vaker yoga doen, maar gericht vergelijken. Een rustige les kan heel
        anders aanvoelen dan een actieve flow. Ook de uitleg van twee docenten of de sfeer op een
        ochtend en avond kan verschillen.
      </p>
      <p className="mt-4">
        Wil je vooral weten wat er tijdens een eerste bezoek gebeurt? Lees dan ook{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          wat je kunt verwachten van een proefles yoga in Amsterdam Oost
        </Link>
        .
      </p>

      <h2
        id="wanneer-is-een-proefles-slimmer"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wanneer is een proefles slimmer?
      </h2>
      <p className="mt-4">Kies eerder voor één proefles als je:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>eerst wilt ontdekken of een yogales überhaupt bij je past;</li>
        <li>al precies weet welke stijl, docent of lestijd je wilt proberen;</li>
        <li>twee of drie studio&rsquo;s afzonderlijk met elkaar vergelijkt;</li>
        <li>weinig ruimte in je agenda hebt tijdens een korte introductieperiode;</li>
        <li>nog niet wilt betalen voor meerdere mogelijke bezoeken.</li>
      </ul>
      <p className="mt-4">
        Een proefles werkt het best wanneer je hem als eerste indruk behandelt, niet als definitief
        oordeel. Vraag jezelf na afloop af of je de uitleg kon volgen, of je ruimte voelde om iets
        aan te passen en of het tijdstip inclusief reistijd haalbaar was. Was één onderdeel minder
        prettig? Bepaal dan of dat bij de hele studio hoort of alleen bij deze les.
      </p>

      <h2
        id="wanneer-is-een-introductiepas-slimmer"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wanneer is een introductiepas slimmer?
      </h2>
      <p className="mt-4">
        Een introductiepas past beter wanneer je werkelijk wilt weten of een studio onderdeel kan
        worden van je week. Je verzamelt meer informatie en kunt gerichter vergelijken.
      </p>
      <p className="mt-4">Een introductiepas is vooral nuttig als je:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>nog niet weet of je een rustige of actievere yogales zoekt;</li>
        <li>verschillende docenten wilt ervaren;</li>
        <li>wilt testen welke lestijden in je echte agenda werken;</li>
        <li>niet wilt beslissen op basis van één uitzonderlijk drukke of vermoeiende dag;</li>
        <li>eerst een routine wilt proberen voordat je een lidmaatschap kiest.</li>
      </ul>
      <p className="mt-4">
        De extra lessen zijn alleen waardevol als je ze ook werkelijk boekt. Controleer daarom vóór
        aankoop het actuele rooster en kies alvast twee of drie haalbare momenten. Een ruime pas
        zonder bruikbare lestijden is geen betere keuze dan één goed geplande proefles.
      </p>

      <ArticleFigure
        image={PROEFLES_PAS_INLINE_IMAGE}
        caption="Eén les geeft een eerste indruk; meerdere lessen laten zien welke stijl, docent en tijd werkelijk bij je passen."
        className="mt-10"
      />

      <h2
        id="vergelijk-waarde-niet-alleen-prijs"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Vergelijk de waarde, niet alleen de prijs
      </h2>
      <p className="mt-4">
        De goedkoopste optie is niet automatisch de slimste. Vergelijk wat je nodig hebt om een
        goede beslissing te nemen.
      </p>
      <p className="mt-4">Let bij een proefaanbod op:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>hoeveel lessen je binnen de geldigheidsperiode kunt volgen;</li>
        <li>of alle relevante lesvormen en docenten beschikbaar zijn;</li>
        <li>wanneer de periode begint: bij aankoop of bij je eerste boeking;</li>
        <li>welke reserverings- en annuleringsregels gelden;</li>
        <li>of het aanbod automatisch stopt of doorloopt;</li>
        <li>wat je betaalt als je uiteindelijk maar één keer gaat.</li>
      </ul>
      <p className="mt-4">
        Bekijk altijd de{" "}
        <Link
          to="/prijzen"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          actuele prijzen en voorwaarden
        </Link>
        . Aanbiedingen en roosters kunnen veranderen; een oud bedrag in een artikel is daarom minder
        betrouwbaar dan de huidige aanbodpagina.
      </p>

      <h2
        id="zo-gebruik-je-een-introductiepas"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zo gebruik je een introductiepas verstandig
      </h2>
      <p className="mt-4">
        Plan niet willekeurig zoveel mogelijk lessen. Kies momenten die samen antwoord geven op je
        belangrijkste vragen.
      </p>
      <ol className="mt-4 list-decimal space-y-2 pl-6">
        <li>
          Boek eerst een toegankelijke les op een tijdstip dat je later vaker zou kunnen halen.
        </li>
        <li>Probeer daarna een andere docent of een les met een ander tempo.</li>
        <li>
          Test minimaal één drukke werkdag in plaats van alleen een gemakkelijk weekendmoment.
        </li>
        <li>Noteer na iedere les kort wat je vond van uitleg, sfeer, intensiteit en reistijd.</li>
        <li>Wacht tot het einde van de periode voordat je een regulier product kiest.</li>
      </ol>
      <p className="mt-4">
        Gebruik dezelfde kwaliteitscriteria bij iedere les. Het artikel{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "hoe-herken-je-een-goede-yogastudio-kwaliteitskenmerken" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Hoe herken je een goede yogastudio? 9 kwaliteitskenmerken
        </Link>{" "}
        helpt je om begeleiding, grenzen, materialen, transparantie en sfeer consequent te
        beoordelen.
      </p>

      <h2
        id="snelle-keuzehulp"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Snelle keuzehulp
      </h2>
      <p className="mt-4">
        <strong className="font-medium text-foreground">Kies een proefles</strong> als je één
        concrete vraag hebt: &ldquo;Hoe voelt deze les bij deze docent?&rdquo;
      </p>
      <p className="mt-4">
        <strong className="font-medium text-foreground">Kies een introductiepas</strong> als je een
        bredere vraag hebt: &ldquo;Past deze studio, met verschillende lessen en tijden, in mijn
        leven?&rdquo;
      </p>
      <p className="mt-4">
        <strong className="font-medium text-foreground">Wacht nog even met kopen</strong> als je
        binnen de geldigheidsperiode nauwelijks kunt komen. Bekijk eerst het{" "}
        <Link
          to="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          actuele lesrooster
        </Link>{" "}
        en kies een periode waarin je echt kunt vergelijken.
      </p>
      <p className="mt-4">
        Twijfel je nog steeds? Bedenk welke vergissing je liever voorkomt. Wil je voorkomen dat je
        te veel koopt voordat je weet of yoga iets voor je is, begin dan klein. Wil je voorkomen dat
        één les een onbetrouwbaar beeld geeft, kies dan een introductieperiode.
      </p>

      <h2
        id="yoga-zeeburg"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Proefperiode bij Yoga Zeeburg
      </h2>
      <p className="mt-4">
        Yoga Zeeburg is een kleine, persoonlijke en beginnersvriendelijke yogastudio aan de
        Cruquiusweg 96F in Amsterdam Oost, boven CrossFit Zeeburg en vlak bij het water.
      </p>
      <p className="mt-4">
        Met de{" "}
        <a
          href="/trial"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          14-daagse Intro Pass
        </a>{" "}
        kunnen nieuwe studenten veertien dagen onbeperkt verschillende lessen, docenten en tijden
        proberen. De pas stopt automatisch. Dat maakt het mogelijk om niet alleen een eerste les te
        beoordelen, maar ook te ontdekken welk tempo en welk moment werkelijk bij je week passen.
      </p>
      <p className="mt-4">
        Kies vóór de start enkele haalbare lessen in het rooster. Probeer bij voorkeur zowel een
        rustiger als een actiever moment als beide richtingen je aanspreken. Je hoeft nog geen
        ervaring te hebben en je hoeft niet direct te beslissen wat je daarna gaat doen.
      </p>

      <h2
        id="conclusie"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Conclusie
      </h2>
      <p className="mt-4">
        Een proefles is slim voor een snelle, vrijblijvende eerste indruk. Een introductiepas is
        slimmer wanneer je meerdere lessen nodig hebt om een studio, docent en haalbaar weekritme
        eerlijk te beoordelen. Kies dus niet automatisch het aanbod met de meeste lessen of de
        laagste prijs. Kies de vorm die genoeg betrouwbare informatie geeft voor jouw volgende stap.
      </p>
    </>
  );
}
