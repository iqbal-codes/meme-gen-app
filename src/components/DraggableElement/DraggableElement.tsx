import React from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { CanvasElement } from '../../types';
import { SCREEN_WIDTH, SPACING } from '../../constants/theme';
import DraggableText from './DraggableText';
import DraggableImage from './DraggableImage';
import useDragGestures from './hooks/useDragGestures';
import useSelectionGestures from './hooks/useSelectionGestures';
import styles from './styles';

interface DraggableElementProps {
  element: CanvasElement;
  onDragEnd: (position?: { x: number; y: number }) => void;
  onDragStart: () => void;
  onUpdateText?: (text: string) => void;
  onUpdateImage?: (imageUri: string) => void;
  onTransform?: (transform: { scale: number; rotation: number }) => void;
  canvasWidth?: number;
  canvasHeight?: number;
  isSelecting: boolean;
  isEditing: boolean;
  onEdit: (id?: string) => void;
  onSelect: (id?: string) => void;
}

const DraggableElement: React.FC<DraggableElementProps> = ({
  element,
  isEditing,
  onDragEnd,
  onDragStart,
  onUpdateText,
  onUpdateImage,
  onEdit,
  onTransform,
  canvasWidth = SCREEN_WIDTH - SPACING.md * 2,
  canvasHeight = 400,
  isSelecting,
  onSelect,
}) => {
  const isPressed = useSharedValue(false);
  const translateX = useSharedValue(element.x);
  const translateY = useSharedValue(element.y);
  const rotation = useSharedValue(0);

  // Custom hooks for gesture handling
  const { panGesture, rotationGesture } = useDragGestures({
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
  });

  const { singleTapGesture } = useSelectionGestures({
    element,
    isSelecting,
    onEdit,
    onSelect,
  });

  // Combine gestures
  const combinedGesture = Gesture.Simultaneous(singleTapGesture, panGesture, rotationGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotateZ: `${rotation.value}rad` },
    ],
    zIndex: isPressed.value ? 1000 : 1,
  }));

  // Handle touch to prevent canvas touch event propagation
  const handleTouch = (event: any) => {
    event.stopPropagation();
  };

  const renderContent = () => {
    if (element.type === 'text') {
      return (
        <DraggableText
          element={element}
          isEditing={isEditing}
          isSelecting={isSelecting}
          onUpdateText={onUpdateText!}
          onEdit={onEdit}
        />
      );
    } else if (element.type === 'image') {
      return (
        <DraggableImage
          element={element}
          isEditing={isEditing}
          isSelecting={isSelecting}
          onUpdateImage={onUpdateImage}
          onEdit={onEdit}
        />
      );
    }
    return null;
  };

  return (
    <GestureDetector gesture={combinedGesture}>
      <Animated.View style={[styles.draggable, animatedStyle]} onTouchStart={handleTouch}>
        {renderContent()}
      </Animated.View>
    </GestureDetector>
  );
};

export default DraggableElement;