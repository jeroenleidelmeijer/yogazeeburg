// Barrel for the runner. Server-only adapters live in `./adapters.server.ts`
// and `./ai-provider.server.ts` — those are NOT re-exported here so importing
// this module from a client-graph file never pulls the service-role key or
// AI secret into the client bundle.
export * from "./cta";
export * from "./errors";
export * from "./providers";
export * from "./schemas";
export * from "./hash";
export { runPipeline, deterministicHash } from "./pipeline";
export type { PipelineResult, RunPipelineInput } from "./pipeline";
export {
  FinalArticlePackageSchema,
  AUTHORED_BY_EXTERNAL,
  toGeneratedArticlePackage,
  synthesizeExternalReviews,
} from "./final-package";
export type { FinalArticlePackage } from "./final-package";
