import { FARGE as F, r2, rng, stjerne } from "@/components/forside/behandlinger/popup/tegning";
import { BLEKK, Ramme, blekk, form, linje } from "@/components/artikler/tegninger";
import type { Rute } from "@/data/behandlinger/typer";
import { cn } from "@/lib/utils";
import { Tekst } from "./striper2";
import { BTEGNINGER } from "./tegninger";
import s from "./side.module.css";

/* More comic strips in the shape of their treatment, as in striper2.tsx:
   a drawing in each frame, its line under it, the page's ink (blekk.ts),
   a dashed frame for a step not everyone needs. Server-safe. */

const ALENE = "col-span-2 mx-auto w-[calc(50%-var(--gap)/2)] md:col-span-1 md:w-auto";
const sist = (i: number, n: number) => n % 2 === 1 && i === n - 1;
const kolonner = (n: number) => (n === 5 ? "md:grid-cols-5" : n === 4 ? "md:grid-cols-4" : "md:grid-cols-3");

/* ── Tannrens: tiles in their grout, from plaque to clean. The first tile
   has a few soft flecks along its foot, the next more and harder ones, the
   third only a few left, and the last none, with a shine. ── */

function flekker(i: number, n: number) {
  const t = n > 1 ? i / (n - 1) : 1;
  if (t >= 1) return [];
  const antall = t < 0.2 ? 6 : t < 0.5 ? 11 : 4;
  const hard = t >= 0.2 && t < 0.5;
  const r = rng(31 + i * 7);
  return Array.from({ length: antall }, () => ({
    x: r2(6 + r() * 88),
    y: r2(r() < 0.75 ? 82 + r() * 12 : 6 + r() * 14),
    r: r2((hard ? 1.6 : 1.1) + r() * 1.3),
    farge: hard ? "#BFA45E" : "#D9C483",
  }));
}

