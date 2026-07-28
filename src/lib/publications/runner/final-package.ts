// FinalArticlePackage — the single strict contract for content that has
// been authored AND fully reviewed OUTSIDE this codebase (by ChatGPT,
// against the Kennisbank Werkinstructie Masterdocument). The runner
// accepts this shape, validates it, and places it verbatim.
//
// SAFETY:
// - No AI briefing / writing / reviewing / repairing happens in-runner.
// - Every field the placement layer requires is present here; unknown
//   fields fail parsing (strict).
// - `contentHash` is authoritative at the runner: any value supplied by
//   the author is ignored and replaced with the deterministic hash of
//   the mapped GeneratedArticlePackage.

import { z } from "zod";
import { FIXED_CTA } from "./cta";
import { packageContentHash } from "./hash";
import { REVIEW_ORDER, type GeneratedArticlePackage, type ReviewOutput } from "./schemas";

// External-author identifier. Recorded in evidence artifacts so audits can
// distinguish externally-authored packages from any legacy AI-generated data.
export const AUTHORED_BY_EXTERNAL = "chatgpt-external" as const;

const kebab = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

const CategoryRefSchema = z.object({
  slug: z.string().min(1).regex(kebab),
  title: z.string().min(1),
});

const TocEntrySchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
});

const FaqSchema = z.object({
  question: z.string().min(3),
  answer: z.string().min(3),
});

const SourceSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
});

const InternalLinkSchema = z.object({
  slug: z.string().min(1),
  anchor: z.string().min(1),
});

const CtaSchema = z.object({
  heading: z.literal(FIXED_CTA.heading),
  body: z.literal(FIXED_CTA.body),
  button: z.literal(FIXED_CTA.button),
  subtext: z.literal(FIXED_CTA.subtext),
});

const TemplateSchema = z.object({
  showTOC: z.boolean(),
  showFAQ: z.boolean(),
  showSources: z.boolean(),
  showRelated: z.boolean(),
});

export const FinalArticlePackageSchema = z
  .object({
    // Provenance — must be the external-author literal.
    authoredBy: z.literal(AUTHORED_BY_EXTERNAL),
    authoredAt: z.string().datetime(),

    // Identity
    articleId: z.string().min(1),
    planningNumber: z.number().int().min(1).max(180),

    // Titles and slug
    slug: z.string().min(1).regex(kebab),
    title: z.string().min(3),
    h1: z.string().min(3),
    seoTitle: z.string().min(10).max(70),
    metaDescription: z.string().min(50).max(180),

    // Taxonomy
    category: CategoryRefSchema,
    type: z.enum(["explainer", "how-to", "local-guide"]),
    pillar: z.boolean(),

    // Reader metadata
    readingTimeMin: z.number().int().min(1).max(60),
    publishedAt: z.string().regex(isoDate),
    updatedAt: z.string().regex(isoDate),

    // Body
    directAnswer: z.string().min(20),
    intro: z.string().min(20),
    bodyMarkdown: z.string().min(200),

    // Structural blocks
    toc: z.array(TocEntrySchema).min(1),
    faqs: z.array(FaqSchema),
    sources: z.array(SourceSchema),
    internalLinks: z.array(InternalLinkSchema),

    // Rendering
    template: TemplateSchema,
    cta: CtaSchema,

    // SEO / discoverability
    tags: z.array(z.string().min(1)),
    primaryKeyword: z.string().min(2),
    audiences: z.array(z.string().min(1)),
    seoIntents: z.array(z.string().min(1)),
    geoIntents: z.array(z.string().min(1)),
    structuredDataIntents: z.array(z.string().min(1)),

    // Safety invariants — MUST be pre-declared by the author.
    commercialLinkCount: z.number().int().min(0).max(1),
    hasAbsoluteMedicalClaim: z.literal(false),

    // Versioning
    schemaVersion: z.literal("1"),
    // Author-supplied hash is IGNORED and replaced by the runner's
    // deterministic hash; the field is required here only to keep the
    // audit trail explicit.
    contentHash: z.string().min(8),
  })
  .strict()
  .refine((v) => v.faqs.length === 0 || v.template.showFAQ, {
    message: "FAQs supplied but template.showFAQ is false",
    path: ["template", "showFAQ"],
  })
  .refine((v) => v.sources.length === 0 || v.template.showSources, {
    message: "sources supplied but template.showSources is false",
    path: ["template", "showSources"],
  });

export type FinalArticlePackage = z.infer<typeof FinalArticlePackageSchema>;

/**
 * Map a FinalArticlePackage to the placement-layer's GeneratedArticlePackage
 * shape. This is a pure, deterministic projection — no field is invented, no
 * text is rewritten. `contentHash` is recomputed here so the placement layer
 * can enforce its own hash-integrity check.
 */
export function toGeneratedArticlePackage(
  final: FinalArticlePackage,
): GeneratedArticlePackage {
  const base = {
    articleId: final.articleId,
    finalTitle: final.title,
    slug: final.slug,
    metaTitle: final.seoTitle,
    metaDescription: final.metaDescription,
    directAnswer: final.directAnswer,
    bodyMarkdown: final.bodyMarkdown,
    commercialLinkCount: final.commercialLinkCount,
    hasAbsoluteMedicalClaim: final.hasAbsoluteMedicalClaim,
    faq: final.faqs.map((f) => ({ question: f.question, answer: f.answer })),
    internalLinks: final.internalLinks.map((l) => ({ slug: l.slug, anchor: l.anchor })),
    seoIntents: final.seoIntents,
    geoIntents: final.geoIntents,
    structuredDataIntents: final.structuredDataIntents,
    cta: { ...FIXED_CTA },
    language: "nl" as const,
    contentHash: "",
    promptVersion: "external.chatgpt-v1",
    schemaVersion: "1" as const,
  };
  const hash = packageContentHash({ ...base, contentHash: "" });
  return { ...base, contentHash: hash };
}

/**
 * Synthesize three passing review outputs for the placement layer. External
 * authorship + external three-round review is asserted by the author (via
 * `authoredBy: chatgpt-external`); the placement layer still runs its
 * defensive schema/invariant checks on the mapped package.
 */
export function synthesizeExternalReviews(): ReviewOutput[] {
  return REVIEW_ORDER.map((round) => ({
    round,
    pass: true,
    blocked: false,
    findings: [],
    repairedPackage: null,
    schemaVersion: "1",
  }));
}
