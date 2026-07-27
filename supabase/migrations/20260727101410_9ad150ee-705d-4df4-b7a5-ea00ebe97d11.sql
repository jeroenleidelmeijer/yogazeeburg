-- ============================================================
-- Migration C: QA registration, live-QA gate, cadence, preview-only, security cleanup
-- ============================================================

-- 1. Enum & schema additions ---------------------------------
ALTER TYPE public.publication_article_status ADD VALUE IF NOT EXISTS 'preview_ready';
ALTER TYPE public.publication_run_status ADD VALUE IF NOT EXISTS 'preview_ready';
ALTER TYPE public.publication_run_disposition ADD VALUE IF NOT EXISTS 'cadence_blocked';

ALTER TABLE public.publication_articles
  ADD COLUMN IF NOT EXISTS preview_url text,
  ADD COLUMN IF NOT EXISTS preview_deployment_id text,
  ADD COLUMN IF NOT EXISTS preview_ready_at timestamptz;

CREATE UNIQUE INDEX IF NOT EXISTS publication_qa_checks_run_check_stage_uidx
  ON public.publication_qa_checks(run_id, check_key, stage);

INSERT INTO public.publication_run_reason_codes(code, description, source_reference) VALUES
  ('wrong_weekday','Local weekday does not match scheduler_slot','AWI cadans'),
  ('weekly_quota_reached','ISO week phase quota reached','AWI cadans'),
  ('qa_gate_failed','Required QA checks not all pass','ONT QA-gate'),
  ('preview_completed','Terminal preview_ready outcome','ONT preview-modus')
ON CONFLICT (code) DO NOTHING;

-- 2. Cadence helper -----------------------------------------
CREATE OR REPLACE FUNCTION public._pub_evaluate_cadence(
  p_project_id uuid, p_planning_number smallint,
  p_scheduler_slot publication_scheduler_slot, p_check_weekday boolean)
RETURNS jsonb
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public','pg_temp'
AS $fn$
DECLARE
  v_tz text;
  v_iso_dow int;
  v_quota_max int;
  v_slots publication_scheduler_slot[];
  v_slot_dow int;
  v_this_week_published int;
  v_local_ts timestamp;
BEGIN
  SELECT timezone INTO v_tz FROM publication_projects WHERE id = p_project_id;
  IF v_tz IS NULL THEN v_tz := 'Europe/Amsterdam'; END IF;
  v_local_ts := (now() AT TIME ZONE v_tz);
  v_iso_dow := EXTRACT(ISODOW FROM v_local_ts)::int;

  IF p_planning_number <= 36 THEN
    v_quota_max := 3; v_slots := ARRAY['monday','wednesday','friday']::publication_scheduler_slot[];
  ELSIF p_planning_number <= 60 THEN
    v_quota_max := 2; v_slots := ARRAY['monday','friday']::publication_scheduler_slot[];
  ELSE
    v_quota_max := 1; v_slots := ARRAY['monday']::publication_scheduler_slot[];
  END IF;

  IF p_check_weekday AND p_scheduler_slot IS NOT NULL THEN
    v_slot_dow := CASE p_scheduler_slot
                    WHEN 'monday' THEN 1
                    WHEN 'wednesday' THEN 3
                    WHEN 'friday' THEN 5 END;
    IF NOT (p_scheduler_slot = ANY(v_slots)) OR v_slot_dow <> v_iso_dow THEN
      RETURN jsonb_build_object('ok', false, 'reason','wrong_weekday',
        'local_dow', v_iso_dow, 'quota_max', v_quota_max);
    END IF;
  END IF;

  SELECT count(*) INTO v_this_week_published
    FROM publication_articles
    WHERE project_id = p_project_id
      AND status = 'published'
      AND published_at IS NOT NULL
      AND date_trunc('week', (published_at AT TIME ZONE v_tz))
        = date_trunc('week', v_local_ts);

  IF v_this_week_published >= v_quota_max THEN
    RETURN jsonb_build_object('ok', false, 'reason','weekly_quota_reached',
      'quota_used', v_this_week_published, 'quota_max', v_quota_max);
  END IF;

  RETURN jsonb_build_object('ok', true, 'quota_used', v_this_week_published, 'quota_max', v_quota_max);
