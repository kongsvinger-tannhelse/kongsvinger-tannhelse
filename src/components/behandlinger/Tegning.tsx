import { memo } from "react";
import { FARGE, draape, kurve, lauv, r2, snofnugg, stjerne, type Pt } from "@/components/forside/behandlinger/popup/tegning";
import { BREDDE, GANE, HOYDE, OVERKJEVE, PUNKTER, TUNGE, UNDERKJEVE, fure, innerkant, omriss, plassering, type Tann } from "./kart";
import s from "./tannkart.module.css";

/**
 * The drawing under «Tannkartet»: both jaws from above on the clinic's
 * paper, every tooth a small paper cut with its shadow, and on the teeth what
 * each treatment is about (a filling, a chipped edge, a bridge, an empty
 * socket, a swelling). A dotted line runs from each spot to where its number
 * stands. Static: it never changes after the first render, so it is memoised
 * and the moving parts (the glow on the chosen spot, the pins) sit on top.
 */
export const Tegning = memo(function Tegning() {
  return (
    <svg viewBox={`0 0 ${BREDDE} ${HOYDE}`} className="absolute inset-0 size-full" aria-hidden="true">
      <defs>
        <radialGradient id="tk-glans" cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#F4F6F5" />
          <stop offset="100%" stopColor="#E3E9EA" />
        </radialGradient>
        <radialGradient id="tk-speil" cx="35%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#D4E3E6" />
          <stop offset="100%" stopColor="#9DB3B8" />
        </radialGradient>
      </defs>

      <Linjer />

      <Gane />
      <Bue tenner={OVERKJEVE} under={false} />
      <Overmerker />

      <Tunge />
      <Bue tenner={UNDERKJEVE} under />
      <Undermerker />

      <Speil />
    </svg>
  );
});

/* ── The arches ── */

const TOMT = new Set([11]); // the lower tooth that has been pulled

function Bue({ tenner, under }: { tenner: Tann[]; under: boolean }) {
  return (
    <g>
      {/* the gum: a soft blob under every tooth, merging into a band */}
      {tenner.map((t, i) => (
        <path key={`k${i}`} d={omriss({ form: "jeksel", w: t.w + 9, d: t.d + 18 })} transform={plassering(t, under)} fill={FARGE.tannkjottMork} />
      ))}
      {tenner.map((t, i) => (
        <path key={`g${i}`} d={omriss({ form: "jeksel", w: t.w + 6, d: t.d + 14 })} transform={plassering(t, under)} fill={FARGE.tannkjott} />
      ))}
      {tenner.map((t, i) =>
        under && TOMT.has(i) ? null : (
          <g key={`t${i}`}>
            <g transform="translate(1.1 2.2)">
              <path d={omriss(t)} transform={plassering(t, under)} fill="rgba(22,48,59,0.2)" />
            </g>
            <g transform={plassering(t, under)}>
              <path d={omriss(t)} fill="url(#tk-glans)" stroke="#A3B2B5" strokeWidth={0.7} />
              <path d={fure(t)} fill="none" stroke={FARGE.fure} strokeWidth={1.1} strokeLinecap="round" />
            </g>
          </g>
        )
      )}
    </g>
  );
}

/** The roof of the mouth, inside the upper arch, with its ridges and the seam down the middle. */
function Gane() {
  const inn = innerkant(OVERKJEVE, 2);
  const bak = Math.max(inn[0][1], inn[inn.length - 1][1]);
  const d = `${kurve(inn)} Q240,${r2(bak + 26)} ${inn[0][0]},${inn[0][1]} Z`;
  const rugae = [
    [-34, GANE[1] - 52, -11, GANE[1] - 61],
    [-40, GANE[1] - 34, -11, GANE[1] - 43],
    [-36, GANE[1] - 16, -13, GANE[1] - 25],
  ];
  // the denture plate's edge, for «Helprotese»
  const plate = innerkant(OVERKJEVE, 7);
  return (
    <g>
      <path d={d} fill="#F2C7BE" />
      <path d={`M240,${GANE[1] - 66} L240,${r2(bak + 4)}`} stroke="#E2A9A0" strokeWidth={1.4} strokeDasharray="1 4" strokeLinecap="round" />
      {rugae.map(([x1, y1, x2, y2], i) => (
        <g key={i} stroke="#E4ACA3" strokeWidth={2} strokeLinecap="round" fill="none">
          <path d={`M${240 + x1},${y1} Q${240 + (x1 + x2) / 2},${y1 - 9} ${240 + x2},${y2}`} />
          <path d={`M${240 - x1},${y1} Q${240 - (x1 + x2) / 2},${y1 - 9} ${240 - x2},${y2}`} />
        </g>
      ))}
      <path d={`${kurve(plate)} Q240,${r2(bak + 16)} ${plate[0][0]},${plate[0][1]}`} fill="none" stroke={FARGE.teal} strokeOpacity={0.55} strokeWidth={1.1} strokeDasharray="3 3" />
    </g>
  );
}

