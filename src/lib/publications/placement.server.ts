// Server-only placement service for the Yoga Zeeburg kennisbank.
//
// This module bridges the runner's `content_ready` output (a schema-validated
// GeneratedArticlePackage plus three passed review rounds) to durable
// storage that the website can later render. It is strictly server-side:
// the file name suffix `.server.ts` blocks it from every client bundle.
//
// SAFETY BOUNDARIES:
//   * Placement NEVER flips a row to `placement_status = 'published'`. That
//     transition belongs to step 4 (live QA + complete_publication_success).
//     Placement writes `draft` (or `preview` when a preview URL is supplied).
//   * The runner is not invoked here. This service only accepts an already
//     validated package; callers are responsible for gating on
//     `automation_enabled`, review passes and the content_ready state.
//   * Idempotent by (article_id, content_hash). Re-placing the same package
//     is a no-op; a changed hash rewrites the row atomically.
//   * The registry of legacy static articles (ARTICLES) is never mutated;
//     placement targets Supabase only.
//
// Validation layered on top of the Zod schema:
//   1. Package parses with GeneratedArticlePackageSchema.
//   2. Recomputed contentHash matches the package's own hash.
//   3. Exactly three review outputs, in REVIEW_ORDER, each pass && !blocked.
//   4. Fixed CTA copy (already schema-enforced, re-checked defensively).
//   5. hasAbsoluteMedicalClaim === false, commercialLinkCount <= 1.
//   6. Every FAQ question is unique and non-empty (matches what will be
//      rendered on the page AND emitted in FAQPage JSON-LD).
//   7. Slug uniqueness against legacy articles + existing DB placements.
//   8. Article ID uniqueness: a row for the same article_id must carry the
//      same slug (slugs are immutable per article once placed).
//   9. Internal-link allowlist: every `internalLinks[i].slug` must resolve
//      to either the article itself, a legacy static article, or an
//      existing published DB placement.
//  10. `publishedAt` (when supplied) must not be in the future in
//      Europe/Amsterdam.

import { createHash } from "crypto";
import {
  GeneratedArticlePackageSchema,
  REVIEW_ORDER,
  type GeneratedArticlePackage,
  type ReviewOutput,
  type ValidatedSourcePack,
} from "./runner/schemas";
import { FIXED_CTA } from "./runner/cta";
import { packageContentHash } from "./runner/hash";

export type PlacementStatus = "draft" | "preview" | "published";

