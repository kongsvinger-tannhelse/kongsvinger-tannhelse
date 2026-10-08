import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { OPPDATERT, PersonvernSide } from "@/components/personvern/PersonvernSide";
import { klinikk } from "@/data/klinikk";

const description = `Hva nettsiden til ${klinikk.navn} samler inn om deg, og hvorfor: kontaktskjemaet, hvem som får opplysningene, rettighetene dine og hvordan du klager.`;

export const metadata: Metadata = {
  title: "Personvern",
  description,
  alternates: { canonical: "/personvern" },
  openGraph: {
    title: `Personvern | ${klinikk.navn}`,
    description,
    url: "/personvern",
  },
};

const URL = `${klinikk.url}/personvern`;

/* For search engines: the clinic's privacy statement. */
const strukturert = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${URL}#side`,
      url: URL,
      name: "Personvern",
      description,
      inLanguage: "nb-NO",
      dateModified: OPPDATERT,
      publisher: { "@type": "Dentist", "@id": `${klinikk.url}/#klinikk`, name: klinikk.navn },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Forside", item: `${klinikk.url}/` },
        { "@type": "ListItem", position: 2, name: "Personvern", item: URL },
      ],
    },
  ],
};

/** What the site does with visitors' data. */
export default function Page() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        // Safe: built from the site's own static data, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturert) }}
      />
      <PersonvernSide />
    </>
  );
}
