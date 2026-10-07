/* The «Om oss» drawing's kit: path helpers for the hill, the spruce, the
   clouds and the old town's houses, and the paper colours. A plain module,
   so server and client read the same values. (The fortress itself is a
   drawn file: public/images/tegninger/festning.svg, from tools/tegn_festning.py.) */

/** Rounded to two decimals: sin/cos differ between server and browser in the last digits, and must hydrate. */
export const r2 = (n: number) => Math.round(n * 100) / 100;

/** A seeded random generator, so every tree is cut the same way on every render. */
export function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export type Pt = readonly [number, number];

/** A smooth line through the points (Catmull-Rom as cubic curves). */
export function kurve(pts: readonly Pt[], k = 0.5) {
  let d = `M${r2(pts[0][0])},${r2(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + ((p2[0] - p0[0]) * k) / 3, p1[1] + ((p2[1] - p0[1]) * k) / 3];
    const c2 = [p2[0] - ((p3[0] - p1[0]) * k) / 3, p2[1] - ((p3[1] - p1[1]) * k) / 3];
    d += ` C${r2(c1[0])},${r2(c1[1])} ${r2(c2[0])},${r2(c2[1])} ${r2(p2[0])},${r2(p2[1])}`;
  }
  return d;
}

/**
 * A spruce: a narrow, tiered cone with drooping branch tips, the tree of the
 * forests around Kongsvinger. `x` is the trunk, `y` the ground.
 */
export function gran(x: number, y: number, h: number, w = h * 0.42, seed = 1) {
  const rand = rng(seed);
  const lag = 5;
  const top = y - h;
  const fot = y - h * 0.08;
  const steg = (fot - top) / lag;
  // Each tier: its drooping tip, and the point it tucks back in to above it.
  const tier = Array.from({ length: lag }, (_, k) => {
    const t = (k + 1) / lag;
    const half = (w / 2) * (0.22 + 0.78 * t) * (0.9 + rand() * 0.2);
    return { ty: top + steg * (k + 1), half, inn: half * 0.52, iy: top + steg * (k + 1) - steg * 0.3 };
  });
  const p = (px: number, py: number) => `${r2(px)},${r2(py)}`;
  const venstre = tier.flatMap((t, k) => (k < lag - 1 ? [p(x - t.half, t.ty), p(x - t.inn, t.iy)] : [p(x - t.half, t.ty)]));
  const hoyre = tier
    .slice()
    .reverse()
    .flatMap((t, k) => (k > 0 ? [p(x + t.inn, t.iy), p(x + t.half, t.ty)] : [p(x + t.half, t.ty)]));
  const st = Math.max(0.8, w * 0.06);
  // down the left side, round the trunk, up the right side
  return `M${p(x, top)} L${venstre.join(" L")} L${p(x - st, fot)} L${p(x - st, y)} L${p(x + st, y)} L${p(x + st, fot)} L${hoyre.join(" L")} Z`;
}

/** A soft cloud: a row of bumps on a flat underside. */
export function sky(x: number, y: number, w: number, h: number) {
  const b = w / 4;
  return `M${r2(x)},${r2(y)} Q${r2(x - b * 0.1)},${r2(y - h * 0.55)} ${r2(x + b * 0.8)},${r2(y - h * 0.5)} Q${r2(x + b * 1.2)},${r2(y - h * 1.15)} ${r2(x + b * 2.1)},${r2(y - h * 0.85)} Q${r2(x + b * 2.9)},${r2(y - h * 1.05)} ${r2(x + b * 3.15)},${r2(y - h * 0.45)} Q${r2(x + w + b * 0.15)},${r2(y - h * 0.4)} ${r2(x + w)},${r2(y)} Z`;
}

/** A gabled wooden house, as in Øvrebyen. `x`,`y` is the left foot. */
export function hus(x: number, y: number, b: number, h: number, tak = h * 0.7) {
  return {
    vegg: `M${r2(x)},${r2(y)} L${r2(x)},${r2(y - h)} L${r2(x + b)},${r2(y - h)} L${r2(x + b)},${r2(y)} Z`,
    tak: `M${r2(x - 2)},${r2(y - h)} L${r2(x + b / 2)},${r2(y - h - tak)} L${r2(x + b + 2)},${r2(y - h)} Z`,
  };
}

/** The drawing's colours. */
export const FARGE = {
  hvit: "#FFFFFF",
  bjork: "#A7B88A",
  gronnLys: "#C7D3AE",
  gran: "#4C6B5A",
} as const;
