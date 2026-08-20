"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase";
import { hasEditSession, trySetEditSession, clearEditSession } from "@/lib/session";

export type ActionResult = { error: string } | void;

export async function verifyPasscodeAction(formData: FormData): Promise<ActionResult> {
  const passcode = String(formData.get("passcode") ?? "");
  const ok = await trySetEditSession(passcode);
  if (!ok) return { error: "That's not the right passcode." };
  revalidatePath("/edit");
}

export async function logoutAction(): Promise<void> {
  await clearEditSession();
  revalidatePath("/edit");
}

export async function updateDogAction(dogId: string, formData: FormData): Promise<ActionResult> {
  if (!(await hasEditSession())) return { error: "Not authorized" };

  const photo = String(formData.get("photo") ?? "").trim();

  const dog = {
    name: String(formData.get("name") ?? "").trim(),
    nickname: String(formData.get("nickname") ?? "").trim() || null,
    photo: photo || null,
    bio: String(formData.get("bio") ?? "").trim() || null,
    breed: String(formData.get("breed") ?? "").trim() || null,
    age: String(formData.get("age") ?? "").trim() || null,
    weight: String(formData.get("weight") ?? "").trim() || null,
    food: String(formData.get("food") ?? "").trim() || null,
    medication: String(formData.get("medication") ?? "").trim() || null,
    allergies: String(formData.get("allergies") ?? "").trim() || null,
    vet_name: String(formData.get("vet_name") ?? "").trim() || null,
    vet_phone: String(formData.get("vet_phone") ?? "").trim() || null,
    emergency_contact_name: String(formData.get("emergency_contact_name") ?? "").trim() || null,
    emergency_contact_phone: String(formData.get("emergency_contact_phone") ?? "").trim() || null,
    notes: String(formData.get("notes") ?? "").trim() || null,
    updated_at: new Date().toISOString(),
  };

  if (!dog.name) return { error: "Name is required" };

  const supabase = createAdminClient();
  const { error } = await supabase.from("dogs").update(dog).eq("id", dogId);
  if (error) return { error: error.message };

  revalidatePath("/edit");
  revalidatePath(`/edit/${dogId}`);
  revalidatePath("/");
}
