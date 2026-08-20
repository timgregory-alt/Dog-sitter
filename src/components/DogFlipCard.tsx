"use client";

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
  "absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-[var(--color-line)] bg-white shadow-[0_1px_2px_rgba(43,38,32,0.04),0_12px_32px_-16px_rgba(43,38,32,0.18)] [backface-visibility:hidden]";

export function DogFlipCard({ dog, flipped, onFlip }: { dog: Dog; flipped: boolean; onFlip: () => void }) {
  const basics = [dog.breed, dog.age, dog.weight].filter(Boolean).join(" · ");
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
    <div className="[perspective:1800px]">
      <div
        className="relative h-[600px] w-full transition-transform duration-700 ease-out [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front — photo + "meet the pet" */}
        <div className={faceClass}>
          <div className="relative h-72 w-full shrink-0 bg-[var(--color-cream-deep)]">
            {dog.photo ? (
              <Image
                src={dog.photo}
                alt={dog.name}
                width={600}
                height={576}
                unoptimized
                className="h-full w-full object-cover"
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

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-5">
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
                <p className="text-xs font-medium tracking-wide text-[var(--color-ink-soft)] uppercase">
                  Bad habits
                </p>
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

          <button
            type="button"
            onClick={onFlip}
            className="flex items-center justify-center gap-1.5 border-t border-[var(--color-line)] py-3 text-xs font-medium tracking-wide text-[var(--color-ink-soft)] uppercase"
          >
            <RotateCw size={13} />
            Care instructions
          </button>
        </div>

        {/* Back — practical care info */}
        <div className={faceClass} style={{ transform: "rotateY(180deg)" }}>
          <div className="flex-1 overflow-y-auto p-5">
            <p className="font-serif text-2xl text-[var(--color-ink)]">{dog.name}&rsquo;s Care</p>
            <div className="mt-4 flex flex-col gap-4">
              {dog.food && <InfoRow icon={Utensils} label="Food" value={dog.food} />}
              {dog.medication && <InfoRow icon={Pill} label="Medication" value={dog.medication} />}
              {dog.allergies && <InfoRow icon={PawPrint} label="Allergies" value={dog.allergies} />}
              {dog.notes && <InfoRow icon={PawPrint} label="Notes" value={dog.notes} />}
              {(dog.vet_name || dog.vet_phone) && (
                <InfoRow
                  icon={Stethoscope}
                  label="Vet"
                  value={[dog.vet_name, dog.vet_phone].filter(Boolean).join(" · ")}
                />
              )}
              {(dog.emergency_contact_name || dog.emergency_contact_phone) && (
                <InfoRow
                  icon={Phone}
                  label="Emergency contact"
                  value={[dog.emergency_contact_name, dog.emergency_contact_phone].filter(Boolean).join(" · ")}
                />
              )}
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
      </div>
    </div>
  );
}
