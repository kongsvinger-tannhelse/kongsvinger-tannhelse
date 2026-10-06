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
- `src/components/forside/` — forsiden. Toppen («Langs elva») bruker utsikten fra Kongsvinger festning, delt i to dybder.
- `src/components/forside/utsikt/lag.py` — lager dybdelagene `far.webp` / `near.webp` fra originalen i `kilder/`
  (`.venv-crawl/Scripts/python.exe src/components/forside/utsikt/lag.py`; trenger Pillow, numpy og opencv-python-headless).
- `crawl/` — alt innholdet fra den gamle nettsiden, hentet med Crawl4AI (`tools/crawl_site.py`). `crawl/SITE-BRIEF.md` er sammendraget.

## Bilder

- Utsikten fra Kongsvinger festning: «View from the Kongsvinger Fortress, Hedmark, Norway» av SiljeAO,
  [Pexels](https://www.pexels.com/photo/view-from-the-kongsvinger-fortress-hedmark-norway-14777353/) (Pexels-lisens).
- Bildene fra klinikken er klinikkens egne, fra den gamle nettsiden.
