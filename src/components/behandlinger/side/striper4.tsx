import type { CSSProperties } from "react";
import { r2 } from "@/components/forside/behandlinger/popup/tegning";
import type { Rute } from "@/data/behandlinger/typer";
import { cn } from "@/lib/utils";
import { Tekst } from "./striper2";
import { BTEGNINGER } from "./tegninger";
import s from "./side.module.css";

/* More comic strips in the shape of their treatment, as in striper2.tsx and
   striper3.tsx: a drawing in each frame, its line under it, the page's ink
   (blekk.ts), a dashed frame for a step not everyone needs. Server-safe. */

const ALENE = "col-span-2 mx-auto w-[calc(50%-var(--gap)/2)] md:col-span-1 md:w-auto";
const sist = (i: number, n: number) => n % 2 === 1 && i === n - 1;
const kolonner = (n: number) => (n === 5 ? "md:grid-cols-5" : n === 4 ? "md:grid-cols-4" : "md:grid-cols-3");

/* ── Helprotese: a smile. Each frame is a tooth under the denture's pink
   gum, and on a wider screen they stand on a curve, the middle ones lowest,
   tilted along it. ── */

const GOMME = "M0,0 H100 V12 Q87.5,20 75,13 Q62.5,20 50,13 Q37.5,20 25,13 Q12.5,20 0,12 Z";

