import type { Metadata } from "next";
import { getDogsPublic } from "@/lib/dogs";
import { DogCarousel } from "@/components/DogCarousel";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DogsPage() {
  const dogs = await getDogsPublic();

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 px-5 pt-10 pb-14">
      <div className="text-center">
        <h1 className="font-serif text-3xl text-[var(--color-ink)]">Meet the Pups</h1>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">Tap a card to flip it for food, meds, and vet info.</p>
      </div>

      <DogCarousel dogs={dogs} />
    </main>
  );
}
