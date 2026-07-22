-- Fix retry/exhaustion bug: cumulative attempt tracking by (article_id, step_key)
-- and strict failure/success semantics for step_attempts.result.

CREATE OR REPLACE FUNCTION public.advance_publication_run(
  p_run_id uuid, p_article_id uuid, p_lock_token uuid,
  p_from_status publication_article_status, p_to_status publication_article_status,
  p_step_key text, p_evidence jsonb DEFAULT '{}'::jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE v_art publication_articles%ROWTYPE; v_attempt smallint; v_allowed boolean;
BEGIN
  IF p_step_key IS NULL OR length(p_step_key)=0 THEN RAISE EXCEPTION 'step_key required'; END IF;
  v_art := _pub_lock_run(p_run_id, p_article_id, p_lock_token);
  v_allowed := (p_from_status, p_to_status) IN (
    ('locked','drafting'),('drafting','validating'),('validating','building'),
    ('building','preview_check'),('preview_check','publishing'),('publishing','live_check'));
  IF NOT v_allowed THEN RAISE EXCEPTION 'invalid transition % -> %', p_from_status, p_to_status; END IF;
  IF v_art.status <> p_from_status THEN RAISE EXCEPTION 'article status is % not %', v_art.status, p_from_status; END IF;
  -- Cumulative attempt across all runs for this article + step
  SELECT coalesce(max(attempt_number),0)+1 INTO v_attempt
    FROM publication_run_step_attempts
    WHERE article_id=p_article_id AND step_key=p_step_key;
  INSERT INTO publication_run_step_attempts(project_id, article_id, run_id, step_key, attempt_number, result, finished_at)
    VALUES (v_art.project_id, p_article_id, p_run_id, p_step_key, v_attempt, 'success', now());
  UPDATE publication_articles SET status=p_to_status, updated_at=now() WHERE id=p_article_id;
  UPDATE publication_runs SET current_step=p_step_key, updated_at=now() WHERE id=p_run_id;
  INSERT INTO publication_events(project_id, article_id, run_id, event_type, actor_type, actor_id, payload)
    VALUES (v_art.project_id, p_article_id, p_run_id, 'step_advanced','automation', auth.uid(),
      jsonb_build_object('from',p_from_status,'to',p_to_status,'step',p_step_key,'evidence',p_evidence));
END; $function$;

CREATE OR REPLACE FUNCTION public.complete_publication_failure(
  p_run_id uuid, p_article_id uuid, p_lock_token uuid,
  p_step_key text, p_disposition text, p_error_category text,
  p_reason_code text, p_error_summary text,
  p_error_details jsonb DEFAULT '{}'::jsonb, p_backoff_seconds integer DEFAULT NULL::integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE v_art publication_articles%ROWTYPE; v_proj publication_projects%ROWTYPE;
        v_attempt smallint; v_prior_fail smallint; v_max smallint;
        v_new_article_status publication_article_status; v_new_run_status publication_run_status;
        v_exhausted boolean := false;
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

  -- Cumulative attempt + prior-failure count on (article_id, step_key)
  SELECT coalesce(max(attempt_number),0)+1 INTO v_attempt
    FROM publication_run_step_attempts
    WHERE article_id=p_article_id AND step_key=p_step_key;
  SELECT count(*) INTO v_prior_fail
    FROM publication_run_step_attempts
    WHERE article_id=p_article_id AND step_key=p_step_key AND result='failure';

  IF p_disposition='retry' AND v_prior_fail+1 >= v_max THEN v_exhausted := true; END IF;

  IF p_disposition='blocked' THEN
    v_new_article_status:='blocked'; v_new_run_status:='blocked';
  ELSIF p_disposition='failed' OR v_exhausted THEN
    v_new_article_status:='failed'; v_new_run_status:='failed';
  ELSE
    v_new_article_status:='retry_pending'; v_new_run_status:='retry_pending';
  END IF;

  -- Step-attempt result reflects the technical outcome only: always 'failure' here.
  INSERT INTO publication_run_step_attempts(project_id, article_id, run_id, step_key, attempt_number,
      result, error_category, error_summary, backoff_hint_seconds, finished_at)
    VALUES (v_art.project_id, p_article_id, p_run_id, p_step_key, v_attempt,
      'failure', p_error_category, p_error_summary, p_backoff_seconds, now());

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
      jsonb_build_object('step',p_step_key,'summary',p_error_summary,'exhausted',v_exhausted,'attempt_number',v_attempt));

  RETURN jsonb_build_object('run_status',v_new_run_status,'article_status',v_new_article_status,
    'step_attempt',v_attempt,'exhausted',v_exhausted);
END; $function$;

-- Extend test suite with targeted regression tests for the cumulative attempt/exhaustion contract.
CREATE OR REPLACE FUNCTION public._run_migb_tests()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  proj uuid; a1 uuid; r1 uuid; t1 uuid;
  a2 uuid; r2 uuid; t2 uuid; a3 uuid; r3 uuid; t3 uuid;
  claim jsonb; results jsonb := '[]'::jsonb;
  nid uuid; step_ct int; art_status text; proj_stopped boolean;
  attempts jsonb; results_arr text[]; nums smallint[];
  r_other uuid; a_other uuid; t_other uuid;
  running_ct int;
BEGIN
  PERFORM set_config('request.jwt.claims','{"role":"service_role"}', true);
  INSERT INTO publication_projects(project_key, name)
    VALUES ('TEST-migb-'||substr(gen_random_uuid()::text,1,8), 'TEST fixture')
    RETURNING id INTO proj;
  INSERT INTO publication_articles(project_id, planning_number, original_title)
    SELECT proj, g, 'test-'||g FROM generate_series(1,6) g;

  -- Baseline suite
  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'scheduled',NULL,300) INTO claim;
  results := results || jsonb_build_object('t1_config_blocked', claim->>'disposition' = 'configuration_blocked');

  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'manual',NULL,300) INTO claim;
  results := results || jsonb_build_object('t2_claim_head',
    claim->>'disposition'='claimed' AND (claim->>'planning_number')::int=1);
  r1 := (claim->>'run_id')::uuid; a1 := (claim->>'article_id')::uuid; t1 := (claim->>'lock_token')::uuid;

  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'manual',NULL,300) INTO claim;
  results := results || jsonb_build_object('t3_lock_conflict', claim->>'disposition'='lock_conflict');

  BEGIN PERFORM heartbeat_publication_run(r1,a1,t1,600);
    results := results || jsonb_build_object('t4_heartbeat', true);
  EXCEPTION WHEN OTHERS THEN results := results || jsonb_build_object('t4_heartbeat', false); END;

  BEGIN PERFORM heartbeat_publication_run(r1,a1,gen_random_uuid(),300);
    results := results || jsonb_build_object('t5_bad_token', false);
  EXCEPTION WHEN OTHERS THEN results := results || jsonb_build_object('t5_bad_token', true); END;

  PERFORM advance_publication_run(r1,a1,t1,'locked','drafting','claim','{}'::jsonb);
  SELECT status::text INTO art_status FROM publication_articles WHERE id=a1;
  results := results || jsonb_build_object('t6_advance', art_status='drafting');

  BEGIN PERFORM advance_publication_run(r1,a1,t1,'drafting','publishing','x','{}'::jsonb);
    results := results || jsonb_build_object('t7_invalid_transition', false);
  EXCEPTION WHEN OTHERS THEN results := results || jsonb_build_object('t7_invalid_transition', true); END;

  PERFORM advance_publication_run(r1,a1,t1,'drafting','validating','d','{}'::jsonb);
  PERFORM advance_publication_run(r1,a1,t1,'validating','building','v','{}'::jsonb);
  PERFORM advance_publication_run(r1,a1,t1,'building','preview_check','b','{}'::jsonb);
  PERFORM advance_publication_run(r1,a1,t1,'preview_check','publishing','p','{}'::jsonb);
  PERFORM advance_publication_run(r1,a1,t1,'publishing','live_check','pub','{}'::jsonb);
  SELECT status::text INTO art_status FROM publication_articles WHERE id=a1;
  SELECT count(*) INTO step_ct FROM publication_run_step_attempts WHERE run_id=r1;
  results := results || jsonb_build_object('t8_walk_to_live_check', art_status='live_check' AND step_ct=6);

  BEGIN PERFORM complete_publication_success(r1,a1,t1,'T','test-slug','h','d','https://e.com/x', now()+interval '1 hour');
    results := results || jsonb_build_object('t9_future_publish', false);
  EXCEPTION WHEN OTHERS THEN results := results || jsonb_build_object('t9_future_publish', true); END;

  PERFORM complete_publication_success(r1,a1,t1,'T','test-slug-1','h1','d1','https://e.com/1', now());
  SELECT status::text INTO art_status FROM publication_articles WHERE id=a1;
  results := results || jsonb_build_object('t10_published', art_status='published');

  -- Regression: three cumulative failures on same (article, step) → exhaustion
  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'manual',NULL,300) INTO claim;
  results := results || jsonb_build_object('t11_next_head', (claim->>'planning_number')::int=2);
  r2 := (claim->>'run_id')::uuid; a2 := (claim->>'article_id')::uuid; t2 := (claim->>'lock_token')::uuid;

  PERFORM advance_publication_run(r2,a2,t2,'locked','drafting','claim','{}'::jsonb);
  SELECT complete_publication_failure(r2,a2,t2,'draft','retry','infrastructure_error',NULL,'timeout1','{}'::jsonb,30) INTO claim;
  SELECT status::text INTO art_status FROM publication_articles WHERE id=a2;
  results := results || jsonb_build_object('t12_retry_pending',
    art_status='retry_pending' AND claim->>'run_status'='retry_pending'
    AND (claim->>'step_attempt')::int = 1 AND (claim->>'exhausted')::boolean = false);

  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'retry',NULL,300) INTO claim;
  r2 := (claim->>'run_id')::uuid; a2 := (claim->>'article_id')::uuid; t2 := (claim->>'lock_token')::uuid;
  PERFORM advance_publication_run(r2,a2,t2,'locked','drafting','claim','{}'::jsonb);
  SELECT complete_publication_failure(r2,a2,t2,'draft','retry','infrastructure_error',NULL,'timeout2','{}'::jsonb,NULL) INTO claim;
  results := results || jsonb_build_object('t12b_attempt2',
    (claim->>'step_attempt')::int = 2 AND (claim->>'exhausted')::boolean = false
    AND claim->>'run_status'='retry_pending');

  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'retry',NULL,300) INTO claim;
  r2 := (claim->>'run_id')::uuid; a2 := (claim->>'article_id')::uuid; t2 := (claim->>'lock_token')::uuid;
  PERFORM advance_publication_run(r2,a2,t2,'locked','drafting','claim','{}'::jsonb);
  SELECT complete_publication_failure(r2,a2,t2,'draft','retry','infrastructure_error',NULL,'timeout3','{}'::jsonb,NULL) INTO claim;
  SELECT status::text INTO art_status FROM publication_articles WHERE id=a2;
  results := results || jsonb_build_object('t13_exhausted',
    art_status='failed' AND (claim->>'exhausted')::boolean=true
    AND (claim->>'step_attempt')::int = 3
    AND claim->>'run_status'='failed');

  -- Verify step_attempts snapshot: exactly 3 failures numbered 1,2,3
  SELECT array_agg(result::text ORDER BY attempt_number), array_agg(attempt_number ORDER BY attempt_number)
    INTO results_arr, nums
    FROM publication_run_step_attempts
    WHERE article_id=a2 AND step_key='draft';
  results := results || jsonb_build_object('t13a_step_history',
    results_arr = ARRAY['failure','failure','failure']::text[] AND nums = ARRAY[1,2,3]::smallint[]);

  -- Fourth claim must not resurrect: sequence blocked on failed head
  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'manual',NULL,300) INTO claim;
  results := results || jsonb_build_object('t14_sequence_blocked', claim->>'disposition'='sequence_blocked');

  -- No duplicate running run for a2
  SELECT count(*) INTO running_ct FROM publication_runs WHERE article_id=a2 AND final_status='running';
  results := results || jsonb_build_object('t14b_no_running_run', running_ct=0);

  -- Different step_key starts independently at 1
  UPDATE publication_articles SET status='planned', retry_count=0,
     last_error_category=NULL, last_error_summary=NULL,
     lock_token=NULL, locked_at=NULL, lock_expires_at=NULL, locked_by=NULL, active_run_id=NULL
   WHERE id=a2;
  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'manual',NULL,300) INTO claim;
  r2 := (claim->>'run_id')::uuid; a2 := (claim->>'article_id')::uuid; t2 := (claim->>'lock_token')::uuid;
  PERFORM advance_publication_run(r2,a2,t2,'locked','drafting','claim','{}'::jsonb);
  PERFORM advance_publication_run(r2,a2,t2,'drafting','validating','draft','{}'::jsonb);
  SELECT complete_publication_failure(r2,a2,t2,'validate','retry','infrastructure_error',NULL,'v-fail','{}'::jsonb,NULL) INTO claim;
  results := results || jsonb_build_object('t14c_other_step_independent',
    (claim->>'step_attempt')::int = 1);

  -- Other article's history not counted
  UPDATE publication_articles SET status='planned', retry_count=0,
     last_error_category=NULL, last_error_summary=NULL,
     lock_token=NULL, locked_at=NULL, lock_expires_at=NULL, locked_by=NULL, active_run_id=NULL
   WHERE id=a2;
  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'manual',NULL,300) INTO claim;
  a_other := (claim->>'article_id')::uuid;
  results := results || jsonb_build_object('t14d_other_article_head', a_other = a2);
  r_other := (claim->>'run_id')::uuid; t_other := (claim->>'lock_token')::uuid;
  PERFORM advance_publication_run(r_other,a_other,t_other,'locked','drafting','claim','{}'::jsonb);
  SELECT complete_publication_failure(r_other,a_other,t_other,'draft','retry','infrastructure_error',NULL,'x','{}'::jsonb,NULL) INTO claim;
  results := results || jsonb_build_object('t14e_new_article_independent',
    (claim->>'step_attempt')::int = 1 AND (claim->>'exhausted')::boolean = false);

  -- Recovery-safe retry continues on same (article, step) history
  UPDATE publication_articles SET status='planned', retry_count=0,
     last_error_category=NULL, last_error_summary=NULL,
     lock_token=NULL, locked_at=NULL, lock_expires_at=NULL, locked_by=NULL, active_run_id=NULL
   WHERE id=a_other;
  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'manual',NULL,300) INTO claim;
  r_other := (claim->>'run_id')::uuid; t_other := (claim->>'lock_token')::uuid;
  PERFORM advance_publication_run(r_other,a_other,t_other,'locked','drafting','claim','{}'::jsonb);
  -- Force stale-lock recovery (safe: drafting → planned)
  UPDATE publication_articles SET lock_expires_at = now() - interval '1 min' WHERE id=a_other;
  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'manual',NULL,300) INTO claim;
  r_other := (claim->>'run_id')::uuid; t_other := (claim->>'lock_token')::uuid;
  PERFORM advance_publication_run(r_other,a_other,t_other,'locked','drafting','claim','{}'::jsonb);
  SELECT complete_publication_failure(r_other,a_other,t_other,'draft','retry','infrastructure_error',NULL,'y','{}'::jsonb,NULL) INTO claim;
  results := results || jsonb_build_object('t14f_recovery_safe_continues',
    (claim->>'step_attempt')::int = 2);

  -- Baseline recovery_blocked (ambiguous publishing)
  UPDATE publication_articles SET status='planned', retry_count=0,
     last_error_category=NULL, last_error_summary=NULL,
     lock_token=NULL, locked_at=NULL, lock_expires_at=NULL, locked_by=NULL, active_run_id=NULL
   WHERE id=a_other;
  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'manual',NULL,300) INTO claim;
  r3 := (claim->>'run_id')::uuid; a3 := (claim->>'article_id')::uuid; t3 := (claim->>'lock_token')::uuid;
  PERFORM advance_publication_run(r3,a3,t3,'locked','drafting','claim','{}'::jsonb);
  PERFORM advance_publication_run(r3,a3,t3,'drafting','validating','d','{}'::jsonb);
  PERFORM advance_publication_run(r3,a3,t3,'validating','building','v','{}'::jsonb);
  PERFORM advance_publication_run(r3,a3,t3,'building','preview_check','b','{}'::jsonb);
  PERFORM advance_publication_run(r3,a3,t3,'preview_check','publishing','p','{}'::jsonb);
  UPDATE publication_articles SET lock_expires_at = now() - interval '1 minute' WHERE id=a3;
  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'manual',NULL,300) INTO claim;
  SELECT status::text INTO art_status FROM publication_articles WHERE id=a3;
  results := results || jsonb_build_object('t16_recovery_blocked',
    claim->>'disposition'='recovery_blocked' AND art_status='blocked'
    AND (claim->>'parent_run_id') IS NOT NULL);

  -- Notification idempotency
  INSERT INTO publication_notifications(project_id, notification_type, recipient, subject, idempotency_key, status)
    VALUES (proj,'article_published','x@example.com','s','idem-'||gen_random_uuid()::text,'pending')
    RETURNING id INTO nid;
  PERFORM mark_notification_result(nid,(SELECT idempotency_key FROM publication_notifications WHERE id=nid),'sending');
  PERFORM mark_notification_result(nid,(SELECT idempotency_key FROM publication_notifications WHERE id=nid),'sent','msg-123');
  BEGIN PERFORM mark_notification_result(nid,(SELECT idempotency_key FROM publication_notifications WHERE id=nid),'sent');
    results := results || jsonb_build_object('t17a_idempotent_sent', true);
  EXCEPTION WHEN OTHERS THEN results := results || jsonb_build_object('t17a_idempotent_sent', false); END;
  BEGIN PERFORM mark_notification_result(nid,(SELECT idempotency_key FROM publication_notifications WHERE id=nid),'failed',NULL,'e');
    results := results || jsonb_build_object('t17b_sent_terminal', false);
  EXCEPTION WHEN OTHERS THEN results := results || jsonb_build_object('t17b_sent_terminal', true); END;
  BEGIN PERFORM mark_notification_result(nid,'wrong-key','sending');
    results := results || jsonb_build_object('t17c_bad_key', false);
  EXCEPTION WHEN OTHERS THEN results := results || jsonb_build_object('t17c_bad_key', true); END;

  -- Stop after 180 (simulate by forcing all fixture articles published)
  UPDATE publication_articles SET status='published', final_title='x', slug='fs'||planning_number,
      content_hash='h', deployment_id='d', live_url='https://e.com/f'||planning_number, published_at=now(),
      lock_token=NULL, locked_at=NULL, lock_expires_at=NULL, locked_by=NULL, active_run_id=NULL
   WHERE project_id=proj AND status <> 'published';
  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'manual',NULL,300) INTO claim;
  SELECT publication_stopped INTO proj_stopped FROM publication_projects WHERE id=proj;
  results := results || jsonb_build_object('t18_no_head_stops',
    claim->>'disposition'='stopped_noop' AND proj_stopped=true);

  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'scheduled',NULL,300) INTO claim;
  results := results || jsonb_build_object('t19_stopped_noop', claim->>'disposition'='stopped_noop');

  -- Production invariants
  results := results || jsonb_build_object('t20_prod_articles_180',
    (SELECT count(*) FROM publication_articles a JOIN publication_projects p ON p.id=a.project_id
     WHERE p.project_key='yoga-zeeburg-kennisbank') = 180
    AND (SELECT count(*) FROM publication_articles a JOIN publication_projects p ON p.id=a.project_id
         WHERE p.project_key='yoga-zeeburg-kennisbank' AND a.status='published') = 3);
  results := results || jsonb_build_object('t20_prod_config_unchanged',
    (SELECT NOT automation_enabled AND NOT publication_stopped
     FROM publication_projects WHERE project_key='yoga-zeeburg-kennisbank'));

  RAISE EXCEPTION 'MIGB_TEST_RESULTS_ROLLBACK: %', results::text;
END; $function$;