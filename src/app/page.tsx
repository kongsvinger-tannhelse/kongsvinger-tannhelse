import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/forside/Hero";
import { Behandlinger } from "@/components/forside/behandlinger/Behandlinger";

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
      </main>
    </>
  );
}
