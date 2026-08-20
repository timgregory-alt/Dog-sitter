# Dog Sitter

A tiny, standalone app with one job: give whoever is watching your dogs a link with everything they need — a photo of each dog, food, medication, allergies, vet info, and an emergency contact.

Built with Next.js (App Router) + TypeScript + Tailwind CSS + Supabase (just a database — no auth system).

## Pages

- **`/`** — the public welcome/landing screen (caregiver's name, dates, a thank-you note) with a button through to `/dogs`. No login. This is the link you send your sitter.
- **`/dogs`** — the four dog cards, one at a time. Tap a card to flip it from "meet the pet" (photo, nickname, bio, likes) to practical care info (food, medication, vet, emergency contact). Swipe right for the next dog, left for the previous one, or use the arrow buttons / dots.
- **`/house`** — a single card with WiFi, getting in, trash day, parking, and any other house notes. A "Pets / House" tab switcher at the top of both `/dogs` and `/house` moves between the two.
- **`/edit`** — where you fill in each dog's info and upload a photo, plus links to `/edit/welcome` (landing screen text) and `/edit/house` (the House tab). Gated by a passcode (not a real login system — see below), not linked from the public pages.

The app runs without any environment variables configured — `/dogs` shows four blank placeholder cards so the UI is browsable immediately. Nothing persists and `/edit` won't work until Supabase is connected.

## 1. Install

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## 2. Environment variables

Copy `.env.example` to `.env.local` and fill in the values.

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL (Settings → API) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | The anon/publishable key (Settings → API) |
| `SUPABASE_SERVICE_ROLE_KEY` | The service role/secret key (Settings → API). **Server-only — never expose this to the browser.** |
| `EDIT_PASSCODE` | Whatever passcode you want to type at `/edit` to unlock editing. |

## 3. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run `supabase/schema.sql` then `supabase/seed.sql` — this creates the `dogs`, `site_settings`, and `house_info` tables (RLS: publicly readable, writes only via the service-role key) and seeds four placeholder dogs plus one empty settings row and one empty house_info row.
   - If you're updating an already-running project instead of starting fresh, run the files in `supabase/migrations/` in order instead (they're additive and safe to run once).
3. Grab the Project URL, anon key, and service role key from **Project Settings → API** and add them to `.env.local` (and to your deployment's environment variables).

## 4. Deploy on Vercel

1. Push this repo to GitHub (already done if you're reading this from the repo) and import it in [Vercel](https://vercel.com/new).
2. Add the four environment variables from step 2 in the Vercel project's **Settings → Environment Variables**.
3. Deploy. Vercel gives you a URL like `https://dog-sitter-xxxx.vercel.app` — that's the link to send your sitter (pointing them at the root `/`, not `/edit`).

## How editing works

There's no Supabase Auth, no sign-up flow, no user accounts — this app has exactly one editor (you) and one passcode. Submitting the right passcode at `/edit` sets an httpOnly cookie; from then on, Server Actions in `src/app/edit/actions.ts` write through the Supabase **service-role** key, which bypasses Row Level Security entirely. The `dogs` table itself has no public write policy at all — only `SELECT` is open — so the passcode is the only thing standing between the public internet and edits. It's a light deterrent appropriate for a low-stakes personal page, not bank-grade security; don't reuse a sensitive password as the passcode.

## Project structure

```
src/
  app/
    page.tsx              The welcome/landing screen (video background, thank-you note)
    dogs/page.tsx           The flip-card carousel of the four dogs
    house/page.tsx           The House tab (wifi, entry info, trash, parking, notes)
    edit/
      layout.tsx             Passcode gate
      page.tsx                 List of the four dogs + links to the welcome/house editors
      [id]/page.tsx              Edit form for one dog
      welcome/page.tsx            Edit form for the welcome screen's text
      house/page.tsx               Edit form for the House tab
      actions.ts                    Server Actions (passcode check + save)
  components/
    DogCarousel.tsx        Swipe/arrow/dot navigation between dogs
    DogFlipCard.tsx          The flip card itself (front: meet the pet, back: care info)
    DogForm.tsx                Edit form, including client-side photo resize/upload
    WelcomeForm.tsx              Edit form for caregiver name / dates / thank-you note
    HouseForm.tsx                 Edit form for the House tab
    PageTabs.tsx                   "Pets / House" tab switcher
    PasscodeForm.tsx                 The /edit lock screen
  lib/
    types.ts               Dog, SiteSettings, and HouseInfo types
    supabase.ts              Public + service-role Supabase clients
    dogs.ts                     Dog data access (with seed-data fallback)
    settings.ts                   Welcome-screen data access (with seed-data fallback)
    house.ts                        House-tab data access (with seed-data fallback)
    seed-data.ts                      Blank placeholder dogs + settings + house info
    session.ts                          Passcode cookie handling
public/
  welcome-bg.mp4          Background video for the welcome screen
supabase/
  schema.sql, seed.sql, migrations/
```

## Photos

Photos are resized to a max dimension of 1000px and re-encoded as JPEG in the browser before upload, then stored inline as a base64 data URL on the dog's row — there's no separate storage bucket, which is unnecessary complexity for four photos.
