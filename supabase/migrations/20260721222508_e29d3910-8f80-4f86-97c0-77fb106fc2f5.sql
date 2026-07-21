
CREATE OR REPLACE FUNCTION public._debug_recovery()
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
DECLARE proj uuid; claim jsonb; r3 uuid; a3 uuid; t3 uuid; c1 jsonb; c2 jsonb;
BEGIN
  PERFORM set_config('request.jwt.claims','{"role":"service_role"}', true);
  INSERT INTO publication_projects(project_key, name)
    VALUES ('TEST-dbg-'||substr(gen_random_uuid()::text,1,8),'x') RETURNING id INTO proj;
  INSERT INTO publication_articles(project_id, planning_number, original_title)
    SELECT proj, g, 't'||g FROM generate_series(1,3) g;
  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'manual',NULL,300) INTO c1;
  r3:=(c1->>'run_id')::uuid; a3:=(c1->>'article_id')::uuid; t3:=(c1->>'lock_token')::uuid;
  PERFORM advance_publication_run(r3,a3,t3,'locked','drafting','claim','{}'::jsonb);
  UPDATE publication_articles SET lock_expires_at = now() - interval '1 min' WHERE id=a3;
  SELECT claim_next_publication_run((SELECT project_key FROM publication_projects WHERE id=proj),'manual',NULL,300) INTO c2;
  RAISE EXCEPTION 'DBG_ROLLBACK: c1=% c2=% art=%',
    c1, c2, (SELECT row_to_json(a) FROM publication_articles a WHERE id=a3);
END; $$;
REVOKE EXECUTE ON FUNCTION public._debug_recovery() FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public._debug_recovery() TO authenticated, service_role;
