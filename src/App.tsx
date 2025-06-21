// App.js
import React, { useState, useRef, useEffect } from 'react';
import { View, ImageBackground, Image } from 'react-native';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import ViewShot from 'react-native-view-shot';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import DraggableText from './components/DraggableText';
import styles from './styles';
import { CanvasElement } from './types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SCREEN_WIDTH, SPACING } from './constants/theme';
import Button from './components/Button';
// We will create this component in the next step

const App = () => {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [editingElementId, setEditingElementId] = useState<string | null>(null);
  const [imageHeight, setImageHeight] = useState(0);

  const viewShotRef = useRef(null);
  const drakeTemplate = require('./assets/drake.jpg'); // Hardcoded template

  // Shared values for zoom functionality
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  // Shared values for pan functionality
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const contextX = useSharedValue(0);
  const contextY = useSharedValue(0);

  useEffect(() => {
    if (typeof drakeTemplate === 'number') {
      // For static local images (e.g., require('./image.png'))
      const imageAsset = Image.resolveAssetSource(drakeTemplate);
      if (imageAsset && imageAsset.width && imageAsset.height) {
        const aspectRatio = imageAsset.width / imageAsset.height;
        const calculatedHeight = (SCREEN_WIDTH - SPACING.md * 2) / aspectRatio;
        setImageHeight(calculatedHeight);
      }
    } else if (typeof drakeTemplate === 'object' && drakeTemplate.uri) {
      // For remote images (e.g., { uri: 'http://example.com/image.jpg' })
      Image.getSize(
        drakeTemplate.uri,
        (width, height) => {
          const aspectRatio = width / height;
          const calculatedHeight = (SCREEN_WIDTH - SPACING.md * 2) / aspectRatio;
          setImageHeight(calculatedHeight);
        },
        error => {
          console.error(`Couldn't get image size: ${error.message}`);
          // Fallback or error handling
        },
      );
    }
  }, [drakeTemplate]); // Recalculate if the image source changes

  // Function to update element position in state after dragging stops
  const onDragEnd = (elementId: string, newPosition: { x: number; y: number }) => {
    console.log(elementId, newPosition);
    setElements(prev => prev.map(el => (el.id === elementId ? { ...el, x: newPosition.x, y: newPosition.y } : el)));
  };

  // Function to update text content
  const onUpdateText = (elementId: string, newText: string) => {
    setElements(prev => prev.map(el => (el.id === elementId ? { ...el, text: newText } : el)));
  };

  // Function to handle editing state
  const onEditingChange = (elementId: string, isEditing: boolean) => {
    setEditingElementId(isEditing ? elementId : null);
  };

  // Function to handle canvas press (click outside)
  const handleCanvasPress = () => {
    // Only reset editing state if we're not in the middle of a pinch gesture
    if (editingElementId && scale.value === 1) {
      setEditingElementId(null);
    }
  };

  const addText = () => {
    const newTextElement: CanvasElement = {
      id: String(Date.now()),
      type: 'text',
      text: 'New Text',
      x: 0,
      y: 0,
    };
    setElements(prev => [...prev, newTextElement]);
  };

  // Double tap gesture to reset zoom
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      'worklet';
      console.log('masuk sini 2');
      scale.value = 1; // Reset zoom to original size
      translateX.value = 0; // Reset pan position
      translateY.value = 0;
    });

  const oneTapGesture = Gesture.Tap()
    .runOnJS(true)
    .onStart(() => {
      handleCanvasPress();
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
      scale.value = Math.min(Math.max(event.scale, 1), 3);
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
        const maxPanX = (scale.value - 1) * 200; // Adjust this value based on your canvas size
        const maxPanY = (scale.value - 1) * 200; // Adjust this value based on your canvas size

        // Apply pan with limits
        translateX.value = Math.min(Math.max(contextX.value + event.translationX, -maxPanX), maxPanX);
        translateY.value = Math.min(Math.max(contextY.value + event.translationY, -maxPanY), maxPanY);
      }
    });

  // Animated style for the canvas container
  const animatedCanvasStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }],
    };
  });

  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <SafeAreaView style={styles.container}>
        {/* The View we will capture */}
        <GestureDetector gesture={Gesture.Simultaneous(pinchGesture, doubleTapGesture, oneTapGesture, panGesture)}>
          <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }} style={styles.canvasContainer}>
            <Animated.View style={[animatedCanvasStyle]}>
              <View style={styles.canvas}>
                <ImageBackground
                  source={drakeTemplate}
                  style={[{ height: imageHeight}, styles.canvasImage]}
                  resizeMode="center"
                >
                  {elements.map(el => (
                    <DraggableText
                      key={el.id}
                      elementId={el.id}
                      initialX={el.x}
                      initialY={el.y}
                      text={el.text}
                      isEditing={editingElementId === el.id}
                      onDragEnd={newPosition => onDragEnd(el.id, newPosition)}
                      onUpdateText={newText => onUpdateText(el.id, newText)}
                      onEditingChange={isEditing => onEditingChange(el.id, isEditing)}
                    />
                  ))}
                </ImageBackground>
              </View>
            </Animated.View>
          </ViewShot>
        </GestureDetector>

        <View style={styles.controls}>
          <Button variant="primary" title="Add Text" onPress={addText} />
          <Button variant="primary" title="Save Meme" /* onPress={onSave} */ />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
