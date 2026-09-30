// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: hatha-yoga-wat-is-het-en-voor-wie-is-het-geschikt

import { Link } from "@tanstack/react-router";
import { Flower2 } from "lucide-react";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import heroAsset from "@/assets/hatha-yoga-hero.webp.asset.json";
import inlineAsset from "@/assets/hatha-yoga-opbouw-en-hulpmiddelen.webp.asset.json";
import type { Article } from "../article-types";

const HERO_IMAGE: ArticleImageRef = {
  url: heroAsset.url,
  alt: "Lege rustige yogaruimte met een groene mat, kurken yogablokken, yogariem en meditatiekussen voor een Hatha yogales.",
  width: 1536,
  height: 1024,
};

const INLINE_IMAGE: ArticleImageRef = {
  url: inlineAsset.url,
  alt: "Yogamat met twee kurken blokken, yogariem, opgevouwen deken en meditatiekussen als hulpmiddelen voor Hatha yoga.",
  width: 1536,
  height: 1024,
};

const INTRO =
  "Hatha yoga is een brede yogavorm waarin je lichaamshoudingen en ademhaling bewust oefent. In een moderne Hatha-les voer je houdingen meestal afzonderlijk uit, met tijd om de positie te voelen, aan te passen en rustig te ademen. Het tempo ligt doorgaans lager dan bij Vinyasa, maar Hatha is niet automatisch gemakkelijk: staande houdingen en langere houdingen kunnen best inspannend zijn. De stijl past vaak goed bij beginners, mensen die duidelijke uitleg waarderen en yogi’s die liever zonder snelle overgangen oefenen. Omdat “Hatha” een brede naam is, verschilt de precieze inhoud per docent en studio. Controleer daarom altijd de lesbeschrijving en het niveau voordat je boekt.";

