import { StyleSheet } from 'react-native';
import {
  COLORS,
  SIZING,
  FONT,
  RADIUS,
  BOX_SHADOWS,
} from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    padding: SIZING[4],
    gap: SIZING[2],
  },
  section: {
    marginVertical: SIZING[1],
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: SIZING[4],
    padding: SIZING[4],
    boxShadow: BOX_SHADOWS.md,
  },
  buttonWrapper: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: FONT.sizes.base,
    fontWeight: FONT.weights.semibold,
    color: COLORS.text,
    marginBottom: SIZING[2],
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SIZING.xs,
  },
  colorOption: {
    width: SIZING[10],
    height: SIZING[10],
    borderRadius: RADIUS.full,
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
    backgroundColor: COLORS.primary + '20',
  },
  fontSizeText: {
    fontSize: FONT.sizes.sm,
    color: COLORS.text,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZING[3],
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
    backgroundColor: COLORS.primary + '20',
  },
  buttonText: {
    fontSize: FONT.sizes.sm,
    color: COLORS.text,
  },
  // New slider styles
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZING[3],
  },
  slider: {
    width: '100%',
  },
  sliderThumb: {
    backgroundColor: COLORS.primary,
    width: 20,
    height: 20,
  },
  sliderValue: {
    fontSize: FONT.sizes.sm,
    fontWeight: FONT.weights.medium,
    color: COLORS.text,
    minWidth: 40,
    textAlign: 'center',
  },
});

export default styles;
