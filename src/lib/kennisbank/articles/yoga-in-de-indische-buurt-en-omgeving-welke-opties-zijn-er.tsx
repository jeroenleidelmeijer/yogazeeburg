// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: yoga-in-de-indische-buurt-en-omgeving-welke-opties-zijn-er

import { Link } from "@tanstack/react-router";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import indischeHeroAsset from "@/assets/yoga-indische-buurt-hoofdbeeld.webp.asset.json";
import indischeInlineAsset from "@/assets/yoga-indische-buurt-yogamat-route.webp.asset.json";
import { type Article, CATEGORY_AMSTERDAM_OOST } from "../article-types";

const INDISCHE_HERO_IMAGE: ArticleImageRef = {
  url: indischeHeroAsset.url,
  alt: "Illustratie van een rustige straat aan het water in Amsterdam Oost met yogamat en kurkblokken.",
  width: 1600,
  height: 900,
};

const INDISCHE_INLINE_IMAGE: ArticleImageRef = {
  url: indischeInlineAsset.url,
  alt: "Illustratie van een yogamat, bolster en routekaart in een lichte ruimte in Amsterdam Oost.",
  width: 1600,
  height: 900,
};

export const article: Article = {
  slug: "yoga-in-de-indische-buurt-en-omgeving-welke-opties-zijn-er",
  title: "Yoga in de Indische Buurt en omgeving: welke opties zijn er?",
  h1: "Yoga in de Indische Buurt en omgeving: welke opties zijn er?",
  seoTitle: "Yoga in de Indische Buurt: zo kies je een studio",
  description:
    "Zoek je yoga in de Indische Buurt? Vergelijk route, rooster, lesstijl en sfeer en ontdek welke yogastudio in Amsterdam Oost bij je past.",
  intro:
    "Zoek je yoga in de Indische Buurt of vlak daarbuiten? Dan heb je meerdere soorten opties in Amsterdam Oost. De beste keuze is meestal niet de studio die op papier het dichtstbij ligt, maar de plek waar route, lestijden, lesstijl en sfeer samen passen bij je week.",
  category: CATEGORY_AMSTERDAM_OOST,
  type: "local-guide",
  pillar: false,
  publishedAt: "2026-08-07",
  updatedAt: "2026-08-07",
  readingTimeMin: 7,
  toc: [
    {
      id: "welke-soorten-yoga-opties-vind-je-rond-de-indische-buurt",
      label: "Welke soorten yoga-opties vind je rond de Indische Buurt?",
    },
    { id: "kijk-verder-dan-de-buurtgrens", label: "Kijk verder dan de buurtgrens" },
    {
      id: "vier-criteria-die-je-keuze-eenvoudiger-maken",
      label: "Vier criteria die je keuze eenvoudiger maken",
    },
    { id: "een-lokale-optie-aan-de-cruquiusweg", label: "Een lokale optie aan de Cruquiusweg" },
    { id: "probeer-niet-alles-tegelijk", label: "Probeer niet alles tegelijk" },
    {
      id: "zo-kies-je-een-yoga-optie-die-blijft-werken",
      label: "Zo kies je een yoga-optie die blijft werken",
    },
  ],
  faqs: [
    {
      question: "Waar vind ik yoga in de Indische Buurt en omgeving?",
      answer:
        "Je vindt in en rond de Indische Buurt gespecialiseerde yogastudio’s, zelfstandige buurtlessen en sportlocaties met yoga. Neem ook nabijgelegen delen van Amsterdam Oost mee, zoals Zeeburg, het Oostelijk Havengebied en Cruquius. Vergelijk altijd het actuele rooster en de deur-tot-deurroute.",
    },
    {
      question: "Is Yoga Zeeburg goed bereikbaar vanuit de Indische Buurt?",
      answer:
        "Yoga Zeeburg ligt aan de Cruquiusweg 96F in Amsterdam Oost. Of dat voor jou praktisch is, hangt af van je vertrekpunt, vervoersmiddel en lestijd. Controleer de route op het moment waarop je normaal naar les zou gaan; een wijknaam alleen zegt te weinig over de echte reistijd.",
    },
    {
      question: "Welke yogales is geschikt als ik beginner ben?",
      answer:
        "Kies een les met een duidelijke, beginnersvriendelijke beschrijving en een docent die opties geeft. Rustig betekent niet automatisch eenvoudig en actief betekent niet automatisch ongeschikt. Vraag bij twijfel aan de studio welke les het beste past bij je ervaring en wat je zoekt.",
    },
    {
      question: "Hoeveel lessen moet ik proberen voordat ik kies?",
      answer:
        "Twee lessen geven meestal een beter beeld dan één. Je ervaart dan mogelijk een andere docent of lesstijl en merkt of de route ook een tweede keer haalbaar voelt. Beoordeel daarna of je jezelf de volgende week gemakkelijk ziet terugkomen.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg — homepage en studio-informatie",
      url: "https://www.yogazeeburg.com/",
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
  heroImage: INDISCHE_HERO_IMAGE,
  body: () => <IndischeBuurtBody />,
};

function IndischeBuurtBody() {
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
            In en rond de Indische Buurt kun je kiezen uit yogastudio’s, losse lessen en
            sportlocaties met yoga. Kijk daarbij verder dan alleen de postcode. Vergelijk de
            volledige deur-tot-deurroute, het actuele rooster, de uitleg per les en de sfeer tijdens
            een proefles. Ook het Oostelijk Havengebied, Zeeburg en Cruquius kunnen praktisch
            dichtbij zijn, afhankelijk van waar je woont en hoe je reist. Yoga Zeeburg ligt aan de
            Cruquiusweg in Amsterdam Oost en biedt een kleine, persoonlijke setting met rustige én
            actievere lessen.
          </p>
        </div>
      </section>

      <p className="mt-10">
        Woon je in de Indische Buurt en zoek je een yogales die je ook echt kunt volhouden? Dan hoef
        je je niet alleen op de buurtgrens te richten. In Amsterdam Oost liggen verschillende
        soorten yoga-aanbod relatief dicht bij elkaar. Wat voor jou praktisch is, hangt af van je
        vertrekpunt, vervoersmiddel, gewenste lestijd en het soort les dat je zoekt.
      </p>

      <h2
        id="welke-soorten-yoga-opties-vind-je-rond-de-indische-buurt"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Welke soorten yoga-opties vind je rond de Indische Buurt?
      </h2>
      <p className="mt-4">
        Het lokale aanbod is grofweg in drie vormen te verdelen. Er zijn gespecialiseerde
        yogastudio’s met meerdere lessen en docenten. Daarnaast geven zelfstandige docenten soms les
        in buurt- of bewegingsruimtes. Ook zijn er sportlocaties waar yoga onderdeel is van een
        breder programma.
      </p>
      <p className="mt-4">
        Geen vorm is automatisch beter. Een gespecialiseerde studio kan prettig zijn als je
        verschillende stijlen en tijden wilt proberen. Een vaste wekelijkse buurtles kan juist
        overzichtelijk en vertrouwd voelen. Een sportlocatie kan logisch zijn wanneer je yoga met
        andere training combineert. Controleer wel altijd wat er daadwerkelijk op het rooster staat
        en voor welk niveau een les bedoeld is.
      </p>
      <p className="mt-4">
        Wil je eerst breder vergelijken? Lees dan ook{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-in-amsterdam-oost-welke-yogastudio-past-bij-jou" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          welke yogastudio in Amsterdam Oost bij je past
        </Link>
        .
      </p>

      <h2
        id="kijk-verder-dan-de-buurtgrens"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Kijk verder dan de buurtgrens
      </h2>
      <p className="mt-4">
        De Indische Buurt grenst aan andere delen van Amsterdam Oost. Daardoor kan een studio in
        Zeeburg, het Oostelijk Havengebied of Cruquius in de praktijk net zo bereikbaar zijn als een
        locatie binnen de buurt zelf. Een plek die hemelsbreed dichtbij ligt, is niet altijd de
        snelste deur-tot-deurroute. Een goede fietsverbinding of directe route met het openbaar
        vervoer kan belangrijker zijn dan de naam van de wijk.
      </p>
      <p className="mt-4">
        Plan daarom één keer de volledige route op het tijdstip waarop je normaal naar les zou gaan.
        Neem ook het laatste stuk mee: waar parkeer je je fiets, hoe vind je de ingang en hoeveel
        speling heb je nodig? In{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-dicht-bij-huis-waarom-locatie-helpt-om-vol-te-houden" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Yoga dicht bij huis: waarom locatie helpt om vol te houden
        </Link>{" "}
        lees je waarom die praktische details vaak meer verschil maken dan een paar minuten op de
        kaart.
      </p>

      <ArticleFigure
        image={INDISCHE_INLINE_IMAGE}
        caption="De beste yogalocatie past bij je route, rooster en gewone week."
        className="mt-10"
      />

      <h2
        id="vier-criteria-die-je-keuze-eenvoudiger-maken"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Vier criteria die je keuze eenvoudiger maken
      </h2>

      <h3 className="mt-8 font-display text-xl font-medium tracking-tight text-foreground">
        1. Een rooster met een uitwijkmogelijkheid
      </h3>
      <p className="mt-4">
        Eén perfecte les op één avond kan aantrekkelijk lijken, maar is kwetsbaar zodra je agenda
        verandert. Kijk of er binnen dezelfde week een tweede haalbaar moment is. Zo hoeft een
        drukke werkdag niet meteen te betekenen dat je een hele week overslaat.
      </p>

      <h3 className="mt-8 font-display text-xl font-medium tracking-tight text-foreground">
        2. Duidelijke lesbeschrijvingen
      </h3>
      <p className="mt-4">
        Namen als flow, yin of restorative geven een richting, maar zeggen niet alles over tempo en
        intensiteit. Een goede beschrijving vertelt of een les actief of rustig is, hoeveel ervaring
        je nodig hebt en wat je ongeveer kunt verwachten. Bekijk daarom vóór je boekt de{" "}
        <Link
          to="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          actuele lesmogelijkheden en tijden
        </Link>
        .
      </p>

      <h3 className="mt-8 font-display text-xl font-medium tracking-tight text-foreground">
        3. Een sfeer waarin je kunt beginnen zoals je bent
      </h3>
      <p className="mt-4">
        De website geeft een eerste indruk, maar de ervaring in de ruimte telt zwaarder. Word je
        vriendelijk ontvangen? Zijn aanwijzingen helder? Voel je ruimte om een houding aan te passen
        of even rust te nemen? Zeker als beginner is een benaderbare docent vaak belangrijker dan
        een uitgebreid aanbod op papier.
      </p>

      <h3 className="mt-8 font-display text-xl font-medium tracking-tight text-foreground">
        4. Een route die past bij je echte week
      </h3>
      <p className="mt-4">
        Test de route niet op een rustige zondagmiddag als je meestal na je werk gaat. Let op
        verkeer, overstappen en de tijd die je nodig hebt om zonder haast binnen te komen. De beste
        locatie is vaak de plek waar je op een gewone, volle dag nog steeds naartoe gaat.
      </p>

      <h2
        id="een-lokale-optie-aan-de-cruquiusweg"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Een lokale optie aan de Cruquiusweg
      </h2>
      <p className="mt-4">
        Yoga Zeeburg is een kleine yogastudio aan de Cruquiusweg 96F, boven CrossFit Zeeburg en vlak
        bij het water. Vanuit delen van de Indische Buurt kan Cruquius een logische optie zijn, maar
        de precieze route verschilt per vertrekpunt. Controleer die daarom voor je boekt.
      </p>
      <p className="mt-4">
        Op het reguliere rooster staan zowel actievere als rustigere lessen. De studio omschrijft
        zichzelf als persoonlijk, nuchter en beginnersvriendelijk. Voor actuele wijzigingen,
        beschikbaarheid en reserveringen blijft het boekingssysteem leidend.
      </p>
      <section
        aria-labelledby="contextuele-cta-heading"
        className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8"
      >
        <h3
          id="contextuele-cta-heading"
          className="font-display text-lg font-medium tracking-tight text-foreground"
        >
          Wil je ontdekken of deze route en sfeer bij je passen?
        </h3>
        <p className="mt-3 text-foreground">
          Met de 14-daagse introductiepas kun je verschillende lessen, docenten en tijden proberen.
          Zo beoordeel je niet alleen één les, maar ook hoe makkelijk yoga in je gewone week past.{" "}
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
        id="probeer-niet-alles-tegelijk"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Probeer niet alles tegelijk
      </h2>
      <p className="mt-4">
        Maak eerst een shortlist van twee locaties die praktisch haalbaar zijn. Kies bij iedere
        locatie een les die past bij wat je nu nodig hebt: rustiger als je wilt vertragen, actiever
        als je wilt bewegen. Probeer bij voorkeur twee lessen voordat je een oordeel vormt. De
        docent, groepsgrootte en energie kunnen per moment verschillen.
      </p>
      <p className="mt-4">
        Noteer na afloop kort drie dingen: hoe voelde de route, begreep je de begeleiding en zou je
        volgende week opnieuw gaan? Dat laatste is vaak de beste graadmeter. Een studio hoeft niet
        in elk opzicht perfect te zijn; ze moet vooral goed genoeg passen om regelmatig terug te
        keren.
      </p>

      <h2
        id="zo-kies-je-een-yoga-optie-die-blijft-werken"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Zo kies je een yoga-optie die blijft werken
      </h2>
      <p className="mt-4">
        Voor yoga in de Indische Buurt en omgeving zijn er meerdere mogelijkheden. Maak de keuze
        klein en praktisch: vergelijk twee locaties, controleer het echte rooster, test de route en
        volg een proefles. Kijk daarna niet alleen naar de les zelf, maar naar het complete ritueel
        van vertrek tot thuiskomst.
      </p>
      <p className="mt-4">
        Woon je in Amsterdam Oost, dan kan het zinvol zijn om de omliggende buurten mee te nemen.
        Een studio in Zeeburg of Cruquius kan door de route en het rooster beter passen dan een
        adres dat op de kaart iets dichterbij lijkt.
      </p>
    </>
  );
}
