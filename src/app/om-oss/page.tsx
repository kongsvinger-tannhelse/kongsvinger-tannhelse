import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { OmOssSide } from "@/components/omoss/OmOssSide";
import { BILDER, METADATA, TITTEL } from "@/components/omoss/tekst";
import { ansatte, klinikk } from "@/data/klinikk";

export const metadata: Metadata = {
  title: METADATA.title,
  description: METADATA.description,
  alternates: { canonical: "/om-oss" },
  openGraph: {
    title: `${METADATA.title} | ${klinikk.navn}`,
    description: METADATA.description,
    url: "/om-oss",
  },
};

const URL = `${klinikk.url}/om-oss`;

/* For search engines: the page is about the clinic, who works there, and its photos. */
const strukturert = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${URL}#side`,
      url: URL,
      name: TITTEL,
      inLanguage: "nb-NO",
      about: {
        "@type": "Dentist",
        "@id": `${klinikk.url}/#klinikk`,
        name: klinikk.navn,
        employee: ansatte.map((a) => ({ "@type": "Person", name: a.navn, jobTitle: a.rolle, image: `${klinikk.url}${a.bilde}` })),
        image: BILDER.map((b) => `${klinikk.url}${b.src}`),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Forside", item: `${klinikk.url}/` },
        { "@type": "ListItem", position: 2, name: "Om oss", item: URL },
      ],
    },
  ],
};

/** Who we are, the three who work here, and the clinic in pictures. */
export default function Page() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        // Safe: built from the site's own static data, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturert) }}
      />
      <OmOssSide />
    </>
  );
}
