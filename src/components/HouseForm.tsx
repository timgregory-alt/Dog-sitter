"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import type { HouseInfo } from "@/lib/types";
import type { ActionResult } from "@/app/edit/actions";

const inputClass =
  "h-11 w-full rounded-lg border border-[var(--color-line)] bg-white px-3 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/25";
const textareaClass =
  "min-h-24 w-full rounded-lg border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/25";
const labelClass = "flex flex-col gap-1 text-sm";
const labelTextClass = "text-xs font-medium uppercase tracking-wide text-[var(--color-ink-soft)]";

export function HouseForm({
  house,
  action,
}: {
  house: HouseInfo;
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
        <span className={labelTextClass}>Address</span>
        <input name="address" defaultValue={house.address ?? ""} className={inputClass} />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className={labelClass}>
          <span className={labelTextClass}>WiFi name</span>
          <input name="wifi_name" defaultValue={house.wifi_name ?? ""} className={inputClass} />
        </label>
        <label className={labelClass}>
          <span className={labelTextClass}>WiFi password</span>
          <input name="wifi_password" defaultValue={house.wifi_password ?? ""} className={inputClass} />
        </label>
      </div>

      <label className={labelClass}>
        <span className={labelTextClass}>Getting in</span>
        <textarea
          name="entry_info"
          defaultValue={house.entry_info ?? ""}
          placeholder="Door code, spare key location, alarm code, anything about the lock"
          className={textareaClass}
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className={labelClass}>
          <span className={labelTextClass}>Trash day</span>
          <input name="trash_day" defaultValue={house.trash_day ?? ""} className={inputClass} />
        </label>
        <label className={labelClass}>
          <span className={labelTextClass}>Parking</span>
          <input name="parking" defaultValue={house.parking ?? ""} className={inputClass} />
        </label>
      </div>

      <label className={labelClass}>
        <span className={labelTextClass}>Other notes</span>
        <textarea
          name="notes"
          defaultValue={house.notes ?? ""}
          placeholder="Mail, plants, thermostat, quirky doors — anything else they should know"
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
