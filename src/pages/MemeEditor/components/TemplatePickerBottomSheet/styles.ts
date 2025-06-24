import { StyleSheet } from 'react-native';
import { COLORS, SIZING, FONT, RADIUS } from '@/constants';
import { calculateFlatListItemWidth } from '@/utils';

const imageWidth = calculateFlatListItemWidth({
  numColumns: 2,
  containerPadding: SIZING[3],
  gap: SIZING[2],
});

const styles = StyleSheet.create({
  container: {
    padding: SIZING[3],
    paddingTop: 0, // Remove top padding since search has its own
    gap: SIZING[2],
  },
  columnWrapper: {
    gap: SIZING[2],
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
  uploadOption: {
    flex: 1,
    marginHorizontal: SIZING.xs,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    backgroundColor: COLORS.muted,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    gap: SIZING[2],
  },
  uploadText: {
    fontSize: FONT.sizes.sm,
    color: COLORS.mutedForeground,
    textAlign: 'center',
    fontWeight: '500',
  },
  templateImage: {
    width: '100%',
    height: imageWidth,
    backgroundColor: COLORS.muted,
  },
  templateName: {
    padding: SIZING.sm,
    fontSize: FONT.sizes.sm,
    fontWeight: FONT.weights.medium,
    color: COLORS.text,
    textAlign: 'center',
    minHeight: 40, // Ensure consistent height for text area
  },
});

export default styles;
