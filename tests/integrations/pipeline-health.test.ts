import { describe, expect, it } from "vitest";
import { countActiveRuns } from "@/lib/integrations/pipeline-health";

const A = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
const B = "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb";

describe("countActiveRuns", () => {
  it("excludes a historical failure followed by a successful run", () => {
    const counts = countActiveRuns(
      [
        { article_id: A, final_status: "failed", finished_at: "2026-07-01T10:00:00Z" },
        { article_id: A, final_status: "retry_pending", finished_at: "2026-07-01T11:00:00Z" },
        { article_id: A, final_status: "published", finished_at: "2026-07-02T10:00:00Z" },
      ],
      new Set(),
    );
    expect(counts).toEqual({ failed_runs: 0, retry_pending_runs: 0 });
  });

  it("excludes runs for an article whose current status is published", () => {
    const counts = countActiveRuns(
      [
        { article_id: A, final_status: "failed", finished_at: "2026-07-01T10:00:00Z" },
        { article_id: A, final_status: "retry_pending", finished_at: "2026-07-01T11:00:00Z" },
      ],
      new Set([A]),
    );
    expect(counts).toEqual({ failed_runs: 0, retry_pending_runs: 0 });
  });

  it("counts a genuinely unresolved latest failure", () => {
    const counts = countActiveRuns(
      [
        { article_id: A, final_status: "published", finished_at: "2026-07-01T10:00:00Z" },
        { article_id: A, final_status: "failed", finished_at: "2026-07-03T10:00:00Z" },
        { article_id: B, final_status: "retry_pending", finished_at: "2026-07-03T12:00:00Z" },
      ],
      new Set(),
    );
    expect(counts).toEqual({ failed_runs: 1, retry_pending_runs: 1 });
  });

  it("ignores superseded older failures for unpublished articles", () => {
    const counts = countActiveRuns(
      [
        { article_id: B, final_status: "failed", finished_at: "2026-07-01T10:00:00Z" },
        { article_id: B, final_status: "preview_ready", finished_at: "2026-07-02T10:00:00Z" },
      ],
      new Set(),
    );
    expect(counts).toEqual({ failed_runs: 0, retry_pending_runs: 0 });
  });
});
