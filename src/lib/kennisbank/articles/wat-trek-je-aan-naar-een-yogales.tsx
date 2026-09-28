// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: wat-trek-je-aan-naar-een-yogales

import { Link } from "@tanstack/react-router";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import heroAsset from "@/assets/wat-trek-je-aan-yogales-hero.webp.asset.json";
import inlineAsset from "@/assets/yogakleding-actief-rustig.webp.asset.json";
import { type Article, CATEGORY_BEGINNEN_MET_YOGA } from "../article-types";

const HERO_IMAGE: ArticleImageRef = {
  url: heroAsset.url,
  alt: "Comfortabele yogakleding, een lichte trui en sokken klaargelegd bij een yogamat in een rustige lege ruimte.",
  width: 1536,
  height: 1024,
};

const INLINE_IMAGE: ArticleImageRef = {
  url: inlineAsset.url,
  alt: "Twee sets yogakleding voor een actieve en een rustige les met een yogamat, deken, sokken en yogablok.",
  width: 1536,
  height: 1024,
};

const INTRO =
  "Trek naar een yogales kleding aan waarin je makkelijk kunt buigen, strekken en draaien, zonder dat iets knelt of steeds verschuift. Een T-shirt of sporttop met een legging, joggingbroek of korte sportbroek is meestal prima; speciale yogakleding of een duur merk is niet nodig. Kies ademende stof als je een actieve les volgt en neem voor Yin, Nidra of de eindontspanning eventueel een vest en warme sokken mee. Yoga doe je doorgaans op blote voeten. Vermijd grote ritsen, harde knopen, riemen, volle zakken en loshangende sieraden: die kunnen in houdingen drukken of afleiden. De beste outfit voelt comfortabel, blijft op zijn plaats en laat je aandacht bij de les.";

