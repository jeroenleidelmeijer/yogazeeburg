CREATE OR REPLACE FUNCTION public._run_migc_tests()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public','pg_temp'
AS $fn$
DECLARE
  v_results jsonb := '[]'::jsonb;
  v_proj uuid;
  v_proj_key text;
  v_art uuid; v_run uuid; v_tok uuid;
  v_art2 uuid; v_run2 uuid; v_tok2 uuid;
  v_claim jsonb;
  v_iso_dow int;
  v_slot publication_scheduler_slot;
  v_check text;
  v_stage publication_qa_stage;
  v_local_now timestamptz := now();
BEGIN
  PERFORM set_config('request.jwt.claims','{"role":"service_role"}', true);

  v_proj_key := 'TEST-migc-' || substr(gen_random_uuid()::text,1,8);
  INSERT INTO publication_projects(project_key, name, automation_enabled)
    VALUES (v_proj_key, 'TEST migc fixture', true)
    RETURNING id INTO v_proj;

  INSERT INTO publication_articles(project_id, planning_number, original_title)
    VALUES (v_proj, 1, 'T-1'), (v_proj, 2, 'T-2'),
           (v_proj, 37, 'T-37'), (v_proj, 61, 'T-61');

  v_iso_dow := EXTRACT(ISODOW FROM (now() AT TIME ZONE 'Europe/Amsterdam'))::int;

  -- T1: wrong_weekday
  IF v_iso_dow = 1 THEN v_slot := 'wednesday';
  ELSIF v_iso_dow = 3 THEN v_slot := 'friday';
  ELSE v_slot := 'monday';
  END IF;
  v_claim := claim_next_publication_run(v_proj_key, 'scheduled', v_slot, 300);
  v_results := v_results || jsonb_build_object('test','T1_wrong_weekday',
    'pass', v_claim->>'disposition' = 'cadence_blocked' AND v_claim->>'reason' = 'wrong_weekday',
    'msg', v_claim::text);

  -- T2: phase quota 3 (head=1)
  INSERT INTO publication_articles(project_id, planning_number, original_title, status,
      final_title, slug, content_hash, deployment_id, live_url, published_at)
    VALUES
      (v_proj, 100, 'seed-1','published','x','seed-1-'||gen_random_uuid()::text,'h','d','https://e.com/1', v_local_now),
      (v_proj, 101, 'seed-2','published','x','seed-2-'||gen_random_uuid()::text,'h','d','https://e.com/2', v_local_now),
      (v_proj, 102, 'seed-3','published','x','seed-3-'||gen_random_uuid()::text,'h','d','https://e.com/3', v_local_now);
  v_claim := claim_next_publication_run(v_proj_key, 'manual', NULL, 300);
  v_results := v_results || jsonb_build_object('test','T2_phase_quota_3',
    'pass', v_claim->>'disposition' = 'cadence_blocked' AND v_claim->>'reason' = 'weekly_quota_reached'
      AND (v_claim->'cadence'->>'quota_max')::int = 3,
    'msg', v_claim::text);

  -- T3: phase quota 2 (head=37 after fast-forward 1,2)
  UPDATE publication_articles SET status='published', final_title='x',
    slug='fast-'||planning_number, content_hash='h', deployment_id='d',
    live_url='https://e.com/f'||planning_number, published_at=v_local_now
   WHERE project_id=v_proj AND planning_number IN (1,2);
  v_claim := claim_next_publication_run(v_proj_key, 'manual', NULL, 300);
  v_results := v_results || jsonb_build_object('test','T3_phase_quota_2',
    'pass', v_claim->>'disposition' = 'cadence_blocked' AND v_claim->>'reason' = 'weekly_quota_reached'
      AND (v_claim->'cadence'->>'quota_max')::int = 2,
    'msg', v_claim::text);

  -- T4: phase quota 1 (head=61)
  UPDATE publication_articles SET status='published', final_title='x',
    slug='fast-37', content_hash='h', deployment_id='d',
    live_url='https://e.com/f37', published_at=v_local_now
   WHERE project_id=v_proj AND planning_number=37;
  v_claim := claim_next_publication_run(v_proj_key, 'manual', NULL, 300);
  v_results := v_results || jsonb_build_object('test','T4_phase_quota_1',
    'pass', v_claim->>'disposition' = 'cadence_blocked' AND v_claim->>'reason' = 'weekly_quota_reached'
      AND (v_claim->'cadence'->>'quota_max')::int = 1,
    'msg', v_claim::text);

  -- Reset for happy paths: push seeds & prior publishes out of ISO week
  DELETE FROM publication_articles
   WHERE project_id=v_proj AND planning_number IN (100,101,102);
  UPDATE publication_articles SET published_at = v_local_now - interval '10 days'
   WHERE project_id=v_proj AND planning_number IN (1,2,37);

  -- Claim head=61 for preview-only test
  v_claim := claim_next_publication_run(v_proj_key, 'manual', NULL, 300);
  IF v_claim->>'disposition' = 'claimed' AND (v_claim->>'planning_number')::int = 61 THEN
    v_run := (v_claim->>'run_id')::uuid;
    v_art := (v_claim->>'article_id')::uuid;
    v_tok := (v_claim->>'lock_token')::uuid;
    v_results := v_results || jsonb_build_object('test','T_claim_head_61_manual','pass',true,'msg',NULL);
  ELSE
    v_results := v_results || jsonb_build_object('test','T_claim_head_61_manual','pass',false,'msg',v_claim::text);
    RAISE EXCEPTION 'MIGC_TESTS_RESULTS: %', v_results::text;
  END IF;

  -- T5: invalid_lock
  BEGIN
    PERFORM record_publication_qa_check(v_run, v_art, gen_random_uuid(),
      'seo_metadata','content','pass','wrong token','{}'::jsonb);
    v_results := v_results || jsonb_build_object('test','T5_invalid_lock','pass',false,'msg','no error');
  EXCEPTION WHEN OTHERS THEN
    v_results := v_results || jsonb_build_object('test','T5_invalid_lock','pass',true,'msg',SQLERRM);
  END;

  -- T6: wrong run/article relation
  BEGIN
    PERFORM record_publication_qa_check(v_run, gen_random_uuid(), v_tok,
      'seo_metadata','content','pass','wrong article','{}'::jsonb);
    v_results := v_results || jsonb_build_object('test','T6_wrong_run_article','pass',false,'msg','no error');
  EXCEPTION WHEN OTHERS THEN
    v_results := v_results || jsonb_build_object('test','T6_wrong_run_article','pass',true,'msg',SQLERRM);
  END;

  -- Walk to preview_check, then record content+preview QA
  PERFORM advance_publication_run(v_run, v_art, v_tok, 'locked','drafting','claim','{}'::jsonb);
  PERFORM advance_publication_run(v_run, v_art, v_tok, 'drafting','validating','draft','{}'::jsonb);
  PERFORM advance_publication_run(v_run, v_art, v_tok, 'validating','building','validate','{}'::jsonb);
  PERFORM advance_publication_run(v_run, v_art, v_tok, 'building','preview_check','build','{}'::jsonb);
  FOR v_check, v_stage IN
    SELECT check_key, stage FROM publication_required_qa_checks
     WHERE stage IN ('content','preview')
  LOOP
    PERFORM record_publication_qa_check(v_run, v_art, v_tok, v_check, v_stage,
      CASE WHEN v_check='medical_safety' THEN 'not_applicable'::publication_check_result
           ELSE 'pass'::publication_check_result END,
      'ok','{}'::jsonb);
  END LOOP;

  -- T7: valid preview_ready completion
  BEGIN
    v_claim := complete_publication_preview(v_run, v_art, v_tok, 'hash-preview',
      'https://preview.test/61', 'dep-preview-1');
    IF (SELECT status FROM publication_articles WHERE id=v_art) = 'preview_ready'
       AND (SELECT final_status FROM publication_runs WHERE id=v_run) = 'preview_ready'
       AND (SELECT published_at FROM publication_articles WHERE id=v_art) IS NULL
       AND (SELECT live_url FROM publication_articles WHERE id=v_art) IS NULL
       AND (SELECT lock_token FROM publication_articles WHERE id=v_art) IS NULL THEN
      v_results := v_results || jsonb_build_object('test','T7_preview_ready_valid','pass',true,'msg',v_claim::text);
    ELSE
      v_results := v_results || jsonb_build_object('test','T7_preview_ready_valid','pass',false,'msg','state mismatch after preview');
    END IF;
  EXCEPTION WHEN OTHERS THEN
    v_results := v_results || jsonb_build_object('test','T7_preview_ready_valid','pass',false,'msg',SQLERRM);
  END;

  -- Add planning_number 62; next claim must skip preview_ready (61) and pick 62
  INSERT INTO publication_articles(project_id, planning_number, original_title)
    VALUES (v_proj, 62, 'T-62');
  v_claim := claim_next_publication_run(v_proj_key, 'manual', NULL, 300);
  IF v_claim->>'disposition' = 'claimed' AND (v_claim->>'planning_number')::int = 62 THEN
    v_run2 := (v_claim->>'run_id')::uuid;
    v_art2 := (v_claim->>'article_id')::uuid;
    v_tok2 := (v_claim->>'lock_token')::uuid;
    v_results := v_results || jsonb_build_object('test','T_claim_skips_preview_ready','pass',true,'msg',NULL);
  ELSE
    v_results := v_results || jsonb_build_object('test','T_claim_skips_preview_ready','pass',false,'msg',v_claim::text);
    RAISE EXCEPTION 'MIGC_TESTS_RESULTS: %', v_results::text;
  END IF;

  PERFORM advance_publication_run(v_run2, v_art2, v_tok2, 'locked','drafting','claim','{}'::jsonb);
  PERFORM advance_publication_run(v_run2, v_art2, v_tok2, 'drafting','validating','d','{}'::jsonb);
  PERFORM advance_publication_run(v_run2, v_art2, v_tok2, 'validating','building','v','{}'::jsonb);
  PERFORM advance_publication_run(v_run2, v_art2, v_tok2, 'building','preview_check','b','{}'::jsonb);
  PERFORM advance_publication_run(v_run2, v_art2, v_tok2, 'preview_check','publishing','p','{}'::jsonb);
  PERFORM advance_publication_run(v_run2, v_art2, v_tok2, 'publishing','live_check','pub','{}'::jsonb);

  -- T8: missing QA blocks publish
  BEGIN
    PERFORM complete_publication_success(v_run2, v_art2, v_tok2, 'T','test-62-slug',
      'h','d','https://e.com/62', now());
    v_results := v_results || jsonb_build_object('test','T8_missing_qa_blocks_publish','pass',false,'msg','no error');
  EXCEPTION WHEN OTHERS THEN
    v_results := v_results || jsonb_build_object('test','T8_missing_qa_blocks_publish',
      'pass', SQLERRM ~ 'qa_gate_failed', 'msg', SQLERRM);
  END;

  -- Record all 30 checks (content+preview+live)
  FOR v_check, v_stage IN
    SELECT check_key, stage FROM publication_required_qa_checks
  LOOP
    PERFORM record_publication_qa_check(v_run2, v_art2, v_tok2, v_check, v_stage,
      CASE WHEN v_check IN ('medical_safety','filter_registration')
           THEN 'not_applicable'::publication_check_result
           ELSE 'pass'::publication_check_result END,
      'ok','{}'::jsonb);
  END LOOP;

  -- T9: failing live QA blocks publish
  PERFORM record_publication_qa_check(v_run2, v_art2, v_tok2,
    'canonical','live','fail','simulated failure','{}'::jsonb);
  BEGIN
    PERFORM complete_publication_success(v_run2, v_art2, v_tok2, 'T','test-62-slug',
      'h','d','https://e.com/62', now());
    v_results := v_results || jsonb_build_object('test','T9_failing_qa_blocks_publish','pass',false,'msg','no error');
  EXCEPTION WHEN OTHERS THEN
    v_results := v_results || jsonb_build_object('test','T9_failing_qa_blocks_publish',
      'pass', SQLERRM ~ 'qa_gate_failed', 'msg', SQLERRM);
  END;

  -- T11: same block asserted under explicit "no direct publish without live-QA" label
  BEGIN
    PERFORM complete_publication_success(v_run2, v_art2, v_tok2, 'T','test-62-slug',
      'h','d','https://e.com/62', now());
    v_results := v_results || jsonb_build_object('test','T11_no_direct_publish_without_live_qa','pass',false,'msg','no error');
  EXCEPTION WHEN OTHERS THEN
    v_results := v_results || jsonb_build_object('test','T11_no_direct_publish_without_live_qa',
      'pass', SQLERRM ~ 'qa_gate_failed', 'msg', SQLERRM);
  END;

  -- Fix failing check
  PERFORM record_publication_qa_check(v_run2, v_art2, v_tok2,
    'canonical','live','pass','fixed','{}'::jsonb);

  -- T10: all 30 valid → publish succeeds
  BEGIN
    PERFORM complete_publication_success(v_run2, v_art2, v_tok2, 'T','test-62-slug',
      'h','d','https://e.com/62', now());
    IF (SELECT status FROM publication_articles WHERE id=v_art2) = 'published'
       AND (SELECT final_status FROM publication_runs WHERE id=v_run2) = 'published' THEN
      v_results := v_results || jsonb_build_object('test','T10_all_30_valid_qa_publishes','pass',true,'msg',NULL);
    ELSE
      v_results := v_results || jsonb_build_object('test','T10_all_30_valid_qa_publishes','pass',false,'msg','state mismatch after publish');
    END IF;
  EXCEPTION WHEN OTHERS THEN
    v_results := v_results || jsonb_build_object('test','T10_all_30_valid_qa_publishes','pass',false,'msg',SQLERRM);
  END;

  RAISE EXCEPTION 'MIGC_TESTS_RESULTS: %', v_results::text;
END; $fn$;

REVOKE ALL ON FUNCTION public._run_migc_tests() FROM PUBLIC;
REVOKE ALL ON FUNCTION public._run_migc_tests() FROM anon;
-- Keep authenticated EXECUTE so the test can be triggered from the sandbox psql session
GRANT EXECUTE ON FUNCTION public._run_migc_tests() TO authenticated;
GRANT EXECUTE ON FUNCTION public._run_migc_tests() TO service_role;
