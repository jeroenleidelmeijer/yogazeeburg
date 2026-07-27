// Contract tests for the real Lovable AI Gateway provider. Mocked network
// only — no real HTTP calls. Verifies:
// - all four AiProviders methods issue a POST to the gateway endpoint with
//   the exact prompt system+user messages from ./prompts.ts;
// - HTTP 401/402 -> configuration_error non-retryable;
// - HTTP 429 and 5xx -> infrastructure_error retryable;
// - AbortError (timeout) -> infrastructure_error retryable;
// - malformed JSON -> validation_error retryable;
// - schema-shaped payload flows through unchanged (Zod runs in the pipeline);
// - missing LOVABLE_API_KEY -> configuration_error non-retryable, no fetch.
import { describe, it, expect, vi } from "vitest";
import { createLovableAiProviders, AI_PROVIDER_CONTRACT } from "@/lib/publications/runner/ai-provider.server";
import {
  briefPrompt,
  generationPrompt,
  reviewPrompt,
  sourceValidationPrompt,
} from "@/lib/publications/runner/prompts";
import { PipelineError } from "@/lib/publications/runner/errors";
import { buildBrief, buildPackage, buildSources, defaultClaim, passingReview } from "./fakes";

function mockFetch(response: {
  ok?: boolean;
  status?: number;
  body?: unknown;
  raw?: string;
  throwError?: Error;
}): {
  fetch: typeof fetch;
  calls: Array<{ url: string; init: RequestInit | undefined }>;
} {
  const calls: Array<{ url: string; init: RequestInit | undefined }> = [];
  const fetchImpl = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init });
    if (response.throwError) throw response.throwError;
    const status = response.status ?? 200;
    const bodyText =
      response.raw ??
      JSON.stringify({
        choices: [{ message: { content: JSON.stringify(response.body ?? {}) } }],
      });
    return new Response(bodyText, { status });
  });
  return { fetch: fetchImpl as unknown as typeof fetch, calls };
}

describe("ai-provider: request contract", () => {
  it("generateBrief POSTs the exact briefPrompt messages to the gateway endpoint with bearer auth", async () => {
    const claim = defaultClaim();
    const brief = buildBrief();
    const { fetch: f, calls } = mockFetch({ body: brief });
    const ai = createLovableAiProviders({ fetch: f, apiKey: "sk_test_123", model: "google/gemini-2.5-pro" });
    const out = await ai.generateBrief({ claim, context: {} });
    expect(out).toEqual(brief);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(AI_PROVIDER_CONTRACT.endpoint);
    const headers = new Headers(calls[0].init?.headers);
    expect(headers.get("Authorization")).toBe("Bearer sk_test_123");
    expect(headers.get("Content-Type")).toBe("application/json");
    const body = JSON.parse(calls[0].init!.body as string);
    expect(body.model).toBe("google/gemini-2.5-pro");
    expect(body.response_format).toEqual({ type: "json_object" });
    const expected = briefPrompt(claim);
    expect(body.messages).toEqual([
      { role: "system", content: expected.system },
      { role: "user", content: expected.user },
    ]);
  });

  it("validateSources uses the sourceValidationPrompt builder", async () => {
    const brief = buildBrief();
    const sources = buildSources();
    const { fetch: f, calls } = mockFetch({ body: sources });
    const ai = createLovableAiProviders({ fetch: f, apiKey: "k" });
    const out = await ai.validateSources({ brief });
    expect(out).toEqual(sources);
    const body = JSON.parse(calls[0].init!.body as string);
    const expected = sourceValidationPrompt(brief);
    expect(body.messages[0].content).toBe(expected.system);
    expect(body.messages[1].content).toBe(expected.user);
  });

  it("generateArticle uses the generationPrompt builder", async () => {
    const brief = buildBrief();
    const sources = buildSources();
    const pkg = buildPackage();
    const { fetch: f, calls } = mockFetch({ body: pkg });
    const ai = createLovableAiProviders({ fetch: f, apiKey: "k" });
    const out = await ai.generateArticle({ brief, sources });
    expect(out).toEqual(pkg);
    const body = JSON.parse(calls[0].init!.body as string);
    const expected = generationPrompt(brief, sources);
    expect(body.messages[0].content).toBe(expected.system);
    expect(body.messages[1].content).toBe(expected.user);
  });

  it("reviewRound uses the reviewPrompt builder with the correct round", async () => {
    const brief = buildBrief();
    const sources = buildSources();
    const pkg = buildPackage();
    const review = passingReview("structure_seo_tech");
    const { fetch: f, calls } = mockFetch({ body: review });
    const ai = createLovableAiProviders({ fetch: f, apiKey: "k" });
    const out = await ai.reviewRound({
      round: "structure_seo_tech",
      brief,
      sources,
      pkg,
      priorReviews: [],
    });
    expect(out).toEqual(review);
    const body = JSON.parse(calls[0].init!.body as string);
    const expected = reviewPrompt("structure_seo_tech", brief, sources, pkg, []);
    expect(body.messages[0].content).toBe(expected.system);
    expect(body.messages[1].content).toBe(expected.user);
  });
});

