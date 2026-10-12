"""The front page's hero, drawn (it replaced the photograph; see Hero.tsx).

Morning over Glomma: a soft summer sky and a low morning sun just above the
blue hills. Glomma comes out from under the sun and flows towards you,
widening, with the sun's path lying on the water; the old truss bridge
crosses it in the middle distance; the town's painted houses climb the right
bank to the fortress on its hill; fields, farms and creek-side trees on the
left bank; summer treetops in front framing the river. The first scene of
the page's one summer day: morning here, afternoon over the fortress in «Om
oss», dusk at the bridge in the footer.

Drawn in the footer bridge's manner (tools/tegn_brua.py): flat shapes, soft
gradients, lighter and bluer with distance, reflections in the water. The
sun stands low in front of you, so everything is lit from behind: a warm rim
along the tops of the trees and the roof ridges, and long soft shadows lying
towards you across the fields.

Drawn in two depths, like the photo's far/near: far (sky, hills, fields,
town, fortress, river, bridge) and near (the treetops in front). Nothing on
the site moves them apart any more, so they are written flattened, as one
picture: one download and one decode for a phone instead of two (the drawing
is the largest thing on a phone's first screen, which PageSpeed times):
  tegnet.webp   4800 x 3200 (3:2, like the photo), into src/components/forside/utsikt/.

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
_ut = [[]]
_id = [0]


def A(s):
    _ut[0].append(s)


class lag:
    """Draw into a list of its own, to be stacked in order later."""

    def __enter__(self):
        self.liste, self.forrige = [], _ut[0]
        _ut[0] = self.liste
        return self.liste

    def __exit__(self, *a):
        _ut[0] = self.forrige


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


def rgb(c):
    return [int(c[i:i + 2], 16) for i in (1, 3, 5)]


def blend(c1, c2, t):
    a, b = rgb(c1), rgb(c2)
    return "#" + "".join(f"{round(lerp(x, y, t)):02X}" for x, y in zip(a, b))


def mork(c, t):
    return blend(c, "#1C2620", t)


def lum(c):
    r, g, b = rgb(c)
    return (0.3 * r + 0.59 * g + 0.11 * b) / 255


def _cr(p0, p1, p2, p3, t):
    return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t ** 3)


def spline(pts, n=8):
    """Points along a Catmull-Rom curve through pts."""
    ut = []
    for i in range(len(pts) - 1):
        p0, p1, p2, p3 = pts[max(i - 1, 0)], pts[i], pts[i + 1], pts[min(i + 2, len(pts) - 1)]
        for k in range(n):
            t = k / n
            ut.append((_cr(p0[0], p1[0], p2[0], p3[0], t), _cr(p0[1], p1[1], p2[1], p3[1], t)))
    ut.append(pts[-1])
    return ut


# ---------------------------------------------------------------- light and air
SOL = (744, 384)          # the morning sun, just above the hills, between the words and the pane
HORISONT = 462            # where the plain meets the hills, under the sun
RIM = "#FCE5B2"           # the warm edge the low sun puts on everything facing it
SKYGGEFARGE = "#24434A"    # shadows lean cool against the warm light


def avstand(y):
    """How much air lies between you and flat ground at height y: towards 1 at the horizon, near 0 in front."""
    return 1 - math.exp(-11 / max(y - 458, 1.5))


def luftfarge(x):
    """The haze: blue-grey away from the sun, warm and pale under it."""
    return blend("#C4D4DC", "#F3E4C9", 0.8 * math.exp(-((x - SOL[0]) / 230) ** 2))


def luft(c, x, y, k=1.0):
    return blend(c, luftfarge(x), min(0.92, avstand(y) * k))


def luftpal(pal, x, y, k=1.0):
    return tuple(luft(c, x, y, k) for c in pal)


def rimstyrke(x, y=600):
    """The rim is strongest on things nearly in line with the sun, and fades in the haze."""
    return (0.18 + 0.6 * math.exp(-((x - SOL[0]) / 420) ** 2)) * (1 - 0.6 * avstand(y))


def p(y):
    """How big things are at height y on the flat ground (1 = a little way off)."""
    return 0.5 + (y - 470) * 0.026


SKYGGER = []   # (d) the shadows on the left bank's ground, drawn under everything standing on it


def skygge(x, y, b, L):
    """A soft shadow lying away from the sun, towards you, from the foot of something at (x, y)."""
    dx, dy = x - SOL[0], y - (HORISONT - 4)
    n = math.hypot(dx, dy) or 1
    dx, dy = dx / n, dy / n
    px, py = -dy, dx
    pts = [(x + px * b, y + py * b), (x + dx * L * 0.45 + px * b * 1.05, y + dy * L * 0.45 + py * b * 0.5),
           (x + dx * L, y + dy * L), (x + dx * L * 0.45 - px * b * 1.05, y + dy * L * 0.45 - py * b * 0.5), (x - px * b, y - py * b)]
    SKYGGER.append(glatt(pts))


# ---------------------------------------------------------------- trees
# summer greens, shared with the fortress band (tools/tegn_landskap.py)
GM = ("#24402B", "#2F5434", "#3E6B3A")
G = ("#3B6532", "#4E7E3A", "#6A9944")
GL = ("#56823A", "#6F9A42", "#8DB052")
OL = ("#6F7A2E", "#8E9A38", "#AEB24A")
BJ = ("#6F8E35", "#93AE48", "#BFCB68")


def _kn(r):
    return max(6, min(16, int(5 + r * 0.55)))


def form(n, j=0.16, sy=0.86):
    """A scalloped outline as unit points, to be drawn at several sizes and offsets."""
    pts = []
    for i in range(n):
        a = (i + random.uniform(-0.22, 0.22)) / n * 2 * math.pi
        rr = 1 + random.uniform(-j, j)
        pts.append((math.cos(a) * rr, math.sin(a) * rr * sy))
    return pts


def tegn_form(pts, cx, cy, r, bule=1.2):
    q = [(cx + x * r, cy + y * r) for x, y in pts]
    d = f"M{f(q[0][0])},{f(q[0][1])}"
    for i in range(len(q)):
        x1, y1 = q[i]
        x2, y2 = q[(i + 1) % len(q)]
        d += f"Q{f(cx + ((x1 + x2) / 2 - cx) * bule)},{f(cy + ((y1 + y2) / 2 - cy) * bule)} {f(x2)},{f(y2)}"
    return d + "Z"


def sone(liste, sk, dx, dy):
    return "".join(tegn_form(fm, lx + dx * lr, ly + dy * lr, lr * sk) for lx, ly, lr, fm in liste)


def masse(lober, pal, rim, s, ovre=None, lys_andel=1.0):
    """Leaf lobes painted as one mass, in tonal zones: a warm rim where the
    low sun catches the top, the shaded body, the mid tone over most of it
    (leaving shade along the far underside), light on the upper lobes."""
    ovre = lober if ovre is None else ovre
    if rim:
        # only where a lobe's top stands clear against the light
        topp = min(ly - lr * 0.86 for lx, ly, lr, fm in ovre)
        kant = [lb for lb in ovre if lb[1] - lb[2] * 0.86 < topp + (max(l[2] for l in ovre) * 0.7)]
        sti("".join(tegn_form(fm, lx + s * min(0.04 * lr, 0.3), ly - min(0.06 * lr, 0.42), lr) for lx, ly, lr, fm in kant), blend(pal[2], RIM, min(0.6, 0.15 + rim * 0.6)))
    sti(sone(lober, 1.0, -s * 0.02, 0.03), pal[0])
    sti(sone(lober, 0.83, s * 0.05, -0.08), pal[1])
    lyse = [lb for lb in ovre if random.random() < lys_andel]
    if lyse:
        sti(sone(lyse, 0.46, s * 0.3, -0.36), blend(pal[2], RIM, rim * 0.25))


def rekke(lober, pal, rim, frø=None):
    """A row of trees or bushes run together into one mass (a creek's trees, a bank's scrub)."""
    if frø is not None:
        random.seed(frø)
    s = 1 if SOL[0] >= sum(lb[0] for lb in lober) / len(lober) else -1
    masse([(lx, ly, lr, form(_kn(lr))) for lx, ly, lr in lober], pal, rim, s, lys_andel=0.45)


def krone(cx, cy, r, pal, detalj=1, rim=0.5):
    """A broadleaf crown lit from behind, painted in tonal zones rather than
    piece by piece: an outline of a few lobes; a warm rim where the low sun
    catches its top; the shaded body; the mid tone covering most of it, leaving
    shade along the far underside; light on the upper lobes towards the sun.
    Near (detalj 2) small leaf dabs break up the masses."""
    s = 1 if SOL[0] >= cx else -1          # which way the sun is
    if r < 1.4:
        sti(klump(cx, cy, r, 6, 0.2, 0.86, 1.2), pal[0])
        sti(klump(cx + s * r * 0.2, cy - r * 0.25, r * 0.55, 5, 0.2, 0.86, 1.2), pal[1])
        return
    nl = 1 if detalj == 0 else (3 + int(r / 8) if detalj == 1 else 6 + int(r / 5))
    if detalj < 2:
        lober = [(cx, cy, r * (0.9 if nl > 1 else 1.0), form(_kn(r)))]
        for _ in range(nl - 1):
            a = random.uniform(0, 2 * math.pi)
            d = r * random.uniform(0.22, 0.48)
            lr = r * random.uniform(0.42, 0.6)
            lober.append((cx + math.cos(a) * d, cy + math.sin(a) * d * 0.78, lr, form(_kn(lr))))
    else:
        # near: no big middle, lobes spread out and of all sizes, so the crown is irregular
        bred, hoy = random.uniform(0.9, 1.25), random.uniform(0.75, 1.0)
        lober = [(cx, cy + r * 0.08, r * 0.72, form(_kn(r * 0.72), 0.2))]
        for _ in range(nl - 1):
            a = random.uniform(0, 2 * math.pi)
            d = r * random.uniform(0.3, 0.62)
            lr = r * random.uniform(0.32, 0.56)
            lober.append((cx + math.cos(a) * d * bred, cy + math.sin(a) * d * hoy * 0.8, lr, form(_kn(lr), 0.2)))
    masse(lober, pal, rim, s, [lb for lb in lober if lb[1] <= cy + r * 0.08])
    if detalj == 2:
        skygge_, lyse = [], []
        for _ in range(int(r * 0.9)):
            a = random.uniform(0, 2 * math.pi)
            d = r * math.sqrt(random.random()) * 0.78
            x, y = cx + math.cos(a) * d, cy + math.sin(a) * d * 0.8
            rr = r * random.uniform(0.06, 0.11)
            (skygge_ if (y - cy) > r * 0.1 or (x - cx) * s < -r * 0.3 else lyse).append(klump(x, y, rr, 5, 0.3, 0.9, 1.15))
        sti("".join(skygge_), pal[0], ' opacity="0.5"')
        sti("".join(lyse), blend(pal[2], RIM, 0.3), ' opacity="0.75"')


def gran(x, base, h, mork_, lys_, b=0.34, rim=0.0):
    """A spruce: a tiered silhouette, lit on the side towards the sun."""
    w = h * b
    tiers = max(3, int(h / 9))
    right = []
    for t in range(1, tiers + 1):
        yy = base - h + h * t / tiers * 0.93
        ww = w / 2 * (0.16 + 0.84 * t / tiers) * random.uniform(0.86, 1.1)
        right.append((x + ww, yy))
        right.append((x + ww * 0.42, yy - h * 0.03))
    top = (x, base - h)
    left = [(2 * x - px, py) for px, py in reversed(right)]
    sti(P([top] + right + [(x + w * 0.08, base), (x - w * 0.08, base)] + left), mork_)
    if SOL[0] >= x:
        sti(P([top] + right + [(x, base)]), lys_)
        kant = [top] + right[:-2]
    else:
        sti(P([top, (x, base)] + left), lys_)
        kant = [top] + list(reversed(left))[:-2]
    if rim:
        strek("M" + " L".join(f"{f(px)},{f(py)}" for px, py in kant), blend(lys_, RIM, 0.6), max(0.2, h * 0.011), f' opacity="{f(rim * 0.55)}" stroke-linejoin="round"')


# ---------------------------------------------------------------- houses
def hus(x, y, b, h, vegg, tak, g=0.36, gavl_venstre=None, detalj=1, takh=0.52, pipe=None, dor=None):
    """A painted wooden house seen a little from the side: the gable end and
    the long wall, the roof from the ridge down over the long wall. y is the
    eaves, y + h the ground. The face towards the sun is lit, the other in the
    soft shade of a morning with the light behind."""
    if gavl_venstre is None:
        gavl_venstre = SOL[0] < x + b / 2          # the gable faces the sun
    gb = b * g
    L = b - gb
    rh = gb * takh
    sol_venstre = SOL[0] < x + b / 2
    gavl_lys = gavl_venstre == sol_venstre

    def M(px, py):
        return (px, py) if gavl_venstre else (2 * x + b - px, py)

    def flate(pts, c, extra=""):
        sti(P([M(*q) for q in pts]), c, extra)

    def linje(pts, c, bb, extra=""):
        strek("M" + " L".join(f"{f(M(*q)[0])},{f(M(*q)[1])}" for q in pts), c, bb, extra)

    gavlfarge = blend(vegg, RIM, 0.16) if gavl_lys else mork(vegg, 0.14)
    veggfarge = mork(vegg, 0.06) if gavl_lys else blend(vegg, RIM, 0.08)
    flate([(x, y + h), (x + gb, y + h), (x + gb, y), (x + gb / 2, y - rh), (x, y)], gavlfarge)
    flate([(x + gb, y + h), (x + b, y + h), (x + b, y), (x + gb, y)], veggfarge)
    lys_vegg = lum(vegg) > 0.62
    if detalj:
        # the eaves' shadow along the top of the long wall, the foundation along its foot
        flate([(x + gb, y), (x + b, y), (x + b, y + h * 0.14), (x + gb, y + h * 0.14)], "#1E2026", ' opacity="0.2"')
        flate([(x, y + h * 0.93), (x + b, y + h * 0.93), (x + b, y + h), (x, y + h)], "#6F6B64", ' opacity="0.55"')
        # windows on both faces: small, upright, two rows on a tall house;
        # white frames on dark walls; a door on the long wall
        ww, wh = h * 0.15, h * 0.26
        to = h > 7 and h > gb * 0.6
        rader = [0.22, 0.6] if to else [0.36]
        if to:
            wh = h * 0.22
        nL = max(1, int(L / (h * 0.52)))
        ng = max(1, int(gb / (h * 0.62)))
        med_dor = dor if dor is not None else random.random() < 0.6
        dx = x + gb + (L / nL if nL > 1 else L * 0.5) - h * 0.09
        ruter = []
        for r_ in rader:
            for i in range(nL):
                vx = x + gb + L * (i + 0.5) / nL - ww / 2
                if med_dor and r_ == rader[-1] and abs(vx + ww / 2 - (dx + h * 0.09)) < ww:
                    continue
                ruter.append((vx, y + h * r_))
            for i in range(ng):
                ruter.append((x + gb * (i + 0.5) / ng - ww / 2, y + h * r_))
        if rh > h * 0.45 and gb > h * 0.7:
            ruter.append((x + gb / 2 - ww * 0.4, y - rh * 0.42))
        rammer = "".join(P([M(vx, vy), M(vx + ww, vy), M(vx + ww, vy + wh), M(vx, vy + wh)]) for vx, vy in ruter)
        if lys_vegg:
            sti(rammer, "#4A5660")
        else:
            sti(rammer, "#F1ECE2")
            sti("".join(P([M(vx + ww * 0.22, vy + wh * 0.16), M(vx + ww * 0.78, vy + wh * 0.16), M(vx + ww * 0.78, vy + wh * 0.84), M(vx + ww * 0.22, vy + wh * 0.84)]) for vx, vy in ruter), "#3E4A52")
        if med_dor:
            flate([(dx, y + h * 0.48), (dx + h * 0.18, y + h * 0.48), (dx + h * 0.18, y + h * 0.93), (dx, y + h * 0.93)], mork(vegg, 0.45) if lys_vegg else "#EDE7DA")
            flate([(dx - h * 0.05, y + h * 0.93), (dx + h * 0.23, y + h * 0.93), (dx + h * 0.21, y + h), (dx - h * 0.03, y + h)], "#8C877E")
        if not lys_vegg:
            # white corner boards
            for cx_ in (x + 0.05 * h, x + gb, x + b - 0.05 * h):
                linje([(cx_, y + h * 0.1), (cx_, y + h * 0.93)], "#ECE6DA", h * 0.05)
    # the roof: the plane from the ridge down over the long wall, the gable's verge
    ov = h * 0.09
    flate([(x + gb / 2, y - rh), (x + gb / 2 + L + ov, y - rh), (x + b + ov * 1.4, y + ov * 0.8), (x + gb - ov * 0.2, y + ov * 0.8)], tak)
    if detalj:
        flate([(x + gb - ov * 0.2, y + ov * 0.8), (x + b + ov * 1.4, y + ov * 0.8), (x + b + ov * 1.1, y - ov * 0.2), (x + gb - ov * 0.5, y - ov * 0.2)], mork(tak, 0.3), ' opacity="0.6"')
    linje([(x - ov * 0.6, y + ov * 0.7), (x + gb / 2, y - rh - ov * 0.25)], tak, ov * 0.9, ' stroke-linecap="round"')
    rimc = blend(tak, RIM, 0.55)
    if pipe if pipe is not None else (detalj and random.random() < 0.6):
        px_ = x + gb / 2 + L * random.uniform(0.2, 0.75)
        pw = max(0.5, h * 0.11)
        flate([(px_, y - rh - h * 0.22), (px_ + pw, y - rh - h * 0.22), (px_ + pw, y - rh + rh * 0.35), (px_, y - rh + rh * 0.35)], random.choice(["#7A4A3E", "#5C5652", "#8B5A48"]))
        flate([(px_ - pw * 0.15, y - rh - h * 0.25), (px_ + pw * 1.15, y - rh - h * 0.25), (px_ + pw * 1.15, y - rh - h * 0.19), (px_ - pw * 0.15, y - rh - h * 0.19)], "#4A4542")
    linje([(x + gb / 2, y - rh), (x + gb / 2 + L + ov * 0.6, y - rh)], rimc, max(0.25, h * 0.05), ' stroke-linecap="round"')
    if gavl_lys:
        linje([(x + gb / 2, y - rh), (x + gb + ov * 0.2, y + ov * 0.4)], rimc, max(0.2, h * 0.035), ' opacity="0.8"')
    x0, x1 = (x - ov, x + b + ov)
    return (x0, x1, y - rh, y + h)


# ---------------------------------------------------------------- the river's course
# Glomma from where it comes out under the sun to the bottom of the picture:
# (height, middle, half the width). It bends right, then back left, and
# widens as it comes towards you.
MIDT = [(470, 744, 6), (481, 735, 9), (495, 731, 14), (511, 743, 21), (530, 768, 29), (556, 790, 43), (590, 787, 64), (630, 762, 88), (690, 712, 126), (760, 676, 172), (840, 650, 220)]


def elvlinje(y):
    """The river's middle and half its width at height y, along a smooth curve."""
    for i in range(len(MIDT) - 1):
        if MIDT[i][0] <= y <= MIDT[i + 1][0]:
            t = (y - MIDT[i][0]) / (MIDT[i + 1][0] - MIDT[i][0])
            p0, p1, p2, p3 = MIDT[max(i - 1, 0)], MIDT[i], MIDT[i + 1], MIDT[min(i + 2, len(MIDT) - 1)]
            return _cr(p0[1], p1[1], p2[1], p3[1], t), _cr(p0[2], p1[2], p2[2], p3[2], t)
    return MIDT[-1][1], MIDT[-1][2]


