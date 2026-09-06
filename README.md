# IBCC — Inspire Base Construction Company

A bilingual (English / العربية) single-page marketing website built with plain
**HTML, CSS and JavaScript** — no frameworks, no build step. Open `index.html` in any
browser to view it, or `ar/index.html` for the Arabic version.

Modelled on the layout of the Wix "Construction Company (Professional)" template,
rebuilt from scratch with IBCC's own brand system and content.

---

## Structure

```
IBCC/
├── index.html          English page (LTR)
├── ar/index.html       Arabic page (RTL)
├── css/styles.css      all styling — shared by both languages
├── js/main.js          nav, scroll reveal, counters, project filter, form
├── assets/             logos + photography
└── README.md
```

Both pages share one stylesheet and one script. Language is driven entirely by the
`lang` and `dir` attributes on `<html>` — there is no second CSS file to keep in sync.

## Brand system

Taken from the supplied brand PDFs (Colour Palette, Font Family, Logo, Company Profile).

| Token | Value | Use |
|---|---|---|
| `--red` | `#E83742` | primary / CTA |
| `--g-500` | `#24272B` | brand near-black |
| `--g-800` / `--g-900` | `#141518` / `#0F1012` | dark sections |
| `--paper` | `#FFFFFF` | light sections |

The full 10-step red and grey scales from the palette PDF are declared as CSS variables
in `:root`, so any shade in the brand system is available.

**Typography** — Montserrat (the specified brand family) for everything, paired with
JetBrains Mono for section indices, eyebrow labels and data. Both load from Google Fonts.
The Arabic page swaps in **Cairo** — a geometric Arabic face that sits closely with
Montserrat — by re-pointing the `--sans` and `--mono` variables under `html[lang="ar"]`.

## Arabic version

`ar/index.html` is a full translation, not a machine pass: every heading, body
paragraph, service, project, client and form label is written in Arabic, and the layout
runs right-to-left.

How the bilingual layer works:

- **One stylesheet.** Directional CSS uses logical properties (`inset-inline-end`,
  `border-inline-start`, `padding-inline`) so the layout mirrors on its own. Only the
  things logical properties can't reach — transforms, gradient angles, mask positions,
  marquee direction — are handled in a small `[dir="rtl"]` block near the bottom of
  `styles.css`.
- **Arabic typography.** Arabic is a connected script, so `letter-spacing` pulls the
  letters of a word apart. `html[lang="ar"] *{letter-spacing:0 !important}` switches
  tracking off for the whole page — deliberately blunt, because an enumerated reset
  silently loses to any later or more specific rule, and this needs to stay correct as
  the stylesheet grows. Line-height is opened up for the taller Arabic ascenders.
  Latin-only islands — the oversized `IBCC` wordmark, the partner marquee, section
  numbers, the stat figures — opt back in and keep the brand face.
- **Font fallbacks.** The Arabic stack lists Noto Kufi / Noto Naskh / Geeza Pro after
  Cairo, so if the webfont is slow or blocked on mobile data the text still shapes in a
  real Arabic face rather than dropping to a Latin family.
- **Language switch.** In the header on desktop, inside the drawer on mobile. Pages
  cross-link with `hreflang` for search engines.

To edit copy, edit the two HTML files directly — content is not pulled from a shared
data file, which keeps each language readable and independently editable.

**Logo** — extracted from `IBCC Logo.pdf` as vector-quality PNGs with transparent
backgrounds:

- `logo-dark.png` — white wordmark, for dark backgrounds
- `logo-light.png` — near-black wordmark, for light backgrounds
- `logo-mark.png` — the red mark alone (also used as the favicon)

## Page sections

1. **Hero** — "Where Vision Meets Precision" with animated stat bar
2. **Ticker** — the brand motto
3. **01 About** — company description, 15+ years badge, motto
4. **02 Mission, Vision & Values** — plus the five brand values
5. **Statement band** — "Stand Firm Against the Challenge"
6. **03 Services** — Construction · Engineering & Design · Project Management · Fit-Out & Renovation
7. **04 Why IBCC** — the six differentiators
8. **05 Our Approach** — the three-step delivery process
9. **06 Projects** — filterable grid (Governmental / Healthcare / Private Sector)
10. **07 Valued Clients** — grouped by sector
11. **08 Success Partners** — scrolling marquee
12. **09 Contact** — enquiry form and company details
13. **Footer** — navigation, oversized wordmark, legal bar

All copy, project names and client names come from the IBCC company profile.

## Things you will want to change

**Contact details.** The profile only lists the website (`www.ibcc-sa.com`), so no phone
number, email or street address is on the page yet. Add them in the `contact__info`
list — in **both** `index.html` and `ar/index.html` — and in each footer.

**The enquiry form** validates in the browser and shows a confirmation, but does not
send anything. Point it at a mail service — for example Formspree:

```html
<form class="form" id="form" action="https://formspree.io/f/YOUR_ID" method="POST">
```

…and remove the `e.preventDefault()` block in `js/main.js`.

**Photography.** Images in `assets/` are cropped from the company profile PDF. Replace
them with high-resolution originals when available — keep the same filenames and
nothing else needs to change.

**Careers.** The reference template had a Careers page; there was no careers content in
the profile, so that section was left out. Say the word and it can be added.

## Notes

- Responsive down to small phones. Under 860px the navigation becomes a **side drawer**
  that slides in from the right, over a dimmed scrim — it closes on the ✕, on the scrim,
  on Escape, on any link, and automatically if the window is widened back to desktop.
  On the Arabic page it mirrors to the left, which is the RTL equivalent of the same
  edge; if you would rather pin it to the right in both languages, that is a one-line
  change to `--drawer-out` and `inset-inline-end`.
- The drawer also carries the "Start a Project" button and the language switch, both of
  which are hidden from the compact header.
- Respects `prefers-reduced-motion`.
- No dependencies or build tooling — edit the files and refresh.
- `styles.css` and `main.js` are linked with a `?v=N` query. **Bump that number in both
  HTML files whenever you change the CSS or JS**, otherwise phones and GitHub Pages will
  keep serving the cached copy and your change won't appear on already-visited devices.
