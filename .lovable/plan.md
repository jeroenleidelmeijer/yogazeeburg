## Yoga Zeeburg — Homepage Foundation (v1) — final

Approved with adjustments applied.

### Adjustments
1. Sticky header with soft solid background from the start (subtle border + light backdrop-blur). No transparent-on-scroll.
2. Location: styled SVG map placeholder card linking out to Google Maps directions. No iframe embed.
3. Future nav links (/pricing, /classes, /schedule, /contact) rendered as `<Link>` targets only — those routes are NOT created in this step.
4. Hero stays problem-led with edge ("Your week is loud. This is where it slows down."). Draft copy, refined later.
5. og:image / og:url / canonical use relative paths (`/`, `/hero.jpg`) served from `public/`. Absolute production URLs to be swapped in before launch.
6. **JSON-LD `@type` is `ExerciseGym`** (valid schema.org type) instead of `YogaStudio`.

### Design system (`src/styles.css`, Tailwind v4 @theme)
- Warm cream background, deep warm near-black text
- Primary: deep water-teal (CTAs)
- Accent: clay/terracotta (eyebrows, dots)
- Support: muted sage (soft glows)
- Extra tokens: `--color-sand`, `--color-clay`, `--color-sage` (+ foregrounds)
- Fonts: Fraunces (display) + Inter (body) via Google Fonts `<link>` in `__root.tsx`; `--font-display`, `--font-sans` tokens
- All colors via semantic tokens; no hardcoded hex/`text-white`

### Files
- `src/styles.css` — rewrite with new palette + font tokens
- `src/routes/__root.tsx` — updated `head()` (site title/description/og defaults + Google Fonts links). No og:image at root.
- `src/components/site/SiteHeader.tsx` — new
- `src/components/site/SiteFooter.tsx` — new
- `src/routes/index.tsx` — full homepage with all 10 sections, ExerciseGym JSON-LD, canonical `/`, og:image `/hero.jpg`
- `public/hero.jpg` — already generated (warm, non-cliché, canal-side scene). Serves hero + og:image.

### Sections (in order)
1. SiteHeader (sticky, solid, brand + nav + Start Intro Pass CTA, mobile sheet)
2. Hero — H1 problem-led, sub, primary + secondary CTA, intro pass line, hero image
3. Benefits — 5 icon cards: calm, tension release, mobility, breathing, weekly routine
4. Intro Pass — €30 price card + 4 bullets + primary CTA
5. Why Yoga Zeeburg — 8-point list, all from the brief
6. Class direction preview — 4 generic categories + "View classes" CTA
7. Pricing teaser — the quoted line + "View pricing" CTA
8. Location — address + neighborhood chips + styled map placeholder card linking to Google Maps + "Get directions" CTA
9. Final CTA — teal band with both CTAs
10. SiteFooter — brand + address + nav + intro CTA + © line

### Responsive
Mobile-first. Header uses grid + `min-w-0` + `shrink-0` pattern. Sections stack on mobile → 2–5 cols from `sm:`/`md:`/`lg:`.

### Not in this step
Other route pages, quiz, Playzo, KB, blog, full Pricing/FAQ, /nl, teacher bios, testimonials, funnels, invented class names, map iframe.
