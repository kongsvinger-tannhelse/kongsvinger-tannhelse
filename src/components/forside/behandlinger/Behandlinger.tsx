"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, animate, m, useInView, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ALLE, GRUPPER, UTVALGTE, UTVALGTE_REKKE } from "./grupper";
import { FOLD_MS, Kasse } from "./popup/Popup";
import { FARGE } from "./popup/tegning";
import { SCENER } from "./scener";
import s from "./behandlinger.module.css";

/**
 * «Dreiescenen». A revolving stage under a spotlight: the three groups of
 * treatments stand on the three sides of one turning column, on a square
 * stage floor, each side showing a paper pop-up of the chosen treatment.
 * Choosing a group folds the front scene flat, the column turns a third
 * of the way round, and the next scene stands up in the light. Choosing a
 * treatment in the same group folds the scene and stands up the new one
 * in its place. The sides turning away fall into shadow, and the marks
 * along the front of the floor slide by as it turns. The floor lies behind
 * the column, so it never covers any of the drawing.
 *
 * On the front page each side carries one treatment (one from each group)
 * and a button leads on to /behandlinger, where the same stage carries all
 * of them (`alle`).
 */

const SNU_MS = 1150;

type Fase = "stille" | "fold" | "snur";
/** What is chosen: the group in front, and the chosen treatment in each group. */
type Valg = { g: number; i: readonly number[] };

