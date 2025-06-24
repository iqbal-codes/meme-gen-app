import { StyleSheet } from 'react-native';
import { COLORS, SIZING, FONT, RADIUS } from '@/constants';

export default StyleSheet.create({
  container: {
    paddingHorizontal: SIZING[3],
    paddingTop: SIZING[3],
    paddingBottom: SIZING[3],
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: SIZING[2],
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SIZING[3],
    backgroundColor: COLORS.background,
  },
  input: {
    height: SIZING[12],
    fontSize: FONT.sizes.base,
    color: COLORS.text,
  },
});
