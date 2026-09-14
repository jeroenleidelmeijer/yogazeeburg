// Single source of truth for the legacy (JSX-body) Yoga Gids articles.
//
// The article objects themselves live one-per-file in `./articles/<slug>.tsx`
// so a single article page only ships its own body and its own assets. This
// barrel imports all of them eagerly and stays the ARTICLES registry used by
// server-side read helpers, the sitemap and the publication contract tests.
//
// IMPORTANT: do NOT import this module from client route/component code — it
// pulls every article body into that route's bundle. Client rendering goes
// through `./article-bodies.ts` (per-slug dynamic import).

export * from "./article-types";
import type { Article } from "./article-types";

import { article as a_proeflesYogaInAmsterdamOostWatKunJeVerwachten } from "./articles/proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten";
import { article as a_yogaInAmsterdamOostWelkeYogastudioPastBijJou } from "./articles/yoga-in-amsterdam-oost-welke-yogastudio-past-bij-jou";
import { article as a_yogaVoorBeginnersInAmsterdamOostZoStartJe } from "./articles/yoga-voor-beginners-in-amsterdam-oost-zo-start-je";
import { article as a_yogaVoorKantoormedewerkersInAmsterdamOost } from "./articles/yoga-voor-kantoormedewerkers-in-amsterdam-oost";
import { article as a_yogalesInAmsterdamWaarMoetJeOpLettenBijJeKeuze } from "./articles/yogales-in-amsterdam-waar-moet-je-op-letten-bij-je-keuze";
import { article as a_nederlandseOfEngelseYogalesInAmsterdamWatPastBijJou } from "./articles/nederlandse-of-engelse-yogales-in-amsterdam-wat-past-bij-jou";
import { article as a_watKostYogaInAmsterdamEnWaarBetaalJeVoor } from "./articles/wat-kost-yoga-in-amsterdam-en-waar-betaal-je-voor";
import { article as a_yogaAanHetWaterInAmsterdamOostRustMiddenInDeStad } from "./articles/yoga-aan-het-water-in-amsterdam-oost-rust-midden-in-de-stad";
import { article as a_yogaDichtBijHuisWaaromLocatieHelptOmVolTeHouden } from "./articles/yoga-dicht-bij-huis-waarom-locatie-helpt-om-vol-te-houden";
import { article as a_yogaInIjburgOfZeeburgWelkeLocatiePastBeter } from "./articles/yoga-in-ijburg-of-zeeburg-welke-locatie-past-beter";
import { article as a_yogaInDeIndischeBuurtEnOmgevingWelkeOptiesZijnEr } from "./articles/yoga-in-de-indische-buurt-en-omgeving-welke-opties-zijn-er";
import { article as a_yogaVoorExpatsInAmsterdamEastWhatToExpect } from "./articles/yoga-voor-expats-in-amsterdam-east-what-to-expect";
import { article as a_yogaInCruquiusAmsterdamLessenDichtbijHuis } from "./articles/yoga-in-cruquius-amsterdam-lessen-dichtbij-huis";
import { article as a_yogaInZeeburgLessenVoorBeginnersEnGevorderden } from "./articles/yoga-in-zeeburg-lessen-voor-beginners-en-gevorderden";
import { article as a_hoeHerkenJeEenGoedeYogastudioKwaliteitskenmerken } from "./articles/hoe-herken-je-een-goede-yogastudio-kwaliteitskenmerken";
import { article as a_yogaProeflesOfIntroductiepasWatIsSlimmer } from "./articles/yoga-proefles-of-introductiepas-wat-is-slimmer";
import { article as a_rustigeYogaVoorBeginnersWelkeLesPastHetBeste } from "./articles/rustige-yoga-voor-beginners-welke-les-past-het-beste";
import { article as a_welkeYogastijlPastBijMij } from "./articles/welke-yogastijl-past-bij-mij";
import { article as a_hoeZietEenEersteYogalesEruit } from "./articles/hoe-ziet-een-eerste-yogales-eruit";
import { article as a_actieveYogaVoorBeginnersWaarBeginJe } from "./articles/actieve-yoga-voor-beginners-waar-begin-je";
import { article as a_beginnenMetYogaAllesWatJeMoetWeten } from "./articles/beginnen-met-yoga-alles-wat-je-moet-weten";
import { article as a_hoeLangDuurtEenYogales } from "./articles/hoe-lang-duurt-een-yogales";
import { article as a_hoeVroegMoetJeAanwezigZijnVoorEenYogales } from "./articles/hoe-vroeg-moet-je-aanwezig-zijn-voor-een-yogales";
import { article as a_groepslesYogaOfPrivelesWatPastBijJou } from "./articles/groepsles-yoga-of-priveles-wat-past-bij-jou";
import { article as a_kanIkAlleenNaarEenYogalesKomen } from "./articles/kan-ik-alleen-naar-een-yogales-komen";
import { article as a_onlineYogaOfYogalesInDeStudioVoorEnNadelen } from "./articles/online-yoga-of-yogales-in-de-studio-voor-en-nadelen";
import { article as a_welkeVragenStelJeVoorJeEersteYogales } from "./articles/welke-vragen-stel-je-voor-je-eerste-yogales";

