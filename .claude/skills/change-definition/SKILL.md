---
name: change-definition
description: Record a new project decision or change an existing one in docs/DEFINITIONS.md (scope, data sources, harmonization method, stack, design, conventions), then align the code and docs with it. Use when the team decides or changes something about how the project works, e.g. "let's use Python for the pipeline", "decidimos usar a mediana", "change the harmonization method".
---

# Change Definition

`docs/DEFINITIONS.md` is the single source of truth for project decisions. Everything is written in **English**, even when the request is in Portuguese.

## 1. Clarify the decision

1. Restate the decision in one English sentence, plus the reason behind it.
2. Pick the section: Scope (`S-`), Data (`D-`), Harmonization method (`H-`), Stack (`T-`), Design (`X-`), Conventions (`C-`).
3. If the reason is missing or the decision is ambiguous, ask once, briefly.

## 2. Update the log

- **New decision**: add a row with the next ID, status (`proposed` or `accepted`), why, and today's date.
- **Change**: never delete or rewrite history. Mark the old row `superseded by <new ID>` and add a new row.
- Replace any `_TBD._` placeholder in that section with a table when the first decision lands.

## 3. Find the impact

Search the repo for everything that relies on the old definition: code, tests, README, `CLAUDE.md`, skills, data files, UI copy. List what must change.

## 4. Align

- Small, safe updates (docs, constants, config): apply them.
- Larger code changes: list them as follow-ups and offer to run `/change-feature` for each.
- If the decision affects the harmonization method, describe how historical numbers will shift and what must be recomputed.

## 5. Report

Summarize: the decision, what was updated, what remains to do. Suggest an English commit message (`docs: ...`). Do not commit unless asked.
