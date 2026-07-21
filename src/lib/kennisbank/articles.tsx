import type { LucideIcon } from "lucide-react";
import { MapPin } from "lucide-react";
import type { ReactNode } from "react";

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
    showRelated: false,
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
              14 dagen onbeperkt intro pass
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
        precies waarom een intro pass zoals de{" "}
        <a
          href="https://crossfitzeeburg.sportbitapp.nl/web/nl/registreren/lidmaatschap?r=42"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          14 dagen onbeperkt intro pass
        </a>{" "}
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

function InlineIntroCTA() {
  return (
    <aside
      aria-label="Probeer 14 dagen onbeperkt"
      className="mt-10 rounded-2xl border border-border bg-secondary/50 p-6 sm:p-8"
    >
      <h3 className="font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl">
        Rustig verschillende lessen proberen
      </h3>
      <p className="mt-3 text-foreground/90">
        Met de 14 dagen onbeperkt intro pass kun je binnen twee weken
        verschillende lessen, docenten en tijden bij Yoga Zeeburg proberen.
        Zo ontdek je welke vorm van yoga bij jouw week past.
      </p>
      <a
        href="https://crossfitzeeburg.sportbitapp.nl/web/nl/registreren/lidmaatschap?r=42"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex min-h-[44px] items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
      >
        Bekijk de intro pass
      </a>
      <p className="mt-3 text-xs text-muted-foreground">
        Voor nieuwe studenten. Stopt automatisch.
      </p>
    </aside>
  );
}

export const ARTICLES: Article[] = [proeflesArticle];

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
