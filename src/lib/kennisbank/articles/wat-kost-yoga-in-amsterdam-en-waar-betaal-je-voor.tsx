// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: wat-kost-yoga-in-amsterdam-en-waar-betaal-je-voor

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { type Article, CATEGORY_AMSTERDAM_OOST } from "../article-types";

export const article: Article = {
  slug: "wat-kost-yoga-in-amsterdam-en-waar-betaal-je-voor",
  title: "Wat kost yoga in Amsterdam en waar betaal je voor?",
  h1: "Wat kost yoga in Amsterdam en waar betaal je voor?",
  seoTitle: "Wat kost yoga in Amsterdam? Prijzen uitgelegd | Yoga Zeeburg",
  description:
    "Wat kost yoga in Amsterdam? Vergelijk een losse les, rittenkaart, abonnement en intro-aanbod en ontdek wat je werkelijk per yogales betaalt.",
  intro:
    "De prijs van yoga in Amsterdam lijkt eenvoudig, maar studio’s rekenen met losse lessen, rittenkaarten, abonnementen en introductieaanbiedingen. Daardoor zegt het totaalbedrag weinig zonder te kijken naar de prijs per gebruikte les en de voorwaarden. Deze gids laat zien waar je voor betaalt en hoe je eerlijk vergelijkt.",
  category: CATEGORY_AMSTERDAM_OOST,
  type: "local-guide",
  pillar: false,
  publishedAt: "2026-07-29",
  updatedAt: "2026-07-29",
  readingTimeMin: 8,
  toc: [
    { id: "kort-antwoord", label: "Kort antwoord" },
    { id: "prijsmodellen", label: "Welke prijsmodellen kom je tegen?" },
    { id: "prijs-per-les", label: "Wat betaal je per yogales in Amsterdam?" },
    { id: "waar-betaal-je-voor", label: "Waar betaal je eigenlijk voor?" },
    { id: "werkelijke-prijs", label: "Bereken de werkelijke prijs per gebruikte les" },
    { id: "voorwaarden", label: "Let op geldigheid, looptijd en opzeggen" },
    { id: "abonnement-goedkoper", label: "Wanneer is een abonnement goedkoper?" },
    { id: "prijzen-yoga-zeeburg", label: "De actuele prijzen van Yoga Zeeburg" },
    { id: "kiezen", label: "Zo kies je zonder te veel te betalen" },
    { id: "conclusie", label: "Conclusie" },
    { id: "faq", label: "Veelgestelde vragen" },
  ],
  faqs: [
    {
      question: "Wat kost een losse yogales in Amsterdam?",
      answer:
        "Dat verschilt per studio. Bij Yoga Zeeburg kost een losse groepsles op 29 juli 2026 €25. Rittenkaarten en abonnementen verlagen doorgaans de prijs per gebruikte les.",
    },
    {
      question: "Wat is goedkoper: een yogabonnement of een rittenkaart?",
      answer:
        "Een abonnement is meestal goedkoper wanneer je iedere week gaat en je lessen gebruikt. Een rittenkaart kost vaak meer per les, maar kan voordeliger uitpakken als je agenda wisselt en je anders abonnementlessen laat vervallen.",
    },
    {
      question: "Hoeveel kost yoga per maand?",
      answer:
        "Veel studio’s werken met maand- of vierweekse tarieven. Bij Yoga Zeeburg kosten reguliere abonnementen momenteel €49, €69 of €89 per vier weken, afhankelijk van het aantal lessen. Let erop dat dertien periodes van vier weken in één jaar passen.",
    },
    {
      question: "Is onbeperkt yoga goedkoper?",
      answer:
        "Alleen als je vaak genoeg gaat. Bij drie of vier lessen per week kan de prijs per les sterk dalen. Ga je maar één keer per week, dan is een kleiner abonnement meestal voordeliger.",
    },
    {
      question: "Wat kost yoga proberen bij Yoga Zeeburg?",
      answer:
        "De 14-Day Unlimited Intro Pass kost op 29 juli 2026 €30 eenmalig. Nieuwe studenten kunnen daarmee 14 opeenvolgende dagen onbeperkt lessen proberen; de pass stopt automatisch.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg — actuele prijzen en voorwaarden",
      url: "https://www.yogazeeburg.com/prijzen",
    },
    {
      title: "Thrive Yoga & Pilates Zeeburg — tarieven",
      url: "https://thriveyoga.nl/locatie/yoga-in-zeeburg/",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  body: () => <PrijzenBody />,
};

function PrijzenBody() {
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
            Yoga in Amsterdam kost bij actuele voorbeelden in Amsterdam Oost grofweg €8 tot €25 per
            les. De laagste lesprijs hoort meestal bij een abonnement en regelmatig bezoek; een
            losse les is het duurst. Bij Yoga Zeeburg kost een losse les momenteel €25, een
            10-lessenkaart €18 per les en een regulier abonnement ongeveer €8,63 tot €12,25 per les,
            afhankelijk van je ritme. Nieuwe studenten kunnen 14 dagen onbeperkt yoga proberen voor
            €30. Vergelijk daarom niet alleen het bedrag, maar ook geldigheid, opzegvoorwaarden en
            hoeveel lessen je werkelijk gaat volgen.
          </p>
        </div>
      </section>

      <h2
        id="prijsmodellen"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Welke prijsmodellen kom je tegen?
      </h2>
      <p className="mt-4">
        Yogastudio’s in Amsterdam gebruiken meestal vier prijsmodellen. Elk model verdeelt
        flexibiliteit en zekerheid anders tussen jou en de studio.
      </p>
      <ul className="mt-4 space-y-3 pl-5 [list-style-type:disc]">
        <li>
          <strong>Introductieaanbod.</strong> Een tijdelijke aanbieding voor nieuwe studenten
          waarmee je meerdere lessen, docenten en tijden kunt proberen.
        </li>
        <li>
          <strong>Losse les.</strong> Maximale vrijheid zonder vervolgverplichting, maar doorgaans
          de hoogste prijs per bezoek.
        </li>
        <li>
          <strong>Rittenkaart.</strong> Je koopt meerdere lessen vooraf en gebruikt ze binnen een
          vaste geldigheidsduur.
        </li>
        <li>
          <strong>Abonnement.</strong> Je betaalt periodiek voor een vast aantal lessen of
          onbeperkte toegang. Dit geeft meestal de laagste prijs per gebruikte les, maar vraagt meer
          regelmaat en vaak een minimale looptijd.
        </li>
      </ul>
      <p className="mt-4">
        De goedkoopste optie op papier is dus niet automatisch de beste keuze. Een voordelig
        abonnement wordt duur als je weinig gaat; een duurdere rittenkaart kan juist goedkoper
        uitpakken als je agenda vaak verandert.
      </p>

      <h2
        id="prijs-per-les"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat betaal je per yogales in Amsterdam?
      </h2>
      <p className="mt-4">
        Actuele gepubliceerde tarieven van studio’s in Amsterdam Oost laten een duidelijke
        bandbreedte zien. Op 29 juli 2026 kost een losse les bij Yoga Zeeburg €25. Een
        10-lessenkaart komt uit op €18 per les. De reguliere abonnementen kosten, afhankelijk van
        het gekozen ritme, ongeveer €8,63 tot €12,25 per les. Bij onbeperkt yoga daalt de effectieve
        lesprijs verder wanneer je drie of vier keer per week komt.
      </p>
      <p className="mt-4">
        Thrive Yoga publiceert voor rittenkaarten een bandbreedte van €14,25 tot €17 per les en voor
        maandabonnementen ongeveer €8 tot €13 per les. Dat ondersteunt een praktische Amsterdamse
        richtlijn: reken grofweg op €8 tot €25 per gevolgde groepsles, afhankelijk van
        flexibiliteit, frequentie en looptijd. Tarieven veranderen; controleer daarom altijd de
        actuele prijspagina voordat je koopt.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-2 pr-4 font-medium text-foreground">Optie</th>
              <th className="py-2 pr-4 font-medium text-foreground">Actueel voorbeeld</th>
              <th className="py-2 font-medium text-foreground">Past vooral bij</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-2 pr-4">Introductieaanbod</td>
              <td className="py-2 pr-4">€30 voor 14 dagen onbeperkt bij Yoga Zeeburg</td>
              <td className="py-2">Nieuwe studenten die meerdere lessen willen proberen</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4">Losse les</td>
              <td className="py-2 pr-4">€25 bij Yoga Zeeburg</td>
              <td className="py-2">Eenmalig bezoek of maximale vrijheid</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4">10-lessenkaart</td>
              <td className="py-2 pr-4">€180, dus €18 per les bij Yoga Zeeburg</td>
              <td className="py-2">Wisselende agenda zonder abonnement</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4">Regulier abonnement</td>
              <td className="py-2 pr-4">Circa €8,63–€12,25 per gebruikte les bij Yoga Zeeburg</td>
              <td className="py-2">Eén of twee vaste lessen per week</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">Onbeperkt abonnement</td>
              <td className="py-2 pr-4">Effectieve prijs daalt bij vaker komen</td>
              <td className="py-2">Drie of meer lessen per week</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4">
        Deze bedragen zijn momentopnamen van 29 juli 2026 en geen vaste marktprijzen voor heel
        Amsterdam.
      </p>

      <h2
        id="waar-betaal-je-voor"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Waar betaal je eigenlijk voor?
      </h2>
      <p className="mt-4">
        De prijs van een yogales bestaat uit meer dan de minuten op de mat. Een studio betaalt onder
        andere de huur van een geschikte ruimte, docenten, planning en boekingssoftware, schoonmaak,
        materialen, verzekeringen en administratie. In Amsterdam weegt huisvesting zwaar mee.
      </p>
      <p className="mt-4">
        Je betaalt daarnaast voor keuzes die minder zichtbaar zijn: groepsgrootte, persoonlijke
        aandacht, ervaring van de docent, bereikbaarheid, de variatie in het rooster en de rust van
        de ruimte. Een goedkope les op een onhandig tijdstip kan weinig waarde hebben. Een iets
        duurdere les vijf minuten fietsen van huis kan juist de optie zijn die je werkelijk
        volhoudt.
      </p>
      <p className="mt-4">
        Prijs en kwaliteit lopen niet automatisch gelijk. Een hogere prijs garandeert geen betere
        docent of fijnere sfeer. Gebruik prijs daarom als één criterium naast niveau, lesstijl,
        locatie, rooster en hoe welkom je je voelt.
      </p>

      <h2
        id="werkelijke-prijs"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Bereken de werkelijke prijs per gebruikte les
      </h2>
      <p className="mt-4">De eerlijkste vergelijking is eenvoudig:</p>
      <p className="mt-4">
        <strong>
          werkelijke prijs per les = totaal betaald bedrag ÷ aantal lessen dat je daadwerkelijk
          volgt
        </strong>
      </p>
      <p className="mt-4">
        Stel dat een abonnement €69 per vier weken kost en acht lessen bevat. Als je alle acht
        lessen volgt, betaal je €8,63 per les. Ga je maar vier keer, dan is je werkelijke prijs
        €17,25. Een 10-lessenkaart van €180 lijkt duurder, maar kan voordeliger zijn wanneer je
        anders veel abonnementlessen ongebruikt laat.
      </p>
      <p className="mt-4">
        Kijk daarom eerst realistisch naar je agenda. Eén vaste les per week is voor veel mensen
        waardevoller dan onbeperkt toegang die vooral een voornemen blijft. Wie al zeker weet dat
        drie lessen per week haalbaar zijn, kan met unlimited juist een lage prijs per les bereiken.
      </p>

      <h2
        id="voorwaarden"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Let op geldigheid, looptijd en opzeggen
      </h2>
      <p className="mt-4">
        Vergelijk niet alleen het grote bedrag op de prijspagina. Controleer ook:
      </p>
      <ol className="mt-4 space-y-2 pl-5 [list-style-type:decimal]">
        <li>Hoe lang een rittenkaart geldig blijft.</li>
        <li>Of ongebruikte lessen vervallen.</li>
        <li>Wat de minimale looptijd van een abonnement is.</li>
        <li>Of het abonnement daarna automatisch doorloopt.</li>
        <li>Hoe en wanneer je kunt opzeggen.</li>
        <li>Of pauzeren mogelijk is bij vakantie, zwangerschap of een blessure.</li>
        <li>Of annuleren kort voor de les een credit kost.</li>
      </ol>
      <p className="mt-4">
        Vierwekelijks betalen is bovendien niet hetzelfde als maandelijks betalen. In één jaar
        zitten dertien periodes van vier weken. Vergelijk jaarbedragen daarom op dezelfde basis en
        kijk niet alleen naar het bedrag per incasso.
      </p>

      <h2
        id="abonnement-goedkoper"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wanneer is een abonnement goedkoper?
      </h2>
      <p className="mt-4">
        Een abonnement is meestal logisch als je een vast ritme kunt volhouden. Reken vóór aankoop
        drie scenario’s door: één, twee en drie lessen per week. Gebruik vervolgens het laagste
        aantal dat je ook tijdens drukke weken waarschijnlijk haalt.
      </p>
      <ul className="mt-4 space-y-3 pl-5 [list-style-type:disc]">
        <li>
          Ga je gemiddeld <strong>één keer per week</strong>, kies dan een klein abonnement of een
          passende rittenkaart.
        </li>
        <li>
          Ga je gemiddeld <strong>twee keer per week</strong>, dan biedt een abonnement vaak
          duidelijk meer waarde per les.
        </li>
        <li>
          Ga je <strong>drie keer per week of vaker</strong>, dan kan onbeperkt yoga financieel
          interessant worden.
        </li>
        <li>
          Verandert je agenda voortdurend, dan betaal je bij een rittenkaart meer per les maar
          mogelijk minder voor ongebruikte capaciteit.
        </li>
      </ul>
      <p className="mt-4">
        Wie nog niet weet welke les of docent past, hoeft dit niet vooraf uit te rekenen. Begin met
        een introductieperiode en baseer je keuze daarna op wat je werkelijk hebt bezocht. Lees ook{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yogales-in-amsterdam-waar-moet-je-op-letten-bij-je-keuze" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          hoe je een yogastudio kiest
        </Link>{" "}
        en{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          wat je tijdens een proefles kunt verwachten
        </Link>
        .
      </p>

      <h2
        id="prijzen-yoga-zeeburg"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        De actuele prijzen van Yoga Zeeburg
      </h2>
      <p className="mt-4">Yoga Zeeburg werkt op 29 juli 2026 met de volgende hoofdopties:</p>
      <ul className="mt-4 space-y-3 pl-5 [list-style-type:disc]">
        <li>
          <strong>14-Day Unlimited Intro Pass:</strong> €30 eenmalig voor 14 opeenvolgende dagen;
          alleen voor nieuwe studenten en stopt automatisch.
        </li>
        <li>
          <strong>Weekly Yoga:</strong> €49 per vier weken voor vier lessen; €12,25 per les bij
          volledig gebruik.
        </li>
        <li>
          <strong>Yoga Plus:</strong> €69 per vier weken voor acht lessen; €8,63 per les bij
          volledig gebruik.
        </li>
        <li>
          <strong>Unlimited Yoga:</strong> €89 per vier weken; ongeveer €7,42 per les bij drie
          lessen per week en €5,56 bij vier lessen per week.
        </li>
        <li>
          <strong>10-Class Pass:</strong> €180 voor tien lessen, drie maanden geldig; €18 per les.
        </li>
        <li>
          <strong>Single Class:</strong> €25, één maand geldig.
        </li>
      </ul>
      <p className="mt-4">
        De reguliere vierweekse abonnementen hebben momenteel een minimale looptijd van drie maanden
        en zijn daarna maandelijks opzegbaar. Voor langere commitment bestaan afzonderlijke
        jaaropties. Bekijk voor alle actuele bedragen, voorwaarden en eventuele acties altijd de{" "}
        <Link
          to="/prijzen"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          prijspagina van Yoga Zeeburg
        </Link>
        .
      </p>

      <h2
        id="kiezen"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zo kies je zonder te veel te betalen
      </h2>
      <p className="mt-4">Gebruik deze korte volgorde:</p>
      <ol className="mt-4 space-y-2 pl-5 [list-style-type:decimal]">
        <li>Probeer eerst meerdere lessen als je nieuw bent.</li>
        <li>Noteer hoeveel keer je in twee weken werkelijk bent geweest.</li>
        <li>Verdubbel dat aantal voor een realistische periode van vier weken.</li>
        <li>Vergelijk de bijpassende abonnementsprijs met een rittenkaart.</li>
        <li>Controleer looptijd, geldigheid en opzegvoorwaarden.</li>
        <li>Kies de kleinste optie die je normale ritme dekt; je kunt later altijd opschalen.</li>
      </ol>
      <p className="mt-4">
        De beste prijs is niet het laagste bedrag op de website. Het is het bedrag waarbij je lessen
        gebruikt, graag terugkomt en yoga zonder gedoe in je week past.
      </p>

      <h2
        id="conclusie"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Conclusie
      </h2>
      <p className="mt-4">
        Yoga in Amsterdam kost in actuele voorbeelden ongeveer €8 tot €25 per gevolgde groepsles.
        Flexibiliteit maakt een losse les of rittenkaart duurder; regelmaat maakt een abonnement
        voordeliger. Bereken altijd wat je per werkelijk gevolgde les betaalt en neem geldigheid,
        looptijd en bereikbaarheid mee.
      </p>
      <p className="mt-4">
        Ben je nieuw, gebruik dan eerst een introductieaanbod om je echte ritme te ontdekken. Pas
        daarna weet je of één les per week, twee lessen of onbeperkt yoga financieel én praktisch
        bij je past.
      </p>
    </>
  );
}
