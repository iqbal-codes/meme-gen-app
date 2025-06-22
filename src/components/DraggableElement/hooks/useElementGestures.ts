import { useCallback, useEffect } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import { CanvasElement } from '../../../types';

interface UseElementGesturesProps {
  element: CanvasElement;
  isEditing: boolean;
  isSelecting: boolean;
  canvasWidth: number;
  canvasHeight: number;
  elementDimensions?: { width: number; height: number };
  onDragStart: () => void;
  onDragEnd: (position?: { x: number; y: number }) => void;
  onEdit: (id?: string) => void;
  onSelect: (id?: string) => void;
  onTransform?: (transform: { scale: number; rotation: number }) => void;
  onUpdateElement?: (element: CanvasElement) => void;
}

// Threshold for snapping to center and edges (in pixels)
const SNAP_THRESHOLD = 5;

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

  // Enhanced snapping function that considers actual element dimensions
  const applySnapping = (newX: number, newY: number) => {
    'worklet';

    const elementWidth = (elementDimensions?.width || 100) * scale.value;
    const elementHeight = (elementDimensions?.height || 36) * scale.value;

    // Calculate element edges based on center position
    const elementLeft = newX - elementWidth / 2;
    const elementRight = newX + elementWidth / 2;
    const elementTop = newY - elementHeight / 2;
    const elementBottom = newY + elementHeight / 2;

    // Guide lines (center only)
    const centerX = 0;
    const centerY = 0;

    let finalX = newX;
    let finalY = newY;

    // Horizontal snapping - snap element edges to vertical center line
    if (Math.abs(elementLeft - centerX) <= SNAP_THRESHOLD) {
      // Snap left edge to center
      finalX = centerX + elementWidth / 2;
    } else if (Math.abs(elementRight - centerX) <= SNAP_THRESHOLD) {
      // Snap right edge to center
      finalX = centerX - elementWidth / 2;
    } else if (Math.abs(newX - centerX) <= SNAP_THRESHOLD) {
      // Snap element center to center
      finalX = centerX;
    }

    // Vertical snapping - snap element edges to horizontal center line
    if (Math.abs(elementTop - centerY) <= SNAP_THRESHOLD) {
      // Snap top edge to center
      finalY = centerY + elementHeight / 2;
    } else if (Math.abs(elementBottom - centerY) <= SNAP_THRESHOLD) {
      // Snap bottom edge to center
      finalY = centerY - elementHeight / 2;
    } else if (Math.abs(newY - centerY) <= SNAP_THRESHOLD) {
      // Snap element center to center
      finalY = centerY;
    }

    return { x: finalX, y: finalY };
  };

  // Update element with transform changes
  const updateElementTransform = useCallback(() => {
    if (onUpdateElement) {
      const updatedElement = {
        ...element,
        x: translateX.value,
        y: translateY.value,
        // Store scale in element for persistence
        scale: scale.value,
      };
      onUpdateElement(updatedElement);
    }
  }, [element, onUpdateElement]);

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
      // Calculate new position
      const newX = event.translationX + offsetX.value;
      const newY = event.translationY + offsetY.value;

      // Apply enhanced snapping with actual element dimensions
      const snappedPosition = applySnapping(newX, newY);

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
      const degrees = (newRotation * 180) / Math.PI;
      const snapAngles = [0, 45, 90, 135, 180, 225, 270, 315, 360];
      const threshold = 5;
      const normalizedDegrees = ((degrees % 360) + 360) % 360;

      let shouldSnap = false;
      let snapToDegree = normalizedDegrees;

      for (const angle of snapAngles) {
        if (Math.abs(normalizedDegrees - angle) <= threshold) {
          shouldSnap = true;
          snapToDegree = angle;
          break;
        }
        if (angle === 0 && normalizedDegrees > 360 - threshold) {
          shouldSnap = true;
          snapToDegree = 0;
          break;
        }
        if (angle === 360 && normalizedDegrees < threshold) {
          shouldSnap = true;
          snapToDegree = 0;
          break;
        }
      }

      if (shouldSnap) {
        rotation.value = (snapToDegree * Math.PI) / 180;
      } else {
        rotation.value = newRotation;
      }
    })
    .onEnd(() => {
      'worklet';
      if (onTransform) {
        runOnJS(onTransform)({ scale: scale.value, rotation: rotation.value });
      }
      runOnJS(updateElementTransform)();
    });

  // Pinch gesture for scaling
  const pinchGesture = Gesture.Pinch()
    .enabled(!isEditing)
    .onStart(() => {
      'worklet';
      savedScale.value = scale.value;
    })
    .onUpdate(event => {
      'worklet';
      // Apply scale with min/max limits
      const newScale = savedScale.value * event.scale;
      const minScale = 0.5;
      const maxScale = 3.0;

      scale.value = Math.max(minScale, Math.min(maxScale, newScale));
    })
    .onEnd(() => {
      'worklet';
      if (onTransform) {
        runOnJS(onTransform)({ scale: scale.value, rotation: rotation.value });
      }
      runOnJS(updateElementTransform)();
    });

  // Tap gesture for selection and editing
  const tapGesture = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(1)
    .onStart(() => {
      console.log('Element tapped:', element.id);
      if (isSelecting) {
        // If already selected, enter edit mode on second tap
        onEdit(element.id);
      } else {
        // First tap selects the element
        onSelect(element.id);
      }
    });

  // Double tap gesture for quick edit
  const doubleTapGesture = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(2)
    .onStart(() => {
      console.log('Element double tapped:', element.id);
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
    // Expose animated values if needed
    translateX,
    translateY,
    rotation,
    scale,
    isPressed,
  };
};

export default useElementGestures;
