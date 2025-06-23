// App.js
import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  ImageBackground,
  Platform,
  PermissionsAndroid,
  PixelRatio,
  ImageURISource,
  TextStyle,
  Image,
} from 'react-native';
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  DraggableElement,
  ElementStyleBottomSheet,
  TemplatePickerBottomSheet,
  PhotoPickerBottomSheet,
  Button,
} from '@/components';
import styles from '@/styles';
import { CanvasElement } from '@/types';
import { SCREEN_WIDTH, SIZING } from '@/constants';
import { useImageHeight } from '@/hooks';
import { ensureCameraRollPermission } from '@/utils';
import { useConfirmation } from '@/contexts';
// We will create this component in the next step

const MemeEditorPage: React.FC = () => {
  const { showConfirmation } = useConfirmation();

  const [elements, setElements] = useState<{ [id: string]: CanvasElement }>({});
  const [showGuideLines, setShowGuideLines] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [showStyleElement, setShowStyleElement] = useState(false);
  const [showImageSelection, setShowImageSelection] = useState(false);
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const [availablePhotos, setAvailablePhotos] = useState<any[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<ImageURISource>();

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
  const onDragEnd = (
    elementId: string,
    newPosition?: { x: number; y: number },
  ) => {
    if (newPosition) {
      setElements((prev) => ({
        ...prev,
        [elementId]: { ...prev[elementId], x: newPosition.x, y: newPosition.y },
      }));
    }
    setShowGuideLines(false); // Hide guide lines when dragging ends
  };

  // Function to handle drag start
  const onDragStart = (id: string) => {
    setSelectedId(id);
    setShowGuideLines(true); // Show guide lines when dragging starts
  };

  // Function to update text content
  const onUpdateText = (elementId: string, newText: string) => {
    setElements((prev) => ({
      ...prev,
      [elementId]: { ...prev[elementId], text: newText },
    }));
  };

  // Function to update text style
  const onUpdateElementStyle = (elementId: string, newStyle: TextStyle) => {
    setElements((prev) => ({
      ...prev,
      [elementId]: { ...prev[elementId], style: newStyle },
    }));
  };

  // Function to delete an element
  const onDeleteElement = (elementId: string) => {
    clearSelection();
    const tempResult = { ...elements };
    delete tempResult[elementId];
    setElements(tempResult);
  };

  const clearSelection = () => {
    setSelectedId(undefined);
    setEditingId(undefined);
  };

  const addText = () => {
    clearSelection();
    const newTextElement: CanvasElement = {
      id: String(Date.now()),
      type: 'text',
      text: 'New Text',
      x: 0,
      y: 0,
      style: {
        opacity: 1,
        color: '#000000',
        fontFamily: 'nunito',
        fontWeight: 'regular',
        fontStyle: 'normal',
        textDecorationLine: 'none',
        fontSize: 24,
        textAlign: 'center',
      },
    };
    setElements((prev) => ({ ...prev, [newTextElement.id]: newTextElement }));
  };

  const handlePhotoSelect = (imageUri: string) => {
    Image.getSize(imageUri, (width, height) => {
      const aspectRatio = width / height;
      const newImageElement: CanvasElement = {
        id: String(Date.now()),
        type: 'image',
        imageUri,
        x: 0,
        y: 0,
        width: 150 * aspectRatio,
        height: 150,
      };
      setElements((prev) => ({ ...prev, [newImageElement.id]: newImageElement }));
    });
  };

  const addImage = async () => {
    clearSelection();
    try {
      // Check and request permissions for Android
      const hasPermission = await ensureCameraRollPermission();
      if (!hasPermission) {
        console.log('Permission denied to access photo library');
        return;
      }

      // Get photos from camera roll
      const result = await CameraRoll.getPhotos({
        assetType: 'Photos',
        first: 5000,
      });

      setAvailablePhotos(result.edges);
      setShowPhotoPicker(true);
    } catch (error) {
      console.error('Error accessing photo library:', error);
    }
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

      scale.value = 1; // Reset zoom to original size
      translateX.value = 0; // Reset pan position
      translateY.value = 0;
    });

  const oneTapGesture = Gesture.Tap()
    .runOnJS(true)
    .onStart(() => {
      clearSelection();
    });

  // Pinch gesture for zooming
  const pinchGesture = Gesture.Pinch()
    .onStart((event) => {
      'worklet';

      focalX.value = event.focalX;
      focalY.value = event.focalY;
    })
    .onUpdate((event) => {
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
    .onUpdate((event) => {
      'worklet';

      // Only allow panning when zoomed in
      if (scale.value > 1) {
        // Calculate max pan limits based on zoom level
        const maxPanX = (scale.value - 1) * 200; // Adjust this value based on your canvas size
        const maxPanY = (scale.value - 1) * 200; // Adjust this value based on your canvas size

        // Apply pan with limits
        translateX.value = Math.min(
          Math.max(contextX.value + event.translationX, -maxPanX),
          maxPanX,
        );
        translateY.value = Math.min(
          Math.max(contextY.value + event.translationY, -maxPanY),
          maxPanY,
        );
      }
    });

  // Animated style for the canvas container
  const animatedCanvasStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  // Function to handle copy element
  const onCopyElement = (elementId: string) => {
    const elementToCopy = elements[elementId];
    if (elementToCopy) {
      const newElement: CanvasElement = {
        ...elementToCopy,
        id: String(Date.now()),
        x: elementToCopy.x + 20, // Offset the copy slightly
        y: elementToCopy.y + 20,
      };
      setElements((prev) => ({ ...prev, [newElement.id]: newElement }));
      setSelectedId(newElement.id); // Select the new copied element
    }
  };

  const updateElement = useCallback((updatedElement: CanvasElement) => {
    setElements((prev) => ({ ...prev, [updatedElement.id]: updatedElement }));
  }, []);

  const onSave = async () => {
    clearSelection();
    const targetPixelCount = 1080; // If you want full HD pictures
    const pixelRatio = PixelRatio.get(); // The pixel ratio of the device

    // Calculate canvas dimensions
    const canvasWidth = SCREEN_WIDTH - SIZING[6];
    const canvasHeight = backgroundImage
      ? imageHeight
      : SCREEN_WIDTH - SIZING[6];

    // Calculate aspect ratio
    const aspectRatio = canvasWidth / canvasHeight;

    // Calculate dimensions maintaining aspect ratio
    let captureWidth; let
      captureHeight;
    if (aspectRatio > 1) {
      // Landscape: width is larger
      captureWidth = targetPixelCount / pixelRatio;
      captureHeight = captureWidth / aspectRatio;
    } else {
      // Portrait or square: height is larger or equal
      captureHeight = targetPixelCount / pixelRatio;
      captureWidth = captureHeight * aspectRatio;
    }

    const result = await captureRef(viewShotRef, {
      result: 'tmpfile',
      height: captureHeight,
      width: captureWidth,
      quality: 1,
      format: 'jpg',
    });

    // Save to gallery
    await CameraRoll.saveAsset(result, {
      type: 'photo',
      album: 'Memes', // Optional: create/save to a specific album
    });

    showConfirmation({
      title: 'Meme saved',
      message: 'Meme saved to gallery!',
      onConfirm: () => {
        clearSelection();
      },
      showCancel: false,
    });
  };

  // Function to clear all elements on canvas
  const clearCanvas = () => {
    clearSelection();
    showConfirmation({
      title: 'Clear Canvas',
      message:
        'Are you sure you want to clear the canvas? This will clear the canvas.',
      onConfirm: () => {
        setElements({});
        setBackgroundImage(undefined);
      },
    });
  };

  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.controls}>
          <View
            style={{
              gap: SIZING[3],
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Button
              rounded="full"
              variant="secondary"
              title="Template"
              onPress={() => setShowImageSelection(true)}
            />
            <Button
              rounded="full"
              variant="secondary"
              title="Clear All"
              disabled={!hasUnsavedChanges}
              onPress={clearCanvas}
            />
          </View>
          <Button
            variant="primary"
            title="Save"
            rounded="full"
            rightIcon="save"
            disabled={!hasUnsavedChanges}
            onPress={onSave}
          />
        </View>
        <View style={styles.container}>
          <GestureDetector
            gesture={Gesture.Race(
              pinchGesture,
              doubleTapGesture,
              oneTapGesture,
              panGesture,
            )}
          >
            <View style={styles.canvasContainer}>
              <Animated.View style={[animatedCanvasStyle]}>
                {/* The View we will capture */}
                <ViewShot
                  ref={viewShotRef}
                  options={{ format: 'jpg', quality: 0.9 }}
                  style={styles.canvas}
                >
                  <ImageBackground
                    source={backgroundImage}
                    style={[
                      {
                        height: backgroundImage
                          ? imageHeight
                          : SCREEN_WIDTH - SIZING[6],
                      },
                      styles.canvasImage,
                    ]}
                    resizeMode="cover"
                  >
                    {/* Enhanced guide lines for alignment */}
                    {showGuideLines && (
                      <>
                        {/* Main center lines */}
                        <View style={styles.verticalLine} />
                        <View style={styles.horizontalLine} />
                      </>
                    )}
                    {Object.values(elements).map((el) => (
                      <DraggableElement
                        key={el.id}
                        element={el}
                        onDragEnd={(newPosition) => onDragEnd(el.id, newPosition)}
                        onDragStart={() => onDragStart(el.id)}
                        onUpdateText={(newText) => onUpdateText(el.id, newText)}
                        onEdit={() => setEditingId(el.id)}
                        onSelect={() => setSelectedId(el.id)}
                        isSelecting={selectedId === el.id}
                        isEditing={editingId === el.id}
                        onUpdateElement={updateElement}
                      />
                    ))}
                  </ImageBackground>
                </ViewShot>
              </Animated.View>
            </View>
          </GestureDetector>
          {/* Floating Add Element Buttons */}
          <View style={styles.floatingAddElementContainer}>
            <Button
              rounded="full"
              variant="secondary"
              icon="type"
              onPress={addText}
              size="large"
            />
            <Button
              rounded="full"
              variant="secondary"
              size="large"
              icon="image"
              onPress={addImage}
            />
          </View>
          {/* Floating Edit Element Buttons */}
          {selectedId && (
            <View style={styles.floatingEditElementContainer}>
              <Button
                rounded="full"
                size="large"
                variant="primary"
                icon="paintbrush"
                onPress={() => setShowStyleElement(true)}
              />
              <Button
                rounded="full"
                variant="secondary"
                size="large"
                icon="copy"
                onPress={() => onCopyElement(selectedId)}
              />
              <Button
                rounded="full"
                size="large"
                variant="danger"
                icon="trash-2"
                onPress={() => {
                  onDeleteElement(selectedId);
                }}
              />
            </View>
          )}
        </View>
        {/* Control Buttons */}
      </SafeAreaView>

      {/* Text Style Bottom Sheet */}
      <ElementStyleBottomSheet
        visible={showStyleElement}
        onClose={() => setShowStyleElement(false)}
        element={elements[selectedId!]}
        onStyleChange={(style) => {
          if (selectedId) {
            onUpdateElementStyle(selectedId, style);
          }
        }}
      />

      {/* Template Picker Bottom Sheet */}
      <TemplatePickerBottomSheet
        visible={showImageSelection}
        onClose={() => setShowImageSelection(false)}
        onImageSelect={handleImageSelect}
        hasUnsavedChanges={hasUnsavedChanges}
      />

      {/* Photo Picker Bottom Sheet */}
      <PhotoPickerBottomSheet
        visible={showPhotoPicker}
        onClose={() => setShowPhotoPicker(false)}
        photos={availablePhotos}
        onPhotoSelect={handlePhotoSelect}
      />
    </GestureHandlerRootView>
  );
};

export default MemeEditorPage;
