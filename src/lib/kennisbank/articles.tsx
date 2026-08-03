import type { LucideIcon } from "lucide-react";
import { MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

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
  body: () => ReactNode;
};

const CATEGORY_AMSTERDAM_OOST: ArticleCategory = {
  slug: "yoga-amsterdam-oost",
  title: "Yoga in Amsterdam Oost",
  icon: MapPin,
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
          href="/schedule"
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
          href="/schedule"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          rooster
        </a>{" "}
        of blader door de andere onderwerpen in de{" "}
        <a
          href="/nl/kennisbank"
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
          href="/schedule"
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
          to="/nl/kennisbank/$slug"
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
          to="/nl/kennisbank"
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
          to="/nl/kennisbank/$slug"
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
          href="/schedule"
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
            href="/schedule"
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
          to="/nl/kennisbank/$slug"
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
          to="/nl/kennisbank"
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
          to="/schedule"
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
          to="/schedule"
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
          to="/nl/kennisbank/$slug"
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
          to="/schedule"
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
          to="/schedule"
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
          to="/nl/kennisbank"
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
          to="/nl/kennisbank/$slug"
          params={{ slug: "yogales-in-amsterdam-waar-moet-je-op-letten-bij-je-keuze" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          hoe je een yogastudio kiest
        </Link>{" "}
        en{" "}
        <Link
          to="/nl/kennisbank/$slug"
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
          to="/pricing"
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
          to="/nl/kennisbank/$slug"
          params={{ slug: "yoga-in-amsterdam-oost-welke-yogastudio-past-bij-jou" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          een yogastudio in Amsterdam Oost kiest
        </Link>
        .
      </p>

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
          to="/nl/kennisbank/$slug"
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
          to="/nl/kennisbank/$slug"
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
          to="/schedule"
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
          to="/nl/kennisbank/$slug"
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
          to="/nl/kennisbank/$slug"
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
