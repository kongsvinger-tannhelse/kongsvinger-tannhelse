/* The pop-up scenes' drawing kit: the teeth, the instruments, the paper
   colours and a few path helpers. Plain functions and constants that return
   SVG path data, in a plain module so server and client read the same
   values. Every scene is drawn on a page 400 × 480. */

/** Rounded to two decimals: sin/cos differ between server and browser in the last digits, and must hydrate. */
export const r2 = (n: number) => Math.round(n * 100) / 100;

/** A seeded random generator, so every speck is cut the same way on every render. */
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

/** A soft round blob with a scalloped edge: a speck of bone, a crumb, a cloud's puff. */
export function lauv(cx: number, cy: number, rx: number, ry: number, seed: number, n = 9) {
  const rand = rng(seed);
  const pts: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const a = ((i + (rand() - 0.5) * 0.3) / n) * Math.PI * 2;
    const j = 0.9 + rand() * 0.14;
    pts.push([cx + Math.cos(a) * rx * j, cy + Math.sin(a) * ry * j]);
  }
  let d = `M${r2(pts[0][0])},${r2(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % n];
    const k = 1.32 / Math.cos(Math.PI / n);
    d += ` Q${r2(cx + ((x1 + x2) / 2 - cx) * k)},${r2(cy + ((y1 + y2) / 2 - cy) * k)} ${r2(x2)},${r2(y2)}`;
  }
  return `${d} Z`;
}

/** A four-point paper star. */
export const stjerne = (x: number, y: number, a: number) =>
  `M${x},${r2(y - a)} Q${r2(x + a * 0.15)},${r2(y - a * 0.15)} ${r2(x + a)},${y} Q${r2(x + a * 0.15)},${r2(y + a * 0.15)} ${x},${r2(y + a)} Q${r2(x - a * 0.15)},${r2(y + a * 0.15)} ${r2(x - a)},${y} Q${r2(x - a * 0.15)},${r2(y - a * 0.15)} ${x},${r2(y - a)} Z`;

/** A snowflake of six strokes, for the cold. */
export const snofnugg = (x: number, y: number, a: number) =>
  [0, 60, 120]
    .map((v) => {
      const rad = (v * Math.PI) / 180;
      const dx = r2(Math.cos(rad) * a);
      const dy = r2(Math.sin(rad) * a);
      return `M${r2(x - dx)},${r2(y - dy)} L${r2(x + dx)},${r2(y + dy)}`;
    })
    .join(" ");

/** A drop of water, its point up. */
export const draape = (x: number, y: number, a: number) =>
  `M${x},${r2(y - a * 1.5)} C${r2(x + a * 0.5)},${r2(y - a * 0.7)} ${r2(x + a)},${r2(y - a * 0.1)} ${r2(x + a)},${r2(y + a * 0.35)} A${a},${a} 0 0 1 ${r2(x - a)},${r2(y + a * 0.35)} C${r2(x - a)},${r2(y - a * 0.1)} ${r2(x - a * 0.5)},${r2(y - a * 0.7)} ${x},${r2(y - a * 1.5)} Z`;

/* ── The teeth ──
   Each in its own units, with the gum line at y = 0 and the crown upwards. */

/** A molar, 100 wide. */
export const JEKSEL = {
  /** Crown and two roots. */
  tann: "M-50,-6 C-54,-40 -50,-80 -38,-96 C-30,-106 -18,-104 -12,-92 C-6,-100 6,-100 12,-92 C18,-104 30,-106 38,-96 C50,-80 54,-40 50,-6 C48,14 44,40 36,70 C33,80 24,80 22,70 L12,26 C8,18 -8,18 -12,26 L-22,70 C-24,80 -33,80 -36,70 C-44,40 -48,14 -50,-6 Z",
  /** The shaded side of the whole tooth. */
  skygge: "M38,-96 C50,-80 54,-40 50,-6 C48,14 44,40 36,70 C33,80 24,80 22,70 L28,36 C36,8 40,-30 36,-66 C35,-80 36,-90 38,-96 Z",
  /** Only the crown, above the gum. */
  krone: "M-50,-6 C-54,-40 -50,-80 -38,-96 C-30,-106 -18,-104 -12,-92 C-6,-100 6,-100 12,-92 C18,-104 30,-106 38,-96 C50,-80 54,-40 50,-6 Z",
  /** The shaded side of the crown alone. */
  kroneSkygge: "M38,-96 C50,-80 54,-40 50,-6 L38,-6 C40,-40 40,-72 34,-90 Z",
  /** The groove between the cusps. */
  fure: "M-26,-84 Q-12,-74 0,-84 Q12,-74 26,-84",
  /** The roots alone, below the gum. */
  rotter: "M-50,-6 L50,-6 C48,14 44,40 36,70 C33,80 24,80 22,70 L12,26 C8,18 -8,18 -12,26 L-22,70 C-24,80 -33,80 -36,70 C-44,40 -48,14 -50,-6 Z",
};

/** The pulp of the molar: the chamber under the cusps and a canal down each root. */
export const PULPA =
  "M-24,-46 C-26,-66 -14,-72 -9,-58 C-4,-50 4,-50 9,-58 C14,-72 26,-66 24,-46 C23,-30 20,-14 18,-2 C20,20 26,44 28,66 C28,71 25,71 24,66 C20,46 14,22 8,6 C4,2 -4,2 -8,6 C-14,22 -20,46 -24,66 C-25,71 -28,71 -28,66 C-26,44 -20,20 -18,-2 C-20,-14 -23,-30 -24,-46 Z";

/** A molar ground down for a crown: a short tapered stump. */
export const STUBB = {
  tann: "M-40,-6 C-42,-28 -36,-50 -26,-58 C-12,-64 12,-64 26,-58 C36,-50 42,-28 40,-6 C40,14 38,40 32,68 C30,78 22,78 20,68 L12,26 C8,18 -8,18 -12,26 L-20,68 C-22,78 -30,78 -32,68 C-38,40 -40,14 -40,-6 Z",
  skygge: "M26,-58 C36,-50 42,-28 40,-6 C40,14 38,40 32,68 C30,78 22,78 20,68 L26,36 C32,10 34,-24 28,-46 C27,-52 26,-56 26,-58 Z",
};

/** A front tooth, 60 wide, seen from the front. */
export const FORTANN = {
  tann: "M-21,-4 C-25,-26 -30,-52 -29,-76 C-29,-88 -26,-95 -16,-96 L16,-96 C26,-95 29,-88 29,-76 C30,-52 25,-26 21,-4 C19,24 12,62 5,80 C3,86 -3,86 -5,80 C-12,62 -19,24 -21,-4 Z",
  skygge: "M16,-96 C26,-95 29,-88 29,-76 C30,-52 25,-26 21,-4 C19,24 12,62 5,80 C3,86 -1,86 0,80 C8,54 15,20 16,-14 C18,-48 19,-78 16,-96 Z",
  krone: "M-21,-4 C-25,-26 -30,-52 -29,-76 C-29,-88 -26,-95 -16,-96 L16,-96 C26,-95 29,-88 29,-76 C30,-52 25,-26 21,-4 Z",
  kroneSkygge: "M16,-96 C26,-95 29,-88 29,-76 C30,-52 25,-26 21,-4 L15,-4 C18,-30 20,-62 16,-96 Z",
  /** The faint line where the biting edge catches the light. */
  glans: "M-17,-84 Q-17,-62 -15,-40",
};

/**
 * An implant: a tapered screw with its threads, the abutment on top. In its
 * own units: 40 wide at the head, the head at y = 0, pointing down.
 */
export function implantat(lengde = 110) {
  const gjenger: string[] = [];
  const n = Math.round(lengde / 11);
  for (let i = 0; i < n; i++) {
    const y = 8 + (i * (lengde - 18)) / n;
    const half = 18 - (i / n) * 7;
    gjenger.push(`M${r2(-half - 3)},${r2(y)} L${r2(half + 3)},${r2(y + 5)}`);
  }
  return {
    skrue: `M-18,0 L18,0 L${r2(11)},${r2(lengde - 8)} Q0,${r2(lengde + 4)} -11,${r2(lengde - 8)} Z`,
    gjenger: gjenger.join(" "),
    distanse: "M-10,0 L-8,-26 L8,-26 L10,0 Z",
  };
}

/* ── Colours ──
   The paper, from the site's own tokens out: Glomma's slate, limestone
   paper, birch green, the clinic's teal, and what a mouth needs. */

export const FARGE = {
  hvit: "#FFFFFF",
  blek: "#E7E8E2",
  bjork: "#A7B88A",
  glomma: "#22404D",
  dyp: "#16303B",
  teal: "#2DA4B4",
  metall: "#C9D2D3",
  metallMork: "#98A5A8",
  /** The tooth's shaded side. */
  skyggeside: "#DCE3E4",
  /** The groove line on a crown. */
  fure: "#BFCACC",
  tannkjott: "#E7AFA6",
  tannkjottMork: "#D18E85",
  /** Gum that is red and sore. */
  sart: "#D97A6C",
  ben: "#EFE3CC",
  benMork: "#E2D0AE",
  benStrek: "#D8C49C",
  /** Dentin, under the enamel: a ground-down stump, an exposed root. */
  dentin: "#EEDFC2",
  dentinMork: "#DCC8A2",
  /** Decay. */
  hull: "#6B4A3A",
  smerte: "#D9634C",
  rav: "#E9A15A",
  /** The clinic's blue paper bib. */
  smekke: "#5FA9B7",
  smekkeStrek: "#4E95A4",
  /** The lamp's warm light. */
  lys: "#FFF1C9",
  /** A fresh tooth-coloured filling. */
  fylling: "#EAF5F7",
  /** Cold. */
  kulde: "#8CC8D8",
  /** The paper's own colour, under the print. */
  papir: "#FBF8F1",
} as const;

/** The tint each group's scenes are printed in: a pale disc and a dotted ring. */
export const TONE = {
  ordinaer: { flate: "#E1EFF1", ring: FARGE.teal, ringStyrke: 0.45 },
  akutt: { flate: "#F8E4DB", ring: FARGE.smerte, ringStyrke: 0.4 },
  estetisk: { flate: "#ECF1E2", ring: FARGE.bjork, ringStyrke: 0.7 },
} as const;

export type Gruppe = keyof typeof TONE;
