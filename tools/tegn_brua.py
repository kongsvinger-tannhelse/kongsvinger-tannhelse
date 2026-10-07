"""Draws the bridge over Glomma for the foot of the front page, under
«Kontakt»: the old steel truss bridge on its two stone piers, the long span
with its sagging top chord, the cantilever arm dropping to the deck and the
bowstring arch beyond; the far bank's forest and fields under the blue hills,
the river with its reflections, the green bank and the sandbar on the right,
the birch in front on the left and the pine branches hanging in from the top.

Drawn from a photograph the user supplied, used only as a reference (not
shipped). Coordinates are that photo's (1544 x 586); the scene carries on
past it on every side (x -260..1820, y -140..700) so the page can crop it
for wide screens and phones.

Writes three SVG layers to public/images/tegninger/brua/, each with its own
box (LAG) in the same coordinates, so the page can stack them and move the
near ones a little (src/components/forside/brua/lag.ts holds the same boxes):
  scene.svg   everything behind the foreground: hills, forest, river, banks, bridge
  bjork.svg   the birch on the left
  furu.svg    the pine branches hanging from the top
and a combined preview, rendered by headless Chrome, to tools/tegninger/.

Run from the repo root:  python tools/tegn_brua.py   (needs Chrome)
"""
import math
import os
import random
import subprocess

X0, Y0, X1, Y1 = -260, -140, 1820, 700
VB = f"{X0} {Y0} {X1 - X0} {Y1 - Y0}"
# each layer's own box, in the same coordinates (the page places them by these)
LAG = {"scene": VB, "bjork": "-270 15 560 700", "furu": "780 -160 1080 340"}

o = []
A = o.append
_id = [0]


def nid(p):
    _id[0] += 1
    return f"{p}{_id[0]}"


PREC = [1]   # decimals in the output; 0 for things too small or far to need more


def f(v):
    if PREC[0] == 0:
        return str(round(v))
    s = f"{v:.1f}"
    return s[:-2] if s.endswith(".0") else s


class grov:
    """Whole-number coordinates inside the block."""
    def __enter__(self):
        self.for_ = PREC[0]
        PREC[0] = 0

    def __exit__(self, *a):
        PREC[0] = self.for_


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


def blend(c1, c2, t):
    a = [int(c1[i:i + 2], 16) for i in (1, 3, 5)]
    b = [int(c2[i:i + 2], 16) for i in (1, 3, 5)]
    return "#" + "".join(f"{round(lerp(x, y, t)):02X}" for x, y in zip(a, b))


# ---------------------------------------------------------------- trees
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
    with grov():
        sti(P([top] + right + [(x + w * 0.08, base), (x - w * 0.08, base)] + left), mork)
        sti(P([top, (x, base)] + left), lys)


def krone(cx, cy, r, pal, n_lys=3, n_mid=4):
    """A broadleaf crown: dark mass, mid clumps, light on the upper left."""
    with grov():
        sti(klump(cx, cy + r * 0.06, r, 8), pal[0])
        mid = "".join(klump(cx + random.uniform(-0.5, 0.4) * r, cy + random.uniform(-0.45, 0.1) * r, r * random.uniform(0.38, 0.55), 6) for _ in range(n_mid))
        sti(mid, pal[1])
        if n_lys:
            lys = "".join(klump(cx + random.uniform(-0.5, 0.0) * r, cy + random.uniform(-0.6, -0.25) * r, r * random.uniform(0.18, 0.3), 5) for _ in range(n_lys))
            sti(lys, pal[2])


# ---------------------------------------------------------------- the far side
def fjernt():
    # the blue hills, two ridges, and the haze at their feet
    bak = [(-280, 150), (-180, 136), (-60, 128), (60, 120), (160, 118), (240, 113), (300, 111), (360, 116), (430, 126),
           (500, 121), (560, 117), (610, 119), (680, 127), (780, 136), (880, 144), (1000, 146), (1140, 138), (1300, 132),
           (1460, 136), (1620, 130), (1840, 138)]
    sti(glatt(bak + [(1840, 230), (-280, 230)]), "#BCC7CE")
    for_ = [(-280, 160), (-120, 150), (40, 146), (180, 140), (290, 137), (390, 142), (470, 140), (560, 136), (660, 141),
            (760, 148), (880, 154), (1040, 156), (1240, 150), (1460, 148), (1840, 152)]
    sti(glatt(for_ + [(1840, 230), (-280, 230)]), "#A9B7C1")
    hid = nid("dis")
    A(f'<linearGradient id="{hid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F3F4F1" stop-opacity="0"/>'
      f'<stop offset="1" stop-color="#F3F4F1" stop-opacity="0.85"/></linearGradient>')
    A(f'<rect x="-280" y="118" width="2120" height="56" fill="url(#{hid})"/>')

    # the distant forest behind the fields (middle), pale with distance
    random.seed(3)
    sti(P([(540, 196), (1200, 196), (1200, 214), (540, 214)]), "#8BA29C")
    x = 540
    while x < 1200:
        if random.random() < 0.55:
            gran(x, 210, random.uniform(30, 50), "#7F9892", "#90A7A1")
        else:
            krone(x, 196, random.uniform(10, 15), ("#86A09A", "#91AAA4", "#A0B6AF"), 1)
        x += random.uniform(6, 13)
    # the fields, a hedge, a farm
    for y0, y1, c in [(206, 214, "#C9C08F"), (214, 222, "#D6CB9C"), (222, 229, "#C2BA86"), (229, 237, "#D9CEA2")]:
        sti(P([(560, y0), (1200, y0), (1200, y1), (560, y1)]), c)
    for hy in (214, 229):
        xx = 580
        while xx < 960:
            if random.random() < 0.6:
                sti(klump(xx, hy - 1.2, random.uniform(2.2, 3.6), 6, 0.2, 0.7), "#6F8B78")
            xx += random.uniform(3, 7)
    sti(P([(686, 204.5), (701, 204.5), (701, 211), (686, 211)]), "#ECE9E1")
    sti(P([(684.5, 205), (693.5, 200), (702.5, 205)]), "#6D6A66")
    sti(P([(732, 205), (746, 205), (746, 212), (732, 212)]), "#A9493A")
    sti(P([(730.5, 205.5), (739, 200.8), (747.5, 205.5)]), "#5E5550")
    # the far shore: a pale strip of sand along the water
    sti(glatt([(560, 237), (700, 235.5), (840, 236.5), (980, 237), (980, 247.5), (840, 247), (700, 246.5), (588, 248)], True), "#DACFB7")
    strek(f"M588,247.6 C700,246.6 840,247 980,247.4", "#B7A98F", 0.9)

    # the forest on the left, three rows, nearest last
    random.seed(5)
    x = -280
    while x < 640:
        if random.random() < 0.7:
            gran(x, 218, random.uniform(56, 78), "#67857F", "#779590")
        else:
            krone(x, 182, random.uniform(13, 19), ("#6B8983", "#779590", "#86A29B"), 1)
        x += random.uniform(8, 14)
    sti(P([(-280, 200), (612, 204), (600, 266), (-280, 266)]), "#4F6E61")
    x = -280
    while x < 620:
        if random.random() < 0.55:
            gran(x, 246, random.uniform(64, 96), "#48675A", "#58786A")
        else:
            krone(x, 208, random.uniform(16, 24), ("#4B6A5D", "#587969", "#698A77"), 2)
        x += random.uniform(10, 17)
    x = -280
    while x < 600:
        if random.random() < 0.25:
            gran(x, 268, random.uniform(50, 76), "#3B5A4B", "#4A6B59")
        else:
            krone(x, 246, random.uniform(13, 21), ("#3E5D4D", "#4C6E5A", "#5F8268"), 2)
        x += random.uniform(12, 20)
    sti(P([(-280, 258), (604, 258), (600, 266), (-280, 266)]), "#3E5D4D")


