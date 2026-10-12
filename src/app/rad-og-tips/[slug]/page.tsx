import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Artikkelside } from "@/components/artikler/Artikkelside";
import { ARTIKLER, RAD_OG_TIPS, finnArtikkel } from "@/data/artikler";
import { OPENGRAPH } from "@/lib/deling";

type Props = { params: Promise<{ slug: string }> };

/* Only the articles that exist; any other address is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return ARTIKLER.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = finnArtikkel((await params).slug);
  if (!a) return {};
  const sti = `${RAD_OG_TIPS.sti}/${a.slug}`;
  return {
    title: a.tittel,
    description: a.beskrivelse,
    alternates: { canonical: sti },
    openGraph: { ...OPENGRAPH, type: "article", title: `${a.tittel} | Kongsvinger Tannhelse`, description: a.beskrivelse, url: sti },
  };
}

/** One note from the clinic. */
export default async function Page({ params }: Props) {
  const a = finnArtikkel((await params).slug);
  if (!a) notFound();
  return (
    <>
      <Navbar />
      <Artikkelside artikkel={a} />
    </>
  );
}
