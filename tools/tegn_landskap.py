"""Draws the landscape at the foot of the «Om oss» section: Kongsvinger
festning on its hill (the stone wall and bastion, the brick gable, the rust
roofs, the yellow block, the flagpole), the trees on the slope and the old
town's painted houses below, in late summer (the same season as the
photograph at the top of the page; it was autumn until 2026-10-09: the old
colours are in git history).

Drawn from a photograph used only as a reference: «Kongsvinger festning 02»
by Kongsvinger kommune (CC BY 2.0, Wikimedia Commons). Coordinates are those
of that photo at 800 x 600. The sky is left out, so the page shows through,
and so is the flag: the page draws it at (556, 144) so it can wave.

Writes two pictures, both in the photo's coordinates, as SVG sources in
tools/tegninger/ and as WebP for the site (rendered by headless Chrome):
  public/images/tegninger/landskap-bred.webp   x -400..1200, y 118..600, for
                                               wide screens: the hill and the
                                               town carry on to both sides
  public/images/tegninger/landskap-smal.webp   x 80..620, y 118..600, phones

Run from the repo root:  python tools/tegn_landskap.py   (needs Chrome, Pillow)
"""
import math
import os
import random
import subprocess
random.seed(11)
W, H = 800, 600
o = []
A = o.append
_id = [0]


def nid(p):
    _id[0] += 1
    return f"{p}{_id[0]}"


def P(pts):
    return "M" + " L".join(f"{x:.1f},{y:.1f}" for x, y in pts) + " Z"


# ---------- helpers ----------
def blob_d(cx, cy, r, n=10, j=0.26, sy=0.9):
    pts = []
    for i in range(n):
        a = (i + random.uniform(-0.25, 0.25)) / n * 2 * math.pi
        rr = r * (1 + random.uniform(-j, j))
        pts.append((cx + math.cos(a) * rr, cy + math.sin(a) * rr * sy))
    d = f"M{pts[0][0]:.1f},{pts[0][1]:.1f} "
    for i in range(n):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % n]
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        d += f"Q{cx + (mx - cx) * 1.32:.1f},{cy + (my - cy) * 1.32:.1f} {x2:.1f},{y2:.1f} "
    return d + "Z"


def tre(cx, cy, r, pal, bjork=False):
    """A broadleaf tree with volume: dark mass, mid clumps, light on the upper left."""
    if bjork:
        A(f'<path d="M{cx-1.2:.1f},{cy+r*0.6:.1f} L{cx-0.6:.1f},{cy+r*1.5:.1f} L{cx+0.8:.1f},{cy+r*1.5:.1f} L{cx+1.2:.1f},{cy+r*0.6:.1f}Z" fill="#EDEBE4"/>')
    A(f'<path d="{blob_d(cx, cy + r*0.08, r)}" fill="{pal[0]}"/>')
    for _ in range(7):
        A(f'<path d="{blob_d(cx + random.uniform(-0.6, 0.45)*r, cy + random.uniform(-0.5, 0.15)*r, r*random.uniform(0.38, 0.55), 7)}" fill="{pal[1]}"/>')
    for _ in range(3):
        A(f'<path d="{blob_d(cx + random.uniform(-0.5, 0.05)*r, cy + random.uniform(-0.62, -0.25)*r, r*random.uniform(0.18, 0.3), 6)}" fill="{pal[2]}"/>')


def gran(x, base, h, mork="#1E3526", lys="#2D4C35"):
    def form(x, base, h, w):
        pts = [(x, base - h)]
        tiers = 6
        for t in range(1, tiers + 1):
            yy = base - h + h * t / tiers * 0.94
            ww = w / 2 * (0.25 + 0.75 * t / tiers)
            pts.append((x + ww, yy))
            pts.append((x + ww * 0.5, yy - h * 0.05))
        right = pts[1:]
        left = [(2 * x - px, py) for px, py in reversed(right)]
        return [pts[0]] + right + [(x + 1.5, base), (x - 1.5, base)] + left
    A(f'<path d="{P(form(x, base, h, h*0.38))}" fill="{mork}"/>')
    A(f'<path d="{P(form(x - h*0.04, base - h*0.06, h*0.82, h*0.24))}" fill="{lys}"/>')


