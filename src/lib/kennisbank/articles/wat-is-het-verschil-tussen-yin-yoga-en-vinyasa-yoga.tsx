// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: wat-is-het-verschil-tussen-yin-yoga-en-vinyasa-yoga

import { Link } from "@tanstack/react-router";
import { Flower2 } from "lucide-react";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import heroAsset from "@/assets/yin-vinyasa-verschil-yoga-zeeburg-hero.webp.asset.json";
import inlineAsset from "@/assets/yin-vinyasa-verschil-lesritme.webp.asset.json";
import type { Article } from "../article-types";

const HERO_IMAGE: ArticleImageRef = {
  url: heroAsset.url,
  alt: "Twee yogamatten met een rustige yin-opstelling en een open vinyasa-opstelling",
  width: 1536,
  height: 1024,
};

const INLINE_IMAGE: ArticleImageRef = {
  url: inlineAsset.url,
  alt: "Een rustige yin-opstelling en een open vinyasa-mat met een golvende yogariem",
  width: 1536,
  height: 1024,
};

const INTRO =
  "Het belangrijkste verschil tussen yin yoga en vinyasa yoga is de manier waarop je beweegt en hoe lang je in een houding blijft. Bij yin yoga zit of lig je meestal in een houding die je enkele minuten aanhoudt, met zo min mogelijk onnodige spierspanning. Vinyasa bestaat juist uit vloeiende reeksen waarin je houdingen op het ritme van de adem met elkaar verbindt. Yin voelt daardoor doorgaans stiller en rustiger; vinyasa meestal actiever, warmer en conditioneel uitdagender. Welke stijl beter past, hangt vooral af van wat je lichaam en hoofd die dag nodig hebben.";

export const article: Article = {
  slug: "wat-is-het-verschil-tussen-yin-yoga-en-vinyasa-yoga",
  title: "Wat is het verschil tussen yin yoga en vinyasa yoga?",
  h1: "Wat is het verschil tussen yin yoga en vinyasa yoga?",
  seoTitle: "Yin yoga of vinyasa yoga: wat is het verschil?",
  ogTitle: "Wat is het verschil tussen yin yoga en vinyasa yoga?",
  description:
    "Yin of vinyasa yoga? Vergelijk tempo, houdingen, inspanning en sfeer en ontdek welke yogastijl op dit moment beter bij jou past.",
  ogDescription:
    "Een heldere vergelijking van twee bijna tegenovergestelde yogastijlen: verstillen in Yin of vloeiend bewegen in Vinyasa.",
  intro: INTRO,
  category: { slug: "yogastijlen", title: "Yogastijlen", icon: Flower2 },
  type: "comparison",
  pillar: false,
  publishedAt: "2026-10-09",
  updatedAt: "2026-10-09",
  readingTimeMin: 7,
  cta: {
    label: "Start je 14 dagen onbeperkt",
    subtext: "Voor nieuwe studenten. Stopt automatisch.",
  },
  toc: [
    { id: "yin-en-vinyasa-in-een-oogopslag", label: "Yin en vinyasa in één oogopslag" },
    { id: "hoe-verloopt-een-yin-yogales", label: "Hoe verloopt een yin-yogales?" },
    { id: "hoe-verloopt-een-vinyasa-yogales", label: "Hoe verloopt een vinyasa-yogales?" },
    { id: "welke-stijl-is-fysiek-zwaarder", label: "Welke stijl is fysiek zwaarder?" },
    { id: "welke-yoga-helpt-beter-om-te-ontspannen", label: "Welke yoga helpt beter om te ontspannen?" },
    { id: "welke-stijl-past-bij-beginners", label: "Welke stijl past bij beginners?" },
    { id: "wanneer-kies-je-voor-yin-yoga", label: "Wanneer kies je voor yin yoga?" },
    { id: "wanneer-kies-je-voor-vinyasa-yoga", label: "Wanneer kies je voor vinyasa yoga?" },
    { id: "je-kunt-yin-en-vinyasa-prima-combineren", label: "Je kunt yin en vinyasa prima combineren" },
    { id: "yin-of-vinyasa-proberen-bij-yoga-zeeburg", label: "Yin of vinyasa proberen bij Yoga Zeeburg" },
    { id: "faq", label: "Veelgestelde vragen" },
  ],
  faqs: [
    {
      question: "Is yin yoga makkelijker dan vinyasa yoga?",
      answer:
        "Niet per definitie. Yin is rustiger en vraagt minder conditie, maar het langdurig aanhouden van een houding kan intens zijn. Vinyasa vraagt doorgaans meer actieve kracht, coördinatie en uithoudingsvermogen.",
    },
    {
      question: "Is yin yoga hetzelfde als restorative yoga?",
      answer:
        "Nee. Beide stijlen zijn rustig en gebruiken vaak hulpmiddelen, maar restorative yoga ondersteunt het lichaam meestal volledig met het doel zo comfortabel mogelijk te rusten. Bij yin zoek je doorgaans een milde tot duidelijke sensatie die je enige tijd observeert zonder te forceren.",
    },
    {
      question: "Kan ik yin en vinyasa in dezelfde week doen?",
      answer:
        "Ja. Veel mensen combineren ze juist: vinyasa voor actieve beweging en yin voor een rustiger tempo. Hoe vaak je elke stijl kiest, hangt af van je belastbaarheid, herstel en voorkeur.",
    },
    {
      question: "Is vinyasa geschikt als ik niet lenig ben?",
      answer:
        "Ja. Lenigheid is geen voorwaarde om te beginnen. Kies een beginnersvriendelijke les, gebruik hulpmiddelen en neem een eenvoudiger variant wanneer een overgang of houding niet goed voelt.",
    },
    {
      question: "Welke stijl kies ik bij pijn of een blessure?",
      answer:
        "Kies niet alleen op basis van het label yin of vinyasa. Bespreek je klacht vooraf met de docent, vermijd pijn en vraag zo nodig advies aan een bevoegde zorgverlener. Ook een rustige yin-houding kan ongeschikt zijn voor een specifieke blessure.",
    },
  ],
  sources: [
    {
      title: "YinYoga.com — What is Yin Yoga? — uitgangspunten rond tijd, intensiteit en het aanpassen van houdingen",
      url: "https://yinyoga.com/what-is-yin-yoga/",
    },
    {
      title: "Yoga Alliance — What is Yoga? — toelichting op Flow Yoga, ook vinyasa genoemd",
      url: "https://yogaalliance.org/about-yoga/what-is-yoga/",
    },
    {
      title: "National Center for Complementary and Integrative Health (NCCIH) — Yoga: Effectiveness and Safety",
      url: "https://www.nccih.nih.gov/health/yoga-effectiveness-and-safety",
    },
    { title: "Yoga Zeeburg — Onze lessen", url: "https://www.yogazeeburg.com/lessen" },
    { title: "Yoga Zeeburg — Wekelijks rooster", url: "https://www.yogazeeburg.com/rooster" },
  ],
  template: { showTOC: true, showFAQ: true, showSources: true, showRelated: true },
  heroImage: HERO_IMAGE,
  heroCaption: "Twee verschillende ritmes: lang verstillen in Yin of vloeiend bewegen in Vinyasa.",
  body: () => <YinVinyasaBody />,
};

