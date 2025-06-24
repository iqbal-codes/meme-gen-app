import { StyleSheet } from 'react-native';
import { SIZING, FONT, COLORS, NO_PADDING } from '@/constants';

export default StyleSheet.create({
  draggable: {
    position: 'absolute',
    minWidth: 100,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...NO_PADDING,
    fontSize: FONT.sizes['2xl'],
    color: COLORS.foreground,
    paddingLeft: SIZING[2],
    paddingRight: SIZING[2],
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: SIZING[1],
  },
  bordered: {
    borderWidth: 1,
    borderColor: COLORS.ring,
    borderStyle: 'dashed',
  },
  imageContainer: {
    overflow: 'hidden',
  },
});
