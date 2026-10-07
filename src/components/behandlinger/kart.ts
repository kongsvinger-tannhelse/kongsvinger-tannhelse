import { r2, type Pt } from "@/components/forside/behandlinger/popup/tegning";
import { GRUPPER } from "@/components/forside/behandlinger/grupper";

/* «Tannkartet»: the geometry of the drawing on /behandlinger. Both jaws seen
   from above, as on a dentist's chart: the upper arch at the top with its
   front teeth up, the lower arch under it with its front teeth down. Every
   treatment has a spot on it and a numbered pin beside the spot.
   A plain module, so server and browser compute the same numbers. */

export const BREDDE = 480;
export const HOYDE = 620;

export type Form = "fortann" | "hjorne" | "premolar" | "jeksel";
type Mal = { form: Form; w: number; d: number };

/** Each half-arch from the middle out: width along the arch, depth across it. */
const OVER: Mal[] = [
  { form: "fortann", w: 22, d: 13 },
  { form: "fortann", w: 17.5, d: 12 },
  { form: "hjorne", w: 19.5, d: 17 },
  { form: "premolar", w: 18, d: 22 },
  { form: "premolar", w: 17.5, d: 21.5 },
  { form: "jeksel", w: 27, d: 28 },
  { form: "jeksel", w: 25, d: 26.5 },
  { form: "jeksel", w: 22, d: 24 },
];
const UNDER: Mal[] = [
  { form: "fortann", w: 14.5, d: 11.5 },
  { form: "fortann", w: 15.5, d: 12 },
  { form: "hjorne", w: 18.5, d: 16 },
  { form: "premolar", w: 18, d: 19.5 },
  { form: "premolar", w: 18.5, d: 20.5 },
  { form: "jeksel", w: 28.5, d: 25.5 },
  { form: "jeksel", w: 27, d: 24.5 },
  { form: "jeksel", w: 24, d: 22.5 },
];
const MELLOM = 1.8;
/** All teeth are drawn this much bigger than the tables say. */
const STORR = 1.2;

export type Tann = {
  form: Form;
  w: number;
  d: number;
  x: number;
  y: number;
  /** The arch's direction here, in degrees. */
  vinkel: number;
  /** Outwards, away from the tongue: a unit vector. */
  ut: Pt;
};

/**
 * One arch's teeth, from the left back tooth to the right. The arch is a
 * parabola through the tooth centres, (cx ± bue·u, topp ± dybde·u²), and the
 * teeth are laid along it by their widths.
 */
function bue(maler: Mal[], cx: number, topp: number, bue: number, dybde: number, retning: 1 | -1): Tann[] {
  // walk the right half finely and note the length so far
  const pts: { x: number; y: number; s: number }[] = [];
  let s = 0;
  let forrige: Pt = [cx, topp];
  for (let i = 0; i <= 1600; i++) {
    const u = (i / 1600) * 1.4;
    const p: Pt = [cx + bue * u, topp + retning * dybde * u * u];
    s += Math.hypot(p[0] - forrige[0], p[1] - forrige[1]);
    pts.push({ x: p[0], y: p[1], s });
    forrige = p;
  }
  const ved = (lengde: number) => {
    const k = pts.findIndex((p) => p.s >= lengde);
    const a = pts[Math.max(0, k - 1)];
    const b = pts[Math.min(pts.length - 1, k + 1)];
    return { x: pts[k].x, y: pts[k].y, tx: (b.x - a.x) / Math.hypot(b.x - a.x, b.y - a.y), ty: (b.y - a.y) / Math.hypot(b.x - a.x, b.y - a.y) };
  };

  const hoyre: Tann[] = [];
  let langs = MELLOM / 2;
  for (const m0 of maler) {
    const m = { ...m0, w: m0.w * STORR, d: m0.d * STORR };
    const p = ved(langs + m.w / 2);
    langs += m.w + MELLOM;
    // outwards: for the upper arch (front up) that is (ty, -tx); the lower is mirrored
    const ut: Pt = retning === 1 ? [p.ty, -p.tx] : [-p.ty, p.tx];
    hoyre.push({ ...m, x: r2(p.x), y: r2(p.y), vinkel: r2((Math.atan2(p.ty, p.tx) * 180) / Math.PI), ut: [r2(ut[0]), r2(ut[1])] });
  }
  const venstre = hoyre.map((t) => ({ ...t, x: r2(2 * cx - t.x), vinkel: r2(-t.vinkel), ut: [r2(-t.ut[0]), t.ut[1]] as Pt })).reverse();
  return [...venstre, ...hoyre];
}

