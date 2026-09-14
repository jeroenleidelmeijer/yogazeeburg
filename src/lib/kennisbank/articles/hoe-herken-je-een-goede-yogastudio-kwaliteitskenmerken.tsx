// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: hoe-herken-je-een-goede-yogastudio-kwaliteitskenmerken

import { Link } from "@tanstack/react-router";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import goedeStudioHeroAsset from "@/assets/yoga-goede-yogastudio-hoofdbeeld.webp.asset.json";
import goedeStudioInlineAsset from "@/assets/yoga-goede-yogastudio-kwaliteitskenmerken.webp.asset.json";
import { type Article, CATEGORY_BEGINNEN_MET_YOGA } from "../article-types";

const GOEDE_STUDIO_HERO_IMAGE: ArticleImageRef = {
  url: goedeStudioHeroAsset.url,
  alt: "Rustige, verzorgde yogaruimte met twee lege matten, blokken, dekens en bolsters bij daglicht.",
  width: 1600,
  height: 900,
};

const GOEDE_STUDIO_INLINE_IMAGE: ArticleImageRef = {
  url: goedeStudioInlineAsset.url,
  alt: "Netjes opgeborgen yogablokken, dekens, riemen en bolsters naast een schone yogamat.",
  width: 1600,
  height: 900,
};

