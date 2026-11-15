import type { CSSProperties } from 'react';

export type TColors = {
  background: string;
  surface: string;
  surfaceTranslucent: string;
  primary: string;
  primaryContrast: string;
  primarySoft: string;
  primarySoftContrast: string;
  secondary: string;
  secondaryContrast: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  transparent: string;
  mapBackground: string;
  mapLand: string;
  mapBorder: string;
  mapWorldLand: string;
  mapWorldBorder: string;
  heat1: string;
  heat2: string;
  heat3: string;
  heat4: string;
  heat5: string;
  anomalyLow2: string;
  anomalyLow1: string;
  anomalyNeutral: string;
  anomalyHigh1: string;
  anomalyHigh2: string;
  modis1: string;
  modis2: string;
  modis3: string;
  modis4: string;
  modis5: string;
  viirs1: string;
  viirs2: string;
  viirs3: string;
  viirs4: string;
  viirs5: string;
  dataMuted: string;
  overlay: string;
  printBackground: string;
  printText: string;
  printMuted: string;
  printBorder: string;
};

export type TColorName = keyof TColors;

export type TTextStyle = {
  fontSize: CSSProperties['fontSize'];
  fontWeight: CSSProperties['fontWeight'];
  lineHeight: CSSProperties['lineHeight'];
};

export type TTypography = {
  title: TTextStyle;
  subtitle: TTextStyle;
  body: TTextStyle;
  caption: TTextStyle;
};

export type TTypographyVariant = keyof TTypography;

export type TSpacing = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export type TSpacingName = keyof TSpacing;

export type TRadius = {
  sm: number;
  md: number;
  lg: number;
};

export type TRadiusName = keyof TRadius;

export type TMedia = {
  mobile: string;
};

export type TTheme = {
  colors: TColors;
  typography: TTypography;
  spacing: TSpacing;
  radius: TRadius;
  media: TMedia;
  fontFamily: string;
};
