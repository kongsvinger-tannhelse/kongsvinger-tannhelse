import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Oversikt } from "@/components/artikler/Oversikt";
import { RAD_OG_TIPS } from "@/data/artikler";

export const metadata: Metadata = {
  title: "Råd og tips om tenner og munn",
  description: RAD_OG_TIPS.ingress,
  alternates: { canonical: RAD_OG_TIPS.sti },
  openGraph: { title: "Råd og tips | Kongsvinger Tannhelse", description: RAD_OG_TIPS.ingress, url: RAD_OG_TIPS.sti },
};

/** Every note from the clinic, to choose from. */
export default function Page() {
  return (
    <>
      <Navbar />
      <Oversikt />
    </>
  );
}