def bukter(y, liste):
    """Coves (< 0) and points (> 0) along a bank, growing with nearness."""
    return sum(a * math.exp(-((y - yc) / w) ** 2) for yc, a, w in liste) * max(0.0, y - 466) / 100


def smaabukter(y, fase):
    return (0.7 * math.sin(y * 0.55 + fase) + 0.45 * math.sin(y * 1.7 + fase * 2.1)) * max(0.0, y - 466) / 100


V_BUKTER = [(489, 2.5, 4), (500, -3, 5), (514, 4, 5), (527, -4.5, 6), (539, 2.5, 4), (568, -5, 7), (642, -11, 9), (660, 4, 6), (678, -6, 8), (740, -8, 18)]
H_BUKTER = [(484, -2.5, 4), (497, 3, 4), (512, -4, 5), (530, 3, 5), (541, -2, 4), (575, -5, 8), (626, -8, 7), (676, -6, 10), (700, 4, 8)]
SANDBANKE = [(604, 16, 13)]     # the sandbar inside the bend, on the left
GRUSORE = [(649, 9, 7), (498, 4.5, 4.5)]   # a gravel spit on the right, and a sandbar inside the first bend
HOLME = (808, 611, 15, 3.4)     # a small wooded islet off the town: middle, half-length, half-height


def _venstre(y, med=True):
    m, b = elvlinje(y)
    return m - b + bukter(y, V_BUKTER) + smaabukter(y, 0.4) + (bukter(y, SANDBANKE) if med else 0)


def _hoyre(y, med=True):
    m, b = elvlinje(y)
    return m + b - bukter(y, H_BUKTER) - smaabukter(y, 2.2) - (bukter(y, GRUSORE) if med else 0)


YS = [470 + i * 1.5 for i in range(int((842 - 470) / 1.5) + 1)]
VENSTRE = [(_venstre(y), y) for y in YS]                  # the water's edge on the left
HOYRE = [(_hoyre(y), y) for y in YS]                      # and on the right
GRESS_V = [(_venstre(y, False), y) for y in YS]          # where the grass ends, behind the sandbar
GRESS_H = [(_hoyre(y, False), y) for y in YS]            # and behind the gravel


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


