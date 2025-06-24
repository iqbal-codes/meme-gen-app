import { useEffect, useState } from 'react';
import { Image, ImageURISource } from 'react-native';
import { SCREEN_WIDTH, SIZING } from '@/constants';
import { useConfirmation } from '@/contexts';

const useImageHeight = (imageSource?: number | ImageURISource) => {
  const { showConfirmation } = useConfirmation();
  const [imageHeight, setImageHeight] = useState<number>(0);

  useEffect(() => {
    if (!imageSource) {
      return;
    }
    if (typeof imageSource === 'number') {
      // For static local images (e.g., require('./image.png'))
      const imageAsset = Image.resolveAssetSource(imageSource);
      if (imageAsset && imageAsset.width && imageAsset.height) {
        const aspectRatio = imageAsset.width / imageAsset.height;
        const calculatedHeight = (SCREEN_WIDTH - SIZING.md * 2) / aspectRatio;
        setImageHeight(calculatedHeight);
      }
    } else if (typeof imageSource === 'object' && imageSource.uri) {
      Image.getSize(
        imageSource.uri,
        (width, height) => {
          const aspectRatio = width / height;
          const calculatedHeight = (SCREEN_WIDTH - SIZING.md * 2) / aspectRatio;
          setImageHeight(calculatedHeight);
        },
        (error: { message: string }) => {
          console.error(`Couldn't get image size: ${error.message}`);
          // Fallback or error handling
          showConfirmation({
            title: 'Get Image Size Error',
            message: `Couldn't get image size: ${error.message}`,
            showCancel: false,
          });
        },
      );
    }
  }, [imageSource, showConfirmation]); // Recalculate if the image source changes

  return imageHeight;
};

export default useImageHeight;
