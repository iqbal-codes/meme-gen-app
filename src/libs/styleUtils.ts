import { Dimensions, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS, RADIUS, SIZING, FONT, SCREEN_WIDTH } from '../constants/theme';

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
      paddingVertical: SIZING[1],
      paddingHorizontal: SIZING[3],
      fontSize: FONT.sizes.sm,
      borderRadius: RADIUS.sm,
    },
    md: {
      paddingVertical: SIZING[2],
      paddingHorizontal: SIZING[4],
      fontSize: FONT.sizes.base,
      borderRadius: RADIUS.md,
    },
    lg: {
      paddingVertical: SIZING[3],
      paddingHorizontal: SIZING[5],
      fontSize: FONT.sizes.lg,
      borderRadius: RADIUS.md,
    },
    icon: {
      width: SIZING[10],
      height: SIZING[10],
      borderRadius: RADIUS.md,
      padding: 0,
    },
  },

  // Input sizes
  input: {
    sm: {
      height: SIZING[8],
      paddingHorizontal: SIZING[3],
      fontSize: FONT.sizes.sm,
      borderRadius: RADIUS.sm,
    },
    md: {
      height: SIZING[10],
      paddingHorizontal: SIZING[4],
      fontSize: FONT.sizes.base,
      borderRadius: RADIUS.md,
    },
    lg: {
      height: SIZING[12],
      paddingHorizontal: SIZING[5],
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
  variantStyles: T,
): Record<keyof T, ViewStyle> => {
  const styles: Record<string, ViewStyle> = {};

  Object.keys(variantStyles).forEach(key => {
    styles[key] = StyleSheet.flatten([baseStyle, variantStyles[key]]);
  });

  return styles as Record<keyof T, ViewStyle>;
};

/**
 * Calculate item width for FlatList based on number of columns, gap, and container padding
 * @param numColumns - Number of columns in the FlatList
 * @param gap - Gap between items (horizontal spacing)
 * @param containerPadding - Horizontal padding of the container
 * @param screenWidth - Screen width (optional, defaults to device width)
 * @returns Calculated item width
 */
export const calculateFlatListItemWidth = ({
  numColumns,
  gap = 0,
  containerPadding = 0,
  screenWidth = SCREEN_WIDTH,
}: {
  numColumns: number;
  gap?: number;
  containerPadding?: number;
  screenWidth?: number;
}): number => {
  // Calculate available width after removing container padding
  const availableWidth = screenWidth - containerPadding * 2;

  // Calculate total gap width (numColumns - 1 gaps between items)
  const totalGapWidth = (numColumns - 1) * gap;

  // Calculate item width
  const itemWidth = (availableWidth - totalGapWidth) / numColumns;

  return Math.floor(itemWidth);
};

/**
 * Helper function to get common FlatList item dimensions
 * Useful for creating square items or maintaining aspect ratios
 */
export const getFlatListItemDimensions = ({
  numColumns,
  gap = 0,
  containerPadding = 0,
  aspectRatio = 1, // 1 for square, 16/9 for landscape, etc.
  screenWidth = SCREEN_WIDTH,
}: {
  numColumns: number;
  gap?: number;
  containerPadding?: number;
  aspectRatio?: number;
  screenWidth?: number;
}) => {
  const width = calculateFlatListItemWidth({
    numColumns,
    gap,
    containerPadding,
    screenWidth,
  });

  const height = width / aspectRatio;

  return {
    width,
    height: Math.floor(height),
  };
};
