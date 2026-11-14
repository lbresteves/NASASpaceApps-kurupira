---
name: improve-design
description: Improve the visual design, UX, accessibility, or data visualizations of the Kurupira web app (burning calendar heatmap, map, charts, layout, color ramps). Use when the team asks to make something look better, be clearer, more accessible, or more usable, e.g. "melhora o design do calendário", "the map is confusing".
---

# Improve Design

All output (code, UI text, docs, commits) is in **English**, even when the request is in Portuguese.

## 1. Look before you touch

1. Run the app (or read the component) and describe the current state: what is unclear, ugly, inaccessible, or slow to read.
2. Keep the audience in mind: emergency managers under time pressure. They need to answer in seconds: *Which months burn most? Which years were worst? Is this month above the historical median?*

## 2. Principles

- **Color**: colorblind-safe ramps. Sequential (e.g. light yellow → dark red) for hotspot counts; diverging (blue ↔ red, neutral center) for anomalies vs. the historical median/mean. Never rely on color alone: add numbers, labels, or patterns.
- **Contrast**: text at least WCAG AA (4.5:1). Check light and dark themes if both exist.
- **Calendar heatmap**: years as rows, months as columns (or vice versa, consistently); show the value on hover/focus; a legend with the scale and units; clearly mark missing/no-data cells differently from zero.
- **Charts**: labeled axes with units, readable tick labels, no 3D, no chartjunk.
- **Map**: clear area-of-interest drawing, visible selected bounds, lat/lon input as an alternative.
- **Layout**: works on mobile width; clear hierarchy (title → key numbers → calendar → details → download).
- **Keyboard and screen readers**: focus states, `aria-label`s, alt text or a table alternative for charts.
- Reuse existing components and design tokens; if the same JSX repeats across screens, extract a shared component and use it everywhere.

## 3. Propose, then apply

- List the proposed improvements, most impactful first. For big visual changes, describe or sketch them before applying.
- Apply the changes; keep logic untouched unless needed.

## 4. Verify

- Run the app and check the result at desktop and mobile widths. Run tests and typecheck.
- Summarize before/after. Record lasting design decisions (palette, scale breaks) with `/change-definition`.
