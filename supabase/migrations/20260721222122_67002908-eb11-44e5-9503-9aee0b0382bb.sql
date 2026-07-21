
-- Patch: replace actor_type 'runner' -> 'automation' (allowed by check constraint)
CREATE OR REPLACE FUNCTION public.claim_next_publication_run(
  p_project_key text,
  p_trigger publication_trigger_type,
  p_scheduler_slot publication_scheduler_slot DEFAULT NULL,
  p_lock_ttl_seconds integer DEFAULT 300
)
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp
AS $$
DECLARE
  v_proj publication_projects%ROWTYPE;
  v_art  publication_articles%ROWTYPE;
  v_run_id uuid; v_lock uuid; v_expires timestamptz;
  v_published_count integer; v_parent_run uuid;
  v_needs_recovery boolean := false;
  v_recovery_target publication_article_status;
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
      stopped_at=coalesce(stopped_at,now()), updated_at=now()
    WHERE id=v_proj.id;
    INSERT INTO publication_runs(project_id, trigger_type, scheduler_slot, current_step, final_status,
      finished_at, disposition, reason_code, created_by)
    VALUES (v_proj.id, p_trigger, p_scheduler_slot, 'claim','stopped_noop',
      now(),'stopped_noop','all_180_published', auth.uid())
    RETURNING id INTO v_run_id;
    RETURN jsonb_build_object('disposition','stopped_noop','run_id',v_run_id,'reason','all_180_published');
  END IF;

  SELECT * INTO v_art FROM publication_articles
   WHERE project_id=v_proj.id AND status<>'published'
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
      'blocked', now(),'sequence_blocked','sequence_head_blocked', auth.uid())
    RETURNING id INTO v_run_id;
    RETURN jsonb_build_object('disposition','sequence_blocked','run_id',v_run_id,
      'article_id',v_art.id,'planning_number',v_art.planning_number,'article_status',v_art.status);
  END IF;

  IF v_art.lock_token IS NOT NULL AND v_art.lock_expires_at > now() THEN
    INSERT INTO publication_runs(project_id, article_id, trigger_type, scheduler_slot, current_step,
      final_status, finished_at, disposition, reason_code, created_by)
    VALUES (v_proj.id, v_art.id, p_trigger, p_scheduler_slot, 'claim',
      'blocked', now(),'lock_conflict','active_lock_present', auth.uid())
    RETURNING id INTO v_run_id;
    RETURN jsonb_build_object('disposition','lock_conflict','run_id',v_run_id,
      'article_id',v_art.id,'planning_number',v_art.planning_number,'lock_expires_at',v_art.lock_expires_at);
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
      'original_title', v_art.original_title))
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
END;
$$;

REVOKE EXECUTE ON FUNCTION public.claim_next_publication_run(text, publication_trigger_type, publication_scheduler_slot, integer) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.claim_next_publication_run(text, publication_trigger_type, publication_scheduler_slot, integer) TO authenticated, service_role;

