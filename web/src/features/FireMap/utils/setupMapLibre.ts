import { setWorkerUrl } from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';

// MapLibre 6 looks for its worker next to its own JS file, but Vite moves that file when bundling.
// Without this, the background draws but GeoJSON layers never load (the worker processes them).
setWorkerUrl(workerUrl);
