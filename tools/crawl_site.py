"""Crawl kongsvingertannhelse.no with Crawl4AI and save everything for the rebuild.

Output (under crawl/):
  pages/<slug>.md      clean markdown per page
  html/<slug>.html     raw HTML as served
  assets/              every image/icon/file referenced by the site
  site-data.json       per-page metadata, links, media, headings
  SITE-CONTENT.md      all page markdown in one file

Run:  .venv-crawl/Scripts/python.exe tools/crawl_site.py
"""
import asyncio
import json
import re
import sys
import urllib.request
from pathlib import Path
from urllib.parse import urljoin, urlparse, unquote

from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
from crawl4ai.deep_crawling import BFSDeepCrawlStrategy
from crawl4ai.deep_crawling.filters import FilterChain, DomainFilter

START_URL = "https://kongsvingertannhelse.no/"
DOMAIN = "kongsvingertannhelse.no"
ROOT = Path(__file__).resolve().parent.parent / "crawl"

ASSET_EXT = re.compile(
    r"\.(png|jpe?g|gif|webp|svg|ico|avif|bmp|pdf|mp4|webm|mov|woff2?|ttf|otf|css|js)(\?|#|$)", re.I
)


def slug_for(url: str) -> str:
    path = urlparse(url).path.strip("/")
    if not path or path == "index.html":
        return "index"
    return re.sub(r"[^a-zA-Z0-9._-]+", "_", path.removesuffix(".html"))


def normalize(url: str) -> str:
    """Drop fragments and treat / and /index.html as the same page."""
    p = urlparse(url)
    path = p.path or "/"
    if path.endswith("/index.html"):
        path = path[: -len("index.html")]
    return f"{p.scheme}://{p.netloc}{path}" + (f"?{p.query}" if p.query else "")


def asset_urls_from_html(html: str, base: str) -> set[str]:
    found = set()
    for m in re.finditer(r'(?:src|href|data-src|poster|content)\s*=\s*["\']([^"\']+)["\']', html, re.I):
        found.add(m.group(1))
    for m in re.finditer(r'srcset\s*=\s*["\']([^"\']+)["\']', html, re.I):
        for part in m.group(1).split(","):
            if part.strip():
                found.add(part.strip().split()[0])
    for m in re.finditer(r'url\(\s*["\']?([^"\')]+)["\']?\s*\)', html, re.I):
        found.add(m.group(1))
    out = set()
    for u in found:
        if u.startswith(("data:", "mailto:", "tel:", "javascript:", "#")):
            continue
        absu = urljoin(base, u)
        if ASSET_EXT.search(urlparse(absu).path):
            out.add(absu)
    return out


def download(url: str, dest: Path) -> tuple[bool, str]:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (site-archive)"})
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
        dest.parent.mkdir(parents=True, exist_ok=True)
        tmp = dest.with_suffix(dest.suffix + ".part")
        tmp.write_bytes(data)
        tmp.replace(dest)
        return True, f"{len(data)} bytes"
    except Exception as e:  # noqa: BLE001 - record and keep going
        return False, str(e)


async def main() -> None:
    for sub in ("pages", "html", "assets"):
        (ROOT / sub).mkdir(parents=True, exist_ok=True)

    run_cfg = CrawlerRunConfig(
        deep_crawl_strategy=BFSDeepCrawlStrategy(
            max_depth=5,
            include_external=False,
            filter_chain=FilterChain([DomainFilter(allowed_domains=[DOMAIN])]),
            max_pages=500,
        ),
        cache_mode=CacheMode.BYPASS,
        scan_full_page=True,          # scroll so lazy images load
        wait_for_images=True,
        exclude_external_images=False,
        verbose=True,
    )
    browser_cfg = BrowserConfig(headless=True, verbose=False)

    async with AsyncWebCrawler(config=browser_cfg) as crawler:
        results = await crawler.arun(START_URL, config=run_cfg)

    pages, seen = [], set()
    all_assets: set[str] = set()
    for res in results:
        key = normalize(res.url)
        if key in seen:
            continue
        seen.add(key)
        if not res.success:
            pages.append({"url": res.url, "success": False, "error": res.error_message})
            continue

        slug = slug_for(res.url)
        md = res.markdown.raw_markdown if hasattr(res.markdown, "raw_markdown") else str(res.markdown)
        (ROOT / "pages" / f"{slug}.md").write_text(f"<!-- source: {res.url} -->\n\n{md}", encoding="utf-8")
        (ROOT / "html" / f"{slug}.html").write_text(res.html or "", encoding="utf-8")

        assets = asset_urls_from_html(res.html or "", res.url)
        for img in (res.media or {}).get("images", []):
            if img.get("src"):
                assets.add(urljoin(res.url, img["src"]))
        all_assets |= assets

        headings = re.findall(r"^(#{1,6})\s+(.+)$", md, re.M)
        pages.append({
            "url": res.url,
            "slug": slug,
            "success": True,
            "status_code": res.status_code,
            "depth": (res.metadata or {}).get("depth"),
            "metadata": res.metadata,
            "headings": [{"level": len(h), "text": t.strip()} for h, t in headings],
            "links": res.links,
            "images": (res.media or {}).get("images", []),
            "videos": (res.media or {}).get("videos", []),
            "asset_urls": sorted(assets),
            "markdown_chars": len(md),
        })

    # Download every asset; keep the site's folder structure for same-domain files.
    asset_log = []
    for url in sorted(all_assets):
        p = urlparse(url)
        rel = unquote(p.path.lstrip("/")) or "root"
        dest = ROOT / "assets" / (rel if DOMAIN in p.netloc else f"_external/{p.netloc}/{rel}")
        ok, info = download(url, dest)
        asset_log.append({"url": url, "saved_to": str(dest.relative_to(ROOT)) if ok else None, "ok": ok, "info": info})
        print(("OK  " if ok else "ERR ") + url + "  " + info)

    data = {"start_url": START_URL, "pages": pages, "assets": asset_log}
    (ROOT / "site-data.json").write_text(json.dumps(data, ensure_ascii=False, indent=2, default=str), encoding="utf-8")

    parts = ["# kongsvingertannhelse.no — full content dump\n"]
    for pg in pages:
        if pg.get("success"):
            body = (ROOT / "pages" / f"{pg['slug']}.md").read_text(encoding="utf-8")
            parts.append(f"\n\n---\n\n# PAGE: {pg['url']}\n\n{body}")
    (ROOT / "SITE-CONTENT.md").write_text("".join(parts), encoding="utf-8")

    ok_pages = sum(1 for p in pages if p.get("success"))
    ok_assets = sum(1 for a in asset_log if a["ok"])
    print(f"\nPages: {ok_pages} ok / {len(pages)} total. Assets: {ok_assets} ok / {len(asset_log)} total.")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    asyncio.run(main())