def tekstur_tak(poly, base, mork, lys, step=2.4):
    cid = nid("t")
    xs = [p[0] for p in poly]
    ys = [p[1] for p in poly]
    A(f'<clipPath id="{cid}"><path d="{P(poly)}"/></clipPath>')
    A(f'<path d="{P(poly)}" fill="{base}"/>')
    A(f'<g clip-path="url(#{cid})">')
    y = min(ys) + 1
    while y < max(ys):
        A(f'<path d="M{min(xs):.1f},{y:.1f} L{max(xs):.1f},{y:.1f}" stroke="{mork}" stroke-width="0.45" opacity="0.45"/>')
        y += step
    for _ in range(int((max(xs) - min(xs)) * (max(ys) - min(ys)) / 40)):
        x = random.uniform(min(xs), max(xs))
        yy = random.uniform(min(ys), max(ys))
        A(f'<circle cx="{x:.1f}" cy="{yy:.1f}" r="{random.uniform(0.8, 2.4):.1f}" fill="{random.choice([mork, lys])}" opacity="0.16"/>')
    A('</g>')


def stein(poly, farger, fuge="#857868", rad=(4.2, 6.2), bredde=(5, 12)):
    cid = nid("s")
    xs = [p[0] for p in poly]
    ys = [p[1] for p in poly]
    A(f'<clipPath id="{cid}"><path d="{P(poly)}"/></clipPath>')
    A(f'<path d="{P(poly)}" fill="{fuge}"/>')
    A(f'<g clip-path="url(#{cid})">')
    y = min(ys)
    while y < max(ys):
        h = random.uniform(*rad)
        x = min(xs) - random.uniform(0, 8)
        while x < max(xs):
            b = random.uniform(*bredde)
            A(f'<rect x="{x+0.35:.1f}" y="{y+0.35:.1f}" width="{b-0.7:.1f}" height="{h-0.7:.1f}" rx="1.3" fill="{random.choice(farger)}"/>')
            x += b
        y += h
    A('</g>')


def vindu(x, y, b=3.6, h=5, ramme="#F4F1EA", rute="#3A4652", bue=False):
    if bue:
        A(f'<path d="M{x},{y+h} V{y+b/2} A{b/2},{b/2} 0 0 1 {x+b},{y+b/2} V{y+h} Z" fill="{rute}" stroke="{ramme}" stroke-width="0.7"/>')
    else:
        A(f'<rect x="{x}" y="{y}" width="{b}" height="{h}" fill="{rute}" stroke="{ramme}" stroke-width="0.7"/>')
        A(f'<path d="M{x+b/2},{y} V{y+h} M{x},{y+h*0.45} H{x+b}" stroke="{ramme}" stroke-width="0.45"/>')


def hus_lang(x, base, b, vegg_h, tak_h, vegg, tak, rader=1, kol=None, ramme="#F4F1EA", gavl=None, pipe=()):
    """A house seen from its long side: wall, a saddle roof band, windows."""
    eave = base - vegg_h
    A(f'<rect x="{x}" y="{eave}" width="{b}" height="{vegg_h}" fill="{vegg}"/>')
    A(f'<rect x="{x}" y="{eave}" width="{b}" height="1.6" fill="#000" opacity="0.18"/>')
    for px in pipe:
        A(f'<rect x="{px}" y="{eave - tak_h - 3.5}" width="3" height="5" fill="#7A4E40"/>')
    tekstur_tak([(x - 2.5, eave), (x + b + 2.5, eave), (x + b + 1, eave - tak_h), (x - 1, eave - tak_h)], tak, "#000000", "#FFFFFF")
    kol = kol or max(2, int(b / 12))
    for r in range(rader):
        for k in range(kol):
            vx = x + 5 + k * (b - 13) / max(1, kol - 1)
            vy = eave + 3 + r * (vegg_h - 4) / max(1, rader)
            if vy + 5 < base:
                vindu(round(vx, 1), round(vy, 1), ramme=ramme)


