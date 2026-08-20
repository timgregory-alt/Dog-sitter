import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSettingsAdmin } from "@/lib/settings";
import { WelcomeForm } from "@/components/WelcomeForm";
import { updateSettingsAction } from "@/app/edit/actions";

export default async function EditWelcomePage() {
  const settings = await getSettingsAdmin();

  return (
    <main className="mx-auto max-w-xl px-5 pt-10 pb-14">
      <Link href="/edit" className="flex items-center gap-1.5 text-sm text-[var(--color-ink-soft)] hover:underline">
        <ArrowLeft size={15} />
        Back
      </Link>
      <h1 className="mt-3 text-2xl font-semibold text-[var(--color-ink)]">Welcome page</h1>
      <p className="mt-1 mb-6 text-sm text-[var(--color-ink-soft)]">
        This is what your sitter sees first, before the dog cards.
      </p>
      <WelcomeForm settings={settings} action={updateSettingsAction} />
    </main>
  );
}
