import { StyleSheet, TextStyle } from 'react-native';
import { SPACING, FONT, COLORS, NO_PADDING } from '../../constants/theme';
import { createShadow } from '../../libs/shadowUtils';

export default StyleSheet.create({
  draggable: {
    position: 'absolute',
    minWidth: 100,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: FONT.sizes['2xl'],
    fontWeight: FONT.weights.bold,
    textAlign: 'center',
    color: COLORS.foreground,
    ...NO_PADDING,
  },
  bordered: {
    borderWidth: 1,
    borderColor: COLORS.ring,
    borderStyle: 'dashed',
  },
});
