"""Split the view from Kongsvinger festning into depth layers for the hero.

far.webp  : the whole view with the near treetops painted out (opaque)
near.webp : the near treetops alone, below the fortress hill, alpha
debug-*.jpg are written next to this file when run with --debug (not committed)

Master: kilder/kongsvinger-festning-utsikt-siljeao-pexels-14777353.jpg
  "View from the Kongsvinger Fortress, Hedmark, Norway" by SiljeAO on Pexels,
  https://www.pexels.com/photo/view-from-the-kongsvinger-fortress-hedmark-norway-14777353/
  Pexels licence: free to use and modify, no credit required (we credit anyway).

Run with the tool venv:  .venv-crawl/Scripts/python.exe src/components/forside/utsikt/lag.py
"""
import os
import sys

import cv2
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "../../../.."))
MASTER = os.path.join(ROOT, "kilder", "kongsvinger-festning-utsikt-siljeao-pexels-14777353.jpg")
DEBUG = "--debug" in sys.argv
OUT_W = 4800           # served through next/image, which makes the smaller sizes

src = np.asarray(Image.open(MASTER).convert("RGB")).astype(np.float32) / 255.0
H, W = src.shape[:2]
print("master", W, H)

# ---- 1. A gentle grade: a touch more contrast and warmth ----
def grade(img):
    x = img.copy()
    x = np.clip((x - 0.5) * 1.07 + 0.5 + 0.01, 0, 1)                 # contrast
    grey = x.mean(axis=2, keepdims=True)
    x = np.clip(grey + (x - grey) * 1.10, 0, 1)                       # saturation
    x[..., 0] = np.clip(x[..., 0] * 1.015, 0, 1)                      # warmth
    x[..., 2] = np.clip(x[..., 2] * 0.985, 0, 1)
    return x

img = (grade(src) * 255).round().astype(np.uint8)

# ---- 2. The near foreground, drawn by hand on a 2000px-wide view, refined with GrabCut ----
VW = 2000
s = VW / W
VH = round(H * s)
view = cv2.resize(img, (VW, VH), interpolation=cv2.INTER_AREA)

NEAR = [
    # the crowns of the trees just below the hill, from left to right
    (0, 950), (100, 945), (200, 955), (300, 950), (400, 950), (500, 945), (600, 940), (700, 945),
    (800, 940), (900, 930),
    # below the houses that show through the gap on the right
    (950, 950), (1000, 1000), (1100, 1015), (1200, 1010), (1300, 1015),
    # the taller trees against the river, and the birch on the far right
    (1330, 980), (1360, 930), (1400, 895), (1450, 880), (1500, 885), (1550, 880), (1600, 890),
    (1650, 895), (1700, 880), (1750, 870), (1800, 860), (1850, 850), (1900, 845), (1950, 860), (VW, 870),
    (VW, VH), (0, VH),
]

poly = np.zeros((VH, VW), np.uint8)
cv2.fillPoly(poly, [np.array(NEAR, np.int32)], 255)
band = 14
sure_fg = cv2.erode(poly, np.ones((band * 2 + 1,) * 2, np.uint8))
sure_bg = cv2.erode(255 - poly, np.ones((band * 2 + 1,) * 2, np.uint8))
gc = np.full((VH, VW), cv2.GC_PR_BGD, np.uint8)
gc[poly > 0] = cv2.GC_PR_FGD
gc[sure_fg > 0] = cv2.GC_FGD
gc[sure_bg > 0] = cv2.GC_BGD
bgd, fgd = np.zeros((1, 65), np.float64), np.zeros((1, 65), np.float64)
cv2.grabCut(cv2.cvtColor(view, cv2.COLOR_RGB2BGR), gc, None, bgd, fgd, 6, cv2.GC_INIT_WITH_MASK)
near_v = np.where((gc == cv2.GC_FGD) | (gc == cv2.GC_PR_FGD), 255, 0).astype(np.uint8)
# keep only the region connected to the bottom edge; drop stray islands
n, lab = cv2.connectedComponents(near_v)
keep = set(np.unique(lab[-1, :])) - {0}
near_v = np.isin(lab, list(keep)).astype(np.uint8) * 255
near_v = cv2.morphologyEx(near_v, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))

