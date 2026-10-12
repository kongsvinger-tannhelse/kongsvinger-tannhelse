import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { MOBIL_MOCKUPS } from "@/components/mockups/HeroMobilMockups";
import { SpillIgjen } from "@/components/mockups/SpillIgjen";

/* /mockups/hero-mobil/1–3: proposals for the front-page hero on phones, to
   look at. Not linked anywhere, not in the sitemap, and kept out of search engines. */

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(MOBIL_MOCKUPS).map((n) => ({ n }));
}

type Props = { params: Promise<{ n: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = MOBIL_MOCKUPS[(await params).n as keyof typeof MOBIL_MOCKUPS];
  return { title: `Forslag: ${m?.navn ?? "topp"}`, robots: { index: false, follow: false } };
}

export default async function Page({ params }: Props) {
  const { n } = await params;
  const m = MOBIL_MOCKUPS[n as keyof typeof MOBIL_MOCKUPS];
  if (!m) notFound();
  return (
    <>
      <Navbar forside />
      <main>
        <m.Hero />
      </main>
      {/* to flip between the three and see the change again */}
      <nav aria-label="Forslag" className="fixed inset-x-0 bottom-3 z-50 flex justify-center">
        <div className="flex items-center gap-1 rounded-full bg-[var(--color-glomma-deep)]/90 p-1 text-[13px] font-medium text-white shadow-lg backdrop-blur">
          {Object.entries(MOBIL_MOCKUPS).map(([k, v]) => (
            <Link key={k} href={`/mockups/hero-mobil/${k}`} className={k === n ? "rounded-full bg-white px-3 py-1.5 text-[var(--color-glomma-deep)]" : "rounded-full px-3 py-1.5"}>
              {k} {v.navn}
            </Link>
          ))}
          <SpillIgjen />
        </div>
      </nav>
    </>
  );
}