# ---------------------------------------------------------------- the river
def SAND_TOPP():
    return [(934, 417), (1000, 412), (1070, 408), (1140, 404), (1220, 406), (1300, 410), (1400, 417), (1500, 424),
            (1620, 430), (1840, 436)]


def SAND_BUNN():
    return [(1840, 548), (1700, 534), (1580, 524), (1470, 514), (1370, 505), (1300, 497), (1262, 489), (1256, 478),
            (1232, 462), (1180, 447), (1100, 433), (1020, 424), (960, 420)]


def elv():
    gid = nid("vann")
    A(f'<linearGradient id="{gid}" x1="0" y1="0" x2="0" y2="1">'
      f'<stop offset="0" stop-color="#CED7D8"/><stop offset="0.16" stop-color="#C2CDD0"/>'
      f'<stop offset="0.45" stop-color="#AEBDC3"/><stop offset="1" stop-color="#86999F"/></linearGradient>')
    A(f'<rect x="-280" y="240" width="2120" height="470" fill="url(#{gid})" />')
    # a little gradient into y space: the rect's own box is 0..1
    # the far forest's reflection, under the left shore
    random.seed(8)
    rid = nid("spg")
    A(f'<linearGradient id="{rid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#46625A" stop-opacity="0.95"/>'
      f'<stop offset="0.55" stop-color="#5D756F" stop-opacity="0.55"/><stop offset="1" stop-color="#9AA9AC" stop-opacity="0"/></linearGradient>')
    pts = [(-280, 265)]
    x = -280
    while x <= 600:
        pts.append((x, 265 + random.uniform(26, 40)))
        x += random.uniform(6, 12)
    pts.append((600, 265))
    sti(P(pts), f"url(#{rid})")
    # the fields' pale reflection, middle
    sti(P([(596, 248), (980, 248), (980, 262), (596, 262)]), "#D3D3C6", ' opacity="0.55"')
    # the right bank's dark reflection in the inlet under the bridge
    iid = nid("vik")
    A(f'<linearGradient id="{iid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E4A3A"/>'
      f'<stop offset="0.7" stop-color="#3F5B4C"/><stop offset="1" stop-color="#6E8584" stop-opacity="0.4"/></linearGradient>')
    sti(glatt([(940, 330), (1000, 338), (1100, 344), (1150, 360), (1160, 404), (1100, 410), (1000, 416), (944, 418), (936, 380)], True), f"url(#{iid})")
    # the sand's light reflection under its lower edge
    bunn = SAND_BUNN()
    refl = [(x, y + 2) for x, y in reversed(bunn)] + [(x, y + 12) for x, y in bunn]
    sti(P(refl), "#D2CBBB", ' opacity="0.45"')
    # the piers' reflections, broken into slices
    for x0, x1, y0, y1 in [(231, 264, 405, 470), (779, 814, 408, 535)]:
        y = y0
        while y < y1:
            h = random.uniform(2.5, 5.5)
            t = (y - y0) / (y1 - y0)
            dx = random.uniform(-2.2, 2.2) * (0.4 + t)
            op = 0.55 * (1 - t) ** 1.3
            sti(P([(x0 + dx, y), (x1 + dx, y), (x1 + dx, y + h * 0.7), (x0 + dx, y + h * 0.7)]), "#8B8780", f' opacity="{op:.2f}"')
            y += h
    # the bridge's reflection, faint, over open water only
    # broken into bands by the ripples: a mask of horizontal stripes
    mid_ = nid("brudd")
    striper = []
    y = 410.0
    while y < 700:
        h = random.uniform(1.2, 3.4) * (1 + (y - 410) / 160)
        striper.append(f"M170,{f(y)}h770v{f(h)}h-770Z")
        y += h + random.uniform(2, 6) * (1 + (y - 410) / 200)
    A(f'<mask id="{mid_}" maskUnits="userSpaceOnUse" x="160" y="400" width="800" height="310">'
      f'<rect x="160" y="400" width="800" height="310" fill="#000"/><path d="{"".join(striper)}" fill="#FFF"/></mask>')
    cid = nid("klipp")
    A(f'<clipPath id="{cid}"><path d="M170,410 L938,410 L938,700 L170,700Z"/></clipPath>')
    A(f'<g clip-path="url(#{cid})" mask="url(#{mid_})" opacity="0.16" fill="none" stroke="#33403F">')
    speil = lambda pts: [(x, 2 * 406 - y) for x, y in pts]
    A(f'<path d="{glatt(speil([(180, 265), (245, 228)] + [(x, topp_venstre(x)) for x in range(260, 800, 30)] + [(797, 231)]), False)}" stroke-width="5"/>')
    A(f'<path d="M180,{f(2*406-320)} L957,{f(2*406-322)}" stroke-width="6"/>')
    A(f'<path d="M797,{f(2*406-231)} L957,{f(2*406-322)}" stroke-width="4"/>')
    A(f'<path d="M797,{f(2*406-231)} V{f(2*406-346)}" stroke-width="8"/>')
    for (xb, xt) in [(247, 302), (357, 302), (357, 412), (467, 412), (467, 523), (578, 523), (578, 632), (687, 632), (687, 742), (797, 742)]:
        A(f'<path d="M{xb},{f(2*406-dekk(xb))} L{xt},{f(2*406-topp_venstre(xt))}" stroke-width="3.2"/>')
    A('</g>')

    # ripples: short strokes, longer and further apart nearer the viewer
    random.seed(13)
    PREC[0] = 0
    lys, mork = [], []
    y = 250.0
    while y < 700:
        t = (y - 250) / 450
        x = -280 + random.uniform(0, 40)
        while x < 1840:
            L = (5 + 46 * t) * random.uniform(0.5, 1.5)
            if random.random() < 0.6:
                lys.append(f"M{f(x)},{f(y)}h{f(L)}")
            else:
                mork.append(f"M{f(x)},{f(y + 1)}h{f(L * 0.8)}")
            x += L + random.uniform(14, 70) * (0.7 + t)
        y += 2.2 + 9 * t ** 1.4
    strek("".join(lys), "#EEF2F1", 0.8, ' stroke-linecap="round" opacity="0.55"')
    strek("".join(mork), "#7A8B93", 0.8, ' stroke-linecap="round" opacity="0.3"')
    PREC[0] = 1


