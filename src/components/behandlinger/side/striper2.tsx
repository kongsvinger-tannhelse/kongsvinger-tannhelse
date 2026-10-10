import type { CSSProperties } from "react";
import { JEKSEL, r2 } from "@/components/forside/behandlinger/popup/tegning";
import type { Rute } from "@/data/behandlinger/typer";
import { cn } from "@/lib/utils";
import { BTEGNINGER } from "./tegninger";
import s from "./side.module.css";

/* Comic strips in the shape of their treatment, a drawing in each frame and
   its line under it, in the page's ink (blekk.ts). A step not everyone needs
   has a dashed frame. Server-safe: the frames are plain SVG and CSS. */

export function Tekst({ children, className }: { children: React.ReactNode; className?: string }) {
  return <figcaption className={cn("text-[15.5px] leading-[1.45] text-[var(--color-tekst)] md:text-[16.5px]", className)}>{children}</figcaption>;
}

/** With an odd number of frames two to a row, the last one stands alone in the middle on a phone. */
const ALENE = "col-span-2 mx-auto w-[calc(50%-var(--gap)/2)] md:col-span-1 md:w-auto";
const sist = (i: number, n: number) => n % 2 === 1 && i === n - 1;

/* ── Hevelse: pillows, each a little less puffed than the one before, as the
   swelling goes down. Once in view, they all breathe out from the same puff
   to their own (CSS `d` in side.module.css); where `d` can't be animated,
   they simply stand as they end. ── */

/** A pillow in a 100 × 100 box: the corners pulled in by b, the sides bowed out to the box's edge. */
function pute(b: number) {
  const z = 100 - b;
  const u = r2(-b / 3);
  const o = r2(100 + b / 3);
  return `M${b},${b} C${b + 25},${u} ${z - 25},${u} ${z},${b} C${o},${b + 25} ${o},${z - 25} ${z},${z} C${z - 25},${o} ${b + 25},${o} ${b},${z} C${u},${z - 25} ${u},${b + 25} ${b},${b} Z`;
}

