import { useState, useCallback } from 'react';
import { CanvasElement, ElementDimensions, MeasuredDimensions } from '@/types';
import { getDefaultDimensions, normalizeDimensions, isValidDimensions } from '@/utils';

interface UseElementDimensionsProps {
  element: CanvasElement;
  autoMeasure?: boolean;
}

interface UseElementDimensionsReturn {
  dimensions: ElementDimensions;
  measuredDimensions?: MeasuredDimensions;
  onLayout: (event: { nativeEvent: { layout: { width: number; height: number } } }) => void;
  isLoading: boolean;
  hasMeasured: boolean;
}

// Cache for measured dimensions
const dimensionCache = new Map<string, MeasuredDimensions>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const useElementDimensions = ({
  element,
  autoMeasure = true,
}: UseElementDimensionsProps): UseElementDimensionsReturn => {
  const [measuredDimensions, setMeasuredDimensions] = useState<MeasuredDimensions | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  // Get cached dimensions
  const getCachedDimensions = useCallback((elementId: string): MeasuredDimensions | undefined => {
    const cached = dimensionCache.get(elementId);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached;
    }
    if (cached) {
      dimensionCache.delete(elementId);
    }
    return undefined;
  }, []);

  // Cache dimensions
  const cacheDimensions = useCallback((elementId: string, dimensions: ElementDimensions) => {
    const measured: MeasuredDimensions = {
      ...dimensions,
      measured: true,
      timestamp: Date.now(),
    };
    dimensionCache.set(elementId, measured);
    return measured;
  }, []);

  // Handle layout measurement
  const onLayout = useCallback(
    (event: { nativeEvent: { layout: { width: number; height: number } } }) => {
      const { width, height } = event.nativeEvent.layout;

      if (isValidDimensions({ width, height })) {
        const measured = cacheDimensions(element.id, { width, height });
        setMeasuredDimensions(measured);
        setIsLoading(false);
      }
    },
    [element.id, cacheDimensions],
  );

  // Get current dimensions
  const getCurrentDimensions = useCallback((): ElementDimensions => {
    // 1. Use measured dimensions if available
    if (measuredDimensions?.measured) {
      return {
        width: measuredDimensions.width,
        height: measuredDimensions.height,
      };
    }

    // 2. Check cache
    const cached = getCachedDimensions(element.id);
    if (cached) {
      setMeasuredDimensions(cached);
      return { width: cached.width, height: cached.height };
    }

    // 3. Use element's stored dimensions if valid
    if (isValidDimensions(element.dimensions)) {
      return normalizeDimensions(element.dimensions!, getDefaultDimensions(element));
    }

    // 4. Fall back to defaults
    return getDefaultDimensions(element);
  }, [element, measuredDimensions, getCachedDimensions]);

  // Initialize dimensions
  const dimensions = getCurrentDimensions();
  const hasMeasured = !!measuredDimensions?.measured;

  // Auto-measure if needed
  if (autoMeasure && !hasMeasured && !isLoading) {
    setIsLoading(true);
  }

  return {
    dimensions,
    measuredDimensions,
    onLayout,
    isLoading,
    hasMeasured,
  };
};

export default useElementDimensions;
