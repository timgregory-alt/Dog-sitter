import Link from "next/link";
import Image from "next/image";
import { ExternalLink, LogOut, Sparkles } from "lucide-react";
import { getDogsAdmin } from "@/lib/dogs";
import { logoutAction } from "@/app/edit/actions";

export default async function EditDogsPage() {
  const dogs = await getDogsAdmin();

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 px-5 pt-10 pb-14">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[var(--color-ink)]">Edit dogs</h1>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-1.5 text-sm text-[var(--color-ink-soft)] hover:underline"
          >
            <LogOut size={15} />
            Lock
          </button>
        </form>
      </div>

      <div className="flex gap-2">
        <Link
          href="/"
          target="_blank"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[var(--color-line)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-ink)]"
        >
          <ExternalLink size={16} />
          View sitter page
        </Link>
        <Link
          href="/edit/welcome"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[var(--color-line)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-ink)]"
        >
          <Sparkles size={16} />
          Welcome page
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {dogs.map((d) => (
          <Link
            key={d.id}
            href={`/edit/${d.id}`}
            className="flex items-center gap-3 rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3.5 hover:border-[var(--color-accent)]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--color-cream-deep)]">
              {d.photo ? (
                <Image src={d.photo} alt="" width={48} height={48} unoptimized className="h-full w-full object-cover" />
              ) : (
                <span className="text-[10px] text-[var(--color-ink)]/40">No photo</span>
              )}
            </div>
            <div>
              <p className="font-medium text-[var(--color-ink)]">{d.name}</p>
              <p className="text-xs text-[var(--color-ink-soft)]">
                {[d.breed, d.age].filter(Boolean).join(" · ") || "No info yet"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
