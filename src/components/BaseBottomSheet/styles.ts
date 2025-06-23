import { StyleSheet } from 'react-native';
import {
  COLORS, SIZING, FONT, RADIUS,
} from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlay: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZING.md,
    paddingVertical: SIZING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: FONT.sizes.lg,
    fontWeight: FONT.weights.bold,
    color: COLORS.foreground,
  },
  content: {
    padding: SIZING.md,
  },
});

export default styles;