export const article: Article = {
  slug: "wat-trek-je-aan-naar-een-yogales",
  title: "Wat trek je aan naar een yogales?",
  h1: "Wat trek je aan naar een yogales?",
  seoTitle: "Wat trek je aan naar een yogales? | Yoga Zeeburg",
  ogTitle: "Wat trek je aan naar een yogales?",
  description:
    "Wat trek je aan naar een yogales? Lees welke kleding prettig beweegt, goed blijft zitten en past bij actieve en rustige yogalessen.",
  ogDescription:
    "Praktische kledingkeuzes voor yoga: pasvorm, materialen, laagjes en het verschil tussen actieve en rustige lessen.",
  intro: INTRO,
  category: CATEGORY_BEGINNEN_MET_YOGA,
  type: "guide",
  pillar: false,
  publishedAt: "2026-09-28",
  updatedAt: "2026-09-28",
  readingTimeMin: 6,
  cta: {
    heading: "Probeer welke les bij jou past",
    text: "Met de 14-daagse introductiepas kun je verschillende lessen, docenten en tijden bij Yoga Zeeburg in Amsterdam Oost ervaren.",
    label: "Start je 14 dagen onbeperkt",
    subtext: "Voor nieuwe studenten. Stopt automatisch.",
  },
  toc: [
    { id: "de-eenvoudigste-yoga-outfit", label: "De eenvoudigste yoga-outfit" },
    { id: "vrij-bewegen-en-op-zijn-plaats-blijven", label: "Vrij bewegen én op zijn plaats blijven" },
    { id: "pas-je-kleding-aan-de-les-aan", label: "Pas je kleding aan de les aan" },
    { id: "yoga-op-blote-voeten-of-met-sokken", label: "Yoga op blote voeten of met sokken?" },
    { id: "welke-materialen-zijn-prettig", label: "Welke materialen zijn prettig?" },
    { id: "wat-kun-je-beter-niet-dragen", label: "Wat kun je beter niet dragen?" },
    { id: "de-bewegingstest-van-een-minuut", label: "De bewegingstest van één minuut" },
    { id: "conclusie", label: "Conclusie" },
    { id: "faq", label: "Veelgestelde vragen" },
  ],
  faqs: [
    {
      question: "Heb je een speciale yogabroek nodig?",
      answer:
        "Nee. Een legging, joggingbroek of sportshort is geschikt zolang je vrij kunt bewegen en het kledingstuk goed blijft zitten. Probeer thuis een diepe kniebuiging en vooroverbuiging. Koop pas iets nieuws als je merkt dat je huidige kleding echt niet prettig werkt.",
    },
    {
      question: "Kun je een joggingbroek dragen tijdens yoga?",
      answer:
        "Ja. Kies een joggingbroek die niet te zwaar is, niet afzakt en geen lange wijde pijpen heeft waar je op kunt staan. Voor Yin of een andere rustige les kan een zachte joggingbroek juist prettig zijn. Bij een actieve Flow kan een lichtere broek koeler aanvoelen.",
    },
    {
      question: "Doe je yoga met sokken of schoenen aan?",
      answer:
        "Yoga doe je meestal op blote voeten, omdat je dan direct contact en grip op de mat hebt. Buitenschoenen blijven buiten de zaal. Schone sokken kun je aantrekken tijdens rustige liggende houdingen of de eindontspanning, zolang de docent en de situatie dat toelaten.",
    },
    {
      question: "Wat trek je aan naar een Yin yogales?",
      answer:
        "Draag zachte kleding waarin je lang comfortabel kunt zitten en liggen. Omdat je bij Yin minder beweegt, kan een extra laag zoals een vest of trui prettig zijn. Leg eventueel schone warme sokken naast je mat voor de eindontspanning.",
    },
    {
      question: "Wat draag je als je snel zweet tijdens yoga?",
      answer:
        "Kies lichte, ademende kleding die vocht redelijk snel afvoert en niet zwaar wordt. Een aansluitende top blijft vaak beter zitten tijdens overgangen. Neem eventueel een kleine handdoek mee en kies een droge extra laag voor na de les.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg — Lessen, geraadpleegd 28 september 2026",
      url: "https://www.yogazeeburg.com/lessen",
    },
    {
      title: "Yoga Zeeburg — Rooster, geraadpleegd 28 september 2026",
      url: "https://www.yogazeeburg.com/rooster",
    },
    {
      title: "Yoga Zeeburg — 14-daagse introductiepas, geraadpleegd 28 september 2026",
      url: "https://www.yogazeeburg.com/trial",
    },
    {
      title: "Harvard Health Publishing — Yoga for everyone, geraadpleegd 28 september 2026",
      url: "https://www.health.harvard.edu/staying-healthy/yoga-for-everyone",
    },
    {
      title:
        "Wrightington, Wigan and Leigh Teaching Hospitals NHS Foundation Trust — Yoga patient information leaflet, geraadpleegd 28 september 2026",
      url: "https://www.wwl.nhs.uk/media/.leaflets/6246ccac355f08.23244090.pdf",
    },
  ],
  template: { showTOC: true, showFAQ: true, showSources: true, showRelated: true },
  heroImage: HERO_IMAGE,
  heroCaption:
    "Comfortabele kleding die vrij beweegt en goed blijft zitten is belangrijker dan een speciaal yogamerk.",
  body: () => <WatTrekJeAanBody />,
};

