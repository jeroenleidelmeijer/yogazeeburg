// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: yoga-aan-het-water-in-amsterdam-oost-rust-midden-in-de-stad

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import waterHeroAsset from "@/assets/yoga-aan-het-water-hero.webp.asset.json";
import waterInlineAsset from "@/assets/yogamat-bolster-water.webp.asset.json";
import { type Article, CATEGORY_AMSTERDAM_OOST } from "../article-types";

const WATER_HERO_IMAGE: ArticleImageRef = {
  url: waterHeroAsset.url,
  alt: "Illustratie van een yogamat aan het water in Amsterdam Oost bij avondlicht.",
  width: 1600,
  height: 900,
};

const WATER_INLINE_IMAGE: ArticleImageRef = {
  url: waterInlineAsset.url,
  alt: "Illustratie van een rustige yogamat met bolster en uitzicht over het water.",
  width: 1600,
  height: 900,
};

export const article: Article = {
  slug: "yoga-aan-het-water-in-amsterdam-oost-rust-midden-in-de-stad",
  title: "Yoga aan het water in Amsterdam Oost: rust midden in de stad",
  h1: "Yoga aan het water in Amsterdam Oost: rust midden in de stad",
  seoTitle: "Yoga aan het water in Amsterdam Oost | Yoga Zeeburg",
  description:
    "Zoek je yoga aan het water in Amsterdam Oost? Ontdek wat de locatie van Yoga Zeeburg bijzonder maakt en hoe je een les kiest die bij je week past.",
  intro:
    "Wie yoga aan het water in Amsterdam Oost zoekt, zoekt meestal meer dan alleen een mooi adres. Je wilt een plek die praktisch in je week past en waar je even afstand kunt nemen van verkeer, werk en een vol hoofd. De ligging van Yoga Zeeburg in Cruquius helpt daarbij, maar een goede keuze hangt ook af van het soort les, de docent en hoe makkelijk je terugkomt.",
  category: CATEGORY_AMSTERDAM_OOST,
  type: "local-guide",
  pillar: false,
  publishedAt: "2026-07-31",
  updatedAt: "2026-07-31",
  readingTimeMin: 7,
  toc: [
    {
      id: "wat-betekent-yoga-aan-het-water-in-amsterdam-oost",
      label: "Wat betekent yoga aan het water in Amsterdam Oost?",
    },
    {
      id: "waarom-kan-de-omgeving-verschil-maken",
      label: "Waarom kan de omgeving verschil maken?",
    },
    {
      id: "rust-komt-niet-alleen-van-de-plek",
      label: "Rust komt niet alleen van de plek",
    },
    {
      id: "past-de-studio-praktisch-in-je-week",
      label: "Past de studio praktisch in je week?",
    },
    {
      id: "zo-maak-je-van-aankomen-een-rustmoment",
      label: "Zo maak je van aankomen een rustmoment",
    },
    {
      id: "welke-les-past-bij-jouw-moment",
      label: "Welke les past bij jouw moment?",
    },
    {
      id: "een-kleine-yogastudio-in-cruquius",
      label: "Een kleine yogastudio in Cruquius",
    },
  ],
  faqs: [
    {
      question: "Ligt Yoga Zeeburg echt aan het water?",
      answer:
        "Ja. Yoga Zeeburg zit aan de Cruquiusweg 96F in Amsterdam Oost, boven CrossFit Zeeburg en direct bij het water in Cruquius. Dat betekent niet dat iedere plek in de studio hetzelfde uitzicht of volledige stilte biedt.",
    },
    {
      question: "Is yoga aan het water automatisch rustiger?",
      answer:
        "Nee. De omgeving kan helpen bij de overgang van een drukke dag naar je les, maar het lestempo, de docent, de groep en je eigen energie bepalen ook hoe je de les ervaart.",
    },
    {
      question: "Is Yoga Zeeburg geschikt als ik nog nooit yoga heb gedaan?",
      answer:
        "Yoga Zeeburg biedt beginner-vriendelijke begeleiding. Lees vooraf de actuele lesbeschrijving, kies een toegankelijke les en vertel de docent dat het je eerste keer is. Je hoeft niet lenig of ervaren te zijn om te beginnen.",
    },
    {
      question: "Hoe kies ik een rustige les na mijn werk?",
      answer:
        "Bekijk het actuele rooster en let op de beschrijving van tempo en focus. Kies een rustiger format als je wilt vertragen, plan voldoende reistijd en controleer voor vertrek de actuele beschikbaarheid in Sportbit.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg — officiële website",
      url: "https://www.yogazeeburg.com/",
    },
    {
      title: "Yoga Zeeburg — actueel lesrooster",
      url: "https://www.yogazeeburg.com/rooster",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  heroImage: WATER_HERO_IMAGE,
  body: () => <WaterBody />,
};

function WaterBody() {
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
            Yoga Zeeburg ligt aan de Cruquiusweg 96F in Amsterdam Oost, boven CrossFit Zeeburg en
            direct bij het water in Cruquius. De plek biedt een rustige overgang tussen een drukke
            dag en je yogales, terwijl de les, docent en het tijdstip uiteindelijk bepalen of de
            ervaring echt bij je past.
          </p>
        </div>
      </section>

      <h2
        id="wat-betekent-yoga-aan-het-water-in-amsterdam-oost"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat betekent yoga aan het water in Amsterdam Oost?
      </h2>
      <p className="mt-4">
        Yoga Zeeburg zit aan de Cruquiusweg 96F in Amsterdam Oost, boven CrossFit Zeeburg en direct
        bij het water in Cruquius. Het is geen afgelegen retraite buiten de stad. Je bent nog steeds
        in Amsterdam, in de buurt van Zeeburg en de Oostelijke Eilanden, maar de omgeving voelt
        anders dan een drukke winkelstraat of een volle sportschool.
      </p>
      <p className="mt-4">
        Dat verschil zit vooral in de overgang. Je verlaat je werkdag, fietst of loopt richting de
        Cruquiusweg en komt aan op een plek waar water en ruimte deel zijn van de directe omgeving.
        De studio zelf is klein en persoonlijk. Daardoor kan het gemakkelijker zijn om van
        stadsritme naar lestempo te schakelen.
      </p>
      <p className="mt-4">
        Verwacht daarbij geen garantie op stilte, een bepaald uitzicht vanuit iedere plek in de zaal
        of een automatisch ontspannen gevoel. Yoga blijft een activiteit in een levende stadsbuurt.
        De locatie ondersteunt het moment; de les en wat jij die dag nodig hebt blijven minstens zo
        belangrijk.
      </p>

      <h2
        id="waarom-kan-de-omgeving-verschil-maken"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Waarom kan de omgeving verschil maken?
      </h2>
      <p className="mt-4">
        Een vaste plek kan een praktisch signaal worden: hier begint mijn yogamoment. Dat hoeft niet
        ingewikkeld of spiritueel te zijn. Alleen al bewust aankomen, je telefoon wegleggen en een
        paar minuten niet doorrennen kan helpen om met meer aandacht aan de les te beginnen.
      </p>
      <p className="mt-4">
        Een locatie aan het water kan prettig zijn wanneer je veel binnen werkt of de hele dag van
        afspraak naar afspraak gaat. Niet omdat water op zichzelf een bepaalde uitkomst garandeert,
        maar omdat de omgeving je uitnodigt om even uit je gebruikelijke patroon te stappen. Heb je
        tijd, dan kun je voor of na de les kort langs het water lopen. Heb je haast, dan is het nog
        steeds waardevol dat de studio op een herkenbare, rustige plek in Amsterdam Oost ligt.
      </p>
      <p className="mt-4">
        De beste locatie is uiteindelijk de locatie waar je daadwerkelijk naartoe gaat. Een studio
        kan prachtig liggen, maar als de reistijd, lestijden of sfeer niet bij je passen, wordt een
        vaste routine lastig. Lees daarom ook hoe je{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-in-amsterdam-oost-welke-yogastudio-past-bij-jou" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          een yogastudio in Amsterdam Oost kiest
        </Link>
        .
      </p>

      <ArticleFigure image={WATER_INLINE_IMAGE} className="mt-10" />

      <h2
        id="rust-komt-niet-alleen-van-de-plek"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Rust komt niet alleen van de plek
      </h2>
      <p className="mt-4">
        De omgeving is één onderdeel van je ervaring. Het tempo van de les, de manier waarop een
        docent uitlegt, de groepsgrootte en je eigen energie spelen ook mee. De ene dag heb je
        behoefte aan langzamer bewegen en meer pauzes. Op een andere dag helpt een actievere les
        juist om uit je hoofd te komen.
      </p>
      <p className="mt-4">
        Kijk daarom niet alleen naar de woorden ‘aan het water’ of ‘rustige locatie’. Controleer de
        lesbeschrijving en vraag jezelf af wat je die dag zoekt:
      </p>
      <ul className="mt-4 space-y-3 pl-5 [list-style-type:disc]">
        <li>Wil je vertragen na een volle werkdag? Kies dan een rustiger lestempo.</li>
        <li>Wil je bewegen en je aandacht verleggen? Een actievere flow kan beter passen.</li>
        <li>
          Ben je nieuw met yoga? Kies een duidelijk beschreven, toegankelijke les en laat de docent
          weten dat het je eerste keer is.
        </li>
        <li>
          Heb je een blessure, ben je zwanger of twijfel je over wat verstandig is? Overleg met een
          bevoegde zorgprofessional en informeer de docent vóór de les.
        </li>
      </ul>
      <p className="mt-4">
        Het actuele aanbod kan veranderen. Bekijk daarom altijd het huidige rooster en de actuele
        beschikbaarheid voordat je vertrekt.
      </p>

      <h2
        id="past-de-studio-praktisch-in-je-week"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Past de studio praktisch in je week?
      </h2>
      <p className="mt-4">
        Yoga werkt meestal beter als je niet iedere les opnieuw hoeft te organiseren. Controleer
        daarom vooraf hoe je bij de Cruquiusweg komt, hoeveel marge je nodig hebt en welke lestijden
        echt haalbaar zijn. Een les die theoretisch perfect klinkt maar structureel botst met werk
        of gezin, wordt zelden een ontspannen gewoonte.
      </p>
      <p className="mt-4">
        Plan bij een eerste bezoek wat extra tijd. Dan hoef je niet gehaast binnen te komen, kun je
        rustig uitzoeken waar je moet zijn en heb je tijd om iets aan de docent te vragen. In het
        artikel over een{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          proefles yoga in Amsterdam Oost
        </Link>{" "}
        lees je stap voor stap wat je kunt verwachten.
      </p>
      <p className="mt-4">
        Let ook op de reis na afloop. Kun je rustig naar huis fietsen of lopen? Ligt de studio op
        een logische route vanaf werk? Zou je de les aan een vaste avond of ochtend kunnen koppelen?
        Zulke eenvoudige vragen zeggen vaak meer over de kans dat je blijft komen dan een lange
        lijst faciliteiten.
      </p>

      <h2
        id="zo-maak-je-van-aankomen-een-rustmoment"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zo maak je van aankomen een rustmoment
      </h2>
      <p className="mt-4">
        Je hoeft niet lang van tevoren aanwezig te zijn om bewuster te beginnen. Met een paar kleine
        keuzes maak je de overgang al duidelijker:
      </p>
      <ol className="mt-4 space-y-2 pl-5 [list-style-type:decimal]">
        <li>Vertrek met voldoende marge, zodat de reis geen race wordt.</li>
        <li>Zet meldingen uit voordat de les begint.</li>
        <li>Draag kleding waarin je vrij kunt bewegen en waarin je je prettig voelt.</li>
        <li>Vertel de docent kort dat je nieuw bent of ergens rekening mee moet houden.</li>
        <li>
          Kies na afloop, als je tijd hebt, voor een rustige route langs het water in plaats van
          direct weer in je telefoon te duiken.
        </li>
      </ol>
      <p className="mt-4">
        Dit zijn geen regels die je perfect moet uitvoeren. Ze maken het alleen eenvoudiger om de
        les niet als nog een afspraak op je lijst te beleven. Kom je toch gehaast aan, dan ben je
        nog steeds welkom. Je hoeft niet eerst rustig te zijn om yoga te mogen doen.
      </p>

      <h2
        id="welke-les-past-bij-jouw-moment"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Welke les past bij jouw moment?
      </h2>
      <p className="mt-4">
        Bij Yoga Zeeburg staan actievere en rustigere lessen op het rooster. Denk niet te veel in
        ‘goed’ of ‘fout’. Kies op basis van je ervaring, energie en agenda. Een duidelijke
        lesbeschrijving helpt je vooraf inschatten wat je kunt verwachten. Voor actuele tijden,
        wijzigingen en beschikbare plekken gebruik je het rooster en Sportbit.
      </p>
      <p className="mt-4">
        Twijfel je tussen meerdere lessen, dan is vergelijken in de praktijk vaak nuttiger dan
        eindeloos lezen. Met de{" "}
        <a
          href="/trial"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          14-daagse Intro Pass
        </a>{" "}
        kun je verschillende lessen, docenten en tijden proberen voordat je een vast ritme kiest.
      </p>
      <p className="mt-4">
        Wie net begint, hoeft niet eerst lenig of ervaren te zijn. In{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-voor-beginners-in-amsterdam-oost-zo-start-je" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          yoga voor beginners in Amsterdam Oost
        </Link>{" "}
        vind je praktische hulp voor je eerste weken.
      </p>

      <h2
        id="een-kleine-yogastudio-in-cruquius"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Een kleine yogastudio in Cruquius
      </h2>
      <p className="mt-4">
        Yoga Zeeburg is een kleine, persoonlijke studio in Amsterdam Oost. De locatie boven CrossFit
        Zeeburg, aan de Cruquiusweg en bij het water, geeft de studio een duidelijke plek in de
        buurt. De benadering is nuchter: bewegen, ademen en ontdekken welke les bij je lichaam en
        week past, zonder druk om iets te bewijzen.
      </p>
      <p className="mt-4">
        Dat lokale karakter is belangrijker dan een groot gebaar. Je weet waar je naartoe gaat, kunt
        verschillende lessen proberen en bouwt stap voor stap een routine op. De rust midden in de
        stad ontstaat zo niet alleen door de ligging, maar door de combinatie van plek, begeleiding
        en een moment dat je regelmatig voor jezelf vrijmaakt.
      </p>
    </>
  );
}
