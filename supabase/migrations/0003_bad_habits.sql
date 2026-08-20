-- Adds a "bad habits" tag list (same treatment as "likes") to an
-- already-running project. Run this once in the Supabase SQL editor.

alter table public.dogs add column if not exists bad_habits text[];