function WatTrekJeAanBody() {
  const h2 = "mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl";
  const h3 = "mt-10 font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl";
  const link = "font-medium text-primary underline underline-offset-4 hover:no-underline";
  return (
    <>
      <p className="mt-4">{INTRO}</p>

      <h2 id="de-eenvoudigste-yoga-outfit" className={h2}>
        De eenvoudigste yoga-outfit
      </h2>
      <p className="mt-4">
        Voor een eerste les hoef je niets nieuws te kopen. Begin met wat al in je kast ligt:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>een T-shirt, aansluitende top of sporttop;</li>
        <li>een legging, joggingbroek of sportshort waarin je diep kunt buigen;</li>
        <li>ondergoed dat prettig zit en niet schuurt;</li>
        <li>een licht vest of trui voor voor en na de les;</li>
        <li>eventueel schone sokken voor een rustige eindontspanning.</li>
      </ul>
      <p className="mt-4">
        Belangrijker dan het merk is dat je je armen vrij kunt optillen, je knieën kunt buigen en
        ontspannen kunt zitten of liggen. Ook een sport-bh is persoonlijk: kies ondersteuning die
        bij jouw lichaam en de intensiteit van de les past.
      </p>

      <h2 id="vrij-bewegen-en-op-zijn-plaats-blijven" className={h2}>
        Vrij bewegen én op zijn plaats blijven
      </h2>
      <p className="mt-4">
        Yogakleding mag ruim zijn, maar extreem losse kleding is niet altijd praktisch. Een wijd
        shirt kan bij een vooroverbuiging richting je gezicht zakken. Heel lange of wijde
        broekspijpen kunnen onder je voet komen. Kies daarom kleding die ruimte geeft en toch
        redelijk op zijn plaats blijft.
      </p>
      <p className="mt-4">
        Let ook op de tailleband. Die moet niet knellen wanneer je zit, maar evenmin afzakken
        wanneer je beweegt. Test doorschijnen bij daglicht als dat voor jou belangrijk is. Draag
        vooral iets waarin je je niet voortdurend bewust voelt van je kleding.
      </p>

      <h2 id="pas-je-kleding-aan-de-les-aan" className={h2}>
        Pas je kleding aan de les aan
      </h2>
      <p className="mt-4">
        Bekijk vooraf de beschrijving van de{" "}
        <Link to="/lessen" className={link}>
          yogalessen bij Yoga Zeeburg
        </Link>
        . Het verschil tussen een actieve Flow en een rustige Yin- of Nidra-les bepaalt vooral
        hoeveel warmte en beweging je kunt verwachten.
      </p>
      <h3 className={h3}>Voor Vinyasa of een actieve Flow</h3>
      <p className="mt-4">
        Bij een dynamische les krijg je het meestal warmer. Een ademende top met een legging of
        lichte sportshort werkt dan goed. Vermijd zware katoenen lagen die lang nat kunnen blijven
        als je veel zweet. Een bovenstuk dat goed blijft zitten voorkomt dat je het tijdens
        overgangen steeds hoeft recht te trekken.
      </p>
      <h3 className={h3}>Voor Yin, Nidra of een herstellende les</h3>
      <p className="mt-4">
        Bij rustige lessen blijf je langer in één houding en koel je makkelijker af. Zachte, iets
        ruimere kleding kan prettig zijn, zolang de docent je houding nog goed kan zien en de stof
        niet in de weg zit. Leg een vest, trui of paar sokken naast je mat voor de eindontspanning.
        Je kunt een laag altijd uittrekken wanneer je het warm krijgt.
      </p>
      <ArticleFigure
        image={INLINE_IMAGE}
        caption="Voor een actieve les werkt luchtige kleding goed; bij een rustige les kan een extra warme laag prettig zijn."
        className="mt-10"
      />

      <h2 id="yoga-op-blote-voeten-of-met-sokken" className={h2}>
        Yoga op blote voeten of met sokken?
      </h2>
      <p className="mt-4">
        Yoga wordt meestal op blote voeten gedaan. Zo heb je direct contact met de mat en glijd je
        minder snel in staande houdingen. Buitenschoenen blijven buiten de oefenruimte. Gewone
        sokken kunnen glad zijn tijdens beweging; trek ze daarom uit als je onvoldoende grip hebt.
      </p>
      <p className="mt-4">
        Tijdens rustige, liggende delen of de eindontspanning zijn schone sokken vaak wel prettig.
        Volg altijd de aanwijzingen van de docent en de studio. Heb je een persoonlijke reden om
        schoenen of aangepaste sokken te dragen, overleg dan vooraf wat veilig en praktisch is.
      </p>

      <h2 id="welke-materialen-zijn-prettig" className={h2}>
        Welke materialen zijn prettig?
      </h2>
      <p className="mt-4">
        Kies vooral op gevoel, temperatuur en wasgemak. Synthetische sportstoffen voeren vocht vaak
        snel af; katoen voelt zacht maar houdt vocht langer vast; mengstoffen kunnen een goede
        middenweg zijn. Voor rustige yoga zijn zachte, warme stoffen vaak fijn. Voor een
        intensievere les is een lichte, ademende stof meestal comfortabeler.
      </p>
      <p className="mt-4">
        Controleer of naden niet schuren en of de stof voldoende meerekt. Was nieuwe kleding een
        keer voordat je ermee naar de les gaat en vermijd sterke parfum of sterk geparfumeerd
        wasmiddel als je in een gedeelde ruimte oefent.
      </p>

      <h2 id="wat-kun-je-beter-niet-dragen" className={h2}>
        Wat kun je beter niet dragen?
      </h2>
      <p className="mt-4">
        Laat kleding en accessoires thuis die drukken, haken of veel aandacht vragen:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>broeken met een harde riem, grote knopen of grove ritsen;</li>
        <li>hoodies met een dikke capuchon als je veel op je rug ligt;</li>
        <li>volle zakken met telefoon, sleutels of pasjes;</li>
        <li>lange kettingen, grote oorbellen of losse armbanden;</li>
        <li>kleding die zo strak zit dat je ademhaling of beweging wordt beperkt;</li>
        <li>kleding die zo los is dat je erover struikelt of steeds aan moet trekken.</li>
      </ul>
      <p className="mt-4">
        Een hoofddoek, bril, haarband of ander persoonlijk hulpmiddel kan natuurlijk nodig of
        prettig zijn. Zorg vooral dat het stevig en comfortabel zit tijdens vooroverbuigen en
        bewegen. Voor lang haar is een lage staart, vlecht of zachte elastiek vaak fijner dan een
        harde klem wanneer je op je rug ligt.
      </p>

      <h2 id="de-bewegingstest-van-een-minuut" className={h2}>
        De bewegingstest van één minuut
      </h2>
      <p className="mt-4">
        Pas je outfit thuis en doe vier eenvoudige bewegingen: reik met beide armen omhoog, buig
        voorover, maak een diepe kniebuiging en ga op je rug liggen. Vraag jezelf af:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>kan ik vrij ademen en bewegen?</li>
        <li>blijft mijn bovenstuk redelijk op zijn plaats?</li>
        <li>knelt of schuurt er iets?</li>
        <li>blijven mijn broek en tailleband goed zitten?</li>
        <li>drukken ritsen, naden of een capuchon wanneer ik lig?</li>
      </ul>
      <p className="mt-4">
        Als je vijf keer tevreden antwoordt, is je outfit waarschijnlijk geschikt. Controleer daarna
        alleen nog het actuele{" "}
        <Link to="/rooster" className={link}>
          lesrooster
        </Link>{" "}
        en wat je wilt meenemen. Daarvoor helpt de aparte paklijst{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "wat-neem-je-mee-naar-je-eerste-yogales" }}
          className={link}
        >
          Wat neem je mee naar je eerste yogales?
        </Link>
        .
      </p>

      <h2 id="conclusie" className={h2}>
        Conclusie
      </h2>
      <p className="mt-4">
        Op de vraag “wat trek je aan naar een yogales?” is het korte antwoord: comfortabele kleding
        die meebeweegt en goed blijft zitten. Je hebt geen speciale yoga-outfit nodig. Kies bij een
        actieve les voor lichte, ademende kleding en bij een rustige les voor een extra warme laag.
        Doe thuis de korte bewegingstest, laat harde accessoires en volle zakken achterwege en kies
        vooral iets waarin jij je ongedwongen voelt.
      </p>
      <p className="mt-4">
        Twijfel je nog over de intensiteit? Lees dan{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "rustige-yoga-voor-beginners-welke-les-past-het-beste" }}
          className={link}
        >
          Rustige yoga voor beginners: welke les past het beste?
        </Link>
        .
      </p>
    </>
  );
}
