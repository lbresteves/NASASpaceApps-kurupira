import type { CSSProperties } from 'react';
import type { TColorName, TRadiusName, TSpacingName } from '@shared/theme';

// Layout shortcuts shared by layout components (ViewContent and the ones built on it).
// Spacing and radius accept a theme token ("md") or a number in px.
export interface ICommonStyledProps {
  center?: boolean;
  centerX?: boolean;
  centerY?: boolean;
  flexRow?: boolean;
  absolute?: boolean;
  gap?: TSpacingName | number;
  pad?: TSpacingName | number;
  padV?: TSpacingName | number;
  padH?: TSpacingName | number;
  flex?: number;
  bg?: TColorName;
  fit?: boolean;
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  radius?: TRadiusName | number;
}
