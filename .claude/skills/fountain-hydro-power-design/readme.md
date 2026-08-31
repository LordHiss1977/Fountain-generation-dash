# Fountain Hydro Power Corp. — Design System

## 1. Company & product context

**Fountain Hydro Power Corp. (FHPC)** is a Panamanian hydroelectric power company. Its
public positioning is captured entirely in the locked-up brand tagline:

> "Energía limpia para el progreso de Panamá"
> *(Clean energy for the progress of Panama)*

The tagline is part of the primary logo lockup — it is not free copy and should not be
translated, re-typeset, or paraphrased when the lockup is used.

Evidence in the supplied materials points to one operating asset and one internal
reporting practice:

- **Bajo Frío** — the hydroelectric plant referenced by this project's existing
  maintenance-dashboard workflow (weekly EM / electromechanical maintenance reports).
- **Corporate / investor updates** — the deck `FHPC Update June 15, 2022 Diseño.pptx`
  is a periodic status update, which together with the two PowerPoint templates is the
  brand's main published surface.

**Surfaces this system covers**

| Surface | Status | Where |
|---|---|---|
| Presentation decks (light + dark) | Primary, well documented | `slides/` |
| Operations / maintenance dashboard (Bajo Frío EM) | Recreated from this project's reporting workflow | `ui_kits/em-dashboard/` |
| Corporate web surface | **No source provided** — not recreated | — |

There is **no product UI, website, or codebase** in the supplied sources. FHPC's design
language is, as delivered, a *presentation and document* identity: a logo package, a
colour palette slide, and two PowerPoint templates. Everything in `components/` is
derived from those artefacts, not from an existing web product — treat it as a faithful
translation of the deck language into UI, not as a recreation of a shipped app.

## 2. Sources used

All paths below are as they were attached; the reader may not have access to them.

**Attached codebase: `Logos/`**
- `Logos/Editables/Logo editable/Logo editable.ai` — master Illustrator artwork,
  1920×1080 px artboard, CMYK, Coated FOGRA39.
- `Logos/Editables/Logo editable/Logo editable Informe.txt` — package report. Names the
  two logo fonts: **Garamond Premier Pro Bold (OTF)** and
  **Bahnschrift SemiBold Width-93.000 (OTF)**.
- `Logos/Editables/Logo editable/Fonts/GaramondPremrPro-Bd.otf` → copied to `assets/fonts/`
- `Logos/Editables/Logo editable/Fonts/bahnschrift.ttf` → copied to `assets/fonts/`

**Attached codebase: `Presentation Templates/`**
- `Fountain Dark Template.potx` — read in full. Theme "Blue" / font scheme "Corbel";
  9 layouts; master places title at 838200×365125 EMU, body at 838200×1825625 EMU,
  date/footer/slide-number band at y=6356350 EMU, and a footer logo picture at
  x=8846049, 1874407×365125 EMU. Copied to `sources/`.
- `FHPC Template.pptx` — **NOT READ.** Exceeds the 30 MiB import limit.
- `FHPC Update June 15, 2022 Diseño.pptx` — **NOT READ.** Same limit.
- `Template Background.png` — light template background → `assets/images/template-background.png`

**Uploaded files** (`uploads/`)
- `Fountain Color Pallete.pptx` — read in full. One slide, six labelled swatches
  (Accent 1/2/3, Background 1/2, Text) resolved against its embedded theme.
- `Fondos claros.png`, `Fondos oscuros.png`, `Negativo.png` — primary lockup, three backgrounds.
- `Secundario fondos claros.png`, `Secundario fondos oscuros.png`, `Secundario negativo.png` —
  secondary ("FOUNTAIN") lockup, three backgrounds.
- `Gota.png`, `gota2.png` — the isolated drop mark.

**Known gap:** the two large decks could not be opened, so no body copy, chart styling,
photography, or slide-level layout beyond the master geometry could be read from them.
Colour, type and layout below are sourced from the palette deck, the `.potx` master, and
the logo artwork only.

---

## 3. Content fundamentals

The evidence base for voice is thin (one tagline, template placeholder text, file
naming). What can be stated with confidence:

**Language.** Spanish first. The tagline, the working file names ("Fondos claros",
"Fondos oscuros", "Secundario negativo", "Diseño", "Gota") and the maintenance reporting
are all Spanish. The legal name and the wordmark are English —
"FOUNTAIN HYDRO POWER CORP." — so the brand is bilingual by construction: **English
name, Spanish voice.** Write Spanish for any Panamanian-facing surface; keep the
corporate name, unit names, and technical abbreviations (EM, MW, GWh, kV) unchanged.

