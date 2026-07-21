
CREATE OR REPLACE FUNCTION public._debug_runs()
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $fn$
DECLARE proj uuid; a2 uuid; r2 uuid; t2 uuid; claim jsonb; snap jsonb;
BEGIN
  PERFORM set_config('request.jwt.claims','{"role":"service_role"}', true);
  INSERT INTO publication_projects(project_key, name)
    VALUES ('TEST-dbg3-'||substr(gen_random_uuid()::text,1,8),'x') RETURNING id INTO proj;
  INSERT INTO publication_articles(project_id, planning_number, original_title)
    SELECT proj, g, 't'||g FROM generate_series(1,3) g;
  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'manual',NULL,300) INTO claim;
  r2:=(claim->>'run_id')::uuid; a2:=(claim->>'article_id')::uuid; t2:=(claim->>'lock_token')::uuid;
  PERFORM advance_publication_run(r2,a2,t2,'locked','drafting','claim','{}'::jsonb);
  SELECT complete_publication_failure(r2,a2,t2,'draft','retry','infrastructure_error',NULL,'t1','{}'::jsonb,30) INTO claim;
  RAISE NOTICE 'fail1: %', claim;

  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'retry',NULL,300) INTO claim;
  RAISE NOTICE 'reclaim2: %', claim;
  r2:=(claim->>'run_id')::uuid; a2:=(claim->>'article_id')::uuid; t2:=(claim->>'lock_token')::uuid;
  IF t2 IS NULL THEN RAISE EXCEPTION 'no lock 2: %', claim; END IF;
  PERFORM advance_publication_run(r2,a2,t2,'locked','drafting','claim','{}'::jsonb);
  SELECT complete_publication_failure(r2,a2,t2,'draft','retry','infrastructure_error',NULL,'t2','{}'::jsonb,NULL) INTO claim;
  RAISE NOTICE 'fail2: %', claim;

  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'retry',NULL,300) INTO claim;
  RAISE NOTICE 'reclaim3: %', claim;
  r2:=(claim->>'run_id')::uuid; a2:=(claim->>'article_id')::uuid; t2:=(claim->>'lock_token')::uuid;
  IF t2 IS NULL THEN RAISE EXCEPTION 'no lock 3: %', claim; END IF;
  PERFORM advance_publication_run(r2,a2,t2,'locked','drafting','claim','{}'::jsonb);
  SELECT complete_publication_failure(r2,a2,t2,'draft','retry','infrastructure_error',NULL,'t3','{}'::jsonb,NULL) INTO claim;
  RAISE NOTICE 'fail3: %', claim;

  SELECT jsonb_agg(jsonb_build_object('step',step_key,'attempt',attempt_number,'result',result) ORDER BY attempt_number) INTO snap
    FROM publication_run_step_attempts WHERE article_id=a2 AND step_key='draft';
  RAISE EXCEPTION 'DBG: draft_attempts=%', snap;
END; $fn$;
