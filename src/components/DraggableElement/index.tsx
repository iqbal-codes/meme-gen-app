import React, { useRef, useCallback, useState, useLayoutEffect } from 'react';
import {
  Image,
  Text,
  TextInput,
  View,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { CanvasElement } from '@/types';
import useElementGestures from './hooks/useElementGestures';
import styles from './styles';
import { useElementDimensions } from '@/hooks';

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
  onUpdateElement?: (element: CanvasElement) => void;
}

const DraggableElement: React.FC<DraggableElementProps> = ({
  element,
  isEditing,
  onDragEnd,
  onDragStart,
  onUpdateText,
  onEdit,
  onTransform,
  onUpdateElement,
  isSelecting,
  onSelect,
}) => {
  const elementRef = useRef<View>(null);
  // Use the new dimension hook
  const { dimensions, onLayout } = useElementDimensions({
    element,
    autoMeasure: true,
  });

  // Use unified gesture hook
  const { combinedGesture, animatedStyle } = useElementGestures({
    element,
    isEditing,
    isSelecting,
    elementDimensions: dimensions,
    onDragStart,
    onDragEnd,
    onEdit,
    onSelect,
    onTransform,
    onUpdateElement,
  });

  // Handle touch to prevent canvas touch event propagation
  const handleTouch = (event: GestureResponderEvent) => {
    event.stopPropagation();
  };

  const renderContent = useCallback(() => {
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
            onLayout={onLayout}
          />
        );

      return (
        <Text
          style={[
            styles.text,
            isSelecting && styles.bordered,
            element.style as TextStyle,
          ]}
          onLayout={onLayout}
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
                opacity: element.style?.opacity,
              },
            ]}
            resizeMode="cover"
            onLayout={onLayout}
          />
        </View>
      );
    }
    return null;
  }, [element, isEditing, isSelecting, onLayout]);

  return (
    <GestureDetector gesture={combinedGesture}>
      <Animated.View
        ref={elementRef}
        style={[styles.draggable, animatedStyle]}
        onTouchStart={handleTouch}
      >
        {renderContent()}
      </Animated.View>
    </GestureDetector>
  );
};

export default React.memo(DraggableElement);
