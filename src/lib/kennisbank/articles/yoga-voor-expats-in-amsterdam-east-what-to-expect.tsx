// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: yoga-voor-expats-in-amsterdam-east-what-to-expect

import { Link } from "@tanstack/react-router";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import expatsHeroAsset from "@/assets/yoga-expats-amsterdam-east-hoofdbeeld.webp.asset.json";
import expatsInlineAsset from "@/assets/yoga-expats-nieuw-thuis-amsterdam.webp.asset.json";
import { type Article, CATEGORY_AMSTERDAM_OOST } from "../article-types";

const EXPATS_HERO_IMAGE: ArticleImageRef = {
  url: expatsHeroAsset.url,
  alt: "Illustratie van een rustige Amsterdamse gracht met fiets, yogamat en reistas.",
  width: 1600,
  height: 900,
};

const EXPATS_INLINE_IMAGE: ArticleImageRef = {
  url: expatsInlineAsset.url,
  alt: "Illustratie van yogaprops en een verhuisdoos in een lichte woning in Amsterdam.",
  width: 1600,
  height: 900,
};

export const article: Article = {
  slug: "yoga-voor-expats-in-amsterdam-east-what-to-expect",
  title: "Yoga voor expats in Amsterdam East: what to expect",
  h1: "Yoga voor expats in Amsterdam East: what to expect",
  seoTitle: "Yoga voor expats in Amsterdam East: wat kun je verwachten?",
  description:
    "Nieuw in Amsterdam East en op zoek naar yoga? Lees wat je kunt verwachten van taal, lesniveau, boeken, voorbereiding en een eerste proefles.",
  intro:
    "Ben je nieuw in Amsterdam East en wil je yoga gebruiken om te bewegen, te ontspannen of mensen in je buurt te leren kennen? Dan helpt het om vooraf te weten hoe lessen, taal, boeken en proefmogelijkheden meestal zijn geregeld.",
  category: CATEGORY_AMSTERDAM_OOST,
  type: "local-guide",
  pillar: false,
  publishedAt: "2026-08-10",
  updatedAt: "2026-08-10",
  readingTimeMin: 7,
  toc: [
    {
      id: "is-nederlands-nodig-voor-een-yogales-in-amsterdam",
      label: "Is Nederlands nodig voor een yogales in Amsterdam?",
    },
    { id: "hoe-kies-je-een-eerste-les", label: "Hoe kies je een eerste les?" },
    {
      id: "wat-neem-je-mee-en-wat-trek-je-aan",
      label: "Wat neem je mee en wat trek je aan?",
    },
    {
      id: "hoe-werkt-boeken-en-betalen-meestal",
      label: "Hoe werkt boeken en betalen meestal?",
    },
    {
      id: "wat-kun-je-tijdens-de-eerste-les-verwachten",
      label: "Wat kun je tijdens de eerste les verwachten?",
    },
    {
      id: "kan-yoga-helpen-om-je-thuis-te-voelen-in-een-nieuwe-buurt",
      label: "Kan yoga helpen om je thuis te voelen in een nieuwe buurt?",
    },
    { id: "yoga-zeeburg-in-amsterdam-east", label: "Yoga Zeeburg in Amsterdam East" },
    { id: "een-goede-eerste-stap-voor-expats", label: "Een goede eerste stap voor expats" },
  ],
  faqs: [
    {
      question: "Worden yogalessen in Amsterdam East in het Engels gegeven?",
      answer:
        "Dat verschilt per studio, docent en les. Veel informatie en yogatermen zijn Engelstalig, maar neem niet aan dat iedere les volledig in het Engels is. Controleer de lesbeschrijving of vraag vooraf welke voertaal wordt gebruikt.",
    },
    {
      question: "Moet ik Nederlands spreken om bij Yoga Zeeburg mee te doen?",
      answer:
        "De website en lesbeschrijvingen van Yoga Zeeburg zijn in het Engels. Vraag voor een specifieke les vooraf welke taal de docent gebruikt en of belangrijke aanwijzingen in het Engels kunnen worden gegeven.",
    },
    {
      question: "Is yoga geschikt als ik nog nooit eerder yoga heb gedaan?",
      answer:
        "Ja. Kies een les die als beginner-friendly of all levels is beschreven, vertel de docent dat het je eerste les is en neem rust wanneer dat nodig is. Je hoeft houdingen niet perfect uit te voeren.",
    },
    {
      question: "Hoe vroeg moet ik voor mijn eerste les aanwezig zijn?",
      answer:
        "Vijf tot tien minuten extra is meestal praktisch. Je hebt dan tijd om de ingang te vinden, je spullen weg te leggen en kort kennis te maken met de docent zonder de start van de les te vertragen.",
    },
    {
      question: "Kan ik eerst meerdere lessen proberen voordat ik een lidmaatschap kies?",
      answer:
        "Ja. Een introductiepas is bedoeld om verschillende lessen, docenten en tijden te vergelijken. Zo ontdek je eerst wat qua stijl, taal, route en rooster werkt voordat je een langer abonnement kiest.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg — homepage en studio-informatie",
      url: "https://www.yogazeeburg.com/",
    },
    {
      title: "Yoga Zeeburg — lesbeschrijvingen",
      url: "https://www.yogazeeburg.com/lessen",
    },
    {
      title: "Yoga Zeeburg — regulier weekrooster",
      url: "https://www.yogazeeburg.com/rooster",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  heroImage: EXPATS_HERO_IMAGE,
  body: () => <ExpatsBody />,
};

function ExpatsBody() {
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
            Als expat kun je in Amsterdam East gemakkelijk met yoga beginnen, ook wanneer je nog
            weinig Nederlands spreekt. Veel studio-informatie en yogatermen zijn in het Engels
            beschikbaar, maar de voertaal kan per docent en les verschillen. Controleer daarom
            vooraf de lesbeschrijving en vraag bij twijfel welke taal wordt gebruikt. Je boekt
            meestal online, komt enkele minuten eerder en draagt comfortabele sportkleding. Kies een
            les die past bij je ervaring en gewenste intensiteit; een introductiepas is handig om
            meerdere docenten, lestijden en stijlen te vergelijken voordat je een vast ritme kiest.
          </p>
        </div>
      </section>

      <p className="mt-10">
        Ben je nieuw in Amsterdam East en wil je yoga gebruiken om te bewegen, te ontspannen of
        mensen in je buurt te leren kennen? Dan helpt het om vooraf te weten hoe lessen, taal,
        boeken en proefmogelijkheden meestal zijn geregeld. De praktische drempel is meestal laag,
        maar niet iedere studio of les werkt precies hetzelfde.
      </p>

      <h2
        id="is-nederlands-nodig-voor-een-yogales-in-amsterdam"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Is Nederlands nodig voor een yogales in Amsterdam?
      </h2>
      <p className="mt-4">
        Nee, goed Nederlands spreken is niet altijd nodig. Amsterdam heeft een grote internationale
        gemeenschap en veel deelnemers, docenten en studio’s gebruiken Engels. Bovendien komen veel
        yogatermen uit het Engels of Sanskriet. Woorden als <em>vinyasa</em>, <em>child’s pose</em>{" "}
        en <em>savasana</em> klinken daardoor mogelijk al vertrouwd.
      </p>
      <p className="mt-4">
        Toch is het verstandig om niet automatisch aan te nemen dat iedere les volledig Engelstalig
        is. De voertaal kan per docent, tijdstip en groep verschillen. Vraag vooraf welke taal
        hoofdzakelijk wordt gebruikt en of belangrijke aanwijzingen kort in het Engels kunnen worden
        herhaald. Zeker als beginner is helder begrijpen wat je moet doen belangrijker dan het label
        Nederlands of Engels.
      </p>
      <p className="mt-4">
        Meer nuance vind je in{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "nederlandse-of-engelse-yogales-in-amsterdam-wat-past-bij-jou" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Nederlandse of Engelse yogales in Amsterdam: wat past bij jou?
        </Link>
        .
      </p>

      <h2
        id="hoe-kies-je-een-eerste-les"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Hoe kies je een eerste les?
      </h2>
      <p className="mt-4">
        Begin met wat je op dit moment nodig hebt. Wil je na een drukke werkdag vertragen, zoek dan
        een rustige, herstellende les. Wil je bewegen en energie opbouwen, kijk dan naar een flow-
        of actievere les. De naam alleen vertelt niet altijd genoeg. Lees ook het tempo, aanbevolen
        ervaringsniveau en de volledige beschrijving.
      </p>
      <p className="mt-4">
        Bij Yoga Zeeburg vind je op de Engelse website beschrijvingen van rustige, gebalanceerde en
        actievere lessen. Het{" "}
        <Link
          to="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          reguliere weekrooster
        </Link>{" "}
        laat zien op welke dagen en tijden ze staan. Voor actuele wijzigingen, vrije plekken en
        reserveringen is het boekingssysteem leidend.
      </p>
      <p className="mt-4">
        Ben je nieuw met yoga? Kies dan bij voorkeur een les die expliciet als beginner-friendly of
        all levels wordt omschreven. Een sterkere flow kan prima passen als je al ervaring hebt,
        maar is minder logisch wanneer je nog vertrouwd moet raken met houdingen en overgangen.
      </p>

      <h2
        id="wat-neem-je-mee-en-wat-trek-je-aan"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat neem je mee en wat trek je aan?
      </h2>
      <p className="mt-4">
        Je hebt geen speciale outfit nodig. Draag kleding waarin je vrij kunt bewegen en waarin je
        je comfortabel voelt bij buigen, zitten en liggen. Vermijd bij voorkeur dikke, stijve
        kleding. Neem water mee als je dat prettig vindt en controleer vooraf of de studio matten en
        andere hulpmiddelen beschikbaar stelt of dat je zelf een mat moet meenemen.
      </p>
      <p className="mt-4">
        Eet liever geen grote maaltijd vlak vóór de les. Plan daarnaast genoeg tijd om zonder haast
        aan te komen. Voor een eerste bezoek is vijf tot tien minuten extra praktisch: je vindt
        rustig de ingang, kunt je spullen wegleggen en hebt tijd om de docent iets te vragen.
      </p>

      <h2
        id="hoe-werkt-boeken-en-betalen-meestal"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Hoe werkt boeken en betalen meestal?
      </h2>
      <p className="mt-4">
        Veel studio’s in Amsterdam werken met een online reserveringssysteem. Je maakt een account
        aan, kiest een losse les, proefaanbod of lidmaatschap en reserveert vervolgens je plek.
        Controleer de annuleringsvoorwaarden; bij een late annulering kan een les soms toch worden
        afgeschreven.
      </p>
      <p className="mt-4">
        Kijk niet alleen naar de prijs van één les. Een introductieaanbod geeft vaak een beter
        beeld, omdat je verschillende momenten en docenten kunt proberen. Daarna kun je bepalen of
        een losse kaart of abonnement bij je verwachte ritme past. In{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "wat-kost-yoga-in-amsterdam-en-waar-betaal-je-voor" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Wat kost yoga in Amsterdam en waar betaal je voor?
        </Link>{" "}
        lees je welke onderdelen je kunt vergelijken.
      </p>

      <ArticleFigure
        image={EXPATS_INLINE_IMAGE}
        caption="Een vaste yogales kan snel een vertrouwd moment in je nieuwe week worden."
        className="mt-10"
      />

      <h2
        id="wat-kun-je-tijdens-de-eerste-les-verwachten"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat kun je tijdens de eerste les verwachten?
      </h2>
      <p className="mt-4">
        Een les begint meestal met kort landen en aandacht voor de adem. Daarna volgt beweging,
        langere houdingen of een combinatie daarvan, afhankelijk van de lesstijl. Veel lessen
        eindigen met een rustige eindontspanning. Je hoeft houdingen niet perfect uit te voeren en
        je hoeft niemand bij te houden.
      </p>
      <p className="mt-4">
        Vertel de docent vóór de les dat het je eerste bezoek is. Meld ook wanneer je een instructie
        niet begrijpt of ergens rekening mee wilt houden. Je mag altijd een houding overslaan, een
        rusthouding nemen of een variant kiezen. Kijk gerust naar de docent of andere deelnemers
        wanneer de naam van een houding nieuw is, maar forceer geen beweging omdat de rest van de
        groep doorgaat.
      </p>
      <p className="mt-4">
        Een uitgebreider stappenplan staat in{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Proefles yoga in Amsterdam Oost: wat kun je verwachten?
        </Link>
        .
      </p>

      <h2
        id="kan-yoga-helpen-om-je-thuis-te-voelen-in-een-nieuwe-buurt"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Kan yoga helpen om je thuis te voelen in een nieuwe buurt?
      </h2>
      <p className="mt-4">
        Een vaste les kan een herkenbaar moment in je week worden. Je ziet regelmatig dezelfde
        docent en soms dezelfde deelnemers, zonder dat je direct sociaal hoeft te presteren. Dat
        maakt yoga een laagdrempelige manier om routine op te bouwen in een nieuwe stad.
      </p>
      <p className="mt-4">
        Verwacht niet dat één bezoek meteen een volledige community oplevert. Contact ontstaat
        meestal door vaker op hetzelfde moment te komen, vóór of na de les kort een gesprek te
        voeren en een plek te kiezen waar de sfeer bij je past. Een kleine buurtstudio kan prettig
        zijn als je waarde hecht aan herkenning en persoonlijk contact; een grotere studio biedt
        mogelijk meer tijden en stijlen.
      </p>
      <section
        aria-labelledby="contextuele-cta-heading"
        className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8"
      >
        <h3
          id="contextuele-cta-heading"
          className="font-display text-lg font-medium tracking-tight text-foreground"
        >
          Wil je verschillende lessen rustig vergelijken?
        </h3>
        <p className="mt-3 text-foreground">
          Met de 14-daagse introductiepas van Yoga Zeeburg kun je meerdere lessen, docenten en
          tijden proberen. Zo merk je welke les je begrijpt, welke route werkt en waar je je welkom
          voelt.{" "}
          <a
            href="/trial"
            className="font-medium text-primary underline underline-offset-4 hover:no-underline"
          >
            Bekijk de introductiepas
          </a>
          .
        </p>
      </section>

      <h2
        id="yoga-zeeburg-in-amsterdam-east"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Yoga Zeeburg in Amsterdam East
      </h2>
      <p className="mt-4">
        Yoga Zeeburg is een kleine, persoonlijke yogastudio aan de Cruquiusweg 96F, boven CrossFit
        Zeeburg en vlak bij het water. De website en lesbeschrijvingen zijn in het Engels. Voor de
        voertaal van een specifieke les kun je vooraf navraag doen, zodat je weet wat je kunt
        verwachten.
      </p>
      <p className="mt-4">
        Het reguliere rooster bevat rustige én actievere lessen, met duidelijke informatie over
        tempo en ervaringsniveau. De studio omschrijft zichzelf als down-to-earth, beginner-friendly
        en niet-prestatiegericht. Controleer vóór het boeken altijd de actuele beschikbaarheid.
      </p>

      <h2
        id="een-goede-eerste-stap-voor-expats"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Een goede eerste stap voor expats
      </h2>
      <p className="mt-4">
        Voor yoga als expat in Amsterdam East heb je geen perfect Nederlands, ervaring of speciale
        uitrusting nodig. Kies een les die qua taal, niveau, tijd en route logisch voelt, stel
        vooraf één of twee praktische vragen en ga het ervaren.
      </p>
      <p className="mt-4">
        Beoordeel na de les drie dingen: kon je de instructies volgen, voelde je je op je gemak en
        past dit moment in je echte week? Als die basis klopt, is de kans groter dat yoga niet bij
        één proefles blijft maar een vertrouwd onderdeel van je leven in Amsterdam wordt.
      </p>
    </>
  );
}
