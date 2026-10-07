/* The bridge drawing: its three layers and the ways the page crops it. All in
   the coordinates of tools/tegn_brua.py, which are the reference photo's
   (1544 × 586); the scene carries on past the photo on every side. Plain data,
   so server and client read the same numbers. */

export type Boks = { x: number; y: number; b: number; h: number };

/** Each layer's own box, as the generator writes it (its LAG). */
export const LAG = {
  scene: { x: -260, y: -140, b: 2080, h: 840 },
  bjork: { x: -270, y: 15, b: 560, h: 700 },
  furu: { x: 780, y: -160, b: 1080, h: 340 },
} as const satisfies Record<string, Boks>;

/** The crops: wide screens and phones. */
export const UTSNITT = {
  bred: { x: -90, y: 0, b: 1730, h: 600 },
  smal: { x: 560, y: 10, b: 770, h: 580 },
} as const satisfies Record<string, Boks>;

export type Utsnitt = keyof typeof UTSNITT;

/** Does the crop show any of the layer? */
export function viser(lag: Boks, u: Boks) {
  return lag.x < u.x + u.b && lag.x + lag.b > u.x && lag.y < u.y + u.h && lag.y + lag.h > u.y;
}

// A small seeded generator, so the glints land in the same places every time.
function tilfeldig(frø: number) {
  let s = frø;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// The sandbar's lower edge (from the generator's SAND_BUNN), to keep glints off the sand.
const SAND = [
  [930, 418], [1020, 424], [1100, 433], [1180, 447], [1232, 462], [1262, 489], [1300, 497], [1470, 514], [1700, 534], [1840, 548],
] as const;

function sandbunn(x: number) {
  for (let i = 1; i < SAND.length; i++) {
    const [xa, ya] = SAND[i - 1];
    const [xb, yb] = SAND[i];
    if (x <= xb) return ya + ((yb - ya) * (x - xa)) / (xb - xa);
  }
  return SAND[SAND.length - 1][1];
}

const r = tilfeldig(11);

/** Where the light catches the open water: short dashes, longer nearer the viewer. */
export const GLIMT = Array.from({ length: 64 }, () => {
  let x = 0;
  let y = 0;
  do {
    x = 272 + r() * 1540;
    y = 418 + r() * 274;
  } while (x > 925 && y < sandbunn(x) + 12);
  const naer = (y - 418) / 274;
  return {
    x: Math.round(x * 10) / 10,
    y: Math.round(y * 10) / 10,
    b: Math.round((5 + naer * 20) * (0.6 + r() * 0.8) * 10) / 10,
    h: Math.round((1.1 + naer * 1.1) * 10) / 10,
    forsinkelse: Math.round(r() * 70) / 10,
    varighet: Math.round((40 + r() * 36)) / 10,
  };
});

/** Longer, faint bands drifting over the bridge's reflection. */
export const BOLGER = Array.from({ length: 12 }, () => ({
  x: Math.round(300 + r() * 560),
  y: Math.round(468 + r() * 130),
  b: Math.round(40 + r() * 90),
  forsinkelse: Math.round(r() * 90) / 10,
}));
