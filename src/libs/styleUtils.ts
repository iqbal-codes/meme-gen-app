import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS, RADIUS, SPACING, FONT } from '../constants/theme';

// Common variant styles for components
export const variants = {
  // Button variants
  button: {
    default: {
      backgroundColor: COLORS.primary,
      color: COLORS.primaryForeground,
    },
    secondary: {
      backgroundColor: COLORS.secondary,
      color: COLORS.secondaryForeground,
    },
    destructive: {
      backgroundColor: COLORS.destructive,
      color: COLORS.destructiveForeground,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: COLORS.border,
      color: COLORS.foreground,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: COLORS.foreground,
    },
    link: {
      backgroundColor: 'transparent',
      color: COLORS.primary,
      textDecorationLine: 'underline' as TextStyle['textDecorationLine'],
    },
  },
  
  // Input variants
  input: {
    default: {
      backgroundColor: COLORS.background,
      borderWidth: 1,
      borderColor: COLORS.input,
      color: COLORS.foreground,
    },
    filled: {
      backgroundColor: COLORS.muted,
      borderWidth: 1,
      borderColor: 'transparent',
      color: COLORS.foreground,
    },
  },
};

// Common size styles for components
export const sizes = {
  // Button sizes
  button: {
    sm: {
      paddingVertical: SPACING[1],
      paddingHorizontal: SPACING[3],
      fontSize: FONT.sizes.sm,
      borderRadius: RADIUS.sm,
    },
    md: {
      paddingVertical: SPACING[2],
      paddingHorizontal: SPACING[4],
      fontSize: FONT.sizes.base,
      borderRadius: RADIUS.md,
    },
    lg: {
      paddingVertical: SPACING[3],
      paddingHorizontal: SPACING[5],
      fontSize: FONT.sizes.lg,
      borderRadius: RADIUS.md,
    },
    icon: {
      width: SPACING[10],
      height: SPACING[10],
      borderRadius: RADIUS.md,
      padding: 0,
    },
  },
  
  // Input sizes
  input: {
    sm: {
      height: SPACING[8],
      paddingHorizontal: SPACING[3],
      fontSize: FONT.sizes.sm,
      borderRadius: RADIUS.sm,
    },
    md: {
      height: SPACING[10],
      paddingHorizontal: SPACING[4],
      fontSize: FONT.sizes.base,
      borderRadius: RADIUS.md,
    },
    lg: {
      height: SPACING[12],
      paddingHorizontal: SPACING[5],
      fontSize: FONT.sizes.lg,
      borderRadius: RADIUS.md,
    },
  },
};

// Common state styles for components
export const states = {
  disabled: {
    opacity: 0.5,
  },
  loading: {
    opacity: 0.7,
  },
  focused: {
    borderColor: COLORS.ring,
  },
  error: {
    borderColor: COLORS.destructive,
  },
};

// Helper to create component styles with variants
export const createVariantStyles = <T extends Record<string, any>>(
  baseStyle: ViewStyle,
  variantStyles: T
): Record<keyof T, ViewStyle> => {
  const styles: Record<string, ViewStyle> = {};
  
  Object.keys(variantStyles).forEach((key) => {
    styles[key] = StyleSheet.flatten([baseStyle, variantStyles[key]]);
  });
  
  return styles as Record<keyof T, ViewStyle>;
};