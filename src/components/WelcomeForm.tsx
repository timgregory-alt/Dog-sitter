"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import type { SiteSettings } from "@/lib/types";
import type { ActionResult } from "@/app/edit/actions";

const inputClass =
  "h-11 w-full rounded-lg border border-[var(--color-line)] bg-white px-3 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/25";
const textareaClass =
  "min-h-24 w-full rounded-lg border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/25";
const labelClass = "flex flex-col gap-1 text-sm";
const labelTextClass = "text-xs font-medium uppercase tracking-wide text-[var(--color-ink-soft)]";

export function WelcomeForm({
  settings,
  action,
}: {
  settings: SiteSettings;
  action: (formData: FormData) => ActionResult | Promise<ActionResult>;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  return (
    <form
      action={(formData) => {
        setError(null);
        setSaved(false);
        startTransition(async () => {
          const result = await action(formData);
          if (result?.error) setError(result.error);
          else setSaved(true);
        });
      }}
      className="flex flex-col gap-5"
    >
      <label className={labelClass}>
        <span className={labelTextClass}>Caregiver&rsquo;s name</span>
        <input
          name="caregiver_name"
          defaultValue={settings.caregiver_name ?? ""}
          placeholder="e.g. Sam"
          className={inputClass}
        />
      </label>

      <label className={labelClass}>
        <span className={labelTextClass}>Dates</span>
        <input
          name="dates"
          defaultValue={settings.dates ?? ""}
          placeholder="e.g. Aug 20 - Aug 25"
          className={inputClass}
        />
      </label>

      <label className={labelClass}>
        <span className={labelTextClass}>Thank-you note</span>
        <textarea
          name="thank_you_note"
          defaultValue={settings.thank_you_note ?? ""}
          placeholder="Thanks so much for taking such good care of the pups while we're away!"
          className={textareaClass}
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && !error && <p className="text-sm text-[var(--color-accent-deep)]">Saved.</p>}

      <button
        type="submit"
        disabled={pending}
        className="flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
      >
        {pending && <Loader2 size={15} className="animate-spin" />}
        Save
      </button>
    </form>
  );
}
