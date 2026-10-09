"use client";

import Link from "next/link";
import { useActionState, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Merke, Vis } from "@/components/artikler/deler";
import pen from "@/components/artikler/artikler.module.css";
import { Frimerke } from "@/components/forside/kontakt/deler";
import { Smuler } from "@/components/Smuler";
import { klinikk } from "@/data/klinikk";
import { cn } from "@/lib/utils";
import { Apningslapp } from "./Apningslapp";
import { sendMelding, type MeldingState } from "./melding";
import { Postkort } from "./Postkort";
import { MAX, PAKREVD, type Felt, type Verdier } from "./sjekk";
import { AKUTT, SVAR, VEIEN } from "./tekst";
import s from "./brevveksling.module.css";

/**
 * The Kontakt page, «Brevvekslingen». It opens with the one thing most
 * people need, the phone number, and a yellow note that says whether the
 * clinic is open now. Then your letter to the clinic is the form: dated today,
 * «Kjære Kongsvinger Tannhelse», and signed with your name as you type it.
 * Beside it lies the envelope, already addressed to Fjellgata 4 and stamped,
 * with the opening hours as the postmark, and a card for toothache. Send the
 * letter, and the envelope turns over and opens, the letter folds into it, the
 * flap closes, the envelope turns back, a postmark says MOTTATT, and a reply
 * from the clinic lies where your letter was. Below, a postcard of the town
 * with the way from the station drawn on it in pen.
 */

const { adresse, apningstider: tid, telefon } = klinikk;
const TOM: Verdier = { navn: "", telefon: "", epost: "", melding: "" };
const PAPIR =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")";

type Fase = "hvile" | "snu" | "inn" | "lukk" | "frem" | "stemplet";

/** The fields in the order they stand on the letter: the message first, the name (the signature) last. */
const REKKEFOLGE: readonly Felt[] = ["melding", "telefon", "epost", "navn"];

const ingenting = () => () => {};
const idag = () => new Intl.DateTimeFormat("nb-NO", { timeZone: "Europe/Oslo", day: "numeric", month: "long", year: "numeric" }).format(new Date());

/** Today, written as on a letter. Only the town on the server, the date added in the browser. */
function Dato() {
  const d = useSyncExternalStore(ingenting, idag, () => "");
  return <span>{d ? `${adresse.sted}, ${d}` : adresse.sted}</span>;
}

/** The rim of the postmark: a circle of radius 41, its length in map units, which the rim text is spread to fill. */
const RAND = 2 * Math.PI * 41;

/** A round postmark: the clinic round the rim, two lines in the middle. */
function Stempel({ midt, under, className }: { midt: string; under: string; className?: string }) {
  const id = `stempel-${useId().replace(/:/g, "")}`;
  const blekk = "rgba(34,64,77,0.7)";
  return (
    <svg viewBox="-60 -60 120 120" className={className} aria-hidden="true">
      <path id={id} d="M-41,0 a41,41 0 1,1 82,0 a41,41 0 1,1 -82,0" fill="none" />
      <circle r={52} fill="none" stroke={blekk} strokeWidth={2} />
      <circle r={32} fill="none" stroke={blekk} strokeWidth={1.4} />
      {/* small enough to go round with room to spare, then spread to close the ring */}
      <text fontSize={8.6} fontWeight={600} letterSpacing={1.2} fill={blekk}>
        <textPath href={`#${id}`} textLength={RAND - 1} lengthAdjust="spacing">{`${klinikk.navn.toUpperCase()} · ${adresse.gate.toUpperCase()} · `}</textPath>
      </text>
      <text y={-3} textAnchor="middle" fontSize={midt.length > 7 ? 10 : 11.5} fontWeight={700} letterSpacing={0.8} fill={blekk}>
        {midt}
      </text>
      <text y={12} textAnchor="middle" fontSize={10.5} fontWeight={700} fill={blekk}>
        {under}
      </text>
    </svg>
  );
}

