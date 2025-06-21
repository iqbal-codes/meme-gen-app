import { StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT, RADIUS, SCREEN_WIDTH } from '../../constants/theme';

const styles = StyleSheet.create({
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageOption: {
    width: '48%', // 2 columns with some spacing
    marginBottom: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    overflow: 'hidden',
  },
  templateImage: {
    width: '100%',
    height: (SCREEN_WIDTH - SPACING[16]) / 2,
    backgroundColor: COLORS.muted,
  },
  templateName: {
    padding: SPACING.sm,
    fontSize: FONT.sizes.sm,
    fontWeight: FONT.weights.medium,
    color: COLORS.text,
    textAlign: 'center',
    minHeight: 40, // Ensure consistent height for text area
  },
});

export default styles;
