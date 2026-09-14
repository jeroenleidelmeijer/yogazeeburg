import { describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Regression tests for the hydration path of the per-slug code split.
 *
 * On a hard page load the route loader does NOT re-run in the browser, so the
 * module-local body cache is empty during the first client render. The view
 * must then suspend on a STABLE per-slug promise (React `use()`), never throw
 * notFound(). Before the fix this rendered the root error boundary
 * ("Er ging iets mis") on every direct article load.
 *
 * These tests use a fresh module graph per case (`vi.resetModules` via dynamic
 * import in an isolated module registry) so the cache is genuinely cold, which
 * is exactly the browser's post-hydration state.
 */

const SLUG = "welke-yogastijl-past-bij-mij";

async function freshBodies() {
  // Fresh copy of the module so `cache`/`pending` start empty, mirroring the
  // browser right after hydration.
  vi.resetModules();
  return await import("@/lib/kennisbank/article-bodies");
}

describe("legacy article hydration path", () => {
  it("has an empty cache before the loader ran (cold client state)", async () => {
    const bodies = await freshBodies();
    expect(bodies.getLoadedLegacyArticle(SLUG)).toBeUndefined();
  });

  it("returns one stable promise instance per slug so React use() is safe", async () => {
    const bodies = await freshBodies();
    const a = bodies.getLegacyArticlePromise(SLUG);
    const b = bodies.getLegacyArticlePromise(SLUG);
    expect(a).toBe(b);
    const article = await a;
    expect(article?.slug).toBe(SLUG);
    // Third call after settling still resolves to the same article.
    await expect(bodies.getLegacyArticlePromise(SLUG)).resolves.toMatchObject({ slug: SLUG });
  });

  it("fills the sync cache once the promise settles", async () => {
    const bodies = await freshBodies();
    await bodies.getLegacyArticlePromise(SLUG);
    expect(bodies.getLoadedLegacyArticle(SLUG)?.slug).toBe(SLUG);
  });

  it("keeps handing out the same promise after it settled (no re-suspend loop)", async () => {
    const bodies = await freshBodies();
    const first = bodies.getLegacyArticlePromise(SLUG);
    await first;
    expect(bodies.getLegacyArticlePromise(SLUG)).toBe(first);
  });

  it("returns one stable promise for an unknown slug as well", async () => {
    const bodies = await freshBodies();
    const first = bodies.getLegacyArticlePromise("does-not-exist");
    expect(bodies.getLegacyArticlePromise("does-not-exist")).toBe(first);
    await expect(first).resolves.toBeUndefined();
  });

  it("wires the hydration-safe render path: use() in the view, Suspense in the route", () => {
    const view = readFileSync(
      join(process.cwd(), "src/components/kennisbank/LegacyArticleView.tsx"),
      "utf8",
    );
    expect(view).toContain("use(getLegacyArticlePromise(slug))");
    const route = readFileSync(join(process.cwd(), "src/routes/kennisbank.$slug.tsx"), "utf8");
    expect(route).toMatch(/<Suspense[\s\S]*<LegacyArticleView/);
  });
});
