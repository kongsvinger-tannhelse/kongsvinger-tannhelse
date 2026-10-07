import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/forside/Hero";
import { Behandlinger } from "@/components/forside/behandlinger/Behandlinger";
import { OmOss } from "@/components/forside/omoss/OmOss";
import { Kontakt } from "@/components/forside/kontakt/Kontakt";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Behandlinger />
        <OmOss />
        <Kontakt />
      </main>
    </>
  );
}
