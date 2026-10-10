import type { CSSProperties } from "react";
import { r2 } from "@/components/forside/behandlinger/popup/tegning";
import type { Rute } from "@/data/behandlinger/typer";
import { cn } from "@/lib/utils";
import { Tekst } from "./striper2";
import { BTEGNINGER } from "./tegninger";
import s from "./side.module.css";

/* The last comic strips in the shape of their treatment, as in striper2–4:
   a drawing in each frame, its line under it, the page's ink (blekk.ts), a
   dashed frame for a step not everyone needs. Server-safe. */

const ALENE = "col-span-2 mx-auto w-[calc(50%-var(--gap)/2)] md:col-span-1 md:w-auto";
const sist = (i: number, n: number) => n % 2 === 1 && i === n - 1;
const kolonner = (n: number) => (n === 5 ? "md:grid-cols-5" : n === 4 ? "md:grid-cols-4" : "md:grid-cols-3");

/* ── Ising i tenner: each frame has a knitted band over it, stitches along
   its edges and little stars between, warm against the cold. ── */

const STRIKK = (() => {
  const masker = [];
  for (let x = 2; x < 98; x += 4) masker.push(`M${x},1.8 l2,2.4 l2,-2.4 M${x},14.2 l2,2.4 l2,-2.4`);
  const stjerner = [10, 26, 42, 58, 74, 90].map((x) => `M${x - 3},9.2 h6 M${x},6.2 v6 M${x - 2.1},7.1 l4.2,4.2 M${x + 2.1},7.1 l-4.2,4.2`);
  const prikker = [18, 34, 50, 66, 82].map((x) => `M${x},9.2 h0.01`);
  return { masker: masker.join(" "), stjerner: stjerner.join(" "), prikker: prikker.join(" ") };
})();

