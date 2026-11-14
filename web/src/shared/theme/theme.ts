import type { TColors, TRadius, TSpacing, TTheme, TTypography } from './TTheme';

// Placeholder palette until the design is defined.
export const colors: TColors = {
  background: '#0F1420',
  surface: '#1A2233',
  primary: '#E8590C',
  primaryContrast: '#FFFFFF',
  secondary: '#2B8A3E',
  secondaryContrast: '#FFFFFF',
  textPrimary: '#F1F3F5',
  textSecondary: '#ADB5BD',
  border: '#343A40',
  success: '#40C057',
  warning: '#FAB005',
  error: '#FA5252',
  transparent: 'transparent',
};

export const typography: TTypography = {
  title: { fontSize: 32, fontWeight: 700, lineHeight: 1.25 },
  subtitle: { fontSize: 20, fontWeight: 600, lineHeight: 1.4 },
  body: { fontSize: 16, fontWeight: 400, lineHeight: 1.5 },
  caption: { fontSize: 13, fontWeight: 400, lineHeight: 1.4 },
};

export const spacing: TSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 40,
};

export const radius: TRadius = {
  sm: 4,
  md: 8,
  lg: 16,
};

export const theme: TTheme = {
  colors,
  typography,
  spacing,
  radius,
  fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
};