SPEIL = []   # what stands at the water's edge, to be mirrored in it: ("tre", cx, cy, r, colour, foot) / ("hus", x0, x1, top, foot, wall, roof)


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
    sti(glatt(bak + [(1220, 520), (-20, 520)]), "#C9D6DC")
    mid = [(-20, 440), (120, 432), (260, 436), (380, 442), (500, 438), (620, 446), (744, 452), (860, 444), (980, 438), (1100, 442), (1220, 438)]
    sti(glatt(mid + [(1220, 520), (-20, 520)]), "#B2C3CB")
    sti(P([(-20, 432), (1220, 432), (1220, 476), (-20, 476)]), gradient([(0, "#F3EADB", 0), (1, "#F3EADB", 0.8)]))
    random.seed(4)
    naer = [(-20, 462), (100, 456), (220, 459), (330, 464), (440, 461), (560, 466), (680, 471), (744, 474), (820, 470), (930, 464), (1060, 460), (1220, 464)]
    sti(glatt(naer + [(1220, 530), (-20, 530)]), gradient([(0, "#97ADA9", None), (0.25, "#8DA59C", None), (1, "#88A08F", None)]))
    # the forest along the ridge, its tops catching the light near the sun
    x = -20
    while x < 1220:
        if random.random() < 0.72:
            t = math.exp(-((x - SOL[0]) / 260) ** 2)
            gran(x, langs(naer, x) + 8, random.uniform(5, 9.5), blend("#7F9A94", "#A9B4A6", t * 0.4), blend("#8EA7A0", "#BCC2B0", t * 0.4))
        x += random.uniform(2.5, 6)


# ---------------------------------------------------------------- the left bank: fields, creeks and farms
FELT = [  # kinds of field: colours before the air, and how often each comes up
    ("korn", ["#B2C072", "#BCC57A", "#A6B866"], 0.27),
    ("moden", ["#D8C27A", "#DEC888", "#D2B96E"], 0.15),
    ("eng", ["#9AB764", "#90B05E", "#A6BF6C"], 0.25),
    ("beite", ["#83A45A", "#7A9C55"], 0.14),
    ("slatt", ["#D5CE9B", "#CEC793"], 0.16),
    ("ployd", ["#B9A07C"], 0.03),
]


def velg_felt():
    t = random.random()
    for navn, farger, vekt in FELT:
        t -= vekt
        if t <= 0:
            return navn, random.choice(farger)
    return FELT[0][0], FELT[0][1][0]


def vei(pts, bredde, farge, kant=None):
    """A road or a track along a smooth line, bredde(y) wide across, narrower where it runs across your view."""
    linje = spline(pts, 10)
    v, h = [], []
    for i, (x, y) in enumerate(linje):
        a, b = linje[max(i - 1, 0)], linje[min(i + 1, len(linje) - 1)]
        dx, dy = b[0] - a[0], b[1] - a[1]
        L = math.hypot(dx, dy) or 1
        nx, ny = -dy / L, dx / L
        w = bredde(y) / 2 * (0.42 + 0.58 * abs(nx))
        v.append((x + nx * w, y + ny * w))
        h.append((x - nx * w, y - ny * w))
    if kant:
        sti(P(v + h[::-1]), kant)
        sti(P([(x, y - 0.12 * bredde(y)) for x, y in v] + [(x, y - 0.12 * bredde(y)) for x, y in h[::-1]]), farge)
    else:
        sti(P(v + h[::-1]), farge)


def langs_linje(linje, steg):
    """Points along a polyline, each steg(x, y) on from the last."""
    ut = [linje[0]]
    rest = steg(*linje[0])
    for (x0, y0), (x1, y1) in zip(linje, linje[1:]):
        L = math.hypot(x1 - x0, y1 - y0)
        t = 0.0
        while L - t >= rest:
            t += rest
            q = (lerp(x0, x1, t / L), lerp(y0, y1, t / L))
            ut.append(q)
            rest = max(0.2, steg(*q))
        rest -= L - t
    return ut


def bekk(pts, frø):
    """Trees along a creek winding across the fields to the river: runs of
    bushy trees grown together into one mass, of uneven height, with the odd
    tall tree, open stretches between, on a strip of rough grass. Returns
    things to stand up, by their foot."""
    random.seed(frø)
    vei(pts, lambda y: (y - 462) * 0.07, luft("#7E9C5C", pts[0][0], pts[0][1]))
    ting = []
    stor = lambda y: 0.7 + (y - 470) * 0.034
    run, lober = 0, []

    def ferdig():
        if len(lober) >= 2:
            mx = sum(l[0] for l in lober) / len(lober)
            my = sum(l[1] for l in lober) / len(lober)
            pal = luftpal(random.choice([G, G, GM, GL, OL]), mx, my)
            ting.append((max(l[1] + l[2] * 0.6 for l in lober), lambda lob=list(lober), pal=pal, mx=mx, my=my, fr=random.randint(0, 99999): rekke(lob, pal, rimstyrke(mx, my), fr)))
            for lx, ly, lr in lober:
                skygge(lx, ly + lr * 0.6, lr * 0.8, lr * 2.4)
        lober.clear()

    for x, y in langs_linje(spline(pts, 12), lambda x, y: stor(y) * random.uniform(0.3, 0.6)):
        if run == 0:
            ferdig()
            run = -random.randint(3, 10) if random.random() < 0.3 else random.randint(5, 16)
        if run < 0:
            run += 1
            continue
        run -= 1
        r = stor(y) * random.uniform(0.55, 1.2)
        lober.append((x + random.uniform(-0.5, 0.5) * stor(y), y - r * random.uniform(0.3, 0.8), r))
        if random.random() < 0.05:
            rr = stor(y) * random.uniform(1.6, 2.1)
            pal = luftpal(random.choice([G, GM, GL]), x, y)
            ting.append((y + rr * 0.3, lambda x=x, y=y, rr=rr, pal=pal: krone(x, y - rr * 0.9, rr, pal, 1, rimstyrke(x, y))))
            skygge(x, y, rr * 0.8, rr * 3)
    ferdig()
    return ting


def skogholt(omriss, frø, tetthet=1.0):
    """A patch of forest: spruce and birch packed into an outline, back to front."""
    random.seed(frø)
    ys = [y for _, y in omriss]
    y0, y1 = min(ys), max(ys)
    xs = [x for x, _ in omriss]
    ting = []
    y = y0
    while y < y1:
        rr = 0.9 + (y - 470) * 0.04
        x = min(xs) + random.uniform(0, rr)
        while x < max(xs):
            if inni(omriss, x, y):
                ting.append((x, y, rr * random.uniform(0.8, 1.25)))
            x += rr * random.uniform(0.9, 1.6) / tetthet
        y += rr * random.uniform(0.5, 0.8)
    return ting


def inni(poly, x, y):
    c = False
    for (x0, y0), (x1, y1) in zip(poly, poly[1:] + poly[:1]):
        if (y0 > y) != (y1 > y) and x < (x1 - x0) * (y - y0) / (y1 - y0) + x0:
            c = not c
    return c


def gard(x, y, s, frø, husfarge="#EEEAE1", hustak="#4F4A47", lave_side=1):
    """A farm: the house, the big red barn, a storehouse, trees round the yard. Returns things to stand up, by their foot."""
    random.seed(frø)
    ting = []
    # the yard, gravel
    sti(glatt([(x - 9 * s, y + 0.5 * s), (x - 3 * s, y - 2.6 * s), (x + 6 * s, y - 2.8 * s), (x + 11 * s, y - 0.2 * s), (x + 4 * s, y + 2.2 * s), (x - 5 * s, y + 2.2 * s)]), luft("#D8CDAE", x, y))
    lave = (x + lave_side * 4 * s - (16 * s if lave_side < 0 else 0), y - 1.2 * s, 16 * s, 6.2 * s)
    husp = (x - lave_side * 2 * s - (10.5 * s if lave_side > 0 else 0), y + 1.6 * s, 10.5 * s, 5.2 * s)
    stabbur = (x + random.uniform(-2, 3) * s, y + 3.6 * s, 3.6 * s, 3.4 * s)
    for bx, by, bb, bh, vegg, tak, g, navn in [
        (lave[0], lave[1], lave[2], lave[3], "#A6463A", random.choice(["#4F4A47", "#5E5550"]), 0.3, "lave"),
        (husp[0], husp[1], husp[2], husp[3], husfarge, hustak, random.choice([0.34, 0.62]), "hus"),
        (stabbur[0], stabbur[1], stabbur[2], stabbur[3], random.choice(["#8E4A33", "#A6463A", "#B88A4E"]), "#4F4A47", 0.55, "stabbur"),
    ]:
        if navn == "stabbur" and random.random() < 0.35:
            continue
        ting.append((by, lambda bx=bx, by=by, bb=bb, bh=bh, vegg=vegg, tak=tak, g=g:
                     hus(bx, by - bh, bb, bh, luft(vegg, bx, by, 0.9), luft(tak, bx, by, 0.9), g, detalj=1 if bh > 3 else 0)))
        skygge(bx + bb / 2, by, bb * 0.45, bh * 2.2)
    # trees round the yard, mostly behind and to the sides; a spruce or two
    for _ in range(random.randint(4, 7)):
        a = random.uniform(-math.pi * 0.95, -math.pi * 0.05) if random.random() < 0.75 else random.uniform(0, math.pi)
        tx = x + math.cos(a) * random.uniform(9, 15) * s
        ty = y + math.sin(a) * random.uniform(3, 5) * s
        r = random.uniform(2.2, 3.4) * s
        if random.random() < 0.25:
            ting.append((ty, lambda tx=tx, ty=ty, r=r: gran(tx, ty, r * 3.2, luft("#2F4F37", tx, ty), luft("#43684A", tx, ty), rim=rimstyrke(tx, ty) * 0.6)))
        else:
            pal = luftpal(random.choice([G, GM, GL, BJ]), tx, ty)
            ting.append((ty, lambda tx=tx, ty=ty, r=r, pal=pal: krone(tx, ty - r * 0.8, r, pal, 1, rimstyrke(tx, ty))))
        skygge(tx, ty, r * 0.8, r * 3)
    return ting


