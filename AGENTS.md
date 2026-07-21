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
2. Be reachable at `/nl/kennisbank/<slug>` via the shared `nl.kennisbank.$slug.tsx` template — do not create per-article route files.
3. Appear exactly once on `/nl/kennisbank`: pillar articles show in "Aanbevolen", non-pillars in "Nieuw" (the hub already dedupes).
4. Show up in its category page and in hub search/filters (verify by keyword).
5. Be verified after adding: `bun run build` passes and the article URL + `/nl/kennisbank` both return 200 with the card visible.

Do not link the knowledge base from the English main nav (`SiteHeader`); footer + sitemap links only.
