import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getHouseInfoAdmin } from "@/lib/house";
import { HouseForm } from "@/components/HouseForm";
import { updateHouseInfoAction } from "@/app/edit/actions";

export default async function EditHousePage() {
  const house = await getHouseInfoAdmin();

  return (
    <main className="mx-auto max-w-xl px-5 pt-10 pb-14">
      <Link href="/edit" className="flex items-center gap-1.5 text-sm text-[var(--color-ink-soft)] hover:underline">
        <ArrowLeft size={15} />
        Back
      </Link>
      <h1 className="mt-3 text-2xl font-semibold text-[var(--color-ink)]">House info</h1>
      <p className="mt-1 mb-6 text-sm text-[var(--color-ink-soft)]">
        WiFi, getting in, trash day, and anything else about the house itself.
      </p>
      <HouseForm house={house} action={updateHouseInfoAction} />
    </main>
  );
}