/** The envelope: its front with the address, its back with the flap that opens for the letter. */
function Konvolutt({ fase, innRef }: { fase: Fase; innRef: React.RefObject<HTMLDivElement | null> }) {
  const bak = fase === "snu" || fase === "inn" || fase === "lukk";
  const apen = fase === "snu" || fase === "inn";
  return (
    <div className="relative aspect-[3/2] w-full" style={{ perspective: "1600px" }}>
      <div className={s.konvolutt} data-bak={bak ? "ja" : "nei"}>
        {/* the front */}
        <div className={cn(s.side, "absolute inset-0 bg-[#F3ECDC] p-[5%] shadow-[0_26px_44px_-26px_rgba(10,25,32,0.6)]")} style={{ backgroundImage: PAPIR }}>
          <div className="flex h-full flex-col">
            <div className="flex items-start justify-between">
              <p className="text-[14px] font-medium leading-snug text-[var(--color-tekst-svak)] max-sm:text-[12.5px]">
                Fra: deg
              </p>
              <div className="relative origin-top-right max-sm:scale-[0.72] md:max-lg:scale-[0.72] lg:max-xl:scale-[0.84]">
                <Frimerke />
                <Stempel
                  midt={fase === "stemplet" ? "MOTTATT" : "MAN–FRE"}
                  under={fase === "stemplet" ? "TAKK!" : `${tid.fra}–${tid.til}`}
                  className={cn("absolute -left-[78px] top-[34px] size-[96px]", fase === "stemplet" && s.stemple)}
                  key={fase === "stemplet" ? "mottatt" : "tider"}
                />
              </div>
            </div>
            <address className="mx-auto mt-auto w-[78%] not-italic">
              {[klinikk.navn, adresse.gate, `${adresse.postnummer} ${adresse.sted}`].map((l, i) => (
                <span key={l} className={cn("block border-b border-[rgba(23,34,40,0.25)] py-1 text-[var(--color-glomma-deep)]", i === 0 ? "text-[17px] font-semibold" : "text-[16px] font-medium")}>
                  {l}
                </span>
              ))}
            </address>
          </div>
        </div>
        {/* the back, with the flap */}
        <div className={cn(s.side, s.baksiden, "absolute inset-0 overflow-visible")}>
          <div ref={innRef} className="absolute inset-0 bg-[#D8CCB2]" />
          <div className={s.klaff} data-apen={apen ? "ja" : "nei"}>
            <div className="absolute inset-0 [clip-path:polygon(0_0,100%_0,50%_100%)]" style={{ background: `${PAPIR}, linear-gradient(180deg,#EDE5D1,#E6DBC4)` }} />
          </div>
          <div className="absolute inset-0 [clip-path:polygon(0_0,52%_56%,0_100%)]" style={{ background: `${PAPIR}, #F0E8D6` }} />
          <div className="absolute inset-0 [clip-path:polygon(100%_0,48%_56%,100%_100%)]" style={{ background: `${PAPIR}, #ECE3CF` }} />
          <div className="absolute inset-0 [clip-path:polygon(0_100%,50%_42%,100%_100%)]" style={{ background: `${PAPIR}, #F4EDDE` }} />
        </div>
      </div>
    </div>
  );
}

/** A pen line under the phone number, drawn once the top of the page is seen. */
function Understrek() {
  return (
    <svg viewBox="0 0 260 12" preserveAspectRatio="none" className="pointer-events-none absolute -bottom-[0.16em] left-[-1%] h-[0.2em] w-[102%] overflow-visible" aria-hidden="true">
      <path
        d="M3,8.5 C38,5.2 74,9.6 118,7.4 S206,4.4 257,6.6"
        fill="none"
        stroke="var(--color-teal)"
        strokeWidth={3.2}
        strokeLinecap="round"
        pathLength={1}
        className={pen.strek}
        style={{ "--forsink": "0.5s", transitionDuration: "0.9s" } as React.CSSProperties}
      />
    </svg>
  );
}

