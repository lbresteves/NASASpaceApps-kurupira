import type { CSSProperties } from 'react';

// Add or replace color tokens as the design (Melody) evolves.
export type TColors = {
  background: string;
  surface: string;
  primary: string;
  primaryContrast: string;
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
};

// Any color token name: <Card color="primary" />, <Typography color="textSecondary" />.
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

export type TTheme = {
  colors: TColors;
  typography: TTypography;
  spacing: TSpacing;
  radius: TRadius;
  fontFamily: string;
};
