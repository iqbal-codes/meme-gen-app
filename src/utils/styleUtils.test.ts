import {
  variants,
  sizes,
  states,
  calculateFlatListItemWidth,
  getFlatListItemDimensions,
} from './styleUtils';

// Mock constants
jest.mock('@/constants', () => ({
  COLORS: {
    primary: '#007AFF',
    primaryForeground: '#FFFFFF',
    secondary: '#5856D6',
    secondaryForeground: '#FFFFFF',
    destructive: '#FF3B30',
    destructiveForeground: '#FFFFFF',
    border: '#C7C7CC',
    foreground: '#000000',
    background: '#FFFFFF',
    input: '#E5E5EA',
    muted: '#F2F2F7',
    ring: '#007AFF',
  },
  RADIUS: {
    sm: 4,
    md: 8,
    lg: 12,
  },
  SIZING: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    8: 32,
    10: 40,
    12: 48,
  },
  FONT: {
    sizes: {
      sm: 14,
      base: 16,
      lg: 18,
    },
  },
  SCREEN_WIDTH: 375,
}));

describe('styleUtils', () => {
  describe('variants', () => {
    describe('button variants', () => {
      it('should have correct default button variant', () => {
        expect(variants.button.default).toEqual({
          backgroundColor: '#007AFF',
          color: '#FFFFFF',
        });
      });

      it('should have correct secondary button variant', () => {
        expect(variants.button.secondary).toEqual({
          backgroundColor: '#5856D6',
          color: '#FFFFFF',
        });
      });

      it('should have correct destructive button variant', () => {
        expect(variants.button.destructive).toEqual({
          backgroundColor: '#FF3B30',
          color: '#FFFFFF',
        });
      });

      it('should have correct outline button variant', () => {
        expect(variants.button.outline).toEqual({
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: '#C7C7CC',
          color: '#000000',
        });
      });

      it('should have correct ghost button variant', () => {
        expect(variants.button.ghost).toEqual({
          backgroundColor: 'transparent',
          color: '#000000',
        });
      });

      it('should have correct link button variant', () => {
        expect(variants.button.link).toEqual({
          backgroundColor: 'transparent',
          color: '#007AFF',
          textDecorationLine: 'underline',
        });
      });
    });

    describe('input variants', () => {
      it('should have correct default input variant', () => {
        expect(variants.input.default).toEqual({
          backgroundColor: '#FFFFFF',
          borderWidth: 1,
          borderColor: '#E5E5EA',
          color: '#000000',
        });
      });

      it('should have correct filled input variant', () => {
        expect(variants.input.filled).toEqual({
          backgroundColor: '#F2F2F7',
          borderWidth: 1,
          borderColor: 'transparent',
          color: '#000000',
        });
      });
    });
  });

  describe('sizes', () => {
    describe('button sizes', () => {
      it('should have correct small button size', () => {
        expect(sizes.button.sm).toEqual({
          paddingVertical: 4,
          paddingHorizontal: 12,
          fontSize: 14,
          borderRadius: 4,
        });
      });

      it('should have correct medium button size', () => {
        expect(sizes.button.md).toEqual({
          paddingVertical: 8,
          paddingHorizontal: 16,
          fontSize: 16,
          borderRadius: 8,
        });
      });

      it('should have correct large button size', () => {
        expect(sizes.button.lg).toEqual({
          paddingVertical: 12,
          paddingHorizontal: 20,
          fontSize: 18,
          borderRadius: 8,
        });
      });

      it('should have correct icon button size', () => {
        expect(sizes.button.icon).toEqual({
          width: 40,
          height: 40,
          borderRadius: 8,
          padding: 0,
        });
      });
    });

    describe('input sizes', () => {
      it('should have correct small input size', () => {
        expect(sizes.input.sm).toEqual({
          height: 32,
          paddingHorizontal: 12,
          fontSize: 14,
          borderRadius: 4,
        });
      });

      it('should have correct medium input size', () => {
        expect(sizes.input.md).toEqual({
          height: 40,
          paddingHorizontal: 16,
          fontSize: 16,
          borderRadius: 8,
        });
      });

      it('should have correct large input size', () => {
        expect(sizes.input.lg).toEqual({
          height: 48,
          paddingHorizontal: 20,
          fontSize: 18,
          borderRadius: 8,
        });
      });
    });
  });

  describe('states', () => {
    it('should have correct disabled state', () => {
      expect(states.disabled).toEqual({
        opacity: 0.6,
      });
    });

    it('should have correct loading state', () => {
      expect(states.loading).toEqual({
        opacity: 0.8,
      });
    });

    it('should have correct focused state', () => {
      expect(states.focused).toEqual({
        borderColor: '#007AFF',
      });
    });

    it('should have correct error state', () => {
      expect(states.error).toEqual({
        borderColor: '#FF3B30',
      });
    });
  });

  describe('calculateFlatListItemWidth', () => {
    it('should calculate correct width for single column', () => {
      const result = calculateFlatListItemWidth({
        numColumns: 1,
        gap: 0,
        containerPadding: 0,
        screenWidth: 375,
      });

      expect(result).toBe(375);
    });

    it('should calculate correct width for two columns with no gap', () => {
      const result = calculateFlatListItemWidth({
        numColumns: 2,
        gap: 0,
        containerPadding: 0,
        screenWidth: 375,
      });

      expect(result).toBe(187); // Math.floor(375 / 2)
    });

    it('should calculate correct width for two columns with gap', () => {
      const result = calculateFlatListItemWidth({
        numColumns: 2,
        gap: 10,
        containerPadding: 0,
        screenWidth: 375,
      });

      expect(result).toBe(182); // Math.floor((375 - 10) / 2)
    });

    it('should calculate correct width with container padding', () => {
      const result = calculateFlatListItemWidth({
        numColumns: 2,
        gap: 10,
        containerPadding: 20,
        screenWidth: 375,
      });

      expect(result).toBe(162); // Math.floor((375 - 40 - 10) / 2)
    });

    it('should calculate correct width for three columns', () => {
      const result = calculateFlatListItemWidth({
        numColumns: 3,
        gap: 5,
        containerPadding: 15,
        screenWidth: 375,
      });

      expect(result).toBe(111); // Math.floor((375 - 30 - 10) / 3)
    });

    it('should use default screen width when not provided', () => {
      const result = calculateFlatListItemWidth({
        numColumns: 1,
      });

      expect(result).toBe(375); // Using mocked SCREEN_WIDTH
    });

    it('should handle zero gap and padding', () => {
      const result = calculateFlatListItemWidth({
        numColumns: 4,
        gap: 0,
        containerPadding: 0,
        screenWidth: 400,
      });

      expect(result).toBe(100); // Math.floor(400 / 4)
    });
  });

  describe('getFlatListItemDimensions', () => {
    it('should return square dimensions by default', () => {
      const result = getFlatListItemDimensions({
        numColumns: 2,
        gap: 10,
        containerPadding: 0,
        screenWidth: 375,
      });

      expect(result).toEqual({
        width: 182,
        height: 182,
      });
    });

    it('should calculate correct dimensions with custom aspect ratio', () => {
      const result = getFlatListItemDimensions({
        numColumns: 2,
        gap: 10,
        containerPadding: 0,
        aspectRatio: 16 / 9, // Landscape
        screenWidth: 375,
      });

      expect(result).toEqual({
        width: 182,
        height: 102, // Math.floor(182 / (16/9))
      });
    });

    it('should calculate correct dimensions with portrait aspect ratio', () => {
      const result = getFlatListItemDimensions({
        numColumns: 3,
        gap: 5,
        containerPadding: 10,
        aspectRatio: 9 / 16, // Portrait
        screenWidth: 375,
      });

      expect(result).toEqual({
        width: 115, // Math.floor((375 - 20 - 10) / 3) = Math.floor(345/3) = 115
        height: 204, // Math.floor(115 / (9/16)) = Math.floor(115 * 16/9) = 204
      });
    });

    it('should handle single column layout', () => {
      const result = getFlatListItemDimensions({
        numColumns: 1,
        gap: 0,
        containerPadding: 20,
        aspectRatio: 4 / 3,
        screenWidth: 375,
      });

      expect(result).toEqual({
        width: 335, // 375 - 40
        height: 251, // Math.floor(335 / (4/3))
      });
    });

    it('should use default values when not provided', () => {
      const result = getFlatListItemDimensions({
        numColumns: 2,
      });

      expect(result).toEqual({
        width: 187, // Math.floor(375 / 2)
        height: 187,
      });
    });

    it('should handle very small aspect ratios', () => {
      const result = getFlatListItemDimensions({
        numColumns: 1,
        aspectRatio: 0.1, // Very tall
        screenWidth: 100,
      });

      expect(result).toEqual({
        width: 100,
        height: 1000, // Math.floor(100 / 0.1)
      });
    });

    it('should handle very large aspect ratios', () => {
      const result = getFlatListItemDimensions({
        numColumns: 1,
        aspectRatio: 10, // Very wide
        screenWidth: 100,
      });

      expect(result).toEqual({
        width: 100,
        height: 10, // Math.floor(100 / 10)
      });
    });
  });
});