# ---------------------------------------------------------------- the right bank
G1 = ("#2C4A35", "#3A5E41", "#4F7A4D")
G2 = ("#33553A", "#466E43", "#62894F")
G3 = ("#3D6138", "#55803F", "#76A050")
G4 = ("#4C6F3A", "#68914A", "#8DB25A")


def bredd():
    random.seed(21)
    land = [(924, 236), (990, 200), (1840, 186), (1840, 438)] + list(reversed(SAND_TOPP()))[:-1] + [(1138, 396), (1134, 360), (1100, 350), (1000, 344), (950, 340), (930, 300)]
    sti(P(land), "#34553A")
    # the golden field glimpsed on the far right, and the road leaving the bridge
    sti(glatt([(1440, 296), (1600, 292), (1840, 290), (1840, 332), (1600, 330), (1440, 328)], True), "#D8BC66")
    sti(P([(1440, 300), (1840, 296), (1840, 300), (1440, 304)]), "#C3A651")
    strek("M1440,297 C1600,293 1700,292 1840,291", "#6E7A3E", 2.2, ' opacity="0.6"')
    # the tall trees behind the bowstring, then lower ones, back to front
    for _ in range(84):
        cx = random.uniform(920, 1850)
        cy = random.uniform(150, 240)
        if cx < 1000:
            cy = random.uniform(205, 250)
        krone(cx, cy, random.uniform(26, 40), random.choice([G1, G1, G2, G2, G3]), 2, 3)
    for x in [1018, 1086, 1196, 1262, 1388, 1470, 1560, 1700, 1772]:
        gran(x + random.uniform(-8, 8), random.uniform(300, 320), random.uniform(120, 160), "#22392A", "#2F4C36")
    for _ in range(62):
        cx = random.uniform(930, 1850)
        cy = random.uniform(236, 300)
        if 1440 < cx < 1850 and cy > 262:
            cy = random.uniform(236, 262)
        krone(cx, cy, random.uniform(20, 30), random.choice([G1, G2, G2, G3, G3]), 3, 3)
    # a pale birch at the bank's corner, as in the photo
    krone(968, 258, 26, ("#5E7F4C", "#7A9B5C", "#9CB874"))
    krone(948, 286, 18, ("#56774A", "#6F9257", "#8DAE6B"))
    # the grassy slope down to the water, then its bushes, back to front
    gid = nid("gress")
    A(f'<linearGradient id="{gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4F7A3A"/>'
      f'<stop offset="1" stop-color="#6E9646"/></linearGradient>')
    with grov():
        sti(P([(1136, 336), (1840, 330), (1840, 438)] + list(reversed(SAND_TOPP()))[:-3] + [(1138, 398)]), f"url(#{gid})")
        gress = []
        for _ in range(600):
            x = random.uniform(1138, 1840)
            y = random.uniform(338, sand_topp_y(x) - 2)
            gress.append(f"M{f(x)},{f(y)}l{f(random.uniform(-1.5, 1.5))},{f(-random.uniform(3, 7))}")
        strek("".join(gress[::2]), "#8DB25A", 0.8, ' opacity="0.7"')
        strek("".join(gress[1::2]), "#3E6534", 0.8, ' opacity="0.6"')
    busker = [(random.uniform(1138, 1850), random.uniform(330, 396)) for _ in range(120)]
    for cx, cy in sorted(busker, key=lambda b: b[1]):
        if cy > sand_topp_y(cx) - 10:
            continue
        krone(cx, cy, random.uniform(11, 20), random.choice([G2, G3, G4, G4]), 2, 3)
    for _ in range(14):
        cx = random.uniform(1440, 1850)
        krone(cx, random.uniform(318, 334), random.uniform(10, 15), random.choice([G3, G4]), 2)
    # the bank under the bridge, in shadow, over the inlet
    for _ in range(26):
        krone(random.uniform(950, 1140), random.uniform(324, 346), random.uniform(9, 15), random.choice([G1, G2]), 1)
    # the riprap along the shore, above the sand
    random.seed(23)
    for _ in range(90):
        t = random.random()
        x = lerp(1132, 1330, t)
        y = lerp(388, 410, t) + random.uniform(-6, 5)
        r = random.uniform(2.6, 5.6)
        sti(klump(x, y, r, 6, 0.25, 0.7, 1.15), random.choice(["#4A4844", "#58564F", "#66635C", "#3E3B37"]))
        sti(klump(x - r * 0.3, y - r * 0.3, r * 0.45, 5, 0.2, 0.7, 1.1), "#8A867D", ' opacity="0.6"')

    # the sandbar
    sid = nid("sand")
    A(f'<linearGradient id="{sid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E1CDAA"/>'
      f'<stop offset="0.55" stop-color="#D3BC98"/><stop offset="1" stop-color="#C2A985"/></linearGradient>')
    sand = SAND_TOPP() + SAND_BUNN()
    sti(glatt(sand, True), f"url(#{sid})")
    # its wet, darker lower edge and the thin line of the water
    bunn = SAND_BUNN()
    strek(glatt(bunn, False), "#A89074", 5, ' stroke-linecap="round" opacity="0.55"')
    strek(glatt([(x, y + 2.2) for x, y in bunn], False), "#8F7C67", 1.1, ' opacity="0.6"')
    # the grass meeting the sand
    strek(glatt(SAND_TOPP()[3:], False), "#6E8A47", 2.2, ' opacity="0.7"')
    # wind ripples and grains in the sand
    random.seed(25)
    rr = []
    for _ in range(46):
        x = random.uniform(1000, 1800)
        y = random.uniform(420, 520)
        if y < sand_topp_y(x) + 6 or y > sand_bunn_y(x) - 6:
            continue
        L = random.uniform(14, 40)
        rr.append(f"M{f(x)},{f(y)}q{f(L/2)},{f(-2.4)} {f(L)},0")
    strek("".join(rr), "#BDA37F", 0.9, ' stroke-linecap="round" opacity="0.6"')
    korn = []
    for _ in range(420):
        x = random.uniform(940, 1840)
        y = random.uniform(404, 548)
        if y < sand_topp_y(x) + 3 or y > sand_bunn_y(x) - 3:
            continue
        korn.append(f"M{f(x)},{f(y)}h0.01")
    strek("".join(korn[::2]), "#B49B79", 1.6, ' stroke-linecap="round" opacity="0.5"')
    strek("".join(korn[1::2]), "#EFE2C8", 1.4, ' stroke-linecap="round" opacity="0.6"')