def hus_gavl(x, base, b, vegg_h, topp, vegg, tak, trim="#F4F1EA", side=None):
    """A house with its gable end to us; optionally the roof's long side to the right."""
    cx = x + b / 2
    eave = base - vegg_h
    if side:
        sx, sy = side
        tekstur_tak([(cx, topp), (x + b + 2, eave), (x + b + sx, eave + sy), (cx + sx, topp + sy - 4)], tak, "#000000", "#FFFFFF")
        A(f'<path d="{P([(x+b, eave), (x+b+sx, eave+sy), (x+b+sx, base), (x+b, base)])}" fill="{vegg}" opacity="0.85"/>')
    A(f'<path d="{P([(x, base), (x, eave), (cx, topp), (x+b, eave), (x+b, base)])}" fill="{vegg}"/>')
    A(f'<path d="M{x-2},{eave+1.5} L{cx},{topp-1.2} L{x+b+2},{eave+1.5}" fill="none" stroke="{tak}" stroke-width="2.6" stroke-linejoin="round"/>')
    A(f'<path d="M{x-1},{eave+2.6} L{cx},{topp+0.6} L{x+b+1},{eave+2.6}" fill="none" stroke="{trim}" stroke-width="0.9"/>')


ROST, ROST_M, ROST_L = "#B5532F", "#7E3420", "#D27A4E"
GM = ("#24402B", "#2F5434", "#3E6B3A")
G = ("#3B6532", "#4E7E3A", "#6A9944")
GL = ("#56823A", "#6F9A42", "#8DB052")
OL = ("#6F7A2E", "#8E9A38", "#AEB24A")
GUL = ("#6F8E35", "#93AE48", "#BFCB68")
ORA = ("#4F7A33", "#6C9440", "#9DB85A")
ROD = ("#2E4D30", "#3F6338", "#5B8545")


# ---------- to both sides, for wide screens ----------
def sider():
    random.seed(29)
    # the hill falling away on both sides, under its trees
    A('<path d="M-420,340 C-300,320 -150,290 -10,262 L-10,610 L-420,610 Z" fill="#2F4F30"/>')
    A('<path d="M810,240 C940,250 1080,290 1220,330 L1220,610 L810,610 Z" fill="#2F4F30"/>')
    for x0, x1, y0, y1 in [(-420, -10, 340, 262), (810, 1220, 240, 330)]:
        for _ in range(26):
            t = random.random()
            x = x0 + (x1 - x0) * t
            y = y0 + (y1 - y0) * t + random.uniform(0, 24)
            if random.random() < 0.35:
                gran(x, y + 30, random.uniform(50, 80))
            else:
                tre(x, y + 6, random.uniform(20, 30), random.choice([G, GM, GL, OL, ORA, G, GM]))
    # the town carrying on, in rows with trees between
    farger = [("#E3B342", "#B32D2A"), ("#F2EFEA", "#5E656D"), ("#B0362B", "#5D6168"), ("#E2932F", "#C1272D"), ("#EADCD8", "#B8402E"), ("#E6B53A", "#C33A2A")]
    for side in (-1, 1):
        for rad, (y, tak_h) in enumerate([(370, 12), (420, 16), (470, 18)]):
            x = 820 if side > 0 else -400
            while (x < 1210 if side > 0 else x < -20):
                b = random.uniform(46, 90)
                vegg, tak = random.choice(farger)
                if random.random() < 0.45:
                    hus_lang(round(x, 1), y + random.uniform(-6, 6), round(b, 1), random.uniform(12, 22), tak_h, vegg, tak)
                x += b + random.uniform(30, 70)
            for _ in range(14):
                cx = random.uniform(830, 1210) if side > 0 else random.uniform(-410, -20)
                tre(cx, y + random.uniform(14, 30), random.uniform(16, 24), random.choice([G, GM, GL, OL, ORA]))
    # the broadleaf trees in front
    for x0, x1 in [(-430, -20), (820, 1230)]:
        x = x0
        while x < x1:
            tre(x, random.uniform(540, 572), random.uniform(38, 50), random.choice([GUL, OL, G, GM, OL]), bjork=random.random() < 0.4)
            x += random.uniform(36, 52)
        for x in range(int(x0), int(x1), 34):
            tre(x + random.uniform(-8, 8), random.uniform(588, 606), random.uniform(34, 44), random.choice([OL, G, GM, GUL]))


