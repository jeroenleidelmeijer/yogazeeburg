// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: wat-is-het-verschil-tussen-hatha-yoga-en-vinyasa-yoga

import { Link } from "@tanstack/react-router";
import { Flower2 } from "lucide-react";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import heroAsset from "@/assets/hatha-vinyasa-verschil-yoga-zeeburg-hero.webp.asset.json";
import inlineAsset from "@/assets/hatha-vinyasa-verschil-lesopbouw.webp.asset.json";
import type { Article } from "../article-types";

const HERO_IMAGE: ArticleImageRef = {
  url: heroAsset.url,
  alt: "Twee rustige yogamatten met blokken die hatha en vinyasa yoga verbeelden",
  width: 1536,
  height: 1024,
};

const INLINE_IMAGE: ArticleImageRef = {
  url: inlineAsset.url,
  alt: "Twee yogamatten met hulpmiddelen die een rustige en een vloeiende lesopbouw verbeelden",
  width: 1536,
  height: 1024,
};

const INTRO =
  "Het belangrijkste verschil tussen hatha yoga en vinyasa yoga zit in het tempo en de overgang tussen houdingen. In een hatha-les blijf je meestal wat langer in een houding en neem je meer tijd voor uitlijning, ademhaling en rust. In een vinyasa-les verbind je houdingen vloeiender met elkaar, vaak op het ritme van de adem. Daardoor voelt vinyasa doorgaans dynamischer en vraagt het vaker wat meer conditie. Geen van beide stijlen is automatisch makkelijk of moeilijk: de docent, het niveau en de opbouw van de les maken veel verschil.";

