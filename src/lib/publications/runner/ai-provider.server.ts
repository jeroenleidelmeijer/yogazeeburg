// Server-only Lovable AI Gateway provider for the runner's AiProviders surface.
//
// SAFETY:
// - Reads LOVABLE_API_KEY from process.env only when a method actually runs.
// - Never logs prompts, request bodies, response bodies, or authorization
//   headers. Only HTTP status codes and generic classifications are logged.
// - `fetch` is injectable so contract tests never hit the real network.
// - Uses the exact prompt builders from ./prompts.ts. The pipeline is
//   authoritative on Zod validation and invariants; this module returns the
//   raw JSON object parsed from the model, nothing more.
//
// This module must NEVER be imported from a client-graph module. The
// `.server.ts` suffix keeps the import-protection boundary intact.
import { PipelineError } from "./errors";
import type { AiProviders } from "./providers";
import type { ArticleBrief, ReviewOutput, ValidatedSourcePack } from "./schemas";
import type { ClaimedRun } from "./providers";
import {
  briefPrompt,
  generationPrompt,
  reviewPrompt,
  sourceValidationPrompt,
  type PromptMessages,
} from "./prompts";

export const AI_PROVIDER_CONTRACT = {
  endpoint: "https://ai.gateway.lovable.dev/v1/chat/completions",
  defaultModel: "google/gemini-2.5-pro",
  defaultTimeoutMs: 120_000,
  responseFormat: "json_object",
} as const;

export interface LovableAiProviderOptions {
  /** Injectable for contract tests. Defaults to global fetch. */
  fetch?: typeof fetch;
  /** Injectable API key resolver. Defaults to process.env.LOVABLE_API_KEY. */
  apiKey?: string;
  /** Model id (vendor/model). Defaults to AI_PROVIDER_CONTRACT.defaultModel. */
  model?: string;
  /** Per-call timeout in ms. Default 120s. */
  timeoutMs?: number;
  /** Endpoint override; used only in tests. */
  endpoint?: string;
}

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  response_format: { type: "json_object" };
}

function classifyHttpStatus(status: number, step: string, context: string): PipelineError {
  if (status === 401 || status === 403) {
    return new PipelineError({
      category: "configuration_error",
      step,
      message: `AI gateway rejected credentials at ${context} (HTTP ${status})`,
      retryable: false,
    });
  }
  if (status === 402) {
    return new PipelineError({
      category: "configuration_error",
      step,
      message: `AI gateway credits exhausted at ${context} (HTTP 402)`,
      retryable: false,
    });
  }
  if (status === 429 || status >= 500) {
    return new PipelineError({
      category: "infrastructure_error",
      step,
      message: `AI gateway transient failure at ${context} (HTTP ${status})`,
      retryable: true,
    });
  }
  // 4xx other than the ones above: treat the request as malformed and retry
  // once via bounded-retry so a re-prompted output can succeed.
  return new PipelineError({
    category: "validation_error",
    step,
    message: `AI gateway rejected request at ${context} (HTTP ${status})`,
    retryable: true,
  });
}

function extractJsonPayload(text: string): unknown {
  // The gateway returns an OpenAI-compatible chat completion. We must locate
  // the first message's content and JSON-parse it. Any deviation is a
  // validation error that flows through the pipeline's bounded retry.
  const outer = JSON.parse(text) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = outer.choices?.[0]?.message?.content;
  if (typeof content !== "string" || content.length === 0) {
    throw new Error("AI response missing choices[0].message.content");
  }
  // Some providers wrap JSON in code fences even with response_format set.
  const trimmed = content.trim().replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  return JSON.parse(trimmed);
}

async function callGateway(
  step: string,
  context: string,
  messages: PromptMessages,
  opts: Required<Omit<LovableAiProviderOptions, "apiKey">> & { apiKey: string },
): Promise<unknown> {
  const body: ChatCompletionRequest = {
    model: opts.model,
    messages: [
      { role: "system", content: messages.system },
      { role: "user", content: messages.user },
    ],
    response_format: { type: "json_object" },
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), opts.timeoutMs);
  let res: Response;
  try {
    res = await opts.fetch(opts.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${opts.apiKey}`,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (err) {
    const aborted = (err as { name?: string } | null)?.name === "AbortError";
    throw new PipelineError({
      category: "infrastructure_error",
      step,
      message: aborted
        ? `AI gateway timed out after ${opts.timeoutMs}ms at ${context}`
        : `AI gateway network error at ${context}`,
      retryable: true,
    });
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) {
    // Drain body without surfacing it; the gateway can echo request content.
    try {
      await res.text();
    } catch {
      /* ignore */
    }
    throw classifyHttpStatus(res.status, step, context);
  }

  const text = await res.text();
  try {
    return extractJsonPayload(text);
  } catch {
    throw new PipelineError({
      category: "validation_error",
      step,
      message: `AI gateway returned malformed JSON at ${context}`,
      retryable: true,
    });
  }
}

function resolveOptions(
  options: LovableAiProviderOptions | undefined,
  step: string,
): Required<Omit<LovableAiProviderOptions, "apiKey">> & { apiKey: string } {
  const apiKey =
    options?.apiKey ??
    (typeof process !== "undefined" ? process.env?.LOVABLE_API_KEY : undefined);
  if (!apiKey) {
    throw new PipelineError({
      category: "configuration_error",
      step,
      message: "LOVABLE_API_KEY is not configured on the server runtime",
      retryable: false,
    });
  }
  const model =
    options?.model ??
    (typeof process !== "undefined" ? process.env?.LOVABLE_AI_MODEL : undefined) ??
    AI_PROVIDER_CONTRACT.defaultModel;
  return {
    apiKey,
    model,
    endpoint: options?.endpoint ?? AI_PROVIDER_CONTRACT.endpoint,
    timeoutMs: options?.timeoutMs ?? AI_PROVIDER_CONTRACT.defaultTimeoutMs,
    fetch: options?.fetch ?? globalThis.fetch,
  };
}

export function createLovableAiProviders(
  options?: LovableAiProviderOptions,
): AiProviders {
  return {
    async generateBrief({ claim }: { claim: ClaimedRun }) {
      const opts = resolveOptions(options, "brief");
      return callGateway("brief", "generateBrief", briefPrompt(claim), opts);
    },
    async validateSources({ brief }: { brief: ArticleBrief }) {
      const opts = resolveOptions(options, "source_validation");
      return callGateway(
        "source_validation",
        "validateSources",
        sourceValidationPrompt(brief),
        opts,
      );
    },
    async generateArticle({
      brief,
      sources,
    }: {
      brief: ArticleBrief;
      sources: ValidatedSourcePack;
    }) {
      const opts = resolveOptions(options, "generation");
      return callGateway(
        "generation",
        "generateArticle",
        generationPrompt(brief, sources),
        opts,
      );
    },
    async reviewRound({
      round,
      brief,
      sources,
      pkg,
      priorReviews,
    }: {
      round: Parameters<AiProviders["reviewRound"]>[0]["round"];
      brief: ArticleBrief;
      sources: ValidatedSourcePack;
      pkg: Parameters<AiProviders["reviewRound"]>[0]["pkg"];
      priorReviews: ReviewOutput[];
    }) {
      const step =
        round === "content_integrity"
          ? "review_1"
          : round === "structure_seo_tech"
            ? "review_2"
            : "review_3";
      const opts = resolveOptions(options, step);
      return callGateway(
        step,
        `reviewRound:${round}`,
        reviewPrompt(round, brief, sources, pkg, priorReviews),
        opts,
      );
    },
  };
}
