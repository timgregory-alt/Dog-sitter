import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = !!url && !!anonKey;

/** Public, read-only client (anon/publishable key) — used to render the
 * sitter-facing page. Reads are open by RLS policy, writes are not. */
export function createPublicClient() {
  return createClient(url, anonKey);
}

/** Service-role client — bypasses RLS entirely. Only ever called from the
 * passcode-gated Server Actions in src/app/edit. */
export function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured");
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
