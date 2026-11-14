---
name: change-feature
description: Modify the behavior of an existing feature in the Kurupira hotspot project (filters, calendar, map, harmonization output, CSV export, API). Use when the team asks to change, adjust, extend, or remove something that already exists, e.g. "change the calendar to show weeks", "muda o filtro de data".
---

# Change Feature

All output (code, names, comments, UI text, docs, commits) is in **English**, even when the request is in Portuguese.

## 1. Locate and understand

1. Find the feature's code, its tests, and every caller/consumer (search by name, route, component, and data field).
2. Describe current behavior vs. requested behavior in a short before/after list.
3. Check `docs/DEFINITIONS.md`. If the change contradicts an accepted definition, run `/change-definition` first.

## 2. Assess impact

- List what else depends on it: other screens, the API contract, CSV columns, cached/derived data, charts.
- Flag breaking changes (renamed fields, changed units, different aggregation) and say how you will handle them.
- If the change touches harmonization or aggregation, note how historical numbers will shift.

## 3. Change

- Make the smallest change that delivers the new behavior; do not refactor unrelated code.
- If you touch code that doesn't follow the architecture in `CLAUDE.md`, move it to the right place and fix every import, including test mocks.
- Remove code made dead by the change. No commented-out leftovers.

## 4. Verify

- Update existing tests to the new behavior and add tests for new edge cases.
- Run typecheck, lint, and tests; run the app for UI changes.
- Report results honestly, including anything not verified.

## 5. Wrap up

- Update docs if usage changed. Suggest an English commit message (`feat:` / `refactor:` / `fix:`). Do not commit unless asked.
