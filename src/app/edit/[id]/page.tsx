import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getDogByIdAdmin, getDogsAdmin } from "@/lib/dogs";
import { DogForm } from "@/components/DogForm";
import { updateDogAction } from "@/app/edit/actions";

export default async function EditDogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [dog, dogs] = await Promise.all([getDogByIdAdmin(id), getDogsAdmin()]);
  if (!dog) notFound();

  const index = dogs.findIndex((d) => d.id === dog.id);
  const prevDog = index > 0 ? dogs[index - 1] : null;
  const nextDog = index >= 0 && index < dogs.length - 1 ? dogs[index + 1] : null;

  return (
    <main className="mx-auto max-w-xl px-5 pt-10 pb-14">
      <div className="mb-6 flex items-center justify-between gap-3">
        {prevDog ? (
          <Link
            href={`/edit/${prevDog.id}`}
            className="flex items-center gap-1 text-sm font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
          >
            <ChevronLeft size={16} />
            {prevDog.name}
          </Link>
        ) : (
          <span />
        )}
        {nextDog ? (
          <Link
            href={`/edit/${nextDog.id}`}
            className="flex items-center gap-1 text-sm font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
          >
            {nextDog.name}
            <ChevronRight size={16} />
          </Link>
        ) : (
          <span />
        )}
      </div>

      <h1 className="text-2xl font-semibold text-[var(--color-ink)]">{dog.name}</h1>
      <p className="mt-1 mb-6 text-sm text-[var(--color-ink-soft)]">
        Changes appear on the sitter page immediately.
      </p>
      <DogForm dog={dog} action={updateDogAction} />
    </main>
  );
}
