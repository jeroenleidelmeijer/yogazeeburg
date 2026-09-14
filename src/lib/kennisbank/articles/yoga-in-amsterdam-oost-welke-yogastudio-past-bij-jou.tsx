// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: yoga-in-amsterdam-oost-welke-yogastudio-past-bij-jou

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { type Article, CATEGORY_AMSTERDAM_OOST } from "../article-types";

export const article: Article = {
  slug: "yoga-in-amsterdam-oost-welke-yogastudio-past-bij-jou",
  title: "Yoga in Amsterdam Oost: welke yogastudio past bij jou?",
  h1: "Yoga in Amsterdam Oost: welke yogastudio past bij jou?",
  seoTitle: "Yoga in Amsterdam Oost: welke studio past? | Yoga Zeeburg",
  description:
    "Praktische keuzehulp voor een yogastudio in Amsterdam Oost: lesstijl, docent, sfeer, locatie, rooster en prijs — plus een korte checklist en eerlijke vergelijking.",
  category: CATEGORY_AMSTERDAM_OOST,
  type: "local-guide",
  pillar: false,
  publishedAt: "2026-07-21",
  updatedAt: "2026-07-21",
  readingTimeMin: 8,
  toc: [
    { id: "kort-antwoord", label: "Kort antwoord" },
    { id: "welke-past", label: "Welke yogastudio past bij jou?" },
    { id: "stijl-niveau", label: "Welke yogastijl en welk niveau zoek je?" },
    { id: "docent-sfeer", label: "Docent, sfeer en groepsgrootte" },
    { id: "locatie-rooster", label: "Locatie en rooster die je volhoudt" },
    { id: "proefaanbod-prijs", label: "Hoe vergelijk je proefaanbod en prijs?" },
    { id: "checklist", label: "Praktische checklist" },
    { id: "yoga-zeeburg", label: "Wanneer past Yoga Zeeburg bij jou?" },
    { id: "definitief", label: "Zo maak je de definitieve keuze" },
    { id: "faq", label: "Veelgestelde vragen" },
  ],
  faqs: [
    {
      question: "Hoeveel yogastudio's moet ik proberen?",
      answer:
        "Vaak volstaan twee tot drie studio's. Meer proeflessen leiden zelden tot een beter besluit; ze stellen het besluit vooral uit. Kies twee studio's die op papier passen bij je lesstijl, locatie en rooster, en beoordeel ze op dezelfde eerlijke criteria.",
    },
    {
      question: "Is een kleine of grote yogastudio beter?",
      answer:
        "Beter bestaat niet in het algemeen — het hangt af van wat je zoekt. Een kleinere studio biedt meestal meer persoonlijke aandacht en een rustigere sfeer; een grotere studio heeft vaak meer lestijden en stijlen. Belangrijker dan de omvang is of het rooster past en of je je op je gemak voelt bij de docenten.",
    },
    {
      question: "Welke yogales is geschikt voor beginners?",
      answer:
        "Kies een les die zichzelf in de omschrijving expliciet toegankelijk noemt of geschikt is voor alle niveaus. Termen als hatha, gentle of yin zijn vaak rustig en goed te volgen. Vermijd op je eerste les een sterk fysieke, snelle stijl als je nog geen ervaring hebt.",
    },
    {
      question: "Hoe weet ik na een proefles of een studio bij me past?",
      answer:
        "Let minder op wat er tijdens de les gebeurde en meer op hoe je je erna voelt en of je jezelf terug ziet gaan. Een studio past bij jou als het rooster werkt, de sfeer klopt en de drempel om terug te komen laag is. Twijfel je? Probeer binnen dezelfde week nog een tweede les bij een andere docent.",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: false,
    showRelated: true,
  },
  body: () => <WelkeStudioBody />,
};

function WelkeStudioBody() {
  return (
    <>
      <section
        id="kort-antwoord"
        aria-labelledby="kort-antwoord-heading-2"
        className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8"
      >
        <h2
          id="kort-antwoord-heading-2"
          className="font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl"
        >
          Kort antwoord
        </h2>
        <div className="mt-3 space-y-3 text-foreground">
          <p>
            De "beste" yogastudio in Amsterdam Oost bestaat niet in het algemeen — de beste studio
            voor jou wel. Die past bij jouw lesstijl, je niveau, je week en de plek waar je woont of
            werkt.
          </p>
          <p>
            De belangrijkste vraag is niet welke studio het mooiste interieur heeft, maar welke
            studio je daadwerkelijk regelmatig blijft bezoeken. Een rooster dat je volhoudt, is meer
            waard dan een theoretisch perfecte les die je één keer per maand haalt.
          </p>
          <p>
            In deze gids lopen we samen door de criteria die er echt toe doen, zodat je binnen twee
            tot drie proeflessen een goed onderbouwde keuze kunt maken.
          </p>
        </div>
      </section>

      <h2
        id="welke-past"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Welke yogastudio past bij jou?
      </h2>
      <p className="mt-4">
        Amsterdam Oost is een groot gebied — Zeeburg, Cruquius, IJburg, Indische Buurt, Oostelijk
        Havengebied, Watergraafsmeer. In dat gebied vind je uiteenlopende yogastudio's: van fysieke,
        dynamische vloeren tot kleine, persoonlijke studio's met rustige lessen. Dat maakt kiezen
        soms verwarrend, vooral als je net begint. De valkuil is dat je op zoek gaat naar objectief
        "de beste" studio, terwijl de vraag eigenlijk is welke studio past bij hoe jouw week
        eruitziet en wat je op dit moment nodig hebt.
      </p>
      <p className="mt-4">
        Neem als vertrekpunt dat een yogastudio pas werkt als je er daadwerkelijk komt. Dat klinkt
        vanzelfsprekend, maar veel mensen boeken een lidmaatschap op basis van sfeer of Instagram en
        merken pas na een paar weken dat het rooster of de reistijd in de praktijk niet past.
        Beoordeel een studio daarom op de nuchtere criteria hieronder, niet op eerste indruk.
      </p>

      <h2
        id="stijl-niveau"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Welke yogastijl en welk niveau zoek je?
      </h2>
      <p className="mt-4">
        Yoga is een verzamelnaam voor verschillende stijlen die onderling flink kunnen verschillen.
        Grofweg zijn er rustigere vormen — hatha, yin, restorative, gentle — waar houdingen langer
        worden vastgehouden en adem centraal staat. Daarnaast zijn er dynamischere vormen — vinyasa,
        flow, power, ashtanga — waar overgangen sneller gaan en de opbouw fysieker is.
      </p>
      <p className="mt-4">
        Welke stijl bij je past hangt af van wat je zoekt: rust en herstel, beweging en kracht, of
        een combinatie. Belangrijk: kijk niet alleen naar de <em>naam</em> van een les, maar ook
        naar de <em>omschrijving</em>. Twee lessen met dezelfde naam kunnen op twee studio's totaal
        anders aanvoelen. In een goede omschrijving lees je voor wie de les bedoeld is, wat de
        opbouw is en of aanpassingen worden aangeboden. Als die informatie ontbreekt, is dat op
        zichzelf al een signaal.
      </p>
      <p className="mt-4">
        Voor niveau geldt hetzelfde. Termen als "geschikt voor alle niveaus" of "toegankelijk" zijn
        een goede eerste indicatie dat je zonder ervaring welkom bent. Ben je onzeker? Kies bewust
        voor een rustigere stijl bij je eerste les, ongeacht welke stijl je uiteindelijk het
        prettigst gaat vinden.
      </p>

      <h2
        id="docent-sfeer"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Hoe belangrijk zijn docent, sfeer en groepsgrootte?
      </h2>
      <p className="mt-4">
        Aanzienlijk belangrijker dan de meeste mensen inschatten. Bij yoga maakt de docent een groot
        verschil in hoe een les op je overkomt. Twee vinyasa-lessen bij twee verschillende docenten
        kunnen radicaal anders aanvoelen — in tempo, aandacht, uitleg en muziek. Reken er dus op dat
        je binnen dezelfde studio verschillende docenten wilt proberen voordat je een oordeel vormt.
      </p>
      <p className="mt-4">
        Sfeer is subtieler maar even belangrijk. Voelt de studio als een plek waar je binnenkomt en
        je schouders al iets zakken? Of merk je een prestatiedruk, harde muziek of drukte die je
        juist opjaagt? Beide soorten sfeer hebben hun publiek; er is geen goed of fout, alleen wat
        past bij wat jij zoekt.
      </p>
      <p className="mt-4">
        Groepsgrootte hangt hiermee samen. Kleinere groepen bieden meestal meer ruimte voor
        persoonlijke aandacht en aanpassingen; grotere groepen hebben een andere dynamiek en vaak
        meer roosterkeuze. Neem mee wat voor jou werkt — en check bij een proefles hoe vol de les
        werkelijk zit op het tijdstip dat je van plan bent te gaan.
      </p>

      <h2
        id="locatie-rooster"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Kies een locatie en rooster die je echt volhoudt
      </h2>
      <p className="mt-4">
        Dit is misschien wel het meest onderschatte criterium. Een studio op tien minuten fietsen
        die je vier keer per maand haalt levert je meer op dan een prachtige studio op een half uur
        waar je alleen op zondagochtend komt. Reistijd is een sluipmoordenaar van goede voornemens.
      </p>
      <p className="mt-4">
        Bekijk daarom altijd het{" "}
        <a
          href="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          actuele rooster
        </a>{" "}
        voordat je een keuze maakt. Zijn er minstens twee tot drie momenten per week die zonder
        onderhandeling in je agenda passen? Zo niet, dan past de studio in de praktijk niet, hoe
        goed de lessen ook zijn. Regelmaat wint het van intensiteit — twee toegankelijke lessen per
        week doen op de lange termijn meer dan één zware les die je vaak overslaat.
      </p>

      <h2
        id="proefaanbod-prijs"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Hoe vergelijk je proefaanbod en prijs?
      </h2>
      <p className="mt-4">
        Bijna elke yogastudio biedt een vorm van kennismaking aan — een losse proefles, een
        introductieweek of een intro pass van één tot twee weken. Wat het meest oplevert, is een
        intro pass waarmee je binnen korte tijd meerdere lessen, docenten en tijdstippen kunt
        proberen. Eén losse les geeft je namelijk vooral informatie over dat ene moment; drie of
        vier lessen laten zien wat de studio structureel is. Voor een uitgebreidere uitleg over hoe
        zo'n eerste les eruitziet, zie ons artikel over{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          een proefles yoga in Amsterdam Oost
        </Link>
        .
      </p>
      <p className="mt-4">
        Voor prijs geldt: kijk niet naar de laagste prijs per les, maar naar de prijs per les die je
        daadwerkelijk gaat volgen. Een goedkoop rittenkaartje wordt duur als je het niet opmaakt.
        Een lidmaatschap wordt goedkoop als je twee tot drie keer per week komt. Reken het eerlijk
        door voordat je kiest — en houd rekening met opzegtermijnen of minimumtermijnen. Yoga
        Zeeburg biedt een{" "}
        <a
          href="/trial"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Bekijk onze 14-daagse Intro Pass
        </a>{" "}
        waarmee je in twee weken meerdere lessen kunt proberen voordat je beslist of een
        lidmaatschap past.
      </p>

      <h2
        id="checklist"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Praktische checklist voor je keuze
      </h2>
      <ul className="mt-4 space-y-3 pl-5 [list-style-type:disc]">
        <li>
          <strong>Lesstijl en omschrijving.</strong> Sluit de omschrijving aan bij wat jij zoekt —
          rust, beweging of een combinatie?
        </li>
        <li>
          <strong>Niveau en toegankelijkheid.</strong> Wordt duidelijk gemaakt voor wie een les
          bedoeld is en zijn aanpassingen mogelijk?
        </li>
        <li>
          <strong>Docent en persoonlijke aandacht.</strong> Krijg je een korte introductie voor je
          eerste les? Kent de docent je naam na een paar keer?
        </li>
        <li>
          <strong>Sfeer en groepsgrootte.</strong> Voelt het rustig genoeg om terug te komen? Is de
          groep behapbaar op het tijdstip dat jij komt?
        </li>
        <li>
          <strong>Locatie en reistijd.</strong> Zit de studio op een plek die je zonder omweg
          bereikt vanaf huis of werk?
        </li>
        <li>
          <strong>Rooster.</strong> Zijn er twee tot drie lestijden per week die structureel in je
          agenda passen?
        </li>
        <li>
          <strong>Prijs en proefaanbod.</strong> Reken de prijs per verwachte les uit; check het
          intro-aanbod en de voorwaarden.
        </li>
        <li>
          <strong>Materialen en voorzieningen.</strong> Zijn matjes, blokken en riemen aanwezig? Is
          er ruimte om rustig aan te komen?
        </li>
      </ul>

      <h2
        id="yoga-zeeburg"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wanneer past Yoga Zeeburg bij jou?
      </h2>
      <p className="mt-4">
        Yoga Zeeburg is een kleine, persoonlijke studio aan de <strong>Cruquiusweg 96F</strong>,
        boven CrossFit Zeeburg en aan het water in Amsterdam Oost. De sfeer is bewust rustig en
        niet-zweverig; de nadruk ligt op toegankelijke, praktische yoga voor mensen met een gewone
        volle week. Groepen zijn niet groot, waardoor er ruimte is voor persoonlijke aandacht en
        aanpassingen.
      </p>
      <p className="mt-4">
        Yoga Zeeburg past bij jou als je een plek zoekt in Zeeburg, Cruquius, de Indische Buurt of
        het Oostelijk Havengebied waar je in een kleine setting yoga wilt oefenen, met verschillende
        lessen, docenten en tijden om af te wisselen. Zoek je een grote, dynamische studio met
        tientallen lessen per dag, dan past een andere plek in Amsterdam waarschijnlijk beter — en
        dat is prima. We claimen niet objectief de beste te zijn; we zijn de beste optie voor het
        publiek dat past bij onze aanpak.
      </p>

      <h2
        id="definitief"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zo maak je de definitieve keuze
      </h2>
      <p className="mt-4">
        Kies twee tot drie studio's die op papier bij je passen op basis van stijl, locatie en
        rooster. Boek bij elk daarvan minstens één les op een tijdstip dat je structureel wilt
        bezoeken. Beoordeel na afloop drie dingen: hoe je je in de uren erna voelt, of het rooster
        realistisch in je week past, en of de drempel om opnieuw te boeken laag is. De studio waar
        die drie het beste kloppen, is voor dit moment jouw studio.
      </p>
      <p className="mt-4">
        Blader gerust ook door de{" "}
        <Link
          to="/kennisbank"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Yoga Gids
        </Link>{" "}
        voor meer praktische onderwerpen over yoga in Amsterdam Oost.
      </p>
    </>
  );
}
