import { kurve, lauv, r2, rng, type Pt } from "@/components/forside/behandlinger/popup/tegning";

/* The forest's drawing kit: the trees and the forest floor around
   Kongsvinger (spruce, pine, birch, moss, heather, blueberries, ferns,
   stones), as plain functions that return SVG path data. A plain module, so
   server and browser draw the same forest. Every tree is cut from paper in
   two tones, a shaded left half and a lit right half, like the treatment
   scenes. */

export { r2, rng };

/** The forest's colours, by distance: the far ones fade into the sky. */
export const SKOG = {
  /** far, middle, near and nearest: [shaded half, lit half] */
  fjern: ["#C3CEC6", "#CFD8D1"],
  midt: ["#8FA796", "#A3B8A8"],
  naer: ["#4E6C5A", "#628270"],
  stamme: "#6E4E38",
  gress: ["#C8D3AE", "#B9C99C", "#A8BC8A"],
  mose: ["#7F9A5C", "#93AE6C"],
  lyng: "#5F7A55",
  lyngblomst: "#B98AA6",
  blabaer: "#3E4F86",
  tyttebaer: "#C2413A",
  stein: ["#A9ABA3", "#C3C4BD"],
} as const;

export type Tone = readonly [string, string];

/**
 * A spruce: tiers of boughs that lift from the trunk and droop at the tips,
 * wider towards the foot. Returned as its two halves (each closes along the
 * trunk with a pixel of overlap, so no seam shows) and the trunk below.
 */
export function gran(x: number, y: number, h: number, w: number, seed: number) {
  const rand = rng(seed);
  const topp = y - h;
  const fot = y - h * 0.07;
  const n = Math.max(7, Math.min(16, Math.round(h / 20)));
  const gap = (fot - topp) / n;

  const halv = (s: 1 | -1) => {
    let d = `M${r2(x + s * -1)},${r2(topp)} L${r2(x)},${r2(topp)}`;
    for (let i = 0; i < n; i++) {
      const t = (i + 1) / n;
      const ww = (w / 2) * (0.1 + 0.9 * t ** 0.92) * (0.84 + rand() * 0.26);
      const innerY = topp + gap * (i + 0.45);
      const innerX = x + s * ww * (0.28 + rand() * 0.14);
      const tipX = x + s * ww;
      const tipY = topp + gap * (i + 1) + gap * (0.05 + rand() * 0.3);
      // the underside of the bough above, in to the notch
      d += ` L${r2(innerX)},${r2(innerY)}`;
      // the top of this bough, lifting and then hanging to the tip
      d += ` Q${r2(x + s * ww * 0.72)},${r2(innerY - gap * 0.12)} ${r2(tipX)},${r2(tipY)}`;
      // a little serration at the tip
      d += ` L${r2(tipX - s * ww * 0.1)},${r2(tipY - gap * 0.18)} L${r2(tipX - s * ww * 0.14)},${r2(tipY + gap * 0.08)}`;
    }
    d += ` L${r2(x + s * w * 0.05)},${r2(fot)} L${r2(x + s * -1)},${r2(fot)} Z`;
    return d;
  };

  const sw = Math.max(2, w * 0.07);
  return {
    skygge: halv(-1),
    lys: halv(1),
    stamme: `M${r2(x - sw / 2)},${r2(fot - 4)} L${r2(x + sw / 2)},${r2(fot - 4)} L${r2(x + sw * 0.6)},${r2(y)} L${r2(x - sw * 0.6)},${r2(y)} Z`,
  };
}

/** A strip of ground: a soft line through points across, filled down to `bunn`. */
export function bakke(fra: number, til: number, hoyde: (x: number) => number, bunn: number, steg = 40) {
  const pts: Pt[] = [];
  for (let x = fra; x <= til + 0.1; x += steg) pts.push([x, hoyde(x)]);
  return `${kurve(pts)} L${r2(til)},${r2(bunn)} L${r2(fra)},${r2(bunn)} Z`;
}

/** A low tussock of moss or heather, flat underneath. */
export function tue(cx: number, y: number, b: number, h: number, seed: number) {
  const rand = rng(seed);
  const n = 5 + Math.floor(b / 18);
  let d = `M${r2(cx - b / 2)},${r2(y)}`;
  for (let i = 1; i <= n; i++) {
    const x0 = cx - b / 2 + (b * (i - 1)) / n;
    const x1 = cx - b / 2 + (b * i) / n;
    const t = (i - 0.5) / n;
    const top = y - h * Math.sin(Math.PI * t) ** 0.7 * (0.75 + rand() * 0.35);
    d += ` Q${r2((x0 + x1) / 2)},${r2(top - h * 0.25)} ${r2(x1)},${r2(i === n ? y : y - h * Math.sin(Math.PI * (i / n)) ** 0.7 * 0.7)}`;
  }
  return `${d} Z`;
}