function YinVinyasaBody() {
  const h2 = "mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl";
  const link = "font-medium text-primary underline underline-offset-4 hover:no-underline";
  const th = "py-3 pr-4 font-display font-medium text-foreground";
  const td = "py-3 pr-4 align-top";
  return (
    <>
      <p className="mt-4">{INTRO}</p>

      <h2 id="yin-en-vinyasa-in-een-oogopslag" className={h2}>Yin en vinyasa in één oogopslag</h2>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse text-left text-[15px]">
          <thead><tr className="border-b border-border"><th className={th}>Onderdeel</th><th className={th}>Yin yoga</th><th className={th}>Vinyasa yoga</th></tr></thead>
          <tbody className="divide-y divide-border">
            <tr><td className={td}>Tempo</td><td className={td}>Zeer rustig, met veel stilte</td><td className={td}>Vloeiend en meestal actiever</td></tr>
            <tr><td className={td}>Houdingen</td><td className={td}>Vooral zittend of liggend</td><td className={td}>Veel afwisseling, vaak ook staand</td></tr>
            <tr><td className={td}>Tijd per houding</td><td className={td}>Meestal enkele minuten</td><td className={td}>Vaak één tot enkele ademhalingen</td></tr>
            <tr><td className={td}>Spiergebruik</td><td className={td}>Waar mogelijk ontspannen</td><td className={td}>Actief ondersteunen, dragen en stabiliseren</td></tr>
            <tr><td className={td}>Ademhaling</td><td className={td}>Helpt je aandacht en ontspanning te verdiepen</td><td className={td}>Stuurt vaak het ritme van de beweging</td></tr>
            <tr><td className={td}>Ervaring</td><td className={td}>Verstilling, rek en geduld</td><td className={td}>Flow, warmte, coördinatie en energie</td></tr>
            <tr><td className={td}>Voor beginners</td><td className={td}>Vaak toegankelijk, maar lang stilzitten kan intens zijn</td><td className={td}>Goed mogelijk bij een rustige beginnersles</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4">Dit zijn algemene kenmerken, geen vaste garanties. Een stevige yin-houding kan behoorlijk intens voelen en een rustige vinyasa-les hoeft niet snel of zwaar te zijn. De docent, lesopbouw en gekozen variaties bepalen uiteindelijk hoe een les aanvoelt.</p>

      <h2 id="hoe-verloopt-een-yin-yogales" className={h2}>Hoe verloopt een yin-yogales?</h2>
      <p className="mt-4">Een yin-les begint meestal rustig. Na een korte landing of ademhaling ga je naar een beperkt aantal houdingen, vaak op de mat en dicht bij de vloer. Je gebruikt bijvoorbeeld blokken, een bolster of een deken om een houding passend te maken. Vervolgens blijf je enkele minuten in dezelfde positie en merk je op wat er verandert.</p>
      <p className="mt-4">Het doel is niet om zo diep mogelijk te rekken. Je zoekt een duidelijke maar hanteerbare sensatie en past de houding aan wanneer die scherp, pijnlijk of onrustig wordt. Tussen houdingen zit vaak een kort neutraal moment om na te voelen. Omdat er weinig afleiding door beweging is, kan yin mentaal net zo uitdagend zijn als fysiek: stil blijven vraagt aandacht en geduld.</p>
      <p className="mt-4">Bij Yoga Zeeburg vind je onder meer lessen als Stress Release (Yin style), Relax Yin &amp; Nidra en Deep Stretch Yin &amp; Breathwork. Bekijk de actuele beschrijvingen op de pagina met <Link to="/lessen" className={link}>alle yogalessen</Link>.</p>

      <h2 id="hoe-verloopt-een-vinyasa-yogales" className={h2}>Hoe verloopt een vinyasa-yogales?</h2>
      <p className="mt-4">Vinyasa verbindt adem en beweging. De docent bouwt een reeks op waarin je van de ene houding naar de volgende beweegt. Een les kan rustig beginnen met mobiliteit, doorgaan naar zonnegroeten en staande series en eindigen met langzamere houdingen en ontspanning.</p>
      <p className="mt-4">Doordat de beweging doorgaat, vraagt vinyasa vaak meer van je conditie, kracht en coördinatie. Je hoeft een reeks niet vooraf te kennen: een goede docent bouwt stap voor stap op en geeft opties. Wel kan een snelle flow in het begin veel informatie tegelijk zijn. Kies als beginner daarom bij voorkeur een les die als beginnersvriendelijk of geschikt voor alle niveaus staat beschreven.</p>
      <p className="mt-4">Lees voor meer achtergrond ook <Link to="/kennisbank/$slug" params={{ slug: "vinyasa-yoga-wat-is-het-en-voor-wie-is-het-geschikt" }} className={link}>Vinyasa yoga: wat is het en voor wie is het geschikt?</Link>.</p>
      <ArticleFigure image={INLINE_IMAGE} caption="Yin geeft tijd om te verstillen; vinyasa laat adem en beweging doorstromen." className="mt-10" />

      <h2 id="welke-stijl-is-fysiek-zwaarder" className={h2}>Welke stijl is fysiek zwaarder?</h2>
      <p className="mt-4">Vinyasa voelt gemiddeld zwaarder voor je conditie, omdat je vaker blijft bewegen en regelmatig je eigen lichaamsgewicht draagt. Yin veroorzaakt meestal minder warmte en vraagt minder cardiovasculaire inspanning. Toch betekent rustig niet automatisch makkelijk. Een houding enkele minuten aanhouden kan een stevige sensatie geven en vraagt dat je zorgvuldig doseert.</p>
      <p className="mt-4">Vergelijk de stijlen daarom niet alleen op ‘zwaar’ of ‘licht’. Vinyasa vraagt vooral actieve kracht, stabiliteit en ritme. Yin vraagt vooral geduld, lichaamsbewustzijn en het vermogen om niet steeds verder te willen. Beide kunnen uitdagend zijn, alleen op een andere manier.</p>

      <h2 id="welke-yoga-helpt-beter-om-te-ontspannen" className={h2}>Welke yoga helpt beter om te ontspannen?</h2>
      <p className="mt-4">Als je behoefte hebt aan stilte en minder prikkels, ligt yin vaak het meest voor de hand. Het lage tempo geeft ruimte om je adem, gedachten en lichamelijke sensaties op te merken. Maar sommige mensen ontspannen juist beter door eerst actief te bewegen. Voor hen kan een vinyasa-les helpen om uit het hoofd te komen, waarna de eindontspanning rustiger voelt.</p>
      <p className="mt-4">Kies dus niet alleen op basis van de naam van de stijl. Vraag jezelf af: heb ik vandaag behoefte aan vertragen, of helpt bewegen mij juist om spanning kwijt te raken? Dat antwoord kan per dag verschillen.</p>

      <h2 id="welke-stijl-past-bij-beginners" className={h2}>Welke stijl past bij beginners?</h2>
      <p className="mt-4">Beide stijlen kunnen geschikt zijn voor beginners. Yin geeft je veel tijd om een houding te onderzoeken en hulpmiddelen te gebruiken. Daar staat tegenover dat je langer met één sensatie en met stilte blijft. Vinyasa biedt meer afwisseling, maar het tempo en de overgangen kunnen in het begin lastiger te volgen zijn.</p>
      <p className="mt-4">Let bij je keuze vooral op:</p>
      <ol className="mt-4 list-decimal space-y-2 pl-6"><li>het aangegeven niveau van de les;</li><li>of de docent variaties en hulpmiddelen aanbiedt;</li><li>hoeveel energie je die dag hebt;</li><li>of je liever vertraagt of juist door beweegt.</li></ol>
      <p className="mt-4">Yoga is voor gezonde mensen doorgaans veilig wanneer de les past bij het eigen niveau, maar blessures zijn mogelijk. Forceer geen houding. Vertel de docent vooraf over pijn, een blessure, zwangerschap of andere relevante beperkingen en overleg bij medische twijfel met een bevoegde zorgverlener.</p>

      <h2 id="wanneer-kies-je-voor-yin-yoga" className={h2}>Wanneer kies je voor yin yoga?</h2>
      <p className="mt-4">Yin past waarschijnlijk goed bij je wanneer je:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6"><li>bewust wilt vertragen en weinig prikkels zoekt;</li><li>graag langer de tijd neemt om een houding te voelen;</li><li>een rustige aanvulling wilt op hardlopen, krachttraining of een actieve werkweek;</li><li>comfortabel bent met stilte of die juist wilt leren verdragen;</li><li>de les graag met veel hulpmiddelen aan je lichaam aanpast.</li></ul>

      <h2 id="wanneer-kies-je-voor-vinyasa-yoga" className={h2}>Wanneer kies je voor vinyasa yoga?</h2>
      <p className="mt-4">Vinyasa past waarschijnlijk goed bij je wanneer je:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6"><li>energie krijgt van vloeiende beweging;</li><li>adem en beweging wilt leren verbinden;</li><li>graag kracht, balans en coördinatie combineert;</li><li>afwisseling prettig vindt;</li><li>liever beweegt dan lang in dezelfde houding blijft.</li></ul>

      <h2 id="je-kunt-yin-en-vinyasa-prima-combineren" className={h2}>Je kunt yin en vinyasa prima combineren</h2>
      <p className="mt-4">Je hoeft niet één stijl te kiezen. Yin en vinyasa vullen elkaar juist goed aan. Een actieve vinyasa-les kan op een energieke dag passen, terwijl yin op een drukke of vermoeide dag meer ruimte geeft om te vertragen. Er bestaan ook combinatielessen waarin een actiever eerste deel overgaat in langer aangehouden yin-houdingen.</p>
      <p className="mt-4">Bekijk het actuele <Link to="/rooster" className={link}>lesrooster</Link> en lees de lesbeschrijvingen voordat je boekt. Wil je ook het verschil met een rustiger actieve yogastijl begrijpen? Lees dan <Link to="/kennisbank/$slug" params={{ slug: "wat-is-het-verschil-tussen-hatha-yoga-en-vinyasa-yoga" }} className={link}>Hatha of vinyasa yoga: wat is het verschil?</Link>.</p>

      <h2 id="yin-of-vinyasa-proberen-bij-yoga-zeeburg" className={h2}>Yin of vinyasa proberen bij Yoga Zeeburg</h2>
      <p className="mt-4">De duidelijkste manier om te kiezen is beide stijlen te ervaren. Met de 14-daagse proefperiode kun je verschillende lessen en docenten proberen zonder vooraf een definitieve keuze te maken. Bekijk het <Link to="/rooster" className={link}>rooster</Link> of start met <a href="https://trial.yogazeeburg.com/" className={link}>14 dagen onbeperkt yoga</a>.</p>
    </>
  );
}
