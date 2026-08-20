import type { Metadata } from "next";
import Link from "next/link";
import { PawPrint } from "lucide-react";
import { getSettingsPublic } from "@/lib/settings";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function WelcomePage() {
  const settings = await getSettingsPublic();

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "center 30%" }}
        src="/welcome-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/60" />

      <div className="relative z-10 mx-auto flex max-w-md flex-col items-center gap-6 px-6 text-center">
        <PawPrint size={36} className="text-white" />

        <div>
          <h1 className="font-serif text-4xl text-white">
            Welcome{settings.caregiver_name ? `, ${settings.caregiver_name}` : ""}!
          </h1>
          {settings.dates && <p className="mt-2 text-sm text-white/80">{settings.dates}</p>}
        </div>

        {settings.thank_you_note && <p className="text-base text-white italic">{settings.thank_you_note}</p>}

        <Link
          href="/dogs"
          className="mt-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-white"
        >
          Meet the pups →
        </Link>
      </div>
    </main>
  );
}