**Casing.** The wordmark is **all caps**. The tagline is sentence case inside typographic
quotes. Follow that split: institutional labels (nav, section markers, slide eyebrows,
table headers, footers) set in all caps with wide tracking; everything a person reads as
a sentence stays sentence case. Never title-case a Spanish heading — Spanish
orthography uses sentence case, and the source respects it.

**Quotation marks.** The tagline ships wrapped in curly double quotes `" … "`. Use
typographic quotes, never straight ones, and never the guillemets `« »` that some
Spanish style guides prefer — the brand has already chosen.

**Person.** Institutional third person and first-person plural. The tagline speaks about
Panama, not to the reader ("para el progreso de Panamá", not "para tu progreso"). Use
*nosotros* for company action ("Operamos", "Generamos") and avoid *tú* entirely; use
*usted* if a direct address is unavoidable.

**Register.** Utility-sector formal: factual, quantitative, unhurried. Operational
reporting is the dominant genre, so numbers carry the message — "Disponibilidad 98,4 %",
"Generación acumulada 142 GWh". Use the Panamanian/Spanish decimal comma in Spanish copy.
No superlatives, no marketing verbs ("revolucionamos", "impulsamos el futuro"), no
rhetorical questions.

**Vibe.** Civic and durable rather than startup-modern. The company frames itself as
infrastructure serving a country. Clean energy is stated as a fact and a public good, not
as a lifestyle claim.

**Emoji.** None. Not in the templates, not in the logo package, not in reporting. Do not
introduce them.

**Examples**

| Do | Don't |
|---|---|
| "Energía limpia para el progreso de Panamá" | "Energía limpia para tu futuro ⚡" |
| "MANTENIMIENTO ELECTROMECÁNICO" (section eyebrow, all caps, tracked) | "Mantenimiento Electromecánico" (title case) |
| "Disponibilidad de planta: 98,4 % en la semana 24" | "¡Una semana increíble para Bajo Frío!" |
| "Fountain Hydro Power Corp." (full legal name on first use) | "Fountain" alone in formal contexts |
| "Operamos la central Bajo Frío desde 2016." | "Estamos revolucionando la energía en Panamá." |

Abbreviate to **FHPC** only after the full name has appeared, and only in internal or
operational documents.

---

## 4. Visual foundations

### 4.1 The mark

The identity is one idea: **a water drop rendered as a polished sphere**, with a tail
that curls into the body to form a negative-space spiral — a drop and a vortex at once.
It is the only illustration the brand owns, and it is a raster/gradient object, not a
flat icon. Do not flatten it, re-draw it, outline it, or place it inside a container.

Two lockups, three background treatments each — all six are in `assets/logos/`:

- **Primary** — drop + `FOUNTAIN HYDRO POWER CORP.` + tagline. Aspect ≈ 7.8 : 1.
- **Secondary** — drop + `FOUNTAIN` only. Aspect ≈ 5.2 : 1. Use where the primary would
  fall below ~240 px wide, and in footers/favicons.
- **Negative** — everything white including the drop; for photography and saturated teal.

Clear space: one drop-width on all sides. Minimum widths: primary 240 px, secondary
140 px, mark alone 24 px.

### 4.2 Colour

Two palettes coexist and should not be blended arbitrarily.

**Brand teal** — sampled from the artwork. The tagline is exactly `#008BB2`; the drop is
a gradient running `#036478 → #008BB2 → #39A5C3` with a specular white highlight at
roughly 62 % / 78 %. `--color-teal-600 #008BB2` is *the* brand colour.

**Presentation accents** — from `Fountain Color Pallete.pptx`, verbatim:
Accent 1 `#30ACEC`, Accent 2 `#80C34F`, Accent 3 `#E29D3E`,
Background 1 `#FFFFFF`, Background 2 `#C6C6C6`, Text `#282828`.

Note the deliberate distinction: the palette deck's Accent 1 (`#30ACEC`, a bright sky
blue) is **not** the logo teal. Accents are for data — series colours, status, chart
fills. Teal is for identity — rules, headings, buttons, the mark. Mixing them as
interchangeable blues is the single easiest way to make a deck look off-brand.

