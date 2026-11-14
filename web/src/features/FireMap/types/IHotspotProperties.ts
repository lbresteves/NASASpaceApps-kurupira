export interface IHotspotProperties {
  modis: number;
  viirs: number;
  harmonized: number;
}

export type THotspotSeries = keyof IHotspotProperties;

export type TMapColorMode = 'harmonized' | 'compare';
