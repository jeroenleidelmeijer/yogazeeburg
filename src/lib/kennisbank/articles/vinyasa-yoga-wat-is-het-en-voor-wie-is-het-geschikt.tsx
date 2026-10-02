// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: vinyasa-yoga-wat-is-het-en-voor-wie-is-het-geschikt

import { Link } from "@tanstack/react-router";
import { Flower2 } from "lucide-react";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import heroAsset from "@/assets/vinyasa-yoga-hero.webp.asset.json";
import inlineAsset from "@/assets/vinyasa-yoga-flow-en-hulpmiddelen.webp.asset.json";
import type { Article } from "../article-types";

const HERO_IMAGE: ArticleImageRef = {
  url: heroAsset.url,
  alt: "Lege lichte yogaruimte met een groene yogamat, kurken blokken, yogariem, deken en waterfles voor een Vinyasa-les.",
  width: 1536,
  height: 1024,
};

const INLINE_IMAGE: ArticleImageRef = {
  url: inlineAsset.url,
  alt: "Drie yogamatten met kurken blokken, een golvende yogariem en een opgevouwen deken als rustige verbeelding van een Vinyasa-flow.",
  width: 1536,
  height: 1024,
};

const INTRO =
  "Vinyasa yoga is een dynamische yogastijl waarin houdingen in een doorgaande reeks met elkaar worden verbonden. De adem geeft richting aan het tempo: een inademing begeleidt bijvoorbeeld een opwaartse beweging en een uitademing een buiging of overgang. Iedere les kan anders zijn, omdat de docent zelf een volgorde rond een thema, houding of lichamelijke kwaliteit samenstelt. Vinyasa past vaak bij mensen die graag actief bewegen, afwisseling waarderen en hun aandacht bij adem en beweging willen houden. De stijl kan ook geschikt zijn voor beginners, mits het niveau, tempo en de hoeveelheid uitleg aansluiten. Omdat “Vinyasa” geen vaststaand lesprogramma is, zegt de lesbeschrijving meer dan alleen de naam.";