export function Puter({ ruter }: { ruter: Rute[] }) {
  const n = ruter.length;
  return (
    <ol className={cn("mt-9 grid grid-cols-2 gap-x-6 gap-y-9 [--gap:1.5rem] md:gap-x-9", n === 4 ? "md:grid-cols-4" : "md:grid-cols-3")}>
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        const b = n > 1 ? 11 - (8 * i) / (n - 1) : 6;
        const stil = { "--fra": `path("${pute(13)}")`, "--til": `path("${pute(b)}")`, "--puff": `${0.5 + i * 0.4}s` } as CSSProperties;
        return (
          <li key={r.tekst} className={cn(sist(i, n) && ALENE)}>
            <figure>
              <div className="relative grid aspect-square place-items-center">
                <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className={cn("absolute inset-0 size-full overflow-visible", s.pute, r.mellom && s.puteMellom)} style={stil}>
                  <path d={pute(b)} transform="translate(2.5 3.5)" className={s.puteSkygge} />
                  <path d={pute(b)} />
                </svg>
                <T className="relative w-[68%]" forsink={i * 0.35} />
              </div>
              <Tekst className="mt-4 text-center">{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Tannimplantat: the steps as working drawings, each on squared paper
   with crop marks at its corners, and its line in the title box under it,
   as parts are drawn before they are made. ── */

export function Arbeidstegning({ ruter }: { ruter: Rute[] }) {
  return (
    <ol className="mt-10 grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-3 md:gap-x-10 md:gap-y-11">
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        return (
          <li key={r.tekst} className="relative">
            <span aria-hidden="true" className={s.merker} />
            <figure className={cn("relative h-full", s.tegneark, r.mellom && s.tegnearkMellom)}>
              <div className={cn("grid aspect-[4/3] place-items-center", s.rutenett)}>
                <T className="w-[60%]" forsink={i * 0.3} />
              </div>
              <Tekst className={cn("px-3 pb-3 pt-2.5 md:px-4 md:pb-3.5", s.tittelfelt)}>{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Tannsjekk: sheets torn off a calendar, for coming back now and then;
   each with the calendar's band at the top and the next sheet under it. ── */

const VRI = [-1.6, 1.1, -0.7, 1.5, -1.2, 0.8];

export function Kalender({ ruter }: { ruter: Rute[] }) {
  const n = ruter.length;
  return (
    <ol className={cn("mt-10 grid grid-cols-2 gap-x-6 gap-y-10 [--gap:1.5rem] md:gap-x-9", n === 4 ? "md:grid-cols-4" : "md:grid-cols-3")}>
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        return (
          <li key={r.tekst} className={cn(sist(i, n) && ALENE)}>
            <figure>
              <div className={cn(s.kalenderark, r.mellom && s.kalenderMellom)} style={{ rotate: `${VRI[i % VRI.length]}deg` }}>
                <div aria-hidden="true" className={s.kalenderTopp}>
                  <span />
                  <span />
                </div>
                <div className="grid aspect-[6/5] place-items-center">
                  <T className="w-[66%]" forsink={i * 0.35} />
                </div>
              </div>
              <Tekst className="mt-5">{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Tannfylling: a row of teeth standing in the gum, a step in each tooth.
   Side by side, the gum runs on from tooth to tooth. ── */

const KRONE_BOKS = "-58 -112 116 124";
const TANNKJOTT = "M-59,-24 L-58,-24 C-40,-24 -30,-8 0,-8 C30,-8 40,-24 58,-24 L59,-24 L59,12 L-59,12 Z";
const TANNKJOTT_KANT = "M-59,-24 L-58,-24 C-40,-24 -30,-8 0,-8 C30,-8 40,-24 58,-24 L59,-24";

export function Tannrad({ ruter }: { ruter: Rute[] }) {
  const n = ruter.length;
  return (
    <ol className={cn("mt-9 grid grid-cols-2 gap-y-9 [--gap:0px] md:gap-y-0", n === 5 ? "md:grid-cols-5" : n === 4 ? "md:grid-cols-4" : "md:grid-cols-3")}>
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        return (
          <li key={r.tekst} className={cn(sist(i, n) && ALENE)}>
            <figure>
              <div className="relative aspect-[116/124]">
                <svg aria-hidden="true" viewBox={KRONE_BOKS} className={cn("absolute inset-0 size-full overflow-visible", s.tann, r.mellom && s.tannMellom)}>
                  <path d={JEKSEL.krone} transform="translate(3 4)" className={s.tannSkygge} />
                  <path d={JEKSEL.krone} className={s.tannKrone} />
                  <path d={TANNKJOTT} className={s.tannkjott} />
                  <path d={TANNKJOTT_KANT} className={s.tannkjottKant} />
                </svg>
                <T className="absolute left-[18%] top-[12.5%] w-[64%]" forsink={i * 0.35} />
              </div>
              <Tekst className="mt-3 px-2.5 text-center md:px-3">{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Tannbleking: shade tabs hanging on a rail, the way the dentist holds
   them up to your teeth, each a little lighter than the one before. ── */

const MORK = [0xed, 0xd8, 0xa6];
/** The tab's colour: from a warm ivory to white across the row. */
function nyanse(i: number, n: number) {
  const t = n > 1 ? i / (n - 1) : 1;
  return `#${MORK.map((c) => Math.round(c + (255 - c) * t).toString(16).padStart(2, "0")).join("")}`;
}
const TAB = "M12,32 Q12,26 18,26 L82,26 Q88,26 88,32 L87,100 C85,130 66,146 50,146 C34,146 15,130 13,100 Z";

export function Fargeskala({ ruter }: { ruter: Rute[] }) {
  const n = ruter.length;
  return (
    <ol className={cn("mt-9 grid grid-cols-2 gap-x-6 gap-y-10 [--gap:1.5rem] md:gap-x-7 md:[--gap:1.75rem]", n === 5 ? "md:grid-cols-5" : n === 4 ? "md:grid-cols-4" : "md:grid-cols-3")}>
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        return (
          <li key={r.tekst} className={cn(sist(i, n) && ALENE)}>
            <figure>
              <div className="relative aspect-[100/150]">
                <span aria-hidden="true" className={s.skinne} />
                <svg aria-hidden="true" viewBox="0 0 100 150" className={cn("absolute inset-0 size-full overflow-visible", s.tab)}>
                  <rect x={40} y={1} width={20} height={30} rx={3} className={s.tabSkaft} />
                  <path d={TAB} transform="translate(2.5 3.5)" className={s.tabSkygge} />
                  <path d={TAB} style={{ fill: nyanse(i, n) }} />
                </svg>
                <T className="absolute left-[16%] top-[25%] w-[68%]" forsink={i * 0.35} />
              </div>
              <Tekst className="mt-4 text-center">{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}
