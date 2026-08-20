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
