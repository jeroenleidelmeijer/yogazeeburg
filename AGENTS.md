<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Knowledge base (Yoga Gids) rule

Single source of truth: `src/lib/kennisbank/articles.tsx` (the `ARTICLES` array).
Every published article MUST:

1. Be added to `ARTICLES` with a unique `slug`, correct `category.slug`, `pillar` flag, `publishedAt`/`updatedAt`, and keywords used by hub search.
2. Be reachable at `/kennisbank/<slug>` via the shared `kennisbank.$slug.tsx` template — do not create per-article route files.
3. Appear exactly once on `/kennisbank`: pillar articles show in "Aanbevolen", non-pillars in "Nieuw" (the hub already dedupes).
4. Show up in its category page and in hub search/filters (verify by keyword).
5. Be verified after adding: `bun run build` passes and the article URL + `/kennisbank` both return 200 with the card visible.

Do not link the knowledge base from the English main nav (`SiteHeader`); footer + sitemap links only.

## Kennisbank publication runner — rolverdeling

- ChatGPT (outside this codebase) writes and three-times reviews the complete `FinalArticlePackage` against the Kennisbank Werkinstructie Masterdocument.
- The runner in `src/lib/publications/runner/` accepts that single package as its only content input: it validates, hashes, stores artifacts, and places the article in preview. It does not brief, write, review or repair content, and it never calls Gemini, the Lovable AI Gateway, or any other LLM.
- Manual entrypoint: `runArticlePreview` (`src/lib/publications/preview-run.functions.ts`) → `runArticlePreviewOnce` (`src/lib/publications/preview-run.server.ts`). One invocation processes exactly one `planning_number` (1..180); on failure the same article stays next in line — nothing is silently skipped.
- Cadence (`src/lib/publications/scheduler/cadence.ts` and DB `_pub_evaluate_cadence`) follows a 3→2→1 weekly rhythm from `automation_start_date` in Europe/Amsterdam:
  - Week 1–12: Monday, Wednesday, Friday.
  - Week 13–24: Monday, Wednesday.
  - Week 25+: Monday only.
  - Hard stop after planning number 180.
- `automation_enabled` stays `false` until scheduled automation is explicitly enabled.
