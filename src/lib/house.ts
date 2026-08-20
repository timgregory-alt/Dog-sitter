import "server-only";
import { createPublicClient, createAdminClient, isSupabaseConfigured } from "@/lib/supabase";
import { SEED_HOUSE_INFO } from "@/lib/seed-data";
import type { HouseInfo } from "@/lib/types";

export async function getHouseInfoPublic(): Promise<HouseInfo> {
  if (!isSupabaseConfigured) return SEED_HOUSE_INFO;
  try {
    const supabase = createPublicClient();
    const { data } = await supabase.from("house_info").select("*").single();
    return (data as HouseInfo) ?? SEED_HOUSE_INFO;
  } catch {
    return SEED_HOUSE_INFO;
  }
}

export async function getHouseInfoAdmin(): Promise<HouseInfo> {
  if (!isSupabaseConfigured) return SEED_HOUSE_INFO;
  try {
    const supabase = createAdminClient();
    const { data } = await supabase.from("house_info").select("*").single();
    return (data as HouseInfo) ?? SEED_HOUSE_INFO;
  } catch {
    return SEED_HOUSE_INFO;
  }
}
