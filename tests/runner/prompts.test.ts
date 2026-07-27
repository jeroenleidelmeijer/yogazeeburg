import { describe, it, expect } from "vitest";
import {
  PROMPT_VERSION,
  SCHEMA_VERSION,
  briefPrompt,
  sourceValidationPrompt,
  generationPrompt,
  reviewPrompt,
} from "@/lib/publications/runner/prompts";
import { defaultClaim, buildBrief, buildSources, buildPackage } from "./fakes";
import { FIXED_CTA } from "@/lib/publications/runner/cta";

describe("prompts: versions and CTA copy", () => {
  it("stamps a stable prompt version + schema version on every builder", () => {
    const b = briefPrompt(defaultClaim());
    const s = sourceValidationPrompt(buildBrief());
    const g = generationPrompt(buildBrief(), buildSources());
    const r = reviewPrompt("content_integrity", buildBrief(), buildSources(), buildPackage(), []);
    for (const p of [b, s, g, r]) {
      expect(p.promptVersion).toBe(PROMPT_VERSION);
      expect(p.schemaVersion).toBe(SCHEMA_VERSION);
      expect(p.system.length).toBeGreaterThan(20);
      expect(p.user.length).toBeGreaterThan(2);
    }
  });

  it("generation and brief system prompts embed the fixed CTA copy verbatim", () => {
    const g = generationPrompt(buildBrief(), buildSources());
    expect(g.system).toContain(FIXED_CTA.heading);
    expect(g.system).toContain(FIXED_CTA.body);
    expect(g.system).toContain(FIXED_CTA.button);
    expect(g.system).toContain(FIXED_CTA.subtext);
  });

  it("review prompt encodes the round in the system message and user payload", () => {
    const r = reviewPrompt("structure_seo_tech", buildBrief(), buildSources(), buildPackage(), []);
    expect(r.system).toContain("structure_seo_tech");
    expect(r.user).toContain("structure_seo_tech");
  });
});
