// Server-only placement entrypoint. This is the boundary that step 4's
// build/preview orchestrator will call once a run reaches `content_ready`.
//
// It reads EXACTLY the artifacts the runner writes (see pipeline.ts):
//   - stepKey = "generation"          → GeneratedArticlePackage
//   - stepKey = "source_validation"   → ValidatedSourcePack
//   - stepKey = "review_1|2|3"        → { review: ReviewOutput, __inputPkgHash: string }
//   - stepKey = "content_ready"       → terminal evidence {articleId, runId,
//                                        packageHash, reviews:[{round,pass}], ...}
//
// Fail-closed on any mismatch (wrong versions, hash disagreement, review
// evidence not tied to the final package, review failed/blocked). A valid
// repeat call is idempotent through `placeArticle`'s (article_id, hash) rule.
//
// This function NEVER changes the article's DB status nor calls the AI.

import { z } from "zod";
import {
  GeneratedArticlePackageSchema,
  ReviewOutputSchema,
  REVIEW_ORDER,
  ValidatedSourcePackSchema,
  type GeneratedArticlePackage,
  type ReviewOutput,
  type ValidatedSourcePack,
} from "@/lib/publications/runner/schemas";
import type { ArtifactRecord, ArtifactStore } from "@/lib/publications/runner/providers";
import { packageContentHash, contentHashOf } from "@/lib/publications/runner/hash";
import {
  placeArticle,
  type PlacementDeps,
  type PlacementResult,
  PlacementValidationError,
} from "./placement.server";

export const PlacementEntrypointInput = z.object({
  runId: z.string().uuid(),
  articleId: z.string().uuid(),
  lockToken: z.string().uuid(),
  schemaVersion: z.string().min(1),
  promptVersion: z.string().min(1),
  preview: z
    .object({
      previewUrl: z.string().url(),
      previewToken: z.string().min(8),
    })
    .optional()
    .nullable(),
});
export type PlacementEntrypointInput = z.infer<typeof PlacementEntrypointInput>;

export interface PlacementEntrypointDeps extends PlacementDeps {
  artifacts: ArtifactStore;
}

const ContentReadyEvidenceSchema = z.object({
  articleId: z.string().min(1),
  runId: z.string().min(1),
  packageHash: z.string().min(8),
  reviews: z
    .array(z.object({ round: z.string().min(2), pass: z.boolean() }))
    .length(REVIEW_ORDER.length),
  schemaVersion: z.string().min(1),
  promptVersion: z.string().min(1),
});

const WrappedReviewPayloadSchema = z.object({
  review: z.unknown(),
  __inputPkgHash: z.string().min(8),
});

/**
 * Verify existence, versions and hashes of every runner artifact and forward
 * them to placeArticle. Fails closed on any mismatch.
 */
