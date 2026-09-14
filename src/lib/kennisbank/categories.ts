// Single source of truth for Yoga Gids category data.
//
// This module is deliberately tiny and dependency-free: it must NEVER import
// `articles.tsx` (or anything that does), so hub/category client routes stay
// out of the multi-hundred-kB legacy article bundle. Icons and other visual
// concerns live in the routes that render them.

export type CategoryFilter = "beginner" | "ontspanning" | "flexibiliteit" | "yogastijlen";

export interface CategoryMeta {
  slug: string;
  /** Display title used on the hub, breadcrumbs and category H1. */
  title: string;
  /** Hub card copy (visible on /kennisbank). */
  hubDescription: string;
  /** Short unique intro rendered under the category H1. */
  intro: string;
  /** SEO <title> for the category page. */
  seoTitle: string;
  /** Meta/OG description, ~140-160 characters. */
  seoDescription: string;
  /** Quick-filter tokens shared with the hub chips. */
  filters: CategoryFilter[];
  /** Search keywords used by hub search. */
  keywords: string[];
  /** Existing, site-relative share image (turned absolute where needed). */
  ogImagePath: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: "beginnen-met-yoga",
    title: "Beginnen met yoga",
    hubDescription:
      "Rustige uitleg voor wie net start: wat je nodig hebt, wat je kunt verwachten en hoe je zonder stress je eerste les kiest.",
    intro:
      "Alles wat je wilt weten voordat je voor het eerst op de mat stapt: hoe een les verloopt, wat je meeneemt en welke les past bij een rustige start.",
    seoTitle: "Beginnen met yoga — praktische uitleg voor starters | Yoga Zeeburg",
    seoDescription:
      "Beginnen met yoga zonder stress: lees hoe een eerste les verloopt, wat je nodig hebt, welke les bij je past en hoe je rustig een vaste routine opbouwt.",
    filters: ["beginner"],
    keywords: ["beginner", "starten", "eerste les", "proefles", "basics"],
    ogImagePath: "/__l5e/assets-v1/bb0a459e-ae0f-409f-8350-cf4e621e57c9/beginnen-met-yoga-hero.webp",
  },
  {
    slug: "yogastijlen",
    title: "Yogastijlen uitgelegd",
    hubDescription:
      "Vinyasa, Hatha, Yin, restorative en meer. Ontdek welke stijl bij jouw energie, doel en week past.",
    intro:
      "Vinyasa, Hatha, Yin of restorative: hier lees je rustig wat elke yogastijl doet, hoe intensief die is en welke stijl past bij jouw energie en doel.",
    seoTitle: "Yogastijlen uitgelegd — welke stijl past bij jou? | Yoga Zeeburg",
    seoDescription:
      "Yogastijlen uitgelegd: het verschil tussen Vinyasa, Hatha, Yin en restorative yoga, hoe intensief ze zijn en welke stijl past bij jouw energie en doel.",
    filters: ["yogastijlen"],
    keywords: ["stijlen", "vinyasa", "hatha", "yin", "restorative", "ashtanga"],
    ogImagePath:
      "/__l5e/assets-v1/7303635a-73bc-48b9-8145-519c06ef37d6/yogastijlen-rust-balans-beweging.webp",
  },
  {
    slug: "stress-ontspanning-slaap",
    title: "Stress, ontspanning en slaap",
    hubDescription:
      "Praktische yoga en ademhaling om je zenuwstelsel te kalmeren, spanning los te laten en beter te slapen.",
    intro:
      "Praktische artikelen over yoga en ademhaling die je zenuwstelsel kalmeren: spanning loslaten na een volle werkdag en rustiger de nacht in gaan.",
    seoTitle: "Yoga voor stress, ontspanning en slaap | Yoga Zeeburg",
    seoDescription:
      "Yoga bij stress en slecht slapen: rustige lessen, ademhaling en ontspanning die je zenuwstelsel kalmeren en helpen om spanning echt los te laten.",
    filters: ["ontspanning"],
    keywords: ["stress", "ontspanning", "slaap", "ademhaling", "rust", "burn-out"],
    ogImagePath:
      "/__l5e/assets-v1/2faa55ce-08dc-494b-8efb-bf8597d6322b/rustige-yoga-voor-beginners-hoofdbeeld.webp",
  },
  {
    slug: "flexibiliteit-kracht-houding",
    title: "Flexibiliteit, kracht en houding",
    hubDescription:
      "Soepeler worden, meer kracht opbouwen en je houding verbeteren — stap voor stap, zonder forceren.",
    intro:
      "Soepeler worden, kracht opbouwen en rechter zitten of staan: artikelen die stap voor stap uitleggen hoe je dat rustig opbouwt, zonder te forceren.",
    seoTitle: "Yoga voor flexibiliteit, kracht en houding | Yoga Zeeburg",
    seoDescription:
      "Word soepeler, bouw kracht op en verbeter je houding met yoga: rustige, stap-voor-stap uitleg over opbouwen zonder forceren en zonder blessures.",
    filters: ["flexibiliteit"],
    keywords: ["flexibiliteit", "soepel", "kracht", "houding", "mobiliteit", "rug"],
    ogImagePath:
      "/__l5e/assets-v1/7135d3d8-d71b-4496-b3ea-551e584406d5/actieve-yoga-beginners-hero.webp",
  },
  {
    slug: "klachten-en-levensfasen",
    title: "Yoga bij klachten en levensfasen",
    hubDescription:
      "Voorzichtige informatie over yoga bij rugpijn, zwangerschap, menopauze en andere levensfasen.",
    intro:
      "Voorzichtige, eerlijke informatie over yoga bij rugpijn, zwangerschap, menopauze en andere levensfasen — altijd in overleg met je eigen zorgverlener.",
    seoTitle: "Yoga bij klachten en levensfasen | Yoga Zeeburg",
    seoDescription:
      "Yoga bij rugpijn, zwangerschap, menopauze en andere levensfasen: voorzichtige uitleg over wat kan helpen en waar je met klachten op moet letten.",
    filters: [],
    keywords: ["klachten", "rugpijn", "nek", "zwangerschap", "menopauze", "ouder", "blessure"],
    ogImagePath:
      "/__l5e/assets-v1/4e2381d9-7e39-40dd-a95f-a16a08b3c1b6/yoga-zeeburg-beginners-gevorderden-hoofdbeeld.webp",
  },
  {
    slug: "yoga-amsterdam-oost",
    title: "Yoga in Amsterdam Oost",
    hubDescription:
      "Alles over yoga in de buurt: Zeeburg, Cruquius, IJburg en Indische Buurt — inclusief tips om vol te houden.",
    intro:
      "Yoga in de buurt: Zeeburg, Cruquius, IJburg en de Indische Buurt. Wat je kunt verwachten, hoe je kiest en hoe locatie helpt om het vol te houden.",
    seoTitle: "Yoga in Amsterdam Oost — lessen, buurten en tips | Yoga Zeeburg",
    seoDescription:
      "Yoga in Amsterdam Oost: lessen in Zeeburg, Cruquius, IJburg en de Indische Buurt, hoe je een studio kiest en waarom dichtbij helpt om vol te houden.",
    filters: ["beginner"],
    keywords: [
      "amsterdam",
      "oost",
      "zeeburg",
      "cruquius",
      "ijburg",
      "indische buurt",
      "buurt",
      "beginner",
      "beginners",
      "starten",
      "eerste yogales",
    ],
    ogImagePath:
      "/__l5e/assets-v1/9b45ea47-0d28-4164-8409-6d3acaa81106/yoga-aan-het-water-amsterdam-oost-avondlicht.webp",
  },
];

/** slug → CategoryMeta lookup. */
export const CATEGORY_BY_SLUG: Record<string, CategoryMeta> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c]),
);

/** Legacy-compatible shape consumed by the registry/DB mapping layer. */
export const CATEGORY_META: Record<string, { title: string; filters: string[] }> =
  Object.fromEntries(CATEGORIES.map((c) => [c.slug, { title: c.title, filters: c.filters }]));