/** The tongue, inside the lower arch, its tip at the front teeth and its back reaching up into the middle. */
function Tunge() {
  const inn = innerkant(UNDERKJEVE, 3);
  const topp = Math.min(inn[0][1], inn[inn.length - 1][1]);
  const d = `${kurve(inn)} C${r2(inn[inn.length - 1][0] - 4)},${r2(topp - 26)} ${r2(240 + 44)},${r2(topp - 40)} 240,${r2(topp - 40)} C${r2(240 - 44)},${r2(topp - 40)} ${r2(inn[0][0] + 4)},${r2(topp - 26)} ${inn[0][0]},${inn[0][1]} Z`;
  const prikker: Pt[] = [];
  let seed = 7;
  for (let i = 0; i < 46; i++) {
    seed = (seed * 16807) % 2147483647;
    const a = (seed % 1000) / 1000;
    seed = (seed * 16807) % 2147483647;
    const b = (seed % 1000) / 1000;
    prikker.push([r2(196 + a * 88), r2(topp - 18 + b * 96)]);
  }
  return (
    <g>
      <path d={d} fill="#E59D93" />
      <path d={d} fill="none" stroke="#D68579" strokeWidth={1.2} />
      <path d={`M240,${r2(topp - 22)} C238,${r2(topp + 14)} 242,${r2(topp + 50)} 240,${r2(topp + 82)}`} stroke="#CF7E73" strokeWidth={2} fill="none" strokeLinecap="round" />
      {prikker.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.1} fill="#F0B6AD" />
      ))}
    </g>
  );
}

/* ── What each treatment looks like on the teeth ── */

/** Draws in a tooth's own units. */
function PaaTann({ t, under = false, children }: { t: Tann; under?: boolean; children: React.ReactNode }) {
  return <g transform={plassering(t, under)}>{children}</g>;
}

