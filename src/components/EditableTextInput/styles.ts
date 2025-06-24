import { StyleSheet } from 'react-native';
import { COLORS } from '@/constants';

export default StyleSheet.create({
  input: {
    color: COLORS.foreground,
    textAlignVertical: 'center',
  },
  bordered: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.primary,
    backgroundColor: COLORS.background,
  },
});