-- Patch advance_publication_run event actor
CREATE OR REPLACE FUNCTION public.advance_publication_run(
  p_run_id uuid, p_article_id uuid, p_lock_token uuid,
  p_from_status publication_article_status, p_to_status publication_article_status,
  p_step_key text, p_evidence jsonb DEFAULT '{}'::jsonb
) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp
AS $$
DECLARE v_art publication_articles%ROWTYPE; v_attempt smallint; v_allowed boolean;
BEGIN
  IF p_step_key IS NULL OR length(p_step_key)=0 THEN RAISE EXCEPTION 'step_key required'; END IF;
  v_art := _pub_lock_run(p_run_id, p_article_id, p_lock_token);
  v_allowed := (p_from_status, p_to_status) IN (
    ('locked','drafting'),('drafting','validating'),('validating','building'),
    ('building','preview_check'),('preview_check','publishing'),('publishing','live_check'));
  IF NOT v_allowed THEN RAISE EXCEPTION 'invalid transition % -> %', p_from_status, p_to_status; END IF;
  IF v_art.status <> p_from_status THEN RAISE EXCEPTION 'article status is % not %', v_art.status, p_from_status; END IF;
  SELECT coalesce(max(attempt_number),0)+1 INTO v_attempt
    FROM publication_run_step_attempts WHERE run_id=p_run_id AND step_key=p_step_key;
  INSERT INTO publication_run_step_attempts(project_id, article_id, run_id, step_key, attempt_number, result, finished_at)
    VALUES (v_art.project_id, p_article_id, p_run_id, p_step_key, v_attempt, 'success', now());
  UPDATE publication_articles SET status=p_to_status, updated_at=now() WHERE id=p_article_id;
  UPDATE publication_runs SET current_step=p_step_key, updated_at=now() WHERE id=p_run_id;
  INSERT INTO publication_events(project_id, article_id, run_id, event_type, actor_type, actor_id, payload)
    VALUES (v_art.project_id, p_article_id, p_run_id, 'step_advanced','automation', auth.uid(),
      jsonb_build_object('from',p_from_status,'to',p_to_status,'step',p_step_key,'evidence',p_evidence));
END; $$;
REVOKE EXECUTE ON FUNCTION public.advance_publication_run(uuid,uuid,uuid,publication_article_status,publication_article_status,text,jsonb) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.advance_publication_run(uuid,uuid,uuid,publication_article_status,publication_article_status,text,jsonb) TO authenticated, service_role;

-- Patch complete_publication_success event actor
CREATE OR REPLACE FUNCTION public.complete_publication_success(
  p_run_id uuid, p_article_id uuid, p_lock_token uuid,
  p_final_title text, p_slug text, p_content_hash text,
  p_deployment_id text, p_live_url text, p_published_at timestamptz
) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp
AS $$
DECLARE v_art publication_articles%ROWTYPE;
BEGIN
  v_art := _pub_lock_run(p_run_id, p_article_id, p_lock_token);
  IF v_art.status <> 'live_check' THEN RAISE EXCEPTION 'cannot complete: status is %, expected live_check', v_art.status; END IF;
  IF p_final_title IS NULL OR p_slug IS NULL OR p_content_hash IS NULL OR p_deployment_id IS NULL OR p_live_url IS NULL OR p_published_at IS NULL THEN
    RAISE EXCEPTION 'complete: all publish fields required'; END IF;
  IF p_slug !~ '^[a-z0-9]+(?:-[a-z0-9]+)*$' THEN RAISE EXCEPTION 'invalid slug %', p_slug; END IF;
  IF p_published_at > transaction_timestamp() THEN RAISE EXCEPTION 'published_at % is in the future', p_published_at; END IF;

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
      jsonb_build_object('slug',p_slug,'live_url',p_live_url));
END; $$;
REVOKE EXECUTE ON FUNCTION public.complete_publication_success(uuid,uuid,uuid,text,text,text,text,text,timestamptz) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.complete_publication_success(uuid,uuid,uuid,text,text,text,text,text,timestamptz) TO authenticated, service_role;

-- Patch complete_publication_failure event actor
CREATE OR REPLACE FUNCTION public.complete_publication_failure(
  p_run_id uuid, p_article_id uuid, p_lock_token uuid,
  p_step_key text, p_disposition text, p_error_category text, p_reason_code text,
  p_error_summary text, p_error_details jsonb DEFAULT '{}'::jsonb, p_backoff_seconds integer DEFAULT NULL
) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp
AS $$
DECLARE v_art publication_articles%ROWTYPE; v_proj publication_projects%ROWTYPE;
        v_attempt smallint; v_prior_fail smallint; v_max smallint;
        v_new_article_status publication_article_status; v_new_run_status publication_run_status;
        v_step_result text; v_exhausted boolean := false;
