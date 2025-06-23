import { Dimensions, TextStyle } from 'react-native';

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
  secondary: '#f0f0f0',
  secondaryForeground: '#18181b',

  // Muted colors
  muted: '#f0f0f0',
  mutedForeground: '#71717a',

  // Accent colors
  accent: '#f0f0f0',
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

  // text colors
  text: '#18181b',
  textForeground: '#ffffff',
};

// Radius values
export const RADIUS = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

// Spacing scale
export const SIZING = {
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

// Modern boxShadow definitions (CSS-compliant)
export const BOX_SHADOWS = {
  none: '0 0 0 0 rgba(0, 0, 0, 0)',
  sm: '0px 0px 4px 0px rgba(0,0,0,0.3)',
  md: '0px 0px 8px 1px rgba(0,0,0,0.3)',
  lg: '0px 0px 12px 2px rgba(0,0,0,0.3)',
  xl: '0 18px 3px 0 rgba(0, 0, 0, 0.3)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
};

// Screen dimensions
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

// Legacy exports for backward compatibility
export const FONT_SIZES = FONT.sizes;
export const FONT_WEIGHTS = FONT.weights;
export const BORDER_RADIUS = RADIUS;

export const NO_PADDING = {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
};
