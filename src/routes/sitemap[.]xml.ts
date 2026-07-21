import { createFileRoute } from "@tanstack/react-router";

const BASE_URL = "https://www.yogazeeburg.com";

const PATHS = ["/", "/pricing", "/classes", "/schedule", "/contact", "/sportbit", "/nl/kennisbank"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = PATHS.map(
          (p) => `  <url>\n    <loc>${BASE_URL}${p}</loc>\n  </url>`,
        ).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
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
