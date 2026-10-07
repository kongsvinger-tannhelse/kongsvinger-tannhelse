import { Navbar } from "@/components/Navbar";
import { Plassholder } from "@/components/forside/Plassholder";
import { NavnetHero } from "@/components/mockups/klinikkbilder/Navnet";

export const metadata = { title: "Klinikkbilder F: Navnet", robots: { index: false } };

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <NavnetHero />
        <Plassholder />
      </main>
    </>
  );
}
