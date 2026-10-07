import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/forside/Hero";
import { Plassholder } from "@/components/forside/Plassholder";
import { Speilet } from "@/components/mockups/klinikkbilder/Speilet";

export const metadata = { title: "Klinikkbilder A: Speilet", robots: { index: false } };

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero bilder={<Speilet />} />
        <Plassholder />
      </main>
    </>
  );
}
