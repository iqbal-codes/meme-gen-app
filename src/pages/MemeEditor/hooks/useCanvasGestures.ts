import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { EDITOR_CONFIG } from '../constants';

interface UseCanvasGesturesProps {
  onClearSelection: () => void;
}

const useCanvasGestures = ({ onClearSelection }: UseCanvasGesturesProps) => {
  // Animated values for canvas transformations
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const contextX = useSharedValue(0);
  const contextY = useSharedValue(0);

  // Double tap gesture to reset zoom
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      'worklet';

      scale.value = 1; // Reset zoom to original size
      translateX.value = 0; // Reset pan position
      translateY.value = 0;
    });

  const oneTapGesture = Gesture.Tap()
    .runOnJS(true)
    .onStart(() => {
      onClearSelection();
    });

  // Pinch gesture for zooming
  const pinchGesture = Gesture.Pinch()
    .onStart(event => {
      'worklet';

      focalX.value = event.focalX;
      focalY.value = event.focalY;
    })
    .onUpdate(event => {
      'worklet';

      // Limit scale between 1 and 3
      scale.value = Math.min(Math.max(event.scale, EDITOR_CONFIG.MIN_SCALE), EDITOR_CONFIG.MAX_SCALE);
    });

  // Pan gesture for looking around when zoomed
  const panGesture = Gesture.Pan()
    .onStart(() => {
      'worklet';

      contextX.value = translateX.value;
      contextY.value = translateY.value;
    })
    .onUpdate(event => {
      'worklet';

      // Only allow panning when zoomed in
      if (scale.value > 1) {
        // Calculate max pan limits based on zoom level
        const maxPanX = (scale.value - 1) * EDITOR_CONFIG.MAX_PAN_OFFSET; // Adjust this value based on your canvas size
        const maxPanY = (scale.value - 1) * EDITOR_CONFIG.MAX_PAN_OFFSET; // Adjust this value based on your canvas size

        // Apply pan with limits
        translateX.value = Math.min(
          Math.max(contextX.value + event.translationX, -maxPanX),
          maxPanX,
        );
        translateY.value = Math.min(
          Math.max(contextY.value + event.translationY, -maxPanY),
          maxPanY,
        );
      }
    });

  // Animated style for the canvas container
  const animatedCanvasStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  // Combine gestures
  const combinedGesture = Gesture.Simultaneous(
    doubleTapGesture,
    oneTapGesture,
    Gesture.Simultaneous(pinchGesture, panGesture),
  );

  return {
    combinedGesture,
    animatedCanvasStyle,
    scale,
    translateX,
    translateY,
  };
};

export default useCanvasGestures;
