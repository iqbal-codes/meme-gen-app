import { StyleSheet } from 'react-native';
import { COLORS, SIZING } from '@/constants';
import { calculateFlatListItemWidth } from '@/utils';

const photoSize = calculateFlatListItemWidth({
  numColumns: 3,
  containerPadding: SIZING[3],
  gap: SIZING[2],
});

export default StyleSheet.create({
  columnWrapper: {
    gap: SIZING[2],
  },
  container: {
    gap: SIZING[2],
    padding: SIZING[3],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZING[2],
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  photoOption: {
    width: photoSize,
    height: photoSize,
    overflow: 'hidden',
    backgroundColor: COLORS.secondary,
  },
  photoImage: {
    width: photoSize,
    height: photoSize,
  },
});