export const article: Article = {
  slug: "wat-is-het-verschil-tussen-hatha-yoga-en-vinyasa-yoga",
  title: "Wat is het verschil tussen hatha yoga en vinyasa yoga?",
  h1: "Wat is het verschil tussen hatha yoga en vinyasa yoga?",
  seoTitle: "Hatha of vinyasa yoga: wat is het verschil?",
  ogTitle: "Wat is het verschil tussen hatha yoga en vinyasa yoga?",
  description:
    "Hatha of vinyasa yoga? Vergelijk tempo, opbouw, intensiteit en geschiktheid voor beginners en ontdek welke yogastijl bij jou past.",
  ogDescription:
    "Een heldere vergelijking van tempo, opbouw, intensiteit en geschiktheid voor beginners.",
  intro: INTRO,
  category: { slug: "yogastijlen", title: "Yogastijlen", icon: Flower2 },
  type: "comparison",
  pillar: false,
  publishedAt: "2026-10-05",
  updatedAt: "2026-10-05",
  readingTimeMin: 7,
  cta: {
    label: "Start je 14 dagen onbeperkt",
    subtext: "Voor nieuwe studenten. Stopt automatisch.",
  },
  toc: [
    { id: "hatha-en-vinyasa-in-een-oogopslag", label: "Hatha en vinyasa in één oogopslag" },
    { id: "hoe-verloopt-een-hatha-yogales", label: "Hoe verloopt een hatha-yogales?" },
    { id: "hoe-verloopt-een-vinyasa-yogales", label: "Hoe verloopt een vinyasa-yogales?" },
    { id: "welke-stijl-is-intensiever", label: "Welke stijl is intensiever?" },
    { id: "welke-yoga-is-beter-voor-beginners", label: "Welke yoga is beter voor beginners?" },
    { id: "wanneer-kies-je-voor-hatha-yoga", label: "Wanneer kies je voor hatha yoga?" },
    { id: "wanneer-kies-je-voor-vinyasa-yoga", label: "Wanneer kies je voor vinyasa yoga?" },
    { id: "je-hoeft-niet-definitief-te-kiezen", label: "Je hoeft niet definitief te kiezen" },
    { id: "hatha-of-vinyasa-proberen-bij-yoga-zeeburg", label: "Hatha of vinyasa proberen bij Yoga Zeeburg" },
    { id: "faq", label: "Veelgestelde vragen" },
  ],
  faqs: [
    {
      question: "Is hatha yoga makkelijker dan vinyasa yoga?",
      answer:
        "Niet per definitie. Hatha verloopt meestal langzamer, waardoor je meer tijd hebt om houdingen te begrijpen. Het langer vasthouden van houdingen kan echter stevig zijn. Vinyasa vraagt vaak meer conditie en coördinatie door de doorlopende beweging.",
    },
    {
      question: "Is vinyasa yoga geschikt voor beginners?",
      answer:
        "Ja, mits de les als beginnersvriendelijk of geschikt voor alle niveaus wordt aangeboden. Een goede docent bouwt de reeks geleidelijk op en geeft eenvoudigere opties. Bij een snelle gevorderdenles kan het tempo voor een eerste keer te hoog zijn.",
    },
    {
      question: "Verbrand je met vinyasa meer calorieën dan met hatha?",
      answer:
        "Vinyasa is meestal dynamischer en kan daardoor meer energie vragen, maar het verschil varieert sterk per les en persoon. Calorieverbruik is geen betrouwbare maatstaf om te bepalen welke yogastijl beter bij je past.",
    },
    {
      question: "Kun je hatha en vinyasa combineren?",
      answer:
        "Ja. De stijlen vullen elkaar goed aan. Hatha geeft ruimte voor techniek en aandacht; vinyasa laat je die houdingen in vloeiende reeksen toepassen. Je kunt per dag kiezen wat bij je energie en behoefte past.",
    },
    {
      question: "Welke stijl kies ik bij een blessure of tijdens de zwangerschap?",
      answer:
        "Bespreek dit vooraf met de docent en kies een les waarin aanpassingen mogelijk zijn. Een rustiger tempo kan prettig zijn, maar niet iedere houding is voor iedere klacht of zwangerschap geschikt. Vraag bij twijfel advies aan een bevoegde zorgverlener.",
    },
  ],
  sources: [
    {
      title: "Yoga Alliance — What is Yoga? — toelichting op onder meer Flow Yoga/Vinyasa en de diversiteit van yogastijlen",
      url: "https://yogaalliance.org/about-yoga/what-is-yoga/",
    },
    {
      title: "National Center for Complementary and Integrative Health (NCCIH) — Yoga: Effectiveness and Safety",
      url: "https://www.nccih.nih.gov/health/yoga-effectiveness-and-safety",
    },
    {
      title: "Yoga Zeeburg — Hatha yoga: wat is het en voor wie is het geschikt?",
      url: "https://www.yogazeeburg.com/kennisbank/hatha-yoga-wat-is-het-en-voor-wie-is-het-geschikt",
    },
    {
      title: "Yoga Zeeburg — Vinyasa yoga: wat is het en voor wie is het geschikt?",
      url: "https://www.yogazeeburg.com/kennisbank/vinyasa-yoga-wat-is-het-en-voor-wie-is-het-geschikt",
    },
  ],
  template: { showTOC: true, showFAQ: true, showSources: true, showRelated: true },
  heroImage: HERO_IMAGE,
  heroCaption: "Twee verschillende lesritmes, met hetzelfde doel: bewegen met aandacht.",
  body: () => <HathaVinyasaBody />,
};

