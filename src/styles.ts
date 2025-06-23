import { StyleSheet, Platform } from 'react-native';
import { BOX_SHADOWS, COLORS, RADIUS, SIZING } from './constants/theme';

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: '#808080',
  },
  container: {
    flex: 1,
  },
  canvasContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: SIZING[3],
    paddingBottom: SIZING[16],
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
    // width: '100%',
    // margin: SIZING[2],
    borderRadius: RADIUS.full,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: COLORS.background,
    // boxShadow: BOX_SHADOWS.md,
    // boxShadow: BOX_SHADOWS.xl,
  },
  // Guide lines for alignment
  verticalLine: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#ff0000',
    opacity: 0.7,
    zIndex: 1000,
  },
  horizontalLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#ff0000',
    opacity: 0.7,
    zIndex: 1000,
  },
  floatingAddElementContainer: {
    position: 'absolute',
    bottom: SIZING[3],
    left: SIZING[3],
    flexDirection: 'row',
    gap: SIZING.md,
    zIndex: 1000,
  },
  floatingEditElementContainer: {
    position: 'absolute',
    bottom: SIZING[3],
    right: SIZING[3],
    flexDirection: 'row',
    gap: SIZING.md,
    zIndex: 1000,
  },
});