def scene():
    random.seed(11)
    # ---------- behind the fortress ----------
    for x, top in [(4, 196), (22, 188), (40, 192), (58, 182), (78, 190), (96, 186), (114, 196), (132, 193), (150, 200)]:
        gran(x + random.uniform(-2, 2), 275, 275 - top, "#1C3123", "#2A4632")
    tre(620, 214, 24, ("#24402B", "#2F5434", "#3E6B3A"))
    tre(722, 214, 22, ("#4F7A33", "#6C9440", "#9DB85A"))
    tre(768, 226, 22, ("#2E4D30", "#3F6338", "#5B8545"))
    tre(668, 226, 22, ("#3B6532", "#4E7E3A", "#6A9944"))

    # the hill itself, under everything below the wall
    A('<path d="M-10,262 C40,258 80,262 98,272 L600,262 C660,240 740,236 810,240 L810,610 L-10,610 Z" fill="#2F4F30"/>')

    # ---------- the fortress buildings ----------
    ROST, ROST_M, ROST_L = "#B5532F", "#7E3420", "#D27A4E"
    # right wing: roof with a red-trimmed end, light wall below
    tekstur_tak([(453.7, 184), (494, 183), (508, 215.7), (453.7, 216.7)], ROST, ROST_M, ROST_L)
    A('<path d="M494,183 L508.5,216" stroke="#C0392B" stroke-width="2"/>')
    A('<rect x="454" y="216.5" width="53.5" height="9" fill="#CDAE7E"/>')
    for vx in (461, 473.5, 487.5, 500):
        vindu(vx, 218.5, 3.4, 4.5, "#E9DCC0", "#4A3B30")
    A('<rect x="454" y="178" width="3" height="6.5" fill="#8E5A48"/>')
    # left wing: the long roof, the light wall under it, the gable end with its windows
    A('<rect x="301" y="209" width="83" height="14" fill="#C9A97A"/>')
    tekstur_tak([(288.6, 174.4), (387, 180.5), (384, 210), (301.5, 210)], ROST, ROST_M, ROST_L)
    A('<path d="M311,172.5 h3.5 v6 h-3.5Z" fill="#8E5A48"/>')
    A('<path d="M357,191 L363.5,181 L370,191Z" fill="#A9472C"/><rect x="360.8" y="185.5" width="5" height="4.5" fill="#3E2E26"/>')
    A(f'<path d="{P([(272.5, 223), (272.5, 205), (288.6, 174.4), (302, 209.7), (302, 223)])}" fill="#9F7566"/>')
    A('<path d="M271.5,205.5 L288.6,173.6 L302.5,210.5" fill="none" stroke="#C0392B" stroke-width="1.8" stroke-linejoin="round"/>')
    for vx, vy in [(281.2, 186.2), (290.2, 186.2), (281.2, 199.5), (290.2, 199.5), (281.2, 213.5), (290.2, 213.5)]:
        vindu(vx, vy, 3.2, 5, "#E7D9C9", "#3B2E2A")
    # the lower building in front, its railing and the striped sentry box
    tekstur_tak([(316, 214.5), (319.6, 205), (381, 207.5), (383, 214.5)], "#B8452E", ROST_M, ROST_L)
    A('<rect x="316" y="214.5" width="67" height="8.5" fill="#D8C29A"/>')
    A('<path d="M354,213 H382 M354,216.5 H382" stroke="#F6F4EE" stroke-width="0.8"/>')
    for bx in range(355, 383, 2):
        A(f'<path d="M{bx},213 V219" stroke="#F6F4EE" stroke-width="0.5"/>')
    for k in range(4):
        farge = "#C0392B" if k % 2 == 0 else "#F4F1EA"
        A(f'<rect x="{378.8 + k*1.1:.1f}" y="206" width="1.1" height="9.5" fill="{farge}"/>')
    # the yellow block: shaded side, lit front, its windows, the mossy pyramid roof
    A(f'<path d="{P([(371.5, 197), (382, 193), (382, 225), (371.5, 223)])}" fill="#C7A646"/>')
    A('<rect x="382" y="193" width="72.5" height="32" fill="#E8C95A"/>')
    A('<rect x="382" y="193" width="72.5" height="3" fill="#000" opacity="0.15"/>')
    for vx in (399.3, 432.4):
        vindu(vx, 196.2, 5.2, 5.6, "#C26B3E", "#3C3128")
        vindu(vx, 207.2, 5.2, 7, "#C26B3E", "#3C3128", bue=True)
        vindu(vx, 219.6, 5.2, 4.6, "#C26B3E", "#3C3128")
    tekstur_tak([(369.7, 197.5), (382, 193), (415, 161.5)], "#5F5240", "#3E3528", "#7D7A52")
    tekstur_tak([(382, 193), (455.5, 193), (415, 161.5)], "#7A6A4C", "#4F4433", "#93955F")
    A('<path d="M381.5,193.4 L455.8,193.4" stroke="#F1EDE0" stroke-width="1.1"/>')
    A('<rect x="413.2" y="158.5" width="3.4" height="5" fill="#7A4E40"/>')
    # antennas
    for x1, y1, y2 in [(333.7, 157, 177.5), (390.7, 159.7, 179.5), (412, 145.7, 163), (417, 142, 162), (449, 163, 182.4)]:
        A(f'<path d="M{x1},{y1} V{y2}" stroke="#4E555C" stroke-width="0.6" opacity="0.8"/>')
    # the flag on its pole, and the little white shed at its foot
    A('<path d="M555,219 V141.5" stroke="#F2F2EE" stroke-width="1.6"/>')
    A('<circle cx="555" cy="141.3" r="1" fill="#E8C95A"/>')
    A('<path d="M539.3,224 V217 C539.3,212.5 545,211.5 552.6,211.5 C560,211.5 566,212.5 566,217 V224Z" fill="#F4F4F0"/>')
    A('<path d="M539.3,217 H566" stroke="#C9CDD0" stroke-width="0.8"/>')

    # ---------- the wall and the bastion ----------
    STEIN = ["#A99886", "#B9A089", "#9E8C7B", "#C2A48E", "#958373", "#B19A8A", "#A58E80"]
    stein([(150, 222), (595, 226), (595, 266), (150, 272)], STEIN)
    A('<path d="M150,221.2 L595,225.2 L595,228.2 L150,224.6Z" fill="#7D8E4A"/>')
    A('<path d="M150,224.6 L595,228.2" stroke="#5F6E38" stroke-width="0.6"/>')
    stein([(98, 240), (141, 236), (141, 273), (98, 273)], ["#B6998A", "#C4A595", "#A98E80", "#BFA08E", "#9D8476"], "#8A786C")
    stein([(141, 224), (158, 221.5), (158, 270), (141, 274)], ["#8F7E70", "#9A8879", "#857466", "#A08C7C"], "#766759")
    A('<path d="M141,224 V274" stroke="#C9B3A2" stroke-width="1.2" opacity="0.6"/>')
    A('<path d="M98,241 C104,232 116,227.5 128,227 C135,226.8 140,224.6 158,221.4 L158,224 C141,227 134,229.5 128,230 C116,231 106,236 98,243Z" fill="#6E8545"/>')
    A('<path d="M98,241 C104,232 116,227.5 128,227 C135,226.8 140,224.6 158,221.4 L141,232 L98,243Z" fill="#7F9A4E"/>')
    for rx, ry, rr in [(132, 270, 6), (142, 272, 5), (126, 274, 4.5), (150, 271, 4)]:
        A(f'<path d="{blob_d(rx, ry, rr, 6, 0.3, 0.7)}" fill="#55524E"/>')

    # ---------- trees on the slope under the wall ----------
    GM = ("#24402B", "#2F5434", "#3E6B3A")
    G = ("#3B6532", "#4E7E3A", "#6A9944")
    GL = ("#56823A", "#6F9A42", "#8DB052")
    OL = ("#6F7A2E", "#8E9A38", "#AEB24A")
    GUL = ("#6F8E35", "#93AE48", "#BFCB68")
    ORA = ("#4F7A33", "#6C9440", "#9DB85A")
    ROD = ("#2E4D30", "#3F6338", "#5B8545")
    for x, base, h in [(8, 300, 70), (30, 296, 62), (70, 300, 60)]:
        gran(x, base, h)
    tre(176, 240, 28, G)
    tre(334, 232, 14, ("#8A6A2A", "#B88A3A", "#D9A84A"))
    for cx, cy, r, pal in [(214, 268, 22, GM), (250, 262, 24, G), (290, 258, 26, GL), (330, 262, 22, G), (364, 262, 20, OL),
                           (396, 272, 20, GM), (424, 270, 24, G), (458, 274, 22, GL), (536, 262, 22, G), (568, 274, 18, GM)]:
        tre(cx, cy, r, pal)
    tre(500, 252, 24, ROD, bjork=True)
    tre(512, 246, 12, ORA)
    tre(598, 204, 20, GM)
    tre(600, 238, 28, GM)
    for cx, cy, r, pal in [(640, 252, 28, G), (690, 262, 26, GM), (742, 252, 26, OL), (786, 262, 24, G), (36, 280, 26, GM), (96, 292, 22, G)]:
        tre(cx, cy, r, pal)
    tekstur_tak([(424, 259), (449, 259), (467.5, 275.5), (441, 275.5)], "#C2502E", ROST_M, ROST_L)
    A('<path d="M441,275.5 H467.5 V281 H441Z" fill="#D9CFC0"/>')


    # ---------- the town, back to front ----------
    def rad_traer(y0, y1, n, pals, rmin=18, rmax=26, unnga=()):
        for _ in range(n):
            cx = random.uniform(-10, 810)
            cy = random.uniform(y0, y1)
            if any(a <= cx <= b and c <= cy <= d for a, b, c, d in unnga):
                continue
            tre(cx, cy, random.uniform(rmin, rmax), random.choice(pals))


    rad_traer(292, 340, 44, [G, GM, GL, G, OL], rmin=18, rmax=28, unnga=[(124, 210, 270, 300)])
    tre(58, 314, 28, ORA)
    # row 1
    hus_lang(0, 364, 30, 10, 7, "#EADCD8", "#B8402E", kol=2)
    hus_gavl(84, 370, 26, 13, 349, "#9A5444", "#B8402E")
    hus_gavl(110, 368, 36, 12, 346, "#8E5340", "#C0472E")
    hus_lang(120, 348, 66, 26, 12, "#E3B342", "#B32D2A", rader=2, kol=6, pipe=(130, 154))
    tekstur_tak([(584, 333), (724, 333), (708, 302), (600, 302)], "#C0582F", ROST_M, ROST_L)
    A('<rect x="613" y="296.5" width="3" height="6" fill="#7A4E40"/><rect x="693" y="296.5" width="3" height="6" fill="#7A4E40"/>')
    A('<rect x="586" y="333" width="136" height="17" fill="#DDB040"/>')
    for k in range(10):
        vindu(round(591 + k * 13, 1), 337, 4.2, 6)
    hus_lang(502, 372, 98, 8, 18, "#E2D6C6", "#A8402E", kol=6)
    A('<rect x="598" y="364" width="32" height="26" fill="#7C2B2A"/>')
    tekstur_tak([(596, 364), (632, 364), (630, 355), (598, 355)], "#A8402E", ROST_M, ROST_L)
    for k in range(3):
        for r in range(2):
            vindu(602 + k * 9.5, 368 + r * 10, 3.6, 5.5)
    rad_traer(374, 398, 40, [G, GM, GL, OL, G], rmin=17, rmax=25)
    # row 2
    hus_lang(0, 422, 64, 16, 20, "#E5B03A", "#5B4F55", kol=4)
    hus_lang(62, 426, 178, 24, 26, "#E2932F", "#C1272D", kol=7, pipe=(96, 150, 196))
    for dx in (84, 206):
        A(f'<path d="M{dx-7},392 L{dx},383 L{dx+7},392 V397 H{dx-7}Z" fill="#C1272D"/>')
        A(f'<path d="M{dx-7.5},392.5 L{dx},383 L{dx+7.5},392.5" stroke="#F4F1EA" stroke-width="0.8" fill="none"/>')
        vindu(dx - 3, 389.5, 6, 6)
    A('<rect x="76" y="418" width="16" height="1.2" fill="#F4F1EA"/>')
    hus_lang(292, 428, 48, 34, 8, "#E4BFAF", "#B5402E", rader=3, kol=4)
    hus_gavl(452, 430, 44, 48, 360, "#E9E4DE", "#A6503A")
    A('<rect x="462" y="356" width="3" height="7" fill="#7A4E40"/>')
    hus_gavl(394, 430, 44, 40, 376, "#2E2B33", "#C2302A", side=(34, 16))
    for vx, vy in [(403, 395), (426, 395), (403, 407), (426, 407), (403, 419), (426, 419), (446, 412), (456, 416), (466, 420)]:
        vindu(vx, vy, 4.2, 6)
    hus_gavl(488, 432, 26, 18, 404, "#B0362B", "#B0362B")
    A('<rect x="500" y="414" width="58" height="18" fill="#B0362B"/>')
    hus_gavl(552, 432, 26, 18, 403, "#B0362B", "#B0362B")
    for vx in (494, 516, 530, 544, 560):
        vindu(vx, 419, 4, 5.5)
    A('<rect x="596" y="406" width="92" height="22" fill="#F1EEE8"/>')
    for k in range(6):
        vindu(600 + k * 14.5, 411, 5, 7, "#D7D3CC", "#3A4652")
    hus_gavl(612, 406, 64, 14, 372, "#E6B53A", "#C33A2A")
    vindu(641.5, 378, 3.5, 5)
    vindu(624, 394, 4, 6)
    vindu(659, 394, 4, 6)
    hus_lang(746, 436, 52, 16, 8, "#E8A83A", "#D4762E", kol=3)
    rad_traer(440, 460, 40, [G, GM, GL, OL, ORA, G], rmin=17, rmax=23)
    # row 3
    hus_lang(56, 466, 116, 14, 26, "#F2EFEA", "#6B5A60", kol=6)
    tekstur_tak([(82, 452), (102, 452), (104, 462), (80, 462)], "#C04A30", ROST_M, ROST_L)
    hus_lang(304, 454, 236, 8, 18, "#E9E2DA", "#B3242C", kol=10)
    A('<path d="M380,437 V454 M462,437 V454" stroke="#7A1A20" stroke-width="0.8"/>')
    hus_lang(582, 450, 78, 6, 22, "#F1F0EC", "#4F555E", kol=4)
    hus_lang(648, 466, 132, 14, 22, "#F1F0EC", "#7C8B99", kol=8)
    hus_lang(390, 488, 68, 28, 16, "#F3F3F0", "#5E656D", rader=2, kol=4, ramme="#3D5A8A")
    A('<path d="M424,514 V447" stroke="#F2F2EE" stroke-width="1.1"/>')
    A('<path d="M424.5,448.5 C428,449.5 431,451 434,453 L434.5,458 C431,456.5 428,455.5 424.8,455Z" fill="#BA0C2F"/>')
    smaakors = "M427.5,448.8 V455.7 M424.6,452 C428,452.8 431,454 434.4,455.5"
    A(f'<path d="{smaakors}" stroke="#FFFFFF" stroke-width="1.6" fill="none"/><path d="{smaakors}" stroke="#00205B" stroke-width="0.8" fill="none"/>')
    rad_traer(492, 512, 36, [G, GM, OL, GL, ORA], rmin=17, rmax=24, unnga=[(330, 396, 470, 520)])
    hus_lang(336, 526, 54, 26, 20, "#A8322B", "#5D6168", rader=2, kol=3)

    # ---------- the birches in front ----------
    for x, base, h in [(334, 520, 80), (420, 530, 96), (522, 528, 92), (476, 540, 70)]:
        gran(x, base, h)
    x = -30
    while x < 830:
        pal = random.choice([GUL, OL, G, GM, OL, ORA if 560 < x < 660 else G])
        tre(x, random.uniform(536, 572), random.uniform(38, 50), pal, bjork=random.random() < 0.4)
        x += random.uniform(36, 52)
    for x in range(-10, 830, 34):
        tre(x + random.uniform(-8, 8), random.uniform(588, 606), random.uniform(34, 44), random.choice([OL, G, GM, GUL]))



