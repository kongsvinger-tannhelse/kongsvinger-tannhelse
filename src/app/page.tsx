import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/forside/Hero";
import { Leporello } from "@/components/forside/behandlinger/leporello/Leporello";
import { OmOss } from "@/components/forside/omoss/OmOss";
import { Kontakt } from "@/components/forside/kontakt/Kontakt";
import { RadOgTips } from "@/components/forside/radogtips/RadOgTips";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Navbar forside />
      {/* Each section below the hero in its own Suspense boundary: React then
          wakes (hydrates) them one at a time, in short turns, instead of the
          whole page in one long one that holds a phone's processor. */}
      <main>
        <Hero />
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
