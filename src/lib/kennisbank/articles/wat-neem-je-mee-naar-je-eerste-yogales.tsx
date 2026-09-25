// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: wat-neem-je-mee-naar-je-eerste-yogales

import { Link } from "@tanstack/react-router";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import heroAsset from "@/assets/wat-neem-je-mee-eerste-yogales-hero.webp.asset.json";
import inlineAsset from "@/assets/eerste-yogales-paklijst.webp.asset.json";
import { type Article, CATEGORY_BEGINNEN_MET_YOGA } from "../article-types";

const HERO_IMAGE: ArticleImageRef = {
  url: heroAsset.url,
  alt: "Opgerolde yogamat met waterfles, handdoek, yogablokken en tas in een rustige lege yogaruimte.",
  width: 1536,
  height: 1024,
};

const INLINE_IMAGE: ArticleImageRef = {
  url: inlineAsset.url,
  alt: "Waterfles, handdoek, yogablokken, yogariem en kleine persoonlijke spullen naast een yogamat.",
  width: 1536,
  height: 1024,
};

export const article: Article = {
  slug: "wat-neem-je-mee-naar-je-eerste-yogales",
  title: "Wat neem je mee naar je eerste yogales?",
  h1: "Wat neem je mee naar je eerste yogales?",
  seoTitle: "Wat neem je mee naar je eerste yogales? | Yoga Zeeburg",
  ogTitle: "Wat neem je mee naar je eerste yogales?",
  description:
    "Wat neem je mee naar je eerste yogales? Bekijk de korte paklijst, wat meestal niet nodig is en hoe je ontspannen voorbereid aankomt.",
  ogDescription:
    "Een praktische paklijst voor je eerste yogales: wat echt handig is, wat je thuis kunt laten en wat je vooraf controleert.",
  intro:
    "Voor je eerste yogales heb je meestal maar weinig nodig: comfortabele kleding, een flesje water en eventueel een kleine handdoek. Neem alleen een eigen yogamat mee als de studio dat vraagt of als je liever je eigen mat gebruikt. Controleer vooraf in je boekingsbevestiging of matten en hulpmiddelen aanwezig zijn. Handig zijn verder een elastiekje voor lang haar, warme sokken of een vest voor de eindontspanning en noodzakelijke medicatie. Laat grote tassen, waardevolle spullen, sterke parfum en een volle maaltijd vlak voor de les liever achterwege. Met een kleine, praktische tas kom je rustiger binnen en kun je je aandacht bij de les houden.",
  category: CATEGORY_BEGINNEN_MET_YOGA,
  type: "guide",
  pillar: false,
  publishedAt: "2026-09-25",
  updatedAt: "2026-09-25",
  readingTimeMin: 6,
  cta: {
    heading: "Klaar voor je eerste les?",
    text: "Met de 14-daagse introductiepas kun je verschillende lessen, docenten en tijden bij Yoga Zeeburg in Amsterdam Oost proberen.",
    label: "Start je 14 dagen onbeperkt",
    subtext: "Voor nieuwe studenten. Stopt automatisch.",
  },
  toc: [
    { id: "de-korte-paklijst", label: "De korte paklijst" },
    { id: "heb-je-een-eigen-yogamat-nodig", label: "Heb je een eigen yogamat nodig?" },
    {
      id: "wat-neem-je-mee-voor-rustige-en-actieve-lessen",
      label: "Wat neem je mee voor rustige en actieve lessen?",
    },
    { id: "wat-kun-je-beter-thuislaten", label: "Wat kun je beter thuislaten?" },
    {
      id: "wat-als-je-een-blessure-aandoening-of-zwangerschap-wilt-melden",
      label: "Wat als je een blessure, aandoening of zwangerschap wilt melden?",
    },
    {
      id: "voor-vertrek-een-checklist-van-een-minuut",
      label: "Voor vertrek: een checklist van één minuut",
    },
    { id: "conclusie", label: "Conclusie" },
    { id: "faq", label: "Veelgestelde vragen" },
  ],
  faqs: [
    {
      question: "Moet ik een yogamat meenemen naar mijn eerste yogales?",
      answer:
        "Niet altijd. Sommige studio’s hebben matten beschikbaar, andere vragen je een eigen mat mee te nemen. Controleer de boekingsbevestiging of vraag het vooraf aan de studio. Koop niet speciaal een mat voordat je weet welke dikte en grip je prettig vindt.",
    },
    {
      question: "Neem je schoenen mee de yogazaal in?",
      answer:
        "Yoga wordt meestal op blote voeten of soms op sokken beoefend. Buitenschoenen blijven buiten de oefenruimte. Volg altijd de aanwijzingen van de studio; schone sokken kunnen prettig zijn tijdens een rustige eindontspanning.",
    },
    {
      question: "Mag ik mijn telefoon meenemen naar de yogales?",
      answer:
        "Neem hem alleen mee als dat praktisch nodig is, zet hem volledig op stil en berg hem veilig op. Een telefoon op de mat leidt af en kan in de weg liggen. Vraag bij bereikbaarheid voor een noodgeval vooraf aan de docent wat mogelijk is.",
    },
    {
      question: "Moet ik water drinken tijdens yoga?",
      answer:
        "Een waterfles meenemen is verstandig, vooral voor voor of na de les. Tijdens een rustige les hoef je niet voortdurend te drinken. Luister naar je lichaam en volg persoonlijk medisch advies als vochtinname voor jou bijzondere aandacht vraagt.",
    },
    {
      question: "Wat neem je mee naar een Yin yogales?",
      answer:
        "Naast water kan een extra warme laag, een vest of sokken prettig zijn, omdat je langer stil ligt en kunt afkoelen. Controleer vooraf of de studio dekens, bolsters en andere hulpmiddelen aanbiedt; meestal hoef je zulke grote spullen niet zelf mee te nemen.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg — Lessen, geraadpleegd 25 september 2026",
      url: "https://www.yogazeeburg.com/lessen",
    },
    {
      title: "Yoga Zeeburg — Rooster, geraadpleegd 25 september 2026",
      url: "https://www.yogazeeburg.com/rooster",
    },
    {
      title: "Yoga Zeeburg — 14-daagse introductiepas, geraadpleegd 25 september 2026",
      url: "https://www.yogazeeburg.com/trial",
    },
    {
      title:
        "National Center for Complementary and Integrative Health — Yoga: Effectiveness and Safety, geraadpleegd 25 september 2026",
      url: "https://www.nccih.nih.gov/health/yoga-effectiveness-and-safety",
    },
  ],
  template: { showTOC: true, showFAQ: true, showSources: true, showRelated: true },
  heroImage: HERO_IMAGE,
  heroCaption:
    "Een paar praktische spullen zijn genoeg om ontspannen aan je eerste yogales te beginnen.",
  body: () => <WatNeemJeMeeBody />,
};

