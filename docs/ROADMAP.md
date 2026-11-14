# Roadmap

One step at a time. A step is done only when its **Done when** is true. Then we pick the next one.
Each step is built with `/create-feature` (or `/change-feature`), and new decisions go through `/change-definition`.

Status: ⬜ todo · 🟨 in progress · ✅ done

## Phase 1 — First end-to-end flow (Brazil, 2025)

| # | Step | Owner | Done when | Status |
|---|------|-------|-----------|--------|
| 0 | **Project skeleton**: folders `data/`, `api/`, `web/`; `.gitignore`, `.env.example`; README "how to run" section. | Letícia, Nikolas | Each folder runs a "hello world" locally. (`web/` ✅ — `data/` and `api/` pending) | 🟨 |
| 1 | **Get the data**: download FIRMS MODIS + VIIRS hotspots for Brazil, 2025; save as Parquet; fix the column contract (D-02). | Tiago, Elaine | A Parquet file + a short note of its columns and row count. A small sample file is shared for the web/API. | ⬜ |
| 2 | **Render the map**: React page with a MapLibre map centered on Brazil. | Letícia, Nikolas | The map opens in the browser, with zoom and pan. | ⬜ |
| 3 | **First API endpoint**: FastAPI `GET /hotspots?bbox=&start=&end=` reading the Parquet (sample file first). | Letícia, Nikolas | Calling the URL returns hotspots as GeoJSON. | ⬜ |
| 4 | **Connect web → API**: the map fetches `/hotspots` and draws the points. | Letícia, Nikolas | Brazil 2025 hotspots show on the map. | ⬜ |
| 5 | **First deploy to Vercel** (web + API). | Letícia, Nikolas + Claude | Public URL shows step 4 working. Deploying early surfaces size limits before we have lots of code. | ⬜ |

## Phase 2 — The burning calendar

| # | Step | Owner | Done when | Status |
|---|------|-------|-----------|--------|
| 6 | **Area of interest**: draw a rectangle/polygon on the map, or type lat/lon. | Letícia, Nikolas | The selected area is sent to the API and the points are filtered. | ⬜ |
| 7 | **Calendar endpoint**: `GET /calendar?area=&start=&end=` returning hotspot counts per month (and per day if the design needs it). | Letícia, Nikolas | Counts match a manual check in pandas. | ⬜ |
| 8 | **Interactive calendar v1** (design by Melody, from the reference image). | Letícia, Nikolas | Calendar shows 2025 counts for the selected area, with hover values and an accessible color ramp. | ⬜ |
| 9 | **CSV download**: `GET /hotspots.csv` with the same filters. | Letícia, Nikolas | The downloaded file opens in Excel with the expected rows. | ⬜ |

## Phase 3 — Harmonization and history

| # | Step | Owner | Done when | Status |
|---|------|-------|-----------|--------|
| 10 | **Choose the harmonization method** (e.g. calibrate VIIRS to MODIS-equivalent counts in the 2012+ overlap). Record it as `H-01`. | Tiago, Elaine | Method written in DEFINITIONS with its reason. | ⬜ |
| 11 | **Implement harmonization** in the pipeline; output a harmonized column/series. | Tiago, Elaine | A plot of the overlap years shows the two sensors aligned. | ⬜ |
| 12 | **Expand history**: Brazil 2000–present. | Tiago, Elaine | Parquet with the full period, harmonized. | ⬜ |
| 13 | **Calendar v2**: years × months, current month vs. historical median, anomalies. | Letícia, Nikolas | Users can see which months/years burned most and how now compares. | ⬜ |

## Phase 4 — Polish and pitch

| # | Step | Owner | Done when | Status |
|---|------|-------|-----------|--------|
| 14 | **Design pass** with `/improve-design` (accessibility, mobile, legends). | Melody | Checklist in the skill is met. | ⬜ |
| 15 | **Final deploy + README** (how it works, data sources, method). | Everyone | Public URL and README up to date. | ⬜ |
| 16 | **Submission material** (demo video, slides, project page). | Everyone | Submitted on the Space Apps platform. | ⬜ |

## Open questions

- FIRMS `MAP_KEY`: who creates it? (free at <https://firms.modaps.eosdis.nasa.gov/api/map_key/>)
- Calendar design: Melody owns it; waiting for the reference image (step 8).
- Data size on Vercel: if the Brazil 2000–present Parquet is too big for a serverless function, host it elsewhere (e.g. object storage) or pre-aggregate. Decide at step 5 / 12.