def _interp(pts, x):
    pts = sorted(pts)
    for (xa, ya), (xb, yb) in zip(pts, pts[1:]):
        if xa <= x <= xb:
            return lerp(ya, yb, (x - xa) / (xb - xa))
    return pts[-1][1]


def sand_topp_y(x):
    return _interp(SAND_TOPP(), x)


def sand_bunn_y(x):
    return _interp(SAND_BUNN(), x)


# ---------------------------------------------------------------- the bridge
STAAL = "#5B4A43"
STAAL_M = "#382D29"
STAAL_L = "#9A8778"
STAAL_F = "#857770"   # the far truss, through the air
FAR = (2.5, -6.0)     # where the far truss sits relative to the near one


def dekk(x):
    """The deck's lower chord, falling a little to the right."""
    return 319.5 + (x - 210) * 0.0034


def topp_venstre(x):
    """The long span's top chord: high over the piers, sagging between."""
    # a quadratic Bézier from (245,228) over (520,288) to (797,231), solved for x
    ax, cx_, bx = 245, 520, 797
    a = ax - 2 * cx_ + bx
    b = 2 * (cx_ - ax)
    c = ax - x
    t = (-c / b) if abs(a) < 1e-9 else (-b + math.sqrt(b * b - 4 * a * c)) / (2 * a)
    return (1 - t) ** 2 * 228 + 2 * (1 - t) * t * 288 + t * t * 231


def bue(x):
    """The bowstring's arch, near rib."""
    return 247 + 75 * ((x - 1139.5) / 182.5) ** 2


def arm(x):
    """The cantilever arm's top chord, from the post down to the deck."""
    return 231 + (x - 797) / (957 - 797) * (dekk(957) - 231)


def stang(x1, y1, x2, y2, b, farge=STAAL, lys=STAAL_L, mork=STAAL_M, kant=True):
    """A steel member: its body, a lit upper edge, a dark lower edge."""
    A(f'<path d="M{f(x1)},{f(y1)} L{f(x2)},{f(y2)}" stroke="{farge}" stroke-width="{f(b)}"/>')
    if not kant:
        return
    dx, dy = x2 - x1, y2 - y1
    L = math.hypot(dx, dy)
    nx, ny = -dy / L, dx / L
    if ny > 0 or (abs(ny) < 1e-6 and nx > 0):
        nx, ny = -nx, -ny
    o1 = b / 2 - 0.5
    A(f'<path d="M{f(x1 + nx * o1)},{f(y1 + ny * o1)} L{f(x2 + nx * o1)},{f(y2 + ny * o1)}" stroke="{lys}" stroke-width="0.9"/>')
    A(f'<path d="M{f(x1 - nx * o1)},{f(y1 - ny * o1)} L{f(x2 - nx * o1)},{f(y2 - ny * o1)}" stroke="{mork}" stroke-width="0.9"/>')


def kurve(fn, xa, xb, steg=6):
    pts = []
    x = xa
    while x < xb:
        pts.append((x, fn(x)))
        x += steg
    pts.append((xb, fn(xb)))
    return pts