# ---- 3. Up to full size, with a soft edge ----
alpha = cv2.resize(near_v, (W, H), interpolation=cv2.INTER_LINEAR)
alpha = cv2.GaussianBlur(alpha, (0, 0), 3.0)

# ---- 4. The far layer: paint the near region out so it can slide ----
# Only a band along the near edge is ever uncovered (the layers move apart by a
# few dozen pixels at most). That band is filled with a mirror image of the real
# far pixels just beyond the edge, so it reads as more trees, more wall, more
# sky, never as a smear. Deeper in, where nothing is ever seen, a cheap inpaint.
near_full = cv2.resize(near_v, (W, H), interpolation=cv2.INTER_NEAREST)
hole = cv2.dilate(near_full, np.ones((41, 41), np.uint8))            # also cover the soft edge
dist, lab = cv2.distanceTransformWithLabels((hole == 0).astype(np.uint8) * 0 + (hole > 0).astype(np.uint8),
                                            cv2.DIST_L2, 5, labelType=cv2.DIST_LABEL_PIXEL)
# coordinates of every outside pixel, by its label
outside = hole == 0
ys, xs = np.nonzero(outside)
lx = np.zeros(lab.max() + 1, np.int32); ly = np.zeros(lab.max() + 1, np.int32)
lx[lab[outside]] = xs; ly[lab[outside]] = ys
hy, hx = np.nonzero(~outside)
qx, qy = lx[lab[hy, hx]], ly[lab[hy, hx]]                           # nearest outside pixel
rx = np.clip(2 * qx - hx, 0, W - 1); ry = np.clip(2 * qy - hy, 0, H - 1)   # reflected through it
bad = ~outside[ry, rx]                                               # reflection landed in the hole too
rx[bad], ry[bad] = qx[bad], qy[bad]
far = img.copy()
far[hy, hx] = img[ry, rx]
# beyond the band no one ever looks; keep it calm with an inpaint at the working size
deep = (dist > 420).astype(np.uint8) * 255
if deep.any():
    small = cv2.resize(far, (VW, VH), interpolation=cv2.INTER_AREA)
    deep_v = cv2.resize(deep, (VW, VH), interpolation=cv2.INTER_NEAREST)
    fill_v = cv2.inpaint(cv2.cvtColor(small, cv2.COLOR_RGB2BGR), deep_v, 7, cv2.INPAINT_TELEA)
    fill = cv2.cvtColor(cv2.resize(fill_v, (W, H), interpolation=cv2.INTER_CUBIC), cv2.COLOR_BGR2RGB)
    m = cv2.GaussianBlur(deep, (0, 0), 20).astype(np.float32)[..., None] / 255.0
    far = (far.astype(np.float32) * (1 - m) + fill.astype(np.float32) * m).round().astype(np.uint8)
# soften the seam lines the reflection leaves inside the hole
blur = cv2.GaussianBlur(far, (0, 0), 1.2)
inside = cv2.GaussianBlur(hole, (0, 0), 2).astype(np.float32)[..., None] / 255.0
far = (far.astype(np.float32) * (1 - inside) + blur.astype(np.float32) * inside).round().astype(np.uint8)

# ---- 5. Save ----
oh = round(H * OUT_W / W)
def save(arr, name, rgba=False):
    im = Image.fromarray(arr, "RGBA" if rgba else "RGB").resize((OUT_W, oh), Image.LANCZOS)
    path = os.path.join(HERE, name)
    im.save(path, "WEBP", quality=84, method=6)
    print(name, im.size, os.path.getsize(path) // 1024, "KB")

save(far, "far.webp")
save(np.dstack([img, alpha]), "near.webp", rgba=True)

if DEBUG:
    dv = view.copy()
    edge = cv2.morphologyEx(near_v, cv2.MORPH_GRADIENT, np.ones((3, 3), np.uint8))
    dv[edge > 0] = (255, 0, 80)
    cv2.polylines(dv, [np.array(NEAR, np.int32)], False, (255, 220, 0), 1)
    Image.fromarray(dv).save(os.path.join(HERE, "debug-edge.jpg"), quality=85)
    fv = cv2.resize(far, (VW, VH), interpolation=cv2.INTER_AREA)
    Image.fromarray(fv).save(os.path.join(HERE, "debug-far.jpg"), quality=85)
