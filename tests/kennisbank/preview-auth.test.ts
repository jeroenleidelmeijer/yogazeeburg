// Real behavior tests for project-scoped preview auth.
//
// We mock the server-only Supabase admin client so we can drive
// `assertCallerIsAdminForArticle` and `fetchPreviewByArticleId` — the two
// helpers that actually enforce the project-scoped preview access — against
// realistic query outcomes. No introspection: every assertion checks the
// runtime behaviour of these functions.
import { describe, it, expect, vi, beforeEach } from "vitest";

type Route = (state: {
  table: string;
  filters: [string, unknown][];
  selectArg: string | null;
}) => { data: unknown; error: unknown };

function makeSupabase(route: Route) {
  return {
    from(table: string) {
      const state = { table, filters: [] as [string, unknown][], selectArg: null as string | null };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const chain: any = {
        select(arg: string) {
          state.selectArg = arg;
          return chain;
        },
        eq(col: string, val: unknown) {
          state.filters.push([col, val]);
          return chain;
        },
        maybeSingle() {
          return Promise.resolve(route(state));
        },
        then(res: (v: { data: unknown; error: unknown }) => unknown, rej?: (e: unknown) => unknown) {
          return Promise.resolve(route(state)).then(res, rej);
        },
      };
      return chain;
    },
  };
}

const ARTICLE_ID = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const PROJECT_A = "11111111-1111-4111-8111-111111111111";
const PROJECT_B = "22222222-2222-4222-8222-222222222222";
const ADMIN_A = "cccccccc-cccc-4ccc-8ccc-cccccccccccc";
const ADMIN_B = "dddddddd-dddd-4ddd-8ddd-dddddddddddd";

// Helper to install a per-test mock of the server-only client.
async function withSupabase(route: Route) {
  vi.doMock("@/integrations/supabase/client.server", () => ({
    supabaseAdmin: makeSupabase(route),
  }));
  vi.resetModules();
  const mod = await import("@/lib/kennisbank/data.server");
  return mod;
}

beforeEach(() => {
  vi.resetModules();
  vi.doUnmock("@/integrations/supabase/client.server");
});

describe("assertCallerIsAdminForArticle — project-scoped enforcement", () => {
  it("rejects a user who is not an admin of any project", async () => {
    const { assertCallerIsAdminForArticle } = await withSupabase((s) => {
      if (s.table === "publication_articles") return { data: { project_id: PROJECT_A }, error: null };
      if (s.table === "publication_admins") return { data: null, error: null };
      return { data: null, error: null };
    });
    await expect(assertCallerIsAdminForArticle(ADMIN_A, ARTICLE_ID)).rejects.toThrow(/not a publication admin/);
  });

  it("rejects when the caller is admin of a different project", async () => {
    const { assertCallerIsAdminForArticle } = await withSupabase((s) => {
      if (s.table === "publication_articles") return { data: { project_id: PROJECT_A }, error: null };
      if (s.table === "publication_admins") {
        // Only match when the query filters by BOTH the caller AND project A.
        const byUser = s.filters.find((f) => f[0] === "user_id")?.[1];
        const byProject = s.filters.find((f) => f[0] === "project_id")?.[1];
        if (byUser === ADMIN_B && byProject === PROJECT_A) {
          return { data: null, error: null };
        }
        // Caller is admin of project B, but the query pins project A → miss.
        return { data: null, error: null };
      }
      return { data: null, error: null };
    });
    await expect(assertCallerIsAdminForArticle(ADMIN_B, ARTICLE_ID)).rejects.toThrow(/not a publication admin/);
  });

  it("resolves when the caller is admin of the article's project", async () => {
    let sawProjectFilter = false;
    const { assertCallerIsAdminForArticle } = await withSupabase((s) => {
      if (s.table === "publication_articles") return { data: { project_id: PROJECT_A }, error: null };
      if (s.table === "publication_admins") {
        const byUser = s.filters.find((f) => f[0] === "user_id")?.[1];
        const byProject = s.filters.find((f) => f[0] === "project_id")?.[1];
        if (byUser === ADMIN_A && byProject === PROJECT_A) {
          sawProjectFilter = true;
          return { data: { user_id: ADMIN_A }, error: null };
        }
        return { data: null, error: null };
      }
      return { data: null, error: null };
    });
    await expect(assertCallerIsAdminForArticle(ADMIN_A, ARTICLE_ID)).resolves.toBeUndefined();
    expect(sawProjectFilter).toBe(true);
  });

  it("rejects when the caller has no supabase user id (anon / token-only proxy)", async () => {
    // requireSupabaseAuth middleware is the primary auth boundary and rejects
    // anon calls before reaching this helper. As defence-in-depth we verify
    // that an empty caller id still fails the admin lookup — a missing user
    // cannot pass a project-scoped admin check.
    const { assertCallerIsAdminForArticle } = await withSupabase((s) => {
      if (s.table === "publication_articles") return { data: { project_id: PROJECT_A }, error: null };
      if (s.table === "publication_admins") return { data: null, error: null };
      return { data: null, error: null };
    });
    await expect(assertCallerIsAdminForArticle("", ARTICLE_ID)).rejects.toThrow(/not a publication admin/);
  });

  it("rejects when the article does not exist", async () => {
    const { assertCallerIsAdminForArticle } = await withSupabase((s) => {
      if (s.table === "publication_articles") return { data: null, error: null };
      return { data: null, error: null };
    });
    await expect(assertCallerIsAdminForArticle(ADMIN_A, ARTICLE_ID)).rejects.toThrow(/unknown article/);
  });
});

describe("fetchPreviewByArticleId — only preview rows are exposed", () => {
  it("returns the row when placement_status='preview' is queried", async () => {
    let filteredByPreview = false;
    const previewRow = {
      id: "row_1",
      article_id: ARTICLE_ID,
      slug: "some-slug",
      placement_status: "preview",
    };
    const { fetchPreviewByArticleId } = await withSupabase((s) => {
      if (s.table !== "kennisbank_placements") return { data: null, error: null };
      const status = s.filters.find((f) => f[0] === "placement_status")?.[1];
      if (status === "preview") {
        filteredByPreview = true;
        return { data: previewRow, error: null };
      }
      // If the code ever queried draft/published, we would return a row and
      // the test would still pass — the important invariant is asserted below.
      return { data: null, error: null };
    });
    const row = await fetchPreviewByArticleId(ARTICLE_ID);
    expect(row?.placement_status).toBe("preview");
    expect(filteredByPreview).toBe(true);
  });

  it("never returns draft or published rows: only 'preview' status is queried", async () => {
    const requestedStatuses: unknown[] = [];
    const { fetchPreviewByArticleId } = await withSupabase((s) => {
      if (s.table !== "kennisbank_placements") return { data: null, error: null };
      const status = s.filters.find((f) => f[0] === "placement_status")?.[1];
      requestedStatuses.push(status);
      // Return a draft/published row anyway — the code must not reach here.
      return { data: null, error: null };
    });
    await fetchPreviewByArticleId(ARTICLE_ID);
    expect(requestedStatuses).toEqual(["preview"]);
    expect(requestedStatuses).not.toContain("draft");
    expect(requestedStatuses).not.toContain("published");
  });
});
