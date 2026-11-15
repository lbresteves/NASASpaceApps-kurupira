import type { IRegion } from '@shared/types';

export const isSameRegion = (a: IRegion, b: IRegion) => a.kind === b.kind && a.id === b.id;