def venstre_land():
    """The plain on the left: ground, a patchwork of fields, roads, creeks, forest patches and farms."""
    random.seed(7)
    kant = lambda y: bredd_x(GRESS_V, y)
    sti(P([(-20, 473)] + [(kant(y) + 5, y) for y in range(473, 841, 4)] + [(-20, 840)]),
        gradient([(0, luft("#9BB070", 350, 476), None), (0.3, luft("#93AD6A", 350, 560), None), (1, "#8BA762", None)]))

    # --- the patchwork: bands that grow as they come towards you, cut into fields
    xs = list(range(-40, 900, 8))
    ys = []
    y = 474.0
    while y < 880:
        ys.append(y)
        y += max(3.2, (y - 462) * random.uniform(0.2, 0.34))
    linjer, forrige = [], None
    for y0 in ys:
        tilt = random.uniform(-1, 1) * (y0 - 462) * 0.00022
        amp = (y0 - 462) * random.uniform(0.01, 0.035)
        per, fa = random.uniform(70, 170), random.uniform(0, 6.3)
        rad = [y0 + tilt * (x - 350) + amp * math.sin(x / per + fa) for x in xs]
        if forrige:
            rad = [max(a, b + (y0 - 462) * 0.08) for a, b in zip(rad, forrige)]
        linjer.append(rad)
        forrige = rad

    def hoyde(rad, x):
        i = min(len(xs) - 2, max(0, int((x - xs[0]) / 8)))
        return lerp(rad[i], rad[i + 1], (x - xs[i]) / 8)

    baller = []
    for k in range(len(linjer) - 1):
        topp, bunn = linjer[k], linjer[k + 1]
        ym = (sum(topp) + sum(bunn)) / (2 * len(xs))
        if ym > 840:
            break
        x = -40 - random.uniform(0, 40)
        vx_f = random.uniform(560, 940)
        while x < kant(ym) + 5:
            bred = (ym - 462) * random.uniform(1.6, 5.2)
            vx_n = random.uniform(560, 940)
            xa_, xb_ = x, x + bred
            yt_m, yb_m = hoyde(topp, xa_ + bred / 2), hoyde(bunn, xa_ + bred / 2)

            def dele(xm, vx, yy, ym_=ym):
                return vx + (xm - vx) * (yy - 436) / (ym_ - 436)

            xlt, xlb = dele(xa_, vx_f, yt_m), dele(xa_, vx_f, yb_m)
            xrt, xrb = dele(xb_, vx_n, yt_m), dele(xb_, vx_n, yb_m)
            elvkant = xrt > kant(yt_m) or xrb > kant(yb_m)
            if elvkant:
                xrt, xrb = kant(yt_m) + 5, kant(yb_m) + 5
            if xlt >= xrt - 1 or xlb >= xrb - 1:
                break
            ov = [(xlt, hoyde(topp, xlt))] + [(xx, hoyde(topp, xx)) for xx in xs if xlt < xx < xrt] + [(xrt, hoyde(topp, xrt))]
            if elvkant:
                ov += [(kant(yy) + 5, yy) for yy in range(int(yt_m) + 1, int(yb_m))]
            ned = [(xrb, hoyde(bunn, xrb))] + [(xx, hoyde(bunn, xx)) for xx in reversed(xs) if xlb < xx < xrb] + [(xlb, hoyde(bunn, xlb))]
            poly = ov + ned
            navn, farge = velg_felt()
            c = luft(farge, (xlt + xrt) / 2, ym, 1.0)
            sti(P(poly), c)
            hogd = yb_m - yt_m
            # the field's own grain: drill rows towards the horizon, mowing stripes, windrows
            if ym > 492 and navn in ("korn", "moden", "ployd", "eng", "slatt"):
                cid = nid("felt")
                A(f'<clipPath id="{cid}"><path d="{P(poly)}"/></clipPath><g clip-path="url(#{cid})">')
                if navn in ("korn", "moden", "ployd"):
                    vx = random.uniform(520, 980)
                    mellom = (yb_m - 462) * random.uniform(0.05, 0.075) * (0.6 if navn == "ployd" else 1)
                    if mellom > 2.4:
                        lyse, morke = [], []
                        xx = min(xlb, xlt) - 60
                        i = 0
                        while xx < max(xrb, xrt) + 60:
                            # a line from the vanishing point through (xx, bottom)
                            t0 = (yt_m - 6 - 458) / (yb_m + 4 - 458)
                            (lyse if i % 2 else morke).append(f"M{f(lerp(vx, xx, t0))},{f(yt_m - 6)} L{f(xx)},{f(yb_m + 4)}")
                            xx += mellom
                            i += 1
                        strek("".join(lyse), blend(c, "#FFF6DC", 0.3), mellom * 0.3, ' opacity="0.45"')
                        strek("".join(morke), mork(c, 0.18), mellom * 0.26, ' opacity="0.4"')
                else:
                    striper = random.randint(3, 6)
                    for j in range(striper):
                        if j % 2:
                            continue
                        t0, t1 = j / striper, (j + 1) / striper
                        sti(P([(xx, lerp(hoyde(topp, xx), hoyde(bunn, xx), t0)) for xx in xs if xlt - 10 < xx < xrt + 10] +
                              [(xx, lerp(hoyde(topp, xx), hoyde(bunn, xx), t1)) for xx in reversed(xs) if xlt - 10 < xx < xrt + 10]),
                            blend(c, "#FFF6DC", 0.25) if navn == "eng" else mork(c, 0.12), ' opacity="0.55"')
                    if navn == "slatt" and ym > 530 and random.random() < 0.7:
                        # white wrapped bales lying where the baler dropped them
                        for _ in range(random.randint(2, 5)):
                            bx = random.uniform(xlt + 10, xrt - 10)
                            by = random.uniform(hoyde(topp, bx) + hogd * 0.2, hoyde(bunn, bx) - hogd * 0.2)
                            baller.append((bx, by))
                A("</g>")
            elif navn == "beite" and ym > 500:
                for _ in range(random.randint(1, 3)):
                    bx = random.uniform(xlt, xrt)
                    by = random.uniform(hoyde(topp, bx), hoyde(bunn, bx))
                    sti(klump(bx, by, hogd * random.uniform(0.25, 0.5), 8, 0.3, 0.45, 1.1), mork(c, 0.1), ' opacity="0.35"')
            x = xb_
    # the bales
    for bx, by in baller:
        r = (by - 462) * 0.011
        skygge(bx, by + r * 0.5, r * 0.9, r * 3.5)
        sti(f"M{f(bx - r)},{f(by)} a{f(r)},{f(r * 0.8)} 0 1 1 {f(2 * r)},0 a{f(r)},{f(r * 0.8)} 0 1 1 {f(-2 * r)},0Z", luft("#F2F0EA", bx, by))
        sti(f"M{f(bx - r)},{f(by)} a{f(r)},{f(r * 0.8)} 0 0 0 {f(2 * r)},0Z", luft("#C9CBC8", bx, by), ' opacity="0.8"')

    # --- the roads: one from the bridge, winding west past the farms, one up the valley
    vx_bru = bredd_x(VENSTRE, BRU_Y) - 14
    hoved = [(vx_bru + 2, BRU_Y + 1), (712, 556), (688, 558), (660, 555), (630, 551), (600, 552), (570, 559), (540, 568), (505, 576),
             (470, 580), (430, 578), (395, 575), (360, 578), (322, 587), (282, 599), (240, 612), (190, 624), (130, 633), (60, 642), (-30, 654)]
    dalen = [(600, 552), (588, 541), (566, 530), (540, 519), (510, 509), (472, 500), (438, 494), (400, 489), (352, 485), (300, 482), (240, 480), (170, 479), (90, 479), (-30, 480)]
    sti_ = [(470, 580), (476, 592), (490, 602), (512, 608)]
    vei(dalen, lambda y: 0.3 + (y - 462) * 0.042, luft("#DED6C4", 400, 520, 1.1), luft("#B9AF98", 400, 520, 1.1))
    vei(hoved, lambda y: 0.3 + (y - 462) * 0.042, luft("#DED6C4", 500, 570), luft("#B5AB93", 500, 570))
    vei(sti_, lambda y: (y - 462) * 0.022, luft("#CDBB93", 480, 595))
    for spor in ([(300, 482), (306, 489), (302, 497)], [(160, 479), (152, 486), (158, 492)], [(560, 559), (586, 548), (612, 538)]):
        vei(spor, lambda y: (y - 462) * 0.02, luft("#CBB892", spor[0][0], spor[0][1]))

    # --- everything standing on the ground, back to front
    ting = []
    for pts, frø in [([(-30, 521), (40, 516), (110, 520), (170, 529), (220, 541), (262, 556), (300, 571), (340, 579)], 101),
                     ([(380, 477), (430, 482), (478, 489), (530, 495), (590, 501), (640, 506), (688, 513), (722, 525), (744, 538)], 102),
                     ([(300, 616), (360, 622), (420, 625), (482, 631), (546, 640), (604, 647), (650, 652)], 103),
                     ([(-30, 495), (30, 494), (86, 497), (130, 502)], 104)]:
        ting += bekk(pts, frø)
    for omriss, frø in [([(70, 489), (118, 484), (190, 485), (232, 490), (214, 497), (150, 499), (88, 497)], 111),
                        ([(372, 506), (410, 501), (470, 503), (498, 510), (480, 518), (420, 520), (380, 515)], 112),
                        ([(-30, 548), (40, 543), (110, 548), (138, 560), (112, 575), (40, 578), (-30, 572)], 113),
                        ([(276, 590), (320, 584), (374, 588), (392, 602), (360, 614), (300, 612), (270, 602)], 114),
                        ([(612, 488), (650, 485), (700, 487), (716, 492), (680, 496), (630, 495)], 115)]:
        sti(P(omriss), luft("#2F4A35", omriss[0][0], max(y for _, y in omriss) - 4, 1.0))
        for tx, ty, r in skogholt(omriss, frø):
            if random.random() < 0.55:
                ting.append((ty, lambda tx=tx, ty=ty, r=r: gran(tx, ty + r * 0.4, r * 3.4, luft("#2A4733", tx, ty), luft("#3E6446", tx, ty), rim=rimstyrke(tx, ty) * 0.5)))
            else:
                pal = luftpal(random.choice([GM, G, BJ]), tx, ty)
                ting.append((ty, lambda tx=tx, ty=ty, r=r, pal=pal: krone(tx, ty - r * 0.3, r * 1.1, pal, 0 if r < 2.5 else 1, rimstyrke(tx, ty))))
        # its shadow: the outline pushed away from the sun, towards you
        skyggepts = []
        for bx_, by_ in omriss:
            dx, dy = bx_ - SOL[0], by_ - (HORISONT - 4)
            n_ = math.hypot(dx, dy)
            L_ = (by_ - 462) * 0.16
            skyggepts.append((bx_ + dx / n_ * L_, by_ + dy / n_ * L_))
        SKYGGER.append(glatt(skyggepts))
    for x, y, frø, husf, tak, side in [(612, 534, 121, "#EEEAE1", "#4F4A47", 1), (466, 509, 122, "#E5C766", "#5E5550", -1), (300, 496, 123, "#EEEAE1", "#A9493A", 1),
                                       (150, 489, 124, "#A6463A", "#4F4A47", 1), (232, 548, 125, "#EEEAE1", "#4F4A47", -1), (520, 597, 126, "#E9E1CF", "#5E5550", 1),
                                       (392, 560, 127, "#E5C766", "#4F4A47", -1)]:
        ting += gard(x, y, p(y) * 0.55, frø, husf, tak, side)
    for x, y in [(560, 487), (88, 505), (250, 478), (690, 522)]:
        s = p(y) * 0.55
        ting.append((y, lambda x=x, y=y, s=s: hus(x, y - 5.6 * s, 14 * s, 5.6 * s, luft("#A6463A", x, y), luft("#4F4A47", x, y), 0.3, detalj=0)))
        skygge(x + 7 * s, y, 6 * s, 10 * s)
    # lone trees in the fields
    random.seed(131)
    for _ in range(26):
        tx = random.uniform(-10, 700)
        ty = random.uniform(482, 640)
        if tx > kant(ty) - 20:
            continue
        r = (0.9 + (ty - 470) * 0.04) * random.uniform(0.8, 1.3)
        pal = luftpal(random.choice([G, GL, BJ, OL]), tx, ty)
        ting.append((ty, lambda tx=tx, ty=ty, r=r, pal=pal: krone(tx, ty - r * 0.85, r, pal, 1 if r > 2.4 else 0, rimstyrke(tx, ty))))
        skygge(tx, ty, r * 0.75, r * 3)
    return ting


