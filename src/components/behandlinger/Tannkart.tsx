"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowUp, Phone, Search, X } from "lucide-react";
import { behandlinger, klinikk } from "@/data/klinikk";
import { GRUPPER } from "@/components/forside/behandlinger/grupper";
import { cn } from "@/lib/utils";
import { BREDDE, HOYDE, PINFARGE, PUNKTER, type Punkt } from "./kart";
import { Tegning } from "./Tegning";
import s from "./tannkart.module.css";

/**
 * «Tannkartet». On a wide screen the drawing of both jaws stands beside the
 * list and stays in view while the list is read; the treatment being read
 * lights up on it, and pointing at a treatment or a pin lights it up too. A
 * pin is a link to its treatment. On a phone the drawing comes first, a
 * map to tap, and the list follows.
 *
 * The list is plain, readable text (h2 per group, h3 per treatment), so it
 * is all there for a search engine and for anyone without JavaScript. The
 * search box only hides what doesn't match.
 */

/** Words people use for each treatment that its own text doesn't, for the search box. */
const ORD: Record<string, string> = {
  tannsjekk: "kontroll undersøkelse sjekk tannlegetime",
  tannfylling: "hull karies fylling",
  tannbleking: "hvite tenner hvitere misfarget gule tenner bleke",
  tannrens: "rens puss plakk polering",
  tannkjottbehandling: "blør blødende tannkjøtt gingivitt periodontitt",
  tannstein: "belegg rens",
  rotfylling: "nerve rotbehandling tannpine",
  munntorrhet: "tørr munn spytt",
  tanngnissing: "skjærer tenner bittskinne kjeve hodepine",
  "ising-i-tenner": "følsomme sensitive kaldt varmt",
  "trekking-av-tenner": "trekke ekstraksjon fjerne tann",
  "darlig-ande": "lukt ånde",
  visdomstenner: "visdomstann trekke",
  tannsmerte: "vondt tannpine smerter akutt",
  tannskade: "knekt slått ulykke sprukket akutt",
  tannverk: "tannpine vondt smerter akutt",
  "mistet-fylling": "falt ut fylling hull akutt",
  hevelse: "hoven kinn infeksjon byll akutt",
  "losnet-tannkrone": "krone falt av løs akutt",
  tannkrone: "krone",
  tannbro: "bro mangler tann tannluke",
  skallfasetter: "fasetter veneers smil hvite tenner",
  tannimplantat: "implantat skrue mangler tann tannluke",
  delprotese: "protese gebiss løs",
  helprotese: "gebiss protese tannløs",
};

/** Lower case, æ/ø/å written out, so "tannkjott" finds "Tannkjøtt". */
const enkel = (t: string) =>
  t
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const SOKBAR = Object.fromEntries(PUNKTER.map((p) => [p.id, enkel(`${p.navn} ${p.tekst} ${ORD[p.id] ?? ""}`)]));

const ETTER_ID = Object.fromEntries(PUNKTER.map((p) => [p.id, p]));

