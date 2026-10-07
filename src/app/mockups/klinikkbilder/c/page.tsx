import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/forside/Hero";
import { Plassholder } from "@/components/forside/Plassholder";
import { Mosaikken } from "@/components/mockups/klinikkbilder/Mosaikken";

export const metadata = { title: "Klinikkbilder C: Mosaikken", robots: { index: false } };

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero bilder={<Mosaikken />} />
        <Plassholder />
      </main>
    </>
  );
}
