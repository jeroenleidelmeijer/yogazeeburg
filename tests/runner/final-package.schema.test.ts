// Strict schema regressions for FinalArticlePackage. Fixture is minimally
// mutated per test so the failing field is unambiguous.
import { describe, it, expect } from "vitest";
import { FinalArticlePackageSchema } from "@/lib/publications/runner/final-package";
import { buildFinalPackage } from "./fakes";
import { FIXED_CTA } from "@/lib/publications/runner/cta";

describe("FinalArticlePackageSchema", () => {
  it("accepts a well-formed package", () => {
    const parsed = FinalArticlePackageSchema.safeParse(buildFinalPackage());
    expect(parsed.success).toBe(true);
  });

  it("rejects unknown fields (strict)", () => {
    const bad = { ...buildFinalPackage(), somethingElse: 1 };
    expect(FinalArticlePackageSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects missing required fields", () => {
    const cases = [
      "articleId",
      "planningNumber",
      "slug",
      "title",
      "seoTitle",
      "metaDescription",
      "directAnswer",
      "bodyMarkdown",
      "cta",
      "primaryKeyword",
    ] as const;
    for (const key of cases) {
      const obj = buildFinalPackage() as Record<string, unknown>;
      delete obj[key];
      const res = FinalArticlePackageSchema.safeParse(obj);
      expect(res.success, `expected schema failure when missing ${key}`).toBe(false);
    }
  });

  it("rejects wrong types", () => {
    const bad = { ...buildFinalPackage(), planningNumber: "four" };
    expect(FinalArticlePackageSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects planningNumber out of 1..180", () => {
    expect(
      FinalArticlePackageSchema.safeParse({ ...buildFinalPackage(), planningNumber: 0 }).success,
    ).toBe(false);
    expect(
      FinalArticlePackageSchema.safeParse({ ...buildFinalPackage(), planningNumber: 181 }).success,
    ).toBe(false);
  });

  it("rejects non-kebab slug", () => {
    expect(
      FinalArticlePackageSchema.safeParse({ ...buildFinalPackage(), slug: "Not Kebab!" }).success,
    ).toBe(false);
  });

  it("requires cta to be the FIXED_CTA literals", () => {
    const bad = {
      ...buildFinalPackage(),
      cta: { ...FIXED_CTA, heading: "Other heading" },
    };
    expect(FinalArticlePackageSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects hasAbsoluteMedicalClaim=true", () => {
    const bad = { ...buildFinalPackage(), hasAbsoluteMedicalClaim: true };
    expect(FinalArticlePackageSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects commercialLinkCount > 1", () => {
    const bad = { ...buildFinalPackage(), commercialLinkCount: 2 };
    expect(FinalArticlePackageSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects wrong authoredBy label", () => {
    const bad = { ...buildFinalPackage(), authoredBy: "someone-else" };
    expect(FinalArticlePackageSchema.safeParse(bad).success).toBe(false);
  });

  it("cross-field: faqs supplied but template.showFAQ=false → fail", () => {
    const bad = {
      ...buildFinalPackage(),
      faqs: [{ question: "Q?", answer: "A." }],
      template: { showTOC: true, showFAQ: false, showSources: true, showRelated: true },
    };
    expect(FinalArticlePackageSchema.safeParse(bad).success).toBe(false);
  });

  it("cross-field: sources supplied but template.showSources=false → fail", () => {
    const bad = {
      ...buildFinalPackage(),
      sources: [{ title: "x", url: "https://www.yogazeeburg.com/" }],
      template: { showTOC: true, showFAQ: true, showSources: false, showRelated: true },
    };
    expect(FinalArticlePackageSchema.safeParse(bad).success).toBe(false);
  });
});
