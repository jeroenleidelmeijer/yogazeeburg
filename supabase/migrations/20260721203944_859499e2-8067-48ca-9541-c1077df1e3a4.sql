DROP FUNCTION IF EXISTS public.bootstrap_first_admin(text);

CREATE OR REPLACE FUNCTION public.bootstrap_first_admin(p_project_key text DEFAULT 'yoga-zeeburg-kennisbank'::text)
 RETURNS TABLE(project_id uuid, user_id uuid)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
declare
  v_user_id uuid := auth.uid();
  v_project_id uuid;
  v_existing_admin uuid;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  select pp.id into v_project_id
  from public.publication_projects pp
  where pp.project_key = p_project_key
  for update;

  if v_project_id is null then
    raise exception 'Unknown publication project: %', p_project_key;
  end if;

  select pa.user_id into v_existing_admin
  from public.publication_admins pa
  limit 1;

  if v_existing_admin is not null then
    raise exception 'Bootstrap already completed';
  end if;

  insert into public.publication_admins(project_id, user_id)
  values (v_project_id, v_user_id);

  insert into public.publication_events(project_id, event_type, actor_type, actor_id, reason, payload)
  values (v_project_id, 'admin_bootstrapped', 'admin', v_user_id, 'first admin', jsonb_build_object('user_id', v_user_id));

  return query select v_project_id, v_user_id;
end;
$function$;