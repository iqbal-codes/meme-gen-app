import { StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT, RADIUS } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    paddingBottom: SPACING.xl + 20, // Extra padding for bottom safe area
    maxHeight: '60%',
    minHeight: '40%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: FONT.sizes.lg,
    fontWeight: FONT.weights.bold,
    color: COLORS.foreground,
  },
  content: {
    padding: SPACING.md,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT.sizes.base,
    fontWeight: FONT.weights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.xs,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.sm,
    margin: SPACING.xs,
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
    marginHorizontal: -SPACING.xs,
  },
  fontSizeOption: {
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RADIUS.sm,
    margin: SPACING.xs,
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
    marginHorizontal: -SPACING.xs,
  },
  buttonColumn: {
    marginHorizontal: -SPACING.xs,
  },
  styleButton: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RADIUS.sm,
    margin: SPACING.xs,
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
