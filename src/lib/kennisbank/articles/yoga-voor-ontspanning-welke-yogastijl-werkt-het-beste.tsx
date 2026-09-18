// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: yoga-voor-ontspanning-welke-yogastijl-werkt-het-beste

import { Link } from "@tanstack/react-router";
import { Moon } from "lucide-react";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import ontspanningHeroAsset from "@/assets/yoga-voor-ontspanning-hero.webp.asset.json";
import ontspanningInlineAsset from "@/assets/yogastijlen-voor-ontspanning.webp.asset.json";
import type { Article } from "../article-types";

const ONTSPANNING_HERO_IMAGE: ArticleImageRef = {
  url: ontspanningHeroAsset.url,
  alt: "Lege yogamat met bolster en dekens in een stille ruimte met zacht avondlicht.",
  width: 1536,
  height: 1024,
};

const ONTSPANNING_INLINE_IMAGE: ArticleImageRef = {
  url: ontspanningInlineAsset.url,
  alt: "Vier rustige oefenplekken met matten, bolsters, dekens en blokken voor verschillende vormen van ontspannende yoga.",
  width: 1536,
  height: 1024,
};

export const article: Article = {
  slug: "yoga-voor-ontspanning-welke-yogastijl-werkt-het-beste",
  title: "Yoga voor ontspanning: welke yogastijl werkt het beste?",
  h1: "Yoga voor ontspanning: welke yogastijl werkt het beste?",
  seoTitle: "Yoga voor ontspanning: welke stijl past? | Yoga Zeeburg",
  description:
    "Zoek je yoga voor ontspanning? Vergelijk restorative, Yoga Nidra, Yin en Slow Flow en kies de yogastijl die past bij de rust die jij nodig hebt.",
  intro:
    "Voor diepe fysieke rust past restorative yoga vaak het best. Yoga Nidra is sterk als je vooral liggend en begeleid wilt ontspannen. Yin helpt je vertragen in langer aangehouden houdingen, terwijl Slow Flow prettig kan zijn wanneer stilzitten je juist onrustig maakt. De beste ontspannende yogastijl hangt dus af van de rust die jij nodig hebt.",
  category: { slug: "stress-ontspanning-slaap", title: "Stress, ontspanning en slaap", icon: Moon },
  type: "guide",
  pillar: true,
  publishedAt: "2026-09-18",
  updatedAt: "2026-09-18",
  readingTimeMin: 10,
  cta: {
    label: "Ontdek jouw ontspannende les",
    subtext: "14 dagen onbeperkt proberen · alleen voor nieuwe leerlingen · stopt automatisch",
  },
  toc: [
    { id: "ontspanning-verschilt", label: "Ontspanning is niet voor iedereen hetzelfde" },
    { id: "vier-stijlen-vergeleken", label: "Vier yogastijlen voor ontspanning vergeleken" },
    { id: "welke-rust", label: "Welke vorm van rust heb je nodig?" },
    { id: "docent-en-lesopbouw", label: "De docent en lesopbouw zijn minstens zo belangrijk" },
    { id: "rustig-niet-gemakkelijk", label: "Rustig betekent niet automatisch gemakkelijk" },
    { id: "praktische-voorbereiding", label: "Praktische voorbereiding voor een ontspannende les" },
    { id: "yoga-zeeburg", label: "Ontspannende yoga bij Yoga Zeeburg" },
    { id: "conclusie", label: "Conclusie" },
    { id: "faq", label: "Veelgestelde vragen" },
  ],
  faqs: [
    {
      question: "Welke yogastijl is het meest ontspannend?",
      answer:
        "Restorative yoga is doorgaans het meest gericht op comfortabele ondersteuning en minimale inspanning. Yoga Nidra kan net zo ontspannend voelen wanneer je liever liggend door een stem wordt begeleid. Wat het beste werkt, hangt af van de hoeveelheid beweging en structuur die jij prettig vindt.",
    },
    {
      question: "Wat is rustiger: Yin yoga of restorative yoga?",
      answer:
        "Restorative is meestal zachter en passiever, omdat props het lichaam volledig ondersteunen. In Yin blijf je ook langer in houdingen, maar kan de rek duidelijker en soms intens zijn. Kies restorative voor uitrusten en Yin wanneer je rustig wilt rekken en vertragen.",
    },
    {
      question: "Is Yoga Nidra hetzelfde als slapen?",
      answer:
        "Nee. Yoga Nidra wordt vaak omschreven als yogische slaap, maar het is een begeleide ontspannings- en aandachtsoefening die je meestal liggend beoefent. Je kunt indommelen, maar dat is niet het vereiste doel van de oefening.",
    },
    {
      question: "Kan een actieve yogales ook ontspannend zijn?",
      answer:
        "Ja. Als stilzitten je onrustig maakt, kan rustige beweging je aandacht eerst naar het lichaam brengen. Een Slow Flow of toegankelijke Vinyasa kan dan ontspannender voelen dan direct lang stilliggen. Kies een tempo dat je zonder haast kunt volgen.",
    },
    {
      question: "Hoe weet ik na één les of een stijl bij mij past?",
      answer:
        "Let op meer dan intensiteit. Kon je de instructies volgen, voelde je vrijheid om aan te passen, werd je adem rustiger en voelde je je later nog prettig? Probeer een kansrijke stijl bij voorkeur een tweede keer, omdat docent, dagvorm en lesopbouw veel invloed hebben.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg — Lessen, geraadpleegd 18 september 2026",
      url: "https://www.yogazeeburg.com/lessen",
    },
    {
      title: "Yoga Zeeburg — Rooster, geraadpleegd 18 september 2026",
      url: "https://www.yogazeeburg.com/rooster",
    },
    {
      title: "Yoga Zeeburg — Prijzen, geraadpleegd 18 september 2026",
      url: "https://www.yogazeeburg.com/prijzen",
    },
    {
      title:
        "National Center for Complementary and Integrative Health — Relaxation Techniques: What You Need To Know, geraadpleegd 18 september 2026",
      url: "https://www.nccih.nih.gov/health/relaxation-techniques-what-you-need-to-know",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  heroImage: ONTSPANNING_HERO_IMAGE,
  body: () => <OntspanningBody />,
};

function OntspanningBody() {
  const h2 = "mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl";
  const h3 = "mt-10 font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl";
  const link = "font-medium text-primary underline underline-offset-4 hover:no-underline";
  return (
    <>
      <p>
        Voor ontspanning is er niet één yogastijl die voor iedereen het beste werkt. Zoek je zo
        weinig mogelijk inspanning en veel ondersteuning, dan past restorative yoga vaak het best.
        Wil je liggend tot rust komen met een stem die je aandacht begeleidt, kies dan Yoga Nidra.
        Yin yoga past als je langzaam wilt vertragen in langer aangehouden houdingen. Word je juist
        onrustig van stil liggen, dan kan Slow Flow beter werken: rustige beweging helpt je
        aandacht uit je hoofd en naar je lichaam te brengen. Kijk daarom niet alleen naar de
        stijlnaam, maar naar wat jij vandaag nodig hebt: bewegen, loslaten, stilte of diepe rust.
      </p>

      <h2 id="ontspanning-verschilt" className={h2}>
        Ontspanning is niet voor iedereen hetzelfde
      </h2>
      <p className="mt-4">
        De één ontspant zodra het lichaam volledig wordt ondersteund. De ander blijft dan juist
        malen en heeft eerst beweging nodig. Ook hetzelfde mens kan per dag iets anders nodig
        hebben. Na uren achter een scherm kan een zachte flow fijn zijn; na een volle week kan
        langer liggen prettiger voelen.
      </p>
      <p className="mt-4">
        Maak de vraag daarom concreter dan “welke yoga is ontspannend?” Vraag jezelf af:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>wil ik rustig bewegen of bijna niet bewegen;</li>
        <li>wil ik zelf naar binnen keren of liever begeleid worden;</li>
        <li>voelt langer in één houding blijven prettig of juist onrustig;</li>
        <li>zoek ik vooral lichamelijke zachtheid, mentale vertraging of diepe rust;</li>
        <li>hoeveel energie heb ik op dit moment?</li>
      </ul>
      <p className="mt-4">
        Een stijl werkt pas ontspannend als tempo, houding en begeleiding bij jouw toestand passen.
        Een heel stille les is dus niet automatisch de rustigste keuze voor jou.
      </p>

      <h2 id="vier-stijlen-vergeleken" className={h2}>
        Vier yogastijlen voor ontspanning vergeleken
      </h2>

      <h3 id="restorative" className={h3}>
        1. Restorative yoga: maximale ondersteuning en weinig inspanning
      </h3>
      <p className="mt-4">
        Restorative yoga gebruikt bolsters, dekens en blokken om het lichaam comfortabel te dragen.
        Je blijft relatief lang in een klein aantal houdingen en hoeft weinig spierkracht te
        gebruiken. De vorm is bedoeld om de voorwaarden voor rust te creëren, niet om je
        flexibiliteit te testen.
      </p>
      <p className="mt-4">
        Restorative past goed wanneer je moe bent, veel prikkels hebt gehad of zonder fysieke
        uitdaging wilt vertragen. De stilte kan in het begin onwennig zijn. Dat betekent niet dat
        je het verkeerd doet; ontspannen is geen prestatie die je moet afdwingen.
      </p>
      <p className="mt-4">
        Let bij een les op voldoende ondersteuning, tijd om een houding zorgvuldig in te richten en
        vrijheid om iets aan te passen. Bij Yoga Zeeburg combineert Restorative &amp; Reiki &amp;
        Aroma ondersteunde restorative houdingen met geur en optioneel Reiki. Fysiek contact is
        daarbij altijd optioneel: je kunt aangeven dat je niet wilt worden aangeraakt.
      </p>

      <h3 id="yoga-nidra" className={h3}>
        2. Yoga Nidra: begeleid liggend ontspannen
      </h3>
      <p className="mt-4">
        Yoga Nidra wordt meestal liggend beoefend. Je hoeft geen reeks houdingen te onthouden: een
        docent begeleidt je aandacht stap voor stap. Dat kan prettig zijn wanneer je lichaam weinig
        beweging wil, maar je hoofd wel een duidelijke focus nodig heeft.
      </p>
      <p className="mt-4">
        Yoga Nidra is geen gewone yogales met veel fysieke houdingen en ook geen garantie dat je in
        slaap valt. Het is een begeleide oefening in rust en aandacht. Zorg dat je comfortabel en
        warm ligt; een deken, bolster of kussen kan het verschil maken.
      </p>
      <p className="mt-4">
        Bij Yoga Zeeburg eindigt Relax Yin &amp; Nidra met ongeveer dertig minuten Yoga Nidra na
        een rustig Yin-gedeelte. Daarmee combineert de les eerst lichamelijk vertragen met daarna
        begeleid stilliggen.
      </p>

      <h3 id="yin" className={h3}>
        3. Yin yoga: langzaam vertragen in langer aangehouden houdingen
      </h3>
      <p className="mt-4">
        Bij Yin yoga blijf je enkele minuten in voornamelijk zittende of liggende houdingen. Props
        helpen je de positie aan te passen. Het lage tempo geeft tijd om sensaties op te merken en
        minder te reageren op iedere impuls om meteen te bewegen.
      </p>
      <p className="mt-4">
        Yin past wanneer je rustig wilt rekken, stilte verdraagt en het prettig vindt om tijd te
        hebben in een houding. Weinig beweging betekent niet dat de les altijd zacht voelt. Een
        lange houding kan intens zijn. Ontspanning ontstaat niet door steeds dieper te gaan: kies
        een positie waarin je adem rustig kan blijven en kom eerder terug wanneer iets scherp,
        pijnlijk of niet goed voelt.
      </p>
      <p className="mt-4">
        Binnen het actuele aanbod van Yoga Zeeburg leggen Stress Release (Yin style), Deep Stretch
        Yin &amp; Breathwork en Relax Yin &amp; Nidra elk een ander accent. De eerste verweeft Yin,
        adem en stilte; de tweede combineert ademwerk, langere stretches en een uitgebreide
        eindontspanning; de derde bouwt door naar Yoga Nidra.
      </p>

      <h3 id="slow-flow" className={h3}>
        4. Slow Flow: ontspannen door rustige beweging
      </h3>
      <p className="mt-4">
        Slow Flow verbindt houdingen in een kalm tempo. Je beweegt meer dan bij Yin of restorative,
        maar krijgt tijd om adem en beweging te volgen. Deze stijl kan juist ontspannend zijn als
        volledig stil liggen je aandacht alle kanten op stuurt.
      </p>
      <p className="mt-4">
        Kies een Slow Flow wanneer je spanning wilt afbouwen door eerst te bewegen, zonder het
        tempo of de fysieke belasting van een stevige Vinyasa. Controleer wel altijd de
        beschrijving: slow zegt iets over snelheid, niet automatisch over niveau.
      </p>
      <p className="mt-4">
        Bij Yoga Zeeburg begint Slow Flow &amp; Soundbath met aandachtige, ongehaaste beweging en
        eindigt de les liggend met een soundbath. Zo verschuift de aandacht geleidelijk van bewegen
        naar stiller worden.
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse text-left text-[15px]">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 pr-4 font-display font-medium text-foreground">
                Als je vooral zoekt naar…
              </th>
              <th className="py-3 pr-4 font-display font-medium text-foreground">
                Waarschijnlijke beste start
              </th>
              <th className="py-3 font-display font-medium text-foreground">
                Wat je kunt verwachten
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="py-3 pr-4 align-top font-medium text-foreground">
                Volledig ondersteunde fysieke rust
              </td>
              <td className="py-3 pr-4 align-top">Restorative</td>
              <td className="py-3 align-top">Weinig houdingen, veel props, minimale inspanning</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 align-top font-medium text-foreground">
                Liggend begeleid ontspannen
              </td>
              <td className="py-3 pr-4 align-top">Yoga Nidra</td>
              <td className="py-3 align-top">
                Een stem begeleidt je aandacht terwijl je comfortabel ligt
              </td>
            </tr>
            <tr>
              <td className="py-3 pr-4 align-top font-medium text-foreground">
                Langzaam rekken en vertragen
              </td>
              <td className="py-3 pr-4 align-top">Yin</td>
              <td className="py-3 align-top">Langer aangehouden zittende en liggende houdingen</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 align-top font-medium text-foreground">Rust via beweging</td>
              <td className="py-3 pr-4 align-top">Slow Flow</td>
              <td className="py-3 align-top">
                Zachte overgangen, adem en een geleidelijke afbouw
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ArticleFigure
        image={ONTSPANNING_INLINE_IMAGE}
        caption="De beste stijl hangt af van de rust die je zoekt: bewegen, langer blijven, volledig ondersteund liggen of begeleid ontspannen."
        className="mt-10"
      />

      <h2 id="welke-rust" className={h2}>
        Welke vorm van rust heb je nodig?
      </h2>

      <h3 className={h3}>Je hoofd blijft doorgaan</h3>
      <p className="mt-4">
        Als stilte direct veel gedachten naar voren brengt, kan een duidelijke begeleide vorm
        helpen. Yoga Nidra geeft je aandacht een route. Slow Flow kan eveneens passen doordat adem
        en beweging samen een concreet aandachtspunt vormen. Kies niet automatisch de stilste les;
        kies de structuur die jou helpt aanwezig te blijven.
      </p>

      <h3 className={h3}>Je lichaam voelt stijf of zwaar</h3>
      <p className="mt-4">
        Wil je rustig bewegen en ruimte ervaren, dan kan Yin of een zachte Slow Flow prettig zijn.
        Kies Yin als langer blijven je aanspreekt en Slow Flow als je liever doorbeweegt. Forceer
        geen rek om een gevoel van ontspanning te verdienen.
      </p>

      <h3 className={h3}>Je bent moe en wilt niets hoeven presteren</h3>
      <p className="mt-4">
        Restorative of Yoga Nidra ligt dan het meest voor de hand. Beide vragen weinig actieve
        inspanning. Restorative legt de nadruk op ondersteunde posities; Yoga Nidra op begeleide
        aandacht. Neem warme kleding mee en maak het lichaam comfortabel.
      </p>

      <h3 className={h3}>Je hebt juist bewegingsdrang</h3>
      <p className="mt-4">
        Sommige mensen komen pas tot rust nadat ze eerst bewogen hebben. Een toegankelijke Slow
        Flow, rustige Vinyasa of combinatie van actief en zacht kan dan beter passen dan direct
        stilliggen. Ook Yin Yang Yoga en Strength &amp; Stretch Yoga bouwen van beweging naar een
        rustiger tweede deel.
      </p>

      <h3 className={h3}>Je weet het niet</h3>
      <p className="mt-4">
        Kies dan niet op theorie alleen. Probeer twee contrasterende lessen: bijvoorbeeld
        restorative of Yin naast Slow Flow. Noteer na afloop niet alleen hoe zwaar de les was, maar
        ook:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>kon ik mijn aandacht bij de les houden;</li>
        <li>werd mijn adem vanzelf rustiger;</li>
        <li>voelde ik minder noodzaak om door te gaan of iets te bereiken;</li>
        <li>voelde ik me een uur later nog prettig;</li>
        <li>wil ik deze vorm op een vergelijkbare dag opnieuw doen?</li>
      </ul>

      <h2 id="docent-en-lesopbouw" className={h2}>
        De docent en lesopbouw zijn minstens zo belangrijk
      </h2>
      <p className="mt-4">
        Stijlnamen zijn geen beschermde formules. Twee Yinlessen kunnen verschillen in tempo, taal,
        muziek, intensiteit en hoeveelheid stilte. Een restorative les kan zakelijk en eenvoudig
        worden gegeven of juist extra elementen zoals aroma en Reiki bevatten. Lees daarom de
        volledige lesbeschrijving.
      </p>
      <p className="mt-4">Een ontspannende les geeft ruimte om:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>een houding aan te passen;</li>
        <li>een prop extra te gebruiken;</li>
        <li>eerder uit een houding te komen;</li>
        <li>fysieke aanraking te weigeren;</li>
        <li>te rusten zonder uitleg;</li>
        <li>niet hetzelfde te doen als de rest.</li>
      </ul>
      <p className="mt-4">
        Ontspanning ontstaat eerder wanneer je je veilig en vrij voelt dan wanneer je probeert de
        les perfect uit te voeren. Wil je breder vergelijken dan alleen rustige stijlen? Gebruik
        dan de gids{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "welke-yogastijl-past-bij-mij" }}
          className={link}
        >
          welke yogastijl past bij mij
        </Link>
        .
      </p>

      <h2 id="rustig-niet-gemakkelijk" className={h2}>
        Rustig betekent niet automatisch gemakkelijk
      </h2>
      <p className="mt-4">
        Een laag tempo kan lichamelijk én mentaal uitdagend zijn. In Yin kan een houding lang
        aanvoelen. In restorative kan niets hoeven doen verrassend lastig zijn. Tijdens Yoga Nidra
        kun je afdwalen of indommelen. Bij Slow Flow vraagt het juist aandacht om langzaam te
        blijven bewegen.
      </p>
      <p className="mt-4">
        Beoordeel de les daarom niet op hoe goed je kon ontspannen. Nieuw gedrag kost soms
        gewenning. Vraag je af of de les je voldoende steun, opties en ruimte gaf. Probeer een
        kansrijke stijl eventueel nog een tweede keer voordat je beslist.
      </p>
      <p className="mt-4">
        Yoga kan deel zijn van een gezonde routine, maar is geen vervanging voor professionele
        zorg. Houd stress, somberheid, angst of slaapproblemen lang aan of beperken ze je dagelijks
        functioneren, bespreek dat dan met je huisarts of een andere passende zorgprofessional.
      </p>

      <h2 id="praktische-voorbereiding" className={h2}>
        Praktische voorbereiding voor een ontspannende les
      </h2>
      <p className="mt-4">Een paar kleine keuzes maken vertragen makkelijker:</p>
      <ol className="mt-4 list-decimal space-y-2 pl-6">
        <li>Kies een tijdstip dat je zonder haasten kunt halen.</li>
        <li>Kom tien tot vijftien minuten eerder als het je eerste bezoek is.</li>
        <li>Draag laagjes en neem sokken mee voor het liggende deel.</li>
        <li>Vertel relevante bijzonderheden kort aan de docent.</li>
        <li>Zet meldingen uit en leg je telefoon weg.</li>
        <li>Plan na afloop niet meteen de volgende haastige afspraak.</li>
      </ol>
      <p className="mt-4">
        Je hoeft niet lenig te zijn en je hoeft je hoofd niet leeg te maken. Het doel is niet om
        een bepaalde staat te produceren, maar om omstandigheden te creëren waarin je kunt
        vertragen.
      </p>

      <h2 id="yoga-zeeburg" className={h2}>
        Ontspannende yoga bij Yoga Zeeburg
      </h2>
      <p className="mt-4">
        Yoga Zeeburg heeft twaalf wekelijkse lessen in Amsterdam Oost, verspreid over zeven dagen.
        Voor diepe rust en vertraging kun je in het huidige aanbod onder meer kiezen uit Slow Flow
        &amp; Soundbath, Restorative &amp; Reiki &amp; Aroma, Stress Release (Yin style), Relax Yin
        &amp; Nidra en Deep Stretch Yin &amp; Breathwork. Bekijk de{" "}
        <Link to="/lessen" className={link}>
          actuele lesbeschrijvingen
        </Link>{" "}
        voor tempo, focus en ervaringsniveau en controleer Sportbit voor wijzigingen en
        beschikbaarheid in het{" "}
        <Link to="/rooster" className={link}>
          rooster
        </Link>
        .
      </p>
      <p className="mt-4">
        Ben je nieuw, dan kun je met de 14-daagse onbeperkte Intro Pass van €30 verschillende
        lessen, docenten en tijdstippen proberen. De pas is alleen voor nieuwe leerlingen en stopt
        automatisch. Vergelijk bijvoorbeeld één les met beweging en één les met langere stilte; zo
        ontdek je welke vorm van rust daadwerkelijk bij jou past.
      </p>

      <h2 id="conclusie" className={h2}>
        Conclusie
      </h2>
      <p className="mt-4">
        De beste yoga voor ontspanning hangt af van de rust die je zoekt. Restorative is meestal de
        meest ondersteunde en minst actieve keuze. Yoga Nidra past wanneer je liggend en begeleid
        wilt ontspannen. Yin helpt je langzaam vertragen in langer aangehouden houdingen. Slow Flow
        werkt vaak beter wanneer beweging je helpt om uit je hoofd te komen.
      </p>
      <p className="mt-4">
        Kies dus niet de stijl die op papier het rustigst klinkt, maar de les waarvan tempo,
        begeleiding en opbouw passen bij jouw energie van vandaag. Probeer twee verschillende
        vormen en let op hoe je je tijdens én na de les voelt. Daarmee vind je betrouwbaarder rust
        dan met één universeel antwoord.
      </p>
    </>
  );
}