BEGIN
  IF p_step_key IS NULL OR p_disposition IS NULL OR p_error_category IS NULL OR p_error_summary IS NULL THEN
    RAISE EXCEPTION 'missing required arguments'; END IF;
  IF p_disposition NOT IN ('retry','failed','blocked') THEN
    RAISE EXCEPTION 'invalid disposition %', p_disposition; END IF;
  v_art := _pub_lock_run(p_run_id, p_article_id, p_lock_token);
  SELECT * INTO v_proj FROM publication_projects WHERE id=v_art.project_id;
  v_max := v_proj.max_step_attempts;
  PERFORM 1 FROM publication_error_categories WHERE key=p_error_category;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknown error_category %', p_error_category; END IF;
  IF p_reason_code IS NOT NULL THEN
    PERFORM 1 FROM publication_run_reason_codes WHERE code=p_reason_code;
    IF NOT FOUND THEN RAISE EXCEPTION 'unknown reason_code %', p_reason_code; END IF;
  END IF;
  SELECT coalesce(max(attempt_number),0)+1 INTO v_attempt
    FROM publication_run_step_attempts WHERE run_id=p_run_id AND step_key=p_step_key;
  SELECT count(*) INTO v_prior_fail
    FROM publication_run_step_attempts WHERE article_id=p_article_id AND step_key=p_step_key AND result='failure';
  IF p_disposition='retry' AND v_prior_fail+1 >= v_max THEN v_exhausted := true; END IF;

  IF p_disposition='blocked' THEN
    v_new_article_status:='blocked'; v_new_run_status:='blocked'; v_step_result:='failure';
  ELSIF p_disposition='failed' OR v_exhausted THEN
    v_new_article_status:='failed'; v_new_run_status:='failed'; v_step_result:='failure';
  ELSE
    v_new_article_status:='retry_pending'; v_new_run_status:='retry_pending'; v_step_result:='retry_pending';
  END IF;

  INSERT INTO publication_run_step_attempts(project_id, article_id, run_id, step_key, attempt_number,
      result, error_category, error_summary, backoff_hint_seconds, finished_at)
    VALUES (v_art.project_id, p_article_id, p_run_id, p_step_key, v_attempt,
      v_step_result, p_error_category, p_error_summary, p_backoff_seconds, now());

  UPDATE publication_articles SET status=v_new_article_status,
    lock_token=NULL, locked_at=NULL, lock_expires_at=NULL, locked_by=NULL, active_run_id=NULL,
    retry_count = CASE WHEN v_new_article_status='retry_pending' THEN retry_count+1 ELSE retry_count END,
    last_error_category=p_error_category, last_error_summary=p_error_summary, updated_at=now()
   WHERE id=p_article_id;

  UPDATE publication_runs SET final_status=v_new_run_status, current_step=p_step_key,
    finished_at=now(), error_category=p_error_category, reason_code=p_reason_code,
    error_summary=p_error_summary, error_details=coalesce(p_error_details,'{}'::jsonb),
    disposition = CASE WHEN v_new_run_status='blocked' THEN 'recovery_blocked'::publication_run_disposition ELSE NULL END,
    updated_at=now() WHERE id=p_run_id;

  INSERT INTO publication_events(project_id, article_id, run_id, event_type, actor_type, actor_id, reason, payload)
    VALUES (v_art.project_id, p_article_id, p_run_id,
      CASE v_new_run_status WHEN 'retry_pending' THEN 'run_retry_pending' WHEN 'failed' THEN 'run_failed' WHEN 'blocked' THEN 'run_blocked' END,
      'automation', auth.uid(), p_error_category,
      jsonb_build_object('step',p_step_key,'summary',p_error_summary,'exhausted',v_exhausted));

  RETURN jsonb_build_object('run_status',v_new_run_status,'article_status',v_new_article_status,
    'step_attempt',v_attempt,'exhausted',v_exhausted);
END; $$;
REVOKE EXECUTE ON FUNCTION public.complete_publication_failure(uuid,uuid,uuid,text,text,text,text,text,jsonb,integer) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.complete_publication_failure(uuid,uuid,uuid,text,text,text,text,text,jsonb,integer) TO authenticated, service_role;
