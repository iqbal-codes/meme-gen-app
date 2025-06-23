import { StyleSheet } from 'react-native';
import { COLORS, FONT, SIZING } from '@/constants';
import { calculateFlatListItemWidth } from '@/utils';

const photoWidth = calculateFlatListItemWidth({
  numColumns: 3,
  gap: SIZING[1],
});

export default StyleSheet.create({
  columnWrapper: {
    gap: SIZING[1],
  },
  container: {
    gap: SIZING[1],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZING[1],
  },
  title: {
    fontSize: 18,
    fontWeight: FONT.weights.bold,
    color: COLORS.text,
  },
  photoOption: {
    width: photoWidth,
    height: photoWidth, // Keep container square for consistent grid
    overflow: 'hidden',
    backgroundColor: COLORS.secondary,
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
});
