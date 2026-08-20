import "server-only";
import { createPublicClient, createAdminClient, isSupabaseConfigured } from "@/lib/supabase";
import { SEED_DOGS } from "@/lib/seed-data";
import type { Dog } from "@/lib/types";

/** All four dogs, ordered for display — public, no login required. */
export async function getDogsPublic(): Promise<Dog[]> {
  if (!isSupabaseConfigured) return SEED_DOGS;
  try {
    const supabase = createPublicClient();
    const { data } = await supabase.from("dogs").select("*").order("sort_order");
    return data && data.length > 0 ? (data as Dog[]) : SEED_DOGS;
  } catch {
    return SEED_DOGS;
  }
}

/** Same data, fetched with the service-role client so /edit works even
 * before RLS or the anon key are set up correctly. */
export async function getDogsAdmin(): Promise<Dog[]> {
  if (!isSupabaseConfigured) return SEED_DOGS;
  try {
    const supabase = createAdminClient();
    const { data } = await supabase.from("dogs").select("*").order("sort_order");
    return data && data.length > 0 ? (data as Dog[]) : SEED_DOGS;
  } catch {
    return SEED_DOGS;
  }
}

export async function getDogByIdAdmin(id: string): Promise<Dog | null> {
  const dogs = await getDogsAdmin();
  return dogs.find((d) => d.id === id) ?? null;
}
