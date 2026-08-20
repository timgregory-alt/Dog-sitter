-- Dog Sitter — seed data
-- Run after schema.sql. Safe to re-run — only inserts rows that don't
-- already exist by slug, so it never overwrites info you've filled in.

insert into public.dogs (slug, name, sort_order)
values
  ('dog-1', 'Dog 1', 1),
  ('dog-2', 'Dog 2', 2),
  ('dog-3', 'Dog 3', 3),
  ('dog-4', 'Dog 4', 4)
on conflict (slug) do nothing;

-- A single settings row for the welcome page — never overwritten if one
-- already exists.
insert into public.site_settings (caregiver_name, dates, thank_you_note)
select null, null, null
where not exists (select 1 from public.site_settings);

-- A single house_info row for the House tab — never overwritten if one
-- already exists.
insert into public.house_info (address, wifi_name, wifi_password, entry_info, trash_day, parking, notes)
select null, null, null, null, null, null, null
where not exists (select 1 from public.house_info);
