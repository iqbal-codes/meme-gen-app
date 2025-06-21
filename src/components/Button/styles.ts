import { StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING, FONT } from '../../constants/theme';
import { createShadow } from '../../libs/shadowUtils';
import { variants, sizes, states } from '../../libs/styleUtils';

export default StyleSheet.create({
  // Base button style
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RADIUS.md,
    ...createShadow({ size: 'sm' }),
  },
  
  // Variants
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: COLORS.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  ghostButton: {
    backgroundColor: 'transparent',
    ...createShadow({ size: 'none' }),
  },
  dangerButton: {
    backgroundColor: COLORS.destructive,
  },
  
  // Sizes
  smallButton: {
    paddingVertical: SPACING[1],
    paddingHorizontal: SPACING[3],
  },
  mediumButton: {
    paddingVertical: SPACING[2],
    paddingHorizontal: SPACING[4],
  },
  largeButton: {
    paddingVertical: SPACING[3],
    paddingHorizontal: SPACING[5],
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
  
  // Content container
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Icon container
  iconContainer: {
    marginHorizontal: SPACING[1],
  },
});