import { CanvasElement } from '../types';

import { ElementDimensions } from '../types/elements';

// Default dimensions for different element types
const DEFAULT_DIMENSIONS = {
  text: { width: 100, height: 36 },
  image: { width: 200, height: 200 },
} as const;

/**
 * Get default dimensions based on element type
 */
export const getDefaultDimensions = (element: CanvasElement): ElementDimensions => {
  return DEFAULT_DIMENSIONS[element.type] || DEFAULT_DIMENSIONS.text;
};

/**
 * Calculate scaled dimensions
 */
export const getScaledDimensions = (
  dimensions: ElementDimensions,
  scale: number
): ElementDimensions => {
  return {
    width: dimensions.width * scale,
    height: dimensions.height * scale,
  };
};

/**
 * Validate and normalize dimensions
 */
export const normalizeDimensions = (
  dimensions: Partial<ElementDimensions>,
  fallback: ElementDimensions
): ElementDimensions => {
  return {
    width: dimensions.width && dimensions.width > 0 ? dimensions.width : fallback.width,
    height: dimensions.height && dimensions.height > 0 ? dimensions.height : fallback.height,
  };
};

/**
 * Check if dimensions are valid
 */
export const isValidDimensions = (dimensions?: Partial<ElementDimensions>): boolean => {
  return !!(dimensions?.width && dimensions.width > 0 && dimensions?.height && dimensions.height > 0);
};