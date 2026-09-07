-- CRM access control: only allowlisted Supabase Auth users may read or update CRM data.
create table if not exists public.staff_allowlist (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  role text not null default 'staff' check (role in ('admin', 'staff')),
  created_at timestamptz not null default now()
);

alter table public.staff_allowlist enable row level security;
revoke all on table public.staff_allowlist from anon, authenticated;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.staff_allowlist
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_staff() from public;
grant execute on function public.is_staff() to authenticated;

alter table public.leads enable row level security;
alter table public.ai_query_logs enable row level security;

-- Remove the legacy policies that granted every authenticated account full CRM access.
drop policy if exists authenticated_select_ai_logs on public.ai_query_logs;
drop policy if exists authenticated_select_leads on public.leads;
drop policy if exists leads_select_auth on public.leads;
drop policy if exists authenticated_update_leads on public.leads;

drop policy if exists "0003 staff select leads" on public.leads;
create policy "0003 staff select leads"
  on public.leads for select to authenticated
  using (public.is_staff());

drop policy if exists "0003 staff update leads" on public.leads;
create policy "0003 staff update leads"
  on public.leads for update to authenticated
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists "0003 staff select ai_query_logs" on public.ai_query_logs;
create policy "0003 staff select ai_query_logs"
  on public.ai_query_logs for select to authenticated
  using (public.is_staff());

-- Deliberately preserve the existing anonymous INSERT-only policies used by public forms.
