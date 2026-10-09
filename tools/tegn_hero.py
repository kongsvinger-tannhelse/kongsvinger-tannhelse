"""MOCKUP: the front page's hero as a drawing in place of the photograph.

Morning over Glomma: a soft summer sky and a low morning sun just above the
blue hills. Glomma comes out from under the sun and flows towards you,
widening, with the sun's path lying on the water; the old truss bridge
crosses it in the middle distance; the town's painted houses climb the right
bank to the fortress on its hill; fields and farms on the left bank; summer
treetops in front framing the river. The first scene of the page's one
summer day: morning here, afternoon over the fortress in «Om oss», dusk at
the bridge in the footer.

Drawn in the footer bridge's manner (tools/tegn_brua.py): flat shapes, soft
gradients, lighter and bluer with distance. Two depths, like the photo's
far/near, so Utsikt's camera glide and parallax work unchanged:
  far-tegnet.webp   sky, hills, fields, town, fortress, river, bridge (opaque)
  near-tegnet.webp  the treetops in front (alpha)
both 4800 x 3200 (3:2, like the photo), into src/components/forside/utsikt/.

Where things sit follows the hero's crops (Utsikt: zoom 1.22, fx 0.62 / 0.7
on phones, fy 0.46): the sky stays calm where the name, the buttons and the
photo pane stand, and the town, the river and the bridge lie in the band
below them that desktop and phone both show.

Run from the repo root:  python tools/tegn_hero.py   (needs Chrome, Pillow)
"""
import math
import os
import random
import subprocess

W, H = 1200, 800
SKALA = 4
o = []
A = o.append
_id = [0]


def nid(p):
    _id[0] += 1
    return f"{p}{_id[0]}"


def f(v):
    s = f"{v:.1f}"
    return s[:-2] if s.endswith(".0") else s


def P(pts):
    return "M" + " L".join(f"{f(x)},{f(y)}" for x, y in pts) + "Z"


def glatt(pts, lukket=True, k=1 / 6):
    """A smooth curve through the points (Catmull-Rom as cubic Béziers)."""
    n = len(pts)
    d = f"M{f(pts[0][0])},{f(pts[0][1])}"
    for i in range(n if lukket else n - 1):
        p0 = pts[(i - 1) % n] if (lukket or i > 0) else pts[i]
        p1, p2 = pts[i], pts[(i + 1) % n]
        p3 = pts[(i + 2) % n] if (lukket or i + 2 < n) else p2
        c1 = (p1[0] + (p2[0] - p0[0]) * k, p1[1] + (p2[1] - p0[1]) * k)
        c2 = (p2[0] - (p3[0] - p1[0]) * k, p2[1] - (p3[1] - p1[1]) * k)
        d += f" C{f(c1[0])},{f(c1[1])} {f(c2[0])},{f(c2[1])} {f(p2[0])},{f(p2[1])}"
    return d + ("Z" if lukket else "")


def klump(cx, cy, r, n=9, j=0.24, sy=0.86, bule=1.3):
    """A scalloped clump of leaves."""
    pts = []
    for i in range(n):
        a = (i + random.uniform(-0.22, 0.22)) / n * 2 * math.pi
        rr = r * (1 + random.uniform(-j, j))
        pts.append((cx + math.cos(a) * rr, cy + math.sin(a) * rr * sy))
    d = f"M{f(pts[0][0])},{f(pts[0][1])}"
    for i in range(n):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % n]
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        d += f"Q{f(cx + (mx - cx) * bule)},{f(cy + (my - cy) * bule)} {f(x2)},{f(y2)}"
    return d + "Z"


def sti(d, fill, extra=""):
    A(f'<path d="{d}" fill="{fill}"{extra}/>')


def strek(d, farge, b, extra=""):
    A(f'<path d="{d}" fill="none" stroke="{farge}" stroke-width="{f(b)}"{extra}/>')


def lerp(a, b, t):
    return a + (b - a) * t


def gradient(stopp, x2=0, y2=1):
    gid = nid("g")
    s = "".join(f'<stop offset="{o_}" stop-color="{c}"' + (f' stop-opacity="{op}"' if op is not None else "") + "/>" for o_, c, op in stopp)
    A(f'<linearGradient id="{gid}" x1="0" y1="0" x2="{x2}" y2="{y2}">{s}</linearGradient>')
    return f"url(#{gid})"


