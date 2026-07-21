
-- ============================================================================
-- Migratie A — Foundation-onderdelen voor publicatie-automatisering fase 1
-- Bron: Plan v3 §H + Plan v3.1 delta §C, §E, en herzieningen uit gebruikersfeedback
-- Harde grenzen: geen wijziging aan publication_articles, _projects, _runs,
-- _events, _notifications, _admins, of bestaande RPC's.
-- ============================================================================

-- 1) Enum: publication_run_disposition
DO $$ BEGIN
  CREATE TYPE public.publication_run_disposition AS ENUM (
    'claimed',
    'scheduled_noop',
    'stopped_noop',
    'configuration_blocked',
    'sequence_blocked',
    'lock_conflict',
    'recovery_blocked'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2) Tabel: publication_error_categories (lookup)
CREATE TABLE public.publication_error_categories (
  key text PRIMARY KEY,
  description text NOT NULL,
  retry_allowed boolean NOT NULL DEFAULT false,
  source_reference text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.publication_error_categories TO authenticated;
GRANT ALL ON public.publication_error_categories TO service_role;

ALTER TABLE public.publication_error_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY publication_error_categories_admin_read
  ON public.publication_error_categories
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.publication_admins a WHERE a.user_id = auth.uid()
  ));

INSERT INTO public.publication_error_categories(key, description, retry_allowed, source_reference) VALUES
  ('configuration_error',   'Ontbrekende of ongeldige projectconfiguratie',                     false, 'AWI §10.2'),
  ('source_conflict',       'Conflict tussen actieve brondocumenten',                           false, 'AWI §10.2'),
  ('content_safety_error',  'Onveilige of onvoldoende onderbouwde inhoudelijke claim',          false, 'AWI §10.2'),
  ('validation_error',      'Blokkerende inhouds- of QA-validatiefout',                         false, 'AWI §10.2'),
  ('code_or_build_error',   'Typecheck- of buildfout in codebase',                              false, 'AWI §10.2'),
  ('infrastructure_error',  'Tijdelijke infra-fout (upload/deploy/netwerk)',                    true,  'AWI §10.2'),
  ('deployment_error',      'Deployment mislukt op reproduceerbare wijze',                      false, 'AWI §10.2'),
  ('live_qa_error',         'Live-QA gate faalt (route, overzicht, canonical, sitemap, enz.)',  true,  'AWI §10.2'),
  ('notification_error',    'Notificatie kon niet worden verstuurd',                            true,  'AWI §10.4'),
  ('retry_exhausted',       'Maximum aantal automatische pogingen per technische stap bereikt', false, 'Plan v3.1 §C-3'),
  ('recovery_required',     'Verlopen lock met ambigue deployment/live-toestand',               false, 'Plan v3.1 §A-4');

COMMENT ON TABLE public.publication_error_categories IS
  'Officiële foutclassificatie voor publication_runs.error_category, _step_attempts.error_category en _articles.last_error_category. FKs worden gelegd bij migratie B/C.';

-- 3) Tabel: publication_run_reason_codes (lookup)
CREATE TABLE public.publication_run_reason_codes (
  code text PRIMARY KEY,
  description text NOT NULL,
  source_reference text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.publication_run_reason_codes TO authenticated;
GRANT ALL ON public.publication_run_reason_codes TO service_role;

ALTER TABLE public.publication_run_reason_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY publication_run_reason_codes_admin_read
  ON public.publication_run_reason_codes
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.publication_admins a WHERE a.user_id = auth.uid()
  ));

INSERT INTO public.publication_run_reason_codes(code, description, source_reference) VALUES
  ('automation_disabled',            'automation_enabled = false',                                                  'AWI §4; ONT §8.1'),
  ('missing_notification_recipient', 'notification_recipient IS NULL',                                              'AWI §4'),
  ('missing_production_origin',      'production_origin IS NULL',                                                   'AWI §4'),
  ('all_180_published',              'Alle 180 artikelen aantoonbaar published; enige geldige eindstop',            'AWI §14; Plan v3.1 §A-3'),
  ('publication_stopped',            'Project handmatig gestopt door beheerder',                                    'ONT §8.4'),
  ('schedule_slot_disallowed',       'Scheduler-slot of lokale isodow niet toegestaan in huidige fase',             'AWI §7.2; ONT §9'),
  ('week_quota_reached',             'ISO-weekquotum voor huidige fase bereikt',                                    'AWI §7.3'),
  ('sequence_head_failed_blocked',   'Sequence-head artikel staat op failed of blocked',                            'AWI §6.2; Plan v3.1 §A-1'),
  ('lock_held',                      'Actieve, niet-verlopen lock op sequence-head artikel',                        'AWI §5.4; Plan v3.1 §A-1'),
  ('recovery_ambiguous',             'Verlopen lock met ambigue deployment/live-toestand; menselijke interventie',  'Plan v3.1 §A-4 + gebruikerscorrectie'),
  ('sequence_integrity_violation',   'Geen sequence-head terwijl minder dan 180 artikelen published zijn',          'Plan v3.1 §A-3');

