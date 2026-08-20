-- Adds a per-dog vertical photo crop-focus field to an already-running
-- project. Run this once in the Supabase SQL editor.

alter table public.dogs add column if not exists photo_position integer;
