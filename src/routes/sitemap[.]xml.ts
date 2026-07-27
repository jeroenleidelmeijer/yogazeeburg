import { createFileRoute } from "@tanstack/react-router";

const BASE_URL = "https://www.yogazeeburg.com";

const STATIC_PATHS: { path: string; lastmod?: string }[] = [
  { path: "/" },
  { path: "/pricing" },
  { path: "/classes" },
  { path: "/schedule" },
  { path: "/contact" },
  { path: "/sportbit" },
  { path: "/nl/kennisbank" },
  { path: "/nl/kennisbank/alle-artikelen" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: string[] = [];
        for (const s of STATIC_PATHS) {
          entries.push(
            `  <url>\n    <loc>${BASE_URL}${s.path}</loc>${s.lastmod ? `\n    <lastmod>${s.lastmod}</lastmod>` : ""}\n  </url>`,
          );
        }
        // Combined published list: legacy static + DB placements with
        // placement_status='published'. Draft/preview rows are excluded.
        // Category pages remain intentionally absent (noindex archives).
        const { listPublishedRefs } = await import("@/lib/kennisbank/data.server");
        const published = await listPublishedRefs();
        for (const a of published) {
          entries.push(
            `  <url>\n    <loc>${BASE_URL}/nl/kennisbank/${a.slug}</loc>\n    <lastmod>${a.updatedAt}</lastmod>\n  </url>`,
          );
        }
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
