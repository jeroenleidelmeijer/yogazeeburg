import { describe, expect, it } from "vitest";
import { LEGACY_EN_REDIRECTS, resolveNlRedirect } from "@/lib/redirects";

describe("legacy English redirects", () => {
  it("keeps the language signal by pointing at /en variants", () => {
    expect(LEGACY_EN_REDIRECTS).toEqual({
      "/pricing": "/en/pricing",
      "/classes": "/en/classes",
      "/schedule": "/en/schedule",
      "/prices": "/en/pricing",
      "/yoga-styles": "/en/classes",
      "/class-schedule": "/en/schedule",
    });
  });

  it("never targets another redirecting path", () => {
    for (const target of Object.values(LEGACY_EN_REDIRECTS)) {
      expect(target.startsWith("/en/")).toBe(true);
      expect(LEGACY_EN_REDIRECTS[target]).toBeUndefined();
    }
  });
});

describe("legacy /nl redirects resolve in one hop", () => {
  const cases: [string, string][] = [
    ["/nl", "/"],
    ["/nl/", "/"],
    ["/nl/prijzen", "/prijzen"],
    ["/nl/pricing", "/prijzen"],
    ["/nl/lessen", "/lessen"],
    ["/nl/classes", "/lessen"],
    ["/nl/rooster", "/rooster"],
    ["/nl/schedule", "/rooster"],
    ["/nl/contact", "/contact"],
    ["/nl/sportbit", "/sportbit"],
    ["/nl/kennisbank", "/kennisbank"],
    ["/nl/kennisbank/alle-artikelen", "/kennisbank/alle-artikelen"],
    ["/nl/kennisbank/categorie/beginnen-met-yoga", "/kennisbank/categorie/beginnen-met-yoga"],
  ];

  for (const [from, to] of cases) {
    it(`${from} -> ${to}`, () => {
      const target = resolveNlRedirect(from);
      expect(target).toBe(to);
      expect(LEGACY_EN_REDIRECTS[target]).toBeUndefined();
      expect(target.startsWith("/nl")).toBe(false);
    });
  }
});
