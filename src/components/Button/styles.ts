import { StyleSheet } from 'react-native';
import {
  COLORS,
  RADIUS,
  SIZING,
  FONT,
  BOX_SHADOWS,
} from '../../constants/theme';
import { states } from '../../libs/styleUtils';

export default StyleSheet.create({
  // Base button style
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RADIUS.md,
  },

  // Variants with shadow
  primaryButton: {
    backgroundColor: COLORS.primary,
    boxShadow: BOX_SHADOWS.md,
  },
  secondaryButton: {
    backgroundColor: COLORS.background,
    boxShadow: BOX_SHADOWS.md,
  },
  outlineButton: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.primary,
    boxShadow: BOX_SHADOWS.md,
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  dangerButton: {
    backgroundColor: COLORS.destructive,
    boxShadow: BOX_SHADOWS.md,
  },

  // Variants without shadow
  primaryButtonNoShadow: {
    backgroundColor: COLORS.primary,
  },
  secondaryButtonNoShadow: {
    backgroundColor: COLORS.secondary,
  },
  outlineButtonNoShadow: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  ghostButtonNoShadow: {
    backgroundColor: 'transparent',
  },
  dangerButtonNoShadow: {
    backgroundColor: COLORS.destructive,
  },

  // Regular button sizes
  smallButton: {
    height: SIZING[8],
    paddingHorizontal: SIZING[3],
  },
  mediumButton: {
    height: SIZING[10],
    paddingHorizontal: SIZING[4],
  },
  largeButton: {
    height: SIZING[12],
    paddingHorizontal: SIZING[5],
  },

  // Icon-only button sizes (square)
  smallIconButton: {
    width: SIZING[8],
    height: SIZING[8],
    aspectRatio: 1,
  },
  mediumIconButton: {
    width: SIZING[10],
    height: SIZING[10],
    aspectRatio: 1,
  },
  largeIconButton: {
    width: SIZING[12],
    height: SIZING[12],
    aspectRatio: 1,
  },

  // Block
  blockButton: {
    width: '100%',
  },

  // Disabled
  disabledButton: {
    ...states.disabled,
  },

  // Text styles
  text: {
    fontSize: FONT.sizes.base,
    fontWeight: '500',
    textAlign: 'center',
  },
  primaryText: {
    color: COLORS.primaryForeground,
  },
  secondaryText: {
    color: COLORS.secondaryForeground,
  },
  outlineText: {
    color: COLORS.foreground,
  },
  ghostText: {
    color: COLORS.foreground,
  },
  dangerText: {
    color: COLORS.destructiveForeground,
  },

  // Text sizes
  smallText: {
    fontSize: FONT.sizes.sm,
  },
  mediumText: {
    fontSize: FONT.sizes.base,
  },
  largeText: {
    fontSize: FONT.sizes.lg,
  },

  // Disabled text
  disabledText: {
    opacity: 0.8,
  },

  // Content container for regular buttons
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SIZING[2],
  },

  // Icon container for icon-only buttons
  iconOnlyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
