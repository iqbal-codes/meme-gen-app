// DraggableText.js
import React, { useState } from 'react';
import { TextInput, Text, View, TouchableOpacity, StyleProp, TextStyle as RNTextStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import styles from './styles.ts';
import { COLORS, FONT, SCREEN_WIDTH, SPACING } from '../../constants/theme';
import Button from '../Button';
import TextStyleBottomSheet, { TextStyle } from '../TextStyleBottomSheet';

interface DraggableTextProps {
  elementId: string;
  initialX: number;
  initialY: number;
  text: string;
  isEditing: boolean;
  onDragEnd: (position: { x: number; y: number }) => void;
  onDragStart?: () => void;
  onUpdateText: (text: string) => void;
  onEditingChange: (isEditing: boolean) => void;
  onTransform?: (transform: { scale: number; rotation: number }) => void;
  canvasWidth?: number;
  canvasHeight?: number;
  onDelete?: (elementId: string) => void;
  // Text styling properties
  textStyle?: TextStyle;
  onStyleChange?: (style: TextStyle) => void;
}

// Threshold for snapping to center (in pixels)

// Threshold for snapping to center (in pixels)
const SNAP_THRESHOLD = 10;

const DraggableText = ({
  elementId,
  initialX,
  initialY,
  text,
  isEditing,
  onDragEnd,
  onDragStart,
  onUpdateText,
  onEditingChange,
  onTransform,
  canvasWidth = SCREEN_WIDTH - SPACING.md * 2, // Default to screen width minus padding
  canvasHeight = 400,
  onDelete,
  textStyle = {} as TextStyle,
  onStyleChange,
}: DraggableTextProps) => {
  const isPressed = useSharedValue(false);
  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);
  const offset = useSharedValue({ x: 0, y: 0 });

  // Add state for selection mode and bottom sheet
  const [isSelected, setIsSelected] = useState(false);
  const [showStyleSheet, setShowStyleSheet] = useState(false);

  // Default text style
  const defaultTextStyle: TextStyle = {
    color: textStyle.color || COLORS.text,
    fontWeight: textStyle.fontWeight || 'normal',
    fontStyle: textStyle.fontStyle || 'normal',
    textDecorationLine: textStyle.textDecorationLine || 'none',
    fontSize: textStyle.fontSize || FONT.sizes['2xl'],
  };

  // Add shared values for rotation
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);

  // Single tap gesture to toggle selection mode
  const singleTapGesture = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(1)
    .onStart(() => {
      if (isSelected) {
        // If already selected, enter edit mode on second tap
        onEditingChange(true);
        setIsSelected(false);
      } else {
        // First tap selects the text
        setIsSelected(true);
      }
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
    .runOnJS(true)
    .onTouchesDown(() => {
      // Trigger guide lines when drag starts
      if (onDragStart) {
        onDragStart();
      }
    })
    .onUpdate(event => {
      'worklet';
      // Calculate new position
      const newX = event.translationX + offset.value.x;
      const newY = event.translationY + offset.value.y;

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

  // Combine gestures
  const combinedGesture = Gesture.Simultaneous(singleTapGesture, panGesture, rotationGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotateZ: `${rotation.value}rad` },
    ],
    opacity: isPressed.value ? 0.8 : 1,
    zIndex: isPressed.value ? 1000 : 1,
  }));

  // Handle touch to prevent canvas touch event propagation
  const handleTouch = (event: any) => {
    event.stopPropagation();
  };

  // Handle delete button press
  const handleDelete = () => {
    if (onDelete) {
      onDelete(elementId);
    }
    setIsSelected(false);
  };

  // Handle edit style button press
  const handleEditStyle = () => {
    setShowStyleSheet(true);
    setIsSelected(false);
  };

  // Handle style change from bottom sheet
  const handleStyleChange = (newStyle: TextStyle) => {
    if (onStyleChange) {
      onStyleChange(newStyle);
    }
  };

  return (
    <GestureDetector gesture={combinedGesture}>
      <Animated.View style={[styles.draggable, animatedStyle]} onTouchStart={handleTouch}>
        {isEditing ? (
          <TextInput
            style={[styles.text, styles.bordered]}
            value={text}
            onChangeText={onUpdateText}
            multiline
            autoFocus
            onBlur={() => onEditingChange(false)}
          />
        ) : (
          <Text
            style={[
              styles.text,
              isSelected && styles.bordered,
              {
                color: defaultTextStyle.color,
                fontWeight: defaultTextStyle.fontWeight,
                fontStyle: defaultTextStyle.fontStyle,
                textDecorationLine: defaultTextStyle.textDecorationLine,
                fontSize: defaultTextStyle.fontSize,
              } as StyleProp<RNTextStyle>,
            ]}
          >
            {text}
          </Text>
        )}

        {/* Selection controls */}
        {isSelected && !isEditing && (
          <View
            style={{
              position: 'absolute',
              top: -40,
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
              gap: SPACING.xs,
            }}
          >
            <Button title="Edit" variant="primary" size="small" onPress={handleEditStyle} />
            <Button title="Delete" variant="danger" size="small" onPress={handleDelete} />
          </View>
        )}

        {/* Text Style Bottom Sheet */}
        <TextStyleBottomSheet
          visible={showStyleSheet}
          onClose={() => setShowStyleSheet(false)}
          currentStyle={defaultTextStyle}
          onStyleChange={handleStyleChange}
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default DraggableText;
