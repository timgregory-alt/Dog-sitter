import "server-only";
import { createPublicClient, createAdminClient, isSupabaseConfigured } from "@/lib/supabase";
import { SEED_SETTINGS } from "@/lib/seed-data";
import type { SiteSettings } from "@/lib/types";

export async function getSettingsPublic(): Promise<SiteSettings> {
  if (!isSupabaseConfigured) return SEED_SETTINGS;
  try {
    const supabase = createPublicClient();
    const { data } = await supabase.from("site_settings").select("*").single();
    return (data as SiteSettings) ?? SEED_SETTINGS;
  } catch {
    return SEED_SETTINGS;
  }
}

export async function getSettingsAdmin(): Promise<SiteSettings> {
  if (!isSupabaseConfigured) return SEED_SETTINGS;
  try {
    const supabase = createAdminClient();
    const { data } = await supabase.from("site_settings").select("*").single();
    return (data as SiteSettings) ?? SEED_SETTINGS;
  } catch {
    return SEED_SETTINGS;
  }
}