export const ARTICLES: Article[] = [
  a_proeflesYogaInAmsterdamOostWatKunJeVerwachten,
  a_yogaInAmsterdamOostWelkeYogastudioPastBijJou,
  a_yogaVoorBeginnersInAmsterdamOostZoStartJe,
  a_yogaVoorKantoormedewerkersInAmsterdamOost,
  a_yogalesInAmsterdamWaarMoetJeOpLettenBijJeKeuze,
  a_nederlandseOfEngelseYogalesInAmsterdamWatPastBijJou,
  a_watKostYogaInAmsterdamEnWaarBetaalJeVoor,
  a_yogaAanHetWaterInAmsterdamOostRustMiddenInDeStad,
  a_yogaDichtBijHuisWaaromLocatieHelptOmVolTeHouden,
  a_yogaInIjburgOfZeeburgWelkeLocatiePastBeter,
  a_yogaInDeIndischeBuurtEnOmgevingWelkeOptiesZijnEr,
  a_yogaVoorExpatsInAmsterdamEastWhatToExpect,
  a_yogaInCruquiusAmsterdamLessenDichtbijHuis,
  a_yogaInZeeburgLessenVoorBeginnersEnGevorderden,
  a_hoeHerkenJeEenGoedeYogastudioKwaliteitskenmerken,
  a_yogaProeflesOfIntroductiepasWatIsSlimmer,
  a_rustigeYogaVoorBeginnersWelkeLesPastHetBeste,
  a_welkeYogastijlPastBijMij,
  a_hoeZietEenEersteYogalesEruit,
  a_actieveYogaVoorBeginnersWaarBeginJe,
  a_beginnenMetYogaAllesWatJeMoetWeten,
  a_hoeLangDuurtEenYogales,
  a_hoeVroegMoetJeAanwezigZijnVoorEenYogales,
  a_groepslesYogaOfPrivelesWatPastBijJou,
  a_kanIkAlleenNaarEenYogalesKomen,
  a_onlineYogaOfYogalesInDeStudioVoorEnNadelen,
  a_welkeVragenStelJeVoorJeEersteYogales,
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return ARTICLES.filter((a) => a.category.slug === categorySlug);
}

export function getArticlesSortedByNewest(): Article[] {
  return [...ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getRecommendedArticles(limit = 3): Article[] {
  return ARTICLES.filter((a) => a.pillar).slice(0, limit);
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticleBySlug(slug);
  if (!current) return [];
  const sameCategory = ARTICLES.filter(
    (a) => a.slug !== slug && a.category.slug === current.category.slug,
  );
  const others = ARTICLES.filter(
    (a) => a.slug !== slug && a.category.slug !== current.category.slug,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
