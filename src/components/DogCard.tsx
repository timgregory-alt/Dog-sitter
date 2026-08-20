import Image from "next/image";
import { PawPrint, Phone, Pill, Stethoscope, Utensils } from "lucide-react";
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

export function DogCard({ dog }: { dog: Dog }) {
  const basics = [dog.breed, dog.age, dog.weight].filter(Boolean).join(" · ");

  return (
    <div className="overflow-hidden rounded-3xl border border-[var(--color-line)] bg-white shadow-[0_1px_2px_rgba(43,38,32,0.04),0_12px_32px_-16px_rgba(43,38,32,0.18)]">
      <div className="relative flex h-56 w-full items-center justify-center bg-[var(--color-cream-deep)]">
        {dog.nickname && (
          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-[var(--color-ink)] shadow-sm backdrop-blur-sm">
            &ldquo;{dog.nickname}&rdquo;
          </span>
        )}
        {dog.photo ? (
          <Image
            src={dog.photo}
            alt={dog.name}
            width={600}
            height={448}
            unoptimized
            className="h-full w-full object-cover"
          />
        ) : (
          <PawPrint size={40} className="text-[var(--color-ink)]/25" />
        )}
      </div>

      <div className="flex flex-col gap-4 p-5">
        <div>
          <h2 className="text-xl font-semibold text-[var(--color-ink)]">{dog.name}</h2>
          {basics && <p className="text-sm text-[var(--color-ink-soft)]">{basics}</p>}
        </div>

        {dog.bio && (
          <div className="rounded-2xl bg-[var(--color-cream-deep)] p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-accent-deep)]">
              Meet {dog.nickname || dog.name}
            </p>
            <p className="mt-1 whitespace-pre-line text-sm italic text-[var(--color-ink)]">{dog.bio}</p>
          </div>
        )}

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
      </div>
    </div>
  );
}
