# Yoga Zeeburg — Launch SEO & GEO audit (read-only)

Scope inspected: all files in `src/routes/`, `public/`, `__root.tsx` head, per-route `head()`, JSON-LD, `robots.txt`, `sitemap[.]xml.ts`, redirect routes, canonical hosts.

## ✅ Already good (no action needed)

- **Canonical host** unified on `https://www.yogazeeburg.com` across every route's `<link rel="canonical">` and `og:url`.
- **robots.txt** (`public/robots.txt`) allows all crawlers and references the sitemap at the canonical host.
- **sitemap.xml** served as a TSS server route at `/sitemap.xml` with correct `Content-Type: application/xml`, valid XML, and the six intended URLs (`/`, `/pricing`, `/classes`, `/schedule`, `/contact`, `/sportbit`) — no preview/lovable URLs.
- **Legacy 301 redirects** implemented as real server handlers returning HTTP 301 (`/class-schedule → /schedule`, `/prices → /pricing`, `/yoga-styles → /classes`) — true permanent redirects, not client navigation.
- **Per-route metadata**: each of the six public routes has its own `title`, `description`, `og:title`, `og:description`, `og:url`, and self-referencing `canonical`. No accidental "Lovable App" defaults.
- **Sitewide defaults** in `__root.tsx`: charset, viewport, `og:site_name`, `og:type: website`, `twitter:card: summary_large_image`, `lang="en"` on `<html>`.
- **Structured data** on home: `ExerciseGym` JSON-LD with `name`, `description`, `PostalAddress` (Cruquiusweg 96F, 1019 AH Amsterdam, NL), `areaServed`, `url`, `email`.
- **No noindex** leaked anywhere; no sitewide `Disallow: /`.
- **Router shell** correct (`__root.tsx` renders `<Outlet/>`, no duplicate `/` routes).

## 🚨 Launch-critical before DNS switch

1. **`www` vs apex resolution.** Everything (canonicals, sitemap, robots) points at `www.yogazeeburg.com`. Before flipping DNS, confirm the apex `yogazeeburg.com` will 301 → `www` at the DNS/hosting layer, otherwise crawlers will find duplicate hosts.
2. **`/mcp` endpoint is publicly reachable and not disallowed** in `robots.txt`. Crawlers can hit it and consume budget on non-content responses. Either add `Disallow: /mcp` + `Disallow: /.mcp/` + `Disallow: /.well-known/` to robots, or gate `mcpPlugin()`. Decision belongs to launch, not later.
3. **No `og:image` anywhere.** With no image and no external default image, WhatsApp / iMessage / LinkedIn / X previews will fall back to hosting's screenshot on `lovable.app` — but on the custom domain there is no such fallback, so shares from `www.yogazeeburg.com` will render as text-only cards. Add one absolute-URL `og:image` per leaf route (or at minimum a shared studio hero for `/`).
4. **`ExerciseGym` schema is missing high-signal fields** that AI answer engines (Google AIO, Perplexity, ChatGPT search, Gemini) and Google's local pack read: `telephone`, `openingHoursSpecification`, `geo` (lat/lng), `priceRange`, `image`, `sameAs` (Instagram, Facebook, Google Maps CID), `hasMap`. Address alone is not enough for local ranking.

## 🟡 Immediately after launch (first week)

5. **Add `llms.txt`** at `public/llms.txt` (and optionally `llms-full.txt`) — the emerging convention for GEO / AI-answer engines. Currently absent. A short llms.txt naming the studio, location, class types, intro pass URL, contact email, and canonical links is a fast GEO win.
6. **FAQPage JSON-LD** on `/pricing` and `/sportbit`. Both pages already render Q&A visually; wrapping the existing content in `FAQPage` schema is a direct rich-result opportunity with no copy changes.
7. **Sitemap `<lastmod>`** — currently omitted. Adding `lastmod` (build-time ISO date is fine) speeds re-crawl after edits.
8. **Twitter/X card completeness.** Root sets generic `twitter:title` / `twitter:description`; leaf routes only override `og:*`. Per-route `twitter:title` / `twitter:description` will keep X shares route-specific.
9. **Favicon set.** Only `favicon.ico` is present. Add `apple-touch-icon-180x180.png` and a 32×32 PNG so iOS/Android home-screen icons and modern browser tabs render the studio mark.
10. **Google Search Console + Bing Webmaster** verification (meta tag or DNS TXT) and manual sitemap submission the moment DNS is live.

## 🟢 Later improvements

11. **BreadcrumbList JSON-LD** on non-home routes (Yoga Zeeburg › Schedule, etc.) — small SERP polish.
12. **`Organization` / `LocalBusiness` sameAs** — link Instagram / Facebook / Google Business Profile in JSON-LD so entities merge in the Google Knowledge Graph and are surfaced by AI answer engines.
13. **Dutch-language landing pages** (e.g. `/nl/`, `/nl/rooster`, `/nl/prijzen`) with `hreflang` — Amsterdam East market is bilingual, and Dutch queries ("yogastudio Amsterdam Oost", "yoga proefles") are being missed entirely by an English-only site.
14. **Individual class pages** under `/classes/<slug>` (Slow Flow & Soundbath, Restorative & Reiki & Aroma, Stress Release Yin, etc.) — each ranks for a long-tail class-type query and gets its own head/JSON-LD. Currently `/classes` is one big finder page.
15. **Teacher pages** with `Person` schema — small studios rank surprisingly well on teacher-name queries.
16. **Blog / journal** for cornerstone content ("beginner's first yoga class", "yoga for desk-work shoulders", "how often should I do yoga to feel a difference") — the routine-focused positioning is a natural content brief.
17. **Analytics + Search Console rank monitoring** wired into the app (Semrush data service is available for ongoing rank tracking and competitor visibility once launched).
18. **Image alt-text pass** once real studio photography replaces the current typography-led layout.
19. **Speed budget**: preconnects to fonts.googleapis are in place; consider self-hosting the Fraunces + Inter subsets to eliminate the extra DNS/TLS hop and improve LCP on mobile.

## Notes / uncertainties

- I did not run a live crawler; findings are strictly from the source in this repo.
- Whether the apex `yogazeeburg.com` already redirects to `www` is a hosting/DNS question I can't verify from the codebase.
- The `og:image` gap is the single biggest visible-to-humans launch issue and the cheapest to fix (one image + one meta tag per route).

Ready to convert any of the launch-critical items into a fix plan when you say go.
