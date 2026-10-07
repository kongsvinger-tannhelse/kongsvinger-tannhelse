import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/forside/Hero";
import { Plassholder } from "@/components/forside/Plassholder";
import { BakTraerne } from "@/components/mockups/klinikkbilder/BakTraerne";

export const metadata = { title: "Klinikkbilder D: Bak trærne", robots: { index: false } };

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero bilder={null} mellom={<BakTraerne />} />
        <Plassholder />
      </main>
    </>
  );
}
