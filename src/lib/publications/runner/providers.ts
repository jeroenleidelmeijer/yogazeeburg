// Dependency-injection surface for the runner. Tests inject in-memory fakes;
// production wires real Supabase admin RPCs. NOTHING in this module talks
// to the network directly.
//
// SCOPE — post rolverdeling formalization (July 2026):
// The runner accepts an EXTERNALLY-authored FinalArticlePackage (written and
// reviewed by ChatGPT against the Kennisbank Werkinstructie Masterdocument).
// It does NOT brief, write, review or repair content. `AiProviders` remains
// defined here for legacy compatibility of tests and historical artifacts,
// but it is intentionally NOT part of the active `RunnerDeps` surface.

import type {
  ArticleBrief,
  GeneratedArticlePackage,
  ReviewOutput,
  ReviewRoundKind,
  ValidatedSourcePack,
} from "./schemas";

export type StepKey =
  | "init"
  | "claim"
  | "validate_package"
  | "placement_ready";

export type Disposition =
  | "disabled_noop"
  | "claim_noop"
  | "placement_ready"
  | "blocked"
  | "failed";

export interface ProjectConfig {
  projectId: string;
  projectKey: string;
  automationEnabled: boolean;
  publicationStopped: boolean;
  timezone: string;
}

export interface ClaimedRun {
  runId: string;
  articleId: string;
  planningNumber: number;
  lockToken: string;
  phase: string;
  originalTitle: string;
}

export interface ConfigProvider {
  loadProjectConfig(projectKey: string): Promise<ProjectConfig>;
}

export interface RunControl {
  claim(input: { projectKey: string; trigger: "manual" | "scheduled" }): Promise<ClaimedRun | null>;
  heartbeat(input: { runId: string; articleId: string; lockToken: string; extendSeconds: number }): Promise<void>;
  advance(input: {
    runId: string;
    articleId: string;
    lockToken: string;
    fromStatus: string;
    toStatus: string;
    stepKey: string;
    evidence: Record<string, unknown>;
  }): Promise<void>;
  recordFailure(input: {
    runId: string;
    articleId: string;
    lockToken: string;
    stepKey: string;
    category: string;
    summary: string;
    retryable: boolean;
    details: Record<string, unknown>;
  }): Promise<void>;
}

export interface ArtifactRecord {
  stepKey: string;
  schemaVersion: string;
  promptVersion: string;
  contentHash: string;
  payload: unknown;
}
export interface ArtifactStore {
  list(input: { runId: string; articleId: string; lockToken: string }): Promise<ArtifactRecord[]>;
  upsert(input: {
    runId: string;
    articleId: string;
    lockToken: string;
    stepKey: string;
    schemaVersion: string;
    promptVersion: string;
    contentHash: string;
    payload: unknown;
  }): Promise<void>;
}

/**
 * LEGACY interface — retained ONLY so tests that assert the AI stub throws
 * and historical fake constructors still typecheck. It is NOT part of the
 * active pipeline's dependency graph.
 * @deprecated Content authorship happens externally; do not implement.
 */
export interface AiProviders {
  generateBrief(input: { claim: ClaimedRun; context: Record<string, unknown> }): Promise<unknown>;
  validateSources(input: { brief: ArticleBrief }): Promise<unknown>;
  generateArticle(input: { brief: ArticleBrief; sources: ValidatedSourcePack }): Promise<unknown>;
  reviewRound(input: {
    round: ReviewRoundKind;
    brief: ArticleBrief;
    sources: ValidatedSourcePack;
    pkg: GeneratedArticlePackage;
    priorReviews: ReviewOutput[];
  }): Promise<unknown>;
}

export interface RunnerDeps {
  config: ConfigProvider;
  runControl: RunControl;
  artifacts: ArtifactStore;
  now?: () => Date;
  heartbeatIntervalMs?: number;
  promptVersion: string;
  schemaVersion: string;
  /** Reserved. No repair cycles in the external-authorship pipeline. */
  maxRepairCycles?: number;
}
