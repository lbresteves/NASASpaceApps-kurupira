import type { TColors, TMedia, TRadius, TSpacing, TTheme, TTypography } from './TTheme';

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
  mapBackground: '#0B0F18',
  mapLand: '#243349',
  mapBorder: '#6B7F9E',
  mapWorldLand: '#161E2B',
  mapWorldBorder: '#2C3A50',
  heat1: '#3B0F70',
  heat2: '#8C2981',
  heat3: '#DE4968',
  heat4: '#FE9F6D',
  heat5: '#FCFDBF',
  dataMuted: '#2F3747',
  overlay: 'rgba(5, 8, 14, 0.7)',
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
