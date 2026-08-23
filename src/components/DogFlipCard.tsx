"use client";

import { useState } from "react";
import Image from "next/image";
import { PawPrint, Phone, Pill, RotateCw, Stethoscope, Utensils } from "lucide-react";
import type { Dog } from "@/lib/types";

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <Icon size={18} className="mt-0.5 shrink-0 text-[var(--color-accent)]" />
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink-soft)]">{label}</p>
        <p className="whitespace-pre-line text-sm text-[var(--color-ink)]">{value}</p>
      </div>
    </div>
  );
}

const faceClass =
  "flex h-full w-full flex-col overflow-hidden rounded-3xl border border-[var(--color-line)] bg-white shadow-[0_1px_2px_rgba(43,38,32,0.04),0_12px_32px_-16px_rgba(43,38,32,0.18)]";

function FrontFace({ dog, onFlip }: { dog: Dog; onFlip: () => void }) {
  const basics = [dog.breed, dog.age, dog.weight].filter(Boolean).join(" · ");

  return (
    <div className={faceClass}>
      <div className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain">
        <div className="relative h-72 w-full bg-[var(--color-cream-deep)]">
          {dog.photo ? (
            <Image
              src={dog.photo}
              alt={dog.name}
              width={600}
              height={576}
              unoptimized
              className="h-full w-full object-cover"
              style={{ objectPosition: `50% ${dog.photo_position ?? 50}%` }}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <PawPrint size={40} className="text-[var(--color-ink)]/25" />
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-5 pt-12 pb-4">
            <p className="font-serif text-3xl tracking-wide text-white">{dog.name}</p>
            {dog.nickname && (
              <p className="mt-0.5 font-serif text-base text-white/85 italic">&ldquo;{dog.nickname}&rdquo;</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 p-5">
          {basics && <p className="text-sm text-[var(--color-ink-soft)]">{basics}</p>}
          {dog.bio && <p className="whitespace-pre-line text-sm text-[var(--color-ink)] italic">{dog.bio}</p>}
          {dog.likes && dog.likes.length > 0 && (
            <div>
              <p className="text-xs font-medium tracking-wide text-[var(--color-ink-soft)] uppercase">Loves</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {dog.likes.map((like) => (
                  <span
                    key={like}
                    className="rounded-full border border-[var(--color-accent-soft)] px-2.5 py-1 text-xs font-medium text-[var(--color-accent-deep)]"
                  >
                    {like}
                  </span>
                ))}
              </div>
            </div>
          )}
          {dog.bad_habits && dog.bad_habits.length > 0 && (
            <div>
              <p className="text-xs font-medium tracking-wide text-[var(--color-ink-soft)] uppercase">Bad habits</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {dog.bad_habits.map((habit) => (
                  <span
                    key={habit}
                    className="rounded-full border border-[var(--color-line)] bg-[var(--color-cream)] px-2.5 py-1 text-xs font-medium text-[var(--color-ink-soft)]"
                  >
                    {habit}
                  </span>
                ))}
              </div>
            </div>
          )}
          {!dog.bio &&
            (!dog.likes || dog.likes.length === 0) &&
            (!dog.bad_habits || dog.bad_habits.length === 0) &&
            !basics && <p className="text-sm text-[var(--color-ink-soft)]">No intro yet.</p>}
        </div>
      </div>

      <button
        type="button"
        onClick={onFlip}
        className="flex items-center justify-center gap-1.5 border-t border-[var(--color-line)] py-3 text-xs font-medium tracking-wide text-[var(--color-ink-soft)] uppercase"
      >
        <RotateCw size={13} />
        Care instructions
      </button>
    </div>
  );
}

function BackFace({ dog, onFlip }: { dog: Dog; onFlip: () => void }) {
  const hasCareInfo =
    dog.food ||
    dog.medication ||
    dog.allergies ||
    dog.notes ||
    dog.vet_name ||
    dog.vet_phone ||
    dog.emergency_contact_name ||
    dog.emergency_contact_phone;

  return (
    <div className={faceClass}>
      <div className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain p-5">
        <p className="font-serif text-2xl text-[var(--color-ink)]">{dog.name}&rsquo;s Care</p>
        <div className="mt-4 flex flex-col gap-4">
          {dog.food && <InfoRow icon={Utensils} label="Food" value={dog.food} />}
          {dog.medication && <InfoRow icon={Pill} label="Medication" value={dog.medication} />}
          {dog.allergies && <InfoRow icon={PawPrint} label="Allergies" value={dog.allergies} />}
          {(dog.emergency_contact_name || dog.emergency_contact_phone) && (
            <InfoRow
              icon={Phone}
              label="Emergency contact"
              value={[dog.emergency_contact_name, dog.emergency_contact_phone].filter(Boolean).join(" · ")}
            />
          )}
          {(dog.vet_name || dog.vet_phone) && (
            <InfoRow
              icon={Stethoscope}
              label="Vet"
              value={[dog.vet_name, dog.vet_phone].filter(Boolean).join(" · ")}
            />
          )}
          {dog.notes && <InfoRow icon={PawPrint} label="Notes" value={dog.notes} />}
          {!hasCareInfo && <p className="text-sm text-[var(--color-ink-soft)]">No care info yet.</p>}
        </div>
      </div>
      <button
        type="button"
        onClick={onFlip}
        className="flex items-center justify-center gap-1.5 border-t border-[var(--color-line)] py-3 text-xs font-medium tracking-wide text-[var(--color-ink-soft)] uppercase"
      >
        <RotateCw size={13} />
        Meet {dog.nickname || dog.name}
      </button>
    </div>
  );
}

/** Only one face is ever mounted at a time — no persistent 3D transform or
 * backface-visibility, which on iOS Safari is known to break native touch
 * scrolling for anything nested inside it. The "flip" is a lightweight
 * horizontal squish-and-swap instead of a true 3D rotation. */
export function DogFlipCard({ dog }: { dog: Dog }) {
  const [flipped, setFlipped] = useState(false);
  const [squished, setSquished] = useState(false);

  function onFlip() {
    setSquished(true);
    setTimeout(() => {
      setFlipped((f) => !f);
      setSquished(false);
    }, 150);
  }

  return (
    <div className="h-[600px] w-full">
      <div
        className="h-full w-full transition-transform duration-150 ease-in"
        style={{ transform: squished ? "scaleX(0)" : "scaleX(1)" }}
      >
        {flipped ? <BackFace dog={dog} onFlip={onFlip} /> : <FrontFace dog={dog} onFlip={onFlip} />}
      </div>
    </div>
  );
}