export function Behandlinger({ alle = false }: { alle?: boolean }) {
  const grupper = alle ? GRUPPER : UTVALGTE;
  const rekke = alle ? ALLE : UTVALGTE_REKKE;
  const redusert = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement | null>(null);
  const vist = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const synlig = useInView(ref);

  // what the visitor has chosen, at once, and what the stage shows, catching up
  const [valg, setValg] = useState<Valg>({ g: 0, i: [0, 0, 0] });
  const [scene, setScene] = useState<Valg>({ g: 0, i: [0, 0, 0] });
  const [fase, setFase] = useState<Fase>("stille");
  const vinkel = useMotionValue(0);
  const mål = useRef(0);
  const timere = useRef<number[]>([]);
  useEffect(() => () => timere.current.forEach((t) => window.clearTimeout(t)), []);

  // one step at a time towards what was chosen: turn to the group, or swap the scene
  useEffect(() => {
    if (fase !== "stille") return;
    const nyGruppe = valg.g !== scene.g;
    const nyScene = valg.i[valg.g] !== scene.i[valg.g];
    if (!nyGruppe && !nyScene) return;
    const vent = (ms: number, f: () => void) => timere.current.push(window.setTimeout(f, ms));
    if (nyGruppe) {
      const d = (valg.g - scene.g + 3) % 3;
      mål.current += d === 1 ? -120 : 120;
    }
    if (redusert) {
      vinkel.set(mål.current);
      vent(0, () => setScene(valg));
      return;
    }
    vent(0, () => setFase("fold"));
    if (nyGruppe) {
      vent(FOLD_MS, () => {
        // the side coming round already carries the chosen scene, folded flat
        setScene((v) => ({ g: v.g, i: valg.i }));
        setFase("snur");
        animate(vinkel, mål.current, { duration: SNU_MS / 1000, ease: [0.65, 0, 0.3, 1] });
      });
      vent(FOLD_MS + SNU_MS, () => {
        setScene(valg);
        setFase("stille");
      });
    } else {
      vent(FOLD_MS, () => {
        setScene(valg);
        setFase("stille");
      });
    }
  }, [valg, scene, fase, redusert, vinkel]);

  const velgGruppe = (g: number) => setValg((v) => ({ g, i: v.i }));
  const velg = (g: number, i: number) => setValg((v) => ({ g, i: v.i.map((x, k) => (k === g ? i : x)) }));
  const nå = rekke.findIndex((a) => a.g === valg.g && a.i === valg.i[valg.g]);
  const steg = (d: number) => {
    const a = rekke[(nå + d + rekke.length) % rekke.length];
    velg(a.g, a.i);
  };

  const gruppe = grupper[valg.g];
  const Tittel = alle ? "h1" : "h2";
  // the treatment's name sits one level under the section's title
  const Navn = alle ? "h2" : "h3";
  const b = gruppe.liste[valg.i[valg.g]];

  return (
    <section id="behandlinger" aria-labelledby="behandlinger-tittel" className={cn("bg-[var(--color-papir)] py-[clamp(88px,11vw,152px)]", alle && "pt-[clamp(128px,14vw,184px)]")}>
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)]">
        <Tittel id="behandlinger-tittel" className="font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 0.95, letterSpacing: "-0.05em" }}>
          Behandlinger
        </Tittel>
        <p className="mt-4 max-w-[46ch] text-[17px] leading-[1.55] text-[var(--color-tekst-2)]">
          {alle
            ? `Alle de ${ALLE.length} behandlingene våre, i tre grupper på én scene. Velg en gruppe, så dreier scenen.`
            : "Tre av behandlingene våre på én scene. Velg en, så dreier scenen."}
        </p>

        <div
          ref={ref}
          className="relative mt-12 overflow-hidden rounded-[28px] md:mt-16"
          style={{ background: "radial-gradient(70% 60% at 34% 8%, #34596A 0%, #1C3743 45%, #12262E 100%)" }}
        >
          {/* the spotlight from above */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-full w-[120%] -translate-x-1/2 md:left-[30%] md:w-[70%]"
            style={{ background: "linear-gradient(to bottom, rgba(255,241,201,0.16), rgba(255,241,201,0.03) 70%, transparent)", clipPath: "polygon(42% 0, 58% 0, 86% 100%, 14% 100%)" }}
          />

          <div className="relative grid gap-9 px-4 pb-10 pt-10 sm:px-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center md:gap-8 md:px-12 md:py-12">
            {/* the stage */}
            <div aria-hidden="true" className={cn(s.scene, "relative flex min-w-0 flex-col items-center")}>
              <div className="relative z-10" style={{ perspective: 1500, width: "var(--b)", aspectRatio: "400 / 480" }}>
                <m.div className="absolute inset-0" style={{ rotateY: vinkel, transformStyle: "preserve-3d" }}>
                  {grupper.map((g, gi) => {
                    const t = g.liste[scene.i[gi]];
                    return (
                      <Side key={g.id} gi={gi} vinkel={vinkel}>
                        <Scene
                          key={t.id}
                          id={t.id}
                          oppe={vist && gi === scene.g && fase === "stille"}
                          spiller={synlig && gi === scene.g && fase === "stille"}
                          redusert={redusert}
                        />
                      </Side>
                    );
                  })}
                </m.div>
              </div>
              {/* the stage floor it turns on */}
              <Gulv vinkel={vinkel} />
            </div>

            {/* what stands in the light */}
            <div className="flex min-w-0 flex-col items-center text-center text-[var(--color-tekst-lys)] md:items-start md:text-left">
              <div role="group" aria-label={alle ? "Velg gruppe" : "Velg behandling"} className="inline-flex max-w-full rounded-full bg-black/20 p-1 ring-1 ring-[var(--color-strek-lys)]">
                {grupper.map((g, gi) => (
                  <button
                    key={g.id}
                    type="button"
                    aria-pressed={valg.g === gi}
                    onClick={() => velgGruppe(gi)}
                    className={cn(
                      s.knapp,
                      "rounded-full py-2 font-semibold transition-colors duration-300 sm:px-5 sm:text-[14px]",
                      alle ? "px-3.5 text-[14px]" : "px-3 text-[13px]",
                      valg.g === gi ? "bg-[var(--color-papir)] text-[var(--color-glomma-deep)]" : "text-[var(--color-tekst-lys)] hover:bg-white/10"
                    )}
                  >
                    {alle ? g.kort : g.liste[0].navn}
                    {alle && <span className={cn("ml-1.5 tabular-nums", valg.g === gi ? "text-[var(--color-tekst-2)]" : "text-[var(--color-tekst-lys-2)]")}>{g.liste.length}</span>}
                  </button>
                ))}
              </div>

              {alle && (
              <ul aria-label={gruppe.tittel} className="mt-6 flex w-full flex-wrap content-start justify-center gap-1.5 md:order-3 md:min-h-[9.5rem] md:justify-start">
                {gruppe.liste.map((t, i) => {
                  const på = valg.i[valg.g] === i;
                  return (
                    <li key={t.id}>
                      <button
                        type="button"
                        aria-pressed={på}
                        onClick={() => velg(valg.g, i)}
                        className={cn(
                          s.knapp,
                          "rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors duration-300",
                          på ? "bg-[var(--color-bjork)] text-[var(--color-glomma-deep)]" : "text-[var(--color-tekst-lys-2)] ring-1 ring-[var(--color-strek-lys)] hover:bg-white/10 hover:text-[var(--color-tekst-lys)]"
                        )}
                      >
                        {t.navn}
                      </button>
                    </li>
                  );
                })}
              </ul>
              )}

              <div aria-live="polite" className="mt-8 w-full md:order-2 md:mt-8 md:min-h-[12.5em]">
                <AnimatePresence mode="wait" initial={false}>
                  <m.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: redusert ? 0 : 0.3 }}>
                    <p className="text-[13px] font-semibold text-[var(--color-bjork)]">{gruppe.tittel}</p>
                    <Navn className="mt-2 font-bold" style={{ fontSize: "clamp(32px, 3.4vw, 48px)", lineHeight: 1, letterSpacing: "-0.045em" }}>
                      {b.navn}
                    </Navn>
                    <p className="mx-auto mt-5 max-w-[40ch] text-[16px] leading-[1.6] text-[var(--color-tekst-lys-2)] md:mx-0">{b.tekst}</p>
                  </m.div>
                </AnimatePresence>
              </div>

              {alle ? (
                <div className="mt-7 flex items-center justify-center gap-2 md:order-4 md:justify-start">
                  <button type="button" aria-label="Forrige behandling" onClick={() => steg(-1)} className={cn(s.knapp, "inline-flex size-10 items-center justify-center rounded-full text-[var(--color-tekst-lys)] ring-1 ring-[var(--color-strek-lys)] transition-colors hover:bg-white/10")}>
                    <ArrowLeft className="size-4" aria-hidden="true" />
                  </button>
                  <button type="button" aria-label="Neste behandling" onClick={() => steg(1)} className={cn(s.knapp, "inline-flex size-10 items-center justify-center rounded-full text-[var(--color-tekst-lys)] ring-1 ring-[var(--color-strek-lys)] transition-colors hover:bg-white/10")}>
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                  <p className="ml-2 text-[13px] font-semibold tabular-nums text-[var(--color-tekst-lys-2)]">
                    {nå + 1} / {rekke.length}
                  </p>
                </div>
              ) : (
                <Link
                  href="/behandlinger"
                  className={cn(
                    s.knapp,
                    "group mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--color-papir)] px-6 py-3.5 text-[14px] font-semibold text-[var(--color-glomma-deep)] transition-colors duration-300 hover:bg-white md:order-4"
                  )}
                >
                  Se alle {ALLE.length} behandlingene
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** One treatment's pop-up, by its id. */
function Scene({ id, ...props }: { id: string; oppe: boolean; spiller: boolean; redusert: boolean }) {
  const S = SCENER[id];
  return S ? <S {...props} /> : null;
}

/** One side of the turning column: a paper page, in light or turning into shadow. */
function Side({ gi, vinkel, children }: { gi: number; vinkel: MotionValue<number>; children: ReactNode }) {
  // how far this side has turned from the front, -180 to 180
  const skygge = useTransform(vinkel, (v) => {
    const a = ((((gi * 120 + v) % 360) + 540) % 360) - 180;
    return Math.min(1, Math.abs(a) / 110) * 0.7;
  });
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-[6px]"
      style={{
        background: FARGE.papir,
        transform: `rotateY(${gi * 120}deg) translateZ(calc(var(--b) * 0.2887))`,
        backfaceVisibility: "hidden",
        boxShadow: "inset 0 0 0 1px rgba(22,48,59,0.12)",
      }}
    >
      <Kasse>{children}</Kasse>
      <m.div className="pointer-events-none absolute inset-0 bg-[#0B1A20]" style={{ opacity: skygge }} />
    </div>
  );
}

/**
 * The square stage floor, seen a little from above: the top in the
 * spotlight with its boards running away from you, and along the front edge
 * a row of marks that slide by while the column turns.
 */
function Gulv({ vinkel }: { vinkel: MotionValue<number> }) {
  const forskyv = useTransform(vinkel, (v) => (((v * 0.12) % 10) + 10) % 10 - 10);
  const id = useId().replace(/:/g, "");
  return (
    <div className="relative -mt-[calc(var(--b)*0.08)] w-[min(calc(var(--b)*1.4),100%)]">
      <div className="absolute inset-x-[4%] -bottom-[8%] h-[40%] rounded-[50%] bg-[#081419]/60 blur-[10px]" />
      <svg viewBox="0 0 140 26" preserveAspectRatio="none" className="relative block aspect-[140/26] w-full">
        <defs>
          <linearGradient id={`topp-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2A4A58" />
            <stop offset="1" stopColor="#30535F" />
          </linearGradient>
          <clipPath id={`front-${id}`}>
            <rect x={0} y={16} width={140} height={7} />
          </clipPath>
        </defs>
        <path d="M12,0 L128,0 L140,16 L0,16 Z" fill={`url(#topp-${id})`} />
        <ellipse cx={70} cy={7} rx={46} ry={6} fill="#FFF1C9" opacity={0.12} />
        <path d={Array.from({ length: 9 }, (_, k) => `M${12 + k * 14.5},0 L${k * 17.5},16`).join(" ")} stroke="#1C3540" strokeWidth={0.4} />
        <rect x={0} y={16} width={140} height={7} fill="#132A33" />
        <g clipPath={`url(#front-${id})`}>
          <m.g style={{ x: forskyv }}>
            {Array.from({ length: 17 }, (_, k) => (
              <line key={k} x1={k * 10} y1={17.5} x2={k * 10} y2={k % 2 ? 19.5 : 21} stroke={FARGE.bjork} strokeWidth={0.5} opacity={0.7} />
            ))}
          </m.g>
        </g>
        <path d="M0,16 L140,16" stroke={FARGE.bjork} strokeWidth={0.5} opacity={0.45} />
      </svg>
    </div>
  );
}
