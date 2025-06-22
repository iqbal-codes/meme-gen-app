import React, { useRef, useCallback, useState, useLayoutEffect } from 'react';
import { Image, Text, TextInput, View, TextStyle, GestureResponderEvent } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { CanvasElement } from '../../types';
import { SCREEN_WIDTH, SIZING } from '../../constants/theme';
import useElementGestures from './hooks/useElementGestures';
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
  onUpdateElement?: (element: CanvasElement) => void;
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
  onUpdateElement,
  canvasWidth = SCREEN_WIDTH - SIZING.md * 2,
  canvasHeight = 400,
  isSelecting,
  onSelect,
}) => {
  const elementRef = useRef<View>(null);
  const [elementDimensions, setElementDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  // Measure element dimensions using React Native's measure method
  const measureElement = useCallback(() => {
    if (elementRef.current) {
      elementRef.current.measure((x, y, width, height, pageX, pageY) => {
        const newDimensions = { width, height };
        setElementDimensions(newDimensions);
        
        // Update the element with actual measured dimensions
        if (onUpdateElement && (element.width !== width || element.height !== height)) {
          onUpdateElement({ ...element, width, height });
        }
      });
    }
  }, [element, onUpdateElement]);

  // Measure on layout changes and when text content changes
  useLayoutEffect(() => {
    // Small delay to ensure the layout is complete
    const timer = setTimeout(measureElement, 0);
    return () => clearTimeout(timer);
  }, [measureElement, element.text, element.style]);

  // Use measured dimensions or fallback to element dimensions
  const currentDimensions = {
    width:
      elementDimensions?.width ||
      element.width ||
      (element.type === 'text' ? 100 : 150),
    height:
      elementDimensions?.height ||
      element.height ||
      (element.type === 'text' ? 36 : 150),
  };

  // Use unified gesture hook
  const { combinedGesture, animatedStyle } = useElementGestures({
    element,
    isEditing,
    isSelecting,
    canvasWidth,
    canvasHeight,
    elementDimensions: currentDimensions,
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
            onLayout={measureElement}
          />
        );

      return (
        <Text
          style={[
            styles.text,
            isSelecting && styles.bordered,
            element.style as TextStyle,
          ]}
          onLayout={measureElement}
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
            onLayout={measureElement}
          />
        </View>
      );
    }
    return null;
  }, [element, isEditing, isSelecting, measureElement]);

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
