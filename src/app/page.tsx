import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/forside/Hero";
import { Plassholder } from "@/components/forside/Plassholder";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Plassholder />
      </main>
    </>
  );
}
