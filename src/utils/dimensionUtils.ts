import { EDITOR_CONFIG } from '@/pages/MemeEditor/constants';
import { CanvasElement, ElementDimensions } from '@/types';

// Default dimensions for different element types
const DEFAULT_DIMENSIONS = {
  text: { width: EDITOR_CONFIG.DEFAULT_TEXT_WIDTH, height: EDITOR_CONFIG.DEFAULT_TEXT_HEIGHT },
  image: { width: EDITOR_CONFIG.DEFAULT_IMAGE_WIDTH, height: EDITOR_CONFIG.DEFAULT_IMAGE_HEIGHT },
} as const;

/**
 * Get default dimensions based on element type
 */
export const getDefaultDimensions = (element: CanvasElement): ElementDimensions =>
  DEFAULT_DIMENSIONS[element.type] || DEFAULT_DIMENSIONS.text;


/**
 * Validate and normalize dimensions
 */
export const normalizeDimensions = (
  dimensions: Partial<ElementDimensions>,
  fallback: ElementDimensions,
): ElementDimensions => ({
  width: dimensions.width && dimensions.width > 0 ? dimensions.width : fallback.width,
  height: dimensions.height && dimensions.height > 0 ? dimensions.height : fallback.height,
});

/**
 * Check if dimensions are valid
 */
export const isValidDimensions = (dimensions?: Partial<ElementDimensions>): boolean =>
  !!(dimensions?.width && dimensions.width > 0 && dimensions?.height && dimensions.height > 0);
