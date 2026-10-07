import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/forside/Hero";
import { Plassholder } from "@/components/forside/Plassholder";
import { BuenOgRutene } from "@/components/mockups/klinikkbilder/BuenOgRutene";

export const metadata = { title: "Klinikkbilder H: Buen og rutene", robots: { index: false } };

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero bilder={<BuenOgRutene />} tittelOppe />
        <Plassholder />
      </main>
    </>
  );
}
