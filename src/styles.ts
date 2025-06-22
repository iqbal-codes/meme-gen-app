import { Platform, StyleSheet } from 'react-native';
import { COLORS, SPACING } from './constants/theme';
import { createShadow } from './libs/shadowUtils';

export default StyleSheet.create({
  rootContainer: { flex: 1, height: '100%', backgroundColor: COLORS.muted },
  container: {
    flex: 1,
  },
  canvasContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    padding: SPACING.md,
    overflow: 'hidden', // Contain the canvas within this container
  },
  canvas: {
    width: '100%',
    backgroundColor: '#ffffff', // Add background color
    overflow: Platform.OS === 'android' ? 'visible' : 'hidden', // Different overflow settings per platform
    // Shadow for iOS
    ...createShadow({ size: 'lg' }),
  },
  canvasImage: {
    width: '100%', // Match the border radius of the parent
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    padding: SPACING.md,
    width: '100%',
    gap: SPACING.md,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...createShadow({ size: 'lg' }),
  },
  verticalLine: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 1,
    opacity: 0.8,
    zIndex: 999,
    transform: [{ translateX: -0.5 }],
    borderStyle: 'dashed',
    borderRightWidth: 1,
  },
  horizontalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    opacity: 0.8,
    zIndex: 999,
    transform: [{ translateY: -0.5 }],
    borderStyle: 'dashed',
    borderBottomWidth: 1,
  },
});
