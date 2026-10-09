import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Oppslag } from "@/components/behandlinger/Oppslag";
import { Boktegning } from "@/components/behandlinger/boka";
import { Sporsmal, Strukturert, Topp } from "@/components/behandlinger/side";

export const metadata: Metadata = {
  title: "Tannbehandling i Kongsvinger: alle behandlinger",
  description:
    "Tannlege i Kongsvinger: tannsjekk, tannrens, fylling, rotfylling, tannbleking, tannimplantat, kroner og akutt hjelp ved tannpine. Fjellgata 4. Ring 62 81 50 09.",
  alternates: { canonical: "/behandlinger" },
  openGraph: {
    title: "Tannbehandling i Kongsvinger | Kongsvinger Tannhelse",
    description: "Alle de 25 behandlingene hos tannlegene Hafthun & Zia i Fjellgata 4, forklart enkelt.",
    url: "/behandlinger",
  },
};

/** Every treatment, in a book to look things up in. */
export default function Page() {
  return (
    <>
      <Navbar />
      <Strukturert />
      <main className="bg-[var(--color-papir)]">
        <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)] pt-[clamp(96px,12vw,148px)]">
          <div className="relative">
            <div className="max-w-[760px]">
              <Topp veiledning="Søk, eller trykk på en behandling for å lese om den." />
            </div>
            {/* the book, closed, in the corner the text leaves empty */}
            <Boktegning className="absolute right-0 top-[clamp(8px,2vw,36px)] hidden w-[clamp(300px,32vw,470px)] lg:block" />
          </div>
          <div className="mt-8 pb-[clamp(40px,9vw,120px)] md:mt-14">
            <Oppslag />
          </div>
        </div>

        <Sporsmal />
      </main>
    </>
  );
}
