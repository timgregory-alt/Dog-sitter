-- Dog Sitter — schema
-- Run this in the Supabase SQL editor before seed.sql.

create extension if not exists "pgcrypto";

create table if not exists public.dogs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  nickname text,
  photo text,
  photo_position integer,
  bio text,
  likes text[],
  bad_habits text[],
  breed text,
  age text,
  weight text,
  food text,
  medication text,
  allergies text,
  vet_name text,
  vet_phone text,
  emergency_contact_name text,
  emergency_contact_phone text,
  notes text,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create index if not exists dogs_sort_idx on public.dogs (sort_order);

alter table public.dogs enable row level security;

-- Publicly readable — this is the no-login page shared with the sitter.
create policy "Dogs are public" on public.dogs
  for select using (true);

-- Deliberately no insert/update/delete policy: the /edit pages write
-- through the service-role key (SUPABASE_SERVICE_ROLE_KEY), which bypasses
-- RLS entirely, gated instead by the EDIT_PASSCODE check in the app.

-- ---------------------------------------------------------------------------
-- site_settings — a single row powering the editable welcome/landing page
-- (caregiver name, dates, thank-you note). Same public-read/service-role-write
-- pattern as dogs.
-- ---------------------------------------------------------------------------
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  caregiver_name text,
  dates text,
  thank_you_note text,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

create policy "Site settings are public" on public.site_settings
  for select using (true);
