"use client";

import Image, { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { Images } from "lucide-react";
import { klinikk, klinikkbilder } from "@/data/klinikk";
import { Galleri } from "@/components/forside/Galleri";
import { useHeroKlar } from "@/components/forside/useHeroKlar";
import s from "./punktene.module.css";

const KOL = 110;
const RAD = 88; // 5:4, like the photographs
const ANTALL = KOL * RAD;
const VIS = 6500; // ms a room rests before it lets go
const UTVALG = [0, 1, 3, 2, 4]; // the rooms, in order

const URL_LITEN = klinikkbilder.map(
  (b) => getImageProps({ src: b.src, alt: "", width: 384, height: Math.round((384 * b.hoyde) / b.bredde), quality: 75 }).props.src
);

const ease = {
  ut: (t: number) => 1 - Math.pow(1 - t, 3),
  innUt: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
};
const klem = (x: number) => Math.min(1, Math.max(0, x));

/** The colour of every point, for one photograph, packed for an ImageData buffer (0xBBGGRR). */
async function farger(src: string): Promise<Uint32Array> {
  const img = new window.Image();
  img.decoding = "async";
  img.src = src;
  await img.decode();
  const c = document.createElement("canvas");
  c.width = KOL;
  c.height = RAD;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  // cover-crop to 5:4
  const ar = img.naturalWidth / img.naturalHeight;
  const sw = ar > 1.25 ? img.naturalHeight * 1.25 : img.naturalWidth;
  const sh = ar > 1.25 ? img.naturalHeight : img.naturalWidth / 1.25;
  ctx.drawImage(img, (img.naturalWidth - sw) / 2, (img.naturalHeight - sh) / 2, sw, sh, 0, 0, KOL, RAD);
  const d = ctx.getImageData(0, 0, KOL, RAD).data;
  const ut = new Uint32Array(ANTALL);
  for (let i = 0; i < ANTALL; i++) ut[i] = (d[i * 4 + 2] << 16) | (d[i * 4 + 1] << 8) | d[i * 4];
  return ut;
}

/**
 * E — «Punktene». Some ten thousand points of light gather out of the sky
 * over Glomma and settle into the treatment room, and then the room comes
 * sharp. Every few seconds the points let go, drift, and gather again as the
 * next room. Put the pointer on it and the room comes apart around it, and
 * closes again when you leave.
 *
 * The points are written straight into one pixel buffer per frame and put on
 * the canvas in a single call. Drawing ten thousand rectangles one by one cost
 * ~16 ms a frame in testing; the buffer costs a fraction of that.
 */
export function Punktene() {
  const klar = useHeroKlar(3500);
  const lerret = useRef<HTMLCanvasElement | null>(null);
  const [nr, setNr] = useState(0); // position in UTVALG
  const [skarp, setSkarp] = useState(false); // the real photo shown on top
  const [apen, setApen] = useState<number | null>(null);
  const styring = useRef({ pause: false, peker: null as null | { x: number; y: number } });

  useEffect(() => {
    if (!klar) return;
    const canvas = lerret.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const redusert = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stoppet = false;
    let raf = 0;

    // geometry in CSS px; the buffer is in device px
    let W = 0, H = 0, celle = 0, dpr = 1, BW = 0, BH = 0, side = 1;
    let bilde = ctx.createImageData(1, 1);
    let buf = new Uint32Array(bilde.data.buffer);
    const tx = new Float32Array(ANTALL), ty = new Float32Array(ANTALL);
    const sx = new Float32Array(ANTALL), sy = new Float32Array(ANTALL); // where this move starts
    const mx = new Float32Array(ANTALL), my = new Float32Array(ANTALL); // where it drifts to
    const dx = new Float32Array(ANTALL), dy = new Float32Array(ANTALL); // the pointer's push, eased
    const forsink = new Float32Array(ANTALL);
    const maal = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width;
      H = r.height;
      celle = W / KOL;
      BW = Math.max(1, Math.round(W * dpr));
      BH = Math.max(1, Math.round(H * dpr));
      canvas.width = BW;
      canvas.height = BH;
      bilde = ctx.createImageData(BW, BH);
      buf = new Uint32Array(bilde.data.buffer);
      side = Math.max(1, Math.round(celle * 0.86 * dpr));
      for (let i = 0; i < ANTALL; i++) {
        tx[i] = (i % KOL) * celle;
        ty[i] = Math.floor(i / KOL) * celle;
      }
    };
    maal();

    /** One point: a small square of colour, alpha 0..1. */
    const punkt = (x: number, y: number, rgb: number, a: number) => {
      const px = Math.round(x * dpr);
      const py = Math.round(y * dpr);
      const x0 = px < 0 ? 0 : px;
      const y0 = py < 0 ? 0 : py;
      const x1 = px + side > BW ? BW : px + side;
      const y1 = py + side > BH ? BH : py + side;
      if (x0 >= x1 || y0 >= y1) return;
      const v = ((((a * 255) | 0) << 24) | rgb) >>> 0;
      for (let yy = y0; yy < y1; yy++) {
        const rad = yy * BW;
        for (let xx = x0; xx < x1; xx++) buf[rad + xx] = v;
      }
    };
    const vis = () => ctx.putImageData(bilde, 0, 0);

    const bilder: Uint32Array[] = [];
    let gjeldende = 0; // index into UTVALG
    let fase: "samles" | "hviler" | "slipper" = "samles";
    let t0 = performance.now();
    let hvileStart = 0;
    let skyvet = false; // any point still pushed by the pointer

    const start = (naa: number) => {
      // the first gathering: out of the sky, up and to the left of the frame
      for (let i = 0; i < ANTALL; i++) {
        sx[i] = tx[i] - W * (0.2 + Math.random() * 1.1);
        sy[i] = ty[i] - H * (0.3 + Math.random() * 0.9);
        forsink[i] = Math.random() * 0.55 + ((i % KOL) / KOL) * 0.45;
      }
      fase = "samles";
      t0 = naa;
    };

    const slipp = (naa: number) => {
      for (let i = 0; i < ANTALL; i++) {
        const v = Math.random() * Math.PI * 2;
        const r = 18 + Math.random() * 70;
        mx[i] = tx[i] + Math.cos(v) * r - 20;
        my[i] = ty[i] + Math.sin(v) * r - 30;
        forsink[i] = Math.random() * 0.35;
      }
      fase = "slipper";
      t0 = naa;
    };

    const ramme = (naa: number) => {
      if (stoppet) return;
      const f = bilder[gjeldende];
      const p = styring.current.peker;

      // the pointer's push: points flee it a little, with a swirl, then come back
      if (p || skyvet) {
        skyvet = false;
        const R = 72;
        const midt = celle / 2;
        for (let i = 0; i < ANTALL; i++) {
          let mdx = 0;
          let mdy = 0;
          if (p) {
            const ex = tx[i] + midt - p.x;
            const ey = ty[i] + midt - p.y;
            const avst = Math.sqrt(ex * ex + ey * ey);
            if (avst < R) {
              const k = (1 - avst / R) * (1 - avst / R) * 34;
              const ux = ex / (avst || 1);
              const uy = ey / (avst || 1);
              mdx = ux * k - uy * k * 0.35;
              mdy = uy * k + ux * k * 0.35;
            }
          }
          dx[i] += (mdx - dx[i]) * 0.16;
          dy[i] += (mdy - dy[i]) * 0.16;
          if (dx[i] > 0.05 || dx[i] < -0.05 || dy[i] > 0.05 || dy[i] < -0.05) skyvet = true;
        }
      }

      const t = (naa - t0) / 1000;
      if (fase === "samles") {
        buf.fill(0);
        const varighet = 1.7;
        for (let i = 0; i < ANTALL; i++) {
          const u = t - forsink[i];
          const a = klem((u / varighet) * 1.6);
          if (a <= 0.01) continue;
          const e = ease.ut(klem(u / varighet));
          punkt(sx[i] + (tx[i] - sx[i]) * e + dx[i], sy[i] + (ty[i] - sy[i]) * e + dy[i], f[i], a);
        }
        vis();
        if (t > 1.7 + 1.0 + 0.1) {
          fase = "hviler";
          hvileStart = naa;
          setSkarp(true);
        }
      } else if (fase === "slipper") {
        // out to a drift, then back in as the next room (colours swap while they are apart)
        const forrige = bilder[(gjeldende - 1 + bilder.length) % bilder.length];
        buf.fill(0);
        for (let i = 0; i < ANTALL; i++) {
          const u = t - forsink[i];
          let x: number;
          let y: number;
          if (u < 0.7) {
            const e = ease.ut(klem(u / 0.7));
            x = tx[i] + (mx[i] - tx[i]) * e;
            y = ty[i] + (my[i] - ty[i]) * e;
          } else {
            const e = ease.innUt(klem((u - 0.7) / 1.0));
            x = mx[i] + (tx[i] - mx[i]) * e;
            y = my[i] + (ty[i] - my[i]) * e;
          }
          punkt(x + dx[i], y + dy[i], u < 0.75 ? forrige[i] : f[i], 1);
        }
        vis();
        if (t > 0.35 + 0.7 + 1.0 + 0.05) {
          fase = "hviler";
          hvileStart = naa;
          setSkarp(true);
        }
      } else {
        // resting: draw only while the pointer is pushing points about
        if (p || skyvet) {
          buf.fill(0);
          for (let i = 0; i < ANTALL; i++) punkt(tx[i] + dx[i], ty[i] + dy[i], f[i], 1);
          vis();
        }
        if (!styring.current.pause && !p && !skyvet && naa - hvileStart > VIS && bilder.length > 1) {
          setSkarp(false);
          gjeldende = (gjeldende + 1) % bilder.length;
          setNr(gjeldende);
          const forrige = bilder[(gjeldende - 1 + bilder.length) % bilder.length];
          buf.fill(0);
          for (let i = 0; i < ANTALL; i++) punkt(tx[i], ty[i], forrige[i], 1);
          vis();
          slipp(naa + 320); // let the sharp photo fade first
        }
      }
      raf = requestAnimationFrame(ramme);
    };

    (async () => {
      // the first room first, so the gathering can begin; the rest while it does
      bilder.push(await farger(URL_LITEN[UTVALG[0]]));
      if (stoppet) return;
      if (redusert) {
        setSkarp(true);
        return;
      }
      start(performance.now());
      raf = requestAnimationFrame(ramme);
      for (const u of UTVALG.slice(1)) {
        bilder.push(await farger(URL_LITEN[u]));
        if (stoppet) return;
      }
    })();

    const nyStorrelse = () => maal();
    window.addEventListener("resize", nyStorrelse);
    return () => {
      stoppet = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", nyStorrelse);
    };
  }, [klar]);

  const indeks = UTVALG[nr];
  const peker = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    if (!styring.current.peker) setSkarp(false);
    styring.current.peker = { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <>
      <div className={s.ramme}>
        <button
          type="button"
          className={s.flate}
          onClick={() => setApen(indeks)}
          onPointerMove={peker}
          onPointerEnter={() => (styring.current.pause = true)}
          onPointerLeave={() => {
            styring.current.pause = false;
            styring.current.peker = null;
            window.setTimeout(() => setSkarp(true), 700);
          }}
          aria-label={`Vis bildene fra klinikken. Nå: ${klinikkbilder[indeks].tekst}`}
        >
          <canvas ref={lerret} className={s.lerret} aria-hidden="true" />
          {UTVALG.map((u, i) => (
            <Image
              key={u}
              src={klinikkbilder[u].src}
              alt=""
              fill
              loading="eager"
              sizes="(min-width: 768px) 460px, 58vw"
              className={s.skarp}
              data-vis={skarp && i === nr}
            />
          ))}
        </button>
        <div className={s.tekst} data-vis={klar}>
          <span>
            <span key={nr} className={s.bytt}>
              {klinikkbilder[indeks].tekst}
            </span>
            <span className="block text-white/70">Fra klinikken i {klinikk.adresse.gate}</span>
          </span>
          <button
            type="button"
            onClick={() => setApen(0)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 font-medium backdrop-blur-md transition-colors hover:bg-white/25"
          >
            <Images className="size-3.5" aria-hidden="true" />
            Se alle {klinikkbilder.length}
          </button>
        </div>
      </div>
      <Galleri indeks={apen} onLukk={() => setApen(null)} onBytt={setApen} />
    </>
  );
}
