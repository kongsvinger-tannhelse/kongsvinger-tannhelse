import { rotfylling } from "./rotfylling";
import { tannbleking } from "./tannbleking";
import { tannfylling } from "./tannfylling";
import { tannimplantat } from "./tannimplantat";
import { tannkrone } from "./tannkrone";
import { tannrens } from "./tannrens";
import { tannsjekk } from "./tannsjekk";
import { visdomstenner } from "./visdomstenner";
import { MED_SIDE } from "./sider";
import type { Behandlingsside } from "./typer";

/* Every treatment that has a page of its own, in the book's order. A plain
   module (see klinikk.ts). The rest are only in the /behandlinger book. */

export const BEHANDLINGSSIDER: Behandlingsside[] = [tannsjekk, tannfylling, tannbleking, tannrens, rotfylling, visdomstenner, tannkrone, tannimplantat];

export const finnBehandlingsside = (slug: string) => BEHANDLINGSSIDER.find((b) => b.slug === slug);

// The light list the links use must name exactly these pages
if (BEHANDLINGSSIDER.map((b) => b.slug).join() !== MED_SIDE.join()) {
  throw new Error("data/behandlinger: MED_SIDE in sider.ts does not match BEHANDLINGSSIDER");
}

export { harSide, sideSti } from "./sider";

export * from "./typer";
export { BGJENNOMGATT } from "./kilder";
