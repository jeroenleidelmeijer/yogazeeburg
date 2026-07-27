-- ============================================================
-- Migration C contract tests (run via psql: `psql -f tests/sql/migc-contract-tests.sql`).
-- Executes as service_role role in a temporary function that RAISE EXCEPTIONs
-- after emitting a JSON result, guaranteeing rollback of every fixture row.
-- Production articles 1-180 are never claimed, locked, or mutated.
-- ============================================================
BEGIN;

DO $outer$
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
  v_ok boolean;
  v_msg text;

  PROCEDURE record_result(p_name text, p_ok boolean, p_msg text DEFAULT NULL) AS $$
  BEGIN
    v_results := v_results || jsonb_build_object('test', p_name, 'pass', p_ok, 'msg', p_msg);
  END;
  $$ LANGUAGE plpgsql;
BEGIN
  -- Simulate service_role for _pub_require_admin
  PERFORM set_config('request.jwt.claims','{"role":"service_role"}', true);

  v_proj_key := 'TEST-migc-' || substr(gen_random_uuid()::text,1,8);
  INSERT INTO publication_projects(project_key, name, automation_enabled)
    VALUES (v_proj_key, 'TEST migc fixture', true)
    RETURNING id INTO v_proj;

  -- Fixture articles at strategic planning_numbers to test each phase quota.
  -- planning_number 1 (phase 1-36, quota 3), 37 (phase 37-60 head, quota 2),
  -- 61 (phase 61-180 head, quota 1). Extras for happy-path/preview.
  INSERT INTO publication_articles(project_id, planning_number, original_title)
    VALUES
      (v_proj, 1, 'T-1'),
      (v_proj, 2, 'T-2'),
      (v_proj, 37, 'T-37'),
      (v_proj, 61, 'T-61');

  v_iso_dow := EXTRACT(ISODOW FROM (now() AT TIME ZONE 'Europe/Amsterdam'))::int;

  -- ================================================================
  -- T1: wrong_weekday
  -- Choose a scheduler_slot whose weekday != today's local weekday.
  -- ================================================================
  IF v_iso_dow = 1 THEN v_slot := 'wednesday';
  ELSIF v_iso_dow = 3 THEN v_slot := 'friday';
  ELSE v_slot := 'monday';
  END IF;
  v_claim := claim_next_publication_run(v_proj_key, 'scheduled', v_slot, 300);
  IF v_claim->>'disposition' = 'cadence_blocked' AND v_claim->>'reason' = 'wrong_weekday' THEN
    CALL record_result('T1_wrong_weekday', true, v_claim::text);
  ELSE
    CALL record_result('T1_wrong_weekday', false, v_claim::text);
  END IF;

  -- ================================================================
  -- T2: phase quota 3 (1-36) — mark 3 prior published this ISO week
  -- ================================================================
  -- We already have 4 planned articles; add 3 "already published this week"
  -- records for planning_numbers we won't touch as "head". Use 3 sibling
  -- fixtures with published_at in the current local ISO week.
  INSERT INTO publication_articles(project_id, planning_number, original_title,
      status, final_title, slug, content_hash, deployment_id, live_url, published_at)
    VALUES
      (v_proj, 100, 'seed-1','published','x','seed-1-'||gen_random_uuid()::text,'h','d','https://e.com/1', v_local_now),
      (v_proj, 101, 'seed-2','published','x','seed-2-'||gen_random_uuid()::text,'h','d','https://e.com/2', v_local_now),
      (v_proj, 102, 'seed-3','published','x','seed-3-'||gen_random_uuid()::text,'h','d','https://e.com/3', v_local_now);
  -- Manual trigger (weekday check skipped) but quota still applies. Head is
  -- planning_number 1 (phase quota=3), 3 already published this week → block.
  v_claim := claim_next_publication_run(v_proj_key, 'manual', NULL, 300);
  IF v_claim->>'disposition' = 'cadence_blocked' AND v_claim->>'reason' = 'weekly_quota_reached'
     AND (v_claim->'cadence'->>'quota_max')::int = 3 THEN
    CALL record_result('T2_phase_quota_3', true, v_claim::text);
  ELSE
    CALL record_result('T2_phase_quota_3', false, v_claim::text);
  END IF;

  -- ================================================================
  -- T3: phase quota 2 (37-60) — remove one seed, mark 1-2 published (head)
  -- so sequence-head becomes 37. Head=37 (quota 2), with 3 published this
  -- week → still blocked. Then reduce to 2 → still blocked.
  -- Simpler: fast-forward heads 1,2 to published, then head becomes 37;
  -- with 3 published-this-week seeds already, 3>=2 → cadence_blocked.
  -- ================================================================
  UPDATE publication_articles SET status='published', final_title='x',
    slug='fast-'||planning_number, content_hash='h', deployment_id='d',
    live_url='https://e.com/f'||planning_number, published_at=v_local_now
   WHERE project_id=v_proj AND planning_number IN (1,2);
  v_claim := claim_next_publication_run(v_proj_key, 'manual', NULL, 300);
  IF v_claim->>'disposition' = 'cadence_blocked' AND v_claim->>'reason' = 'weekly_quota_reached'
     AND (v_claim->'cadence'->>'quota_max')::int = 2 THEN
    CALL record_result('T3_phase_quota_2', true, v_claim::text);
  ELSE
    CALL record_result('T3_phase_quota_2', false, v_claim::text);
  END IF;

  -- ================================================================
  -- T4: phase quota 1 (61-180)
  -- Promote 37 to published so head=61 (phase 61-180, quota=1).
  -- ================================================================
  UPDATE publication_articles SET status='published', final_title='x',
    slug='fast-37', content_hash='h', deployment_id='d',
    live_url='https://e.com/f37', published_at=v_local_now
   WHERE project_id=v_proj AND planning_number=37;
  v_claim := claim_next_publication_run(v_proj_key, 'manual', NULL, 300);
  IF v_claim->>'disposition' = 'cadence_blocked' AND v_claim->>'reason' = 'weekly_quota_reached'
     AND (v_claim->'cadence'->>'quota_max')::int = 1 THEN
    CALL record_result('T4_phase_quota_1', true, v_claim::text);
  ELSE
    CALL record_result('T4_phase_quota_1', false, v_claim::text);
  END IF;

  -- ================================================================
  -- Reset for happy paths: clear the "this week" seeds so quota=0.
  -- ================================================================
  DELETE FROM publication_articles
   WHERE project_id=v_proj AND planning_number IN (100,101,102);
  -- Head is now planning_number 61 (all lower are 'published'). Quota is 1
  -- (phase 61-180). We have 3 published from 1/2/37 in same ISO week, but
  -- quota counts only what falls in ISO week; those are all counted, so we
  -- must clear them. Instead, reset them to different ISO week.
  UPDATE publication_articles SET published_at = v_local_now - interval '10 days'
   WHERE project_id=v_proj AND planning_number IN (1,2,37);

  -- Head must still be planning_number 61 now.
  v_claim := claim_next_publication_run(v_proj_key, 'manual', NULL, 300);
  IF v_claim->>'disposition' = 'claimed' AND (v_claim->>'planning_number')::int = 61 THEN
    v_run := (v_claim->>'run_id')::uuid;
    v_art := (v_claim->>'article_id')::uuid;
    v_tok := (v_claim->>'lock_token')::uuid;
    CALL record_result('T_claim_head_61_manual', true, v_claim::text);
  ELSE
    CALL record_result('T_claim_head_61_manual', false, v_claim::text);
    RAISE EXCEPTION 'MIGC_TESTS_STOP: cannot proceed without valid claim: %', v_claim::text;
  END IF;

  -- ================================================================
  -- T5: invalid_lock — wrong lock token when recording QA
  -- ================================================================
  BEGIN
    PERFORM record_publication_qa_check(v_run, v_art, gen_random_uuid(),
      'seo_metadata','content','pass','wrong token','{}'::jsonb);
    CALL record_result('T5_invalid_lock', false, 'no error raised');
  EXCEPTION WHEN OTHERS THEN
    CALL record_result('T5_invalid_lock', true, SQLERRM);
  END;

  -- ================================================================
  -- T6: wrong run/article relation
  -- ================================================================
  BEGIN
    PERFORM record_publication_qa_check(v_run, gen_random_uuid(), v_tok,
      'seo_metadata','content','pass','wrong article','{}'::jsonb);
    CALL record_result('T6_wrong_run_article', false, 'no error raised');
  EXCEPTION WHEN OTHERS THEN
    CALL record_result('T6_wrong_run_article', true, SQLERRM);
  END;

  -- ================================================================
  -- Walk state to preview_check, then to live_check for later tests.
  -- ================================================================
  PERFORM advance_publication_run(v_run, v_art, v_tok, 'locked','drafting','claim','{}'::jsonb);
  PERFORM advance_publication_run(v_run, v_art, v_tok, 'drafting','validating','draft','{}'::jsonb);
  PERFORM advance_publication_run(v_run, v_art, v_tok, 'validating','building','validate','{}'::jsonb);
  PERFORM advance_publication_run(v_run, v_art, v_tok, 'building','preview_check','build','{}'::jsonb);
  -- Now at preview_check. Record content + preview QA (12 checks). Use
  -- 'not_applicable' only for medical_safety (conditional).
  FOR v_check, v_stage IN
    SELECT check_key, stage FROM publication_required_qa_checks
     WHERE stage IN ('content','preview')
  LOOP
    PERFORM record_publication_qa_check(v_run, v_art, v_tok, v_check, v_stage,
      CASE WHEN v_check='medical_safety' THEN 'not_applicable'::publication_check_result
           ELSE 'pass'::publication_check_result END,
      'ok','{}'::jsonb);
  END LOOP;

  -- ================================================================
  -- T7: valid preview-only completion
  -- ================================================================
  BEGIN
    v_claim := complete_publication_preview(v_run, v_art, v_tok, 'hash-preview',
      'https://preview.test/61', 'dep-preview-1');
    -- Verify article + run state
    IF (SELECT status FROM publication_articles WHERE id=v_art) = 'preview_ready'
       AND (SELECT final_status FROM publication_runs WHERE id=v_run) = 'preview_ready'
       AND (SELECT published_at FROM publication_articles WHERE id=v_art) IS NULL
       AND (SELECT live_url FROM publication_articles WHERE id=v_art) IS NULL
       AND (SELECT lock_token FROM publication_articles WHERE id=v_art) IS NULL THEN
      CALL record_result('T7_preview_ready_valid', true, v_claim::text);
    ELSE
      CALL record_result('T7_preview_ready_valid', false, 'state mismatch after preview');
    END IF;
  EXCEPTION WHEN OTHERS THEN
    CALL record_result('T7_preview_ready_valid', false, SQLERRM);
  END;

  -- ================================================================
  -- Claim next sequence head — should skip preview_ready (61) → none left,
  -- because 1,2,37,61 are all terminal (published or preview_ready).
  -- Add a fresh planning_number 62 to allow the missing-QA + failing-QA
  -- tests to run without touching production.
  -- ================================================================
  INSERT INTO publication_articles(project_id, planning_number, original_title)
    VALUES (v_proj, 62, 'T-62');

  v_claim := claim_next_publication_run(v_proj_key, 'manual', NULL, 300);
  IF v_claim->>'disposition' = 'claimed' AND (v_claim->>'planning_number')::int = 62 THEN
    v_run2 := (v_claim->>'run_id')::uuid;
    v_art2 := (v_claim->>'article_id')::uuid;
    v_tok2 := (v_claim->>'lock_token')::uuid;
    CALL record_result('T_claim_skips_preview_ready', true, v_claim::text);
  ELSE
    CALL record_result('T_claim_skips_preview_ready', false, v_claim::text);
    RAISE EXCEPTION 'MIGC_TESTS_STOP: cannot proceed: %', v_claim::text;
  END IF;

  -- Walk 62 all the way to live_check to test live-QA gate cases.
  PERFORM advance_publication_run(v_run2, v_art2, v_tok2, 'locked','drafting','claim','{}'::jsonb);
  PERFORM advance_publication_run(v_run2, v_art2, v_tok2, 'drafting','validating','d','{}'::jsonb);
  PERFORM advance_publication_run(v_run2, v_art2, v_tok2, 'validating','building','v','{}'::jsonb);
  PERFORM advance_publication_run(v_run2, v_art2, v_tok2, 'building','preview_check','b','{}'::jsonb);
  PERFORM advance_publication_run(v_run2, v_art2, v_tok2, 'preview_check','publishing','p','{}'::jsonb);
  PERFORM advance_publication_run(v_run2, v_art2, v_tok2, 'publishing','live_check','pub','{}'::jsonb);

  -- ================================================================
  -- T8: missing QA → complete_publication_success must fail
  -- ================================================================
  BEGIN
    PERFORM complete_publication_success(v_run2, v_art2, v_tok2, 'T','test-62-slug',
      'h','d','https://e.com/62', now());
    CALL record_result('T8_missing_qa_blocks_publish', false, 'no error');
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM ~ 'qa_gate_failed' THEN
      CALL record_result('T8_missing_qa_blocks_publish', true, SQLERRM);
    ELSE
      CALL record_result('T8_missing_qa_blocks_publish', false, SQLERRM);
    END IF;
  END;

  -- Record all 30 checks: content+preview all pass (medical_safety NA),
  -- live all pass (filter_registration NA).
  FOR v_check, v_stage IN
    SELECT check_key, stage FROM publication_required_qa_checks
  LOOP
    PERFORM record_publication_qa_check(v_run2, v_art2, v_tok2, v_check, v_stage,
      CASE WHEN v_check IN ('medical_safety','filter_registration')
           THEN 'not_applicable'::publication_check_result
           ELSE 'pass'::publication_check_result END,
      'ok','{}'::jsonb);
  END LOOP;

  -- ================================================================
  -- T9: failing live QA (flip one live check to 'fail')
  -- ================================================================
  PERFORM record_publication_qa_check(v_run2, v_art2, v_tok2,
    'canonical','live','fail','simulated failure','{}'::jsonb);
  BEGIN
    PERFORM complete_publication_success(v_run2, v_art2, v_tok2, 'T','test-62-slug',
      'h','d','https://e.com/62', now());
    CALL record_result('T9_failing_qa_blocks_publish', false, 'no error');
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM ~ 'qa_gate_failed' THEN
      CALL record_result('T9_failing_qa_blocks_publish', true, SQLERRM);
    ELSE
      CALL record_result('T9_failing_qa_blocks_publish', false, SQLERRM);
    END IF;
  END;

  -- Also assert: direct publish path is blocked when live QA fails — same
  -- assertion but explicit label.
  BEGIN
    PERFORM complete_publication_success(v_run2, v_art2, v_tok2, 'T','test-62-slug',
      'h','d','https://e.com/62', now());
    CALL record_result('T11_no_direct_publish_without_live_qa', false, 'no error');
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM ~ 'qa_gate_failed' THEN
      CALL record_result('T11_no_direct_publish_without_live_qa', true, SQLERRM);
    ELSE
      CALL record_result('T11_no_direct_publish_without_live_qa', false, SQLERRM);
    END IF;
  END;

  -- Fix the failing check back to pass
  PERFORM record_publication_qa_check(v_run2, v_art2, v_tok2,
    'canonical','live','pass','fixed','{}'::jsonb);

  -- ================================================================
  -- T10: all 30 valid QA → publish succeeds
  -- ================================================================
  BEGIN
    PERFORM complete_publication_success(v_run2, v_art2, v_tok2, 'T','test-62-slug',
      'h','d','https://e.com/62', now());
    IF (SELECT status FROM publication_articles WHERE id=v_art2) = 'published'
       AND (SELECT final_status FROM publication_runs WHERE id=v_run2) = 'published' THEN
      CALL record_result('T10_all_30_valid_qa_publishes', true, NULL);
    ELSE
      CALL record_result('T10_all_30_valid_qa_publishes', false, 'state mismatch after publish');
    END IF;
  EXCEPTION WHEN OTHERS THEN
    CALL record_result('T10_all_30_valid_qa_publishes', false, SQLERRM);
  END;

  -- ================================================================
  -- Emit final results and force rollback
  -- ================================================================
  RAISE EXCEPTION 'MIGC_TESTS_RESULTS: %', v_results::text;
END $outer$;

ROLLBACK;
