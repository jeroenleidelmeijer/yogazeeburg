
-- === Referentiemigratie v1.0 ===
create extension if not exists pgcrypto;

do $$ begin create type public.publication_phase as enum ('phase_1_36','phase_37_60','phase_61_180'); exception when duplicate_object then null; end $$;
do $$ begin create type public.publication_article_status as enum ('planned','locked','drafting','validating','building','preview_check','publishing','live_check','published','retry_pending','failed','blocked'); exception when duplicate_object then null; end $$;
do $$ begin create type public.publication_run_status as enum ('running','published','retry_pending','failed','blocked','scheduled_noop','stopped_noop','configuration_blocked','cancelled'); exception when duplicate_object then null; end $$;
do $$ begin create type public.publication_trigger_type as enum ('scheduled','retry','manual','migration'); exception when duplicate_object then null; end $$;
do $$ begin create type public.publication_qa_stage as enum ('content','preview','live'); exception when duplicate_object then null; end $$;
do $$ begin create type public.publication_check_result as enum ('pass','fail','not_applicable'); exception when duplicate_object then null; end $$;
do $$ begin create type public.publication_notification_status as enum ('not_started','pending','sending','sent','failed','not_required'); exception when duplicate_object then null; end $$;
do $$ begin create type public.publication_notification_type as enum ('success','failure','end_of_series'); exception when duplicate_object then null; end $$;
do $$ begin create type public.publication_scheduler_slot as enum ('monday','wednesday','friday'); exception when duplicate_object then null; end $$;

create table if not exists public.publication_projects (
  id uuid primary key default gen_random_uuid(),
  project_key text not null unique,
  name text not null,
  timezone text not null default 'Europe/Amsterdam',
  production_origin text,
  knowledge_base_path text not null default '/nl/kennisbank',
  notification_recipient text,
  automation_enabled boolean not null default false,
  publication_stopped boolean not null default false,
  stopped_reason text,
  stopped_at timestamptz,
  end_notification_sent_at timestamptz,
  max_step_attempts smallint not null default 3 check (max_step_attempts between 1 and 10),
  active_instruction_versions jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (not publication_stopped or stopped_at is not null)
);

create table if not exists public.publication_admins (
  project_id uuid not null references public.publication_projects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (project_id, user_id)
);

create table if not exists public.publication_articles (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.publication_projects(id) on delete cascade,
  planning_number smallint not null check (planning_number between 1 and 180),
  phase public.publication_phase generated always as (
    case when planning_number <= 36 then 'phase_1_36'::public.publication_phase
         when planning_number <= 60 then 'phase_37_60'::public.publication_phase
         else 'phase_61_180'::public.publication_phase end
  ) stored,
  original_title text not null,
  final_title text,
  slug text,
  cluster text,
  category text,
  primary_keyword text,
  cta_variant text,
  source_metadata jsonb not null default '{}'::jsonb,
  status public.publication_article_status not null default 'planned',
  scheduled_at timestamptz,
  locked_at timestamptz,
  lock_expires_at timestamptz,
  lock_token uuid,
  locked_by text,
  active_run_id uuid,
  started_at timestamptz,
  published_at timestamptz,
  live_url text,
  content_hash text,
  deployment_id text,
  retry_count integer not null default 0 check (retry_count >= 0),
  last_error_category text,
  last_error_summary text,
  notification_status public.publication_notification_status not null default 'not_started',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, planning_number),
  unique (project_id, original_title),
  check (slug is null or slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  check (status <> 'published' or (published_at is not null and live_url is not null and content_hash is not null and deployment_id is not null)),
  check ((lock_token is null and locked_at is null and lock_expires_at is null and locked_by is null) or (lock_token is not null and locked_at is not null and lock_expires_at is not null and locked_by is not null))
);
create unique index if not exists publication_articles_project_slug_uq on public.publication_articles(project_id, slug) where slug is not null;
create index if not exists publication_articles_next_idx on public.publication_articles(project_id, planning_number, status);
create index if not exists publication_articles_lock_idx on public.publication_articles(project_id, lock_expires_at) where lock_token is not null;

