import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Behandlinger } from "@/components/forside/behandlinger/Behandlinger";

export const metadata: Metadata = {
  title: "Behandlinger",
  description:
    "Alle behandlingene hos Kongsvinger Tannhelse: tannsjekk, tannrens, fyllinger, rotfylling, akutt hjelp, kroner, broer, implantater og proteser.",
  alternates: { canonical: "/behandlinger" },
};

/** Every treatment, on the same revolving stage as the front page. */
export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Behandlinger alle />
      </main>
    </>
  );
}
