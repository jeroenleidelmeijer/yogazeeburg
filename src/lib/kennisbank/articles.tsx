import type { LucideIcon } from "lucide-react";
import { MapPin, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import waterHeroAsset from "@/assets/yoga-aan-het-water-hero.webp.asset.json";
import waterInlineAsset from "@/assets/yogamat-bolster-water.webp.asset.json";
import ijburgHeroAsset from "@/assets/yoga-ijburg-of-zeeburg-hoofdbeeld.webp.asset.json";
import ijburgInlineAsset from "@/assets/yoga-ijburg-of-zeeburg-route-en-yogamat.webp.asset.json";
import indischeHeroAsset from "@/assets/yoga-indische-buurt-hoofdbeeld.webp.asset.json";
import indischeInlineAsset from "@/assets/yoga-indische-buurt-yogamat-route.webp.asset.json";
import expatsHeroAsset from "@/assets/yoga-expats-amsterdam-east-hoofdbeeld.webp.asset.json";
import expatsInlineAsset from "@/assets/yoga-expats-nieuw-thuis-amsterdam.webp.asset.json";
import cruquiusHeroAsset from "@/assets/yoga-cruquius-amsterdam-hoofdbeeld.webp.asset.json";
import cruquiusInlineAsset from "@/assets/yoga-cruquius-dichtbij-huis.webp.asset.json";
import niveauHeroAsset from "@/assets/yoga-zeeburg-beginners-gevorderden-hoofdbeeld.webp.asset.json";
import niveauInlineAsset from "@/assets/yoga-zeeburg-les-op-jouw-niveau.webp.asset.json";
import goedeStudioHeroAsset from "@/assets/yoga-goede-yogastudio-hoofdbeeld.webp.asset.json";
import goedeStudioInlineAsset from "@/assets/yoga-goede-yogastudio-kwaliteitskenmerken.webp.asset.json";

const WATER_HERO_IMAGE: ArticleImageRef = {
  url: waterHeroAsset.url,
  alt: "Illustratie van een yogamat aan het water in Amsterdam Oost bij avondlicht.",
  width: 1600,
  height: 900,
};

const WATER_INLINE_IMAGE: ArticleImageRef = {
  url: waterInlineAsset.url,
  alt: "Illustratie van een rustige yogamat met bolster en uitzicht over het water.",
  width: 1600,
  height: 900,
};

const IJBURG_HERO_IMAGE: ArticleImageRef = {
  url: ijburgHeroAsset.url,
  alt: "Illustratie van IJburg en Zeeburg aan het water met een lege yogamat en yogablokken",
  width: 1600,
  height: 900,
};

const IJBURG_INLINE_IMAGE: ArticleImageRef = {
  url: ijburgInlineAsset.url,
  alt: "Illustratie van een fiets, routekaart, yogamat en yogablokken aan het water in Amsterdam Oost",
  width: 1600,
  height: 900,
};

const INDISCHE_HERO_IMAGE: ArticleImageRef = {
  url: indischeHeroAsset.url,
  alt: "Illustratie van een rustige straat aan het water in Amsterdam Oost met yogamat en kurkblokken.",
  width: 1600,
  height: 900,
};

const INDISCHE_INLINE_IMAGE: ArticleImageRef = {
  url: indischeInlineAsset.url,
  alt: "Illustratie van een yogamat, bolster en routekaart in een lichte ruimte in Amsterdam Oost.",
  width: 1600,
  height: 900,
};

const EXPATS_HERO_IMAGE: ArticleImageRef = {
  url: expatsHeroAsset.url,
  alt: "Illustratie van een rustige Amsterdamse gracht met fiets, yogamat en reistas.",
  width: 1600,
  height: 900,
};

const EXPATS_INLINE_IMAGE: ArticleImageRef = {
  url: expatsInlineAsset.url,
  alt: "Illustratie van yogaprops en een verhuisdoos in een lichte woning in Amsterdam.",
  width: 1600,
  height: 900,
};

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




export type { ArticleImageRef };

export type ArticleCategory = {
  slug: string;
  title: string;
  icon: LucideIcon;
};

export type ArticleFAQ = { question: string; answer: string };

export type ArticleTemplateOptions = {
  showTOC: boolean;
  showFAQ: boolean;
  showSources: boolean;
  showRelated: boolean;
};

export type ArticleTOCItem = { id: string; label: string };

export type Article = {
  slug: string;
  title: string;
  seoTitle: string;
  h1: string;
  description: string;
  intro?: string;
  category: ArticleCategory;
  type: "local-guide" | "explainer" | "how-to";
  pillar: boolean;
  publishedAt: string; // ISO date
  updatedAt: string; // ISO date
  readingTimeMin: number;
  toc: ArticleTOCItem[];
  faqs: ArticleFAQ[];
  sources?: { title: string; url: string }[];
  template: ArticleTemplateOptions;
  /** Optional hero image, rendered after the header/meta and before the TOC.
   *  Also used for og:image, twitter:image and Article JSON-LD `image`. */
  heroImage?: ArticleImageRef;
  body: () => ReactNode;
};

const GOEDE_STUDIO_HERO_IMAGE: ArticleImageRef = {
  url: goedeStudioHeroAsset.url,
  alt: "Rustige, verzorgde yogaruimte met twee lege matten, blokken, dekens en bolsters bij daglicht.",
  width: 1600,
  height: 900,
};

const GOEDE_STUDIO_INLINE_IMAGE: ArticleImageRef = {
  url: goedeStudioInlineAsset.url,
  alt: "Netjes opgeborgen yogablokken, dekens, riemen en bolsters naast een schone yogamat.",
  width: 1600,
  height: 900,
};

const CATEGORY_AMSTERDAM_OOST: ArticleCategory = {
  slug: "yoga-amsterdam-oost",
  title: "Yoga in Amsterdam Oost",
  icon: MapPin,
};

const CATEGORY_BEGINNEN_MET_YOGA: ArticleCategory = {
  slug: "beginnen-met-yoga",
  title: "Beginnen met yoga",
  icon: Sparkles,
};

const proeflesArticle: Article = {
  slug: "proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten",
  title: "Proefles yoga in Amsterdam Oost: wat kun je verwachten?",
  h1: "Proefles yoga in Amsterdam Oost: wat kun je verwachten?",
  seoTitle: "Proefles yoga Amsterdam Oost | Yoga Zeeburg",
  description:
    "Wat gebeurt er tijdens een proefles yoga in Amsterdam Oost? Praktische uitleg over lessen kiezen, voorbereiding, aankomst en hoe je rustig kennismaakt bij Yoga Zeeburg.",
  category: CATEGORY_AMSTERDAM_OOST,
  type: "local-guide",
  pillar: true,
  publishedAt: "2026-07-21",
  updatedAt: "2026-07-21",
  readingTimeMin: 9,
  toc: [
    { id: "kort-antwoord", label: "Kort antwoord" },
    { id: "les-kiezen", label: "Hoe kies je vooraf een passende yogales?" },
    { id: "voorbereiden", label: "Hoe bereid je je voor?" },
    { id: "aankomst", label: "Wat gebeurt er bij aankomst en tijdens de les?" },
    { id: "houding-niet-lukt", label: "Wat als je een houding niet kunt?" },
    { id: "na-de-les", label: "Wat voel je na een eerste les?" },
    { id: "een-les-genoeg", label: "Waarom is één losse les niet altijd genoeg?" },
    { id: "yoga-zeeburg", label: "Praktisch: Yoga Zeeburg in Amsterdam Oost" },
    { id: "verder", label: "Verder na je proefles" },
    { id: "faq", label: "Veelgestelde vragen" },
  ],
  faqs: [
    {
      question: "Moet ik lenig zijn om een proefles yoga te doen?",
      answer:
        "Nee. Lenigheid is geen voorwaarde, maar een mogelijk gevolg van regelmatig oefenen. Tijdens een proefles werk je binnen je eigen bereik. De docent geeft aan waar je een houding kunt aanpassen als iets nog niet lukt.",
    },
    {
      question: "Wat trek ik aan naar mijn eerste yogales?",
      answer:
        "Kleding waarin je makkelijk kunt bewegen en die niet strak op je middel drukt. Yoga doe je op blote voeten. Neem eventueel een extra laagje mee voor de rustigere delen aan het einde van de les.",
    },
    {
      question: "Welke les kan ik het beste kiezen als beginner?",
      answer:
        "Kijk in het rooster naar lessen die zichzelf omschrijven als toegankelijk, rustig of geschikt voor alle niveaus. Vermijd op je eerste les een sterk fysieke, snelle stijl als je nog geen ervaring hebt. Twijfel je? Stuur ons een korte vraag; we denken graag mee.",
    },
    {
      question: "Wat als ik een blessure heb of zwanger ben?",
      answer:
        "Meld dit vooraf of vertel het de docent voor de les begint, zodat er rekening mee gehouden kan worden. Yoga is geen medische behandeling; overleg bij twijfel eerst met je arts, verloskundige of behandelaar wat op dit moment verstandig is.",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: false,
    showRelated: true,
  },
  body: () => <ProeflesBody />,
};

function ProeflesBody() {
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
            Tijdens een proefles yoga in Amsterdam Oost kom je binnen, meld je je bij de docent,
            kies je een plek en leg je een matje neer. De les duurt meestal 60 tot 75 minuten en
            bestaat uit een rustige opening, een reeks houdingen op je eigen tempo en een korte
            ontspanning aan het einde.
          </p>
          <p>
            Je hoeft niet lenig te zijn, geen ervaring te hebben en geen complete outfit te kopen.
            Comfortabele kleding en blote voeten zijn voldoende. Je werkt binnen je eigen bereik en
            volgt aanpassingen als een houding nog niet lukt.
          </p>
          <p>
            Bij Yoga Zeeburg kun je met de{" "}
            <a
              href="/trial"
              className="font-medium text-primary underline underline-offset-4 hover:no-underline"
            >
              14-daagse Intro Pass
            </a>{" "}
            rustig verschillende lessen, docenten en tijden proberen voordat je een keuze maakt.
          </p>
        </div>
      </section>

      <h2
        id="les-kiezen"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Hoe kies je vooraf een passende yogales?
      </h2>
      <p className="mt-4">
        De belangrijkste aanwijzing bij het kiezen van een proefles is de naam en omschrijving van
        de les zelf. Studios geven daarin bewust aan voor wie een les bedoeld is: voor beginners,
        voor gevorderden, of voor alle niveaus. Lees die omschrijving rustig door voordat je boekt,
        ook als je haast hebt.
      </p>
      <p className="mt-4">
        Grofweg zijn er twee smaken. Een rustigere les werkt met langere houdingen, adem en aandacht
        — vaak herkenbaar aan woorden als hatha, yin, restorative of gentle. Een dynamischere les
        werkt met vloeiende overgangen en bouwt vaker een fysieke opbouw op — herkenbaar aan
        vinyasa, flow of power. Voor een eerste kennismaking is het meestal prettig om te starten
        met een les die als toegankelijk of geschikt voor alle niveaus omschreven staat, ongeacht
        welke stijl je uiteindelijk het prettigst gaat vinden.
      </p>
      <p className="mt-4">
        Bekijk het{" "}
        <a
          href="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          actuele rooster van Yoga Zeeburg
        </a>{" "}
        om te zien welke tijden en docenten er op dit moment lesgeven. Merk je dat je twijfelt, kies
        dan simpelweg de eerste les die qua tijd past — met een intro pass kun je later andere
        momenten testen.
      </p>

      <h2
        id="voorbereiden"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Hoe bereid je je voor?
      </h2>
      <p className="mt-4">
        De voorbereiding voor een eerste yogales is bewust minimaal. Je hebt niets speciaals nodig.
        Wat wel helpt:
      </p>
      <ul className="mt-4 space-y-3 pl-5 [list-style-type:disc]">
        <li>
          <strong>Kleding.</strong> Draag iets waarin je vrij kunt bewegen en dat niet strak op je
          middel drukt. Yoga doe je op blote voeten. Neem eventueel een extra laagje mee voor de
          rustige delen aan het einde, omdat je lichaam dan afkoelt.
        </li>
        <li>
          <strong>Eten en drinken.</strong> Kom niet met een zware maag. Een klein tussendoortje één
          tot twee uur van tevoren is prima. Drink water, maar niet vlak voor de les liters achter
          elkaar.
        </li>
        <li>
          <strong>Op tijd komen.</strong> Plan tien tot vijftien minuten speling in. Zo kun je
          rustig binnenkomen, je matje neerleggen en de docent kort iets vertellen als dat nodig is.
        </li>
        <li>
          <strong>Blessures of zwangerschap.</strong> Meld dit vooraf per bericht of vertel het de
          docent voor de les begint. Zo kan er gerichter naar je gekeken worden en kunnen
          aanpassingen worden voorgesteld waar dat helpt.
        </li>
        <li>
          <strong>Verwachtingen.</strong> Je hoeft niets te kunnen. Lenigheid, balans en
          concentratie ontwikkelen zich in de tijd — niet op één middag.
        </li>
      </ul>

      <h2
        id="aankomst"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat gebeurt er bij aankomst en tijdens de les?
      </h2>
      <p className="mt-4">
        Bij binnenkomst meld je jezelf even bij de docent, vooral als het je eerste keer is. Je kunt
        vragen waar je een plek kunt kiezen en of er iets specifieks is dat je moet weten. Het is
        normaal om iets van onzekerheid te voelen op je eerste les — dat hoort erbij en verdwijnt
        meestal binnen tien minuten.
      </p>
      <p className="mt-4">
        Een yogales begint doorgaans met een rustige opening: even zitten, adem opmerken en
        aankomen. Daarna volgt een opbouw van houdingen, vaak eerst staand of zittend, later
        mogelijk op de rug of buik. De docent legt uit wat de bedoeling is en geeft aanwijzingen om
        aanpassingen te doen. Aan het einde is er meestal een korte ontspanning — vaak in savasana,
        gewoon liggend op je rug — waarna de les afsluit.
      </p>
      <p className="mt-4">
        Tijdens de les hoef je niet mee te doen met alles. Je mag altijd een houding overslaan, een
        moment gaan zitten of iets aanpassen als dat voor jouw lichaam op dat moment beter is. Een
        goede docent moedigt dit expliciet aan en zal je niet in een houding duwen die niet past.
      </p>

      <h2
        id="houding-niet-lukt"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat als je een houding niet kunt?
      </h2>
      <p className="mt-4">
        Dan doe je iets anders. Serieus — dat is geen zwaktebod, dat is gewoon hoe yoga werkt.
        Iedere houding heeft variaties: makkelijker, korter, met steun. Kun je een houding niet, dan
        is de instructie meestal om terug te gaan naar een variant, even te rusten in child's pose,
        of simpelweg de adem te blijven volgen. Prestatie is geen doel; opmerken wat er wel of niet
        gaat op dit moment, is dat wel.
      </p>
      <p className="mt-4">
        Als je merkt dat je iets forceert of vasthoudt op adem, is dat een signaal om terug te
        schakelen. Yoga doet geen pijn. Ongemak in een lange rekhouding kan voorkomen, maar scherpe
        of stekende pijn is een reden om eruit te komen.
      </p>

      <h2
        id="na-de-les"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat voel je na een eerste les?
      </h2>
      <p className="mt-4">
        Ervaringen verschillen per persoon en per les. Sommige mensen voelen zich na een eerste
        yogales rustiger en helderder; anderen zijn juist wat moe of merken de dag erna iets van
        spierstijfheid. Beide zijn normaal. Wat je voelt hangt af van de stijl van de les, hoe jouw
        week eruitzag en of je gewend bent te bewegen.
      </p>
      <p className="mt-4">
        Waar je vooral op kunt letten, is het gevoel in de uren erna. Merk je dat je iets meer
        ruimte in je hoofd of je schouders hebt? Dat je iets makkelijker ademt? Dat is bruikbaardere
        informatie dan het antwoord op de vraag of je alle houdingen "goed" deed. Yoga is geen
        prestatie die je afvinkt; het is een oefening die zijn effect vooral laat zien over weken,
        niet in één sessie.
      </p>

      <h2
        id="een-les-genoeg"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Waarom is één losse les niet altijd genoeg om een goede keuze te maken?
      </h2>
      <p className="mt-4">
        Een enkele proefles vertelt je vooral iets over dat ene moment: die stijl, die docent, dat
        tijdstip en jouw dag tot dan toe. Dat is waardevol, maar niet altijd representatief. Een
        dynamische les op een drukke woensdagavond voelt anders dan een rustige les op een zaterdag
        — en welke docent lesgeeft maakt in yoga een aanzienlijk verschil in hoe een les op je
        overkomt.
      </p>
      <p className="mt-4">
        Voor de meeste mensen werkt het daarom beter om binnen een korte periode meerdere lessen te
        proberen: verschillende docenten, verschillende tijden en één rustige en één dynamischere
        stijl. Dat is precies waarom een intro pass zoals de 14-daagse Intro Pass bestaat: niet als
        korting, maar als kader om rustig te ontdekken welke vorm van yoga bij jouw week past.
      </p>

      <h2
        id="yoga-zeeburg"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Praktisch: Yoga Zeeburg in Amsterdam Oost
      </h2>
      <p className="mt-4">
        Yoga Zeeburg is een kleine, persoonlijke studio in Amsterdam Oost. Je vindt ons aan de{" "}
        <strong>Cruquiusweg 96F</strong>, boven CrossFit Zeeburg en aan het water. De sfeer is
        bewust rustig en niet-zweverig: de nadruk ligt op praktische, toegankelijke yoga voor mensen
        met een gewone volle week.
      </p>
      <p className="mt-4">
        Omdat de groepen niet groot zijn, is er ruimte voor persoonlijke aandacht. Docenten geven
        aanpassingen waar dat helpt en kennen na een paar lessen je naam. Dat maakt het makkelijker
        om terug te komen — wat uiteindelijk het enige is dat je op langere termijn iets oplevert.
      </p>
      <p className="mt-4">
        Meer weten over de buurt en welke lessen op welk moment aansluiten? Bekijk het{" "}
        <a
          href="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          rooster
        </a>{" "}
        of blader door de andere onderwerpen in de{" "}
        <a
          href="/kennisbank"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Yoga Gids
        </a>
        .
      </p>

      <h2
        id="verder"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Verder na je proefles
      </h2>
      <p className="mt-4">
        Als je proefles bevallen is, is de vervolgvraag zelden "welke stijl is het beste?" maar veel
        vaker "welk moment past het beste in mijn week?" Regelmaat wint het van intensiteit. Twee
        tot drie keer per week een toegankelijke les zal je meer opleveren dan één zware les die je
        vervolgens niet volhoudt.
      </p>
      <p className="mt-4">
        Kies bij voorkeur vaste tijdslots die je zonder onderhandeling in je agenda kunt zetten.
        Combineer een rustigere en een dynamischere les zodat je weekritme divers blijft. En geef
        jezelf de eerste maand vooral geen oordeel — je bent aan het verkennen, niet aan het
        presteren.
      </p>
    </>
  );
}

const welkeStudioArticle: Article = {
  slug: "yoga-in-amsterdam-oost-welke-yogastudio-past-bij-jou",
  title: "Yoga in Amsterdam Oost: welke yogastudio past bij jou?",
  h1: "Yoga in Amsterdam Oost: welke yogastudio past bij jou?",
  seoTitle: "Yoga in Amsterdam Oost: welke studio past? | Yoga Zeeburg",
  description:
    "Praktische keuzehulp voor een yogastudio in Amsterdam Oost: lesstijl, docent, sfeer, locatie, rooster en prijs — plus een korte checklist en eerlijke vergelijking.",
  category: CATEGORY_AMSTERDAM_OOST,
  type: "local-guide",
  pillar: false,
  publishedAt: "2026-07-21",
  updatedAt: "2026-07-21",
  readingTimeMin: 8,
  toc: [
    { id: "kort-antwoord", label: "Kort antwoord" },
    { id: "welke-past", label: "Welke yogastudio past bij jou?" },
    { id: "stijl-niveau", label: "Welke yogastijl en welk niveau zoek je?" },
    { id: "docent-sfeer", label: "Docent, sfeer en groepsgrootte" },
    { id: "locatie-rooster", label: "Locatie en rooster die je volhoudt" },
    { id: "proefaanbod-prijs", label: "Hoe vergelijk je proefaanbod en prijs?" },
    { id: "checklist", label: "Praktische checklist" },
    { id: "yoga-zeeburg", label: "Wanneer past Yoga Zeeburg bij jou?" },
    { id: "definitief", label: "Zo maak je de definitieve keuze" },
    { id: "faq", label: "Veelgestelde vragen" },
  ],
  faqs: [
    {
      question: "Hoeveel yogastudio's moet ik proberen?",
      answer:
        "Vaak volstaan twee tot drie studio's. Meer proeflessen leiden zelden tot een beter besluit; ze stellen het besluit vooral uit. Kies twee studio's die op papier passen bij je lesstijl, locatie en rooster, en beoordeel ze op dezelfde eerlijke criteria.",
    },
    {
      question: "Is een kleine of grote yogastudio beter?",
      answer:
        "Beter bestaat niet in het algemeen — het hangt af van wat je zoekt. Een kleinere studio biedt meestal meer persoonlijke aandacht en een rustigere sfeer; een grotere studio heeft vaak meer lestijden en stijlen. Belangrijker dan de omvang is of het rooster past en of je je op je gemak voelt bij de docenten.",
    },
    {
      question: "Welke yogales is geschikt voor beginners?",
      answer:
        "Kies een les die zichzelf in de omschrijving expliciet toegankelijk noemt of geschikt is voor alle niveaus. Termen als hatha, gentle of yin zijn vaak rustig en goed te volgen. Vermijd op je eerste les een sterk fysieke, snelle stijl als je nog geen ervaring hebt.",
    },
    {
      question: "Hoe weet ik na een proefles of een studio bij me past?",
      answer:
        "Let minder op wat er tijdens de les gebeurde en meer op hoe je je erna voelt en of je jezelf terug ziet gaan. Een studio past bij jou als het rooster werkt, de sfeer klopt en de drempel om terug te komen laag is. Twijfel je? Probeer binnen dezelfde week nog een tweede les bij een andere docent.",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: false,
    showRelated: true,
  },
  body: () => <WelkeStudioBody />,
};

function WelkeStudioBody() {
  return (
    <>
      <section
        id="kort-antwoord"
        aria-labelledby="kort-antwoord-heading-2"
        className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8"
      >
        <h2
          id="kort-antwoord-heading-2"
          className="font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl"
        >
          Kort antwoord
        </h2>
        <div className="mt-3 space-y-3 text-foreground">
          <p>
            De "beste" yogastudio in Amsterdam Oost bestaat niet in het algemeen — de beste studio
            voor jou wel. Die past bij jouw lesstijl, je niveau, je week en de plek waar je woont of
            werkt.
          </p>
          <p>
            De belangrijkste vraag is niet welke studio het mooiste interieur heeft, maar welke
            studio je daadwerkelijk regelmatig blijft bezoeken. Een rooster dat je volhoudt, is meer
            waard dan een theoretisch perfecte les die je één keer per maand haalt.
          </p>
          <p>
            In deze gids lopen we samen door de criteria die er echt toe doen, zodat je binnen twee
            tot drie proeflessen een goed onderbouwde keuze kunt maken.
          </p>
        </div>
      </section>

      <h2
        id="welke-past"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Welke yogastudio past bij jou?
      </h2>
      <p className="mt-4">
        Amsterdam Oost is een groot gebied — Zeeburg, Cruquius, IJburg, Indische Buurt, Oostelijk
        Havengebied, Watergraafsmeer. In dat gebied vind je uiteenlopende yogastudio's: van fysieke,
        dynamische vloeren tot kleine, persoonlijke studio's met rustige lessen. Dat maakt kiezen
        soms verwarrend, vooral als je net begint. De valkuil is dat je op zoek gaat naar objectief
        "de beste" studio, terwijl de vraag eigenlijk is welke studio past bij hoe jouw week
        eruitziet en wat je op dit moment nodig hebt.
      </p>
      <p className="mt-4">
        Neem als vertrekpunt dat een yogastudio pas werkt als je er daadwerkelijk komt. Dat klinkt
        vanzelfsprekend, maar veel mensen boeken een lidmaatschap op basis van sfeer of Instagram en
        merken pas na een paar weken dat het rooster of de reistijd in de praktijk niet past.
        Beoordeel een studio daarom op de nuchtere criteria hieronder, niet op eerste indruk.
      </p>

      <h2
        id="stijl-niveau"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Welke yogastijl en welk niveau zoek je?
      </h2>
      <p className="mt-4">
        Yoga is een verzamelnaam voor verschillende stijlen die onderling flink kunnen verschillen.
        Grofweg zijn er rustigere vormen — hatha, yin, restorative, gentle — waar houdingen langer
        worden vastgehouden en adem centraal staat. Daarnaast zijn er dynamischere vormen — vinyasa,
        flow, power, ashtanga — waar overgangen sneller gaan en de opbouw fysieker is.
      </p>
      <p className="mt-4">
        Welke stijl bij je past hangt af van wat je zoekt: rust en herstel, beweging en kracht, of
        een combinatie. Belangrijk: kijk niet alleen naar de <em>naam</em> van een les, maar ook
        naar de <em>omschrijving</em>. Twee lessen met dezelfde naam kunnen op twee studio's totaal
        anders aanvoelen. In een goede omschrijving lees je voor wie de les bedoeld is, wat de
        opbouw is en of aanpassingen worden aangeboden. Als die informatie ontbreekt, is dat op
        zichzelf al een signaal.
      </p>
      <p className="mt-4">
        Voor niveau geldt hetzelfde. Termen als "geschikt voor alle niveaus" of "toegankelijk" zijn
        een goede eerste indicatie dat je zonder ervaring welkom bent. Ben je onzeker? Kies bewust
        voor een rustigere stijl bij je eerste les, ongeacht welke stijl je uiteindelijk het
        prettigst gaat vinden.
      </p>

      <h2
        id="docent-sfeer"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Hoe belangrijk zijn docent, sfeer en groepsgrootte?
      </h2>
      <p className="mt-4">
        Aanzienlijk belangrijker dan de meeste mensen inschatten. Bij yoga maakt de docent een groot
        verschil in hoe een les op je overkomt. Twee vinyasa-lessen bij twee verschillende docenten
        kunnen radicaal anders aanvoelen — in tempo, aandacht, uitleg en muziek. Reken er dus op dat
        je binnen dezelfde studio verschillende docenten wilt proberen voordat je een oordeel vormt.
      </p>
      <p className="mt-4">
        Sfeer is subtieler maar even belangrijk. Voelt de studio als een plek waar je binnenkomt en
        je schouders al iets zakken? Of merk je een prestatiedruk, harde muziek of drukte die je
        juist opjaagt? Beide soorten sfeer hebben hun publiek; er is geen goed of fout, alleen wat
        past bij wat jij zoekt.
      </p>
      <p className="mt-4">
        Groepsgrootte hangt hiermee samen. Kleinere groepen bieden meestal meer ruimte voor
        persoonlijke aandacht en aanpassingen; grotere groepen hebben een andere dynamiek en vaak
        meer roosterkeuze. Neem mee wat voor jou werkt — en check bij een proefles hoe vol de les
        werkelijk zit op het tijdstip dat je van plan bent te gaan.
      </p>

      <h2
        id="locatie-rooster"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Kies een locatie en rooster die je echt volhoudt
      </h2>
      <p className="mt-4">
        Dit is misschien wel het meest onderschatte criterium. Een studio op tien minuten fietsen
        die je vier keer per maand haalt levert je meer op dan een prachtige studio op een half uur
        waar je alleen op zondagochtend komt. Reistijd is een sluipmoordenaar van goede voornemens.
      </p>
      <p className="mt-4">
        Bekijk daarom altijd het{" "}
        <a
          href="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          actuele rooster
        </a>{" "}
        voordat je een keuze maakt. Zijn er minstens twee tot drie momenten per week die zonder
        onderhandeling in je agenda passen? Zo niet, dan past de studio in de praktijk niet, hoe
        goed de lessen ook zijn. Regelmaat wint het van intensiteit — twee toegankelijke lessen per
        week doen op de lange termijn meer dan één zware les die je vaak overslaat.
      </p>

      <h2
        id="proefaanbod-prijs"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Hoe vergelijk je proefaanbod en prijs?
      </h2>
      <p className="mt-4">
        Bijna elke yogastudio biedt een vorm van kennismaking aan — een losse proefles, een
        introductieweek of een intro pass van één tot twee weken. Wat het meest oplevert, is een
        intro pass waarmee je binnen korte tijd meerdere lessen, docenten en tijdstippen kunt
        proberen. Eén losse les geeft je namelijk vooral informatie over dat ene moment; drie of
        vier lessen laten zien wat de studio structureel is. Voor een uitgebreidere uitleg over hoe
        zo'n eerste les eruitziet, zie ons artikel over{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          een proefles yoga in Amsterdam Oost
        </Link>
        .
      </p>
      <p className="mt-4">
        Voor prijs geldt: kijk niet naar de laagste prijs per les, maar naar de prijs per les die je
        daadwerkelijk gaat volgen. Een goedkoop rittenkaartje wordt duur als je het niet opmaakt.
        Een lidmaatschap wordt goedkoop als je twee tot drie keer per week komt. Reken het eerlijk
        door voordat je kiest — en houd rekening met opzegtermijnen of minimumtermijnen. Yoga
        Zeeburg biedt een{" "}
        <a
          href="/trial"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Bekijk onze 14-daagse Intro Pass
        </a>{" "}
        waarmee je in twee weken meerdere lessen kunt proberen voordat je beslist of een
        lidmaatschap past.
      </p>

      <h2
        id="checklist"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Praktische checklist voor je keuze
      </h2>
      <ul className="mt-4 space-y-3 pl-5 [list-style-type:disc]">
        <li>
          <strong>Lesstijl en omschrijving.</strong> Sluit de omschrijving aan bij wat jij zoekt —
          rust, beweging of een combinatie?
        </li>
        <li>
          <strong>Niveau en toegankelijkheid.</strong> Wordt duidelijk gemaakt voor wie een les
          bedoeld is en zijn aanpassingen mogelijk?
        </li>
        <li>
          <strong>Docent en persoonlijke aandacht.</strong> Krijg je een korte introductie voor je
          eerste les? Kent de docent je naam na een paar keer?
        </li>
        <li>
          <strong>Sfeer en groepsgrootte.</strong> Voelt het rustig genoeg om terug te komen? Is de
          groep behapbaar op het tijdstip dat jij komt?
        </li>
        <li>
          <strong>Locatie en reistijd.</strong> Zit de studio op een plek die je zonder omweg
          bereikt vanaf huis of werk?
        </li>
        <li>
          <strong>Rooster.</strong> Zijn er twee tot drie lestijden per week die structureel in je
          agenda passen?
        </li>
        <li>
          <strong>Prijs en proefaanbod.</strong> Reken de prijs per verwachte les uit; check het
          intro-aanbod en de voorwaarden.
        </li>
        <li>
          <strong>Materialen en voorzieningen.</strong> Zijn matjes, blokken en riemen aanwezig? Is
          er ruimte om rustig aan te komen?
        </li>
      </ul>

      <h2
        id="yoga-zeeburg"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wanneer past Yoga Zeeburg bij jou?
      </h2>
      <p className="mt-4">
        Yoga Zeeburg is een kleine, persoonlijke studio aan de <strong>Cruquiusweg 96F</strong>,
        boven CrossFit Zeeburg en aan het water in Amsterdam Oost. De sfeer is bewust rustig en
        niet-zweverig; de nadruk ligt op toegankelijke, praktische yoga voor mensen met een gewone
        volle week. Groepen zijn niet groot, waardoor er ruimte is voor persoonlijke aandacht en
        aanpassingen.
      </p>
      <p className="mt-4">
        Yoga Zeeburg past bij jou als je een plek zoekt in Zeeburg, Cruquius, de Indische Buurt of
        het Oostelijk Havengebied waar je in een kleine setting yoga wilt oefenen, met verschillende
        lessen, docenten en tijden om af te wisselen. Zoek je een grote, dynamische studio met
        tientallen lessen per dag, dan past een andere plek in Amsterdam waarschijnlijk beter — en
        dat is prima. We claimen niet objectief de beste te zijn; we zijn de beste optie voor het
        publiek dat past bij onze aanpak.
      </p>

      <h2
        id="definitief"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zo maak je de definitieve keuze
      </h2>
      <p className="mt-4">
        Kies twee tot drie studio's die op papier bij je passen op basis van stijl, locatie en
        rooster. Boek bij elk daarvan minstens één les op een tijdstip dat je structureel wilt
        bezoeken. Beoordeel na afloop drie dingen: hoe je je in de uren erna voelt, of het rooster
        realistisch in je week past, en of de drempel om opnieuw te boeken laag is. De studio waar
        die drie het beste kloppen, is voor dit moment jouw studio.
      </p>
      <p className="mt-4">
        Blader gerust ook door de{" "}
        <Link
          to="/kennisbank"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Yoga Gids
        </Link>{" "}
        voor meer praktische onderwerpen over yoga in Amsterdam Oost.
      </p>
    </>
  );
}

const beginnersArticle: Article = {
  slug: "yoga-voor-beginners-in-amsterdam-oost-zo-start-je",
  title: "Yoga voor beginners in Amsterdam Oost: zo start je",
  h1: "Yoga voor beginners in Amsterdam Oost: zo start je",
  seoTitle: "Yoga voor beginners Amsterdam Oost: zo start je | Yoga Zeeburg",
  description:
    "Concrete startroute voor yoga in Amsterdam Oost: hoe je je eerste les kiest, wat je nodig hebt, hoe vaak je gaat en hoe je rustig een routine opbouwt bij Yoga Zeeburg.",
  category: CATEGORY_AMSTERDAM_OOST,
  type: "how-to",
  pillar: false,
  publishedAt: "2026-07-21",
  updatedAt: "2026-07-21",
  readingTimeMin: 10,
  toc: [
    { id: "kort-antwoord", label: "Kort antwoord" },
    { id: "waarom-begin", label: "Waarom een goed begin het verschil maakt" },
    { id: "welke-les", label: "Welke yogales past bij jou als beginner?" },
    { id: "voorbereiden", label: "Wat heb je nodig — en wat juist niet?" },
    { id: "frequentie", label: "Hoe vaak in de week is realistisch?" },
    { id: "opbouwen", label: "Rustig en verantwoord opbouwen" },
    { id: "onzekerheden", label: "Veelvoorkomende onzekerheden bij starters" },
    { id: "eerste-stappen", label: "Concrete eerste stappen deze week" },
    { id: "yoga-zeeburg", label: "Zo begin je bij Yoga Zeeburg" },
    { id: "faq", label: "Veelgestelde vragen" },
  ],
  faqs: [
    {
      question: "Ben ik te onervaren om aan yoga te beginnen?",
      answer:
        "Nee. Iedere yogastudent is een keer onervaren begonnen. Kies een les die zichzelf omschrijft als toegankelijk of geschikt voor alle niveaus en volg de aanwijzingen van de docent. Aanpassingen zijn een normaal onderdeel van yoga, geen uitzondering voor beginners.",
    },
    {
      question: "Hoe vaak per week moet ik naar yoga gaan als beginner?",
      answer:
        "Voor de meeste beginners werkt twee keer per week goed. Dat is genoeg om houdingen en adem te leren herkennen, en weinig genoeg om je week niet te overbelasten. Eén keer per week kan ook — dan gaat de opbouw simpelweg trager. Meer dan drie keer per week is als starter zelden nodig.",
    },
    {
      question: "Moet ik eerst thuis oefenen voordat ik naar een les ga?",
      answer:
        "Nee. Yoga leer je juist door in een les te zijn: de docent geeft aanwijzingen, corrigeert waar nodig en zorgt voor een logische opbouw. Video's thuis kunnen later een aanvulling zijn, maar zijn geen voorwaarde om te starten.",
    },
    {
      question: "Wat als ik na één les niet weet of yoga bij me past?",
      answer:
        "Dan is dat een normaal signaal, geen probleem. Eén les zegt vooral iets over dat moment: die stijl, die docent, die dag. Probeer binnen twee weken twee tot drie verschillende lessen op verschillende tijden. Pas daarna heb je genoeg informatie om iets te vinden dat structureel past.",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: false,
    showRelated: true,
  },
  body: () => <BeginnersBody />,
};

function BeginnersBody() {
  return (
    <>
      <section
        id="kort-antwoord"
        aria-labelledby="kort-antwoord-heading-3"
        className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8"
      >
        <h2
          id="kort-antwoord-heading-3"
          className="font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl"
        >
          Kort antwoord
        </h2>
        <div className="mt-3 space-y-3 text-foreground">
          <p>
            Beginnen met yoga in Amsterdam Oost doe je in drie stappen: kies een les die zichzelf
            toegankelijk noemt, plan twee vaste momenten per week in en geef jezelf de eerste maand
            geen oordeel. Je hoeft niets te kunnen, niets bijzonders aan te schaffen en geen
            ervaring te hebben.
          </p>
          <p>
            De belangrijkste beslissing is niet <em>welke</em> stijl je kiest, maar of het tijdstip
            realistisch in jouw week past. Regelmaat wint het van intensiteit — twee rustige lessen
            per week doen op de lange termijn meer dan één zware les die je vaak overslaat.
          </p>
          <p>
            In deze gids lopen we praktisch door de eerste weken: hoe je een passende les kiest, wat
            je meeneemt, hoe vaak je realistisch gaat en hoe je stap voor stap een routine opbouwt
            die je écht volhoudt.
          </p>
        </div>
      </section>

      <h2
        id="waarom-begin"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Waarom een goed begin het verschil maakt
      </h2>
      <p className="mt-4">
        De meeste mensen die stoppen met yoga stoppen niet omdat yoga tegenviel — ze stoppen omdat
        de start niet aansloot bij hun week. Een te fysieke eerste les, een tijdstip dat toch niet
        past, of het gevoel dat iedereen om je heen al lang meedoet. Dat zijn geen yogaproblemen;
        dat zijn startproblemen. En die zijn te voorkomen.
      </p>
      <p className="mt-4">
        Beginnen met yoga is minder een sportieve keuze en meer een organisatorische. De vraag is
        niet hoeveel push-ups je kunt, maar of je twee vaste momenten per week structureel vrij kunt
        houden. Wie die momenten eerlijk in kaart brengt voordat de eerste les geboekt wordt, heeft
        de grootste kans om het vol te houden.
      </p>
      <p className="mt-4">
        Amsterdam Oost heeft daarbij een praktisch voordeel: alles ligt dichtbij en bereikbaar. In
        Zeeburg, Cruquius, de Indische Buurt of het Oostelijk Havengebied ben je met de fiets binnen
        tien tot vijftien minuten bij een studio. Dat maakt structurele beoefening een stuk
        makkelijker dan wanneer je eerst een half uur moet reizen.
      </p>

      <h2
        id="welke-les"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Welke yogales past bij jou als beginner?
      </h2>
      <p className="mt-4">
        Voor een eerste periode kies je een les die in de omschrijving expliciet{" "}
        <strong>toegankelijk</strong>, <strong>rustig</strong> of{" "}
        <strong>geschikt voor alle niveaus</strong> is. Dat zegt meer dan de stijlnaam op zichzelf.
        Een vinyasa-les kan bij de ene docent toegankelijk zijn en bij de andere pittig; de
        omschrijving is de betrouwbaardere aanwijzing.
      </p>
      <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-foreground">
        Rustigere stijlen om mee te starten
      </h3>
      <p className="mt-3">
        Hatha, yin, restorative en gentle zijn stijlen waar houdingen langer worden vastgehouden en
        adem centraal staat. Voor beginners zijn ze prettig omdat je tijd hebt om te snappen wat er
        gebeurt in je lichaam, in plaats van houdingen te volgen op tempo. Je bouwt aandacht en
        lichaamsgevoel op — de basis voor alles daarna.
      </p>
      <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-foreground">
        Dynamischere stijlen — pas na een paar weken
      </h3>
      <p className="mt-3">
        Vinyasa, flow en power gaan sneller en zijn fysieker. Ze zijn niet moeilijker in de zin van
        "gevorderd", maar ze vragen wel dat je de basisnamen van houdingen enigszins kent. Als je
        nul ervaring hebt, is het rustiger om deze pas te proberen na drie tot vier toegankelijke
        lessen. Je ziet er dan meer van, in plaats van vooral de docent te proberen bij te houden.
      </p>
      <p className="mt-4">
        Twijfel je nog? Kies simpelweg de eerste toegankelijke les die qua tijd goed uitkomt. Met
        een intro pass kun je later andere stijlen en docenten toetsen. Voor een uitgebreidere
        vergelijking van studio's kun je ons artikel over{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-in-amsterdam-oost-welke-yogastudio-past-bij-jou" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          welke yogastudio past bij jou in Amsterdam Oost
        </Link>{" "}
        lezen.
      </p>

      <h2
        id="voorbereiden"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat heb je nodig — en wat juist niet?
      </h2>
      <p className="mt-4">
        Beginnen met yoga vraagt bewust weinig materiaal. Alles wat je in de eerste weken écht nodig
        hebt, heb je waarschijnlijk al thuis:
      </p>
      <ul className="mt-4 space-y-3 pl-5 [list-style-type:disc]">
        <li>
          <strong>Kleding waarin je beweegt.</strong> Een legging of joggingbroek en een T-shirt of
          longsleeve zijn prima. Vermijd kleding die strak op je middel drukt. Je hoeft geen
          speciale yoga-outfit te kopen — dat is later hooguit een prettige, geen voorwaarde.
        </li>
        <li>
          <strong>Blote voeten.</strong> Yoga doe je zonder schoenen en meestal zonder sokken. Extra
          sokken meenemen voor de rustige delen aan het einde kan prettig zijn, omdat je lichaam dan
          afkoelt.
        </li>
        <li>
          <strong>Water.</strong> Neem een flesje mee, maar drink niet vlak voor de les liters
          achter elkaar.
        </li>
        <li>
          <strong>Een matje?</strong> In veel studio's zijn matjes, blokken en riemen aanwezig.
          Vraag dit vooraf, dan hoef je op je eerste les niets te sjouwen.
        </li>
      </ul>
      <p className="mt-4">
        Wat je vooral <em>niet</em> nodig hebt: een spirituele voorbereiding, een leeg hoofd of het
        gevoel dat je "er klaar voor" bent. Yoga is er juist voor mensen met een druk hoofd en een
        volle week. Je hoeft niets weg te werken voordat je begint.
      </p>

      <h2
        id="frequentie"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Hoe vaak in de week is realistisch?
      </h2>
      <p className="mt-4">
        Voor de meeste beginners werkt twee keer per week goed. Dat is genoeg om houdingen te
        herkennen, adem te leren volgen en effect te merken. En het is weinig genoeg om je week niet
        te overbelasten, zodat je niet na drie weken uitgeput afhaakt.
      </p>
      <p className="mt-4">
        Kies daarbij bij voorkeur <strong>twee vaste momenten</strong> in de week, geen zwevende
        tijden. Bijvoorbeeld dinsdagavond en zaterdagochtend, of maandagavond en donderdagochtend.
        Vaste momenten onderhandel je niet meer met jezelf, en dat is precies waarom ze werken.
        Zwevende plannen ("ik ga twee keer, ergens deze week") verliezen bijna altijd van een drukke
        agenda.
      </p>
      <p className="mt-4">
        Combineer waar mogelijk één rustigere en één dynamischere les. Zo krijg je afwisseling én
        zie je zelf welke vorm je op de lange termijn prettiger vindt. Bekijk het{" "}
        <a
          href="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          actuele lesrooster
        </a>{" "}
        en zoek twee blokken die in je week passen zonder omweg. Als je die niet vindt, is dat
        waardevolle informatie: dan past die studio in de praktijk niet, hoe goed de lessen ook
        zijn.
      </p>

      <h2
        id="opbouwen"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Rustig en verantwoord opbouwen
      </h2>
      <p className="mt-4">
        Yoga hoort geen pijn te doen. Rekken kan intens voelen en spieren kunnen de dag erna wat
        stijver zijn — dat hoort erbij. Scherpe of stekende pijn tijdens een houding is echter een
        reden om eruit te komen, niet om door te zetten. De docent zal dit vaak expliciet benoemen;
        volg dat op.
      </p>
      <p className="mt-4">
        Twee praktische regels voor de eerste weken. Eén: als je adem stokt of oppervlakkig wordt,
        schakel je terug. Rustig kunnen ademen is een goede indicator dat je binnen je bereik werkt.
        Twee: variaties zijn geen zwaktebod. Iedere houding heeft makkelijker en zwaarder varianten;
        de makkelijkere kiezen is een oefening, geen concessie.
      </p>
      <p className="mt-4">
        Heb je bestaande klachten of ben je zwanger? Meld dit voor de les aan de docent, zodat
        aanpassingen kunnen worden voorgesteld. Yoga is geen medische behandeling — bij twijfel
        overleg je eerst met je arts, verloskundige of behandelaar wat op dit moment verstandig is.
      </p>

      <h2
        id="onzekerheden"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Veelvoorkomende onzekerheden bij starters
      </h2>
      <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-foreground">
        "Ik ben niet lenig genoeg."
      </h3>
      <p className="mt-3">
        Lenigheid is geen voorwaarde voor yoga; het is een mogelijk gevolg van regelmatig oefenen.
        Beginnen mét stijve hamstrings of schouders is eerder de regel dan de uitzondering. Sterker:
        mensen die zichzelf niet lenig noemen, merken vaak sneller effect omdat er meer ruimte te
        winnen valt.
      </p>
      <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-foreground">
        "Iedereen om me heen weet wat ze doen."
      </h3>
      <p className="mt-3">
        Dat lijkt zo, maar in de praktijk kijkt vrijwel niemand naar wat de rest doet. Bijna elke
        yogastudent is met dezelfde onzekerheid ooit begonnen. Kies bewust een plek iets achterin de
        zaal als dat je helpt, en volg gewoon de docent.
      </p>
      <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-foreground">
        "Ik heb geen tijd."
      </h3>
      <p className="mt-3">
        Vaak niet echt waar — meestal is het geen tijd voor onduidelijke momenten. Twee vaste
        blokken van 60 tot 75 minuten per week vind je bijna altijd, mits je ze eerlijk plant.
        Behandel ze als een afspraak met iemand anders; dan schuiven ze ook niet zomaar.
      </p>
      <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-foreground">
        "Ik weet niet of ik het langer volhoud dan een maand."
      </h3>
      <p className="mt-3">
        Dat hoef je nu ook niet te weten. De vraag voor de eerste maand is alleen of je de twee
        gekozen momenten haalt. Effect zien is vervolgvraag, niet startvraag.
      </p>

      <h2
        id="eerste-stappen"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Concrete eerste stappen deze week
      </h2>
      <ol className="mt-4 space-y-3 pl-5 [list-style-type:decimal]">
        <li>
          <strong>Kies twee tijdslots.</strong> Kijk in je agenda naar de komende twee weken en
          markeer twee blokken van 90 minuten (les + reistijd) die realistisch vrij zijn. Niet
          ideaal, maar echt vrij.
        </li>
        <li>
          <strong>Bekijk het rooster.</strong> Zoek in het{" "}
          <a
            href="/rooster"
            className="font-medium text-primary underline underline-offset-4 hover:no-underline"
          >
            actuele lesrooster
          </a>{" "}
          twee toegankelijke lessen die op die momenten vallen.
        </li>
        <li>
          <strong>Boek beide lessen tegelijk.</strong> Niet één en dan "we zien wel". Twee gelijk
          geboekte lessen maken de start automatisch een routine, geen experiment.
        </li>
        <li>
          <strong>Leg je kleding klaar.</strong> Zet je tas de avond ervoor klaar. Kleine drempels
          weghalen bij de start scheelt op moeilijke dagen.
        </li>
        <li>
          <strong>Beoordeel na twee weken.</strong> Niet na één les. Kijk naar hoe je week aanvoelde
          en of je jezelf terug ziet gaan. Dat is bruikbaardere informatie dan of je alle houdingen
          "goed" deed.
        </li>
      </ol>
      <p className="mt-4">
        Meer weten over hoe zo'n eerste les er concreet uitziet? Lees ons artikel over{" "}
        <Link
          to="/kennisbank/$slug"
          params={{
            slug: "proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten",
          }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          een proefles yoga in Amsterdam Oost
        </Link>
        .
      </p>

      <h2
        id="yoga-zeeburg"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zo begin je bij Yoga Zeeburg
      </h2>
      <p className="mt-4">
        Yoga Zeeburg is een kleine, persoonlijke studio aan de <strong>Cruquiusweg 96F</strong> in
        Amsterdam Oost, boven CrossFit Zeeburg en aan het water. De studio is bewust ingericht op
        mensen die met een gewone volle week toch een yogaroutine willen opbouwen — geen
        prestatiedruk, geen zweverigheid, wel persoonlijke aandacht.
      </p>
      <p className="mt-4">
        Voor beginners werkt een intro pass prettig: in twee weken kun je meerdere toegankelijke
        lessen op verschillende tijden en bij verschillende docenten proberen, zodat je zonder haast
        een routine kunt uitzoeken die daadwerkelijk in je week past.{" "}
        <a
          href="/trial"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Bekijk onze 14-daagse Intro Pass
        </a>
        .
      </p>
      <p className="mt-4">
        Meer achtergrond over yoga in de buurt? Blader door de{" "}
        <Link
          to="/kennisbank"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Yoga Gids
        </Link>{" "}
        voor andere praktische onderwerpen.
      </p>
    </>
  );
}

const kantoorArticle: Article = {
  slug: "yoga-voor-kantoormedewerkers-in-amsterdam-oost",
  title: "Yoga voor kantoormedewerkers in Amsterdam Oost",
  h1: "Yoga voor kantoormedewerkers in Amsterdam Oost",
  seoTitle: "Yoga voor kantoormedewerkers in Amsterdam Oost",
  description:
    "Veel zitten en een drukke werkdag? Ontdek welke yoga past bij kantoormedewerkers in Amsterdam Oost en hoe je een les kiest die je volhoudt.",
  intro:
    "Na een dag achter je bureau kan yoga helpen om weer te bewegen, je aandacht te verleggen en bewust tijd voor jezelf te maken. Zo kies je een passende yogales in Amsterdam Oost.",
  category: CATEGORY_AMSTERDAM_OOST,
  type: "local-guide",
  pillar: false,
  publishedAt: "2026-07-28",
  updatedAt: "2026-07-28",
  readingTimeMin: 8,
  toc: [
    { id: "direct-antwoord", label: "Direct antwoord" },
    { id: "waarom-prettig", label: "Waarom yoga prettig kan zijn na een kantoordag" },
    { id: "welke-les", label: "Welke yogales past na een werkdag?" },
    { id: "niet-alleen-schouders", label: "Let niet alleen op stijve schouders" },
    { id: "haalbaar", label: "Zo maak je yoga haalbaar naast je werk" },
    { id: "bureaubreak", label: "Een korte bureaubreak is nuttig, maar geen yogales" },
    { id: "eerste-les", label: "Wat neem je mee naar je eerste les?" },
    { id: "conclusie", label: "Conclusie" },
    { id: "faq", label: "Veelgestelde vragen" },
  ],
  faqs: [
    {
      question: "Moet je lenig zijn om met yoga te beginnen?",
      answer:
        "Nee. Lenigheid is geen toelatingseis. Je werkt binnen je eigen bewegingsruimte en gebruikt waar nodig een eenvoudigere variant of hulpmiddel.",
    },
    {
      question: "Welke yoga is fijn na een dag achter de computer?",
      answer:
        "Dat hangt af van je behoefte. Vinyasa past vaak bij mensen die actief willen bewegen; Yin yoga bij mensen die vooral willen vertragen. Probeer beide als je nog niet weet wat bij je past.",
    },
    {
      question: "Helpt yoga tegen nek- en schouderklachten?",
      answer:
        "Bewegen en ontspannen kan prettig voelen, maar yoga is geen vervanging voor onderzoek of behandeling. Laat aanhoudende, ernstige of onverklaarde klachten beoordelen door een gekwalificeerde zorgprofessional en informeer je yogadocent.",
    },
    {
      question: "Hoe vaak per week is yoga zinvol naast kantoorwerk?",
      answer:
        "Eén vast moment per week is een haalbaar begin. Regelmaat is meestal belangrijker dan ambitieus starten en na korte tijd stoppen. Je kunt later altijd een extra les toevoegen.",
    },
    {
      question: "Kan ik direct vanuit kantoor naar een yogales?",
      answer:
        "Ja. Neem comfortabele kleding mee en plan voldoende reistijd om rustig aan te komen. Controleer vooraf het actuele lesrooster en kom voor je eerste bezoek iets eerder.",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: false,
    showRelated: true,
  },
  body: () => <KantoorBody />,
};

function KantoorBody() {
  return (
    <>
      <p className="mt-4">
        Wie veel achter een laptop zit, herkent het vaak: aan het einde van de werkdag voelt je
        lichaam stijf en blijft je hoofd nog op kantoorstand staan. Yoga kan dan een praktisch
        overgangsmoment zijn tussen werken en de rest van je dag. Je hoeft daarvoor niet lenig te
        zijn en ook geen ervaring te hebben. De belangrijkste keuze is een les die past bij je
        energie, je lichaam en je agenda.
      </p>

      <section
        id="direct-antwoord"
        aria-labelledby="direct-antwoord-heading"
        className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8"
      >
        <h2
          id="direct-antwoord-heading"
          className="font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl"
        >
          Direct antwoord
        </h2>
        <div className="mt-3 space-y-3 text-foreground">
          <p>
            Yoga voor kantoormedewerkers combineert bewegen, bewust ademen en aandacht. Na veel
            zitten kan een les prettig zijn om je hele lichaam weer te gebruiken en je werkdag
            bewust af te sluiten. Een actieve les past vaak goed als je behoefte hebt aan beweging;
            een rustige les als je vooral wilt vertragen. Kies bij voorkeur een studio dichtbij huis
            of werk en een lestijd die je wekelijks kunt volhouden.
          </p>
        </div>
      </section>

      <h2
        id="waarom-prettig"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Waarom yoga prettig kan zijn na een kantoordag
      </h2>
      <p className="mt-4">
        Kantoorwerk vraagt meestal weinig afwisseling van je lichaam en juist veel van je
        concentratie. Je zit lang in dezelfde houding, kijkt uren naar een scherm en schakelt
        voortdurend tussen berichten, vergaderingen en taken. Daardoor kun je aan het einde van de
        dag het gevoel hebben dat je tegelijk moe én onrustig bent.
      </p>
      <p className="mt-4">
        Een yogales doorbreekt dat patroon. Je staat op van je stoel, beweegt in verschillende
        richtingen en brengt je aandacht terug naar wat je op dat moment voelt en doet. Dat maakt
        yoga niet alleen een vorm van bewegen, maar ook een duidelijke grens tussen werk en vrije
        tijd.
      </p>
      <p className="mt-4">
        Yoga is geen medische behandeling voor aanhoudende pijn of andere klachten. Heb je ernstige,
        onverklaarde of terugkerende klachten, laat die dan beoordelen door een gekwalificeerde
        zorgprofessional en bespreek met je docent welke aanpassingen verstandig zijn.
      </p>

      <h2
        id="welke-les"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Welke yogales past na een werkdag?
      </h2>
      <p className="mt-4">
        Er bestaat niet één beste yogastijl voor iedereen met een kantoorbaan. Kijk vooral naar wat
        jij na je werk nodig hebt.
      </p>

      <h3 className="mt-8 font-display text-xl font-medium tracking-tight text-foreground">
        Als je weer wilt bewegen
      </h3>
      <p className="mt-3">
        Een dynamische les, zoals Vinyasa, kan fijn zijn wanneer je na veel zitten behoefte hebt aan
        een actieve, vloeiende training. Houdingen lopen in elkaar over en je gebruikt het hele
        lichaam. Je hoeft niet snel of perfect mee te kunnen doen: een goede docent geeft opties
        waarmee je op je eigen niveau kunt bewegen.
      </p>

      <h3 className="mt-8 font-display text-xl font-medium tracking-tight text-foreground">
        Als je vooral wilt vertragen
      </h3>
      <p className="mt-3">
        Na een volle dag met veel prikkels kan een rustige les beter passen. Bij Yin yoga blijf je
        langer in houdingen en ligt het tempo laag. Dat vraagt minder schakelen en geeft ruimte om
        bewust tot rust te komen. Rustig betekent overigens niet dat iedere houding automatisch
        gemakkelijk voelt; ook hier mag je altijd minder diep gaan of een houding aanpassen.
      </p>

      <h3 className="mt-8 font-display text-xl font-medium tracking-tight text-foreground">
        Als je nog niet weet wat bij je past
      </h3>
      <p className="mt-3">
        Begin dan niet met eindeloos vergelijken. Probeer verschillende lessen en let na afloop op
        drie dingen:
      </p>
      <ol className="mt-4 space-y-2 pl-5 [list-style-type:decimal]">
        <li>Voelt je lichaam prettiger dan vóór de les?</li>
        <li>Is je hoofd rustiger of helderder?</li>
        <li>Zou je deze les en dit tijdstip wekelijks willen herhalen?</li>
      </ol>
      <p className="mt-4">Die antwoorden zeggen meestal meer dan de naam van de yogastijl.</p>

      <h2
        id="niet-alleen-schouders"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Let niet alleen op stijve schouders
      </h2>
      <p className="mt-4">
        Bij bureauwerk gaat de aandacht vaak direct naar nek en schouders. Toch is het verstandiger
        om je hele lichaam te bewegen. Lang zitten betekent ook dat je heupen en benen weinig
        variatie krijgen en dat je romp lang in ongeveer dezelfde positie blijft.
      </p>
      <p className="mt-4">
        Een complete yogales bevat daarom niet alleen bewegingen voor het bovenlichaam, maar
        bijvoorbeeld ook staande houdingen, rotaties, balans en rustige momenten. Het doel is niet
        om één plek zo hard mogelijk op te rekken. Het gaat om afwisseling, controle en bewegen
        binnen een bereik dat voor jou prettig voelt.
      </p>

      <h2
        id="haalbaar"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zo maak je yoga haalbaar naast je werk
      </h2>
      <p className="mt-4">
        De beste les is uiteindelijk de les waar je daadwerkelijk naartoe gaat. Maak de drempel
        daarom klein.
      </p>
      <ul className="mt-4 space-y-3 pl-5 [list-style-type:disc]">
        <li>Kies een studio dichtbij huis, werk of je vaste reisroute.</li>
        <li>Zet de les als terugkerende afspraak in je agenda.</li>
        <li>Neem comfortabele kleding mee, zodat je niet eerst naar huis hoeft.</li>
        <li>Begin met één vast moment per week.</li>
        <li>Kies op drukke dagen voor haalbaar in plaats van perfect.</li>
        <li>Vertel de docent vooraf dat je nieuw bent of ergens rekening mee wilt houden.</li>
      </ul>
      <p className="mt-4">
        Woon of werk je in Amsterdam Oost, dan helpt een locatie in de buurt om van yoga een vaste
        gewoonte te maken. Yoga Zeeburg ligt aan de Cruquiusweg, boven CrossFit Zeeburg en aan het
        water. De studio is kleinschalig, persoonlijk en beginnersvriendelijk.
      </p>
      <p className="mt-4">
        Wil je ontdekken welke les na jouw werkdag past? Probeer dan via{" "}
        <Link
          to="/trial"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          /trial
        </Link>{" "}
        verschillende lessen, docenten en tijden met de 14-daagse Intro Pass.
      </p>

      <h2
        id="bureaubreak"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Een korte bureaubreak is nuttig, maar geen yogales
      </h2>
      <p className="mt-4">
        Je hoeft niet tot de avond te wachten om van houding te veranderen. Even opstaan, een stukje
        lopen, je blik van het scherm halen en rustig bewegen kan je werkdag al onderbreken. Zulke
        korte pauzes zijn vooral waardevol omdat ze je zittijd doorbreken.
      </p>
      <p className="mt-4">
        Een volledige yogales heeft een ander voordeel: je reserveert langere tijd zonder laptop,
        taken of meldingen. Daardoor hoef je niet zelf steeds te bedenken wat je gaat doen en kun je
        onder begeleiding bewegen. Een bureaubreak en een yogales hoeven elkaar dus niet te
        vervangen; ze kunnen elkaar juist aanvullen.
      </p>

      <h2
        id="eerste-les"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat neem je mee naar je eerste les?
      </h2>
      <p className="mt-4">
        Comfortabele kleding waarin je vrij kunt bewegen is voldoende. Je hoeft geen speciale
        yoga-outfit te kopen en je hoeft vooraf geen houdingen te oefenen. Kom iets eerder, vertel
        de docent dat het je eerste les is en geef aan wanneer een houding niet prettig voelt.
      </p>
      <p className="mt-4">
        Bekijk voor vertrek altijd het actuele lesrooster via{" "}
        <Link
          to="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          /schedule
        </Link>
        . Zo kies je een les die past bij je werkdag en voorkom je haast.
      </p>

      <h2
        id="conclusie"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Conclusie
      </h2>
      <p className="mt-4">
        Yoga kan voor kantoormedewerkers een praktisch moment zijn om na veel zitten weer te bewegen
        en de werkdag bewust af te sluiten. Kies een actieve les wanneer je energie kwijt wilt, een
        rustige les wanneer je wilt vertragen, en probeer meerdere opties als je nog twijfelt. De
        grootste kans dat je het volhoudt ontstaat wanneer de locatie, lestijd en sfeer echt bij je
        dagelijks leven passen.
      </p>
    </>
  );
}

const keuzeArticle: Article = {
  slug: "yogales-in-amsterdam-waar-moet-je-op-letten-bij-je-keuze",
  title: "Yogales in Amsterdam: waar moet je op letten bij je keuze?",
  h1: "Yogales in Amsterdam: waar moet je op letten bij je keuze?",
  seoTitle: "Yogales in Amsterdam kiezen: 7 aandachtspunten",
  description:
    "Zoek je een yogales in Amsterdam? Vergelijk locatie, lesstijl, niveau, docent, sfeer, rooster en aanbod en kies een studio die je kunt volhouden.",
  intro:
    "Een goede yogales past niet alleen bij wat je wilt leren, maar ook bij je niveau, agenda en de sfeer waarin jij prettig beweegt. Met deze zeven aandachtspunten vergelijk je yogastudio’s in Amsterdam zonder te verdwalen in lesnamen en aanbiedingen.",
  category: CATEGORY_AMSTERDAM_OOST,
  type: "local-guide",
  pillar: false,
  publishedAt: "2026-07-28",
  updatedAt: "2026-07-28",
  readingTimeMin: 8,
  toc: [
    { id: "direct-antwoord", label: "Direct antwoord" },
    { id: "doel", label: "1. Begin bij je doel" },
    { id: "lesstijl", label: "2. Kijk verder dan de naam van de les" },
    { id: "niveau", label: "3. Controleer niveau en begeleiding" },
    { id: "docent", label: "4. Let op de docent, niet alleen op de studio" },
    { id: "locatie", label: "5. Maak locatie en reistijd onderdeel van je keuze" },
    { id: "rooster", label: "6. Kies een rooster dat in je echte week past" },
    { id: "sfeer", label: "7. Ervaar de sfeer zelf" },
    { id: "aanbod", label: "Vergelijk een proefles, introductiepas en lidmaatschap" },
    { id: "rode-vlaggen", label: "Wanneer past een studio waarschijnlijk niet bij je?" },
    { id: "keuzehulp", label: "Een snelle keuzehulp" },
    { id: "conclusie", label: "Conclusie" },
    { id: "faq", label: "Veelgestelde vragen" },
  ],
  faqs: [
    {
      question: "Welke yogales is het beste voor beginners?",
      answer:
        "Een les met duidelijke uitleg, ruimte voor aanpassingen en een docent die weet dat je nieuw bent. De naam van de stijl is minder belangrijk dan het niveau en de manier van begeleiden. Lees de lesomschrijving en meld vóór de les dat het je eerste keer is.",
    },
    {
      question: "Hoe weet ik welke yogastijl bij mij past?",
      answer:
        "Begin bij je doel. Kies een actievere les als je graag vloeiend en energiek beweegt, en een rustigere les als je vooral wilt vertragen. Probeer meerdere stijlen en let erop hoe je lichaam en aandacht na afloop voelen.",
    },
    {
      question: "Is een proefles genoeg om een yogastudio te beoordelen?",
      answer:
        "Eén les geeft een eerste indruk van de ruimte, sfeer en docent. Voor een vollediger beeld is het nuttig om verschillende lessen of docenten te proberen, zeker wanneer de studio meerdere yogastijlen aanbiedt.",
    },
    {
      question: "Hoe belangrijk is de locatie van een yogastudio?",
      answer:
        "Heel belangrijk als je regelmatig wilt gaan. Een studio dichtbij huis, werk of je vaste route verlaagt de praktische drempel. Beoordeel daarom niet alleen de afstand, maar ook de echte reistijd rond jouw favoriete lestijden.",
    },
    {
      question: "Waar kan ik yoga proberen in Amsterdam Oost?",
      answer:
        "Yoga Zeeburg zit aan de Cruquiusweg 96F in Amsterdam Oost, boven CrossFit Zeeburg en aan het water. Nieuwe deelnemers kunnen met de 14-Day Unlimited Intro Pass verschillende lessen, docenten en tijden proberen; de pas stopt automatisch.",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: false,
    showRelated: true,
  },
  body: () => <KeuzeBody />,
};

function KeuzeBody() {
  return (
    <>
      <p className="mt-4">
        Een yogales kiezen in Amsterdam lijkt eenvoudig, totdat je tientallen studio’s, lesstijlen
        en roosters naast elkaar ziet. De beste keuze is niet automatisch de bekendste studio of de
        les met de spannendste naam. Een goede yogales past bij wat jij zoekt, bij je ervaring én
        bij de manier waarop je week werkelijk is ingericht.
      </p>

      <section
        id="direct-antwoord"
        aria-labelledby="direct-antwoord-heading"
        className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8"
      >
        <h2
          id="direct-antwoord-heading"
          className="font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl"
        >
          Direct antwoord
        </h2>
        <div className="mt-3 space-y-3 text-foreground">
          <p>
            Let bij het kiezen van een yogales in Amsterdam vooral op zeven dingen: je doel, de
            inhoud en intensiteit van de les, het niveau, de docent, de locatie, het rooster en de
            sfeer in de studio. Kies eerst twee of drie opties die praktisch haalbaar zijn en
            probeer daarna zelf een les. De beste yogastudio is de plek waar je je welkom voelt,
            passende begeleiding krijgt en zonder veel gedoe regelmatig naartoe kunt gaan.
          </p>
        </div>
      </section>

      <h2
        id="doel"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        1. Begin bij je doel
      </h2>
      <p className="mt-4">
        Vraag jezelf vóór het vergelijken af waarom je yoga wilt doen. Wil je rustig bewegen na een
        drukke werkdag, juist actief trainen, soepeler worden, bewuster leren ademen of een vast
        moment voor jezelf creëren? Zonder duidelijk doel wordt iedere lesomschrijving tegelijk
        aantrekkelijk en onduidelijk.
      </p>
      <p className="mt-4">
        Je antwoord hoeft niet perfect te zijn. Een eenvoudige richting is genoeg:
      </p>
      <ul className="mt-4 space-y-3 pl-5 [list-style-type:disc]">
        <li>Ik wil vooral vertragen en tot rust komen.</li>
        <li>Ik wil actief bewegen en mijn hele lichaam gebruiken.</li>
        <li>Ik ben beginner en wil duidelijke uitleg.</li>
        <li>Ik wil yoga combineren met hardlopen, CrossFit of krachttraining.</li>
        <li>Ik wil verschillende stijlen proberen voordat ik kies.</li>
      </ul>
      <p className="mt-4">
        Met zo’n uitgangspunt kun je gerichter naar het lesaanbod kijken. Wil je vooral ontdekken
        wat bij je past, dan is een studio met meerdere lesvormen en docenten vaak praktischer dan
        direct één stijl vastleggen.
      </p>

      <h2
        id="lesstijl"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        2. Kijk verder dan de naam van de les
      </h2>
      <p className="mt-4">
        Namen als Vinyasa, Yin, Hatha en Slow Flow geven een eerste indruk, maar vertellen niet
        alles. Twee lessen met dezelfde naam kunnen bij verschillende docenten heel anders
        aanvoelen. Tempo, opbouw, muziek, hoeveelheid uitleg en ruimte voor aanpassingen bepalen
        minstens zoveel als het label.
      </p>
      <p className="mt-4">
        Lees daarom de volledige lesomschrijving. Zoek naar concrete informatie: is de les actief of
        rustig, is ervaring nodig, hoe lang duurt de les en worden er alternatieven aangeboden? Een
        duidelijke beschrijving helpt meer dan woorden als “transformerend”, “advanced” of “voor
        iedereen” zonder verdere uitleg.
      </p>
      <p className="mt-4">
        Twijfel je tussen een actieve en rustige les? Kies op basis van wat je op dat moment nodig
        hebt en probeer later ook de andere variant. Je hoeft niet meteen één yogastijl voor altijd
        te kiezen.
      </p>

      <h2
        id="niveau"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        3. Controleer niveau en begeleiding
      </h2>
      <p className="mt-4">
        Een beginnersvriendelijke les betekent niet dat alles gemakkelijk is. Het betekent vooral
        dat je uitleg krijgt, vragen mag stellen en houdingen kunt aanpassen. Een docent hoeft niet
        iedereen exact hetzelfde te laten doen om een samenhangende les te geven.
      </p>
      <p className="mt-4">Let bij de omschrijving of tijdens een proefles op deze signalen:</p>
      <ul className="mt-4 space-y-3 pl-5 [list-style-type:disc]">
        <li>De docent legt uit wat de bedoeling van een houding of beweging is.</li>
        <li>Er zijn eenvoudigere en intensievere opties.</li>
        <li>Je wordt niet onder druk gezet om verder te gaan dan prettig voelt.</li>
        <li>Nieuwe deelnemers krijgen praktische uitleg over de ruimte en materialen.</li>
        <li>Je kunt vooraf aangeven dat je nieuw bent of ergens rekening mee wilt houden.</li>
      </ul>
      <p className="mt-4">
        Heb je pijn, een blessure, ben je zwanger of twijfel je of een les passend is, neem dan
        vooraf contact op met de studio en bespreek het met de docent. Een algemene yogales vervangt
        geen individuele beoordeling of behandeling door een gekwalificeerde zorgprofessional.
      </p>

      <h2
        id="docent"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        4. Let op de docent, niet alleen op de studio
      </h2>
      <p className="mt-4">
        De docent bepaalt voor een groot deel hoe een les voelt. De ene docent geeft veel technische
        aanwijzingen; de andere laat meer stilte. Sommige lessen zijn speels en energiek, andere
        rustig en precies. Geen van die vormen is automatisch beter.
      </p>
      <p className="mt-4">Vraag na een proefles niet alleen: “Vond ik yoga leuk?” Vraag ook:</p>
      <ul className="mt-4 space-y-3 pl-5 [list-style-type:disc]">
        <li>Begreep ik de uitleg?</li>
        <li>Voelde ik ruimte om mijn eigen tempo te volgen?</li>
        <li>Werd de les zorgvuldig opgebouwd?</li>
        <li>Past deze manier van lesgeven bij mij?</li>
        <li>Zou ik bij deze docent terugkomen?</li>
      </ul>
      <p className="mt-4">
        Bevalt de studio wel, maar de eerste docent minder? Probeer dan een andere les voordat je de
        plek afschrijft. Een rooster met meerdere docenten geeft je ruimte om een combinatie te
        vinden die bij je past.
      </p>

      <h2
        id="locatie"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        5. Maak locatie en reistijd onderdeel van je keuze
      </h2>
      <p className="mt-4">
        In Amsterdam kan een korte afstand op de kaart alsnog veel reistijd kosten. Een studio moet
        daarom niet alleen aantrekkelijk zijn, maar ook logisch liggen ten opzichte van huis, werk
        of je vaste route.
      </p>
      <p className="mt-4">
        Denk praktisch. Kun je op tijd komen zonder te haasten? Is de terugreis ’s avonds prettig?
        Kun je rechtstreeks vanuit kantoor gaan? Een studio die tien minuten makkelijker bereikbaar
        is, kan op lange termijn waardevoller zijn dan een plek die op papier nét beter lijkt.
      </p>
      <p className="mt-4">
        Voor wie woont of werkt in Amsterdam Oost zijn Zeeburg, Cruquius, het Oostelijk Havengebied
        en de Indische Buurt logische gebieden om mee te nemen. Yoga Zeeburg ligt aan de Cruquiusweg
        96F, boven CrossFit Zeeburg en aan het water. Bekijk altijd zelf of de locatie goed aansluit
        op jouw dagelijkse route.
      </p>

      <h2
        id="rooster"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        6. Kies een rooster dat in je echte week past
      </h2>
      <p className="mt-4">
        Een uitgebreid rooster heeft weinig waarde als jouw favoriete lessen altijd op onmogelijke
        tijden vallen. Kijk daarom niet alleen naar het totale aanbod, maar naar twee of drie
        momenten waarop jij structureel zou kunnen gaan.
      </p>
      <p className="mt-4">Controleer:</p>
      <ul className="mt-4 space-y-3 pl-5 [list-style-type:disc]">
        <li>Zijn er lessen vóór of na je werk?</li>
        <li>Is er een bruikbaar alternatief wanneer je vaste les uitvalt?</li>
        <li>Kun je verschillende stijlen proberen op tijden die bij je passen?</li>
        <li>Hoe vroeg moet je reserveren en wat zijn de annuleringsregels?</li>
        <li>Verandert het rooster vaak of is er een herkenbaar weekritme?</li>
      </ul>
      <p className="mt-4">
        Bekijk het actuele rooster via{" "}
        <Link
          to="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          /schedule
        </Link>
        . Begin liever met één realistisch moment per week dan met een ambitieus plan dat na twee
        weken niet meer past.
      </p>

      <h2
        id="sfeer"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        7. Ervaar de sfeer zelf
      </h2>
      <p className="mt-4">
        Foto’s, reviews en teksten geven een indruk, maar de sfeer van een studio ervaar je pas
        wanneer je binnenstapt. Let tijdens je eerste bezoek op kleine dingen: word je begroet, is
        duidelijk waar je moet zijn, voelt de ruimte verzorgd en kun je zonder prestatiedruk
        meedoen?
      </p>
      <p className="mt-4">
        Een grote studio kan veel keuze en anonimiteit bieden. Een kleine studio kan persoonlijker
        voelen en sneller vertrouwd worden. Wat prettig is, verschilt per persoon. Ook taal speelt
        mee: sommige deelnemers voelen zich fijner bij Nederlandse uitleg, anderen juist bij een
        Engelstalige les.
      </p>
      <p className="mt-4">
        De juiste sfeer betekent niet dat alles perfect moet zijn. Het gaat erom dat jij je
        voldoende op je gemak voelt om aandacht aan de les te geven en nog een keer terug te komen.
      </p>

      <h2
        id="aanbod"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Vergelijk een proefles, introductiepas en lidmaatschap
      </h2>
      <p className="mt-4">
        Een losse proefles is handig om één moment te ervaren. Een introductiepas is vaak geschikter
        wanneer je verschillende lesstijlen, docenten en tijden wilt vergelijken. Een regulier
        lidmaatschap wordt pas interessant wanneer je weet hoe vaak je realistisch wilt gaan.
      </p>
      <p className="mt-4">Let niet alleen op de laagste prijs. Bekijk ook:</p>
      <ul className="mt-4 space-y-3 pl-5 [list-style-type:disc]">
        <li>hoeveel lessen je binnen de periode kunt volgen;</li>
        <li>of het aanbod automatisch stopt of doorloopt;</li>
        <li>welke reserverings- en annuleringsregels gelden;</li>
        <li>of je meerdere docenten en lesvormen kunt proberen;</li>
        <li>wat er na de introductieperiode gebeurt.</li>
      </ul>
      <p className="mt-4">
        Bij Yoga Zeeburg kun je met de{" "}
        <Link
          to="/trial"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          14-Day Unlimited Intro Pass
        </Link>{" "}
        gedurende veertien dagen verschillende lessen, docenten en tijden proberen. De pas is voor
        nieuwe deelnemers en stopt automatisch.
      </p>

      <h2
        id="rode-vlaggen"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wanneer past een studio waarschijnlijk niet bij je?
      </h2>
      <p className="mt-4">
        Een studio hoeft niet voor iedereen geschikt te zijn. Wees voorzichtig wanneer belangrijke
        informatie onduidelijk blijft, je vragen worden weggewuifd, aanpassingen niet welkom zijn of
        je druk voelt om direct een lang abonnement af te sluiten.
      </p>
      <p className="mt-4">
        Ook een praktisch slechte match is een geldige reden om verder te kijken. Als de reistijd,
        lestijden of taal telkens wrijving opleveren, wordt regelmatig gaan onnodig moeilijk. De
        beste keuze ondersteunt een gewoonte; hij vraagt niet iedere week opnieuw wilskracht om er
        te komen.
      </p>

      <h2
        id="keuzehulp"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Een snelle keuzehulp
      </h2>
      <p className="mt-4">
        Gebruik deze volgorde wanneer je meerdere yogastudio’s in Amsterdam vergelijkt:
      </p>
      <ol className="mt-4 space-y-2 pl-5 [list-style-type:decimal]">
        <li>Schrijf in één zin op wat je uit yoga wilt halen.</li>
        <li>Kies maximaal drie studio’s die praktisch bereikbaar zijn.</li>
        <li>Controleer per studio twee haalbare lestijden.</li>
        <li>Lees de lesbeschrijvingen en kies een passend beginniveau.</li>
        <li>Probeer één of meer lessen bij verschillende docenten.</li>
        <li>Beoordeel na afloop de begeleiding, sfeer en haalbaarheid.</li>
        <li>Kies pas daarna een rittenkaart of lidmaatschap dat bij je ritme past.</li>
      </ol>
      <p className="mt-4">
        Wil je vooraf meer lokale opties vergelijken, blader dan door de{" "}
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
        id="conclusie"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Conclusie
      </h2>
      <p className="mt-4">
        Een yogales in Amsterdam kies je niet alleen op stijl of prijs. Je doel, niveau, docent,
        locatie, rooster en de sfeer bepalen samen of een les echt bij je past. Maak eerst een
        praktische voorselectie en ervaar daarna zelf hoe een les voelt. De beste keuze is
        uiteindelijk de studio waar je graag terugkomt en waarvan de lessen passen in je gewone
        week.
      </p>
    </>
  );
}

const taalArticle: Article = {
  slug: "nederlandse-of-engelse-yogales-in-amsterdam-wat-past-bij-jou",
  title: "Nederlandse of Engelse yogales in Amsterdam: wat past bij jou?",
  h1: "Nederlandse of Engelse yogales in Amsterdam: wat past bij jou?",
  seoTitle: "Nederlandse of Engelse yogales in Amsterdam: wat past bij jou?",
  description:
    "Kies je voor een Nederlandse of Engelse yogales in Amsterdam? Ontdek welke taal het beste past bij jouw ervaring, comfort en yogadoelen.",
  intro:
    "In Amsterdam worden yogalessen in het Nederlands, Engels of een combinatie van beide gegeven. Ontdek welke taal jou helpt om prettig, veilig en ontspannen te oefenen.",
  category: CATEGORY_AMSTERDAM_OOST,
  type: "local-guide",
  pillar: false,
  publishedAt: "2026-07-28",
  updatedAt: "2026-07-28",
  readingTimeMin: 6,
  toc: [
    { id: "direct-antwoord", label: "Kort antwoord" },
    { id: "waarom-taal", label: "Waarom de taal van een yogales verschil kan maken" },
    { id: "wanneer-nederlands", label: "Wanneer past een Nederlandse yogales beter?" },
    { id: "wanneer-engels", label: "Wanneer past een Engelse yogales beter?" },
    { id: "tweetalig", label: "Is een tweetalige yogales verwarrend?" },
    { id: "belangrijker", label: "Wat is belangrijker dan Nederlands of Engels?" },
    { id: "kiezen", label: "Zo kies je zonder te blijven twijfelen" },
    { id: "yoga-zeeburg", label: "Nederlandse of Engelse yoga bij Yoga Zeeburg" },
    { id: "conclusie", label: "Conclusie" },
    { id: "faq", label: "Veelgestelde vragen" },
  ],
  faqs: [
    {
      question: "Moet ik goed Nederlands spreken voor een yogales in Amsterdam?",
      answer:
        "Nee. In Amsterdam worden veel yogalessen in het Engels of met Engelstalige ondersteuning gegeven. Controleer vooraf de voertaal van de specifieke les.",
    },
    {
      question: "Is een Engelse yogales geschikt voor Nederlandse beginners?",
      answer:
        "Ja, als je eenvoudige Engelse instructies begrijpt en de docent duidelijk demonstreert. Anders kan een Nederlandstalige les prettiger zijn.",
    },
    {
      question: "Welke taal worden yogahoudingen genoemd?",
      answer:
        "Dat verschilt per docent. Je hoort Nederlandse en Engelse namen en Sanskrietnamen zoals savasana, meestal gecombineerd met een demonstratie.",
    },
    {
      question: "Kan ik vooraf vragen in welke taal de les wordt gegeven?",
      answer:
        "Ja. Vraag vooraf naar de voertaal en of een korte toelichting in het Nederlands of Engels mogelijk is.",
    },
    {
      question: "Wat als ik tijdens de les een instructie niet begrijp?",
      answer:
        "Kijk naar de demonstratie, neem een rusthouding of vraag de docent om verduidelijking. Voer geen beweging blind uit.",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: false,
    showRelated: true,
  },
  body: () => <TaalBody />,
};

function TaalBody() {
  return (
    <>
      <p className="mt-4">
        In Amsterdam kun je yogalessen volgen in het Nederlands, in het Engels of in een combinatie
        van beide talen. Maar maakt de voertaal echt verschil? Dat hangt vooral af van hoe
        gemakkelijk je instructies begrijpt, hoeveel yoga-ervaring je hebt en in welke taal jij je
        het meest ontspannen voelt.
      </p>

      <section
        id="direct-antwoord"
        aria-labelledby="direct-antwoord-heading"
        className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8"
      >
        <h2
          id="direct-antwoord-heading"
          className="font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl"
        >
          Kort antwoord
        </h2>
        <div className="mt-3 space-y-3 text-foreground">
          <p>
            Kies een Nederlandse yogales wanneer je aanwijzingen het liefst zonder vertaalslag
            begrijpt. Kies een Engelse yogales wanneer Engels voor jou vertrouwd voelt, je met
            internationale deelnemers wilt oefenen of het aanbod daardoor beter bij je agenda past.
            Heb je al yoga-ervaring, dan is de taal vaak minder belangrijk. Als beginner is helder
            kunnen volgen meestal belangrijker dan de taal op zichzelf.
          </p>
        </div>
      </section>

      <h2
        id="waarom-taal"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Waarom de taal van een yogales verschil kan maken
      </h2>
      <p className="mt-4">
        Tijdens een yogales luister je niet alleen naar de naam van een houding. Een docent geeft
        ook aanwijzingen over ademhaling, uitlijning, tempo en mogelijke aanpassingen. Soms gaat dat
        snel, terwijl je tegelijkertijd beweegt.
      </p>
      <p className="mt-4">
        In een vertrouwde taal begrijp je nuances vaak gemakkelijker. Een instructie als “kantel je
        bekken licht”, “houd ruimte rond je nek” of “kom uit de houding als je scherpe pijn voelt”
        moet duidelijk zijn. Dat helpt je om rustiger en veiliger te oefenen.
      </p>
      <p className="mt-4">
        Tegelijk is yoga sterk visueel. Je ziet wat de docent voordoet en herkent na een tijdje veel
        houdingen en overgangen. Daardoor kunnen veel deelnemers een Engelstalige les prima volgen,
        ook als Engels niet hun moedertaal is.
      </p>

      <h2
        id="wanneer-nederlands"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wanneer past een Nederlandse yogales beter?
      </h2>
      <p className="mt-4">Een les in het Nederlands kan prettig zijn als je:</p>
      <ul className="mt-4 space-y-3 pl-5 [list-style-type:disc]">
        <li>voor het eerst yoga doet;</li>
        <li>graag iedere aanwijzing direct begrijpt;</li>
        <li>Engelse woorden tijdens bewegen vermoeiend vindt;</li>
        <li>specifieke vragen wilt stellen over een houding of lichamelijke beperking;</li>
        <li>makkelijker ontspant wanneer je niet hoeft te vertalen.</li>
      </ul>
      <p className="mt-4">
        Vooral bij een eerste les kan taal rust geven. Je hoeft dan minder na te denken en kunt meer
        aandacht besteden aan wat je in je lichaam voelt.
      </p>
      <p className="mt-4">
        Dat betekent niet dat een Engelstalige les ongeschikt is voor beginners. Een rustige docent
        die duidelijk demonstreert, eenvoudige woorden gebruikt en ruimte geeft om vragen te
        stellen, kan belangrijker zijn dan de taalkeuze.
      </p>

      <h2
        id="wanneer-engels"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wanneer past een Engelse yogales beter?
      </h2>
      <p className="mt-4">
        Een Engelstalige yogales ligt voor de hand als Engels je dagelijkse taal is of als je nog
        weinig Nederlands spreekt. Amsterdam heeft een grote internationale gemeenschap, waardoor
        Engels in veel studio’s een normale voertaal is.
      </p>
      <p className="mt-4">Een Engelse les kan goed passen wanneer je:</p>
      <ul className="mt-4 space-y-3 pl-5 [list-style-type:disc]">
        <li>expat of internationale student bent;</li>
        <li>op je werk en thuis veel Engels spreekt;</li>
        <li>gewend bent aan Engelse yogatermen;</li>
        <li>samen met anderstalige vrienden een les wilt volgen;</li>
        <li>door Engelstalige lessen meer keuze hebt in tijden, stijlen of docenten.</li>
      </ul>
      <p className="mt-4">
        Veel yogawoorden worden ook in Nederland vaak in het Engels of Sanskriet gebruikt. Denk aan
        downward-facing dog, child’s pose, savasana en vinyasa. Wie online yogavideo’s in het Engels
        volgt, herkent deze termen vaak sneller dan de Nederlandse vertalingen.
      </p>

      <h2
        id="tweetalig"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Is een tweetalige yogales verwarrend?
      </h2>
      <p className="mt-4">
        Niet per se. In een gemengde groep kan een docent de belangrijkste instructies kort in beide
        talen geven of overschakelen wanneer iemand iets niet begrijpt. Dat maakt een les
        toegankelijk, maar te veel herhaling kan ook het ritme onderbreken.
      </p>
      <p className="mt-4">
        Een goede tweetalige les is daarom geen volledige zin-voor-zinvertaling. De docent houdt de
        aanwijzingen compact, demonstreert duidelijk en controleert of iedereen kan volgen.
      </p>
      <p className="mt-4">
        Twijfel je? Vraag vooraf welke taal hoofdzakelijk wordt gebruikt en of de docent korte
        uitleg in een andere taal kan geven. Dan weet je wat je kunt verwachten zonder dat de hele
        groep zich voortdurend hoeft aan te passen.
      </p>

      <h2
        id="belangrijker"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat is belangrijker dan Nederlands of Engels?
      </h2>
      <p className="mt-4">
        De taal telt mee, maar bepaalt niet alleen of een les bij je past. Let ook op:
      </p>
      <h3 className="mt-6 font-display text-xl font-medium text-foreground">De yogastijl</h3>
      <p className="mt-4">
        Een rustige Yin- of Hatha-les vraagt iets anders dan een actieve Vinyasa-les. Bij snelle
        overgangen is het extra handig als je instructies direct begrijpt. In een langzamere les heb
        je vaak meer tijd om te kijken en te reageren.
      </p>
      <h3 className="mt-6 font-display text-xl font-medium text-foreground">De docent</h3>
      <p className="mt-4">
        Een docent die helder praat, goed voordoet en verschillende opties aanbiedt, maakt een les
        toegankelijker in iedere taal. Een ingewikkelde uitleg in je moedertaal kan lastiger zijn
        dan eenvoudige instructies in het Engels.
      </p>
      <h3 className="mt-6 font-display text-xl font-medium text-foreground">De sfeer</h3>
      <p className="mt-4">
        Je moet je vrij voelen om rond te kijken, een houding over te slaan of een vraag te stellen.
        Een ontspannen, niet-prestatiegerichte sfeer helpt meer dan perfecte beheersing van iedere
        term.
      </p>
      <h3 className="mt-6 font-display text-xl font-medium text-foreground">De praktische match</h3>
      <p className="mt-4">
        Een les die qua tijd, locatie en niveau in je week past, houd je gemakkelijker vol. Kies
        daarom niet uitsluitend op taal. Bekijk ook het{" "}
        <Link
          to="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          actuele rooster
        </Link>{" "}
        en de omschrijving van de les.
      </p>

      <h2
        id="kiezen"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zo kies je zonder te blijven twijfelen
      </h2>
      <p className="mt-4">
        Je hoeft de perfecte keuze niet vooraf te maken. Gebruik deze eenvoudige volgorde:
      </p>
      <ol className="mt-4 space-y-2 pl-5 [list-style-type:decimal]">
        <li>Kies een les die past bij je niveau en gewenste intensiteit.</li>
        <li>Controleer welke taal de docent meestal gebruikt.</li>
        <li>
          Meld vooraf dat je Nederlands of Engels prettiger vindt als dat belangrijk voor je is.
        </li>
        <li>Ga één keer ervaren hoe duidelijk de les voor jou voelt.</li>
        <li>Probeer eventueel een andere docent of les voordat je een studio beoordeelt.</li>
      </ol>
      <p className="mt-4">
        Let na de les vooral op drie vragen: kon je de aanwijzingen volgen, voelde je je op je gemak
        en wil je terugkomen? Als het antwoord meestal ja is, past de les waarschijnlijk goed
        genoeg.
      </p>
      <p className="mt-4">
        Met een introductieaanbod kun je meerdere lessen en docenten vergelijken. Bij Yoga Zeeburg
        kun je met de{" "}
        <Link
          to="/trial"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Intro Pass
        </Link>{" "}
        verschillende momenten en lesvormen proberen voordat je een vast ritme kiest.
      </p>

      <h2
        id="yoga-zeeburg"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Nederlandse of Engelse yoga bij Yoga Zeeburg
      </h2>
      <p className="mt-4">
        Yoga Zeeburg is een kleinschalige, toegankelijke yogastudio aan de Cruquiusweg in
        Amsterdam-Oost. De studio is bedoeld voor mensen met verschillende ervaringsniveaus en
        achtergronden.
      </p>
      <p className="mt-4">
        Wil je weten welke taal tijdens een specifieke les wordt gebruikt? Bekijk het{" "}
        <Link
          to="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          rooster
        </Link>{" "}
        of vraag het vooraf. Zo kies je een les waarin je de begeleiding goed kunt volgen.
        Belangrijker dan foutloos Nederlands of Engels spreken is dat je je welkom voelt, begrijpt
        wat je doet en op je eigen niveau kunt oefenen.
      </p>
      <p className="mt-4">
        Meer praktische informatie en artikelen voor je eerste lessen vind je in de{" "}
        <Link
          to="/kennisbank"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Yoga Gids
        </Link>
        .
      </p>

      <h2
        id="conclusie"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Conclusie
      </h2>
      <p className="mt-4">
        Een Nederlandse yogales is vaak het prettigst als je voor het eerst begint en alle
        aanwijzingen direct wilt begrijpen. Een Engelse yogales past goed als Engels vertrouwd voelt
        of als je deel uitmaakt van de internationale gemeenschap in Amsterdam. Ervaren yogi’s
        merken meestal dat duidelijke demonstraties en bekende houdingen de taal minder belangrijk
        maken.
      </p>
      <p className="mt-4">
        Kies uiteindelijk niet alleen met je hoofd. Probeer een les en merk of je kunt volgen,
        ontspannen en bewegen zonder voortdurend na te denken over woorden. Dat is de taal waarin
        yoga voor jou het beste werkt.
      </p>
    </>
  );
}

const prijzenArticle: Article = {
  slug: "wat-kost-yoga-in-amsterdam-en-waar-betaal-je-voor",
  title: "Wat kost yoga in Amsterdam en waar betaal je voor?",
  h1: "Wat kost yoga in Amsterdam en waar betaal je voor?",
  seoTitle: "Wat kost yoga in Amsterdam? Prijzen uitgelegd | Yoga Zeeburg",
  description:
    "Wat kost yoga in Amsterdam? Vergelijk een losse les, rittenkaart, abonnement en intro-aanbod en ontdek wat je werkelijk per yogales betaalt.",
  intro:
    "De prijs van yoga in Amsterdam lijkt eenvoudig, maar studio’s rekenen met losse lessen, rittenkaarten, abonnementen en introductieaanbiedingen. Daardoor zegt het totaalbedrag weinig zonder te kijken naar de prijs per gebruikte les en de voorwaarden. Deze gids laat zien waar je voor betaalt en hoe je eerlijk vergelijkt.",
  category: CATEGORY_AMSTERDAM_OOST,
  type: "local-guide",
  pillar: false,
  publishedAt: "2026-07-29",
  updatedAt: "2026-07-29",
  readingTimeMin: 8,
  toc: [
    { id: "kort-antwoord", label: "Kort antwoord" },
    { id: "prijsmodellen", label: "Welke prijsmodellen kom je tegen?" },
    { id: "prijs-per-les", label: "Wat betaal je per yogales in Amsterdam?" },
    { id: "waar-betaal-je-voor", label: "Waar betaal je eigenlijk voor?" },
    { id: "werkelijke-prijs", label: "Bereken de werkelijke prijs per gebruikte les" },
    { id: "voorwaarden", label: "Let op geldigheid, looptijd en opzeggen" },
    { id: "abonnement-goedkoper", label: "Wanneer is een abonnement goedkoper?" },
    { id: "prijzen-yoga-zeeburg", label: "De actuele prijzen van Yoga Zeeburg" },
    { id: "kiezen", label: "Zo kies je zonder te veel te betalen" },
    { id: "conclusie", label: "Conclusie" },
    { id: "faq", label: "Veelgestelde vragen" },
  ],
  faqs: [
    {
      question: "Wat kost een losse yogales in Amsterdam?",
      answer:
        "Dat verschilt per studio. Bij Yoga Zeeburg kost een losse groepsles op 29 juli 2026 €25. Rittenkaarten en abonnementen verlagen doorgaans de prijs per gebruikte les.",
    },
    {
      question: "Wat is goedkoper: een yogabonnement of een rittenkaart?",
      answer:
        "Een abonnement is meestal goedkoper wanneer je iedere week gaat en je lessen gebruikt. Een rittenkaart kost vaak meer per les, maar kan voordeliger uitpakken als je agenda wisselt en je anders abonnementlessen laat vervallen.",
    },
    {
      question: "Hoeveel kost yoga per maand?",
      answer:
        "Veel studio’s werken met maand- of vierweekse tarieven. Bij Yoga Zeeburg kosten reguliere abonnementen momenteel €49, €69 of €89 per vier weken, afhankelijk van het aantal lessen. Let erop dat dertien periodes van vier weken in één jaar passen.",
    },
    {
      question: "Is onbeperkt yoga goedkoper?",
      answer:
        "Alleen als je vaak genoeg gaat. Bij drie of vier lessen per week kan de prijs per les sterk dalen. Ga je maar één keer per week, dan is een kleiner abonnement meestal voordeliger.",
    },
    {
      question: "Wat kost yoga proberen bij Yoga Zeeburg?",
      answer:
        "De 14-Day Unlimited Intro Pass kost op 29 juli 2026 €30 eenmalig. Nieuwe studenten kunnen daarmee 14 opeenvolgende dagen onbeperkt lessen proberen; de pass stopt automatisch.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg — actuele prijzen en voorwaarden",
      url: "https://www.yogazeeburg.com/pricing",
    },
    {
      title: "Thrive Yoga & Pilates Zeeburg — tarieven",
      url: "https://thriveyoga.nl/locatie/yoga-in-zeeburg/",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  body: () => <PrijzenBody />,
};

function PrijzenBody() {
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
            Yoga in Amsterdam kost bij actuele voorbeelden in Amsterdam Oost grofweg €8 tot €25 per
            les. De laagste lesprijs hoort meestal bij een abonnement en regelmatig bezoek; een
            losse les is het duurst. Bij Yoga Zeeburg kost een losse les momenteel €25, een
            10-lessenkaart €18 per les en een regulier abonnement ongeveer €8,63 tot €12,25 per les,
            afhankelijk van je ritme. Nieuwe studenten kunnen 14 dagen onbeperkt yoga proberen voor
            €30. Vergelijk daarom niet alleen het bedrag, maar ook geldigheid, opzegvoorwaarden en
            hoeveel lessen je werkelijk gaat volgen.
          </p>
        </div>
      </section>

      <h2
        id="prijsmodellen"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Welke prijsmodellen kom je tegen?
      </h2>
      <p className="mt-4">
        Yogastudio’s in Amsterdam gebruiken meestal vier prijsmodellen. Elk model verdeelt
        flexibiliteit en zekerheid anders tussen jou en de studio.
      </p>
      <ul className="mt-4 space-y-3 pl-5 [list-style-type:disc]">
        <li>
          <strong>Introductieaanbod.</strong> Een tijdelijke aanbieding voor nieuwe studenten
          waarmee je meerdere lessen, docenten en tijden kunt proberen.
        </li>
        <li>
          <strong>Losse les.</strong> Maximale vrijheid zonder vervolgverplichting, maar doorgaans
          de hoogste prijs per bezoek.
        </li>
        <li>
          <strong>Rittenkaart.</strong> Je koopt meerdere lessen vooraf en gebruikt ze binnen een
          vaste geldigheidsduur.
        </li>
        <li>
          <strong>Abonnement.</strong> Je betaalt periodiek voor een vast aantal lessen of
          onbeperkte toegang. Dit geeft meestal de laagste prijs per gebruikte les, maar vraagt meer
          regelmaat en vaak een minimale looptijd.
        </li>
      </ul>
      <p className="mt-4">
        De goedkoopste optie op papier is dus niet automatisch de beste keuze. Een voordelig
        abonnement wordt duur als je weinig gaat; een duurdere rittenkaart kan juist goedkoper
        uitpakken als je agenda vaak verandert.
      </p>

      <h2
        id="prijs-per-les"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat betaal je per yogales in Amsterdam?
      </h2>
      <p className="mt-4">
        Actuele gepubliceerde tarieven van studio’s in Amsterdam Oost laten een duidelijke
        bandbreedte zien. Op 29 juli 2026 kost een losse les bij Yoga Zeeburg €25. Een
        10-lessenkaart komt uit op €18 per les. De reguliere abonnementen kosten, afhankelijk van
        het gekozen ritme, ongeveer €8,63 tot €12,25 per les. Bij onbeperkt yoga daalt de effectieve
        lesprijs verder wanneer je drie of vier keer per week komt.
      </p>
      <p className="mt-4">
        Thrive Yoga publiceert voor rittenkaarten een bandbreedte van €14,25 tot €17 per les en voor
        maandabonnementen ongeveer €8 tot €13 per les. Dat ondersteunt een praktische Amsterdamse
        richtlijn: reken grofweg op €8 tot €25 per gevolgde groepsles, afhankelijk van
        flexibiliteit, frequentie en looptijd. Tarieven veranderen; controleer daarom altijd de
        actuele prijspagina voordat je koopt.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-2 pr-4 font-medium text-foreground">Optie</th>
              <th className="py-2 pr-4 font-medium text-foreground">Actueel voorbeeld</th>
              <th className="py-2 font-medium text-foreground">Past vooral bij</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-2 pr-4">Introductieaanbod</td>
              <td className="py-2 pr-4">€30 voor 14 dagen onbeperkt bij Yoga Zeeburg</td>
              <td className="py-2">Nieuwe studenten die meerdere lessen willen proberen</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4">Losse les</td>
              <td className="py-2 pr-4">€25 bij Yoga Zeeburg</td>
              <td className="py-2">Eenmalig bezoek of maximale vrijheid</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4">10-lessenkaart</td>
              <td className="py-2 pr-4">€180, dus €18 per les bij Yoga Zeeburg</td>
              <td className="py-2">Wisselende agenda zonder abonnement</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4">Regulier abonnement</td>
              <td className="py-2 pr-4">Circa €8,63–€12,25 per gebruikte les bij Yoga Zeeburg</td>
              <td className="py-2">Eén of twee vaste lessen per week</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">Onbeperkt abonnement</td>
              <td className="py-2 pr-4">Effectieve prijs daalt bij vaker komen</td>
              <td className="py-2">Drie of meer lessen per week</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4">
        Deze bedragen zijn momentopnamen van 29 juli 2026 en geen vaste marktprijzen voor heel
        Amsterdam.
      </p>

      <h2
        id="waar-betaal-je-voor"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Waar betaal je eigenlijk voor?
      </h2>
      <p className="mt-4">
        De prijs van een yogales bestaat uit meer dan de minuten op de mat. Een studio betaalt onder
        andere de huur van een geschikte ruimte, docenten, planning en boekingssoftware, schoonmaak,
        materialen, verzekeringen en administratie. In Amsterdam weegt huisvesting zwaar mee.
      </p>
      <p className="mt-4">
        Je betaalt daarnaast voor keuzes die minder zichtbaar zijn: groepsgrootte, persoonlijke
        aandacht, ervaring van de docent, bereikbaarheid, de variatie in het rooster en de rust van
        de ruimte. Een goedkope les op een onhandig tijdstip kan weinig waarde hebben. Een iets
        duurdere les vijf minuten fietsen van huis kan juist de optie zijn die je werkelijk
        volhoudt.
      </p>
      <p className="mt-4">
        Prijs en kwaliteit lopen niet automatisch gelijk. Een hogere prijs garandeert geen betere
        docent of fijnere sfeer. Gebruik prijs daarom als één criterium naast niveau, lesstijl,
        locatie, rooster en hoe welkom je je voelt.
      </p>

      <h2
        id="werkelijke-prijs"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Bereken de werkelijke prijs per gebruikte les
      </h2>
      <p className="mt-4">De eerlijkste vergelijking is eenvoudig:</p>
      <p className="mt-4">
        <strong>
          werkelijke prijs per les = totaal betaald bedrag ÷ aantal lessen dat je daadwerkelijk
          volgt
        </strong>
      </p>
      <p className="mt-4">
        Stel dat een abonnement €69 per vier weken kost en acht lessen bevat. Als je alle acht
        lessen volgt, betaal je €8,63 per les. Ga je maar vier keer, dan is je werkelijke prijs
        €17,25. Een 10-lessenkaart van €180 lijkt duurder, maar kan voordeliger zijn wanneer je
        anders veel abonnementlessen ongebruikt laat.
      </p>
      <p className="mt-4">
        Kijk daarom eerst realistisch naar je agenda. Eén vaste les per week is voor veel mensen
        waardevoller dan onbeperkt toegang die vooral een voornemen blijft. Wie al zeker weet dat
        drie lessen per week haalbaar zijn, kan met unlimited juist een lage prijs per les bereiken.
      </p>

      <h2
        id="voorwaarden"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Let op geldigheid, looptijd en opzeggen
      </h2>
      <p className="mt-4">
        Vergelijk niet alleen het grote bedrag op de prijspagina. Controleer ook:
      </p>
      <ol className="mt-4 space-y-2 pl-5 [list-style-type:decimal]">
        <li>Hoe lang een rittenkaart geldig blijft.</li>
        <li>Of ongebruikte lessen vervallen.</li>
        <li>Wat de minimale looptijd van een abonnement is.</li>
        <li>Of het abonnement daarna automatisch doorloopt.</li>
        <li>Hoe en wanneer je kunt opzeggen.</li>
        <li>Of pauzeren mogelijk is bij vakantie, zwangerschap of een blessure.</li>
        <li>Of annuleren kort voor de les een credit kost.</li>
      </ol>
      <p className="mt-4">
        Vierwekelijks betalen is bovendien niet hetzelfde als maandelijks betalen. In één jaar
        zitten dertien periodes van vier weken. Vergelijk jaarbedragen daarom op dezelfde basis en
        kijk niet alleen naar het bedrag per incasso.
      </p>

      <h2
        id="abonnement-goedkoper"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wanneer is een abonnement goedkoper?
      </h2>
      <p className="mt-4">
        Een abonnement is meestal logisch als je een vast ritme kunt volhouden. Reken vóór aankoop
        drie scenario’s door: één, twee en drie lessen per week. Gebruik vervolgens het laagste
        aantal dat je ook tijdens drukke weken waarschijnlijk haalt.
      </p>
      <ul className="mt-4 space-y-3 pl-5 [list-style-type:disc]">
        <li>
          Ga je gemiddeld <strong>één keer per week</strong>, kies dan een klein abonnement of een
          passende rittenkaart.
        </li>
        <li>
          Ga je gemiddeld <strong>twee keer per week</strong>, dan biedt een abonnement vaak
          duidelijk meer waarde per les.
        </li>
        <li>
          Ga je <strong>drie keer per week of vaker</strong>, dan kan onbeperkt yoga financieel
          interessant worden.
        </li>
        <li>
          Verandert je agenda voortdurend, dan betaal je bij een rittenkaart meer per les maar
          mogelijk minder voor ongebruikte capaciteit.
        </li>
      </ul>
      <p className="mt-4">
        Wie nog niet weet welke les of docent past, hoeft dit niet vooraf uit te rekenen. Begin met
        een introductieperiode en baseer je keuze daarna op wat je werkelijk hebt bezocht. Lees ook{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yogales-in-amsterdam-waar-moet-je-op-letten-bij-je-keuze" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          hoe je een yogastudio kiest
        </Link>{" "}
        en{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          wat je tijdens een proefles kunt verwachten
        </Link>
        .
      </p>

      <h2
        id="prijzen-yoga-zeeburg"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        De actuele prijzen van Yoga Zeeburg
      </h2>
      <p className="mt-4">Yoga Zeeburg werkt op 29 juli 2026 met de volgende hoofdopties:</p>
      <ul className="mt-4 space-y-3 pl-5 [list-style-type:disc]">
        <li>
          <strong>14-Day Unlimited Intro Pass:</strong> €30 eenmalig voor 14 opeenvolgende dagen;
          alleen voor nieuwe studenten en stopt automatisch.
        </li>
        <li>
          <strong>Weekly Yoga:</strong> €49 per vier weken voor vier lessen; €12,25 per les bij
          volledig gebruik.
        </li>
        <li>
          <strong>Yoga Plus:</strong> €69 per vier weken voor acht lessen; €8,63 per les bij
          volledig gebruik.
        </li>
        <li>
          <strong>Unlimited Yoga:</strong> €89 per vier weken; ongeveer €7,42 per les bij drie
          lessen per week en €5,56 bij vier lessen per week.
        </li>
        <li>
          <strong>10-Class Pass:</strong> €180 voor tien lessen, drie maanden geldig; €18 per les.
        </li>
        <li>
          <strong>Single Class:</strong> €25, één maand geldig.
        </li>
      </ul>
      <p className="mt-4">
        De reguliere vierweekse abonnementen hebben momenteel een minimale looptijd van drie maanden
        en zijn daarna maandelijks opzegbaar. Voor langere commitment bestaan afzonderlijke
        jaaropties. Bekijk voor alle actuele bedragen, voorwaarden en eventuele acties altijd de{" "}
        <Link
          to="/prijzen"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          prijspagina van Yoga Zeeburg
        </Link>
        .
      </p>

      <h2
        id="kiezen"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zo kies je zonder te veel te betalen
      </h2>
      <p className="mt-4">Gebruik deze korte volgorde:</p>
      <ol className="mt-4 space-y-2 pl-5 [list-style-type:decimal]">
        <li>Probeer eerst meerdere lessen als je nieuw bent.</li>
        <li>Noteer hoeveel keer je in twee weken werkelijk bent geweest.</li>
        <li>Verdubbel dat aantal voor een realistische periode van vier weken.</li>
        <li>Vergelijk de bijpassende abonnementsprijs met een rittenkaart.</li>
        <li>Controleer looptijd, geldigheid en opzegvoorwaarden.</li>
        <li>Kies de kleinste optie die je normale ritme dekt; je kunt later altijd opschalen.</li>
      </ol>
      <p className="mt-4">
        De beste prijs is niet het laagste bedrag op de website. Het is het bedrag waarbij je lessen
        gebruikt, graag terugkomt en yoga zonder gedoe in je week past.
      </p>

      <h2
        id="conclusie"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Conclusie
      </h2>
      <p className="mt-4">
        Yoga in Amsterdam kost in actuele voorbeelden ongeveer €8 tot €25 per gevolgde groepsles.
        Flexibiliteit maakt een losse les of rittenkaart duurder; regelmaat maakt een abonnement
        voordeliger. Bereken altijd wat je per werkelijk gevolgde les betaalt en neem geldigheid,
        looptijd en bereikbaarheid mee.
      </p>
      <p className="mt-4">
        Ben je nieuw, gebruik dan eerst een introductieaanbod om je echte ritme te ontdekken. Pas
        daarna weet je of één les per week, twee lessen of onbeperkt yoga financieel én praktisch
        bij je past.
      </p>
    </>
  );
}

const waterArticle: Article = {
  slug: "yoga-aan-het-water-in-amsterdam-oost-rust-midden-in-de-stad",
  title: "Yoga aan het water in Amsterdam Oost: rust midden in de stad",
  h1: "Yoga aan het water in Amsterdam Oost: rust midden in de stad",
  seoTitle: "Yoga aan het water in Amsterdam Oost | Yoga Zeeburg",
  description:
    "Zoek je yoga aan het water in Amsterdam Oost? Ontdek wat de locatie van Yoga Zeeburg bijzonder maakt en hoe je een les kiest die bij je week past.",
  intro:
    "Wie yoga aan het water in Amsterdam Oost zoekt, zoekt meestal meer dan alleen een mooi adres. Je wilt een plek die praktisch in je week past en waar je even afstand kunt nemen van verkeer, werk en een vol hoofd. De ligging van Yoga Zeeburg in Cruquius helpt daarbij, maar een goede keuze hangt ook af van het soort les, de docent en hoe makkelijk je terugkomt.",
  category: CATEGORY_AMSTERDAM_OOST,
  type: "local-guide",
  pillar: false,
  publishedAt: "2026-07-31",
  updatedAt: "2026-07-31",
  readingTimeMin: 7,
  toc: [
    {
      id: "wat-betekent-yoga-aan-het-water-in-amsterdam-oost",
      label: "Wat betekent yoga aan het water in Amsterdam Oost?",
    },
    {
      id: "waarom-kan-de-omgeving-verschil-maken",
      label: "Waarom kan de omgeving verschil maken?",
    },
    {
      id: "rust-komt-niet-alleen-van-de-plek",
      label: "Rust komt niet alleen van de plek",
    },
    {
      id: "past-de-studio-praktisch-in-je-week",
      label: "Past de studio praktisch in je week?",
    },
    {
      id: "zo-maak-je-van-aankomen-een-rustmoment",
      label: "Zo maak je van aankomen een rustmoment",
    },
    {
      id: "welke-les-past-bij-jouw-moment",
      label: "Welke les past bij jouw moment?",
    },
    {
      id: "een-kleine-yogastudio-in-cruquius",
      label: "Een kleine yogastudio in Cruquius",
    },
  ],
  faqs: [
    {
      question: "Ligt Yoga Zeeburg echt aan het water?",
      answer:
        "Ja. Yoga Zeeburg zit aan de Cruquiusweg 96F in Amsterdam Oost, boven CrossFit Zeeburg en direct bij het water in Cruquius. Dat betekent niet dat iedere plek in de studio hetzelfde uitzicht of volledige stilte biedt.",
    },
    {
      question: "Is yoga aan het water automatisch rustiger?",
      answer:
        "Nee. De omgeving kan helpen bij de overgang van een drukke dag naar je les, maar het lestempo, de docent, de groep en je eigen energie bepalen ook hoe je de les ervaart.",
    },
    {
      question: "Is Yoga Zeeburg geschikt als ik nog nooit yoga heb gedaan?",
      answer:
        "Yoga Zeeburg biedt beginner-vriendelijke begeleiding. Lees vooraf de actuele lesbeschrijving, kies een toegankelijke les en vertel de docent dat het je eerste keer is. Je hoeft niet lenig of ervaren te zijn om te beginnen.",
    },
    {
      question: "Hoe kies ik een rustige les na mijn werk?",
      answer:
        "Bekijk het actuele rooster en let op de beschrijving van tempo en focus. Kies een rustiger format als je wilt vertragen, plan voldoende reistijd en controleer voor vertrek de actuele beschikbaarheid in Sportbit.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg — officiële website",
      url: "https://www.yogazeeburg.com/",
    },
    {
      title: "Yoga Zeeburg — actueel lesrooster",
      url: "https://www.yogazeeburg.com/schedule",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  heroImage: WATER_HERO_IMAGE,
  body: () => <WaterBody />,
};

function WaterBody() {
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
            Yoga Zeeburg ligt aan de Cruquiusweg 96F in Amsterdam Oost, boven CrossFit Zeeburg en
            direct bij het water in Cruquius. De plek biedt een rustige overgang tussen een drukke
            dag en je yogales, terwijl de les, docent en het tijdstip uiteindelijk bepalen of de
            ervaring echt bij je past.
          </p>
        </div>
      </section>

      <h2
        id="wat-betekent-yoga-aan-het-water-in-amsterdam-oost"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat betekent yoga aan het water in Amsterdam Oost?
      </h2>
      <p className="mt-4">
        Yoga Zeeburg zit aan de Cruquiusweg 96F in Amsterdam Oost, boven CrossFit Zeeburg en direct
        bij het water in Cruquius. Het is geen afgelegen retraite buiten de stad. Je bent nog steeds
        in Amsterdam, in de buurt van Zeeburg en de Oostelijke Eilanden, maar de omgeving voelt
        anders dan een drukke winkelstraat of een volle sportschool.
      </p>
      <p className="mt-4">
        Dat verschil zit vooral in de overgang. Je verlaat je werkdag, fietst of loopt richting de
        Cruquiusweg en komt aan op een plek waar water en ruimte deel zijn van de directe omgeving.
        De studio zelf is klein en persoonlijk. Daardoor kan het gemakkelijker zijn om van
        stadsritme naar lestempo te schakelen.
      </p>
      <p className="mt-4">
        Verwacht daarbij geen garantie op stilte, een bepaald uitzicht vanuit iedere plek in de zaal
        of een automatisch ontspannen gevoel. Yoga blijft een activiteit in een levende stadsbuurt.
        De locatie ondersteunt het moment; de les en wat jij die dag nodig hebt blijven minstens zo
        belangrijk.
      </p>

      <h2
        id="waarom-kan-de-omgeving-verschil-maken"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Waarom kan de omgeving verschil maken?
      </h2>
      <p className="mt-4">
        Een vaste plek kan een praktisch signaal worden: hier begint mijn yogamoment. Dat hoeft niet
        ingewikkeld of spiritueel te zijn. Alleen al bewust aankomen, je telefoon wegleggen en een
        paar minuten niet doorrennen kan helpen om met meer aandacht aan de les te beginnen.
      </p>
      <p className="mt-4">
        Een locatie aan het water kan prettig zijn wanneer je veel binnen werkt of de hele dag van
        afspraak naar afspraak gaat. Niet omdat water op zichzelf een bepaalde uitkomst garandeert,
        maar omdat de omgeving je uitnodigt om even uit je gebruikelijke patroon te stappen. Heb je
        tijd, dan kun je voor of na de les kort langs het water lopen. Heb je haast, dan is het nog
        steeds waardevol dat de studio op een herkenbare, rustige plek in Amsterdam Oost ligt.
      </p>
      <p className="mt-4">
        De beste locatie is uiteindelijk de locatie waar je daadwerkelijk naartoe gaat. Een studio
        kan prachtig liggen, maar als de reistijd, lestijden of sfeer niet bij je passen, wordt een
        vaste routine lastig. Lees daarom ook hoe je{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-in-amsterdam-oost-welke-yogastudio-past-bij-jou" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          een yogastudio in Amsterdam Oost kiest
        </Link>
        .
      </p>

      <ArticleFigure image={WATER_INLINE_IMAGE} className="mt-10" />

      <h2
        id="rust-komt-niet-alleen-van-de-plek"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Rust komt niet alleen van de plek
      </h2>
      <p className="mt-4">
        De omgeving is één onderdeel van je ervaring. Het tempo van de les, de manier waarop een
        docent uitlegt, de groepsgrootte en je eigen energie spelen ook mee. De ene dag heb je
        behoefte aan langzamer bewegen en meer pauzes. Op een andere dag helpt een actievere les
        juist om uit je hoofd te komen.
      </p>
      <p className="mt-4">
        Kijk daarom niet alleen naar de woorden ‘aan het water’ of ‘rustige locatie’. Controleer de
        lesbeschrijving en vraag jezelf af wat je die dag zoekt:
      </p>
      <ul className="mt-4 space-y-3 pl-5 [list-style-type:disc]">
        <li>Wil je vertragen na een volle werkdag? Kies dan een rustiger lestempo.</li>
        <li>Wil je bewegen en je aandacht verleggen? Een actievere flow kan beter passen.</li>
        <li>
          Ben je nieuw met yoga? Kies een duidelijk beschreven, toegankelijke les en laat de docent
          weten dat het je eerste keer is.
        </li>
        <li>
          Heb je een blessure, ben je zwanger of twijfel je over wat verstandig is? Overleg met een
          bevoegde zorgprofessional en informeer de docent vóór de les.
        </li>
      </ul>
      <p className="mt-4">
        Het actuele aanbod kan veranderen. Bekijk daarom altijd het huidige rooster en de actuele
        beschikbaarheid voordat je vertrekt.
      </p>

      <h2
        id="past-de-studio-praktisch-in-je-week"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Past de studio praktisch in je week?
      </h2>
      <p className="mt-4">
        Yoga werkt meestal beter als je niet iedere les opnieuw hoeft te organiseren. Controleer
        daarom vooraf hoe je bij de Cruquiusweg komt, hoeveel marge je nodig hebt en welke lestijden
        echt haalbaar zijn. Een les die theoretisch perfect klinkt maar structureel botst met werk
        of gezin, wordt zelden een ontspannen gewoonte.
      </p>
      <p className="mt-4">
        Plan bij een eerste bezoek wat extra tijd. Dan hoef je niet gehaast binnen te komen, kun je
        rustig uitzoeken waar je moet zijn en heb je tijd om iets aan de docent te vragen. In het
        artikel over een{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          proefles yoga in Amsterdam Oost
        </Link>{" "}
        lees je stap voor stap wat je kunt verwachten.
      </p>
      <p className="mt-4">
        Let ook op de reis na afloop. Kun je rustig naar huis fietsen of lopen? Ligt de studio op
        een logische route vanaf werk? Zou je de les aan een vaste avond of ochtend kunnen koppelen?
        Zulke eenvoudige vragen zeggen vaak meer over de kans dat je blijft komen dan een lange
        lijst faciliteiten.
      </p>

      <h2
        id="zo-maak-je-van-aankomen-een-rustmoment"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zo maak je van aankomen een rustmoment
      </h2>
      <p className="mt-4">
        Je hoeft niet lang van tevoren aanwezig te zijn om bewuster te beginnen. Met een paar kleine
        keuzes maak je de overgang al duidelijker:
      </p>
      <ol className="mt-4 space-y-2 pl-5 [list-style-type:decimal]">
        <li>Vertrek met voldoende marge, zodat de reis geen race wordt.</li>
        <li>Zet meldingen uit voordat de les begint.</li>
        <li>Draag kleding waarin je vrij kunt bewegen en waarin je je prettig voelt.</li>
        <li>Vertel de docent kort dat je nieuw bent of ergens rekening mee moet houden.</li>
        <li>
          Kies na afloop, als je tijd hebt, voor een rustige route langs het water in plaats van
          direct weer in je telefoon te duiken.
        </li>
      </ol>
      <p className="mt-4">
        Dit zijn geen regels die je perfect moet uitvoeren. Ze maken het alleen eenvoudiger om de
        les niet als nog een afspraak op je lijst te beleven. Kom je toch gehaast aan, dan ben je
        nog steeds welkom. Je hoeft niet eerst rustig te zijn om yoga te mogen doen.
      </p>

      <h2
        id="welke-les-past-bij-jouw-moment"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Welke les past bij jouw moment?
      </h2>
      <p className="mt-4">
        Bij Yoga Zeeburg staan actievere en rustigere lessen op het rooster. Denk niet te veel in
        ‘goed’ of ‘fout’. Kies op basis van je ervaring, energie en agenda. Een duidelijke
        lesbeschrijving helpt je vooraf inschatten wat je kunt verwachten. Voor actuele tijden,
        wijzigingen en beschikbare plekken gebruik je het rooster en Sportbit.
      </p>
      <p className="mt-4">
        Twijfel je tussen meerdere lessen, dan is vergelijken in de praktijk vaak nuttiger dan
        eindeloos lezen. Met de{" "}
        <a
          href="/trial"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          14-daagse Intro Pass
        </a>{" "}
        kun je verschillende lessen, docenten en tijden proberen voordat je een vast ritme kiest.
      </p>
      <p className="mt-4">
        Wie net begint, hoeft niet eerst lenig of ervaren te zijn. In{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-voor-beginners-in-amsterdam-oost-zo-start-je" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          yoga voor beginners in Amsterdam Oost
        </Link>{" "}
        vind je praktische hulp voor je eerste weken.
      </p>

      <h2
        id="een-kleine-yogastudio-in-cruquius"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Een kleine yogastudio in Cruquius
      </h2>
      <p className="mt-4">
        Yoga Zeeburg is een kleine, persoonlijke studio in Amsterdam Oost. De locatie boven CrossFit
        Zeeburg, aan de Cruquiusweg en bij het water, geeft de studio een duidelijke plek in de
        buurt. De benadering is nuchter: bewegen, ademen en ontdekken welke les bij je lichaam en
        week past, zonder druk om iets te bewijzen.
      </p>
      <p className="mt-4">
        Dat lokale karakter is belangrijker dan een groot gebaar. Je weet waar je naartoe gaat, kunt
        verschillende lessen proberen en bouwt stap voor stap een routine op. De rust midden in de
        stad ontstaat zo niet alleen door de ligging, maar door de combinatie van plek, begeleiding
        en een moment dat je regelmatig voor jezelf vrijmaakt.
      </p>
    </>
  );
}

const locatieArticle: Article = {
  slug: "yoga-dicht-bij-huis-waarom-locatie-helpt-om-vol-te-houden",
  title: "Yoga dicht bij huis: waarom locatie helpt om vol te houden",
  h1: "Yoga dicht bij huis: waarom locatie helpt om vol te houden",
  seoTitle: "Yoga dicht bij huis: zo houd je het vol | Yoga Zeeburg",
  description:
    "Een yogastudio dichtbij verlaagt de praktische drempel. Ontdek hoe locatie, rooster en sfeer samen bepalen of yoga echt in je week past. Zo kies je slim.",
  intro:
    "Je kunt enthousiast beginnen met yoga en toch na een paar weken afhaken. Dat zegt niet altijd iets over motivatie of de les zelf. Vaak zit het verschil in de praktische drempel: hoe ver moet je reizen, past het tijdstip en ligt de studio logisch ten opzichte van huis of werk? Een goede locatie maakt yoga niet vanzelf een gewoonte, maar haalt wel een terugkerend excuus uit de weg.",
  category: CATEGORY_AMSTERDAM_OOST,
  type: "local-guide",
  pillar: false,
  publishedAt: "2026-08-03",
  updatedAt: "2026-08-03",
  readingTimeMin: 8,
  toc: [
    {
      id: "waarom-afstand-meer-is-dan-het-aantal-kilometers",
      label: "Waarom afstand meer is dan het aantal kilometers",
    },
    {
      id: "hoe-een-handige-locatie-de-drempel-verlaagt",
      label: "Hoe een handige locatie de drempel verlaagt",
    },
    {
      id: "kies-een-studio-op-basis-van-je-echte-week",
      label: "Kies een studio op basis van je echte week",
    },
    {
      id: "test-de-locatie-niet-alleen-de-yogales",
      label: "Test de locatie, niet alleen de yogales",
    },
    {
      id: "wat-als-de-dichtstbijzijnde-studio-niet-goed-voelt",
      label: "Wat als de dichtstbijzijnde studio niet goed voelt?",
    },
    {
      id: "yoga-zeeburg-als-lokale-optie-in-amsterdam-oost",
      label: "Yoga Zeeburg als lokale optie in Amsterdam Oost",
    },
    {
      id: "maak-van-gemak-een-vaste-afspraak",
      label: "Maak van gemak een vaste afspraak",
    },
  ],
  faqs: [
    {
      question: "Hoe dicht bij huis moet een yogastudio zijn?",
      answer:
        "Daar bestaat geen vaste afstand voor. Kijk naar de totale moeite van deur tot mat: reistijd, overstappen, aankomstmarge en de terugreis. Een locatie is dichtbij genoeg wanneer je de route ook op een drukke of vermoeiende dag realistisch kunt herhalen.",
    },
    {
      question: "Is de dichtstbijzijnde yogastudio altijd de beste keuze?",
      answer:
        "Nee. Locatie is één criterium naast rooster, lesstijl, docent, sfeer en voorwaarden. Een studio iets verder weg kan beter passen als de lestijden haalbaarder zijn en je er graag terugkomt.",
    },
    {
      question: "Wat is belangrijker: locatie of lesrooster?",
      answer:
        "Ze moeten samen werken. Een studio om de hoek helpt niet als je nooit op de beschikbare tijden kunt. Kies eerst twee realistische momenten in je week en vergelijk daarna welke locaties en lessen daarbij aansluiten.",
    },
    {
      question: "Hoe test ik of een yogastudio praktisch in mijn week past?",
      answer:
        "Bezoek de studio op een tijdstip waarop je later echt zou gaan. Meet de totale reistijd, plan aankomstmarge en let op de terugreis. Probeer binnen een korte periode meerdere haalbare lesmomenten voordat je een vast ritme kiest.",
    },
  ],
  sources: [
    {
      title: "WHO — Physical activity fact sheet",
      url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
    },
    {
      title:
        "Raza et al. — Distance to sports facilities and low frequency of exercise and obesity: a cross-sectional study",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9641919/",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  body: () => <LocatieBody />,
};

function LocatieBody() {
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
            Een yogastudio dicht bij huis of op je vaste route maakt volhouden meestal makkelijker,
            omdat een les minder extra reistijd, planning en mentale onderhandeling vraagt. Afstand
            is niet de enige factor: het rooster, de docent en de sfeer moeten ook passen. De beste
            locatie is daarom niet automatisch de studio met de minste kilometers, maar de plek waar
            je op een gewone drukke week zonder veel gedoe naartoe kunt.
          </p>
        </div>
      </section>

      <h2
        id="waarom-afstand-meer-is-dan-het-aantal-kilometers"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Waarom afstand meer is dan het aantal kilometers
      </h2>
      <p className="mt-4">
        Dicht bij huis klinkt als een simpele postcodekwestie, maar in de praktijk gaat het om de
        totale moeite van een les. Tel niet alleen de reistijd. Denk ook aan omkleden, wachten op
        vervoer, parkeren, een onhandige overstap en de marge die je nodig hebt om rustig aan te
        komen. Tien minuten fietsen over een bekende route kan makkelijker voelen dan een kortere
        reis met twee overstappen.
      </p>
      <p className="mt-4">
        De relevante vraag is daarom: hoeveel extra organisatie vraagt deze yogales op een gewone
        werkdag? Een studio kan op papier dichtbij zijn en toch lastig in je week passen. Andersom
        kan een locatie iets verder weg goed werken wanneer die naast je werk, de opvang of je
        dagelijkse fietsroute ligt.
      </p>
      <p className="mt-4">
        Onderzoek naar de gebouwde omgeving en bewegen laat vooral verbanden zien: betere toegang
        tot recreatieve voorzieningen hangt in verschillende studies samen met meer lichamelijke
        activiteit. Dat bewijst niet dat nabijheid op zichzelf een routine veroorzaakt. Het
        ondersteunt wel het praktische idee dat een toegankelijke omgeving het makkelijker maakt om
        regelmatig te bewegen.
      </p>

      <h2
        id="hoe-een-handige-locatie-de-drempel-verlaagt"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Hoe een handige locatie de drempel verlaagt
      </h2>
      <p className="mt-4">
        Iedere geplande les kent een beslismoment. Ga je direct na je werk, of eerst naar huis?
        Fiets je door de regen, of stel je het uit? Als de route eenvoudig is, hoeft dat besluit
        minder energie te kosten. Je kunt vertrekken op een vast tijdstip en hoeft niet iedere week
        opnieuw te puzzelen.
      </p>
      <p className="mt-4">
        Een handige locatie helpt vooral op dagen waarop je motivatie middelmatig is. Op een
        enthousiaste zaterdag reis je misschien met plezier de hele stad door. Op een donkere
        maandagavond wint gemak vaak. Juist die gewone dagen bepalen of je na drie maanden nog
        steeds gaat.
      </p>
      <p className="mt-4">
        Dat betekent niet dat de dichtstbijzijnde studio automatisch de beste keuze is. Een passend
        rooster en een docent bij wie je je prettig voelt kunnen zwaarder wegen dan vijf minuten
        extra fietsen. Locatie verlaagt de drempel; de kwaliteit van je ervaring geeft je een reden
        om terug te komen.
      </p>

      <h2
        id="kies-een-studio-op-basis-van-je-echte-week"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Kies een studio op basis van je echte week
      </h2>
      <p className="mt-4">
        Kijk vóór je kiest naar de momenten waarop je werkelijk kunt gaan. Niet naar je ideale week,
        maar naar je agenda zoals die meestal is. Schrijf twee haalbare tijdstippen op en controleer
        daarna pas welke studio daarbij past. Zo voorkom je dat je valt voor een mooie locatie met
        lessen die je zelden kunt volgen.
      </p>
      <p className="mt-4">Beoordeel per tijdstip vier dingen:</p>
      <ol className="mt-4 space-y-2 pl-5 [list-style-type:decimal]">
        <li>
          <strong className="font-medium text-foreground">Vertrekpunt.</strong> Kom je vanaf huis,
          werk of een andere vaste afspraak?
        </li>
        <li>
          <strong className="font-medium text-foreground">Totale reistijd.</strong> Reken ook de
          marge mee die je nodig hebt om ontspannen binnen te komen.
        </li>
        <li>
          <strong className="font-medium text-foreground">Terugreis.</strong> Is de route na de les
          nog logisch en prettig?
        </li>
        <li>
          <strong className="font-medium text-foreground">Herhaalbaarheid.</strong> Zou je dit ook
          doen als je moe bent of het weer tegenzit?
        </li>
      </ol>
      <p className="mt-4">
        Bekijk vervolgens het{" "}
        <Link
          to="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          actuele lesrooster
        </Link>
        . Controleer tijden altijd opnieuw voordat je vertrekt, want een rooster kan veranderen.
        Kies liever één moment dat structureel haalbaar is dan drie ambitieuze opties die steeds
        botsen met de rest van je week.
      </p>

      <h2
        id="test-de-locatie-niet-alleen-de-yogales"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Test de locatie, niet alleen de yogales
      </h2>
      <p className="mt-4">
        Een proefperiode is niet alleen bedoeld om verschillende yogastijlen te vergelijken. Gebruik
        die periode ook om de hele routine te testen. Vertrek op het tijdstip waarop je later
        meestal zou gaan. Let op de route, je aankomst en de overgang terug naar huis.
      </p>
      <p className="mt-4">
        Stel jezelf na afloop een paar concrete vragen. Moest je haasten? Was de les gemakkelijk te
        combineren met eten, werk of gezin? Voelde de terugreis prettig? Zou je volgende week zonder
        veel overleg opnieuw kunnen gaan? Deze antwoorden zijn vaak bruikbaarder dan alleen de vraag
        of je de les leuk vond.
      </p>
      <p className="mt-4">
        Met de{" "}
        <a
          href="/trial"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          14-daagse Intro Pass
        </a>{" "}
        kun je verschillende lessen, docenten en tijden proberen. Plan bij voorkeur twee of drie
        realistische momenten. Dan ontdek je niet alleen welke les bij je past, maar ook welk ritme
        uitvoerbaar is.
      </p>

      <h2
        id="wat-als-de-dichtstbijzijnde-studio-niet-goed-voelt"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat als de dichtstbijzijnde studio niet goed voelt?
      </h2>
      <p className="mt-4">
        Kies niet uitsluitend op afstand. Als de sfeer niet prettig is, de instructie niet bij je
        past of het rooster te beperkt is, helpt nabijheid maar weinig. Een iets langere route kan
        een betere keuze zijn wanneer je daar graag terugkomt en de lestijden beter aansluiten.
      </p>
      <p className="mt-4">
        Gebruik daarom een eenvoudige volgorde. Maak eerst een kleine selectie op locatie en
        rooster. Vergelijk daarna lesstijl, docent, sfeer en voorwaarden. Het artikel{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-in-amsterdam-oost-welke-yogastudio-past-bij-jou" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          welke yogastudio in Amsterdam Oost bij jou past
        </Link>{" "}
        helpt je om die punten eerlijk naast elkaar te zetten.
      </p>
      <p className="mt-4">
        Geef een studio meer dan één kans als de eerste ervaring niet duidelijk negatief was. Een
        andere docent, lesstijl of dag kan anders voelen. Tegelijk hoef je jezelf niet te overtuigen
        van een plek waar je je niet op je gemak voelt. Volhouden vraagt weinig praktische frictie
        én voldoende vertrouwen in de omgeving.
      </p>

      <h2
        id="yoga-zeeburg-als-lokale-optie-in-amsterdam-oost"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Yoga Zeeburg als lokale optie in Amsterdam Oost
      </h2>
      <p className="mt-4">
        Yoga Zeeburg zit aan de Cruquiusweg 96F in Amsterdam Oost, boven CrossFit Zeeburg en bij het
        water. De studio ligt in Cruquius, in het Oostelijk Havengebied. Voor mensen die in Zeeburg
        of omliggende buurten wonen of werken, kan de locatie een praktische lokale optie zijn. Of
        dat voor jou echt dichtbij is, hangt af van je eigen route en weekindeling.
      </p>
      <p className="mt-4">
        De studio is klein, persoonlijk en gericht op toegankelijke, nuchtere yoga. Er staan
        rustigere en actievere lessen op het rooster. Controleer de actuele tijden en
        beschikbaarheid vooraf; verzin geen routine rond een lestijd die in de praktijk niet past.
      </p>
      <p className="mt-4">
        Ga je voor het eerst? Plan wat extra aankomsttijd en lees wat je kunt verwachten van een{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          proefles yoga in Amsterdam Oost
        </Link>
        . Daardoor kun je de locatie en de les beoordelen zonder dat haast je eerste indruk bepaalt.
      </p>

      <h2
        id="maak-van-gemak-een-vaste-afspraak"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Maak van gemak een vaste afspraak
      </h2>
      <p className="mt-4">
        Een goede locatie is een hulpmiddel, geen garantie. Maak het voordeel concreet door één vast
        lesmoment te kiezen. Leg je kleding vooraf klaar, zet de reistijd in je agenda en besluit op
        welk punt van de dag je naar de studio vertrekt. Hoe minder beslissingen je op het laatste
        moment hoeft te nemen, hoe kleiner de kans dat een drukke dag je plan overneemt.
      </p>
      <p className="mt-4">
        Begin bescheiden. Eén haalbare les per week is een sterker vertrekpunt dan een ambitieus
        schema dat je na twee weken loslaat. Als het ritme vanzelfsprekender wordt, kun je altijd
        een tweede moment toevoegen.
      </p>
      <p className="mt-4">
        De beste yogastudio dichtbij is uiteindelijk de studio die drie tests doorstaat: je kunt er
        praktisch komen, je vindt er lessen die passen en je wilt er opnieuw naartoe. Als die drie
        samenkomen, wordt yoga minder een losse goede bedoeling en meer een herkenbaar onderdeel van
        je week.
      </p>
    </>
  );
}

const ijburgArticle: Article = {
  slug: "yoga-in-ijburg-of-zeeburg-welke-locatie-past-beter",
  title: "Yoga in IJburg of Zeeburg: welke locatie past beter?",
  h1: "Yoga in IJburg of Zeeburg: welke locatie past beter?",
  seoTitle: "Yoga in IJburg of Zeeburg: wat past bij jou?",
  description:
    "Yoga in IJburg of Zeeburg? Vergelijk reistijd, rooster, sfeer en lesaanbod en ontdek welke locatie het beste in jouw week past.",
  intro:
    "IJburg en Zeeburg liggen allebei in Amsterdam Oost, maar voelen in het dagelijks leven niet hetzelfde. Een studio kan op de kaart dichtbij lijken en toch lastig in je week passen. Omgekeerd kan een iets langere fietsrit juist prima werken wanneer het rooster goed aansluit en je je prettig voelt bij de docent en de groep.",
  category: CATEGORY_AMSTERDAM_OOST,
  type: "local-guide",
  pillar: false,
  publishedAt: "2026-08-05",
  updatedAt: "2026-08-05",
  readingTimeMin: 7,
  toc: [
    {
      id: "begin-niet-bij-de-wijknaam-maar-bij-je-echte-week",
      label: "Begin niet bij de wijknaam, maar bij je echte week",
    },
    {
      id: "wanneer-is-yoga-op-ijburg-de-logische-keuze",
      label: "Wanneer is yoga op IJburg de logische keuze?",
    },
    {
      id: "wanneer-past-yoga-in-zeeburg-beter",
      label: "Wanneer past yoga in Zeeburg beter?",
    },
    {
      id: "vergelijk-twee-echte-lesmomenten",
      label: "Vergelijk twee echte lesmomenten",
    },
    {
      id: "afstand-is-meer-dan-het-aantal-kilometers",
      label: "Afstand is meer dan het aantal kilometers",
    },
    {
      id: "probeer-eerst-beslis-daarna",
      label: "Probeer eerst, beslis daarna",
    },
    {
      id: "de-beste-locatie-is-de-plek-waar-je-terugkomt",
      label: "De beste locatie is de plek waar je terugkomt",
    },
  ],
  faqs: [
    {
      question: "Is yoga in IJburg beter bereikbaar dan yoga in Zeeburg?",
      answer:
        "Dat hangt af van je vertrekpunt en het tijdstip. Vanuit IJburg kan een lokale studio de kortste route zijn. Vanuit Cruquius, Zeeburg of het Oostelijk Havengebied kan Yoga Zeeburg juist logischer liggen. Vergelijk de volledige deur-tot-deurroute voor een echte lestijd.",
    },
    {
      question: "Moet ik altijd de dichtstbijzijnde yogastudio kiezen?",
      answer:
        "Nee. Nabijheid helpt, maar een passend rooster, een prettige docent en een sfeer waarin je wilt terugkomen zijn minstens zo belangrijk. Kies de combinatie die je op drukke weken kunt volhouden.",
    },
    {
      question: "Kan ik Yoga Zeeburg proberen voordat ik kies?",
      answer:
        "Ja. Met de 14-daagse Intro Pass kun je verschillende lessen, docenten en tijden proberen. Controleer vooraf het actuele rooster en boek momenten die je ook later structureel zou kunnen volgen.",
    },
    {
      question: "Is Yoga Zeeburg geschikt voor beginners?",
      answer:
        "Yoga Zeeburg is beginnersvriendelijk. Lees de lesomschrijving, kies een toegankelijk moment en vertel de docent vóór de les dat je nieuw bent. Je hoeft niet lenig of ervaren te zijn.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg — officiële website",
      url: "https://www.yogazeeburg.com/",
    },
    {
      title: "Yoga Zeeburg — actueel rooster",
      url: "https://www.yogazeeburg.com/schedule",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  heroImage: IJBURG_HERO_IMAGE,
  body: () => <IjburgBody />,
};

function IjburgBody() {
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
            Er is geen locatie die voor iedereen beter is. Woon of werk je op IJburg en kun je daar
            zonder omweg naar een passende les, dan is yoga op IJburg waarschijnlijk de praktischste
            keuze. Zoek je een kleine, persoonlijke studio in Cruquius of Zeeburg en past het rooster
            bij jouw week, dan kan Yoga Zeeburg beter aansluiten.
          </p>
          <p>
            Vergelijk daarom niet alleen kilometers, maar vooral de totale reistijd, de beschikbare
            lestijden, de sfeer en hoe makkelijk je opnieuw boekt. De beste yogalocatie is meestal de
            plek waar je op een gewone drukke week daadwerkelijk naartoe blijft gaan.
          </p>
        </div>
      </section>

      <p className="mt-10">
        Wie twijfelt tussen yoga in IJburg of Zeeburg hoeft daarom niet te zoeken naar een algemene
        winnaar. De betere vraag is: bij welke locatie wordt de drempel om te gaan het laagst?
      </p>

      <h2
        id="begin-niet-bij-de-wijknaam-maar-bij-je-echte-week"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Begin niet bij de wijknaam, maar bij je echte week
      </h2>
      <p className="mt-4">
        Een goede yogaroutine ontstaat doordat route en tijdstip zo logisch zijn dat je ook gaat
        wanneer je moe bent of je werkdag uitloopt. Kijk daarom naar twee concrete wekelijkse
        lesmomenten en reken de hele route mee: vertrekken, reizen, de les en weer thuiskomen. Een
        studio die hemelsbreed dichterbij ligt, kan door een onhandige verbinding of lestijd alsnog
        meer gedoe opleveren.
      </p>
      <p className="mt-4">Gebruik daarna drie eenvoudige vragen:</p>
      <ol className="mt-4 space-y-2 pl-5 [list-style-type:decimal]">
        <li>Kan ik hier op minstens twee realistische momenten per week terecht?</li>
        <li>Past de route bij waar ik vóór en na de les ben?</li>
        <li>Voel ik voldoende vertrouwen om ook op een mindere dag te gaan?</li>
      </ol>
      <p className="mt-4">
        Wil je uitgebreider kijken naar locatie, lesstijl, docent en sfeer? Lees dan ook{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-in-amsterdam-oost-welke-yogastudio-past-bij-jou" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          welke yogastudio in Amsterdam Oost bij jou past
        </Link>
        .
      </p>

      <h2
        id="wanneer-is-yoga-op-ijburg-de-logische-keuze"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wanneer is yoga op IJburg de logische keuze?
      </h2>
      <p className="mt-4">
        Yoga op IJburg ligt voor de hand wanneer IJburg het vaste middelpunt van je dag is. Woon je
        er, werk je er of combineer je de les gemakkelijk met school, boodschappen of andere
        afspraken, dan kan de korte en bekende route veel verschil maken.
      </p>
      <p className="mt-4">
        Dat voordeel telt alleen wanneer het rooster aansluit. Controleer daarom welke les je op een
        gewone werkdag werkelijk zou boeken.
      </p>
      <p className="mt-4">Kies waarschijnlijk voor IJburg wanneer:</p>
      <ul className="mt-4 space-y-2 pl-5 [list-style-type:disc]">
        <li>je vanuit huis of werk zonder omweg naar de les kunt;</li>
        <li>er meerdere passende lestijden in je week staan;</li>
        <li>je na een avondles snel thuis wilt zijn;</li>
        <li>je een studio hebt gevonden waar stijl, begeleiding en sfeer goed voelen.</li>
      </ul>

      <h2
        id="wanneer-past-yoga-in-zeeburg-beter"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wanneer past yoga in Zeeburg beter?
      </h2>
      <p className="mt-4">
        Zeeburg kan logischer zijn wanneer je route door Cruquius, het Oostelijk Havengebied of een
        ander deel van Amsterdam Oost loopt. Yoga Zeeburg zit aan de Cruquiusweg 96F, boven CrossFit
        Zeeburg en bij het water. Het is een kleine, persoonlijke studio met een nuchtere benadering.
      </p>
      <p className="mt-4">
        Die setting past bij mensen die waarde hechten aan een rustige sfeer en persoonlijke
        begeleiding. De ligging is alleen een voordeel als route en lestijden werken. Bekijk daarom
        het{" "}
        <Link
          to="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          actuele rooster
        </Link>{" "}
        voordat je beslist.
      </p>
      <p className="mt-4">Kies waarschijnlijk voor Yoga Zeeburg wanneer:</p>
      <ul className="mt-4 space-y-2 pl-5 [list-style-type:disc]">
        <li>Cruquius of Zeeburg logisch op je dagelijkse route ligt;</li>
        <li>je een kleine en persoonlijke studio prettig vindt;</li>
        <li>je verschillende lessen en docenten in de praktijk wilt vergelijken;</li>
        <li>
          de combinatie van locatie, sfeer en rooster de drempel verlaagt om terug te komen.
        </li>
      </ul>

      <h2
        id="vergelijk-twee-echte-lesmomenten"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Vergelijk twee echte lesmomenten
      </h2>
      <p className="mt-4">
        Een eerlijke vergelijking maak je met twee concrete boekingen. Kies bij iedere locatie een
        les die qua stijl én tijd realistisch is en vergelijk dezelfde punten.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-left text-[15px]">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 pr-4 font-display font-medium text-foreground">Vergelijkpunt</th>
              <th className="py-3 font-display font-medium text-foreground">Vraag aan jezelf</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="py-3 pr-4 align-top font-medium text-foreground">Route</td>
              <td className="py-3 align-top">
                Kon ik zonder haast aankomen en weer thuiskomen?
              </td>
            </tr>
            <tr>
              <td className="py-3 pr-4 align-top font-medium text-foreground">Rooster</td>
              <td className="py-3 align-top">Zijn er minstens twee haalbare momenten per week?</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 align-top font-medium text-foreground">Les</td>
              <td className="py-3 align-top">Paste tempo, niveau en uitleg bij wat ik zocht?</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 align-top font-medium text-foreground">Sfeer</td>
              <td className="py-3 align-top">Voelde ik me op mijn gemak in de ruimte en groep?</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 align-top font-medium text-foreground">Begeleiding</td>
              <td className="py-3 align-top">
                Kon ik iets vragen en waren aanpassingen duidelijk?
              </td>
            </tr>
            <tr>
              <td className="py-3 pr-4 align-top font-medium text-foreground">Herhaalbaarheid</td>
              <td className="py-3 align-top">
                Zou ik dezezelfde les volgende week opnieuw boeken?
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4">
        De laatste vraag is het belangrijkst: een sterke eerste indruk zegt minder dan de bereidheid
        om terug te gaan.
      </p>

      <ArticleFigure
        image={IJBURG_INLINE_IMAGE}
        caption="De beste yogalocatie is meestal de plek die zonder gedoe in je week past."
        className="mt-10"
      />

      <h2
        id="afstand-is-meer-dan-het-aantal-kilometers"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Afstand is meer dan het aantal kilometers
      </h2>
      <p className="mt-4">
        Reistijd is niet alleen de tijd op de fiets of in het openbaar vervoer. Ook overstappen,
        wachten en gehaast aankomen tellen mee. Een locatie kan vanuit huis ideaal zijn, maar vanaf
        kantoor onpraktisch. Vergelijk dus de situatie waarin je daadwerkelijk gaat, niet alleen je
        woonadres.
      </p>
      <p className="mt-4">
        Dit sluit aan bij een bredere regel:{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-dicht-bij-huis-waarom-locatie-helpt-om-vol-te-houden" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          yoga dicht bij huis helpt vooral wanneer de hele routine eenvoudig blijft
        </Link>
        .
      </p>

      <h2
        id="probeer-eerst-beslis-daarna"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Probeer eerst, beslis daarna
      </h2>
      <p className="mt-4">
        Een website vertelt je welke lessen er zijn, maar niet volledig hoe een plek voelt. Probeer
        daarom meer dan één les; docent, tempo en groep kunnen per moment verschillen.
      </p>
      <p className="mt-4">
        Bij Yoga Zeeburg kun je met de 14-daagse Intro Pass verschillende lessen, docenten en tijden
        uitproberen. Test vooral twee of drie momenten die je later structureel zou willen volgen. Zo
        ontdek je of de locatie praktisch onderdeel van je week kan worden.
      </p>
      <section
        aria-labelledby="contextuele-cta-heading"
        className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8"
      >
        <h3
          id="contextuele-cta-heading"
          className="font-display text-lg font-medium tracking-tight text-foreground"
        >
          Welke locatie werkt in jouw week?
        </h3>
        <p className="mt-3 text-foreground">
          Probeer Yoga Zeeburg 14 dagen en test verschillende lessen en tijden voordat je een vast
          ritme kiest.{" "}
          <a
            href="/trial"
            className="font-medium text-primary underline underline-offset-4 hover:no-underline"
          >
            Bekijk de 14-daagse Intro Pass
          </a>
          .
        </p>
      </section>

      <h2
        id="de-beste-locatie-is-de-plek-waar-je-terugkomt"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        De beste locatie is de plek waar je terugkomt
      </h2>
      <p className="mt-4">
        IJburg is waarschijnlijk de beste keuze als je daar woont of werkt, een passende studio hebt
        gevonden en de route vanzelfsprekend is. Zeeburg past beter als Cruquius logisch ligt, het
        rooster aansluit en je de kleine, persoonlijke sfeer van Yoga Zeeburg prettig vindt.
      </p>
      <p className="mt-4">
        Maak de keuze niet groter dan nodig. Vergelijk twee echte lesmomenten, let op de volledige
        route en vraag jezelf na afloop af waar opnieuw boeken het makkelijkst voelt. De plek waar
        dat antwoord duidelijk is, past waarschijnlijk het beste bij jou.
      </p>
    </>
  );
}

const indischeBuurtArticle: Article = {
  slug: "yoga-in-de-indische-buurt-en-omgeving-welke-opties-zijn-er",
  title: "Yoga in de Indische Buurt en omgeving: welke opties zijn er?",
  h1: "Yoga in de Indische Buurt en omgeving: welke opties zijn er?",
  seoTitle: "Yoga in de Indische Buurt: zo kies je een studio",
  description:
    "Zoek je yoga in de Indische Buurt? Vergelijk route, rooster, lesstijl en sfeer en ontdek welke yogastudio in Amsterdam Oost bij je past.",
  intro:
    "Zoek je yoga in de Indische Buurt of vlak daarbuiten? Dan heb je meerdere soorten opties in Amsterdam Oost. De beste keuze is meestal niet de studio die op papier het dichtstbij ligt, maar de plek waar route, lestijden, lesstijl en sfeer samen passen bij je week.",
  category: CATEGORY_AMSTERDAM_OOST,
  type: "local-guide",
  pillar: false,
  publishedAt: "2026-08-07",
  updatedAt: "2026-08-07",
  readingTimeMin: 7,
  toc: [
    {
      id: "welke-soorten-yoga-opties-vind-je-rond-de-indische-buurt",
      label: "Welke soorten yoga-opties vind je rond de Indische Buurt?",
    },
    { id: "kijk-verder-dan-de-buurtgrens", label: "Kijk verder dan de buurtgrens" },
    {
      id: "vier-criteria-die-je-keuze-eenvoudiger-maken",
      label: "Vier criteria die je keuze eenvoudiger maken",
    },
    { id: "een-lokale-optie-aan-de-cruquiusweg", label: "Een lokale optie aan de Cruquiusweg" },
    { id: "probeer-niet-alles-tegelijk", label: "Probeer niet alles tegelijk" },
    {
      id: "zo-kies-je-een-yoga-optie-die-blijft-werken",
      label: "Zo kies je een yoga-optie die blijft werken",
    },
  ],
  faqs: [
    {
      question: "Waar vind ik yoga in de Indische Buurt en omgeving?",
      answer:
        "Je vindt in en rond de Indische Buurt gespecialiseerde yogastudio’s, zelfstandige buurtlessen en sportlocaties met yoga. Neem ook nabijgelegen delen van Amsterdam Oost mee, zoals Zeeburg, het Oostelijk Havengebied en Cruquius. Vergelijk altijd het actuele rooster en de deur-tot-deurroute.",
    },
    {
      question: "Is Yoga Zeeburg goed bereikbaar vanuit de Indische Buurt?",
      answer:
        "Yoga Zeeburg ligt aan de Cruquiusweg 96F in Amsterdam Oost. Of dat voor jou praktisch is, hangt af van je vertrekpunt, vervoersmiddel en lestijd. Controleer de route op het moment waarop je normaal naar les zou gaan; een wijknaam alleen zegt te weinig over de echte reistijd.",
    },
    {
      question: "Welke yogales is geschikt als ik beginner ben?",
      answer:
        "Kies een les met een duidelijke, beginnersvriendelijke beschrijving en een docent die opties geeft. Rustig betekent niet automatisch eenvoudig en actief betekent niet automatisch ongeschikt. Vraag bij twijfel aan de studio welke les het beste past bij je ervaring en wat je zoekt.",
    },
    {
      question: "Hoeveel lessen moet ik proberen voordat ik kies?",
      answer:
        "Twee lessen geven meestal een beter beeld dan één. Je ervaart dan mogelijk een andere docent of lesstijl en merkt of de route ook een tweede keer haalbaar voelt. Beoordeel daarna of je jezelf de volgende week gemakkelijk ziet terugkomen.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg — homepage en studio-informatie",
      url: "https://www.yogazeeburg.com/",
    },
    {
      title: "Yoga Zeeburg — regulier weekrooster",
      url: "https://www.yogazeeburg.com/schedule",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  heroImage: INDISCHE_HERO_IMAGE,
  body: () => <IndischeBuurtBody />,
};

function IndischeBuurtBody() {
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
            In en rond de Indische Buurt kun je kiezen uit yogastudio’s, losse lessen en
            sportlocaties met yoga. Kijk daarbij verder dan alleen de postcode. Vergelijk de
            volledige deur-tot-deurroute, het actuele rooster, de uitleg per les en de sfeer tijdens
            een proefles. Ook het Oostelijk Havengebied, Zeeburg en Cruquius kunnen praktisch
            dichtbij zijn, afhankelijk van waar je woont en hoe je reist. Yoga Zeeburg ligt aan de
            Cruquiusweg in Amsterdam Oost en biedt een kleine, persoonlijke setting met rustige én
            actievere lessen.
          </p>
        </div>
      </section>

      <p className="mt-10">
        Woon je in de Indische Buurt en zoek je een yogales die je ook echt kunt volhouden? Dan hoef
        je je niet alleen op de buurtgrens te richten. In Amsterdam Oost liggen verschillende soorten
        yoga-aanbod relatief dicht bij elkaar. Wat voor jou praktisch is, hangt af van je
        vertrekpunt, vervoersmiddel, gewenste lestijd en het soort les dat je zoekt.
      </p>

      <h2
        id="welke-soorten-yoga-opties-vind-je-rond-de-indische-buurt"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Welke soorten yoga-opties vind je rond de Indische Buurt?
      </h2>
      <p className="mt-4">
        Het lokale aanbod is grofweg in drie vormen te verdelen. Er zijn gespecialiseerde
        yogastudio’s met meerdere lessen en docenten. Daarnaast geven zelfstandige docenten soms les
        in buurt- of bewegingsruimtes. Ook zijn er sportlocaties waar yoga onderdeel is van een
        breder programma.
      </p>
      <p className="mt-4">
        Geen vorm is automatisch beter. Een gespecialiseerde studio kan prettig zijn als je
        verschillende stijlen en tijden wilt proberen. Een vaste wekelijkse buurtles kan juist
        overzichtelijk en vertrouwd voelen. Een sportlocatie kan logisch zijn wanneer je yoga met
        andere training combineert. Controleer wel altijd wat er daadwerkelijk op het rooster staat
        en voor welk niveau een les bedoeld is.
      </p>
      <p className="mt-4">
        Wil je eerst breder vergelijken? Lees dan ook{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-in-amsterdam-oost-welke-yogastudio-past-bij-jou" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          welke yogastudio in Amsterdam Oost bij je past
        </Link>
        .
      </p>

      <h2
        id="kijk-verder-dan-de-buurtgrens"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Kijk verder dan de buurtgrens
      </h2>
      <p className="mt-4">
        De Indische Buurt grenst aan andere delen van Amsterdam Oost. Daardoor kan een studio in
        Zeeburg, het Oostelijk Havengebied of Cruquius in de praktijk net zo bereikbaar zijn als een
        locatie binnen de buurt zelf. Een plek die hemelsbreed dichtbij ligt, is niet altijd de
        snelste deur-tot-deurroute. Een goede fietsverbinding of directe route met het openbaar
        vervoer kan belangrijker zijn dan de naam van de wijk.
      </p>
      <p className="mt-4">
        Plan daarom één keer de volledige route op het tijdstip waarop je normaal naar les zou gaan.
        Neem ook het laatste stuk mee: waar parkeer je je fiets, hoe vind je de ingang en hoeveel
        speling heb je nodig? In{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-dicht-bij-huis-waarom-locatie-helpt-om-vol-te-houden" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Yoga dicht bij huis: waarom locatie helpt om vol te houden
        </Link>{" "}
        lees je waarom die praktische details vaak meer verschil maken dan een paar minuten op de
        kaart.
      </p>

      <ArticleFigure
        image={INDISCHE_INLINE_IMAGE}
        caption="De beste yogalocatie past bij je route, rooster en gewone week."
        className="mt-10"
      />

      <h2
        id="vier-criteria-die-je-keuze-eenvoudiger-maken"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Vier criteria die je keuze eenvoudiger maken
      </h2>

      <h3 className="mt-8 font-display text-xl font-medium tracking-tight text-foreground">
        1. Een rooster met een uitwijkmogelijkheid
      </h3>
      <p className="mt-4">
        Eén perfecte les op één avond kan aantrekkelijk lijken, maar is kwetsbaar zodra je agenda
        verandert. Kijk of er binnen dezelfde week een tweede haalbaar moment is. Zo hoeft een drukke
        werkdag niet meteen te betekenen dat je een hele week overslaat.
      </p>

      <h3 className="mt-8 font-display text-xl font-medium tracking-tight text-foreground">
        2. Duidelijke lesbeschrijvingen
      </h3>
      <p className="mt-4">
        Namen als flow, yin of restorative geven een richting, maar zeggen niet alles over tempo en
        intensiteit. Een goede beschrijving vertelt of een les actief of rustig is, hoeveel ervaring
        je nodig hebt en wat je ongeveer kunt verwachten. Bekijk daarom vóór je boekt de{" "}
        <Link
          to="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          actuele lesmogelijkheden en tijden
        </Link>
        .
      </p>

      <h3 className="mt-8 font-display text-xl font-medium tracking-tight text-foreground">
        3. Een sfeer waarin je kunt beginnen zoals je bent
      </h3>
      <p className="mt-4">
        De website geeft een eerste indruk, maar de ervaring in de ruimte telt zwaarder. Word je
        vriendelijk ontvangen? Zijn aanwijzingen helder? Voel je ruimte om een houding aan te passen
        of even rust te nemen? Zeker als beginner is een benaderbare docent vaak belangrijker dan een
        uitgebreid aanbod op papier.
      </p>

      <h3 className="mt-8 font-display text-xl font-medium tracking-tight text-foreground">
        4. Een route die past bij je echte week
      </h3>
      <p className="mt-4">
        Test de route niet op een rustige zondagmiddag als je meestal na je werk gaat. Let op
        verkeer, overstappen en de tijd die je nodig hebt om zonder haast binnen te komen. De beste
        locatie is vaak de plek waar je op een gewone, volle dag nog steeds naartoe gaat.
      </p>

      <h2
        id="een-lokale-optie-aan-de-cruquiusweg"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Een lokale optie aan de Cruquiusweg
      </h2>
      <p className="mt-4">
        Yoga Zeeburg is een kleine yogastudio aan de Cruquiusweg 96F, boven CrossFit Zeeburg en vlak
        bij het water. Vanuit delen van de Indische Buurt kan Cruquius een logische optie zijn, maar
        de precieze route verschilt per vertrekpunt. Controleer die daarom voor je boekt.
      </p>
      <p className="mt-4">
        Op het reguliere rooster staan zowel actievere als rustigere lessen. De studio omschrijft
        zichzelf als persoonlijk, nuchter en beginnersvriendelijk. Voor actuele wijzigingen,
        beschikbaarheid en reserveringen blijft het boekingssysteem leidend.
      </p>
      <section
        aria-labelledby="contextuele-cta-heading"
        className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8"
      >
        <h3
          id="contextuele-cta-heading"
          className="font-display text-lg font-medium tracking-tight text-foreground"
        >
          Wil je ontdekken of deze route en sfeer bij je passen?
        </h3>
        <p className="mt-3 text-foreground">
          Met de 14-daagse introductiepas kun je verschillende lessen, docenten en tijden proberen.
          Zo beoordeel je niet alleen één les, maar ook hoe makkelijk yoga in je gewone week past.{" "}
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
        id="probeer-niet-alles-tegelijk"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Probeer niet alles tegelijk
      </h2>
      <p className="mt-4">
        Maak eerst een shortlist van twee locaties die praktisch haalbaar zijn. Kies bij iedere
        locatie een les die past bij wat je nu nodig hebt: rustiger als je wilt vertragen, actiever
        als je wilt bewegen. Probeer bij voorkeur twee lessen voordat je een oordeel vormt. De
        docent, groepsgrootte en energie kunnen per moment verschillen.
      </p>
      <p className="mt-4">
        Noteer na afloop kort drie dingen: hoe voelde de route, begreep je de begeleiding en zou je
        volgende week opnieuw gaan? Dat laatste is vaak de beste graadmeter. Een studio hoeft niet in
        elk opzicht perfect te zijn; ze moet vooral goed genoeg passen om regelmatig terug te keren.
      </p>

      <h2
        id="zo-kies-je-een-yoga-optie-die-blijft-werken"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zo kies je een yoga-optie die blijft werken
      </h2>
      <p className="mt-4">
        Voor yoga in de Indische Buurt en omgeving zijn er meerdere mogelijkheden. Maak de keuze
        klein en praktisch: vergelijk twee locaties, controleer het echte rooster, test de route en
        volg een proefles. Kijk daarna niet alleen naar de les zelf, maar naar het complete ritueel
        van vertrek tot thuiskomst.
      </p>
      <p className="mt-4">
        Woon je in Amsterdam Oost, dan kan het zinvol zijn om de omliggende buurten mee te nemen. Een
        studio in Zeeburg of Cruquius kan door de route en het rooster beter passen dan een adres dat
        op de kaart iets dichterbij lijkt.
      </p>
    </>
  );
}

const expatsArticle: Article = {
  slug: "yoga-voor-expats-in-amsterdam-east-what-to-expect",
  title: "Yoga voor expats in Amsterdam East: what to expect",
  h1: "Yoga voor expats in Amsterdam East: what to expect",
  seoTitle: "Yoga voor expats in Amsterdam East: wat kun je verwachten?",
  description:
    "Nieuw in Amsterdam East en op zoek naar yoga? Lees wat je kunt verwachten van taal, lesniveau, boeken, voorbereiding en een eerste proefles.",
  intro:
    "Ben je nieuw in Amsterdam East en wil je yoga gebruiken om te bewegen, te ontspannen of mensen in je buurt te leren kennen? Dan helpt het om vooraf te weten hoe lessen, taal, boeken en proefmogelijkheden meestal zijn geregeld.",
  category: CATEGORY_AMSTERDAM_OOST,
  type: "local-guide",
  pillar: false,
  publishedAt: "2026-08-10",
  updatedAt: "2026-08-10",
  readingTimeMin: 7,
  toc: [
    {
      id: "is-nederlands-nodig-voor-een-yogales-in-amsterdam",
      label: "Is Nederlands nodig voor een yogales in Amsterdam?",
    },
    { id: "hoe-kies-je-een-eerste-les", label: "Hoe kies je een eerste les?" },
    {
      id: "wat-neem-je-mee-en-wat-trek-je-aan",
      label: "Wat neem je mee en wat trek je aan?",
    },
    {
      id: "hoe-werkt-boeken-en-betalen-meestal",
      label: "Hoe werkt boeken en betalen meestal?",
    },
    {
      id: "wat-kun-je-tijdens-de-eerste-les-verwachten",
      label: "Wat kun je tijdens de eerste les verwachten?",
    },
    {
      id: "kan-yoga-helpen-om-je-thuis-te-voelen-in-een-nieuwe-buurt",
      label: "Kan yoga helpen om je thuis te voelen in een nieuwe buurt?",
    },
    { id: "yoga-zeeburg-in-amsterdam-east", label: "Yoga Zeeburg in Amsterdam East" },
    { id: "een-goede-eerste-stap-voor-expats", label: "Een goede eerste stap voor expats" },
  ],
  faqs: [
    {
      question: "Worden yogalessen in Amsterdam East in het Engels gegeven?",
      answer:
        "Dat verschilt per studio, docent en les. Veel informatie en yogatermen zijn Engelstalig, maar neem niet aan dat iedere les volledig in het Engels is. Controleer de lesbeschrijving of vraag vooraf welke voertaal wordt gebruikt.",
    },
    {
      question: "Moet ik Nederlands spreken om bij Yoga Zeeburg mee te doen?",
      answer:
        "De website en lesbeschrijvingen van Yoga Zeeburg zijn in het Engels. Vraag voor een specifieke les vooraf welke taal de docent gebruikt en of belangrijke aanwijzingen in het Engels kunnen worden gegeven.",
    },
    {
      question: "Is yoga geschikt als ik nog nooit eerder yoga heb gedaan?",
      answer:
        "Ja. Kies een les die als beginner-friendly of all levels is beschreven, vertel de docent dat het je eerste les is en neem rust wanneer dat nodig is. Je hoeft houdingen niet perfect uit te voeren.",
    },
    {
      question: "Hoe vroeg moet ik voor mijn eerste les aanwezig zijn?",
      answer:
        "Vijf tot tien minuten extra is meestal praktisch. Je hebt dan tijd om de ingang te vinden, je spullen weg te leggen en kort kennis te maken met de docent zonder de start van de les te vertragen.",
    },
    {
      question: "Kan ik eerst meerdere lessen proberen voordat ik een lidmaatschap kies?",
      answer:
        "Ja. Een introductiepas is bedoeld om verschillende lessen, docenten en tijden te vergelijken. Zo ontdek je eerst wat qua stijl, taal, route en rooster werkt voordat je een langer abonnement kiest.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg — homepage en studio-informatie",
      url: "https://www.yogazeeburg.com/",
    },
    {
      title: "Yoga Zeeburg — lesbeschrijvingen",
      url: "https://www.yogazeeburg.com/classes",
    },
    {
      title: "Yoga Zeeburg — regulier weekrooster",
      url: "https://www.yogazeeburg.com/schedule",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  heroImage: EXPATS_HERO_IMAGE,
  body: () => <ExpatsBody />,
};

function ExpatsBody() {
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
            Als expat kun je in Amsterdam East gemakkelijk met yoga beginnen, ook wanneer je nog
            weinig Nederlands spreekt. Veel studio-informatie en yogatermen zijn in het Engels
            beschikbaar, maar de voertaal kan per docent en les verschillen. Controleer daarom vooraf
            de lesbeschrijving en vraag bij twijfel welke taal wordt gebruikt. Je boekt meestal
            online, komt enkele minuten eerder en draagt comfortabele sportkleding. Kies een les die
            past bij je ervaring en gewenste intensiteit; een introductiepas is handig om meerdere
            docenten, lestijden en stijlen te vergelijken voordat je een vast ritme kiest.
          </p>
        </div>
      </section>

      <p className="mt-10">
        Ben je nieuw in Amsterdam East en wil je yoga gebruiken om te bewegen, te ontspannen of
        mensen in je buurt te leren kennen? Dan helpt het om vooraf te weten hoe lessen, taal, boeken
        en proefmogelijkheden meestal zijn geregeld. De praktische drempel is meestal laag, maar niet
        iedere studio of les werkt precies hetzelfde.
      </p>

      <h2
        id="is-nederlands-nodig-voor-een-yogales-in-amsterdam"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Is Nederlands nodig voor een yogales in Amsterdam?
      </h2>
      <p className="mt-4">
        Nee, goed Nederlands spreken is niet altijd nodig. Amsterdam heeft een grote internationale
        gemeenschap en veel deelnemers, docenten en studio’s gebruiken Engels. Bovendien komen veel
        yogatermen uit het Engels of Sanskriet. Woorden als <em>vinyasa</em>,{" "}
        <em>child’s pose</em> en <em>savasana</em> klinken daardoor mogelijk al vertrouwd.
      </p>
      <p className="mt-4">
        Toch is het verstandig om niet automatisch aan te nemen dat iedere les volledig Engelstalig
        is. De voertaal kan per docent, tijdstip en groep verschillen. Vraag vooraf welke taal
        hoofdzakelijk wordt gebruikt en of belangrijke aanwijzingen kort in het Engels kunnen worden
        herhaald. Zeker als beginner is helder begrijpen wat je moet doen belangrijker dan het label
        Nederlands of Engels.
      </p>
      <p className="mt-4">
        Meer nuance vind je in{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "nederlandse-of-engelse-yogales-in-amsterdam-wat-past-bij-jou" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Nederlandse of Engelse yogales in Amsterdam: wat past bij jou?
        </Link>
        .
      </p>

      <h2
        id="hoe-kies-je-een-eerste-les"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Hoe kies je een eerste les?
      </h2>
      <p className="mt-4">
        Begin met wat je op dit moment nodig hebt. Wil je na een drukke werkdag vertragen, zoek dan
        een rustige, herstellende les. Wil je bewegen en energie opbouwen, kijk dan naar een flow- of
        actievere les. De naam alleen vertelt niet altijd genoeg. Lees ook het tempo, aanbevolen
        ervaringsniveau en de volledige beschrijving.
      </p>
      <p className="mt-4">
        Bij Yoga Zeeburg vind je op de Engelse website beschrijvingen van rustige, gebalanceerde en
        actievere lessen. Het{" "}
        <Link
          to="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          reguliere weekrooster
        </Link>{" "}
        laat zien op welke dagen en tijden ze staan. Voor actuele wijzigingen, vrije plekken en
        reserveringen is het boekingssysteem leidend.
      </p>
      <p className="mt-4">
        Ben je nieuw met yoga? Kies dan bij voorkeur een les die expliciet als beginner-friendly of
        all levels wordt omschreven. Een sterkere flow kan prima passen als je al ervaring hebt, maar
        is minder logisch wanneer je nog vertrouwd moet raken met houdingen en overgangen.
      </p>

      <h2
        id="wat-neem-je-mee-en-wat-trek-je-aan"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat neem je mee en wat trek je aan?
      </h2>
      <p className="mt-4">
        Je hebt geen speciale outfit nodig. Draag kleding waarin je vrij kunt bewegen en waarin je je
        comfortabel voelt bij buigen, zitten en liggen. Vermijd bij voorkeur dikke, stijve kleding.
        Neem water mee als je dat prettig vindt en controleer vooraf of de studio matten en andere
        hulpmiddelen beschikbaar stelt of dat je zelf een mat moet meenemen.
      </p>
      <p className="mt-4">
        Eet liever geen grote maaltijd vlak vóór de les. Plan daarnaast genoeg tijd om zonder haast
        aan te komen. Voor een eerste bezoek is vijf tot tien minuten extra praktisch: je vindt
        rustig de ingang, kunt je spullen wegleggen en hebt tijd om de docent iets te vragen.
      </p>

      <h2
        id="hoe-werkt-boeken-en-betalen-meestal"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Hoe werkt boeken en betalen meestal?
      </h2>
      <p className="mt-4">
        Veel studio’s in Amsterdam werken met een online reserveringssysteem. Je maakt een account
        aan, kiest een losse les, proefaanbod of lidmaatschap en reserveert vervolgens je plek.
        Controleer de annuleringsvoorwaarden; bij een late annulering kan een les soms toch worden
        afgeschreven.
      </p>
      <p className="mt-4">
        Kijk niet alleen naar de prijs van één les. Een introductieaanbod geeft vaak een beter beeld,
        omdat je verschillende momenten en docenten kunt proberen. Daarna kun je bepalen of een losse
        kaart of abonnement bij je verwachte ritme past. In{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "wat-kost-yoga-in-amsterdam-en-waar-betaal-je-voor" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Wat kost yoga in Amsterdam en waar betaal je voor?
        </Link>{" "}
        lees je welke onderdelen je kunt vergelijken.
      </p>

      <ArticleFigure
        image={EXPATS_INLINE_IMAGE}
        caption="Een vaste yogales kan snel een vertrouwd moment in je nieuwe week worden."
        className="mt-10"
      />

      <h2
        id="wat-kun-je-tijdens-de-eerste-les-verwachten"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat kun je tijdens de eerste les verwachten?
      </h2>
      <p className="mt-4">
        Een les begint meestal met kort landen en aandacht voor de adem. Daarna volgt beweging,
        langere houdingen of een combinatie daarvan, afhankelijk van de lesstijl. Veel lessen
        eindigen met een rustige eindontspanning. Je hoeft houdingen niet perfect uit te voeren en je
        hoeft niemand bij te houden.
      </p>
      <p className="mt-4">
        Vertel de docent vóór de les dat het je eerste bezoek is. Meld ook wanneer je een instructie
        niet begrijpt of ergens rekening mee wilt houden. Je mag altijd een houding overslaan, een
        rusthouding nemen of een variant kiezen. Kijk gerust naar de docent of andere deelnemers
        wanneer de naam van een houding nieuw is, maar forceer geen beweging omdat de rest van de
        groep doorgaat.
      </p>
      <p className="mt-4">
        Een uitgebreider stappenplan staat in{" "}
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
        id="kan-yoga-helpen-om-je-thuis-te-voelen-in-een-nieuwe-buurt"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Kan yoga helpen om je thuis te voelen in een nieuwe buurt?
      </h2>
      <p className="mt-4">
        Een vaste les kan een herkenbaar moment in je week worden. Je ziet regelmatig dezelfde docent
        en soms dezelfde deelnemers, zonder dat je direct sociaal hoeft te presteren. Dat maakt yoga
        een laagdrempelige manier om routine op te bouwen in een nieuwe stad.
      </p>
      <p className="mt-4">
        Verwacht niet dat één bezoek meteen een volledige community oplevert. Contact ontstaat
        meestal door vaker op hetzelfde moment te komen, vóór of na de les kort een gesprek te voeren
        en een plek te kiezen waar de sfeer bij je past. Een kleine buurtstudio kan prettig zijn als
        je waarde hecht aan herkenning en persoonlijk contact; een grotere studio biedt mogelijk meer
        tijden en stijlen.
      </p>
      <section
        aria-labelledby="contextuele-cta-heading"
        className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8"
      >
        <h3
          id="contextuele-cta-heading"
          className="font-display text-lg font-medium tracking-tight text-foreground"
        >
          Wil je verschillende lessen rustig vergelijken?
        </h3>
        <p className="mt-3 text-foreground">
          Met de 14-daagse introductiepas van Yoga Zeeburg kun je meerdere lessen, docenten en tijden
          proberen. Zo merk je welke les je begrijpt, welke route werkt en waar je je welkom voelt.{" "}
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
        id="yoga-zeeburg-in-amsterdam-east"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Yoga Zeeburg in Amsterdam East
      </h2>
      <p className="mt-4">
        Yoga Zeeburg is een kleine, persoonlijke yogastudio aan de Cruquiusweg 96F, boven CrossFit
        Zeeburg en vlak bij het water. De website en lesbeschrijvingen zijn in het Engels. Voor de
        voertaal van een specifieke les kun je vooraf navraag doen, zodat je weet wat je kunt
        verwachten.
      </p>
      <p className="mt-4">
        Het reguliere rooster bevat rustige én actievere lessen, met duidelijke informatie over tempo
        en ervaringsniveau. De studio omschrijft zichzelf als down-to-earth, beginner-friendly en
        niet-prestatiegericht. Controleer vóór het boeken altijd de actuele beschikbaarheid.
      </p>

      <h2
        id="een-goede-eerste-stap-voor-expats"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Een goede eerste stap voor expats
      </h2>
      <p className="mt-4">
        Voor yoga als expat in Amsterdam East heb je geen perfect Nederlands, ervaring of speciale
        uitrusting nodig. Kies een les die qua taal, niveau, tijd en route logisch voelt, stel vooraf
        één of twee praktische vragen en ga het ervaren.
      </p>
      <p className="mt-4">
        Beoordeel na de les drie dingen: kon je de instructies volgen, voelde je je op je gemak en
        past dit moment in je echte week? Als die basis klopt, is de kans groter dat yoga niet bij
        één proefles blijft maar een vertrouwd onderdeel van je leven in Amsterdam wordt.
      </p>
    </>
  );
}

const cruquiusArticle: Article = {
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
      url: "https://www.yogazeeburg.com/schedule",
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
            logisch op je dagelijkse route ligt. Yoga Zeeburg zit aan de Cruquiusweg 96F in Amsterdam
            Oost, boven CrossFit Zeeburg en vlak bij het water. Controleer vóór je boekt het actuele
            rooster, kies een les die past bij je gewenste tempo en probeer zo mogelijk meerdere
            momenten. De beste keuze is niet automatisch de dichtstbijzijnde studio op de kaart, maar
            de plek waar reistijd, lestijd en leservaring samen haalbaar genoeg zijn om regelmatig
            terug te komen.
          </p>
        </div>
      </section>

      <p className="mt-10">
        Woon of werk je in Cruquius en zoek je een yogales dichtbij huis? Kijk dan niet alleen naar de
        afstand. Een studio past pas echt bij je week als ook de route, lestijd, lesstijl en sfeer
        praktisch voelen.
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
        Zeker op een drukke werkdag kan tien minuten extra reistijd het verschil maken tussen gaan en
        afzeggen.
      </p>
      <p className="mt-4">
        Dichtbij is daarom geen doel op zichzelf. Het voordeel ontstaat vooral wanneer de locatie goed
        aansluit op je dagelijkse bewegingen. Misschien ligt een studio vlak bij huis, maar past de
        lestijd niet. Een andere plek ligt iets verder, maar precies op je route vanaf werk. Kijk naar
        de totale combinatie.
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
        Cruquius combineert wonen, werken en oude havenarchitectuur. Daardoor komen bezoekers mogelijk
        uit verschillende richtingen: vanuit het eiland zelf, vanaf de Indische Buurt, uit Zeeburg of
        vanuit andere delen van Amsterdam Oost. Test de route die jij werkelijk gebruikt. Een
        kaartinschatting zegt minder dan een rit op het tijdstip waarop je normaal naar de les gaat.
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
        De handigste locatie werkt alleen als het lesaanbod aansluit op wat je zoekt. Een rustige les
        kan prettig zijn wanneer je wilt vertragen of spanning wilt loslaten. Een actievere flow past
        mogelijk beter als je energie wilt opbouwen en graag doorbeweegt.
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
        Voor een routine heb je een tijdstip nodig dat ook in een gewone, volle week haalbaar blijft.
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
          Met de 14-daagse introductiepas kun je verschillende lessen, docenten en tijden proberen. Zo
          vergelijk je niet alleen de inhoud van de les, maar ook de route en het ritme eromheen.{" "}
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
        yoga of ergens rekening mee wilt houden. Tijdens de les mag je altijd rust nemen, een houding
        overslaan of een eenvoudigere variant kiezen.
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
        Voor yoga in Cruquius hoef je niet alleen te zoeken naar de kleinste afstand op de kaart. Zoek
        naar de combinatie die je gedrag makkelijker maakt: een haalbare route, een passend tijdstip,
        een les die bij je energie past en een plek waar je je op je gemak voelt.
      </p>
      <p className="mt-4">
        Probeer vervolgens meerdere momenten in een normale week. Als de reis eenvoudig voelt en je na
        de les graag terugkomt, heb je waarschijnlijk een betere keuze gemaakt dan wanneer je alleen
        op afstand of prijs vergelijkt.
      </p>
    </>
  );
}

const niveauArticle: Article = {
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
      url: "https://www.yogazeeburg.com/classes",
    },
    {
      title: "Yoga Zeeburg — regulier weekrooster",
      url: "https://www.yogazeeburg.com/schedule",
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
        Een goede beginnersles geeft je genoeg tijd om aanwijzingen te begrijpen en te voelen wat een
        houding doet. De docent benoemt duidelijke opties, maar jij houdt zelf de regie. Je hoeft
        niet lenig te zijn, alle namen te kennen of iedere houding af te maken.
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
        behoefte hebben aan een rustige les. Een beginner met een goede basisconditie kan juist graag
        bewegen, zolang de uitleg helder genoeg is.
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
        Begin met één les die op papier goed past. Let na afloop niet alleen op hoe zwaar de les was,
        maar vooral op de kwaliteit van de uitleg, het tempo en hoe je je daarna voelt. Schrijf
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
        Kies daarom niet alleen op wat je technisch kunt, maar ook op je energie, herstel en behoefte
        van die dag. Een studio met verschillende lesrichtingen maakt het makkelijker om binnen één
        vertrouwde plek te blijven variëren.
      </p>
    </>
  );
}

const goedeStudioArticle: Article = {
  slug: "hoe-herken-je-een-goede-yogastudio-kwaliteitskenmerken",
  title: "Hoe herken je een goede yogastudio? 9 kwaliteitskenmerken",
  h1: "Hoe herken je een goede yogastudio? 9 kwaliteitskenmerken",
  seoTitle: "Goede yogastudio kiezen: 9 kwaliteitskenmerken | Yoga Zeeburg",
  description:
    "Hoe herken je een goede yogastudio? Check begeleiding, veiligheid, groepsgrootte, sfeer, voorwaarden en proefaanbod voordat je kiest.",
  intro:
    "Een mooie ruimte en een populaire Instagram-pagina zeggen weinig over de kwaliteit van een yogastudio. Een goede studio herken je vooral aan duidelijke begeleiding, respect voor grenzen, passende groepen, transparante informatie en een sfeer waarin je zonder prestatiedruk kunt oefenen.",
  category: CATEGORY_BEGINNEN_MET_YOGA,
  type: "how-to",
  pillar: false,
  publishedAt: "2026-08-17",
  updatedAt: "2026-08-17",
  readingTimeMin: 8,
  toc: [
    {
      id: "is-vooraf-duidelijk-voor-wie-de-lessen-bedoeld-zijn",
      label: "Is vooraf duidelijk voor wie de lessen bedoeld zijn?",
    },
    {
      id: "geven-docenten-heldere-uitleg-en-bruikbare-opties",
      label: "Geven docenten heldere uitleg en bruikbare opties?",
    },
    {
      id: "worden-grenzen-en-toestemming-serieus-genomen",
      label: "Worden grenzen en toestemming serieus genomen?",
    },
    {
      id: "past-de-groepsgrootte-bij-de-beloofde-begeleiding",
      label: "Past de groepsgrootte bij de beloofde begeleiding?",
    },
    {
      id: "zijn-de-ruimte-en-materialen-verzorgd",
      label: "Zijn de ruimte en materialen verzorgd?",
    },
    {
      id: "voelt-de-sfeer-toegankelijk-en-inclusief",
      label: "Voelt de sfeer toegankelijk en inclusief?",
    },
    {
      id: "zijn-rooster-en-locatie-in-de-praktijk-haalbaar",
      label: "Zijn rooster en locatie in de praktijk haalbaar?",
    },
    {
      id: "zijn-prijzen-en-voorwaarden-transparant",
      label: "Zijn prijzen en voorwaarden transparant?",
    },
    {
      id: "kun-je-de-studio-goed-testen-voordat-je-kiest",
      label: "Kun je de studio goed testen voordat je kiest?",
    },
    { id: "rode-vlaggen-bij-een-yogastudio", label: "Rode vlaggen bij een yogastudio" },
    {
      id: "zo-beoordeel-je-een-studio-tijdens-een-introductieperiode",
      label: "Zo beoordeel je een studio tijdens een introductieperiode",
    },
    {
      id: "wat-kun-je-bij-yoga-zeeburg-verwachten",
      label: "Wat kun je bij Yoga Zeeburg verwachten?",
    },
  ],
  faqs: [
    {
      question: "Hoeveel proeflessen heb je nodig om een yogastudio te beoordelen?",
      answer:
        "Drie tot vier lessen geven meestal een betrouwbaarder beeld dan één proefles. Probeer verschillende docenten en minimaal één tijdstip waarop je later structureel wilt komen.",
    },
    {
      question: "Moet een goede yogadocent geregistreerd zijn?",
      answer:
        "Registratie of een erkende opleiding kan relevante scholing aantonen, maar garandeert niet automatisch een goede les. Let ook op duidelijke uitleg, professionele grenzen, toestemming bij aanraking en het aanbieden van bruikbare variaties.",
    },
    {
      question: "Is een kleine yogastudio altijd beter?",
      answer:
        "Nee. Kleine groepen kunnen meer persoonlijke aandacht bieden, terwijl grotere studio’s vaak meer lestijden hebben. Belangrijk is dat groepsgrootte, ruimte en begeleiding passen bij wat de studio belooft en bij wat jij nodig hebt.",
    },
    {
      question: "Mag een yogadocent je zonder toestemming aanraken?",
      answer:
        "Een professionele docent vraagt vooraf toestemming voor fysieke aanpassingen en respecteert het wanneer je dat niet wilt. Je mag toestemming altijd weigeren of later intrekken.",
    },
    {
      question: "Waar let je vooral op als beginner?",
      answer:
        "Kies een les met een duidelijke beschrijving, een haalbaar tempo en opties voor verschillende niveaus. Vertel de docent dat je nieuw bent en controleer of je zonder prestatiedruk kunt rusten, aanpassen of een houding overslaan.",
    },
  ],
  sources: [
    {
      title: "Yoga Alliance — Teacher Resources",
      url: "https://yogaalliance.org/teacher-resources/",
    },
    {
      title: "Yoga Alliance — Standards for RYS Credentials",
      url: "https://yogaalliance.org/Standards-for-RYS-Credentials",
    },
    {
      title: "Yoga Zeeburg — homepage en studio-informatie",
      url: "https://www.yogazeeburg.com/",
    },
    {
      title: "Yoga Zeeburg — lesbeschrijvingen",
      url: "https://www.yogazeeburg.com/classes",
    },
    {
      title: "Yoga Zeeburg — regulier rooster",
      url: "https://www.yogazeeburg.com/schedule",
    },
    {
      title: "Yoga Zeeburg — prijzen en voorwaarden",
      url: "https://www.yogazeeburg.com/pricing",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  heroImage: GOEDE_STUDIO_HERO_IMAGE,
  body: () => <GoedeStudioBody />,
};

function GoedeStudioBody() {
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
            Een goede yogastudio heeft docenten die helder uitleggen, variaties aanbieden en
            toestemming vragen voor fysieke aanraking. Je kunt vooraf zien voor wie een les bedoeld
            is, wat een abonnement kost en welke voorwaarden gelden. De ruimte en materialen zijn
            verzorgd, de groepsgrootte past bij de beloofde begeleiding en je voelt je vrij om een
            houding aan te passen of over te slaan. Probeer bij voorkeur meerdere lessen en docenten
            voordat je beslist.
          </p>
        </div>
      </section>

      <p className="mt-10">
        Een mooie ruimte en een populaire Instagram-pagina zeggen weinig over de kwaliteit van een
        yogastudio. Een goede studio herken je vooral aan duidelijke begeleiding, respect voor
        grenzen, passende groepen, transparante informatie en een sfeer waarin je zonder
        prestatiedruk kunt oefenen.
      </p>

      <h2
        id="is-vooraf-duidelijk-voor-wie-de-lessen-bedoeld-zijn"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Is vooraf duidelijk voor wie de lessen bedoeld zijn?
      </h2>
      <p className="mt-4">
        Een goede yogastudio maakt vóór het boeken duidelijk wat je kunt verwachten. In een bruikbare
        lesbeschrijving lees je niet alleen de naam van de stijl, maar ook het tempo, het niveau, de
        belangrijkste accenten en voor wie de les geschikt is.
      </p>
      <p className="mt-4">
        Dat is belangrijk omdat dezelfde lesnaam per studio of docent anders kan worden ingevuld. Een
        flowles kan rustig en technisch zijn, maar ook snel en fysiek. Yin kan heel toegankelijk
        voelen, maar lange houdingen kunnen juist intens zijn. Woorden als ‘alle niveaus’ zijn pas
        waardevol wanneer de docent daadwerkelijk verschillende opties aanbiedt.
      </p>
      <p className="mt-4">
        Kun je online nauwelijks ontdekken wat een les inhoudt? Stel dan vóór je eerste bezoek een
        korte vraag. De manier waarop een studio antwoordt, geeft meteen informatie over de aandacht
        en duidelijkheid die je later kunt verwachten.
      </p>
      <p className="mt-4">
        Lees voor het verschil tussen persoonlijke voorkeur en algemene kwaliteit ook{" "}
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
        id="geven-docenten-heldere-uitleg-en-bruikbare-opties"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Geven docenten heldere uitleg en bruikbare opties?
      </h2>
      <p className="mt-4">
        Een goede yogadocent laat je niet alleen zien wat je moet doen, maar legt begrijpelijk uit
        waar je naartoe werkt. Aanwijzingen zijn concreet, het tempo geeft je tijd om te reageren en
        er zijn opties wanneer een houding niet past.
      </p>
      <p className="mt-4">Let tijdens een proefles op deze signalen:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>de docent vraagt of iemand nieuw is of iets relevants wil melden;</li>
        <li>basisinstructies zijn ook zonder yoga-ervaring te volgen;</li>
        <li>eenvoudigere en intensievere varianten worden zonder oordeel aangeboden;</li>
        <li>rust nemen of een houding overslaan wordt normaal gevonden;</li>
        <li>
          de docent doet geen medische beloftes en blijft binnen de rol van yogadocent.
        </li>
      </ul>
      <p className="mt-4">
        Een diploma of registratie kan iets zeggen over gevolgde scholing, maar is nooit het enige
        bewijs van goed lesgeven. Ervaring, aandacht, communicatie en professioneel gedrag zie je
        vooral tijdens de les zelf.
      </p>

      <h2
        id="worden-grenzen-en-toestemming-serieus-genomen"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Worden grenzen en toestemming serieus genomen?
      </h2>
      <p className="mt-4">
        Fysieke correcties kunnen voor sommige deelnemers prettig zijn en voor anderen niet. Een
        professionele docent vraagt daarom toestemming voordat die je aanraakt en respecteert een
        ‘nee’ zonder discussie of zichtbare teleurstelling.
      </p>
      <p className="mt-4">
        Hetzelfde geldt breder. Je mag altijd een houding aanpassen, pauzeren of stoppen. Pijn,
        duizeligheid of een onveilig gevoel zijn geen signalen die je moet negeren om de groep bij te
        houden. Een studio hoeft je niet bang te maken, maar moet wel duidelijk maken dat jij zelf de
        regie houdt.
      </p>
      <p className="mt-4">
        Yoga Alliance noemt respectvolle, consent-based en veilige begeleiding expliciet als
        onderdeel van ethisch lesgeven. Ook zonder aansluiting bij die organisatie is dat een
        bruikbare professionele norm voor iedere studio.
      </p>

      <h2
        id="past-de-groepsgrootte-bij-de-beloofde-begeleiding"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Past de groepsgrootte bij de beloofde begeleiding?
      </h2>
      <p className="mt-4">
        Een grote les is niet automatisch slecht en een kleine les is niet automatisch goed. De vraag
        is of de groepsgrootte past bij wat de studio belooft.
      </p>
      <p className="mt-4">
        Wanneer persoonlijke aandacht centraal staat, moet de docent deelnemers kunnen zien en waar
        nodig kort kunnen helpen. In een grotere groep zijn heldere verbale aanwijzingen, voldoende
        ruimte en een logische opstelling extra belangrijk. Kijk tijdens je proefperiode daarom niet
        alleen naar een rustige daluurles, maar ook naar het tijdstip waarop je later werkelijk wilt
        komen.
      </p>
      <p className="mt-4">
        Let ook op de praktische organisatie: begint de les rustig, weet de docent wie nieuw is en
        voelt de ruimte beheersbaar wanneer de les vol zit? Dat zegt vaak meer dan het maximale
        aantal plekken op papier.
      </p>

      <h2
        id="zijn-de-ruimte-en-materialen-verzorgd"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zijn de ruimte en materialen verzorgd?
      </h2>
      <p className="mt-4">
        Een yogastudio hoeft niet luxe te zijn. Wel mag je verwachten dat de oefenruimte schoon,
        veilig en functioneel is. Matten liggen niet gevaarlijk dicht op elkaar, looproutes blijven
        vrij en materialen zijn heel en verzorgd.
      </p>
      <p className="mt-4">
        Blokken, riemen, dekens en bolsters zijn geen versiering. Ze helpen deelnemers om houdingen
        aan te passen en ondersteunen verschillende lichamen en ervaringsniveaus. Een studio die
        materialen beschikbaar heeft én docenten die uitleggen hoe je ze gebruikt, maakt
        toegankelijkheid praktisch.
      </p>
      <p className="mt-4">
        Ventilatie, temperatuur en geluidsniveau tellen eveneens mee. De perfecte ruimte bestaat
        niet, maar je moet je aandacht tijdens de les niet voortdurend kwijt zijn aan benauwdheid,
        rommel of onnodige afleiding.
      </p>

      <ArticleFigure
        image={GOEDE_STUDIO_INLINE_IMAGE}
        caption="Verzorgde materialen en voldoende ruimte zijn eenvoudige maar veelzeggende kwaliteitssignalen."
        className="mt-10"
      />

      <h2
        id="voelt-de-sfeer-toegankelijk-en-inclusief"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Voelt de sfeer toegankelijk en inclusief?
      </h2>
      <p className="mt-4">
        Je hoeft niet op iedereen in de groep te lijken om welkom te zijn. Een goede studio
        communiceert niet alsof yoga alleen bedoeld is voor jonge, lenige of ervaren mensen. De taal
        is uitnodigend, docenten vermijden vernederende opmerkingen en verschillen in lichaam,
        ervaring en achtergrond worden normaal behandeld.
      </p>
      <p className="mt-4">
        Let vooral op hoe je jezelf tijdens de les gedraagt. Durf je een eenvoudige optie te kiezen?
        Voel je ruimte om iets te vragen? Kun je even rusten zonder het gevoel dat je faalt? Een
        rustige inrichting is prettig, maar psychologische veiligheid wordt vooral door mensen en
        gedrag gemaakt.
      </p>

      <h2
        id="zijn-rooster-en-locatie-in-de-praktijk-haalbaar"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zijn rooster en locatie in de praktijk haalbaar?
      </h2>
      <p className="mt-4">
        Kwaliteit helpt weinig wanneer je de lessen structureel niet kunt halen. Controleer daarom
        vóór een abonnement of er meerdere tijden per week zijn die realistisch in jouw agenda
        passen. Houd rekening met reistijd, omkleden en wat er gebeurt wanneer je favoriete les een
        keer uitvalt.
      </p>
      <p className="mt-4">
        Een studio op een haalbare route vanaf huis of werk is vaak waardevoller dan een theoretisch
        perfecte studio waarvoor iedere les planning vraagt. Regelmaat ontstaat wanneer de praktische
        drempel laag genoeg is.
      </p>
      <p className="mt-4">
        Bekijk daarom altijd het{" "}
        <Link
          to="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          actuele rooster van Yoga Zeeburg
        </Link>{" "}
        in plaats van af te gaan op een algemene belofte over veel lessen.
      </p>

      <h2
        id="zijn-prijzen-en-voorwaarden-transparant"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zijn prijzen en voorwaarden transparant?
      </h2>
      <p className="mt-4">
        Je moet vóór aankoop kunnen begrijpen wat je koopt. Controleer de looptijd, opzegregels,
        geldigheid van rittenkaarten, reserveringsregels en eventuele kosten bij te laat annuleren.
        Een goede studio verstopt zulke informatie niet tot na de betaling.
      </p>
      <p className="mt-4">
        Vergelijk bovendien niet alleen de prijs per les op papier. Bereken welke optie past bij het
        aantal lessen dat je werkelijk gaat volgen. Een goedkoop abonnement dat slecht aansluit op je
        week kan uiteindelijk duurder zijn dan een heldere optie die je consequent gebruikt.
      </p>
      <p className="mt-4">
        Bekijk de{" "}
        <Link
          to="/prijzen"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          actuele prijzen en voorwaarden
        </Link>{" "}
        en stel een vraag wanneer iets niet duidelijk is. Een transparant antwoord vóór aankoop
        voorkomt onnodige frustratie achteraf.
      </p>

      <h2
        id="kun-je-de-studio-goed-testen-voordat-je-kiest"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Kun je de studio goed testen voordat je kiest?
      </h2>
      <p className="mt-4">
        Eén proefles laat vooral zien hoe die specifieke les, docent en dag aanvoelden. Een beter
        introductieaanbod geeft je genoeg tijd om meerdere docenten, stijlen en tijdstippen te
        proberen.
      </p>
      <p className="mt-4">Test bij voorkeur minimaal:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>één les op het tijdstip waarop je later meestal wilt komen;</li>
        <li>twee verschillende docenten;</li>
        <li>een rustigere en een actievere les wanneer beide je aanspreken;</li>
        <li>de reservering, aankomst en communicatie rondom de les.</li>
      </ul>
      <p className="mt-4">
        Zo beoordeel je niet alleen de lesinhoud, maar de hele ervaring. Lees ook{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          wat je tijdens een eerste yogales kunt verwachten
        </Link>
        .
      </p>

      <h2
        id="rode-vlaggen-bij-een-yogastudio"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Rode vlaggen bij een yogastudio
      </h2>
      <p className="mt-4">
        Geen enkele les verloopt perfect. Een combinatie van onderstaande signalen is wel reden om
        verder te kijken of eerst vragen te stellen:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>onduidelijke of ontbrekende informatie over niveau en intensiteit;</li>
        <li>fysieke aanraking zonder voorafgaande toestemming;</li>
        <li>pijn of grenzen worden weggewuifd;</li>
        <li>medische claims of garanties die een yogadocent niet kan waarmaken;</li>
        <li>
          prestatiedruk, vernederende opmerkingen of één ‘juiste’ vorm voor ieder lichaam;
        </li>
        <li>onduidelijke prijzen, looptijden of annuleringsvoorwaarden;</li>
        <li>zichtbaar beschadigde materialen of een onveilige, overvolle opstelling;</li>
        <li>
          je voelt je na meerdere bezoeken nog steeds niet vrij om vragen te stellen of opties te
          nemen.
        </li>
      </ul>
      <p className="mt-4">
        Eén minder prettige ervaring kan met een specifieke docent of drukke dag te maken hebben.
        Bespreek een concreet punt wanneer dat veilig voelt. De manier waarop de studio reageert, is
        opnieuw een kwaliteitssignaal.
      </p>

      <h2
        id="zo-beoordeel-je-een-studio-tijdens-een-introductieperiode"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zo beoordeel je een studio tijdens een introductieperiode
      </h2>
      <p className="mt-4">
        Maak je keuze niet alleen direct na de eindontspanning. Noteer na iedere les kort:
      </p>
      <ol className="mt-4 list-decimal space-y-2 pl-6">
        <li>Kon ik de instructies volgen zonder voortdurend naar anderen te kijken?</li>
        <li>Voelde ik ruimte om mijn eigen grens te respecteren?</li>
        <li>Paste het tijdstip inclusief reistijd werkelijk in mijn dag?</li>
        <li>Hoe voelde mijn lichaam en hoofd enkele uren later?</li>
        <li>Is de drempel om opnieuw te boeken laag?</li>
      </ol>
      <p className="mt-4">
        Na drie of vier lessen ontstaat meestal een betrouwbaarder beeld dan na één sterke eerste
        indruk. De beste studio is niet de plek met de meeste beloftes, maar de plek waar
        professionele kwaliteit en jouw dagelijkse praktijk samenkomen.
      </p>

      <section
        aria-labelledby="contextuele-cta-heading"
        className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8"
      >
        <h3
          id="contextuele-cta-heading"
          className="font-display text-lg font-medium tracking-tight text-foreground"
        >
          Ontdek welke lessen echt bij je passen
        </h3>
        <p className="mt-3 text-foreground">
          Probeer 14 dagen verschillende lessen, docenten en tijden bij Yoga Zeeburg. Zo maak je je
          keuze op ervaring, niet alleen op een eerste indruk.{" "}
          <a
            href="/trial"
            className="font-medium text-primary underline underline-offset-4 hover:no-underline"
          >
            Start met 14 dagen yoga
          </a>
          .
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Geen ervaring of lenigheid nodig. Kom zoals je bent.
        </p>
      </section>

      <h2
        id="wat-kun-je-bij-yoga-zeeburg-verwachten"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat kun je bij Yoga Zeeburg verwachten?
      </h2>
      <p className="mt-4">
        Yoga Zeeburg is een kleine, persoonlijke yogastudio aan de Cruquiusweg 96F in Amsterdam Oost,
        boven CrossFit Zeeburg. De aanpak is nuchter en toegankelijk: duidelijke lessen,
        verschillende tempo’s en ruimte om binnen je eigen mogelijkheden te oefenen.
      </p>
      <p className="mt-4">
        Met de{" "}
        <a
          href="/trial"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          14-daagse Intro Pass
        </a>{" "}
        kun je verschillende lessen, docenten en tijden proberen voordat je beslist. Gebruik die
        periode bewust: kom niet alleen op het makkelijkste moment, maar test het ritme dat je daarna
        werkelijk wilt volhouden.
      </p>
      <p className="mt-4">
        Bekijk vooraf de{" "}
        <Link
          to="/lessen"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          lesbeschrijvingen
        </Link>
        , kies enkele haalbare momenten in het{" "}
        <Link
          to="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          rooster
        </Link>{" "}
        en beoordeel daarna rustig of de begeleiding, sfeer en praktische organisatie bij je passen.
      </p>
    </>
  );
}

export const ARTICLES: Article[] = [

  proeflesArticle,
  welkeStudioArticle,
  beginnersArticle,
  kantoorArticle,
  keuzeArticle,
  taalArticle,
  prijzenArticle,
  waterArticle,
  locatieArticle,
  ijburgArticle,
  indischeBuurtArticle,
  expatsArticle,
  cruquiusArticle,
  niveauArticle,
  goedeStudioArticle,
];



export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return ARTICLES.filter((a) => a.category.slug === categorySlug);
}

export function getArticlesSortedByNewest(): Article[] {
  return [...ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getRecommendedArticles(limit = 3): Article[] {
  return ARTICLES.filter((a) => a.pillar).slice(0, limit);
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticleBySlug(slug);
  if (!current) return [];
  const sameCategory = ARTICLES.filter(
    (a) => a.slug !== slug && a.category.slug === current.category.slug,
  );
  const others = ARTICLES.filter(
    (a) => a.slug !== slug && a.category.slug !== current.category.slug,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
