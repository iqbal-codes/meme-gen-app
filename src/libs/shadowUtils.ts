import { Platform, ViewStyle } from 'react-native';
import { COLORS, SHADOWS } from '../constants/theme';

type ShadowSize = 'none' | 'sm' | 'md' | 'lg' | 'xl';
type ShadowColor = string;

interface ShadowOptions {
  size?: ShadowSize;
  color?: ShadowColor;
  opacity?: number;
}

interface ShadowStyles extends ViewStyle {
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
}

/**
 * Shadow presets with increasing intensity
 */
const SHADOW_PRESETS: Record<ShadowSize, ShadowStyles> = {
  none: {},
  sm: SHADOWS.sm,
  md: SHADOWS.md,
  lg: SHADOWS.lg,
  xl: SHADOWS.xl,
};

/**
 * Creates shadow styles for both iOS and Android platforms
 * @param options Shadow configuration options
 * @returns ViewStyle object with platform-specific shadow properties
 */
export const createShadow = (options: ShadowOptions = {}): ShadowStyles => {
  const { size = 'md', color, opacity } = options;
  
  const shadowStyles = { ...SHADOW_PRESETS[size] };
  
  // Apply custom color if provided
  if (color && Platform.OS === 'ios') {
    shadowStyles.shadowColor = color;
  }
  
  // Apply custom opacity if provided (iOS only)
  if (opacity !== undefined && Platform.OS === 'ios') {
    shadowStyles.shadowOpacity = opacity;
  }
  
  return shadowStyles;
};

/**
 * Helper function to ensure shadows render correctly
 * by adding necessary background color and overflow properties
 */
export const applyShadowStyles = (styles: ViewStyle = {}): ViewStyle => {
  return {
    ...styles,
    backgroundColor: styles.backgroundColor || COLORS.card, // Shadows need a background color
    overflow: Platform.OS === 'android' ? 'visible' : 'hidden', // Different overflow settings per platform
  };
};

/**
 * Combines shadow and component styles
 */
export const withShadow = (componentStyles: ViewStyle = {}, shadowOptions: ShadowOptions = {}): ViewStyle => {
  return {
    ...componentStyles,
    ...createShadow(shadowOptions),
    backgroundColor: componentStyles.backgroundColor || COLORS.card,
    overflow: Platform.OS === 'android' ? 'visible' : 'hidden',
  };
};