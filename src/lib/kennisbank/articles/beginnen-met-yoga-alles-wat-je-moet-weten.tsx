// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: beginnen-met-yoga-alles-wat-je-moet-weten

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import beginnenHeroAsset from "@/assets/beginnen-met-yoga-hero.webp.asset.json";
import beginnenInlineAsset from "@/assets/beginnen-met-yoga-eerste-stappen.webp.asset.json";
import { type Article, CATEGORY_BEGINNEN_MET_YOGA } from "../article-types";

const BEGINNEN_HERO_IMAGE: ArticleImageRef = {
  url: beginnenHeroAsset.url,
  alt: "Een lege yogamat met blokken, deken en riem in een rustige lichte ruimte, klaar voor een eerste yogales.",
  width: 1536,
  height: 1024,
};

const BEGINNEN_INLINE_IMAGE: ArticleImageRef = {
  url: beginnenInlineAsset.url,
  alt: "Een opgerolde yogamat, twee blokken, een deken, yogariem en waterfles voor een eerste yogales.",
  width: 1536,
  height: 1024,
};

export const article: Article = {
  slug: "beginnen-met-yoga-alles-wat-je-moet-weten",
  title: "Beginnen met yoga: alles wat je moet weten",
  h1: "Beginnen met yoga: alles wat je moet weten",
  seoTitle: "Beginnen met yoga: complete gids | Yoga Zeeburg",
  description:
    "Beginnen met yoga? Lees wat je nodig hebt, hoe je een les kiest, wat je kunt verwachten en hoe je rustig een routine opbouwt.",
  intro:
    "Beginnen met yoga hoeft niet ingewikkeld te zijn. Je hoeft niet lenig, sterk of rustig te zijn voordat je een les binnenstapt. Kies een les waarvan tempo en niveau bij je passen, vertel de docent dat je nieuw bent en geef jezelf twee of drie lessen om te wennen. Comfortabele kleding is genoeg; hulpmiddelen en aanpassingen horen gewoon bij yoga.",
  category: CATEGORY_BEGINNEN_MET_YOGA,
  type: "how-to",
  pillar: true,
  publishedAt: "2026-08-31",
  updatedAt: "2026-08-31",
  readingTimeMin: 11,
  toc: [
    { id: "kort-antwoord", label: "Kort antwoord" },
    { id: "wat-is-yoga", label: "Wat is yoga eigenlijk?" },
    { id: "wat-heb-je-nodig", label: "Begin bij wat je nodig hebt" },
    { id: "welke-stijl", label: "Welke yogastijl past bij een beginner?" },
    { id: "studio-en-docent", label: "Hoe kies je een goede studio en docent?" },
    { id: "eerste-les-benodigdheden", label: "Wat heb je nodig voor je eerste yogales?" },
    { id: "verloop-eerste-les", label: "Zo verloopt je eerste les" },
    { id: "niet-lenig-of-fit", label: "Wat als je niet lenig of fit bent?" },
    { id: "veilig-oefenen", label: "Veilig oefenen en je grenzen herkennen" },
    { id: "vier-weken-plan", label: "Een eenvoudig plan voor je eerste vier weken" },
    { id: "past-yoga-bij-je", label: "Hoe weet je of yoga bij je past?" },
    { id: "beginnersfouten", label: "Veelgemaakte beginnersfouten" },
    { id: "amsterdam-oost", label: "Beginnen met yoga in Amsterdam Oost" },
    { id: "faq", label: "Veelgestelde vragen" },
  ],
  faqs: [
    {
      question: "Moet ik lenig zijn om met yoga te beginnen?",
      answer:
        "Nee. Lenigheid is geen voorwaarde. Je oefent binnen je huidige bewegingsbereik en kunt houdingen aanpassen met blokken, een riem, deken of een kleinere beweging.",
    },
    {
      question: "Welke yogastijl is het beste voor beginners?",
      answer:
        "Er is niet één beste stijl. Een rustig opgebouwde Hatha, toegankelijke Flow of ondersteunende rustige les kan allemaal passen. Kies op basis van je doel, het beschreven niveau en het tempo, niet alleen op de naam van de stijl.",
    },
    {
      question: "Hoe vaak per week moet je als beginner yoga doen?",
      answer:
        "Eén of twee lessen per week is voor veel beginners een haalbare start. Een ritme dat in je gewone week past is belangrijker dan snel veel lessen volgen. Houd rekening met herstel en andere sport of belasting.",
    },
    {
      question: "Wat trek je aan naar je eerste yogales?",
      answer:
        "Draag comfortabele kleding waarin je vrij kunt bewegen. Yoga wordt meestal op blote voeten gedaan. Een extra laagje voor de eindontspanning kan prettig zijn.",
    },
    {
      question: "Kan ik beginnen met yoga als ik een blessure heb of zwanger ben?",
      answer:
        "Dat hangt af van je situatie. Informeer de docent vooraf en overleg bij twijfel met een arts, fysiotherapeut, verloskundige of andere passende zorgverlener. Een groepsles vervangt geen individuele medische beoordeling.",
    },
  ],
  sources: [
    {
      title:
        "National Center for Complementary and Integrative Health — Yoga: Effectiveness and Safety",
      url: "https://www.nccih.nih.gov/health/yoga-effectiveness-and-safety",
    },
    {
      title: "Yoga Zeeburg — Yogalessen Amsterdam Oost",
      url: "https://www.yogazeeburg.com/lessen",
    },
    { title: "Yoga Zeeburg — Actueel rooster", url: "https://www.yogazeeburg.com/rooster" },
    {
      title: "Yoga Zeeburg — 14 dagen onbeperkte introductiepas",
      url: "https://www.yogazeeburg.com/trial",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  heroImage: BEGINNEN_HERO_IMAGE,
  body: () => <BeginnenMetYogaBody />,
};

function BeginnenMetYogaBody() {
  return (
    <>
      <h2
        id="kort-antwoord"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Kort antwoord
      </h2>
      <p className="mt-4">
        Als je wilt beginnen met yoga, kies dan eerst een toegankelijke les die past bij wat je nu
        zoekt: rust, mobiliteit, kracht of een combinatie daarvan. Lees de lesomschrijving, kom
        ongeveer tien minuten eerder en vertel de docent dat het je eerste keer is. Tijdens de les
        mag je altijd een houding aanpassen, overslaan of rust nemen.
      </p>
      <p className="mt-4">
        Je hebt geen ervaring, bijzondere lenigheid of dure uitrusting nodig. Comfortabele kleding
        waarin je vrij kunt bewegen is meestal voldoende. Geef jezelf niet na één les al een
        definitief oordeel. Door twee of drie lessen, docenten of tijdstippen te vergelijken, ontdek
        je veel beter welke vorm van yoga in jouw gewone week werkt.
      </p>

      <h2
        id="wat-is-yoga"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat is yoga eigenlijk?
      </h2>
      <p className="mt-4">
        Yoga is geen enkele vaste workout. Het is een verzamelnaam voor uiteenlopende vormen waarin
        lichaamshoudingen, beweging, adem en aandacht worden gecombineerd. Sommige lessen zijn rustig
        en werken met langer aangehouden houdingen. Andere zijn vloeiender en fysiek actiever. De
        precieze ervaring hangt af van de stijl, docent, groep en opbouw van de les.
      </p>
      <p className="mt-4">
        Dat brede aanbod is prettig, maar kan aan het begin verwarrend zijn. Namen als Hatha,
        Vinyasa, Yin en Restorative vertellen iets over de richting, niet alles over de daadwerkelijke
        intensiteit. Een rustige Vinyasa kan toegankelijker zijn dan een stevige Hatha. Kijk daarom
        altijd naar de beschrijving van de specifieke les en naar het aangegeven niveau.
      </p>
      <p className="mt-4">
        Yoga kan bijdragen aan algemeen welzijn, beweging, balans en ontspanning. Het is echter geen
        wondermiddel en vervangt geen medische behandeling. Een haalbaar eerste doel is eenvoudiger:
        leren voelen hoe je lichaam vandaag beweegt en ontdekken welke les je graag nog eens volgt.
      </p>

      <h2
        id="wat-heb-je-nodig"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Begin bij wat je nodig hebt
      </h2>
      <p className="mt-4">
        Veel beginners beginnen met de vraag: welke stijl moet ik kiezen? Een betere eerste vraag is:
        wat heb ik op dit moment nodig?
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>
          <strong>Meer rust:</strong> kies een les met een rustig tempo, duidelijke ondersteuning en
          tijd om houdingen te ervaren.
        </li>
        <li>
          <strong>Soepeler bewegen:</strong> zoek een toegankelijke les die mobiliteit combineert met
          rustig opgebouwde houdingen.
        </li>
        <li>
          <strong>Kracht en energie:</strong> begin met een beginnersvriendelijke Flow, Vinyasa of
          actieve Hatha waarin opties worden aangeboden.
        </li>
        <li>
          <strong>Herstel naast sport of druk werk:</strong> kies een les die niet nóg een
          prestatiemoment wordt, maar je belasting aanvult.
        </li>
        <li>
          <strong>Een vast moment voor jezelf:</strong> laat het rooster en de reistijd meewegen. De
          beste les is ook een les waar je regelmatig kunt komen.
        </li>
      </ul>
      <p className="mt-4">
        Je doel hoeft niet definitief te zijn. Op een drukke woensdag kan een rustige les passen,
        terwijl je in het weekend meer zin hebt in beweging. Variëren is geen teken dat je verkeerd
        kiest; het is juist een manier om yoga aan je leven te laten aansluiten.
      </p>

      <h2
        id="welke-stijl"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Welke yogastijl past bij een beginner?
      </h2>
      <p className="mt-4">
        Er bestaat niet één beste beginnersstijl. Wel zijn er richtingen die je keuze makkelijker
        maken.
      </p>
      <p className="mt-4">
        <strong>Hatha</strong> wordt vaak rustig opgebouwd en geeft relatief veel tijd om
        afzonderlijke houdingen te begrijpen. Dat kan prettig zijn wanneer instructies en techniek
        nieuw zijn.
      </p>
      <p className="mt-4">
        <strong>Vinyasa of Flow</strong> verbindt houdingen in een bewegende reeks. Kies als beginner
        een toegankelijke variant met herhaling en voldoende uitleg. Een snelle of gevorderde flow kan
        onnodig overweldigend zijn, ook wanneer je al sportief bent.
      </p>
      <p className="mt-4">
        <strong>Yin</strong> gebruikt vooral zittende en liggende houdingen die langer worden
        aangehouden. De les voelt minder dynamisch, maar de duur en sensatie kunnen nog steeds intens
        zijn. Minder beweging betekent dus niet automatisch makkelijker.
      </p>
      <p className="mt-4">
        <strong>Restorative of zeer rustige yoga</strong> gebruikt veel ondersteuning en is gericht op
        vertragen. Dit kan passen wanneer je veel spanning ervaart of bewust een kalme start zoekt.
      </p>
      <p className="mt-4">
        Wil je stijlen uitgebreider naast elkaar leggen? Gebruik dan de keuzehulp{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "welke-yogastijl-past-bij-mij" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Welke yogastijl past bij mij?
        </Link>
        . Zoek je juist beweging, lees dan{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "actieve-yoga-voor-beginners-waar-begin-je" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Actieve yoga voor beginners: waar begin je?
        </Link>
        . Voor een kalmere ingang is{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "rustige-yoga-voor-beginners-welke-les-past-het-beste" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Rustige yoga voor beginners
        </Link>{" "}
        de logischere verdieping.
      </p>

      <h2
        id="studio-en-docent"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Hoe kies je een goede studio en docent?
      </h2>
      <p className="mt-4">
        Een stijl kan goed bij je passen en een specifieke les toch niet. De kwaliteit van de
        begeleiding en de sfeer bepalen minstens zoveel. Een bruikbare lesomschrijving noemt tempo,
        niveau en focus. Tijdens de les geeft de docent heldere aanwijzingen, biedt variaties aan en
        respecteert het wanneer je een houding niet doet.
      </p>
      <p className="mt-4">
        Let ook op praktische zaken. Kun je gemakkelijk boeken? Zijn prijzen en voorwaarden duidelijk?
        Past de locatie in je werk- of gezinsritme? Voel je je welkom zonder dat je iets hoeft te
        bewijzen? Een mooie ruimte is fijn, maar een studio wordt pas bruikbaar wanneer begeleiding,
        bereikbaarheid en rooster samen kloppen.
      </p>
      <p className="mt-4">
        Voor een concrete checklist lees je{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "hoe-herken-je-een-goede-yogastudio-kwaliteitskenmerken" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Hoe herken je een goede yogastudio? 9 kwaliteitskenmerken
        </Link>
        . Wil je een studio echt beoordelen, probeer dan bij voorkeur meer dan één docent of
        lesmoment.
      </p>

      <h2
        id="eerste-les-benodigdheden"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat heb je nodig voor je eerste yogales?
      </h2>
      <p className="mt-4">Voor je eerste les heb je verrassend weinig nodig:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>draag kleding waarin je kunt bukken, strekken en zitten zonder afleiding;</li>
        <li>neem eventueel een extra laagje mee voor de eindontspanning;</li>
        <li>kom niet direct na een zware maaltijd;</li>
        <li>neem water mee als je dat prettig vindt;</li>
        <li>
          controleer vooraf of de studio matten en hulpmiddelen heeft of dat je zelf een mat
          meeneemt;
        </li>
        <li>plan tien tot vijftien minuten extra voor aankomst en omkleden.</li>
      </ul>
      <p className="mt-4">
        Blokken, een riem, bolster en deken zijn geen spullen voor mensen die iets niet kunnen. Ze
        verkleinen afstanden, geven ondersteuning en helpen je een houding passend te maken. Gebruik
        ze wanneer dat prettiger of stabieler voelt.
      </p>

      <ArticleFigure
        image={BEGINNEN_INLINE_IMAGE}
        caption="Voor een eerste les heb je vooral comfortabele kleding en aandacht nodig; hulpmiddelen maken oefenen toegankelijker."
        className="mt-10"
      />

      <p className="mt-4">
        Vertel de docent vóór de les over een relevante blessure, zwangerschap, recente operatie of
        andere beperking. Doe dat kort en concreet. De docent kan vaak algemene variaties aanbieden,
        maar kan geen individuele medische beoordeling geven.
      </p>

      <h2
        id="verloop-eerste-les"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zo verloopt je eerste les
      </h2>
      <p className="mt-4">
        Een eerste yogales begint meestal rustig. Je meldt je bij de docent, kiest een plek en legt je
        mat klaar. De opening kan zittend, liggend of staand zijn, vaak met aandacht voor adem en hoe
        je lichaam op dat moment voelt.
      </p>
      <p className="mt-4">
        Daarna volgt een opbouw van houdingen of bewegingen. De docent demonstreert niet
        noodzakelijk alles, maar geeft mondelinge aanwijzingen en opties. Kijk gerust om je heen als
        je de richting kwijt bent, zonder de persoon naast je als maatstaf te gebruiken. Andere
        deelnemers hebben een ander lichaam en mogelijk veel meer ervaring.
      </p>
      <p className="mt-4">
        Aan het einde volgt vaak een rustmoment, meestal liggend op de rug. Na de les ruim je
        hulpmiddelen op en kun je een korte vraag stellen. Het volledige verloop staat stap voor stap
        in{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "hoe-ziet-een-eerste-yogales-eruit" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Hoe ziet een eerste yogales eruit?
        </Link>
        .
      </p>

      <h2
        id="niet-lenig-of-fit"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat als je niet lenig of fit bent?
      </h2>
      <p className="mt-4">
        Lenigheid is geen toegangsbewijs voor yoga. Je komt juist oefenen met het lichaam dat je nu
        hebt. De vorm van een houding kan per persoon verschillen door botstructuur, bewegingsbereik,
        ervaring, vermoeidheid en eventuele klachten. Een kleinere beweging kan net zo aandachtig zijn
        als een grote.
      </p>
      <p className="mt-4">
        Ook conditie is geen algemene voorwaarde. In een actieve les kan je hartslag stijgen, terwijl
        een rustige les op een andere manier concentratie vraagt. Kies een niveau waarop je
        aanwijzingen kunt blijven volgen en je adem niet voortdurend hoeft vast te zetten.
      </p>
      <p className="mt-4">
        Kom je alleen? Dat is normaal. Een yogales is een gezamenlijke activiteit, maar geen sociale
        test. Je hoeft niemand te kennen en je hoeft na afloop niet te blijven praten. Voor veel
        mensen is juist die zelfstandigheid prettig.
      </p>

      <h2
        id="veilig-oefenen"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Veilig oefenen en je grenzen herkennen
      </h2>
      <p className="mt-4">
        Yoga geldt voor gezonde mensen doorgaans als een veilige vorm van bewegen wanneer de
        oefeningen passend worden uitgevoerd en goed worden begeleid. Net als bij andere
        bewegingsvormen kunnen blessures voorkomen. De meest gemelde yogablessures zijn verrekkingen
        en verstuikingen; ernstige blessures zijn zeldzaam.
      </p>
      <p className="mt-4">
        Inspanning, spierwerk of een duidelijke reksensatie kunnen bij oefenen horen. Scherpe,
        stekende of plotselinge pijn is een signaal om direct uit de houding te komen. Stop ook bij
        duizeligheid, misselijkheid, gevoelloosheid of een onveilig gevoel. Rust nemen is onderdeel
        van de les, niet het mislukken ervan.
      </p>
      <p className="mt-4">
        Bij zwangerschap, een blessure, herstel na een operatie of een medische aandoening kan extra
        afstemming nodig zijn. Overleg bij twijfel met een arts, fysiotherapeut, verloskundige of
        andere passende zorgverlener en informeer de docent. Een groepsles is geen vervanging voor
        diagnose of behandeling.
      </p>

      <h2
        id="vier-weken-plan"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Een eenvoudig plan voor je eerste vier weken
      </h2>
      <p className="mt-4">
        Je hoeft niet dagelijks yoga te doen om te beginnen. Een klein ritme dat je volhoudt is
        waardevoller dan een enthousiast schema dat na tien dagen verdwijnt.
      </p>
      <p className="mt-4">
        <strong>Week 1: oriënteren.</strong> Kies één toegankelijke les. Je enige opdracht is
        aankomen, luisteren en opmerken hoe tempo en begeleiding voelen.
      </p>
      <p className="mt-4">
        <strong>Week 2: één verschil testen.</strong> Herhaal dezelfde les als die redelijk paste, of
        verander bewust één factor: bijvoorbeeld rustiger tempo, andere docent of ander tijdstip.
        Verander niet alles tegelijk; dan weet je beter waardoor je ervaring verandert.
      </p>
      <p className="mt-4">
        <strong>Week 3: herkennen.</strong> In een tweede of derde les worden houdingen en woorden al
        bekender. Let minder op hoe het eruitziet en meer op adem, controle en herstel.
      </p>
      <p className="mt-4">
        <strong>Week 4: een werkelijk ritme kiezen.</strong> Bepaal welk moment je ook tijdens een
        drukke week kunt halen. Voor veel beginners is één of twee lessen per week een realistische
        start. Meer is niet automatisch beter; herstel en andere belasting tellen mee.
      </p>
      <p className="mt-4">
        Een introductieperiode is nuttig omdat je kunt vergelijken voordat je een langer abonnement
        kiest. Lees{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-proefles-of-introductiepas-wat-is-slimmer" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Yoga proefles of introductiepas: wat is slimmer?
        </Link>{" "}
        voor de afweging. Met de{" "}
        <a
          href="/trial"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          14-daagse introductiepas
        </a>{" "}
        van Yoga Zeeburg kun je verschillende lessen, docenten en tijden in je eigen week testen.
      </p>

      <h2
        id="past-yoga-bij-je"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Hoe weet je of yoga bij je past?
      </h2>
      <p className="mt-4">
        Beoordeel yoga niet alleen op hoe diep je kwam of hoeveel spierpijn je had. Stel na twee of
        drie lessen liever deze vragen:
      </p>
      <ol className="mt-4 list-decimal space-y-2 pl-6">
        <li>Kon ik de uitleg meestal volgen?</li>
        <li>Voelde ik me vrij om een houding aan te passen of over te slaan?</li>
        <li>Paste het tempo bij mijn energie en ervaring?</li>
        <li>Hoe voelde mijn lichaam later die dag en de volgende ochtend?</li>
        <li>Is de locatie en lestijd haalbaar in mijn gewone week?</li>
        <li>Heb ik nieuwsgierigheid of zin om nog eens terug te komen?</li>
      </ol>
      <p className="mt-4">
        Een les hoeft niet onmiddellijk vertrouwd te voelen. Nieuwe woorden, bewegingen en een
        onbekende ruimte vragen gewenning. Maar je hoort je wel gerespecteerd en veilig te voelen. Als
        de begeleiding onduidelijk is, grenzen worden genegeerd of je je onder druk gezet voelt, is
        het verstandig een andere docent of studio te proberen.
      </p>

      <h2
        id="beginnersfouten"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Veelgemaakte beginnersfouten
      </h2>
      <p className="mt-4">
        <strong>Wachten tot je leniger bent.</strong> Lenigheid is geen voorbereiding die je eerst
        elders moet afronden. Begin binnen je huidige bereik.
      </p>
      <p className="mt-4">
        <strong>De zwaarste les kiezen omdat je sportief bent.</strong> Conditie helpt, maar yoga
        vraagt ook nieuwe coördinatie en gewrichtsposities. Geef techniek tijd.
      </p>
      <p className="mt-4">
        <strong>De persoon naast je kopiëren.</strong> Gebruik anderen hooguit om de richting te zien.
        Hun bereik zegt niets over wat vandaag voor jou passend is.
      </p>
      <p className="mt-4">
        <strong>Pijn verwarren met vooruitgang.</strong> Meer sensatie is niet automatisch meer
        effect. Scherpe pijn is een stopsignaal.
      </p>
      <p className="mt-4">
        <strong>Na één les besluiten dat yoga niets voor je is.</strong> Soms past vooral die stijl,
        docent of lestijd niet. Vergelijk gericht voordat je een conclusie trekt.
      </p>
      <p className="mt-4">
        <strong>Meteen een perfect schema willen.</strong> Eén vast, haalbaar lesmoment kan een
        sterkere basis zijn dan vier ambitieuze trainingen die niet in je week passen.
      </p>

      <h2
        id="amsterdam-oost"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Beginnen met yoga in Amsterdam Oost
      </h2>
      <p className="mt-4">
        Woon of werk je in Amsterdam Oost, dan telt bereikbaarheid mee in je keuze. Yoga Zeeburg is
        een kleine, persoonlijke studio aan de Cruquiusweg 96F in Amsterdam Oost, boven CrossFit
        Zeeburg en bij het water. De benadering is nuchter: je hoeft niets te bewijzen en kunt
        ontdekken welk tempo, welke docent en welk moment bij je passen.
      </p>
      <p className="mt-4">
        Bekijk de{" "}
        <a
          href="/lessen"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          yogalessen bij Yoga Zeeburg
        </a>{" "}
        en controleer het{" "}
        <a
          href="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          actuele rooster
        </a>
        . Wil je niet na één losse ervaring beslissen, dan kun je met de 14-daagse introductiepas
        meerdere lessen en tijden proberen.
      </p>

      <section
        aria-labelledby="cta-beginnen-met-yoga"
        className="mt-14 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8"
      >
        <h2
          id="cta-beginnen-met-yoga"
          className="font-display text-2xl font-medium tracking-tight text-foreground"
        >
          Klaar om rustig te beginnen?
        </h2>
        <p className="mt-3">
          Probeer 14 dagen onbeperkt verschillende lessen, docenten en tijden bij Yoga Zeeburg in
          Amsterdam Oost.
        </p>
        <a
          href="/trial"
          className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Start je 14 dagen onbeperkt
        </a>
        <p className="mt-3 text-sm text-muted-foreground">
          Voor nieuwe studenten. Stopt automatisch.
        </p>
      </section>
    </>
  );
}