def gran(x, base, h, mork, lys, b=0.34):
    """A spruce: a tiered silhouette, lit on its left half."""
    w = h * b
    tiers = max(3, int(h / 11))
    right = []
    for t in range(1, tiers + 1):
        yy = base - h + h * t / tiers * 0.93
        ww = w / 2 * (0.16 + 0.84 * t / tiers) * random.uniform(0.86, 1.1)
        right.append((x + ww, yy))
        right.append((x + ww * 0.42, yy - h * 0.03))
    top = (x, base - h)
    left = [(2 * x - px, py) for px, py in reversed(right)]
    sti(P([top] + right + [(x + w * 0.08, base), (x - w * 0.08, base)] + left), mork)
    sti(P([top, (x, base)] + left), lys)


def krone(cx, cy, r, pal, n_lys=3, n_mid=4):
    """A broadleaf crown: dark mass, mid clumps, light on the upper left."""
    sti(klump(cx, cy + r * 0.06, r, 8), pal[0])
    sti("".join(klump(cx + random.uniform(-0.5, 0.4) * r, cy + random.uniform(-0.45, 0.1) * r, r * random.uniform(0.38, 0.55), 6) for _ in range(n_mid)), pal[1])
    if n_lys:
        sti("".join(klump(cx + random.uniform(-0.5, 0.0) * r, cy + random.uniform(-0.6, -0.25) * r, r * random.uniform(0.18, 0.3), 5) for _ in range(n_lys)), pal[2])


# summer greens, shared with the fortress band (tools/tegn_landskap.py)
GM = ("#24402B", "#2F5434", "#3E6B3A")
G = ("#3B6532", "#4E7E3A", "#6A9944")
GL = ("#56823A", "#6F9A42", "#8DB052")
OL = ("#6F7A2E", "#8E9A38", "#AEB24A")
BJ = ("#6F8E35", "#93AE48", "#BFCB68")

SOL = (744, 384)          # the morning sun, just above the hills, between the words and the pane

# Glomma from where it comes out under the sun to the bottom of the picture:
# (height, middle, half the width). It bends right, then back left, and
# widens as it comes towards you.
MIDT = [(470, 744, 6), (500, 756, 16), (530, 776, 30), (560, 790, 46), (595, 784, 66), (640, 752, 92), (700, 704, 130), (800, 660, 190), (840, 650, 220)]


def _cr(p0, p1, p2, p3, t):
    return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t ** 3)


def elvlinje(y):
    """The river's middle and half its width at height y, along a smooth curve."""
    for i in range(len(MIDT) - 1):
        if MIDT[i][0] <= y <= MIDT[i + 1][0]:
            t = (y - MIDT[i][0]) / (MIDT[i + 1][0] - MIDT[i][0])
            p0, p1, p2, p3 = MIDT[max(i - 1, 0)], MIDT[i], MIDT[i + 1], MIDT[min(i + 2, len(MIDT) - 1)]
            return _cr(p0[1], p1[1], p2[1], p3[1], t), _cr(p0[2], p1[2], p2[2], p3[2], t)
    return MIDT[-1][1], MIDT[-1][2]


VENSTRE = [(elvlinje(y)[0] - elvlinje(y)[1], y) for y in range(470, 841, 2)]
HOYRE = [(elvlinje(y)[0] + elvlinje(y)[1], y) for y in range(470, 841, 2)]


def bredd_x(pts, y):
    """The bank's x at height y."""
    for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
        if y0 <= y <= y1:
            return lerp(x0, x1, (y - y0) / (y1 - y0))
    return pts[-1][0] if y > pts[-1][1] else pts[0][0]


def langs(pts, x):
    """A line's height at x (points in x order)."""
    pts = sorted(pts)
    for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
        if x0 <= x <= x1:
            return lerp(y0, y1, (x - x0) / (x1 - x0))
    return pts[-1][1] if x > pts[-1][0] else pts[0][1]