END; $fn$;

REVOKE ALL ON FUNCTION public._pub_evaluate_cadence(uuid, smallint, publication_scheduler_slot, boolean) FROM PUBLIC;
REVOKE ALL ON FUNCTION public._pub_evaluate_cadence(uuid, smallint, publication_scheduler_slot, boolean) FROM anon;
REVOKE ALL ON FUNCTION public._pub_evaluate_cadence(uuid, smallint, publication_scheduler_slot, boolean) FROM authenticated;

-- 3. QA gate helper -----------------------------------------
CREATE OR REPLACE FUNCTION public._pub_qa_gate(
  p_article_id uuid, p_run_id uuid, p_stages publication_qa_stage[])
RETURNS jsonb
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public','pg_temp'
AS $fn$
DECLARE
  v_missing int;
  v_bad int;
BEGIN
  SELECT count(*) INTO v_missing
    FROM publication_required_qa_checks rq
    WHERE rq.stage = ANY(p_stages)
      AND NOT EXISTS (
        SELECT 1 FROM publication_qa_checks q
         WHERE q.run_id = p_run_id
           AND q.article_id = p_article_id
           AND q.check_key = rq.check_key
           AND q.stage = rq.stage);

  SELECT count(*) INTO v_bad
    FROM publication_required_qa_checks rq
    JOIN publication_qa_checks q
      ON q.run_id = p_run_id AND q.article_id = p_article_id
     AND q.check_key = rq.check_key AND q.stage = rq.stage
    WHERE rq.stage = ANY(p_stages)
      AND NOT (
        q.result = 'pass'
        OR (q.result = 'not_applicable' AND rq.applicability = 'conditional')
      );

  RETURN jsonb_build_object('ok', (v_missing = 0 AND v_bad = 0),
    'missing', v_missing, 'bad', v_bad);
END; $fn$;

REVOKE ALL ON FUNCTION public._pub_qa_gate(uuid, uuid, publication_qa_stage[]) FROM PUBLIC;
REVOKE ALL ON FUNCTION public._pub_qa_gate(uuid, uuid, publication_qa_stage[]) FROM anon;
REVOKE ALL ON FUNCTION public._pub_qa_gate(uuid, uuid, publication_qa_stage[]) FROM authenticated;

-- 4. record_publication_qa_check ----------------------------
CREATE OR REPLACE FUNCTION public.record_publication_qa_check(
  p_run_id uuid, p_article_id uuid, p_lock_token uuid,
  p_check_key text, p_stage publication_qa_stage,
  p_result publication_check_result,
  p_summary text, p_evidence jsonb DEFAULT '{}'::jsonb)
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public','pg_temp'
AS $fn$
DECLARE
  v_art publication_articles%ROWTYPE;
  v_req publication_required_qa_checks%ROWTYPE;
  v_run publication_runs%ROWTYPE;
