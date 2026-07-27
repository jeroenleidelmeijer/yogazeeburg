// Server-function facade for the Yoga Gids registry. Every kennisbank route
// loader calls these functions; they are the only surface that touches the
// server-only `data.server.ts` module.
//
// Fail-closed: DB errors throw, which lets TanStack surface an errorComponent
// instead of silently showing "no articles". Every kennisbank route already
// defines errorComponent/notFoundComponent for this reason.

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { ArticleRef, ArticleResolvedRef, DbArticleViewModel } from "./types";

export const listPublishedArticlesFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<ArticleRef[]> => {
    const { listPublishedRefs } = await import("./data.server");
    return listPublishedRefs();
  },
);

export const resolveArticleBySlugFn = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }): Promise<ArticleResolvedRef | null> => {
    const { resolveArticleBySlug } = await import("./data.server");
    return resolveArticleBySlug(data.slug);
  });

/**
 * Admin-only preview lookup. Requires an authenticated Supabase user who is
 * registered in publication_admins. A query token alone is NEVER sufficient.
 * The middleware validates the bearer token; the handler then verifies the
 * caller's admin role before returning any preview content.
 */
export const getPreviewByArticleIdFn = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        articleId: z.string().uuid(),
        token: z.string().min(8).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }): Promise<{ view: DbArticleViewModel } | null> => {
    const { fetchPreviewByArticleId, dbRowToViewModel, assertCallerIsPublicationAdmin } =
      await import("./data.server");

    await assertCallerIsPublicationAdmin(context.userId);

    const row = await fetchPreviewByArticleId(data.articleId);
    if (!row) return null;
    // Optional defence-in-depth: when a token is supplied it must match the
    // stored preview_token. The PRIMARY gate is the admin check above.
    if (data.token && row.preview_token && data.token !== row.preview_token) {
      throw new Error("Forbidden: preview token mismatch");
    }
    return { view: dbRowToViewModel(row) };
  });