# ---------------------------------------------------------------- the right bank: the town and the fortress
VEGG = ["#A9493A", "#ECE9E1", "#E8C95A", "#D9A441", "#ECE9E1", "#A9493A", "#8E9AA3", "#F2DFC8", "#B5532F"]
TAK = ["#5E5550", "#4F4A47", "#B5532F", "#6A5F58", "#4F4A47"]
# the hill on the right, low enough that the fortress sits clear below the photo pane on wide screens
AAS = [(760, 492), (830, 486), (900, 480), (960, 474), (1010, 470), (1080, 469), (1140, 471), (1200, 476), (1240, 480)]
FX, FY, FK = 1000, 472, 1.35


def festning(fx, fy, k):
    """The stone wall along the hilltop, the brick gable, the yellow block, the long white house, the flag."""
    sti(P([(fx - 18 * k, fy), (fx + 112 * k, fy), (fx + 116 * k, fy + 12 * k), (fx - 22 * k, fy + 12 * k)]), "#B9A58E")
    # courses of stone, the shaded lower half, the lit coping along the top
    sti(P([(fx - 20 * k, fy + 6 * k), (fx + 114 * k, fy + 6 * k), (fx + 116 * k, fy + 12 * k), (fx - 22 * k, fy + 12 * k)]), "#9E8B76", ' opacity="0.45"')
    lin = []
    for r_ in range(1, 6):
        yy = fy + r_ * 2 * k
        lin.append(f"M{f(fx - 18 * k - r_ * 0.33 * k)},{f(yy)} H{f(fx + 112 * k + r_ * 0.66 * k)}")
        xx = fx - 16 * k + (r_ % 2) * 1.6 * k
        while xx < fx + 112 * k:
            lin.append(f"M{f(xx)},{f(yy - 2 * k)} v{f(2 * k)}")
            xx += 3.2 * k
    strek("".join(lin), "#8F7D69", 0.35 * k, ' opacity="0.5"')
    strek(f"M{f(fx - 18 * k)},{f(fy + 0.3 * k)} H{f(fx + 112 * k)}", blend("#B9A58E", RIM, 0.6), 0.8 * k)
    hus(fx, fy - 13 * k, 20 * k, 13 * k, "#C88F72", "#B8452E", 0.72, takh=0.6, pipe=False, dor=False)
    hus(fx + 22 * k, fy - 17 * k, 26 * k, 17 * k, "#E8C95A", "#7A6A4C", 0.7, takh=0.62, pipe=False, dor=True)
    hus(fx + 50 * k, fy - 11 * k, 30 * k, 11 * k, "#E3D9C6", "#B8452E", 0.28, pipe=True, dor=True)
    hus(fx + 82 * k, fy - 10 * k, 20 * k, 10 * k, "#C88F72", "#B5532F", 0.34, pipe=False, dor=False)
    stang = fx + 106 * k
    strek(f"M{f(stang)},{f(fy)} V{f(fy - 34 * k)}", "#F2F2EE", 1.4)
    sti(f"M{f(stang + 0.6)},{f(fy - 33 * k)} C{f(stang + 5 * k)},{f(fy - 31.5 * k)} {f(stang + 10 * k)},{f(fy - 30 * k)} {f(stang + 14 * k)},{f(fy - 27 * k)} "
        f"L{f(stang + 14.5 * k)},{f(fy - 19.5 * k)} C{f(stang + 10 * k)},{f(fy - 21 * k)} {f(stang + 5 * k)},{f(fy - 22.4 * k)} {f(stang + 0.6)},{f(fy - 23 * k)} Z", "#BA0C2F")
    kors = (f"M{f(stang + 5 * k)},{f(fy - 31.6 * k)} L{f(stang + 5.4 * k)},{f(fy - 22 * k)} "
            f"M{f(stang + 0.6)},{f(fy - 27.6 * k)} C{f(stang + 6 * k)},{f(fy - 26.4 * k)} {f(stang + 10 * k)},{f(fy - 25 * k)} {f(stang + 14.2 * k)},{f(fy - 23.4 * k)}")
    strek(kors, "#FFFFFF", 1.8)
    strek(kors, "#00205B", 0.9)


def hoyre_land():
    """The hill on the right: its slope, the road up from the bridge, the town, the woods and the fortress."""
    random.seed(12)
    kant = lambda y: bredd_x(GRESS_H, y)
    sti(P(AAS + [(1240, 840)] + [(kant(y) - 5, y) for y in range(840, 469, -4)]),
        gradient([(0, luft("#6F9058", 1000, 478, 0.6), None), (0.35, "#618752", None), (1, "#5A8050", None)]))
    # meadows on the slope, lighter, between the woods
    for omr in ([(1080, 520), (1150, 512), (1230, 516), (1230, 548), (1160, 552), (1100, 540)],
                [(870, 488), (930, 484), (960, 492), (920, 500), (880, 498)]):
        sti(glatt(omr), luft("#8BAA62", omr[0][0], omr[0][1], 0.5))
    # the road from the bridge up into the town
    hx = bredd_x(HOYRE, BRU_Y) + 14
    vei([(hx - 2, BRU_Y + 1), (858, 549), (884, 543), (912, 536), (944, 530), (980, 527), (1020, 526), (1070, 530), (1130, 536), (1240, 540)],
        lambda y: 0.3 + (y - 462) * 0.04, "#D4CEC0", "#A9A293")
    vei([(870, 546), (884, 530), (900, 516), (930, 503), (960, 494)], lambda y: 0.2 + (y - 462) * 0.03, "#D4CEC0")

    ting = [(FY + 12 * FK, lambda: festning(FX, FY, FK))]
    fort = (FX - 24 * FK, FX + 118 * FK, FY - 46 * FK, FY + 12 * FK)
    husene = []
    # the old town: a cluster of houses down by the river, thinning out up the
    # hill, with gardens and fruit trees between them; rows get bigger as
    # they come towards you
    y = 500
    while y < 700:
        s = 0.55 + (y - 480) * 0.016
        bank = kant(y)
        x = bank + random.uniform(4, 10)
        while x < 1240:
            hoyde_opp = (langs(AAS, x) + 26 - y)        # > 0: up under the fortress
            avst = (x - bank) / 260                     # 0 at the river, 1 well up the slope
            if hoyde_opp > 0 or random.random() < avst * 0.75:
                x += random.uniform(8, 16) * s
                continue
            b = random.uniform(10, 18) * s
            h = random.uniform(6, 8.5) * s
            yy = y + random.uniform(-2, 2) * s
            if random.random() < 0.24:
                r = random.uniform(5, 8) * s
                pal = luftpal(random.choice([G, G, GL, GM, OL]), x, yy, 0.5)
                skygge(x + b / 2, yy + r * 0.6, r * 0.8, r * 2.2)
                ting.append((yy + r * 0.6, lambda x=x, yy=yy, r=r, b=b, h=h, pal=pal: krone(x + b / 2, yy - h * 0.1, r, pal, 1, rimstyrke(x, yy))))
                if x + b / 2 - r < bredd_x(HOYRE, yy + r) + 4:
                    SPEIL.append(("tre", x + b / 2, yy - h * 0.1, r, mork(pal[0], 0.1), yy + r * 0.6))
            else:
                vegg, tak = random.choice(VEGG), random.choice(TAK)
                g = random.choice([0.3, 0.34, 0.4, 0.62, 0.7])
                gv = random.random() < 0.72
                k_ = 0.5
                hx = max(x, kant(yy + h) + 1.5)       # its foot on dry land
                fot = yy + h
                # the garden: a lighter plot round the house, now and then a hedge along its front
                sti(glatt([(hx - 3 * s, fot + 1.2 * s), (hx - 2.5 * s, yy - 1.5 * s), (hx + b * 0.5, yy - 2.6 * s), (hx + b + 2.8 * s, yy - 1.2 * s), (hx + b + 3 * s, fot + 1.4 * s), (hx + b * 0.5, fot + 2.2 * s)]),
                    luft(random.choice(["#78A05A", "#82A862", "#6F9853"]), hx, fot, 0.5), ' opacity="0.7"')
                skygge(hx + b / 2, fot, b * 0.42, h * 1.5)
                ting.append((fot, lambda hx=hx, yy=yy, b=b, h=h, vegg=vegg, tak=tak, g=g, gv=gv, k_=k_:
                             hus(hx, yy, b, h, luft(vegg, hx, yy + h, k_), luft(tak, hx, yy + h, k_), g, gv, 1 if h > 4 else 0)))
                husene.append((hx - 1, hx + b + 1, yy - b * 0.38, fot))
                if hx < bredd_x(HOYRE, fot + 4) + 3:
                    SPEIL.append(("hus", hx, hx + b, yy - b * g * 0.5, fot, luft(vegg, hx, yy, 0.5), luft(tak, hx, yy, 0.5)))
                # fruit trees and bushes in the garden, beside and behind the house
                for _ in range(random.choice([0, 1, 1, 2, 2, 3])):
                    side_ = random.choice([-1, 1])
                    r = random.uniform(1.6, 3.0) * s
                    tx = (hx - r * 0.6 if side_ < 0 else hx + b + r * 0.6) + random.uniform(-0.5, 0.5) * r
                    tfot = fot - random.uniform(-0.6, 2.5) * s
                    pal = luftpal(random.choice([GL, G, G, OL, BJ]), tx, tfot, 0.5)
                    ting.append((tfot, lambda tx=tx, tfot=tfot, r=r, pal=pal: krone(tx, tfot - r * 0.85, r, pal, 1, rimstyrke(tx, tfot))))
                    skygge(tx, tfot, r * 0.75, r * 2.2)
                    husene.append((tx - r, tx + r, tfot - r * 1.8, tfot))
            x += b + random.uniform(1, 5) * s
        y += 9 + (y - 480) * 0.07
    # woods over the rest of the hill: none in front of a house or the fortress
    for _ in range(330):
        x = random.uniform(kant(500), 1250)
        t = langs(AAS, x)
        y = random.uniform(t + 3, 720)
        s = 1 + (y - 470) * 0.02
        r = random.uniform(4.5, 7.5) * s
        fot = y + r * 0.6
        if x - r < kant(y) + 3:
            continue
        if any(x0 - r < x < x1 + r and top - r < y < bunn + r and fot > bunn - 1 for x0, x1, top, bunn in husene):
            continue
        if fort[0] - r < x < fort[1] + r and y - r < fort[3] + 2:
            continue
        if random.random() < 0.12:
            ting.append((fot, lambda x=x, y=y, r=r: gran(x, y + r * 0.7, r * 3, luft("#24402B", x, y, 0.55), luft("#3A6040", x, y, 0.55), rim=rimstyrke(x, y) * 0.6)))
        else:
            pal = luftpal(random.choice([G, GM, GL, G, GM]), x, y, 0.55)
            ting.append((fot, lambda x=x, y=y, r=r, pal=pal: krone(x, y, r, pal, 1, rimstyrke(x, y))))
            skygge(x, fot, r * 0.8, r * 2.2)
    return ting


