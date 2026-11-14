# Project Definitions

The single source of truth for decisions about scope, data, method, stack, and design.
Change it with the `/change-definition` skill so every decision keeps its reason and date.

Status: `proposed` → `accepted` → `superseded` (never delete a row; supersede it).

## Scope

| ID | Decision | Status | Why | Date |
|----|----------|--------|-----|------|
| S-01 | Deliver (1) a harmonized MODIS + VIIRS hotspot time series and (2) a web app with a burning activity calendar, area/date selection, and CSV download. | accepted | Core objectives of the challenge (see `CHALLENGE.md`). | 2026-11-14 |
| S-02 | Start with **Brazil, year 2025**; widen the period (2000–present) and region only after the end-to-end flow works. | accepted | Small data first; the team represents Cuiabá, and Brazil gives a strong demo (Cerrado, Pantanal, Amazon). | 2026-11-14 |
| S-03 | Build incrementally, one step at a time, following `docs/ROADMAP.md`. | accepted | Team request: no big-bang development. | 2026-11-14 |

## Data

| ID | Decision | Status | Why | Date |
|----|----------|--------|-----|------|
| D-01 | Source hotspots from NASA FIRMS (MODIS and VIIRS archives). | accepted | Suggested by the challenge. | 2026-11-14 |
| D-02 | The data team delivers **Parquet** files with at least: `latitude`, `longitude`, `acq_date` (UTC, `YYYY-MM-DD`), `acq_time`, `sensor` (`MODIS` / `VIIRS`), `satellite`, `confidence`, `frp`. Exact columns are fixed in roadmap step 1. | proposed | A shared contract lets the API and web be built with mock data in parallel. | 2026-11-14 |
| D-03 | The FIRMS `MAP_KEY` lives in a local `.env` file, never in git. | accepted | API keys must not be published. | 2026-11-14 |

## Harmonization method

_TBD._

## Stack

| ID | Decision | Status | Why | Date |
|----|----------|--------|-----|------|
| T-01 | **Python prepares and serves the data; React draws.** GeoPandas/matplotlib are not used to render the web map. | accepted | Static images can't support drawing an area, zoom, hover, or an interactive calendar. | 2026-11-14 |
| T-02 | Data pipeline (`data/`): Python with pandas + geopandas, owned by Tiago and Elaine. | accepted | Team skills. | 2026-11-14 |
| T-03 | API (`api/`): Python **FastAPI**, returning JSON/GeoJSON and CSV. Querying Parquet with DuckDB is the default; keep heavy libs (geopandas) out of the API if they break the deploy size limit. | accepted | Same language as the data team; fast to build. | 2026-11-14 |
| T-04 | Web (`web/`): **React + Vite + TypeScript**; map with **MapLibre GL** (no token needed). Calendar library decided at its roadmap step. | accepted | Simple setup, free map tiles, good Vercel support. | 2026-11-14 |
| T-05 | Deploy web and API on **Vercel** (API as Python serverless functions). | accepted | Team request. Watch the function bundle size and data file size. | 2026-11-14 |
| T-11 | Two Vercel projects from this repo: **web** (Root Directory `web`) and **api** (Root Directory `api`, zero-config FastAPI from `app/main.py`, deps from `requirements.txt` only — no `pyproject.toml`, which conflicts without a lockfile). Python **3.12**. CORS origins via `ALLOWED_ORIGINS`. | accepted | Each side deploys independently; 3.12 is Vercel's default and works with the data team's 3.10/3.12 code. | 2026-11-14 |
| T-06 | Front-end architecture: `pages/`, `features/<Feature>/views/styles/`, `shared/{components,hooks,theme,types,utils}`; styling with **Emotion** only; theme tokens used by name (`<Card color="primary">`); minimal dependencies. Details in `CLAUDE.md`. | accepted | The architecture the front-end team already knows (Plantup / Poomsae apps). | 2026-11-14 |
| T-07 | **The map is drawn from vector data, never from ready-made images.** MapLibre renders GeoJSON layers: boundaries → hotspots (points / heatmap from our API) → user-selected area. No raster basemap for now; background is a theme color. | accepted | Full control of the look, and the polygons on screen are the same ones used in the analysis. Images (FIRMS WMS, GIBS) can't be counted or filtered. | 2026-11-14 |
| T-08 | Boundaries come from the **IBGE mesh API** (`servicodados.ibge.gov.br/api/v3/malhas`), GeoJSON format, called directly by the web app (CORS is open). Names come from the IBGE localities API (meshes only carry `codarea`). Save a local snapshot before the final demo as a fallback. | superseded by T-09 | Official, light (~100–250 KB for Brazil by state), no key, no file to maintain. | 2026-11-14 |
| T-09 | Boundaries are a **local GeoJSON snapshot** of the IBGE mesh API: `web/public/data/brazil-states.geojson` (27 states, `qualidade=intermediaria`, ~250 KB), with properties `code`, `name`, `abbreviation`, `region` merged from the IBGE localities API. The app does not call IBGE at runtime. | accepted | Light enough to ship, works offline and in the demo even if IBGE is down, one less network call. | 2026-11-14 |
| T-10 | World countries as a muted background layer under Brazil: local snapshot of **Natural Earth 1:110m** admin-0 countries, `web/public/data/world-countries.geojson` (~190 KB, properties `name`, `iso`, coordinates rounded to 3 decimals). The map still opens on Brazil. | accepted | Gives geographic context without raster tiles. 1:50m looks sharper but is ~1.6 MB. | 2026-11-14 |

## Design

| ID | Decision | Status | Why | Date |
|----|----------|--------|-----|------|
| X-01 | Use colorblind-safe sequential ramps for counts and diverging ramps for anomalies. | proposed | Accessibility is an explicit consideration of the challenge. | 2026-11-14 |

## Conventions

| ID | Decision | Status | Why | Date |
|----|----------|--------|-----|------|
| C-01 | Everything in the repo is in English (code, comments, UI text, docs, commits), even when prompts are in Portuguese. | accepted | Hackathon requirement. | 2026-11-14 |