export function Smil({ ruter }: { ruter: Rute[] }) {
  const n = ruter.length;
  const midt = (n - 1) / 2;
  return (
    <ol className={cn("mt-9 grid grid-cols-2 gap-x-6 gap-y-10 [--gap:1.5rem] md:gap-x-5 md:pb-10", kolonner(n))}>
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        const u = midt ? (i - midt) / midt : 0;
        const stil = { "--y": `${r2(38 * (1 - u * u))}px`, "--r": `${r2(-5 * u)}deg` } as CSSProperties;
        return (
          <li key={r.tekst} style={stil} className={cn(sist(i, n) && ALENE)}>
            <figure className="md:translate-y-[var(--y)]">
              <div className={cn("relative grid aspect-[5/6] place-items-center overflow-hidden md:rotate-[var(--r)]", s.smilTann, r.mellom && s.smilMellom)}>
                <svg aria-hidden="true" viewBox="0 0 100 20" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-[17%] w-full">
                  <path d={GOMME} className={s.smilGomme} />
                </svg>
                <T className="relative mt-[14%] w-[74%]" forsink={i * 0.35} />
              </div>
              <Tekst className="mt-4 text-center">{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Delprotese: puzzle pieces, as the new teeth fit in among your own.
   Side by side, each piece's knob fits into the hole of the next, two to a
   row on a phone and three on a wider screen; every other piece is tinted. ── */

/** A piece in a 100 × 100 box: a hole in the left side, a knob out of the right. */
function brikke(hull: boolean, knott: boolean) {
  return [
    "M0,0 H100",
    knott ? "V44 H103 A10,10 0 1 1 103,56 H100 V100" : "V100",
    "H0",
    hull ? "V56 H3 A10,10 0 1 0 3,44 H0 V0" : "V0",
    "Z",
  ].join(" ");
}

export function Puslespill({ ruter }: { ruter: Rute[] }) {
  const n = ruter.length;
  return (
    <ol className="mt-9 grid grid-cols-2 gap-y-10 md:mx-auto md:max-w-[720px] md:grid-cols-3">
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        return (
          <li key={r.tekst}>
            <figure>
              <div className="relative grid aspect-square place-items-center">
                <svg aria-hidden="true" viewBox="0 0 100 100" className={cn("absolute inset-0 size-full overflow-visible", s.brikke, i % 2 === 1 && s.brikkeFarget, r.mellom && s.brikkeMellom)}>
                  <path d={brikke(i % 2 === 1, i % 2 === 0 && i < n - 1)} className="md:hidden" />
                  <path d={brikke(i % 3 !== 0, i % 3 !== 2 && i < n - 1)} className="hidden md:block" />
                </svg>
                <T className="relative w-[64%]" forsink={i * 0.35} />
              </div>
              <Tekst className="mt-4 px-3 md:px-5">{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Skallfasetter: seashells, for the thin shells set on the teeth; the
   rim in scallops, short ribs inside it, the little ears at the hinge. ── */

const SKJELL = (() => {
  const [cx, cy, rx, ry, k] = [50, 50, 46, 44, 7];
  const kant = [];
  const ribber = [];
  for (let j = 0; j < k; j++) {
    const a1 = Math.PI + ((j + 1) / k) * Math.PI;
    const am = Math.PI + ((j + 0.5) / k) * Math.PI;
    kant.push(`Q${r2(cx + (rx + 8) * Math.cos(am))},${r2(cy + (ry + 8) * Math.sin(am))} ${r2(cx + rx * Math.cos(a1))},${r2(cy + ry * Math.sin(a1))}`);
    if (j < k - 1) ribber.push(`M${r2(cx + rx * 0.97 * Math.cos(a1))},${r2(cy + ry * 0.97 * Math.sin(a1))} L${r2(cx + rx * 0.82 * Math.cos(a1))},${r2(cy + ry * 0.82 * Math.sin(a1))}`);
  }
  return {
    skall: `M44,104 Q22,86 4,50 ${kant.join(" ")} Q78,86 56,104 Z`,
    ribber: ribber.join(" "),
  };
})();
const OREN = "M44,95 L30,97 L32,106 L46,106 Z M56,95 L70,97 L68,106 L54,106 Z";

export function Skjell({ ruter }: { ruter: Rute[] }) {
  const n = ruter.length;
  return (
    <ol className={cn("mt-10 grid grid-cols-2 gap-x-6 gap-y-10 [--gap:1.5rem] md:gap-x-8", kolonner(n))}>
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        return (
          <li key={r.tekst} className={cn(sist(i, n) && ALENE)}>
            <figure>
              <div className="relative aspect-[100/108]">
                <svg aria-hidden="true" viewBox="0 0 100 108" className={cn("absolute inset-0 size-full overflow-visible", s.skjell, r.mellom && s.skjellMellom)}>
                  <path d={OREN} />
                  <path d={SKJELL.skall} transform="translate(3 4)" className={s.skjellSkygge} />
                  <path d={SKJELL.skall} />
                  <path d={SKJELL.ribber} className={s.skjellRibbe} />
                </svg>
                <T className="absolute left-[21%] top-[15%] w-[58%]" forsink={i * 0.35} />
              </div>
              <Tekst className="mt-4 text-center">{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Trekking av tenner: a row of frames like teeth, and the one in the
   middle, where the tooth comes out, lifts out of its place once drawn,
   leaving a faint hollow where it stood. ── */

export function Luke({ ruter }: { ruter: Rute[] }) {
  const n = ruter.length;
  const ut = Math.floor(n / 2);
  return (
    <ol className={cn("mt-14 grid grid-cols-2 gap-x-6 gap-y-14 [--gap:1.5rem] md:mt-16 md:gap-x-6", kolonner(n))}>
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        return (
          <li key={r.tekst} className={cn(sist(i, n) && ALENE)}>
            <figure>
              <div className="relative">
                {i === ut && <div aria-hidden="true" className={s.lukeHull} />}
                <div className={cn("relative grid aspect-[5/6] place-items-center", s.lukeTann, r.mellom && s.lukeMellom, i === ut && s.loftet)}>
                  <T className="w-[78%]" forsink={i * 0.35} />
                </div>
              </div>
              <Tekst className="mt-4 text-center">{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Munntørrhet: drops of water, falling at their own heights. ── */

const DRAAPE = "M50,3 C50,3 7,58 7,86 A43,43 0 0 0 93,86 C93,58 50,3 50,3 Z";
const FALL = [0, 26, 8, 32, 14, 22];

export function Draaper({ ruter }: { ruter: Rute[] }) {
  const n = ruter.length;
  return (
    <ol className={cn("mt-9 grid grid-cols-2 gap-x-6 gap-y-10 [--gap:1.5rem] md:gap-x-7 md:pb-8", kolonner(n))}>
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        const stil = { "--y": `${FALL[i % FALL.length]}px`, "--yt": `${i % 2 ? 18 : 0}px` } as CSSProperties;
        return (
          <li key={r.tekst} style={stil} className={cn(sist(i, n) && ALENE)}>
            <figure className="translate-y-[var(--yt)] md:translate-y-[var(--y)]">
              <div className="relative aspect-[100/132]">
                <svg aria-hidden="true" viewBox="0 0 100 132" className={cn("absolute inset-0 size-full overflow-visible", s.draape, r.mellom && s.draapeMellom)}>
                  <path d={DRAAPE} transform="translate(3 4)" className={s.draapeSkygge} />
                  <path d={DRAAPE} />
                  <path d="M20,84 Q21,66 34,54" className={s.draapeGlans} />
                </svg>
                <T className="absolute left-[19%] top-[41%] w-[62%]" forsink={i * 0.35} />
              </div>
              <Tekst className="mt-4 text-center">{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Tannkjøttbehandling: frames with the probe's scale along their foot,
   the marks the dentist reads when measuring how deep the gum goes. ── */

export function Maal({ ruter }: { ruter: Rute[] }) {
  const n = ruter.length;
  const streker = Array.from({ length: 11 }, (_, j) => `M${j * 10},100 V${j % 5 === 0 ? 20 : 55}`).join(" ");
  return (
    <ol className={cn("mt-9 grid grid-cols-2 gap-x-5 gap-y-9 [--gap:1.25rem] md:gap-x-6", kolonner(n))}>
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        return (
          <li key={r.tekst} className={cn(sist(i, n) && ALENE)}>
            <figure>
              <div className={cn("relative grid aspect-square place-items-center rounded-[18px] pb-[12%]", s.rute, r.mellom && s.mellom)}>
                <T className="w-[72%]" forsink={i * 0.35} />
                <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className={cn("absolute bottom-[6%] left-[10%] h-[9%] w-[80%] overflow-visible", s.skala)}>
                  <rect x={30} y={30} width={20} height={70} className={s.skalaBand} />
                  <path d={`M0,100 H100 ${streker}`} />
                </svg>
              </div>
              <Tekst className="mt-3">{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}
