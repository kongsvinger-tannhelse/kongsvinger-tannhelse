"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent, type UIEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, ChevronRight, Search, X } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { GRUPPER } from "@/components/forside/behandlinger/grupper";
import { harSide, sideSti } from "@/data/behandlinger/sider";
import { cn } from "@/lib/utils";
import { Bokmerke, Bunnlinje, GRUPPENAVN, KORT, Vindu } from "./deler";
import { PINFARGE, PUNKTER, type Punkt } from "./punkter";
import s from "./oppslag.module.css";

/**
 * The treatments on /behandlinger, as a book to look things up in.
 *
 * On a wide screen it lies open: the left page is the register (a search
 * box, a row for every treatment with a round window on its paper scene and
 * a few words, and the three groups as a thumb index cut into the page's
 * edge), the right page is the chosen treatment, its scene standing big over
 * the text in large type, a ribbon in its group's colour lying over it.
 * Pick another and the right page turns on the spine; the arrow keys walk
 * the register.
 *
 * On a phone the register is the page itself, with the search and the
 * group tabs kept at the top, and a tap slides a sheet up from the bottom
 * with the scene, the full text and the buttons; drag it down, tap outside
 * or press back to put it away. Ring and Bestill stay along the bottom of
 * the screen.
 *
 * The address follows the chosen treatment (/behandlinger#rotfylling), so
 * the front page and search results can link straight to one. Every
 * treatment's full text is in the page from the start.
 */

const enkel = (t: string) =>
  t
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a");

/** Words people use that a treatment's own text doesn't, for the search box. */
const ORD: Record<string, string> = {
  tannsjekk: "kontroll undersøkelse",
  tannfylling: "hull karies",
  tannbleking: "hvite tenner hvitere misfarget gule",
  tannkjottbehandling: "blør blødende gingivitt",
  rotfylling: "nerve tannpine",
  munntorrhet: "tørr munn spytt",
  tanngnissing: "skjærer bittskinne kjeve",
  "ising-i-tenner": "følsomme sensitive kaldt",
  "trekking-av-tenner": "trekke fjerne tann",
  "darlig-ande": "lukt",
  visdomstenner: "visdomstann",
  tannsmerte: "tannpine vondt smerter akutt",
  tannskade: "knekt slått ulykke akutt",
  tannverk: "tannpine vondt akutt",
  "mistet-fylling": "falt ut akutt",
  hevelse: "hoven kinn infeksjon byll akutt",
  "losnet-tannkrone": "krone falt av løs akutt",
  tannbro: "mangler tann tannluke",
  skallfasetter: "fasetter hvite tenner smil",
  tannimplantat: "implantat skrue mangler tann tannluke",
  delprotese: "protese gebiss",
  helprotese: "protese gebiss tannløs",
};
const SOKBAR = Object.fromEntries(PUNKTER.map((p) => [p.id, enkel(`${p.navn} ${KORT[p.id]} ${p.tekst} ${ORD[p.id] ?? ""}`)]));
const NAVN = Object.fromEntries(PUNKTER.map((p) => [p.id, enkel(p.navn)]));
const STIKKORD = Object.fromEntries(PUNKTER.map((p) => [p.id, enkel(`${p.navn} ${KORT[p.id]} ${ORD[p.id] ?? ""}`)]));

/**
 * How well a treatment answers a search, lowest first: its name, then its
 * few words and other words, then only its long text. Between two that
 * answer equally well, the urgent one comes first, since a word like
 * «tannpine» may mean someone is in pain.
 */
const rang = (p: Punkt, ord: string[]) => {
  if (ord.every((o) => NAVN[p.id].includes(o))) return 0;
  return (ord.every((o) => STIKKORD[p.id].includes(o)) ? 1 : 3) + (p.gruppe === "akutt" ? 0 : 1);
};

type Filter = "alle" | (typeof GRUPPER)[number]["id"];
const FILTRE: Filter[] = ["alle", ...GRUPPER.map((g) => g.id)];
/** A tab's colour: its group's, and the river's for all of them. */
const fanefarge = (f: Filter) => (f === "alle" ? "var(--color-glomma)" : PINFARGE[f]);

const BRED = "(min-width: 768px)";
const lytt = (endret: () => void) => {
  const mq = window.matchMedia(BRED);
  mq.addEventListener("change", endret);
  return () => mq.removeEventListener("change", endret);
};

