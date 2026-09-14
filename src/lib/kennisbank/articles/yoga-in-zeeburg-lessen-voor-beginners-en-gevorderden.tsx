// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: yoga-in-zeeburg-lessen-voor-beginners-en-gevorderden

import { Link } from "@tanstack/react-router";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import niveauHeroAsset from "@/assets/yoga-zeeburg-beginners-gevorderden-hoofdbeeld.webp.asset.json";
import niveauInlineAsset from "@/assets/yoga-zeeburg-les-op-jouw-niveau.webp.asset.json";
import { type Article, CATEGORY_AMSTERDAM_OOST } from "../article-types";

const NIVEAU_HERO_IMAGE: ArticleImageRef = {
  url: niveauHeroAsset.url,
  alt: "Illustratie van twee lege yogamatten met verschillende yogaprops aan het water in Zeeburg.",
  width: 1600,
  height: 900,
};

const NIVEAU_INLINE_IMAGE: ArticleImageRef = {
  url: niveauInlineAsset.url,
  alt: "Bovenaanzicht van twee lege yogamatten met blokken, een riem en een bolster voor verschillende lesniveaus.",
  width: 1600,
  height: 900,
};

export const article: Article = {
  slug: "yoga-in-zeeburg-lessen-voor-beginners-en-gevorderden",
  title: "Yoga in Zeeburg: lessen voor beginners en gevorderden",
  h1: "Yoga in Zeeburg: lessen voor beginners en gevorderden",
  seoTitle: "Yoga in Zeeburg: lessen voor beginners en gevorderden",
  description:
    "Zoek je yoga in Zeeburg? Ontdek hoe beginners en ervaren yogi’s een les kiezen op niveau, tempo en doel, en wat je bij Yoga Zeeburg kunt verwachten.",
  intro:
    "Zoek je yoga in Zeeburg en twijfel je welke les bij je ervaring past? Beginners en gevorderden hoeven niet per se naar verschillende studio’s. Belangrijker is dat je kiest op tempo, begeleiding en wat je die dag nodig hebt.",
  category: CATEGORY_AMSTERDAM_OOST,
  type: "local-guide",
  pillar: false,
  publishedAt: "2026-08-14",
  updatedAt: "2026-08-14",
  readingTimeMin: 7,
  toc: [
    {
      id: "wat-is-een-goede-yogales-voor-beginners",
      label: "Wat is een goede yogales voor beginners?",
    },
    {
      id: "wat-zoeken-gevorderde-yogabeoefenaars",
      label: "Wat zoeken gevorderde yogabeoefenaars?",
    },
    {
      id: "kunnen-beginners-en-gevorderden-samen-les-volgen",
      label: "Kunnen beginners en gevorderden samen les volgen?",
    },
    { id: "kies-op-tempo-doel-en-energie", label: "Kies op tempo, doel en energie" },
    {
      id: "wat-kun-je-verwachten-bij-yoga-zeeburg",
      label: "Wat kun je verwachten bij Yoga Zeeburg?",
    },
    {
      id: "zo-kies-je-jouw-eerste-of-volgende-les",
      label: "Zo kies je jouw eerste of volgende les",
    },
    { id: "jouw-niveau-mag-per-dag-verschillen", label: "Jouw niveau mag per dag verschillen" },
  ],
  faqs: [
    {
      question: "Welke yogales is geschikt als ik nog nooit yoga heb gedaan?",
      answer:
        "Kies een beginner-friendly les of een les voor alle niveaus met een rustig tot gebalanceerd tempo. Lees de beschrijving, vertel de docent dat je nieuw bent en neem eenvoudige opties wanneer dat prettiger voelt.",
    },
    {
      question: "Moet ik lenig zijn om met yoga te beginnen?",
      answer:
        "Nee. Lenigheid is geen toelatingseis. Yoga kan juist helpen om bewuster te bewegen, maar je hoeft geen bepaald bereik te halen. Werk binnen een comfortabele grens en forceer niets.",
    },
    {
      question: "Zijn er bij Yoga Zeeburg lessen voor gevorderden?",
      answer:
        "Yoga Zeeburg heeft lessen met verschillende tempo’s en accenten. Sommige dynamische lessen raden enige ervaring aan. Ervaren deelnemers kunnen daarnaast verdieping vinden in techniek, adem en aandacht binnen lessen voor meerdere niveaus.",
    },
    {
      question: "Kunnen beginners en gevorderden in dezelfde yogales?",
      answer:
        "Ja, wanneer de les voor meerdere niveaus is opgebouwd en de docent passende variaties geeft. Iedereen kiest de optie die op dat moment veilig en haalbaar voelt.",
    },
    {
      question: "Hoe weet ik welke les bij mij past?",
      answer:
        "Vergelijk het tempo, de lesbeschrijving en het doel met je ervaring en energie van die dag. Probeer bij voorkeur meerdere lesvormen en vraag de studio om advies als je twijfelt.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg — homepage en studio-informatie",
      url: "https://www.yogazeeburg.com/",
    },
    {
      title: "Yoga Zeeburg — lesbeschrijvingen",
      url: "https://www.yogazeeburg.com/lessen",
    },
    {
      title: "Yoga Zeeburg — regulier weekrooster",
      url: "https://www.yogazeeburg.com/rooster",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  heroImage: NIVEAU_HERO_IMAGE,
  body: () => <NiveauBody />,
};

function NiveauBody() {
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
            Bij Yoga Zeeburg zijn er lessen met verschillende tempo’s en accenten, van rustige
            Yin-achtige lessen tot actievere flows. Beginners kunnen het beste starten met een
            beginner-friendly les of een duidelijke lesbeschrijving voor alle niveaus, vooraf
            aangeven dat ze nieuw zijn en eenvoudige opties nemen. Ervaren yogi’s kunnen kiezen voor
            een dynamischer les of juist verdieping zoeken in adem, aandacht en techniek. Controleer
            altijd de actuele lesbeschrijving en het rooster; een lesnaam alleen zegt niet alles
            over tempo en vereiste ervaring.
          </p>
        </div>
      </section>

      <p className="mt-10">
        Zoek je yoga in Zeeburg en twijfel je welke les bij je ervaring past? Beginners en
        gevorderden hoeven niet per se naar verschillende studio’s. Belangrijker is dat je kiest op
        tempo, begeleiding en wat je die dag nodig hebt.
      </p>

      <h2
        id="wat-is-een-goede-yogales-voor-beginners"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat is een goede yogales voor beginners?
      </h2>
      <p className="mt-4">
        Een goede beginnersles geeft je genoeg tijd om aanwijzingen te begrijpen en te voelen wat
        een houding doet. De docent benoemt duidelijke opties, maar jij houdt zelf de regie. Je
        hoeft niet lenig te zijn, alle namen te kennen of iedere houding af te maken.
      </p>
      <p className="mt-4">
        Let bij het kiezen op woorden als beginner-friendly, rustig, herstelgericht of alle niveaus.
        Lees daarna de volledige beschrijving. Een rustig klinkende naam kan nog steeds intensief
        zijn, terwijl een actieve les soms juist heel helder wordt opgebouwd.
      </p>
      <p className="mt-4">
        Kom je voor het eerst, vertel dat dan vóór de les aan de docent. Kies een plek waar je goed
        kunt horen en zien, maar probeer niet iedere beweging van anderen te kopiëren. Rust nemen,
        een houding overslaan of een eenvoudigere variant kiezen hoort bij verstandig oefenen.
      </p>
      <p className="mt-4">
        Meer voorbereiding vind je in{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-voor-beginners-in-amsterdam-oost-zo-start-je" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Yoga voor beginners in Amsterdam Oost: zo start je
        </Link>
        .
      </p>

      <h2
        id="wat-zoeken-gevorderde-yogabeoefenaars"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat zoeken gevorderde yogabeoefenaars?
      </h2>
      <p className="mt-4">
        Meer ervaring betekent niet automatisch dat iedere les sneller of zwaarder moet zijn.
        Verdieping kan ook zitten in nauwkeuriger bewegen, rustiger ademen, eerder spanning
        herkennen en bewuster kiezen wanneer je minder doet.
      </p>
      <p className="mt-4">
        Wil je uitdaging, kijk dan naar lessen met een dynamischer tempo, langere reeksen of meer
        nadruk op kracht en stabiliteit. Wil je herstellen of je techniek verfijnen, dan kan een
        rustige les juist waardevol zijn. Ervaren beoefenaars hebben vaak meer aan een passende
        intentie dan aan het etiket ‘gevorderd’.
      </p>
      <p className="mt-4">
        Bij Yoga Zeeburg varieert het aanbod van kalmerende lessen tot actievere vormen. Sommige
        lesbeschrijvingen vermelden expliciet dat enige ervaring wordt aanbevolen. Gebruik die
        informatie als praktische aanwijzing, niet als oordeel over je niveau.
      </p>

      <h2
        id="kunnen-beginners-en-gevorderden-samen-les-volgen"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Kunnen beginners en gevorderden samen les volgen?
      </h2>
      <p className="mt-4">
        Ja, in een goed opgebouwde les voor meerdere niveaus kunnen beginners en ervaren deelnemers
        samen oefenen. De basisbeweging of houding is hetzelfde, terwijl de docent variaties
        aanbiedt. De één blijft bij de eenvoudigste vorm; de ander onderzoekt een volgende stap.
      </p>
      <p className="mt-4">
        Dat werkt alleen wanneer je niet probeert het tempo of bereik van iemand anders bij te
        houden. Een les is geen test. De ervaren deelnemer hoeft niet altijd de moeilijkste optie te
        kiezen en de beginner hoeft niet alles meteen te begrijpen.
      </p>
      <p className="mt-4">
        Vraag bij twijfel vooraf of de specifieke les geschikt is voor jouw ervaring. Dat is vooral
        verstandig bij snelle overgangen, complexere reeksen of een lesbeschrijving waarin ervaring
        wordt aanbevolen.
      </p>

      <h2
        id="kies-op-tempo-doel-en-energie"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Kies op tempo, doel en energie
      </h2>
      <p className="mt-4">Gebruik drie vragen om een les te kiezen:</p>
      <ol className="mt-4 list-decimal space-y-2 pl-6">
        <li>Wil ik vandaag vertragen, bewegen of gericht kracht en stabiliteit opbouwen?</li>
        <li>Hoeveel uitleg heb ik nodig om ontspannen mee te kunnen doen?</li>
        <li>Past dit tempo bij mijn energie en ervaring van vandaag?</li>
      </ol>
      <p className="mt-4">
        Je antwoord kan per week verschillen. Iemand die jaren yoga doet, kan na een drukke dag
        behoefte hebben aan een rustige les. Een beginner met een goede basisconditie kan juist
        graag bewegen, zolang de uitleg helder genoeg is.
      </p>
      <p className="mt-4">
        Bekijk de{" "}
        <Link
          to="/lessen"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          lesbeschrijvingen van Yoga Zeeburg
        </Link>{" "}
        en het{" "}
        <Link
          to="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          reguliere weekrooster
        </Link>{" "}
        naast elkaar. Voor actuele wijzigingen, beschikbare plekken en reserveringen is Sportbit
        leidend.
      </p>

      <ArticleFigure
        image={NIVEAU_INLINE_IMAGE}
        caption="De juiste les past bij jouw tempo en energie; een eenvoudige optie is altijd een volwaardige keuze."
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
          Probeer verschillende richtingen zonder direct te kiezen
        </h3>
        <p className="mt-3 text-foreground">
          Met de 14-daagse introductiepas kun je meerdere lessen, docenten en tijden ervaren. Zo
          ontdek je in de praktijk welke combinatie van tempo, begeleiding en sfeer bij je past.{" "}
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
        id="wat-kun-je-verwachten-bij-yoga-zeeburg"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat kun je verwachten bij Yoga Zeeburg?
      </h2>
      <p className="mt-4">
        Yoga Zeeburg is een kleine, persoonlijke en down-to-earth studio aan de Cruquiusweg 96F in
        Amsterdam Oost, boven CrossFit Zeeburg en vlak bij het water. De studio richt zich op echte
        lichamen en echte weken, zonder druk om perfect te presteren.
      </p>
      <p className="mt-4">
        Op het huidige reguliere rooster staan zowel rustigere lessen, zoals Yin- en herstelgerichte
        vormen, als actievere opties, zoals Vinyasa, Strong Flow en Pilates Fusion. Het rooster kan
        veranderen. Lees daarom altijd de actuele beschrijving en controleer Sportbit voordat je
        reserveert.
      </p>
      <p className="mt-4">
        Wil je weten hoe een eerste bezoek verloopt? Lees{" "}
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
        id="zo-kies-je-jouw-eerste-of-volgende-les"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zo kies je jouw eerste of volgende les
      </h2>
      <p className="mt-4">
        Begin met één les die op papier goed past. Let na afloop niet alleen op hoe zwaar de les
        was, maar vooral op de kwaliteit van de uitleg, het tempo en hoe je je daarna voelt. Schrijf
        eventueel kort op wat wel en niet werkte.
      </p>
      <p className="mt-4">
        Probeer daarna een tweede les met een ander accent. Een rustige les en een actievere les
        geven samen meer informatie dan twee bijna identieke lessen. Zo voorkom je dat je op basis
        van één moment beslist dat yoga te langzaam, te moeilijk of juist niet uitdagend genoeg is.
      </p>
      <p className="mt-4">
        Vergelijk je verschillende studio’s in de buurt? Gebruik dan ook{" "}
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
        id="jouw-niveau-mag-per-dag-verschillen"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Jouw niveau mag per dag verschillen
      </h2>
      <p className="mt-4">
        Beginners bouwen herkenning en vertrouwen op. Gevorderden leren vaak juist subtieler kiezen.
        In beide gevallen is een passende les de les waarin je aandacht kunt houden zonder jezelf te
        forceren.
      </p>
      <p className="mt-4">
        Kies daarom niet alleen op wat je technisch kunt, maar ook op je energie, herstel en
        behoefte van die dag. Een studio met verschillende lesrichtingen maakt het makkelijker om
        binnen één vertrouwde plek te blijven variëren.
      </p>
    </>
  );
}