# ---------------------------------------------------------------- the banks themselves: trees at the water, the sandbar, the quay, reeds
def siv(x, y, s, n, frø):
    """A clump of reeds at the water's edge, their tips lit."""
    random.seed(frø)
    stilk, topp = [], []
    for _ in range(n):
        xx = x + random.uniform(-1.6, 1.6) * s
        h = random.uniform(2.2, 4.4) * s
        lean = random.uniform(-0.5, 0.7) * s
        stilk.append(f"M{f(xx)},{f(y)} q{f(lean * 0.3)},{f(-h * 0.5)} {f(lean)},{f(-h)}")
        if random.random() < 0.45:
            topp.append(f"M{f(xx + lean * 0.9)},{f(y - h * 0.9)} l{f(lean * 0.12)},{f(-h * 0.18)}")
    strek("".join(stilk), "#5F7036", max(0.2, 0.22 * s), ' stroke-linecap="round"')
    strek("".join(topp), blend("#9DA556", RIM, 0.4), max(0.35, 0.4 * s), ' stroke-linecap="round"')


def kantlinje(pts, y0, y1):
    return "M" + " L".join(f"{f(x)},{f(yy)}" for x, yy in pts if y0 <= yy <= y1)


# Stretches along each bank, each with its own character
V_STREKK = [(474, 498, "aapen"), (498, 507, "busk"), (507, 516, "aapen"), (516, 533, "skog"), (533, 545, "aapen"), (545, 562, "skog"), (562, 581, "busk"),
            (581, 629, "sand"), (629, 637, "busk"), (637, 669, "aapen"), (669, 800, "skog")]
H_STREKK = [(474, 486, "aapen"), (486, 491, "busk"), (491, 504, "sand"), (504, 512, "busk"), (512, 524, "skog"), (524, 566, "kai"), (566, 584, "busk"), (584, 607, "skog"), (607, 619, "aapen"), (619, 640, "skog"),
            (640, 658, "grus"), (658, 800, "skog")]


def kanter():
    """What grows and lies along the water: woods, bushes, open grass with reeds,
    the sandbar, the quay under the town, the gravel spit, the islet."""
    ting = []
    for side, strekk, gress, vann, frø in [(-1, V_STREKK, GRESS_V, VENSTRE, 17), (1, H_STREKK, GRESS_H, HOYRE, 19)]:
        random.seed(frø)
        k = 1.0 if side < 0 else 0.6
        lober = []

        def ferdig(k=k):
            if lober:
                mx = sum(l[0] for l in lober) / len(lober)
                my = sum(l[1] for l in lober) / len(lober)
                pal = luftpal(random.choice([G, G, GM, GL, OL]), mx, my, k)
                ting.append((max(l[1] + l[2] * 0.6 for l in lober), lambda lob=list(lober), pal=pal, mx=mx, my=my, fr=random.randint(0, 99999): rekke(lob, pal, rimstyrke(mx, my), fr)))
                for lx, ly, lr in lober:
                    SPEIL.append(("tre", lx, ly, lr, mork(pal[0], 0.05), ly + lr * 0.6))
            lober.clear()

        for y0, y1, art in strekk:
            ferdig()
            y = y0 + random.uniform(0, 2)
            while y < y1:
                kx = bredd_x(gress, y)
                if art in ("skog", "busk"):
                    if len(lober) >= random.randint(5, 9):
                        ferdig()
                    if art == "skog" and random.random() < 0.16:
                        # a tree standing up out of the bank's wood
                        r = (1.5 + (y - 470) * 0.05) * random.uniform(1.15, 1.5)
                        x = kx + side * random.uniform(0.2, 1.4) * r
                        if random.random() < 0.35:
                            ting.append((y + r * 0.7, lambda x=x, y=y, r=r, k=k: gran(x, y + r * 0.8, r * 3.3, luft("#24402B", x, y, k), luft("#3A6040", x, y, k), rim=rimstyrke(x, y) * 0.7)))
                        else:
                            pal = luftpal(random.choice([G, GM, GL]), x, y, k)
                            ting.append((y + r * 0.7, lambda x=x, y=y, r=r, pal=pal: krone(x, y - r * 0.3, r, pal, 1, rimstyrke(x, y))))
                        SPEIL.append(("tre", x, y - r * 0.3, r, mork(luft(G[0], x, y, k), 0.05), y + r * 0.7))
                    stor = (1.5 + (y - 470) * 0.05) if art == "skog" else (1.0 + (y - 470) * 0.032)
                    r = stor * random.uniform(0.6, 1.2)
                    lober.append((kx + side * random.uniform(-0.4, 0.7) * r, y - r * random.uniform(0.1, 0.5), r))
                    if art == "skog" and random.random() < 0.6:
                        r2 = stor * random.uniform(0.6, 1.1)
                        lober.append((kx + side * random.uniform(1.0, 1.9) * r2, y - r2 * random.uniform(0.3, 0.8), r2))
                    y += stor * random.uniform(0.35, 0.7)
                elif art == "aapen":
                    if random.random() < 0.6:
                        s = 0.45 + (y - 470) * 0.008
                        x = bredd_x(vann, y) - side * 0.4
                        ting.append((y + 0.5, lambda x=x, y=y, s=s, n=random.randint(8, 18), fr=random.randint(0, 9999): siv(x, y, s, n, fr)))
                    if random.random() < 0.12:
                        r = (1.0 + (y - 470) * 0.03) * random.uniform(0.8, 1.2)
                        x = kx + side * random.uniform(1, 2.5) * r
                        pal = luftpal(random.choice([OL, BJ]), x, y, k)
                        ting.append((y + r * 0.6, lambda x=x, y=y, r=r, pal=pal: krone(x, y, r, pal, 1, rimstyrke(x, y))))
                    y += random.uniform(1.5, 4) * (0.5 + (y - 470) / 120)
                elif art in ("sand", "grus"):
                    # bushes behind, at the grass's edge
                    if random.random() < 0.55:
                        r = (1.2 + (y - 470) * 0.04) * random.uniform(0.7, 1.1)
                        x = kx + side * random.uniform(1.0, 2.0) * r
                        pal = luftpal(random.choice([G, GL, BJ, OL]), x, y, k)
                        ting.append((y + r * 0.6, lambda x=x, y=y, r=r, pal=pal: krone(x, y, r, pal, 1, rimstyrke(x, y))))
                    y += random.uniform(2, 5)
                else:   # the quay: now and then a tree on the promenade
                    if random.random() < 0.16:
                        r = (1.5 + (y - 470) * 0.045) * random.uniform(0.9, 1.25)
                        x = kx + side * random.uniform(1.4, 2.4) * r
                        pal = luftpal(random.choice([G, GL, BJ]), x, y, k)
                        ting.append((y + r * 0.6, lambda x=x, y=y, r=r, pal=pal: krone(x, y, r, pal, 1, rimstyrke(x, y))))
                        SPEIL.append(("tre", x, y, r, mork(pal[0], 0.05), y + r * 0.6))
                    y += random.uniform(2, 4)
        ferdig()

    def flat():
        # a strip of rough grass and scrub along the water, darker, on both banks
        for gress, side, strekk in [(GRESS_V, -1, V_STREKK), (GRESS_H, 1, H_STREKK)]:
            for y0, y1, art in strekk:
                if art in ("kai",):
                    continue
                pts = [(bredd_x(gress, yy), yy) for yy in YS if y0 - 1 <= yy <= y1 + 1]
                if len(pts) < 2:
                    continue
                sti(P(pts + [(x + side * (1.2 + (yy - 466) * 0.05), yy) for x, yy in reversed(pts)]), luft("#5F7D49", pts[0][0], y0, 0.8), ' opacity="0.55"')
        # the sandbar: dry sand, its wet edge, the glint where the water laps it
        sand = [(bredd_x(GRESS_V, yy) - 2, yy) for yy in YS if 580 <= yy <= 630] + [(bredd_x(VENSTRE, yy), yy) for yy in reversed(YS) if 580 <= yy <= 630]
        sti(glatt(sand), gradient([(0, luft("#ECDDBC", 700, 590), None), (0.6, "#E2CFA9", None), (1, "#D5BF98", None)]))
        strek(kantlinje([(x - 1.2, yy) for x, yy in VENSTRE], 583, 628), "#BDA683", 2.2, ' opacity="0.7" stroke-linecap="round"')
        strek(kantlinje([(x + 0.5, yy) for x, yy in VENSTRE], 584, 627), "#FFF6E0", 0.55, ' opacity="0.95"')
        # wind ripples in the sand, and a few tufts of grass on it
        random.seed(27)
        rr, tuer = [], []
        for _ in range(40):
            yy = random.uniform(584, 626)
            x0, x1 = bredd_x(GRESS_V, yy) + 1, bredd_x(VENSTRE, yy) - 2.5
            if x1 - x0 < 4:
                continue
            x = random.uniform(x0, x1 - 3)
            L = random.uniform(2, 5) * (0.6 + (yy - 580) / 60)
            rr.append(f"M{f(x)},{f(yy)} q{f(L / 2)},-0.7 {f(L)},0")
            if random.random() < 0.25 and x < x0 + 6:
                tuer.append(klump(x, yy, random.uniform(0.6, 1.2), 6, 0.3, 0.6, 1.2))
        strek("".join(rr), "#CDB58E", 0.4, ' opacity="0.8" stroke-linecap="round"')
        sti("".join(tuer), "#8C9A55", ' opacity="0.85"')
        # the sandbar inside the first bend, on the right, far off
        sand2 = [(bredd_x(GRESS_H, yy) + 1.5, yy) for yy in YS if 490 <= yy <= 506] + [(bredd_x(HOYRE, yy), yy) for yy in reversed(YS) if 490 <= yy <= 506]
        sti(glatt(sand2), luft("#E6D6B4", 760, 498))
        strek(kantlinje([(x - 0.3, yy) for x, yy in HOYRE], 492, 504), "#FFF6E0", 0.4, ' opacity="0.9"')
        # the gravel spit on the right
        grus = [(bredd_x(GRESS_H, yy) + 2, yy) for yy in YS if 638 <= yy <= 662] + [(bredd_x(HOYRE, yy), yy) for yy in reversed(YS) if 638 <= yy <= 662]
        sti(glatt(grus), "#D2C8B2")
        random.seed(29)
        stein = []
        for _ in range(70):
            yy = random.uniform(640, 660)
            x0, x1 = bredd_x(HOYRE, yy) + 0.8, bredd_x(GRESS_H, yy)
            if x1 - x0 < 1:
                continue
            stein.append(klump(random.uniform(x0, x1), yy, random.uniform(0.35, 0.8), 5, 0.25, 0.7, 1.1))
        sti("".join(stein[::3]), "#9C9282")
        sti("".join(stein[1::3]), "#E9E2D0")
        sti("".join(stein[2::3]), "#B8AE9B")
        strek(kantlinje([(x - 1, yy) for x, yy in HOYRE], 641, 659), "#A69B86", 1.6, ' opacity="0.6" stroke-linecap="round"')
        strek(kantlinje([(x - 0.4, yy) for x, yy in HOYRE], 641, 659), "#FFF6E0", 0.5, ' opacity="0.95"')
        # the quay: a stone edge along the town's waterfront, its face lit from behind
        kai = [(bredd_x(HOYRE, yy), yy) for yy in YS if 524 <= yy <= 566]
        sti(P([(x - 0.3, yy) for x, yy in kai] + [(x + 1 + (yy - 466) * 0.014, yy) for x, yy in reversed(kai)]), "#CEC7B8")
        strek(kantlinje([(x + 0.3, yy) for x, yy in kai], 524, 566), "#E9E2D2", 0.4)
        strek(kantlinje([(x - 0.2, yy) for x, yy in kai], 524, 566), "#6F695F", 0.55)

    ting.append((0, flat))

    # the islet off the town: sand round its foot, grass, a clump of trees
    hx, hy, hl, hh = HOLME

    def holme():
        sti(glatt([(hx - hl * 1.08, hy + hh * 0.35), (hx - hl * 0.6, hy - hh * 0.55), (hx + hl * 0.2, hy - hh * 0.8), (hx + hl * 0.9, hy - hh * 0.35),
                   (hx + hl * 1.12, hy + hh * 0.25), (hx + hl * 0.5, hy + hh * 0.9), (hx - hl * 0.5, hy + hh * 0.85)]), "#E0CDA7")
        sti(glatt([(hx - hl * 0.85, hy + hh * 0.1), (hx - hl * 0.4, hy - hh * 0.6), (hx + hl * 0.3, hy - hh * 0.75), (hx + hl * 0.85, hy - hh * 0.2),
                   (hx + hl * 0.6, hy + hh * 0.45), (hx - hl * 0.4, hy + hh * 0.5)]), "#6E8F4C")
        strek(f"M{f(hx - hl * 1.05)},{f(hy + hh * 0.5)} Q{f(hx)},{f(hy + hh * 1.25)} {f(hx + hl * 1.1)},{f(hy + hh * 0.4)}", "#FFF6E0", 0.5, ' opacity="0.9"')

    ting.append((hy - hh, holme))
    random.seed(33)
    for i in range(9):
        x = hx + random.uniform(-0.7, 0.65) * hl
        y = hy + random.uniform(-0.6, 0.15) * hh
        r = random.uniform(2.6, 4.2) * (1.4 if i == 0 else 1)
        pal = luftpal(random.choice([G, GL, BJ, GM]), x, y, 0.5)
        ting.append((hy + 0.2 + i * 0.01, lambda x=x, y=y, r=r, pal=pal: krone(x, y - r * 0.5, r, pal, 1, rimstyrke(x, y))))
        SPEIL.append(("tre", x, y - r * 0.5, r, mork(pal[0], 0.05), hy + hh * 0.6))
    for x, s in [(hx - hl * 0.95, 0.9), (hx + hl * 0.95, 0.8)]:
        ting.append((hy + hh, lambda x=x, s=s: siv(x, hy + hh * 0.4, s, 12, int(x))))
    ting.append((633, lambda: robat(774, 632, 1.0)))
    return ting