def kurvestang(pts, b, farge=STAAL, lys=STAAL_L, mork=STAAL_M, kant=True):
    d = glatt(pts, False)
    A(f'<path d="{d}" stroke="{farge}" stroke-width="{f(b)}" stroke-linejoin="round"/>')
    if kant:
        A(f'<path d="{glatt([(x, y - b / 2 + 0.5) for x, y in pts], False)}" stroke="{lys}" stroke-width="0.9"/>')
        A(f'<path d="{glatt([(x, y + b / 2 - 0.5) for x, y in pts], False)}" stroke="{mork}" stroke-width="0.9"/>')


VENSTRE_BUNN = [247, 357, 467, 578, 687, 797]
VENSTRE_TOPP = [302, 412, 523, 632, 742]
BUE_NODER = [957 + k * (1322 - 957) / 8 for k in range(9)]


def fagverk(dx=0.0, dy=0.0, langt=False):
    """The trusses. With langt=True: the far one, offset, paler, thinner."""
    s = 0.8 if langt else 1.0
    farge = STAAL_F if langt else STAAL
    kw = dict(farge=farge, kant=not langt)
    T = lambda x, y: (x + dx, y + dy)

    # the long span: the end's pointed nose, the sagging top chord, Warren diagonals, hangers
    (ax, ay), (bx, by) = T(180, 265), T(245, 228)
    stang(ax, ay, bx, by, 5.4 * s, **kw)
    (cx, cy) = T(244, dekk(244))
    stang(ax, ay, cx, cy, 4.2 * s, **kw)
    kurvestang([T(x, y) for x, y in [(245, 228)] + kurve(topp_venstre, 252, 797, 18)], 5.6 * s, **kw)
    for xb, xt in zip(VENSTRE_BUNN, VENSTRE_TOPP):
        stang(*T(xb, dekk(xb)), *T(xt, topp_venstre(xt)), 4.2 * s, **kw)
    for xt, xb in zip(VENSTRE_TOPP, VENSTRE_BUNN[1:]):
        stang(*T(xt, topp_venstre(xt)), *T(xb, dekk(xb)), 4.2 * s, **kw)
    for xt in VENSTRE_TOPP:
        stang(*T(xt, topp_venstre(xt) + 2), *T(xt, dekk(xt)), 1.5 * s, kant=False, farge=farge)
    # the cantilever arm, down to the deck
    stang(*T(797, 231), *T(957, dekk(957)), 5.2 * s, **kw)
    for xa, xb_, opp in [(797, 850, True), (850, 905, False), (905, 932, True)]:
        if opp:
            stang(*T(xa, dekk(xa)), *T(xb_, arm(xb_)), 3.8 * s, **kw)
        else:
            stang(*T(xa, arm(xa)), *T(xb_, dekk(xb_)), 3.8 * s, **kw)
    for xh in (850, 905):
        stang(*T(xh, arm(xh) + 2), *T(xh, dekk(xh)), 1.4 * s, kant=False, farge=farge)
    # the bowstring
    for k in range(9):
        x = BUE_NODER[k]
        if 0 < k < 8:
            stang(*T(x, bue(x) + 2), *T(x, dekk(x)), 1.4 * s, kant=False, farge=farge)
    for k in range(0, 8, 2):
        a, b, c = BUE_NODER[k], BUE_NODER[k + 1], BUE_NODER[k + 2]
        stang(*T(a, dekk(a)), *T(b, bue(b)), 3.4 * s, **kw)
        stang(*T(b, bue(b)), *T(c, dekk(c)), 3.4 * s, **kw)
    for k in range(1, 7, 2):
        a, b, c = BUE_NODER[k], BUE_NODER[k + 1], BUE_NODER[k + 2]
        stang(*T(a, dekk(a)), *T(b, bue(b)), 1.8 * s, kant=False, farge=farge)
        stang(*T(b, bue(b)), *T(c, dekk(c)), 1.8 * s, kant=False, farge=farge)
    kurvestang([T(x, y) for x, y in kurve(bue, 957, 1322, 8)], 5.4 * s, **kw)
    # the posts over the piers
    if not langt:
        stang(247, 228, 247, 336, 5, farge=STAAL, lys=STAAL_L, mork=STAAL_M)
        stang(797, 229, 797, 341, 9.5, farge=STAAL, lys=STAAL_L, mork=STAAL_M)
        A('<path d="M795,231 V340" stroke="#7A685C" stroke-width="3.2"/>')
    else:
        stang(*T(247, 228), *T(247, dekk(247)), 4, farge=STAAL_F, kant=False)
        stang(*T(797, 229), *T(797, dekk(797)), 7.5, farge=STAAL_F, kant=False)


def lykt(x, y, hoyde, side=1, farge="#4F4642", lys="#EDE6CE"):
    """A lamp post with its arm reaching over the road."""
    strek(f"M{f(x)},{f(y)} V{f(y - hoyde)} q0,-3 {f(3.5 * side)},-3.4", farge, 1.25)
    A(f'<ellipse cx="{f(x + 4.6 * side)}" cy="{f(y - hoyde - 2.6)}" rx="1.9" ry="1" fill="{lys}"/>')