BEGIN
  IF p_check_key IS NULL OR p_stage IS NULL OR p_result IS NULL OR p_summary IS NULL THEN
    RAISE EXCEPTION 'missing required arguments';
  END IF;
  v_art := public._pub_lock_run(p_run_id, p_article_id, p_lock_token);
  SELECT * INTO v_run FROM publication_runs WHERE id = p_run_id;
  IF v_run.final_status <> 'running' THEN
    RAISE EXCEPTION 'run % is not running (status=%)', p_run_id, v_run.final_status;
  END IF;
  SELECT * INTO v_req FROM publication_required_qa_checks
    WHERE check_key = p_check_key AND stage = p_stage;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'unknown (check_key, stage) = (%, %)', p_check_key, p_stage;
  END IF;
  IF p_result = 'not_applicable' AND v_req.applicability <> 'conditional' THEN
    RAISE EXCEPTION 'check % stage % may not be not_applicable', p_check_key, p_stage;
  END IF;
  INSERT INTO publication_qa_checks(project_id, run_id, article_id, check_key, stage,
      result, blocking, summary, evidence, checked_at)
    VALUES (v_art.project_id, p_run_id, p_article_id, p_check_key, p_stage,
      p_result, v_req.blocking, p_summary, coalesce(p_evidence,'{}'::jsonb), now())
  ON CONFLICT (run_id, check_key, stage) DO UPDATE
    SET result = EXCLUDED.result, summary = EXCLUDED.summary,
        evidence = EXCLUDED.evidence, blocking = EXCLUDED.blocking,
        checked_at = now();
  RETURN jsonb_build_object('ok', true, 'check_key', p_check_key,
    'stage', p_stage::text, 'result', p_result::text);
END; $fn$;

