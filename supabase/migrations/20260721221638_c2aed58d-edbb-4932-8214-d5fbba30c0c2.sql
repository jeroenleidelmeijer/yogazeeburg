
-- =========================================================================
-- MIGRATION B: Hardening + State-Machine RPCs
-- =========================================================================

-- ---------- 1. HARDENING: Revoke over-broad anon/authenticated grants ----
REVOKE ALL ON TABLE
  public.publication_error_categories,
  public.publication_run_reason_codes,
  public.publication_run_step_attempts
FROM anon;

REVOKE ALL ON TABLE
  public.publication_error_categories,
  public.publication_run_reason_codes,
  public.publication_run_step_attempts
FROM authenticated;

-- authenticated needs SELECT so RLS admin-read policies + FK checks work.
GRANT SELECT ON TABLE
  public.publication_error_categories,
  public.publication_run_reason_codes,
  public.publication_run_step_attempts
TO authenticated;

-- service_role keeps ALL.
GRANT ALL ON TABLE
  public.publication_error_categories,
  public.publication_run_reason_codes,
  public.publication_run_step_attempts
TO service_role;

-- ---------- 2. SCHEMA ADDITIONS on publication_runs ----------------------
ALTER TABLE public.publication_runs
  ADD COLUMN IF NOT EXISTS disposition public.publication_run_disposition,
  ADD COLUMN IF NOT EXISTS reason_code text;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'publication_runs_reason_code_fkey'
  ) THEN
    ALTER TABLE public.publication_runs
      ADD CONSTRAINT publication_runs_reason_code_fkey
      FOREIGN KEY (reason_code) REFERENCES public.publication_run_reason_codes(code);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'publication_runs_error_category_fkey'
  ) THEN
    ALTER TABLE public.publication_runs
      ADD CONSTRAINT publication_runs_error_category_fkey
      FOREIGN KEY (error_category) REFERENCES public.publication_error_categories(key);
  END IF;
END $$;

-- ---------- 3. HELPER: internal admin/service authorization --------------
CREATE OR REPLACE FUNCTION public._pub_require_admin(p_project_id uuid)
RETURNS void
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- service_role bypasses via SECURITY DEFINER context, but we still gate
  -- by explicit membership in publication_admins for the target project.
  -- service_role callers set auth.uid() to NULL; we allow them through.
  IF auth.uid() IS NULL THEN
    -- Treat as trusted server-side caller (service_role via server fn),
    -- but only when session role is service_role. Otherwise deny.
    IF current_setting('request.jwt.claims', true) IS NULL
       OR (current_setting('request.jwt.claims', true)::jsonb ->> 'role') <> 'service_role' THEN
      -- Also allow when the DB session is directly service_role (edge/admin client)
      IF (SELECT current_user) NOT IN ('service_role','postgres') THEN
        RAISE EXCEPTION 'unauthorized: authentication required';
      END IF;
    END IF;
    RETURN;
  END IF;

  IF NOT public.is_publication_admin(p_project_id) THEN
    RAISE EXCEPTION 'unauthorized: admin required for project %', p_project_id;
  END IF;
END;
$$;

