---
name: fix-bug
description: Reproduce, diagnose, and fix a bug in the Kurupira project (wrong hotspot counts, broken map, calendar glitches, CSV issues, crashes), adding a test that guards against it. Use when the team reports something broken or wrong, e.g. "the count is doubled", "o mapa não carrega", "CSV is empty".
---

# Fix Bug

All output (code, comments, docs, commits) is in **English**, even when the request is in Portuguese.

## 1. Reproduce

1. Write down the symptom: input (area, date range, sensor), expected result, actual result.
2. Reproduce it: a failing test, a script, or the running app. If you cannot reproduce it, say so and ask for exact steps.

## 2. Find the root cause

- Read the code path end to end; do not guess. Fix the cause, not the symptom.
- Usual suspects in this project:
  - double counting where MODIS and VIIRS overlap (2012+) or between VIIRS satellites
  - UTC vs. local dates shifting hotspots into the wrong day or month
  - inclusive/exclusive date range bounds
  - lat/lon swapped, or bounding boxes crossing the antimeridian
  - confidence filters applied to one sensor but not the other (MODIS uses 0–100, VIIRS uses low/nominal/high)
  - "no data" shown as zero

## 3. Fix

- Write a test that fails before the fix and passes after, in the domain's `__test__/`.
- Make the minimal fix. Do not refactor unrelated code.

## 4. Verify

- Run the new test, the full test suite, and typecheck. Re-check the original repro.
- Report the cause, the fix, and the test, plus anything still unverified. Suggest an English commit message (`fix: ...`). Do not commit unless asked.
