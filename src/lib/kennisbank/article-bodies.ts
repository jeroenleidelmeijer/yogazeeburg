// Per-slug lazy loader for legacy article bodies.
//
// Every legacy article body lives in its own module, so an article page only
// downloads its own body code and its own image assets instead of all 27.
// The map below is intentionally an explicit literal: Vite needs static
// `import()` specifiers to emit one chunk per article, and the contract test
// in `tests/kennisbank/article-splitting.test.ts` asserts that this map and
// `ARTICLES` stay in sync, so a newly placed article can never silently drop
// out of the registry or the sitemap.
import type { Article } from "./article-types";

type ArticleModule = { article: Article };

export const ARTICLE_BODY_LOADERS: Record<string, () => Promise<ArticleModule>> = {
  "proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten": () => import("./articles/proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten"),
  "yoga-in-amsterdam-oost-welke-yogastudio-past-bij-jou": () => import("./articles/yoga-in-amsterdam-oost-welke-yogastudio-past-bij-jou"),
  "yoga-voor-beginners-in-amsterdam-oost-zo-start-je": () => import("./articles/yoga-voor-beginners-in-amsterdam-oost-zo-start-je"),
  "yoga-voor-kantoormedewerkers-in-amsterdam-oost": () => import("./articles/yoga-voor-kantoormedewerkers-in-amsterdam-oost"),
  "yogales-in-amsterdam-waar-moet-je-op-letten-bij-je-keuze": () => import("./articles/yogales-in-amsterdam-waar-moet-je-op-letten-bij-je-keuze"),
  "nederlandse-of-engelse-yogales-in-amsterdam-wat-past-bij-jou": () => import("./articles/nederlandse-of-engelse-yogales-in-amsterdam-wat-past-bij-jou"),
  "wat-kost-yoga-in-amsterdam-en-waar-betaal-je-voor": () => import("./articles/wat-kost-yoga-in-amsterdam-en-waar-betaal-je-voor"),
  "yoga-aan-het-water-in-amsterdam-oost-rust-midden-in-de-stad": () => import("./articles/yoga-aan-het-water-in-amsterdam-oost-rust-midden-in-de-stad"),
  "yoga-dicht-bij-huis-waarom-locatie-helpt-om-vol-te-houden": () => import("./articles/yoga-dicht-bij-huis-waarom-locatie-helpt-om-vol-te-houden"),
  "yoga-in-ijburg-of-zeeburg-welke-locatie-past-beter": () => import("./articles/yoga-in-ijburg-of-zeeburg-welke-locatie-past-beter"),
  "yoga-in-de-indische-buurt-en-omgeving-welke-opties-zijn-er": () => import("./articles/yoga-in-de-indische-buurt-en-omgeving-welke-opties-zijn-er"),
  "yoga-voor-expats-in-amsterdam-east-what-to-expect": () => import("./articles/yoga-voor-expats-in-amsterdam-east-what-to-expect"),
  "yoga-in-cruquius-amsterdam-lessen-dichtbij-huis": () => import("./articles/yoga-in-cruquius-amsterdam-lessen-dichtbij-huis"),
  "yoga-in-zeeburg-lessen-voor-beginners-en-gevorderden": () => import("./articles/yoga-in-zeeburg-lessen-voor-beginners-en-gevorderden"),
  "hoe-herken-je-een-goede-yogastudio-kwaliteitskenmerken": () => import("./articles/hoe-herken-je-een-goede-yogastudio-kwaliteitskenmerken"),
  "yoga-proefles-of-introductiepas-wat-is-slimmer": () => import("./articles/yoga-proefles-of-introductiepas-wat-is-slimmer"),
  "rustige-yoga-voor-beginners-welke-les-past-het-beste": () => import("./articles/rustige-yoga-voor-beginners-welke-les-past-het-beste"),
  "welke-yogastijl-past-bij-mij": () => import("./articles/welke-yogastijl-past-bij-mij"),
  "hoe-ziet-een-eerste-yogales-eruit": () => import("./articles/hoe-ziet-een-eerste-yogales-eruit"),
  "actieve-yoga-voor-beginners-waar-begin-je": () => import("./articles/actieve-yoga-voor-beginners-waar-begin-je"),
  "beginnen-met-yoga-alles-wat-je-moet-weten": () => import("./articles/beginnen-met-yoga-alles-wat-je-moet-weten"),
  "hoe-lang-duurt-een-yogales": () => import("./articles/hoe-lang-duurt-een-yogales"),
  "hoe-vroeg-moet-je-aanwezig-zijn-voor-een-yogales": () => import("./articles/hoe-vroeg-moet-je-aanwezig-zijn-voor-een-yogales"),
  "groepsles-yoga-of-priveles-wat-past-bij-jou": () => import("./articles/groepsles-yoga-of-priveles-wat-past-bij-jou"),
  "kan-ik-alleen-naar-een-yogales-komen": () => import("./articles/kan-ik-alleen-naar-een-yogales-komen"),
  "online-yoga-of-yogales-in-de-studio-voor-en-nadelen": () => import("./articles/online-yoga-of-yogales-in-de-studio-voor-en-nadelen"),
  "welke-vragen-stel-je-voor-je-eerste-yogales": () => import("./articles/welke-vragen-stel-je-voor-je-eerste-yogales"),
};

export const LEGACY_ARTICLE_SLUGS = Object.keys(ARTICLE_BODY_LOADERS);

const cache = new Map<string, Article>();

/**
 * Loads (and caches) one legacy article. Called from the route loader, which
 * runs on the server during SSR and on the client before render, so the
 * component below can read the article synchronously — no Suspense shell and
 * no client-only content.
 */
export async function loadLegacyArticle(slug: string): Promise<Article | undefined> {
  const cached = cache.get(slug);
  if (cached) return cached;
  const loader = ARTICLE_BODY_LOADERS[slug];
  if (!loader) return undefined;
  const mod = await loader();
  cache.set(slug, mod.article);
  return mod.article;
}

/** Synchronous read of an article already loaded by `loadLegacyArticle`. */
export function getLoadedLegacyArticle(slug: string): Article | undefined {
  return cache.get(slug);
}
