-- Adds the "Meet [name]" bio field, a nickname field, and a "likes" tag
-- list to an already-running project. Run this once in the Supabase SQL
-- editor.

alter table public.dogs add column if not exists bio text;
alter table public.dogs add column if not exists nickname text;
alter table public.dogs add column if not exists likes text[];
