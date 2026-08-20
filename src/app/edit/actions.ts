"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase";
import { hasEditSession, trySetEditSession, clearEditSession } from "@/lib/session";
import { getSettingsAdmin } from "@/lib/settings";
import { getHouseInfoAdmin } from "@/lib/house";

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
  const rawPhotoPosition = String(formData.get("photo_position") ?? "").trim();
  const photoPosition = rawPhotoPosition ? Number(rawPhotoPosition) : null;
  const likes = String(formData.get("likes") ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const badHabits = String(formData.get("bad_habits") ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const dog = {
    name: String(formData.get("name") ?? "").trim(),
    nickname: String(formData.get("nickname") ?? "").trim() || null,
    photo: photo || null,
    photo_position: photoPosition !== null && !Number.isNaN(photoPosition) ? photoPosition : null,
    bio: String(formData.get("bio") ?? "").trim() || null,
    likes: likes.length > 0 ? likes : null,
    bad_habits: badHabits.length > 0 ? badHabits : null,
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
  revalidatePath("/dogs");
}

export async function updateSettingsAction(formData: FormData): Promise<ActionResult> {
  if (!(await hasEditSession())) return { error: "Not authorized" };

  const settings = await getSettingsAdmin();

  const values = {
    caregiver_name: String(formData.get("caregiver_name") ?? "").trim() || null,
    dates: String(formData.get("dates") ?? "").trim() || null,
    thank_you_note: String(formData.get("thank_you_note") ?? "").trim() || null,
    updated_at: new Date().toISOString(),
  };

  const supabase = createAdminClient();
  const { error } = await supabase.from("site_settings").update(values).eq("id", settings.id);
  if (error) return { error: error.message };

  revalidatePath("/edit/welcome");
  revalidatePath("/");
}

export async function updateHouseInfoAction(formData: FormData): Promise<ActionResult> {
  if (!(await hasEditSession())) return { error: "Not authorized" };

  const house = await getHouseInfoAdmin();

  const values = {
    address: String(formData.get("address") ?? "").trim() || null,
    wifi_name: String(formData.get("wifi_name") ?? "").trim() || null,
    wifi_password: String(formData.get("wifi_password") ?? "").trim() || null,
    entry_info: String(formData.get("entry_info") ?? "").trim() || null,
    trash_day: String(formData.get("trash_day") ?? "").trim() || null,
    parking: String(formData.get("parking") ?? "").trim() || null,
    notes: String(formData.get("notes") ?? "").trim() || null,
    updated_at: new Date().toISOString(),
  };

  const supabase = createAdminClient();
  const { error } = await supabase.from("house_info").update(values).eq("id", house.id);
  if (error) return { error: error.message };

  revalidatePath("/edit/house");
  revalidatePath("/house");
}
