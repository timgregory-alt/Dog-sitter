-- Adds the house_info table powering the "House" tab (wifi, entry info,
-- trash day, parking, notes) to an already-running project. Run this once
-- in the Supabase SQL editor.

create table if not exists public.house_info (
  id uuid primary key default gen_random_uuid(),
  address text,
  wifi_name text,
  wifi_password text,
  entry_info text,
  trash_day text,
  parking text,
  notes text,
  updated_at timestamptz not null default now()
);

alter table public.house_info enable row level security;

drop policy if exists "House info is public" on public.house_info;
create policy "House info is public" on public.house_info
  for select using (true);

insert into public.house_info (address, wifi_name, wifi_password, entry_info, trash_day, parking, notes)
select null, null, null, null, null, null, null
where not exists (select 1 from public.house_info);