export function Strikk({ ruter }: { ruter: Rute[] }) {
  const n = ruter.length;
  return (
    <ol className={cn("mt-9 grid grid-cols-2 gap-x-6 gap-y-9 [--gap:1.5rem] md:gap-x-7", kolonner(n))}>
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        return (
          <li key={r.tekst} className={cn(sist(i, n) && ALENE)}>
            <figure>
              <div className={cn("relative grid aspect-square place-items-center overflow-hidden rounded-[16px]", s.rute, r.mellom && s.mellom)}>
                <svg aria-hidden="true" viewBox="0 0 100 18.4" className={cn("absolute inset-x-0 top-0 w-full", s.strikk)}>
                  <rect width={100} height={18.4} className={s.strikkBand} />
                  <path d={STRIKK.masker} />
                  <path d={STRIKK.stjerner} />
                  <path d={STRIKK.prikker} className={s.strikkPrikk} />
                </svg>
                <T className="relative mt-[16%] w-[70%]" forsink={i * 0.35} />
              </div>
              <Tekst className="mt-3">{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Dårlig ånde: clouds of breath, drifting at their own heights. ── */

const SKY = "M20,88 C6,88 0,72 10,62 C2,48 14,32 30,36 C32,18 54,10 64,22 C74,12 94,20 92,38 C102,44 102,62 92,68 C98,80 88,90 78,88 Z";
const DRIV = [10, 0, 18, 4, 14];

export function Skyer({ ruter }: { ruter: Rute[] }) {
  const n = ruter.length;
  return (
    <ol className={cn("mt-9 grid grid-cols-2 gap-x-6 gap-y-9 [--gap:1.5rem] md:gap-x-8 md:pb-4", kolonner(n))}>
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        return (
          <li key={r.tekst} style={{ "--y": `${DRIV[i % DRIV.length]}px` } as CSSProperties} className={cn(sist(i, n) && ALENE)}>
            <figure className="md:translate-y-[var(--y)]">
              <div className="relative aspect-[100/96]">
                <svg aria-hidden="true" viewBox="0 0 100 96" className={cn("absolute inset-0 size-full overflow-visible", s.sky, r.mellom && s.skyMellom)}>
                  <path d={SKY} transform="translate(3 4)" className={s.skySkygge} />
                  <path d={SKY} />
                </svg>
                <T className="absolute left-[22%] top-[31%] w-[56%]" forsink={i * 0.35} />
              </div>
              <Tekst className="mt-3 text-center">{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Tannverk: magnifying glasses, for finding what causes the pain. ── */

export function Lupe({ ruter }: { ruter: Rute[] }) {
  const n = ruter.length;
  return (
    <ol className={cn("mt-9 grid grid-cols-2 gap-x-6 gap-y-9 [--gap:1.5rem] md:gap-x-9", kolonner(n))}>
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        return (
          <li key={r.tekst} className={cn(sist(i, n) && ALENE)}>
            <figure>
              <div className="relative aspect-[100/112]">
                <svg aria-hidden="true" viewBox="0 0 100 112" className={cn("absolute inset-0 size-full overflow-visible", s.lupe, r.mellom && s.lupeMellom)}>
                  <path d="M77,77 L95,103" className={s.lupeSkaft} />
                  <circle cx={47} cy={47} r={44} transform="translate(3 4)" className={s.lupeSkygge} />
                  <circle cx={47} cy={47} r={44} />
                  <circle cx={47} cy={47} r={39} className={s.lupeIndre} />
                  <path d="M22,34 A28,28 0 0 1 34,20" className={s.lupeGlans} />
                </svg>
                <T className="absolute left-[19%] top-[17%] w-[56%]" forsink={i * 0.35} />
              </div>
              <Tekst className="mt-2">{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Tannskade: plasters, standing on end, each tilted a little its own way. ── */

const HULL = (() => {
  const d = [];
  for (const y of [13, 21, 129, 137]) for (const x of [36, 50, 64]) d.push(`M${x},${y} h0.01`);
  return d.join(" ");
})();
const SKAKK = [-3, 2.5, -1.5, 3, -2.5];

export function Plaster({ ruter }: { ruter: Rute[] }) {
  const n = ruter.length;
  return (
    <ol className={cn("mt-10 grid grid-cols-2 gap-x-7 gap-y-10 [--gap:1.75rem] md:gap-x-8", kolonner(n))}>
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        return (
          <li key={r.tekst} className={cn(sist(i, n) && ALENE)}>
            <figure>
              <div className="relative mx-auto aspect-[100/150] w-[88%]" style={{ rotate: `${SKAKK[i % SKAKK.length]}deg` }}>
                <svg aria-hidden="true" viewBox="0 0 100 150" className={cn("absolute inset-0 size-full overflow-visible", s.plaster, r.mellom && s.plasterMellom)}>
                  <rect x={2} y={2} width={96} height={146} rx={48} transform="translate(3 4)" className={s.plasterSkygge} />
                  <rect x={2} y={2} width={96} height={146} rx={48} />
                  <rect x={13} y={35} width={74} height={80} rx={9} className={s.plasterPute} />
                  <path d={HULL} className={s.plasterHull} />
                </svg>
                <T className="absolute left-[18%] top-[28%] w-[64%]" forsink={i * 0.35} />
              </div>
              <Tekst className="mt-4 text-center">{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Mistet fylling: each frame has a bite out of its corner, where the
   filling was; once the tooth gets a new one, the bite is filled in. ── */

const MED_HAKK = "M14,2 H60 C60,2 61,21 72,21 C83,21 84,2 84,2 H86 Q98,2 98,14 V86 Q98,98 86,98 H14 Q2,98 2,86 V14 Q2,2 14,2 Z";
const HAKKET = "M60,2 C60,2 61,21 72,21 C83,21 84,2 84,2 Z";

export function Hakk({ ruter }: { ruter: Rute[] }) {
  const n = ruter.length;
  const fra = Math.floor(n / 2);
  return (
    <ol className={cn("mt-9 grid grid-cols-2 gap-x-6 gap-y-9 [--gap:1.5rem] md:gap-x-8", kolonner(n))}>
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        const fylt = i >= fra;
        return (
          <li key={r.tekst} className={cn(sist(i, n) && ALENE)}>
            <figure>
              <div className="relative grid aspect-square place-items-center">
                <svg aria-hidden="true" viewBox="0 0 100 100" className={cn("absolute inset-0 size-full overflow-visible", s.hakk, r.mellom && s.hakkMellom)}>
                  <path d={MED_HAKK} transform="translate(3 4)" className={s.hakkSkygge} />
                  <path d={MED_HAKK} />
                  {fylt ? <path d={HAKKET} className={s.hakkFylt} /> : <path d="M60,2 H84" className={s.hakkTomt} />}
                </svg>
                <T className="relative mt-[10%] w-[72%]" forsink={i * 0.35} />
              </div>
              <Tekst className="mt-3">{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Løsnet tannkrone: each frame wears a crown, sitting loose and askew;
   on the last one it settles into place once drawn. ── */

/** A crown's top: two cusps and the groove between them. */
const LOKK = "M3,24 C2,11 9,2 22,2 C32,2 38,8 50,9 C62,8 68,2 78,2 C91,2 98,11 97,24 Z";

export function Lokk({ ruter }: { ruter: Rute[] }) {
  const n = ruter.length;
  return (
    <ol className={cn("mt-10 grid grid-cols-2 gap-x-6 gap-y-10 [--gap:1.5rem] md:gap-x-9", kolonner(n))}>
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        const sitter = i === n - 1;
        const skjev = { "--vri": `${r2(i % 2 ? 9 : -8)}deg` } as CSSProperties;
        return (
          <li key={r.tekst} className={cn(sist(i, n) && ALENE)}>
            <figure>
              <div className="relative pt-[19%]">
                <svg aria-hidden="true" viewBox="0 0 100 26" style={skjev} className={cn("absolute left-[-4%] top-0 w-[108%] overflow-visible", s.lokk, sitter ? s.lokkSetter : s.lokkLos, r.mellom && s.lokkMellom)}>
                  <path d={LOKK} />
                </svg>
                <div className={cn("relative grid aspect-[10/9] place-items-center", s.lokkTann, r.mellom && s.lokkTannMellom)}>
                  <T className="w-[74%]" forsink={i * 0.35} />
                </div>
              </div>
              <Tekst className="mt-3">{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}
