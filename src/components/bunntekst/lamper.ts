/* The bridge's lamps, where tools/tegn_brua.py draws them (its `lykt` calls),
   so the evening can light them in the same place. Plain data. */

/** The deck's lower chord, as in the generator. */
const dekk = (x: number) => 319.5 + (x - 210) * 0.0034;

export type Lampe = { x: number; y: number; langt: boolean; speil: { y0: number; y1: number } | null };

// near side: posts at x, 46 tall over the railing, arm toward the road
const NAER: [number, number][] = [[358, 1], [520, 1], [685, 1], [692, -1], [963, 1], [1148, 1], [1316, 1], [1332, -1]];
// far side: 44 tall, 2.5 to the right and 6 up
const LANGT = [300, 465, 632, 742, 905, 1057, 1240, 1405];

/** Where a lamp's light lands on the water below it: open river left of the bank, the inlet under the bowstring, nothing over land. */
function speil(x: number) {
  if (x < 930) return { y0: 410, y1: 474 };
  if (x < 1140) return { y0: 350, y1: 404 };
  return null;
}

export const LAMPER: Lampe[] = [
  ...NAER.map(([x, side]) => ({ x: x + 4.6 * side, y: dekk(x) - 6.8 - 46 - 2.6, langt: false, speil: speil(x) })),
  ...LANGT.map((x) => ({ x: x + 7.1, y: dekk(x) - 9.5 - 44 - 2.6, langt: true, speil: speil(x) })),
]
  .map((l) => ({ ...l, x: Math.round(l.x * 10) / 10, y: Math.round(l.y * 10) / 10 }))
  .sort((a, b) => a.x - b.x);

/** Slices of a lamp's reflection: short dashes, fainter and more broken further down. */
export function speilbiter(l: Lampe) {
  if (!l.speil) return [];
  const { y0, y1 } = l.speil;
  const biter: { x: number; y: number; b: number; o: number }[] = [];
  let i = 0;
  for (let y = y0; y < y1; y += 4.2) {
    const t = (y - y0) / (y1 - y0);
    const skyv = (((i * 37) % 7) - 3) * 0.45 * (0.4 + t);
    biter.push({ x: Math.round((l.x + skyv) * 10) / 10, y, b: Math.round((3.4 - t * 1.6) * 10) / 10, o: Math.round((0.75 - t * 0.6) * 100) / 100 });
    i++;
  }
  return biter;
}
