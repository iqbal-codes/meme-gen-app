import { StyleSheet, TextStyle } from 'react-native';
import { SPACING, FONT, COLORS } from '../../constants/theme';
import { createShadow } from '../../libs/shadowUtils';

export default StyleSheet.create({
  draggable: {
    position: 'absolute',
    minWidth: 100,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING[2],
    ...createShadow({ size: 'sm' }),
  },
  text: {
    fontSize: FONT.sizes["2xl"],
    fontWeight: FONT.weights.bold,
    textAlign: 'center',
    color: COLORS.foreground,
  },
});