def pilar(x0, x1, ytopp, ybunn, kapp=4):
    """A stone pier: a cap, courses of stone, the lit face and the shaded side."""
    b = x1 - x0
    sti(P([(x0 - kapp, ytopp - 7), (x1 + kapp, ytopp - 7), (x1 + kapp, ytopp), (x0 - kapp, ytopp)]), "#CFCAC0")
    sti(P([(x0 - kapp, ytopp - 1.4), (x1 + kapp, ytopp - 1.4), (x1 + kapp, ytopp), (x0 - kapp, ytopp)]), "#8F8A82")
    sti(P([(x0, ytopp), (x1, ytopp), (x1, ybunn), (x0, ybunn)]), "#BDB8AE")
    sti(P([(x0 + b * 0.68, ytopp), (x1, ytopp), (x1, ybunn), (x0 + b * 0.68, ybunn)]), "#9A958C")
    y = ytopp + 6.5
    rad = 0
    while y < ybunn - 2:
        strek(f"M{f(x0)},{f(y)} H{f(x1)}", "#8C877F", 0.6, ' opacity="0.7"')
        xx = x0 + (4 if rad % 2 else 9)
        while xx < x1 - 2:
            strek(f"M{f(xx)},{f(y - 6.5)} v6.5", "#8C877F", 0.5, ' opacity="0.55"')
            xx += 11
        y += 6.5
        rad += 1
    # the waterline: the stone darker where the river wets it
    sti(P([(x0, ybunn - 7), (x1, ybunn - 7), (x1, ybunn), (x0, ybunn)]), "#6E6A63", ' opacity="0.55"')
    strek(f"M{f(x0 - 3)},{f(ybunn + 0.6)} H{f(x1 + 3)}", "#E9EDEC", 1, ' opacity="0.7"')


def bru():
    random.seed(31)
    # the stone piers, under everything else
    pilar(231, 264, 341, 405)
    pilar(779, 815, 346, 408, 5)
    pilar(944, 972, 333, 352, 3)   # the bowstring's pier; bushes hide its foot
    sti(P([(1372, 328), (1424, 328), (1424, 346), (1372, 346)]), "#A9A49A")

    A(f'<g fill="none" stroke-linecap="butt">')
    # the far truss, then the bracing between the two top chords
    fagverk(*FAR, langt=True)
    for xs in VENSTRE_TOPP + [245, 797]:
        y = topp_venstre(xs) if xs not in (245, 797) else (228 if xs == 245 else 231)
        strek(f"M{f(xs)},{f(y)} l{f(FAR[0])},{f(FAR[1])}", STAAL_M, 1.3)
    for a, b in zip([245] + VENSTRE_TOPP, VENSTRE_TOPP + [797]):
        ya = topp_venstre(a) if a != 245 else 228
        yb = topp_venstre(b) if b != 797 else 231
        strek(f"M{f(a)},{f(ya)} L{f(b + FAR[0])},{f(yb + FAR[1])} M{f(a + FAR[0])},{f(ya + FAR[1])} L{f(b)},{f(yb)}", STAAL_M, 0.8, ' opacity="0.8"')
    for k in range(1, 9):
        a, b = BUE_NODER[k - 1], BUE_NODER[k]
        strek(f"M{f(a)},{f(bue(a))} L{f(b + FAR[0])},{f(bue(b) + FAR[1])} M{f(a + FAR[0])},{f(bue(a) + FAR[1])} L{f(b)},{f(bue(b))}", STAAL_M, 0.8, ' opacity="0.8"')
    A('</g>')

    # the deck: the far railing, the road, the near girder and its railing
    xa, xb = 150, 1480
    ya, yb = dekk(xa), dekk(xb)
    strek(f"M{xa},{f(ya - 12)} L{xb},{f(yb - 12)}", "#8C7F77", 0.9)
    strek(f"M{xa},{f(ya - 9.5)} L{xb},{f(yb - 9.5)}", "#8C7F77", 0.6)
    sti(P([(xa, ya - 7), (xb, yb - 7), (xb, yb - 1), (xa, ya - 1)]), "#A49D95")
    sti(P([(xa, ya - 1.5), (xb, yb - 1.5), (xb, yb + 7.5), (xa, ya + 7.5)]), "#4C3F3A")
    strek(f"M{xa},{f(ya - 1.3)} L{xb},{f(yb - 1.3)}", "#A69384", 1)
    strek(f"M{xa},{f(ya + 7)} L{xb},{f(yb + 7)}", "#2E2522", 1)
    # brackets under the deck at the panel points
    for x in VENSTRE_BUNN + VENSTRE_TOPP + [850, 905] + BUE_NODER[1:-1]:
        sti(P([(x - 2.2, dekk(x) + 7), (x + 2.2, dekk(x) + 7), (x + 1.6, dekk(x) + 12.5), (x - 1.6, dekk(x) + 12.5)]), "#3E3330")

    # the lamp posts, the far ones first
    for x in (300, 465, 632, 742, 905, 1057, 1240, 1405):
        lykt(x + FAR[0], dekk(x) - 9.5, 44, 1, "#7C716B", "#E4DDC6")

    A('<g fill="none">')
    fagverk()
    A('</g>')

    # the near railing, in front of the road
    rail = []
    x = xa
    while x <= xb:
        rail.append(f"M{f(x)},{f(dekk(x) - 6.6)}v5.4")
        x += 3.4
    strek("".join(rail), "#6A5C55", 0.55)
    strek(f"M{xa},{f(ya - 6.8)} L{xb},{f(yb - 6.8)}", "#76675F", 1.15)
    strek(f"M{xa},{f(ya - 3.8)} L{xb},{f(yb - 3.8)}", "#76675F", 0.6)
    for x in (358, 520, 685, 692, 963, 1148, 1316, 1332):
        lykt(x, dekk(x) - 6.8, 46, -1 if x in (692, 1332) else 1)


def foran():
    """Bushes at the water in front of the bowstring's pier and the abutment."""
    random.seed(41)
    for _ in range(16):
        krone(random.uniform(926, 992), random.uniform(338, 360), random.uniform(8, 13), random.choice([G1, G2, G3]), 1)
    for _ in range(10):
        krone(random.uniform(1360, 1440), random.uniform(338, 352), random.uniform(8, 12), random.choice([G3, G4]), 1)


# ---------------------------------------------------------------- the birch
BJ = ["#2E5223", "#3F6B2A", "#53852F", "#6E9E36", "#8AB640", "#AACB52", "#C6DC6E"]


def bjork_omriss():
    # the edge seen against the river, from the top round to the bottom
    hoyre = [(-280, 170), (-200, 132), (-120, 108), (-50, 92), (0, 82), (34, 62), (70, 48), (106, 40), (138, 48), (156, 70),
             (150, 96), (160, 128), (162, 168), (168, 204), (180, 240), (200, 276), (214, 306), (216, 346), (216, 392),
             (228, 440), (240, 486), (248, 540), (252, 600), (260, 710)]
    return hoyre + [(-280, 710)]


