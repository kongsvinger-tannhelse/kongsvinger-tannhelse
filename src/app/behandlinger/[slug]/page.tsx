import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Behandlingsside } from "@/components/behandlinger/side/Behandlingsside";
import { BEHANDLINGSSIDER, BGJENNOMGATT, finnBehandlingsside, sideSti, type Behandlingsside as Side } from "@/data/behandlinger";
import { BESLEKTET } from "@/data/behandlinger/beslektet";
import { klinikk } from "@/data/klinikk";
import { OPENGRAPH } from "@/lib/deling";

/* /behandlinger/<treatment>: the treatments that have a page of their own. */

export const dynamicParams = false;

export function generateStaticParams() {
  return BEHANDLINGSSIDER.map((b) => ({ slug: b.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const side = finnBehandlingsside((await params).slug);
  if (!side) return {};
  const sti = sideSti(side.slug);
  const tittel = `${side.navn} i Kongsvinger`;
  return {
    title: tittel,
    description: side.beskrivelse,
    alternates: { canonical: sti },
    openGraph: { ...OPENGRAPH, title: `${tittel} | ${klinikk.navn}`, description: side.beskrivelse, url: sti, type: "article" },
  };
}

/** For search engines: the page, the treatment it is about, the crumbs, and its questions with their answers. */
function strukturert(side: Side) {
  const url = `${klinikk.url}${sideSti(side.slug)}`;
  // the «Les også» pages, as absolute addresses
  const beslektet = ((BESLEKTET as Record<string, readonly string[]>)[side.slug] ?? []).map((s) => `${klinikk.url}${sideSti(s)}`);
  const sporsmal = side.deler.flatMap((d) => (d.type === "tekst" && d.tittel.endsWith("?") ? [{ s: d.tittel, svar: d.avsnitt.join(" ") }] : []));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${url}#side`,
        url,
        name: side.navn,
        description: side.beskrivelse,
        inLanguage: "nb-NO",
        audience: { "@type": "PeopleAudience", audienceType: "Pasienter" },
        lastReviewed: BGJENNOMGATT,
        relatedLink: beslektet,
        about: { "@type": "MedicalProcedure", name: side.navn, description: side.ingress },
        citation: side.kilder.map((k) => ({ "@type": "CreativeWork", name: k.navn, url: k.url, publisher: { "@type": "Organization", name: k.utgiver } })),
        publisher: { "@type": "Dentist", "@id": `${klinikk.url}/#klinikk`, name: klinikk.navn },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Forside", item: `${klinikk.url}/` },
          { "@type": "ListItem", position: 2, name: "Behandlinger", item: `${klinikk.url}/behandlinger` },
          { "@type": "ListItem", position: 3, name: side.navn, item: url },
        ],
      },
      { "@type": "FAQPage", mainEntity: sporsmal.map((q) => ({ "@type": "Question", name: q.s, acceptedAnswer: { "@type": "Answer", text: q.svar } })) },
    ],
  };
}

export default async function Page({ params }: Props) {
  const side = finnBehandlingsside((await params).slug);
  if (!side) notFound();
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        // Safe: built from the site's own static data, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturert(side)) }}
      />
      <Behandlingsside side={side} />
    </>
  );
}
