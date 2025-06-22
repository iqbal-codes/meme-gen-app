import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../constants/theme';
import { calculateFlatListItemWidth } from '../../libs/styleUtils';

const photoSize = calculateFlatListItemWidth({ numColumns: 3, containerPadding: SPACING[3], gap: SPACING[2] });

export default StyleSheet.create({
  columnWrapper: {
    gap: SPACING[2],
  },
  container: {
    gap: SPACING[2],
    padding: SPACING[3],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING[2],
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