export const OVERKJEVE = bue(OVER, 240, 84, 124, 138, 1);
export const UNDERKJEVE = bue(UNDER, 240, 548, 117, 132, -1);

/** Places inside the lower arch, on the tongue. */
export const TUNGE = { ande: [240, 418] as Pt, torr: [268, 470] as Pt };
/** The roof of the mouth, where a full denture's plate lies. */
export const GANE: Pt = [240, 176];

/** A point beside a tooth: out from its centre, plus a nudge along the arch. */
const ved = (t: Tann, ut: number, langs = 0): Pt => {
  const rad = (t.vinkel * Math.PI) / 180;
  return [r2(t.x + t.ut[0] * ut + Math.cos(rad) * langs), r2(t.y + t.ut[1] * ut + Math.sin(rad) * langs)];
};

const O = (i: number) => OVERKJEVE[i];
const U = (i: number) => UNDERKJEVE[i];

/**
 * Where each treatment sits. `anker` is the spot on the drawing, `pin` where
 * its number stands. Upper teeth are counted 0–15 from the left back tooth,
 * the lower ones the same way.
 */
const PLASS: Record<string, { anker: Pt; pin: Pt }> = {
  // upper arch
  visdomstenner: { anker: [O(0).x, O(0).y], pin: ved(O(0), 40) },
  "losnet-tannkrone": { anker: [O(1).x, O(1).y], pin: ved(O(1), 66) },
  tannfylling: { anker: [O(2).x, O(2).y], pin: ved(O(2), 40) },
  rotfylling: { anker: [O(3).x, O(3).y], pin: ved(O(3), 66) },
  "ising-i-tenner": { anker: [O(5).x, O(5).y], pin: ved(O(5), 38) },
  tannbleking: { anker: [O(6).x, O(6).y], pin: ved(O(6), 62) },
  skallfasetter: { anker: [O(7).x, O(7).y], pin: ved(O(7), 34) },
  tannskade: { anker: [O(8).x, O(8).y], pin: ved(O(8), 60) },
  tannbro: { anker: [O(12).x, O(12).y], pin: ved(O(12), 42) },
  tannkrone: { anker: [O(14).x, O(14).y], pin: ved(O(14), 44) },
  helprotese: { anker: GANE, pin: GANE },
  // between the jaws
  tannsjekk: { anker: [300, 318], pin: [264, 318] },
  // lower arch
  tanngnissing: { anker: [U(1).x, U(1).y], pin: ved(U(1), 44) },
  "mistet-fylling": { anker: [U(2).x, U(2).y], pin: ved(U(2), 70) },
  tannsmerte: { anker: [U(3).x, U(3).y], pin: ved(U(3), 40) },
  tannverk: { anker: [U(4).x, U(4).y], pin: ved(U(4), 68) },
  tannrens: { anker: [U(5).x, U(5).y], pin: ved(U(5), 38) },
  tannstein: { anker: [U(7).x, U(7).y - 12], pin: [U(7).x - 14, U(7).y - 46] },
  tannkjottbehandling: { anker: [U(9).x, U(9).y + 9], pin: ved(U(9), 44) },
  "trekking-av-tenner": { anker: [U(11).x, U(11).y], pin: ved(U(11), 40) },
  hevelse: { anker: ved(U(12), 22), pin: ved(U(12), 66) },
  tannimplantat: { anker: [U(13).x, U(13).y], pin: ved(U(13), 40) },
  delprotese: { anker: [U(14).x, U(14).y], pin: ved(U(14), 66) },
  "darlig-ande": { anker: TUNGE.ande, pin: TUNGE.ande },
  munntorrhet: { anker: TUNGE.torr, pin: TUNGE.torr },
};

/** Every treatment in the list's order, numbered, with its place on the drawing. */
export const PUNKTER = GRUPPER.flatMap((g) => g.liste.map((b) => ({ ...b, gruppe: g.id, gruppeTittel: g.tittel }))).map((b, i) => {
  const plass = PLASS[b.id];
  if (!plass) throw new Error(`Tannkartet: ingen plass for ${b.id}`);
  return { ...b, nr: i + 1, ...plass };
});

export type Punkt = (typeof PUNKTER)[number];

/** The pins' colours, one per group: dark enough for a white number (WCAG AA). */
export const PINFARGE = {
  ordinaer: "#1D7380",
  akutt: "#B4472F",
  estetisk: "#5A6E3A",
} as const;

/* ── The shapes ──
   Each tooth in its own units, centred, w along the arch and d across it,
   +y towards the tongue. */

