import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/forside/Hero";
import { Plassholder } from "@/components/forside/Plassholder";
import { Buegangen } from "@/components/mockups/klinikkbilder/Buegangen";

export const metadata = { title: "Klinikkbilder G: Buegangen", robots: { index: false } };

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero bilder={<Buegangen />} />
        <Plassholder />
      </main>
    </>
  );
}
