import { useEffect, useState } from "react";
import { Image, ImageSourcePropType, ImageURISource } from "react-native";
import { SCREEN_WIDTH, SPACING } from "../constants/theme";

const useImageHeight = (imageSource: number | ImageURISource) => {
  const [imageHeight, setImageHeight] = useState<number>(0);

  useEffect(() => {
    if (typeof imageSource === 'number') {
      // For static local images (e.g., require('./image.png'))
      const imageAsset = Image.resolveAssetSource(imageSource);
      if (imageAsset && imageAsset.width && imageAsset.height) {
        const aspectRatio = imageAsset.width / imageAsset.height;
        const calculatedHeight = (SCREEN_WIDTH - SPACING.md * 2) / aspectRatio;
        setImageHeight(calculatedHeight);
      }
    } else if (typeof imageSource === 'object' && imageSource.uri) {
      // For remote images (e.g., { uri: 'http://example.com/image.jpg' })
      Image.getSize(
        imageSource.uri,
        (width, height) => {
          const aspectRatio = width / height;
          const calculatedHeight = (SCREEN_WIDTH - SPACING.md * 2) / aspectRatio;
          setImageHeight(calculatedHeight);
        },
        error => {
          console.error(`Couldn't get image size: ${error.message}`);
          // Fallback or error handling
        },
      );
    }
  }, [imageSource]); // Recalculate if the image source changes

  return imageHeight;
};

export default useImageHeight;