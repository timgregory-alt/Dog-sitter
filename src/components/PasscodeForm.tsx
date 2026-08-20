"use client";

import { useState, useTransition } from "react";
import { verifyPasscodeAction } from "@/app/edit/actions";

export function PasscodeForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="mx-auto flex min-h-dvh max-w-sm flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold text-[var(--color-ink)]">Enter passcode</h1>
      <p className="text-sm text-[var(--color-ink-soft)]">This page edits what your sitter sees.</p>
      <form
        action={(formData) => {
          setError(null);
          startTransition(async () => {
            const result = await verifyPasscodeAction(formData);
            if (result?.error) setError(result.error);
          });
        }}
        className="flex w-full flex-col gap-3"
      >
        <input
          name="passcode"
          type="password"
          autoFocus
          required
          className="h-11 w-full rounded-lg border border-[var(--color-line)] bg-white px-3 text-center text-sm outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/25"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="h-11 rounded-full bg-[var(--color-accent)] text-sm font-medium text-white disabled:opacity-60"
        >
          Unlock
        </button>
      </form>
    </main>
  );
}
