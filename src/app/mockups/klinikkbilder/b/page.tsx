import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/forside/Hero";
import { Plassholder } from "@/components/forside/Plassholder";
import { Kortstokken } from "@/components/mockups/klinikkbilder/Kortstokken";

export const metadata = { title: "Klinikkbilder B: Kortstokken", robots: { index: false } };

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero bilder={<Kortstokken />} />
        <Plassholder />
      </main>
    </>
  );
}
