// Runtime schemas for the Yoga Zeeburg kennisbank AI content pipeline.
// Every AI result MUST pass through these before it is trusted.
import { z } from "zod";
import { FIXED_CTA } from "./cta";

export const ErrorCategory = z.enum([
  "configuration_error",
  "source_conflict",
  "content_safety_error",
  "validation_error",
  "infrastructure_error",
]);
export type ErrorCategory = z.infer<typeof ErrorCategory>;

export const ArticleBriefSchema = z.object({
  articleId: z.string().min(1),
  planningNumber: z.number().int().min(1).max(180),
  primaryQuestion: z.string().min(3),
  originalTitle: z.string().min(3),
  finalTitle: z.string().min(3),
  primaryKeyword: z.string().min(2),
  secondaryKeywords: z.array(z.string().min(2)).min(1).max(20),
  category: z.string().min(1),
  cluster: z.string().min(1),
  differentiation: z.string().min(3),
  cannibalisationNotes: z.string(),
  riskFlags: z.array(z.string()),
  sourceFlags: z.array(z.string()),
  allowedStudioFacts: z.array(z.string()),
  validatedLinkTargets: z.array(z.object({ url: z.string().url(), rationale: z.string().min(2) })),
  relatedPublishedArticles: z.array(z.object({ slug: z.string().min(1), title: z.string().min(1) })),
  ctaRule: z.literal("fixed-intro-pass"),
  publicationDateEuropeAmsterdam: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  expectedStructure: z.array(z.string().min(2)).min(3),
  schemaVersion: z.string().min(1),
});
export type ArticleBrief = z.infer<typeof ArticleBriefSchema>;

export const ValidatedSourcePackSchema = z.object({
  articleId: z.string().min(1),
  firstPartyFacts: z
    .array(
      z.object({
        fact: z.string().min(2),
        url: z.string().url(),
        capturedAt: z.string().datetime(),
      }),
    ),
  externalSources: z.array(
    z.object({
      claim: z.string().min(2),
      url: z.string().url(),
      publisher: z.string().min(2),
      capturedAt: z.string().datetime(),
      authoritative: z.boolean(),
    }),
  ),
  claimSourceMap: z.array(
    z.object({
      claim: z.string().min(2),
      supportingUrls: z.array(z.string().url()).min(1),
    }),
  ),
  conflicts: z.array(z.object({ claim: z.string(), reason: z.string() })),
  missingSubstantiation: z.array(z.string()),
  blocked: z.boolean(),
  blockedReason: z.string().nullable(),
  schemaVersion: z.string().min(1),
});
export type ValidatedSourcePack = z.infer<typeof ValidatedSourcePackSchema>;

const FaqSchema = z.array(
  z.object({ question: z.string().min(3), answer: z.string().min(3) }),
);

export const GeneratedArticlePackageSchema = z
  .object({
    articleId: z.string().min(1),
    finalTitle: z.string().min(3),
    slug: z
      .string()
      .min(1)
      .regex(/^[a-z0-9-]+$/, "slug must be kebab-case ascii"),
    metaTitle: z.string().min(10).max(70),
    metaDescription: z.string().min(50).max(180),
    directAnswer: z.string().min(20),
    bodyMarkdown: z.string().min(200),
    commercialLinkCount: z.number().int().min(0).max(1),
    hasAbsoluteMedicalClaim: z.boolean(),
    faq: FaqSchema,
    internalLinks: z.array(z.object({ slug: z.string().min(1), anchor: z.string().min(2) })),
    seoIntents: z.array(z.string()),
    geoIntents: z.array(z.string()),
    structuredDataIntents: z.array(z.string()),
    cta: z.object({
      heading: z.literal(FIXED_CTA.heading),
      body: z.literal(FIXED_CTA.body),
      button: z.literal(FIXED_CTA.button),
      subtext: z.literal(FIXED_CTA.subtext),
    }),
    language: z.literal("nl"),
    contentHash: z.string().min(8),
    promptVersion: z.string().min(1),
    schemaVersion: z.string().min(1),
  })
  .refine((v) => v.hasAbsoluteMedicalClaim === false, {
    message: "absolute medical claims are not allowed",
    path: ["hasAbsoluteMedicalClaim"],
  })
  .refine((v) => v.commercialLinkCount <= 1, {
    message: "at most one natural commercial in-text link",
    path: ["commercialLinkCount"],
  });
export type GeneratedArticlePackage = z.infer<typeof GeneratedArticlePackageSchema>;

export const ReviewFindingSchema = z.object({
  code: z.string().min(2),
  severity: z.enum(["info", "warn", "error", "blocker"]),
  evidence: z.string().min(2),
  remediation: z.string().min(2),
});
export type ReviewFinding = z.infer<typeof ReviewFindingSchema>;

export const ReviewRoundKind = z.enum([
  "content_integrity",
  "structure_seo_tech",
  "regression_scalability",
]);
export type ReviewRoundKind = z.infer<typeof ReviewRoundKind>;

export const ReviewOutputSchema = z.object({
  round: ReviewRoundKind,
  pass: z.boolean(),
  blocked: z.boolean(),
  findings: z.array(ReviewFindingSchema),
  repairedPackage: GeneratedArticlePackageSchema.nullable(),
  schemaVersion: z.string().min(1),
});
export type ReviewOutput = z.infer<typeof ReviewOutputSchema>;

export const REVIEW_ORDER: ReviewRoundKind[] = [
  "content_integrity",
  "structure_seo_tech",
  "regression_scalability",
];
