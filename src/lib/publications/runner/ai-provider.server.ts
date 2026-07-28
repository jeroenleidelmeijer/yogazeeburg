// AI-provider stub. Post rolverdeling formalization (July 2026) the runner
// no longer briefs, writes, reviews or repairs content — every method here
// is a regression door: it MUST throw so any accidental future call site is
// caught in CI. The `AiProviders` interface remains defined in providers.ts
// for legacy compatibility only.

import { PipelineError } from "./errors";
import type { AiProviders } from "./providers";

function forbidden(method: string): never {
  throw new PipelineError({
    category: "configuration_error",
    step: "init",
    message: `AI content provider disabled: ${method}() must not be called; content is authored externally by ChatGPT`,
    retryable: false,
  });
}

export function createLovableAiProviders(): AiProviders {
  return {
    async generateBrief() {
      forbidden("generateBrief");
    },
    async validateSources() {
      forbidden("validateSources");
    },
    async generateArticle() {
      forbidden("generateArticle");
    },
    async reviewRound() {
      forbidden("reviewRound");
    },
  };
}
