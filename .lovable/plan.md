## Doel

Formaliseer het bewezen proces: ChatGPT schrijft en review't buiten deze codebase een compleet, definitief artikelpakket. Deze runner accepteert enkel dat pakket, valideert het strikt en plaatst het onveranderd. Geen briefing/schrijven/review meer door Gemini of enige AI in het runnerpad. `automation_enabled=false` blijft. Geen artikelrun of publicatie tijdens deze opdracht.

## Wijzigingen

### 1. Schema — `FinalArticlePackage` (Zod)
Nieuw bestand: `src/lib/publications/runner/final-package.ts`. Verplichte velden op basis van artikelen 4 en 5:
- `articleId`, `planningNumber` (1–180)
- `slug` (kebab-case), `title`, `h1`, `seoTitle`, `metaDescription`
- `categorySlug`, `categoryTitle`
- `type` ("explainer" | "how-to" | "local-guide"), `pillar` (bool)
- `readingTimeMin` (int ≥ 1)
- `publishedAt`, `updatedAt` (ISO date YYYY-MM-DD)
- `directAnswer`, `intro`, `bodyMarkdown` (≥ 200 chars)
- `toc[]` (id/label), `faqs[]` (question/answer)
- `sources[]` (optional; title/url), `internalLinks[]` (slug/anchor)
- `cta` — pinned to `FIXED_CTA` (heading/body/button/subtext literals)
- `structuredDataIntents[]`, `seoIntents[]`, `geoIntents[]`
- `tags[]`, `primaryKeyword`, `audiences[]`
- `template` (showTOC/showFAQ/showSources/showRelated)
- `contentHash` (runner is authoritatief — wordt herberekend)
- `schemaVersion`, `authoredBy` literal `"chatgpt-external"`, `authoredAt` (ISO datetime)
- Refinements: geen commercial link count > 1, geen absolute medical claims, CTA-copy literal-matched.

### 2. Runner — verwijder AI-contentpad
`src/lib/publications/runner/pipeline.ts`:
- Nieuwe input: `RunPipelineInput.finalPackage: FinalArticlePackage` (verplicht).
- Nieuwe stappen: `init → claim → validate_package → placement_ready`. Verwijder `brief`, `source_validation`, `generation`, `review_1..3`, `content_ready` uit het uitvoeringspad.
- Fail closed vóór DB-mutatie wanneer package invalid of `package.articleId !== claim.articleId`.
- Behoud lease/heartbeat, retry (validatie is deterministisch → geen retry op validation_error), idempotente artifact-upsert.
- `AiProviders` interface: markeer met deprecatie-comment; runner mag deze methodes niet aanroepen. `pipeline.ts` importeert de interface niet meer.

`src/lib/publications/runner/adapters.server.ts` / `ai-provider.server.ts`:
- Verwijder productie-wiring van AI content-methodes; werp `PipelineError("configuration_error", …)` bij aanroep, zodat regressie hard faalt.

`src/lib/publications/runner/index.ts`: exporteer `FinalArticlePackage(Schema)`.

### 3. Preview/entrypoint
`src/lib/publications/preview-run.server.ts`: `runArticle4PreviewOnce` en gerelateerde helpers accepteren nu een `finalPackage` argument; laat het bestaande onder-de-motorkap placementpad (`placement-entrypoint.server.ts`) intact.
`src/lib/publications/preview-run.functions.ts`: aanroep-signatuur uitbreiden met `data.finalPackage`.

### 4. Scheduler — di/do en fasegrenzen
Migratie: nieuwe waarden voor `publication_scheduler_slot` enum: `tuesday`, `thursday` (naast bestaande `monday`, `wednesday`, `friday`).
Vervang `_pub_evaluate_cadence` (SECURITY DEFINER):
- Bereken `weeks_since_start = floor((today - project.automation_start_date) / 7)` in Europe/Amsterdam.
- Weken 0–11 (1–12): ma/wo/vr toegestaan.
- Weken 12–23 (13–24): di/do toegestaan.
- Weken ≥ 24 (25+): alleen wo.
- Return `not_applicable` wanneer weekdag niet in de toegestane set voor de fase.
- Nieuwe kolom `publication_projects.automation_start_date DATE`.
- `planning_number > 180` → hard stop (bestaande gedragsregel bewaren).

### 5. Tests
- Herzie `tests/runner/pipeline.test.ts`: verwijder AI-content-testcases. Bewijs: geen `ai.generateBrief/generateArticle/reviewRound` calls; valid package → `placement_ready`; invalid velden → `failed` zonder artifact upsert / advance / placement.
- Nieuw `tests/runner/final-package.schema.test.ts`: veld-per-veld strict-parse regressies (missing slug, wrong CTA copy, commercial link count > 1, medical claim, articleId mismatch → all reject; volledige geldige fixture → accept).
- Nieuw `tests/runner/scheduler-cadence.test.ts` (pure TS-mirror van `_pub_evaluate_cadence` logica) OF `tests/sql/scheduler-cadence.sql`: bewijs ma-wo-vr → di-do → wo per weeknummer, DST-safe in Europe/Amsterdam, en stop bij planning > 180.
- Update `tests/runner/lock-lease.test.ts` naar nieuwe stappen.

### 6. Documentatie
Werk `AGENTS.md` (of `src/lib/publications/README.md` wanneer aanwezig) bij:
- Rolverdeling: ChatGPT extern = enige author/reviewer; runner = plaatser.
- Cadans: ma-wo-vr weken 1–12; di-do weken 13–24; wo weken 25+; stop na artikel 180.
- Verplichte velden van FinalArticlePackage.

### 7. Onaangeroerd
Artikelen 1–5 (`src/lib/kennisbank/articles.tsx`), alle routes, styling, CTA-copy, kennisbankweergave, sitemap, metadata, structured data.

## Verificatie
- `bunx vitest run` volledig groen.
- `tsgo` typecheck clean.
- `bun run build` groen.
- Read-only DB check: `automation_enabled=false`, 0 actieve runs/locks, artikelen 1–5 ongewijzigd.

## Uitleveringen
Bestandsoverzicht, migratie-SQL, testresultaten, commit-SHA, bevestiging dat geen artikel is gestart of gepubliceerd.