KROM = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
MAPPE = os.path.join(os.path.dirname(__file__), "tegninger")
PUBLIC = os.path.join(os.path.dirname(__file__), "..", "public", "images", "tegninger")


def ettermiddag(bilde):
    """Late-afternoon light: the page runs through one summer day, from the
    midday photograph at the top to the bridge at dusk in the footer, and the
    hill sits in between. A warm glaze, strongest on the treetops and the
    fortress up top, fading down the slope. Alpha is left alone."""
    import numpy as np
    from PIL import Image

    a = np.asarray(bilde).astype(np.float32)
    h = a.shape[0]
    styrke = np.linspace(1.0, 0.45, h, dtype=np.float32)[:, None]
    for kanal, varme in enumerate((1.055, 1.012, 0.9)):
        a[..., kanal] *= 1 + styrke * (varme - 1)
    return Image.fromarray(np.clip(a + 0.5, 0, 255).astype(np.uint8), "RGBA")


def skriv(navn, viewbox, med_sider, skala):
    """Draws the scene, writes it as SVG (the source, in tools/tegninger), then
    renders it in headless Chrome with a clear background and saves it as WebP
    for the site: thousands of shapes are far lighter as one image."""
    from PIL import Image

    vx, vy, vb, vh = (float(t) for t in viewbox.split())
    b, h = round(vb * skala), round(vh * skala)
    o.clear()
    A(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}" width="{b}" height="{h}">')
    if med_sider:
        sider()
    scene()
    A("</svg>")
    os.makedirs(MAPPE, exist_ok=True)
    svg = os.path.abspath(os.path.join(MAPPE, navn + ".svg"))
    with open(svg + ".tmp", "w", encoding="utf-8") as f:
        f.write(chr(10).join(o))
    os.replace(svg + ".tmp", svg)
    png = os.path.abspath(os.path.join(MAPPE, navn + ".png"))
    subprocess.run(
        [KROM, "--headless=new", "--disable-gpu", "--hide-scrollbars", f"--window-size={b},{h}",
         "--default-background-color=00000000", f"--screenshot={png}", "file:///" + svg.replace(os.sep, "/")],
        check=True, capture_output=True,
    )
    os.makedirs(PUBLIC, exist_ok=True)
    webp = os.path.join(PUBLIC, navn + ".webp")
    ettermiddag(Image.open(png).convert("RGBA")).save(webp + ".tmp", "WEBP", quality=84, method=6)
    os.replace(webp + ".tmp", webp)
    print("wrote", os.path.normpath(webp), f"{b}x{h}", os.path.getsize(webp) // 1024, "KB")


skriv("landskap-bred", "-400 118 1600 482", True, 2)
skriv("landskap-smal", "80 118 540 482", False, 2)
