import { renderHook, act } from '@testing-library/react-native';
import useElementDimensions, { __dimensionCache } from './useElementDimensions';
import { CanvasElement } from '@/types';
import * as utils from '@/utils';

// Mock the utils
jest.mock('@/utils', () => ({
  getDefaultDimensions: jest.fn(),
  normalizeDimensions: jest.fn(),
  isValidDimensions: jest.fn(),
}));

const mockUtils = utils as jest.Mocked<typeof utils>;

describe('useElementDimensions', () => {
  const mockElement: CanvasElement = {
    id: 'test-element-1',
    type: 'text',
    dimensions: { width: 100, height: 50 },
    x: 0,
    y: 0,
  };

  const mockDefaultDimensions = { width: 200, height: 100 };
  const mockNormalizedDimensions = { width: 150, height: 75 };

  beforeEach(() => {
    jest.clearAllMocks();
    __dimensionCache.clear(); // Clear the dimension cache between tests
    mockUtils.getDefaultDimensions.mockReturnValue(mockDefaultDimensions);
    mockUtils.normalizeDimensions.mockReturnValue(mockNormalizedDimensions);
    mockUtils.isValidDimensions.mockReturnValue(true);
  });

  it('returns default dimensions when no measured dimensions exist', () => {
    mockUtils.isValidDimensions.mockReturnValue(false);

    const { result } = renderHook(() => useElementDimensions({ element: mockElement }));

    expect(result.current.dimensions).toEqual(mockDefaultDimensions);
    expect(result.current.hasMeasured).toBe(false);
    expect(result.current.isLoading).toBe(true); // autoMeasure is true by default
    expect(mockUtils.getDefaultDimensions).toHaveBeenCalledWith(mockElement);
  });

  it('returns normalized dimensions when element has valid dimensions', () => {
    mockUtils.isValidDimensions.mockReturnValue(true);

    const { result } = renderHook(() => useElementDimensions({ element: mockElement }));

    expect(result.current.dimensions).toEqual(mockNormalizedDimensions);
    expect(mockUtils.normalizeDimensions).toHaveBeenCalledWith(
      mockElement.dimensions,
      mockDefaultDimensions,
    );
  });

  it('handles onLayout event correctly', () => {
    const { result } = renderHook(() => useElementDimensions({ element: mockElement }));

    const layoutEvent = {
      nativeEvent: {
        layout: { width: 300, height: 150 },
      },
    };

    act(() => {
      result.current.onLayout(layoutEvent);
    });

    expect(result.current.hasMeasured).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.measuredDimensions).toEqual({
      width: 300,
      height: 150,
      measured: true,
      timestamp: expect.any(Number),
    });
  });

  it('ignores invalid layout dimensions', () => {
    mockUtils.isValidDimensions.mockImplementation(dims => dims!.width! > 0 && dims!.height! > 0);

    const { result } = renderHook(() => useElementDimensions({ element: mockElement }));

    const invalidLayoutEvent = {
      nativeEvent: {
        layout: { width: 0, height: 0 },
      },
    };

    act(() => {
      result.current.onLayout(invalidLayoutEvent);
    });

    expect(result.current.hasMeasured).toBe(false);
    expect(result.current.measuredDimensions).toBeUndefined();
  });

  it('does not auto-measure when autoMeasure is false', () => {
    const { result } = renderHook(() =>
      useElementDimensions({ element: mockElement, autoMeasure: false }),
    );

    expect(result.current.isLoading).toBe(false);
  });

  it('uses measured dimensions when available', () => {
    const { result } = renderHook(() => useElementDimensions({ element: mockElement }));

    const layoutEvent = {
      nativeEvent: {
        layout: { width: 300, height: 150 },
      },
    };

    act(() => {
      result.current.onLayout(layoutEvent);
    });

    // After measurement, dimensions should come from measured values
    expect(result.current.dimensions).toEqual({ width: 300, height: 150 });
  });

  it('caches dimensions correctly', () => {
    const { result: result1 } = renderHook(() => useElementDimensions({ element: mockElement }));

    const layoutEvent = {
      nativeEvent: {
        layout: { width: 300, height: 150 },
      },
    };

    act(() => {
      result1.current.onLayout(layoutEvent);
    });

    // Create a new hook instance with the same element ID
    const { result: result2 } = renderHook(() => useElementDimensions({ element: mockElement }));

    // Should use cached dimensions
    expect(result2.current.dimensions).toEqual({ width: 300, height: 150 });
    expect(result2.current.hasMeasured).toBe(true);
  });

  it('handles element changes correctly', () => {
    const { rerender } = renderHook(({ element }) => useElementDimensions({ element }), {
      initialProps: { element: mockElement },
    });

    const newElement: CanvasElement = {
      ...mockElement,
      id: 'test-element-2',
      dimensions: { width: 400, height: 200 },
    };

    rerender({ element: newElement });

    expect(mockUtils.getDefaultDimensions).toHaveBeenCalledWith(newElement);
  });

  it('handles missing element dimensions', () => {
    const elementWithoutDimensions: CanvasElement = {
      ...mockElement,
      dimensions: undefined,
    };

    mockUtils.isValidDimensions.mockReturnValue(false);

    const { result } = renderHook(() =>
      useElementDimensions({ element: elementWithoutDimensions }),
    );

    expect(result.current.dimensions).toEqual(mockDefaultDimensions);
    expect(mockUtils.getDefaultDimensions).toHaveBeenCalledWith(elementWithoutDimensions);
  });

  it('provides stable onLayout callback', () => {
    const { result, rerender } = renderHook(() => useElementDimensions({ element: mockElement }));

    const firstOnLayout = result.current.onLayout;

    rerender({ element: mockElement });

    const secondOnLayout = result.current.onLayout;

    expect(firstOnLayout).toBe(secondOnLayout);
  });
});