/** Dots on a tussock: berries or heather flowers, in a seeded scatter over its top half. */
export function prikker(cx: number, y: number, b: number, h: number, antall: number, seed: number) {
  const rand = rng(seed);
  const ut: Pt[] = [];
  for (let i = 0; i < antall; i++) {
    const t = rand();
    const x = cx - b / 2 + b * (0.12 + t * 0.76);
    const topp = h * Math.sin(Math.PI * (0.12 + t * 0.76)) ** 0.7;
    ut.push([r2(x), r2(y - topp * (0.35 + rand() * 0.55))]);
  }
  return ut;
}

/**
 * A fern: a curved spine and leaflets in pairs, shorter towards the tip.
 * `retning` 1 leans right, -1 leans left.
 */
export function bregne(x: number, y: number, l: number, retning: 1 | -1, seed: number) {
  const rand = rng(seed);
  const pts: Pt[] = [];
  const n = 13;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    pts.push([x + retning * l * 0.55 * t ** 1.8, y - l * Math.sin(t * 1.25) * 0.95]);
  }
  const spine = kurve(pts);
  let blad = "";
  for (let i = 1; i < n; i++) {
    const [px, py] = pts[i];
    const [qx, qy] = pts[i + 1];
    const ang = Math.atan2(qy - py, qx - px);
    const len = l * 0.2 * (1 - i / n) ** 0.8 * (0.9 + rand() * 0.2);
    for (const side of [-1, 1]) {
      const a = ang + side * (Math.PI / 2.6);
      const ex = px + Math.cos(a) * len;
      const ey = py + Math.sin(a) * len;
      const nx = Math.cos(ang) * len * 0.22;
      const ny = Math.sin(ang) * len * 0.22;
      blad += ` M${r2(px)},${r2(py)} Q${r2((px + ex) / 2 + nx)},${r2((py + ey) / 2 + ny)} ${r2(ex)},${r2(ey)} Q${r2((px + ex) / 2 - nx)},${r2((py + ey) / 2 - ny)} ${r2(px)},${r2(py)} Z`;
    }
  }
  return { spine, blad: blad.trim() };
}

/** A grey stone, half sunk into the ground, with its lit top. */
export function stein(cx: number, y: number, b: number, seed: number) {
  const h = b * 0.55;
  return {
    stein: lauv(cx, y - h * 0.3, b / 2, h * 0.6, seed, 9),
    lys: lauv(cx + b * 0.06, y - h * 0.52, b * 0.32, h * 0.3, seed + 3, 7),
  };
}

/** A pine cone lying on its side. */
export function kongle(x: number, y: number, s: number, vinkel: number) {
  const c = Math.cos(vinkel);
  const si = Math.sin(vinkel);
  const p = (dx: number, dy: number) => `${r2(x + dx * c - dy * si)},${r2(y + dx * si + dy * c)}`;
  const kropp = `M${p(-s, 0)} C${p(-s, -s * 0.5)} ${p(s * 0.7, -s * 0.55)} ${p(s, 0)} C${p(s * 0.7, s * 0.55)} ${p(-s, s * 0.5)} ${p(-s, 0)} Z`;
  let skjell = "";
  for (let i = -2; i <= 2; i++) skjell += ` M${p(i * s * 0.3, -s * 0.4)} Q${p(i * s * 0.3 + s * 0.18, 0)} ${p(i * s * 0.3, s * 0.4)}`;
  return { kropp, skjell: skjell.trim() };
}

/** A brown-capped mushroom (a steinsopp) on its pale stem. */
export function sopp(x: number, y: number, s: number) {
  return {
    fot: `M${r2(x - s * 0.32)},${r2(y)} C${r2(x - s * 0.42)},${r2(y - s * 0.5)} ${r2(x - s * 0.26)},${r2(y - s * 0.9)} ${r2(x - s * 0.2)},${r2(y - s * 1.05)} L${r2(x + s * 0.2)},${r2(y - s * 1.05)} C${r2(x + s * 0.26)},${r2(y - s * 0.9)} ${r2(x + s * 0.42)},${r2(y - s * 0.5)} ${r2(x + s * 0.32)},${r2(y)} Z`,
    hatt: `M${r2(x - s * 0.72)},${r2(y - s * 0.98)} C${r2(x - s * 0.74)},${r2(y - s * 1.55)} ${r2(x + s * 0.74)},${r2(y - s * 1.55)} ${r2(x + s * 0.72)},${r2(y - s * 0.98)} Q${r2(x)},${r2(y - s * 0.86)} ${r2(x - s * 0.72)},${r2(y - s * 0.98)} Z`,
    lys: `M${r2(x - s * 0.1)},${r2(y - s * 1.36)} C${r2(x + s * 0.2)},${r2(y - s * 1.42)} ${r2(x + s * 0.5)},${r2(y - s * 1.3)} ${r2(x + s * 0.58)},${r2(y - s * 1.12)} C${r2(x + s * 0.4)},${r2(y - s * 1.22)} ${r2(x + s * 0.15)},${r2(y - s * 1.3)} ${r2(x - s * 0.1)},${r2(y - s * 1.36)} Z`,
  };
}
