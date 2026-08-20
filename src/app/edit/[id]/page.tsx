import { notFound } from "next/navigation";
import { getDogByIdAdmin } from "@/lib/dogs";
import { DogForm } from "@/components/DogForm";
import { updateDogAction } from "@/app/edit/actions";

export default async function EditDogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dog = await getDogByIdAdmin(id);
  if (!dog) notFound();

  return (
    <main className="mx-auto max-w-xl px-5 pt-10 pb-14">
      <h1 className="text-2xl font-semibold text-[var(--color-ink)]">{dog.name}</h1>
      <p className="mt-1 mb-6 text-sm text-[var(--color-ink-soft)]">
        Changes appear on the sitter page immediately.
      </p>
      <DogForm dog={dog} action={updateDogAction} />
    </main>
  );
}
