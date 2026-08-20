import type { Dog, SiteSettings } from "./types";

export const SEED_SETTINGS: SiteSettings = {
  id: "settings",
  caregiver_name: null,
  dates: null,
  thank_you_note: null,
  updated_at: "2026-01-01T00:00:00.000Z",
};

/** Four blank dog profiles, used when Supabase isn't configured so the app
 * is still browsable. Real info only persists once Supabase is connected. */
export const SEED_DOGS: Dog[] = [1, 2, 3, 4].map((n) => ({
  id: `dog-${n}`,
  slug: `dog-${n}`,
  name: `Dog ${n}`,
  nickname: null,
  photo: null,
  bio: null,
  likes: null,
  breed: null,
  age: null,
  weight: null,
  food: null,
  medication: null,
  allergies: null,
  vet_name: null,
  vet_phone: null,
  emergency_contact_name: null,
  emergency_contact_phone: null,
  notes: null,
  sort_order: n,
  updated_at: "2026-01-01T00:00:00.000Z",
}));
