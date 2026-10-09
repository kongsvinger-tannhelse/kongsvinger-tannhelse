import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { ARTIKLER, RAD_OG_TIPS } from "@/data/artikler";
import { Smuler, Vis } from "./deler";
import { TEGNINGER } from "./tegninger";

/* /rad-og-tips: every note, each on its own small sheet of paper with its
   pen sketch, drawing itself as the sheets come into view. */

const strukturert = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${klinikk.url}${RAD_OG_TIPS.sti}#side`,
      url: `${klinikk.url}${RAD_OG_TIPS.sti}`,
      name: RAD_OG_TIPS.navn,
      description: RAD_OG_TIPS.ingress,
      inLanguage: "nb-NO",
      publisher: { "@type": "Dentist", "@id": `${klinikk.url}/#klinikk`, name: klinikk.navn },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: ARTIKLER.map((a, i) => ({ "@type": "ListItem", position: i + 1, name: a.tittel, url: `${klinikk.url}${RAD_OG_TIPS.sti}/${a.slug}` })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Forside", item: `${klinikk.url}/` },
        { "@type": "ListItem", position: 2, name: RAD_OG_TIPS.navn, item: `${klinikk.url}${RAD_OG_TIPS.sti}` },
      ],
    },
  ],
};

export function Oversikt() {
  return (
    <main className="bg-[var(--color-papir)] pb-[clamp(56px,10vw,140px)] pt-[clamp(96px,12vw,140px)]">
      <script
        type="application/ld+json"
        // Safe: built from the site's own static data, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturert) }}
      />
      <div className="mx-auto w-full max-w-[1120px] px-[var(--container-px)]">
        <Smuler sider={[{ navn: RAD_OG_TIPS.navn }]} />
        <header className="mt-6 max-w-[760px]">
          <h1 className="font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(44px, 6.6vw, 88px)", lineHeight: 0.95, letterSpacing: "-0.055em" }}>
            {RAD_OG_TIPS.navn}
          </h1>
          <p className="mt-5 max-w-[46ch] text-[19px] leading-[1.6] text-[var(--color-tekst-2)] md:text-[21px]">{RAD_OG_TIPS.ingress}</p>
        </header>

        <ul className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {ARTIKLER.map((a, i) => {
            const T = TEGNINGER[a.tegning];
            return (
              <Vis as="li" key={a.slug}>
                <Link
                  href={`${RAD_OG_TIPS.sti}/${a.slug}`}
                  className="group flex h-full flex-col rounded-[26px] bg-[#FFFDF8] p-6 shadow-[0_30px_50px_-46px_rgba(10,25,32,0.55)] ring-1 ring-[var(--color-strek)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_36px_60px_-40px_rgba(10,25,32,0.55)] md:p-7"
                >
                  <T strek className="w-28 md:w-32" forsink={(i % 3) * 0.2} />
                  <h2 className="mt-4 text-[24px] font-bold leading-[1.15] tracking-[-0.03em] text-[var(--color-glomma-deep)]">{a.tittel}</h2>
                  <p className="mt-2.5 text-[16.5px] leading-[1.6] text-[var(--color-tekst-2)]">{a.ingress}</p>
                  <span className="mt-auto flex items-center justify-between gap-3 pt-6 text-[15px]">
                    <span className="text-[var(--color-tekst-svak)]">{a.lesetid}</span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-teal)]">
                      Les
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </Vis>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