BJ_PAL = [
    ("#2C4F22", "#3D6A2A", "#557F31"),
    ("#36602A", "#4D7D30", "#6C9A3A"),
    ("#457530", "#5F9036", "#86B044"),
    ("#55873A", "#76A63F", "#A2C653"),
    ("#669A3C", "#8DBA48", "#BFDA6A"),
]


def bjork():
    random.seed(51)
    omr = bjork_omriss()

    def kant_x(y):
        return _interp([(yy, xx) for xx, yy in omr[3:-1]], y)

    # the dark heart, well inside the edge, so no gaps open behind the crowns
    kjerne = [(-280, 200), (-150, 160), (-40, 130), (40, 100), (90, 90), (120, 140), (130, 220), (160, 320),
              (184, 440), (200, 560), (210, 712), (-280, 712)]
    with grov():
        sti(glatt(kjerne), BJ_PAL[0][0])
        # shadowed texture inside, so the heart is leafy, not flat
        indre = []
        for _ in range(140):
            y = random.uniform(110, 712)
            x = random.uniform(-280, kant_x(y) - 40)
            indre.append(klump(x, y, random.uniform(10, 22), 6, 0.3, 0.9))
        sti("".join(indre), "#33592A")

    # the white trunk and two limbs, shaded on the right, with their black marks
    lemmer = [
        ([(-96, 712), (-70, 580), (-46, 450), (-22, 320), (0, 230)], 16),
        ([(-58, 520), (6, 496), (70, 478), (130, 466)], 5.5),
        ([(-36, 400), (20, 376), (80, 360), (126, 352)], 4.4),
    ]
    for pts, b in lemmer:
        strek(glatt(pts, False), "#ECEAE3", b, ' stroke-linecap="round"')
        strek(glatt([(x + b * 0.3, y + b * 0.06) for x, y in pts], False), "#BAB6AB", b * 0.36, ' stroke-linecap="round"')
        merker = []
        for (xa, ya), (xb, yb) in zip(pts, pts[1:]):
            L = math.hypot(xb - xa, yb - ya)
            nx, ny = -(yb - ya) / L, (xb - xa) / L
            for _ in range(int(L / 10)):
                t = random.random()
                x, y = lerp(xa, xb, t), lerp(ya, yb, t)
                m = b * random.uniform(0.25, 0.62)
                merker.append(f"M{f(x - nx * m / 2)},{f(y - ny * m / 2)}l{f(nx * m)},{f(ny * m)}")
        strek("".join(merker), "#262624", max(0.9, b * 0.14), ' stroke-linecap="round"')

    # the crowns, as lobes: inner ones first and darker; the lobes on the
    # outer edge last and lit, each with a curtain of weeping twigs under it
    inner = []
    for _ in range(40):
        y = random.uniform(80, 712)
        x = random.uniform(-280, kant_x(y) - 70)
        if y > 380 and -120 < x < 10 and random.random() < 0.7:
            continue   # let the trunk show low down
        inner.append((x, y, random.uniform(38, 60) * (0.75 if y < 170 else 1)))
    lober = []
    y = 46.0
    while y < 712:
        r = random.uniform(26, 46) * (0.72 if y < 130 else 1)
        lober.append((kant_x(y) - r * 0.72 + random.uniform(-26, 12), y, r))
        y += random.uniform(34, 62)
    for x, y, r in [(-200, 160, 46), (-110, 122, 44), (-20, 100, 40), (50, 66, 34), (104, 48, 26)]:
        lober.append((x, y, r))

    gardiner = []
    with grov():
        for x, y, r in sorted(inner, key=lambda k: k[0]):
            naer = max(0.0, 1 - (kant_x(y) - x) / 300)
            i = max(0, min(2, int((0.15 + 0.5 * naer + random.uniform(-0.1, 0.12)) * 3)))
            krone(x, y, r, BJ_PAL[i], n_lys=4, n_mid=6)
        for x, y, r in sorted(lober, key=lambda k: k[1] + random.uniform(-60, 60)):
            i = max(2, min(4, int(2 + (1 - (y - 40) / 700) * 2.2 + random.uniform(-0.6, 0.6))))
            pal = BJ_PAL[i]
            # a lobe: one big crown with two smaller ones hanging off its lit side
            krone(x, y, r, pal, n_lys=5, n_mid=7)
            for _ in range(2):
                a = random.uniform(-0.6, 0.9)
                krone(x + math.cos(a) * r * 0.75, y + math.sin(a) * r * 0.7, r * random.uniform(0.38, 0.52), BJ_PAL[min(4, i + random.choice([0, 1]))], 3, 4)
            # where its curtain of twigs hangs from: under the lobe's outer half
            for _ in range(random.randint(2, 4)):
                a = random.uniform(0.15, 1.35)
                gardiner.append((x + math.cos(a) * r * 0.9, y + math.sin(a) * r * 0.82, pal))

        # the weeping twigs: thin, drooping, small leaves either side
        for x0, y0, pal in gardiner:
            lengde = random.uniform(14, 46)
            bue_ = random.uniform(-0.18, 0.4)
            blader = []
            s = 0.0
            side = 1
            while s < lengde:
                x = x0 + bue_ * s * s / lengde
                y = y0 + s
                r = random.uniform(2.4, 3.4) * (1 - 0.35 * s / lengde)
                blader.append(klump(x + side * r * 0.8, y, r, 5, 0.25, 1.25, 1.15))
                side = -side
                s += r * random.uniform(1.0, 1.6)
            strek(f"M{f(x0)},{f(y0)}q0,{f(lengde * 0.5)} {f(bue_ * lengde)},{f(lengde)}", "#56502F", 0.55)
            sti("".join(blader), random.choice([pal[1], pal[1], pal[0]]))