function WatNeemJeMeeBody() {
  const h2 = "mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl";
  const h3 = "mt-10 font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl";
  const link = "font-medium text-primary underline underline-offset-4 hover:no-underline";
  return (
    <>
      <p className="mt-4">
        Voor je eerste yogales heb je meestal maar weinig nodig: comfortabele kleding, een flesje
        water en eventueel een kleine handdoek. Neem alleen een eigen yogamat mee als de studio dat
        vraagt of als je liever je eigen mat gebruikt. Controleer vooraf in je boekingsbevestiging
        of matten en hulpmiddelen aanwezig zijn. Handig zijn verder een elastiekje voor lang haar,
        warme sokken of een vest voor de eindontspanning en noodzakelijke medicatie. Laat grote
        tassen, waardevolle spullen, sterke parfum en een volle maaltijd vlak voor de les liever
        achterwege. Met een kleine, praktische tas kom je rustiger binnen en kun je je aandacht bij
        de les houden.
      </p>

      <h2 id="de-korte-paklijst" className={h2}>
        De korte paklijst
      </h2>
      <p className="mt-4">Begin met deze vijf punten:</p>
      <ol className="mt-4 list-decimal space-y-2 pl-6">
        <li>
          <strong className="font-medium text-foreground">
            Comfortabele kleding waarin je vrij kunt bewegen.
          </strong>{" "}
          Kies iets dat niet knelt en dat op zijn plaats blijft wanneer je vooroverbuigt of je armen
          optilt. Het volgende artikel in de Yoga Gids gaat uitgebreider in op kleding; voor nu is
          bewegingsvrijheid de hoofdregel.
        </li>
        <li>
          <strong className="font-medium text-foreground">Een afsluitbare waterfles.</strong> Je
          hoeft tijdens een rustige les niet voortdurend te drinken, maar het is prettig om water
          bij je te hebben voor voor of na de les. Zet de fles zo neer dat hij niet kan omvallen.
        </li>
        <li>
          <strong className="font-medium text-foreground">
            Een kleine handdoek als je snel zweet.
          </strong>{" "}
          Vooral bij een actievere Flow kan die handig zijn voor je gezicht of handen. Een grote
          sporthanddoek is meestal niet nodig.
        </li>
        <li>
          <strong className="font-medium text-foreground">Eventueel een eigen mat.</strong> Alleen
          wanneer de studio daarom vraagt, je om hygiënische of persoonlijke redenen je eigen mat
          verkiest, of je thuis al een mat hebt waar je prettig op oefent.
        </li>
        <li>
          <strong className="font-medium text-foreground">
            Kleine persoonlijke benodigdheden.
          </strong>{" "}
          Denk aan een elastiekje, een brillenkoker, noodzakelijke medicatie of warme sokken voor de
          eindontspanning.
        </li>
      </ol>
      <p className="mt-4">
        Dat is in de meeste gevallen genoeg. Blokken, riemen, dekens en bolsters zijn nuttige
        hulpmiddelen, maar controleer eerst wat de studio beschikbaar stelt voordat je ze zelf
        meesleept. Bij Yoga Zeeburg worden in verschillende rustige lessen props gebruikt om
        houdingen aan te passen en comfortabel te ondersteunen.
      </p>
      <ArticleFigure
        image={INLINE_IMAGE}
        caption="Leg alleen klaar wat voor jouw les en comfort nuttig is; controleer vooraf wat de studio al aanbiedt."
        className="mt-10"
      />

      <h2 id="heb-je-een-eigen-yogamat-nodig" className={h2}>
        Heb je een eigen yogamat nodig?
      </h2>
      <p className="mt-4">
        Dat verschilt per studio. Sommige studio’s hebben matten klaarstaan, andere vragen
        deelnemers om zelf een mat mee te nemen of bieden huurmatten aan. Kijk daarom in de
        bevestigingsmail of op de praktische informatie van de studio. Staat het nergens duidelijk,
        neem dan vooraf contact op. Zo voorkom je dat je met onnodig veel spullen aankomt of juist
        zonder mat staat.
      </p>
      <p className="mt-4">
        Een eigen mat kan prettig zijn als je regelmatig yoga wilt doen: je kent de grip, dikte en
        hygiëne. Voor één eerste les hoef je echter niet meteen materiaal te kopen. Probeer eerst
        een paar lessen en ontdek welke ondergrond je fijn vindt. Een heel dikke fitnessmat voelt
        zacht, maar kan bij staande balansoefeningen minder stabiel zijn; een specifieke yogamat
        geeft meestal meer contact met de vloer.
      </p>

      <h2 id="wat-neem-je-mee-voor-rustige-en-actieve-lessen" className={h2}>
        Wat neem je mee voor rustige en actieve lessen?
      </h2>
      <p className="mt-4">
        De lesvorm bepaalt welke extra’s nuttig zijn. Bekijk vooraf de lesbeschrijving op de pagina
        met{" "}
        <Link to="/lessen" className={link}>
          yogalessen bij Yoga Zeeburg
        </Link>{" "}
        en kies iets dat bij je ervaring en energie past.
      </p>
      <h3 className={h3}>Voor Yin, Nidra of een herstellende les</h3>
      <p className="mt-4">
        Rustige lessen bevatten vaker langer aangehouden of liggende houdingen. Je lichaam koelt dan
        makkelijker af. Warme sokken, een dun vest of een extra laag voor de eindontspanning kan
        prettig zijn. Draag die laag wanneer je stil ligt; tijdens houdingen kun je hem altijd
        uitdoen. Neem geen eigen deken of bolster mee tenzij de studio aangeeft dat dit nodig is.
      </p>
      <h3 className={h3}>Voor Vinyasa of een actievere Flow</h3>
      <p className="mt-4">
        Bij een dynamische les kun je warmer worden en meer zweten. Een kleine handdoek en waterfles
        zijn dan het nuttigst. Kies een fles die goed sluit en plaats hem buiten je bewegingsruimte.
        Sieraden die los hangen, een horloge dat in je pols drukt of een volle broekzak kunnen
        afleiden; berg ze voor de les veilig op.
      </p>
      <h3 className={h3}>Voor elke eerste les</h3>
      <p className="mt-4">
        Neem informatie mee die de docent moet weten, maar houd het praktisch. Je hoeft geen
        uitgebreid medisch dossier te overhandigen. Vertel vóór de les kort over een relevante
        blessure, recente operatie, zwangerschap, duizeligheid of andere omstandigheid die invloed
        kan hebben op bewegen. Zo kan de docent waar mogelijk algemene opties geven. Een groepsles
        vervangt geen medische beoordeling of behandeling.
      </p>

      <h2 id="wat-kun-je-beter-thuislaten" className={h2}>
        Wat kun je beter thuislaten?
      </h2>
      <p className="mt-4">
        Een rustige studio werkt het prettigst wanneer iedereen weinig ruimte en aandacht opeist.
        Laat daarom thuis wat je niet nodig hebt:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>
          <strong className="font-medium text-foreground">
            Een grote tas of veel losse spullen.
          </strong>{" "}
          Een compacte tas is makkelijker veilig weg te zetten.
        </li>
        <li>
          <strong className="font-medium text-foreground">Waardevolle spullen.</strong> Neem zo min
          mogelijk mee en vraag waar je telefoon en sleutels veilig kunt bewaren.
        </li>
        <li>
          <strong className="font-medium text-foreground">
            Sterke parfum of geparfumeerde sprays.
          </strong>{" "}
          Geuren kunnen in een gedeelde ruimte intens zijn en sommige deelnemers zijn er gevoelig
          voor.
        </li>
        <li>
          <strong className="font-medium text-foreground">Eten voor in de zaal.</strong> Eet liever
          niet zwaar vlak vóór de les. Als je iets nodig hebt rond je training, gebruik dan de
          daarvoor bestemde ruimte en volg je eigen medische of voedingsadvies.
        </li>
        <li>
          <strong className="font-medium text-foreground">Een telefoon die geluid maakt.</strong>{" "}
          Zet hem vóór binnenkomst op stil, zonder trillende meldingen. Bij voorkeur blijft hij
          buiten de oefenruimte.
        </li>
        <li>
          <strong className="font-medium text-foreground">
            De verwachting dat alles meteen moet lukken.
          </strong>{" "}
          Je hoeft geen houding te bewijzen en mag altijd een pauze nemen.
        </li>
      </ul>

      <h2 id="wat-als-je-een-blessure-aandoening-of-zwangerschap-wilt-melden" className={h2}>
        Wat als je een blessure, aandoening of zwangerschap wilt melden?
      </h2>
      <p className="mt-4">
        Vertel dit rustig vóór de les aan de docent, liefst enkele minuten voordat de groep begint.
        Benoem wat relevant is: waar je last van hebt, welke bewegingen je volgens een bevoegde
        zorgprofessional moet vermijden en of je eerder duizelig of onwel bent geworden. De docent
        kan algemene variaties aanbieden, maar stelt geen diagnose.
      </p>
      <p className="mt-4">
        Heb je acute pijn, onverklaarde klachten of twijfel je of een groepsles passend is, bespreek
        dit dan eerst met een bevoegde zorgprofessional. De Amerikaanse NCCIH adviseert beginners
        ook om gekwalificeerde begeleiding te kiezen, gezondheidsproblemen te melden en extreme
        houdingen of geforceerde ademhaling niet op eigen houtje te proberen.
      </p>

      <h2 id="voor-vertrek-een-checklist-van-een-minuut" className={h2}>
        Voor vertrek: een checklist van één minuut
      </h2>
      <p className="mt-4">Controleer vlak voordat je van huis gaat:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>Is mijn reservering bevestigd en weet ik hoe laat de les begint?</li>
        <li>Heb ik gecontroleerd of een mat nodig is?</li>
        <li>Heb ik comfortabele kleding, water en eventueel een handdoek?</li>
        <li>Heb ik noodzakelijke medicatie of persoonlijke hulpmiddelen bij me?</li>
        <li>Staat mijn telefoon op stil zodra ik binnenkom?</li>
        <li>Weet ik welke praktische informatie ik kort aan de docent wil geven?</li>
        <li>Vertrek ik op tijd om zonder haast aan te komen?</li>
      </ul>
      <p className="mt-4">
        Bekijk voor actuele tijden altijd het{" "}
        <Link to="/rooster" className={link}>
          lesrooster
        </Link>
        . Ben je nog niet ingeschreven, dan kun je met de{" "}
        <Link to="/trial" className={link}>
          14-daagse introductiepas
        </Link>{" "}
        verschillende lessen, docenten en tijden proberen voordat je kiest wat bij je past.
      </p>

      <h2 id="conclusie" className={h2}>
        Conclusie
      </h2>
      <p className="mt-4">
        Voor je eerste yogales is een kleine tas meestal voldoende. Neem comfortabele kleding, water
        en eventueel een handdoek mee; controleer vooraf of je een eigen mat nodig hebt. Voeg alleen
        iets toe dat echt bij de les of jouw situatie past, zoals warme sokken, een elastiekje of
        noodzakelijke medicatie. Hoe minder je hoeft te organiseren, hoe makkelijker je rustig
        binnenkomt en aandacht hebt voor de les zelf.
      </p>
      <p className="mt-4">
        Wil je ook weten hoe zo’n eerste les verloopt? Lees dan{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "hoe-ziet-een-eerste-yogales-eruit" }}
          className={link}
        >
          Eerste yogales stap voor stap: zo ziet de les eruit
        </Link>
        . Twijfel je welke les rustig genoeg is om mee te beginnen, bekijk dan{" "}
        <Link
          to="/kennisbank/$slug"
          params={{ slug: "rustige-yoga-voor-beginners-welke-les-past-het-beste" }}
          className={link}
        >
          Rustige yoga voor beginners: welke les past het beste?
        </Link>
        .
      </p>
    </>
  );
}