# ---------------------------------------------------------------- the sky
def himmel():
    sti(P([(0, 0), (W, 0), (W, 520), (0, 520)]), gradient([
        (0, "#9CC8E5", None), (0.38, "#BCDCEC", None), (0.66, "#DCEAEC", None), (0.86, "#F2EBDA", None), (1, "#F8E6C6", None)]))
    gid = nid("sol")
    A(f'<radialGradient id="{gid}" cx="{SOL[0]}" cy="{SOL[1]}" r="420" gradientUnits="userSpaceOnUse">'
      f'<stop offset="0" stop-color="#FFF4D6" stop-opacity="0.95"/><stop offset="0.22" stop-color="#FCEBCB" stop-opacity="0.6"/>'
      f'<stop offset="1" stop-color="#F6E3C4" stop-opacity="0"/></radialGradient>')
    A(f'<rect x="0" y="0" width="{W}" height="520" fill="url(#{gid})"/>')
    # thin morning streaks of cloud, fading at both ends
    for cx, cy, b, h, op in [(300, 150, 520, 9, 0.55), (980, 108, 420, 7, 0.5), (560, 236, 360, 6, 0.45), (1080, 262, 300, 5, 0.4), (160, 300, 260, 5, 0.35)]:
        gid = nid("sky")
        A(f'<linearGradient id="{gid}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0"/>'
          f'<stop offset="0.3" stop-color="#FFFFFF" stop-opacity="{op}"/><stop offset="0.7" stop-color="#FFFFFF" stop-opacity="{op}"/>'
          f'<stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>')
        sti(glatt([(cx - b / 2, cy + h * 0.2), (cx - b * 0.2, cy - h * 0.6), (cx + b * 0.15, cy - h), (cx + b / 2, cy), (cx + b * 0.1, cy + h * 0.55), (cx - b * 0.25, cy + h * 0.5)]), f"url(#{gid})")
        sti(glatt([(cx - b * 0.35, cy + h * 0.45), (cx, cy + h * 0.25), (cx + b * 0.35, cy + h * 0.4), (cx, cy + h * 0.75)]), "#FBE6C8", f' opacity="{f(op * 0.6)}"')
    A(f'<circle cx="{SOL[0]}" cy="{SOL[1]}" r="66" fill="#FFF3D2" opacity="0.26"/>')
    A(f'<circle cx="{SOL[0]}" cy="{SOL[1]}" r="40" fill="#FFF3D2" opacity="0.45"/>')
    A(f'<circle cx="{SOL[0]}" cy="{SOL[1]}" r="24" fill="#FFF8E4"/>')


# ---------------------------------------------------------------- the far hills
def fjernt():
    bak = [(-20, 420), (90, 410), (210, 404), (330, 410), (450, 418), (560, 414), (650, 420), (744, 430), (840, 421), (950, 412), (1060, 404), (1150, 409), (1220, 414)]
    sti(glatt(bak + [(1220, 520), (-20, 520)]), "#C6D3D9")
    mid = [(-20, 440), (120, 432), (260, 436), (380, 442), (500, 438), (620, 446), (744, 452), (860, 444), (980, 438), (1100, 442), (1220, 438)]
    sti(glatt(mid + [(1220, 520), (-20, 520)]), "#AFC0C8")
    sti(P([(-20, 432), (1220, 432), (1220, 476), (-20, 476)]), gradient([(0, "#F3EADB", 0), (1, "#F3EADB", 0.85)]))
    random.seed(4)
    naer = [(-20, 462), (100, 456), (220, 459), (330, 464), (440, 461), (560, 466), (680, 471), (744, 474), (820, 470), (930, 464), (1060, 460), (1220, 464)]
    sti(glatt(naer + [(1220, 530), (-20, 530)]), "#91A9A3")
    x = -20
    while x < 1220:
        if random.random() < 0.7:
            gran(x, langs(naer, x) + 10, random.uniform(8, 14), "#809B95", "#91AAA4")
        x += random.uniform(3, 7)


# ---------------------------------------------------------------- the left bank: fields and farms
def gaard(x, y, s=1.0, vegg="#A9493A", tak="#5E5550"):
    sti(P([(x, y), (x + 9 * s, y), (x + 9 * s, y + 5 * s), (x, y + 5 * s)]), vegg)
    sti(P([(x - 1 * s, y + 0.4 * s), (x + 4.5 * s, y - 3.2 * s), (x + 10 * s, y + 0.4 * s)]), tak)


