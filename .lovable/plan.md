## Doel
Formaliseer het bewezen proces: ChatGPT levert extern het volledige, drie keer gecontroleerde artikelpakket. De runner briefing, schrijft, reviewt of herstelt inhoud niet meer. Cadence wordt uitgebreid met dinsdag/donderdag en fasegrenzen tellen kalenderweken vanaf een expliciete `automation_start_date`. `automation_enabled` blijft `false`. Geen artikelrun. Geen artikel 1–5-wijziging.

## Aannames (corrigeer indien fout)
- Artikelen 1–5, hun routes, styling, CTA, metadata en structured data blijven byte-voor-byte gelijk (alleen registermetadata in de DB wijzigt niet).
- `placement.server.ts` + `placement-entrypoint.server.ts` blijven ongewijzigd; de runner blijft artefacten met dezelfde legacy shape schrijven (`generation`, `source_validation`, `review_1..3`, `content_ready`) — de STAPNAMEN in `PipelineResult.step` en de nieuwe artefactstroom worden `init | claim | validate_package | placement_ready`, maar de PLACEMENT-invoerartefacten blijven identiek zodat de placement-laag ongemoeid blijft. **Als je dit niet accepteert**, dan renamen we ook de artefactkeys en updaten `placement-entrypoint.server.ts` — dit is duurder (+~4 credits).
- `AiProviders`-interface blijft bestaan als typedefinitie, maar wordt verwijderd uit `RunnerDeps` en de productie-implementatie in `ai-provider.server.ts` throwt op elke methode met `configuration_error`. Historische data blijft leesbaar.
- Testbestanden die het AI-contentpad testen (`brief-schema-fix.test.ts`, `prompts.test.ts`) worden verwijderd. `pipeline.test.ts`, `lock-lease.test.ts`, `ai-provider.test.ts` worden herschreven. `placement.test.ts`, `entrypoint.test.ts`, `adapters.test.ts` blijven zoals ze zijn (leggen legacy shape vast).

## Wijzigingen

### 1. Nieuwe runner-invoer (`src/lib/publications/runner/final-package.ts`)
Strikt Zod-schema voor `FinalArticlePackage` met alle velden die artikelen 4 en 5 nu gebruiken: identiteit (articleId, planningNumber), titels/slug, category+type+pillar, readingTimeMin, publishedAt/updatedAt, directAnswer, intro, bodyMarkdown, toc, faqs, sources, internalLinks, template, cta (FIXED_CTA literals), tags, primaryKeyword, audiences, seoIntents, geoIntents, structuredDataIntents, commercialLinkCount (0–1), hasAbsoluteMedicalClaim (false), schemaVersion `"1"`, authoredBy `"chatgpt-external"`, authoredAt. `.strict()` — onbekende velden falen. Plus deterministische mapper `toGeneratedArticlePackage()` en `synthesizeExternalReviews()` (drie passing-reviews met `findings: []`).

### 2. Pipeline (`src/lib/publications/runner/pipeline.ts`)
Volledige herschrijving. Nieuwe stappen: `init → claim → validate_package → placement_ready`.
- `init`: `automation_enabled=false` of `publication_stopped=true` → `disabled_noop`, geen claim.
- Pre-claim: valideer `input.finalPackage` strikt. Ongeldig → `failed` met `validation_error`, GEEN claim, GEEN mutatie.
- `claim`: bestaande RPC.
- `validate_package`: verifieer `finalPackage.articleId === claim.articleId` en `finalPackage.planningNumber === claim.planningNumber`. Mismatch → non-retryable `validation_error` + `recordFailure`.
- Map → `GeneratedArticlePackage` + 3 synthetic passing reviews. Runner herberekent `contentHash` autoritair.
- Persist artefacten in legacy shape (`generation`, `source_validation` als lege valide pack, `review_1..3`, `content_ready`) zodat placement-laag ongemoeid blijft. Elk artefact draagt `promptVersion: "external.chatgpt-v1"`.
- Lease/heartbeat + retry gedrag blijft (bewezen fix voor stap 5).
- `placement_ready` disposition (nieuw); `PipelineResult.disposition` accepteert `disabled_noop | claim_noop | placement_ready | failed`.

### 3. Providers (`providers.ts`)
`StepKey` = `init | claim | validate_package | placement_ready`. `Disposition` uitgebreid met `placement_ready`. `RunnerDeps.ai` verwijderd. `AiProviders` type blijft (voor historische compat) maar niet meer in `RunnerDeps`.

### 4. Adapters (`adapters.server.ts`)
`createDefaultRunnerDeps()` wired niet meer `ai`. Import van `ai-provider.server` verdwijnt.

