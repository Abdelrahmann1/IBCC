# IBCC — Inspire Base Construction Company

A single-page marketing website built with plain **HTML, CSS and JavaScript** — no
frameworks, no build step. Open `index.html` in any browser to view it.

Modelled on the layout of the Wix "Construction Company (Professional)" template,
rebuilt from scratch with IBCC's own brand system and content.

---

## Structure

```
IBCC-Website/
├── index.html          all page markup
├── css/styles.css      all styling (design tokens at the top)
├── js/main.js          nav, scroll reveal, counters, project filter, form
├── assets/             logos + photography
└── README.md
```

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
list in `index.html` and in the footer.

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

- Responsive down to small phones; full-screen menu under 860px.
- Respects `prefers-reduced-motion`.
- No dependencies or build tooling — edit the files and refresh.