function Overmerker() {
  const O = OVERKJEVE;
  const [b1, b2, b3] = [O[11], O[12], O[13]];
  return (
    <g>
      {/* Visdomstenner: only half through, the gum still over its back */}
      <PaaTann t={O[0]}>
        <path d={omriss({ ...O[0], w: O[0].w + 6, d: O[0].d + 6 })} fill="none" stroke={"#8A8B84"} strokeWidth={0.9} strokeDasharray="2 2.4" />
        <path d={lauv(-3, 6, 12, 9, 4)} fill={FARGE.tannkjott} stroke={FARGE.tannkjottMork} strokeWidth={0.8} />
      </PaaTann>

      {/* Løsnet tannkrone: the crown slid off its ground-down stump */}
      <PaaTann t={O[1]}>
        <path d={omriss({ form: "premolar", w: 15, d: 15 })} fill={FARGE.dentin} stroke={FARGE.dentinMork} strokeWidth={0.8} />
        <g transform="translate(-7 -9) rotate(-16)">
          <path d={omriss(O[1])} fill="rgba(22,48,59,0.18)" transform="translate(1 2)" />
          <path d={omriss(O[1])} fill="url(#tk-glans)" stroke={FARGE.metallMork} strokeWidth={0.9} />
          <path d={fure(O[1])} fill="none" stroke={FARGE.fure} strokeWidth={1.1} strokeLinecap="round" />
        </g>
      </PaaTann>

      {/* Tannfylling: a fresh tooth-coloured filling */}
      <PaaTann t={O[2]}>
        <path d={lauv(1, 1, 7, 5.5, 12, 8)} fill={FARGE.fylling} stroke="#9CC7D0" strokeWidth={0.9} />
      </PaaTann>

      {/* Rotfylling: the opening down to the nerve, sealed */}
      <PaaTann t={O[3]}>
        <circle r={5.2} fill={FARGE.fylling} stroke="#9CC7D0" strokeWidth={0.9} />
        <circle r={1.8} fill={FARGE.sart} />
      </PaaTann>

      {/* Ising i tenner: the cold */}
      {[
        [-6, 8, 4],
        [10, 4, 3.2],
        [2, 19, 2.6],
      ].map(([u, l, a], i) => {
        const t = O[5];
        const rad = (t.vinkel * Math.PI) / 180;
        const x = r2(t.x + t.ut[0] * (t.d / 2 + l) + Math.cos(rad) * u);
        const y = r2(t.y + t.ut[1] * (t.d / 2 + l) + Math.sin(rad) * u);
        return <path key={i} d={snofnugg(x, y, a)} stroke={FARGE.kulde} strokeWidth={1.2} strokeLinecap="round" />;
      })}

      {/* Tannbleking: whiter, with a glint */}
      <PaaTann t={O[6]}>
        <path d={omriss(O[6])} fill="#FFFFFF" />
        <path d={stjerne(-2, -1, 5)} fill={FARGE.teal} opacity={0.75} />
      </PaaTann>

      {/* Skallfasetter: a thin shell over the front */}
      <PaaTann t={O[7]}>
        <path d={`M${-O[7].w / 2 + 0.6},${-1} C${-O[7].w / 2 + 0.6},${-O[7].d * 0.5} ${-O[7].w * 0.3},${-O[7].d * 0.56} 0,${-O[7].d * 0.56} C${O[7].w * 0.3},${-O[7].d * 0.56} ${O[7].w / 2 - 0.6},${-O[7].d * 0.5} ${O[7].w / 2 - 0.6},${-1}`} fill="none" stroke={FARGE.teal} strokeWidth={2.4} strokeLinecap="round" opacity={0.6} />
      </PaaTann>

      {/* Tannskade: a corner knocked off, and a crack */}
      <PaaTann t={O[8]}>
        <path d={`M${r2(O[8].w / 2 - 6.5)},${r2(-O[8].d / 2 - 1)} L${r2(O[8].w / 2 + 1)},${r2(-O[8].d / 2 - 1)} L${r2(O[8].w / 2 + 1)},${r2(O[8].d * 0.15)} Z`} fill={FARGE.tannkjott} />
        <path d={`M${r2(O[8].w / 2 - 6.5)},${r2(-O[8].d / 2)} L${r2(O[8].w / 2)},${r2(O[8].d * 0.12)}`} stroke="#A3B2B5" strokeWidth={0.7} />
        <path d={`M${r2(O[8].w / 2 - 6)},${r2(-O[8].d * 0.3)} l-3,2.4 l1.4,2 l-2.6,2.6`} stroke={FARGE.smerte} strokeWidth={0.9} fill="none" strokeLinecap="round" />
      </PaaTann>

      {/* Tannbro: a new tooth in the gap, held by crowns on its neighbours */}
      {[b1, b2, b3].map((t, i) => (
        <PaaTann key={i} t={t}>
          <path d={omriss(t)} fill={i === 1 ? "#F3FAFB" : "none"} stroke={FARGE.metallMork} strokeWidth={i === 1 ? 1.1 : 0.9} />
        </PaaTann>
      ))}
      {[
        [b1, b2],
        [b2, b3],
      ].map(([a, b], i) => (
        <line key={i} x1={r2(a.x + (b.x - a.x) * 0.32)} y1={r2(a.y + (b.y - a.y) * 0.32)} x2={r2(a.x + (b.x - a.x) * 0.68)} y2={r2(a.y + (b.y - a.y) * 0.68)} stroke={FARGE.metallMork} strokeWidth={4} strokeLinecap="round" />
      ))}

      {/* Tannkrone: a crown, glossier, with a fine rim */}
      <PaaTann t={O[14]}>
        <path d={omriss({ ...O[14], w: O[14].w - 2, d: O[14].d - 2 })} fill="none" stroke={FARGE.metallMork} strokeWidth={1.1} />
        <path d={`M${r2(-O[14].w * 0.28)},${r2(-O[14].d * 0.3)} q4,-3 9,-2`} stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" fill="none" />
      </PaaTann>
    </g>
  );
}

