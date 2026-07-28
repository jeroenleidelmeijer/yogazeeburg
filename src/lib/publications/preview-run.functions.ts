// Project-bound admin entrypoint for a single manual preview-run of one
// article of the `yoga-zeeburg-kennisbank` publication project. Generic
// over planning_number (1..180); one call processes exactly one article.
//
// The externally-authored FinalArticlePackage is passed in as the sole
// authoritative content input; the runner does not brief, write, review
// or repair content.

import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import { MAX_PLANNING_NUMBER } from "./scheduler/cadence";

const InputSchema = z.object({
  projectKey: z.literal("yoga-zeeburg-kennisbank"),
  planningNumber: z.number().int().min(1).max(MAX_PLANNING_NUMBER),
  finalPackage: z.record(z.string(), z.unknown()),
});

export const runArticlePreview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: project, error: projectErr } = await context.supabase
      .from("publication_projects")
      .select("id, project_key, publication_stopped")
      .eq("project_key", data.projectKey)
      .maybeSingle();
    if (projectErr) throw new Error("unauthorized_or_missing_project");
    if (!project) throw new Error("unauthorized_or_missing_project");

    const { data: isAdmin, error: adminErr } = await context.supabase.rpc(
      "is_publication_admin",
      { p_project_id: project.id },
    );
    if (adminErr) throw new Error("admin_check_failed");
    if (isAdmin !== true) throw new Error("forbidden");

    if (project.publication_stopped) {
      return { status: "stopped" as const, message: "publication_stopped" };
    }

    const { runArticlePreviewOnce } = await import("./preview-run.server");
    const outcome = await runArticlePreviewOnce({
      projectKey: data.projectKey,
      planningNumber: data.planningNumber,
      finalPackage: data.finalPackage,
    });
    return outcome;
  });
