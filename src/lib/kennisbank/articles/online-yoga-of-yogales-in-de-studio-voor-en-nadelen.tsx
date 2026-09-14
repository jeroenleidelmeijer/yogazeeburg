// Legacy Yoga Gids article — lazily loaded per slug by `article-bodies.ts`.
// Slug: online-yoga-of-yogales-in-de-studio-voor-en-nadelen

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArticleFigure, type ArticleImageRef } from "@/components/kennisbank/ArticleFigure";
import onlineStudioHeroAsset from "@/assets/online-yoga-of-yogales-studio-hero.webp.asset.json";
import onlineThuisAsset from "@/assets/online-yoga-thuisopstelling.webp.asset.json";
import { type Article, CATEGORY_BEGINNEN_MET_YOGA } from "../article-types";

const ONLINE_STUDIO_HERO_IMAGE: ArticleImageRef = {
  url: onlineStudioHeroAsset.url,
  alt: "Een yogamat met tablet in een rustige thuisruimte naast een lichte studio met meerdere lege matten.",
  width: 1536,
  height: 1024,
};

const ONLINE_THUIS_IMAGE: ArticleImageRef = {
  url: onlineThuisAsset.url,
  alt: "Een tablet op een houten standaard naast een yogamat, deken, riem en yogablokken voor een online yogales thuis.",
  width: 1536,
  height: 1024,
};

export const article: Article = {
  slug: "online-yoga-of-yogales-in-de-studio-voor-en-nadelen",
  title: "Online yoga of yogales in de studio: voor- en nadelen",
  h1: "Online yoga of yogales in de studio: voor- en nadelen",
  seoTitle: "Online yoga of studio? Voor- en nadelen | Yoga Zeeburg",
  description:
    "Vergelijk online yoga met een yogales in de studio op begeleiding, flexibiliteit, focus, techniek en sfeer. Ontdek welke vorm bij jou past.",
  intro:
    "Online yoga is flexibel: je oefent thuis, reist niet en kiest bij een opname zelf je moment. Een studioles geeft een vaste afspraak, minder huishoudelijke afleiding en een docent die de groep kan zien. Geen van beide is automatisch beter. Ben je nieuw en wil je live uitleg, dan kan de studio een prettige start zijn. Past reizen moeilijk in je week of oefen je liever privé, dan kan een goede online les haalbaarder zijn.",
  category: CATEGORY_BEGINNEN_MET_YOGA,
  type: "comparison",
  pillar: false,
  publishedAt: "2026-09-11",
  updatedAt: "2026-09-11",
  readingTimeMin: 8,
  toc: [
    { id: "wat-is-online-yoga", label: "Eerst helder: wat bedoelen we met online yoga?" },
    { id: "online-of-studio", label: "Online of studio in één oogopslag" },
    { id: "voordelen-online", label: "De voordelen van online yoga" },
    { id: "nadelen-online", label: "De nadelen van online yoga" },
    { id: "voordelen-studio", label: "De voordelen van een yogales in de studio" },
    { id: "nadelen-studio", label: "De nadelen van een yogales in de studio" },
    { id: "welke-vorm", label: "Welke vorm past bij jou?" },
    { id: "combinatie", label: "Een combinatie kan juist praktisch zijn" },
    { id: "yoga-zeeburg", label: "Online yoga en Yoga Zeeburg" },
    { id: "conclusie", label: "Conclusie" },
    { id: "faq", label: "Veelgestelde vragen" },
  ],
  faqs: [
    {
      question: "Is online yoga geschikt voor beginners?",
      answer:
        "Ja, als de les expliciet voor beginners is gemaakt, rustig wordt uitgelegd en duidelijke opties geeft. Houd er rekening mee dat een opname je niet ziet. Wil je vragen stellen of live feedback, dan kan een studioles of interactieve livestream prettiger zijn.",
    },
    {
      question: "Krijg je online net zoveel begeleiding als in een studio?",
      answer:
        "Meestal niet. Bij een opname is geen live observatie mogelijk. Bij een livestream hangt de begeleiding af van camerahoek, techniek, groepsgrootte en de manier waarop de docent lesgeeft. In een studio deelt de docent dezelfde ruimte en kan die de groep directer observeren.",
    },
    {
      question: "Is een livestream hetzelfde als een les op aanvraag?",
      answer:
        "Nee. Een livestream vindt op een vast moment plaats en kan enige interactie bieden. Een les op aanvraag is vooraf opgenomen: je kiest zelf het tijdstip en kunt pauzeren, maar krijgt geen live reactie.",
    },
    {
      question: "Heb je thuis veel ruimte of materiaal nodig?",
      answer:
        "Voor een eenvoudige les is vaak genoeg ruimte voor één yogamat voldoende. Controleer vooraf welke hulpmiddelen worden gebruikt en zet je scherm zo neer dat je de uitleg kunt volgen zonder steeds je nek te draaien. Gebruik alleen stabiele, veilige alternatieven voor props.",
    },
    {
      question: "Biedt Yoga Zeeburg online lessen aan?",
      answer:
        "Op 11 september 2026 staat op de openbare website alleen een aanbod van fysieke groepslessen aan de Cruquiusweg 96F in Amsterdam Oost. Bekijk het actuele rooster en controleer Sportbit voor wijzigingen en beschikbaarheid.",
    },
  ],
  sources: [
    {
      title: "Yoga Zeeburg — Lessen, geraadpleegd 11 september 2026",
      url: "https://www.yogazeeburg.com/lessen",
    },
    {
      title: "Yoga Zeeburg — Rooster, geraadpleegd 11 september 2026",
      url: "https://www.yogazeeburg.com/rooster",
    },
    {
      title: "Yoga Zeeburg — Prijzen, geraadpleegd 11 september 2026",
      url: "https://www.yogazeeburg.com/prijzen",
    },
  ],
  template: {
    showTOC: true,
    showFAQ: true,
    showSources: true,
    showRelated: true,
  },
  heroImage: ONLINE_STUDIO_HERO_IMAGE,
  body: () => <OnlineOfStudioBody />,
};

