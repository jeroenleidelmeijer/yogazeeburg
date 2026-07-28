// Project-bound admin entrypoint for the single manual preview-run of
// planning_number=4 of the `yoga-zeeburg-kennisbank` publication project.
//
// The externally-authored FinalArticlePackage is passed in as the sole
// authoritative content input; the runner does not brief, write, review
// or repair content.

import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

// Input schema: the projectKey + planningNumber are pinned; `finalPackage`
// is passed through opaquely (validated strictly server-side by the
// runner's FinalArticlePackageSchema so we do not duplicate the shape
// here and drift). It is required.
const InputSchema = z.object({
  projectKey: z.literal("yoga-zeeburg-kennisbank"),
  planningNumber: z.literal(4),
  finalPackage: z.record(z.string(), z.unknown()),
});

export const runArticle4Preview = createServerFn({ method: "POST" })
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

    const { runArticle4PreviewOnce } = await import("./preview-run.server");
    const outcome = await runArticle4PreviewOnce(data.finalPackage);
    return outcome;
  });
