import { StyleSheet } from 'react-native';
import {
  COLORS, RADIUS, SIZING, BOX_SHADOWS, FONT,
} from '@/constants';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZING[5], // 20
  },
  container: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.xl,
    width: '100%',
    maxWidth: 400,
    boxShadow: BOX_SHADOWS.md,
  },
  content: {
    padding: SIZING[3], // 24
  },
  title: {
    fontSize: FONT.sizes['2xl'],
    fontWeight: FONT.weights.semibold,
    color: COLORS.foreground,
    marginBottom: SIZING[2], // 8
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: COLORS.mutedForeground,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: SIZING[6], // 24
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: SIZING[3], // 12
  },
  button: {
    flex: 1,
  },
  confirmButton: {
    // Additional styling for confirm button when cancel is shown
  },
});