export async function placementFromArtifacts(
  input: PlacementEntrypointInput,
  deps: PlacementEntrypointDeps,
): Promise<PlacementResult> {
  const parsed = PlacementEntrypointInput.parse(input);
  const records = await deps.artifacts.list({
    runId: parsed.runId,
    articleId: parsed.articleId,
    lockToken: parsed.lockToken,
  });

  // 1. generation ---------------------------------------------------------
  const pkgRec = findRequired(records, "generation");
  assertVersion(pkgRec, parsed.schemaVersion, parsed.promptVersion, "generation");
  const pkg: GeneratedArticlePackage = parseWith(
    GeneratedArticlePackageSchema,
    pkgRec.payload,
    "generation",
  );
  if (pkg.articleId !== parsed.articleId) {
    throw new PlacementValidationError({
      code: "schema_invalid",
      message: `package.articleId ${pkg.articleId} != run articleId ${parsed.articleId}`,
    });
  }
  const trusted = packageContentHash({ ...pkg, contentHash: "" });
  if (trusted !== pkg.contentHash) {
    throw new PlacementValidationError({
      code: "hash_mismatch",
      message: `package.contentHash ${pkg.contentHash} != recomputed ${trusted}`,
    });
  }
  if (pkgRec.contentHash !== trusted) {
    throw new PlacementValidationError({
      code: "hash_mismatch",
      message: `generation artifact.contentHash ${pkgRec.contentHash} != recomputed ${trusted}`,
    });
  }

  // 2. source_validation --------------------------------------------------
  const srcRec = findRequired(records, "source_validation");
  assertVersion(srcRec, parsed.schemaVersion, parsed.promptVersion, "source_validation");
  const sources: ValidatedSourcePack = parseWith(
    ValidatedSourcePackSchema,
    srcRec.payload,
    "source_validation",
  );
  if (sources.articleId !== parsed.articleId) {
    throw new PlacementValidationError({
      code: "schema_invalid",
      message: `sources.articleId ${sources.articleId} != run articleId ${parsed.articleId}`,
    });
  }
  if (sources.blocked) {
    throw new PlacementValidationError({
      code: "invariant_violation",
      message: `source_validation is blocked: ${sources.blockedReason ?? "no reason"}`,
    });
  }
  if (srcRec.contentHash !== contentHashOf(sources)) {
    throw new PlacementValidationError({
      code: "hash_mismatch",
      message: `source_validation artifact contentHash mismatch`,
    });
  }

  // 3. reviews ------------------------------------------------------------
  const reviews: ReviewOutput[] = REVIEW_ORDER.map((round, i) => {
    const stepKey = `review_${i + 1}` as const;
    const rec = findRequired(records, stepKey);
    assertVersion(rec, parsed.schemaVersion, parsed.promptVersion, stepKey);
    const wrapped = WrappedReviewPayloadSchema.safeParse(rec.payload);
    if (!wrapped.success) {
      throw new PlacementValidationError({
        code: "review_incomplete",
        message: `${stepKey} payload missing {review, __inputPkgHash}`,
      });
    }
    if (wrapped.data.__inputPkgHash !== pkg.contentHash) {
      throw new PlacementValidationError({
        code: "review_incomplete",
        message: `${stepKey} __inputPkgHash ${wrapped.data.__inputPkgHash} != final package hash ${pkg.contentHash}`,
      });
    }
    const review = parseWith(ReviewOutputSchema, wrapped.data.review, stepKey);
    if (review.round !== round) {
      throw new PlacementValidationError({
        code: "review_incomplete",
        message: `${stepKey} round=${review.round}, expected ${round}`,
      });
    }
    if (review.blocked) {
      throw new PlacementValidationError({
        code: "review_failed",
        message: `${stepKey} is blocked`,
      });
    }
    if (!review.pass) {
      throw new PlacementValidationError({
        code: "review_failed",
        message: `${stepKey} did not pass`,
      });
    }
    return review;
  });

  // 4. content_ready terminal evidence ------------------------------------
  const evRec = findRequired(records, "content_ready");
  assertVersion(evRec, parsed.schemaVersion, parsed.promptVersion, "content_ready");
  const ev = ContentReadyEvidenceSchema.safeParse(evRec.payload);
  if (!ev.success) {
    throw new PlacementValidationError({
      code: "review_incomplete",
      message: "content_ready evidence has invalid shape",
    });
  }
  if (
    ev.data.articleId !== parsed.articleId ||
    ev.data.runId !== parsed.runId ||
    ev.data.packageHash !== pkg.contentHash
  ) {
    throw new PlacementValidationError({
      code: "hash_mismatch",
      message: `content_ready evidence disagrees with run/article/package`,
    });
  }
  const orderOk = REVIEW_ORDER.every((r, i) => ev.data.reviews[i]?.round === r);
  const allPass = ev.data.reviews.every((r) => r.pass === true);
  if (!orderOk || !allPass) {
    throw new PlacementValidationError({
      code: "review_incomplete",
      message: "content_ready reviews do not cover all three passing rounds in order",
    });
  }

  // 5. Forward to placeArticle. Sources are persisted alongside the package
  // in the JSONB `package` column without altering the canonical hash.
  return placeArticle(
    {
      articleId: parsed.articleId,
      package: pkg,
      reviews,
      sourcesPack: sources,
      preview: parsed.preview ?? null,
    },
    deps,
  );
}

// -- helpers --------------------------------------------------------------

function findRequired(records: ArtifactRecord[], stepKey: string): ArtifactRecord {
  const rec = records.find((r) => r.stepKey === stepKey);
  if (!rec) {
    throw new PlacementValidationError({
      code: "review_incomplete",
      message: `missing artifact for step ${stepKey}`,
    });
  }
  return rec;
}

function assertVersion(rec: ArtifactRecord, sv: string, pv: string, stepKey: string): void {
  if (rec.schemaVersion !== sv) {
    throw new PlacementValidationError({
      code: "schema_invalid",
      message: `${stepKey} schemaVersion ${rec.schemaVersion} != ${sv}`,
    });
  }
  if (rec.promptVersion !== pv) {
    throw new PlacementValidationError({
      code: "schema_invalid",
      message: `${stepKey} promptVersion ${rec.promptVersion} != ${pv}`,
    });
  }
}

function parseWith<T>(
  schema: { safeParse: (v: unknown) => { success: boolean; data?: T; error?: unknown } },
  value: unknown,
  stepKey: string,
): T {
  const p = schema.safeParse(value);
  if (!p.success) {
    throw new PlacementValidationError({
      code: "schema_invalid",
      message: `${stepKey} payload failed schema validation`,
    });
  }
  return p.data as T;
}
