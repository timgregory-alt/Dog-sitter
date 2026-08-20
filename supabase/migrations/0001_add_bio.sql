-- Adds the "Meet [name]" bio field and a nickname field to an
-- already-running project. Run this once in the Supabase SQL editor.

alter table public.dogs add column if not exists bio text;
alter table public.dogs add column if not exists nickname text;
