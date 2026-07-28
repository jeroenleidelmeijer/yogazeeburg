// Project-bound admin entrypoint for the single manual preview-run of
// planning_number=4 of the `yoga-zeeburg-kennisbank` publication project.
//
// Thin wrapper only — every runtime helper lives in preview-run.server.ts
// (which is *.server.ts and therefore blocked from client bundles).
//
// Auth chain:
//   1. requireSupabaseAuth middleware validates the bearer token; context
//      exposes an RLS-scoped supabase client acting as the caller.
//   2. Handler verifies the caller is a publication_admins member of the
//      target project (project-scoped, not any-project) via the existing
//      is_publication_admin(project_id) SECURITY DEFINER function.
//   3. Handler refuses any target other than yoga-zeeburg-kennisbank +
//      planning_number=4.
//
// No client-side service-role secret is exposed. The privileged server-only
// path is loaded inside the handler via await import().

import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const InputSchema = z.object({
  projectKey: z.literal("yoga-zeeburg-kennisbank"),
  planningNumber: z.literal(4),
});

export const runArticle4Preview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data, context }) => {
    // Project-scoped admin check via the auth-scoped supabase client. The
    // publication_projects row is admin-only readable (RLS via
    // is_publication_admin), so an anon/non-admin caller cannot even see
    // the project id here.
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

    // Load server-only orchestrator only after authorization succeeds.
    const { runArticle4PreviewOnce } = await import("./preview-run.server");
    const outcome = await runArticle4PreviewOnce();
    return outcome;
  });
