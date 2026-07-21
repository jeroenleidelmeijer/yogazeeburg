DROP FUNCTION IF EXISTS public.import_publication_planning(text, jsonb, boolean);

CREATE OR REPLACE FUNCTION public.import_publication_planning(
  p_project_key text,
  p_rows jsonb,
  p_dry_run boolean DEFAULT true
)
RETURNS TABLE(planning_number smallint, action text, original_title text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $function$
declare
  v_project_id uuid;
  v_row jsonb;
  v_planning_number smallint;
  v_title text;
  v_cluster text;
  v_cta text;
  v_existing_id uuid;
  v_existing_status public.publication_article_status;
  v_existing_title text;
  v_existing_cluster text;
  v_existing_cta text;
begin
  if not public.current_user_is_any_publication_admin() then
    raise exception 'admin required';
  end if;

  select pp.id into v_project_id
  from public.publication_projects pp
  where pp.project_key = p_project_key
  for update;

  if v_project_id is null then
    raise exception 'Unknown project';
  end if;

  if jsonb_typeof(p_rows) <> 'array' then
    raise exception 'p_rows must be jsonb array';
  end if;
  if jsonb_array_length(p_rows) <> 180 then
    raise exception 'Expected 180 rows, got %', jsonb_array_length(p_rows);
  end if;

  for v_row in select * from jsonb_array_elements(p_rows) loop
    v_planning_number := (v_row->>'planning_number')::smallint;
    v_title := v_row->>'original_title';
    v_cluster := v_row->>'cluster';
    v_cta := v_row->>'cta_variant';

    if v_planning_number is null or v_planning_number < 1 or v_planning_number > 180 then
      raise exception 'Bad planning_number: %', v_row;
    end if;
    if v_title is null or length(v_title) = 0 then
      raise exception 'Missing title at %', v_planning_number;
    end if;

    select pa.id, pa.status, pa.original_title, pa.cluster, pa.cta_variant
      into v_existing_id, v_existing_status, v_existing_title, v_existing_cluster, v_existing_cta
    from public.publication_articles pa
    where pa.project_id = v_project_id
      and pa.planning_number = v_planning_number;

    if v_existing_id is null then
      if not p_dry_run then
        insert into public.publication_articles(project_id, planning_number, original_title, cluster, cta_variant, source_metadata)
        values (v_project_id, v_planning_number, v_title, v_cluster, v_cta, v_row);
      end if;
      planning_number := v_planning_number;
      action := 'insert';
      original_title := v_title;
      return next;
    elsif v_existing_title = v_title
      and coalesce(v_existing_cluster, '') = coalesce(v_cluster, '')
      and coalesce(v_existing_cta, '') = coalesce(v_cta, '') then
      planning_number := v_planning_number;
      action := 'unchanged';
      original_title := v_title;
      return next;
    else
      if v_existing_status <> 'planned' then
        planning_number := v_planning_number;
        action := 'skip_not_planned';
        original_title := v_existing_title;
        return next;
      else
        if not p_dry_run then
          update public.publication_articles pa
             set original_title = v_title,
                 cluster = v_cluster,
                 cta_variant = v_cta,
                 source_metadata = v_row,
                 updated_at = now()
           where pa.id = v_existing_id;
        end if;
        planning_number := v_planning_number;
        action := 'update';
        original_title := v_title;
        return next;
      end if;
    end if;
  end loop;

  if not p_dry_run then
    insert into public.publication_events(project_id, event_type, actor_type, actor_id, reason)
    values (v_project_id, 'planning_imported', 'admin', auth.uid(), 'importer');
  end if;
end;
$function$;