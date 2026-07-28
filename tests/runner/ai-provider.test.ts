// The AI provider is a regression door: every method must throw so any
// accidental future call site is caught immediately in tests and CI.
import { describe, it, expect } from "vitest";
import { createLovableAiProviders } from "@/lib/publications/runner/ai-provider.server";
import { PipelineError } from "@/lib/publications/runner/errors";

describe("createLovableAiProviders — regression door", () => {
  const providers = createLovableAiProviders();

  it("generateBrief throws configuration_error", async () => {
    await expect(providers.generateBrief({ claim: {} as never, context: {} })).rejects.toBeInstanceOf(
      PipelineError,
    );
    await expect(providers.generateBrief({ claim: {} as never, context: {} })).rejects.toMatchObject({
      category: "configuration_error",
    });
  });

  it("validateSources throws configuration_error", async () => {
    await expect(providers.validateSources({ brief: {} as never })).rejects.toBeInstanceOf(
      PipelineError,
    );
  });

  it("generateArticle throws configuration_error", async () => {
    await expect(
      providers.generateArticle({ brief: {} as never, sources: {} as never }),
    ).rejects.toBeInstanceOf(PipelineError);
  });

  it("reviewRound throws configuration_error", async () => {
    await expect(
      providers.reviewRound({
        round: "content_integrity",
        brief: {} as never,
        sources: {} as never,
        pkg: {} as never,
        priorReviews: [],
      }),
    ).rejects.toBeInstanceOf(PipelineError);
  });
});
