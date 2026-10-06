import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { klinikk } from "@/data/klinikk";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(klinikk.url),
  title: {
    default: "Kongsvinger Tannhelse | Tannlege Hafthun & Zia i Kongsvinger",
    template: "%s | Kongsvinger Tannhelse",
  },
  description:
    "Tannlege i Fjellgata 4 i Kongsvinger. Tannsjekk, tannrens, fyllinger, rotfylling, kroner, implantater og akutt hjelp. Ring 62 81 50 09.",
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: "Kongsvinger Tannhelse",
    url: klinikk.url,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nb" className={geist.variable}>
      <head>
        <script
          type="application/ld+json"
          // Safe: hardcoded static data, not user input
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              name: klinikk.navn,
              url: klinikk.url,
              telephone: "+4762815009",
              email: klinikk.epost,
              address: {
                "@type": "PostalAddress",
                streetAddress: klinikk.adresse.gate,
                addressLocality: klinikk.adresse.sted,
                postalCode: klinikk.adresse.postnummer,
                addressCountry: "NO",
              },
              geo: { "@type": "GeoCoordinates", latitude: klinikk.geo.lat, longitude: klinikk.geo.lng },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "08:30",
                  closes: "15:30",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased font-sans min-h-screen">{children}</body>
    </html>
  );
}