def robat(x, y, s):
    """A small rowing boat heading upstream, its wake opening behind it, its oars out."""
    # the wake: two lines spreading towards you, and the stern's wash
    strek(f"M{f(x - 2 * s)},{f(y + 0.6 * s)} q{f(-4 * s)},{f(4 * s)} {f(-9 * s)},{f(9 * s)} M{f(x + 2 * s)},{f(y + 0.6 * s)} q{f(4 * s)},{f(4 * s)} {f(9 * s)},{f(9 * s)}",
          "#F3F6F2", 0.35 * s, ' opacity="0.7" stroke-linecap="round"')
    sti(glatt([(x - 1.6 * s, y + 0.8 * s), (x, y + 2.6 * s), (x + 1.6 * s, y + 0.8 * s), (x, y + 1.3 * s)]), "#F3F6F2", ' opacity="0.6"')
    # its shadow on the water, the hull, the gunwale catching the light, the rower
    sti(glatt([(x - 1.6 * s, y + 0.6 * s), (x, y + 1.5 * s), (x + 1.6 * s, y + 0.6 * s), (x, y - 3.6 * s)]), "#4D6675", ' opacity="0.35"')
    sti(glatt([(x - 1.4 * s, y), (x, y + 1.0 * s), (x + 1.4 * s, y), (x + 0.3 * s, y - 3.4 * s), (x - 0.3 * s, y - 3.4 * s)]), "#8C3A2E")
    strek(f"M{f(x - 1.3 * s)},{f(y - 0.2 * s)} Q{f(x)},{f(y - 4.6 * s)} {f(x + 1.3 * s)},{f(y - 0.2 * s)}", "#E8D2A8", 0.3 * s, ' opacity="0.9"')
    strek(f"M{f(x - 3.6 * s)},{f(y - 1.0 * s)} L{f(x + 3.6 * s)},{f(y - 1.6 * s)}", "#5A4636", 0.25 * s)
    sti(f"M{f(x - 0.55 * s)},{f(y - 1.2 * s)} a{f(0.55 * s)},{f(0.55 * s)} 0 1 1 {f(1.1 * s)},0 v{f(0.6 * s)} h{f(-1.1 * s)}Z", "#2F4A63")
    A(f'<circle cx="{f(x)}" cy="{f(y - 2.1 * s)}" r="{f(0.42 * s)}" fill="#E9C9A6"/>')


# ---------------------------------------------------------------- the river and the bridge
BRU_Y = 552


def bru_maal():
    y = BRU_Y
    xa, xb = bredd_x(VENSTRE, y) - 14, bredd_x(HOYRE, y) + 14
    midt = (xa + xb) / 2
    piler = (bredd_x(VENSTRE, y) + 2, midt, bredd_x(HOYRE, y) - 2)
    staver = []   # (x1, y1, x2, y2, width) of the trusses
    for x0, x1, hoy in [(xa, midt, 13), (midt, xb, 11)]:
        n = 8
        topp = [(lerp(x0, x1, i / n), y - 1.4 - hoy * (0.5 + 0.5 * math.sin(math.pi * i / n))) for i in range(n + 1)]
        for i, (px, py) in enumerate(topp):
            staver.append((px, py, px, y - 1.4, 0.7))
            if i < n:
                qx, qy = topp[i + 1]
                staver.append((px, py, qx, qy, 1.5))
                staver.append((px, py, qx, y - 1.4, 0.55) if i < n / 2 else (px, y - 1.4, qx, qy, 0.55))
    return xa, xb, piler, staver


VANNLINJE = BRU_Y + 10    # where the piers stand in the water


def bru():
    """The old steel truss bridge across Glomma: two spans on stone piers, a sagging top chord lit from behind."""
    y = BRU_Y
    xa, xb, piler, staver = bru_maal()
    for px in piler:
        sti(P([(px - 3.2, y), (px + 3.2, y), (px + 3.8, VANNLINJE), (px - 3.8, VANNLINJE)]), "#B8B1A4")
        sti(P([(px + 0.6, y), (px + 3.2, y), (px + 3.8, VANNLINJE), (px + 0.8, VANNLINJE)]), "#9C958A")
        sti(P([(px - 3.8, VANNLINJE - 2.2), (px + 3.8, VANNLINJE - 2.2), (px + 3.8, VANNLINJE), (px - 3.8, VANNLINJE)]), "#6E6A63", ' opacity="0.5"')
        strek(f"M{f(px - 3.2)},{f(y + 0.4)} V{f(VANNLINJE - 1)}", blend("#B8B1A4", RIM, 0.6), 0.5)
    # the far truss, paler through the air, then the deck, then the near truss
    A('<g fill="none" stroke-linecap="round">')
    strek("".join(f"M{f(x1 + 1.2)},{f(y1 - 1.6)} L{f(x2 + 1.2)},{f(y2 - 1.6)}" for x1, y1, x2, y2, b in staver), "#8E8079", 0.5)
    A("</g>")
    sti(P([(xa, y - 1.4), (xb, y - 1.4), (xb, y + 1.6), (xa, y + 1.6)]), "#4A3F3A")
    strek(f"M{f(xa)},{f(y - 1.2)} H{f(xb)}", blend("#7A6A60", RIM, 0.5), 0.5)
    A('<g fill="none" stroke-linecap="round">')
    for bredde in (1.5, 0.7, 0.55):
        strek("".join(f"M{f(x1)},{f(y1)} L{f(x2)},{f(y2)}" for x1, y1, x2, y2, b in staver if b == bredde), "#5B4D46", bredde)
    # the top chord catching the low sun
    strek("".join(f"M{f(x1)},{f(y1 - 0.55)} L{f(x2)},{f(y2 - 0.55)}" for x1, y1, x2, y2, b in staver if b == 1.5), RIM, 0.45, ' opacity="0.85"')
    A("</g>")


def bru_speil():
    """The bridge and its piers upside down in the water."""
    xa, xb, piler, staver = bru_maal()
    m = lambda yy: 2 * VANNLINJE - yy
    for px in piler:
        sti(P([(px - 3.6, VANNLINJE), (px + 3.6, VANNLINJE), (px + 3.2, m(BRU_Y)), (px - 3.2, m(BRU_Y))]), "#8D8A82")
    sti(P([(xa, m(BRU_Y - 1.4)), (xb, m(BRU_Y - 1.4)), (xb, m(BRU_Y + 1.6)), (xa, m(BRU_Y + 1.6))]), "#4F4744")
    strek("".join(f"M{f(x1)},{f(m(y1))} L{f(x2)},{f(m(y2))}" for x1, y1, x2, y2, b in staver), "#5B514C", 0.9)


def speil(masker):
    """Everything standing at the water's edge, mirrored at its foot, softened,
    and broken by the ripples into slivers that slide a little to either side."""
    random.seed(53)
    figurer = []
    with lag() as figurer:
        for ting in SPEIL:
            if ting[0] == "tre":
                _, cx, cy, r, c, fot = ting
                sti(klump(cx, 2 * fot - cy, r * 1.0, 9, 0.15, 1.1, 1.15), c)
            else:
                _, x0, x1, top, fot, vegg, tak = ting
                hh = fot - top
                sti(P([(x0, fot), (x1, fot), (x1, fot + hh * 0.62), (x0, fot + hh * 0.62)]), vegg)
                sti(P([(x0 - 0.5, fot + hh * 0.62), (x1 + 0.5, fot + hh * 0.62), (x1 - (x1 - x0) * 0.2, fot + hh * 1.05), (x0 + (x1 - x0) * 0.2, fot + hh * 1.05)]), tak)
    with lag() as bru_:
        bru_speil()
    fid = nid("myk")
    A(f'<filter id="{fid}" x="370" y="460" width="600" height="390" filterUnits="userSpaceOnUse"><feGaussianBlur stdDeviation="0.35 0.15"/></filter>')
    innhold = "".join(figurer)
    for maske, dx in zip(masker, (0.7, -0.7)):
        A(f'<g mask="url(#{maske})"><g transform="translate({dx},0)" filter="url(#{fid})" opacity="0.6">{innhold}</g>'
          f'<g transform="translate({dx * 1.6},0)" opacity="0.22">{"".join(bru_)}</g></g>')


