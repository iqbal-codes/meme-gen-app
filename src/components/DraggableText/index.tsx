// DraggableText.js
import React, { useState } from 'react';
import { TextInput, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import styles from './styles.ts';

interface DraggableTextProps {
  elementId: string;
  initialX: number;
  initialY: number;
  text: string;
  isEditing: boolean;
  onDragEnd: (position: { x: number; y: number }) => void;
  onUpdateText?: (text: string) => void;
  onEditingChange: (isEditing: boolean) => void;
}

const CANVAS_HEIGHT = 400; // From styles.ts

// Threshold for snapping to center (in pixels)
const SNAP_THRESHOLD = 10;

const DraggableText = ({
  elementId,
  initialX,
  initialY,
  text,
  isEditing,
  onDragEnd,
  onUpdateText,
  onEditingChange,
}: DraggableTextProps) => {
  const isPressed = useSharedValue(false);
  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);
  const offset = useSharedValue({ x: 0, y: 0 });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    opacity: isPressed.value ? 0.8 : 1,
    zIndex: isPressed.value ? 1000 : 1,
  }));

  // Double tap gesture to toggle edit mode
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(1)
    .onStart(() => {
      'worklet';
      console.log('Double tap detected');
    })
    .runOnJS(true)
    .onEnd(() => {
      onEditingChange(!isEditing);
    });

  // Pan gesture for dragging (disabled when any element is editing)
  const panGesture = Gesture.Pan()
    .minDistance(1)
    .enabled(!isEditing)
    .onBegin(() => {
      'worklet';
      isPressed.value = true;
    })
    .onStart(() => {
      'worklet';
      offset.value = {
        x: translateX.value,
        y: translateY.value,
      };
    })
    .onUpdate(event => {
      'worklet';
      // Calculate new position
      const newX = event.translationX + offset.value.x;
      const newY = event.translationY + offset.value.y;

      // If within threshold of center X, snap to center X
      if (newX <= SNAP_THRESHOLD && newX >= -SNAP_THRESHOLD) {
        translateX.value = 0;
      } else {
        translateX.value = newX;
      }

      if (newY <= SNAP_THRESHOLD && newY >= -SNAP_THRESHOLD) {
        translateY.value = 0;
      } else {
        translateY.value = newY;
      }
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

  // Combine gestures
  const combinedGesture = Gesture.Simultaneous(doubleTapGesture, panGesture);

  console.log({ isEditing });

  // Handle touch to prevent canvas touch event propagation
  const handleTouch = (event: any) => {
    event.stopPropagation();
  };

  return (
    <GestureDetector gesture={combinedGesture}>
      <Animated.View style={[styles.draggable, animatedStyle]} onTouchStart={handleTouch}>
        {isEditing ? (
          <TextInput
            style={styles.text}
            value={text}
            onChangeText={onUpdateText}
            multiline
            autoFocus
            onBlur={() => onEditingChange(false)}
          />
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </Animated.View>
    </GestureDetector>
  );
};

export default DraggableText;