function Undermerker() {
  const U = UNDERKJEVE;
  const ved = (t: Tann, ut: number, langs = 0): Pt => {
    const rad = (t.vinkel * Math.PI) / 180;
    return [r2(t.x + t.ut[0] * ut + Math.cos(rad) * langs), r2(t.y + t.ut[1] * ut + Math.sin(rad) * langs)];
  };
  const stein = innerkant(U.slice(6, 10), -1.5);
  const bar = innerkant(U.slice(12, 16), 4);
  return (
    <g>
      {/* Tanngnissing: the cusps ground flat, and the grinding */}
      <PaaTann t={U[1]} under>
        <ellipse cx={-5} cy={-3} rx={4.6} ry={3} fill="#FFFFFF" stroke={FARGE.fure} strokeWidth={0.7} />
        <ellipse cx={6} cy={3} rx={4.2} ry={2.8} fill="#FFFFFF" stroke={FARGE.fure} strokeWidth={0.7} />
      </PaaTann>
      {[-6, 6].map((l, i) => {
        const [x, y] = ved(U[1], U[1].d / 2 + 9, l);
        return <path key={i} d={`M${r2(x - 4)},${y} l2,-2.5 l2,2.5 l2,-2.5 l2,2.5`} stroke={"#8A8B84"} strokeWidth={1} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
      })}

      {/* Mistet fylling: the hole it left */}
      <PaaTann t={U[2]} under>
        <path d={lauv(0, 0, 7, 5.5, 31, 8)} fill={FARGE.hull} />
        <path d={lauv(-1, -1, 4, 3, 33, 7)} fill="#8A6552" />
      </PaaTann>

      {/* Tannsmerte: an aching tooth, its ache spreading in rings */}
      <PaaTann t={U[3]} under>
        <path d={omriss(U[3])} fill="#F6D8CF" />
      </PaaTann>
      <g transform={`translate(${U[3].x} ${U[3].y})`}>
        <circle r={14} fill="none" stroke={FARGE.smerte} strokeWidth={1.4} className={s.verk} />
        <circle r={14} fill="none" stroke={FARGE.smerte} strokeWidth={1.4} className={s.verk} style={{ animationDelay: "1.1s" }} />
      </g>

      {/* Tannverk: sore gum and sharp little strokes */}
      {[-9, 0, 9].map((l, i) => {
        const [x1, y1] = ved(U[4], U[4].d / 2 + 6, l * 0.6);
        const [x2, y2] = ved(U[4], U[4].d / 2 + 15, l);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={FARGE.rav} strokeWidth={1.6} strokeLinecap="round" />;
      })}

      {/* Tannrens: clean and shining */}
      {(
        [
          [U[5], -6, 4.5],
          [U[5], 9, 3],
        ] as const
      ).map(([t, l, a], i) => {
        const [x, y] = ved(t, t.d / 2 + 9, l);
        return <path key={i} d={stjerne(x, y, a)} fill={FARGE.teal} opacity={0.8} />;
      })}

      {/* Tannstein: a hard, yellowish crust behind the front teeth */}
      <path d={kurve(stein)} fill="none" stroke={FARGE.benMork} strokeWidth={5} strokeLinecap="round" />
      <path d={kurve(stein)} fill="none" stroke={FARGE.benStrek} strokeWidth={1.4} strokeDasharray="1 3" strokeLinecap="round" />

      {/* Tannkjøttbehandling: red, swollen gum along the front */}
      {[8, 9].map((i) => (
        <path key={i} d={omriss({ form: "jeksel", w: U[i].w + 5, d: 7 })} transform={`translate(${ved(U[i], U[i].d / 2 + 4.5).join(" ")}) rotate(${U[i].vinkel})`} fill={FARGE.sart} opacity={0.85} />
      ))}

      {/* Trekking av tenner: the empty socket */}
      <PaaTann t={U[11]} under>
        <ellipse rx={7.5} ry={8} fill={FARGE.tannkjottMork} />
        <ellipse rx={4.6} ry={5.2} cy={0.6} fill="#B9655C" />
      </PaaTann>

      {/* Hevelse: a swelling on the gum */}
      {(() => {
        const [x, y] = ved(U[12], U[12].d / 2 + 9);
        return <path d={lauv(x, y, 12, 9, 5)} fill={FARGE.sart} opacity={0.75} />;
      })()}

      {/* Tannimplantat: the crown on its screw, the screw's head showing */}
      <PaaTann t={U[13]} under>
        <circle r={6.8} fill="none" stroke={FARGE.teal} strokeWidth={1.4} />
        <path d="M-3.4,0 L-1.7,-2.9 L1.7,-2.9 L3.4,0 L1.7,2.9 L-1.7,2.9 Z" fill={FARGE.metall} stroke={FARGE.metallMork} strokeWidth={0.7} />
      </PaaTann>

      {/* Delprotese: two teeth on a pink base, held by a metal bar behind the teeth */}
      {[14, 15].map((i) => (
        <PaaTann key={i} t={U[i]} under>
          <path d={omriss({ form: "jeksel", w: U[i].w + 7, d: U[i].d + 10 })} fill="none" stroke="#C97C8E" strokeWidth={2.4} opacity={0.75} />
        </PaaTann>
      ))}
      <path d={kurve(bar)} fill="none" stroke={FARGE.metallMork} strokeWidth={3} strokeLinecap="round" />

      {/* Dårlig ånde: a breath rising off the back of the tongue */}
      {[-14, 0, 14].map((x, i) => (
        <path key={i} d={`M${TUNGE.ande[0] + x},${TUNGE.ande[1] - 16} c-4,-5 4,-8 0,-13 c-4,-5 4,-8 0,-13`} stroke={FARGE.bjork} strokeWidth={1.6} fill="none" strokeLinecap="round" opacity={0.9} />
      ))}

      {/* Munntørrhet: a dry, cracked patch, and a drop that isn't there */}
      <g stroke="#C8746A" strokeWidth={1} fill="none" strokeLinecap="round" transform={`translate(${TUNGE.torr[0]} ${TUNGE.torr[1]})`}>
        <path d="M-30,-8 l6,3 l-2,5 l7,4" />
        <path d="M14,14 l5,-2 l3,4" />
      </g>
      <path d={draape(TUNGE.torr[0] + 20, TUNGE.torr[1] - 14, 4)} fill="none" stroke={FARGE.kulde} strokeWidth={1.2} strokeDasharray="1.6 1.8" />
    </g>
  );
}

