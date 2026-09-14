import { describe, expect, it, vi } from "vitest";
import { Suspense } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LegacyArticleView } from "@/components/kennisbank/LegacyArticleView";

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
  const { default: _ } = { default: null };
  void _;
  // Fresh copy of the module so `cache`/`pending` start empty.
  const mod = await import(`@/lib/kennisbank/article-bodies?cold=${Math.random()}`);
  return mod as typeof import("@/lib/kennisbank/article-bodies");
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

  it("renders the full article body without suspending once the body is loaded", async () => {
    const bodies = await freshBodies();
    await bodies.loadLegacyArticle(SLUG);
    const html = renderToStaticMarkup(
      <Suspense fallback={<div data-testid="fallback" />}>
        <LegacyArticleView slug={SLUG} related={[]} />
      </Suspense>,
    );
    expect(html).not.toContain("data-testid=\"fallback\"");
    expect(html).toContain("<h1");
    expect(html.length).toBeGreaterThan(2000);
  });
});
