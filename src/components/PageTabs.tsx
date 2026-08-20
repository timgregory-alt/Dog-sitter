import Link from "next/link";
import { Home as HomeIcon, PawPrint } from "lucide-react";

export function PageTabs({ active }: { active: "pets" | "house" }) {
  const tabClass = (tab: "pets" | "house") =>
    `flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-medium transition-colors ${
      active === tab ? "bg-[var(--color-accent)] text-white" : "text-[var(--color-ink-soft)]"
    }`;

  return (
    <div className="flex w-full gap-1 rounded-full border border-[var(--color-line)] bg-white p-1">
      <Link href="/dogs" className={tabClass("pets")}>
        <PawPrint size={15} />
        Pets
      </Link>
      <Link href="/house" className={tabClass("house")}>
        <HomeIcon size={15} />
        House
      </Link>
    </div>
  );
}
