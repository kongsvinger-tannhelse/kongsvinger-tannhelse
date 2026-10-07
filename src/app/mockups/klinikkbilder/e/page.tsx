import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/forside/Hero";
import { Plassholder } from "@/components/forside/Plassholder";
import { Punktene } from "@/components/mockups/klinikkbilder/Punktene";

export const metadata = { title: "Klinikkbilder E: Punktene", robots: { index: false } };

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero bilder={<Punktene />} />
        <Plassholder />
      </main>
    </>
  );
}
