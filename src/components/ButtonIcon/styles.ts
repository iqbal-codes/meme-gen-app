import { StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';
import { createShadow } from '../../libs/shadowUtils';
import { states } from '../../libs/styleUtils';

export default StyleSheet.create({
  // Base button style
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RADIUS.md,
    aspectRatio: 1, // Make it square
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
    width: SPACING[8],
    height: SPACING[8],
  },
  mediumButton: {
    width: SPACING[10],
    height: SPACING[10],
  },
  largeButton: {
    width: SPACING[12],
    height: SPACING[12],
  },
  
  // Disabled
  disabledButton: {
    ...states.disabled,
  },
  
  // Icon container
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});