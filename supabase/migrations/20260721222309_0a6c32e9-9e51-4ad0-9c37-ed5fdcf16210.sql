
INSERT INTO public.publication_run_reason_codes(code, description) VALUES
  ('stale_lock_recovered','Stale lock recovered; the prior run was cancelled and the article reset to planned for a fresh claim.')
ON CONFLICT (code) DO NOTHING;

CREATE OR REPLACE FUNCTION public.claim_next_publication_run(
  p_project_key text, p_trigger publication_trigger_type,
  p_scheduler_slot publication_scheduler_slot DEFAULT NULL,
  p_lock_ttl_seconds integer DEFAULT 300
) RETURNS jsonb
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
      stopped_at=coalesce(stopped_at,now()), updated_at=now() WHERE id=v_proj.id;
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
END; $$;
REVOKE EXECUTE ON FUNCTION public.claim_next_publication_run(text, publication_trigger_type, publication_scheduler_slot, integer) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.claim_next_publication_run(text, publication_trigger_type, publication_scheduler_slot, integer) TO authenticated, service_role;
