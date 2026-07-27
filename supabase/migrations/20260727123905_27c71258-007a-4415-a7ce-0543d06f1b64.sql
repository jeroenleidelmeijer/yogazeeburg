
CREATE TABLE public.publication_run_artifacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL,
  article_id uuid NOT NULL,
  run_id uuid NOT NULL,
  step_key text NOT NULL,
  schema_version text NOT NULL,
  prompt_version text NOT NULL,
  content_hash text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT publication_run_artifacts_unique UNIQUE (run_id, step_key)
);

GRANT SELECT ON public.publication_run_artifacts TO authenticated;
GRANT ALL ON public.publication_run_artifacts TO service_role;

ALTER TABLE public.publication_run_artifacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "publication_run_artifacts_admin_read"
  ON public.publication_run_artifacts
  FOR SELECT
  TO authenticated
  USING (public.is_publication_admin(project_id));

CREATE INDEX publication_run_artifacts_run_idx
  ON public.publication_run_artifacts(run_id);
CREATE INDEX publication_run_artifacts_article_idx
  ON public.publication_run_artifacts(article_id);

CREATE OR REPLACE FUNCTION public.upsert_publication_run_artifact(
  p_run_id uuid,
  p_article_id uuid,
  p_lock_token uuid,
  p_step_key text,
  p_schema_version text,
  p_prompt_version text,
  p_content_hash text,
  p_payload jsonb
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public', 'pg_temp'
AS $$
DECLARE
  v_art public.publication_articles%ROWTYPE;
  v_id uuid;
BEGIN
  IF p_step_key IS NULL OR length(p_step_key) = 0 THEN
    RAISE EXCEPTION 'step_key required';
  END IF;
  IF p_schema_version IS NULL OR p_prompt_version IS NULL OR p_content_hash IS NULL THEN
    RAISE EXCEPTION 'schema_version, prompt_version, content_hash required';
  END IF;
  v_art := public._pub_lock_run(p_run_id, p_article_id, p_lock_token);

  INSERT INTO public.publication_run_artifacts(
    project_id, article_id, run_id, step_key,
    schema_version, prompt_version, content_hash, payload
  )
  VALUES (
    v_art.project_id, p_article_id, p_run_id, p_step_key,
    p_schema_version, p_prompt_version, p_content_hash, coalesce(p_payload, '{}'::jsonb)
  )
  ON CONFLICT (run_id, step_key) DO UPDATE
    SET schema_version = EXCLUDED.schema_version,
        prompt_version = EXCLUDED.prompt_version,
        content_hash = EXCLUDED.content_hash,
        payload = EXCLUDED.payload,
        updated_at = now()
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

REVOKE ALL ON FUNCTION public.upsert_publication_run_artifact(uuid, uuid, uuid, text, text, text, text, jsonb)
  FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.list_publication_run_artifacts(
  p_run_id uuid,
  p_article_id uuid,
  p_lock_token uuid
) RETURNS TABLE (
  step_key text,
  schema_version text,
  prompt_version text,
  content_hash text,
  payload jsonb,
  updated_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public', 'pg_temp'
AS $$
DECLARE v_art public.publication_articles%ROWTYPE;
BEGIN
  v_art := public._pub_lock_run(p_run_id, p_article_id, p_lock_token);
  RETURN QUERY
    SELECT a.step_key, a.schema_version, a.prompt_version,
           a.content_hash, a.payload, a.updated_at
      FROM public.publication_run_artifacts a
     WHERE a.run_id = p_run_id
       AND a.article_id = p_article_id;
END;
$$;

REVOKE ALL ON FUNCTION public.list_publication_run_artifacts(uuid, uuid, uuid)
  FROM PUBLIC, anon, authenticated;
