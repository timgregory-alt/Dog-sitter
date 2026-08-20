import type { Metadata } from "next";
import { Car, Home as HomeIcon, KeyRound, MapPin, NotebookPen, Trash2, Wifi } from "lucide-react";
import { getHouseInfoPublic } from "@/lib/house";
import { PageTabs } from "@/components/PageTabs";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

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

export default async function HousePage() {
  const house = await getHouseInfoPublic();
  const hasWifi = house.wifi_name || house.wifi_password;
  const hasInfo =
    house.address || hasWifi || house.entry_info || house.trash_day || house.parking || house.notes;

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 px-5 pt-10 pb-14">
      <PageTabs active="house" />

      <div className="text-center">
        <h1 className="font-serif text-3xl text-[var(--color-ink)]">The House</h1>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">Everything you need to get in and get settled.</p>
      </div>

      <div className="flex flex-col gap-5 rounded-3xl border border-[var(--color-line)] bg-white p-5 shadow-[0_1px_2px_rgba(43,38,32,0.04),0_12px_32px_-16px_rgba(43,38,32,0.18)]">
        {house.address && <InfoRow icon={MapPin} label="Address" value={house.address} />}
        {hasWifi && (
          <InfoRow
            icon={Wifi}
            label="WiFi"
            value={[house.wifi_name, house.wifi_password].filter(Boolean).join(" · ")}
          />
        )}
        {house.entry_info && <InfoRow icon={KeyRound} label="Getting in" value={house.entry_info} />}
        {house.trash_day && <InfoRow icon={Trash2} label="Trash day" value={house.trash_day} />}
        {house.parking && <InfoRow icon={Car} label="Parking" value={house.parking} />}
        {house.notes && <InfoRow icon={NotebookPen} label="Other notes" value={house.notes} />}
        {!hasInfo && (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <HomeIcon size={32} className="text-[var(--color-ink)]/25" />
            <p className="text-sm text-[var(--color-ink-soft)]">No house info yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}
