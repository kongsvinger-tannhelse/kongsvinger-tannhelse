import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/forside/Hero";
import { Leporello } from "@/components/forside/behandlinger/leporello/Leporello";
import { OmOss } from "@/components/forside/omoss/OmOss";
import { Kontakt } from "@/components/forside/kontakt/Kontakt";
import { Brua } from "@/components/forside/brua/Brua";

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
        <Kontakt />
        <Brua />
      </main>
    </>
  );
}