function OnlineOfStudioBody() {
  const h2 = "mt-14 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl";
  const h3 = "mt-8 font-display text-xl font-medium tracking-tight text-foreground";
  const link = "font-medium text-primary underline underline-offset-4 hover:no-underline";
  return (
    <>
      <h2 id="wat-is-online-yoga" className={h2}>
        Eerst helder: wat bedoelen we met online yoga?
      </h2>
      <p className="mt-4">Online yoga kan twee dingen betekenen:</p>
      <ul className="mt-3 list-disc space-y-2 pl-6">
        <li>
          <strong>Een livestream:</strong> je volgt op een vast tijdstip een docent via video. Wat de
          docent van jou ziet hangt af van camera, verbinding, groepsgrootte en lesopzet.
        </li>
        <li>
          <strong>Een les op aanvraag:</strong> je start een opname wanneer het uitkomt. Je kunt
          pauzeren of terugspoelen, maar krijgt geen live observatie.
        </li>
      </ul>
      <p className="mt-4">
        Een studioles is een fysieke groepsles met een docent in dezelfde ruimte. Zelf thuis oefenen
        zonder video of livestream valt buiten deze vergelijking.
      </p>

      <h2 id="online-of-studio" className={h2}>
        Online of studio in één oogopslag
      </h2>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse text-left text-[15px]">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 pr-4 font-display font-medium text-foreground">Onderdeel</th>
              <th className="py-3 pr-4 font-display font-medium text-foreground">Online yoga</th>
              <th className="py-3 font-display font-medium text-foreground">Yogales in de studio</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr><td className="py-3 pr-4 align-top font-medium text-foreground">Reistijd</td><td className="py-3 pr-4 align-top">Geen</td><td className="py-3 align-top">Wel</td></tr>
            <tr><td className="py-3 pr-4 align-top font-medium text-foreground">Tijdstip</td><td className="py-3 pr-4 align-top">Zeer flexibel bij opnames; vast bij livestream</td><td className="py-3 align-top">Vast volgens rooster</td></tr>
            <tr><td className="py-3 pr-4 align-top font-medium text-foreground">Feedback</td><td className="py-3 pr-4 align-top">Beperkt of afwezig</td><td className="py-3 align-top">Docent kan observeren en aanwijzingen geven</td></tr>
            <tr><td className="py-3 pr-4 align-top font-medium text-foreground">Concentratie</td><td className="py-3 pr-4 align-top">Afhankelijk van je thuisomgeving</td><td className="py-3 align-top">Speciale ruimte helpt om je aandacht bij de les te houden</td></tr>
            <tr><td className="py-3 pr-4 align-top font-medium text-foreground">Materiaal</td><td className="py-3 pr-4 align-top">Zelf regelen</td><td className="py-3 align-top">Vaak zijn matten en props aanwezig; controleer dit vooraf</td></tr>
            <tr><td className="py-3 pr-4 align-top font-medium text-foreground">Sociaal contact</td><td className="py-3 pr-4 align-top">Meestal beperkt</td><td className="py-3 align-top">Je oefent met docent en groep in dezelfde ruimte</td></tr>
            <tr><td className="py-3 pr-4 align-top font-medium text-foreground">Techniek</td><td className="py-3 pr-4 align-top">Afhankelijk van beeld, geluid en camerahoek</td><td className="py-3 align-top">Uitleg en demonstratie zijn direct in de ruimte aanwezig</td></tr>
            <tr><td className="py-3 pr-4 align-top font-medium text-foreground">Privacy</td><td className="py-3 pr-4 align-top">Je blijft thuis</td><td className="py-3 align-top">Je deelt de ruimte met anderen</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4">
        Je kiest niet alleen een les, maar ook een omgeving. Vraag jezelf daarom af: in welke situatie
        lukt het mij werkelijk om te beginnen én terug te komen?
      </p>

      <h2 id="voordelen-online" className={h2}>De voordelen van online yoga</h2>
      <h3 className={h3}>1. Je verliest geen tijd aan reizen</h3>
      <p className="mt-4">Zodra je mat ligt, kun je beginnen. Dat helpt op een drukke dag, bij slecht weer of wanneer reizen lastig is.</p>
      <h3 className={h3}>2. Je hebt meer vrijheid in het moment</h3>
      <p className="mt-4">Bij lessen op aanvraag kies je zelf het moment. Je kunt uitleg terugspoelen, pauzeren en zonder anderen in de ruimte kennismaken met de bewegingen.</p>
      <h3 className={h3}>3. Thuis kan vertrouwd voelen</h3>
      <p className="mt-4">Thuis bepaal je zelf licht, temperatuur en privacy. Dat kan de eerste drempel verlagen.</p>
      <h3 className={h3}>4. Je hebt veel keuze</h3>
      <p className="mt-4">Online is er veel keuze in duur, intensiteit en stijl. Kies een docent die het niveau duidelijk benoemt, opties geeft en geen grote gezondheidsbeloften doet.</p>

      <ArticleFigure
        image={ONLINE_THUIS_IMAGE}
        caption="Een rustige thuisopstelling helpt, maar vervangt geen live observatie door een docent."
        className="mt-10"
      />

      <h2 id="nadelen-online" className={h2}>De nadelen van online yoga</h2>
      <h3 className={h3}>1. Een docent ziet minder — of helemaal niets</h3>
      <p className="mt-4">Bij een opname is er geen live feedback. In een livestream ziet een docent alleen wat jouw camera toont. Online aanwijzingen zijn daarom niet hetzelfde als persoonlijke correctie.</p>
      <h3 className={h3}>2. Je thuisomgeving vraagt zelfdiscipline</h3>
      <p className="mt-4">Thuis zijn meldingen en taken dichtbij. Een vaste plek, gepland tijdstip en telefoon op stil helpen om de les af te maken.</p>
      <h3 className={h3}>3. Je moet materiaal en ruimte zelf controleren</h3>
      <p className="mt-4">Controleer vooraf welke props nodig zijn, of de vloer niet glad is en of je vrij kunt bewegen. Gebruik alleen stabiele alternatieven.</p>
      <h3 className={h3}>4. Techniek kan de les onderbreken</h3>
      <p className="mt-4">Test vóór een livestream beeld, geluid en batterij. Zet het scherm zo neer dat je niet voortdurend je nek hoeft te draaien.</p>

      <h2 id="voordelen-studio" className={h2}>De voordelen van een yogales in de studio</h2>
      <h3 className={h3}>1. De docent is in dezelfde ruimte</h3>
      <p className="mt-4">Een docent kan de groep bekijken, uitleg verduidelijken en variaties aanbieden. Dat garandeert geen individuele correctie bij iedere beweging, maar biedt meer directe informatie dan een opname. Je kunt bovendien vragen stellen.</p>
      <h3 className={h3}>2. De afspraak helpt je een routine op te bouwen</h3>
      <p className="mt-4">Een gereserveerde les heeft een begin- en eindtijd. Zo&apos;n vaste afspraak kan een bruikbaar anker in je week zijn.</p>
      <h3 className={h3}>3. De ruimte is voor yoga ingericht</h3>
      <p className="mt-4">In een studio liggen geen huishoudelijke taken te wachten. De ruimte en hulpmiddelen zijn voor de les ingericht. Vraag bij een nieuwe studio wel wat je zelf moet meenemen.</p>
      <h3 className={h3}>4. Je oefent samen zonder te hoeven presteren</h3>
      <p className="mt-4">
        Een groep geeft ritme en gedeelde aandacht. Je hoeft niemand bij te houden; opties en je eigen
        grens blijven belangrijk. Lees ook hoe een{" "}
        <Link to="/kennisbank/$slug" params={{ slug: "groepsles-yoga-of-priveles-wat-past-bij-jou" }} className={link}>
          groepsles en privéles van elkaar verschillen
        </Link>
        .
      </p>

      <h2 id="nadelen-studio" className={h2}>De nadelen van een yogales in de studio</h2>
      <p className="mt-4">Een studioles vraagt reistijd en moet bij je rooster passen. Je deelt de ruimte met anderen en kunt een les niet pauzeren. Kijk bij een wisselende agenda daarom naar meerdere haalbare lestijden.</p>

      <h2 id="welke-vorm" className={h2}>Welke vorm past bij jou?</h2>
      <p className="mt-4">Kies niet op basis van het perfecte scenario, maar op basis van je echte week.</p>
      <p className="mt-4"><strong>Online yoga past waarschijnlijk beter als je:</strong></p>
      <ul className="mt-3 list-disc space-y-2 pl-6">
        <li>weinig reistijd hebt of vaak van locatie wisselt;</li>
        <li>graag op een zelfgekozen moment oefent;</li>
        <li>thuis een rustige, veilige plek kunt maken;</li>
        <li>al voldoende ervaring hebt om algemene aanwijzingen goed te vertalen;</li>
        <li>een gemiste studiosessie wilt opvangen met een korte begeleide les.</li>
      </ul>
      <p className="mt-4"><strong>Een yogales in de studio past waarschijnlijk beter als je:</strong></p>
      <ul className="mt-3 list-disc space-y-2 pl-6">
        <li>nieuw bent en live uitleg prettig vindt;</li>
        <li>vragen wilt kunnen stellen aan een docent;</li>
        <li>thuis snel wordt afgeleid;</li>
        <li>een vaste afspraak nodig hebt om regelmaat op te bouwen;</li>
        <li>verschillende stijlen wilt ervaren in een daarvoor ingerichte ruimte.</li>
      </ul>
      <p className="mt-4">
        Twijfel je ook nog over het soort les? Gebruik dan de keuzehulp{" "}
        <Link to="/kennisbank/$slug" params={{ slug: "welke-yogastijl-past-bij-mij" }} className={link}>
          welke yogastijl past bij mij?
        </Link>
      </p>

      <h2 id="combinatie" className={h2}>Een combinatie kan juist praktisch zijn</h2>
      <p className="mt-4">Je hoeft niet definitief te kiezen. Een studioles kan je vaste basis zijn, met een rustige online les in een drukke week of tijdens een reis.</p>
      <p className="mt-4">Voorkom versnippering: kies liever één betrouwbaar online aanbod en één vaste studiotijd. Evalueer na enkele weken of je werkelijk komt opdagen, de uitleg begrijpt en grenzen kunt aangeven.</p>

      <h2 id="yoga-zeeburg" className={h2}>Online yoga en Yoga Zeeburg</h2>
      <p className="mt-4">
        Yoga Zeeburg publiceert fysieke groepslessen aan de Cruquiusweg 96F in Amsterdam Oost. Op de
        lespagina staan twaalf wekelijkse lessen, van rustige Yin en Nidra tot Vinyasa, Pilates Fusion
        en sterkere flows; de meeste zijn beginnersvriendelijk. Controleer het{" "}
        <Link to="/rooster" className={link}>weekrooster</Link>{" "}
        en Sportbit voor actuele wijzigingen en beschikbaarheid.
      </p>
      <p className="mt-4">
        Er staat geen online lesaanbod op de openbare website. Met de{" "}
        <Link to="/trial" className={link}>14-daagse Intro Pass</Link>{" "}
        kun je verschillende studiolessen, docenten en tijden proberen. De pas kost volgens de
        actuele prijspagina €30, is alleen voor nieuwe leerlingen en stopt automatisch.
      </p>

      <h2 id="conclusie" className={h2}>Conclusie</h2>
      <p className="mt-4">Online yoga wint op flexibiliteit, privacy en geen reistijd. De studio biedt de directe aanwezigheid van een docent, een vaste afspraak en een ingerichte lesruimte. Voor beginners die live uitleg willen, is de studio vaak een overzichtelijke eerste test. De doorslaggevende vraag: bij welke vorm blijf jij aandachtig en regelmatig oefenen?</p>
    </>
  );
}
