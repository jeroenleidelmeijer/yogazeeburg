CREATE OR REPLACE FUNCTION public._pub_evaluate_cadence(
  p_project_id uuid, p_planning_number smallint,
  p_scheduler_slot publication_scheduler_slot, p_check_weekday boolean)
RETURNS jsonb
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public','pg_temp'
AS $fn$
DECLARE
  v_tz text;
  v_iso_dow int;
  v_quota_max int;
  v_slots publication_scheduler_slot[];
  v_slot_dow int;
  v_this_week_published int;
  v_local_ts timestamp;
BEGIN
  IF p_planning_number > 180 THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'beyond_planning_end');
  END IF;

  SELECT timezone INTO v_tz FROM publication_projects WHERE id = p_project_id;
  IF v_tz IS NULL THEN v_tz := 'Europe/Amsterdam'; END IF;
  v_local_ts := (now() AT TIME ZONE v_tz);
  v_iso_dow := EXTRACT(ISODOW FROM v_local_ts)::int;

  -- Rhythm 3→2→1 mirrors src/lib/publications/scheduler/cadence.ts.
  IF p_planning_number <= 36 THEN
    v_quota_max := 3; v_slots := ARRAY['monday','wednesday','friday']::publication_scheduler_slot[];
  ELSIF p_planning_number <= 60 THEN
    v_quota_max := 2; v_slots := ARRAY['monday','wednesday']::publication_scheduler_slot[];
  ELSE
    v_quota_max := 1; v_slots := ARRAY['monday']::publication_scheduler_slot[];
  END IF;

  IF p_check_weekday AND p_scheduler_slot IS NOT NULL THEN
    v_slot_dow := CASE p_scheduler_slot
                    WHEN 'monday' THEN 1
                    WHEN 'wednesday' THEN 3
                    WHEN 'friday' THEN 5 END;
    IF NOT (p_scheduler_slot = ANY(v_slots)) OR v_slot_dow <> v_iso_dow THEN
      RETURN jsonb_build_object('ok', false, 'reason','wrong_weekday',
        'local_dow', v_iso_dow, 'quota_max', v_quota_max);
    END IF;
  END IF;

  SELECT count(*) INTO v_this_week_published
    FROM publication_articles
    WHERE project_id = p_project_id
      AND status = 'published'
      AND published_at IS NOT NULL
      AND date_trunc('week', (published_at AT TIME ZONE v_tz))
        = date_trunc('week', v_local_ts);

  IF v_this_week_published >= v_quota_max THEN
    RETURN jsonb_build_object('ok', false, 'reason','weekly_quota_reached',
      'quota_used', v_this_week_published, 'quota_max', v_quota_max);
  END IF;

  RETURN jsonb_build_object('ok', true, 'quota_used', v_this_week_published, 'quota_max', v_quota_max);
END; $fn$;

REVOKE ALL ON FUNCTION public._pub_evaluate_cadence(uuid, smallint, publication_scheduler_slot, boolean) FROM PUBLIC;
REVOKE ALL ON FUNCTION public._pub_evaluate_cadence(uuid, smallint, publication_scheduler_slot, boolean) FROM anon;
REVOKE ALL ON FUNCTION public._pub_evaluate_cadence(uuid, smallint, publication_scheduler_slot, boolean) FROM authenticated;

INSERT INTO public.publication_run_reason_codes(code, description, source_reference) VALUES
  ('beyond_planning_end','Planning number exceeds hard stop (180)','AWI cadans')
ON CONFLICT (code) DO NOTHING;