export const article: Article = {
  slug: "vinyasa-yoga-wat-is-het-en-voor-wie-is-het-geschikt",
  title: "Vinyasa yoga: wat is het en voor wie is het geschikt?",
  h1: "Vinyasa yoga: wat is het en voor wie is het geschikt?",
  seoTitle: "Vinyasa yoga: wat is het en voor wie? | Yoga Zeeburg",
  ogTitle: "Vinyasa yoga: wat is het en voor wie is het geschikt?",
  description:
    "Wat is Vinyasa yoga en voor wie past het? Lees hoe een les verloopt, hoe intensief de stijl is en wat je als beginner kunt verwachten.",
  ogDescription:
    "Een heldere gids over Vinyasa yoga: flow, ademhaling, tempo, lesopbouw en voor wie deze dynamische yogastijl geschikt kan zijn.",
  intro: INTRO,
  category: { slug: "yogastijlen", title: "Yogastijlen", icon: Flower2 },
  type: "guide",
  pillar: false,
  publishedAt: "2026-10-02",
  updatedAt: "2026-10-02",
  readingTimeMin: 7,
  cta: {
    heading: "Ontdek of Vinyasa bij je past",
    text: "Met de 14-daagse introductiepas kun je verschillende lessen, docenten en tijden bij Yoga Zeeburg in Amsterdam Oost ervaren.",
    label: "Start je 14 dagen onbeperkt",
    subtext: "Voor nieuwe studenten. Stopt automatisch.",
  },
  toc: [
    { id: "wat-betekent-vinyasa-yoga", label: "Wat betekent Vinyasa yoga?" },
    { id: "hoe-ziet-een-vinyasa-les-eruit", label: "Hoe ziet een Vinyasa-les eruit?" },
    { id: "welke-rol-speelt-de-adem", label: "Welke rol speelt de adem?" },
    { id: "is-vinyasa-yoga-zwaar", label: "Is Vinyasa yoga zwaar?" },
    { id: "voor-wie-is-vinyasa-yoga-geschikt", label: "Voor wie is Vinyasa yoga geschikt?" },
    { id: "kan-een-beginner-vinyasa-yoga-doen", label: "Kan een beginner Vinyasa yoga doen?" },
    {
      id: "wanneer-past-een-andere-yogastijl-beter",
      label: "Wanneer past een andere yogastijl beter?",
    },
    { id: "zo-kies-je-een-passende-vinyasa-les", label: "Zo kies je een passende Vinyasa-les" },
    { id: "conclusie", label: "Conclusie" },
    { id: "faq", label: "Veelgestelde vragen" },
  ],
  faqs: [
    {
      question: "Is Vinyasa yoga geschikt voor beginners?",
      answer:
        "Ja, vooral in een beginnersles, Slow Flow of les voor alle niveaus. Een rustiger tempo en duidelijke uitleg geven je tijd om houdingen en overgangen te leren. Vraag de docent vooraf welke opties beschikbaar zijn.",
    },
    {
      question: "Wat is het verschil tussen Vinyasa en Hatha yoga?",
      answer:
        "Bij Vinyasa worden houdingen meestal in doorlopende reeksen verbonden en zijn de overgangen onderdeel van de oefening. In Hatha worden houdingen vaker afzonderlijk en in een beheerster tempo geoefend. De intensiteit verschilt per docent en lesniveau.",
    },
    {
      question: "Moet je lenig zijn voor Vinyasa yoga?",
      answer:
        "Nee. Lenigheid is geen voorwaarde om te beginnen. Je kunt houdingen kleiner maken, blokken gebruiken en overgangen aanpassen. Stabiliteit, adem en controle zijn belangrijker dan hoe diep je in een houding komt.",
    },
    {
      question: "Is Vinyasa yoga hetzelfde als Flow yoga?",
      answer:
        "De termen worden vaak als synoniemen gebruikt. Yoga Alliance noemt Vinyasa als een veelgebruikte benaming voor Flow Yoga. Studio’s en docenten kunnen de precieze invulling echter verschillend gebruiken, dus lees altijd de lesbeschrijving.",
    },
    {
      question: "Hoe vaak per week kun je Vinyasa yoga doen?",
      answer:
        "Dat hangt af van de intensiteit, je ervaring, je herstel en andere beweging die je doet. Eén les per week kan een goede start zijn. Vaker kan ook als je voldoende herstelt en geen toenemende pijn of vermoeidheid ervaart.",
    },
  ],
  sources: [
    {
      title: "Yoga Alliance — What Is Yoga? Flow Yoga, geraadpleegd 2 oktober 2026",
      url: "https://yogaalliance.org/what-is-yoga/",
    },
    {
      title:
        "National Center for Complementary and Integrative Health — Yoga: Effectiveness and Safety, geraadpleegd 2 oktober 2026",
      url: "https://www.nccih.nih.gov/health/yoga-effectiveness-and-safety",
    },
    {
      title: "Yoga Zeeburg — Lessen, geraadpleegd 2 oktober 2026",
      url: "https://www.yogazeeburg.com/lessen",
    },
    {
      title: "Yoga Zeeburg — Rooster, geraadpleegd 2 oktober 2026",
      url: "https://www.yogazeeburg.com/rooster",
    },
    {
      title: "Yoga Zeeburg — 14-daagse introductiepas, geraadpleegd 2 oktober 2026",
      url: "https://www.yogazeeburg.com/trial",
    },
  ],
  template: { showTOC: true, showFAQ: true, showSources: true, showRelated: true },
  heroImage: HERO_IMAGE,
  heroCaption:
    "Vinyasa yoga verbindt houdingen in een doorgaande reeks waarin beweging en adem samenkomen.",
  body: () => <VinyasaYogaBody />,
};

