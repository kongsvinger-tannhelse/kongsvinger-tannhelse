import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { ARTIKLER, GJENNOMGATT, RAD_OG_TIPS, type Artikkel } from "@/data/artikler";
import { LesOgsa } from "@/components/behandlinger/side/Beslektet";
import { ARTIKKEL_SIDER } from "@/data/artikler/tema";
import { finnBehandlingsside, sideSti } from "@/data/behandlinger";
import { Smuler, Vis } from "./deler";
import { Ark, Brod, DelVisning, Hilsen, Sporsmal, Topp, type Seksjon } from "./lapp";
import { Margflyt } from "./Margflyt";
import type { Festet } from "./mellom";
import { Sjekk } from "./Sjekk";
import { TEGNINGER } from "./tegninger";

/* One «Råd og tips» article: a note from the clinic on a sheet of paper,
   with pen sketches, and yellow sticky notes pinned to the words they
   explain. Once you have read it, you can tap what fits you and get a
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
        lastReviewed: GJENNOMGATT,
        dateModified: GJENNOMGATT,
        isPartOf: { "@id": `${klinikk.url}/#nettsted` },
        author: { "@id": `${klinikk.url}/#klinikk` },
        citation: a.kilder.map((k) => ({ "@type": "CreativeWork", name: k.navn, url: k.url, publisher: { "@type": "Organization", name: k.utgiver } })),
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

const DATO = new Date(`${GJENNOMGATT}T12:00:00Z`).toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Oslo" });

/** What the note rests on: the official pages it was checked against, and when. */
function Kilder({ artikkel }: { artikkel: Artikkel }) {
  return (
    <section aria-labelledby="kilder" className="mt-10 border-t border-dashed border-[var(--color-strek)] pt-8 md:mt-12">
      <h2 id="kilder" className="text-[18px] font-bold tracking-[-0.01em] text-[var(--color-tekst-2)]">
        Kilder
      </h2>
      <p className="mt-2 max-w-[60ch] text-[15px] leading-[1.6] text-[var(--color-tekst-2)]">
        Teksten er sjekket mot disse sidene fra helsemyndighetene og fagfolk, sist {DATO}. Den erstatter ikke en undersøkelse hos tannlegen.
      </p>
      <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
        {artikkel.kilder.map((k) => (
          <li key={k.url}>
            <a
              href={k.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-1.5 text-[14.5px] leading-[1.45] text-[var(--color-tekst)] underline decoration-[var(--color-strek)] decoration-1 underline-offset-4 hover:decoration-[var(--color-glomma)]"
            >
              <span>
                <span className="font-semibold text-[var(--color-glomma-deep)]">{k.utgiver}:</span> {k.navn}
              </span>
              <ArrowUpRight className="size-3.5 shrink-0 translate-y-0.5 text-[var(--color-tekst-svak)]" aria-hidden="true" />
              <span className="sr-only">(åpnes i ny fane)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** The sections in order, each with the sticky notes that follow it in the data. */
function seksjoner(a: Artikkel) {
  const ut: { del: Seksjon; lapper: Festet[] }[] = [];
  let n = 0;
  for (const del of a.deler) {
    if (del.type !== "lapp") {
      ut.push({ del, lapper: [] });
      continue;
    }
    // index.ts makes sure every note comes after a section
    ut[ut.length - 1]?.lapper.push({ lapp: del.lapp, n, id: del.lapp.feste ? `feste-${n}` : null });
    n++;
  }
  return ut;
}

export function Artikkelside({ artikkel }: { artikkel: Artikkel }) {
  const andre = ARTIKLER.filter((a) => a.slug !== artikkel.slug);
  return (
    <main className="overflow-x-clip bg-[var(--color-papir)] pb-[clamp(56px,10vw,140px)] pt-[clamp(96px,12vw,140px)]">
      <script
        type="application/ld+json"
        // Safe: built from the site's own static data, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturert(artikkel)) }}
      />
      <div className="mx-auto w-full max-w-[1040px] px-[var(--container-px)] xl:max-w-[1180px]">
        <Smuler sider={[{ navn: RAD_OG_TIPS.navn, href: RAD_OG_TIPS.sti }, { navn: artikkel.kort }]} />

        <Ark className="mt-8">
          <Topp tittel={artikkel.tittel} ingress={artikkel.ingress} />
          <Margflyt className="mt-10 md:mt-14">
            {seksjoner(artikkel).map(({ del, lapper }) => (
              <DelVisning key={del.id} del={del} lapper={lapper} />
            ))}

            {/* after reading: what fits you? */}
            <Vis as="section" id="hos-deg" className="scroll-mt-28 border-t border-dashed border-[var(--color-strek)] pt-10 md:pt-14">
              <Sporsmal>{artikkel.sjekk.tittel}</Sporsmal>
              <Brod className="mt-3">{artikkel.sjekk.intro}</Brod>
              <Sjekk sjekk={artikkel.sjekk} className="mt-7" />
            </Vis>
          </Margflyt>
          <div className="mt-10 md:mt-14">
            <LesOgsa lenker={(ARTIKKEL_SIDER[artikkel.slug] ?? []).flatMap((s) => {
              const side = finnBehandlingsside(s);
              return side ? [{ href: sideSti(side.slug), navn: side.navn }] : [];
            })} />
          </div>
          <Hilsen tekst={artikkel.slutt} apent />
          <Kilder artikkel={artikkel} />
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
                    className="group flex items-center gap-4 rounded-[22px] bg-[#FFFDF8] p-4 pr-5 ring-1 ring-[var(--color-strek)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_40px_-30px_rgba(10,25,32,0.5)]"
                  >
                    <T strek className="w-16 shrink-0" />
                    <span className="min-w-0 flex-1 text-[17.5px] font-bold leading-[1.25] text-[var(--color-glomma-deep)]">{a.tittel}</span>
                    <ArrowRight className="size-5 shrink-0 text-[var(--color-tekst)] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
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
