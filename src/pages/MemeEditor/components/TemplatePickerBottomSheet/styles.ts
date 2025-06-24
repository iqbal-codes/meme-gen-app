import { StyleSheet } from 'react-native';
import { COLORS, SIZING, FONT, RADIUS } from '@/constants';
import { calculateFlatListItemWidth } from '@/utils';

const imageWidth = calculateFlatListItemWidth({
  numColumns: 2,
  containerPadding: SIZING[3],
  gap: SIZING[2],
});

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: SIZING[3],
    paddingTop: SIZING[3],
    paddingBottom: SIZING[2],
  },
  searchInput: {
    height: 44,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SIZING[3],
    fontSize: FONT.sizes.sm,
    color: COLORS.text,
    backgroundColor: COLORS.background,
    marginBottom: SIZING[1],
  },
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
