"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DogFlipCard } from "@/components/DogFlipCard";
import type { Dog } from "@/lib/types";

const SWIPE_THRESHOLD = 60;
const TAP_THRESHOLD = 10;

export function DogCarousel({ dogs }: { dogs: Dog[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const start = useRef<{ x: number; y: number } | null>(null);

  function goTo(next: number) {
    setIndex(Math.max(0, Math.min(dogs.length - 1, next)));
    setFlipped(false);
  }

  function handlePointerDown(e: React.PointerEvent) {
    start.current = { x: e.clientX, y: e.clientY };
  }

  function handlePointerUp(e: React.PointerEvent) {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    start.current = null;

    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      // Swipe right -> next dog, swipe left -> previous dog.
      goTo(dx > 0 ? index + 1 : index - 1);
    } else if (Math.abs(dx) < TAP_THRESHOLD && Math.abs(dy) < TAP_THRESHOLD) {
      setFlipped((f) => !f);
    }
  }

  const dog = dogs[index];
  if (!dog) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="w-full touch-pan-y select-none"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => (start.current = null)}
      >
        <DogFlipCard dog={dog} flipped={flipped} onFlip={() => setFlipped((f) => !f)} />
      </div>

      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Previous dog"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] bg-white text-[var(--color-ink)] disabled:opacity-30"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex gap-1.5">
          {dogs.map((d, i) => (
            <button
              key={d.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to ${d.name}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-[var(--color-accent)]" : "w-1.5 bg-[var(--color-line)]"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={index === dogs.length - 1}
          aria-label="Next dog"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] bg-white text-[var(--color-ink)] disabled:opacity-30"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <p className="text-xs text-[var(--color-ink-soft)]">Swipe or use the arrows — tap the card to flip it</p>
    </div>
  );
}
