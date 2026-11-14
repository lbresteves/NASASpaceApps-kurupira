const EARTH_CIRCUMFERENCE_M = 40_075_016.686;
const TILE_SIZE_PX = 512;
const NICE_STEPS = [5, 2, 1];

export interface IScaleBar {
  widthPx: number;
  label: string;
}

export const getMetersPerPixel = (latitude: number, zoom: number) =>
  (EARTH_CIRCUMFERENCE_M * Math.cos((latitude * Math.PI) / 180)) / (TILE_SIZE_PX * 2 ** zoom);

export const getScaleBar = (metersPerPixel: number, maxWidthPx: number): IScaleBar => {
  const maxMeters = metersPerPixel * maxWidthPx;
  const magnitude = 10 ** Math.floor(Math.log10(maxMeters));
  const step = NICE_STEPS.find((candidate) => candidate * magnitude <= maxMeters) ?? 1;
  const meters = step * magnitude;

  return {
    widthPx: meters / metersPerPixel,
    label: meters >= 1000 ? `${meters / 1000} km` : `${meters} m`,
  };
};