export const article: Article = {
  slug: "hoe-herken-je-een-goede-yogastudio-kwaliteitskenmerken",
  title: "Hoe herken je een goede yogastudio? 9 kwaliteitskenmerken",
  h1: "Hoe herken je een goede yogastudio? 9 kwaliteitskenmerken",
  seoTitle: "Goede yogastudio kiezen: 9 kwaliteitskenmerken | Yoga Zeeburg",
  description:
    "Hoe herken je een goede yogastudio? Check begeleiding, veiligheid, groepsgrootte, sfeer, voorwaarden en proefaanbod voordat je kiest.",
  intro:
    "Een mooie ruimte en een populaire Instagram-pagina zeggen weinig over de kwaliteit van een yogastudio. Een goede studio herken je vooral aan duidelijke begeleiding, respect voor grenzen, passende groepen, transparante informatie en een sfeer waarin je zonder prestatiedruk kunt oefenen.",
  category: CATEGORY_BEGINNEN_MET_YOGA,
  type: "how-to",
  pillar: false,
  publishedAt: "2026-08-17",
  updatedAt: "2026-08-17",
  readingTimeMin: 8,
  toc: [
    {
      id: "is-vooraf-duidelijk-voor-wie-de-lessen-bedoeld-zijn",
      label: "Is vooraf duidelijk voor wie de lessen bedoeld zijn?",
    },
    {
      id: "geven-docenten-heldere-uitleg-en-bruikbare-opties",
      label: "Geven docenten heldere uitleg en bruikbare opties?",
    },
    {
      id: "worden-grenzen-en-toestemming-serieus-genomen",
      label: "Worden grenzen en toestemming serieus genomen?",
    },
    {
      id: "past-de-groepsgrootte-bij-de-beloofde-begeleiding",
      label: "Past de groepsgrootte bij de beloofde begeleiding?",
    },
    {
      id: "zijn-de-ruimte-en-materialen-verzorgd",
      label: "Zijn de ruimte en materialen verzorgd?",
    },
    {
      id: "voelt-de-sfeer-toegankelijk-en-inclusief",
      label: "Voelt de sfeer toegankelijk en inclusief?",
    },
    {
      id: "zijn-rooster-en-locatie-in-de-praktijk-haalbaar",
      label: "Zijn rooster en locatie in de praktijk haalbaar?",
    },
    {
      id: "zijn-prijzen-en-voorwaarden-transparant",
      label: "Zijn prijzen en voorwaarden transparant?",
    },
    {
      id: "kun-je-de-studio-goed-testen-voordat-je-kiest",
      label: "Kun je de studio goed testen voordat je kiest?",
    },
    { id: "rode-vlaggen-bij-een-yogastudio", label: "Rode vlaggen bij een yogastudio" },
    {
      id: "zo-beoordeel-je-een-studio-tijdens-een-introductieperiode",
      label: "Zo beoordeel je een studio tijdens een introductieperiode",
    },
    {
      id: "wat-kun-je-bij-yoga-zeeburg-verwachten",
      label: "Wat kun je bij Yoga Zeeburg verwachten?",
    },
  ],
  faqs: [
    {
      question: "Hoeveel proeflessen heb je nodig om een yogastudio te beoordelen?",
      answer:
        "Drie tot vier lessen geven meestal een betrouwbaarder beeld dan één proefles. Probeer verschillende docenten en minimaal één tijdstip waarop je later structureel wilt komen.",
    },
    {
      question: "Moet een goede yogadocent geregistreerd zijn?",
      answer:
        "Registratie of een erkende opleiding kan relevante scholing aantonen, maar garandeert niet automatisch een goede les. Let ook op duidelijke uitleg, professionele grenzen, toestemming bij aanraking en het aanbieden van bruikbare variaties.",
    },
    {
      question: "Is een kleine yogastudio altijd beter?",
      answer:
        "Nee. Kleine groepen kunnen meer persoonlijke aandacht bieden, terwijl grotere studio’s vaak meer lestijden hebben. Belangrijk is dat groepsgrootte, ruimte en begeleiding passen bij wat de studio belooft en bij wat jij nodig hebt.",
    },
    {
      question: "Mag een yogadocent je zonder toestemming aanraken?",
      answer:
        "Een professionele docent vraagt vooraf toestemming voor fysieke aanpassingen en respecteert het wanneer je dat niet wilt. Je mag toestemming altijd weigeren of later intrekken.",
    },
    {
      question: "Waar let je vooral op als beginner?",
      answer:
        "Kies een les met een duidelijke beschrijving, een haalbaar tempo en opties voor verschillende niveaus. Vertel de docent dat je nieuw bent en controleer of je zonder prestatiedruk kunt rusten, aanpassen of een houding overslaan.",
    },
  ],
  sources: [
    {
      title: "Yoga Alliance — Teacher Resources",
      url: "https://yogaalliance.org/teacher-resources/",
    },
    {
      title: "Yoga Alliance — Standards for RYS Credentials",
      url: "https://yogaalliance.org/Standards-for-RYS-Credentials",
    },
    {
      title: "Yoga Zeeburg — homepage en studio-informatie",
      url: "https://www.yogazeeburg.com/",
    },
    {
      title: "Yoga Zeeburg — lesbeschrijvingen",
      url: "https://www.yogazeeburg.com/lessen",
    },
    {
      title: "Yoga Zeeburg — regulier rooster",
      url: "https://www.yogazeeburg.com/rooster",
    },
    {
      title: "Yoga Zeeburg — prijzen en voorwaarden",
      url: "https://www.yogazeeburg.com/prijzen",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  heroImage: GOEDE_STUDIO_HERO_IMAGE,
  body: () => <GoedeStudioBody />,
};

function GoedeStudioBody() {
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
            Een goede yogastudio heeft docenten die helder uitleggen, variaties aanbieden en
            toestemming vragen voor fysieke aanraking. Je kunt vooraf zien voor wie een les bedoeld
            is, wat een abonnement kost en welke voorwaarden gelden. De ruimte en materialen zijn
            verzorgd, de groepsgrootte past bij de beloofde begeleiding en je voelt je vrij om een
            houding aan te passen of over te slaan. Probeer bij voorkeur meerdere lessen en docenten
            voordat je beslist.
          </p>
        </div>
      </section>

      <p className="mt-10">
        Een mooie ruimte en een populaire Instagram-pagina zeggen weinig over de kwaliteit van een
        yogastudio. Een goede studio herken je vooral aan duidelijke begeleiding, respect voor
        grenzen, passende groepen, transparante informatie en een sfeer waarin je zonder
        prestatiedruk kunt oefenen.
      </p>

      <h2
        id="is-vooraf-duidelijk-voor-wie-de-lessen-bedoeld-zijn"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Is vooraf duidelijk voor wie de lessen bedoeld zijn?
      </h2>
      <p className="mt-4">
        Een goede yogastudio maakt vóór het boeken duidelijk wat je kunt verwachten. In een
        bruikbare lesbeschrijving lees je niet alleen de naam van de stijl, maar ook het tempo, het
        niveau, de belangrijkste accenten en voor wie de les geschikt is.
      </p>
      <p className="mt-4">
        Dat is belangrijk omdat dezelfde lesnaam per studio of docent anders kan worden ingevuld.
        Een flowles kan rustig en technisch zijn, maar ook snel en fysiek. Yin kan heel toegankelijk
        voelen, maar lange houdingen kunnen juist intens zijn. Woorden als ‘alle niveaus’ zijn pas
        waardevol wanneer de docent daadwerkelijk verschillende opties aanbiedt.
      </p>
      <p className="mt-4">
        Kun je online nauwelijks ontdekken wat een les inhoudt? Stel dan vóór je eerste bezoek een
        korte vraag. De manier waarop een studio antwoordt, geeft meteen informatie over de aandacht
        en duidelijkheid die je later kunt verwachten.
      </p>
      <p className="mt-4">
        Lees voor het verschil tussen persoonlijke voorkeur en algemene kwaliteit ook{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-in-amsterdam-oost-welke-yogastudio-past-bij-jou" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Yoga in Amsterdam Oost: welke yogastudio past bij jou?
        </Link>
        .
      </p>

      <h2
        id="geven-docenten-heldere-uitleg-en-bruikbare-opties"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Geven docenten heldere uitleg en bruikbare opties?
      </h2>
      <p className="mt-4">
        Een goede yogadocent laat je niet alleen zien wat je moet doen, maar legt begrijpelijk uit
        waar je naartoe werkt. Aanwijzingen zijn concreet, het tempo geeft je tijd om te reageren en
        er zijn opties wanneer een houding niet past.
      </p>
      <p className="mt-4">Let tijdens een proefles op deze signalen:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>de docent vraagt of iemand nieuw is of iets relevants wil melden;</li>
        <li>basisinstructies zijn ook zonder yoga-ervaring te volgen;</li>
        <li>eenvoudigere en intensievere varianten worden zonder oordeel aangeboden;</li>
        <li>rust nemen of een houding overslaan wordt normaal gevonden;</li>
        <li>de docent doet geen medische beloftes en blijft binnen de rol van yogadocent.</li>
      </ul>
      <p className="mt-4">
        Een diploma of registratie kan iets zeggen over gevolgde scholing, maar is nooit het enige
        bewijs van goed lesgeven. Ervaring, aandacht, communicatie en professioneel gedrag zie je
        vooral tijdens de les zelf.
      </p>

      <h2
        id="worden-grenzen-en-toestemming-serieus-genomen"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Worden grenzen en toestemming serieus genomen?
      </h2>
      <p className="mt-4">
        Fysieke correcties kunnen voor sommige deelnemers prettig zijn en voor anderen niet. Een
        professionele docent vraagt daarom toestemming voordat die je aanraakt en respecteert een
        ‘nee’ zonder discussie of zichtbare teleurstelling.
      </p>
      <p className="mt-4">
        Hetzelfde geldt breder. Je mag altijd een houding aanpassen, pauzeren of stoppen. Pijn,
        duizeligheid of een onveilig gevoel zijn geen signalen die je moet negeren om de groep bij
        te houden. Een studio hoeft je niet bang te maken, maar moet wel duidelijk maken dat jij
        zelf de regie houdt.
      </p>
      <p className="mt-4">
        Yoga Alliance noemt respectvolle, consent-based en veilige begeleiding expliciet als
        onderdeel van ethisch lesgeven. Ook zonder aansluiting bij die organisatie is dat een
        bruikbare professionele norm voor iedere studio.
      </p>

      <h2
        id="past-de-groepsgrootte-bij-de-beloofde-begeleiding"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Past de groepsgrootte bij de beloofde begeleiding?
      </h2>
      <p className="mt-4">
        Een grote les is niet automatisch slecht en een kleine les is niet automatisch goed. De
        vraag is of de groepsgrootte past bij wat de studio belooft.
      </p>
      <p className="mt-4">
        Wanneer persoonlijke aandacht centraal staat, moet de docent deelnemers kunnen zien en waar
        nodig kort kunnen helpen. In een grotere groep zijn heldere verbale aanwijzingen, voldoende
        ruimte en een logische opstelling extra belangrijk. Kijk tijdens je proefperiode daarom niet
        alleen naar een rustige daluurles, maar ook naar het tijdstip waarop je later werkelijk wilt
        komen.
      </p>
      <p className="mt-4">
        Let ook op de praktische organisatie: begint de les rustig, weet de docent wie nieuw is en
        voelt de ruimte beheersbaar wanneer de les vol zit? Dat zegt vaak meer dan het maximale
        aantal plekken op papier.
      </p>

      <h2
        id="zijn-de-ruimte-en-materialen-verzorgd"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zijn de ruimte en materialen verzorgd?
      </h2>
      <p className="mt-4">
        Een yogastudio hoeft niet luxe te zijn. Wel mag je verwachten dat de oefenruimte schoon,
        veilig en functioneel is. Matten liggen niet gevaarlijk dicht op elkaar, looproutes blijven
        vrij en materialen zijn heel en verzorgd.
      </p>
      <p className="mt-4">
        Blokken, riemen, dekens en bolsters zijn geen versiering. Ze helpen deelnemers om houdingen
        aan te passen en ondersteunen verschillende lichamen en ervaringsniveaus. Een studio die
        materialen beschikbaar heeft én docenten die uitleggen hoe je ze gebruikt, maakt
        toegankelijkheid praktisch.
      </p>
      <p className="mt-4">
        Ventilatie, temperatuur en geluidsniveau tellen eveneens mee. De perfecte ruimte bestaat
        niet, maar je moet je aandacht tijdens de les niet voortdurend kwijt zijn aan benauwdheid,
        rommel of onnodige afleiding.
      </p>

      <ArticleFigure
        image={GOEDE_STUDIO_INLINE_IMAGE}
        caption="Verzorgde materialen en voldoende ruimte zijn eenvoudige maar veelzeggende kwaliteitssignalen."
        className="mt-10"
      />

      <h2
        id="voelt-de-sfeer-toegankelijk-en-inclusief"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Voelt de sfeer toegankelijk en inclusief?
      </h2>
      <p className="mt-4">
        Je hoeft niet op iedereen in de groep te lijken om welkom te zijn. Een goede studio
        communiceert niet alsof yoga alleen bedoeld is voor jonge, lenige of ervaren mensen. De taal
        is uitnodigend, docenten vermijden vernederende opmerkingen en verschillen in lichaam,
        ervaring en achtergrond worden normaal behandeld.
      </p>
      <p className="mt-4">
        Let vooral op hoe je jezelf tijdens de les gedraagt. Durf je een eenvoudige optie te kiezen?
        Voel je ruimte om iets te vragen? Kun je even rusten zonder het gevoel dat je faalt? Een
        rustige inrichting is prettig, maar psychologische veiligheid wordt vooral door mensen en
        gedrag gemaakt.
      </p>

      <h2
        id="zijn-rooster-en-locatie-in-de-praktijk-haalbaar"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zijn rooster en locatie in de praktijk haalbaar?
      </h2>
      <p className="mt-4">
        Kwaliteit helpt weinig wanneer je de lessen structureel niet kunt halen. Controleer daarom
        vóór een abonnement of er meerdere tijden per week zijn die realistisch in jouw agenda
        passen. Houd rekening met reistijd, omkleden en wat er gebeurt wanneer je favoriete les een
        keer uitvalt.
      </p>
      <p className="mt-4">
        Een studio op een haalbare route vanaf huis of werk is vaak waardevoller dan een theoretisch
        perfecte studio waarvoor iedere les planning vraagt. Regelmaat ontstaat wanneer de
        praktische drempel laag genoeg is.
      </p>
      <p className="mt-4">
        Bekijk daarom altijd het{" "}
        <Link
          to="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          actuele rooster van Yoga Zeeburg
        </Link>{" "}
        in plaats van af te gaan op een algemene belofte over veel lessen.
      </p>

      <h2
        id="zijn-prijzen-en-voorwaarden-transparant"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zijn prijzen en voorwaarden transparant?
      </h2>
      <p className="mt-4">
        Je moet vóór aankoop kunnen begrijpen wat je koopt. Controleer de looptijd, opzegregels,
        geldigheid van rittenkaarten, reserveringsregels en eventuele kosten bij te laat annuleren.
        Een goede studio verstopt zulke informatie niet tot na de betaling.
      </p>
      <p className="mt-4">
        Vergelijk bovendien niet alleen de prijs per les op papier. Bereken welke optie past bij het
        aantal lessen dat je werkelijk gaat volgen. Een goedkoop abonnement dat slecht aansluit op
        je week kan uiteindelijk duurder zijn dan een heldere optie die je consequent gebruikt.
      </p>
      <p className="mt-4">
        Bekijk de{" "}
        <Link
          to="/prijzen"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          actuele prijzen en voorwaarden
        </Link>{" "}
        en stel een vraag wanneer iets niet duidelijk is. Een transparant antwoord vóór aankoop
        voorkomt onnodige frustratie achteraf.
      </p>

      <h2
        id="kun-je-de-studio-goed-testen-voordat-je-kiest"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Kun je de studio goed testen voordat je kiest?
      </h2>
      <p className="mt-4">
        Eén proefles laat vooral zien hoe die specifieke les, docent en dag aanvoelden. Een beter
        introductieaanbod geeft je genoeg tijd om meerdere docenten, stijlen en tijdstippen te
        proberen.
      </p>
      <p className="mt-4">Test bij voorkeur minimaal:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>één les op het tijdstip waarop je later meestal wilt komen;</li>
        <li>twee verschillende docenten;</li>
        <li>een rustigere en een actievere les wanneer beide je aanspreken;</li>
        <li>de reservering, aankomst en communicatie rondom de les.</li>
      </ul>
      <p className="mt-4">
        Zo beoordeel je niet alleen de lesinhoud, maar de hele ervaring. Lees ook{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          wat je tijdens een eerste yogales kunt verwachten
        </Link>
        .
      </p>

      <h2
        id="rode-vlaggen-bij-een-yogastudio"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Rode vlaggen bij een yogastudio
      </h2>
      <p className="mt-4">
        Geen enkele les verloopt perfect. Een combinatie van onderstaande signalen is wel reden om
        verder te kijken of eerst vragen te stellen:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>onduidelijke of ontbrekende informatie over niveau en intensiteit;</li>
        <li>fysieke aanraking zonder voorafgaande toestemming;</li>
        <li>pijn of grenzen worden weggewuifd;</li>
        <li>medische claims of garanties die een yogadocent niet kan waarmaken;</li>
        <li>prestatiedruk, vernederende opmerkingen of één ‘juiste’ vorm voor ieder lichaam;</li>
        <li>onduidelijke prijzen, looptijden of annuleringsvoorwaarden;</li>
        <li>zichtbaar beschadigde materialen of een onveilige, overvolle opstelling;</li>
        <li>
          je voelt je na meerdere bezoeken nog steeds niet vrij om vragen te stellen of opties te
          nemen.
        </li>
      </ul>
      <p className="mt-4">
        Eén minder prettige ervaring kan met een specifieke docent of drukke dag te maken hebben.
        Bespreek een concreet punt wanneer dat veilig voelt. De manier waarop de studio reageert, is
        opnieuw een kwaliteitssignaal.
      </p>

      <h2
        id="zo-beoordeel-je-een-studio-tijdens-een-introductieperiode"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zo beoordeel je een studio tijdens een introductieperiode
      </h2>
      <p className="mt-4">
        Maak je keuze niet alleen direct na de eindontspanning. Noteer na iedere les kort:
      </p>
      <ol className="mt-4 list-decimal space-y-2 pl-6">
        <li>Kon ik de instructies volgen zonder voortdurend naar anderen te kijken?</li>
        <li>Voelde ik ruimte om mijn eigen grens te respecteren?</li>
        <li>Paste het tijdstip inclusief reistijd werkelijk in mijn dag?</li>
        <li>Hoe voelde mijn lichaam en hoofd enkele uren later?</li>
        <li>Is de drempel om opnieuw te boeken laag?</li>
      </ol>
      <p className="mt-4">
        Na drie of vier lessen ontstaat meestal een betrouwbaarder beeld dan na één sterke eerste
        indruk. De beste studio is niet de plek met de meeste beloftes, maar de plek waar
        professionele kwaliteit en jouw dagelijkse praktijk samenkomen.
      </p>

      <section
        aria-labelledby="contextuele-cta-heading"
        className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8"
      >
        <h3
          id="contextuele-cta-heading"
          className="font-display text-lg font-medium tracking-tight text-foreground"
        >
          Ontdek welke lessen echt bij je passen
        </h3>
        <p className="mt-3 text-foreground">
          Probeer 14 dagen verschillende lessen, docenten en tijden bij Yoga Zeeburg. Zo maak je je
          keuze op ervaring, niet alleen op een eerste indruk.{" "}
          <a
            href="/trial"
            className="font-medium text-primary underline underline-offset-4 hover:no-underline"
          >
            Start met 14 dagen yoga
          </a>
          .
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Geen ervaring of lenigheid nodig. Kom zoals je bent.
        </p>
      </section>

      <h2
        id="wat-kun-je-bij-yoga-zeeburg-verwachten"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat kun je bij Yoga Zeeburg verwachten?
      </h2>
      <p className="mt-4">
        Yoga Zeeburg is een kleine, persoonlijke yogastudio aan de Cruquiusweg 96F in Amsterdam
        Oost, boven CrossFit Zeeburg. De aanpak is nuchter en toegankelijk: duidelijke lessen,
        verschillende tempo’s en ruimte om binnen je eigen mogelijkheden te oefenen.
      </p>
      <p className="mt-4">
        Met de{" "}
        <a
          href="/trial"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          14-daagse Intro Pass
        </a>{" "}
        kun je verschillende lessen, docenten en tijden proberen voordat je beslist. Gebruik die
        periode bewust: kom niet alleen op het makkelijkste moment, maar test het ritme dat je
        daarna werkelijk wilt volhouden.
      </p>
      <p className="mt-4">
        Bekijk vooraf de{" "}
        <Link
          to="/lessen"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          lesbeschrijvingen
        </Link>
        , kies enkele haalbare momenten in het{" "}
        <Link
          to="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          rooster
        </Link>{" "}
        en beoordeel daarna rustig of de begeleiding, sfeer en praktische organisatie bij je passen.
      </p>
    </>
  );
}
