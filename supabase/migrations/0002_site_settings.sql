-- Adds the site_settings table powering the editable welcome/landing page
-- (caregiver name, dates, thank-you note) to an already-running project.
-- Run this once in the Supabase SQL editor, after 0001_add_bio.sql.

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  caregiver_name text,
  dates text,
  thank_you_note text,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

drop policy if exists "Site settings are public" on public.site_settings;
create policy "Site settings are public" on public.site_settings
  for select using (true);

insert into public.site_settings (caregiver_name, dates, thank_you_note)
select null, null, null
where not exists (select 1 from public.site_settings);
