# 🔥 Kurupira — NASA Space Apps Challenge 2026

**Hello, Earthlings! 👽🌎**

Welcome to our territory of world-changing ideas, caffeine-powered coding sessions, and satellite-powered fire intelligence.

We are **Kurupira** 🇧🇷, a Brazilian team representing **Cuiabá** participating in the **NASA Space Apps Challenge 2026**. Named after the mythical guardian of the forests, we're building tools to harmonize **MODIS** and **VIIRS** hotspot records, helping create a clearer picture of fire activity around the world.

## 🛰️ The Challenge

**[Harmonization of MODIS and VIIRS Hot Spots](https://www.spaceappschallenge.org/2026/challenges/modis-and-viirs-hot-spots/)**

Satellites have tracked active fire hotspots for more than two decades, but the record is split between sensors that can't be compared directly. MODIS gives us 20+ years of history and is nearing retirement; VIIRS brings continuity and more detail. Different resolutions, sensitivities, and schedules mean their numbers don't line up.

Our mission, in two parts:

1. **Harmonize** MODIS and VIIRS hotspots (NASA FIRMS) into one consistent time series, so the sensor of origin no longer matters.
2. **Build a web app** with a **burning activity calendar**: pick an area and a date range, see which months and years burned the most, compare the current month to the historical median, and download the hotspots as CSV.

Built for emergency responders, firefighters, scientists, and land managers.

📄 Full challenge description: [docs/CHALLENGE.md](docs/CHALLENGE.md)

## 👩‍🚀 The Crew

- Tiago
- Elaine
- Nikolas
- Letícia
- Melody: pitch and presentation
- Gleiciane: pitch and presentation

## 🛠️ How we built it

- **Python** (pandas, FastAPI) prepares and serves the harmonized data.
- **React** + TypeScript draws the map, the calendar, and the charts.
- **Claude** (Claude Code) was our coding partner, from the data pipeline to the interface.
- Hosted on **Vercel**.

## 🧰 Working on this repo

- Everything in the project is written in **English**: code, comments, UI, docs, commits.
- Step-by-step plan: [docs/ROADMAP.md](docs/ROADMAP.md).
- Project decisions live in [docs/DEFINITIONS.md](docs/DEFINITIONS.md).
- Claude Code skills live in [.claude/skills](.claude/skills): `/create-feature`, `/change-feature`, `/improve-design`, `/change-definition`, `/fix-bug`.

---

> *"To infinity and beyond!"*
> — Buzz Lightyear 🚀
