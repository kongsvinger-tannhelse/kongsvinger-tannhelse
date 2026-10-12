import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { OPPDATERT, VilkarSide } from "@/components/vilkar/VilkarSide";
import { klinikk } from "@/data/klinikk";
import { OPENGRAPH } from "@/lib/deling";

const description = `Vilkårene for å bruke nettsiden til ${klinikk.navn}: generell informasjon, ikke behandling, timebestilling, lenker og opphavsrett.`;

export const metadata: Metadata = {
  title: "Vilkår for bruk",
  description,
  alternates: { canonical: "/vilkar" },
  openGraph: {
    ...OPENGRAPH,
    title: `Vilkår for bruk | ${klinikk.navn}`,
    description,
    url: "/vilkar",
  },
};

const URL = `${klinikk.url}/vilkar`;

/* For search engines: the site's terms of use. */
const strukturert = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${URL}#side`,
      url: URL,
      name: "Vilkår for bruk",
      description,
      inLanguage: "nb-NO",
      dateModified: OPPDATERT,
      publisher: { "@type": "Dentist", "@id": `${klinikk.url}/#klinikk`, name: klinikk.navn },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Forside", item: `${klinikk.url}/` },
        { "@type": "ListItem", position: 2, name: "Vilkår", item: URL },
      ],
    },
  ],
};

/** What holds when using the site. */
export default function Page() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        // Safe: built from the site's own static data, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturert) }}
      />
      <VilkarSide />
    </>
  );
}
