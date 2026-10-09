import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/forside/Hero";
import { Leporello } from "@/components/forside/behandlinger/leporello/Leporello";
import { OmOss } from "@/components/forside/omoss/OmOss";
import { Kontakt } from "@/components/forside/kontakt/Kontakt";
import { RadOgTips } from "@/components/forside/radogtips/RadOgTips";
import farTegnet from "@/components/forside/utsikt/far-tegnet.webp";
import naerTegnet from "@/components/forside/utsikt/near-tegnet.webp";

/* MOCKUP: the front page with the hero drawn (tools/tegn_hero.py) in place
   of the photograph, to compare side by side. Not linked, not indexed. */

export const metadata: Metadata = {
  title: "Mockup: tegnet hero",
  robots: { index: false, follow: false },
};

export default function HeroTegnet() {
  return (
    <>
      <Navbar forside />
      <main>
        {/* phones get the drawing at 2560 px, not 1600: its houses and bridge stay crisp enlarged */}
        <Hero lag={{ far: farTegnet, near: naerTegnet, telefon: 2560 }} />
        <Leporello />
        <OmOss />
        <RadOgTips />
        <Kontakt />
      </main>
    </>
  );
}
