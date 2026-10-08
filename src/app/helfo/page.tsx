import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { HelfoSide } from "@/components/helfo/HelfoSide";
import { klinikk } from "@/data/klinikk";
import { HELFO_GJENNOMGATT, HELFO_KILDER, HELFO_SPORSMAL } from "@/data/helfo";

const description =
  "Hva dekker Helfo hos tannlegen? Hvem som betaler tannbehandlingen for barn, unge voksne (19–28 år) og voksne, de 15 tilstandene som gir stønad, refusjon og frikort. Vi har direkte oppgjør med Helfo.";

export const metadata: Metadata = {
  title: "Helfo og tannlegen: hva dekker Helfo?",
  description,
  alternates: { canonical: "/helfo" },
  openGraph: {
    title: `Helfo og tannlegen: hva dekker Helfo? | ${klinikk.navn}`,
    description,
    url: "/helfo",
  },
};

const URL = `${klinikk.url}/helfo`;

/* For search engines: a page for patients about who pays, its sources, and the questions on it. */
const strukturert = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": `${URL}#side`,
      url: URL,
      name: "Hva dekker Helfo hos tannlegen?",
      description,
      inLanguage: "nb-NO",
      audience: { "@type": "PeopleAudience", audienceType: "Pasienter" },
      lastReviewed: HELFO_GJENNOMGATT,
      citation: HELFO_KILDER.map((k) => ({ "@type": "CreativeWork", name: k.navn, url: k.url, publisher: { "@type": "Organization", name: k.utgiver } })),
      publisher: { "@type": "Dentist", "@id": `${klinikk.url}/#klinikk`, name: klinikk.navn },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Forside", item: `${klinikk.url}/` },
        { "@type": "ListItem", position: 2, name: "Helfo", item: URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: HELFO_SPORSMAL.map((q) => ({ "@type": "Question", name: q.s, acceptedAnswer: { "@type": "Answer", text: q.svar } })),
    },
  ],
};

/** What Helfo and the public dental service pay for, by age. */
export default function Page() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        // Safe: built from the site's own static data, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturert) }}
      />
      <HelfoSide />
    </>
  );
}
