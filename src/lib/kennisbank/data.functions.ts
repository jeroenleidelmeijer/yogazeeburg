// Server-function facade for the Yoga Gids registry. Every kennisbank route
// loader calls these functions; they are the only surface that touches the
// server-only `data.server.ts` module.
//
// Fail-closed: DB errors throw, which lets TanStack surface an errorComponent
// instead of silently showing "no articles". The kennisbank routes already
// define errorComponent/notFoundComponent for this reason.

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
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
 */
export const getPreviewByArticleIdFn = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) =>
    z.object({ articleId: z.string().uuid(), token: z.string().min(8).optional() }).parse(input),
  )
  .handler(async ({ data }): Promise<{ view: DbArticleViewModel } | null> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { fetchPreviewByArticleId, dbRowToViewModel, assertCallerIsPublicationAdmin } =
      await import("./data.server");

    // Authenticate via the caller's bearer token — same pattern as
    // requireSupabaseAuth but inlined here so this fn stays independent
    // of auth-middleware's context injection contract.
    const authHeader = getRequestAuthHeader();
    if (!authHeader) throw new Error("Unauthorized");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: userData, error: userErr } = await (supabaseAdmin.auth as any).getUser(
      authHeader.replace(/^Bearer\s+/i, ""),
    );
    if (userErr || !userData?.user?.id) throw new Error("Unauthorized");
    await assertCallerIsPublicationAdmin(userData.user.id);

    const row = await fetchPreviewByArticleId(data.articleId);
    if (!row) return null;
    // Optional defence-in-depth: if a token was passed, it must match the
    // stored preview_token. The primary gate remains the admin check.
    if (data.token && row.preview_token && data.token !== row.preview_token) {
      throw new Error("Forbidden: preview token mismatch");
    }
    return { view: dbRowToViewModel(row) };
  });

function getRequestAuthHeader(): string | null {
  try {
    // TanStack Start exposes the current request via getRequest(); reading
    // headers here keeps preview lookup coupled only to what the client sent.
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const mod = require("@tanstack/react-start/server") as {
      getRequest?: () => Request;
    };
    const req = mod.getRequest?.();
    return req?.headers.get("authorization") ?? null;
  } catch {
    return null;
  }
}