/** The clinic's reply, on its own letterhead, where your letter was. Its heading takes the focus. */
function Svarbrev({ navn, hoyde, tittelRef }: { navn: string; hoyde: number | null; tittelRef: React.RefObject<HTMLHeadingElement | null> }) {
  return (
    <article
      className={cn(s.svar, "relative flex flex-col bg-[#FFFDF8] px-6 pb-7 pt-7 shadow-[0_34px_70px_-36px_rgba(10,25,32,0.55),0_1px_0_rgba(10,25,32,0.05)] sm:px-12 sm:pb-9 sm:pt-10")}
      // as tall as the letter it replaces, so nothing on the page moves
      style={{ backgroundImage: PAPIR, minHeight: hoyde ?? undefined }}
    >
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <Merke className="size-11 shadow-[0_4px_12px_-6px_rgba(10,25,32,0.45)] ring-1 ring-[var(--color-strek)]" />
          <p className="text-[14px] leading-snug">
            <span className="block font-semibold text-[var(--color-glomma-deep)]">{klinikk.navn}</span>
            <span className="text-[var(--color-tekst-2)]">{klinikk.undertittel}</span>
          </p>
        </div>
        <p className="text-[14px] text-[var(--color-tekst-2)] sm:pt-1">
          <Dato />
        </p>
      </header>

      <h2 ref={tittelRef} tabIndex={-1} className="mt-10 scroll-mt-[180px] text-[28px] font-semibold tracking-[-0.03em] text-[var(--color-glomma-deep)] outline-none [overflow-wrap:anywhere] sm:text-[32px]">
        Takk, {navn}.
      </h2>
      <p className="mt-4 max-w-[46ch] text-[18px] leading-[1.6] text-[var(--color-tekst)]">{SVAR.tekst}</p>
      <p className="mt-3 text-[18px] leading-[1.6] text-[var(--color-tekst)]">
        {SVAR.haster}{" "}
        <a href={telefon.lenke} className="whitespace-nowrap font-semibold text-[var(--color-glomma-deep)] underline underline-offset-4">
          {telefon.visning}
        </a>
        .
      </p>
      <p className="mt-10 text-[13px] font-medium text-[var(--color-tekst-2)]">Hilsen</p>
      <p className="mt-1 text-[26px] font-semibold italic tracking-[-0.01em] text-[var(--color-glomma-deep)] sm:text-[28px]">{SVAR.fra}</p>

      {/* the foot of the letterhead */}
      <footer className="mt-auto pt-12">
        <p className="border-t border-[rgba(23,34,40,0.14)] pt-4 text-[13px] leading-relaxed text-[var(--color-tekst-2)]">
          {adresse.gate}, {adresse.postnummer} {adresse.sted} · <span className="[overflow-wrap:anywhere]">{klinikk.epost}</span>
        </p>
      </footer>
    </article>
  );
}