export type PlacementRow = {
  id: string;
  articleId: string;
  slug: string;
  contentHash: string;
  placementStatus: PlacementStatus;
  package: GeneratedArticlePackage;
  previewUrl: string | null;
  previewToken: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PlacementResult = {
  disposition: "placed" | "noop" | "updated";
  row: PlacementRow;
};

export type PlacementError =
  | { code: "schema_invalid"; message: string }
  | { code: "hash_mismatch"; message: string }
  | { code: "review_incomplete"; message: string }
  | { code: "review_failed"; message: string }
  | { code: "cta_invalid"; message: string }
  | { code: "invariant_violation"; message: string }
  | { code: "faq_inconsistent"; message: string }
  | { code: "slug_collision"; message: string }
  | { code: "article_slug_mismatch"; message: string }
  | { code: "link_not_allowed"; message: string; slug: string }
  | { code: "date_in_future"; message: string }
  | { code: "db_error"; message: string };

export class PlacementValidationError extends Error {
  readonly detail: PlacementError;
  constructor(detail: PlacementError) {
    super(`${detail.code}: ${detail.message}`);
    this.detail = detail;
    this.name = "PlacementValidationError";
  }
}

// -- Ports (dependency-injected for tests) --------------------------------

export interface LegacyArticleIndex {
  hasSlug(slug: string): boolean;
  listSlugs(): string[];
}

export interface PlacementStore {
  findByArticleId(articleId: string): Promise<PlacementRow | null>;
  findBySlug(slug: string): Promise<PlacementRow | null>;
  hasPublishedSlug(slug: string): Promise<boolean>;
  upsert(input: {
    articleId: string;
    slug: string;
    contentHash: string;
    placementStatus: PlacementStatus;
    package: GeneratedArticlePackage;
    previewUrl: string | null;
    previewToken: string | null;
    publishedAt: string | null;
  }): Promise<PlacementRow>;
}

export interface PlacementDeps {
  store: PlacementStore;
  legacy: LegacyArticleIndex;
  now?: () => Date;
}

// -- Public API -----------------------------------------------------------

export type PlacementInput = {
  articleId: string;
  package: GeneratedArticlePackage;
  reviews: ReviewOutput[];
  /** ISO date (YYYY-MM-DD) in Europe/Amsterdam. Optional; when omitted the row
   *  is placed without a published date and step 4 will fill it in. */
  publishedAt?: string | null;
  /** When set, row is placed as `preview` instead of `draft`. */
  preview?: {
    previewUrl: string;
    previewToken: string;
  } | null;
};

export async function placeArticle(
  input: PlacementInput,
  deps: PlacementDeps,
): Promise<PlacementResult> {
  const { articleId, reviews, preview } = input;
  const now = (deps.now ?? (() => new Date()))();

  // 1. Schema validation (defensive — caller may pass already-parsed data).
  const parsed = GeneratedArticlePackageSchema.safeParse(input.package);
  if (!parsed.success) {
    throw new PlacementValidationError({
      code: "schema_invalid",
      message: parsed.error.issues.map((i) => i.message).join("; "),
    });
  }
  const pkg = parsed.data;

  // 2. Content hash integrity.
  const recomputed = packageContentHash({ ...pkg, contentHash: "" });
  if (recomputed !== pkg.contentHash) {
    throw new PlacementValidationError({
      code: "hash_mismatch",
      message: `expected ${recomputed}, got ${pkg.contentHash}`,
    });
  }

  // 3. Exactly three reviews in canonical order, all pass and not blocked.
  if (reviews.length !== REVIEW_ORDER.length) {
    throw new PlacementValidationError({
      code: "review_incomplete",
      message: `expected ${REVIEW_ORDER.length} rounds, got ${reviews.length}`,
    });
  }
  for (let i = 0; i < REVIEW_ORDER.length; i++) {
    const r = reviews[i];
    if (r.round !== REVIEW_ORDER[i]) {
      throw new PlacementValidationError({
        code: "review_incomplete",
        message: `round ${i + 1} expected ${REVIEW_ORDER[i]}, got ${r.round}`,
      });
    }
    if (r.blocked) {
      throw new PlacementValidationError({
        code: "review_failed",
        message: `round ${r.round} is blocked`,
      });
    }
    if (!r.pass) {
      throw new PlacementValidationError({
        code: "review_failed",
        message: `round ${r.round} did not pass`,
      });
    }
  }

  // 4. Fixed CTA copy (defence in depth; schema already enforces).
  if (
    pkg.cta.heading !== FIXED_CTA.heading ||
    pkg.cta.body !== FIXED_CTA.body ||
    pkg.cta.button !== FIXED_CTA.button ||
    pkg.cta.subtext !== FIXED_CTA.subtext
  ) {
    throw new PlacementValidationError({
      code: "cta_invalid",
      message: "CTA copy must match FIXED_CTA exactly",
    });
  }

  // 5. Content invariants.
  if (pkg.hasAbsoluteMedicalClaim) {
    throw new PlacementValidationError({
      code: "invariant_violation",
      message: "absolute medical claims are not allowed",
    });
  }
  if (pkg.commercialLinkCount > 1) {
    throw new PlacementValidationError({
      code: "invariant_violation",
      message: "at most one commercial in-text link",
    });
  }

  // 6. FAQ consistency: unique, non-empty questions/answers.
  const seenQs = new Set<string>();
  for (const f of pkg.faq) {
    const q = f.question.trim();
    if (!q || !f.answer.trim()) {
      throw new PlacementValidationError({
        code: "faq_inconsistent",
        message: "FAQ entries must have non-empty question and answer",
      });
    }
    if (seenQs.has(q.toLowerCase())) {
      throw new PlacementValidationError({
        code: "faq_inconsistent",
        message: `duplicate FAQ question: ${q}`,
      });
    }
    seenQs.add(q.toLowerCase());
  }

  // 7. Internal link allowlist.
  const legacySlugs = new Set(deps.legacy.listSlugs());
  for (const link of pkg.internalLinks) {
    if (link.slug === pkg.slug) continue;
    if (legacySlugs.has(link.slug)) continue;
    const existing = await deps.store.findBySlug(link.slug);
    if (existing && existing.placementStatus === "published") continue;
    throw new PlacementValidationError({
      code: "link_not_allowed",
      slug: link.slug,
      message: `internal link target does not resolve: ${link.slug}`,
    });
  }

  // 8. Publish date not in the future (Europe/Amsterdam).
  if (input.publishedAt) {
    const today = formatDateInAmsterdam(now);
    if (input.publishedAt > today) {
      throw new PlacementValidationError({
        code: "date_in_future",
        message: `publishedAt ${input.publishedAt} is after ${today}`,
      });
    }
  }

  // 9. Slug uniqueness vs legacy + other placements.
  if (legacySlugs.has(pkg.slug)) {
    throw new PlacementValidationError({
      code: "slug_collision",
      message: `slug ${pkg.slug} collides with a legacy article`,
    });
  }
  const bySlug = await deps.store.findBySlug(pkg.slug);
  if (bySlug && bySlug.articleId !== articleId) {
    throw new PlacementValidationError({
      code: "slug_collision",
      message: `slug ${pkg.slug} already used by another article`,
    });
  }

  // 10. Article-id stability: same article must keep same slug.
  const existing = await deps.store.findByArticleId(articleId);
  if (existing && existing.slug !== pkg.slug) {
    throw new PlacementValidationError({
      code: "article_slug_mismatch",
      message: `article ${articleId} previously placed with slug ${existing.slug}`,
    });
  }

  // Idempotency: same hash + same status + same preview_url = no-op.
  const desiredStatus: PlacementStatus = preview ? "preview" : "draft";
  const desiredPreviewUrl = preview?.previewUrl ?? null;
  const desiredPreviewToken = preview?.previewToken ?? null;

  if (
    existing &&
    existing.contentHash === pkg.contentHash &&
    existing.placementStatus === desiredStatus &&
    existing.previewUrl === desiredPreviewUrl
  ) {
    return { disposition: "noop", row: existing };
  }

  const row = await deps.store.upsert({
    articleId,
    slug: pkg.slug,
    contentHash: pkg.contentHash,
    placementStatus: desiredStatus,
    package: pkg,
    previewUrl: desiredPreviewUrl,
    previewToken: desiredPreviewToken,
    // Placement never sets `published_at`; step 4 owns that column.
    publishedAt: existing?.publishedAt ?? null,
  });

  return {
    disposition: existing ? "updated" : "placed",
    row,
  };
}

// -- Helpers --------------------------------------------------------------

/** Returns YYYY-MM-DD for the given instant in Europe/Amsterdam. */
export function formatDateInAmsterdam(d: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Amsterdam",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const y = parts.find((p) => p.type === "year")!.value;
  const m = parts.find((p) => p.type === "month")!.value;
  const day = parts.find((p) => p.type === "day")!.value;
  return `${y}-${m}-${day}`;
}

/** Stable hash for a preview token used to guard preview URLs. */
export function derivePreviewToken(articleId: string, contentHash: string): string {
  return createHash("sha256")
    .update(`preview:${articleId}:${contentHash}`)
    .digest("hex")
    .slice(0, 32);
}

// -- Supabase-backed store ------------------------------------------------

export function createSupabasePlacementStore(): PlacementStore {
  return {
    async findByArticleId(articleId) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data, error } = await (supabaseAdmin as any)
        .from("kennisbank_placements")
        .select("*")
        .eq("article_id", articleId)
        .maybeSingle();
      if (error) throw new PlacementValidationError({ code: "db_error", message: error.message });
      return data ? rowFromDb(data) : null;
    },
    async findBySlug(slug) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data, error } = await (supabaseAdmin as any)
        .from("kennisbank_placements")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw new PlacementValidationError({ code: "db_error", message: error.message });
      return data ? rowFromDb(data) : null;
    },
    async hasPublishedSlug(slug) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data, error } = await (supabaseAdmin as any)
        .from("kennisbank_placements")
        .select("id")
        .eq("slug", slug)
        .eq("placement_status", "published")
        .maybeSingle();
      if (error) throw new PlacementValidationError({ code: "db_error", message: error.message });
      return !!data;
    },
    async upsert(input) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data, error } = await (supabaseAdmin as any)
        .from("kennisbank_placements")
        .upsert(
          {
            article_id: input.articleId,
            slug: input.slug,
            content_hash: input.contentHash,
            placement_status: input.placementStatus,
            package: input.package,
            preview_url: input.previewUrl,
            preview_token: input.previewToken,
            published_at: input.publishedAt,
          },
          { onConflict: "article_id" },
        )
        .select("*")
        .single();
      if (error) throw new PlacementValidationError({ code: "db_error", message: error.message });
      return rowFromDb(data);
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowFromDb(d: any): PlacementRow {
  return {
    id: d.id,
    articleId: d.article_id,
    slug: d.slug,
    contentHash: d.content_hash,
    placementStatus: d.placement_status,
    package: d.package,
    previewUrl: d.preview_url ?? null,
    previewToken: d.preview_token ?? null,
    publishedAt: d.published_at ?? null,
    createdAt: d.created_at,
    updatedAt: d.updated_at,
  };
}
