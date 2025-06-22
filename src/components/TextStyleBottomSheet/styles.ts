import { StyleSheet } from 'react-native';
import { COLORS, SIZING, FONT, RADIUS } from '../../constants/theme';

const styles = StyleSheet.create({
  section: {
    marginBottom: SIZING.lg,
  },
  sectionTitle: {
    fontSize: FONT.sizes.base,
    fontWeight: FONT.weights.semibold,
    color: COLORS.text,
    marginBottom: SIZING.sm,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SIZING.xs,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.sm,
    margin: SIZING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  fontSizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SIZING.xs,
  },
  fontSizeOption: {
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RADIUS.sm,
    margin: SIZING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  selectedFontSize: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '20', // 20% opacity
  },
  fontSizeText: {
    fontSize: FONT.sizes.sm,
    color: COLORS.text,
  },
  buttonRow: {
    flexDirection: 'row',
    marginHorizontal: -SIZING.xs,
  },
  buttonColumn: {
    marginHorizontal: -SIZING.xs,
  },
  styleButton: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RADIUS.sm,
    margin: SIZING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  selectedButton: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '20', // 20% opacity
  },
  buttonText: {
    fontSize: FONT.sizes.sm,
    color: COLORS.text,
  },
});

export default styles;
