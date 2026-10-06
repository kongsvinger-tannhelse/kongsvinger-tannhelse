# Kongsvinger Tannhelse — brief from the current site

Crawled 2026-10-06 from https://kongsvingertannhelse.no with Crawl4AI 0.9.4
(`tools/crawl_site.py`). Full text: `SITE-CONTENT.md`. Per page: `pages/`, raw HTML: `html/`,
images: `assets/`, structured data: `site-data.json`.

## Business facts

| | |
|---|---|
| Name | Kongsvinger Tannhelse – Hafthun & Zia |
| Address | Fjellgata 4, 2212 Kongsvinger |
| Phone | +47 62 81 50 09 |
| E-mail | post@kongsvingertannhelse.no |
| Hours | Mon–Fri 08:30–15:30, Sat–Sun closed |
| Map | Google Maps embed of Fjellgata 4 (lat 60.1915, lng 11.9955) |
| Meta description | "Kongsvinger Tannhelse - Hafthun & Zia. Tannlege i Kongsvinger. Vi tilbyr alt fra tannsjekk og tannrens til estetisk tannbehandling." |

## Staff (omoss.html: photo and name only, no bios or titles beyond role)

- **Per Hafthun**, dentist (tannlege): `assets/hafthun.JPG`
- **Umer Zia**, dentist (tannlege): `assets/zia.JPG`
- **Eba Wasty**, dental hygienist (tannpleier): `assets/eba.JPG`

## Pages (4 in total; no sitemap or robots.txt; 12 common unlinked page names all return 404)

| Page | Content |
|---|---|
| `index.html` | Welcome text + hours, 3 featured services (Tannfylling, Tannbleking, Tannrens) with "Les mer" modals, "Om oss – Velg oss fordi" blurb, 9-image gallery carousel, contact block |
| `tjenester.html` | 3 categories with full descriptions (below) |
| `omoss.html` | The three staff above |
| `kontakt.html` | Address, hours, form, map |

Every page ends with the same contact block (address, hours, form, map) and "© 2025".

## Services (tjenester.html)

- **Ordinære behandlinger:** Tannsjekk, Tannfylling, Tannbleking, Tannrens, Tannkjøttbehandling,
  Tannstein, Rotfylling, Munntørrhet, Tanngnissing, Ising i tenner, Trekking av tenner,
  Dårlig ånde, Visdomstenner
- **Akutt tannbehandling:** Tannsmerte, Tannskade, Tannverk, Ising i tenner, Mistet tannfylling,
  Hevelse rundt tann eller i ansiktet, Løsnet tannkrone
- **Estetisk tannbehandling:** Tannfylling, Tannkrone, Tannbro, Tannbleking, Skallfasetter,
  Tannimplantat, Tannprotese, Delprotese, Helprotese

No prices, no online booking, no patient reviews, no FAQ anywhere on the site.

## Contact form

`<form id="kontaktSkjema" action="send_mail.php" method="POST">` with fields
`Navn`, `Emne`, `Epost`, `Melding` (all required) + Google reCAPTCHA v2.
The PHP handler runs on the server and is not visible to a crawl. The new site needs its own handler.
"Bestill time" just jumps to this form (`#kontakt`); there is no booking system.

## Design of the current site

- Background `#FFF2E4` (warm cream), alt `#FFF7EF`, accent blue `#7197EF` (hover `#5575c9`)
- Fonts: Segoe UI / system sans for body, 'Bodoni 72 Oldstyle' serif for headings
- Logo `assets/logo.png`, favicon `assets/icon.png` (415 KB, worth optimizing)
- Hand-written static HTML/CSS, sticky header, burger menu on mobile

## Images (assets/)

`logo.png`, `icon.png`, `bilde1–9.jpg` (clinic gallery, ~150–260 KB each),
`hafthun.JPG`, `zia.JPG`, `eba.JPG`. All 9 gallery images have the same alt text "Tannklinikk".

## Tracking and integrations on the current site

- Google Tag Manager `GTM-NJD2BK4X`, GA4 `G-3FT79L9MKP`
- Meta (Facebook) Pixel `891292573384657`
- GTM `form_submit` event on `kontaktSkjema`
- reCAPTCHA v2 site key `6Lds7scrAAAAAPjuQH4gAK0q2gkAZf3nqXVWJm-X` (public key)
- No cookie consent banner was seen, even though the site loads GA and the Meta Pixel

## Content issues worth fixing in the rebuild

- Typos: "Tannproteste" (→ Tannprotese), "Mistet tannfyling" (→ tannfylling), "tannlage",
  "materielle", "behandingen", "10dager", "tennene.Tannlegen" (missing space), "som som"
- "Ising i tenner" appears under both Ordinære and Akutt; Tannfylling/Tannbleking appear twice too
- Staff have no bios, titles or HPR numbers; "Om oss" has almost no copy
- No social media links found on any page
