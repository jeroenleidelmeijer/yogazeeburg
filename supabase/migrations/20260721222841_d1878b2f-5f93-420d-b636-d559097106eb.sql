
CREATE OR REPLACE FUNCTION public._debug_runs()
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $fn$
DECLARE proj uuid; a2 uuid; r2 uuid; t2 uuid; claim jsonb; snap jsonb; art_snap jsonb;
BEGIN
  PERFORM set_config('request.jwt.claims','{"role":"service_role"}', true);
  INSERT INTO publication_projects(project_key, name)
    VALUES ('TEST-dbg2-'||substr(gen_random_uuid()::text,1,8),'x') RETURNING id INTO proj;
  INSERT INTO publication_articles(project_id, planning_number, original_title)
    SELECT proj, g, 't'||g FROM generate_series(1,3) g;
  -- Publish planning 1 to make head planning 2
  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'manual',NULL,300) INTO claim;
  r2:=(claim->>'run_id')::uuid; a2:=(claim->>'article_id')::uuid; t2:=(claim->>'lock_token')::uuid;
  PERFORM advance_publication_run(r2,a2,t2,'locked','drafting','claim','{}'::jsonb);
  PERFORM advance_publication_run(r2,a2,t2,'drafting','validating','d','{}'::jsonb);
  PERFORM advance_publication_run(r2,a2,t2,'validating','building','v','{}'::jsonb);
  PERFORM advance_publication_run(r2,a2,t2,'building','preview_check','b','{}'::jsonb);
  PERFORM advance_publication_run(r2,a2,t2,'preview_check','publishing','p','{}'::jsonb);
  PERFORM advance_publication_run(r2,a2,t2,'publishing','live_check','pub','{}'::jsonb);
  PERFORM complete_publication_success(r2,a2,t2,'T','sl','h','d','https://e.com/1', now());

  -- Now cycle a2 (planning 2) through three failures
  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'manual',NULL,300) INTO claim;
  r2:=(claim->>'run_id')::uuid; a2:=(claim->>'article_id')::uuid; t2:=(claim->>'lock_token')::uuid;
  PERFORM advance_publication_run(r2,a2,t2,'locked','drafting','claim','{}'::jsonb);
  PERFORM complete_publication_failure(r2,a2,t2,'draft','retry','infrastructure_error',NULL,'t1','{}'::jsonb,30);

  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'retry',NULL,300) INTO claim;
  r2:=(claim->>'run_id')::uuid; a2:=(claim->>'article_id')::uuid; t2:=(claim->>'lock_token')::uuid;
  PERFORM advance_publication_run(r2,a2,t2,'locked','drafting','claim','{}'::jsonb);
  PERFORM complete_publication_failure(r2,a2,t2,'draft','retry','infrastructure_error',NULL,'t2','{}'::jsonb,NULL);

  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'retry',NULL,300) INTO claim;
  r2:=(claim->>'run_id')::uuid; a2:=(claim->>'article_id')::uuid; t2:=(claim->>'lock_token')::uuid;
  PERFORM advance_publication_run(r2,a2,t2,'locked','drafting','claim','{}'::jsonb);
  PERFORM complete_publication_failure(r2,a2,t2,'draft','retry','infrastructure_error',NULL,'t3','{}'::jsonb,NULL);

  UPDATE publication_articles SET status='planned', retry_count=0,
     last_error_category=NULL, last_error_summary=NULL,
     lock_token=NULL, locked_at=NULL, lock_expires_at=NULL, locked_by=NULL, active_run_id=NULL
   WHERE id=a2;

  SELECT jsonb_agg(jsonb_build_object('id',id,'status',final_status,'step',current_step) ORDER BY started_at) INTO snap
    FROM publication_runs WHERE article_id=a2;
  SELECT row_to_json(a) INTO art_snap FROM publication_articles a WHERE id=a2;
  RAISE EXCEPTION 'DBG_SNAP: runs_for_a2=% art=%', snap, art_snap;
END; $fn$;
REVOKE EXECUTE ON FUNCTION public._debug_runs() FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public._debug_runs() TO authenticated, service_role;
