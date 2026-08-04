import { describe, expect, it } from "vitest";
import { getArticleBySlug } from "@/lib/kennisbank/articles";

const SLUG = "yoga-aan-het-water-in-amsterdam-oost-rust-midden-in-de-stad";
const BASE = "https://www.yogazeeburg.com";

describe("article 8 images", () => {
  const article = getArticleBySlug(SLUG);

  it("has a 1600x900 hero image with the exact alt text", () => {
    expect(article?.heroImage).toBeDefined();
    expect(article!.heroImage!.width).toBe(1600);
    expect(article!.heroImage!.height).toBe(900);
    expect(article!.heroImage!.alt).toBe(
      "Illustratie van een yogamat aan het water in Amsterdam Oost bij avondlicht.",
    );
    expect(article!.heroImage!.url).toMatch(/^\/__l5e\/assets-v1\/.+\.webp$/);
  });

  it("exposes the hero image as an absolute production URL for og/twitter/JSON-LD", () => {
    const absolute = `${BASE}${article!.heroImage!.url}`;
    expect(absolute.startsWith("https://www.yogazeeburg.com/__l5e/")).toBe(true);
  });

  it("keeps other legacy articles without a hero image", () => {
    const other = getArticleBySlug("proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten");
    expect(other?.heroImage).toBeUndefined();
  });
});
