# UI kit — Bajo Frío EM weekly dashboard

An operational dashboard for the weekly electromechanical (EM) maintenance report on the
Bajo Frío plant: KPI header, daily availability, asset states, and the work-order register.

```
index.html      click-through app shell (starting point: "Dashboards")
Shell.jsx       Sidebar + Topbar
Overview.jsx    Overview screen — KPI row, availability chart, notes, asset + order tables
Orders.jsx      Work-order register with filters and a detail panel; Placeholder
data.js         sample week-24 data (illustrative, not real plant data)
```

Interactive: sidebar navigation, order search / type filter / open-only toggle, and a
click-through order detail panel.

**Honest limits.** FHPC supplied a logo package, a colour palette slide and two PowerPoint
templates — no product UI, no Figma file, no codebase. So this kit is not a recreation of
an existing screen; it is the brand's presentation language applied to the reporting genre
the company already practises. Three nav destinations (Activos, Indicadores, Informes) are
left deliberately blank with a disclaimer rather than invented.

Everything here composes the authored primitives — `Card`, `Table`, `KpiStat`,
`StatusPill`, `ProgressBar`, `Button`, `Input`, `Select`, `Field`, `Checkbox`,
`Tabs`, `Icon`, `Logo` — from `_ds_bundle.js`. The bar chart is plain divs; no chart
library is in the system.
