export type TCompassPosition =
  'north' | 'south' | 'east' | 'west' | 'northeast' | 'northwest' | 'southeast' | 'southwest' | 'central';

export interface IWatchArea {
  state_code: string;
  position: TCompassPosition;
  latitude: number;
  longitude: number;
  detection_pct: number;
  expected_hotspots: number;
}

export interface IWatchMonth {
  period: string;
  areas: IWatchArea[];
}

export interface IHotspotWatch {
  months: IWatchMonth[];
}