def venstre_bredd():
    random.seed(7)
    # the ground on the left, from the hills down to the bottom
    sti(P([(-20, 474)] + [(bredd_x(VENSTRE, y), y) for y in range(472, 841, 8)] + [(-20, 840)]), "#7E9B62")
    # a few large fields with soft edges, getting taller as they come towards you
    grenser = [474, 486, 502, 524, 552, 590, 640, 712]
    farger = ["#CBC690", "#B4BE7D", "#D6CD9E", "#A7B672", "#CDC48E", "#ABB977", "#D2C998"]
    for i, (ya, yb) in enumerate(zip(grenser, grenser[1:])):
        bolge = lambda x, y0: y0 + math.sin(x / 140 + i * 1.7) * (yb - ya) * 0.12
        topp = [(x, bolge(x, ya)) for x in range(-20, int(bredd_x(VENSTRE, ya)) + 1, 20)]
        bunn = [(x, bolge(x, yb)) for x in range(int(bredd_x(VENSTRE, yb)), -21, -20)]
        sti(P(topp + [(bredd_x(VENSTRE, ya) - 3, ya), (bredd_x(VENSTRE, yb) - 3, yb)] + bunn), farger[i % len(farger)])
        # a thin, broken hedge along some of the field edges
        if i in (3, 5):
            x = random.uniform(-20, 60)
            while x < bredd_x(VENSTRE, ya) - 20:
                if random.random() < 0.45:
                    krone(x, bolge(x, ya) - 0.5, 1.4 + (ya - 470) * 0.028, random.choice([G, GM, OL]), 0, 2)
                x += random.uniform(3, 9) * (1 + (ya - 470) * 0.01)
    # patches of forest, darker, with spruce
    for cx, cy, b, h in [(150, 494, 150, 14), (430, 512, 120, 16), (60, 560, 140, 26), (330, 600, 110, 30)]:
        for _ in range(int(b * h / 22)):
            x = cx + random.uniform(-b / 2, b / 2)
            y = cy + random.uniform(-h / 2, h / 2)
            s = 1 + (y - 470) * 0.03
            if random.random() < 0.5:
                gran(x, y + 4 * s, random.uniform(8, 13) * s, "#2F4F37", "#3E6446")
            else:
                krone(x, y, random.uniform(3, 5) * s, random.choice([GM, G]), 1, 2)
    # farms here and there, bigger nearer
    for x, y in [(80, 482), (300, 486), (540, 498), (230, 530), (500, 546), (160, 600), (450, 640)]:
        s = 0.8 + (y - 470) * 0.024
        gaard(x, y, s, random.choice(["#A9493A", "#ECE9E1", "#D9A441", "#A9493A"]), random.choice(["#5E5550", "#4F4A47"]))
    # trees along the river bank
    y = 476
    while y < 700:
        x = bredd_x(VENSTRE, y) - random.uniform(4, 14)
        krone(x, y, 2 + (y - 470) * 0.06, random.choice([G, GM, GL]), 1, 2)
        y += random.uniform(3, 7)


# ---------------------------------------------------------------- the right bank: the town and the fortress
def hus(x, y, b, h, vegg, tak, gavl=False):
    """A painted wooden house: wall, roof, a row of windows."""
    if gavl:
        sti(P([(x, y), (x + b, y), (x + b, y + h), (x, y + h)]), vegg)
        sti(P([(x - 0.8, y + 0.3), (x + b / 2, y - h * 0.75), (x + b + 0.8, y + 0.3)]), tak)
    else:
        sti(P([(x, y), (x + b, y), (x + b, y + h), (x, y + h)]), vegg)
        sti(P([(x - 1, y + 0.3), (x + 1.6, y - h * 0.55), (x + b - 1.6, y - h * 0.55), (x + b + 1, y + 0.3)]), tak)
    n = max(1, int(b / 4.6))
    lys = vegg in ("#A9493A", "#B5532F", "#8E9AA3", "#C88F72")
    for i in range(n):
        vx = x + (i + 0.5) * b / n - h * 0.11
        sti(P([(vx, y + h * 0.3), (vx + h * 0.22, y + h * 0.3), (vx + h * 0.22, y + h * 0.64), (vx, y + h * 0.64)]), "#F4F0E6" if lys else "#3B4650", ' opacity="0.85"')


VEGG = ["#A9493A", "#ECE9E1", "#E8C95A", "#D9A441", "#ECE9E1", "#A9493A", "#8E9AA3", "#F2DFC8", "#B5532F"]
TAK = ["#5E5550", "#4F4A47", "#B5532F", "#6A5F58", "#4F4A47"]
# the hill on the right, low enough that the fortress sits clear below the photo pane on wide screens
AAS = [(760, 492), (830, 486), (900, 480), (960, 474), (1010, 470), (1080, 469), (1140, 471), (1200, 476), (1240, 480)]


