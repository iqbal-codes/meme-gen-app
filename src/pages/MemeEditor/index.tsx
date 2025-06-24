// App.js
import React, { useState, useRef, useCallback, useMemo } from 'react';
import { View, ImageBackground, PixelRatio, ImageURISource, TextStyle, Image } from 'react-native';
import { GestureHandlerRootView, GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { CameraRoll, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  DraggableElement,
  ElementStyleBottomSheet,
  TemplatePickerBottomSheet,
  PhotoPickerBottomSheet,
} from './components';
import { Button } from '@/components';
import styles from '@/styles';
import { CanvasElement } from '@/types';
import { SCREEN_WIDTH, SIZING } from '@/constants';
import { ensureCameraRollPermission } from '@/utils';
import { useConfirmation } from '@/contexts';
import { DEFAULT_IMAGE_ELEMENT, DEFAULT_TEXT_ELEMENT, EDITOR_CONFIG } from './constants';
import { useImageHeight } from '@/hooks';
import useCanvasGestures from './hooks/useCanvasGestures';

const MemeEditorPage = () => {
  const { showConfirmation } = useConfirmation();

  const [elements, setElements] = useState<{ [id: string]: CanvasElement }>({});
  const [showGuideLines, setShowGuideLines] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [showStyleElement, setShowStyleElement] = useState(false);
  const [showImageSelection, setShowImageSelection] = useState(false);
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const [availablePhotos, setAvailablePhotos] = useState<PhotoIdentifier[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<ImageURISource>();

  const viewShotRef = useRef(null);

  const imageHeight = useImageHeight(backgroundImage);

  // Function to update element position in state after dragging stops
  const onDragEnd = (elementId: string, newPosition?: { x: number; y: number }) => {
    if (newPosition) {
      setElements(prev => ({
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
    setElements(prev => ({
      ...prev,
      [elementId]: { ...prev[elementId], text: newText },
    }));
  };

  // Function to update text style
  const onUpdateElementStyle = (elementId: string, newStyle: TextStyle) => {
    setElements(prev => ({
      ...prev,
      [elementId]: { ...prev[elementId], style: newStyle },
    }));
  };

  const clearSelection = () => {
    setSelectedId(undefined);
    setEditingId(undefined);
  };

  // Function to delete an element
  const onDeleteElement = (elementId: string) => {
    clearSelection();
    const tempResult = { ...elements };
    delete tempResult[elementId];
    setElements(tempResult);
  };

  const addText = () => {
    clearSelection();
    const newTextElement: CanvasElement = {
      ...DEFAULT_TEXT_ELEMENT,
      id: String(Date.now()),
    };
    setElements(prev => ({ ...prev, [newTextElement.id]: newTextElement }));
  };

  const handlePhotoSelect = (imageUri: string) => {
    Image.getSize(imageUri, (width, height) => {
      const aspectRatio = width / height;
      const newImageElement: CanvasElement = {
        ...DEFAULT_IMAGE_ELEMENT,
        id: String(Date.now()),
        imageUri,
        width: EDITOR_CONFIG.DEFAULT_IMAGE_WIDTH * aspectRatio,
        height: EDITOR_CONFIG.DEFAULT_IMAGE_HEIGHT,
      };
      setElements(prev => ({ ...prev, [newImageElement.id]: newImageElement }));
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
        first: EDITOR_CONFIG.CAMERA_ROLL_LIMIT,
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

  // Function to handle copy element
  const onCopyElement = (elementId: string) => {
    const elementToCopy = elements[elementId];
    if (elementToCopy) {
      const newElement: CanvasElement = {
        ...elementToCopy,
        id: String(Date.now()),
        x: elementToCopy.x + EDITOR_CONFIG.COPY_OFFSET, // Offset the copy slightly
        y: elementToCopy.y + EDITOR_CONFIG.COPY_OFFSET,
      };
      setElements(prev => ({ ...prev, [newElement.id]: newElement }));
      setSelectedId(newElement.id); // Select the new copied element
    }
  };

  const updateElement = useCallback((updatedElement: CanvasElement) => {
    setElements(prev => ({ ...prev, [updatedElement.id]: updatedElement }));
  }, []);

  const onSave = async () => {
    clearSelection();
    const pixelRatio = PixelRatio.get(); // The pixel ratio of the device

    // Calculate canvas dimensions
    const canvasWidth = SCREEN_WIDTH - SIZING[6];
    const canvasHeight = backgroundImage ? imageHeight : canvasWidth;

    // Calculate aspect ratio
    const aspectRatio = canvasWidth / canvasHeight;

    // Calculate dimensions maintaining aspect ratio
    let captureWidth;
    let captureHeight;
    if (aspectRatio > 1) {
      // Landscape: width is larger
      captureWidth = EDITOR_CONFIG.TARGET_PIXEL_COUNT / pixelRatio;
      captureHeight = captureWidth / aspectRatio;
    } else {
      // Portrait or square: height is larger or equal
      captureHeight = EDITOR_CONFIG.TARGET_PIXEL_COUNT / pixelRatio;
      captureWidth = captureHeight * aspectRatio;
    }

    const result = await captureRef(viewShotRef, {
      result: 'tmpfile',
      height: captureHeight,
      width: captureWidth,
      quality: EDITOR_CONFIG.IMAGE_QUALITY.HIGH,
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
      message: 'Are you sure you want to clear the canvas? This will clear the canvas.',
      onConfirm: () => {
        setElements({});
        setBackgroundImage(undefined);
      },
    });
  };

  // Gesture handlers
  const { combinedGesture, animatedCanvasStyle } = useCanvasGestures({
    onClearSelection: clearSelection,
  });

  // Check if there are unsaved changes (any elements on canvas)
  const hasUnsavedChanges = useMemo(() => Object.keys(elements).length > 0, [elements]);

  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.controls}>
          <View style={styles.controlsContainer}>
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
          <GestureDetector gesture={combinedGesture}>
            <View style={styles.canvasContainer}>
              <Animated.View style={[animatedCanvasStyle]}>
                {/* The View we will capture */}
                <ViewShot
                  ref={viewShotRef}
                  options={{ format: 'jpg', quality: EDITOR_CONFIG.IMAGE_QUALITY.EXPORT }}
                  style={styles.canvas}
                >
                  <ImageBackground
                    source={backgroundImage}
                    style={[
                      {
                        height: backgroundImage ? imageHeight : SCREEN_WIDTH - SIZING[6],
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
                    {Object.values(elements).map(el => (
                      <DraggableElement
                        key={el.id}
                        element={el}
                        onDragEnd={newPosition => onDragEnd(el.id, newPosition)}
                        onDragStart={() => onDragStart(el.id)}
                        onUpdateText={newText => onUpdateText(el.id, newText)}
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
            <Button rounded="full" variant="secondary" icon="type" onPress={addText} size="large" />
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
        onStyleChange={style => {
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