create table if not exists public.publication_runs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.publication_projects(id) on delete cascade,
  article_id uuid references public.publication_articles(id) on delete restrict,
  parent_run_id uuid references public.publication_runs(id) on delete restrict,
  trigger_type public.publication_trigger_type not null,
  scheduler_slot public.publication_scheduler_slot,
  phase public.publication_phase,
  scheduled_for timestamptz,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  current_step text not null default 'initialize',
  final_status public.publication_run_status not null default 'running',
  source_snapshot jsonb not null default '{}'::jsonb,
  error_category text,
  error_summary text,
  error_details jsonb not null default '{}'::jsonb,
  warnings jsonb not null default '[]'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((final_status = 'running' and finished_at is null) or (final_status <> 'running' and finished_at is not null))
);
alter table public.publication_articles drop constraint if exists publication_articles_active_run_id_fkey;
alter table public.publication_articles add constraint publication_articles_active_run_id_fkey foreign key (active_run_id) references public.publication_runs(id) on delete set null;
create unique index if not exists publication_runs_one_running_per_article_uq on public.publication_runs(article_id) where final_status = 'running' and article_id is not null;
create index if not exists publication_runs_project_started_idx on public.publication_runs(project_id, started_at desc);

create table if not exists public.publication_required_qa_checks (
  check_key text not null,
  stage public.publication_qa_stage not null,
  description text not null,
  primary key (check_key, stage)
);

insert into public.publication_required_qa_checks(check_key, stage, description) values
  ('content_integrity','content','Inhoud volledig en zoekintentie zelfstandig'),
  ('fact_validation','content','First-party en externe feiten gevalideerd'),
  ('medical_safety','content','Medische veiligheidscontrole of geldige N/A'),
  ('cannibalization','content','Geen onopgeloste zoekwoordkannibalisatie'),
  ('cta_and_links','content','CTA-limiet en linkdoelen correct'),
  ('seo_metadata','content','SEO, GEO, canonicalplan en structured-data-input correct'),
  ('build','preview','Typecheck en productiebuild geslaagd'),
  ('preview_route','preview','Preview-artikelroute werkt'),
  ('preview_overview','preview','Overzicht, categorie, zoeken en filters werken'),
  ('preview_visual_desktop','preview','Desktop visueel gecontroleerd'),
  ('preview_visual_mobile','preview','Mobiel visueel gecontroleerd'),
  ('preview_regression','preview','Geen template- of navigatieregressie'),
  ('live_route','live','Live route geeft succesvolle response'),
  ('live_content','live','Juiste titel en content zichtbaar'),
  ('overview_card','live','Kaart zichtbaar op kennisbankoverzicht'),
  ('category_registration','live','Categorie vindt artikel'),
  ('search_registration','live','Titelzoekopdracht vindt artikel'),
  ('filter_registration','live','Relevante filters vinden artikel'),
  ('no_duplicate_article','live','Geen dubbele kaart, slug of registratie'),
  ('cta_destination','live','Intro Pass CTA werkt'),
  ('internal_links','live','Interne links bestaan en werken'),
  ('canonical','live','Canonical wijst naar juiste live URL'),
  ('metadata','live','Metadata past bij zichtbare content'),
  ('structured_data','live','Structured data valide en inhoudelijk gelijk'),
  ('sitemap','live','Sitemap bevat exact de juiste route'),
  ('publication_date','live','Datum is niet toekomstig in Amsterdam'),
  ('navigation_regression','live','Geen Nederlandse Yoga Gids-link in Engels hoofdmenu'),
  ('pilot_regression','live','Bestaande pilotartikelen en layout werken'),
  ('mobile_visual','live','Live mobiel visueel gecontroleerd'),
  ('desktop_visual','live','Live desktop visueel gecontroleerd')
on conflict (check_key, stage) do update set description = excluded.description;

create table if not exists public.publication_qa_checks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.publication_projects(id) on delete cascade,
  run_id uuid not null references public.publication_runs(id) on delete cascade,
  article_id uuid not null references public.publication_articles(id) on delete cascade,
  check_key text not null,
  stage public.publication_qa_stage not null,
  result public.publication_check_result not null,
  blocking boolean not null default true,
  summary text not null,
  evidence jsonb not null default '{}'::jsonb,
  checked_at timestamptz not null default now(),
  unique (run_id, check_key, stage),
  foreign key (check_key, stage) references public.publication_required_qa_checks(check_key, stage)
);
create index if not exists publication_qa_run_idx on public.publication_qa_checks(run_id, stage, result);

