import { StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT, RADIUS } from '../../constants/theme';
import { calculateFlatListItemWidth } from '../../libs/styleUtils';

const imageWidth = calculateFlatListItemWidth({ numColumns: 2, containerPadding: SPACING[3], gap: SPACING[2] });

const styles = StyleSheet.create({
  container: {
    padding: SPACING[3],
    gap: SPACING[2],
  },
  columnWrapper: {
    gap: SPACING[2],
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageOption: {
    width: imageWidth,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    overflow: 'hidden',
  },
  templateImage: {
    width: '100%',
    height: imageWidth,
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
