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
