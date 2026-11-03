# Kongsvinger Tannhelse

Ny nettside for Kongsvinger Tannhelse (tannlegene Hafthun og Zia, Fjellgata 4). Erstatter kongsvingertannhelse.no.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion.

```bash
npm ci
npm run dev     # http://localhost:3201
npm run build && npm run start   # http://localhost:3200
```

## Innhold

- `src/data/klinikk.ts` — fakta om klinikken, behandlinger, bilder og fotokreditt.
- `src/components/forside/` — forsiden. Toppen («Snitt») har navnet til venstre, behandlingsrommet til høyre bak en skrå kant,
  og nederst tegningen av utsikten over Glomma (`utsikt/tegnet.webp`, laget med `tools/tegn_hero.py`).
  På mobil og nettbrett er toppen én skjerm høy: rammen under teksten åpner på tegningen, og så feies bildet inn (`Bytte.tsx`).
- `crawl/` — alt innholdet fra den gamle nettsiden, hentet med Crawl4AI (`tools/crawl_site.py`). `crawl/SITE-BRIEF.md` er sammendraget.

## Bilder

- Utsikten fra Kongsvinger festning: «View from the Kongsvinger Fortress, Hedmark, Norway» av SiljeAO,
  [Pexels](https://www.pexels.com/photo/view-from-the-kongsvinger-fortress-hedmark-norway-14777353/) (Pexels-lisens).
- Bildene fra klinikken er klinikkens egne, fra den gamle nettsiden. Behandlingsrommet i toppen
  (`public/images/klinikk/behandlingsrom.webp`) er klinikkens egen oppskalering av `bilde6`.

Forsiden bruker AI-retusjerte varianter (`*-polert.webp`) av behandlingsrommet og de tre ansattportrettene.
Originalbildene er beholdt. Retusjen endrer lys og fargetoner, og portrettene har en felles nøytral bakgrunn.

Om oss-galleriet bruker retusjerte `bilde{1,3,6,8,9}-polert.webp` (2400 × 1920).
Umairs portrett bruker `zia-retusjert.webp` på forsiden og Om oss, med dempede
skygger under øynene. Bildene er redigert med det innebygde ImageGen-verktøyet;
promptene ligger i `tools/photo-retouch-prompts.json`. Originalene er beholdt.
Skogen på Om oss er ferdig tegnet på serveren og vises uten innlastingsanimasjon.
