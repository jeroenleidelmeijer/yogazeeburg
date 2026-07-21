import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import planning from "./planning.json";

const PROJECT_KEY = "yoga-zeeburg-kennisbank";

export type PublicationArticleRow = {
  id: string;
  planning_number: number;
  phase: string;
  original_title: string;
  final_title: string | null;
  slug: string | null;
  cluster: string | null;
  cta_variant: string | null;
  status: string;
  published_at: string | null;
  live_url: string | null;
  retry_count: number;
  last_error_summary: string | null;
  lock_expires_at: string | null;
  updated_at: string;
};
export type PublicationRunRow = {
  id: string;
  article_id: string | null;
  trigger_type: string;
  phase: string | null;
  current_step: string;
  final_status: string;
  error_summary: string | null;
  started_at: string;
  finished_at: string | null;
};
export type PublicationEventRow = {
  id: number;
  event_type: string;
  actor_type: string;
  reason: string | null;
  created_at: string;
  article_id: string | null;
};

export type PublicationOverview = {
  isAdmin: boolean;
  project:
    | null
    | {
        id: string;
        name: string;
        automation_enabled: boolean;
        publication_stopped: boolean;
        stopped_reason: string | null;
        timezone: string;
        knowledge_base_path: string;
      };
  canBootstrap: boolean;
  summary: null | {
    total: number;
    published: number;
    planned: number;
    failed: number;
    blocked: number;
    locked: number;
    inProgress: number;
  };
  articles: PublicationArticleRow[];
  recentRuns: PublicationRunRow[];
  recentEvents: PublicationEventRow[];
};

export const getPublicationOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase } = context;

    const { data: adminRows } = await supabase
      .from("publication_admins")
      .select("project_id")
      .limit(1);
    const isAdmin = (adminRows?.length ?? 0) > 0;

    if (!isAdmin) {
      // Check whether ANY admin exists in the whole project (so we can offer bootstrap).
      // We can't query publication_admins because RLS restricts to self. Use the projects
      // RLS: admins can read projects. If no rows come back and no admin rows exist, bootstrap is available.
      const { data: proj } = await supabase.from("publication_projects").select("id").maybeSingle();
      return {
        isAdmin: false,
        project: null as null | { id: string; automation_enabled: boolean; publication_stopped: boolean; name: string },
        canBootstrap: !proj,
        summary: null,
        articles: [] as PublicationArticleRow[],
        recentRuns: [] as PublicationRunRow[],
        recentEvents: [] as PublicationEventRow[],
      };
    }

    const [{ data: project }, { data: articles }, { data: runs }, { data: events }] = await Promise.all([
      supabase
        .from("publication_projects")
        .select("id, name, automation_enabled, publication_stopped, stopped_reason, timezone, knowledge_base_path")
        .maybeSingle(),
      supabase
        .from("publication_articles")
        .select(
          "id, planning_number, phase, original_title, final_title, slug, cluster, cta_variant, status, published_at, live_url, retry_count, last_error_summary, lock_expires_at, updated_at",
        )
        .order("planning_number", { ascending: true }),
      supabase
        .from("publication_runs")
        .select("id, article_id, trigger_type, phase, current_step, final_status, error_summary, started_at, finished_at")
        .order("started_at", { ascending: false })
        .limit(20),
      supabase
        .from("publication_events")
        .select("id, event_type, actor_type, reason, created_at, article_id")
        .order("created_at", { ascending: false })
        .limit(20),
    ]);

    const arts = articles ?? [];
    const summary = {
      total: arts.length,
      published: arts.filter((a) => a.status === "published").length,
      planned: arts.filter((a) => a.status === "planned").length,
      failed: arts.filter((a) => a.status === "failed").length,
      blocked: arts.filter((a) => a.status === "blocked").length,
      locked: arts.filter((a) => a.status === "locked").length,
      inProgress: arts.filter((a) =>
        ["drafting", "validating", "building", "preview_check", "publishing", "live_check", "retry_pending"].includes(a.status),
      ).length,
    };

    return {
      isAdmin: true,
      project,
      canBootstrap: false,
      summary,
      articles: arts as PublicationArticleRow[],
      recentRuns: (runs ?? []) as PublicationRunRow[],
      recentEvents: (events ?? []) as PublicationEventRow[],
    };
  });

export const bootstrapFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("bootstrap_first_admin", { p_project_key: PROJECT_KEY });
    if (error) throw new Error(error.message);
    return data;
  });

export const importPlanning = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { dryRun: boolean }) => input)
  .handler(async ({ data, context }) => {
    const { data: result, error } = await context.supabase.rpc("import_publication_planning", {
      p_project_key: PROJECT_KEY,
      p_rows: planning as unknown as never,
      p_dry_run: data.dryRun,
    });
    if (error) throw new Error(error.message);
    const rows = (result ?? []) as { planning_number: number; action: string; original_title: string }[];
    const counts = rows.reduce<Record<string, number>>((acc, r) => {
      acc[r.action] = (acc[r.action] ?? 0) + 1;
      return acc;
    }, {});
    return { dryRun: data.dryRun, counts, rows };
  });

export const backfillPilots = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { error } = await context.supabase.rpc("backfill_pilot_articles");
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminReleaseLock = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { articleId: string; reason?: string }) => input)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.rpc("admin_release_stale_lock", {
      p_article_id: data.articleId,
      p_reason: data.reason ?? undefined,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminMarkArticle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: { articleId: string; newStatus: "planned" | "failed" | "blocked" | "retry_pending"; reason?: string }) => input,
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.rpc("admin_mark_article", {
      p_article_id: data.articleId,
      p_new_status: data.newStatus,
      p_reason: data.reason ?? undefined,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminSetAutomation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { enabled: boolean; reason?: string }) => input)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.rpc("admin_set_automation", {
      p_project_key: PROJECT_KEY,
      p_enabled: data.enabled,
      p_reason: data.reason ?? undefined,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminStopPublication = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { reason: string }) => input)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.rpc("admin_stop_publication", {
      p_project_key: PROJECT_KEY,
      p_reason: data.reason,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
