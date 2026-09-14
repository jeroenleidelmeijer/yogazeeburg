// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: welke-vragen-stel-je-voor-je-eerste-yogales

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import vragenEersteLesHeroAsset from "@/assets/vragen-eerste-yogales-hero.webp.asset.json";
import vragenEersteLesInlineAsset from "@/assets/voorbereiding-eerste-yogales.webp.asset.json";
import { type Article, CATEGORY_BEGINNEN_MET_YOGA } from "../article-types";

const VRAGEN_EERSTE_LES_HERO_IMAGE: ArticleImageRef = {
  url: vragenEersteLesHeroAsset.url,
  alt: "Yogamat, blokken, deken, waterfles en leeg notitieboek in een rustige lichte yogaruimte.",
  width: 1536,
  height: 1024,
};

const VRAGEN_EERSTE_LES_INLINE_IMAGE: ArticleImageRef = {
  url: vragenEersteLesInlineAsset.url,
  alt: "Open notitieboek naast een yogamat, yogablokken, riem, deken en waterfles als voorbereiding op een eerste yogales.",
  width: 1536,
  height: 1024,
};

export const article: Article = {
  slug: "welke-vragen-stel-je-voor-je-eerste-yogales",
  title: "Welke vragen stel je voor je eerste yogales?",
  h1: "Welke vragen stel je voor je eerste yogales?",
  seoTitle: "Welke vragen stel je voor je eerste yogales? | Yoga Zeeburg",
  description:
    "Ga voorbereid naar je eerste yogales. Bekijk welke vragen je vooraf stelt over niveau, materiaal, blessures, kleding, aankomst en aanraking.",
  intro:
    "Voor je eerste yogales zijn dit de belangrijkste vragen: is de les geschikt voor beginners, hoe actief is het tempo, wat moet je meenemen, hoe vroeg moet je aanwezig zijn en waar meld je blessures, zwangerschap of andere bijzonderheden? Vraag ook hoe de docent omgaat met aanraking, welke taal wordt gesproken en hoe reserveren of annuleren werkt. Je hoeft ze niet allemaal te stellen. Kies de vragen die jouw twijfel wegnemen, zodat je rustig en goed voorbereid binnenstapt.",
  category: CATEGORY_BEGINNEN_MET_YOGA,
  type: "guide",
  pillar: false,
  publishedAt: "2026-09-14",
  updatedAt: "2026-09-14",
  readingTimeMin: 6,
  toc: [
    { id: "waarom-vragen", label: "Waarom vooraf vragen stellen helpt" },
    { id: "negen-vragen", label: "De 9 belangrijkste vragen" },
    { id: "niet-vooraf", label: "Wat hoef je niet vooraf te weten?" },
    { id: "kort-bericht", label: "Een kort bericht dat je kunt sturen" },
    { id: "yoga-zeeburg", label: "Eerste les bij Yoga Zeeburg" },
    { id: "conclusie", label: "Conclusie" },
    { id: "faq", label: "Veelgestelde vragen" },
  ],
  faqs: [
    {
      question: "Moet ik de docent vóór mijn eerste yogales spreken?",
      answer:
        "Niet altijd, maar het is verstandig als je twijfelt over het niveau, een relevante lichamelijke bijzonderheid wilt melden of een voorkeur rond aanraking hebt. Een kort bericht of gesprek vóór aanvang is meestal voldoende.",
    },
    {
      question: "Wat vertel ik over een blessure?",
      answer:
        "Vertel waar je last van hebt, welke bewegingen je moet vermijden en welk professioneel advies je al hebt gekregen. Vraag of de groepsles passend is. De docent kan algemene opties bieden, maar stelt geen medische diagnose.",
    },
    {
      question: "Kan ik tijdens de les vragen stellen?",
      answer:
        "Dat hangt af van de lesopzet. Een korte verduidelijking kan vaak, maar een uitgebreid gesprek is meestal prettiger vóór of na de les. Vraag vooraf wat de docent fijn vindt.",
    },
    {
      question: "Mag ik aangeven dat ik niet aangeraakt wil worden?",
      answer:
        "Ja. Je mag altijd aangeven dat je geen fysieke correcties of aanraking wilt. Vraag hoe de studio toestemming regelt en vertel je voorkeur vóór de les aan de docent.",
    },
    {
      question: "Welke les is geschikt als ik nog nooit yoga heb gedaan?",
      answer:
        "Kies een les die expliciet beginnersvriendelijk is en waarvan tempo en inhoud duidelijk zijn beschreven. Bij Yoga Zeeburg zijn de meeste lessen beginnersvriendelijk; de lespagina vermeldt wanneer enige ervaring wordt aangeraden.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg — Lessen, geraadpleegd 14 september 2026",
      url: "https://www.yogazeeburg.com/lessen",
    },
    {
      title: "Yoga Zeeburg — Rooster, geraadpleegd 14 september 2026",
      url: "https://www.yogazeeburg.com/rooster",
    },
    {
      title: "Yoga Zeeburg — Prijzen, geraadpleegd 14 september 2026",
      url: "https://www.yogazeeburg.com/prijzen",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  heroImage: VRAGEN_EERSTE_LES_HERO_IMAGE,
  body: () => <VragenEersteLesBody />,
};

function VragenEersteLesBody() {
  const h2 = "mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl";
  const h3 = "mt-8 font-display text-xl font-medium tracking-tight text-foreground";
  const link = "font-medium text-primary underline underline-offset-4 hover:no-underline";
  return (
    <>
      <h2 id="waarom-vragen" className={h2}>
        Waarom vooraf vragen stellen helpt
      </h2>
      <p className="mt-4">
        Een lesnaam vertelt niet altijd hoeveel tempo, stilte of uitleg je kunt verwachten. Vertel
        eenvoudig dat je nieuw bent en wat je nodig hebt. Wil je eerst zien hoe een les meestal
        verloopt? Lees dan{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "hoe-ziet-een-eerste-yogales-eruit" }}
          className={link}
        >
          eerste yogales stap voor stap
        </Link>
        .
      </p>

      <h2 id="negen-vragen" className={h2}>
        De 9 belangrijkste vragen
      </h2>

      <h3 className={h3}>1. Is deze les geschikt voor een complete beginner?</h3>
      <p className="mt-4">
        Vraag of de docent rekening houdt met deelnemers zonder ervaring en of er opties worden
        gegeven.
      </p>
      <p className="mt-4">
        Bij Yoga Zeeburg staat per les het tempo en ervaringsniveau vermeld. De meeste van de twaalf
        wekelijkse lessen zijn beginnersvriendelijk; bij de actievere flows wordt aangegeven wanneer
        enige ervaring prettig is. Bekijk daarom eerst de{" "}
        <Link to="/lessen" className={link}>
          actuele lesbeschrijvingen
        </Link>
        .
      </p>

      <h3 className={h3}>2. Hoe actief of rustig is de les?</h3>
      <p className="mt-4">
        ‘Yoga’ kan langzaam en zacht zijn, maar ook een dynamische flow. Zeg of je wilt bewegen,
        rustig rekken, herstellen of vooral ontspannen.
      </p>

      <h3 className={h3}>3. Moet ik een eigen mat of andere spullen meenemen?</h3>
      <p className="mt-4">
        Vraag of matten en hulpmiddelen aanwezig zijn en of je die moet reserveren. Controleer ook of
        je een handdoek of warme trui nodig hebt.
      </p>

      <h3 className={h3}>4. Hoe vroeg moet ik aanwezig zijn?</h3>
      <p className="mt-4">
        Vraag naar de gewenste aankomsttijd en wat er gebeurt als de deur na aanvang sluit. Lees ook{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "hoe-vroeg-moet-je-aanwezig-zijn-voor-een-yogales" }}
          className={link}
        >
          hoe vroeg je voor een yogales aanwezig bent
        </Link>
        .
      </p>

      <h3 className={h3}>5. Waar meld ik een blessure, zwangerschap of andere bijzonderheid?</h3>
      <p className="mt-4">
        Vraag of je een relevante bijzonderheid bij de boeking, per e-mail of bij de docent meldt.
        Een groepsles vervangt geen persoonlijke medische beoordeling; overleg bij twijfel met een
        passende zorgprofessional.
      </p>

      <h3 className={h3}>6. Gebruikt de docent fysieke aanraking of correcties?</h3>
      <p className="mt-4">
        Vraag hoe toestemming wordt geregeld en zeg duidelijk als je niet aangeraakt wilt worden.
        Daarvoor hoef je geen uitleg te geven.
      </p>

      <h3 className={h3}>7. In welke taal wordt de les gegeven?</h3>
      <p className="mt-4">
        Controleer dit vooral in een internationale stad of als je aanwijzingen liever in een bepaalde
        taal hoort. Vraag ook of de docent belangrijke instructies kan verduidelijken wanneer je iets
        niet begrijpt.
      </p>

      <h3 className={h3}>8. Hoe werkt reserveren, annuleren en de wachtlijst?</h3>
      <p className="mt-4">
        Vraag via welk systeem je boekt, tot wanneer je kunt annuleren en hoe de wachtlijst werkt. Bij
        Yoga Zeeburg is Sportbit leidend voor actuele wijzigingen, beschikbaarheid en reserveringen
        naast het{" "}
        <Link to="/rooster" className={link}>
          vaste weekrooster
        </Link>
        .
      </p>

      <h3 className={h3}>9. Kan ik eerst verschillende lessen proberen?</h3>
      <p className="mt-4">
        Vraag of je verschillende stijlen, docenten en tijden kunt proberen. De 14-daagse Intro Pass
        van Yoga Zeeburg kost €30, is alleen voor nieuwe leerlingen, geeft 14 aaneengesloten dagen
        onbeperkt toegang en stopt automatisch.
      </p>

      <ArticleFigure
        image={VRAGEN_EERSTE_LES_INLINE_IMAGE}
        caption="Een korte voorbereiding is genoeg: noteer wat voor jou belangrijk is en vraag het vóór de les."
        className="mt-10"
      />

      <h2 id="niet-vooraf" className={h2}>
        Wat hoef je niet vooraf te weten?
      </h2>
      <p className="mt-4">
        Je hoeft geen houdingen te kennen of precies te weten welke stijl bij je past. Bespreek
        relevante informatie kort en discreet met de docent. Een zin als “Ik ben nieuw; waar kan ik
        het beste liggen?” is genoeg.
      </p>

      <h2 id="kort-bericht" className={h2}>
        Een kort bericht dat je kunt sturen
      </h2>
      <p className="mt-4">Maak je vraag klein en duidelijk:</p>
      <blockquote className="mt-4 border-l-2 border-primary/40 pl-5 italic text-muted-foreground">
        Hoi, ik wil graag voor het eerst meedoen met [lesnaam]. Ik heb nog geen yoga-ervaring en zoek
        een [rustige/actieve] les. Is deze les geschikt, wat moet ik meenemen en hoe vroeg kan ik er
        het beste zijn?
      </blockquote>
      <p className="mt-4">Voeg alleen een relevante bijzonderheid of voorkeur toe.</p>

      <h2 id="yoga-zeeburg" className={h2}>
        Eerste les bij Yoga Zeeburg
      </h2>
      <p className="mt-4">
        Yoga Zeeburg zit aan de Cruquiusweg 96F in Amsterdam Oost, boven CrossFit Zeeburg. Op de
        website vind je per les tempo, focus en ervaringsniveau. Bekijk het rooster en controleer
        Sportbit voor de laatste beschikbaarheid of wijziging.
      </p>
      <p className="mt-4">
        Met de{" "}
        <Link to="/trial" className={link}>
          14-daagse Intro Pass
        </Link>{" "}
        kun je verschillende lessen, docenten en tijden ervaren voordat je een routine kiest. Zo
        beantwoord je sommige vragen niet alleen met informatie, maar ook met je eigen ervaring.
      </p>

      <h2 id="conclusie" className={h2}>
        Conclusie
      </h2>
      <p className="mt-4">
        De beste vraag vóór je eerste yogales is de vraag die jouw grootste drempel wegneemt. Begin
        met geschiktheid, tempo, materiaal en aankomst. Meld relevante bijzonderheden en geef
        voorkeuren rond aanraking duidelijk aan. Daarna mag je nieuwsgierig binnenstappen: je hoeft je
        eerste les niet vooraf volledig te begrijpen.
      </p>
    </>
  );
}
