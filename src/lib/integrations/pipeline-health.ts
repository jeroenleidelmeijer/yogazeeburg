/**
 * Pure, read-only derivation of pipeline health for the kennisbank summary.
 *
 * Health must reflect *unresolved current state*, not the full historical run
 * log: a failed or retry_pending run that was later superseded by a successful
 * publication (or whose article is now published) is audit data, not an
 * incident.
 */

export type HealthArticleInput = {
  planning_number: number;
  status: string;
};

export type HealthRunInput = {
  article_id: string | null;
  final_status: string;
  started_at?: string | null;
  finished_at?: string | null;
  created_at?: string | null;
};

export type ActiveRunCounts = {
  failed_runs: number;
  retry_pending_runs: number;
};

const UNRESOLVED_RUN_STATUSES = new Set(["failed", "retry_pending"]);
/** Run outcomes that resolve any earlier failure for the same article. */
const RESOLVING_RUN_STATUSES = new Set(["published", "preview_ready", "cancelled"]);

function runTime(run: HealthRunInput): number {
  const raw = run.finished_at ?? run.started_at ?? run.created_at ?? null;
  const parsed = raw ? Date.parse(raw) : NaN;
  return Number.isNaN(parsed) ? 0 : parsed;
}

/**
 * Counts only unresolved failed/retry_pending runs:
 * - runs for articles that are currently `published` are excluded;
 * - only the latest run per article is considered, so a superseded older
 *   failure cannot raise a false alert;
 * - a later resolving run for the same article clears earlier failures.
 */
export function countActiveRuns(
  runs: HealthRunInput[],
  publishedArticleIds: ReadonlySet<string>,
): ActiveRunCounts {
  const latestPerArticle = new Map<string, HealthRunInput>();

  for (const run of runs) {
    if (run.article_id && publishedArticleIds.has(run.article_id)) continue;
    const key = run.article_id ?? "__unassigned__";
    const current = latestPerArticle.get(key);
    if (!current || runTime(run) >= runTime(current)) {
      latestPerArticle.set(key, run);
    }
  }

  let failed_runs = 0;
  let retry_pending_runs = 0;
  for (const run of latestPerArticle.values()) {
    if (!UNRESOLVED_RUN_STATUSES.has(run.final_status)) continue;
    if (run.final_status === "failed") failed_runs += 1;
    else retry_pending_runs += 1;
  }

  return { failed_runs, retry_pending_runs };
}

export function isResolvingRunStatus(status: string): boolean {
  return RESOLVING_RUN_STATUSES.has(status);
}
