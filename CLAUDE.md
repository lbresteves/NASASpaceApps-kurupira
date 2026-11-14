# Kurupira — project rules for Claude

## Language (hard requirement)

Everything written to this repo is in **English**: code, identifiers, comments, UI text,
docs, commit messages, PR descriptions. Team prompts are often in Portuguese — translate
the intent, never the language. Replies in chat may follow the language of the prompt.

## Context

- Challenge: [docs/CHALLENGE.md](docs/CHALLENGE.md)
- Decisions (scope, data, harmonization method, stack, design): [docs/DEFINITIONS.md](docs/DEFINITIONS.md).
  Read it before building anything; if a task contradicts it, stop and use `/change-definition`.
- Plan: [docs/ROADMAP.md](docs/ROADMAP.md). Work on **one step at a time**; never build ahead of the
  current step. Mark a step ✅ only when its "Done when" is true.

## Front-end architecture (`web/`)

React + Vite + TypeScript, styled with **Emotion only** (no plain `.css` files). Keep dependencies
to a minimum — ask before installing a new library.

```
web/src/
├── App.tsx                 ← ThemeProvider + Global styles + page
├── pages/                  ← one folder per page: HomePage/HomePage.tsx + HomePage.styled.tsx
├── features/               ← one folder per feature
│   └── <Feature>/
│       ├── views/          ← feature components: <FeatureX>.tsx
│       │   └── styles/     ← <FeatureX>.styled.tsx
│       ├── hooks/ types/ utils/ services/   (only when needed)
│       └── index.ts        ← public exports of the feature
└── shared/                 ← used by more than one feature
    ├── components/<Component>/<Component>.tsx + <Component>.styled.tsx
    ├── hooks/  theme/  types/  utils/
```

- Import through aliases: `@pages`, `@features`, `@shared/components`, `@shared/hooks`,
  `@shared/theme`, `@shared/types`, `@shared/utils`. Every folder exports through its `index.ts`.
- Colors, spacing, radius, and typography come from tokens in `shared/theme`; never hardcode a hex
  in a component. Components take token names as props: `<Card color="primary" padding="lg">`,
  `<Typography variant="title" color="textSecondary">`.
- Style-only props are filtered with `omitProps(...)` so they don't reach the DOM.
- Named exports (`export const Card = ...`), props interfaces prefixed with `I` (`ICardProps`),
  type aliases with `T` (`TColorName`), booleans with `is`/`has`/`can`/`should`.

## Skills

| Skill | Use it to |
|-------|-----------|
| `/create-feature` | build something new |
| `/change-feature` | modify the behavior of something that exists |
| `/improve-design` | polish UI, UX, accessibility, or data visualizations |
| `/change-definition` | record or change a project decision |
| `/fix-bug` | reproduce, fix, and guard against a bug |

## Domain notes

- MODIS (~1 km pixels, 2000–present, Terra/Aqua) and VIIRS (375 m pixels, 2012–present)
  are **not** directly comparable: a raw count from one sensor must never be mixed with the
  other without going through the harmonization step.
- Hotspots are detections, not fires. Say "hotspots" in code and UI unless a metric is truly about fire events.
- Color ramps must be colorblind-safe; never encode meaning with color alone.