function HathaVinyasaBody() {
  const h2 = "mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl";
  const link = "font-medium text-primary underline underline-offset-4 hover:no-underline";
  const th = "py-3 pr-4 font-display font-medium text-foreground";
  const td = "py-3 pr-4 align-top";
  return (
    <>
      <p className="mt-4">{INTRO}</p>

      <h2 id="hatha-en-vinyasa-in-een-oogopslag" className={h2}>Hatha en vinyasa in één oogopslag</h2>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse text-left text-[15px]">
          <thead><tr className="border-b border-border"><th className={th}>Onderdeel</th><th className={th}>Hatha yoga</th><th className={th}>Vinyasa yoga</th></tr></thead>
          <tbody className="divide-y divide-border">
            <tr><td className={td}>Tempo</td><td className={td}>Rustiger, met duidelijke pauzes</td><td className={td}>Vloeiender en vaak sneller</td></tr>
            <tr><td className={td}>Houdingen</td><td className={td}>Meestal langer vasthouden</td><td className={td}>Houdingen in een reeks verbinden</td></tr>
            <tr><td className={td}>Ademhaling</td><td className={td}>Bewust bij iedere houding</td><td className={td}>Stuurt vaak de overgang tussen houdingen</td></tr>
            <tr><td className={td}>Nadruk</td><td className={td}>Techniek, uitlijning en lichaamsbewustzijn</td><td className={td}>Ritme, coördinatie en doorlopende beweging</td></tr>
            <tr><td className={td}>Fysieke belasting</td><td className={td}>Kan stevig zijn, maar geeft meer tijd om te voelen</td><td className={td}>Vaak actiever en conditioneel uitdagender</td></tr>
            <tr><td className={td}>Geschikt voor beginners</td><td className={td}>Vaak prettig door het overzichtelijke tempo</td><td className={td}>Zeker mogelijk bij een rustige beginnersles</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4">Deze verschillen zijn richtinggevend. De naam op het rooster vertelt niet alles. Een krachtige hatha-les kan fysiek zwaarder zijn dan een rustige vinyasa-les. Lees daarom altijd de lesbeschrijving en vraag bij twijfel welk niveau bij je past.</p>

      <h2 id="hoe-verloopt-een-hatha-yogales" className={h2}>Hoe verloopt een hatha-yogales?</h2>
      <p className="mt-4">Bij hatha yoga worden houdingen meestal afzonderlijk opgebouwd. Je stapt in een houding, krijgt aanwijzingen over bijvoorbeeld voeten, knieën, bekken of schouders en blijft er enkele ademhalingen. Daarna volgt vaak een korte overgang of rust voordat de volgende houding begint.</p>
      <p className="mt-4">Dat rustigere ritme geeft je tijd om signalen van je lichaam op te merken en een houding aan te passen. Het betekent niet dat hatha alleen ontspannend of licht is. Langer in een staande houding blijven kan juist behoorlijk intensief zijn. De ervaring is alleen minder gehaast en meestal voorspelbaarder.</p>
      <p className="mt-4">Wil je meer weten over de achtergrond en opbouw van deze stijl? Lees dan ook <Link to="/kennisbank/$slug" params={{ slug: "hatha-yoga-wat-is-het-en-voor-wie-is-het-geschikt" }} className={link}>Hatha yoga: wat is het en voor wie is het geschikt?</Link>.</p>

      <h2 id="hoe-verloopt-een-vinyasa-yogales" className={h2}>Hoe verloopt een vinyasa-yogales?</h2>
      <p className="mt-4">Vinyasa draait om het verbinden van beweging en adem. Een docent bouwt reeksen op waarin de ene houding logisch overgaat in de volgende. Zo kan een les beginnen met eenvoudige mobiliteit, doorgaan naar zonnegroeten en staande series en eindigen met rustigere houdingen en ontspanning.</p>
      <p className="mt-4">Doordat je blijft bewegen, vraagt vinyasa meer van je coördinatie en vaak ook van je conditie. Je hoeft de reeks niet vooraf te kennen: een goede docent bouwt deze stap voor stap op en geeft opties. Toch kan een volle of snelle flow in het begin veel informatie tegelijk zijn.</p>
      <p className="mt-4">Een uitgebreidere uitleg vind je in <Link to="/kennisbank/$slug" params={{ slug: "vinyasa-yoga-wat-is-het-en-voor-wie-is-het-geschikt" }} className={link}>Vinyasa yoga: wat is het en voor wie is het geschikt?</Link>.</p>
      <ArticleFigure image={INLINE_IMAGE} caption="Hatha en vinyasa kunnen allebei rustig of uitdagend worden opgebouwd." className="mt-10" />

      <h2 id="welke-stijl-is-intensiever" className={h2}>Welke stijl is intensiever?</h2>
      <p className="mt-4">Vinyasa voelt gemiddeld intensiever omdat de overgangen doorgaan en je hartslag daardoor eerder oploopt. Maar alleen het label bepaalt de belasting niet. Het tempo van de docent, de gekozen houdingen, de lengte van de les en hoeveel rustmomenten er zijn, tellen allemaal mee.</p>
      <p className="mt-4">Ook hatha kan kracht, balans en concentratie vragen. Een houding langer vasthouden maakt spieren soms op een andere manier moe dan een doorlopende flow. Kies daarom niet uitsluitend op basis van de vraag welke stijl ‘zwaarder’ is, maar op basis van het soort inspanning dat je prettig vindt.</p>

      <h2 id="welke-yoga-is-beter-voor-beginners" className={h2}>Welke yoga is beter voor beginners?</h2>
      <p className="mt-4">Voor veel beginners is hatha een toegankelijke eerste stap, omdat je meer tijd krijgt om aanwijzingen te verwerken. Dat helpt als houdingen, namen en ademtechnieken nog nieuw zijn. Maar een rustige vinyasa-beginnersles kan eveneens uitstekend passen wanneer je graag beweegt en niet te lang stil wilt blijven.</p>
      <p className="mt-4">Let vooral op deze drie dingen:</p>
      <ol className="mt-4 list-decimal space-y-2 pl-6"><li>Staat er expliciet dat de les voor beginners of alle niveaus geschikt is?</li><li>Geeft de docent opties en tijd om een houding aan te passen?</li><li>Past het tempo bij hoe fit, energiek en ervaren je op dit moment bent?</li></ol>
      <p className="mt-4">Begin rustig en forceer niets. Yoga geldt voor gezonde mensen doorgaans als veilig wanneer het passend en onder deskundige begeleiding wordt beoefend, maar blessures zijn mogelijk. Vertel de docent vooraf over klachten, zwangerschap of beperkingen en overleg bij medische twijfel met een bevoegde zorgverlener.</p>

      <h2 id="wanneer-kies-je-voor-hatha-yoga" className={h2}>Wanneer kies je voor hatha yoga?</h2>
      <p className="mt-4">Hatha past waarschijnlijk goed bij je wanneer je:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6"><li>houdingen zorgvuldig wilt leren;</li><li>graag tijd hebt om aanwijzingen te verwerken;</li><li>bewuster wilt voelen waar je spanning vasthoudt;</li><li>een duidelijke, overzichtelijke lesopbouw prettig vindt;</li><li>actief wilt oefenen zonder voortdurend door te bewegen.</li></ul>
      <p className="mt-4">Een hatha-les kan ook een fijne tegenhanger zijn van intensieve sport of een drukke dag. Je bent lichamelijk bezig, maar het tempo geeft vaak meer ruimte voor aandacht.</p>

      <h2 id="wanneer-kies-je-voor-vinyasa-yoga" className={h2}>Wanneer kies je voor vinyasa yoga?</h2>
      <p className="mt-4">Vinyasa past waarschijnlijk goed bij je wanneer je:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6"><li>energie krijgt van vloeiende beweging;</li><li>graag adem en beweging combineert;</li><li>een afwisselende les prettig vindt;</li><li>je coördinatie en conditie wilt aanspreken;</li><li>het leuk vindt dat reeksen per docent of les kunnen verschillen.</li></ul>
      <p className="mt-4">Vind je snel schakelen lastig? Kies dan eerst een rustige vinyasa-les of een les waarin basishoudingen worden uitgelegd. Ervaring groeit vooral door regelmatig te oefenen, niet door direct het hoogste tempo te kiezen.</p>

      <h2 id="je-hoeft-niet-definitief-te-kiezen" className={h2}>Je hoeft niet definitief te kiezen</h2>
      <p className="mt-4">Hatha en vinyasa sluiten elkaar niet uit. Veel yogabeoefenaars combineren ze: bijvoorbeeld hatha om techniek en lichaamsbewustzijn te verdiepen, en vinyasa voor ritme en dynamiek. De ene week kan een actieve les goed voelen, terwijl je op een andere dag juist behoefte hebt aan meer rust en aandacht.</p>
      <p className="mt-4">Bekijk daarom het actuele <Link to="/rooster" className={link}>lesrooster</Link> en de uitleg bij de verschillende <Link to="/lessen" className={link}>yogalessen</Link>. Met een proefperiode kun je ervaren wat het verschil voor jouw lichaam en hoofd betekent. Dat is betrouwbaarder dan alleen de naam van een stijl vergelijken.</p>

      <h2 id="hatha-of-vinyasa-proberen-bij-yoga-zeeburg" className={h2}>Hatha of vinyasa proberen bij Yoga Zeeburg</h2>
      <p className="mt-4">Twijfel je nog? Kies de les die nu het beste bij je energie en ervaring past en vertel de docent dat het je eerste keer is. Je hoeft niet lenig te zijn en je hoeft vooraf geen houdingen te kennen. Bekijk het <Link to="/rooster" className={link}>rooster</Link> of start met de <a href="https://trial.yogazeeburg.com/" className={link}>Yoga Zeeburg-proefperiode</a> om beide stijlen in de praktijk te vergelijken.</p>
    </>
  );
}