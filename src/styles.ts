import { StyleSheet, Platform } from 'react-native';
import { BOX_SHADOWS, COLORS, SIZING } from './constants/theme';

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  canvasContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    padding: SIZING.lg,
    overflow: 'hidden', // Contain the canvas within this container
  },
  canvas: {
    width: '100%',
    backgroundColor: '#ffffff', // Add background color
    overflow: Platform.OS === 'android' ? 'visible' : 'hidden', // Different overflow settings per platform
    boxShadow: BOX_SHADOWS.lg,
  },
  canvasImage: {
    width: '100%', // Match the border radius of the parent
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    padding: SIZING[3],
    width: '100%',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    boxShadow: BOX_SHADOWS.xl,
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
  floatingAddElementContainer: {
    position: 'absolute',
    bottom: SIZING.md,
    left: SIZING.md,
    flexDirection: 'row',
    gap: SIZING.md,
    zIndex: 1000,
  },
  floatingEditElementContainer: {
    position: 'absolute',
    bottom: SIZING.md,
    right: SIZING.md,
    flexDirection: 'row',
    gap: SIZING.md,
    zIndex: 1000,
  },
});