COMMENT ON TABLE public.publication_run_reason_codes IS
  'Officiële reason_codes voor niet-claimed dispositions. Wordt in migratie B door claim_next_publication_run gebruikt.';

-- 4) Tabel: publication_run_step_attempts (retry-per-step-model)
CREATE TABLE public.publication_run_step_attempts (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id     uuid NOT NULL REFERENCES public.publication_projects(id) ON DELETE CASCADE,
  article_id     uuid NOT NULL REFERENCES public.publication_articles(id) ON DELETE CASCADE,
  run_id         uuid NOT NULL REFERENCES public.publication_runs(id) ON DELETE CASCADE,
  step_key       text NOT NULL,
  attempt_number smallint NOT NULL CHECK (attempt_number >= 1),
  result         text NOT NULL CHECK (result IN ('success','failure','retry_pending')),
  error_category text REFERENCES public.publication_error_categories(key),
  error_summary  text,
  backoff_hint_seconds integer CHECK (backoff_hint_seconds IS NULL OR backoff_hint_seconds >= 0),
  started_at     timestamptz NOT NULL DEFAULT now(),
  finished_at    timestamptz,
  created_at     timestamptz NOT NULL DEFAULT now(),
  UNIQUE (run_id, step_key, attempt_number),
  CHECK (finished_at IS NULL OR finished_at >= started_at)
);

CREATE INDEX publication_run_step_attempts_article_step_idx
  ON public.publication_run_step_attempts(article_id, step_key, finished_at);
CREATE INDEX publication_run_step_attempts_run_idx
  ON public.publication_run_step_attempts(run_id);

GRANT SELECT ON public.publication_run_step_attempts TO authenticated;
GRANT ALL ON public.publication_run_step_attempts TO service_role;

ALTER TABLE public.publication_run_step_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY publication_run_step_attempts_admin_read
  ON public.publication_run_step_attempts
  FOR SELECT
  TO authenticated
  USING (public.is_publication_admin(project_id));

COMMENT ON TABLE public.publication_run_step_attempts IS
  'Retry-teller per technische stap per run in de run-keten. Vervangt publication_articles.retry_count als bron van waarheid vanaf migratie B.';

-- 5) Uitbreiden publication_required_qa_checks met applicability-metadata
ALTER TABLE public.publication_required_qa_checks
  ADD COLUMN blocking boolean NOT NULL DEFAULT true,
  ADD COLUMN applicability text NOT NULL DEFAULT 'always'
    CHECK (applicability IN ('always','conditional')),
  ADD COLUMN when_not_applicable text,
  ADD COLUMN source_reference text,
  ADD COLUMN produced_by_step text,
  ADD COLUMN evidence_schema jsonb NOT NULL DEFAULT '{}'::jsonb;

-- Backfill van alle 30 rijen volgens plan v3 §E
-- Applicability: 'conditional' voor medical_safety en filter_registration; alles anders 'always'
UPDATE public.publication_required_qa_checks r SET
  applicability = 'conditional',
  when_not_applicable = 'Geen medische, blessure-, zwangerschap- of gezondheidsclaim in artikel; vastgesteld door draft_classifier',
  source_reference = 'AWI §12; MST v2 medische regels',
  produced_by_step = 'draft_review_round_1',
  evidence_schema = '{"required":["applicability_reason","claims_reviewed"]}'::jsonb
WHERE r.check_key = 'medical_safety' AND r.stage = 'content';

UPDATE public.publication_required_qa_checks r SET
  applicability = 'conditional',
  when_not_applicable = 'Artikel behoort niet tot een filterbare snelle keuze binnen bestaande filters; expliciet vastgelegd in artikelbrief',
  source_reference = 'ADD §5.1; AWI §12',
  produced_by_step = 'live_smoke',
  evidence_schema = '{"required":["filters_tested"]}'::jsonb