Text is `#282828`, never pure black; page is pure white. Dark surfaces use `#212121`.
Green reads as good/available, amber as caution/planned, sky as neutral information, and
`#D64A3B` (extended from the deck's theme, not on the palette slide) as fault/outage.

### 4.3 Typography

| Role | Face | Notes |
|---|---|---|
| Wordmark, display | **Garamond Premier Pro Bold** | Only for the wordmark and rare oversized display lines. All caps, tight tracking. |
| Brand sans, labels, numbers | **Bahnschrift SemiBold, width 93 %** | The tagline face. Condensed DIN-descended geometry — engineered, legible small. Use for eyebrows, table headers, KPI figures, buttons. |
| Body, deck text | **Corbel** (templates) → **Source Sans 3** substituted | See substitutions below. |

The pairing is a serif name over a condensed technical sans — old institution, modern
plant. Keep it: do not set body copy in Garamond, and do not set headlines in Bahnschrift
at body weights.

Deck sizes from the `.potx` master: title 44 pt, level 1 body 28 pt, then 24 / 20 / 18 pt,
footer band 12 pt. UI scale is in `tokens/typography.css`.

### 4.4 Backgrounds

Three, in order of use.

1. **Plain white.** The default, and what the palette slide calls Background 1.
2. **Light geometric texture** — `assets/images/template-background.png`, 1500×854.
   Overlapping diagonal chevrons in near-whites (`#FFFFFF`–`#F0F0F0`), contrast so low it
   reads as paper texture, at ~45°. Full-bleed only, never cropped into a card.
3. **Dark `#212121`** for section breaks and the dark template.

No photography is present in the supplied sources — nothing can be said about image
treatment, and none should be invented. Where a photo is required, leave a labelled slot.
No repeating patterns beyond the chevron background, and **no multi-hue gradients**; the
only sanctioned gradients are the drop's own sphere shading and a single-hue teal band.

### 4.5 Layout

Slide geometry is fixed by the master, converted here to a 1280×720 stage:
88 px side margins, title baseline block starting at 38 px, body at 192 px, and a
persistent footer band at y ≈ 668 px carrying date (left), footer text (centre), slide
number and the secondary logo (right). The footer logo sits flush to the right margin at
1874407×365125 EMU — about 197×38 px.

For documents and UI: 1200 px max container, 24 px gutter (48 px at large), 8 px spacing
base with a 4 px half-step. Keep the layout orthogonal — content sits in rectangles on a
grid; the only diagonal in the system is the background texture.

### 4.6 Surfaces, borders, radii

Square-leaning. The source artwork has no rounded corners anywhere, so radii are
functional, not expressive: 2 px on inputs and small chips, 4 px on cards and buttons,
8 px only on modals. Never pill-shaped buttons; `--radius-pill` exists for status chips
and progress tracks only.

**Cards** are white on `#F5F6F7`, 1 px `#E6E7E8` border, 4 px radius, `--shadow-sm`.
Elevation is carried by the border first and the shadow second — a card with no border
and a big shadow is off-system. Shadows are neutral grey (`rgba(40,40,40,…)`), never
tinted teal, and never larger than `--shadow-lg`.

A **3 px teal rule** under or beside a section heading is the system's signature
separator; a 1 px `#E6E7E8` hairline is the neutral one.

### 4.7 Motion, interaction, transparency

- **Motion:** fades and short translations only. 120 ms for hover/press feedback, 200 ms
  for state changes, 320 ms for panels. `cubic-bezier(.4,0,.2,1)` standard. No bounce,
  no spring, no parallax, no looping ambient animation. The drop mark never animates.
- **Hover:** darken teal one step (`#008BB2` → `#017998`); neutral surfaces move to
  `#F5F6F7`; ghost elements gain a 1 px border rather than a fill. Never use opacity
  alone for hover.
- **Press:** darken a second step (`#036478`) with no scale change. The system does not
  shrink or lift on press.
- **Focus:** 3 px `rgba(0,139,178,.35)` ring (`--shadow-focus`), always visible, never
  removed.
- **Disabled:** 45 % opacity plus `cursor:not-allowed`; no greyscale filter.
- **Transparency and blur:** rare. Blur (`--blur-panel`, 12 px) is only for a fixed panel
  overlaying scrolling content. Scrims are `rgba(33,33,33,.62)` flat. A bottom-up
  protection gradient (`--overlay-protection`) is the correct treatment for text over an
  image — use the gradient, not a capsule behind the text.

---

## 5. Iconography

**The supplied sources contain no icon set.** The logo package is the drop mark only; the
`.potx` master carries no icon glyphs; no icon font, sprite sheet, or SVG library appears
anywhere in `Logos/` or `Presentation Templates/`. Nothing was copied because there was
nothing to copy.

**Substitution (flagged):** this system links **Lucide** from CDN
(`https://unpkg.com/lucide@latest`). It was chosen for fit, not by inheritance —
1.5–2 px uniform stroke, square-ish 24×24 grid, rounded caps, no fill. That matches
Bahnschrift's engineered geometry and the system's square corners better than a filled
or duotone set would. **This is an invention and needs sign-off.** If FHPC has an icon
library, replace the CDN link in `components/core/Icon.jsx` and delete this note.

Rules while the substitution stands:

- Stroke-only, `currentColor`, 1.5 px stroke, 20 px default box (16 px inline with text,
  24 px in toolbars). Never mix filled and stroked icons in one view.
- Icons inherit text colour. A teal icon means it is interactive or brand-marked; a grey
  icon is decorative or informational; a green/amber/red icon carries status and must be
  paired with a text label, never used as the sole signal.
- **No emoji, ever** — not in UI, not in decks, not in reports.
- **No Unicode characters as icons** (no ▲ ● ✓ ✕ as glyph substitutes). Two exceptions
  are typographic, not iconographic: the curly quotes in the tagline lockup, and the
  degree/percent signs in measurements.
- The drop mark is **not** an icon. Do not use it as a bullet, a list marker, a loading
  spinner, or a favicon-sized glyph below 24 px. Bullets are 4 px teal squares.

---

## 6. Substitutions & flags — please review

1. **Corbel → Source Sans 3.** Corbel is the `.potx` theme font and is a Microsoft system
   font that cannot be redistributed. Source Sans 3 (Google Fonts) is the nearest free
   humanist sans. Decks rendered on Windows/Office will still use real Corbel; web output
   will not match exactly. Send licensed Corbel web files to remove this.
2. **Garamond Premier Pro & Bahnschrift are shipped as-is** from the logo package
   (`.otf`/`.ttf`). Both are commercially licensed — confirm FHPC's licence covers web
   embedding before publishing anything that loads `assets/fonts/`.
3. **Lucide icons** — substituted, no source set existed. See §5.
4. **`#D64A3B` (danger/fault)** — taken from the palette deck's underlying theme, not
   from its labelled swatches. Confirm or replace.
5. **Background 2 `#C6C6C6`** — the palette slide defines it as a 75 %-lighter tint of
   `#212121` rather than a literal hex. `#C6C6C6` is the computed value; confirm against
   the real slide.
6. **Two decks unread** — `FHPC Template.pptx` and `FHPC Update June 15, 2022 Diseño.pptx`
   both exceed the import size limit. Slide samples here are built from the `.potx`
   master geometry and the palette, not from those files.

### Intentional additions

- `Icon` — a thin wrapper over the substituted Lucide set, so the whole glyph system can
  be swapped in one file when a real set arrives.
- `KpiStat`, `StatusPill` — the operational-reporting genre (weekly EM reports, plant
  availability) needs a numeric display primitive and a status marker; neither exists in
  the logo/template sources but both are unavoidable for the dashboard kit. Flagged as
  additions rather than recreations.

---

## 7. Index

```
styles.css               single entry point — @import list only
tokens/                  fonts.css · colors.css · typography.css · spacing.css · effects.css
assets/logos/            6 lockups + 2 drop marks (PNG)
assets/fonts/            GaramondPremrPro-Bd.otf · bahnschrift.ttf
assets/images/           template-background.png (light chevron texture)
sources/                 Fountain Dark Template.potx (as attached)
guidelines/              foundation specimen cards (Design System tab)
components/core/         Button · IconButton · Icon · Card · SectionHeading ·
                         Badge · StatusPill · KpiStat · Logo
components/forms/        Field · Input · Select · Checkbox · Radio · Switch
components/data/         Table · Tabs · ProgressBar
templates/               em-dashboard (Operations dashboard) · deck (Presentation deck)
slides/                  TitleSlide · SectionSlide · ContentSlide · KpiSlide ·
                         ComparisonSlide · QuoteSlide · ClosingSlide
ui_kits/em-dashboard/    Bajo Frío EM weekly-maintenance dashboard recreation
readme.md                this file
SKILL.md                 Agent Skills entry point
```

## 8. Components

Sixteen primitives, grouped by concern. Every one is a `.jsx` + `.d.ts` + `.prompt.md`
triple; import them from `window.<Namespace>` after loading `_ds_bundle.js`.

**`components/core/`** — Button · IconButton · Icon · Card · SectionHeading · Badge ·
StatusPill · KpiStat · Logo

**`components/forms/`** — Field · Input · Select · Checkbox · Radio · Switch

**`components/data/`** — Table · Tabs · ProgressBar

No source defined a component inventory (the sources are a logo package, a palette slide
and two PowerPoint templates), so this is the standard set sized to the brand's needs,
plus the three additions flagged in §6.

## 9. Templates

Two starting folders consuming projects can seed from:

- **`templates/em-dashboard/`** — "Operations dashboard". KPI header, daily-availability
  chart, notes panel and the work-order table. Composes `Badge`, `Button`, `Table`
  and `StatusPill`.
- **`templates/deck/`** — "Presentation deck". Six 1920×1080 slides (title, section,
  content, KPI, table, closing) on `deck-stage`, so it exports to PDF and PPTX directly.

Each folder has a `ds-base.js` with one `base` line to point at the bound design system.
