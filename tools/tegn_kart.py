"""Draws the map of the clinic's part of Kongsvinger for the «Kontakt» section:
Glomma with its bridges, the streets of Midtbyen, the railway and the station
on the far bank, and the star of Kongsvinger festning on the hill.

Drawn from OpenStreetMap data (© OpenStreetMap contributors, ODbL), fetched
once from the OSM API and cached in tools/tegninger/ (gitignored). The map is
in units of 2 metres with the clinic, Fjellgata 4, at (0, 0), north up.

Writes public/images/tegninger/kart.svg: the drawing only, no text and no
background, so the page lays its own paper under it and its own labels, pin
and the clinic's house over it (positions printed at the end).

Run from the repo root:  python tools/tegn_kart.py
"""
import json
import math
import os
import urllib.request
import xml.etree.ElementTree as ET

ROT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROT, "tools", "tegninger", "kart-osm.xml")
UT = os.path.join(ROT, "public", "images", "tegninger", "kart.svg")
BBOX = (11.9760, 60.1840, 12.0160, 60.2000)  # w, s, e, n

# Fjellgata 4, from its address point in OpenStreetMap
LAT0, LON0 = 60.191491, 11.998022
M_PER_DEG = 111_320
K = math.cos(math.radians(LAT0))
ENHET = 2.0  # metres per map unit

# What the page shows of the map, in map units
X0, Y0, X1, Y1 = -280, -500, 520, 280


def xy(lat, lon):
    return ((lon - LON0) * K * M_PER_DEG / ENHET, (LAT0 - lat) * M_PER_DEG / ENHET)


def hent():
    if not os.path.exists(CACHE):
        os.makedirs(os.path.dirname(CACHE), exist_ok=True)
        url = "https://api.openstreetmap.org/api/0.6/map?bbox=" + ",".join(f"{v}" for v in BBOX)
        req = urllib.request.Request(url, headers={"User-Agent": "kongsvinger-tannhelse-kart/1.0"})
        with urllib.request.urlopen(req, timeout=120) as r, open(CACHE, "wb") as f:
            f.write(r.read())
    rot = ET.parse(CACHE).getroot()
    noder = {n.get("id"): (float(n.get("lat")), float(n.get("lon")), {t.get("k"): t.get("v") for t in n.findall("tag")}) for n in rot.findall("node")}
    veier = {w.get("id"): {"nd": [x.get("ref") for x in w.findall("nd")], "tags": {t.get("k"): t.get("v") for t in w.findall("tag")}} for w in rot.findall("way")}
    rel = [{"tags": {t.get("k"): t.get("v") for t in r.findall("tag")}, "members": [(m.get("type"), m.get("ref"), m.get("role")) for m in r.findall("member")]} for r in rot.findall("relation")]
    return noder, veier, rel


def dp(pts, tol):
    """Douglas-Peucker: drop points that bend the line less than tol."""
    if len(pts) < 3:
        return pts
    if pts[0] == pts[-1]:
        # A closed ring has no baseline: split it at the point farthest from its start
        ax, ay = pts[0]
        i = max(range(len(pts)), key=lambda k: math.hypot(pts[k][0] - ax, pts[k][1] - ay))
        if i == 0:
            return pts[:1]
        return dp(pts[: i + 1], tol)[:-1] + dp(pts[i:], tol)
    (ax, ay), (bx, by) = pts[0], pts[-1]
    dx, dy = bx - ax, by - ay
    n = math.hypot(dx, dy) or 1e-9
    best, idx = 0.0, 0
    for i in range(1, len(pts) - 1):
        px, py = pts[i]
        d = abs(dy * px - dx * py + bx * ay - by * ax) / n
        if d > best:
            best, idx = d, i
    if best <= tol:
        return [pts[0], pts[-1]]
    return dp(pts[: idx + 1], tol)[:-1] + dp(pts[idx:], tol)


def tall(v):
    s = f"{v:.1f}".rstrip("0").rstrip(".")
    return "0" if s == "-0" else s


def med_klokka(pts):
    """The same ring, turning clockwise. Many rings share one path, and with the
    nonzero rule two overlapping rings that turn opposite ways cut a hole."""
    areal = sum(pts[i - 1][0] * pts[i][1] - pts[i][0] * pts[i - 1][1] for i in range(len(pts)))
    return pts if areal >= 0 else pts[::-1]


