/** The single editable welcome/landing screen shown before the dog cards. */
export interface SiteSettings {
  id: string;
  caregiver_name: string | null;
  /** Free text, e.g. "Aug 20 - Aug 25" — not parsed, just displayed. */
  dates: string | null;
  thank_you_note: string | null;
  updated_at: string;
}

export interface Dog {
  id: string;
  /** Stable identity ('dog-1'..'dog-4') independent of the dog's name. */
  slug: string;
  name: string;
  nickname: string | null;
  /** A data URL (photo uploaded via the edit form) or a hosted image URL. */
  photo: string | null;
  /** A short, friendly first-person intro — "Meet [name]" — separate from
   * the more practical `notes` field below. */
  bio: string | null;
  /** Short trait/interest tags shown as pills — "Long walks", "Belly rubs" —
   * dating-profile style, alongside the bio. */
  likes: string[] | null;
  /** Short, honest quirks/flaws shown as pills — "Counter-surfs",
   * "Barks at the mail carrier" — same dating-profile treatment as likes. */
  bad_habits: string[] | null;
  breed: string | null;
  age: string | null;
  weight: string | null;
  /** What, when, and how much to feed. */
  food: string | null;
  /** Name, dose, and timing — null/empty means no medication. */
  medication: string | null;
  allergies: string | null;
  vet_name: string | null;
  vet_phone: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  /** Temperament, routine, and anything else a sitter should know. */
  notes: string | null;
  sort_order: number;
  updated_at: string;
}