def festning(fx, fy, k):
    """The stone wall along the hilltop, the brick gable, the yellow block, the long white house, the flag."""
    sti(P([(fx - 18 * k, fy), (fx + 112 * k, fy), (fx + 116 * k, fy + 12 * k), (fx - 22 * k, fy + 12 * k)]), "#B9A58E")
    for i in range(34):
        sx = fx - 18 * k + i * 4 * k
        rad = i % 2
        sti(P([(sx, fy + (2 + rad * 5) * k), (sx + 3.4 * k, fy + (2 + rad * 5) * k), (sx + 3.4 * k, fy + (4.4 + rad * 5) * k), (sx, fy + (4.4 + rad * 5) * k)]), "#A89580", ' opacity="0.8"')
    hus(fx, fy - 13 * k, 20 * k, 13 * k, "#C88F72", "#B8452E", gavl=True)
    hus(fx + 22 * k, fy - 17 * k, 26 * k, 17 * k, "#E8C95A", "#7A6A4C", gavl=True)
    hus(fx + 50 * k, fy - 11 * k, 30 * k, 11 * k, "#E3D9C6", "#B8452E")
    hus(fx + 82 * k, fy - 10 * k, 20 * k, 10 * k, "#C88F72", "#B5532F")
    stang = fx + 106 * k
    strek(f"M{f(stang)},{f(fy)} V{f(fy - 34 * k)}", "#F2F2EE", 1.4)
    sti(f"M{f(stang + 0.6)},{f(fy - 33 * k)} C{f(stang + 5 * k)},{f(fy - 31.5 * k)} {f(stang + 10 * k)},{f(fy - 30 * k)} {f(stang + 14 * k)},{f(fy - 27 * k)} "
        f"L{f(stang + 14.5 * k)},{f(fy - 19.5 * k)} C{f(stang + 10 * k)},{f(fy - 21 * k)} {f(stang + 5 * k)},{f(fy - 22.4 * k)} {f(stang + 0.6)},{f(fy - 23 * k)} Z", "#BA0C2F")
    kors = (f"M{f(stang + 5 * k)},{f(fy - 31.6 * k)} L{f(stang + 5.4 * k)},{f(fy - 22 * k)} "
            f"M{f(stang + 0.6)},{f(fy - 27.6 * k)} C{f(stang + 6 * k)},{f(fy - 26.4 * k)} {f(stang + 10 * k)},{f(fy - 25 * k)} {f(stang + 14.2 * k)},{f(fy - 23.4 * k)}")
    strek(kors, "#FFFFFF", 1.8)
    strek(kors, "#00205B", 0.9)


def hoyre_bredd():
    random.seed(12)
    # the hill, from the river up to the fortress and on to the right
    sti(P(AAS + [(1240, 840)] + [(bredd_x(HOYRE, y), y) for y in range(840, 469, -8)]), "#5E8350")
    # woods over the whole hill first, thicker up under the fortress
    for _ in range(150):
        x = random.uniform(bredd_x(HOYRE, 500), 1250)
        t = langs(AAS, x)
        y = random.uniform(t + 4, 720)
        s = 1 + (y - 470) * 0.02
        krone(x, y, random.uniform(5, 8) * s, random.choice([G, GM, GL, OL, G]), 1, 2)
    # the old town: a cluster of houses down by the river, thinning out up the
    # hill, with trees between them; rows get bigger as they come towards you
    y = 500
    while y < 700:
        s = 0.55 + (y - 480) * 0.016
        bank = bredd_x(HOYRE, y)
        x = bank + random.uniform(4, 10)
        while x < 1240:
            hoyde_opp = (langs(AAS, x) + 26 - y)        # > 0: up under the fortress
            avstand = (x - bank) / 260                  # 0 at the river, 1 well up the slope
            if hoyde_opp > 0 or random.random() < avstand * 0.75:
                x += random.uniform(8, 16) * s
                continue
            b = random.uniform(10, 18) * s
            h = random.uniform(6, 8.5) * s
            yy = y + random.uniform(-2, 2) * s
            if random.random() < 0.28:
                krone(x + b / 2, yy - h * 0.1, random.uniform(5, 8) * s, random.choice([G, GL, BJ, GM]), 1, 2)
            else:
                hus(x, yy, b, h, random.choice(VEGG), random.choice(TAK), gavl=random.random() < 0.35)
            x += b + random.uniform(1, 5) * s
        y += 9 + (y - 480) * 0.07
    festning(1000, 472, 1.35)
    # trees along the river under the town
    y = 476
    while y < 700:
        x = bredd_x(HOYRE, y) + random.uniform(3, 10)
        krone(x, y, 2 + (y - 470) * 0.05, random.choice([G, GM, GL]), 1, 2)
        y += random.uniform(4, 9)