export const article: Article = {
  slug: "hatha-yoga-wat-is-het-en-voor-wie-is-het-geschikt",
  title: "Hatha yoga: wat is het en voor wie is het geschikt?",
  h1: "Hatha yoga: wat is het en voor wie is het geschikt?",
  seoTitle: "Hatha yoga: wat is het en voor wie? | Yoga Zeeburg",
  ogTitle: "Hatha yoga: wat is het en voor wie is het geschikt?",
  description:
    "Wat is Hatha yoga en voor wie is het geschikt? Lees hoe een les is opgebouwd, hoe intensief het is en wanneer deze yogastijl bij je past.",
  ogDescription:
    "Een heldere uitleg van Hatha yoga: houding, adem, tempo, lesopbouw en voor wie deze bewuste yogastijl prettig kan zijn.",
  intro: INTRO,
  category: { slug: "yogastijlen", title: "Yogastijlen", icon: Flower2 },
  type: "guide",
  pillar: false,
  publishedAt: "2026-09-30",
  updatedAt: "2026-09-30",
  readingTimeMin: 7,
  cta: {
    heading: "Ontdek welke yogastijl bij je past",
    text: "Met de 14-daagse introductiepas kun je verschillende lessen, docenten en tijden bij Yoga Zeeburg in Amsterdam Oost ervaren.",
    label: "Start je 14 dagen onbeperkt",
    subtext: "Voor nieuwe studenten. Stopt automatisch.",
  },
  toc: [
    { id: "wat-betekent-hatha-yoga", label: "Wat betekent Hatha yoga?" },
    { id: "hoe-ziet-een-hatha-yogales-eruit", label: "Hoe ziet een Hatha yogales eruit?" },
    { id: "is-hatha-yoga-zwaar", label: "Is Hatha yoga zwaar?" },
    { id: "voor-wie-is-hatha-yoga-geschikt", label: "Voor wie is Hatha yoga geschikt?" },
    { id: "wanneer-past-een-andere-yogastijl-beter", label: "Wanneer past een andere yogastijl beter?" },
    { id: "hatha-yoga-vergeleken-met-vinyasa-en-yin", label: "Hatha yoga vergeleken met Vinyasa en Yin" },
    { id: "zo-bereid-je-je-eerste-hatha-les-voor", label: "Zo bereid je je eerste Hatha-les voor" },
    { id: "conclusie", label: "Conclusie" },
    { id: "faq", label: "Veelgestelde vragen" },
  ],
  faqs: [
    {
      question: "Is Hatha yoga geschikt voor beginners?",
      answer:
        "Vaak wel. Het beheerste tempo en de afzonderlijke houdingen geven meestal ruimte voor uitleg en aanpassingen. Controleer wel of de les als beginnersvriendelijk of voor alle niveaus wordt omschreven, want de intensiteit en aanpak verschillen per docent.",
    },
    {
      question: "Moet je lenig zijn voor Hatha yoga?",
      answer:
        "Nee. Lenigheid is geen voorwaarde om te beginnen. Je oefent binnen je eigen bewegingsruimte en kunt blokken, een riem of andere ondersteuning gebruiken. Regelmatig en beheerst oefenen is belangrijker dan hoe diep je op de eerste dag in een houding komt.",
    },
    {
      question: "Wat is het verschil tussen Hatha yoga en Vinyasa yoga?",
      answer:
        "Bij Hatha oefen je houdingen meestal afzonderlijk en in een rustiger tempo. Bij Vinyasa vloeien houdingen vaker in reeksen in elkaar over en is de overgang onderdeel van de oefening. De precieze intensiteit blijft afhankelijk van docent en lesniveau.",
    },
    {
      question: "Wat is het verschil tussen Hatha yoga en Yin yoga?",
      answer:
        "Hatha bevat doorgaans zowel staande als zittende houdingen en vraagt vaker actieve spierkracht. In Yin blijf je langer in vooral zittende of liggende houdingen met minder actieve inspanning. Beide kunnen rustig voelen, maar de manier van oefenen verschilt duidelijk.",
    },
    {
      question: "Hoe vaak per week kun je Hatha yoga doen?",
      answer:
        "Dat hangt af van je ervaring, herstel, de lesintensiteit en andere beweging die je doet. Eén les per week kan een rustige start zijn; vaker oefenen kan ook als je lichaam goed herstelt. Bouw geleidelijk op en pas je frequentie aan wanneer vermoeidheid of klachten toenemen.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg — Lessen, geraadpleegd 30 september 2026",
      url: "https://www.yogazeeburg.com/lessen",
    },
    {
      title: "Yoga Zeeburg — Rooster, geraadpleegd 30 september 2026",
      url: "https://www.yogazeeburg.com/rooster",
    },
    {
      title: "Yoga Zeeburg — 14-daagse introductiepas, geraadpleegd 30 september 2026",
      url: "https://www.yogazeeburg.com/trial",
    },
    {
      title:
        "National Center for Complementary and Integrative Health — Yoga: Effectiveness and Safety, geraadpleegd 30 september 2026",
      url: "https://www.nccih.nih.gov/health/yoga-effectiveness-and-safety",
    },
    {
      title: "EBSCO Research Starters — Hatha yoga, geraadpleegd 30 september 2026",
      url: "https://www.ebsco.com/research-starters/religion-and-philosophy/hatha-yoga",
    },
  ],
  template: { showTOC: true, showFAQ: true, showSources: true, showRelated: true },
  heroImage: HERO_IMAGE,
  heroCaption:
    "Hatha yoga combineert afzonderlijke houdingen, bewuste ademhaling en momenten van rust.",
  body: () => <HathaYogaBody />,
};