def elv():
    venstre = [(x, y) for x, y in VENSTRE]
    hoyre = list(reversed(HOYRE))
    vann = P(venstre + hoyre)
    cid = nid("vann")
    A(f'<clipPath id="{cid}"><path d="{vann}"/></clipPath><g clip-path="url(#{cid})">')
    # the sky in the water: pale and warm far off, bluer as it comes towards you
    sti(P([(380, 466), (960, 466), (960, 842), (380, 842)]), gradient([
        (0, "#F5ECD9", None), (0.08, "#E6E9E2", None), (0.25, "#CFE0E6", None), (0.55, "#B1CCDB", None), (1, "#93B5CA", None)]))
    # under the sun, the water is brighter all the way down
    gid = nid("solgang")
    A(f'<linearGradient id="{gid}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFF3D8" stop-opacity="0"/>'
      f'<stop offset="0.5" stop-color="#FFF3D8" stop-opacity="0.55"/><stop offset="1" stop-color="#FFF3D8" stop-opacity="0"/></linearGradient>')
    sti(P([(SOL[0] - 5, 466), (SOL[0] + 5, 466), (SOL[0] + 70, 842), (SOL[0] - 70, 842)]), f"url(#{gid})")
    # the ripples that break up reflections: horizontal slivers, wider and
    # further apart nearer, dealt alternately to two masks so the slivers can shift
    random.seed(37)
    striper = ([], [])
    y = 466.0
    i = 0
    while y < 842:
        t = (y - 466) / 376
        h = random.uniform(0.6, 1.3) * (1 + 5 * t)
        striper[i % 2].append(f"M380,{f(y)}h580v{f(h)}h-580Z")
        y += h + random.uniform(0.15, 0.6) * (1 + 3 * t)
        i += 1
    masker = []
    for liste in striper:
        mid_ = nid("krus")
        A(f'<mask id="{mid_}" maskUnits="userSpaceOnUse" x="370" y="460" width="600" height="390">'
          f'<rect x="370" y="460" width="600" height="390" fill="#000"/><path d="{"".join(liste)}" fill="#FFF"/></mask>')
        masker.append(mid_)
    # the banks' own shade on the water, close under them, unbroken
    sti(P([(x, y) for x, y in venstre] + [(x + 0.6 + (y - 466) * 0.03, y) for x, y in reversed(venstre)]), "#3F5A45", ' opacity="0.35"')
    sti(P([(x, y) for x, y in reversed(hoyre)] + [(x - 0.6 - (y - 466) * 0.035, y) for x, y in hoyre]), "#3F5A45", ' opacity="0.35"')
    speil(masker)
    # ripples: short strokes, longer and further apart nearer the viewer
    random.seed(13)
    lys, morke = [], []
    y = 468.0
    while y < 842:
        t = (y - 466) / 376
        x0, x1 = bredd_x(VENSTRE, y), bredd_x(HOYRE, y)
        x = x0 + random.uniform(0, 6)
        while x < x1:
            L = (1.5 + 26 * t) * random.uniform(0.5, 1.5)
            if random.random() < 0.55:
                lys.append(f"M{f(x)},{f(y)}h{f(L)}")
            else:
                morke.append(f"M{f(x)},{f(y + 0.5)}h{f(L * 0.8)}")
            x += L + random.uniform(6, 34) * (0.4 + t)
        y += 1.2 + 6 * t ** 1.3
    strek("".join(lys), "#F1F5F2", 0.35, ' stroke-linecap="round" opacity="0.6"')
    strek("".join(morke), "#6F8C9E", 0.35, ' stroke-linecap="round" opacity="0.35"')
    # the sun's path on the water: straight down from the sun towards you,
    # sparkles thickest and brightest in the middle, thinning out to the sides
    random.seed(9)
    klasser = ([], [], [])
    y = 467.0
    while y < 842:
        sigma = 2.5 + (y - 466) * 0.15
        for _ in range(2 + int((y - 466) / 22)):
            dx = random.gauss(0, 1)
            if abs(dx) > 2.6:
                continue
            L = (0.9 + (y - 466) * 0.07) * random.uniform(0.35, 1.25) * (1.15 - abs(dx) * 0.3)
            tk = 0.22 + (y - 466) * 0.0042
            x = SOL[0] + dx * sigma - L / 2
            klasser[min(2, int(abs(dx) / 0.75))].append(f"M{f(x)},{f(y)} q{f(L / 2)},{f(-tk)} {f(L)},0 q{f(-L / 2)},{f(tk)} {f(-L)},0Z")
        y += 0.8 + (y - 466) * 0.014
    for liste, op in zip(klasser, (0.95, 0.72, 0.45)):
        sti("".join(liste), "#FFF9EA", f' opacity="{op}"')
    A("</g>")
    # the shore's thin bright line where the water meets the banks, against the light
    for pts in ([(x + 0.25, y) for x, y in venstre if 470 <= y <= 580 or 632 <= y <= 760], [(x - 0.25, y) for x, y in reversed(hoyre) if 470 <= y <= 506 or 584 <= y <= 760]):
        strek("M" + " L".join(f"{f(x)},{f(y)}" for x, y in pts), "#FFF6E2", 0.35, ' opacity="0.75"')


# ---------------------------------------------------------------- the near bank (its own layer)
# the treetops in front stand between you and the low sun: deep greens, lit along their tops
NAER_PAL = [("#17302A", "#24452F", "#4F7D40"), ("#1B3A2C", "#2C5034", "#5E8A44"), ("#203F2A", "#365A36", "#6E9548"),
            ("#26452B", "#41653A", "#7FA24E"), ("#2C4628", "#4A6936", "#90A853")]


def naer():
    random.seed(31)
    trar = []
    # treetops framing the river: a cluster on each side, rising higher at the edges
    for side, (xa, xb), topp in [("v", (-60, 560), lambda x: 600 + max(0, x - 200) * 0.18), ("h", (900, 1260), lambda x: 618 - max(0, x - 1000) * 0.2)]:
        for rad, (dy0, dy1, rmin, rmax, n) in enumerate([(0, 30, 15, 22, 60), (30, 90, 19, 28, 56), (90, 220, 24, 38, 44)]):
            for _ in range(n):
                x = random.uniform(xa, xb)
                y = topp(x) + random.uniform(dy0, dy1)
                if side == "v" and x > bredd_x(VENSTRE, min(y, 838)) - 6:
                    continue
                if side == "h" and x < bredd_x(HOYRE, min(y, 838)) + 6:
                    continue
                if random.random() < 0.15 and rad > 0:
                    h = random.uniform(rmin * 2.4, rmax * 3)
                    trar.append((y + rmax * 1.2, "gran", x, h))
                else:
                    trar.append((y + rmax * 0.4, "krone", x, y, random.uniform(rmin, rmax), random.choice(NAER_PAL)))
    # a few birch crowns at the very bottom, over the water
    for x in (640, 760, 880):
        trar.append((900, "krone", x + random.uniform(-20, 20), 832, random.uniform(26, 34), random.choice(NAER_PAL[2:])))
    for t in sorted(trar, key=lambda t: t[0]):
        if t[1] == "gran":
            _, _, x, h = t
            gran(x, t[0], h, "#172D20", "#26432E", rim=min(0.95, rimstyrke(x) * 1.2))
        else:
            _, _, x, y, r, pal = t
            krone(x, y, r, pal, 2, min(0.7, rimstyrke(x) * 1.25))


# ---------------------------------------------------------------- write
MAPPE = os.path.join(os.path.dirname(__file__), "tegninger")
UT = os.path.join(os.path.dirname(__file__), "..", "src", "components", "forside", "utsikt")
KROM = r"C:\Program Files\Google\Chrome\Application\chrome.exe"


def skriv(navn, tegn):
    """Draws one depth and renders it, transparent where nothing is drawn."""
    from PIL import Image

    _ut[0] = []
    A(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">')
    tegn()
    A("</svg>")
    innhold = chr(10).join(_ut[0])
    # Chrome renders an XML error page instead of failing: catch it here
    import xml.etree.ElementTree as ET
    ET.fromstring(innhold)
    os.makedirs(MAPPE, exist_ok=True)
    svg = os.path.abspath(os.path.join(MAPPE, navn + ".svg"))
    with open(svg + ".tmp", "w", encoding="utf-8") as fil:
        fil.write(innhold)
    os.replace(svg + ".tmp", svg)
    png = os.path.abspath(os.path.join(MAPPE, navn + ".png"))
    subprocess.run(
        [KROM, "--headless=new", "--disable-gpu", "--hide-scrollbars", f"--force-device-scale-factor={SKALA}", f"--window-size={W},{H}",
         "--default-background-color=00000000", f"--screenshot={png}", "file:///" + svg.replace(os.sep, "/")],
        check=True, capture_output=True,
    )
    print("drew", navn, "svg", len(innhold) // 1024, "KB")
    return Image.open(png).convert("RGBA")


def lagre(navn, bilde):
    mal = os.path.join(UT, navn + ".webp")
    bilde.save(mal + ".tmp", "WEBP", quality=84, method=6)
    os.replace(mal + ".tmp", mal)
    print("wrote", os.path.normpath(mal), bilde.size, os.path.getsize(mal) // 1024, "KB")


def dis():
    """Morning mist lying low in the valley, thickest far off, and a breath of it over the river where it comes out."""
    for y0, h, op in [(466, 20, 0.45), (482, 16, 0.24), (497, 12, 0.12)]:
        sti(P([(-20, y0), (1220, y0), (1220, y0 + h), (-20, y0 + h)]), gradient([(0, "#F7F1E4", 0), (0.5, "#F7F1E4", op), (1, "#F7F1E4", 0)]))
    gid = nid("elvedis")
    A(f'<radialGradient id="{gid}"><stop offset="0" stop-color="#FBF4E4" stop-opacity="0.5"/><stop offset="1" stop-color="#FBF4E4" stop-opacity="0"/></radialGradient>')
    A(f'<ellipse cx="752" cy="478" rx="110" ry="9" fill="url(#{gid})"/>')
    A(f'<ellipse cx="790" cy="522" rx="60" ry="4" fill="url(#{gid})" opacity="0.6"/>')


def far():
    SKYGGER.clear()
    SPEIL.clear()
    # lay out what stands on the banks first, so the water knows what to mirror
    with lag() as bunn_v:
        v_ting = venstre_land()
    with lag() as bunn_h:
        h_ting = hoyre_land()
    k_ting = kanter()
    with lag() as staende:
        for _, fn in sorted(v_ting + h_ting + k_ting + [(BRU_Y + 3, bru)], key=lambda t: t[0]):
            fn()
    with lag() as vann:
        elv()
    sti(P([(-20, -20), (1220, -20), (1220, 820), (-20, 820)]), "#7E9B62")
    himmel()
    fjernt()
    for d in bunn_v + bunn_h:
        A(d)
    # the shadows on the plain, as one soft layer
    A(f'<g fill="{SKYGGEFARGE}" opacity="0.2">' + "".join(f'<path d="{d}"/>' for d in SKYGGER) + "</g>")
    for d in vann + staende:
        A(d)
    dis()


if __name__ == "__main__":
    from PIL import Image

    lagre("tegnet", Image.alpha_composite(skriv("far-tegnet", far), skriv("near-tegnet", naer)).convert("RGB"))
