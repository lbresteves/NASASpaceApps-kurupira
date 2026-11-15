export type TRegionKind = 'state' | 'brazil' | 'country';

export interface IRegion {
  kind: TRegionKind;
  id: string;
  name: string;
}