const vanligRulling = () => (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");

export function Tannkart({ topp }: { topp: ReactNode }) {
  // what the pointer or keyboard is on, and what is being read
  const [peker, setPeker] = useState<string | null>(null);
  const [lest, setLest] = useState<string | null>(null);
  const [sok, setSok] = useState("");
  const kortRef = useRef<HTMLDivElement | null>(null);

  const aktiv = peker ?? lest;

  const treff = useMemo(() => {
    const ord = enkel(sok).split(/\s+/).filter(Boolean);
    if (!ord.length) return null;
    return new Set(PUNKTER.filter((p) => ord.every((o) => SOKBAR[p.id].includes(o))).map((p) => p.id));
  }, [sok]);

  // the treatment crossing the middle of the window is the one being read
  useEffect(() => {
    const synlige = new Set<string>();
    const obs = new IntersectionObserver(
      (oppf) => {
        for (const o of oppf) {
          if (o.isIntersecting) synlige.add(o.target.id);
          else synlige.delete(o.target.id);
        }
        const forst = PUNKTER.find((p) => synlige.has(p.id));
        setLest(forst ? forst.id : null);
      },
      { rootMargin: "-38% 0px -52% 0px" }
    );
    PUNKTER.forEach((p) => {
      const el = document.getElementById(p.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /** Go to a treatment in the list, and put the keyboard there. */
  const gaaTil = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setSok("");
    setLest(id);
    // after the search is cleared, so the treatment is shown
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: vanligRulling(), block: "start" });
      el.querySelector<HTMLElement>("h3")?.focus({ preventScroll: true });
      history.replaceState(null, "", `#${id}`);
    });
  };

  /** From the list back to the drawing: on a phone it is above, out of sight. */
  const visPaaKartet = (id: string) => {
    setPeker(null);
    setLest(id);
    const kort = kortRef.current;
    if (kort && kort.getBoundingClientRect().bottom < 80) kort.scrollIntoView({ behavior: vanligRulling(), block: "start" });
  };

  const antallTreff = treff?.size ?? PUNKTER.length;

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:gap-x-14 xl:gap-x-20">
      <div className="lg:col-start-1 lg:row-start-1">{topp}</div>

      {/* the drawing */}
      <aside aria-labelledby="tannkart-tittel" className="mt-10 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0">
        <div ref={kortRef} className={cn(s.kort, "relative scroll-mt-[88px] px-4 pb-5 pt-5 sm:px-7 sm:pt-6 lg:sticky lg:top-[92px]")}>
          <div className="flex items-baseline justify-between gap-4 px-1">
            <h2 id="tannkart-tittel" className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--color-glomma-deep)]">
              Tannkartet
            </h2>
            <p className="text-[12.5px] text-[var(--color-tekst-svak)]">Trykk på et nummer</p>
          </div>

          <a href="#behandlingslisten" className="sr-only focus:not-sr-only focus:absolute focus:z-10 focus:rounded-full focus:bg-[var(--color-glomma)] focus:px-4 focus:py-2 focus:text-[13px] focus:text-[var(--color-papir)]">
            Hopp over tannkartet
          </a>

          <div className={cn(s.flate, "mt-2")}>
            <Tegning />
            <Glod punkt={aktiv ? ETTER_ID[aktiv] : null} />
            <span aria-hidden="true" className="absolute left-0 top-[2%] text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--color-tekst-svak)]">
              Overkjeven
            </span>
            <span aria-hidden="true" className="absolute bottom-[1%] left-0 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--color-tekst-svak)]">
              Underkjeven
            </span>
            <nav aria-label="Behandlingene på tannkartet">
              {PUNKTER.map((p, i) => (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  aria-label={`${p.nr}. ${p.navn}`}
                  className={s.pin}
                  data-aktiv={aktiv === p.id || undefined}
                  data-av={(treff && !treff.has(p.id)) || undefined}
                  style={{ left: `${(p.pin[0] / BREDDE) * 100}%`, top: `${(p.pin[1] / HOYDE) * 100}%`, "--farge": PINFARGE[p.gruppe], "--n": i } as CSSProperties}
                  onPointerEnter={() => setPeker(p.id)}
                  onPointerLeave={() => setPeker(null)}
                  onFocus={() => setPeker(p.id)}
                  onBlur={() => setPeker(null)}
                  onClick={(e) => {
                    e.preventDefault();
                    gaaTil(p.id);
                  }}
                >
                  {p.nr}
                  <span aria-hidden="true" className={s.navn}>
                    {p.navn}
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* the groups, as a legend and a way to them */}
          <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-[var(--color-strek)] pt-4">
            {GRUPPER.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--color-tekst-2)] underline-offset-4 hover:text-[var(--color-glomma-deep)] hover:underline">
                  <span aria-hidden="true" className="size-2.5 rounded-full" style={{ background: PINFARGE[g.id] }} />
                  {g.kort}e <span className="tabular-nums text-[var(--color-tekst-svak)]">{g.liste.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* the list */}
      <div id="behandlingslisten" className="mt-12 lg:col-start-1 lg:row-start-2 lg:mt-14">
        <div className="sticky top-[72px] z-20 -mx-[var(--container-px)] border-b border-[var(--color-strek)] bg-[color-mix(in_srgb,var(--color-papir)_92%,transparent)] px-[var(--container-px)] py-3 backdrop-blur-md lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
          <div className="relative">
            <label htmlFor="behandlingssok" className="sr-only">
              Søk i behandlingene
            </label>
            <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-[var(--color-tekst-svak)]" />
            <input
              id="behandlingssok"
              type="search"
              value={sok}
              onChange={(e) => setSok(e.target.value)}
              placeholder="Søk: tannpine, hvite tenner, implantat …"
              autoComplete="off"
              className="h-12 w-full rounded-full border border-[var(--color-strek)] bg-white pl-11 pr-12 text-[16px] text-[var(--color-tekst)] placeholder:text-[var(--color-tekst-svak)] focus:border-[var(--color-teal)] focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-teal)_35%,transparent)] [&::-webkit-search-cancel-button]:appearance-none"
            />
            {sok && (
              <button
                type="button"
                onClick={() => setSok("")}
                aria-label="Tøm søket"
                className="absolute right-2 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-[var(--color-tekst-2)] hover:bg-[var(--color-kalk)]"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>
          <nav aria-label="Grupper" className="mt-3 flex gap-2 overflow-x-auto [scrollbar-width:none] lg:mt-4">
            {GRUPPER.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--color-strek)] bg-white/70 px-3.5 py-1.5 text-[13px] font-medium text-[var(--color-tekst)] transition-colors hover:border-[var(--color-glomma)]"
              >
                <span aria-hidden="true" className="size-2 rounded-full" style={{ background: PINFARGE[g.id] }} />
                {g.tittel}
              </a>
            ))}
          </nav>
        </div>

        <p aria-live="polite" className="sr-only">
          {treff ? `${antallTreff} ${antallTreff === 1 ? "behandling passer" : "behandlinger passer"}` : ""}
        </p>

        {treff && antallTreff === 0 && (
          <div className="mt-10 rounded-[20px] border border-dashed border-[var(--color-strek)] px-6 py-8 text-center">
            <p className="text-[16px] font-semibold text-[var(--color-glomma-deep)]">Ingen behandlinger passer «{sok}».</p>
            <p className="mt-2 text-[15px] leading-[1.6] text-[var(--color-tekst-2)]">
              Prøv et annet ord, eller{" "}
              <a href={klinikk.telefon.lenke} className="font-semibold text-[var(--color-glomma)] underline underline-offset-4">
                ring oss på {klinikk.telefon.visning}
              </a>
              , så hjelper vi deg.
            </p>
          </div>
        )}

        {GRUPPER.map((g) => {
          const punkter = PUNKTER.filter((p) => p.gruppe === g.id);
          const vist = punkter.filter((p) => !treff || treff.has(p.id));
          return (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-tittel`} hidden={vist.length === 0} className={cn(s.punkt, "pt-12 first-of-type:pt-8 lg:pt-16")}>
              <div className="flex items-baseline justify-between gap-4">
                <h2 id={`${g.id}-tittel`} className="font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(30px, 3.4vw, 44px)", lineHeight: 1, letterSpacing: "-0.045em" }}>
                  {g.tittel}
                </h2>
                <span className="shrink-0 text-[13px] tabular-nums text-[var(--color-tekst-svak)]">{g.liste.length} behandlinger</span>
              </div>
              <p className="mt-4 max-w-[60ch] text-[16.5px] leading-[1.65] text-[var(--color-tekst-2)]">{GRUPPE_INGRESS[g.id]}</p>

              {g.id === "akutt" && <Akutt />}

              <ul className="mt-6 border-t border-[var(--color-strek)]">
                {punkter.map((p) => (
                  <Rad key={p.id} p={p} skjult={!!treff && !treff.has(p.id)} aktiv={aktiv === p.id} onPek={setPeker} onVis={visPaaKartet} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <MobilTilbake kortRef={kortRef} />
    </div>
  );
}

const GRUPPE_INGRESS = { ordinaer: behandlinger.ordinaer.ingress, akutt: behandlinger.akutt.ingress, estetisk: behandlinger.estetisk.ingress } as const;

/** One treatment in the list. */
function Rad({ p, skjult, aktiv, onPek, onVis }: { p: Punkt; skjult: boolean; aktiv: boolean; onPek: (id: string | null) => void; onVis: (id: string) => void }) {
  return (
    <li id={p.id} hidden={skjult} className={cn(s.punkt, "border-b border-[var(--color-strek)]")} onPointerEnter={() => onPek(p.id)} onPointerLeave={() => onPek(null)}>
      <article aria-labelledby={`${p.id}-tittel`} className={cn("relative -mx-3 flex gap-4 rounded-[18px] px-3 py-6 transition-colors duration-300 sm:gap-5", aktiv && "lg:bg-[#FBF8F1]")}>
        <button
          type="button"
          onClick={() => onVis(p.id)}
          aria-label={`Vis ${p.navn} på tannkartet`}
          className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full text-[12.5px] font-semibold tabular-nums text-white transition-transform duration-300 hover:scale-110"
          style={{ background: PINFARGE[p.gruppe], boxShadow: aktiv ? `0 0 0 4px color-mix(in srgb, ${PINFARGE[p.gruppe]} 22%, transparent)` : undefined }}
        >
          {p.nr}
        </button>
        <div className="min-w-0">
          <h3 id={`${p.id}-tittel`} tabIndex={-1} className="text-[21px] font-bold leading-[1.15] tracking-[-0.025em] text-[var(--color-glomma-deep)] focus:outline-none">
            {p.navn}
          </h3>
          <p className="mt-2 max-w-[62ch] text-[16px] leading-[1.65] text-[var(--color-tekst-2)]">{p.tekst}</p>
        </div>
      </article>
    </li>
  );
}

/** For the acute group: the phone number, big. */
function Akutt() {
  const { telefon, apningstider } = klinikk;
  return (
    <div className="mt-6 flex flex-col gap-4 rounded-[22px] bg-[#F8E4DB] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <p className="text-[16px] font-semibold text-[var(--color-glomma-deep)]">Vondt nå? Ring tannlegen.</p>
        <p className="mt-1 text-[14px] text-[var(--color-tekst-2)]">
          {apningstider.dager} {apningstider.fra}–{apningstider.til}. Utenom åpningstid: legevakten, 116 117.
        </p>
      </div>
      <a
        href={telefon.lenke}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#B4472F] px-5 py-3 text-[15px] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(180,71,47,0.8)] transition-colors hover:bg-[#9A3B26]"
      >
        <Phone className="size-4" aria-hidden="true" />
        {telefon.visning}
      </a>
    </div>
  );
}

/** The glow on the chosen spot, over the drawing and under the pins. */
function Glod({ punkt }: { punkt: Punkt | null }) {
  if (!punkt) return <svg viewBox={`0 0 ${BREDDE} ${HOYDE}`} className="pointer-events-none absolute inset-0 size-full" aria-hidden="true" />;
  const farge = PINFARGE[punkt.gruppe];
  return (
    <svg viewBox={`0 0 ${BREDDE} ${HOYDE}`} className="pointer-events-none absolute inset-0 size-full" aria-hidden="true">
      <line x1={punkt.anker[0]} y1={punkt.anker[1]} x2={punkt.pin[0]} y2={punkt.pin[1]} stroke={farge} strokeWidth={1.6} strokeLinecap="round" />
      <circle key={punkt.id} cx={punkt.anker[0]} cy={punkt.anker[1]} r={21} fill={farge} fillOpacity={0.12} stroke={farge} strokeWidth={1.6} className={s.glod} />
    </svg>
  );
}

/** On a phone, once the drawing has scrolled away, a small button back up to it. */
function MobilTilbake({ kortRef }: { kortRef: React.RefObject<HTMLDivElement | null> }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const kort = kortRef.current;
    if (!kort) return;
    const obs = new IntersectionObserver(([o]) => setVis(!o.isIntersecting && o.boundingClientRect.top < 0));
    obs.observe(kort);
    return () => obs.disconnect();
  }, [kortRef]);
  return (
    <button
      type="button"
      onClick={() => kortRef.current?.scrollIntoView({ behavior: vanligRulling(), block: "start" })}
      className={cn(
        "fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full bg-[var(--color-glomma)] px-4 py-3 text-[13px] font-semibold text-[var(--color-papir)] shadow-[0_14px_30px_-12px_rgba(22,48,59,0.8)] transition-[opacity,transform] duration-300 lg:hidden",
        vis ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      )}
      tabIndex={vis ? 0 : -1}
      aria-hidden={!vis}
    >
      <ArrowUp className="size-4" aria-hidden="true" />
      Tannkartet
    </button>
  );
}