export function KontaktSide() {
  const ref = useRef<HTMLDivElement | null>(null);
  const vist = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const redusert = useReducedMotion() ?? false;
  const [state, action, pending] = useActionState<MeldingState, FormData>(sendMelding, { status: "idle" });
  const [v, setV] = useState(TOM);
  const [fase, setFase] = useState<Fase>("hvile");
  const [hoyde, setHoyde] = useState<number | null>(null);
  const [svart, setSvart] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const brev = useRef<HTMLDivElement>(null);
  const inni = useRef<HTMLDivElement>(null);
  const svarTittel = useRef<HTMLHeadingElement>(null);
  const id = useId();
  const feil = state.status === "invalid" ? state.errors : {};
  const sendt = state.status === "sent";

  useEffect(() => {
    if (state.status === "invalid") {
      const forste = REKKEFOLGE.find((f) => state.errors[f]);
      if (forste) form.current?.querySelector<HTMLElement>(`[name="${forste}"]`)?.focus();
    }
  }, [state]);

  // the letter goes into the envelope, step by step; the reply keeps its height, so the page doesn't jump
  useEffect(() => {
    if (!sendt) return;
    const t: number[] = [];
    const mal = () => setHoyde(brev.current?.offsetHeight ?? null);
    if (redusert) {
      t.push(
        window.setTimeout(() => {
          mal();
          setFase("stemplet");
          setSvart(true);
        }, 0)
      );
      return () => t.forEach((x) => window.clearTimeout(x));
    }
    t.push(
      window.setTimeout(() => {
        mal();
        setFase("snu");
      }, 0),
      window.setTimeout(() => {
        setFase("inn");
        const a = brev.current?.getBoundingClientRect();
        const b = inni.current?.getBoundingClientRect();
        if (a && b && brev.current) {
          const dx = b.left + b.width / 2 - (a.left + a.width / 2);
          const dy = b.top + b.height * 0.55 - (a.top + a.height / 2);
          const sx = (b.width * 0.8) / a.width;
          brev.current.animate(
            [
              { transform: "none", opacity: 1 },
              { transform: `scale(${sx * 1.3}, ${sx * 0.55})`, opacity: 1, offset: 0.35 },
              { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sx * 0.3})`, opacity: 1, offset: 0.85 },
              { transform: `translate(${dx}px, ${dy + 30}px) scale(${sx}, ${sx * 0.3})`, opacity: 0 },
            ],
            { duration: 1300, easing: "cubic-bezier(0.5, 0, 0.3, 1)", fill: "forwards" }
          );
        }
      }, 700),
      window.setTimeout(() => setFase("lukk"), 2100),
      window.setTimeout(() => setFase("frem"), 2700),
      window.setTimeout(() => setFase("stemplet"), 3400),
      // the reply comes once the postmark has landed
      window.setTimeout(() => setSvart(true), 4400)
    );
    return () => t.forEach((x) => window.clearTimeout(x));
  }, [sendt, redusert]);

  // the reply has come: take the reader to it
  useEffect(() => {
    if (svart) svarTittel.current?.focus();
  }, [svart]);

  const felt = (f: Felt) => ({
    name: f,
    id: `${id}${f}`,
    required: PAKREVD[f],
    maxLength: MAX[f],
    value: v[f],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setV((x) => ({ ...x, [f]: e.target.value })),
    "aria-invalid": feil[f] ? true : undefined,
    "aria-describedby": feil[f] ? `${id}${f}-feil` : undefined,
  });
  const melding = (f: Felt) =>
    feil[f] ? (
      <p id={`${id}${f}-feil`} className="mt-1 text-[13.5px] text-[#B4462F]">
        {feil[f]}
      </p>
    ) : null;
  const LINJE = "mt-0.5 block w-full border-0 border-b border-[rgba(23,34,40,0.3)] bg-transparent px-0 py-1.5 text-[17px] text-[var(--color-tekst)] outline-none transition-colors focus:border-[var(--color-glomma)] aria-[invalid=true]:border-[#B4462F]";
  const ETIKETT = "block text-[13px] font-medium text-[var(--color-tekst-2)]";

  return (
    <main className="overflow-x-clip bg-[var(--color-papir)]">
      <header className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)] pt-[clamp(104px,12vw,150px)]">
        <Smuler side="Kontakt" />
        <h1 className="mt-6 font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(42px, 6vw, 80px)", lineHeight: 0.95, letterSpacing: "-0.055em" }}>
          Kontakt tannlegen
        </h1>

        {/* call, or write: the number first, and a note saying whether anyone is there now */}
        <Vis className="mt-6 flex flex-col items-start gap-x-14 gap-y-7 sm:mt-8 sm:flex-row sm:items-center">
          <p className="text-[clamp(20px,2.2vw,26px)] leading-[1.4] text-[var(--color-tekst-2)]">
            <span className="block text-[clamp(36px,4.8vw,62px)] font-medium leading-[1.12] tracking-[-0.035em] text-[var(--color-glomma-deep)]">
              Ring{" "}
              <a href={telefon.lenke} className="relative inline-block whitespace-nowrap font-bold transition-colors hover:text-[var(--color-glomma)]">
                {telefon.visning}
                <Understrek />
              </a>
              ,
            </span>{" "}
            <span className="mt-2 block">
              {tid.dager.toLowerCase()} {tid.fra}–{tid.til}.
            </span>{" "}
            <span className="block">Eller skriv et brev her.</span>
          </p>
          <Apningslapp className="rotate-[2.2deg] max-sm:ml-1" />
        </Vis>
      </header>

      {/* Wide: the letter on the left with the way here in words under it; the envelope, the
          toothache card and the postcard down the right. The last row is the flexible one, so
          the postcard's height goes there and the words stay close under the letter.
          Tablets: the letter across, then envelope and card, then the words and the postcard.
          Phones: one after another. */}
      <div
        ref={ref}
        data-vis={vist ? "ja" : "nei"}
        className="mx-auto mt-12 grid w-full max-w-[var(--container-max)] gap-12 px-[var(--container-px)] pb-[clamp(104px,11vw,150px)] md:mt-16 md:grid-cols-2 md:gap-x-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:grid-rows-[auto_auto_auto_1fr] lg:gap-x-14 lg:gap-y-10"
      >
        {/* your letter, and in its place once it is sent, the clinic's reply */}
        <div className="relative md:col-[1/-1] lg:col-[1] lg:row-[1/span_3]">
          {!svart && (
            <div key="brev" ref={brev} className={cn(s.brev, "relative origin-center bg-[#FDFAF2] px-6 pb-9 pt-8 shadow-[0_34px_70px_-36px_rgba(10,25,32,0.55),0_1px_0_rgba(10,25,32,0.05)] sm:px-12 sm:pt-11")} style={{ backgroundImage: `${PAPIR}, repeating-linear-gradient(90deg, rgba(120,100,60,0.035) 0 1px, transparent 1px 7px)` }}>
              <p className="text-right text-[14px] text-[var(--color-tekst-2)]">
                <Dato />
              </p>
              <h2 className="mt-6 text-[26px] font-semibold tracking-[-0.03em] text-[var(--color-glomma-deep)] sm:text-[30px]">Kjære Kongsvinger Tannhelse,</h2>

              <form ref={form} action={action} noValidate className="mt-6">
                <label htmlFor={`${id}melding`} className="sr-only">
                  Melding
                </label>
                <textarea
                  rows={6}
                  placeholder="Skriv hva det gjelder …"
                  className="block w-full resize-y border-0 bg-[linear-gradient(transparent_33px,rgba(23,34,40,0.2)_33px,rgba(23,34,40,0.2)_34px)] bg-[length:100%_34px] bg-local p-0 text-[17px] leading-[34px] text-[var(--color-tekst)] outline-none placeholder:text-[var(--color-tekst-svak)] aria-[invalid=true]:bg-[linear-gradient(transparent_33px,rgba(180,70,47,0.5)_33px,rgba(180,70,47,0.5)_34px)]"
                  {...felt("melding")}
                  aria-describedby={[feil.melding ? `${id}melding-feil` : "", `${id}merk`].filter(Boolean).join(" ")}
                />
                {melding("melding")}
                <p id={`${id}merk`} className="mt-1.5 text-[12.5px] text-[var(--color-tekst-svak)]">
                  Ikke skriv personnummer eller helseopplysninger her.{" "}
                  <Link href="/personvern" className="underline decoration-1 underline-offset-2 hover:text-[var(--color-tekst)]">
                    Slik behandler vi opplysningene dine
                  </Link>
                  .
                </p>

                <div className="mt-7 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${id}telefon`} className={ETIKETT}>
                      Du når meg på telefon
                    </label>
                    <input type="tel" autoComplete="tel" className={LINJE} {...felt("telefon")} />
                    {melding("telefon")}
                  </div>
                  <div>
                    <label htmlFor={`${id}epost`} className={ETIKETT}>
                      eller på e-post
                    </label>
                    <input type="email" autoComplete="email" className={LINJE} {...felt("epost")} />
                    {melding("epost")}
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
                  <div className="min-w-[220px] flex-1">
                    <label htmlFor={`${id}navn`} className={ETIKETT}>
                      Hilsen
                    </label>
                    <input autoComplete="name" placeholder="Navnet ditt" className={cn(LINJE, "text-[22px] font-semibold italic tracking-[-0.01em] text-[var(--color-glomma-deep)] placeholder:font-normal placeholder:not-italic placeholder:text-[16px] placeholder:text-[var(--color-tekst-svak)]")} {...felt("navn")} />
                    {melding("navn")}
                  </div>
                  <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label>
                      Nettsted
                      <input name="nettsted" tabIndex={-1} autoComplete="off" defaultValue="" />
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={pending || sendt}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--color-glomma)] px-6 py-3.5 text-[15px] font-semibold text-[var(--color-papir)] shadow-[0_12px_30px_-14px_rgba(22,48,59,0.7)] transition-colors hover:bg-[var(--color-glomma-deep)] disabled:cursor-wait disabled:opacity-70"
                  >
                    {pending ? "Sender …" : "Send brevet"}
                  </button>
                </div>
                {state.status === "error" && (
                  <p role="alert" className="mt-4 text-[15px] text-[var(--color-tekst)]">
                    Brevet kom ikke fram. Ring oss på{" "}
                    <a href={telefon.lenke} className="whitespace-nowrap font-semibold underline underline-offset-4">
                      {telefon.visning}
                    </a>
                    .
                  </p>
                )}
              </form>
            </div>
          )}
          {/* in the page from the start, so a screen reader reads the reply out when it comes */}
          <div role="status">{svart && <Svarbrev navn={v.navn.trim()} hoyde={hoyde} tittelRef={svarTittel} />}</div>
        </div>

        {/* the envelope, above the letter so the letter goes into it */}
        <div className={cn(s.inn, "relative z-10 md:col-[1] md:row-[2] lg:col-[2] lg:row-[1]")}>
          <Konvolutt fase={fase} innRef={inni} />
          {/* without JavaScript nothing would lay the envelope down, or draw the pen lines */}
          <noscript>
            <style>{`.${s.inn}{opacity:1;transform:none}.${pen.strek}{stroke-dashoffset:0!important}.${pen.blekk}{opacity:1!important}`}</style>
          </noscript>
        </div>

        {/* a card for toothache: there from the first paint, never faded in */}
        <aside aria-labelledby="akutt-tittel" className="relative self-start bg-[#FFFDF8] p-6 shadow-[0_22px_40px_-26px_rgba(10,25,32,0.55)] rotate-[-1.5deg] max-md:-mt-2 md:col-[2] md:row-[2] lg:row-[2]" style={{ backgroundImage: PAPIR }}>
          <h2 id="akutt-tittel" className="text-[19px] font-bold text-[#A3301F]">
            {AKUTT.tittel}
          </h2>
          <p className="mt-1.5 text-[15.5px] leading-[1.55] text-[var(--color-tekst)]">{AKUTT.tekst}</p>
          <a href={telefon.lenke} className="mt-3 inline-block text-[26px] font-bold leading-none tracking-[-0.02em] text-[var(--color-glomma-deep)] underline-offset-4 hover:underline">
            {telefon.visning}
          </a>
          <p className="mt-3 text-[14px] text-[var(--color-tekst-2)]">
            Utenom åpningstiden:{" "}
            <a href="tel:116117" className="font-semibold underline underline-offset-2">
              legevakten 116 117
            </a>
          </p>
          <p className="mt-5 border-t border-dashed border-[rgba(23,34,40,0.25)] pt-4 text-[15px] text-[var(--color-tekst-2)]">
            Heller e-post?{" "}
            <a href={`mailto:${klinikk.epost}`} className="font-medium text-[var(--color-glomma-deep)] underline underline-offset-2 [overflow-wrap:anywhere] max-sm:block">
              {klinikk.epost}
            </a>
          </p>
        </aside>

        {/* the way here: in words, and drawn in pen on a postcard */}
        <div className="max-w-[46ch] self-start max-md:mt-8 md:col-[1] md:row-[3] md:mt-6 lg:row-[4]">
          <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-[var(--color-glomma-deep)] sm:text-[30px]">{VEIEN.tittel}</h2>
          <p className="mt-4 text-[18px] leading-[1.6] text-[var(--color-tekst-2)]">{VEIEN.tekst}</p>
        </div>
        <Postkort className="w-full max-w-[480px] self-start max-md:-mt-3 md:col-[2] md:row-[3] md:mt-4 lg:row-[3/span_2]" />
      </div>
    </main>
  );
}
