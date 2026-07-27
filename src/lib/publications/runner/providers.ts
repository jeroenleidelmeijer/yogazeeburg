// Dependency-injection surface for the runner. Tests inject in-memory fakes;
// production wires real Supabase admin RPCs + AI Gateway providers.
// NOTHING in this module talks to the network directly.

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
  | "brief"
  | "source_validation"
  | "generation"
  | "review_1"
  | "review_2"
  | "review_3"
  | "content_ready";

export type Disposition =
  | "disabled_noop"
  | "claim_noop"
  | "blocked"
  | "content_ready"
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
  /** Delegates to `claim_next_publication_run`; returns null when no claim. */
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
  completePreview(input: {
    runId: string;
    articleId: string;
    lockToken: string;
    previewUrl: string;
    contentHash: string;
    previewDeploymentId?: string;
  }): Promise<void>;
}

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
  ai: AiProviders;
  now?: () => Date;
  heartbeatIntervalMs?: number;
  promptVersion: string;
  schemaVersion: string;
}
