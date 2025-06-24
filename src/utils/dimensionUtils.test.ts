/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDefaultDimensions, normalizeDimensions, isValidDimensions } from './dimensionUtils';
import { CanvasElement, ElementDimensions } from '@/types';

// Mock the EDITOR_CONFIG constants
jest.mock('@/pages/MemeEditor/constants', () => ({
  EDITOR_CONFIG: {
    DEFAULT_TEXT_WIDTH: 100,
    DEFAULT_TEXT_HEIGHT: 36,
    DEFAULT_IMAGE_WIDTH: 150,
    DEFAULT_IMAGE_HEIGHT: 150,
  },
}));

describe('dimensionUtils', () => {
  describe('getDefaultDimensions', () => {
    it('should return text dimensions for text element', () => {
      const textElement: CanvasElement = {
        id: '1',
        type: 'text',
        text: 'Sample text',
        x: 0,
        y: 0,
      };

      const result = getDefaultDimensions(textElement);

      expect(result).toEqual({
        width: 100,
        height: 36,
      });
    });

    it('should return image dimensions for image element', () => {
      const imageElement: CanvasElement = {
        id: '2',
        type: 'image',
        imageUri: 'https://example.com/image.jpg',
        x: 0,
        y: 0,
      };

      const result = getDefaultDimensions(imageElement);

      expect(result).toEqual({
        width: 150,
        height: 150,
      });
    });

    it('should return text dimensions for unknown element type', () => {
      const unknownElement = {
        id: '3',
        type: 'unknown' as any,
        x: 0,
        y: 0,
      };

      const result = getDefaultDimensions(unknownElement);

      expect(result).toEqual({
        width: 100,
        height: 36,
      });
    });
  });

  describe('normalizeDimensions', () => {
    const fallbackDimensions: ElementDimensions = {
      width: 200,
      height: 100,
    };

    it('should use provided dimensions when valid', () => {
      const dimensions = {
        width: 300,
        height: 150,
      };

      const result = normalizeDimensions(dimensions, fallbackDimensions);

      expect(result).toEqual({
        width: 300,
        height: 150,
      });
    });

    it('should use fallback width when provided width is invalid', () => {
      const dimensions = {
        width: 0,
        height: 150,
      };

      const result = normalizeDimensions(dimensions, fallbackDimensions);

      expect(result).toEqual({
        width: 200,
        height: 150,
      });
    });

    it('should use fallback height when provided height is invalid', () => {
      const dimensions = {
        width: 300,
        height: -10,
      };

      const result = normalizeDimensions(dimensions, fallbackDimensions);

      expect(result).toEqual({
        width: 300,
        height: 100,
      });
    });

    it('should use fallback dimensions when both are invalid', () => {
      const dimensions = {
        width: 0,
        height: 0,
      };

      const result = normalizeDimensions(dimensions, fallbackDimensions);

      expect(result).toEqual({
        width: 200,
        height: 100,
      });
    });

    it('should use fallback dimensions when dimensions are undefined', () => {
      const dimensions = {
        width: undefined as any,
        height: undefined as any,
      };

      const result = normalizeDimensions(dimensions, fallbackDimensions);

      expect(result).toEqual({
        width: 200,
        height: 100,
      });
    });

    it('should handle partial dimensions object', () => {
      const dimensions = {
        width: 300,
      };

      const result = normalizeDimensions(dimensions, fallbackDimensions);

      expect(result).toEqual({
        width: 300,
        height: 100,
      });
    });
  });

  describe('isValidDimensions', () => {
    it('should return true for valid dimensions', () => {
      const dimensions = {
        width: 100,
        height: 50,
      };

      const result = isValidDimensions(dimensions);

      expect(result).toBe(true);
    });

    it('should return false for zero width', () => {
      const dimensions = {
        width: 0,
        height: 50,
      };

      const result = isValidDimensions(dimensions);

      expect(result).toBe(false);
    });

    it('should return false for zero height', () => {
      const dimensions = {
        width: 100,
        height: 0,
      };

      const result = isValidDimensions(dimensions);

      expect(result).toBe(false);
    });

    it('should return false for negative width', () => {
      const dimensions = {
        width: -10,
        height: 50,
      };

      const result = isValidDimensions(dimensions);

      expect(result).toBe(false);
    });

    it('should return false for negative height', () => {
      const dimensions = {
        width: 100,
        height: -20,
      };

      const result = isValidDimensions(dimensions);

      expect(result).toBe(false);
    });

    it('should return false for undefined dimensions', () => {
      const result = isValidDimensions(undefined);

      expect(result).toBe(false);
    });

    it('should return false for empty object', () => {
      const dimensions = {};

      const result = isValidDimensions(dimensions);

      expect(result).toBe(false);
    });

    it('should return false for missing width', () => {
      const dimensions = {
        height: 50,
      };

      const result = isValidDimensions(dimensions);

      expect(result).toBe(false);
    });

    it('should return false for missing height', () => {
      const dimensions = {
        width: 100,
      };

      const result = isValidDimensions(dimensions);

      expect(result).toBe(false);
    });
  });
});