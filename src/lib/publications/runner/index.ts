// Barrel + server-only invocation stub. Real Supabase/AI wiring is added in
// step 3; this file exists so callers get one import path and so future
// wiring has a documented seam. Do NOT wire this to any route, admin action,
// scheduler or cron in this step.
export * from "./cta";
export * from "./errors";
export * from "./providers";
export * from "./schemas";
export { runPipeline, deterministicHash } from "./pipeline";
export type { PipelineResult, RunPipelineInput } from "./pipeline";
