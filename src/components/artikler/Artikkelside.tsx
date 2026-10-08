import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { ARTIKLER, RAD_OG_TIPS, type Artikkel } from "@/data/artikler";
import { Smuler, Vis } from "./deler";
import { Ark, Avsender, Brod, DelVisning, Hilsen, Sporsmal } from "./lapp";
import { Sjekk } from "./Sjekk";
import { TEGNINGER } from "./tegninger";

/* One «Råd og tips» article: a note from the clinic on a sheet of paper,
   with pen sketches in the margin and yellow sticky notes between the
   sections. Once you have read it, you can tap what fits you and get a
   hint; the note ends with one button, to book. Under the sheet, the
   other articles. */

function strukturert(a: Artikkel) {
  const url = `${klinikk.url}${RAD_OG_TIPS.sti}/${a.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${url}#side`,
        url,
        name: a.tittel,
        headline: a.tittel,
        description: a.beskrivelse,
        inLanguage: "nb-NO",
        audience: { "@type": "PeopleAudience", audienceType: "Pasienter" },
        publisher: { "@type": "Dentist", "@id": `${klinikk.url}/#klinikk`, name: klinikk.navn },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Forside", item: `${klinikk.url}/` },
          { "@type": "ListItem", position: 2, name: RAD_OG_TIPS.navn, item: `${klinikk.url}${RAD_OG_TIPS.sti}` },
          { "@type": "ListItem", position: 3, name: a.kort, item: url },
        ],
      },
    ],
  };
}

export function Artikkelside({ artikkel }: { artikkel: Artikkel }) {
  let lapper = 0;
  const andre = ARTIKLER.filter((a) => a.slug !== artikkel.slug);
  return (
    <main className="overflow-x-clip bg-[var(--color-papir)] pb-[clamp(56px,10vw,140px)] pt-[clamp(96px,12vw,140px)]">
      <script
        type="application/ld+json"
        // Safe: built from the site's own static data, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturert(artikkel)) }}
      />
      <div className="mx-auto w-full max-w-[1040px] px-[var(--container-px)]">
        <Smuler sider={[{ navn: RAD_OG_TIPS.navn, href: RAD_OG_TIPS.sti }, { navn: artikkel.kort }]} />

        <Ark className="mt-8">
          <Avsender artikkel={artikkel} />
          <div className="mt-10 md:mt-14">
            {artikkel.deler.map((del, i) => (
              <DelVisning key={del.type === "lapp" ? `lapp-${i}` : del.id} del={del} n={del.type === "lapp" ? lapper++ : 0} />
            ))}

            {/* after reading: what fits you? */}
            <Vis as="section" id="hos-deg" className="scroll-mt-28 border-t border-dashed border-[var(--color-strek)] pt-10 md:pt-14">
              <Sporsmal>{artikkel.sjekk.tittel}</Sporsmal>
              <Brod className="mt-3">{artikkel.sjekk.intro}</Brod>
              <Sjekk sjekk={artikkel.sjekk} className="mt-7" />
            </Vis>
          </div>
          <Hilsen tekst={artikkel.slutt} />
        </Ark>

        {/* the other notes */}
        <section aria-labelledby="flere" className="mt-16 md:mt-20">
          <h2 id="flere" className="text-[22px] font-bold tracking-[-0.02em] text-[var(--color-glomma-deep)] md:text-[26px]">
            Flere {RAD_OG_TIPS.navn.toLowerCase()}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {andre.map((a) => {
              const T = TEGNINGER[a.tegning];
              return (
                <li key={a.slug}>
                  <Link
                    href={`${RAD_OG_TIPS.sti}/${a.slug}`}
                    className="group flex items-center gap-4 rounded-[22px] bg-[#FBF8F1] p-4 pr-5 ring-1 ring-[var(--color-strek)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_40px_-30px_rgba(10,25,32,0.5)]"
                  >
                    <T strek className="w-16 shrink-0" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[17.5px] font-bold leading-[1.25] text-[var(--color-glomma-deep)]">{a.tittel}</span>
                      <span className="mt-1 block text-[14px] text-[var(--color-tekst-svak)]">{a.lesetid}</span>
                    </span>
                    <ArrowRight className="size-5 shrink-0 text-[var(--color-teal)] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
}