# ---------------------------------------------------------------- the pine
FURU = ["#172A1F", "#1F3829", "#284532", "#34573E", "#4A6E4E"]


def furu():
    random.seed(61)
    grener = [
        [(800, -150), (850, -50), (920, 30), (990, 84), (1046, 140)],
        [(880, -150), (960, -70), (1060, -10), (1160, 40), (1250, 86)],
        [(1060, -150), (1120, -80), (1200, -30), (1290, 34)],
        [(1330, -150), (1390, -50), (1460, 24), (1512, 96)],
        [(1450, -150), (1530, -70), (1630, -10), (1750, 50), (1840, 64)],
        [(1600, -150), (1650, -90), (1700, -20), (1744, 36)],
    ]

    def kvist(pts, lag, nl, tett=1.3):
        """Needles along a twig, pointing forward like a bottle brush."""
        for (xa, ya), (xb, yb) in zip(pts, pts[1:]):
            L = math.hypot(xb - xa, yb - ya)
            ux, uy = (xb - xa) / L, (yb - ya) / L
            n = max(1, int(L / tett))
            for k in range(n):
                x, y = lerp(xa, xb, k / n), lerp(ya, yb, k / n)
                for side in (-1, 1):
                    a = side * random.uniform(0.4, 1.1)
                    c, s_ = math.cos(a), math.sin(a)
                    dx, dy = ux * c - uy * s_, ux * s_ + uy * c
                    dy += 0.25   # the needles droop a little
                    l = nl * random.uniform(0.7, 1.2)
                    i = min(len(FURU) - 1, int(random.random() ** 1.3 * len(FURU)))
                    if dy < -0.1:
                        i = min(len(FURU) - 1, i + 1)   # needles facing up catch the light
                    lag[i].append(f"M{f(x)},{f(y)}l{f(dx * l)},{f(dy * l)}")

    with grov():
        for gren in grener:
            hoved = []
            for (xa, ya), (xb, yb) in zip(gren, gren[1:]):
                n = max(1, int(math.hypot(xb - xa, yb - ya) / 9))
                for k in range(n):
                    hoved.append((lerp(xa, xb, k / n), lerp(ya, yb, k / n)))
            hoved.append(gren[-1])
            # side twigs, irregular, drooping toward their tips, some forking
            kvister = []
            i = 1
            while i < len(hoved) - 1:
                x, y = hoved[i]
                ux, uy = hoved[i + 1][0] - x, hoved[i + 1][1] - y
                L = math.hypot(ux, uy)
                ux, uy = ux / L, uy / L
                for side in random.sample([-1, 1], random.choice([1, 1, 2])):
                    a = side * random.uniform(0.5, 1.1)
                    lengde = random.uniform(20, 50) * (1 - 0.4 * i / len(hoved))
                    dx, dy = ux * math.cos(a) - uy * math.sin(a), ux * math.sin(a) + uy * math.cos(a)
                    pts = [(x, y)]
                    for k in range(1, 5):
                        s = lengde * k / 4
                        pts.append((x + dx * s, y + dy * s + 0.014 * s * s))
                    kvister.append(pts)
                i += random.choice([1, 2, 2, 3])
            lag = [[] for _ in FURU]
            for pts in kvister:
                kvist(pts, lag, 12)
            kvist(hoved, lag, 15)
            strek(glatt(gren, False), "#30261E", 3)
            strek("".join(glatt(p, False) for p in kvister), "#30261E", 1.3)
            for k, linjer in enumerate(lag):
                strek("".join(linjer), FURU[k], 1.15, ' stroke-linecap="round"')


# ---------------------------------------------------------------- writing
MAPPE = os.path.join(os.path.dirname(__file__), "tegninger")
PUBLIC = os.path.join(os.path.dirname(__file__), "..", "public", "images", "tegninger", "brua")
KROM = r"C:\Program Files\Google\Chrome\Application\chrome.exe"


def tegn(*deler):
    o.clear()
    for d in deler:
        d()
    return chr(10).join(o)


def lagre(sti_, innhold):
    tmp = sti_ + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        fh.write(innhold)
    os.replace(tmp, sti_)


def svg(innhold, vb=VB, b=None, h=None):
    _, _, vw, vh = vb.split()
    b = b or vw
    h = h or vh
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" width="{b}" height="{h}">' + chr(10) + innhold + chr(10) + "</svg>")


def main():
    os.makedirs(PUBLIC, exist_ok=True)
    os.makedirs(MAPPE, exist_ok=True)
    scene = tegn(fjernt, elv, bredd, bru, foran)
    b = tegn(bjork)
    fu = tegn(furu)
    for navn, innhold in [("scene", scene), ("bjork", b), ("furu", fu)]:
        p = os.path.join(PUBLIC, navn + ".svg")
        lagre(p, svg(innhold, LAG[navn]))
        print(f"{navn}.svg", os.path.getsize(p) // 1024, "KB")
    # a preview of the photo's own frame, and of the whole scene
    for navn, vb, skala in [("brua-foto", "0 0 1544 586", 1.2), ("brua-alt", VB, 0.8)]:
        _, _, vw, vh = (float(t) for t in vb.split())
        bb, hh = round(vw * skala), round(vh * skala)
        hel = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" width="{bb}" height="{hh}">'
               f'<rect x="{X0}" y="{Y0}" width="{X1 - X0}" height="{Y1 - Y0}" fill="#F3F4F1"/>'
               + scene + b + fu + "</svg>")
        p = os.path.abspath(os.path.join(MAPPE, navn + ".svg"))
        lagre(p, hel)
        png = os.path.abspath(os.path.join(MAPPE, navn + ".png"))
        subprocess.run([KROM, "--headless=new", "--disable-gpu", "--hide-scrollbars", f"--window-size={bb},{hh}",
                        f"--screenshot={png}", "file:///" + p.replace(os.sep, "/")], check=True, capture_output=True)
        print("preview", png)


if __name__ == "__main__":
    main()
