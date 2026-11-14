---
name: create-feature
description: Build a new feature end to end (data pipeline, API, or web UI) for the Kurupira MODIS/VIIRS hotspot project. Use when the team asks to add, create, or implement something that does not exist yet, e.g. "create the burning calendar", "add CSV export", "cria a tela do mapa".
---

# Create Feature

All output (code, names, comments, UI text, docs, commits) is in **English**, even when the request is in Portuguese.

## 1. Understand

1. Restate the feature in one or two English sentences and who it serves (emergency responder, scientist, land manager, firefighter).
2. Read `docs/DEFINITIONS.md` and `docs/CHALLENGE.md`. If the feature conflicts with an accepted definition, stop and propose `/change-definition` first.
3. Search the repo for anything similar to reuse (components, hooks, utils, data loaders) before writing new code.
4. Ask only about what blocks you (e.g. a missing data source or an undecided stack). Otherwise choose the sensible default and state it.

## 2. Plan

Write a short plan (5–10 bullets): files to create/touch, data in and out, edge cases (empty area, date range with no hotspots, MODIS-only years before 2012, VIIRS-only gaps, timezone/UTC dates, antimeridian bounding boxes).

## 3. Build

- Follow the domain folder layout: `<domain>/` with `__test__/`, `hooks/`, `utils/` when there is something to put there. Shared helpers go to the project-level `utils/`.
- Keep screens lean: state, hook calls, and JSX only. Move helpers, constants, and sub-components out.
- Booleans start with `is` / `has` / `can` / `should`.
- Never mix raw MODIS and VIIRS counts; go through the harmonization layer.
- Charts and maps: accessible color ramps, labels and units on every axis, a legend, and a text alternative.

## 4. Verify

- Add tests in the domain's `__test__/` for the logic (aggregation, harmonization, filters, CSV shape).
- Run typecheck, lint, and tests. Run the app and check the feature works if it has a UI.
- Report honestly what passed, what failed, and what was skipped.

## 5. Wrap up

- Update `README.md` or docs only if setup or usage changed.
- If a new decision was made along the way, record it with `/change-definition`.
- Suggest a commit message in English (Conventional Commits: `feat: ...`). Do not commit unless asked.
