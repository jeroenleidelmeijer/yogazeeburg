// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: hoe-ziet-een-eerste-yogales-eruit

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import eersteLesHeroAsset from "@/assets/eerste-yogales-stap-voor-stap-hero.webp.asset.json";
import eersteLesInlineAsset from "@/assets/opbouw-eerste-yogales-van-start-tot-savasana.webp.asset.json";
import { type Article, CATEGORY_BEGINNEN_MET_YOGA } from "../article-types";

const EERSTE_LES_HERO_IMAGE: ArticleImageRef = {
  url: eersteLesHeroAsset.url,
  alt: "Lege yogamat met blokken, bolster en deken klaar voor een eerste yogales aan het water",
  width: 1600,
  height: 900,
};

const EERSTE_LES_INLINE_IMAGE: ArticleImageRef = {
  url: eersteLesInlineAsset.url,
  alt: "Yogamat, blokken, riem, bolster en deken als verbeelding van de opbouw van een yogales",
  width: 1600,
  height: 900,
};

export const article: Article = {
  slug: "hoe-ziet-een-eerste-yogales-eruit",
  title: "Eerste yogales stap voor stap: zo ziet de les eruit",
  h1: "Eerste yogales stap voor stap: zo ziet de les eruit",
  seoTitle: "Hoe ziet een eerste yogales eruit? Stap voor stap | Yoga Zeeburg",
  description:
    "Hoe ziet een eerste yogales eruit? Volg de les stap voor stap: aankomen, adem, warming-up, houdingen, opties, savasana en rustig afronden.",
  intro:
    "Een eerste yogales verloopt meestal in een rustige volgorde: je komt binnen, meldt dat je nieuw bent, kiest een plek en legt je mat en eventuele hulpmiddelen klaar. De docent begint met een kort aankomstmoment en aandacht voor de adem. Daarna warm je geleidelijk op, oefen je een reeks houdingen en bouwt het tempo tegen het einde weer af. De les sluit vaak af met savasana: enkele minuten ontspannen op je rug. Je hoeft niets uit je hoofd te kennen, niet iedere houding mee te doen en niemand bij te houden. De docent begeleidt de volgorde; jij kiest steeds de optie die vandaag past.",
  category: CATEGORY_BEGINNEN_MET_YOGA,
  type: "how-to",
  pillar: false,
  publishedAt: "2026-08-26",
  updatedAt: "2026-08-26",
  readingTimeMin: 8,
  toc: [
    { id: "voor-de-les", label: "Voor de les: binnenkomen en je plek kiezen" },
    { id: "eerste-minuten", label: "De eerste minuten: aankomen en ademen" },
    { id: "warming-up", label: "De warming-up: rustig in beweging komen" },
    { id: "hoofddeel", label: "Het hoofddeel: houdingen en reeksen" },
    { id: "als-iets-niet-lukt", label: "Wat doe je als iets niet lukt?" },
    { id: "overgang-naar-rust", label: "De overgang naar rust" },
    { id: "savasana", label: "Savasana: de eindontspanning" },
    { id: "na-de-les", label: "Na de les: rustig afronden" },
    { id: "verschil-per-stijl", label: "Wat verschilt per yogastijl?" },
    { id: "checklist", label: "Een eenvoudige eerste-leschecklist" },
    { id: "faq", label: "Veelgestelde vragen" },
  ],
  faqs: [
    {
      question: "Hoe lang duurt een eerste yogales?",
      answer:
        "Veel groepslessen duren ongeveer 60 tot 75 minuten, maar dat verschilt per studio en lesvorm. Controleer altijd de duur in het actuele rooster.",
    },
    {
      question: "Moet ik yogahoudingen of namen kennen?",
      answer:
        "Nee. De docent begeleidt de volgorde en legt de belangrijkste bewegingen uit. Je hoeft geen Sanskrietnamen te kennen of een reeks uit je hoofd te leren.",
    },
    {
      question: "Mag ik tijdens de les rusten?",
      answer:
        "Ja. Je mag een houding aanpassen, overslaan of een rusthouding kiezen. Laat het de docent weten wanneer je duizelig wordt, pijn voelt of hulp nodig hebt.",
    },
    {
      question: "Wat is savasana?",
      answer:
        "Savasana is de eindontspanning van veel yogalessen. Je ligt meestal enkele minuten stil op je rug, eventueel ondersteund met een deken of bolster. Een andere comfortabele houding is ook mogelijk.",
    },
    {
      question: "Ben ik de enige die niet weet wat ik moet doen?",
      answer:
        "Waarschijnlijk niet. Iedere deelnemer is ooit voor het eerst geweest en de meeste mensen zijn met hun eigen oefening bezig. Zeg vooraf dat je nieuw bent; dan kan de docent extra context geven.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg — Actuele lesbeschrijvingen",
      url: "https://www.yogazeeburg.com/lessen",
    },
    { title: "Yoga Zeeburg — Actueel rooster", url: "https://www.yogazeeburg.com/rooster" },
    { title: "Yoga Zeeburg — 14-daagse Intro Pass", url: "https://www.yogazeeburg.com/trial" },
    {
      title: "Cambridge University Hospitals NHS Foundation Trust — Yoga: a guide",
      url: "https://www.cuh.nhs.uk/patient-information/yoga-a-guide-for-cardiac-rehabilitation-patients/",
    },
    { title: "Yoga Alliance — More Yoga, Better World", url: "https://yogaalliance.org/" },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  heroImage: EERSTE_LES_HERO_IMAGE,
  body: () => <EersteLesBody />,
};

function EersteLesBody() {
  return (
    <>
      <h2
        id="voor-de-les"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Voor de les: binnenkomen en je plek kiezen
      </h2>
      <p className="mt-4">
        Plan voor je eerste keer ongeveer tien minuten extra. Daardoor hoef je niet gehaast binnen te
        komen en kun je rustig ontdekken waar je jas, tas en schoenen laat. Meld je even bij de
        docent en zeg dat dit je eerste yogales is. Je hoeft geen uitgebreid verhaal te vertellen;
        één zin is genoeg.
      </p>
      <p className="mt-4">
        Is er iets wat relevant is voor veilig bewegen, zoals een blessure, zwangerschap,
        duizeligheid of een recente operatie? Bespreek dat vóór de les en vraag bij twijfel vooraf
        advies aan een passende zorgverlener. De docent kan binnen de les opties aanbieden, maar
        stelt geen medische diagnose.
      </p>
      <p className="mt-4">
        In de oefenruimte kies je een vrije plek en leg je de mat neer zoals de andere matten liggen.
        Blokken, een riem, bolster of deken zijn geen teken dat een houding &lsquo;te
        moeilijk&rsquo; is. Het zijn gewone hulpmiddelen waarmee je een positie beter kunt aanpassen.
        Zet je telefoon stil en houd water binnen bereik als de studio dat toestaat.
      </p>

      <h2
        id="eerste-minuten"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        De eerste minuten: aankomen en ademen
      </h2>
      <p className="mt-4">
        Veel yogalessen beginnen zittend of liggend. De docent nodigt je uit om de aandacht naar je
        adem en lichaam te brengen. Soms is het even stil; soms krijg je een paar eenvoudige
        aanwijzingen. Je hoeft op dit moment niets bijzonders te voelen of je hoofd leeg te maken.
      </p>
      <p className="mt-4">
        Het doel van deze opening is vooral de overgang van buiten naar de les. Je merkt op hoe je
        erbij zit, zonder dat meteen te hoeven veranderen. Het kan onwennig zijn om stil te beginnen,
        zeker na een drukke dag. Dat is normaal. Laat je aandacht gewoon terugkomen bij de stem van
        de docent of bij je adem.
      </p>

      <h2
        id="warming-up"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        De warming-up: rustig in beweging komen
      </h2>
      <p className="mt-4">
        Na de opening volgen meestal eenvoudige bewegingen. Denk aan het losmaken van schouders en
        nek, rustig bewegen van de wervelkolom of houdingen op handen en knieën. In een actievere les
        kan de warming-up sneller opbouwen; in yin of restorative blijft het tempo laag.
      </p>
      <p className="mt-4">
        De docent noemt de houding, laat soms iets zien en geeft aanwijzingen voor richting, adem en
        houding. Je hoeft alle namen niet te onthouden. Kijk gerust kort om je heen als je de uitleg
        niet meteen begrijpt, maar probeer niet voortdurend de persoon naast je te kopiëren. Ieder
        lichaam beweegt anders en die deelnemer kan een andere optie hebben gekozen.
      </p>

      <h2
        id="hoofddeel"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Het hoofddeel: houdingen en reeksen
      </h2>
      <p className="mt-4">
        In het hoofddeel oefen je de houdingen die passen bij de lesstijl. Een rustige les kan vooral
        zittende of liggende vormen bevatten die langer worden aangehouden. In hatha worden houdingen
        vaak afzonderlijk opgebouwd. Bij vinyasa of flow worden meerdere houdingen vloeiend met
        elkaar verbonden.
      </p>
      <p className="mt-4">
        Je kunt staande houdingen, balans, zachte draaibewegingen, vooroverbuigingen of eenvoudige
        krachtmomenten tegenkomen. Niet iedere les bevat alles. De docent bepaalt een logische opbouw
        en geeft aan wanneer je wisselt, rust of een hulpmiddel gebruikt.
      </p>
      <p className="mt-4">
        Luister meer naar de kwaliteit van je beweging dan naar de vorm die je denkt te moeten
        bereiken. Kun je rustig blijven ademen? Kun je de aanwijzing volgen zonder te haasten? Dan
        zit je meestal dichter bij een passende intensiteit dan wanneer je probeert zo diep mogelijk
        te komen.
      </p>

      <ArticleFigure
        image={EERSTE_LES_INLINE_IMAGE}
        caption="De precieze les verschilt, maar veel lessen bewegen van aankomen via houdingen naar een rustige eindontspanning."
        className="mt-10"
      />

      <h2
        id="als-iets-niet-lukt"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat doe je als iets niet lukt?
      </h2>
      <p className="mt-4">
        Dan kies je een andere optie, rust je even of sla je de houding over. Dat is een normaal
        onderdeel van yoga. Een docent kan voorstellen om je knieën te buigen, een blok te gebruiken,
        minder ver te bewegen of een rusthouding te nemen. Je mag ook zelf uit een positie komen.
      </p>
      <p className="mt-4">
        Een uitdaging kan inspanning of rek geven, maar scherpe, stekende of plotselinge pijn is een
        reden om te stoppen. Ook bij duizeligheid, misselijkheid of een onveilig gevoel kom je rustig
        uit de houding en trek je de aandacht van de docent.
      </p>
      <p className="mt-4">
        Fysieke correcties zijn nooit verplicht. Wil een docent je aanraken om een richting aan te
        geven, dan hoort daar toestemming bij. Je mag nee zeggen, ook als je eerder wel toestemming
        gaf.
      </p>

      <h2
        id="overgang-naar-rust"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        De overgang naar rust
      </h2>
      <p className="mt-4">
        Tegen het einde wordt de les meestal rustiger. Na een actieve reeks volgen vaak zittende of
        liggende houdingen met minder inspanning. De adem vertraagt en je krijgt tijd om na te
        voelen.
      </p>
      <p className="mt-4">
        Dit deel kan kort of uitgebreid zijn. Bij slow flow, yin of restorative krijgt het vaak meer
        ruimte dan bij een dynamische les. Gebruik gerust een deken of bolster als dat comfortabeler
        is. De afbouw is geen bijzaak: ze vormt de brug tussen bewegen en de eindontspanning.
      </p>

      <h2
        id="savasana"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Savasana: de eindontspanning
      </h2>
      <p className="mt-4">
        Veel lessen eindigen met savasana. Je ligt meestal op je rug, met de armen en benen
        ontspannen. Een deken onder je hoofd, een bolster onder je knieën of een extra laag kleding
        kan prettig zijn. Kun je niet comfortabel op je rug liggen, kies dan in overleg een andere
        houding.
      </p>
      <p className="mt-4">
        Tijdens savasana hoef je niet te slapen, mediteren of iets te bereiken. Je blijft gewoon
        enkele minuten liggen terwijl de docent de stilte begeleidt. Gedachten mogen er zijn. Als je
        merkt dat je afdwaalt, keer je terug naar je adem of het contact met de mat.
      </p>
      <p className="mt-4">
        Aan het einde brengt de docent de groep rustig terug. Vaak beweeg je eerst handen en voeten,
        rol je op een zij en kom je daarna zitten. Wacht even op de afsluiting voordat je je spullen
        pakt; zo blijft de rust voor de hele groep behouden.
      </p>

      <h2
        id="na-de-les"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Na de les: rustig afronden
      </h2>
      <p className="mt-4">
        Ruim de gebruikte materialen op de plek terug waar je ze vond. Heb je een praktische vraag of
        voelde een houding niet prettig, stel die dan na afloop aan de docent. Je hoeft de hele les
        niet meteen te beoordelen.
      </p>
      <p className="mt-4">
        Let liever op drie dingen: voelde de uitleg duidelijk, kon je binnen je eigen grenzen oefenen
        en is de drempel om terug te komen laag? Spiervermoeidheid of stijfheid kan na een nieuwe
        bewegingsvorm voorkomen. Aanhoudende pijn of klachten horen niet bij een geslaagde eerste les
        en vragen om passende professionele aandacht.
      </p>
      <p className="mt-4">
        Eén les vertelt vooral iets over dat moment, die docent en die stijl. Wil je eerlijker
        vergelijken, lees dan{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-proefles-of-introductiepas-wat-is-slimmer" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Yoga proefles of introductiepas: wat is slimmer?
        </Link>
        .
      </p>

      <h2
        id="verschil-per-stijl"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Wat verschilt per yogastijl?
      </h2>
      <p className="mt-4">
        De basisvolgorde van aankomen, oefenen en afronden komt vaak terug, maar het middendeel
        verschilt sterk. Yin gebruikt weinig overgangen en langer aangehouden houdingen. Restorative
        werkt met veel ondersteuning en weinig spierinspanning. Vinyasa verbindt houdingen vloeiend
        met de adem. Een sterke flow bouwt doorgaans meer warmte en kracht op.
      </p>
      <p className="mt-4">
        Kies daarom niet alleen op een bekende naam. Kijk naar tempo, intensiteit, ervaring en focus
        in de actuele lesomschrijving. Onze gids{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "welke-yogastijl-past-bij-mij" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Welke yogastijl past bij mij?
        </Link>{" "}
        helpt je die verschillen vergelijken. Wil je bewust rustig starten, bekijk dan ook{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "rustige-yoga-voor-beginners-welke-les-past-het-beste" }}
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Rustige yoga voor beginners
        </Link>
        .
      </p>

      <h2
        id="checklist"
        className="mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Een eenvoudige eerste-leschecklist
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>Boek een les die bij je ervaring en gewenste tempo past.</li>
        <li>Draag comfortabele kleding waarin je vrij beweegt.</li>
        <li>Kom ongeveer tien minuten eerder.</li>
        <li>Vertel de docent dat je nieuw bent en deel relevante aandachtspunten.</li>
        <li>Gebruik blokken, riem, deken of bolster wanneer dat helpt.</li>
        <li>Neem rust en kies opties zonder jezelf met anderen te vergelijken.</li>
        <li>Blijf tot de gezamenlijke afsluiting en stel vragen na de les.</li>
      </ul>
      <p className="mt-4">
        Bekijk vóór vertrek de actuele{" "}
        <a
          href="/lessen"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          lessen
        </a>{" "}
        en het{" "}
        <a
          href="/rooster"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          rooster
        </a>{" "}
        van Yoga Zeeburg. Met de{" "}
        <a
          href="/trial"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          14-daagse Intro Pass
        </a>{" "}
        kun je meerdere lessen en docenten ervaren voordat je kiest wat je wilt blijven doen.
      </p>

      <section
        aria-labelledby="cta-eerste-les"
        className="mt-14 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8"
      >
        <h2
          id="cta-eerste-les"
          className="font-display text-2xl font-medium tracking-tight text-foreground"
        >
          Ervaar je eerste yogales zonder haast
        </h2>
        <p className="mt-3">
          Probeer 14 dagen onbeperkt verschillende lessen, docenten en tijden bij Yoga Zeeburg in
          Amsterdam Oost. Zo ontdek je in de praktijk welke les bij jou past.
        </p>
        <a
          href="/trial"
          className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Bekijk de 14-daagse Intro Pass
        </a>
        <p className="mt-3 text-sm text-muted-foreground">
          Voor nieuwe studenten. Stopt automatisch.
        </p>
      </section>
    </>
  );
}
