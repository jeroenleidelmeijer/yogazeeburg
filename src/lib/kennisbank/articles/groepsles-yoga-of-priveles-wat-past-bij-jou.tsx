// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: groepsles-yoga-of-priveles-wat-past-bij-jou

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import groepsPriveHeroAsset from "@/assets/groepsles-yoga-of-priveles-hero.webp.asset.json";
import groepsPriveInlineAsset from "@/assets/groepsles-en-priveyoga-vergeleken.webp.asset.json";
import { type Article, CATEGORY_BEGINNEN_MET_YOGA } from "../article-types";

const GROEPS_PRIVE_HERO_IMAGE: ArticleImageRef = {
  url: groepsPriveHeroAsset.url,
  alt: "Meerdere lege yogamatten met blokken in een rustige lichte ruimte, klaar voor een groepsles.",
  width: 1536,
  height: 1024,
};

const GROEPS_PRIVE_INLINE_IMAGE: ArticleImageRef = {
  url: groepsPriveInlineAsset.url,
  alt: "Een rij yogamatten naast een afzonderlijk ingerichte mat als rustige vergelijking tussen groepsles en privéles.",
  width: 1536,
  height: 1024,
};

export const article: Article = {
  slug: "groepsles-yoga-of-priveles-wat-past-bij-jou",
  title: "Groepsles yoga of privéles: wat past bij jou?",
  h1: "Groepsles yoga of privéles: wat past bij jou?",
  seoTitle: "Groepsles yoga of privéles? | Yoga Zeeburg",
  description:
    "Kies je voor een groepsles yoga of privéles? Vergelijk begeleiding, tempo, kosten, flexibiliteit en sfeer en ontdek wat bij jou past.",
  intro:
    "Twijfel je tussen een groepsles yoga en een privéles? Voor de meeste beginners zonder bijzondere individuele hulpvraag is een goed begeleide groepsles de praktischste start: je hebt een vast ritme, kunt verschillende stijlen ontdekken en betaalt doorgaans minder per les. Een privéles past beter wanneer je volledige aandacht wilt, in je eigen tempo wilt werken of heel gerichte vragen hebt. Geen van beide is automatisch beter; de juiste keuze hangt af van je doel, behoefte aan begeleiding, agenda en budget.",
  category: CATEGORY_BEGINNEN_MET_YOGA,
  type: "comparison",
  pillar: false,
  publishedAt: "2026-09-07",
  updatedAt: "2026-09-07",
  readingTimeMin: 8,
  toc: [
    { id: "belangrijkste-verschil", label: "Het belangrijkste verschil in één oogopslag" },
    { id: "wanneer-groepsles", label: "Wanneer past een groepsles goed?" },
    { id: "wanneer-priveles", label: "Wanneer kan een privéles beter passen?" },
    { id: "kies-op-behoefte", label: "Kies op basis van wat je nu nodig hebt" },
    { id: "combinatie", label: "Een combinatie kan ook werken" },
    { id: "bij-yoga-zeeburg", label: "Wat kun je bij Yoga Zeeburg kiezen?" },
    { id: "beslischeck", label: "Een simpele beslischeck" },
    { id: "faq", label: "Veelgestelde vragen" },
    { id: "cta-groepsles-of-priveles", label: "Klaar om te ervaren wat bij je past?" },
  ],
  faqs: [
    {
      question: "Is een privéles beter voor beginners?",
      answer:
        "Niet automatisch. Veel beginners kunnen goed starten in een beginnersvriendelijke groepsles met duidelijke uitleg en variaties. Een privéles is vooral handig als je veel persoonlijke feedback wilt, een specifieke vraag hebt of eerst in een besloten setting wilt kennismaken.",
    },
    {
      question: "Krijg je in een groepsles persoonlijke aandacht?",
      answer:
        "Meestal wel, maar de docent verdeelt de aandacht over alle deelnemers. Je krijgt algemene aanwijzingen en waar mogelijk een persoonlijke optie of korte correctie. Verwacht niet dat de hele groepsles voortdurend op jou wordt afgestemd.",
    },
    {
      question: "Is privéyoga duurder dan een groepsles?",
      answer:
        "Doorgaans wel. Bij een privéles reserveer je de tijd van een docent voor jezelf, terwijl de kosten van een groepsles over meerdere deelnemers worden verdeeld. Prijzen verschillen per docent, duur en locatie.",
    },
    {
      question: "Kan ik met een blessure gewoon yoga doen?",
      answer:
        "Dat hangt af van de blessure en de les. Een yogadocent stelt geen diagnose. Vraag bij pijn of twijfel advies aan een bevoegde zorgprofessional en informeer de docent vóór de les, zodat die kan aangeven welke opties binnen de les mogelijk zijn.",
    },
    {
      question: "Biedt Yoga Zeeburg privélessen aan?",
      answer:
        "Op dit moment staat privéles niet als boekbaar aanbod op de openbare les- en prijspagina van Yoga Zeeburg. Yoga Zeeburg biedt wel twaalf wekelijkse groepslessen in Amsterdam Oost. Controleer de website voor het actuele aanbod.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg — lessen, geraadpleegd 7 september 2026",
      url: "https://www.yogazeeburg.com/lessen",
    },
    {
      title: "Yoga Zeeburg — weekrooster, geraadpleegd 7 september 2026",
      url: "https://www.yogazeeburg.com/rooster",
    },
    {
      title: "Yoga Zeeburg — prijzen, geraadpleegd 7 september 2026",
      url: "https://www.yogazeeburg.com/prijzen",
    },
    {
      title: "Yoga Zeeburg — contact, geraadpleegd 7 september 2026",
      url: "https://www.yogazeeburg.com/contact",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  heroImage: GROEPS_PRIVE_HERO_IMAGE,
  body: () => <GroepsPriveBody />,
};

function GroepsPriveBody() {
  const h2 = "mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl";
  const link = "font-medium text-primary underline underline-offset-4 hover:no-underline";
  return (
    <>
      <h2 id="belangrijkste-verschil" className={h2}>
        Het belangrijkste verschil in één oogopslag
      </h2>
      <p className="mt-4">
        In een groepsles geeft een docent les aan meerdere deelnemers tegelijk. Je volgt samen een
        opbouw, maar kiest binnen die les waar mogelijk een variant die bij jou past. Bij een
        privéles is de tijd volledig voor één persoon, of soms voor een klein eigen gezelschap. De
        docent kan de les dan rond jouw vragen en tempo opbouwen.
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse text-left text-[15px]">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 pr-4 font-display font-medium text-foreground">Je vergelijkt</th>
              <th className="py-3 pr-4 font-display font-medium text-foreground">Groepsles yoga</th>
              <th className="py-3 font-display font-medium text-foreground">Privéles yoga</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="py-3 pr-4 align-top font-medium text-foreground">Begeleiding</td>
              <td className="py-3 pr-4 align-top">
                Verdeeld over de groep, met algemene aanwijzingen en persoonlijke opties waar
                mogelijk
              </td>
              <td className="py-3 align-top">
                Volledige aandacht en veel ruimte voor individuele feedback
              </td>
            </tr>
            <tr>
              <td className="py-3 pr-4 align-top font-medium text-foreground">Tempo en inhoud</td>
              <td className="py-3 pr-4 align-top">
                Vooraf bepaalde lesvorm en gezamenlijke opbouw
              </td>
              <td className="py-3 align-top">Afgestemd op je vraag, niveau en tempo</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 align-top font-medium text-foreground">Sfeer</td>
              <td className="py-3 pr-4 align-top">
                Samen oefenen, zonder dat het een wedstrijd hoeft te zijn
              </td>
              <td className="py-3 align-top">Rustig en besloten, zonder andere deelnemers</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 align-top font-medium text-foreground">Planning</td>
              <td className="py-3 pr-4 align-top">Keuze uit het vaste rooster</td>
              <td className="py-3 align-top">
                Vaak in overleg, afhankelijk van docent en locatie
              </td>
            </tr>
            <tr>
              <td className="py-3 pr-4 align-top font-medium text-foreground">Kosten</td>
              <td className="py-3 pr-4 align-top">Meestal voordeliger per les</td>
              <td className="py-3 align-top">Meestal duidelijk duurder per afspraak</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 align-top font-medium text-foreground">Variatie</td>
              <td className="py-3 pr-4 align-top">
                Makkelijk verschillende lessen en docenten proberen
              </td>
              <td className="py-3 align-top">
                Gericht werken aan een kleiner aantal doelen of vragen
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ArticleFigure
        image={GROEPS_PRIVE_INLINE_IMAGE}
        caption="De beste lesvorm hangt af van hoeveel persoonlijke aandacht, flexibiliteit en groepsenergie je zoekt."
        className="mt-10"
      />

      <h2 id="wanneer-groepsles" className={h2}>
        Wanneer past een groepsles goed?
      </h2>
      <p className="mt-4">
        Een groepsles past vaak goed als je yoga onderdeel van je week wilt maken. Een vast rooster
        haalt een beslissing weg: je reserveert een moment en stapt de les in. Dat helpt vooral
        wanneer je niet thuis zelf een programma wilt samenstellen.
      </p>
      <p className="mt-4">
        Ook als beginner kun je prima in een groep starten, zolang je een toegankelijke les kiest en
        de docent ruimte geeft voor opties. Bij Yoga Zeeburg zijn de meeste lessen
        beginnersvriendelijk. Op de pagina met{" "}
        <Link to="/lessen" className={link}>
          alle yogalessen
        </Link>{" "}
        zie je per les het tempo, de ervaring en wat je kunt verwachten. Wil je vooral zacht
        beginnen, lees dan ook welke{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "rustige-yoga-voor-beginners-welke-les-past-het-beste" }}
          className={link}
        >
          rustige yogales voor beginners
        </Link>{" "}
        bij je kan passen.
      </p>
      <p className="mt-4">
        Een groepsles biedt daarnaast iets wat je in een één-op-éénsetting mist: gezamenlijke
        aandacht. Je hoeft niet met anderen te presteren, maar het kan motiveren dat iedereen
        hetzelfde moment vrijmaakt om te oefenen. Je leert bovendien door dezelfde aanwijzing in
        verschillende houdingen toe te passen.
      </p>
      <p className="mt-4">
        De belangrijkste beperking is logisch: een docent verdeelt de aandacht. Je kunt een vraag
        stellen en vaak een alternatief krijgen, maar de hele les kan niet voortdurend rond één
        deelnemer draaien. Kijk daarom vooraf goed naar lesniveau en tempo en vertel de docent vóór
        de les kort wat relevant is.
      </p>

      <h2 id="wanneer-priveles" className={h2}>
        Wanneer kan een privéles beter passen?
      </h2>
      <p className="mt-4">
        Een privéles kan zinvol zijn als je een heel gerichte leervraag hebt. Misschien wil je
        enkele basishoudingen rustig doornemen, beter begrijpen hoe je hulpmiddelen gebruikt of
        eerst vertrouwd raken met een lesvorm voordat je een groep instapt. De docent kan meer
        observeren, uitleg herhalen en het tempo direct aanpassen.
      </p>
      <p className="mt-4">
        Ook mensen die zich in een groep snel overweldigd voelen, kunnen een besloten eerste
        kennismaking prettig vinden. Het nadeel is dat je de energie en routine van een vaste groep
        mist. Bovendien kost persoonlijke tijd van een docent meer, waardoor privéles meestal een
        grotere investering is.
      </p>
      <p className="mt-4">
        Belangrijk: persoonlijke yogabegeleiding is geen medische diagnose of behandeling. Heb je
        pijn, een blessure, ben je zwanger of twijfel je of bewegen verantwoord is, bespreek dat dan
        zo nodig eerst met een bevoegde zorgprofessional. Vertel daarna ook de yogadocent wat die
        voor een veilige leskeuze moet weten.
      </p>

      <h2 id="kies-op-behoefte" className={h2}>
        Kies op basis van wat je nu nodig hebt
      </h2>
      <p className="mt-4">
        Je hoeft geen definitieve keuze voor de komende jaren te maken. Kijk naar je eerstvolgende
        stap.
      </p>
      <p className="mt-4">Kies eerder een groepsles wanneer je:</p>
      <ul className="mt-3 list-disc space-y-2 pl-6">
        <li>een betaalbare, regelmatige yogaroutine wilt opbouwen;</li>
        <li>graag een vast moment in je agenda zet;</li>
        <li>verschillende stijlen, docenten en tempo’s wilt ervaren;</li>
        <li>voldoende hebt aan algemene uitleg en opties binnen de les;</li>
        <li>het prettig vindt om samen te oefenen.</li>
      </ul>
      <p className="mt-4">Kies eerder een privéles wanneer je:</p>
      <ul className="mt-3 list-disc space-y-2 pl-6">
        <li>één duidelijke techniek of vraag uitgebreid wilt bespreken;</li>
        <li>veel individuele feedback nodig hebt;</li>
        <li>in een volledig eigen tempo wilt kennismaken;</li>
        <li>geen passende groepsles in je agenda kunt vinden;</li>
        <li>de hogere kosten vindt opwegen tegen persoonlijke aandacht.</li>
      </ul>
      <p className="mt-4">
        Twijfel je vooral over de inhoud van de les, bepaal dan eerst{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "welke-yogastijl-past-bij-mij" }}
          className={link}
        >
          welke yogastijl bij je past
        </Link>
        . De keuze voor rustig, gebalanceerd of dynamisch is soms belangrijker dan de keuze tussen
        groep en privé.
      </p>

      <h2 id="combinatie" className={h2}>
        Een combinatie kan ook werken
      </h2>
      <p className="mt-4">
        Groepsles en privéles sluiten elkaar niet uit. Je kunt bijvoorbeeld met één of enkele
        privélessen een basis leggen en daarna aansluiten bij een groep. Andersom kan een groepsles
        je laten ontdekken waarover je gerichte uitleg wilt. Daarna pak je die vraag eventueel
        één-op-één op bij een aanbieder die privébegeleiding biedt.
      </p>
      <p className="mt-4">
        Voor veel beginners is de eenvoudigste route nog steeds: probeer eerst meerdere groepslessen
        en evalueer daarna. Let niet alleen op wat je fysiek kunt, maar ook op de uitleg, sfeer,
        reistijd en het moment van de week. Een les die je werkelijk blijft volgen is meestal
        waardevoller dan een theoretisch perfecte optie die niet in je leven past.
      </p>
      <blockquote className="mt-8 border-l-2 border-primary pl-5 text-foreground/85">
        Wil je groepslessen vergelijken zonder je direct vast te leggen? Met de 14-daagse Intro Pass
        kun je bij Yoga Zeeburg verschillende lessen, docenten en tijden proberen. De pas kost €30,
        is alleen voor nieuwe leerlingen en stopt automatisch.
      </blockquote>
      <p className="mt-5">
        <Link to="/trial" className={link}>
          Bekijk de 14-daagse Intro Pass
        </Link>
      </p>

      <h2 id="bij-yoga-zeeburg" className={h2}>
        Wat kun je bij Yoga Zeeburg kiezen?
      </h2>
      <p className="mt-4">
        Yoga Zeeburg publiceert op dit moment uitsluitend groepslessen als regulier aanbod. Er zijn
        twaalf wekelijkse lessen in Amsterdam Oost, verspreid over zeven dagen. Het aanbod loopt van
        zachte Yin, Nidra en herstellende lessen tot Vinyasa, Pilates Fusion en stevigere flows.
        Bekijk altijd het actuele{" "}
        <Link to="/rooster" className={link}>
          weekrooster
        </Link>
        , omdat beschikbaarheid en wijzigingen via Sportbit worden bijgehouden.
      </p>
      <p className="mt-4">
        Een openbare privéles staat niet op de les- of prijspagina. Dit artikel vergelijkt privéles
        daarom als algemene lesvorm en beweert niet dat je die bij Yoga Zeeburg kunt boeken.
      </p>

      <h2 id="beslischeck" className={h2}>
        Een simpele beslischeck
      </h2>
      <p className="mt-4">Beantwoord deze vijf vragen:</p>
      <ol className="mt-3 list-decimal space-y-2 pl-6">
        <li>Heb ik een specifieke individuele vraag, of wil ik vooral beginnen en ervaren?</li>
        <li>Wil ik volledige aandacht, of vind ik algemene uitleg met variaties voldoende?</li>
        <li>Geeft een vast rooster mij houvast, of heb ik echt maatwerk in planning nodig?</li>
        <li>Hoe belangrijk is samen oefenen voor mijn motivatie?</li>
        <li>Welk bedrag wil ik per les besteden?</li>
      </ol>
      <p className="mt-4">
        Heb je vooral behoefte aan ritme, variatie en een toegankelijke prijs, begin dan met een
        groepsles. Heb je een duidelijk afgebakende vraag waarvoor veel persoonlijke tijd nodig is,
        onderzoek dan een privéles. En weet je het nog niet? Een proefperiode geeft vaak meer
        bruikbare informatie dan lang vergelijken. Lees ook wanneer een{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "yoga-proefles-of-introductiepas-wat-is-slimmer" }}
          className={link}
        >
          proefles of introductiepas
        </Link>{" "}
        de slimste eerste stap is.
      </p>

      <section
        aria-labelledby="cta-groepsles-of-priveles"
        className="mt-14 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8"
      >
        <h2
          id="cta-groepsles-of-priveles"
          className="font-display text-2xl font-medium tracking-tight text-foreground"
        >
          Klaar om te ervaren wat bij je past?
        </h2>
        <p className="mt-3">
          Begin met 14 dagen onbeperkt groepslessen bij Yoga Zeeburg. Probeer verschillende stijlen,
          docenten en tijden en ontdek in de praktijk welk ritme bij jou past. De Intro Pass kost
          €30, stopt automatisch en is alleen voor nieuwe leerlingen.
        </p>
        <a
          href="/trial"
          className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Start met 14 dagen onbeperkt yoga
        </a>
      </section>
    </>
  );
}
