import Link from "next/link";
import { klinikk } from "@/data/klinikk";
import { ARTIKLER_GRUPPERT, RAD_OG_TIPS, type Artikkel } from "@/data/artikler";
import { cn } from "@/lib/utils";
import { Smuler, Vis } from "./deler";
import { Ark, Hilsen, Topp } from "./lapp";
import { TEGNINGER } from "./tegninger";
import s from "./artikler.module.css";

/* /rad-og-tips: one sheet from the clinic, like the articles themselves,
   with what we have written, grouped by what you need. Each line is a
   title and one plain sentence, with its pen sketch in the margin drawing
   itself as the line comes into view. A new article is one more line. */

/** The order the page shows them in: by need. */
const I_REKKEFOLGE = ARTIKLER_GRUPPERT.flatMap((g) => g.artikler);

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
        itemListElement: I_REKKEFOLGE.map((a, i) => ({ "@type": "ListItem", position: i + 1, name: a.tittel, url: `${klinikk.url}${RAD_OG_TIPS.sti}/${a.slug}` })),
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

/** One line in the list: the title is the link, but the whole line can be clicked, and it is the line that shows focus. */
function Linje({ artikkel }: { artikkel: Artikkel }) {
  const T = TEGNINGER[artikkel.tegning];
  return (
    <Vis
      as="li"
      className={cn(
        "group relative -mx-3 flow-root rounded-[20px] px-3 py-4 transition-colors duration-300 hover:bg-[var(--color-papir)]/55",
        "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-glomma",
        "md:-mx-5 md:px-5 md:py-5 lg:grid lg:grid-cols-[minmax(0,1fr)_128px] lg:items-center lg:gap-x-10",
      )}
    >
      <T strek className="float-right -mt-1 mb-1 ml-3 w-[72px] sm:w-24 lg:order-2 lg:float-none lg:m-0 lg:w-full" forsink={0.1} />
      <div className="lg:order-1">
        <h3 className="text-[22px] font-bold leading-[1.2] tracking-[-0.025em] text-[var(--color-glomma-deep)] md:text-[26px]">
          <Link
            href={`${RAD_OG_TIPS.sti}/${artikkel.slug}`}
            className={cn(
              "decoration-[var(--color-tekst)] decoration-2 underline-offset-[6px] after:absolute after:inset-0 after:rounded-[20px] group-hover:underline",
              s.linjelenke,
            )}
          >
            {artikkel.tittel}
          </Link>
        </h3>
        <p className="mt-2 max-w-[54ch] text-[17px] leading-[1.6] text-[var(--color-tekst-2)] md:text-[18px]">{artikkel.linje}</p>
      </div>
    </Vis>
  );
}

export function Oversikt() {
  return (
    <main className="overflow-x-clip bg-[var(--color-papir)] pb-[clamp(56px,10vw,140px)] pt-[clamp(96px,12vw,140px)]">
      <script
        type="application/ld+json"
        // Safe: built from the site's own static data, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturert) }}
      />
      <div className="mx-auto w-full max-w-[1120px] px-[var(--container-px)]">
        <Smuler sider={[{ navn: RAD_OG_TIPS.navn }]} />

        <Ark className="mt-8">
          <Topp tittel={RAD_OG_TIPS.navn} ingress={RAD_OG_TIPS.ingress} />

          <div className="mt-10 md:mt-14">
            {ARTIKLER_GRUPPERT.map((g) => (
              <section
                key={g.id}
                aria-labelledby={`gruppe-${g.id}`}
                className="border-t border-dashed border-[var(--color-strek)] pb-3 pt-8 md:pt-10 lg:grid lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-x-12 lg:pb-6"
              >
                <h2 id={`gruppe-${g.id}`} className="text-[20px] font-bold leading-[1.25] tracking-[-0.02em] text-[var(--color-tekst)] md:text-[22px] lg:pt-[38px]">
                  {g.navn}
                </h2>
                <ul className="mt-2 lg:mt-0">
                  {g.artikler.map((a) => (
                    <Linje key={a.slug} artikkel={a} />
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <Hilsen tekst="Lurer du på noe mer? Spør oss neste gang du er her." apent bestill={false} className="md:mt-10" />
        </Ark>
      </div>
    </main>
  );
}
