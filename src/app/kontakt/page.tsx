import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { KontaktSide } from "@/components/kontakt/KontaktSide";
import { klinikk } from "@/data/klinikk";

const { telefon, adresse, apningstider: tid } = klinikk;

const description = `Kontakt Kongsvinger Tannhelse, tannlegen i ${adresse.gate} i Kongsvinger. Ring ${telefon.visning}, send e-post eller skriv til oss. Åpent ${tid.dager.toLowerCase()} ${tid.fra}–${tid.til}. Akutt tannpine? Ring tidlig, vi gjør vårt beste for å gi deg time samme dag.`;

export const metadata: Metadata = {
  title: "Kontakt tannlegen i Kongsvinger",
  description,
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title: `Kontakt tannlegen i Kongsvinger | ${klinikk.navn}`,
    description,
    url: "/kontakt",
  },
};

const URL = `${klinikk.url}/kontakt`;

/* For search engines: a contact page for the clinic described in layout.tsx. */
const strukturert = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${URL}#side`,
      url: URL,
      name: "Kontakt tannlegen i Kongsvinger",
      inLanguage: "nb-NO",
      about: { "@type": "Dentist", "@id": `${klinikk.url}/#klinikk`, name: klinikk.navn },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Forside", item: `${klinikk.url}/` },
        { "@type": "ListItem", position: 2, name: "Kontakt", item: URL },
      ],
    },
  ],
};

/** How to reach the clinic: phone, e-mail, the form, toothache, and the way there. */
export default function Page() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        // Safe: built from the site's own static data, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturert) }}
      />
      <KontaktSide />
    </>
  );
}
