import { renderHook, waitFor } from '@testing-library/react-native';
import { Image } from 'react-native';
import useImageHeight from './useImageHeight';
import { useConfirmation } from '@/contexts';

// Mock the dependencies
jest.mock('@/contexts', () => ({
  useConfirmation: jest.fn(),
}));

jest.mock('@/constants', () => ({
  SCREEN_WIDTH: 375,
  SIZING: {
    md: 16,
  },
}));

// Mock React Native Image
jest.mock('react-native', () => ({
  Image: {
    resolveAssetSource: jest.fn(),
    getSize: jest.fn(),
  },
}));

const mockUseConfirmation = useConfirmation as jest.MockedFunction<typeof useConfirmation>;
const mockImage = Image as jest.Mocked<typeof Image>;

describe('useImageHeight', () => {
  const mockShowConfirmation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseConfirmation.mockReturnValue({
      showConfirmation: mockShowConfirmation,
    });
  });

  it('returns 0 when no image source is provided', () => {
    const { result } = renderHook(() => useImageHeight());

    expect(result.current).toBe(0);
  });

  it('calculates height for static local images', async () => {
    const mockAssetSource = {
      width: 400,
      height: 300,
      uri: 'test-uri',
      scale: 1,
    };

    mockImage.resolveAssetSource.mockReturnValue(mockAssetSource);

    const { result } = renderHook(() => useImageHeight(123)); // number represents require('./image.png')

    await waitFor(() => {
      // Expected calculation: (SCREEN_WIDTH - SIZING.md * 2) / aspectRatio
      // (375 - 16 * 2) / (400 / 300) = 343 / 1.333 ≈ 257.25
      const expectedHeight = (375 - 16 * 2) / (400 / 300);
      expect(result.current).toBeCloseTo(expectedHeight, 1);
    });

    expect(mockImage.resolveAssetSource).toHaveBeenCalledWith(123);
  });

  it('handles static images with invalid dimensions', async () => {
    const mockAssetSource = {
      width: 0,
      height: 0,
      uri: 'test-uri',
      scale: 1,
    };

    mockImage.resolveAssetSource.mockReturnValue(mockAssetSource);

    const { result } = renderHook(() => useImageHeight(123));

    await waitFor(() => {
      expect(result.current).toBe(0);
    });
  });

  it('calculates height for URI images successfully', async () => {
    const imageSource = { uri: 'https://example.com/image.jpg' };

    // Mock successful Image.getSize call
    mockImage.getSize.mockImplementation((uri, successCallback) => {
      successCallback(800, 600); // width: 800, height: 600
    });

    const { result } = renderHook(() => useImageHeight(imageSource));

    await waitFor(() => {
      // Expected calculation: (375 - 16 * 2) / (800 / 600) = 343 / 1.333 ≈ 257.25
      const expectedHeight = (375 - 16 * 2) / (800 / 600);
      expect(result.current).toBeCloseTo(expectedHeight, 1);
    });

    expect(mockImage.getSize).toHaveBeenCalledWith(
      'https://example.com/image.jpg',
      expect.any(Function),
      expect.any(Function),
    );
  });

  it('handles URI image loading errors', async () => {
    const imageSource = { uri: 'https://example.com/invalid-image.jpg' };
    const errorMessage = 'Network request failed';

    // Mock failed Image.getSize call
    mockImage.getSize.mockImplementation((uri, successCallback, errorCallback) => {
      errorCallback!({ message: errorMessage });
    });

    const { result } = renderHook(() => useImageHeight(imageSource));

    await waitFor(() => {
      expect(result.current).toBe(0);
    });

    expect(mockShowConfirmation).toHaveBeenCalledWith({
      title: 'Get Image Size Error',
      message: `Couldn't get image size: ${errorMessage}`,
      showCancel: false,
    });
  });

  it('recalculates when image source changes', async () => {
    const initialSource = { uri: 'https://example.com/image1.jpg' };
    const newSource = { uri: 'https://example.com/image2.jpg' };

    let callCount = 0;
    mockImage.getSize.mockImplementation((uri, successCallback) => {
      callCount += 1;
      if (uri === initialSource.uri) {
        successCallback(400, 300);
      } else if (uri === newSource.uri) {
        successCallback(800, 400);
      }
    });

    const { result, rerender } = renderHook(({ source }) => useImageHeight(source), {
      initialProps: { source: initialSource },
    });

    await waitFor(() => {
      const expectedHeight1 = (375 - 16 * 2) / (400 / 300);
      expect(result.current).toBeCloseTo(expectedHeight1, 1);
    });

    // Change the image source
    rerender({ source: newSource });

    await waitFor(() => {
      const expectedHeight2 = (375 - 16 * 2) / (800 / 400);
      expect(result.current).toBeCloseTo(expectedHeight2, 1);
    });

    expect(callCount).toBe(2);
  });

  it('handles undefined image source after having a source', async () => {
    const initialSource = { uri: 'https://example.com/image.jpg' };

    mockImage.getSize.mockImplementation((uri, successCallback) => {
      successCallback(400, 300);
    });

    const { result, rerender } = renderHook(({ source }) => useImageHeight(source), {
      initialProps: { source: initialSource },
    });

    await waitFor(() => {
      expect(result.current).toBeGreaterThan(0);
    });

    // Remove the image source
    rerender({ source: { uri: '' } });

    await waitFor(() => {
      expect(result.current).toBeGreaterThan(0); // Should keep the last calculated height
    });
  });

  it('handles image source object without uri', async () => {
    const invalidSource = { width: 100, height: 100 } as const;

    const { result } = renderHook(() => useImageHeight(invalidSource));

    await waitFor(() => {
      expect(result.current).toBe(0);
    });

    expect(mockImage.getSize).not.toHaveBeenCalled();
  });

  it('calculates correct aspect ratio for square images', async () => {
    const imageSource = { uri: 'https://example.com/square.jpg' };

    mockImage.getSize.mockImplementation((uri, successCallback) => {
      successCallback(500, 500); // Square image
    });

    const { result } = renderHook(() => useImageHeight(imageSource));

    await waitFor(() => {
      // Expected calculation: (375 - 16 * 2) / (500 / 500) = 343 / 1 = 343
      const expectedHeight = 375 - 16 * 2;
      expect(result.current).toBe(expectedHeight);
    });
  });

  it('calculates correct aspect ratio for tall images', async () => {
    const imageSource = { uri: 'https://example.com/tall.jpg' };

    mockImage.getSize.mockImplementation((uri, successCallback) => {
      successCallback(300, 600); // Tall image (aspect ratio 0.5)
    });

    const { result } = renderHook(() => useImageHeight(imageSource));

    await waitFor(() => {
      // Expected calculation: (375 - 16 * 2) / (300 / 600) = 343 / 0.5 = 686
      const expectedHeight = (375 - 16 * 2) / (300 / 600);
      expect(result.current).toBe(expectedHeight);
    });
  });
});