export function Fliser({ ruter }: { ruter: Rute[] }) {
  const n = ruter.length;
  return (
    <ol className={cn("mt-10 grid grid-cols-2 gap-x-[10px] gap-y-10 px-[5px] [--gap:10px]", kolonner(n))}>
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        const ren = i === n - 1;
        return (
          <li key={r.tekst} className={cn(sist(i, n) && ALENE)}>
            <figure>
              <div className={cn("relative grid aspect-square place-items-center", s.flis, r.mellom && s.flisMellom)}>
                <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
                  <path d="M7,24 L24,7 M7,33 L33,7" className={s.glans} />
                  {flekker(i, n).map((f) => (
                    <circle key={`${f.x}-${f.y}`} cx={f.x} cy={f.y} r={f.r} fill={f.farge} fillOpacity={0.6} />
                  ))}
                </svg>
                {ren && (
                  <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 size-full">
                    <path d={`${stjerne(86, 15, 6)} ${stjerne(74, 9, 3.4)}`} fill="#F6E3A6" stroke="var(--b-ramme)" strokeWidth={1.4} strokeLinejoin="round" />
                  </svg>
                )}
                <T className="relative w-[74%]" forsink={i * 0.35} />
              </div>
              <Tekst className="mt-5 px-1">{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Rotfylling: each frame a tooth with two roots under it, the canals
   faint; in the last frame, once the treatment is done, they fill. ── */

const ROTTANN =
  "M14,2 H86 Q98,2 98,14 V86 Q98,98 86,98 H84 C83,108 78,117 71,119 C65,118 62,108 61,98 H39 C38,108 35,118 29,119 C22,117 17,108 16,98 H14 Q2,98 2,86 V14 Q2,2 14,2 Z";
const KANALER = "M72.5,100 C72.5,106 71.8,111 71.2,114.5 M27.5,100 C27.5,106 28.2,111 28.8,114.5";

export function Rotter({ ruter }: { ruter: Rute[] }) {
  const n = ruter.length;
  return (
    <ol className="mt-9 grid grid-cols-2 gap-x-6 gap-y-9 [--gap:1.5rem] md:grid-cols-3 md:gap-x-14">
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        const fylt = i === n - 1;
        return (
          <li key={r.tekst} className={cn(n % 2 === 1 && i === n - 1 && "col-span-2 mx-auto w-[calc(50%-var(--gap)/2)] md:col-span-1 md:w-auto")}>
            <figure>
              <div className="relative aspect-[100/122]">
                <svg aria-hidden="true" viewBox="0 0 100 122" className={cn("absolute inset-0 size-full overflow-visible", s.rottann, r.mellom && s.rottannMellom)}>
                  <path d={ROTTANN} transform="translate(3 4)" className={s.rottannSkygge} />
                  <path d={ROTTANN} />
                  <path d={KANALER} className={s.kanal} />
                  {fylt && <path d={KANALER} pathLength={1} className={s.kanalFylt} style={{ "--forsink": `${0.6 + i * 0.35}s` } as React.CSSProperties} />}
                </svg>
                <T className="absolute left-[17%] top-[7.5%] w-[66%]" forsink={i * 0.35} />
              </div>
              <Tekst className="mt-3">{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Visdomstenner: arched windows, and on the last one the owl from the
   title, wise, sits and watches. On a phone the last frame keeps room
   above it for the owl. ── */

const BUE = "M2,52 A48,48 0 0 1 98,52 V112 Q98,118 92,118 H8 Q2,118 2,112 Z";

/** The owl of the title scene (tittelbilder2.tsx), on its own, small enough to sit on a frame. */
function Ugle({ forsink }: { forsink: number }) {
  const strek = true;
  return (
    <Ramme className="w-full" forsink={forsink} boks="242 54 68 90">
      <ellipse cx={276} cy={100} rx={28} ry={34} {...form(strek, "#E3CBA3", { w: 2.2, penFill: "#F1E3CB" })} />
      <ellipse cx={276} cy={112} rx={16} ry={18} {...form(strek, "#F6EEDF", { w: 1.6, ink: "#C9AE7E", penFill: "#FBF6EC" })} />
      <path d="M268,104 l4,4 l4,-4 M276,112 l4,4 l4,-4 M268,120 l4,4 l4,-4" {...linje(strek, "#C9AE7E", 1.4, "#C9AE7E")} />
      <path d="M254,74 L256,58 L266,70 M298,74 L296,58 L286,70" {...form(strek, "#E3CBA3", { w: 2, penFill: "#F1E3CB" })} />
      <circle cx={266} cy={86} r={9} {...form(strek, F.hvit, { w: 2, penFill: "#FFFFFF" })} />
      <circle cx={286} cy={86} r={9} {...form(strek, F.hvit, { w: 2, penFill: "#FFFFFF" })} />
      <circle cx={265} cy={87} r={3.6} fill={BLEKK} {...blekk(strek)} />
      <circle cx={285} cy={87} r={3.6} fill={BLEKK} {...blekk(strek)} />
      <path d="M272,94 L280,94 L276,102 Z" {...form(strek, F.rav, { w: 1.6, ink: "#C9803E" })} />
      <path d="M250,96 Q244,116 256,128 M302,96 Q308,116 296,128" {...linje(strek, BLEKK, 2)} />
      <path d="M266,134 l-3,7 M270,134 l0,8 M282,134 l0,8 M286,134 l3,7" {...linje(strek, F.rav, 2, "#C9803E")} />
    </Ramme>
  );
}

export function Buer({ ruter }: { ruter: Rute[] }) {
  const n = ruter.length;
  return (
    <ol className={cn("mt-9 grid grid-cols-2 gap-x-6 gap-y-10 [--gap:1.5rem] md:mt-20 md:gap-x-8", kolonner(n))}>
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        return (
          <li key={r.tekst} className={cn(sist(i, n) && ALENE, i === n - 1 && "mt-14 md:mt-0")}>
            <figure>
              <div className="relative aspect-[100/120]">
                <svg aria-hidden="true" viewBox="0 0 100 120" className={cn("absolute inset-0 size-full overflow-visible", s.bue, r.mellom && s.bueMellom)}>
                  <path d={BUE} transform="translate(3 4)" className={s.bueSkygge} />
                  <path d={BUE} />
                </svg>
                <T className="absolute left-[17%] top-[30%] w-[66%]" forsink={i * 0.35} />
                {i === n - 1 && (
                  <div className="absolute left-[29%] top-[-40%] w-[42%]">
                    <Ugle forsink={0.8 + i * 0.35} />
                  </div>
                )}
              </div>
              <Tekst className="mt-4 text-center">{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Tannkrone: the frames are crowns, the kind a king wears, as the
   word is the same; the temporary one is dashed. ── */

const KRONE = "M9,118 L3,20 L28,42 L50,10 L72,42 L97,20 L91,118 Z";

export function Kroner({ ruter }: { ruter: Rute[] }) {
  const n = ruter.length;
  return (
    <ol className={cn("mt-10 grid grid-cols-2 gap-x-6 gap-y-10 [--gap:1.5rem] md:gap-x-8", kolonner(n))}>
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        return (
          <li key={r.tekst} className={cn(sist(i, n) && ALENE)}>
            <figure>
              <div className="relative aspect-[100/124]">
                <svg aria-hidden="true" viewBox="0 0 100 124" className={cn("absolute inset-0 size-full overflow-visible", s.krone, r.mellom && s.kroneMellom)}>
                  <path d={KRONE} transform="translate(3 4)" className={s.kroneSkygge} />
                  <path d={KRONE} />
                  <path d="M8.2,106 L91.8,106" className={s.kroneBand} />
                  {[
                    [3, 20],
                    [50, 10],
                    [97, 20],
                  ].map(([x, y]) => (
                    <circle key={x} cx={x} cy={y} r={4.6} className={s.kronePerle} />
                  ))}
                  {[32, 50, 68].map((x) => (
                    <circle key={x} cx={x} cy={112.5} r={2.4} className={s.kroneStein} />
                  ))}
                </svg>
                <T className="absolute left-[17%] top-[31%] w-[66%]" forsink={i * 0.35} />
              </div>
              <Tekst className="mt-4 text-center">{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Tannbro: frames side by side, each joined to the next by a little steel
   arch with its hangers, like the bridge over the Glomma. Two to a row on a
   phone, three on a wider screen; no arch out of the last frame in a row. ── */

export function Bro({ ruter }: { ruter: Rute[] }) {
  const n = ruter.length;
  return (
    <ol className="mt-9 grid grid-cols-2 gap-x-[var(--gap)] gap-y-9 [--gap:2.75rem] md:grid-cols-3 md:[--gap:4.5rem]">
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        return (
          <li key={r.tekst}>
            <figure>
              <div className={cn("relative grid aspect-square place-items-center rounded-[18px]", s.rute, r.mellom && s.mellom)}>
                {i < n - 1 && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 60 48"
                    preserveAspectRatio="none"
                    className={cn(s.bropar, "absolute left-[calc(100%+2px)] top-[calc(50%-36px)] h-14 w-[var(--gap)] md:h-[72px]", i % 2 === 1 ? "hidden" : "block", i % 3 === 2 ? "md:hidden" : "md:block")}
                  >
                    <path d="M0,30 L60,30 M0,30 Q30,-4 60,30 M12,19.1 L12,30 M20,14.9 L20,30 M30,13 L30,30 M40,14.9 L40,30 M48,19.1 L48,30" />
                    <path d="M10,40 q5,-3.5 10,0 q5,3.5 10,0 q5,-3.5 10,0 q5,3.5 10,0 M18,46 q4,-3 8,0 q4,3 8,0 q4,-3 8,0" className={s.vann} />
                  </svg>
                )}
                <T className="w-[80%]" forsink={i * 0.35} />
              </div>
              <Tekst className="mt-3">{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}