/** Tannsjekk: the dentist's mirror, laid between the jaws. */
function Speil() {
  return (
    <g>
      <g transform="translate(1.5 2.5)" fill="rgba(22,48,59,0.18)">
        <circle cx={300} cy={318} r={15} />
        <path d="M312,324 L436,364 L433,371 L309,331 Z" />
      </g>
      <path d="M312,324 L436,364 L433,371 L309,331 Z" fill={FARGE.metall} stroke={FARGE.metallMork} strokeWidth={0.8} />
      <path d="M360,340 L436,364 L433,371 L357,347 Z" fill={FARGE.metallMork} opacity={0.55} />
      <circle cx={300} cy={318} r={15} fill={FARGE.metallMork} />
      <circle cx={300} cy={318} r={12.4} fill="url(#tk-speil)" />
      <path d="M292,313 q4,-5 10,-5" stroke="#FFFFFF" strokeWidth={1.6} strokeLinecap="round" fill="none" />
    </g>
  );
}

/** The dotted lines from each spot to its number. */
function Linjer() {
  return (
    <g stroke={FARGE.glomma} strokeOpacity={0.32} strokeWidth={0.9} strokeDasharray="1.5 2.5" strokeLinecap="round">
      {PUNKTER.filter((p) => p.anker[0] !== p.pin[0] || p.anker[1] !== p.pin[1]).map((p) => (
        <line key={p.id} x1={p.anker[0]} y1={p.anker[1]} x2={p.pin[0]} y2={p.pin[1]} />
      ))}
    </g>
  );
}
