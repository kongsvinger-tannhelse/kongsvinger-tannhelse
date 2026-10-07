"""Lights and enlarges the clinic's photographs for the site.

The photos from the old site are phone pictures taken under the clinic's
ceiling lights: a little dim, a little grey, and only 1200 px wide. This gives
each one the same gentle treatment, the way a photographer would grade a set,
without changing what is in the picture:

  0. a gentle clean-up of the old site's JPEG blocks and phone noise, which
     the later steps would otherwise sharpen into view (rooms only: on skin
     it leaves blotches, so the portraits keep their own texture)
  1. white balance, read from the photo's own near-white surfaces (cabinets,
     counters, coats), so the whites are white and the beige walls stay beige
  2. exposure: the midtones lifted towards a common brightness, the shadows
     opened, the highlights rolled off so nothing burns out
  3. local contrast (CLAHE on lightness), so surfaces and edges read clearly
  4. a little vibrance: the dull colours gain more than the strong ones
  5. twice the size (Lanczos, at most 3200 px), then sharpened on lightness only
  6. a very fine grain, so smooth walls do not break into bands

The masters are in kilder/klinikk/ and are never overwritten; the results go to
public/images/klinikk/ under the same names.

Run from the repo root:  python tools/lys_bilder.py   (needs numpy, opencv-python, Pillow)
"""
import os

import cv2
import numpy as np
from PIL import Image

KILDE = os.path.join("kilder", "klinikk")
MAL = os.path.join("public", "images", "klinikk")
SKALA = 2
MAKS = 3200  # longest side

# Portraits get gentler local contrast, so skin stays soft.
PORTRETT = {"hafthun.jpg", "zia.jpg", "eba.jpg"}


def hvitbalanse(lab):
    """Shift a/b so the photo's near-neutral bright surfaces land on a faint warm white."""
    L, a, b = lab[..., 0], lab[..., 1], lab[..., 2]
    kroma = np.hypot(a, b)
    hvit = (L > 74) & (L < 97) & (kroma < 12)
    if hvit.sum() < 2000:
        return lab
    da = 0.0 - np.median(a[hvit])
    db = 2.5 - np.median(b[hvit])
    lab[..., 1] += 0.6 * da
    lab[..., 2] += 0.6 * db
    return lab


def eksponering(L, maal=0.64):
    """Tone curve on lightness (0–1): lift the midtones, open the shadows, roll off the highlights."""
    median = float(np.median(L))
    gamma = np.clip(np.log(maal) / np.log(max(median, 1e-3)), 0.62, 1.0)  # brighten only
    L = L ** gamma
    L = L + 0.38 * L * (1 - L) ** 2  # shadows and lower mids open up; black stays black
    knee = 0.9
    over = L > knee
    L[over] = knee + (1 - knee) * np.tanh((L[over] - knee) / (1 - knee))
    return np.clip(L, 0, 1)


def lokal_kontrast(L, styrke, clip=1.5):
    clahe = cv2.createCLAHE(clipLimit=clip, tileGridSize=(6, 6))
    L8 = (L * 255).astype(np.uint8)
    lokal = clahe.apply(L8).astype(np.float32) / 255
    # only the detail CLAHE finds, never its darkening of broad walls
    detalj = lokal - cv2.GaussianBlur(lokal, (0, 0), 24)
    return np.clip(L + styrke * detalj, 0, 1)


def vibrance(lab, styrke=0.16):
    a, b = lab[..., 1], lab[..., 2]
    kroma = np.hypot(a, b)
    faktor = 1 + styrke * (1 - np.clip(kroma / 45, 0, 1))
    lab[..., 1] = a * faktor
    lab[..., 2] = b * faktor
    return lab


def skarp(L, sigma=1.4, mengde=0.55, terskel=0.012):
    """Unsharp mask that leaves flat areas alone, so leftover noise is not raised."""
    blur = cv2.GaussianBlur(L, (0, 0), sigma)
    kant = L - blur
    vekt = np.clip((np.abs(kant) - terskel) / terskel, 0, 1)
    return np.clip(L + mengde * kant * vekt, 0, 1)


def behandle(navn):
    rgb8 = np.asarray(Image.open(os.path.join(KILDE, navn)).convert("RGB"))
    portrett = navn in PORTRETT
    if not portrett:
        rgb8 = cv2.fastNlMeansDenoisingColored(np.ascontiguousarray(rgb8), None, 3, 3, 7, 21)
    rgb = rgb8.astype(np.float32) / 255
    lab = cv2.cvtColor(rgb, cv2.COLOR_RGB2LAB)  # L 0–100, a/b about -127–127
    lab = hvitbalanse(lab)

    L = lab[..., 0] / 100
    L = eksponering(L, maal=0.66 if portrett else 0.64)
    L = lokal_kontrast(L, styrke=0.12 if portrett else 0.5)
    lab[..., 0] = L * 100
    lab = vibrance(lab, 0.1 if portrett else 0.16)

    h, w = lab.shape[:2]
    k = min(SKALA, MAKS / max(w, h))
    lab = cv2.resize(lab, (round(w * k), round(h * k)), interpolation=cv2.INTER_LANCZOS4)
    L = skarp(lab[..., 0] / 100, sigma=1.6, mengde=0.35 if portrett else 0.5)
    korn = np.random.default_rng(7).normal(0, 0.0035, L.shape).astype(np.float32)
    lab[..., 0] = np.clip(L + korn, 0, 1) * 100

    ut = cv2.cvtColor(lab, cv2.COLOR_LAB2RGB)
    ut = (np.clip(ut, 0, 1) * 255 + 0.5).astype(np.uint8)
    bilde = Image.fromarray(ut)

    # Write next to the target and rename over it, so a failed save never leaves an empty file.
    maal = os.path.join(MAL, navn)
    tmp = maal + ".tmp.jpg"
    bilde.save(tmp, "JPEG", quality=88, optimize=True, progressive=True, subsampling=0)
    os.replace(tmp, maal)
    return bilde.size


if __name__ == "__main__":
    for navn in sorted(os.listdir(KILDE)):
        if navn.lower().endswith(".jpg"):
            print(navn, *behandle(navn))
