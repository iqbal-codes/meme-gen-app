import { Gesture } from 'react-native-gesture-handler';
import { SharedValue } from 'react-native-reanimated';

interface UseDragGesturesProps {
  isEditing: boolean;
  isPressed: SharedValue<boolean>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  rotation: SharedValue<number>;
  canvasWidth: number;
  canvasHeight: number;
  onDragStart: () => void;
  onDragEnd: (position?: { x: number; y: number }) => void;
  onTransform?: (transform: { scale: number; rotation: number }) => void;
}

// Threshold for snapping to center (in pixels)
const SNAP_THRESHOLD = 5;

const useDragGestures = ({
  isEditing,
  isPressed,
  translateX,
  translateY,
  rotation,
  canvasWidth,
  canvasHeight,
  onDragStart,
  onDragEnd,
  onTransform,
}: UseDragGesturesProps) => {
  const offset = { x: 0, y: 0 };
  const savedRotation = { value: 0 };

  // Pan gesture for dragging (disabled when any element is editing)
  const panGesture = Gesture.Pan()
    .enabled(!isEditing)
    .onBegin(() => {
      'worklet';
      isPressed.value = true;
    })
    .onStart(() => {
      'worklet';
      offset.x = translateX.value;
      offset.y = translateY.value;
    })
    .onTouchesDown(() => {
      // Trigger guide lines when drag starts
      onDragStart();
    })
    .onTouchesUp(() => {
      // Hide guide lines when drag ends
      onDragEnd();
    })
    .onUpdate(event => {
      'worklet';
      // Calculate new position
      const newX = event.translationX + offset.x;
      const newY = event.translationY + offset.y;

      // Calculate canvas boundaries for edge snapping
      const canvasLeft = -canvasWidth / 2;
      const canvasRight = canvasWidth / 2;
      const canvasTop = -canvasHeight / 2;
      const canvasBottom = canvasHeight / 2;

      let finalX = newX;
      let finalY = newY;

      // Snap to canvas edges if within threshold
      if (Math.abs(newX - canvasLeft) <= SNAP_THRESHOLD) {
        finalX = canvasLeft;
      } else if (Math.abs(newX - canvasRight) <= SNAP_THRESHOLD) {
        finalX = canvasRight;
      } else if (Math.abs(newX) <= SNAP_THRESHOLD) {
        // Snap to center X
        finalX = 0;
      }

      if (Math.abs(newY - canvasTop) <= SNAP_THRESHOLD) {
        finalY = canvasTop;
      } else if (Math.abs(newY - canvasBottom) <= SNAP_THRESHOLD) {
        finalY = canvasBottom;
      } else if (Math.abs(newY) <= SNAP_THRESHOLD) {
        // Snap to center Y
        finalY = 0;
      }

      translateX.value = finalX;
      translateY.value = finalY;
    })
    .runOnJS(true)
    .onEnd(() => {
      // Update the parent component with the final position
      onDragEnd({ x: translateX.value, y: translateY.value });
    })
    .onFinalize(() => {
      'worklet';
      isPressed.value = false;
    });

  // Separate rotation gesture with snapping
  const rotationGesture = Gesture.Rotation()
    .enabled(!isEditing)
    .onStart(() => {
      'worklet';
      savedRotation.value = rotation.value;
    })
    .onUpdate(event => {
      'worklet';
      // Calculate the new rotation value
      const newRotation = savedRotation.value + event.rotation;

      // Convert radians to degrees for easier snapping calculation
      const degrees = (newRotation * 180) / Math.PI;

      // Define snap angles in degrees
      const snapAngles = [0, 45, 90, 135, 180, 225, 270, 315, 360];
      const threshold = 5; // 5 degree threshold for snapping

      // Normalize degrees to 0-360 range
      const normalizedDegrees = ((degrees % 360) + 360) % 360;

      // Check if we should snap to any angle
      let shouldSnap = false;
      let snapToDegree = normalizedDegrees;

      for (const angle of snapAngles) {
        if (Math.abs(normalizedDegrees - angle) <= threshold) {
          shouldSnap = true;
          snapToDegree = angle;
          break;
        }
        // Handle the case of being close to 0 or 360
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

      // Apply the rotation, with snapping if needed
      if (shouldSnap) {
        // Convert back to radians for the rotation value
        rotation.value = (snapToDegree * Math.PI) / 180;
      } else {
        rotation.value = newRotation;
      }
    })
    .onEnd(() => {
      'worklet';
      // Optional callback to parent component
      if (onTransform) {
        onTransform({ scale: 1, rotation: rotation.value });
      }
    });

  return { panGesture, rotationGesture };
};

export default useDragGestures;
