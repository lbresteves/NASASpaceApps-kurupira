import type { TColors, TMedia, TRadius, TSpacing, TTheme, TTypography } from './TTheme';

export const colors: TColors = {
  background: '#102618',
  surface: '#173822',
  primary: '#C65B1A',
  primaryContrast: '#FFFFFF',
  secondary: '#215232',
  secondaryContrast: '#EEF4EE',
  textPrimary: '#EEF4EE',
  textSecondary: '#B6CEBA',
  border: '#295436',
  success: '#84D47A',
  warning: '#FFD166',
  error: '#DC2626',
  transparent: 'transparent',
  mapBackground: '#102618',
  mapLand: '#1E3A28',
  mapBorder: '#3B714A',
  mapWorldLand: '#132E1D',
  mapWorldBorder: '#215232',
  heat1: '#7D1E63',
  heat2: '#C12D58',
  heat3: '#F08843',
  heat4: '#F7BD6C',
  heat5: '#FCE19B',
  anomalyLow2: '#8CC8F5',
  anomalyLow1: '#3A7CB8',
  anomalyNeutral: '#7A8C7E',
  anomalyHigh1: '#C0662A',
  anomalyHigh2: '#FDB863',
  modis1: '#5D4411',
  modis2: '#8F6A1A',
  modis3: '#C4911F',
  modis4: '#FFB547',
  modis5: '#FFD166',
  viirs1: '#4A1240',
  viirs2: '#7D1E63',
  viirs3: '#C12D58',
  viirs4: '#E0607E',
  viirs5: '#F5A3B5',
  dataMuted: '#215232',
  overlay: 'rgba(16, 38, 24, 0.75)',
  printBackground: '#FFFFFF',
  printText: '#102618',
  printMuted: '#506D5A',
  printBorder: '#C8DEC9',
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

export const media: TMedia = {
  mobile: '@media (max-width: 768px)',
};

export const theme: TTheme = {
  colors,
  typography,
  spacing,
  radius,
  media,
  fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
};
