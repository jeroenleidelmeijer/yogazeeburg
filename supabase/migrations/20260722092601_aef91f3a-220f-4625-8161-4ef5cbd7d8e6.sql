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
  results_arr text[]; nums smallint[];
  r_other uuid; a_other uuid; t_other uuid;
  running_ct int;
BEGIN
  PERFORM set_config('request.jwt.claims','{"role":"service_role"}', true);
  INSERT INTO publication_projects(project_key, name)
    VALUES ('TEST-migb-'||substr(gen_random_uuid()::text,1,8), 'TEST fixture')
    RETURNING id INTO proj;
  INSERT INTO publication_articles(project_id, planning_number, original_title)
    SELECT proj, g, 'test-'||g FROM generate_series(1,6) g;

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

  SELECT array_agg(result::text ORDER BY attempt_number), array_agg(attempt_number ORDER BY attempt_number)
    INTO results_arr, nums
    FROM publication_run_step_attempts
    WHERE article_id=a2 AND step_key='draft';
  results := results || jsonb_build_object('t13a_step_history',
    results_arr = ARRAY['failure','failure','failure']::text[] AND nums = ARRAY[1,2,3]::smallint[]);

  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'manual',NULL,300) INTO claim;
  results := results || jsonb_build_object('t14_sequence_blocked', claim->>'disposition'='sequence_blocked');

  SELECT count(*) INTO running_ct FROM publication_runs WHERE article_id=a2 AND final_status='running';
  results := results || jsonb_build_object('t14b_no_running_run', running_ct=0);

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

  UPDATE publication_articles SET status='planned', retry_count=0,
     last_error_category=NULL, last_error_summary=NULL,
     lock_token=NULL, locked_at=NULL, lock_expires_at=NULL, locked_by=NULL, active_run_id=NULL
   WHERE id=a_other;
  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'manual',NULL,300) INTO claim;
  r_other := (claim->>'run_id')::uuid; t_other := (claim->>'lock_token')::uuid;
  PERFORM advance_publication_run(r_other,a_other,t_other,'locked','drafting','claim','{}'::jsonb);
  UPDATE publication_articles SET lock_expires_at = now() - interval '1 min' WHERE id=a_other;
  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'manual',NULL,300) INTO claim;
  r_other := (claim->>'run_id')::uuid; t_other := (claim->>'lock_token')::uuid;
  PERFORM advance_publication_run(r_other,a_other,t_other,'locked','drafting','claim','{}'::jsonb);
  SELECT complete_publication_failure(r_other,a_other,t_other,'draft','retry','infrastructure_error',NULL,'y','{}'::jsonb,NULL) INTO claim;
  results := results || jsonb_build_object('t14f_recovery_safe_continues',
    (claim->>'step_attempt')::int = 2);

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

  INSERT INTO publication_notifications(project_id, notification_type, recipient, subject, idempotency_key, status)
    VALUES (proj,'success','x@example.com','s','idem-'||gen_random_uuid()::text,'pending')
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

TRUNCATE public._migb_test_results;
INSERT INTO public._migb_test_results(result) SELECT public._run_migb_tests_capture();