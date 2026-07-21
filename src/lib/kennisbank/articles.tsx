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
            Tijdens een proefles yoga in Amsterdam Oost kom je binnen, meld je
            je bij de docent, kies je een plek en leg je een matje neer. De les
            duurt meestal 60 tot 75 minuten en bestaat uit een rustige opening,
            een reeks houdingen op je eigen tempo en een korte ontspanning aan
            het einde.
          </p>
          <p>
            Je hoeft niet lenig te zijn, geen ervaring te hebben en geen
            complete outfit te kopen. Comfortabele kleding en blote voeten zijn
            voldoende. Je werkt binnen je eigen bereik en volgt aanpassingen
            als een houding nog niet lukt.
          </p>
          <p>
            Bij Yoga Zeeburg kun je met de{" "}
            <a
              href="https://crossfitzeeburg.sportbitapp.nl/web/nl/registreren/lidmaatschap?r=42"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline underline-offset-4 hover:no-underline"
            >
              14-daagse Intro Pass
            </a>{" "}
            rustig verschillende lessen, docenten en tijden proberen voordat je
            een keuze maakt.
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
        De belangrijkste aanwijzing bij het kiezen van een proefles is de naam
        en omschrijving van de les zelf. Studios geven daarin bewust aan voor
        wie een les bedoeld is: voor beginners, voor gevorderden, of voor alle
        niveaus. Lees die omschrijving rustig door voordat je boekt, ook als je
        haast hebt.
      </p>
      <p className="mt-4">
        Grofweg zijn er twee smaken. Een rustigere les werkt met langere
        houdingen, adem en aandacht — vaak herkenbaar aan woorden als hatha,
        yin, restorative of gentle. Een dynamischere les werkt met vloeiende
        overgangen en bouwt vaker een fysieke opbouw op — herkenbaar aan
        vinyasa, flow of power. Voor een eerste kennismaking is het meestal
        prettig om te starten met een les die als toegankelijk of geschikt voor
        alle niveaus omschreven staat, ongeacht welke stijl je uiteindelijk het
        prettigst gaat vinden.
      </p>
      <p className="mt-4">
        Bekijk het{" "}
        <a
          href="/schedule"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          actuele rooster van Yoga Zeeburg
        </a>{" "}
        om te zien welke tijden en docenten er op dit moment lesgeven. Merk je
        dat je twijfelt, kies dan simpelweg de eerste les die qua tijd past —
        met een intro pass kun je later andere momenten testen.
      </p>

      <h2
        id="voorbereiden"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Hoe bereid je je voor?
      </h2>
      <p className="mt-4">
        De voorbereiding voor een eerste yogales is bewust minimaal. Je hebt
        niets speciaals nodig. Wat wel helpt:
      </p>
      <ul className="mt-4 space-y-3 pl-5 [list-style-type:disc]">
        <li>
          <strong>Kleding.</strong> Draag iets waarin je vrij kunt bewegen en
          dat niet strak op je middel drukt. Yoga doe je op blote voeten. Neem
          eventueel een extra laagje mee voor de rustige delen aan het einde,
          omdat je lichaam dan afkoelt.
        </li>
        <li>
          <strong>Eten en drinken.</strong> Kom niet met een zware maag. Een
          klein tussendoortje één tot twee uur van tevoren is prima. Drink
          water, maar niet vlak voor de les liters achter elkaar.
        </li>
        <li>
          <strong>Op tijd komen.</strong> Plan tien tot vijftien minuten
          speling in. Zo kun je rustig binnenkomen, je matje neerleggen en de
          docent kort iets vertellen als dat nodig is.
        </li>
        <li>
          <strong>Blessures of zwangerschap.</strong> Meld dit vooraf per
          bericht of vertel het de docent voor de les begint. Zo kan er
          gerichter naar je gekeken worden en kunnen aanpassingen worden
          voorgesteld waar dat helpt.
        </li>
        <li>
          <strong>Verwachtingen.</strong> Je hoeft niets te kunnen. Lenigheid,
          balans en concentratie ontwikkelen zich in de tijd — niet op één
          middag.
        </li>
      </ul>

      <h2
        id="aankomst"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat gebeurt er bij aankomst en tijdens de les?
      </h2>
      <p className="mt-4">
        Bij binnenkomst meld je jezelf even bij de docent, vooral als het je
        eerste keer is. Je kunt vragen waar je een plek kunt kiezen en of er
        iets specifieks is dat je moet weten. Het is normaal om iets van
        onzekerheid te voelen op je eerste les — dat hoort erbij en verdwijnt
        meestal binnen tien minuten.
      </p>
      <p className="mt-4">
        Een yogales begint doorgaans met een rustige opening: even zitten,
        adem opmerken en aankomen. Daarna volgt een opbouw van houdingen,
        vaak eerst staand of zittend, later mogelijk op de rug of buik. De
        docent legt uit wat de bedoeling is en geeft aanwijzingen om
        aanpassingen te doen. Aan het einde is er meestal een korte
        ontspanning — vaak in savasana, gewoon liggend op je rug — waarna de
        les afsluit.
      </p>
      <p className="mt-4">
        Tijdens de les hoef je niet mee te doen met alles. Je mag altijd een
        houding overslaan, een moment gaan zitten of iets aanpassen als dat
        voor jouw lichaam op dat moment beter is. Een goede docent moedigt dit
        expliciet aan en zal je niet in een houding duwen die niet past.
      </p>

      <h2
        id="houding-niet-lukt"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat als je een houding niet kunt?
      </h2>
      <p className="mt-4">
        Dan doe je iets anders. Serieus — dat is geen zwaktebod, dat is
        gewoon hoe yoga werkt. Iedere houding heeft variaties: makkelijker,
        korter, met steun. Kun je een houding niet, dan is de instructie meestal
        om terug te gaan naar een variant, even te rusten in child's pose, of
        simpelweg de adem te blijven volgen. Prestatie is geen doel; opmerken
        wat er wel of niet gaat op dit moment, is dat wel.
      </p>
      <p className="mt-4">
        Als je merkt dat je iets forceert of vasthoudt op adem, is dat een
        signaal om terug te schakelen. Yoga doet geen pijn. Ongemak in een lange
        rekhouding kan voorkomen, maar scherpe of stekende pijn is een reden om
        eruit te komen.
      </p>

      <h2
        id="na-de-les"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat voel je na een eerste les?
      </h2>
      <p className="mt-4">
        Ervaringen verschillen per persoon en per les. Sommige mensen voelen
        zich na een eerste yogales rustiger en helderder; anderen zijn juist
        wat moe of merken de dag erna iets van spierstijfheid. Beide zijn
        normaal. Wat je voelt hangt af van de stijl van de les, hoe jouw week
        eruitzag en of je gewend bent te bewegen.
      </p>
      <p className="mt-4">
        Waar je vooral op kunt letten, is het gevoel in de uren erna. Merk je
        dat je iets meer ruimte in je hoofd of je schouders hebt? Dat je iets
        makkelijker ademt? Dat is bruikbaardere informatie dan het antwoord op
        de vraag of je alle houdingen "goed" deed. Yoga is geen prestatie die
        je afvinkt; het is een oefening die zijn effect vooral laat zien over
        weken, niet in één sessie.
      </p>

      <h2
        id="een-les-genoeg"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Waarom is één losse les niet altijd genoeg om een goede keuze te maken?
      </h2>
      <p className="mt-4">
        Een enkele proefles vertelt je vooral iets over dat ene moment: die
        stijl, die docent, dat tijdstip en jouw dag tot dan toe. Dat is
        waardevol, maar niet altijd representatief. Een dynamische les op een
        drukke woensdagavond voelt anders dan een rustige les op een zaterdag —
        en welke docent lesgeeft maakt in yoga een aanzienlijk verschil in hoe
        een les op je overkomt.
      </p>
      <p className="mt-4">
        Voor de meeste mensen werkt het daarom beter om binnen een korte
        periode meerdere lessen te proberen: verschillende docenten,
        verschillende tijden en één rustige en één dynamischere stijl. Dat is
        precies waarom een intro pass zoals de 14-daagse Intro Pass{" "}
        bestaat: niet als korting, maar als kader om rustig te ontdekken welke
        vorm van yoga bij jouw week past.
      </p>

      <h2
        id="yoga-zeeburg"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Praktisch: Yoga Zeeburg in Amsterdam Oost
      </h2>
      <p className="mt-4">
        Yoga Zeeburg is een kleine, persoonlijke studio in Amsterdam Oost. Je
        vindt ons aan de <strong>Cruquiusweg 96F</strong>, boven CrossFit
        Zeeburg en aan het water. De sfeer is bewust rustig en niet-zweverig:
        de nadruk ligt op praktische, toegankelijke yoga voor mensen met een
        gewone volle week.
      </p>
      <p className="mt-4">
        Omdat de groepen niet groot zijn, is er ruimte voor persoonlijke
        aandacht. Docenten geven aanpassingen waar dat helpt en kennen na een
        paar lessen je naam. Dat maakt het makkelijker om terug te komen — wat
        uiteindelijk het enige is dat je op langere termijn iets oplevert.
      </p>
      <p className="mt-4">
        Meer weten over de buurt en welke lessen op welk moment aansluiten?
        Bekijk het{" "}
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
        Als je proefles bevallen is, is de vervolgvraag zelden "welke stijl is
        het beste?" maar veel vaker "welk moment past het beste in mijn week?"
        Regelmaat wint het van intensiteit. Twee tot drie keer per week een
        toegankelijke les zal je meer opleveren dan één zware les die je
        vervolgens niet volhoudt.
      </p>
      <p className="mt-4">
        Kies bij voorkeur vaste tijdslots die je zonder onderhandeling in je
        agenda kunt zetten. Combineer een rustigere en een dynamischere les zodat
        je weekritme divers blijft. En geef jezelf de eerste maand vooral geen
        oordeel — je bent aan het verkennen, niet aan het presteren.
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
            De "beste" yogastudio in Amsterdam Oost bestaat niet in het
            algemeen — de beste studio voor jou wel. Die past bij jouw
            lesstijl, je niveau, je week en de plek waar je woont of werkt.
          </p>
          <p>
            De belangrijkste vraag is niet welke studio het mooiste interieur
            heeft, maar welke studio je daadwerkelijk regelmatig blijft
            bezoeken. Een rooster dat je volhoudt, is meer waard dan een
            theoretisch perfecte les die je één keer per maand haalt.
          </p>
          <p>
            In deze gids lopen we samen door de criteria die er echt toe doen,
            zodat je binnen twee tot drie proeflessen een goed onderbouwde
            keuze kunt maken.
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
        Amsterdam Oost is een groot gebied — Zeeburg, Cruquius, IJburg,
        Indische Buurt, Oostelijk Havengebied, Watergraafsmeer. In dat gebied
        vind je uiteenlopende yogastudio's: van fysieke, dynamische vloeren
        tot kleine, persoonlijke studio's met rustige lessen. Dat maakt kiezen
        soms verwarrend, vooral als je net begint. De valkuil is dat je op
        zoek gaat naar objectief "de beste" studio, terwijl de vraag eigenlijk
        is welke studio past bij hoe jouw week eruitziet en wat je op dit
        moment nodig hebt.
      </p>
      <p className="mt-4">
        Neem als vertrekpunt dat een yogastudio pas werkt als je er
        daadwerkelijk komt. Dat klinkt vanzelfsprekend, maar veel mensen
        boeken een lidmaatschap op basis van sfeer of Instagram en merken pas
        na een paar weken dat het rooster of de reistijd in de praktijk niet
        past. Beoordeel een studio daarom op de nuchtere criteria hieronder,
        niet op eerste indruk.
      </p>

      <h2
        id="stijl-niveau"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Welke yogastijl en welk niveau zoek je?
      </h2>
      <p className="mt-4">
        Yoga is een verzamelnaam voor verschillende stijlen die onderling
        flink kunnen verschillen. Grofweg zijn er rustigere vormen — hatha,
        yin, restorative, gentle — waar houdingen langer worden vastgehouden
        en adem centraal staat. Daarnaast zijn er dynamischere vormen —
        vinyasa, flow, power, ashtanga — waar overgangen sneller gaan en de
        opbouw fysieker is.
      </p>
      <p className="mt-4">
        Welke stijl bij je past hangt af van wat je zoekt: rust en herstel,
        beweging en kracht, of een combinatie. Belangrijk: kijk niet alleen
        naar de <em>naam</em> van een les, maar ook naar de{" "}
        <em>omschrijving</em>. Twee lessen met dezelfde naam kunnen op twee
        studio's totaal anders aanvoelen. In een goede omschrijving lees je
        voor wie de les bedoeld is, wat de opbouw is en of aanpassingen worden
        aangeboden. Als die informatie ontbreekt, is dat op zichzelf al een
        signaal.
      </p>
      <p className="mt-4">
        Voor niveau geldt hetzelfde. Termen als "geschikt voor alle niveaus"
        of "toegankelijk" zijn een goede eerste indicatie dat je zonder
        ervaring welkom bent. Ben je onzeker? Kies bewust voor een rustigere
        stijl bij je eerste les, ongeacht welke stijl je uiteindelijk het
        prettigst gaat vinden.
      </p>

      <h2
        id="docent-sfeer"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Hoe belangrijk zijn docent, sfeer en groepsgrootte?
      </h2>
      <p className="mt-4">
        Aanzienlijk belangrijker dan de meeste mensen inschatten. Bij yoga
        maakt de docent een groot verschil in hoe een les op je overkomt.
        Twee vinyasa-lessen bij twee verschillende docenten kunnen radicaal
        anders aanvoelen — in tempo, aandacht, uitleg en muziek. Reken er
        dus op dat je binnen dezelfde studio verschillende docenten wilt
        proberen voordat je een oordeel vormt.
      </p>
      <p className="mt-4">
        Sfeer is subtieler maar even belangrijk. Voelt de studio als een plek
        waar je binnenkomt en je schouders al iets zakken? Of merk je een
        prestatiedruk, harde muziek of drukte die je juist opjaagt? Beide
        soorten sfeer hebben hun publiek; er is geen goed of fout, alleen wat
        past bij wat jij zoekt.
      </p>
      <p className="mt-4">
        Groepsgrootte hangt hiermee samen. Kleinere groepen bieden meestal
        meer ruimte voor persoonlijke aandacht en aanpassingen; grotere
        groepen hebben een andere dynamiek en vaak meer roosterkeuze. Neem
        mee wat voor jou werkt — en check bij een proefles hoe vol de les
        werkelijk zit op het tijdstip dat je van plan bent te gaan.
      </p>

      <h2
        id="locatie-rooster"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Kies een locatie en rooster die je echt volhoudt
      </h2>
      <p className="mt-4">
        Dit is misschien wel het meest onderschatte criterium. Een studio op
        tien minuten fietsen die je vier keer per maand haalt levert je meer
        op dan een prachtige studio op een half uur waar je alleen op
        zondagochtend komt. Reistijd is een sluipmoordenaar van goede
        voornemens.
      </p>
      <p className="mt-4">
        Bekijk daarom altijd het{" "}
        <a
          href="/schedule"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          actuele rooster
        </a>{" "}
        voordat je een keuze maakt. Zijn er minstens twee tot drie momenten
        per week die zonder onderhandeling in je agenda passen? Zo niet, dan
        past de studio in de praktijk niet, hoe goed de lessen ook zijn.
        Regelmaat wint het van intensiteit — twee toegankelijke lessen per
        week doen op de lange termijn meer dan één zware les die je vaak
        overslaat.
      </p>

      <h2
        id="proefaanbod-prijs"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Hoe vergelijk je proefaanbod en prijs?
      </h2>
      <p className="mt-4">
        Bijna elke yogastudio biedt een vorm van kennismaking aan — een losse
        proefles, een introductieweek of een intro pass van één tot twee
        weken. Wat het meest oplevert, is een intro pass waarmee je binnen
        korte tijd meerdere lessen, docenten en tijdstippen kunt proberen. Eén
        losse les geeft je namelijk vooral informatie over dat ene moment;
        drie of vier lessen laten zien wat de studio structureel is. Voor een
        uitgebreidere uitleg over hoe zo'n eerste les eruitziet, zie ons
        artikel over{" "}
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
        Voor prijs geldt: kijk niet naar de laagste prijs per les, maar naar
        de prijs per les die je daadwerkelijk gaat volgen. Een goedkoop
        rittenkaartje wordt duur als je het niet opmaakt. Een lidmaatschap
        wordt goedkoop als je twee tot drie keer per week komt. Reken het
        eerlijk door voordat je kiest — en houd rekening met opzegtermijnen
        of minimumtermijnen. Yoga Zeeburg biedt een{" "}
        <a
          href="https://crossfitzeeburg.sportbitapp.nl/web/nl/registreren/lidmaatschap?r=42"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Bekijk onze 14-daagse Intro Pass
        </a>{" "}
        waarmee je in twee weken meerdere lessen kunt proberen voordat je
        beslist of een lidmaatschap past.
      </p>

      <h2
        id="checklist"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Praktische checklist voor je keuze
      </h2>
      <ul className="mt-4 space-y-3 pl-5 [list-style-type:disc]">
        <li>
          <strong>Lesstijl en omschrijving.</strong> Sluit de omschrijving aan
          bij wat jij zoekt — rust, beweging of een combinatie?
        </li>
        <li>
          <strong>Niveau en toegankelijkheid.</strong> Wordt duidelijk gemaakt
          voor wie een les bedoeld is en zijn aanpassingen mogelijk?
        </li>
        <li>
          <strong>Docent en persoonlijke aandacht.</strong> Krijg je een
          korte introductie voor je eerste les? Kent de docent je naam na
          een paar keer?
        </li>
        <li>
          <strong>Sfeer en groepsgrootte.</strong> Voelt het rustig genoeg om
          terug te komen? Is de groep behapbaar op het tijdstip dat jij komt?
        </li>
        <li>
          <strong>Locatie en reistijd.</strong> Zit de studio op een plek die
          je zonder omweg bereikt vanaf huis of werk?
        </li>
        <li>
          <strong>Rooster.</strong> Zijn er twee tot drie lestijden per week
          die structureel in je agenda passen?
        </li>
        <li>
          <strong>Prijs en proefaanbod.</strong> Reken de prijs per
          verwachte les uit; check het intro-aanbod en de voorwaarden.
        </li>
        <li>
          <strong>Materialen en voorzieningen.</strong> Zijn matjes, blokken
          en riemen aanwezig? Is er ruimte om rustig aan te komen?
        </li>
      </ul>

      <h2
        id="yoga-zeeburg"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wanneer past Yoga Zeeburg bij jou?
      </h2>
      <p className="mt-4">
        Yoga Zeeburg is een kleine, persoonlijke studio aan de{" "}
        <strong>Cruquiusweg 96F</strong>, boven CrossFit Zeeburg en aan het
        water in Amsterdam Oost. De sfeer is bewust rustig en niet-zweverig;
        de nadruk ligt op toegankelijke, praktische yoga voor mensen met een
        gewone volle week. Groepen zijn niet groot, waardoor er ruimte is
        voor persoonlijke aandacht en aanpassingen.
      </p>
      <p className="mt-4">
        Yoga Zeeburg past bij jou als je een plek zoekt in Zeeburg, Cruquius,
        de Indische Buurt of het Oostelijk Havengebied waar je in een kleine
        setting yoga wilt oefenen, met verschillende lessen, docenten en
        tijden om af te wisselen. Zoek je een grote, dynamische studio met
        tientallen lessen per dag, dan past een andere plek in Amsterdam
        waarschijnlijk beter — en dat is prima. We claimen niet objectief de
        beste te zijn; we zijn de beste optie voor het publiek dat past bij
        onze aanpak.
      </p>

      <h2
        id="definitief"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zo maak je de definitieve keuze
      </h2>
      <p className="mt-4">
        Kies twee tot drie studio's die op papier bij je passen op basis van
        stijl, locatie en rooster. Boek bij elk daarvan minstens één les op
        een tijdstip dat je structureel wilt bezoeken. Beoordeel na afloop
        drie dingen: hoe je je in de uren erna voelt, of het rooster
        realistisch in je week past, en of de drempel om opnieuw te boeken
        laag is. De studio waar die drie het beste kloppen, is voor dit
        moment jouw studio.
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
            Beginnen met yoga in Amsterdam Oost doe je in drie stappen: kies
            een les die zichzelf toegankelijk noemt, plan twee vaste momenten
            per week in en geef jezelf de eerste maand geen oordeel. Je hoeft
            niets te kunnen, niets bijzonders aan te schaffen en geen
            ervaring te hebben.
          </p>
          <p>
            De belangrijkste beslissing is niet <em>welke</em> stijl je kiest,
            maar of het tijdstip realistisch in jouw week past. Regelmaat wint
            het van intensiteit — twee rustige lessen per week doen op de
            lange termijn meer dan één zware les die je vaak overslaat.
          </p>
          <p>
            In deze gids lopen we praktisch door de eerste weken: hoe je een
            passende les kiest, wat je meeneemt, hoe vaak je realistisch gaat
            en hoe je stap voor stap een routine opbouwt die je écht volhoudt.
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
        De meeste mensen die stoppen met yoga stoppen niet omdat yoga
        tegenviel — ze stoppen omdat de start niet aansloot bij hun week.
        Een te fysieke eerste les, een tijdstip dat toch niet past, of het
        gevoel dat iedereen om je heen al lang meedoet. Dat zijn geen
        yogaproblemen; dat zijn startproblemen. En die zijn te voorkomen.
      </p>
      <p className="mt-4">
        Beginnen met yoga is minder een sportieve keuze en meer een
        organisatorische. De vraag is niet hoeveel push-ups je kunt, maar of
        je twee vaste momenten per week structureel vrij kunt houden. Wie
        die momenten eerlijk in kaart brengt voordat de eerste les geboekt
        wordt, heeft de grootste kans om het vol te houden.
      </p>
      <p className="mt-4">
        Amsterdam Oost heeft daarbij een praktisch voordeel: alles ligt
        dichtbij en bereikbaar. In Zeeburg, Cruquius, de Indische Buurt of
        het Oostelijk Havengebied ben je met de fiets binnen tien tot
        vijftien minuten bij een studio. Dat maakt structurele beoefening
        een stuk makkelijker dan wanneer je eerst een half uur moet reizen.
      </p>

      <h2
        id="welke-les"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Welke yogales past bij jou als beginner?
      </h2>
      <p className="mt-4">
        Voor een eerste periode kies je een les die in de omschrijving
        expliciet <strong>toegankelijk</strong>, <strong>rustig</strong> of{" "}
        <strong>geschikt voor alle niveaus</strong> is. Dat zegt meer dan de
        stijlnaam op zichzelf. Een vinyasa-les kan bij de ene docent
        toegankelijk zijn en bij de andere pittig; de omschrijving is de
        betrouwbaardere aanwijzing.
      </p>
      <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-foreground">
        Rustigere stijlen om mee te starten
      </h3>
      <p className="mt-3">
        Hatha, yin, restorative en gentle zijn stijlen waar houdingen langer
        worden vastgehouden en adem centraal staat. Voor beginners zijn ze
        prettig omdat je tijd hebt om te snappen wat er gebeurt in je
        lichaam, in plaats van houdingen te volgen op tempo. Je bouwt
        aandacht en lichaamsgevoel op — de basis voor alles daarna.
      </p>
      <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-foreground">
        Dynamischere stijlen — pas na een paar weken
      </h3>
      <p className="mt-3">
        Vinyasa, flow en power gaan sneller en zijn fysieker. Ze zijn niet
        moeilijker in de zin van "gevorderd", maar ze vragen wel dat je de
        basisnamen van houdingen enigszins kent. Als je nul ervaring hebt,
        is het rustiger om deze pas te proberen na drie tot vier
        toegankelijke lessen. Je ziet er dan meer van, in plaats van vooral
        de docent te proberen bij te houden.
      </p>
      <p className="mt-4">
        Twijfel je nog? Kies simpelweg de eerste toegankelijke les die qua
        tijd goed uitkomt. Met een intro pass kun je later andere stijlen en
        docenten toetsen. Voor een uitgebreidere vergelijking van studio's
        kun je ons artikel over{" "}
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
        Beginnen met yoga vraagt bewust weinig materiaal. Alles wat je in
        de eerste weken écht nodig hebt, heb je waarschijnlijk al thuis:
      </p>
      <ul className="mt-4 space-y-3 pl-5 [list-style-type:disc]">
        <li>
          <strong>Kleding waarin je beweegt.</strong> Een legging of joggingbroek
          en een T-shirt of longsleeve zijn prima. Vermijd kleding die strak op
          je middel drukt. Je hoeft geen speciale yoga-outfit te kopen — dat is
          later hooguit een prettige, geen voorwaarde.
        </li>
        <li>
          <strong>Blote voeten.</strong> Yoga doe je zonder schoenen en meestal
          zonder sokken. Extra sokken meenemen voor de rustige delen aan het
          einde kan prettig zijn, omdat je lichaam dan afkoelt.
        </li>
        <li>
          <strong>Water.</strong> Neem een flesje mee, maar drink niet vlak voor
          de les liters achter elkaar.
        </li>
        <li>
          <strong>Een matje?</strong> In veel studio's zijn matjes, blokken en
          riemen aanwezig. Vraag dit vooraf, dan hoef je op je eerste les niets
          te sjouwen.
        </li>
      </ul>
      <p className="mt-4">
        Wat je vooral <em>niet</em> nodig hebt: een spirituele voorbereiding,
        een leeg hoofd of het gevoel dat je "er klaar voor" bent. Yoga is er
        juist voor mensen met een druk hoofd en een volle week. Je hoeft
        niets weg te werken voordat je begint.
      </p>

      <h2
        id="frequentie"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Hoe vaak in de week is realistisch?
      </h2>
      <p className="mt-4">
        Voor de meeste beginners werkt twee keer per week goed. Dat is
        genoeg om houdingen te herkennen, adem te leren volgen en effect te
        merken. En het is weinig genoeg om je week niet te overbelasten,
        zodat je niet na drie weken uitgeput afhaakt.
      </p>
      <p className="mt-4">
        Kies daarbij bij voorkeur <strong>twee vaste momenten</strong> in de
        week, geen zwevende tijden. Bijvoorbeeld dinsdagavond en
        zaterdagochtend, of maandagavond en donderdagochtend. Vaste momenten
        onderhandel je niet meer met jezelf, en dat is precies waarom ze
        werken. Zwevende plannen ("ik ga twee keer, ergens deze week")
        verliezen bijna altijd van een drukke agenda.
      </p>
      <p className="mt-4">
        Combineer waar mogelijk één rustigere en één dynamischere les. Zo
        krijg je afwisseling én zie je zelf welke vorm je op de lange termijn
        prettiger vindt. Bekijk het{" "}
        <a
          href="/schedule"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          actuele lesrooster
        </a>{" "}
        en zoek twee blokken die in je week passen zonder omweg. Als je die
        niet vindt, is dat waardevolle informatie: dan past die studio in de
        praktijk niet, hoe goed de lessen ook zijn.
      </p>

      <h2
        id="opbouwen"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Rustig en verantwoord opbouwen
      </h2>
      <p className="mt-4">
        Yoga hoort geen pijn te doen. Rekken kan intens voelen en spieren
        kunnen de dag erna wat stijver zijn — dat hoort erbij. Scherpe of
        stekende pijn tijdens een houding is echter een reden om eruit te
        komen, niet om door te zetten. De docent zal dit vaak expliciet
        benoemen; volg dat op.
      </p>
      <p className="mt-4">
        Twee praktische regels voor de eerste weken. Eén: als je adem stokt
        of oppervlakkig wordt, schakel je terug. Rustig kunnen ademen is een
        goede indicator dat je binnen je bereik werkt. Twee: variaties zijn
        geen zwaktebod. Iedere houding heeft makkelijker en zwaarder
        varianten; de makkelijkere kiezen is een oefening, geen concessie.
      </p>
      <p className="mt-4">
        Heb je bestaande klachten of ben je zwanger? Meld dit voor de les
        aan de docent, zodat aanpassingen kunnen worden voorgesteld. Yoga is
        geen medische behandeling — bij twijfel overleg je eerst met je
        arts, verloskundige of behandelaar wat op dit moment verstandig is.
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
        Lenigheid is geen voorwaarde voor yoga; het is een mogelijk gevolg
        van regelmatig oefenen. Beginnen mét stijve hamstrings of schouders
        is eerder de regel dan de uitzondering. Sterker: mensen die zichzelf
        niet lenig noemen, merken vaak sneller effect omdat er meer ruimte
        te winnen valt.
      </p>
      <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-foreground">
        "Iedereen om me heen weet wat ze doen."
      </h3>
      <p className="mt-3">
        Dat lijkt zo, maar in de praktijk kijkt vrijwel niemand naar wat de
        rest doet. Bijna elke yogastudent is met dezelfde onzekerheid ooit
        begonnen. Kies bewust een plek iets achterin de zaal als dat je
        helpt, en volg gewoon de docent.
      </p>
      <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-foreground">
        "Ik heb geen tijd."
      </h3>
      <p className="mt-3">
        Vaak niet echt waar — meestal is het geen tijd voor onduidelijke
        momenten. Twee vaste blokken van 60 tot 75 minuten per week vind je
        bijna altijd, mits je ze eerlijk plant. Behandel ze als een afspraak
        met iemand anders; dan schuiven ze ook niet zomaar.
      </p>
      <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-foreground">
        "Ik weet niet of ik het langer volhoud dan een maand."
      </h3>
      <p className="mt-3">
        Dat hoef je nu ook niet te weten. De vraag voor de eerste maand is
        alleen of je de twee gekozen momenten haalt. Effect zien is
        vervolgvraag, niet startvraag.
      </p>

      <h2
        id="eerste-stappen"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Concrete eerste stappen deze week
      </h2>
      <ol className="mt-4 space-y-3 pl-5 [list-style-type:decimal]">
        <li>
          <strong>Kies twee tijdslots.</strong> Kijk in je agenda naar de
          komende twee weken en markeer twee blokken van 90 minuten (les +
          reistijd) die realistisch vrij zijn. Niet ideaal, maar echt vrij.
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
          <strong>Boek beide lessen tegelijk.</strong> Niet één en dan "we zien
          wel". Twee gelijk geboekte lessen maken de start automatisch een
          routine, geen experiment.
        </li>
        <li>
          <strong>Leg je kleding klaar.</strong> Zet je tas de avond ervoor
          klaar. Kleine drempels weghalen bij de start scheelt op moeilijke
          dagen.
        </li>
        <li>
          <strong>Beoordeel na twee weken.</strong> Niet na één les. Kijk naar
          hoe je week aanvoelde en of je jezelf terug ziet gaan. Dat is
          bruikbaardere informatie dan of je alle houdingen "goed" deed.
        </li>
      </ol>
      <p className="mt-4">
        Meer weten over hoe zo'n eerste les er concreet uitziet? Lees ons
        artikel over{" "}
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
        Yoga Zeeburg is een kleine, persoonlijke studio aan de{" "}
        <strong>Cruquiusweg 96F</strong> in Amsterdam Oost, boven CrossFit
        Zeeburg en aan het water. De studio is bewust ingericht op mensen die
        met een gewone volle week toch een yogaroutine willen opbouwen — geen
        prestatiedruk, geen zweverigheid, wel persoonlijke aandacht.
      </p>
      <p className="mt-4">
        Voor beginners werkt een intro pass prettig: in twee weken kun je
        meerdere toegankelijke lessen op verschillende tijden en bij
        verschillende docenten proberen, zodat je zonder haast een routine
        kunt uitzoeken die daadwerkelijk in je week past.{" "}
        <a
          href="https://crossfitzeeburg.sportbitapp.nl/web/nl/registreren/lidmaatschap?r=42"
          target="_blank"
          rel="noopener noreferrer"
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

export const ARTICLES: Article[] = [
  proeflesArticle,
  welkeStudioArticle,
  beginnersArticle,
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return ARTICLES.filter((a) => a.category.slug === categorySlug);
}

export function getArticlesSortedByNewest(): Article[] {
  return [...ARTICLES].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
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
