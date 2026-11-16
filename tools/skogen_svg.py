"""Write the Om oss forest («Skogbunnen») as two static SVG files.

The forest (src/components/omoss/Skogbunn.tsx) used to be drawn into the
page's HTML: about 410 KB of SVG, sent twice (HTML and the RSC payload), so
/om-oss weighed 1 MB. The page now loads these files with <img loading="lazy">.

To redraw after changing the forest: render <Skogen W={640} H={300} /> and
<Skogen W={1600} H={380} /> into a page (e.g. put them back in OmOssSide for a
build), then run

    python -I -X utf8 tools/skogen_svg.py .next/server/app/om-oss.html

The input may also be saved HTML from any page that holds both drawings, in
that order, inside the element marked data-forest="ready".
"""

import re
import sys
from pathlib import Path

UT = Path(__file__).resolve().parent.parent / "public" / "images" / "tegninger" / "skogen"
NAVN = ["skogen-640.svg", "skogen-1600.svg"]
GLOBALS = Path(__file__).resolve().parent.parent / "src" / "app" / "globals.css"


def farger() -> dict[str, str]:
    """The site's colour tokens, so the files need no page CSS."""
    css = GLOBALS.read_text(encoding="utf8")
    return {m.group(1): m.group(2).strip() for m in re.finditer(r"(--color-[a-z0-9-]+):\s*([^;]+);", css)}


def main(kilde: str) -> None:
    html = Path(kilde).read_text(encoding="utf8")
    start = html.find('data-forest="ready"')
    assert start >= 0, "no data-forest element in the input"
    svgs = []
    pos = start
    for _ in NAVN:
        a = html.find("<svg", pos)
        b = html.find("</svg>", a) + len("</svg>")
        assert a >= 0 and b > a
        svgs.append(html[a:b])
        pos = b
    tokens = farger()
    UT.mkdir(parents=True, exist_ok=True)
    for navn, svg in zip(NAVN, svgs):
        assert 'preserveAspectRatio="xMidYMax slice"' in svg, f"{navn}: not the forest"
        svg = re.sub(r"var\((--color-[a-z0-9-]+)\)", lambda m: tokens[m.group(1)], svg)
        assert "var(" not in svg, f"{navn}: a CSS variable left"
        # a file of its own: the namespace, and no page classes or aria on the root
        svg = svg.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ', 1)
        svg = re.sub(r'^(<svg[^>]*?) class="[^"]*"', r"\1", svg)
        svg = re.sub(r'^(<svg[^>]*?) aria-hidden="true"', r"\1", svg)
        svg = re.sub(r' class="[^"]*"', "", svg)
        tmp = UT / (navn + ".tmp")
        tmp.write_text(svg, encoding="utf8")
        tmp.replace(UT / navn)
        print(navn, len(svg.encode("utf8")), "bytes")


if __name__ == "__main__":
    main(sys.argv[1])