WHERE r.check_key = 'filter_registration' AND r.stage = 'live';

-- content stage
UPDATE public.publication_required_qa_checks r SET source_reference='AWI §8/§9; ADD §12 ronde 1', produced_by_step='draft_review_round_1', evidence_schema='{"required":["pass","word_count"]}'::jsonb WHERE r.check_key='content_integrity' AND r.stage='content';
UPDATE public.publication_required_qa_checks r SET source_reference='AWI §8 stap 4; MST v2 feitenvalidatie', produced_by_step='draft_review_round_1', evidence_schema='{"required":["sources"]}'::jsonb WHERE r.check_key='fact_validation' AND r.stage='content';
UPDATE public.publication_required_qa_checks r SET source_reference='AWI §9; MST v2 §22.2', produced_by_step='draft_review_round_1', evidence_schema='{"required":["competing_articles"]}'::jsonb WHERE r.check_key='cannibalization' AND r.stage='content';
UPDATE public.publication_required_qa_checks r SET source_reference='ADD §3, §7; AWI §9', produced_by_step='draft_review_round_1', evidence_schema='{"required":["cta_button_text","text_link_count","end_cta_present","internal_links"]}'::jsonb WHERE r.check_key='cta_and_links' AND r.stage='content';
UPDATE public.publication_required_qa_checks r SET source_reference='AWI §8 stap 6 ronde 2; MST v2 §22', produced_by_step='draft_review_round_2', evidence_schema='{"required":["title","meta_description","canonical","jsonld_types"]}'::jsonb WHERE r.check_key='seo_metadata' AND r.stage='content';

-- preview stage
UPDATE public.publication_required_qa_checks r SET source_reference='AWI §8 stap 8; ADD §10.1', produced_by_step='build_step', evidence_schema='{"required":["typecheck","build","duration_ms"]}'::jsonb WHERE r.check_key='build' AND r.stage='preview';
UPDATE public.publication_required_qa_checks r SET source_reference='AWI §8 stap 8; ADD §11.6', produced_by_step='preview_smoke', evidence_schema='{"required":["url","status_code","rendered_title"]}'::jsonb WHERE r.check_key='preview_route' AND r.stage='preview';
UPDATE public.publication_required_qa_checks r SET source_reference='ADD §5, §11.3; AWI §8', produced_by_step='preview_smoke', evidence_schema='{"required":["url","card_found","category","search_found","filter_found"]}'::jsonb WHERE r.check_key='preview_overview' AND r.stage='preview';
UPDATE public.publication_required_qa_checks r SET source_reference='ADD §11.5; AWI §9', produced_by_step='preview_visual', evidence_schema='{"required":["screenshot_ref","viewport","overflow"]}'::jsonb WHERE r.check_key='preview_visual_desktop' AND r.stage='preview';
UPDATE public.publication_required_qa_checks r SET source_reference='ADD §11.5; AWI §9', produced_by_step='preview_visual', evidence_schema='{"required":["screenshot_ref","viewport","overflow"]}'::jsonb WHERE r.check_key='preview_visual_mobile' AND r.stage='preview';
UPDATE public.publication_required_qa_checks r SET source_reference='ADD §6, §11.5; AWI §8 stap 8', produced_by_step='preview_regression', evidence_schema='{"required":["pilots_ok","nav_english_only"]}'::jsonb WHERE r.check_key='preview_regression' AND r.stage='preview';