/** A rounded rectangle, the corners `r`. */
function rute(w: number, d: number, r: number) {
  const x = w / 2;
  const y = d / 2;
  r = Math.min(r, x, y);
  const k = r * 0.45;
  return `M${r2(-x + r)},${r2(-y)} L${r2(x - r)},${r2(-y)} C${r2(x - k)},${r2(-y)} ${r2(x)},${r2(-y + k)} ${r2(x)},${r2(-y + r)} L${r2(x)},${r2(y - r)} C${r2(x)},${r2(y - k)} ${r2(x - k)},${r2(y)} ${r2(x - r)},${r2(y)} L${r2(-x + r)},${r2(y)} C${r2(-x + k)},${r2(y)} ${r2(-x)},${r2(y - k)} ${r2(-x)},${r2(y - r)} L${r2(-x)},${r2(-y + r)} C${r2(-x)},${r2(-y + k)} ${r2(-x + k)},${r2(-y)} ${r2(-x + r)},${r2(-y)} Z`;
}

/** The outline of a tooth seen from above. */
export function omriss(t: Pick<Tann, "form" | "w" | "d">) {
  const { w, d } = t;
  switch (t.form) {
    case "fortann": {
      // a thin blade, its front edge bowed outwards
      const x = w / 2;
      const y = d / 2;
      return `M${r2(-x)},${r2(-y * 0.1)} C${r2(-x)},${r2(-y * 0.9)} ${r2(-x * 0.6)},${r2(-y * 1.05)} 0,${r2(-y * 1.05)} C${r2(x * 0.6)},${r2(-y * 1.05)} ${r2(x)},${r2(-y * 0.9)} ${r2(x)},${r2(-y * 0.1)} C${r2(x)},${r2(y * 0.55)} ${r2(x * 0.45)},${r2(y)} 0,${r2(y)} C${r2(-x * 0.45)},${r2(y)} ${r2(-x)},${r2(y * 0.55)} ${r2(-x)},${r2(-y * 0.1)} Z`;
    }
    case "hjorne": {
      const x = w / 2;
      const y = d / 2;
      return `M${r2(-x)},0 C${r2(-x)},${r2(-y * 0.75)} ${r2(-x * 0.45)},${r2(-y)} 0,${r2(-y)} C${r2(x * 0.45)},${r2(-y)} ${r2(x)},${r2(-y * 0.75)} ${r2(x)},0 C${r2(x)},${r2(y * 0.7)} ${r2(x * 0.4)},${r2(y)} 0,${r2(y)} C${r2(-x * 0.4)},${r2(y)} ${r2(-x)},${r2(y * 0.7)} ${r2(-x)},0 Z`;
    }
    case "premolar":
      return rute(w, d, w * 0.48);
    case "jeksel":
      return rute(w, d, w * 0.34);
  }
}

/** The grooves on the biting surface. */
export function fure(t: Pick<Tann, "form" | "w" | "d">) {
  const { w, d } = t;
  switch (t.form) {
    case "fortann":
      return `M${r2(-w * 0.32)},${r2(-d * 0.12)} Q0,${r2(-d * 0.3)} ${r2(w * 0.32)},${r2(-d * 0.12)}`;
    case "hjorne":
      return `M${r2(-w * 0.28)},${r2(d * 0.12)} L0,${r2(-d * 0.12)} L${r2(w * 0.28)},${r2(d * 0.12)}`;
    case "premolar":
      return `M${r2(-w * 0.26)},${r2(d * 0.02)} Q0,${r2(-d * 0.1)} ${r2(w * 0.26)},${r2(d * 0.02)}`;
    case "jeksel":
      return `M${r2(-w * 0.3)},${r2(-d * 0.04)} Q${r2(-w * 0.06)},${r2(d * 0.06)} ${r2(w * 0.3)},${r2(-d * 0.02)} M${r2(-w * 0.02)},${r2(-d * 0.3)} Q${r2(w * 0.06)},${r2(-d * 0.02)} ${r2(-w * 0.04)},${r2(d * 0.3)}`;
  }
}

/** The SVG transform that puts a tooth's own units in place. */
export const plassering = (t: Tann, under: boolean) => `translate(${t.x} ${t.y}) rotate(${t.vinkel})${under ? " scale(1 -1)" : ""}`;

/** The inside edge of an arch, from its left back tooth to the right one. */
export function innerkant(tenner: Tann[], inn: number): Pt[] {
  return tenner.map((t) => [r2(t.x - t.ut[0] * (t.d / 2 + inn)), r2(t.y - t.ut[1] * (t.d / 2 + inn))] as Pt);
}
