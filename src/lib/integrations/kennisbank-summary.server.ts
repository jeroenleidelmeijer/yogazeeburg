/**
 * Read-only integration payload for Leidelmeijer OS.
 *
 * Server-only: uses the service-role client because `publication_articles`
 * and the non-published `kennisbank_placements` rows are admin-scoped by RLS.
 * Callers MUST verify the X-Api-Key header before invoking this module.
 */

export type RecentPublished = {
  final_title: string | null;
  slug: string | null;
  published_at: string | null;
  category: string | null;
  cluster: string | null;
};

export type NextScheduled = {
  planning_number: number;
  final_title: string | null;
  /** Working title from the planning sheet; set before final_title exists. */
  original_title: string | null;
  status: string;
  scheduled_at: string | null;
  primary_keyword: string | null;
};

export type PipelineHealth = {
  failed_runs: number;
  retry_pending_runs: number;
  articles_failed: number;
  articles_retry_pending: number;
  articles_blocked: number;
  healthy: boolean;
  last_error: {
    article_planning_number: number | null;
    error_category: string | null;
    error_summary: string | null;
    occurred_at: string | null;
  } | null;
};

export type KennisbankSummary = {
  generated_at: string;
  total_published: number;
  total_planned: number;
  planning_target: number;
  recent_published: RecentPublished[];
  next_scheduled: NextScheduled[];
  pipeline_health: PipelineHealth;
};

const PLANNING_TARGET = 180;

/** Statuses that still have to run before an article can go live. */
const UPCOMING_STATUSES = [
  "planned",
  "locked",
  "drafting",
  "validating",
  "building",
  "preview_check",
  "preview_ready",
  "publishing",
  "live_check",
  "retry_pending",
] as const;

function nullable(value: string | null | undefined): string | null {
  if (value === null || value === undefined) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export async function buildKennisbankSummary(): Promise<KennisbankSummary> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const [articlesRes, placementsRes, runsRes, lastErrorRes] = await Promise.all([
    supabaseAdmin
      .from("publication_articles")
      .select(
        "planning_number, final_title, original_title, slug, status, category, cluster, primary_keyword, published_at, scheduled_at",
      )
      .order("planning_number", { ascending: true }),
    supabaseAdmin
      .from("kennisbank_placements")
      .select("slug, placement_status, published_at")
      .eq("placement_status", "published"),
    supabaseAdmin.from("publication_runs").select("final_status"),
    supabaseAdmin
      .from("publication_articles")
      .select("planning_number, last_error_category, last_error_summary, updated_at")
      .not("last_error_category", "is", null)
      .order("updated_at", { ascending: false })
      .limit(1),
  ]);

  if (articlesRes.error) throw articlesRes.error;
  if (placementsRes.error) throw placementsRes.error;
  if (runsRes.error) throw runsRes.error;
  if (lastErrorRes.error) throw lastErrorRes.error;

  const articles = articlesRes.data ?? [];
  const placements = placementsRes.data ?? [];
  const runs = runsRes.data ?? [];

  // A slug counts once, whether it is published via the article pipeline or
  // via a published website placement.
  const publishedSlugs = new Set<string>();
  let publishedWithoutSlug = 0;
  for (const a of articles) {
    if (a.status !== "published") continue;
    if (a.slug) publishedSlugs.add(a.slug);
    else publishedWithoutSlug += 1;
  }
  for (const p of placements) {
    if (p.slug) publishedSlugs.add(p.slug);
  }

  const recent_published: RecentPublished[] = articles
    .filter((a) => a.status === "published")
    .sort((a, b) => (b.published_at ?? "").localeCompare(a.published_at ?? ""))
    .slice(0, 5)
    .map((a) => ({
      final_title: nullable(a.final_title),
      slug: nullable(a.slug),
      published_at: a.published_at ?? null,
      category: nullable(a.category),
      cluster: nullable(a.cluster),
    }));

  const upcoming = new Set<string>(UPCOMING_STATUSES);
  const next_scheduled: NextScheduled[] = articles
    .filter((a) => upcoming.has(a.status))
    .slice(0, 3)
    .map((a) => ({
      planning_number: a.planning_number,
      final_title: nullable(a.final_title),
      original_title: nullable(a.original_title),
      status: a.status,
      scheduled_at: a.scheduled_at ?? null,
      primary_keyword: nullable(a.primary_keyword),
    }));

  const failed_runs = runs.filter((r) => r.final_status === "failed").length;
  const retry_pending_runs = runs.filter((r) => r.final_status === "retry_pending").length;
  const articles_failed = articles.filter((a) => a.status === "failed").length;
  const articles_retry_pending = articles.filter((a) => a.status === "retry_pending").length;
  const articles_blocked = articles.filter((a) => a.status === "blocked").length;
  const lastError = lastErrorRes.data?.[0] ?? null;

  return {
    generated_at: new Date().toISOString(),
    total_published: publishedSlugs.size + publishedWithoutSlug,
    total_planned: articles.length,
    planning_target: PLANNING_TARGET,
    recent_published,
    next_scheduled,
    pipeline_health: {
      failed_runs,
      retry_pending_runs,
      articles_failed,
      articles_retry_pending,
      articles_blocked,
      healthy:
        failed_runs === 0 &&
        retry_pending_runs === 0 &&
        articles_failed === 0 &&
        articles_retry_pending === 0 &&
        articles_blocked === 0,
      last_error: lastError
        ? {
            article_planning_number: lastError.planning_number ?? null,
            error_category: nullable(lastError.last_error_category),
            error_summary: nullable(lastError.last_error_summary),
            occurred_at: lastError.updated_at ?? null,
          }
        : null,
    },
  };
}
