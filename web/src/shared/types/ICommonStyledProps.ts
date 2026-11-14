import type { CSSProperties } from 'react';
import type { TColorName, TRadiusName, TSpacingName } from '@shared/theme';

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
