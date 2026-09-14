import { describe, expect, it } from "vitest";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { ARTICLES } from "@/lib/kennisbank/articles";
import { ARTICLE_BODY_LOADERS, loadLegacyArticle } from "@/lib/kennisbank/article-bodies";

/**
 * Contract tests for the per-slug code splitting of the legacy Yoga Gids
 * articles. They guarantee a newly placed article cannot silently disappear
 * from the registry (and therefore from the hub, category pages and sitemap)
 * or from the lazy loader map used to render it.
 */
describe("legacy article splitting contract", () => {
  const registrySlugs = ARTICLES.map((a) => a.slug).sort();
  const loaderSlugs = Object.keys(ARTICLE_BODY_LOADERS).sort();

  it("has one body module file per registry article", () => {
    const dir = join(process.cwd(), "src/lib/kennisbank/articles");
    const fileSlugs = readdirSync(dir)
      .filter((f) => f.endsWith(".tsx"))
      .map((f) => f.replace(/\.tsx$/, ""))
      .sort();
    expect(fileSlugs).toEqual(registrySlugs);
  });

  it("keeps the lazy loader map and ARTICLES in sync (both directions)", () => {
    expect(loaderSlugs).toEqual(registrySlugs);
  });

  it("has unique slugs", () => {
    expect(new Set(registrySlugs).size).toBe(registrySlugs.length);
  });

  it("loads every article body module and exposes a renderable body", async () => {
    for (const slug of registrySlugs) {
      const article = await loadLegacyArticle(slug);
      expect(article, slug).toBeDefined();
      expect(article!.slug).toBe(slug);
      expect(typeof article!.body).toBe("function");
      expect(article!.category.slug.length).toBeGreaterThan(0);
    }
  });

  it("returns undefined for an unknown slug", async () => {
    await expect(loadLegacyArticle("does-not-exist")).resolves.toBeUndefined();
  });
});
