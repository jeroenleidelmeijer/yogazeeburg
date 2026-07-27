CREATE OR REPLACE FUNCTION public.complete_publication_success(
  p_run_id uuid, p_article_id uuid, p_lock_token uuid,
  p_final_title text, p_slug text, p_content_hash text,
  p_deployment_id text, p_live_url text, p_published_at timestamptz)
 RETURNS void
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public','pg_temp'
AS $fn$
DECLARE
  v_art publication_articles%ROWTYPE;
  v_earlier int;
  v_gate jsonb;
  v_cadence jsonb;
BEGIN
  v_art := _pub_lock_run(p_run_id, p_article_id, p_lock_token);
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
  IF p_published_at > transaction_timestamp() THEN
    RAISE EXCEPTION 'published_at % is in the future', p_published_at;
  END IF;

  -- Sequence-head recheck: preview_ready is a durable terminal outcome and
  -- MUST count as done (matches scheduler skip-set).
  SELECT count(*) INTO v_earlier FROM publication_articles
    WHERE project_id = v_art.project_id
      AND planning_number < v_art.planning_number
      AND status NOT IN ('published','preview_ready');
  IF v_earlier > 0 THEN
    RAISE EXCEPTION 'sequence violation: % earlier articles still unpublished', v_earlier;
  END IF;

  v_gate := public._pub_qa_gate(p_article_id, p_run_id,
              ARRAY['content','preview','live']::publication_qa_stage[]);
  IF (v_gate->>'ok')::boolean IS DISTINCT FROM true THEN
    RAISE EXCEPTION 'qa_gate_failed: %', v_gate::text;
  END IF;

  v_cadence := public._pub_evaluate_cadence(v_art.project_id, v_art.planning_number,
                                            NULL::publication_scheduler_slot, false);
  IF (v_cadence->>'ok')::boolean IS DISTINCT FROM true THEN
    RAISE EXCEPTION 'cadence recheck failed at completion: %', v_cadence::text;
  END IF;

  UPDATE publication_articles SET status='published',
    final_title=p_final_title, slug=p_slug, content_hash=p_content_hash,
    deployment_id=p_deployment_id, live_url=p_live_url, published_at=p_published_at,
    lock_token=NULL, locked_at=NULL, lock_expires_at=NULL, locked_by=NULL,
    active_run_id=NULL, last_error_category=NULL, last_error_summary=NULL, updated_at=now()
   WHERE id=p_article_id;
  UPDATE publication_runs SET final_status='published', current_step='complete',
    finished_at=now(), updated_at=now() WHERE id=p_run_id;
  INSERT INTO publication_events(project_id, article_id, run_id, event_type, actor_type, actor_id, payload)
    VALUES (v_art.project_id, p_article_id, p_run_id, 'article_published','automation', auth.uid(),
      jsonb_build_object('slug',p_slug,'live_url',p_live_url,'cadence',v_cadence));
END; $fn$;
