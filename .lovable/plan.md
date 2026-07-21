# Launch Readiness Audit — Yoga Zeeburg

**Verdict: PUBLISH AFTER SMALL FIXES.** Safe to publish to `yogazeeburg.lovable.app` for smoke testing now, but the items in "Blockers before DNS switch" must land before pointing `www.yogazeeburg.com` at the site.

## What's already good
- All six routes exist and are reachable: `/`, `/pricing`, `/classes`, `/schedule`, `/contact`, `/sportbit`. Exactly one route each.
- `bunx tsgo --noEmit` → exit 0. `bun run build` → exit 0.
- `bun audit` → no high/critical vulnerabilities.
- Header + footer nav wired to real routes; footer has Sportbit guide between Schedule and Contact.
- No `trial.yogazeeburg.com`, `Studio Rent`/`Sudio Rent`, or stray `WOD` occurrences anywhere in `src/` or `public/`.
- Contact form: server function with honeypot, Zod validation, Resend delivery via connector; keys read server-side only, no secrets in the client bundle.
- Per-route `head()` sets title, description, og:title, og:description, and canonical on every page.
- MCP tools reviewed (`get-studio-info`, `suggest-class-direction`, `get-directions-link`) — return only public studio info, no DB/user data.

## Blockers before DNS switch to www.yogazeeburg.com

1. **Canonicals point to a domain that doesn't serve the site yet.** Every route hardcodes `https://www.yogazeeburg.com/...` in `<link rel="canonical">` and `og:url`. Fine once DNS is switched; if we publish to the Lovable domain first and Google crawls it, canonicals still point to www — acceptable, but do not leave this misaligned long-term. Verify DNS + SSL are active before announcing the www URL.
2. **No `robots.txt`.** Crawlers get no directive; on the Lovable preview subdomain this risks indexing a non-canonical host. Add `public/robots.txt` with `User-agent: *` + `Allow: /`, and a `Sitemap:` line once the sitemap exists.
3. **No `sitemap.xml`.** No static file, no `src/routes/sitemap[.]xml.ts`, no plugin config. Add a server route listing `/`, `/pricing`, `/classes`, `/schedule`, `/sportbit`, `/contact` with the www base URL.
4. **Legacy redirects missing.** `/class-schedule → /schedule`, `/prices → /pricing`, `/yoga-styles → /classes` are not implemented anywhere (no route files, no config). If the old site had these URLs indexed, they will 404. Implement as small route files that `throw redirect({ to: ..., statusCode: 301 })` in `beforeLoad`.
5. **Public MCP server exposed.** `src/lib/mcp/index.ts` has no `auth` block and mounts at `/mcp`. Tools only return public info so it is not a data leak, but this is an intentional public endpoint — confirm this is desired before switching DNS, and either keep it public deliberately (documented) or remove `mcpPlugin()` from `vite.config.ts` for launch.

## Post-launch improvements (non-blocking)

- **No `og:image` anywhere.** Hosting injects a fallback screenshot, but a real OG image would meaningfully improve share previews (WhatsApp, Instagram DMs, Google Business). Add one per leaf route once studio photography is available.
- **Root `__root.tsx` duplicates page-level title/og:title as a default** — harmless (leaf overrides win), but worth trimming to just charset/viewport/site-wide defaults.
- **Accessibility spot-checks** (not fully audited this pass): confirm color contrast of muted-foreground on cream backgrounds meets WCAG AA, verify visible focus rings on all interactive elements, and re-run a keyboard tab pass on `/pricing` (many CTAs) and `/contact` (form). Semantic heading order was previously verified on `/sportbit`; re-check `/pricing` and `/classes` where sections are dense.
- **Mobile overflow**: previously verified on `/schedule`, `/pricing`, `/sportbit`. Re-check `/classes` (Interactive Class Finder has the most horizontal content) at 320–375 px.
- **JSON-LD**: `ExerciseGym` exists on `/`. Consider adding `BreadcrumbList` on leaf routes and `FAQPage` on `/pricing`.
- **Analytics**: none detected — add before or shortly after DNS switch if measurement matters.

## What I did not verify (would need runtime browser or user input)
- Actual click-through on every Sportbit checkout URL (10 links on `/pricing`, plus site-wide Intro Pass `r=42`). Static grep confirms URLs are consistent; only a real click confirms Sportbit still honours them.
- Live email delivery of the contact form (requires posting the form against the deployed function).
- Whether the canonical host will be `www.yogazeeburg.com` or apex `yogazeeburg.com`; canonicals currently assume www.

## Recommended order of operations
1. Add `robots.txt`, `sitemap.xml`, and the three legacy redirect routes.
2. Decide on MCP: keep public and documented, or disable for launch.
3. Publish to `yogazeeburg.lovable.app` and smoke-test all CTAs + contact form.
4. Point `www.yogazeeburg.com` DNS, verify SSL, test canonical alignment.
5. Post-launch: og:image, analytics, extra JSON-LD.
