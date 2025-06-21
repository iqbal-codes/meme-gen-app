import { Dimensions, StyleProp, TextStyle } from 'react-native';

// Design tokens - shadcn style
export const COLORS = {
  // Base colors
  background: '#ffffff',
  foreground: '#09090b',
  card: '#ffffff',
  cardForeground: '#09090b',
  popover: '#ffffff',
  popoverForeground: '#09090b',

  // Primary colors
  primary: '#18181b',
  primaryForeground: '#ffffff',

  // Secondary colors
  secondary: '#f4f4f5',
  secondaryForeground: '#18181b',

  // Muted colors
  muted: '#f4f4f5',
  mutedForeground: '#71717a',

  // Accent colors
  accent: '#f4f4f5',
  accentForeground: '#18181b',

  // Destructive colors
  destructive: '#ef4444',
  destructiveForeground: '#ffffff',

  // Border and ring
  border: '#e4e4e7',
  input: '#e4e4e7',
  ring: '#18181b',

  // Status colors
  success: '#22c55e',
  warning: '#f59e0b',
  info: '#3b82f6',
};

// Radius values
export const RADIUS = {
  none: 0,
  sm: 2,
  md: 4,
  lg: 8,
  xl: 12,
  full: 9999,
};

// Spacing scale
export const SPACING = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  // Legacy mappings (for backward compatibility)
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Font sizes
export const FONT = {
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128,
  },
  weights: {
    light: '300' as TextStyle['fontWeight'],
    normal: '400' as TextStyle['fontWeight'],
    medium: '500' as TextStyle['fontWeight'],
    semibold: '600' as TextStyle['fontWeight'],
    bold: '700' as TextStyle['fontWeight'],
    extrabold: '800' as TextStyle['fontWeight'],
  },
  lineHeights: {
    none: 1,
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
};

// Shadows
export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
};

// Screen dimensions
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

// Legacy exports for backward compatibility
export const FONT_SIZES = FONT.sizes;
export const FONT_WEIGHTS = FONT.weights;
export const BORDER_RADIUS = RADIUS;