def sti(pts, lukk=False):
    if lukk:
        pts = med_klokka(pts)
    return "M" + " ".join(f"{tall(x)},{tall(y)}" for x, y in pts) + ("Z" if lukk else "")


def innenfor(pts, marg=40):
    return any(X0 - marg <= x <= X1 + marg and Y0 - marg <= y <= Y1 + marg for x, y in pts)


def kjed(segmenter):
    """Join open ways that share end nodes into longer chains."""
    segs = [s[:] for s in segmenter]
    kjeder = []
    while segs:
        c = segs.pop(0)
        endret = True
        while endret and c[0] != c[-1]:
            endret = False
            for i, s in enumerate(segs):
                if s[0] == c[-1]:
                    c += s[1:]
                elif s[-1] == c[-1]:
                    c += s[::-1][1:]
                elif s[-1] == c[0]:
                    c = s + c[1:]
                elif s[0] == c[0]:
                    c = s[::-1] + c[1:]
                else:
                    continue
                segs.pop(i)
                endret = True
                break
        kjeder.append(c)
    return kjeder


def inni(px, py, poly):
    inne = False
    for i in range(len(poly)):
        (ax, ay), (bx, by) = poly[i], poly[i - 1]
        if (ay > py) != (by > py) and px < (bx - ax) * (py - ay) / (by - ay) + ax:
            inne = not inne
    return inne


