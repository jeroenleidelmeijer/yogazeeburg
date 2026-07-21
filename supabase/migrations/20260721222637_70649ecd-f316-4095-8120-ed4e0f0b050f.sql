
CREATE OR REPLACE FUNCTION public._run_migb_tests()
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp
AS $fn$
DECLARE
  proj uuid; a1 uuid; r1 uuid; t1 uuid;
  a2 uuid; r2 uuid; t2 uuid; a3 uuid; r3 uuid; t3 uuid;
  claim jsonb; results jsonb := '[]'::jsonb;
  nid uuid; step_ct int; art_status text; proj_stopped boolean;
BEGIN
  PERFORM set_config('request.jwt.claims','{"role":"service_role"}', true);
  INSERT INTO publication_projects(project_key, name)
    VALUES ('TEST-migb-'||substr(gen_random_uuid()::text,1,8), 'TEST fixture')
    RETURNING id INTO proj;
  INSERT INTO publication_articles(project_id, planning_number, original_title)
    SELECT proj, g, 'test-'||g FROM generate_series(1,5) g;

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
  results := results || jsonb_build_object('t12_retry_pending', art_status='retry_pending' AND claim->>'run_status'='retry_pending');

  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'retry',NULL,300) INTO claim;
  r2 := (claim->>'run_id')::uuid; a2 := (claim->>'article_id')::uuid; t2 := (claim->>'lock_token')::uuid;
  PERFORM advance_publication_run(r2,a2,t2,'locked','drafting','claim','{}'::jsonb);
  PERFORM complete_publication_failure(r2,a2,t2,'draft','retry','infrastructure_error',NULL,'timeout2','{}'::jsonb,NULL);

  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'retry',NULL,300) INTO claim;
  r2 := (claim->>'run_id')::uuid; a2 := (claim->>'article_id')::uuid; t2 := (claim->>'lock_token')::uuid;
  PERFORM advance_publication_run(r2,a2,t2,'locked','drafting','claim','{}'::jsonb);
  SELECT complete_publication_failure(r2,a2,t2,'draft','retry','infrastructure_error',NULL,'timeout3','{}'::jsonb,NULL) INTO claim;
  SELECT status::text INTO art_status FROM publication_articles WHERE id=a2;
  results := results || jsonb_build_object('t13_exhausted',
    art_status='failed' AND (claim->>'exhausted')::boolean=true);

  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'manual',NULL,300) INTO claim;
  results := results || jsonb_build_object('t14_sequence_blocked', claim->>'disposition'='sequence_blocked');

  UPDATE publication_articles SET status='planned', retry_count=0,
     last_error_category=NULL, last_error_summary=NULL,
     lock_token=NULL, locked_at=NULL, lock_expires_at=NULL, locked_by=NULL, active_run_id=NULL
   WHERE id=a2;

  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'manual',NULL,300) INTO claim;
  r3 := (claim->>'run_id')::uuid; a3 := (claim->>'article_id')::uuid; t3 := (claim->>'lock_token')::uuid;
  PERFORM advance_publication_run(r3,a3,t3,'locked','drafting','claim','{}'::jsonb);
  UPDATE publication_articles SET lock_expires_at = now() - interval '1 minute' WHERE id=a3;
  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'manual',NULL,300) INTO claim;
  results := results || jsonb_build_object('t15_recovery_safe',
    claim->>'disposition'='claimed' AND (claim->>'article_id')::uuid = a3);
  r3 := (claim->>'run_id')::uuid; t3 := (claim->>'lock_token')::uuid;

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
END; $fn$;

REVOKE EXECUTE ON FUNCTION public._run_migb_tests() FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public._run_migb_tests() TO authenticated, service_role;