REVOKE EXECUTE ON FUNCTION public._pub_require_admin(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public._pub_require_admin(uuid) TO authenticated, service_role;

-- ---------- 4. RPC: claim_next_publication_run ---------------------------
CREATE OR REPLACE FUNCTION public.claim_next_publication_run(
  p_project_key text,
  p_trigger publication_trigger_type,
  p_scheduler_slot publication_scheduler_slot DEFAULT NULL,
  p_lock_ttl_seconds integer DEFAULT 300
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_proj   public.publication_projects%ROWTYPE;
  v_art    public.publication_articles%ROWTYPE;
  v_run_id uuid;
  v_lock   uuid;
  v_expires timestamptz;
  v_published_count integer;
  v_parent_run uuid;
  v_disposition publication_run_disposition;
  v_reason text;
  v_needs_recovery boolean := false;
  v_recovery_target publication_article_status;
BEGIN
  IF p_lock_ttl_seconds IS NULL OR p_lock_ttl_seconds < 30 OR p_lock_ttl_seconds > 3600 THEN
    RAISE EXCEPTION 'invalid lock ttl';
  END IF;

  SELECT * INTO v_proj FROM public.publication_projects
    WHERE project_key = p_project_key FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknown project %', p_project_key; END IF;

  PERFORM public._pub_require_admin(v_proj.id);

  -- Configuration / stopped no-ops -----------------------------------------
  IF v_proj.publication_stopped THEN
    INSERT INTO public.publication_runs
      (project_id, trigger_type, scheduler_slot, current_step, final_status,
       finished_at, disposition, reason_code, source_snapshot, created_by)
    VALUES (v_proj.id, p_trigger, p_scheduler_slot, 'claim', 'stopped_noop',
            now(), 'stopped_noop', 'publication_stopped',
            jsonb_build_object('stopped_reason', v_proj.stopped_reason),
            auth.uid())
    RETURNING id INTO v_run_id;
    RETURN jsonb_build_object('disposition','stopped_noop','run_id',v_run_id);
  END IF;

  IF p_trigger = 'scheduled' AND NOT v_proj.automation_enabled THEN
    INSERT INTO public.publication_runs
      (project_id, trigger_type, scheduler_slot, current_step, final_status,
       finished_at, disposition, reason_code, created_by)
    VALUES (v_proj.id, p_trigger, p_scheduler_slot, 'claim', 'configuration_blocked',
            now(), 'configuration_blocked', 'automation_disabled', auth.uid())
    RETURNING id INTO v_run_id;
    RETURN jsonb_build_object('disposition','configuration_blocked','run_id',v_run_id);
  END IF;

  -- All 180 published?  Then set stop and return stopped_noop --------------
  SELECT count(*) INTO v_published_count
    FROM public.publication_articles
   WHERE project_id = v_proj.id AND status = 'published';

  IF v_published_count >= 180 THEN
    UPDATE public.publication_projects
      SET publication_stopped = true,
          stopped_reason = coalesce(stopped_reason,'all_180_published'),
          stopped_at = coalesce(stopped_at, now()),
          updated_at = now()
    WHERE id = v_proj.id;

    INSERT INTO public.publication_runs
      (project_id, trigger_type, scheduler_slot, current_step, final_status,
       finished_at, disposition, reason_code, created_by)
    VALUES (v_proj.id, p_trigger, p_scheduler_slot, 'claim', 'stopped_noop',
            now(), 'stopped_noop', 'all_180_published', auth.uid())
    RETURNING id INTO v_run_id;
    RETURN jsonb_build_object('disposition','stopped_noop','run_id',v_run_id,
                              'reason','all_180_published');
  END IF;

  -- Sequence-head: lowest planning_number NOT published --------------------
  SELECT * INTO v_art
    FROM public.publication_articles
   WHERE project_id = v_proj.id AND status <> 'published'
   ORDER BY planning_number ASC
   FOR UPDATE
   LIMIT 1;

  IF NOT FOUND THEN
    -- Reconcile: mark stopped
    UPDATE public.publication_projects SET publication_stopped=true,
      stopped_reason=coalesce(stopped_reason,'all_180_published'),
      stopped_at=coalesce(stopped_at,now()), updated_at=now()
      WHERE id=v_proj.id;
    RETURN jsonb_build_object('disposition','stopped_noop','reason','all_180_published');
  END IF;

  -- Sequence-head disposition analysis -------------------------------------
  IF v_art.status IN ('failed','blocked') THEN
    INSERT INTO public.publication_runs
      (project_id, article_id, trigger_type, scheduler_slot, current_step,
       final_status, finished_at, disposition, reason_code, created_by)
    VALUES (v_proj.id, v_art.id, p_trigger, p_scheduler_slot, 'claim',
            'blocked', now(), 'sequence_blocked', 'sequence_head_blocked', auth.uid())
    RETURNING id INTO v_run_id;
    RETURN jsonb_build_object('disposition','sequence_blocked','run_id',v_run_id,
                              'article_id',v_art.id,'planning_number',v_art.planning_number,
                              'article_status',v_art.status);
  END IF;

  -- In-progress with valid lock => lock_conflict noop
  IF v_art.lock_token IS NOT NULL AND v_art.lock_expires_at > now() THEN
    INSERT INTO public.publication_runs
      (project_id, article_id, trigger_type, scheduler_slot, current_step,
       final_status, finished_at, disposition, reason_code, created_by)
    VALUES (v_proj.id, v_art.id, p_trigger, p_scheduler_slot, 'claim',
            'blocked', now(), 'lock_conflict', 'active_lock_present', auth.uid())
    RETURNING id INTO v_run_id;
    RETURN jsonb_build_object('disposition','lock_conflict','run_id',v_run_id,
                              'article_id',v_art.id,'planning_number',v_art.planning_number,
                              'lock_expires_at',v_art.lock_expires_at);
  END IF;

  -- Recovery matrix (only when lock is stale OR status is in_progress w/o lock)
  IF v_art.status IN ('drafting','validating','building','preview_check','publishing','live_check','retry_pending','locked') THEN
    v_parent_run := v_art.active_run_id;
    IF v_art.status IN ('drafting','validating','locked','retry_pending') THEN
      v_recovery_target := 'planned'::publication_article_status;
      v_needs_recovery := true;
    ELSIF v_art.status IN ('building','preview_check') THEN
      -- RESUME_PREVIEW: safe to reset to planned; content re-derived deterministically
      v_recovery_target := 'planned'::publication_article_status;
      v_needs_recovery := true;
    ELSIF v_art.status = 'live_check' THEN
      -- RESUME_LIVE_ONLY: safe to reset; live check is idempotent
      v_recovery_target := 'planned'::publication_article_status;
      v_needs_recovery := true;
    ELSIF v_art.status = 'publishing' THEN
      -- AMBIGUOUS: recovery_blocked. Record run, do NOT claim, do NOT re-lock.
      -- Close any prior running run linked to this article.
      UPDATE public.publication_runs
        SET final_status = 'blocked', finished_at = now(),
            disposition = 'recovery_blocked',
            error_category = 'recovery_required',
            reason_code = 'recovery_ambiguous',
            error_summary = coalesce(error_summary,'stale lock in publishing'),
            current_step = coalesce(current_step,'publishing'),
            updated_at = now()
        WHERE id = v_art.active_run_id AND final_status = 'running';

      INSERT INTO public.publication_runs
        (project_id, article_id, parent_run_id, trigger_type, scheduler_slot,
         current_step, final_status, finished_at, disposition,
         error_category, reason_code, error_summary, created_by)
      VALUES (v_proj.id, v_art.id, v_parent_run, p_trigger, p_scheduler_slot,
              'recovery', 'blocked', now(), 'recovery_blocked',
              'recovery_required', 'recovery_ambiguous',
              'ambiguous recovery: previous run left article in publishing state',
              auth.uid())
      RETURNING id INTO v_run_id;

      -- Set article to blocked; clear stale lock but do NOT reset to planned.
      UPDATE public.publication_articles
        SET status = 'blocked',
            lock_token = NULL, locked_at = NULL, lock_expires_at = NULL, locked_by = NULL,
            active_run_id = NULL,
            last_error_category = 'recovery_required',
            last_error_summary = 'ambiguous recovery from publishing state',
            updated_at = now()
      WHERE id = v_art.id;

      INSERT INTO public.publication_events(project_id, article_id, run_id, event_type,
                                            actor_type, actor_id, reason)
        VALUES (v_proj.id, v_art.id, v_run_id, 'recovery_ambiguous_blocked',
                'runner', auth.uid(), 'stale lock in publishing');

      RETURN jsonb_build_object('disposition','recovery_blocked','run_id',v_run_id,
                                'article_id',v_art.id,'planning_number',v_art.planning_number,
                                'parent_run_id',v_parent_run);
    END IF;
  END IF;

  -- Perform recovery reset if flagged
  IF v_needs_recovery THEN
    UPDATE public.publication_runs
      SET final_status = 'cancelled', finished_at = now(),
          current_step = coalesce(current_step,'recovery_reset'),
          reason_code = 'stale_lock_recovered', updated_at = now()
    WHERE id = v_art.active_run_id AND final_status = 'running';

    UPDATE public.publication_articles
      SET status = v_recovery_target,
          lock_token = NULL, locked_at = NULL, lock_expires_at = NULL, locked_by = NULL,
          active_run_id = NULL,
          updated_at = now()
      WHERE id = v_art.id;

    -- refresh row for claim
    SELECT * INTO v_art FROM public.publication_articles WHERE id = v_art.id FOR UPDATE;
  END IF;

  -- Claim ------------------------------------------------------------------
  v_lock := gen_random_uuid();
  v_expires := now() + make_interval(secs => p_lock_ttl_seconds);

  INSERT INTO public.publication_runs
    (project_id, article_id, trigger_type, scheduler_slot,
     current_step, final_status, disposition, phase, created_by, source_snapshot)
  VALUES (v_proj.id, v_art.id, p_trigger, p_scheduler_slot,
          'claim', 'running', 'claimed', v_art.phase, auth.uid(),
          jsonb_build_object('planning_number', v_art.planning_number,
                             'cluster', v_art.cluster,
                             'cta_variant', v_art.cta_variant,
                             'original_title', v_art.original_title))
  RETURNING id INTO v_run_id;

  UPDATE public.publication_articles
    SET status = 'locked',
        lock_token = v_lock,
        locked_at = now(),
        lock_expires_at = v_expires,
        locked_by = coalesce(auth.uid()::text,'service_role'),
        active_run_id = v_run_id,
        started_at = coalesce(started_at, now()),
        updated_at = now()
  WHERE id = v_art.id;

  INSERT INTO public.publication_events(project_id, article_id, run_id, event_type,
                                        actor_type, actor_id, reason)
    VALUES (v_proj.id, v_art.id, v_run_id, 'run_claimed', 'runner', auth.uid(),
            p_trigger::text);

  RETURN jsonb_build_object(
    'disposition','claimed',
    'run_id', v_run_id,
    'article_id', v_art.id,
    'planning_number', v_art.planning_number,
    'lock_token', v_lock,
    'lock_expires_at', v_expires,
    'brief', jsonb_build_object(
      'original_title', v_art.original_title,
      'cluster', v_art.cluster,
      'cta_variant', v_art.cta_variant,
      'phase', v_art.phase,
      'category', v_art.category,
      'primary_keyword', v_art.primary_keyword
    )
  );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.claim_next_publication_run(text, publication_trigger_type, publication_scheduler_slot, integer) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.claim_next_publication_run(text, publication_trigger_type, publication_scheduler_slot, integer) TO authenticated, service_role;

-- ---------- 5. Helper: validate run + lock ------------------------------
CREATE OR REPLACE FUNCTION public._pub_lock_run(
  p_run_id uuid, p_article_id uuid, p_lock_token uuid
) RETURNS public.publication_articles
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp
AS $$
DECLARE v_art public.publication_articles%ROWTYPE;
        v_run public.publication_runs%ROWTYPE;
BEGIN
  IF p_run_id IS NULL OR p_article_id IS NULL OR p_lock_token IS NULL THEN
    RAISE EXCEPTION 'invalid arguments: run_id, article_id, lock_token required';
  END IF;
  SELECT * INTO v_art FROM public.publication_articles WHERE id = p_article_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknown article %', p_article_id; END IF;
  PERFORM public._pub_require_admin(v_art.project_id);
  IF v_art.lock_token IS NULL OR v_art.lock_token <> p_lock_token THEN
    RAISE EXCEPTION 'lock token mismatch for article %', p_article_id;
  END IF;
  IF v_art.lock_expires_at IS NOT NULL AND v_art.lock_expires_at <= now() THEN
    RAISE EXCEPTION 'lock expired for article %', p_article_id;
  END IF;
  IF v_art.active_run_id IS NULL OR v_art.active_run_id <> p_run_id THEN
    RAISE EXCEPTION 'run % does not own article %', p_run_id, p_article_id;
  END IF;
  SELECT * INTO v_run FROM public.publication_runs WHERE id = p_run_id;
  IF NOT FOUND OR v_run.article_id IS DISTINCT FROM p_article_id
     OR v_run.final_status <> 'running' THEN
    RAISE EXCEPTION 'run % not active for article %', p_run_id, p_article_id;
  END IF;
  RETURN v_art;
END;
$$;
REVOKE EXECUTE ON FUNCTION public._pub_lock_run(uuid,uuid,uuid) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public._pub_lock_run(uuid,uuid,uuid) TO authenticated, service_role;

-- ---------- 6. RPC: heartbeat_publication_run ---------------------------
CREATE OR REPLACE FUNCTION public.heartbeat_publication_run(
  p_run_id uuid, p_article_id uuid, p_lock_token uuid,
  p_extend_seconds integer DEFAULT 300
) RETURNS timestamptz
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp
AS $$
DECLARE v_art public.publication_articles%ROWTYPE;
        v_new timestamptz;
BEGIN
  IF p_extend_seconds IS NULL OR p_extend_seconds < 30 OR p_extend_seconds > 3600 THEN
    RAISE EXCEPTION 'invalid extend seconds';
  END IF;
  v_art := public._pub_lock_run(p_run_id, p_article_id, p_lock_token);
  v_new := now() + make_interval(secs => p_extend_seconds);
  UPDATE public.publication_articles
    SET lock_expires_at = v_new, updated_at = now()
    WHERE id = p_article_id;
  RETURN v_new;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.heartbeat_publication_run(uuid,uuid,uuid,integer) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.heartbeat_publication_run(uuid,uuid,uuid,integer) TO authenticated, service_role;

-- ---------- 7. RPC: advance_publication_run -----------------------------
CREATE OR REPLACE FUNCTION public.advance_publication_run(
  p_run_id uuid, p_article_id uuid, p_lock_token uuid,
  p_from_status publication_article_status,
  p_to_status   publication_article_status,
  p_step_key text,
  p_evidence jsonb DEFAULT '{}'::jsonb
) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp
AS $$
DECLARE v_art public.publication_articles%ROWTYPE;
        v_attempt smallint;
        v_allowed boolean;
BEGIN
  IF p_step_key IS NULL OR length(p_step_key)=0 THEN
    RAISE EXCEPTION 'step_key required';
  END IF;

  v_art := public._pub_lock_run(p_run_id, p_article_id, p_lock_token);

  -- Allowed forward transitions (excluding terminal states handled elsewhere)
  v_allowed := (p_from_status, p_to_status) IN (
    ('locked','drafting'),
    ('drafting','validating'),
    ('validating','building'),
    ('building','preview_check'),
    ('preview_check','publishing'),
    ('publishing','live_check')
    -- ('live_check','published') handled by complete_publication_success
  );
  IF NOT v_allowed THEN
    RAISE EXCEPTION 'invalid transition % -> %', p_from_status, p_to_status;
  END IF;
  IF v_art.status <> p_from_status THEN
    RAISE EXCEPTION 'article status is % not %', v_art.status, p_from_status;
  END IF;

  SELECT coalesce(max(attempt_number),0)+1 INTO v_attempt
    FROM public.publication_run_step_attempts
   WHERE run_id = p_run_id AND step_key = p_step_key;

  INSERT INTO public.publication_run_step_attempts
    (project_id, article_id, run_id, step_key, attempt_number, result, finished_at)
  VALUES (v_art.project_id, p_article_id, p_run_id, p_step_key, v_attempt, 'success', now());

  UPDATE public.publication_articles
    SET status = p_to_status, updated_at = now()
    WHERE id = p_article_id;

  UPDATE public.publication_runs
    SET current_step = p_step_key, updated_at = now()
    WHERE id = p_run_id;

  INSERT INTO public.publication_events(project_id, article_id, run_id, event_type,
                                        actor_type, actor_id, payload)
    VALUES (v_art.project_id, p_article_id, p_run_id, 'step_advanced',
            'runner', auth.uid(),
            jsonb_build_object('from', p_from_status, 'to', p_to_status,
                               'step', p_step_key, 'evidence', p_evidence));
END;
$$;
REVOKE EXECUTE ON FUNCTION public.advance_publication_run(uuid,uuid,uuid,publication_article_status,publication_article_status,text,jsonb) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.advance_publication_run(uuid,uuid,uuid,publication_article_status,publication_article_status,text,jsonb) TO authenticated, service_role;

-- ---------- 8. RPC: complete_publication_success ------------------------
CREATE OR REPLACE FUNCTION public.complete_publication_success(
  p_run_id uuid, p_article_id uuid, p_lock_token uuid,
  p_final_title text, p_slug text, p_content_hash text,
  p_deployment_id text, p_live_url text,
  p_published_at timestamptz
) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp
AS $$
DECLARE v_art public.publication_articles%ROWTYPE;
BEGIN
  v_art := public._pub_lock_run(p_run_id, p_article_id, p_lock_token);

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
  -- Zero tolerance for future publish time
  IF p_published_at > transaction_timestamp() THEN
    RAISE EXCEPTION 'published_at % is in the future', p_published_at;
  END IF;

  UPDATE public.publication_articles
    SET status = 'published',
        final_title = p_final_title,
        slug = p_slug,
        content_hash = p_content_hash,
        deployment_id = p_deployment_id,
        live_url = p_live_url,
        published_at = p_published_at,
        lock_token = NULL, locked_at = NULL, lock_expires_at = NULL, locked_by = NULL,
        active_run_id = NULL,
        last_error_category = NULL,
        last_error_summary = NULL,
        updated_at = now()
  WHERE id = p_article_id;

  UPDATE public.publication_runs
    SET final_status = 'published',
        current_step = 'complete',
        finished_at = now(),
        updated_at = now()
  WHERE id = p_run_id;

  INSERT INTO public.publication_events(project_id, article_id, run_id, event_type,
                                        actor_type, actor_id, payload)
    VALUES (v_art.project_id, p_article_id, p_run_id, 'article_published',
            'runner', auth.uid(),
            jsonb_build_object('slug', p_slug, 'live_url', p_live_url));
END;
$$;
REVOKE EXECUTE ON FUNCTION public.complete_publication_success(uuid,uuid,uuid,text,text,text,text,text,timestamptz) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.complete_publication_success(uuid,uuid,uuid,text,text,text,text,text,timestamptz) TO authenticated, service_role;

-- ---------- 9. RPC: complete_publication_failure ------------------------
CREATE OR REPLACE FUNCTION public.complete_publication_failure(
  p_run_id uuid, p_article_id uuid, p_lock_token uuid,
  p_step_key text,
  p_disposition text,              -- 'retry' | 'failed' | 'blocked'
  p_error_category text,
  p_reason_code text,
  p_error_summary text,
  p_error_details jsonb DEFAULT '{}'::jsonb,
  p_backoff_seconds integer DEFAULT NULL
) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp
AS $$
DECLARE v_art public.publication_articles%ROWTYPE;
        v_proj public.publication_projects%ROWTYPE;
        v_attempt smallint;
        v_prior_fail smallint;
        v_max smallint;
        v_new_article_status publication_article_status;
        v_new_run_status publication_run_status;
        v_step_result text;
        v_exhausted boolean := false;
BEGIN
  IF p_step_key IS NULL OR p_disposition IS NULL
     OR p_error_category IS NULL OR p_error_summary IS NULL THEN
    RAISE EXCEPTION 'missing required arguments';
  END IF;
  IF p_disposition NOT IN ('retry','failed','blocked') THEN
    RAISE EXCEPTION 'invalid disposition %', p_disposition;
  END IF;

  v_art := public._pub_lock_run(p_run_id, p_article_id, p_lock_token);
  SELECT * INTO v_proj FROM public.publication_projects WHERE id = v_art.project_id;
  v_max := v_proj.max_step_attempts;

  -- Validate FKs
  PERFORM 1 FROM public.publication_error_categories WHERE key = p_error_category;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknown error_category %', p_error_category; END IF;
  IF p_reason_code IS NOT NULL THEN
    PERFORM 1 FROM public.publication_run_reason_codes WHERE code = p_reason_code;
    IF NOT FOUND THEN RAISE EXCEPTION 'unknown reason_code %', p_reason_code; END IF;
  END IF;

  SELECT coalesce(max(attempt_number),0)+1 INTO v_attempt
    FROM public.publication_run_step_attempts
   WHERE run_id = p_run_id AND step_key = p_step_key;

  -- Prior FAIL count for this step across ALL runs for this article
  SELECT count(*) INTO v_prior_fail
    FROM public.publication_run_step_attempts
   WHERE article_id = p_article_id AND step_key = p_step_key AND result = 'failure';

  IF p_disposition = 'retry' THEN
    IF v_prior_fail + 1 >= v_max THEN
      v_exhausted := true;
    END IF;
  END IF;

  IF p_disposition = 'blocked' THEN
    v_new_article_status := 'blocked'; v_new_run_status := 'blocked';
    v_step_result := 'failure';
  ELSIF p_disposition = 'failed' OR v_exhausted THEN
    v_new_article_status := 'failed';  v_new_run_status := 'failed';
    v_step_result := 'failure';
  ELSE
    v_new_article_status := 'retry_pending'; v_new_run_status := 'retry_pending';
    v_step_result := 'retry_pending';
  END IF;

  INSERT INTO public.publication_run_step_attempts
    (project_id, article_id, run_id, step_key, attempt_number, result,
     error_category, error_summary, backoff_hint_seconds, finished_at)
  VALUES (v_art.project_id, p_article_id, p_run_id, p_step_key, v_attempt,
          v_step_result, p_error_category, p_error_summary, p_backoff_seconds, now());

  UPDATE public.publication_articles
    SET status = v_new_article_status,
        lock_token = NULL, locked_at = NULL, lock_expires_at = NULL, locked_by = NULL,
        active_run_id = NULL,
        retry_count = CASE WHEN v_new_article_status = 'retry_pending'
                           THEN retry_count + 1 ELSE retry_count END,
        last_error_category = p_error_category,
        last_error_summary = p_error_summary,
        updated_at = now()
  WHERE id = p_article_id;

  UPDATE public.publication_runs
    SET final_status = v_new_run_status,
        current_step = p_step_key,
        finished_at = now(),
        error_category = p_error_category,
        reason_code = p_reason_code,
        error_summary = p_error_summary,
        error_details = coalesce(p_error_details,'{}'::jsonb),
        disposition = CASE WHEN v_new_run_status='blocked' THEN 'recovery_blocked'::publication_run_disposition
                           ELSE NULL END,
        updated_at = now()
  WHERE id = p_run_id;

  INSERT INTO public.publication_events(project_id, article_id, run_id, event_type,
                                        actor_type, actor_id, reason, payload)
    VALUES (v_art.project_id, p_article_id, p_run_id,
            CASE v_new_run_status
              WHEN 'retry_pending' THEN 'run_retry_pending'
              WHEN 'failed' THEN 'run_failed'
              WHEN 'blocked' THEN 'run_blocked' END,
            'runner', auth.uid(), p_error_category,
            jsonb_build_object('step', p_step_key, 'summary', p_error_summary,
                               'exhausted', v_exhausted));

  RETURN jsonb_build_object(
    'run_status', v_new_run_status,
    'article_status', v_new_article_status,
    'step_attempt', v_attempt,
    'exhausted', v_exhausted
  );
END;
$$;
REVOKE EXECUTE ON FUNCTION public.complete_publication_failure(uuid,uuid,uuid,text,text,text,text,text,jsonb,integer) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.complete_publication_failure(uuid,uuid,uuid,text,text,text,text,text,jsonb,integer) TO authenticated, service_role;

-- ---------- 10. RPC: mark_notification_result ---------------------------
CREATE OR REPLACE FUNCTION public.mark_notification_result(
  p_notification_id uuid,
  p_idempotency_key text,
  p_new_status publication_notification_status,
  p_external_message_id text DEFAULT NULL,
  p_error text DEFAULT NULL
) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp
AS $$
DECLARE v_n public.publication_notifications%ROWTYPE;
        v_allowed boolean;
BEGIN
  IF p_notification_id IS NULL OR p_idempotency_key IS NULL OR p_new_status IS NULL THEN
    RAISE EXCEPTION 'missing required arguments';
  END IF;
  SELECT * INTO v_n FROM public.publication_notifications
    WHERE id = p_notification_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknown notification %', p_notification_id; END IF;
  IF v_n.idempotency_key <> p_idempotency_key THEN
    RAISE EXCEPTION 'idempotency key mismatch';
  END IF;
  PERFORM public._pub_require_admin(v_n.project_id);

  -- Idempotent no-op on identical terminal state
  IF v_n.status = 'sent' AND p_new_status = 'sent' THEN
    RETURN jsonb_build_object('status','sent','idempotent',true,
                              'external_message_id', v_n.external_message_id);
  END IF;

  -- sent is terminal: never fall back to sending/failed
  IF v_n.status = 'sent' AND p_new_status IN ('sending','failed','pending') THEN
    RAISE EXCEPTION 'notification already sent; cannot transition to %', p_new_status;
  END IF;

  v_allowed := (v_n.status, p_new_status) IN (
    ('not_started','pending'),('not_started','sending'),
    ('pending','sending'),('pending','failed'),
    ('sending','sent'),('sending','failed'),('sending','pending'),
    ('failed','sending'),('failed','pending')
  );
  IF NOT v_allowed THEN
    RAISE EXCEPTION 'invalid notification transition % -> %', v_n.status, p_new_status;
  END IF;

  UPDATE public.publication_notifications
    SET status = p_new_status,
        external_message_id = coalesce(p_external_message_id, external_message_id),
        sent_at = CASE WHEN p_new_status='sent' THEN coalesce(sent_at,now()) ELSE sent_at END,
        attempt_count = CASE WHEN p_new_status='sending'
                             THEN attempt_count + 1 ELSE attempt_count END,
        last_error = CASE WHEN p_new_status='failed' THEN p_error ELSE last_error END,
        updated_at = now()
  WHERE id = p_notification_id;

  RETURN jsonb_build_object('status', p_new_status,'idempotent', false);
END;
$$;
REVOKE EXECUTE ON FUNCTION public.mark_notification_result(uuid,text,publication_notification_status,text,text) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.mark_notification_result(uuid,text,publication_notification_status,text,text) TO authenticated, service_role;