def main():
    noder, veier, rel = hent()

    def punkter(nd):
        return [xy(*noder[n][:2]) for n in nd if n in noder]

    o = []
    A = o.append
    W, H = X1 - X0, Y1 - Y0
    A(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{X0} {Y0} {W} {H}" width="{W * 2}" height="{H * 2}">')

    # ── Glomma: the two banks close outside the frame into one ring ──
    elv = [r for r in rel if r["tags"].get("water") == "river"][0]
    banker = kjed([veier[ref]["nd"] for t, ref, rolle in elv["members"] if t == "way" and ref in veier and rolle == "outer"])
    ring = []
    for b in banker:
        ring += punkter(b)
    elvesti = sti(dp(ring, 0.8), True)
    A('<defs>')
    A(f'<clipPath id="elv"><path d="{elvesti}"/></clipPath>')
    A('</defs>')

    # ── green: parks, lawns, pitches ──
    gront = []
    for w in veier.values():
        t = w["tags"]
        if t.get("leisure") in ("park", "pitch", "playground") or t.get("landuse") in ("grass", "village_green", "meadow", "flowerbed") or t.get("natural") in ("scrub", "shrubbery"):
            p = punkter(w["nd"])
            if len(p) > 2 and w["nd"][0] == w["nd"][-1] and innenfor(p):
                gront.append(sti(dp(p, 0.6), True))
    A(f'<path fill="#DCE2C8" d="{"".join(gront)}"/>')

    # the river, with water lines along its banks as on an old engraved map
    A(f'<path fill="#B9CDCC" d="{elvesti}"/>')
    # each line is a wide stroke in the line's colour with a slightly narrower
    # one in the water's colour over it, so a thin line runs parallel to the bank
    A('<g clip-path="url(#elv)" fill="none">')
    for avstand, farge in ((34, "#A8C0C1"), (22, "#A1BBBD"), (13, "#97B3B6"), (6, "#8DABAF")):
        A(f'<path d="{elvesti}" stroke="{farge}" stroke-width="{avstand * 2}"/>')
        A(f'<path d="{elvesti}" stroke="#B9CDCC" stroke-width="{avstand * 2 - 1.6}"/>')
    A('</g>')
    A(f'<path d="{elvesti}" fill="none" stroke="#7F9EA3" stroke-width="1.4"/>')

    # small ponds
    for w in veier.values():
        t = w["tags"]
        if t.get("natural") == "water" and w["nd"][0] == w["nd"][-1]:
            p = punkter(w["nd"])
            if innenfor(p, 0):
                A(f'<path fill="#B9CDCC" stroke="#7F9EA3" stroke-width="0.8" d="{sti(dp(p, 0.4), True)}"/>')

    # ── Kongsvinger festning: the star, with hachured slopes ──
    fort = next(w for w in veier.values() if w["tags"].get("historic") == "fort")
    fp = punkter(fort["nd"])
    fortsti = sti(dp(fp, 0.5), True)
    A(f'<path d="{fortsti}" fill="none" stroke="#B3A991" stroke-width="16" stroke-dasharray="1 2.6"/>')
    A(f'<path d="{fortsti}" fill="#EAE3D0" stroke="#8A7F6A" stroke-width="2"/>')

    # ── buildings ──
    hus = []
    klinikkhus = None
    kx, ky = xy(LAT0, LON0)
    for w in veier.values():
        if "building" not in w["tags"] or w["nd"][0] != w["nd"][-1]:
            continue
        p = punkter(w["nd"])
        if len(p) < 4 or not innenfor(p, 10):
            continue
        # sheds and garages only make the map busy (the area is in square map units)
        areal = abs(sum(p[i - 1][0] * p[i][1] - p[i][0] * p[i - 1][1] for i in range(len(p)))) / 2
        if areal < 22 and not inni(kx, ky, p):
            continue
        if klinikkhus is None and inni(kx, ky, p):
            klinikkhus = p
            continue
        hus.append(sti(dp(p, 0.9), True))
    A(f'<path fill="#E6DFCF" stroke="#CFC3A8" stroke-width="0.7" stroke-linejoin="round" d="{"".join(hus)}"/>')

    # ── railway ──
    jern = [sti(dp(punkter(w["nd"]), 0.6)) for w in veier.values() if w["tags"].get("railway") == "rail" and innenfor(punkter(w["nd"]))]
    A(f'<path d="{"".join(jern)}" fill="none" stroke="#9B958A" stroke-width="5" stroke-dasharray="1.2 5"/>')
    A(f'<path d="{"".join(jern)}" fill="none" stroke="#6E695F" stroke-width="1.6"/>')

    # ── streets: a casing under a paper-white road, wider for the bigger ones ──
    BREDDE = {"trunk": 11, "trunk_link": 7, "primary": 10, "primary_link": 7, "secondary": 8.5, "tertiary": 7.5,
              "residential": 6, "unclassified": 6, "living_street": 5.5, "pedestrian": 5.5}
    lag = {}
    for w in veier.values():
        t = w["tags"]
        b = BREDDE.get(t.get("highway"))
        if not b or t.get("area") == "yes" or t.get("tunnel") in ("yes", "building_passage"):
            continue
        p = punkter(w["nd"])
        if not innenfor(p):
            continue
        bro = t.get("bridge") == "yes" and t.get("highway") in ("trunk", "primary", "secondary")
        lag.setdefault((b, bro), []).append(sti(dp(p, 0.6)))
    for (b, bro), ds in sorted(lag.items()):
        A(f'<path d="{"".join(ds)}" fill="none" stroke="{"#7C786E" if bro else "#D3CAB6"}" stroke-width="{b + (3 if bro else 2)}" stroke-linecap="{"butt" if bro else "round"}" stroke-linejoin="round"/>')
    for (b, bro), ds in sorted(lag.items()):
        A(f'<path d="{"".join(ds)}" fill="none" stroke="#FFFDF7" stroke-width="{b}" stroke-linecap="{"butt" if bro else "round"}" stroke-linejoin="round"/>')

    A("</svg>")
    svg = "\n".join(o)
    tmp = UT + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        f.write(svg)
    os.replace(tmp, UT)
    print(f"skrev {UT}: {len(svg) // 1024} KB")

    # ── what the page needs to draw over the map ──
    fx = sum(x for x, _ in fp) / len(fp)
    fy = sum(y for _, y in fp) / len(fp)
    print("klinikkhus:", sti(dp(klinikkhus, 0.3), True) if klinikkhus else None)
    print("festning:", tall(fx), tall(fy))
    for n, (la, lo, t) in noder.items():
        if t.get("railway") == "station" or t.get("place") in ("suburb", "town"):
            x, y = xy(la, lo)
            print(t.get("name"), t.get("railway") or t.get("place"), tall(x), tall(y))
    for w in veier.values():
        if w["tags"].get("name") in ("Fjellgata", "Brugata", "Rådhusgata", "Storgata") and w["tags"].get("highway"):
            print(w["tags"]["name"], sti(dp(punkter(w["nd"]), 1)))
        if w["tags"].get("bridge") == "yes" and w["tags"].get("name"):
            p = punkter(w["nd"])
            print("bru", w["tags"]["name"], tall(p[0][0]), tall(p[0][1]), tall(p[-1][0]), tall(p[-1][1]))


if __name__ == "__main__":
    main()