create table if not exists public.publication_events (
  id bigint generated always as identity primary key,
  project_id uuid not null references public.publication_projects(id) on delete cascade,
  article_id uuid references public.publication_articles(id) on delete restrict,
  run_id uuid references public.publication_runs(id) on delete restrict,
  event_type text not null,
  actor_type text not null check (actor_type in ('system','automation','admin','migration')),
  actor_id uuid references auth.users(id) on delete set null,
  reason text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists publication_events_project_created_idx on public.publication_events(project_id, created_at desc);

create table if not exists public.publication_notifications (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.publication_projects(id) on delete cascade,
  article_id uuid references public.publication_articles(id) on delete restrict,
  run_id uuid references public.publication_runs(id) on delete restrict,
  notification_type public.publication_notification_type not null,
  recipient text not null,
  subject text not null,
  idempotency_key text not null unique,
  status public.publication_notification_status not null default 'pending',
  attempt_count integer not null default 0 check (attempt_count >= 0),
  external_message_id text,
  sent_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((status = 'sent' and sent_at is not null) or status <> 'sent')
);
create index if not exists publication_notifications_pending_idx on public.publication_notifications(project_id, status, created_at);

-- === Admin check ===
create or replace function public.is_publication_admin(p_project_id uuid)
returns boolean language sql stable security definer set search_path = public, pg_temp as $$
  select exists (select 1 from public.publication_admins a where a.project_id = p_project_id and a.user_id = auth.uid());
$$;
revoke all on function public.is_publication_admin(uuid) from public, anon;
grant execute on function public.is_publication_admin(uuid) to authenticated, service_role;

create or replace function public.current_user_is_any_publication_admin()
returns boolean language sql stable security definer set search_path = public, pg_temp as $$
  select exists (select 1 from public.publication_admins a where a.user_id = auth.uid());
$$;
revoke all on function public.current_user_is_any_publication_admin() from public, anon;
grant execute on function public.current_user_is_any_publication_admin() to authenticated, service_role;

-- === RLS ===
alter table public.publication_projects enable row level security;
alter table public.publication_admins enable row level security;
alter table public.publication_articles enable row level security;
alter table public.publication_runs enable row level security;
alter table public.publication_required_qa_checks enable row level security;
alter table public.publication_qa_checks enable row level security;
alter table public.publication_events enable row level security;
alter table public.publication_notifications enable row level security;

drop policy if exists publication_projects_admin_read on public.publication_projects;
create policy publication_projects_admin_read on public.publication_projects for select to authenticated using (public.is_publication_admin(id));

drop policy if exists publication_admins_self_read on public.publication_admins;
create policy publication_admins_self_read on public.publication_admins for select to authenticated using (user_id = auth.uid());

drop policy if exists publication_articles_admin_read on public.publication_articles;
create policy publication_articles_admin_read on public.publication_articles for select to authenticated using (public.is_publication_admin(project_id));

drop policy if exists publication_runs_admin_read on public.publication_runs;
create policy publication_runs_admin_read on public.publication_runs for select to authenticated using (public.is_publication_admin(project_id));

drop policy if exists publication_required_checks_admin_read on public.publication_required_qa_checks;
create policy publication_required_checks_admin_read on public.publication_required_qa_checks for select to authenticated using (
  exists (select 1 from public.publication_admins a where a.user_id = auth.uid())
);

drop policy if exists publication_qa_admin_read on public.publication_qa_checks;
create policy publication_qa_admin_read on public.publication_qa_checks for select to authenticated using (public.is_publication_admin(project_id));

drop policy if exists publication_events_admin_read on public.publication_events;
create policy publication_events_admin_read on public.publication_events for select to authenticated using (public.is_publication_admin(project_id));

drop policy if exists publication_notifications_admin_read on public.publication_notifications;
create policy publication_notifications_admin_read on public.publication_notifications for select to authenticated using (public.is_publication_admin(project_id));

revoke all on public.publication_projects, public.publication_admins, public.publication_articles,
  public.publication_runs, public.publication_required_qa_checks, public.publication_qa_checks,
  public.publication_events, public.publication_notifications from anon;
revoke insert, update, delete, truncate, references, trigger
  on public.publication_projects, public.publication_admins, public.publication_articles,
     public.publication_runs, public.publication_required_qa_checks, public.publication_qa_checks,
     public.publication_events, public.publication_notifications from authenticated;
grant select on public.publication_projects, public.publication_admins, public.publication_articles,
  public.publication_runs, public.publication_required_qa_checks, public.publication_qa_checks,
  public.publication_events, public.publication_notifications to authenticated;

-- === Project seed ===
insert into public.publication_projects(project_key, name, timezone, knowledge_base_path, automation_enabled, publication_stopped, active_instruction_versions)
values ('yoga-zeeburg-kennisbank','Yoga Zeeburg Yoga Gids','Europe/Amsterdam','/nl/kennisbank', false, false,
  '{"automation":"1.0","pilot_addendum":"1.0","master":"2"}'::jsonb)
on conflict (project_key) do update set name = excluded.name, timezone = excluded.timezone,
  knowledge_base_path = excluded.knowledge_base_path, active_instruction_versions = excluded.active_instruction_versions, updated_at = now();

-- === Bootstrap first admin (option a) ===
create or replace function public.bootstrap_first_admin(p_project_key text default 'yoga-zeeburg-kennisbank')
returns table(project_id uuid, user_id uuid)
language plpgsql security definer set search_path = public, pg_temp as $$
declare v_uid uuid := auth.uid(); v_proj public.publication_projects%rowtype;
begin
  if v_uid is null then raise exception 'Authentication required'; end if;
  select * into v_proj from public.publication_projects where project_key = p_project_key for update;
  if not found then raise exception 'Unknown publication project: %', p_project_key; end if;
  -- Atomic lock on admins for this project. Fail hard if any admin exists.
  perform 1 from public.publication_admins where project_id = v_proj.id limit 1;
  if found then raise exception 'Bootstrap already completed'; end if;
  insert into public.publication_admins(project_id, user_id) values (v_proj.id, v_uid);
  insert into public.publication_events(project_id, event_type, actor_type, actor_id, reason, payload)
    values (v_proj.id, 'admin_bootstrapped','admin', v_uid, 'first admin', jsonb_build_object('user_id', v_uid));
  return query select v_proj.id, v_uid;
end; $$;
revoke all on function public.bootstrap_first_admin(text) from public, anon;
grant execute on function public.bootstrap_first_admin(text) to authenticated;

-- === Idempotent 180-record importer ===
create or replace function public.import_publication_planning(
  p_project_key text,
  p_rows jsonb,
  p_dry_run boolean default true
) returns table(planning_number smallint, action text, original_title text)
language plpgsql security definer set search_path = public, pg_temp as $$
declare
  v_proj public.publication_projects%rowtype;
  v_row jsonb; v_n smallint; v_title text; v_cluster text; v_cta text; v_existing public.publication_articles%rowtype;
begin
  if not public.current_user_is_any_publication_admin() then raise exception 'admin required'; end if;
  select * into v_proj from public.publication_projects where project_key = p_project_key for update;
  if not found then raise exception 'Unknown project'; end if;
  if jsonb_typeof(p_rows) <> 'array' then raise exception 'p_rows must be jsonb array'; end if;
  if jsonb_array_length(p_rows) <> 180 then raise exception 'Expected 180 rows, got %', jsonb_array_length(p_rows); end if;

  for v_row in select * from jsonb_array_elements(p_rows) loop
    v_n := (v_row->>'planning_number')::smallint;
    v_title := v_row->>'original_title';
    v_cluster := v_row->>'cluster';
    v_cta := v_row->>'cta_variant';
    if v_n is null or v_n < 1 or v_n > 180 then raise exception 'Bad planning_number: %', v_row; end if;
    if v_title is null or length(v_title) = 0 then raise exception 'Missing title at %', v_n; end if;

    select * into v_existing from public.publication_articles where project_id = v_proj.id and planning_number = v_n;
    if not found then
      if not p_dry_run then
        insert into public.publication_articles(project_id, planning_number, original_title, cluster, cta_variant, source_metadata)
        values (v_proj.id, v_n, v_title, v_cluster, v_cta, v_row);
      end if;
      return query select v_n, 'insert'::text, v_title;
    elsif v_existing.original_title = v_title and coalesce(v_existing.cluster,'') = coalesce(v_cluster,'') and coalesce(v_existing.cta_variant,'') = coalesce(v_cta,'') then
      return query select v_n, 'unchanged'::text, v_title;
    else
      if v_existing.status <> 'planned' then
        return query select v_n, 'skip_not_planned'::text, v_existing.original_title;
      else
        if not p_dry_run then
          update public.publication_articles set original_title = v_title, cluster = v_cluster, cta_variant = v_cta, source_metadata = v_row, updated_at = now()
          where id = v_existing.id;
        end if;
        return query select v_n, 'update'::text, v_title;
      end if;
    end if;
  end loop;

  if not p_dry_run then
    insert into public.publication_events(project_id, event_type, actor_type, actor_id, reason)
      values (v_proj.id, 'planning_imported', 'admin', auth.uid(), 'importer');
  end if;
end; $$;
revoke all on function public.import_publication_planning(text, jsonb, boolean) from public, anon;
grant execute on function public.import_publication_planning(text, jsonb, boolean) to authenticated;

-- === Admin recovery RPCs ===
create or replace function public.admin_release_stale_lock(p_article_id uuid, p_reason text default null)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare v_art public.publication_articles%rowtype;
begin
  select * into v_art from public.publication_articles where id = p_article_id for update;
  if not found then raise exception 'Unknown article'; end if;
  if not public.is_publication_admin(v_art.project_id) then raise exception 'admin required'; end if;
  update public.publication_articles set lock_token=null, locked_at=null, lock_expires_at=null, locked_by=null,
    active_run_id=null, status = case when status='locked' then 'planned' else status end, updated_at=now()
  where id = p_article_id;
  update public.publication_runs set final_status='cancelled', finished_at=now(), current_step='admin_released', updated_at=now()
    where article_id = p_article_id and final_status = 'running';
  insert into public.publication_events(project_id, article_id, event_type, actor_type, actor_id, reason)
    values (v_art.project_id, p_article_id, 'lock_released_by_admin','admin', auth.uid(), p_reason);
end; $$;

create or replace function public.admin_mark_article(p_article_id uuid, p_new_status public.publication_article_status, p_reason text default null)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare v_art public.publication_articles%rowtype;
begin
  select * into v_art from public.publication_articles where id = p_article_id for update;
  if not found then raise exception 'Unknown article'; end if;
  if not public.is_publication_admin(v_art.project_id) then raise exception 'admin required'; end if;
  if p_new_status = 'published' then raise exception 'Use complete_publication_success for published state'; end if;
  update public.publication_articles set status = p_new_status,
    last_error_category = case when p_new_status in ('failed','blocked') then coalesce(last_error_category,'admin_marked') else null end,
    last_error_summary = case when p_new_status in ('failed','blocked') then coalesce(p_reason, last_error_summary) else null end,
    updated_at = now()
  where id = p_article_id;
  insert into public.publication_events(project_id, article_id, event_type, actor_type, actor_id, reason, payload)
    values (v_art.project_id, p_article_id, 'article_status_admin_override','admin', auth.uid(), p_reason, jsonb_build_object('new_status', p_new_status));
end; $$;

create or replace function public.admin_set_automation(p_project_key text, p_enabled boolean, p_reason text default null)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare v_proj public.publication_projects%rowtype;
begin
  select * into v_proj from public.publication_projects where project_key = p_project_key for update;
  if not found then raise exception 'Unknown project'; end if;
  if not public.is_publication_admin(v_proj.id) then raise exception 'admin required'; end if;
  update public.publication_projects set automation_enabled = p_enabled, updated_at = now() where id = v_proj.id;
  insert into public.publication_events(project_id, event_type, actor_type, actor_id, reason, payload)
    values (v_proj.id, 'automation_toggled','admin', auth.uid(), p_reason, jsonb_build_object('enabled', p_enabled));
end; $$;

create or replace function public.admin_stop_publication(p_project_key text, p_reason text)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare v_proj public.publication_projects%rowtype;
begin
  select * into v_proj from public.publication_projects where project_key = p_project_key for update;
  if not found then raise exception 'Unknown project'; end if;
  if not public.is_publication_admin(v_proj.id) then raise exception 'admin required'; end if;
  update public.publication_projects set publication_stopped = true, stopped_reason = coalesce(p_reason,'admin_stop'), stopped_at = now(), updated_at = now()
  where id = v_proj.id;
  insert into public.publication_events(project_id, event_type, actor_type, actor_id, reason)
    values (v_proj.id, 'publication_stopped','admin', auth.uid(), p_reason);
end; $$;

revoke all on function public.admin_release_stale_lock(uuid, text) from public, anon;
revoke all on function public.admin_mark_article(uuid, public.publication_article_status, text) from public, anon;
revoke all on function public.admin_set_automation(text, boolean, text) from public, anon;
revoke all on function public.admin_stop_publication(text, text) from public, anon;
grant execute on function public.admin_release_stale_lock(uuid, text) to authenticated;
grant execute on function public.admin_mark_article(uuid, public.publication_article_status, text) to authenticated;
grant execute on function public.admin_set_automation(text, boolean, text) to authenticated;
grant execute on function public.admin_stop_publication(text, text) to authenticated;

-- === Backfill pilot articles 1-3 ===
create or replace function public.backfill_pilot_articles()
returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare v_proj public.publication_projects%rowtype;
begin
  select * into v_proj from public.publication_projects where project_key = 'yoga-zeeburg-kennisbank' for update;
  if not found then raise exception 'Project missing'; end if;
  if not public.is_publication_admin(v_proj.id) then raise exception 'admin required'; end if;

  insert into public.publication_articles(project_id, planning_number, original_title, final_title, slug, cluster, cta_variant, status, published_at, live_url, content_hash, deployment_id, notification_status)
  values
    (v_proj.id, 1, 'Proefles yoga in Amsterdam Oost: wat kun je verwachten?', 'Proefles yoga in Amsterdam Oost: wat kun je verwachten?',
     'proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten','Yoga in Amsterdam Oost','local','published',
     '2026-07-21 08:00:00+00','https://www.yogazeeburg.com/nl/kennisbank/proefles-yoga-in-amsterdam-oost-wat-kun-je-verwachten','pilot-1','backfill','not_required'),
    (v_proj.id, 2, 'Yoga in Amsterdam Oost: welke yogastudio past bij jou?', 'Yoga in Amsterdam Oost: welke yogastudio past bij jou?',
     'yoga-in-amsterdam-oost-welke-yogastudio-past-bij-jou','Yoga in Amsterdam Oost','local','published',
     '2026-07-21 09:00:00+00','https://www.yogazeeburg.com/nl/kennisbank/yoga-in-amsterdam-oost-welke-yogastudio-past-bij-jou','pilot-2','backfill','not_required'),
    (v_proj.id, 3, 'Yoga voor beginners in Amsterdam Oost: zo start je', 'Yoga voor beginners in Amsterdam Oost: zo start je',
     'yoga-voor-beginners-in-amsterdam-oost-zo-start-je','Yoga in Amsterdam Oost','local','published',
     '2026-07-21 10:00:00+00','https://www.yogazeeburg.com/nl/kennisbank/yoga-voor-beginners-in-amsterdam-oost-zo-start-je','pilot-3','backfill','not_required')
  on conflict (project_id, planning_number) do update set
    final_title = excluded.final_title, slug = excluded.slug, status = 'published',
    published_at = excluded.published_at, live_url = excluded.live_url,
    content_hash = excluded.content_hash, deployment_id = excluded.deployment_id, updated_at = now();

  insert into public.publication_events(project_id, event_type, actor_type, actor_id, reason)
    values (v_proj.id, 'pilot_backfilled','migration', auth.uid(), 'pilot articles 1-3');
end; $$;
revoke all on function public.backfill_pilot_articles() from public, anon;
grant execute on function public.backfill_pilot_articles() to authenticated;
