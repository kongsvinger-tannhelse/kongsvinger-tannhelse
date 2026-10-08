import type { Metadata } from "next";
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
      <Navbar />
      <main>
        <Hero />
        <Leporello />
        <OmOss />
        <RadOgTips />
        <Kontakt />
      </main>
    </>
  );
}
