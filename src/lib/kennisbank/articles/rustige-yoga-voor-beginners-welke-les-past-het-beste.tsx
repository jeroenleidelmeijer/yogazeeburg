// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: rustige-yoga-voor-beginners-welke-les-past-het-beste

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import rustigeHeroAsset from "@/assets/rustige-yoga-voor-beginners-hoofdbeeld.webp.asset.json";
import rustigeInlineAsset from "@/assets/rustige-yoga-voor-beginners-leskeuze.webp.asset.json";
import { type Article, CATEGORY_BEGINNEN_MET_YOGA } from "../article-types";

const RUSTIGE_HERO_IMAGE: ArticleImageRef = {
  url: rustigeHeroAsset.url,
  alt: "Lege groene yogamat met bolster, deken, blokken en yogariem in een rustige ruimte aan het water.",
  width: 1600,
  height: 900,
};

const RUSTIGE_INLINE_IMAGE: ArticleImageRef = {
  url: rustigeInlineAsset.url,
  alt: "Drie lege yogamatten met verschillende combinaties van blokken, bolster, deken, riem en meditatiekussen.",
  width: 1600,
  height: 900,
};

export const article: Article = {
  slug: "rustige-yoga-voor-beginners-welke-les-past-het-beste",
  title: "Rustige yoga voor beginners: welke les past het beste?",
  h1: "Rustige yoga voor beginners: welke les past het beste?",
  seoTitle: "Rustige yoga voor beginners: welke les past het beste?",
  description:
    "Zoek je rustige yoga voor beginners? Vergelijk hatha, yin, restorative en rustige flow en kies een les die past bij jouw tempo en behoefte.",
  intro:
    "Voor de meeste beginners is een rustige hatha- of gentle-les de beste eerste keuze: je beweegt langzaam, krijgt tijd voor uitleg en leert enkele basishoudingen kennen. Wil je vooral vertragen en langere tijd stil zijn, dan kan yin passen. Zoek je maximale ondersteuning en weinig inspanning, kijk dan naar restorative yoga. De lesomschrijving en docent zijn uiteindelijk belangrijker dan alleen de stijlnaam.",
  category: CATEGORY_BEGINNEN_MET_YOGA,
  type: "explainer",
  pillar: false,
  publishedAt: "2026-08-21",
  updatedAt: "2026-08-21",
  readingTimeMin: 8,
  toc: [
    { id: "kort-antwoord", label: "Kort antwoord" },
    { id: "wat-maakt-een-yogales-rustig", label: "Wat maakt een yogales rustig?" },
    { id: "rustige-yogavormen-vergeleken", label: "Vier rustige yogavormen vergeleken" },
    { id: "keuze-op-basis-van-behoefte", label: "Welke les past bij wat je nodig hebt?" },
    { id: "rustig-is-niet-altijd-makkelijk", label: "Rustig is niet altijd makkelijk" },
    { id: "lesbeschrijving-lezen", label: "Zo lees je een lesbeschrijving" },
    { id: "eerste-les-kiezen", label: "Zo kies je je eerste rustige les" },
    { id: "yoga-zeeburg", label: "Rustig beginnen bij Yoga Zeeburg" },
    { id: "conclusie", label: "Conclusie" },
    { id: "faq", label: "Veelgestelde vragen" },
  ],
  faqs: [
    {
      question: "Welke rustige yoga is het beste voor een complete beginner?",
      answer:
        "Een rustige hatha- of gentle-les met duidelijke uitleg is voor veel beginners een goede start. Je leert enkele basishoudingen en krijgt tijd om aanwijzingen te verwerken. Controleer wel of de specifieke les als beginner-friendly of toegankelijk voor alle niveaus wordt beschreven.",
    },
    {
      question: "Is yin yoga geschikt voor beginners?",
      answer:
        "Ja, mits de docent opties en voldoende ondersteuning aanbiedt. Yin bevat weinig overgangen, maar lange houdingen kunnen intens aanvoelen. Ga niet zo diep mogelijk, gebruik hulpmiddelen en kom eerder uit een houding wanneer dat beter voelt.",
    },
    {
      question: "Wat is rustiger: yin of restorative yoga?",
      answer:
        "Restorative yoga vraagt meestal de minste actieve inspanning, omdat het lichaam ruim wordt ondersteund. Yin bevat eveneens weinig beweging, maar de langere houdingen kunnen meer sensatie geven. Welke vorm rustiger voelt, verschilt dus per persoon.",
    },
    {
      question: "Kan ik als beginner ook een rustige flow volgen?",
      answer:
        "Ja, wanneer de les expliciet toegankelijk is voor beginners en de docent de overgangen rustig uitlegt. Een slow flow kan prettig zijn als je liever zacht blijft bewegen dan lang stilzit.",
    },
    {
      question: "Hoe weet ik of een les echt rustig is?",
      answer:
        "Lees de volledige omschrijving en kijk naar tempo, niveau, duur, gebruik van hulpmiddelen en aangeboden opties. Vraag bij twijfel rechtstreeks of de les geschikt is voor iemand zonder ervaring die rustig wil beginnen.",
    },
  ],
  sources: [
    { title: "Yoga Zeeburg — homepage en studio-informatie", url: "https://www.yogazeeburg.com/" },
    { title: "Yoga Zeeburg — actuele lessen", url: "https://www.yogazeeburg.com/lessen" },
    { title: "Yoga Zeeburg — actueel lesrooster", url: "https://www.yogazeeburg.com/rooster" },
    { title: "Yoga Zeeburg — 14-daagse Intro Pass", url: "https://www.yogazeeburg.com/trial" },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  heroImage: RUSTIGE_HERO_IMAGE,
  body: () => <RustigeYogaBody />,
};

function RustigeYogaBody() {
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
            Voor de meeste beginners is een rustige hatha- of gentle-les een goede eerste keuze. Het
            tempo ligt doorgaans lager, houdingen worden duidelijk opgebouwd en er is tijd om
            aanwijzingen te verwerken. Wil je vooral vertragen en langere tijd stil zijn, dan kan
            yin yoga passen. Zoek je maximale ondersteuning en zo weinig mogelijk actieve
            inspanning, kijk dan naar restorative yoga.
          </p>
          <p>
            Kies echter niet alleen op de stijlnaam. Een rustige les past pas echt wanneer de
            beschrijving duidelijk is, de docent opties aanbiedt en het tempo jou genoeg ruimte
            geeft om te voelen wat prettig is. Een rustige flow met goede uitleg kan daardoor
            geschikter zijn dan een yinles waarin houdingen lang en intens aanvoelen.
          </p>
        </div>
      </section>

      <h2
        id="wat-maakt-een-yogales-rustig"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat maakt een yogales rustig?
      </h2>
      <p className="mt-4">Vier kenmerken bepalen hoe rustig een les in de praktijk voelt:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>
          <strong className="font-medium text-foreground">Tempo:</strong> je krijgt tijd om in een
          houding te komen en hoeft niet voortdurend snel te wisselen.
        </li>
        <li>
          <strong className="font-medium text-foreground">Uitleg:</strong> de docent benoemt stap
          voor stap wat je doet en waar je op kunt letten.
        </li>
        <li>
          <strong className="font-medium text-foreground">Belasting:</strong> er zijn bruikbare,
          minder intensieve opties en je mag tussendoor rust nemen.
        </li>
        <li>
          <strong className="font-medium text-foreground">Prikkels:</strong> muziek, licht en
          instructies ondersteunen de aandacht in plaats van om die aandacht te concurreren.
        </li>
      </ul>
      <p className="mt-4">
        De stijlnaam is geen garantie. Lees de volledige omschrijving en let op termen als{" "}
        <code>beginner-friendly</code>, <code>all levels</code>, <code>gentle</code>,{" "}
        <code>slow</code> en <code>restorative</code>.
      </p>
      <p className="mt-4">
        Wil je eerst de basis van beginnen, kleding en voorbereiding kennen? Lees dan{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-voor-beginners-in-amsterdam-oost-zo-start-je" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Yoga voor beginners in Amsterdam Oost: zo start je
        </Link>
        .
      </p>

      <h2
        id="rustige-yogavormen-vergeleken"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Vier rustige yogavormen vergeleken
      </h2>

      <h3 className="mt-8 font-display text-xl font-medium tracking-tight text-foreground">
        Rustige hatha yoga: bewegen met tijd voor uitleg
      </h3>
      <p className="mt-4">
        Hatha is vaak een logische start wanneer je houdingen wilt leren zonder een snel doorlopende
        reeks. Je blijft meestal lang genoeg om de opbouw te begrijpen en houdt toch beweging in de
        les.
      </p>
      <p className="mt-4">
        Let wel op de lesbeschrijving: hatha is een brede naam. De ene les is zacht en toegankelijk,
        de andere fysiek en stevig. Zoek als beginner naar duidelijke informatie over niveau, tempo
        en aangeboden variaties.
      </p>

      <h3 className="mt-8 font-display text-xl font-medium tracking-tight text-foreground">
        Yin yoga: weinig beweging, langere houdingen
      </h3>
      <p className="mt-4">
        Bij yin yoga blijf je doorgaans langer in zittende of liggende houdingen. Daardoor zijn er
        weinig overgangen en ontstaat er tijd om stil te worden. Yin kan passen wanneer je niet
        voortdurend instructies en nieuwe houdingen wilt volgen.
      </p>
      <p className="mt-4">
        Weinig beweging betekent niet automatisch weinig intensiteit. Een lange houding kan sterke
        sensaties geven. Je hoeft nooit zo diep mogelijk te gaan: gebruik ondersteuning en kom
        eerder uit een houding wanneer dat beter voelt.
      </p>

      <h3 className="mt-8 font-display text-xl font-medium tracking-tight text-foreground">
        Restorative yoga: maximaal ondersteund vertragen
      </h3>
      <p className="mt-4">
        Restorative yoga gebruikt vaak bolsters, dekens en blokken om het lichaam te ondersteunen.
        Houdingen vragen weinig actieve inspanning. Dit is meestal de zachtste keuze wanneer je
        vooral wilt uitrusten.
      </p>
      <p className="mt-4">
        Niet iedere studio biedt restorative lessen wekelijks aan. Controleer daarom het actuele
        rooster in plaats van ervan uit te gaan dat deze vorm altijd beschikbaar is.
      </p>

      <h3 className="mt-8 font-display text-xl font-medium tracking-tight text-foreground">
        Gentle of slow flow: rustig, maar wel doorbewegen
      </h3>
      <p className="mt-4">
        Een gentle of slow flow verbindt houdingen in een kalm tempo. Dit kan passen wanneer
        volledig stil zijn je onrustig maakt en je liever ontspant door rustig te bewegen.
      </p>
      <p className="mt-4">
        Voor een eerste les is het belangrijk dat de flow expliciet toegankelijk is voor beginners.{" "}
        <code>Slow</code> zegt iets over tempo, maar niet automatisch over moeilijkheid.
      </p>

      <ArticleFigure
        image={RUSTIGE_INLINE_IMAGE}
        caption="De stijlnaam geeft richting; tempo, uitleg en ondersteuning bepalen hoe rustig een les werkelijk voelt."
        className="mt-10"
      />

      <h2
        id="keuze-op-basis-van-behoefte"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Welke les past bij wat je nodig hebt?
      </h2>
      <p className="mt-4">Gebruik je belangrijkste behoefte als vertrekpunt:</p>
      <p className="mt-4">
        <strong className="font-medium text-foreground">
          Ik wil de basis leren en toch bewegen.
        </strong>{" "}
        Kies een rustige hatha-les of een andere beginnersles met stapsgewijze uitleg.
      </p>
      <p className="mt-4">
        <strong className="font-medium text-foreground">
          Ik wil vertragen en kan goed langere tijd stil zijn.
        </strong>{" "}
        Probeer yin, met de afspraak met jezelf dat je niet hoeft te forceren.
      </p>
      <p className="mt-4">
        <strong className="font-medium text-foreground">
          Ik ben moe en wil vooral ondersteund ontspannen.
        </strong>{" "}
        Kijk of er een restorative les beschikbaar is.
      </p>
      <p className="mt-4">
        <strong className="font-medium text-foreground">
          Ik word onrustig van lang stilzitten.
        </strong>{" "}
        Een gentle of slow flow kan beter passen: kalm bewegen zonder snel tempo.
      </p>
      <p className="mt-4">
        <strong className="font-medium text-foreground">Ik weet het echt nog niet.</strong> Kies de
        duidelijk beschreven beginnersles die op een haalbaar tijdstip valt.
      </p>

      <h2
        id="rustig-is-niet-altijd-makkelijk"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Rustig is niet altijd makkelijk
      </h2>
      <p className="mt-4">
        Rustig is niet automatisch eenvoudig. Lang stil zijn of aandacht bij je adem houden kan
        uitdagend zijn. Andersom kan een actievere les geschikt zijn wanneer de docent rustig
        uitlegt en meerdere opties geeft.
      </p>
      <p className="mt-4">
        Gebruik daarom niet <code>hoe zwaar was het?</code> als enige meetlat. Vraag jezelf na
        afloop ook af:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>kon ik de instructies volgen zonder voortdurend om me heen te kijken;</li>
        <li>voelde ik vrijheid om een eenvoudigere optie te kiezen;</li>
        <li>bleef mijn adem grotendeels rustig;</li>
        <li>voelde ik me welkom om te pauzeren;</li>
        <li>zou ik deze les op dit tijdstip opnieuw willen doen?</li>
      </ul>
      <p className="mt-4">
        Pijn is geen doel. Stop of pas aan wanneer een houding scherp of niet goed voelt. Bespreek
        relevante omstandigheden vooraf met de docent en vraag bij medische twijfel advies aan een
        gekwalificeerde zorgprofessional.
      </p>

      <h2
        id="lesbeschrijving-lezen"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zo lees je een lesbeschrijving
      </h2>
      <p className="mt-4">
        Een bruikbare lesbeschrijving vertelt meer dan alleen de stijlnaam. Zoek antwoord op deze
        vragen:
      </p>
      <ol className="mt-4 list-decimal space-y-2 pl-6">
        <li>Is de les geschikt voor beginners of alle niveaus?</li>
        <li>Beweeg je rustig door of blijf je langer in houdingen?</li>
        <li>Worden hulpmiddelen zoals blokken, bolsters of dekens gebruikt?</li>
        <li>Worden aanpassingen en rustopties aangeboden?</li>
        <li>Hoe lang duurt de les en past het tijdstip werkelijk in je week?</li>
      </ol>
      <p className="mt-4">
        Ontbreekt informatie, vraag dan vóór het boeken: &ldquo;Ik heb geen yoga-ervaring en zoek
        een rustig tempo met duidelijke uitleg; is deze les passend?&rdquo;
      </p>

      <h2
        id="eerste-les-kiezen"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zo kies je je eerste rustige les
      </h2>
      <p className="mt-4">Maak de keuze klein en praktisch:</p>
      <ol className="mt-4 list-decimal space-y-2 pl-6">
        <li>
          Bepaal of je vooral wilt <strong className="font-medium text-foreground">bewegen</strong>,{" "}
          <strong className="font-medium text-foreground">vertragen</strong> of{" "}
          <strong className="font-medium text-foreground">uitrusten</strong>.
        </li>
        <li>
          Selecteer in het{" "}
          <a
            href="/rooster"
            className="font-medium text-primary underline underline-offset-4 hover:no-underline"
          >
            actuele rooster
          </a>{" "}
          alleen tijden die je zonder haast kunt halen.
        </li>
        <li>Lees van die lessen de omschrijving en kies de duidelijkste beginnersoptie.</li>
        <li>Kom iets eerder en vertel de docent dat het je eerste les is.</li>
        <li>
          Beoordeel pas na afloop of je dezelfde les nog eens wilt proberen of juist een andere
          rustige vorm.
        </li>
      </ol>
      <p className="mt-4">
        Met een korte introductieperiode kun je tempo&rsquo;s en docenten vergelijken. Lees ook{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-proefles-of-introductiepas-wat-is-slimmer" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          of een proefles of introductiepas slimmer is
        </Link>
        .
      </p>

      <h2
        id="yoga-zeeburg"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Rustig beginnen bij Yoga Zeeburg
      </h2>
      <p className="mt-4">
        Yoga Zeeburg is een kleine, persoonlijke en beginnersvriendelijke yogastudio aan de
        Cruquiusweg 96F in Amsterdam Oost, boven CrossFit Zeeburg en vlak bij het water. Het aanbod
        bevat rustigere en actievere lessen; controleer altijd de{" "}
        <a
          href="/lessen"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          actuele lessen
        </a>{" "}
        en het rooster voor de huidige omschrijvingen en beschikbaarheid.
      </p>
      <p className="mt-4">
        Met de{" "}
        <a
          href="/trial"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          14-daagse Intro Pass
        </a>{" "}
        kunnen nieuwe studenten verschillende lessen, docenten en tijden proberen. De pas stopt
        automatisch. Ontdek zo bij welk tempo je uitleg kunt volgen en graag terugkomt.
      </p>

      <h2
        id="conclusie"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Conclusie
      </h2>
      <p className="mt-4">
        De beste rustige yoga voor beginners is meestal een hatha- of gentle-les met helder
        beschreven tempo, toegankelijke opbouw en bruikbare opties. Yin past wanneer je langere tijd
        stil wilt zijn; restorative wanneer je vooral volledig ondersteund wilt vertragen; een
        rustige flow wanneer kalm bewegen beter werkt dan stilzitten.
      </p>
      <p className="mt-4">
        De doorslag geeft niet de stijlnaam, maar hoe de les wordt gegeven. Kies een haalbaar
        moment, vertel dat je beginner bent en probeer zonder prestatiedruk. Na één of twee
        verschillende lessen weet je meestal veel beter wat <code>rustig</code> voor jou betekent.
      </p>
    </>
  );
}
