// App.js
import React, { useState, useRef, useEffect, useMemo } from 'react';
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
import { TextStyleBottomSheet, ImageSelectionBottomSheet } from './components';
import { TextStyle } from './components/TextStyleBottomSheet';
import useImageHeight from './hooks/useImageHeight';
// We will create this component in the next step

const App = () => {
  const drakeTemplate = require('./assets/drake.jpg'); // Default template

  const [elements, setElements] = useState<{ [id: string]: CanvasElement }>({});
  const [showGuideLines, setShowGuideLines] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [showStyleSheet, setShowStyleSheet] = useState(false);
  const [showImageSelection, setShowImageSelection] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(drakeTemplate);

  const viewShotRef = useRef(null);

  const imageHeight = useImageHeight(backgroundImage);

  // Shared values for zoom functionality
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  // Shared values for pan functionality
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const contextX = useSharedValue(0);
  const contextY = useSharedValue(0);

  // Function to update element position in state after dragging stops
  const onDragEnd = (elementId: string, newPosition?: { x: number; y: number }) => {
    console.log(elementId, newPosition);
    if (newPosition) {
      setElements(prev => ({ ...prev, [elementId]: { ...prev[elementId], x: newPosition.x, y: newPosition.y } }));
    }
    setShowGuideLines(false); // Hide guide lines when dragging ends
  };

  // Function to handle drag start
  const onDragStart = () => {
    setShowGuideLines(true); // Show guide lines when dragging starts
  };

  // Function to update text content
  const onUpdateText = (elementId: string, newText: string) => {
    setElements(prev => ({ ...prev, [elementId]: { ...prev[elementId], text: newText } }));
  };

  // Function to update text style
  const onUpdateTextStyle = (elementId: string, newStyle: TextStyle) => {
    setElements(prev => ({ ...prev, [elementId]: { ...prev[elementId], style: newStyle } }));
  };

  // Function to delete an element
  const onDeleteElement = (elementId: string) => {
    const tempResult = { ...elements };
    delete tempResult[elementId];
    setElements(tempResult);
  };

  // Function to handle canvas press (click outside)
  const handleCanvasPress = () => {
    // Only reset editing state if we're not in the middle of a pinch gesture
    if (editingId && scale.value === 1) {
      setEditingId(undefined);
    }
  };

  const addText = () => {
    const newTextElement: CanvasElement = {
      id: String(Date.now()),
      type: 'text',
      text: 'New Text',
      x: 0,
      y: 0,
      style: {
        color: '#000000',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecorationLine: 'none',
        fontSize: 24,
      },
      // Default styling
    };
    setElements(prev => ({ ...prev, [newTextElement.id]: newTextElement }));
  };

  // Function to handle background image selection
  const handleImageSelect = (imageUrl: string) => {
    // Clear all elements when changing background
    setElements({});
    setSelectedId(undefined);
    setEditingId(undefined);
    
    // Set new background image
    setBackgroundImage({ uri: imageUrl });
  };

  // Check if there are unsaved changes (any elements on canvas)
  const hasUnsavedChanges = Object.keys(elements).length > 0;

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
      setSelectedId(undefined);
      setEditingId(undefined);
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
                  source={backgroundImage}
                  style={[{ height: imageHeight, backgroundColor: 'red' }, styles.canvasImage]}
                  resizeMode='cover'
                >
                  {/* Guide lines for center alignment */}
                  {showGuideLines && (
                    <>
                      {/* Vertical center line */}
                      <View style={styles.verticalLine} />
                      {/* Horizontal center line */}
                      <View style={styles.horizontalLine} />
                    </>
                  )}

                  {Object.values(elements).map(el => (
                    <DraggableText
                      key={el.id}
                      element={el}
                      onDragEnd={newPosition => onDragEnd(el.id, newPosition)}
                      onDragStart={onDragStart}
                      onUpdateText={newText => onUpdateText(el.id, newText)}
                      canvasWidth={SCREEN_WIDTH - SPACING.md * 2}
                      canvasHeight={imageHeight}
                      onEdit={id => setEditingId(id)}
                      onSelect={id => setSelectedId(id)}
                      isSelecting={selectedId === el.id}
                      isEditing={editingId === el.id}
                    />
                  ))}
                </ImageBackground>
              </View>
            </Animated.View>
          </ViewShot>
        </GestureDetector>
        <View style={styles.controls}>
          <Button variant="secondary" title="Change Background" onPress={() => setShowImageSelection(true)} />
          <Button variant="primary" title="Add Text" onPress={addText} />
          <Button variant="primary" title="Save Meme" /* onPress={onSave} */ />
        </View>
      </SafeAreaView>

      {/* Text Style Bottom Sheet */}
      <TextStyleBottomSheet
        visible={showStyleSheet}
        onClose={() => setShowStyleSheet(false)}
        currentStyle={selectedId ? elements[selectedId].style : undefined}
        onStyleChange={style => onUpdateTextStyle(selectedId!, style)}
      />

      {/* Image Selection Bottom Sheet */}
      <ImageSelectionBottomSheet
        visible={showImageSelection}
        onClose={() => setShowImageSelection(false)}
        onImageSelect={handleImageSelect}
        hasUnsavedChanges={hasUnsavedChanges}
      />
    </GestureHandlerRootView>
  );
};

export default App;