function VinyasaYogaBody() {
  const h2 = "mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl";
  const link = "font-medium text-primary underline underline-offset-4 hover:no-underline";
  return (
    <>
      <p className="mt-4">{INTRO}</p>

      <h2 id="wat-betekent-vinyasa-yoga" className={h2}>
        Wat betekent Vinyasa yoga?
      </h2>
      <p className="mt-4">
        Het woord Vinyasa wordt in moderne yogastudio’s meestal gebruikt voor een flow: houdingen
        volgen elkaar op en de overgangen zijn onderdeel van de oefening. Je komt dus niet alleen in
        een houding aan; ook de weg ernaartoe krijgt aandacht. Yoga Alliance omschrijft Flow Yoga als
        een dynamische fysieke beoefening met continue beweging en noemt Vinyasa als een veelgebruikte
        benaming daarvoor.
      </p>
      <p className="mt-4">
        Niet iedere Vinyasa-les is snel of zwaar. Een Slow Flow neemt tijd voor overgangen; een
        krachtige variant kan een stevig ritme en herhalingen bevatten. Docenten bouwen hun les
        bijvoorbeeld rond balans, mobiliteit, kracht of een thema. Die vrijheid zorgt voor afwisseling
        en maakt het belangrijk om niveau en lesbeschrijving te controleren.
      </p>

      <h2 id="hoe-ziet-een-vinyasa-les-eruit" className={h2}>
        Hoe ziet een Vinyasa-les eruit?
      </h2>
      <p className="mt-4">
        De precieze opbouw verschilt per docent, maar een Vinyasa-les bevat vaak deze onderdelen:
      </p>
      <ol className="mt-4 list-decimal space-y-2 pl-6">
        <li>
          <strong>Aankomen en ademen.</strong> Je begint rustig en brengt je aandacht naar het lichaam
          en de adem.
        </li>
        <li>
          <strong>Mobiliseren en opwarmen.</strong> Vloeiende bewegingen bereiden gewrichten en spieren
          voor op grotere houdingen.
        </li>
        <li>
          <strong>Een of meer staande reeksen.</strong> Houdingen worden met bewuste overgangen
          verbonden. Zonnegroeten kunnen voorkomen, maar zijn niet in iedere les verplicht.
        </li>
        <li>
          <strong>Een focusgedeelte.</strong> De docent kan werken aan balans, draaien,
          achteroverbuigen, heupmobiliteit of kracht.
        </li>
        <li>
          <strong>Rustigere houdingen.</strong> Het tempo zakt meestal richting zittende of liggende
          houdingen.
        </li>
        <li>
          <strong>Eindontspanning.</strong> De les sluit doorgaans af met enkele minuten Savasana.
        </li>
      </ol>
      <p className="mt-4">
        Je hoeft de reeks niet meteen te onthouden. Een goede docent kondigt bewegingen duidelijk aan,
        demonstreert waar nodig en geeft opties. Blokken, een riem of een deken kunnen helpen om een
        houding of overgang beter bij jouw lichaam te laten passen.
      </p>
      <ArticleFigure
        image={INLINE_IMAGE}
        caption="Een Vinyasa-flow bestaat uit opeenvolgende houdingen; hulpmiddelen kunnen elke stap toegankelijker maken."
        className="mt-10"
      />

      <h2 id="welke-rol-speelt-de-adem" className={h2}>
        Welke rol speelt de adem?
      </h2>
      <p className="mt-4">
        De adem helpt het ritme te bepalen en houdt je aandacht bij wat je doet. Vaak wordt één
        beweging aan een in- of uitademing gekoppeld. Zo ervaar je een samenhangende bewegingslijn in
        plaats van losse houdingen.
      </p>
      <p className="mt-4">
        Toch is de adem geen metronoom waaraan je koste wat kost moet voldoen. Wanneer je adem gejaagd
        wordt, je techniek uiteenvalt of je niet meer weet wat de bedoeling is, mag je vertragen. Neem
        een extra ademhaling, sla een overgang over of rust even uit. De kwaliteit van bewegen is
        belangrijker dan precies gelijk blijven met de groep.
      </p>

      <h2 id="is-vinyasa-yoga-zwaar" className={h2}>
        Is Vinyasa yoga zwaar?
      </h2>
      <p className="mt-4">
        Vinyasa is doorgaans actiever dan een rustige Hatha- of Yin-les, maar de intensiteit varieert
        sterk. Langdurig staan, herhaalde overgangen en houdingen als Plank of Downward-Facing Dog
        kunnen kracht en uithoudingsvermogen vragen. Een beheerste Slow Flow kan juist toegankelijk en
        rustig aanvoelen.
      </p>
      <p className="mt-4">
        “Dynamisch” betekent daarom niet automatisch “gevorderd”. Een beginnersles kan een eenvoudige
        reeks langzaam opbouwen; een gevorderde les bevat vaak minder uitleg en complexere overgangen.
        Let op termen als beginner, all levels, slow flow, dynamic of advanced. Beweeg binnen een
        controleerbaar bereik en stop bij scherpe pijn, tintelingen, benauwdheid of plotselinge
        duizeligheid. Yoga geldt voor gezonde volwassenen in het algemeen als veilig wanneer de
        beoefening passend en deskundig wordt begeleid, maar blessures blijven mogelijk.
      </p>

      <h2 id="voor-wie-is-vinyasa-yoga-geschikt" className={h2}>
        Voor wie is Vinyasa yoga geschikt?
      </h2>
      <p className="mt-4">Vinyasa kan goed bij je passen wanneer je:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>graag actief en gevarieerd beweegt;</li>
        <li>het prettig vindt dat muziek, adem en beweging een ritme vormen;</li>
        <li>zowel mobiliteit als stabiliteit en basiskracht wilt oefenen;</li>
        <li>je aandacht gemakkelijker vasthoudt wanneer je in beweging blijft;</li>
        <li>verschillende reeksen en houdingen wilt ontdekken;</li>
        <li>een yogales zoekt die lichamelijk energie mag geven.</li>
      </ul>
      <p className="mt-4">
        De stijl kan ook passen als je al sport en yoga als aanvullende bewegingsvorm wilt gebruiken.
        Het doel is geen wedstrijd, maar bewust bewegen en tijdig aanpassen. Twijfel je nog? De gids{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "welke-yogastijl-past-bij-mij" }}
          className={link}
        >
          Welke yogastijl past bij mij?
        </Link>{" "}
        helpt je naar tempo, doel en begeleiding te kijken.
      </p>

      <h2 id="kan-een-beginner-vinyasa-yoga-doen" className={h2}>
        Kan een beginner Vinyasa yoga doen?
      </h2>
      <p className="mt-4">
        Ja, als de les echt op beginners of alle niveaus is gericht en de docent voldoende uitleg en
        opties geeft. Voor een eerste les is een langzamer tempo vaak prettiger. Je krijgt dan tijd om
        veelgebruikte houdingen en overgangen te herkennen zonder dat je het gevoel hebt voortdurend
        achter de groep aan te bewegen.
      </p>
      <p className="mt-4">Een paar praktische keuzes helpen:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>kies een beginnersles of Slow Flow;</li>
        <li>kom op tijd en vertel de docent dat het je eerste Vinyasa-les is;</li>
        <li>zet knieën aan de grond in Plank wanneer dat beter voelt;</li>
        <li>stap rustig in plaats van te springen;</li>
        <li>sla een overgang over als je de controle verliest;</li>
        <li>neem Child’s Pose of een andere rusthouding wanneer je wilt.</li>
      </ul>
      <p className="mt-4">
        Je hoeft niet lenig te zijn of de namen van houdingen te kennen. Comfortabele kleding waarin
        je vrij beweegt is voldoende; lees eventueel{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "wat-trek-je-aan-naar-een-yogales" }}
          className={link}
        >
          wat je aantrekt naar een yogales
        </Link>
        .
      </p>

      <h2 id="wanneer-past-een-andere-yogastijl-beter" className={h2}>
        Wanneer past een andere yogastijl beter?
      </h2>
      <p className="mt-4">
        Vinyasa is minder logisch als je vooral lang ondersteund wilt ontspannen, veel tijd per
        afzonderlijke houding nodig hebt of weinig overgangen wilt maken. Yin, Restorative of een
        rustige Hatha-les kan dan beter aansluiten.
      </p>
      <p className="mt-4">
        Hatha oefent houdingen meestal afzonderlijker en geeft vaak meer tijd voor uitleg en positie.
        Lees voor die stijl de gids{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "hatha-yoga-wat-is-het-en-voor-wie-is-het-geschikt" }}
          className={link}
        >
          Hatha yoga: wat is het en voor wie is het geschikt?
        </Link>
        . Een volgend artikel zet Hatha en Vinyasa rechtstreeks naast elkaar; dit artikel blijft
        bewust gericht op wat Vinyasa zelf inhoudt.
      </p>
      <p className="mt-4">
        Heb je een blessure, ben je zwanger, herstel je van een operatie of beïnvloedt een aandoening
        je beweging? Bespreek dit dan met een bevoegde zorgprofessional en informeer de docent. Een
        yogadocent biedt algemene variaties, maar stelt geen diagnose.
      </p>

      <h2 id="zo-kies-je-een-passende-vinyasa-les" className={h2}>
        Zo kies je een passende Vinyasa-les
      </h2>
      <p className="mt-4">Kijk verder dan alleen het woord Vinyasa. Controleer:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>
          <strong>Niveau:</strong> staat er beginner, all levels of gevorderd?
        </li>
        <li>
          <strong>Tempo:</strong> gaat het om Slow Flow, Flow of een krachtige variant?
        </li>
        <li>
          <strong>Beschrijving:</strong> noemt de studio techniek, kracht, mobiliteit, adem of een
          ander accent?
        </li>
        <li>
          <strong>Docent:</strong> verschillende docenten kunnen binnen dezelfde stijl een heel ander
          ritme en sfeer neerzetten.
        </li>
      </ul>
      <p className="mt-4">
        Bekijk daarom altijd het actuele{" "}
        <Link to="/rooster" className={link}>
          lesrooster
        </Link>{" "}
        en de lesomschrijving. Wil je niet vooraf één stijl hoeven kiezen, dan kun je met de{" "}
        <Link to="/trial" className={link}>
          14-daagse introductiepas
        </Link>{" "}
        meerdere lessen en docenten ervaren.
      </p>

      <h2 id="conclusie" className={h2}>
        Conclusie
      </h2>
      <p className="mt-4">
        Vinyasa yoga is een dynamische vorm van yoga waarin houdingen via bewuste overgangen met
        elkaar worden verbonden. De adem helpt het ritme bepalen, maar controle en veiligheid gaan
        altijd voor tempo. De stijl past vaak bij mensen die actief, gevarieerd en met aandacht willen
        bewegen. Beginners kunnen prima instappen wanneer de les rustig wordt opgebouwd en genoeg
        uitleg biedt. Omdat iedere docent een andere flow kan samenstellen, kies je niet alleen een
        stijlnaam: kijk ook naar niveau, tempo en lesbeschrijving. Een passende Vinyasa-les geeft je
        het gevoel dat je wordt uitgedaagd zonder dat je voortdurend de aansluiting verliest.
      </p>
    </>
  );
}