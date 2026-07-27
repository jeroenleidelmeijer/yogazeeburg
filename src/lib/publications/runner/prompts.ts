// Compact, versioned prompt templates for the Yoga Zeeburg kennisbank
// content pipeline. Each builder returns a system+user message pair plus the
// JSON schema the AI must satisfy. Prompts are derived from:
//   - Kennisbank Werkinstructie Masterdocument v2.2
//   - Werkinstructie Addendum Pilotartikelen v1.0
//   - Kennisbank Automatiseringswerkinstructie v1.0
//
// The pipeline never trusts free-form AI text; every output is parsed by the
// matching Zod schema from ./schemas.ts before it is used.

import type { ClaimedRun } from "./providers";
import type {
  ArticleBrief,
  GeneratedArticlePackage,
  ReviewOutput,
  ReviewRoundKind,
  ValidatedSourcePack,
} from "./schemas";
import { FIXED_CTA } from "./cta";

export const PROMPT_VERSION = "runner.v1";
export const SCHEMA_VERSION = "1";

export interface PromptMessages {
  system: string;
  user: string;
  jsonSchemaName: string;
  promptVersion: string;
  schemaVersion: string;
}

const HOUSE_RULES = [
  "Schrijf natuurlijk Nederlands (nl-NL).",
  "Geef een direct antwoord binnen de eerste alinea; geen opvulling.",
  "Wees transparant over de commerciële afzender Yoga Zeeburg zonder verkooptaal.",
  "Absolute medische claims zijn verboden ('geneest', 'genezen', 'garandeert' etc.).",
  "Hoogstens één natuurlijke commerciële in-text link naar Yoga Zeeburg.",
  "Verzin nooit prijzen, roosters, docenten, voorzieningen of reistijden.",
  `Sluit exact één keer af met de vaste CTA: kop "${FIXED_CTA.heading}", tekst "${FIXED_CTA.body}", knop "${FIXED_CTA.button}", subtekst "${FIXED_CTA.subtext}".`,
  "Interne links mogen alleen wijzen naar reeds gepubliceerde kennisbank-artikelen of vooraf gevalideerde link-targets.",
].join("\n- ");

export function briefPrompt(claim: ClaimedRun): PromptMessages {
  return {
    promptVersion: PROMPT_VERSION,
    schemaVersion: SCHEMA_VERSION,
    jsonSchemaName: "ArticleBrief",
    system:
      "Je bent de senior contentstrateeg van Yoga Zeeburg. Maak een machineleesbare artikelbrief conform de Kennisbank Werkinstructie Masterdocument v2.2 en het Pilotartikelen-addendum. Volg deze huisregels:\n- " +
      HOUSE_RULES +
      "\nRetourneer UITSLUITEND geldige JSON die het meegegeven schema volgt.",
    user: JSON.stringify({
      articleId: claim.articleId,
      planningNumber: claim.planningNumber,
      originalTitle: claim.originalTitle,
      phase: claim.phase,
      instruction:
        "Genereer een ArticleBrief. Vul alle verplichte velden. articleId moet exact overeenkomen met de meegegeven articleId.",
    }),
  };
}

export function sourceValidationPrompt(brief: ArticleBrief): PromptMessages {
  return {
    promptVersion: PROMPT_VERSION,
    schemaVersion: SCHEMA_VERSION,
    jsonSchemaName: "ValidatedSourcePack",
    system:
      "Je bent de source-validator. Valideer feiten voor het onderstaande brief-object. First-party feiten komen uitsluitend van yogazeeburg.com/pricing, /schedule, /classes en /contact. Externe claims vereisen een gezaghebbende bron met publisher en capturedAt. Als er conflict of onvoldoende onderbouwing is: zet blocked=true met heldere reden. Verzin nooit prijzen, tijden, docenten of voorzieningen.",
    user: JSON.stringify({
      brief,
      instruction:
        "Retourneer een ValidatedSourcePack. articleId moet gelijk zijn aan brief.articleId.",
    }),
  };
}

export function generationPrompt(
  brief: ArticleBrief,
  sources: ValidatedSourcePack,
): PromptMessages {
  return {
    promptVersion: PROMPT_VERSION,
    schemaVersion: SCHEMA_VERSION,
    jsonSchemaName: "GeneratedArticlePackage",
    system:
      "Je bent de contentgenerator van Yoga Zeeburg. Genereer een compleet artikelpakket dat voldoet aan de huisregels:\n- " +
      HOUSE_RULES +
      "\nGebruik uitsluitend feiten uit de meegegeven ValidatedSourcePack. Retourneer UITSLUITEND geldige JSON die GeneratedArticlePackage volgt. Zet contentHash op een placeholder tekst; de runner overschrijft deze deterministisch.",
    user: JSON.stringify({
      brief,
      sources,
      instruction:
        "Vul alle verplichte velden. commercialLinkCount moet 0 of 1 zijn. hasAbsoluteMedicalClaim moet false zijn. cta moet exact de vaste CTA-copy bevatten. language='nl'. internalLinks mogen alleen slugs bevatten uit brief.relatedPublishedArticles.",
    }),
  };
}

const REVIEW_INSTRUCTION: Record<ReviewRoundKind, string> = {
  content_integrity:
    "Beoordeel content-integriteit: feitelijke juistheid t.o.v. sources, absoluutclaims, tone-of-voice, structuur van directe antwoord en FAQ, veiligheid rond medische onderwerpen, natuurlijke commerciële afzender.",
  structure_seo_tech:
    "Beoordeel structuur/SEO/GEO/techniek: kop-hiërarchie, meta-title/-description lengte, keyword-dekking, interne links naar valide targets, FAQ-schema-intent, kanonieke slug, geo-intenties Amsterdam Oost.",
  regression_scalability:
    "Beoordeel regressie en schaalbaarheid: overlap/kannibalisatie met eerder gepubliceerde artikelen, herbruikbaarheid van patronen, consistentie van CTA en commerciële link, unieke waarde-toevoeging.",
};

export function reviewPrompt(
  round: ReviewRoundKind,
  brief: ArticleBrief,
  sources: ValidatedSourcePack,
  pkg: GeneratedArticlePackage,
  priorReviews: ReviewOutput[],
): PromptMessages {
  return {
    promptVersion: PROMPT_VERSION,
    schemaVersion: SCHEMA_VERSION,
    jsonSchemaName: "ReviewOutput",
    system:
      `Je bent de kennisbank-reviewer voor ronde '${round}'. ${REVIEW_INSTRUCTION[round]} ` +
      "Retourneer UITSLUITEND geldige JSON die ReviewOutput volgt. Zet round exact op de opgegeven waarde. " +
      "Als het pakket onherstelbaar onveilig is: blocked=true, pass=false, repairedPackage=null. " +
      "Als reparatie mogelijk is: pass=false, blocked=false, repairedPackage bevat het volledige gecorrigeerde GeneratedArticlePackage.",
    user: JSON.stringify({ round, brief, sources, pkg, priorReviews }),
  };
}
