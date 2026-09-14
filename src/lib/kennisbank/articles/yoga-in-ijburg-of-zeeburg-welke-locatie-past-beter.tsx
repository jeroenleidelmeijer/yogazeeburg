// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: yoga-in-ijburg-of-zeeburg-welke-locatie-past-beter

import { Link } from "@tanstack/react-router";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import ijburgHeroAsset from "@/assets/yoga-ijburg-of-zeeburg-hoofdbeeld.webp.asset.json";
import ijburgInlineAsset from "@/assets/yoga-ijburg-of-zeeburg-route-en-yogamat.webp.asset.json";
import { type Article, CATEGORY_AMSTERDAM_OOST } from "../article-types";

const IJBURG_HERO_IMAGE: ArticleImageRef = {
  url: ijburgHeroAsset.url,
  alt: "Illustratie van IJburg en Zeeburg aan het water met een lege yogamat en yogablokken",
  width: 1600,
  height: 900,
};

const IJBURG_INLINE_IMAGE: ArticleImageRef = {
  url: ijburgInlineAsset.url,
  alt: "Illustratie van een fiets, routekaart, yogamat en yogablokken aan het water in Amsterdam Oost",
  width: 1600,
  height: 900,
};

export const article: Article = {
  slug: "yoga-in-ijburg-of-zeeburg-welke-locatie-past-beter",
  title: "Yoga in IJburg of Zeeburg: welke locatie past beter?",
  h1: "Yoga in IJburg of Zeeburg: welke locatie past beter?",
  seoTitle: "Yoga in IJburg of Zeeburg: wat past bij jou?",
  description:
    "Yoga in IJburg of Zeeburg? Vergelijk reistijd, rooster, sfeer en lesaanbod en ontdek welke locatie het beste in jouw week past.",
  intro:
    "IJburg en Zeeburg liggen allebei in Amsterdam Oost, maar voelen in het dagelijks leven niet hetzelfde. Een studio kan op de kaart dichtbij lijken en toch lastig in je week passen. Omgekeerd kan een iets langere fietsrit juist prima werken wanneer het rooster goed aansluit en je je prettig voelt bij de docent en de groep.",
  category: CATEGORY_AMSTERDAM_OOST,
  type: "local-guide",
  pillar: false,
  publishedAt: "2026-08-05",
  updatedAt: "2026-08-05",
  readingTimeMin: 7,
  toc: [
    {
      id: "begin-niet-bij-de-wijknaam-maar-bij-je-echte-week",
      label: "Begin niet bij de wijknaam, maar bij je echte week",
    },
    {
      id: "wanneer-is-yoga-op-ijburg-de-logische-keuze",
      label: "Wanneer is yoga op IJburg de logische keuze?",
    },
    {
      id: "wanneer-past-yoga-in-zeeburg-beter",
      label: "Wanneer past yoga in Zeeburg beter?",
    },
    {
      id: "vergelijk-twee-echte-lesmomenten",
      label: "Vergelijk twee echte lesmomenten",
    },
    {
      id: "afstand-is-meer-dan-het-aantal-kilometers",
      label: "Afstand is meer dan het aantal kilometers",
    },
    {
      id: "probeer-eerst-beslis-daarna",
      label: "Probeer eerst, beslis daarna",
    },
    {
      id: "de-beste-locatie-is-de-plek-waar-je-terugkomt",
      label: "De beste locatie is de plek waar je terugkomt",
    },
  ],
  faqs: [
    {
      question: "Is yoga in IJburg beter bereikbaar dan yoga in Zeeburg?",
      answer:
        "Dat hangt af van je vertrekpunt en het tijdstip. Vanuit IJburg kan een lokale studio de kortste route zijn. Vanuit Cruquius, Zeeburg of het Oostelijk Havengebied kan Yoga Zeeburg juist logischer liggen. Vergelijk de volledige deur-tot-deurroute voor een echte lestijd.",
    },
    {
      question: "Moet ik altijd de dichtstbijzijnde yogastudio kiezen?",
      answer:
        "Nee. Nabijheid helpt, maar een passend rooster, een prettige docent en een sfeer waarin je wilt terugkomen zijn minstens zo belangrijk. Kies de combinatie die je op drukke weken kunt volhouden.",
    },
    {
      question: "Kan ik Yoga Zeeburg proberen voordat ik kies?",
      answer:
        "Ja. Met de 14-daagse Intro Pass kun je verschillende lessen, docenten en tijden proberen. Controleer vooraf het actuele rooster en boek momenten die je ook later structureel zou kunnen volgen.",
    },
    {
      question: "Is Yoga Zeeburg geschikt voor beginners?",
      answer:
        "Yoga Zeeburg is beginnersvriendelijk. Lees de lesomschrijving, kies een toegankelijk moment en vertel de docent vóór de les dat je nieuw bent. Je hoeft niet lenig of ervaren te zijn.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg — officiële website",
      url: "https://www.yogazeeburg.com/",
    },
    {
      title: "Yoga Zeeburg — actueel rooster",
      url: "https://www.yogazeeburg.com/rooster",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  heroImage: IJBURG_HERO_IMAGE,
  body: () => <IjburgBody />,
};

function IjburgBody() {
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
            Er is geen locatie die voor iedereen beter is. Woon of werk je op IJburg en kun je daar
            zonder omweg naar een passende les, dan is yoga op IJburg waarschijnlijk de praktischste
            keuze. Zoek je een kleine, persoonlijke studio in Cruquius of Zeeburg en past het
            rooster bij jouw week, dan kan Yoga Zeeburg beter aansluiten.
          </p>
          <p>
            Vergelijk daarom niet alleen kilometers, maar vooral de totale reistijd, de beschikbare
            lestijden, de sfeer en hoe makkelijk je opnieuw boekt. De beste yogalocatie is meestal
            de plek waar je op een gewone drukke week daadwerkelijk naartoe blijft gaan.
          </p>
        </div>
      </section>

      <p className="mt-10">
        Wie twijfelt tussen yoga in IJburg of Zeeburg hoeft daarom niet te zoeken naar een algemene
        winnaar. De betere vraag is: bij welke locatie wordt de drempel om te gaan het laagst?
      </p>

      <h2
        id="begin-niet-bij-de-wijknaam-maar-bij-je-echte-week"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Begin niet bij de wijknaam, maar bij je echte week
      </h2>
      <p className="mt-4">
        Een goede yogaroutine ontstaat doordat route en tijdstip zo logisch zijn dat je ook gaat
        wanneer je moe bent of je werkdag uitloopt. Kijk daarom naar twee concrete wekelijkse
        lesmomenten en reken de hele route mee: vertrekken, reizen, de les en weer thuiskomen. Een
        studio die hemelsbreed dichterbij ligt, kan door een onhandige verbinding of lestijd alsnog
        meer gedoe opleveren.
      </p>
      <p className="mt-4">Gebruik daarna drie eenvoudige vragen:</p>
      <ol className="mt-4 space-y-2 pl-5 [list-style-type:decimal]">
        <li>Kan ik hier op minstens twee realistische momenten per week terecht?</li>
        <li>Past de route bij waar ik vóór en na de les ben?</li>
        <li>Voel ik voldoende vertrouwen om ook op een mindere dag te gaan?</li>
      </ol>
      <p className="mt-4">
        Wil je uitgebreider kijken naar locatie, lesstijl, docent en sfeer? Lees dan ook{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-in-amsterdam-oost-welke-yogastudio-past-bij-jou" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          welke yogastudio in Amsterdam Oost bij jou past
        </Link>
        .
      </p>

      <h2
        id="wanneer-is-yoga-op-ijburg-de-logische-keuze"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wanneer is yoga op IJburg de logische keuze?
      </h2>
      <p className="mt-4">
        Yoga op IJburg ligt voor de hand wanneer IJburg het vaste middelpunt van je dag is. Woon je
        er, werk je er of combineer je de les gemakkelijk met school, boodschappen of andere
        afspraken, dan kan de korte en bekende route veel verschil maken.
      </p>
      <p className="mt-4">
        Dat voordeel telt alleen wanneer het rooster aansluit. Controleer daarom welke les je op een
        gewone werkdag werkelijk zou boeken.
      </p>
      <p className="mt-4">Kies waarschijnlijk voor IJburg wanneer:</p>
      <ul className="mt-4 space-y-2 pl-5 [list-style-type:disc]">
        <li>je vanuit huis of werk zonder omweg naar de les kunt;</li>
        <li>er meerdere passende lestijden in je week staan;</li>
        <li>je na een avondles snel thuis wilt zijn;</li>
        <li>je een studio hebt gevonden waar stijl, begeleiding en sfeer goed voelen.</li>
      </ul>

      <h2
        id="wanneer-past-yoga-in-zeeburg-beter"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wanneer past yoga in Zeeburg beter?
      </h2>
      <p className="mt-4">
        Zeeburg kan logischer zijn wanneer je route door Cruquius, het Oostelijk Havengebied of een
        ander deel van Amsterdam Oost loopt. Yoga Zeeburg zit aan de Cruquiusweg 96F, boven CrossFit
        Zeeburg en bij het water. Het is een kleine, persoonlijke studio met een nuchtere
        benadering.
      </p>
      <p className="mt-4">
        Die setting past bij mensen die waarde hechten aan een rustige sfeer en persoonlijke
        begeleiding. De ligging is alleen een voordeel als route en lestijden werken. Bekijk daarom
        het{" "}
        <Link
          to="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          actuele rooster
        </Link>{" "}
        voordat je beslist.
      </p>
      <p className="mt-4">Kies waarschijnlijk voor Yoga Zeeburg wanneer:</p>
      <ul className="mt-4 space-y-2 pl-5 [list-style-type:disc]">
        <li>Cruquius of Zeeburg logisch op je dagelijkse route ligt;</li>
        <li>je een kleine en persoonlijke studio prettig vindt;</li>
        <li>je verschillende lessen en docenten in de praktijk wilt vergelijken;</li>
        <li>de combinatie van locatie, sfeer en rooster de drempel verlaagt om terug te komen.</li>
      </ul>

      <h2
        id="vergelijk-twee-echte-lesmomenten"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Vergelijk twee echte lesmomenten
      </h2>
      <p className="mt-4">
        Een eerlijke vergelijking maak je met twee concrete boekingen. Kies bij iedere locatie een
        les die qua stijl én tijd realistisch is en vergelijk dezelfde punten.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-left text-[15px]">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 pr-4 font-display font-medium text-foreground">Vergelijkpunt</th>
              <th className="py-3 font-display font-medium text-foreground">Vraag aan jezelf</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="py-3 pr-4 align-top font-medium text-foreground">Route</td>
              <td className="py-3 align-top">Kon ik zonder haast aankomen en weer thuiskomen?</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 align-top font-medium text-foreground">Rooster</td>
              <td className="py-3 align-top">Zijn er minstens twee haalbare momenten per week?</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 align-top font-medium text-foreground">Les</td>
              <td className="py-3 align-top">Paste tempo, niveau en uitleg bij wat ik zocht?</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 align-top font-medium text-foreground">Sfeer</td>
              <td className="py-3 align-top">Voelde ik me op mijn gemak in de ruimte en groep?</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 align-top font-medium text-foreground">Begeleiding</td>
              <td className="py-3 align-top">
                Kon ik iets vragen en waren aanpassingen duidelijk?
              </td>
            </tr>
            <tr>
              <td className="py-3 pr-4 align-top font-medium text-foreground">Herhaalbaarheid</td>
              <td className="py-3 align-top">
                Zou ik dezezelfde les volgende week opnieuw boeken?
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4">
        De laatste vraag is het belangrijkst: een sterke eerste indruk zegt minder dan de bereidheid
        om terug te gaan.
      </p>

      <ArticleFigure
        image={IJBURG_INLINE_IMAGE}
        caption="De beste yogalocatie is meestal de plek die zonder gedoe in je week past."
        className="mt-10"
      />

      <h2
        id="afstand-is-meer-dan-het-aantal-kilometers"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Afstand is meer dan het aantal kilometers
      </h2>
      <p className="mt-4">
        Reistijd is niet alleen de tijd op de fiets of in het openbaar vervoer. Ook overstappen,
        wachten en gehaast aankomen tellen mee. Een locatie kan vanuit huis ideaal zijn, maar vanaf
        kantoor onpraktisch. Vergelijk dus de situatie waarin je daadwerkelijk gaat, niet alleen je
        woonadres.
      </p>
      <p className="mt-4">
        Dit sluit aan bij een bredere regel:{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-dicht-bij-huis-waarom-locatie-helpt-om-vol-te-houden" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          yoga dicht bij huis helpt vooral wanneer de hele routine eenvoudig blijft
        </Link>
        .
      </p>

      <h2
        id="probeer-eerst-beslis-daarna"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Probeer eerst, beslis daarna
      </h2>
      <p className="mt-4">
        Een website vertelt je welke lessen er zijn, maar niet volledig hoe een plek voelt. Probeer
        daarom meer dan één les; docent, tempo en groep kunnen per moment verschillen.
      </p>
      <p className="mt-4">
        Bij Yoga Zeeburg kun je met de 14-daagse Intro Pass verschillende lessen, docenten en tijden
        uitproberen. Test vooral twee of drie momenten die je later structureel zou willen volgen.
        Zo ontdek je of de locatie praktisch onderdeel van je week kan worden.
      </p>
      <section
        aria-labelledby="contextuele-cta-heading"
        className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8"
      >
        <h3
          id="contextuele-cta-heading"
          className="font-display text-lg font-medium tracking-tight text-foreground"
        >
          Welke locatie werkt in jouw week?
        </h3>
        <p className="mt-3 text-foreground">
          Probeer Yoga Zeeburg 14 dagen en test verschillende lessen en tijden voordat je een vast
          ritme kiest.{" "}
          <a
            href="/trial"
            className="font-medium text-primary underline underline-offset-4 hover:no-underline"
          >
            Bekijk de 14-daagse Intro Pass
          </a>
          .
        </p>
      </section>

      <h2
        id="de-beste-locatie-is-de-plek-waar-je-terugkomt"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        De beste locatie is de plek waar je terugkomt
      </h2>
      <p className="mt-4">
        IJburg is waarschijnlijk de beste keuze als je daar woont of werkt, een passende studio hebt
        gevonden en de route vanzelfsprekend is. Zeeburg past beter als Cruquius logisch ligt, het
        rooster aansluit en je de kleine, persoonlijke sfeer van Yoga Zeeburg prettig vindt.
      </p>
      <p className="mt-4">
        Maak de keuze niet groter dan nodig. Vergelijk twee echte lesmomenten, let op de volledige
        route en vraag jezelf na afloop af waar opnieuw boeken het makkelijkst voelt. De plek waar
        dat antwoord duidelijk is, past waarschijnlijk het beste bij jou.
      </p>
    </>
  );
}