describe("ai-provider: error classification", () => {
  it("missing api key -> configuration_error non-retryable, zero fetch calls", async () => {
    const { fetch: f, calls } = mockFetch({ body: {} });
    const prev = process.env.LOVABLE_API_KEY;
    delete process.env.LOVABLE_API_KEY;
    try {
      const ai = createLovableAiProviders({ fetch: f });
      await expect(ai.generateBrief({ claim: defaultClaim(), context: {} })).rejects.toMatchObject({
        category: "configuration_error",
        retryable: false,
      });
      expect(calls).toHaveLength(0);
    } finally {
      if (prev !== undefined) process.env.LOVABLE_API_KEY = prev;
    }
  });

  it("HTTP 401 -> configuration_error non-retryable", async () => {
    const { fetch: f } = mockFetch({ status: 401, raw: "unauthorized" });
    const ai = createLovableAiProviders({ fetch: f, apiKey: "k" });
    await expect(ai.generateBrief({ claim: defaultClaim(), context: {} })).rejects.toMatchObject({
      category: "configuration_error",
      retryable: false,
    });
  });

  it("HTTP 402 (credits exhausted) -> configuration_error non-retryable", async () => {
    const { fetch: f } = mockFetch({ status: 402, raw: "no credits" });
    const ai = createLovableAiProviders({ fetch: f, apiKey: "k" });
    await expect(ai.generateBrief({ claim: defaultClaim(), context: {} })).rejects.toMatchObject({
      category: "configuration_error",
      retryable: false,
    });
  });

  it("HTTP 429 -> infrastructure_error retryable", async () => {
    const { fetch: f } = mockFetch({ status: 429, raw: "rate limited" });
    const ai = createLovableAiProviders({ fetch: f, apiKey: "k" });
    await expect(ai.generateBrief({ claim: defaultClaim(), context: {} })).rejects.toMatchObject({
      category: "infrastructure_error",
      retryable: true,
    });
  });

  it("HTTP 503 -> infrastructure_error retryable", async () => {
    const { fetch: f } = mockFetch({ status: 503, raw: "upstream" });
    const ai = createLovableAiProviders({ fetch: f, apiKey: "k" });
    await expect(ai.validateSources({ brief: buildBrief() })).rejects.toMatchObject({
      category: "infrastructure_error",
      retryable: true,
    });
  });

  it("timeout / abort -> infrastructure_error retryable", async () => {
    const abortErr = Object.assign(new Error("aborted"), { name: "AbortError" });
    const { fetch: f } = mockFetch({ throwError: abortErr });
    const ai = createLovableAiProviders({ fetch: f, apiKey: "k", timeoutMs: 5 });
    await expect(ai.generateBrief({ claim: defaultClaim(), context: {} })).rejects.toMatchObject({
      category: "infrastructure_error",
      retryable: true,
    });
  });

  it("malformed JSON -> validation_error retryable", async () => {
    const { fetch: f } = mockFetch({ raw: "not json at all" });
    const ai = createLovableAiProviders({ fetch: f, apiKey: "k" });
    await expect(ai.generateBrief({ claim: defaultClaim(), context: {} })).rejects.toMatchObject({
      category: "validation_error",
      retryable: true,
    });
  });

  it("valid JSON with missing choices[0].message.content -> validation_error retryable", async () => {
    const { fetch: f } = mockFetch({ raw: JSON.stringify({ choices: [] }) });
    const ai = createLovableAiProviders({ fetch: f, apiKey: "k" });
    await expect(ai.generateBrief({ claim: defaultClaim(), context: {} })).rejects.toMatchObject({
      category: "validation_error",
      retryable: true,
    });
  });

  it("PipelineError instances carry the correct step for each provider method", async () => {
    const cases: Array<[string, () => Promise<unknown>]> = [];
    const { fetch: f } = mockFetch({ status: 500 });
    const ai = createLovableAiProviders({ fetch: f, apiKey: "k" });
    cases.push(["brief", () => ai.generateBrief({ claim: defaultClaim(), context: {} })]);
    cases.push(["source_validation", () => ai.validateSources({ brief: buildBrief() })]);
    cases.push([
      "generation",
      () => ai.generateArticle({ brief: buildBrief(), sources: buildSources() }),
    ]);
    cases.push([
      "review_1",
      () =>
        ai.reviewRound({
          round: "content_integrity",
          brief: buildBrief(),
          sources: buildSources(),
          pkg: buildPackage(),
          priorReviews: [],
        }),
    ]);
    for (const [step, run] of cases) {
      try {
        await run();
        throw new Error("expected throw");
      } catch (err) {
        expect(err).toBeInstanceOf(PipelineError);
        expect((err as PipelineError).step).toBe(step);
      }
    }
  });
});
