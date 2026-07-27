// Server-only placement entrypoint. This is the boundary that step 4's
// build/preview orchestrator will call once a run reaches `content_ready`.
// It does NOT invoke the runner, does NOT call the AI, and does NOT change
// any publication_articles status. It reads previously stored artifacts and,
// if they check out, forwards them to `placeArticle`.
//
// Guarantees:
//   * The caller must have already produced the four required artifacts
//     (brief, sources, generated_package, review_1..review_3). This function
//     verifies existence, schema/prompt version match, and hash agreement
//     but never writes new artifacts.
//   * Idempotent: internally reuses `placeArticle`'s (article_id, content_hash)
//     idempotency contract. Repeated calls with the same artifacts are no-ops.
//   * Placement writes `draft` (or `preview` when preview info is passed).
//     Never `published`. Never calls `complete_publication_success`.

import { z } from "zod";
import {
  GeneratedArticlePackageSchema,
  ReviewOutputSchema,
  REVIEW_ORDER,
  type GeneratedArticlePackage,
  type ReviewOutput,
} from "@/lib/publications/runner/schemas";
import type { ArtifactRecord, ArtifactStore } from "@/lib/publications/runner/providers";
import { packageContentHash } from "@/lib/publications/runner/hash";
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

/**
 * Read artifacts by stepKey, verify shape, then call placeArticle.
 * Fails closed on any missing/mismatched artifact — the runner is authoritative
 * about content, and disagreement is a hard error, not a soft skip.
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

  const pkgRec = findRequired(records, "generated_package");
  assertVersion(pkgRec, parsed.schemaVersion, parsed.promptVersion, "generated_package");
  const pkg: GeneratedArticlePackage = GeneratedArticlePackageSchema.parse(pkgRec.payload);
  if (pkg.articleId !== parsed.articleId) {
    throw new PlacementValidationError({
      code: "schema_invalid",
      message: `package.articleId ${pkg.articleId} != run articleId ${parsed.articleId}`,
    });
  }
  // Recompute the trusted hash and require agreement with both the artifact
  // record and the package's own contentHash. The runner writes both from the
  // same canonical form; mismatch => tampering or version drift.
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
      message: `artifact.contentHash ${pkgRec.contentHash} != recomputed ${trusted}`,
    });
  }

  // Load the three reviews in canonical order.
  const reviews: ReviewOutput[] = REVIEW_ORDER.map((round, i) => {
    const stepKey = `review_${i + 1}` as const;
    const rec = findRequired(records, stepKey);
    assertVersion(rec, parsed.schemaVersion, parsed.promptVersion, stepKey);
    const parsedReview = ReviewOutputSchema.parse(rec.payload);
    if (parsedReview.round !== round) {
      throw new PlacementValidationError({
        code: "review_incomplete",
        message: `${stepKey} round=${parsedReview.round}, expected ${round}`,
      });
    }
    return parsedReview;
  });

  return placeArticle(
    {
      articleId: parsed.articleId,
      package: pkg,
      reviews,
      preview: parsed.preview ?? null,
    },
    deps,
  );
}

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
