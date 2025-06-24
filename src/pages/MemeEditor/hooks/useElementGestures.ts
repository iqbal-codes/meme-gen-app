import { useCallback } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue, useAnimatedStyle, runOnJS } from 'react-native-reanimated';
import { CanvasElement } from '@/types';
import { EDITOR_CONFIG } from '@/pages/MemeEditor/constants';

interface UseElementGesturesProps {
  element: CanvasElement;
  isEditing: boolean;
  isSelecting: boolean;
  elementDimensions?: { width: number; height: number };
  onDragStart: () => void;
  onDragEnd: (position?: { x: number; y: number }) => void;
  onEdit: (id?: string) => void;
  onSelect: (id?: string) => void;
  onTransform?: (transform: { scale: number; rotation: number }) => void;
  onUpdateElement?: (element: CanvasElement) => void;
}

const useElementGestures = ({
  element,
  isEditing,
  isSelecting,
  elementDimensions,
  onDragStart,
  onDragEnd,
  onEdit,
  onSelect,
  onTransform,
  onUpdateElement,
}: UseElementGesturesProps) => {
  // Animated values
  const isPressed = useSharedValue(false);
  const translateX = useSharedValue(element.x);
  const translateY = useSharedValue(element.y);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(element.scale || 1);

  // Gesture state
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const savedRotation = useSharedValue(0);
  const savedScale = useSharedValue(1);

  // Helper function for position snapping
  const applyPositionSnapping = (newX: number, newY: number) => {
    'worklet';

    const elementWidth = (elementDimensions?.width || EDITOR_CONFIG.DEFAULT_TEXT_WIDTH) * scale.value;
    const elementHeight = (elementDimensions?.height || EDITOR_CONFIG.DEFAULT_TEXT_HEIGHT) * scale.value;

    // Calculate element edges
    const elementLeft = newX - elementWidth / 2;
    const elementRight = newX + elementWidth / 2;
    const elementTop = newY - elementHeight / 2;
    const elementBottom = newY + elementHeight / 2;

    // Center guide lines
    const centerX = 0;
    const centerY = 0;

    let finalX = newX;
    let finalY = newY;

    // Horizontal snapping to vertical center line
    if (Math.abs(elementLeft - centerX) <= EDITOR_CONFIG.SNAP_THRESHOLD) {
      finalX = centerX + elementWidth / 2;
    } else if (Math.abs(elementRight - centerX) <= EDITOR_CONFIG.SNAP_THRESHOLD) {
      finalX = centerX - elementWidth / 2;
    } else if (Math.abs(newX - centerX) <= EDITOR_CONFIG.SNAP_THRESHOLD) {
      finalX = centerX;
    }

    // Vertical snapping to horizontal center line
    if (Math.abs(elementTop - centerY) <= EDITOR_CONFIG.SNAP_THRESHOLD) {
      finalY = centerY + elementHeight / 2;
    } else if (Math.abs(elementBottom - centerY) <= EDITOR_CONFIG.SNAP_THRESHOLD) {
      finalY = centerY - elementHeight / 2;
    } else if (Math.abs(newY - centerY) <= EDITOR_CONFIG.SNAP_THRESHOLD) {
      finalY = centerY;
    }

    return { x: finalX, y: finalY };
  };

  // Helper function for rotation snapping
  const applyRotationSnapping = (newRotation: number) => {
    'worklet';

    const degrees = (newRotation * 180) / Math.PI;
    const normalizedDegrees = ((degrees % 360) + 360) % 360;

    // Find closest snap angle
    const snapAngle = EDITOR_CONFIG.SNAP_ANGLES.find(
      angle => Math.abs(normalizedDegrees - angle) <= EDITOR_CONFIG.ROTATION_THRESHOLD,
    );

    if (snapAngle !== undefined) {
      return (snapAngle * Math.PI) / 180;
    }

    // Check for 360° wrap-around
    if (normalizedDegrees > 360 - EDITOR_CONFIG.ROTATION_THRESHOLD) {
      return 0;
    }

    return newRotation;
  };

  // Helper function for scale constraints
  const applyScaleConstraints = (newScale: number) => {
    'worklet';

    return Math.max(EDITOR_CONFIG.MIN_SCALE, Math.min(EDITOR_CONFIG.MAX_SCALE, newScale));
  };

  // Update element with transform changes
  const updateElementTransform = useCallback(() => {
    if (onUpdateElement) {
      const updatedElement = {
        ...element,
        x: translateX.value,
        y: translateY.value,
        scale: scale.value,
      };
      onUpdateElement(updatedElement);
    }
  }, [element, onUpdateElement, translateX, translateY, scale]);

  // Shared transform callback
  const handleTransformEnd = useCallback(() => {
    'worklet';

    if (onTransform) {
      runOnJS(onTransform)({ scale: scale.value, rotation: rotation.value });
    }
    runOnJS(updateElementTransform)();
  }, [onTransform, updateElementTransform, scale, rotation]);

  // Pan gesture for dragging
  const panGesture = Gesture.Pan()
    .enabled(!isEditing)
    .onBegin(() => {
      'worklet';

      isPressed.value = true;
    })
    .onStart(() => {
      'worklet';

      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
      runOnJS(onDragStart)();
    })
    .onUpdate(event => {
      'worklet';

      const newX = event.translationX + offsetX.value;
      const newY = event.translationY + offsetY.value;
      const snappedPosition = applyPositionSnapping(newX, newY);

      translateX.value = snappedPosition.x;
      translateY.value = snappedPosition.y;
    })
    .onEnd(() => {
      'worklet';

      runOnJS(onDragEnd)({ x: translateX.value, y: translateY.value });
      runOnJS(updateElementTransform)();
    })
    .onFinalize(() => {
      'worklet';

      isPressed.value = false;
    });

  // Rotation gesture with snapping
  const rotationGesture = Gesture.Rotation()
    .enabled(!isEditing)
    .onStart(() => {
      'worklet';

      savedRotation.value = rotation.value;
    })
    .onUpdate(event => {
      'worklet';

      const newRotation = savedRotation.value + event.rotation;
      rotation.value = applyRotationSnapping(newRotation);
    })
    .onEnd(handleTransformEnd);

  // Pinch gesture for scaling
  const pinchGesture = Gesture.Pinch()
    .enabled(!isEditing)
    .onStart(() => {
      'worklet';

      savedScale.value = scale.value;
    })
    .onUpdate(event => {
      'worklet';

      const newScale = savedScale.value * event.scale;
      scale.value = applyScaleConstraints(newScale);
    })
    .onEnd(handleTransformEnd);

  // Tap gesture for selection and editing
  const tapGesture = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(1)
    .onStart(() => {
      if (isSelecting) {
        onEdit(element.id);
      } else {
        onSelect(element.id);
      }
    });

  // Double tap gesture for quick edit
  const doubleTapGesture = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(2)
    .onStart(() => {
      onEdit(element.id);
    });

  // Combine all gestures
  const combinedGesture = Gesture.Race(
    doubleTapGesture,
    Gesture.Simultaneous(
      tapGesture,
      Gesture.Simultaneous(panGesture, rotationGesture, pinchGesture),
    ),
  );

  // Animated style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotateZ: `${rotation.value}rad` },
    ],
    zIndex: isPressed.value ? 1000 : 1,
  }));

  return {
    combinedGesture,
    animatedStyle,
    translateX,
    translateY,
    rotation,
    scale,
    isPressed,
  };
};

export default useElementGestures;
