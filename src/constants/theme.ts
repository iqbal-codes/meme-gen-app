import { Dimensions } from 'react-native';

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
export const BORDER_RADIUS = RADIUS;

export const NO_PADDING = {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
};
