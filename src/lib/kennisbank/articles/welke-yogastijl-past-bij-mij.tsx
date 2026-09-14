// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: welke-yogastijl-past-bij-mij

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import yogastijlHeroAsset from "@/assets/welke-yogastijl-past-bij-mij-keuzehulp-hero.webp.asset.json";
import yogastijlInlineAsset from "@/assets/yogastijlen-rust-balans-beweging.webp.asset.json";
import { type Article, CATEGORY_BEGINNEN_MET_YOGA } from "../article-types";

const YOGASTIJL_HERO_IMAGE: ArticleImageRef = {
  url: yogastijlHeroAsset.url,
  alt: "Drie lege yogamatten met verschillende hulpmiddelen in een rustige ruimte aan het water",
  width: 1600,
  height: 900,
};

const YOGASTIJL_INLINE_IMAGE: ArticleImageRef = {
  url: yogastijlInlineAsset.url,
  alt: "Yogabolster, deken, blokken en yogariem als rustige vergelijking van yogastijlen",
  width: 1600,
  height: 900,
};

export const article: Article = {
  slug: "welke-yogastijl-past-bij-mij",
  title: "Welke yogastijl past bij mij? Zo maak je een keuze die werkt",
  h1: "Welke yogastijl past bij mij? Zo maak je een keuze die werkt",
  seoTitle: "Welke yogastijl past bij mij? Praktische keuzehulp | Yoga Zeeburg",
  description:
    "Welke yogastijl past bij jou? Vergelijk rustige en dynamische yogastijlen op tempo, intensiteit, structuur en doel met deze praktische keuzehulp.",
  intro:
    "De yogastijl die bij je past, sluit aan op wat je zoekt én op de manier waarop je graag oefent. Wil je vooral vertragen, dan passen yin, restorative of een rustige slow flow vaak goed. Zoek je een stevige maar overzichtelijke basis, kijk dan naar hatha of een rustig opgebouwde all-levelsles. Wil je bewegen op het ritme van je adem, dan ligt vinyasa of flow meer voor de hand. De stijlnaam is echter nooit het hele antwoord: docent, tempo, niveau en lesopbouw bepalen minstens zoveel. Gebruik daarom deze keuzehulp als startpunt en test daarna twee of drie verschillende lessen in de praktijk.",
  category: CATEGORY_BEGINNEN_MET_YOGA,
  type: "explainer",
  pillar: true,
  publishedAt: "2026-08-24",
  updatedAt: "2026-08-24",
  readingTimeMin: 10,
  toc: [
    { id: "begin-bij-je-behoefte", label: "Begin niet bij de naam, maar bij je behoefte" },
    { id: "vier-kenmerken", label: "Vergelijk yogastijlen op vier kenmerken" },
    { id: "rustige-stijlen", label: "Rustige yogastijlen: yin, restorative en slow flow" },
    {
      id: "gebalanceerde-stijlen",
      label: "Gebalanceerde yogastijlen: hatha en toegankelijke all-levelslessen",
    },
    { id: "dynamische-stijlen", label: "Dynamische yogastijlen: vinyasa, flow en power" },
    { id: "vaste-opbouw", label: "Wanneer past een vaste, herhaalbare opbouw?" },
    { id: "keuzehulp", label: "De keuzehulp: welke richting past vandaag bij jou?" },
    { id: "docent-verschil", label: "Waarom dezelfde stijl per docent anders voelt" },
    { id: "stijl-testen", label: "Zo test je een yogastijl zonder te snel te beslissen" },
    { id: "yoga-zeeburg", label: "Welke lessen kun je bij Yoga Zeeburg proberen?" },
    { id: "faq", label: "Veelgestelde vragen" },
  ],
  faqs: [
    {
      question: "Welke yogastijl is het beste voor beginners?",
      answer:
        "Er is niet één beste stijl voor alle beginners. Een rustig opgebouwde hatha-, slow-flow-, yin- of andere expliciet beginner-friendly les kan een goede start zijn. De lesbeschrijving, het tempo en de docent zijn belangrijker dan de naam alleen.",
    },
    {
      question: "Welke yogastijl is het meest ontspannend?",
      answer:
        "Restorative yoga is doorgaans het meest gericht op comfortabele ondersteuning en diepe rust. Yin en rustige slow flow kunnen eveneens ontspannend zijn, maar voelen anders: yin gebruikt langer aangehouden posities en slow flow bevat meer beweging.",
    },
    {
      question: "Wat is het verschil tussen hatha en vinyasa?",
      answer:
        "In hatha worden houdingen vaak afzonderlijker en met meer tijd voor uitleg opgebouwd. In vinyasa worden houdingen vaker vloeiend met de adem verbonden. De precieze intensiteit verschilt per docent en les, dus controleer altijd de beschrijving.",
    },
    {
      question: "Kan ik verschillende yogastijlen combineren?",
      answer:
        "Ja. Veel mensen combineren bijvoorbeeld een dynamische les met een rustige les. Dat kan afwisseling geven tussen inspanning, techniek en ontspanning. Kies per dag wat past bij je energie en ervaring.",
    },
    {
      question: "Hoeveel lessen heb ik nodig om te weten wat bij mij past?",
      answer:
        "Probeer bij voorkeur drie lessen: twee verschillende richtingen en daarna een herhaling van de meest kansrijke stijl, eventueel bij een andere docent. Daarmee voorkom je dat één moment je hele oordeel bepaalt.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg — Leskeuzehulp en actuele lesbeschrijvingen",
      url: "https://www.yogazeeburg.com/lessen",
    },
    { title: "Yoga Zeeburg — Actueel rooster", url: "https://www.yogazeeburg.com/rooster" },
    { title: "Yoga Zeeburg — 14-daagse Intro Pass", url: "https://www.yogazeeburg.com/trial" },
    { title: "Yoga Alliance — Yoga Styles", url: "https://yogaalliance.org/yoga-styles/" },
    {
      title: "Encyclopaedia Britannica — Yoga",
      url: "https://www.britannica.com/topic/Yoga-philosophy",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  heroImage: YOGASTIJL_HERO_IMAGE,
  body: () => <YogastijlBody />,
};

function YogastijlBody() {
  return (
    <>
      <h2
        id="begin-bij-je-behoefte"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Begin niet bij de naam, maar bij je behoefte
      </h2>
      <p className="mt-4">
        De vraag <em>welke yogastijl past bij mij?</em> klinkt alsof er één definitief antwoord moet
        zijn. In de praktijk kan je antwoord per periode of zelfs per dag veranderen. Na een drukke
        werkdag verlang je misschien naar stilte en lange, ondersteunde houdingen. Op een energieke
        ochtend wil je juist bewegen, warmte opbouwen en je aandacht bij een vloeiende reeks houden.
      </p>
      <p className="mt-4">
        Begin daarom met twee vragen: wat wil ik na deze les ervaren, en welk tempo helpt mij om
        aanwezig te blijven? Wie tot rust wil komen, heeft iets anders nodig dan iemand die fysieke
        uitdaging zoekt. En wie nieuwe houdingen graag stap voor stap leert, voelt zich
        waarschijnlijk prettiger bij een andere opbouw dan iemand die graag blijft bewegen.
      </p>
      <p className="mt-4">
        Er bestaat geen ranglijst waarin de ene stijl beter is dan de andere. Een passende stijl is
        de stijl waarbij je kunt oefenen zonder jezelf te forceren én waarbij de drempel om terug te
        komen laag blijft. Ook ervaring is niet allesbepalend. Een beginner kan plezier hebben in
        een toegankelijke flow; een ervaren deelnemer kan juist veel verdieping vinden in een
        eenvoudige, rustige les.
      </p>

      <h2
        id="vier-kenmerken"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Vergelijk yogastijlen op vier kenmerken
      </h2>
      <p className="mt-4">
        Stijlnamen verschillen per studio. Vergelijk lessen daarom op vier concrete kenmerken:
      </p>
      <ol className="mt-4 list-decimal space-y-2 pl-6">
        <li>
          <strong className="font-medium text-foreground">Tempo.</strong> Beweeg je regelmatig van
          houding naar houding, of blijf je langer op één plek?
        </li>
        <li>
          <strong className="font-medium text-foreground">Intensiteit.</strong> Hoeveel kracht,
          uithoudingsvermogen of actieve mobiliteit vraagt de les?
        </li>
        <li>
          <strong className="font-medium text-foreground">Structuur.</strong> Volgt iedere les een
          herkenbare volgorde, of verandert de opbouw per docent en thema?
        </li>
        <li>
          <strong className="font-medium text-foreground">Hoofdfocus.</strong> Ligt het accent op
          ontspanning, lichaamsbewustzijn, techniek, mobiliteit, kracht of een combinatie?
        </li>
      </ol>
      <p className="mt-4">
        Lees daarnaast de actuele lesbeschrijving. Dezelfde naam kan bij twee docenten anders
        aanvoelen. Een &lsquo;flow&rsquo; kan langzaam en toegankelijk zijn, maar ook snel en
        fysiek. Een yinles heeft een laag bewegingstempo, terwijl het langer aanhouden van houdingen
        toch intens kan zijn. Woorden als rustig, dynamisch, beginner-friendly of enige ervaring
        aanbevolen zeggen daarom vaak meer dan alleen de stijlnaam.
      </p>

      <h2
        id="rustige-stijlen"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Rustige yogastijlen: yin, restorative en slow flow
      </h2>

      <h3 className="mt-8 font-display text-xl font-medium tracking-tight text-foreground">
        Yin yoga
      </h3>
      <p className="mt-4">
        Bij yin yoga blijf je doorgaans langer in zittende of liggende houdingen. Het tempo is laag
        en er is weinig overgang tussen houdingen. Daardoor krijg je tijd om sensaties op te merken
        en je positie met blokken, dekens of een bolster aan te passen.
      </p>
      <p className="mt-4">
        Yin kan passen wanneer je stilte zoekt, graag rustig werkt aan bewegingsruimte of na veel
        zitten en sporten bewust wilt vertragen. Laag tempo betekent niet automatisch gemakkelijk:
        langer blijven kan lichamelijk en mentaal uitdagend zijn. Je hoeft niet zo diep mogelijk te
        gaan; een bruikbare positie voelt duidelijk, maar blijft beheersbaar en ademend.
      </p>

      <h3 className="mt-8 font-display text-xl font-medium tracking-tight text-foreground">
        Restorative yoga
      </h3>
      <p className="mt-4">
        Restorative yoga gebruikt veel ondersteuning, zodat je weinig spierinspanning nodig hebt.
        Houdingen worden ruim ingericht met bolsters, dekens en blokken. Het doel is niet om een
        grens op te zoeken, maar om een comfortabele positie langere tijd te laten dragen door de
        materialen.
      </p>
      <p className="mt-4">
        Deze richting past vaak bij mensen die diepe rust, een zeer lage fysieke drempel of een
        tegenwicht voor een volle week zoeken. Wie juist continu beweging nodig heeft om de aandacht
        erbij te houden, kan de stilte in het begin onwennig vinden.
      </p>

      <h3 className="mt-8 font-display text-xl font-medium tracking-tight text-foreground">
        Slow flow
      </h3>
      <p className="mt-4">
        Slow flow vormt een brug tussen stil zijn en bewegen. Houdingen worden op een rustig tempo
        verbonden, vaak met ruimte om de adem en uitlijning te volgen. Je blijft niet zo lang stil
        als bij yin of restorative, maar krijgt meer tijd dan in een vlottere vinyasa.
      </p>
      <p className="mt-4">
        Slow flow is een logische keuze wanneer je zacht wilt bewegen, spanning wilt loslaten en
        toch graag een duidelijke reeks volgt. Controleer wel de lesbeschrijving: &lsquo;slow&rsquo;
        zegt iets over tempo, niet automatisch over niveau of intensiteit.
      </p>

      <h2
        id="gebalanceerde-stijlen"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Gebalanceerde yogastijlen: hatha en toegankelijke all-levelslessen
      </h2>
      <p className="mt-4">
        Hatha wordt vaak gebruikt voor lessen waarin afzonderlijke houdingen rustig en relatief
        duidelijk worden opgebouwd. Er is meestal tijd voor uitleg, adem en korte pauzes. De
        precieze invulling verschilt sterk per docent: sommige hathalessen zijn zacht, andere
        behoorlijk actief.
      </p>
      <p className="mt-4">
        Deze richting kan goed passen als je houdingen wilt leren begrijpen, een evenwicht zoekt
        tussen inspanning en ontspanning of niet voortdurend in beweging wilt zijn. Kijk of de
        beschrijving aangeeft voor welk niveau de les bedoeld is en of variaties worden aangeboden.
      </p>
      <p className="mt-4">
        Ook een les met het label &lsquo;all levels&rsquo; kan een gebalanceerde keuze zijn, mits de
        docent werkelijk opties geeft. All levels betekent niet dat iedereen hetzelfde moet doen.
        Het betekent idealiter dat deelnemers met verschillende ervaring een passende versie kunnen
        kiezen. Ben je nieuw, vertel dat dan kort vóór de les. Zo weet de docent dat extra context
        welkom is.
      </p>

      <h2
        id="dynamische-stijlen"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Dynamische yogastijlen: vinyasa, flow en power
      </h2>

      <h3 className="mt-8 font-display text-xl font-medium tracking-tight text-foreground">
        Vinyasa en flow
      </h3>
      <p className="mt-4">
        In vinyasa of flow worden houdingen verbonden in reeksen waarin beweging en adem samen
        oplopen. De les kan creatief en afwisselend zijn. Je bouwt vaak warmte op en gebruikt
        tegelijk kracht, balans, mobiliteit en concentratie.
      </p>
      <p className="mt-4">
        Dit past mogelijk bij je wanneer je graag blijft bewegen, energie wilt gebruiken en plezier
        hebt in een les die als één geheel voelt. Je hoeft niet gevorderd te zijn, maar een vlot
        tempo kan in het begin veel informatie tegelijk geven. Kies daarom een expliciet
        toegankelijke flow wanneer je weinig ervaring hebt.
      </p>

      <h3 className="mt-8 font-display text-xl font-medium tracking-tight text-foreground">
        Power yoga
      </h3>
      <p className="mt-4">
        Power yoga legt meestal meer nadruk op fysieke intensiteit, kracht en uithoudingsvermogen.
        De naam is niet overal gestandaardiseerd; lees dus goed hoe de studio de les omschrijft. Een
        powerles kan fijn zijn als je een stevige training zoekt en ervaring hebt met basisposities.
        Zoek je vooral herstel of een rustige eerste kennismaking, dan is een minder intensieve les
        waarschijnlijk een vriendelijker begin.
      </p>
      <p className="mt-4">
        Belangrijk: intensiever is niet automatisch effectiever. De beste les is niet de les waarin
        je het meeste zweet, maar de les die past bij je doel en die je met goede aandacht kunt
        uitvoeren.
      </p>

      <ArticleFigure
        image={YOGASTIJL_INLINE_IMAGE}
        caption="Kijk niet alleen naar de stijlnaam, maar vooral naar tempo, opbouw en de behoefte waarmee je op de mat stapt."
        className="mt-10"
      />

      <h2
        id="vaste-opbouw"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wanneer past een vaste, herhaalbare opbouw?
      </h2>
      <p className="mt-4">
        Sommige yogavormen werken met een vaste of grotendeels herkenbare reeks. Ashtanga is daarvan
        het bekendste voorbeeld. Herhaling maakt vooruitgang zichtbaar en vermindert de verrassing:
        je leert de volgorde steeds beter kennen en kunt subtieler waarnemen wat er verandert.
      </p>
      <p className="mt-4">
        Dat kan bij je passen wanneer je structuur prettig vindt, graag zelfstandig
        verantwoordelijkheid neemt en het motiverend vindt om dezelfde basis opnieuw te oefenen. Het
        kan minder aansluiten wanneer je juist veel afwisseling zoekt of iedere les wilt aanpassen
        aan je energie. Vraag bij een vaste methode altijd welke instapvariant er is; je hoeft niet
        direct een volledige reeks te beheersen.
      </p>

      <h2
        id="keuzehulp"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        De keuzehulp: welke richting past vandaag bij jou?
      </h2>
      <p className="mt-4">Gebruik deze korte route als eerste selectie:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>
          <strong className="font-medium text-foreground">
            Ik wil vooral diepe rust en veel ondersteuning.
          </strong>{" "}
          Kijk naar restorative of een les met een sterk ontspannend karakter.
        </li>
        <li>
          <strong className="font-medium text-foreground">
            Ik wil vertragen en houdingen langer ervaren.
          </strong>{" "}
          Yin kan passen.
        </li>
        <li>
          <strong className="font-medium text-foreground">
            Ik wil rustig bewegen zonder lang stil te liggen.
          </strong>{" "}
          Kies slow flow of een zachte all-levelsles.
        </li>
        <li>
          <strong className="font-medium text-foreground">
            Ik wil houdingen stap voor stap leren.
          </strong>{" "}
          Bekijk hatha of een technisch opgebouwde beginnersles.
        </li>
        <li>
          <strong className="font-medium text-foreground">
            Ik wil vloeiend bewegen en warmte opbouwen.
          </strong>{" "}
          Probeer een toegankelijke vinyasa of flow.
        </li>
        <li>
          <strong className="font-medium text-foreground">Ik zoek een fysieke uitdaging.</strong>{" "}
          Een dynamische flow of powerles kan passend zijn.
        </li>
        <li>
          <strong className="font-medium text-foreground">
            Ik houd van herhaling en duidelijke structuur.
          </strong>{" "}
          Verken een vaste methode of terugkerende lesopbouw.
        </li>
      </ul>
      <p className="mt-4">
        Twijfel je tussen twee richtingen? Kies ze allebei. De vergelijking na twee verschillende
        lessen geeft meer informatie dan nog een uur lesnamen lezen. Je kunt ook onze gids{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "rustige-yoga-voor-beginners-welke-les-past-het-beste" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Rustige yoga voor beginners: welke les past het beste?
        </Link>{" "}
        gebruiken als je bewust aan de rustige kant wilt beginnen.
      </p>

      <h2
        id="docent-verschil"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Waarom dezelfde stijl per docent anders voelt
      </h2>
      <p className="mt-4">
        Een stijl geeft een kader; de docent maakt de les. Taal, muziek, tempo, volgorde,
        stiltemomenten en de hoeveelheid uitleg bepalen hoe jij een les beleeft. Twee vinyasalessen
        kunnen daarom totaal verschillend voelen, net als twee yinlessen.
      </p>
      <p className="mt-4">
        Beoordeel een stijl niet definitief op basis van één docent of één dag. Misschien paste het
        tempo niet, was je vermoeid of sloot het thema niet aan. Probeer bij twijfel dezelfde stijl
        nog eens bij een andere docent. Andersom geldt ook: wanneer een docent heel goed bij je
        past, kan een stijl die je vooraf niet koos onverwacht precies goed voelen.
      </p>
      <p className="mt-4">
        Goede begeleiding herken je onder andere aan heldere uitleg, respect voor grenzen en
        bruikbare opties. Lees daarvoor ook{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "hoe-herken-je-een-goede-yogastudio-kwaliteitskenmerken" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Hoe herken je een goede yogastudio? 9 kwaliteitskenmerken
        </Link>
        .
      </p>

      <h2
        id="stijl-testen"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zo test je een yogastijl zonder te snel te beslissen
      </h2>
      <p className="mt-4">Maak van je eerste twee weken een klein, eerlijk experiment:</p>
      <ol className="mt-4 list-decimal space-y-2 pl-6">
        <li>Kies één rustige en één actievere les die qua niveau passend zijn.</li>
        <li>
          Noteer vóór iedere les wat je nodig hebt: rust, beweging, focus of fysieke uitdaging.
        </li>
        <li>
          Beoordeel na afloop niet alleen de zwaarte, maar ook je aandacht, adem en gevoel in de
          uren erna.
        </li>
        <li>Herhaal de meest kansrijke stijl bij een andere docent of op een ander moment.</li>
        <li>Kies vervolgens de les waarnaar je realistisch wilt terugkeren.</li>
      </ol>
      <p className="mt-4">
        Een{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-proefles-of-introductiepas-wat-is-slimmer" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          introductiepas geeft meestal meer informatie dan één losse proefles
        </Link>
        , omdat je binnen korte tijd kunt vergelijken. Geef jezelf wel toestemming om je keuze later
        te veranderen. Yoga is geen abonnement op één identiteit; variëren met je week, seizoen en
        energie is heel normaal.
      </p>

      <h2
        id="yoga-zeeburg"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Welke lessen kun je bij Yoga Zeeburg proberen?
      </h2>
      <p className="mt-4">
        Bij Yoga Zeeburg vind je rustige, gebalanceerde en actievere lessen. De namen en het rooster
        kunnen veranderen, dus gebruik altijd de actuele{" "}
        <a
          href="/lessen"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          leskeuzehulp
        </a>{" "}
        en het{" "}
        <a
          href="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          rooster
        </a>
        . In de lesbeschrijving zie je tempo, ervaring en het belangrijkste accent. Zo kies je op
        wat de les werkelijk biedt in plaats van op een losse stijlnaam.
      </p>
      <p className="mt-4">
        Wil je verschillende richtingen zonder prestatiedruk vergelijken? Met de{" "}
        <a
          href="/trial"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          14-daagse Intro Pass
        </a>{" "}
        kun je meerdere lessen, docenten en tijden proberen. Kies bijvoorbeeld eerst een rustige les
        en daarna een flow. Zo merk je snel welke combinatie bij jouw lichaam, aandacht en agenda
        past.
      </p>
    </>
  );
}