-- live stage
UPDATE public.publication_required_qa_checks r SET source_reference='AWI §8 stap 10', produced_by_step='live_smoke', evidence_schema='{"required":["url","status_code"]}'::jsonb WHERE r.check_key='live_route' AND r.stage='live';
UPDATE public.publication_required_qa_checks r SET source_reference='AWI §8 stap 10', produced_by_step='live_smoke', evidence_schema='{"required":["title_match","h1_match"]}'::jsonb WHERE r.check_key='live_content' AND r.stage='live';
UPDATE public.publication_required_qa_checks r SET source_reference='ADD §5.1; AWI §8 stap 10', produced_by_step='live_smoke', evidence_schema='{"required":["card_present","url"]}'::jsonb WHERE r.check_key='overview_card' AND r.stage='live';
UPDATE public.publication_required_qa_checks r SET source_reference='ADD §5, §11.3', produced_by_step='live_smoke', evidence_schema='{"required":["category_slug","found_in_category"]}'::jsonb WHERE r.check_key='category_registration' AND r.stage='live';
UPDATE public.publication_required_qa_checks r SET source_reference='ADD §5.1', produced_by_step='live_smoke', evidence_schema='{"required":["query","found"]}'::jsonb WHERE r.check_key='search_registration' AND r.stage='live';
UPDATE public.publication_required_qa_checks r SET source_reference='ADD §5.2; AWI §5.4', produced_by_step='live_smoke', evidence_schema='{"required":["duplicate_slug_check","duplicate_card_check"]}'::jsonb WHERE r.check_key='no_duplicate_article' AND r.stage='live';
UPDATE public.publication_required_qa_checks r SET source_reference='AWI §8 stap 10', produced_by_step='live_smoke', evidence_schema='{"required":["cta_url","status_code"]}'::jsonb WHERE r.check_key='cta_destination' AND r.stage='live';
UPDATE public.publication_required_qa_checks r SET source_reference='ADD §7', produced_by_step='live_smoke', evidence_schema='{"required":["links"]}'::jsonb WHERE r.check_key='internal_links' AND r.stage='live';
UPDATE public.publication_required_qa_checks r SET source_reference='AWI §8 stap 10', produced_by_step='live_smoke', evidence_schema='{"required":["canonical_url","matches_live"]}'::jsonb WHERE r.check_key='canonical' AND r.stage='live';
UPDATE public.publication_required_qa_checks r SET source_reference='AWI §8 stap 10', produced_by_step='live_smoke', evidence_schema='{"required":["title","meta_description","og_image"]}'::jsonb WHERE r.check_key='metadata' AND r.stage='live';
UPDATE public.publication_required_qa_checks r SET source_reference='AWI §8 stap 10', produced_by_step='live_smoke', evidence_schema='{"required":["jsonld_types_found","matches_content"]}'::jsonb WHERE r.check_key='structured_data' AND r.stage='live';
UPDATE public.publication_required_qa_checks r SET source_reference='AWI §8 stap 10', produced_by_step='live_smoke', evidence_schema='{"required":["sitemap_url","route_present"]}'::jsonb WHERE r.check_key='sitemap' AND r.stage='live';
UPDATE public.publication_required_qa_checks r SET source_reference='ADD §8; AWI §12', produced_by_step='live_smoke', evidence_schema='{"required":["published_at","is_not_future_in_amsterdam"]}'::jsonb WHERE r.check_key='publication_date' AND r.stage='live';
UPDATE public.publication_required_qa_checks r SET source_reference='ADD §6, §11.5', produced_by_step='live_regression', evidence_schema='{"required":["english_nav_snapshot","contains_yoga_gids"]}'::jsonb WHERE r.check_key='navigation_regression' AND r.stage='live';
UPDATE public.publication_required_qa_checks r SET source_reference='ADD §11.6', produced_by_step='live_regression', evidence_schema='{"required":["pilots"]}'::jsonb WHERE r.check_key='pilot_regression' AND r.stage='live';
UPDATE public.publication_required_qa_checks r SET source_reference='ADD §11.5', produced_by_step='live_visual', evidence_schema='{"required":["screenshot_ref"]}'::jsonb WHERE r.check_key='mobile_visual' AND r.stage='live';
UPDATE public.publication_required_qa_checks r SET source_reference='ADD §11.5', produced_by_step='live_visual', evidence_schema='{"required":["screenshot_ref"]}'::jsonb WHERE r.check_key='desktop_visual' AND r.stage='live';

-- Verificatie-veiligheid: alle 30 rijen krijgen een source_reference; NULLs zouden op een gemiste rij wijzen.
DO $$
DECLARE v_null_count integer;
BEGIN
  SELECT count(*) INTO v_null_count FROM public.publication_required_qa_checks WHERE source_reference IS NULL;
  IF v_null_count > 0 THEN
    RAISE EXCEPTION 'Backfill onvolledig: % rijen zonder source_reference', v_null_count;
  END IF;
END $$;

COMMENT ON COLUMN public.publication_required_qa_checks.applicability IS
  'always = altijd vereist als pass; conditional = mag not_applicable zijn mits applicability_reason in evidence.';
COMMENT ON COLUMN public.publication_required_qa_checks.evidence_schema IS
  'JSON-schema-achtige beschrijving van vereiste evidence-velden voor deze check.';
