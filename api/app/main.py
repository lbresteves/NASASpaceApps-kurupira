from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_allowed_origins
from app.routes import calendar, clock, export, health, hotspots, regions

# Vercel finds this `app` instance automatically (app/main.py is a zero-config entrypoint).
app = FastAPI(
    title="Kurupira API",
    description="Harmonized MODIS + VIIRS hotspot data for the burning activity calendar.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_allowed_origins(),
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(clock.router)
app.include_router(hotspots.router)
app.include_router(calendar.router)
app.include_router(regions.router)
app.include_router(export.router)
