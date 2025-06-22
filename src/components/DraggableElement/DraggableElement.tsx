import React from 'react';
import { Image, Text, TextInput, View, TextStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { CanvasElement } from '../../types';
import { SCREEN_WIDTH, SIZING } from '../../constants/theme';
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
  canvasWidth = SCREEN_WIDTH - SIZING.md * 2,
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
  const combinedGesture = Gesture.Simultaneous(
    singleTapGesture,
    panGesture,
    rotationGesture,
  );

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
      if (isEditing)
        return (
          <TextInput
            style={[styles.text, styles.bordered, element.style as TextStyle]}
            value={element.text}
            onChangeText={onUpdateText}
            multiline
            autoFocus
            onBlur={() => onEdit()}
          />
        );

      return (
        <Text
          style={[
            styles.text,
            isSelecting && styles.bordered,
            element.style as TextStyle,
          ]}
        >
          {element.text}
        </Text>
      );
    } else if (element.type === 'image') {
      return (
        <View style={[styles.imageContainer, isSelecting && styles.bordered]}>
          <Image
            source={{ uri: element.imageUri }}
            style={[
              {
                width: element.width || 150,
                height: element.height || 150,
              },
            ]}
            resizeMode="cover"
          />
        </View>
      );
    }
    return null;
  };

  return (
    <GestureDetector gesture={combinedGesture}>
      <Animated.View
        style={[styles.draggable, animatedStyle]}
        onTouchStart={handleTouch}
      >
        {renderContent()}
      </Animated.View>
    </GestureDetector>
  );
};

export default React.memo(DraggableElement);