function HathaYogaBody() {
  const h2 = "mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl";
  const link = "font-medium text-primary underline underline-offset-4 hover:no-underline";
  return (
    <>
      <p className="mt-4">{INTRO}</p>

      <h2 id="wat-betekent-hatha-yoga" className={h2}>
        Wat betekent Hatha yoga?
      </h2>
      <p className="mt-4">
        Historisch is Hatha yoga veel breder dan één vast lesformat. De traditie omvat lichamelijke
        houdingen, ademtechnieken en andere oefeningen die lichaam en aandacht voorbereiden op
        verdere yogabeoefening. In hedendaagse westerse studio’s wordt “Hatha” meestal gebruikt
        voor een les waarin houdingen rustiger en duidelijker van elkaar worden geoefend dan in een
        doorlopende Flow.
      </p>
      <p className="mt-4">
        Dat betekent niet dat iedere Hatha-les hetzelfde is. De ene docent legt meer nadruk op
        techniek en uitlijning, de andere op ademhaling, concentratie of ontspanning. Ook het
        niveau en de intensiteit kunnen verschillen. Zie Hatha daarom niet als een strikt merk met
        één vaste volgorde, maar als een brede categorie. De lesbeschrijving vertelt je meer dan
        alleen de stijlnaam.
      </p>

      <h2 id="hoe-ziet-een-hatha-yogales-eruit" className={h2}>
        Hoe ziet een Hatha yogales eruit?
      </h2>
      <p className="mt-4">
        Een Hatha-les heeft vaak een herkenbare opbouw, al bepaalt iedere docent de precieze
        invulling:
      </p>
      <ol className="mt-4 list-decimal space-y-2 pl-6">
        <li>
          <strong>Aankomen en aandacht verzamelen.</strong> Je begint zittend of liggend, merkt je
          adem op en laat de drukte van buiten even los.
        </li>
        <li>
          <strong>Rustig opwarmen.</strong> Eenvoudige bewegingen maken gewrichten en spieren klaar
          voor grotere houdingen.
        </li>
        <li>
          <strong>Staande en zittende houdingen.</strong> Je oefent bijvoorbeeld buigingen, draaien
          en balanshoudingen. De docent geeft aanwijzingen en biedt waar mogelijk variaties.
        </li>
        <li>
          <strong>Ademwerk of een korte concentratieoefening.</strong> Sommige lessen bevatten een
          eenvoudige ademtechniek. Dit is geen verplicht onderdeel van iedere les.
        </li>
        <li>
          <strong>Eindontspanning.</strong> De les sluit meestal af met Savasana: enkele minuten
          stil liggen en de inspanning laten zakken.
        </li>
      </ol>
      <p className="mt-4">
        Doordat houdingen niet voortdurend in een snelle reeks overgaan, heb je meer tijd om te
        begrijpen waar je voeten, knieën, heupen en schouders zijn. Yogablokken, een riem of een
        deken kunnen de grond dichterbij brengen of extra steun geven. Een hulpmiddel maakt een
        houding niet minder goed; het helpt je de bedoeling ervan op een passende manier te
        ervaren.
      </p>
      <ArticleFigure
        image={INLINE_IMAGE}
        caption="Blokken, een riem, een deken en een meditatiekussen kunnen houdingen toegankelijker en comfortabeler maken."
        className="mt-10"
      />

      <h2 id="is-hatha-yoga-zwaar" className={h2}>
        Is Hatha yoga zwaar?
      </h2>
      <p className="mt-4">
        Hatha yoga is meestal minder snel dan een dynamische Vinyasa-les, maar langzaam betekent
        niet per se licht. Een houding rustig innemen en meerdere ademhalingen vasthouden kan
        kracht, stabiliteit en concentratie vragen. Een les kan zachte mobiliteit bevatten, maar
        ook stevige staande houdingen of balansoefeningen.
      </p>
      <p className="mt-4">
        De intensiteit hangt af van het niveau, de keuzes van de docent en hoe jij de houdingen
        uitvoert. Je hoeft niet zo diep mogelijk in een houding te gaan. Een kleinere
        bewegingsuitslag, kortere houdtijd of extra steun kan dezelfde oefening toegankelijker
        maken. Pijn is geen doel; kom rustig uit een houding wanneer iets scherp, onveilig of
        onverklaarbaar voelt.
      </p>

      <h2 id="voor-wie-is-hatha-yoga-geschikt" className={h2}>
        Voor wie is Hatha yoga geschikt?
      </h2>
      <p className="mt-4">Hatha yoga kan goed passen wanneer je:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>voor het eerst yoga probeert en graag duidelijke uitleg krijgt;</li>
        <li>houdingen stap voor stap wilt leren in plaats van snel door te bewegen;</li>
        <li>wilt werken aan lichaamsbewustzijn, mobiliteit, balans en basiskracht;</li>
        <li>een rustige les zoekt die toch lichamelijk actief mag zijn;</li>
        <li>na een drukke dag liever bewust vertraagt;</li>
        <li>al ervaring hebt en basishoudingen nauwkeuriger wilt onderzoeken.</li>
      </ul>
      <p className="mt-4">
        Je hoeft niet lenig te zijn om te beginnen. Flexibiliteit is geen toelatingseis en een
        houding hoeft er bij verschillende lichamen niet hetzelfde uit te zien. Laat de docent vóór
        de les weten als je zwanger bent, herstelt van een operatie, snel duizelig wordt of een
        relevante blessure of aandoening hebt. De docent kan algemene opties geven, maar stelt geen
        diagnose en vervangt geen bevoegde zorgprofessional.
      </p>
      <p className="mt-4">
        Voor gezonde volwassenen wordt yoga over het algemeen als een veilige bewegingsvorm
        beschouwd wanneer die passend en onder deskundige begeleiding wordt uitgevoerd. Heb je
        acute klachten of twijfel je of bewegen verstandig is, bespreek dat eerst met een bevoegde
        zorgprofessional.
      </p>

      <h2 id="wanneer-past-een-andere-yogastijl-beter" className={h2}>
        Wanneer past een andere yogastijl beter?
      </h2>
      <p className="mt-4">
        Hatha is veelzijdig, maar niet voor ieder doel de meest logische keuze. Zoek je een
        doorlopende, ritmische les waarin beweging en adem snel op elkaar volgen, dan past Vinyasa
        mogelijk beter. Wil je vooral langer ondersteund zitten of liggen en weinig
        spierinspanning, kijk dan naar Yin, Restorative of Yoga Nidra. Wil je juist flink zweten,
        controleer dan of een actieve Flow of andere dynamische les aansluit.
      </p>
      <p className="mt-4">
        Dat is geen rangorde. De beste yogastijl is de stijl waarvan tempo, begeleiding en sfeer op
        dit moment bij je passen. Je kunt bovendien verschillende stijlen naast elkaar volgen. Lees
        de pagina met{" "}
        <Link to="/lessen" className={link}>
          yogalessen bij Yoga Zeeburg
        </Link>{" "}
        en vergelijk de actuele omschrijvingen voordat je reserveert.
      </p>

      <h2 id="hatha-yoga-vergeleken-met-vinyasa-en-yin" className={h2}>
        Hatha yoga vergeleken met Vinyasa en Yin
      </h2>
      <p className="mt-4">De verschillen zijn vooral zichtbaar in tempo en manier van oefenen:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>
          <strong>Hatha:</strong> houdingen worden meestal afzonderlijk en in een beheerst tempo
          geoefend. Er is ruimte voor uitleg, adem en aanpassingen.
        </li>
        <li>
          <strong>Vinyasa:</strong> houdingen vloeien vaker in reeksen in elkaar over. De overgang
          is onderdeel van de oefening en het tempo ligt doorgaans hoger.
        </li>
        <li>
          <strong>Yin:</strong> je blijft langer in overwegend zittende of liggende houdingen,
          meestal met weinig actieve spierinspanning.
        </li>
      </ul>
      <p className="mt-4">
        Deze omschrijvingen zijn richtinggevend, geen harde regels. Een rustige Vinyasa kan zachter
        zijn dan een krachtige Hatha-les, en docenten kunnen elementen combineren. Het
        vervolgartikel over Vinyasa gaat dieper in op die stijl; het geplande vergelijkingsartikel
        behandelt Hatha en Vinyasa later rechtstreeks naast elkaar.
      </p>

      <h2 id="zo-bereid-je-je-eerste-hatha-les-voor" className={h2}>
        Zo bereid je je eerste Hatha-les voor
      </h2>
      <p className="mt-4">
        Kies comfortabele kleding waarin je vrij kunt bewegen. Je hebt geen speciale yoga-outfit
        nodig; de praktische gids{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "wat-trek-je-aan-naar-een-yogales" }}
          className={link}
        >
          Wat trek je aan naar een yogales?
        </Link>{" "}
        helpt bij de keuze. Controleer daarnaast of de studio matten en hulpmiddelen aanbiedt en
        kom enkele minuten eerder om rustig kennis te maken met de docent.
      </p>
      <p className="mt-4">Tijdens de les:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>beweeg binnen een bereik dat stabiel en beheersbaar voelt;</li>
        <li>gebruik blokken, een riem of een deken wanneer dat helpt;</li>
        <li>adem normaal door en forceer geen ademtechniek;</li>
        <li>neem rust als je die nodig hebt;</li>
        <li>vergelijk jouw houding niet met die van een ander.</li>
      </ul>
      <p className="mt-4">
        Bekijk voor actuele tijden altijd het{" "}
        <Link to="/rooster" className={link}>
          lesrooster
        </Link>
        . Wil je ervaren hoe verschillende stijlen en docenten aanvoelen, dan kun je met de{" "}
        <Link to="/trial" className={link}>
          14-daagse introductiepas
        </Link>{" "}
        meerdere lessen proberen voordat je een vaste keuze maakt.
      </p>

      <h2 id="conclusie" className={h2}>
        Conclusie
      </h2>
      <p className="mt-4">
        Hatha yoga is een brede, doorgaans rustig opgebouwde yogavorm waarin houdingen, ademhaling
        en aandacht samenkomen. De stijl is vaak geschikt voor beginners en voor mensen die tijd
        willen nemen om houdingen bewust te voelen en aan te passen. Toch kan Hatha ook fysiek
        uitdagend zijn en verschilt de invulling per docent. Kijk daarom niet alleen naar de naam,
        maar ook naar niveau, tempo en lesbeschrijving. De beste eerste Hatha-les is niet de les
        waarin je het verst komt, maar de les waarin je met controle, nieuwsgierigheid en
        vertrouwen kunt oefenen.
      </p>
    </>
  );
}
