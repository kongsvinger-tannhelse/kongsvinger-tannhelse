import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { klinikk } from "@/data/klinikk";
import { DELINGSBILDE, OPENGRAPH } from "@/lib/deling";
import { Bunntekst } from "@/components/bunntekst/Bunntekst";
import { Bevegelse } from "@/components/Bevegelse";
import "./globals.css";

// Schibsted Grotesk: a warm, sturdy Nordic grotesk, drawn for the Norwegian
// media group Schibsted. (Geist until 2026-10-09.)
const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
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
  openGraph: { ...OPENGRAPH, url: klinikk.url },
  // the big preview when shared on X too
  twitter: { card: "summary_large_image", images: [DELINGSBILDE] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nb" className={grotesk.variable}>
      <head>
        <script
          type="application/ld+json"
          // Safe: hardcoded static data, not user input
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              "@id": `${klinikk.url}/#klinikk`,
              name: klinikk.navn,
              url: klinikk.url,
              // a photo of the clinic first, then the picture shared links show
              image: [`${klinikk.url}/images/klinikk/behandlingsrom-polert.webp`, `${klinikk.url}${DELINGSBILDE.url}`],
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
      <body className="antialiased font-sans min-h-screen">
        <Bevegelse>
          {children}
          {/* woken on its own, after the page above it (see app/page.tsx) */}
          <Suspense>
            <Bunntekst />
          </Suspense>
        </Bevegelse>
        {/* Visits and load times from real visitors, counted by Vercel without
            cookies or anything stored in the browser, so no consent banner is
            needed (see /personvern). Turn both on under the project's
            Analytics and Speed Insights tabs in Vercel. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