### 5. AI provider (`ai-provider.server.ts`)
Volledig vervangen door regressiedeur: `createLovableAiProviders()` retourneert een object waarvan elke methode `throw new PipelineError({ category: "configuration_error", ... })`. Testbestand `ai-provider.test.ts` bewijst dit.

### 6. Preview-run (`preview-run.server.ts`, `preview-run.functions.ts`)
Nieuwe verplichte parameter `finalPackage: FinalArticlePackage`. Server function valideert admin, deserialiseert, roept `runPipeline` aan met het pakket. Alle bestaande veiligheidsgaranties (single-flight, wrong-target, lock recovery, safety-net stale-lock release) blijven.

### 7. Migratie F — scheduler + automation start date
```sql
ALTER TYPE publication_scheduler_slot ADD VALUE IF NOT EXISTS 'tuesday';
ALTER TYPE publication_scheduler_slot ADD VALUE IF NOT EXISTS 'thursday';
ALTER TABLE publication_projects ADD COLUMN IF NOT EXISTS automation_start_date DATE;
CREATE OR REPLACE FUNCTION public._pub_evaluate_cadence(...) -- herschrijft cadans:
  -- weken 1–12 vanaf start_date: ma/wo/vr slots
  -- weken 13–24: di/do slots
  -- weken 25+: alleen wo
  -- fase gebaseerd op verstreken kalenderweken in Europe/Amsterdam vanaf start_date
  -- harde stop na planning_number 180
```
Geen INSERT of enable van automation; alleen schema + functie.

### 8. Tests
- NEW `tests/runner/final-package.schema.test.ts`: strikte schema-tests (missing/extra/verkeerde types → fail-closed; geldig pakket → parse ok).
- NEW `tests/runner/scheduler-cadence.test.ts`: pure-TS spiegel van fasegrenzen (weken 1–12, 13–24, 25+, wo-only, stop na 180, Europe/Amsterdam edge cases zoals DST-overgang en zondag-vs-maandag week rollover). Behavior-only, geen DB.
- REWRITE `tests/runner/pipeline.test.ts`: bewijst (a) geen AI-call mogelijk, (b) invalid package = zero mutation, (c) valid package = 1 claim + 7 legacy artefacten + `placement_ready`, (d) mismatch articleId non-retryable, (e) retry/idempotency via gedeelde artefactstore, (f) `automation_enabled=false` = `disabled_noop`.
- REWRITE `tests/runner/lock-lease.test.ts`: heartbeat renewal blijft, met synchrone `validate_package` (geen slow AI meer nodig).
- REWRITE `tests/runner/ai-provider.test.ts`: bewijst dat elke methode van `createLovableAiProviders()` `configuration_error` throwt.
- UPDATE `tests/publications/preview-run.test.ts`: injecteer `finalPackage` in inputs.
- DELETE `tests/runner/brief-schema-fix.test.ts`, `tests/runner/prompts.test.ts`.
- Onaangeraakt: `adapters.test.ts`, `placement.test.ts`, `entrypoint.test.ts`, kennisbank-tests, sql-contracttests.

### 9. Docs (`AGENTS.md`)
Nieuw kort blok "Kennisbank publicatie-rolverdeling": ChatGPT extern schrijft+reviewt drie keer; runner accepteert alleen `FinalArticlePackage`; scheduler ma/wo/vr → di/do → wo; harde stop na artikel 180; `automation_enabled` blijft `false` tot expliciete go-live.

## Verificatie
`vitest run`, `bunx tsgo`, `bun run build`. Read-only Supabase-check: `automation_enabled=false`, geen actieve run, geen artefact voor artikel 5+, planning-count = 180.

## Uit scope (expliciet)
- Runner activeren of scheduler cron aanzetten.
- Artikel 4/5 herschrijven of hun DB-rijen wijzigen.
- Placement-laag / SafeMarkdownBody / kennisbank-routes aanpassen.
- `AiProviders`-interface volledig verwijderen (legacy tests hangen ervan af).

## Vragen die de scope kunnen bijstellen
1. Mag de placement-laag artefacten met de legacy stepKeys blijven lezen, of moeten alle artefactnamen naar `final_package` / `placement_ready` en de placement-laag mee-updaten? (Legacy-behoud = -4 credits, minder risico.)
2. `automation_start_date` — laat ik die `NULL` en verwerp cadence bij `NULL` fail-closed, of moet ik hem seeden voor project `yoga-zeeburg-kennisbank`? (Advies: `NULL` laten; go-live-datum is een expliciete admin-actie.)
3. Volstaat een korte docs-append aan `AGENTS.md`, of wil je een apart bestand (bv. `docs/publications-rolverdeling.md`)?
