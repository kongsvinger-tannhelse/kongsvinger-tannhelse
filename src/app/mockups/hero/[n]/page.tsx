import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { MOCKUPS } from "@/components/mockups/HeroMockups";
import { Leporello } from "@/components/forside/behandlinger/leporello/Leporello";
import { OmOss } from "@/components/forside/omoss/OmOss";
import { RadOgTips } from "@/components/forside/radogtips/RadOgTips";
import { Kontakt } from "@/components/forside/kontakt/Kontakt";

/* /mockups/hero/1–3: proposals for a new front-page hero, to look at, with
   the rest of the front page under them as it is. Not linked anywhere, not
   in the sitemap, and kept out of search engines. */

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(MOCKUPS).map((n) => ({ n }));
}

type Props = { params: Promise<{ n: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = MOCKUPS[(await params).n as keyof typeof MOCKUPS];
  return { title: `Forslag: ${m?.navn ?? "topp"}`, robots: { index: false, follow: false } };
}

export default async function Page({ params }: Props) {
  const m = MOCKUPS[(await params).n as keyof typeof MOCKUPS];
  if (!m) notFound();
  return (
    <>
      <Navbar />
      <main>
        <m.Hero />
        <Suspense>
          <Leporello />
        </Suspense>
        <Suspense>
          <OmOss />
        </Suspense>
        <Suspense>
          <RadOgTips />
        </Suspense>
        <Suspense>
          <Kontakt />
        </Suspense>
      </main>
    </>
  );
}