# ---------------------------------------------------------------- the river and the bridge
BRU_Y = 552


def elv():
    venstre = [(bredd_x(VENSTRE, y), y) for y in range(470, 841, 6)]
    hoyre = [(bredd_x(HOYRE, y), y) for y in range(840, 469, -6)]
    sti(P(venstre + hoyre), gradient([(0, "#EFE7D6", None), (0.1, "#D5E3E9", None), (0.45, "#ADC9DA", None), (1, "#7D9EB3", None)]))
    # the banks' green reflections along both edges
    sti(P([(x + 2, y) for x, y in venstre] + [(x + 4 + (y - 470) * 0.05, y) for x, y in reversed(venstre)]), "#5D7D58", ' opacity="0.28"')
    sti(P([(x - 2, y) for x, y in reversed(hoyre)] + [(x - 4 - (y - 470) * 0.06, y) for x, y in hoyre]), "#4E6E4E", ' opacity="0.3"')
    # the sun's path on the water: straight down from the sun towards you, in
    # broken strokes that widen as they come nearer, only where there is water
    cid = nid("vann")
    A(f'<clipPath id="{cid}"><path d="{P(venstre + hoyre)}"/></clipPath><g clip-path="url(#{cid})">')
    random.seed(9)
    y = 472
    while y < 840:
        bredde = 6 + (y - 470) * 0.42
        for _ in range(1 + int((y - 470) / 50)):
            b = random.uniform(0.25, 0.9) * bredde
            x = SOL[0] + random.uniform(-0.5, 0.5) * bredde - b / 2
            op = max(0.2, 0.95 - (y - 470) * 0.002)
            tykk = 0.8 + (y - 470) * 0.006
            sti(P([(x, y), (x + b, y), (x + b, y + tykk), (x, y + tykk)]), "#FFF6DE", f' opacity="{f(op)}"')
        y += 2.2 + (y - 470) * 0.02
    A("</g>")
    # small ripples
    for _ in range(140):
        y = random.uniform(490, 840)
        x0, x1 = bredd_x(VENSTRE, y) + 6, bredd_x(HOYRE, y) - 6
        if x1 <= x0:
            continue
        x = random.uniform(x0, x1)
        b = random.uniform(4, 10) * (1 + (y - 470) * 0.01)
        strek(f"M{f(x)},{f(y)} h{f(b)}", "#EEF3F2", 0.5 + (y - 470) * 0.003, ' opacity="0.55"')


def bru():
    """The old steel truss bridge across Glomma: two spans on stone piers, a sagging top chord."""
    y = BRU_Y
    xa, xb = bredd_x(VENSTRE, y) - 14, bredd_x(HOYRE, y) + 14
    midt = (xa + xb) / 2
    for px in (bredd_x(VENSTRE, y) + 2, midt, bredd_x(HOYRE, y) - 2):
        sti(P([(px - 3.2, y), (px + 3.2, y), (px + 3.8, y + 10), (px - 3.8, y + 10)]), "#C2BBAE")
        sti(P([(px - 3.4, y + 10), (px + 3.4, y + 10), (px + 2.6, y + 22), (px - 2.6, y + 22)]), "#A9B6B8", ' opacity="0.5"')
    sti(P([(xa, y - 1.4), (xb, y - 1.4), (xb, y + 1.6), (xa, y + 1.6)]), "#4A3F3A")
    strek(f"M{f(xa + 6)},{f(y + 6)} H{f(xb - 6)}", "#6F858B", 1.2, ' opacity="0.35"')
    for x0, x1, hoy in [(xa, midt, 13), (midt, xb, 11)]:
        n = 8
        topp = [(lerp(x0, x1, i / n), y - 1.4 - hoy * (0.5 + 0.5 * math.sin(math.pi * i / n))) for i in range(n + 1)]
        strek("M" + " L".join(f"{f(px)},{f(py)}" for px, py in topp), "#5B4D46", 1.5)
        for i, (px, py) in enumerate(topp):
            strek(f"M{f(px)},{f(py)} V{f(y - 1.4)}", "#5B4D46", 0.8)
            if i < n:
                qx, qy = topp[i + 1]
                strek(f"M{f(px)},{f(py)} L{f(qx)},{f(y - 1.4)}" if i < n / 2 else f"M{f(px)},{f(y - 1.4)} L{f(qx)},{f(qy)}", "#5B4D46", 0.6)
    random.seed(41)
    for _ in range(18):
        x = random.uniform(xa + 4, xb - 4)
        strek(f"M{f(x)},{f(y + random.uniform(5, 18))} h{f(random.uniform(4, 12))}", "#5B4D46", 0.6, ' opacity="0.22"')