REVOKE ALL ON FUNCTION public.record_publication_qa_check(uuid, uuid, uuid, text, publication_qa_stage, publication_check_result, text, jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.record_publication_qa_check(uuid, uuid, uuid, text, publication_qa_stage, publication_check_result, text, jsonb) FROM anon;
REVOKE ALL ON FUNCTION public.record_publication_qa_check(uuid, uuid, uuid, text, publication_qa_stage, publication_check_result, text, jsonb) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.record_publication_qa_check(uuid, uuid, uuid, text, publication_qa_stage, publication_check_result, text, jsonb) TO service_role;

-- 5. complete_publication_preview ---------------------------
CREATE OR REPLACE FUNCTION public.complete_publication_preview(
  p_run_id uuid, p_article_id uuid, p_lock_token uuid,
  p_content_hash text, p_preview_url text,
  p_preview_deployment_id text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public','pg_temp'
AS $fn$
DECLARE
  v_art publication_articles%ROWTYPE;
  v_gate jsonb;
BEGIN
  IF p_content_hash IS NULL OR p_preview_url IS NULL THEN
    RAISE EXCEPTION 'preview: content_hash and preview_url required';
  END IF;
  v_art := public._pub_lock_run(p_run_id, p_article_id, p_lock_token);
  IF v_art.status <> 'preview_check' THEN
    RAISE EXCEPTION 'cannot complete preview: status is %, expected preview_check', v_art.status;
  END IF;
  v_gate := public._pub_qa_gate(p_article_id, p_run_id,
              ARRAY['content','preview']::publication_qa_stage[]);
  IF (v_gate->>'ok')::boolean IS DISTINCT FROM true THEN
    RAISE EXCEPTION 'preview QA gate failed: %', v_gate::text;
  END IF;
  UPDATE publication_articles
     SET status = 'preview_ready'::publication_article_status,
         content_hash = p_content_hash,
         preview_url = p_preview_url,
         preview_deployment_id = coalesce(p_preview_deployment_id, preview_deployment_id),
         preview_ready_at = now(),
         lock_token = NULL, locked_at = NULL, lock_expires_at = NULL,
         locked_by = NULL, active_run_id = NULL,
         last_error_category = NULL, last_error_summary = NULL,
         updated_at = now()
   WHERE id = p_article_id;
  UPDATE publication_runs
     SET final_status = 'preview_ready'::publication_run_status,
         current_step = 'preview_ready',
         finished_at = now(),
         reason_code = 'preview_completed',
         updated_at = now()
   WHERE id = p_run_id;
  INSERT INTO publication_events(project_id, article_id, run_id, event_type,
      actor_type, actor_id, reason, payload)
    VALUES (v_art.project_id, p_article_id, p_run_id, 'article_preview_ready',
      'automation', auth.uid(), 'preview_completed',
      jsonb_build_object('preview_url', p_preview_url,
        'preview_deployment_id', p_preview_deployment_id));
  RETURN jsonb_build_object('ok', true, 'status', 'preview_ready');
END; $fn$;

REVOKE ALL ON FUNCTION public.complete_publication_preview(uuid, uuid, uuid, text, text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.complete_publication_preview(uuid, uuid, uuid, text, text, text) FROM anon;
REVOKE ALL ON FUNCTION public.complete_publication_preview(uuid, uuid, uuid, text, text, text) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.complete_publication_preview(uuid, uuid, uuid, text, text, text) TO service_role;

-- 6. Harden claim_next_publication_run ---------------------
CREATE OR REPLACE FUNCTION public.claim_next_publication_run(
  p_project_key text, p_trigger publication_trigger_type,
  p_scheduler_slot publication_scheduler_slot DEFAULT NULL,
  p_lock_ttl_seconds integer DEFAULT 300)
 RETURNS jsonb
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public','pg_temp'
AS $fn$
DECLARE
  v_proj publication_projects%ROWTYPE;
  v_art  publication_articles%ROWTYPE;
  v_run_id uuid; v_lock uuid; v_expires timestamptz;
  v_published_count integer; v_parent_run uuid;
  v_needs_recovery boolean := false;
  v_recovery_target publication_article_status;
  v_cadence jsonb;
  v_check_weekday boolean;
BEGIN
  IF p_lock_ttl_seconds IS NULL OR p_lock_ttl_seconds < 30 OR p_lock_ttl_seconds > 3600 THEN
    RAISE EXCEPTION 'invalid lock ttl'; END IF;
  SELECT * INTO v_proj FROM publication_projects WHERE project_key = p_project_key FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknown project %', p_project_key; END IF;
  PERFORM _pub_require_admin(v_proj.id);

  IF v_proj.publication_stopped THEN
    INSERT INTO publication_runs(project_id, trigger_type, scheduler_slot, current_step, final_status,
      finished_at, disposition, reason_code, source_snapshot, created_by)
    VALUES (v_proj.id, p_trigger, p_scheduler_slot, 'claim','stopped_noop',
      now(),'stopped_noop','publication_stopped',
      jsonb_build_object('stopped_reason', v_proj.stopped_reason), auth.uid())
    RETURNING id INTO v_run_id;
    RETURN jsonb_build_object('disposition','stopped_noop','run_id',v_run_id);
  END IF;

  IF p_trigger = 'scheduled' AND NOT v_proj.automation_enabled THEN
    INSERT INTO publication_runs(project_id, trigger_type, scheduler_slot, current_step, final_status,
      finished_at, disposition, reason_code, created_by)
    VALUES (v_proj.id, p_trigger, p_scheduler_slot, 'claim','configuration_blocked',
      now(),'configuration_blocked','automation_disabled', auth.uid())
    RETURNING id INTO v_run_id;
    RETURN jsonb_build_object('disposition','configuration_blocked','run_id',v_run_id);
  END IF;

  SELECT count(*) INTO v_published_count FROM publication_articles
    WHERE project_id = v_proj.id AND status='published';
  IF v_published_count >= 180 THEN
    UPDATE publication_projects SET publication_stopped=true,
      stopped_reason=coalesce(stopped_reason,'all_180_published'),
      stopped_at=coalesce(stopped_at,now()), updated_at=now() WHERE id=v_proj.id;
    INSERT INTO publication_runs(project_id, trigger_type, scheduler_slot, current_step, final_status,
      finished_at, disposition, reason_code, created_by)
    VALUES (v_proj.id, p_trigger, p_scheduler_slot, 'claim','stopped_noop',
      now(),'stopped_noop','all_180_published', auth.uid())
    RETURNING id INTO v_run_id;
    RETURN jsonb_build_object('disposition','stopped_noop','run_id',v_run_id,'reason','all_180_published');
  END IF;

  SELECT * INTO v_art FROM publication_articles
   WHERE project_id=v_proj.id
     AND status NOT IN ('published','preview_ready')
   ORDER BY planning_number ASC FOR UPDATE LIMIT 1;

  IF NOT FOUND THEN
    UPDATE publication_projects SET publication_stopped=true,
      stopped_reason=coalesce(stopped_reason,'all_180_published'),
      stopped_at=coalesce(stopped_at,now()), updated_at=now() WHERE id=v_proj.id;
    INSERT INTO publication_runs(project_id, trigger_type, scheduler_slot, current_step, final_status,
      finished_at, disposition, reason_code, created_by)
    VALUES (v_proj.id, p_trigger, p_scheduler_slot, 'claim','stopped_noop',
      now(),'stopped_noop','all_180_published', auth.uid())
    RETURNING id INTO v_run_id;
    RETURN jsonb_build_object('disposition','stopped_noop','run_id',v_run_id,'reason','all_180_published');
  END IF;

  IF v_art.status IN ('failed','blocked') THEN
    INSERT INTO publication_runs(project_id, article_id, trigger_type, scheduler_slot, current_step,
      final_status, finished_at, disposition, reason_code, created_by)
    VALUES (v_proj.id, v_art.id, p_trigger, p_scheduler_slot, 'claim',
      'blocked', now(),'sequence_blocked','sequence_head_failed_blocked', auth.uid())
    RETURNING id INTO v_run_id;
    RETURN jsonb_build_object('disposition','sequence_blocked','run_id',v_run_id,
      'article_id',v_art.id,'planning_number',v_art.planning_number,'article_status',v_art.status);
  END IF;

  IF v_art.lock_token IS NOT NULL AND v_art.lock_expires_at > now() THEN
    INSERT INTO publication_runs(project_id, article_id, trigger_type, scheduler_slot, current_step,
      final_status, finished_at, disposition, reason_code, created_by)
    VALUES (v_proj.id, v_art.id, p_trigger, p_scheduler_slot, 'claim',
      'blocked', now(),'lock_conflict','lock_held', auth.uid())
    RETURNING id INTO v_run_id;
    RETURN jsonb_build_object('disposition','lock_conflict','run_id',v_run_id,
      'article_id',v_art.id,'planning_number',v_art.planning_number,'lock_expires_at',v_art.lock_expires_at);
  END IF;

  v_check_weekday := (p_scheduler_slot IS NOT NULL);
  v_cadence := public._pub_evaluate_cadence(v_proj.id, v_art.planning_number,
                                            p_scheduler_slot, v_check_weekday);
  IF (v_cadence->>'ok')::boolean IS DISTINCT FROM true THEN
    INSERT INTO publication_runs(project_id, article_id, trigger_type, scheduler_slot,
      current_step, final_status, finished_at, disposition, reason_code,
      source_snapshot, created_by)
    VALUES (v_proj.id, v_art.id, p_trigger, p_scheduler_slot, 'claim',
      'blocked', now(), 'cadence_blocked', v_cadence->>'reason',
      v_cadence, auth.uid())
    RETURNING id INTO v_run_id;
    RETURN jsonb_build_object('disposition','cadence_blocked','run_id',v_run_id,
      'article_id',v_art.id,'planning_number',v_art.planning_number,
      'reason',v_cadence->>'reason','cadence',v_cadence);
  END IF;

  IF v_art.status IN ('drafting','validating','building','preview_check','publishing','live_check','retry_pending','locked') THEN
    v_parent_run := v_art.active_run_id;
    IF v_art.status IN ('drafting','validating','locked','retry_pending','building','preview_check','live_check') THEN
      v_recovery_target := 'planned'; v_needs_recovery := true;
    ELSIF v_art.status = 'publishing' THEN
      UPDATE publication_runs SET final_status='blocked', finished_at=now(),
        disposition='recovery_blocked', error_category='recovery_required',
        reason_code='recovery_ambiguous',
        error_summary=coalesce(error_summary,'stale lock in publishing'),
        current_step=coalesce(current_step,'publishing'), updated_at=now()
       WHERE id=v_art.active_run_id AND final_status='running';
      INSERT INTO publication_runs(project_id, article_id, parent_run_id, trigger_type, scheduler_slot,
        current_step, final_status, finished_at, disposition, error_category, reason_code,
        error_summary, created_by)
      VALUES (v_proj.id, v_art.id, v_parent_run, p_trigger, p_scheduler_slot,
        'recovery','blocked', now(),'recovery_blocked','recovery_required','recovery_ambiguous',
        'ambiguous recovery: previous run left article in publishing state', auth.uid())
      RETURNING id INTO v_run_id;
      UPDATE publication_articles SET status='blocked',
        lock_token=NULL, locked_at=NULL, lock_expires_at=NULL, locked_by=NULL, active_run_id=NULL,
        last_error_category='recovery_required',
        last_error_summary='ambiguous recovery from publishing state', updated_at=now()
       WHERE id=v_art.id;
      INSERT INTO publication_events(project_id, article_id, run_id, event_type, actor_type, actor_id, reason)
        VALUES (v_proj.id, v_art.id, v_run_id, 'recovery_ambiguous_blocked','automation', auth.uid(),
                'stale lock in publishing');
      RETURN jsonb_build_object('disposition','recovery_blocked','run_id',v_run_id,
        'article_id',v_art.id,'planning_number',v_art.planning_number,'parent_run_id',v_parent_run);
    END IF;
  END IF;

  IF v_needs_recovery THEN
    UPDATE publication_runs SET final_status='cancelled', finished_at=now(),
      current_step=coalesce(current_step,'recovery_reset'),
      reason_code='stale_lock_recovered', updated_at=now()
     WHERE id=v_art.active_run_id AND final_status='running';
    UPDATE publication_articles SET status=v_recovery_target,
      lock_token=NULL, locked_at=NULL, lock_expires_at=NULL, locked_by=NULL, active_run_id=NULL,
      updated_at=now() WHERE id=v_art.id;
    SELECT * INTO v_art FROM publication_articles WHERE id=v_art.id FOR UPDATE;
  END IF;

  v_lock := gen_random_uuid();
  v_expires := now() + make_interval(secs => p_lock_ttl_seconds);
  INSERT INTO publication_runs(project_id, article_id, trigger_type, scheduler_slot,
    current_step, final_status, disposition, phase, created_by, source_snapshot)
  VALUES (v_proj.id, v_art.id, p_trigger, p_scheduler_slot,
    'claim','running','claimed', v_art.phase, auth.uid(),
    jsonb_build_object('planning_number', v_art.planning_number,
      'cluster', v_art.cluster, 'cta_variant', v_art.cta_variant,
      'original_title', v_art.original_title, 'cadence', v_cadence))
  RETURNING id INTO v_run_id;
  UPDATE publication_articles SET status='locked',
    lock_token=v_lock, locked_at=now(), lock_expires_at=v_expires,
    locked_by=coalesce(auth.uid()::text,'service_role'),
    active_run_id=v_run_id, started_at=coalesce(started_at, now()), updated_at=now()
   WHERE id=v_art.id;
  INSERT INTO publication_events(project_id, article_id, run_id, event_type, actor_type, actor_id, reason)
    VALUES (v_proj.id, v_art.id, v_run_id, 'run_claimed','automation', auth.uid(), p_trigger::text);
  RETURN jsonb_build_object('disposition','claimed','run_id',v_run_id,
    'article_id',v_art.id,'planning_number',v_art.planning_number,
    'lock_token',v_lock,'lock_expires_at',v_expires,
    'brief', jsonb_build_object('original_title',v_art.original_title,'cluster',v_art.cluster,
      'cta_variant',v_art.cta_variant,'phase',v_art.phase,'category',v_art.category,
      'primary_keyword',v_art.primary_keyword));
END; $fn$;

-- 7. Harden complete_publication_success ---------------------
CREATE OR REPLACE FUNCTION public.complete_publication_success(
  p_run_id uuid, p_article_id uuid, p_lock_token uuid,
  p_final_title text, p_slug text, p_content_hash text,
  p_deployment_id text, p_live_url text, p_published_at timestamptz)
 RETURNS void
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public','pg_temp'
AS $fn$
DECLARE
  v_art publication_articles%ROWTYPE;
  v_earlier int;
  v_gate jsonb;
  v_cadence jsonb;
BEGIN
  v_art := _pub_lock_run(p_run_id, p_article_id, p_lock_token);
  IF v_art.status <> 'live_check' THEN
    RAISE EXCEPTION 'cannot complete: status is %, expected live_check', v_art.status;
  END IF;
  IF p_final_title IS NULL OR p_slug IS NULL OR p_content_hash IS NULL
     OR p_deployment_id IS NULL OR p_live_url IS NULL OR p_published_at IS NULL THEN
    RAISE EXCEPTION 'complete: all publish fields required';
  END IF;
  IF p_slug !~ '^[a-z0-9]+(?:-[a-z0-9]+)*$' THEN
    RAISE EXCEPTION 'invalid slug %', p_slug;
  END IF;
  IF p_published_at > transaction_timestamp() THEN
    RAISE EXCEPTION 'published_at % is in the future', p_published_at;
  END IF;

  SELECT count(*) INTO v_earlier FROM publication_articles
    WHERE project_id = v_art.project_id
      AND planning_number < v_art.planning_number
      AND status <> 'published';
  IF v_earlier > 0 THEN
    RAISE EXCEPTION 'sequence violation: % earlier articles still unpublished', v_earlier;
  END IF;

  v_gate := public._pub_qa_gate(p_article_id, p_run_id,
              ARRAY['content','preview','live']::publication_qa_stage[]);
  IF (v_gate->>'ok')::boolean IS DISTINCT FROM true THEN
    RAISE EXCEPTION 'qa_gate_failed: %', v_gate::text;
  END IF;

  v_cadence := public._pub_evaluate_cadence(v_art.project_id, v_art.planning_number,
                                            NULL::publication_scheduler_slot, false);
  IF (v_cadence->>'ok')::boolean IS DISTINCT FROM true THEN
    RAISE EXCEPTION 'cadence recheck failed at completion: %', v_cadence::text;
  END IF;

  UPDATE publication_articles SET status='published',
    final_title=p_final_title, slug=p_slug, content_hash=p_content_hash,
    deployment_id=p_deployment_id, live_url=p_live_url, published_at=p_published_at,
    lock_token=NULL, locked_at=NULL, lock_expires_at=NULL, locked_by=NULL,
    active_run_id=NULL, last_error_category=NULL, last_error_summary=NULL, updated_at=now()
   WHERE id=p_article_id;
  UPDATE publication_runs SET final_status='published', current_step='complete',
    finished_at=now(), updated_at=now() WHERE id=p_run_id;
  INSERT INTO publication_events(project_id, article_id, run_id, event_type, actor_type, actor_id, payload)
    VALUES (v_art.project_id, p_article_id, p_run_id, 'article_published','automation', auth.uid(),
      jsonb_build_object('slug',p_slug,'live_url',p_live_url,'cadence',v_cadence));
END; $fn$;

-- 8. Security cleanup ---------------------------------------
DROP FUNCTION IF EXISTS public._debug_recovery();
DROP FUNCTION IF EXISTS public._debug_runs();
DROP FUNCTION IF EXISTS public._run_migb_tests();

REVOKE ALL ON FUNCTION public.bootstrap_first_admin(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.bootstrap_first_admin(text) FROM anon;
GRANT EXECUTE ON FUNCTION public.bootstrap_first_admin(text) TO authenticated;

REVOKE ALL ON FUNCTION public.import_publication_planning(text, jsonb, boolean) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.import_publication_planning(text, jsonb, boolean) FROM anon;
GRANT EXECUTE ON FUNCTION public.import_publication_planning(text, jsonb, boolean) TO authenticated;