export function Oppslag() {
  // a wide screen until the browser says otherwise: the server draws the open book
  const bred = useSyncExternalStore(lytt, () => window.matchMedia(BRED).matches, () => true);
  const [valgt, setValgt] = useState<string>(PUNKTER[0].id);
  const [ark, setArk] = useState<Punkt | null>(null);
  const [sok, setSok] = useState("");
  const [filter, setFilter] = useState<Filter>("alle");
  const liste = useRef<HTMLUListElement | null>(null);
  const sokeboks = useRef<HTMLDivElement | null>(null);
  const merke = useRef<HTMLSpanElement | null>(null);

  const vist = useMemo(() => {
    const ord = enkel(sok).split(/\s+/).filter(Boolean);
    const treff = PUNKTER.filter((p) => (filter === "alle" || p.gruppe === filter) && ord.every((o) => SOKBAR[p.id].includes(o)));
    return ord.length ? [...treff].sort((a, b) => rang(a, ord) - rang(b, ord)) : treff;
  }, [sok, filter]);

  // the right page shows the chosen treatment while it is in the list, else the list's first
  const aktiv = vist.some((p) => p.id === valgt) ? valgt : (vist[0]?.id ?? valgt);

  // on a phone the search box stays at the top; a new search brings the list's top back up under it
  const tilListen = () => {
    if (bred) return;
    requestAnimationFrame(() => {
      const boks = sokeboks.current?.getBoundingClientRect().bottom;
      const topp = liste.current?.getBoundingClientRect().top;
      if (boks !== undefined && topp !== undefined && topp < boks) window.scrollBy({ top: topp - boks });
    });
  };

  const velg = (id: string) => {
    setValgt(id);
    history.replaceState(history.state, "", `#${id}`);
    liste.current?.querySelector<HTMLElement>(`[data-id="${id}"]`)?.scrollIntoView({ block: "nearest" });
  };

  const apneArk = (p: Punkt) => {
    if (!ark) history.pushState({ ark: p.id }, "", `#${p.id}`);
    else history.replaceState(history.state, "", `#${p.id}`);
    setValgt(p.id);
    setArk(p);
  };
  const lukkArk = () => history.back();

  const trykk = (p: Punkt) => (bred ? velg(p.id) : apneArk(p));

  // a link straight to a treatment opens it, on arrival or from a link on
  // the page; the phone's back button closes the sheet
  useEffect(() => {
    const fraAdressen = (ny: boolean) => {
      const id = decodeURIComponent(location.hash.slice(1));
      const p = PUNKTER.find((x) => x.id === id);
      if (!p) return;
      setValgt(p.id);
      // on a phone the treatment opens in its sheet, with a step in the history to close it
      if (!window.matchMedia(BRED).matches) {
        if (ny) {
          history.replaceState(null, "", location.pathname);
          history.pushState({ ark: p.id }, "", `#${p.id}`);
        }
        setArk(p);
      }
    };
    const t = requestAnimationFrame(() => fraAdressen(true));
    const lenke = () => fraAdressen(false);
    const tilbake = () => setArk(null);
    window.addEventListener("hashchange", lenke);
    window.addEventListener("popstate", tilbake);
    return () => {
      cancelAnimationFrame(t);
      window.removeEventListener("hashchange", lenke);
      window.removeEventListener("popstate", tilbake);
    };
  }, []);

  // the sheet belongs to the phone: if the screen widens, the book takes over
  useEffect(() => {
    if (bred && ark) history.back();
  }, [bred, ark]);

  const piler = (e: KeyboardEvent) => {
    if (!bred || (e.key !== "ArrowDown" && e.key !== "ArrowUp")) return;
    e.preventDefault();
    const i = vist.findIndex((p) => p.id === aktiv);
    const neste = vist[Math.min(vist.length - 1, Math.max(0, i + (e.key === "ArrowDown" ? 1 : -1)))];
    if (neste) {
      velg(neste.id);
      liste.current?.querySelector<HTMLElement>(`[data-id="${neste.id}"]`)?.focus();
    }
  };

  // the ribbon lies on the page: it goes up with a long text, and a new page starts at the top
  const folg = (e: UIEvent<HTMLElement>) => {
    if (merke.current) merke.current.style.translate = `0 ${-e.currentTarget.scrollTop}px`;
  };
  useEffect(() => {
    if (merke.current) merke.current.style.translate = "";
  }, [aktiv]);

  // the right page's arrows walk the same list as the register beside it
  const i = vist.findIndex((p) => p.id === aktiv);
  const forrige = i > 0 ? vist[i - 1] : undefined;
  const neste = i >= 0 ? vist[i + 1] : undefined;

  return (
    <>
      <div className={s.bok}>
        {/* the register */}
        <div className="flex min-h-0 flex-col">
          <div ref={sokeboks} className="sticky top-[72px] z-30 -mx-[var(--container-px)] bg-[color-mix(in_srgb,var(--color-papir)_94%,transparent)] px-[var(--container-px)] pt-2 backdrop-blur-md md:static md:mx-0 md:bg-transparent md:pb-3 md:pl-11 md:pr-8 md:pt-8 md:backdrop-blur-none">
            <div className="relative">
              <label htmlFor="behandlingssok" className="sr-only">
                Søk i behandlingene
              </label>
              <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-[var(--color-tekst-svak)]" />
              <input
                id="behandlingssok"
                type="search"
                value={sok}
                onChange={(e) => {
                  setSok(e.target.value);
                  tilListen();
                }}
                placeholder="Søk: tannpine, hvite tenner …"
                autoComplete="off"
                className="h-12 w-full rounded-full border border-[var(--color-strek)] bg-white pl-11 pr-11 text-[16px] placeholder:text-[var(--color-tekst-svak)] focus:border-[var(--color-teal)] focus:outline-none focus-visible:outline-none md:h-11 md:text-[15px] [&::-webkit-search-cancel-button]:appearance-none"
              />
              {sok && (
                <button type="button" onClick={() => setSok("")} aria-label="Tøm søket" className="absolute right-1.5 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full">
                  <X className="size-4" aria-hidden="true" />
                </button>
              )}
            </div>
            {/* the thumb index: along the list's top on a phone, cut into the book's edge on a wide screen */}
            <div role="group" aria-label="Vis gruppe" className={s.faner} style={{ "--valgt": fanefarge(filter) } as CSSProperties}>
              {FILTRE.map((f) => {
                const g = GRUPPER.find((x) => x.id === f);
                return (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={filter === f}
                    onClick={() => {
                      setFilter(f);
                      tilListen();
                    }}
                    className={s.fane}
                    style={{ "--farge": fanefarge(f) } as CSSProperties}
                  >
                    <span>{g ? `${g.kort}e` : "Alle"}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <p aria-live="polite" className="sr-only">
            {sok || filter !== "alle" ? `${vist.length} behandlinger` : ""}
          </p>

          <ul ref={liste} onKeyDown={piler} aria-label="Behandlingene" className="-mx-2 min-h-0 flex-1 pb-36 pt-1 md:mx-0 md:overflow-y-auto md:pb-6 md:pl-8 md:pr-5 md:pt-0">
            {vist.map((p) => {
              const pa = bred && p.id === aktiv;
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    data-id={p.id}
                    aria-current={pa ? "true" : undefined}
                    onClick={() => trykk(p)}
                    className={cn(
                      "flex min-h-[80px] w-full items-center gap-3.5 rounded-[18px] px-2 py-2.5 text-left transition-colors active:bg-black/[0.04] md:min-h-0 md:gap-3 md:px-3",
                      pa ? "md:bg-white md:shadow-[0_0_0_1px_var(--color-strek),0_10px_20px_-16px_rgba(22,48,59,0.6)]" : "md:hover:bg-black/[0.035]"
                    )}
                  >
                    <Vindu p={p} rund className="size-[60px] shrink-0 shadow-[0_6px_14px_-8px_rgba(22,48,59,0.55)] md:size-11 md:shadow-none" />
                    <span className="min-w-0 flex-1 border-b border-[var(--color-strek)] pb-2.5 pt-1 md:border-0 md:p-0">
                      <span className="flex items-center gap-2 text-[17px] font-semibold tracking-[-0.015em] text-[var(--color-glomma-deep)] md:text-[15.5px]">
                        {p.navn}
                        {/* the row's group: a dot in its colour, in words for screen readers */}
                        <span aria-hidden="true" className="size-2 shrink-0 rounded-full md:size-1.5" style={{ background: PINFARGE[p.gruppe] }} />
                        <span className="sr-only">, {GRUPPENAVN[p.gruppe].toLowerCase()}</span>
                      </span>
                      <span className="mt-0.5 block text-[14.5px] leading-snug text-[var(--color-tekst-svak)] md:truncate md:text-[13.5px]">{KORT[p.id]}</span>
                    </span>
                    {pa ? <span aria-hidden="true" className="hidden h-6 w-1 rounded-full md:block" style={{ background: PINFARGE[p.gruppe] }} /> : <ChevronRight className="size-5 shrink-0 text-[var(--color-tekst-svak)] md:hidden" aria-hidden="true" />}
                  </button>
                </li>
              );
            })}
            {vist.length === 0 && (
              <li className="mx-2 mt-4 rounded-[20px] border border-dashed border-[var(--color-strek)] px-5 py-8 text-center md:mx-0">
                <p className="text-[16px] font-semibold text-[var(--color-glomma-deep)]">Ingen treff på «{sok}»{filter !== "alle" && ` blant de ${GRUPPER.find((g) => g.id === filter)?.kort.toLowerCase()}e`}.</p>
                {filter !== "alle" && (
                  <button type="button" onClick={() => setFilter("alle")} className="mt-2 block w-full text-[15px] font-semibold text-[var(--color-glomma)] underline underline-offset-4">
                    Søk i alle behandlingene
                  </button>
                )}
                <a href={klinikk.telefon.lenke} className="mt-2 inline-block text-[15px] font-semibold text-[var(--color-glomma)] underline underline-offset-4">
                  Ring oss, så hjelper vi deg
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* the right page: every treatment's text is here; the chosen one shows (on a wide screen) */}
        <div className={cn(s.hoyre, "hidden md:flex")}>
          <div className={s.sider}>
            {PUNKTER.map((p) => (
              <article
                key={p.id}
                id={p.id}
                aria-labelledby={`${p.id}-tittel`}
                hidden={p.id !== aktiv}
                onScroll={p.id === aktiv ? folg : undefined}
                className={cn("min-h-0 flex-1 overflow-y-auto px-10 pt-8", p.id === aktiv && s.blad)}
              >
                {p.id === aktiv && bred && <Vindu p={p} className="aspect-[2/1] max-h-[28svh] w-full rounded-[22px] shadow-[0_18px_34px_-24px_rgba(22,48,59,0.6)]" opp />}
                <Innhold p={p} />
              </article>
            ))}
            {/* the ribbon stays with the book while the page turns under it */}
            <div className={s.merkefelt}>
              <Bokmerke ref={merke} gruppe={(PUNKTER.find((p) => p.id === aktiv) ?? PUNKTER[0]).gruppe} />
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-[var(--color-strek)] px-10 py-4">
            <button type="button" disabled={!forrige} onClick={() => forrige && velg(forrige.id)} className="inline-flex min-w-0 items-center gap-2 rounded-full px-3 py-2 text-[14px] font-semibold text-[var(--color-glomma)] hover:bg-black/[0.04] disabled:opacity-30">
              <ArrowLeft className="size-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{forrige?.navn ?? "Forrige"}</span>
            </button>
            <button type="button" disabled={!neste} onClick={() => neste && velg(neste.id)} className="inline-flex min-w-0 items-center gap-2 rounded-full px-3 py-2 text-[14px] font-semibold text-[var(--color-glomma)] hover:bg-black/[0.04] disabled:opacity-30">
              <span className="truncate">{neste?.navn ?? "Neste"}</span>
              <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {!bred && <Ark p={ark} liste={vist} onBytt={apneArk} onLukk={lukkArk} />}
      <Bunnlinje />
    </>
  );
}

/** A treatment's name, few words, full text and buttons: on the right page and in the sheet. Its group is on the ribbon. */
function Innhold({ p, tittelId = `${p.id}-tittel` }: { p: Punkt; tittelId?: string }) {
  return (
    <>
      <p className="sr-only">{GRUPPENAVN[p.gruppe]}</p>
      <h2 id={tittelId} className="mt-6 text-[30px] md:mt-8 font-bold leading-[1.02] tracking-[-0.04em] text-[var(--color-glomma-deep)] md:text-[clamp(34px,3.4vw,46px)] md:tracking-[-0.045em]">
        {p.navn}
      </h2>
      <p className="mt-2 text-[16px] font-medium text-[var(--color-tekst-svak)] md:text-[18px]">{KORT[p.id]}</p>
      <p className="mt-3 max-w-[60ch] text-[17.5px] leading-[1.6] text-[var(--color-tekst)] md:mt-4 md:text-[18.5px] md:leading-[1.65]">{p.tekst}</p>
      {/* on the book's right page the buttons stay in sight while a long text scrolls under them */}
      <div className="mt-6 grid grid-cols-2 gap-2.5 pb-6 md:sticky md:bottom-0 md:z-10 md:-mx-10 md:mt-3 md:flex md:flex-wrap md:bg-[#FFFDF8] md:px-10 md:pb-6 md:pt-4 md:shadow-[0_-18px_18px_-6px_#FFFDF8]">
        {harSide(p.id) && (
          <Link href={sideSti(p.id)} className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-glomma)] px-6 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-[var(--color-glomma-deep)]">
            Les mer<span className="sr-only"> om {p.navn.toLowerCase()}</span>
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        )}
        <Link href="/kontakt" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[var(--color-strek)] bg-white px-6 text-[15px] font-semibold text-[var(--color-glomma-deep)]">
          <CalendarDays className="size-4" aria-hidden="true" />
          Be om time
        </Link>
      </div>
    </>
  );
}

/** The phone's sheet with one treatment, slid up from the bottom. */
function Ark({ p, liste, onBytt, onLukk }: { p: Punkt | null; liste: Punkt[]; onBytt: (p: Punkt) => void; onLukk: () => void }) {
  const redusert = useReducedMotion() ?? false;
  const [inne, setInne] = useState(false);
  const [dra, setDra] = useState(0);
  const [drar, setDrar] = useState(false);
  const start = useRef<number | null>(null);
  const kropp = useRef<HTMLDivElement | null>(null);
  const lukkKnapp = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!p) return;
    document.documentElement.style.overflow = "hidden";
    const t = requestAnimationFrame(() => setInne(true));
    return () => {
      cancelAnimationFrame(t);
      document.documentElement.style.overflow = "";
      setInne(false);
    };
  }, [p]);

  useEffect(() => {
    kropp.current?.scrollTo(0, 0);
    lukkKnapp.current?.focus({ preventScroll: true });
  }, [p]);

  // Escape puts it away too
  useEffect(() => {
    if (!p) return;
    const tast = (e: globalThis.KeyboardEvent) => e.key === "Escape" && onLukk();
    window.addEventListener("keydown", tast);
    return () => window.removeEventListener("keydown", tast);
  }, [p, onLukk]);

  if (!p) return null;
  const i = liste.findIndex((x) => x.id === p.id);
  const neste = i >= 0 && i < liste.length - 1 ? liste[i + 1] : null;
  const ute = inne || redusert;

  return (
    <div className="fixed inset-0 z-[60] flex items-end" style={{ background: `rgba(10, 22, 28, ${ute ? 0.4 : 0})`, transition: "background 0.35s ease" }} onClick={onLukk}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ark-tittel"
        onClick={(e) => e.stopPropagation()}
        className="mx-auto flex max-h-[90svh] w-full max-w-[480px] flex-col rounded-t-[30px] bg-[var(--color-papir)] shadow-[0_-24px_50px_-20px_rgba(0,0,0,0.45)]"
        style={{ transform: ute ? `translateY(${dra}px)` : "translateY(100%)", transition: drar || redusert ? "none" : "transform 0.45s cubic-bezier(0.25, 1, 0.35, 1)" }}
      >
        {/* the handle: drag it down to put the sheet away */}
        <div
          className="flex shrink-0 touch-none justify-center pb-2 pt-3"
          onPointerDown={(e) => {
            start.current = e.clientY;
            setDrar(true);
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (start.current !== null) setDra(Math.max(0, e.clientY - start.current));
          }}
          onPointerUp={() => {
            const langt = dra > 110;
            start.current = null;
            setDrar(false);
            setDra(0);
            if (langt) onLukk();
          }}
        >
          <span className="h-1.5 w-11 rounded-full bg-[var(--color-strek)]" />
        </div>

        <div ref={kropp} className="relative overflow-y-auto overscroll-contain px-4 pb-[max(20px,env(safe-area-inset-bottom))]">
          <Vindu key={p.id} p={p} className="aspect-[400/320] w-full" opp={ute} />
          <Bokmerke gruppe={p.gruppe} className={s.liten} />
          <button ref={lukkKnapp} type="button" onClick={onLukk} aria-label="Lukk" className="absolute right-6 top-2 inline-flex size-10 items-center justify-center rounded-full bg-white/90 shadow-[0_0_0_1px_var(--color-strek)] backdrop-blur">
            <X className="size-4" aria-hidden="true" />
          </button>
          <div className="px-1">
            <Innhold p={p} tittelId="ark-tittel" />
            {neste && (
              <button type="button" onClick={() => onBytt(neste)} className="mb-2 flex w-full items-center justify-between rounded-[18px] bg-white px-4 py-3.5 text-left shadow-[0_0_0_1px_var(--color-strek)]">
                <span>
                  <span className="block text-[13.5px] font-medium text-[var(--color-tekst-svak)]">Neste</span>
                  <span className="block text-[16px] font-semibold text-[var(--color-glomma-deep)]">{neste.navn}</span>
                </span>
                <ArrowRight className="size-5 text-[var(--color-glomma)]" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