# ---------------------------------------------------------------- the near bank (its own layer)
def naer():
    random.seed(31)
    # treetops framing the river: a cluster on each side, rising higher at the edges
    for side, (xa, xb), topp in [("v", (-60, 560), lambda x: 600 + max(0, x - 200) * 0.18), ("h", (900, 1260), lambda x: 618 - max(0, x - 1000) * 0.2)]:
        for rad, (dy0, dy1, rmin, rmax, n) in enumerate([(0, 30, 16, 24, 40), (30, 90, 20, 30, 40), (90, 220, 26, 40, 34)]):
            for _ in range(n):
                x = random.uniform(xa, xb)
                y = topp(x) + random.uniform(dy0, dy1)
                if side == "v" and x > bredd_x(VENSTRE, min(y, 838)) - 6:
                    continue
                if side == "h" and x < bredd_x(HOYRE, min(y, 838)) + 6:
                    continue
                if random.random() < 0.15 and rad > 0:
                    gran(x, y + rmax * 1.2, random.uniform(rmin * 2.4, rmax * 3), "#1E3526", "#2D4C35")
                else:
                    krone(x, y, random.uniform(rmin, rmax), random.choice([G, GM, GL, BJ, OL, G]), 3, 4)
    # a few birch crowns at the very bottom, over the water
    for x in (640, 760, 880):
        krone(x + random.uniform(-20, 20), 832, random.uniform(26, 34), random.choice([BJ, GL]), 3, 4)


# ---------------------------------------------------------------- write
MAPPE = os.path.join(os.path.dirname(__file__), "tegninger")
UT = os.path.join(os.path.dirname(__file__), "..", "src", "components", "forside", "utsikt")
KROM = r"C:\Program Files\Google\Chrome\Application\chrome.exe"


def skriv(navn, tegn, gjennomsiktig):
    from PIL import Image

    o.clear()
    A(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">')
    tegn()
    A("</svg>")
    os.makedirs(MAPPE, exist_ok=True)
    svg = os.path.abspath(os.path.join(MAPPE, navn + ".svg"))
    with open(svg + ".tmp", "w", encoding="utf-8") as fil:
        fil.write(chr(10).join(o))
    os.replace(svg + ".tmp", svg)
    png = os.path.abspath(os.path.join(MAPPE, navn + ".png"))
    subprocess.run(
        [KROM, "--headless=new", "--disable-gpu", "--hide-scrollbars", f"--force-device-scale-factor={SKALA}", f"--window-size={W},{H}",
         "--default-background-color=00000000", f"--screenshot={png}", "file:///" + svg.replace(os.sep, "/")],
        check=True, capture_output=True,
    )
    bilde = Image.open(png).convert("RGBA" if gjennomsiktig else "RGB")
    mal = os.path.join(UT, navn + ".webp")
    bilde.save(mal + ".tmp", "WEBP", quality=84, method=6)
    os.replace(mal + ".tmp", mal)
    print("wrote", os.path.normpath(mal), bilde.size, os.path.getsize(mal) // 1024, "KB")


def dis():
    """Morning mist lying low in the valley, thickest far off, round where the river comes out."""
    for y0, h, op in [(468, 22, 0.55), (486, 18, 0.35), (500, 14, 0.2)]:
        sti(P([(-20, y0), (1220, y0), (1220, y0 + h), (-20, y0 + h)]), gradient([(0, "#F7F1E4", 0), (0.5, "#F7F1E4", op), (1, "#F7F1E4", 0)]))


def far():
    himmel()
    fjernt()
    venstre_bredd()
    hoyre_bredd()
    elv()
    bru()
    dis()


if __name__ == "__main__":
    skriv("far-tegnet", far, False)
    skriv("near-tegnet", naer, True)
