"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DogFlipCard } from "@/components/DogFlipCard";
import type { Dog } from "@/lib/types";

export function DogCarousel({ dogs }: { dogs: Dog[] }) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafPending = useRef(false);

  function scrollToIndex(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(dogs.length - 1, i));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
  }

  // Native scroll (touch swipe, trackpad, or drag) drives the dots/arrows —
  // no custom gesture handling, so it never fights the browser's own
  // touch-scrolling (including the vertical scroll inside each card).
  const handleScroll = useCallback(() => {
    if (rafPending.current) return;
    rafPending.current = true;
    requestAnimationFrame(() => {
      rafPending.current = false;
      const track = trackRef.current;
      if (!track || track.clientWidth === 0) return;
      const i = Math.round(track.scrollLeft / track.clientWidth);
      setIndex((prev) => (prev === i ? prev : i));
    });
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="scrollbar-hide flex w-full snap-x snap-mandatory overflow-x-auto"
      >
        {dogs.map((dog) => (
          <div key={dog.id} className="w-full shrink-0 snap-center">
            <DogFlipCard dog={dog} />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={() => scrollToIndex(index - 1)}
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
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to ${d.name}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-[var(--color-accent)]" : "w-1.5 bg-[var(--color-line)]"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollToIndex(index + 1)}
          disabled={index === dogs.length - 1}
          aria-label="Next dog"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] bg-white text-[var(--color-ink)] disabled:opacity-30"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <p className="text-xs text-[var(--color-ink-soft)]">
        Swipe or use the arrows to browse — tap &ldquo;Care instructions&rdquo; on a card to flip it
      </p>
    </div>
  );
}
