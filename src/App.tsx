// App.js
import React, { useState, useRef } from 'react';
import {
  View,
  ImageBackground,
  Platform,
  PermissionsAndroid,
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
import ViewShot from 'react-native-view-shot';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { DraggableElement } from './components';
import styles from './styles';
import { CanvasElement } from './types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SCREEN_WIDTH, SIZING } from './constants/theme';
import Button from './components/Button';
import {
  TextStyleBottomSheet,
  TemplatePickerBottomSheet,
  PhotoPickerBottomSheet,
} from './components';
import { TextStyle } from './components/TextStyleBottomSheet';
import useImageHeight from './hooks/useImageHeight';
import { Images, Save, Type, Edit, Copy, Trash2, Paintbrush } from 'lucide-react-native';
// We will create this component in the next step

const CANVAS_WIDTH = SCREEN_WIDTH - SIZING.md * 2;

const App = () => {
  const drakeTemplate = require('./assets/drake.jpg'); // Default template

  const [elements, setElements] = useState<{ [id: string]: CanvasElement }>({});
  const [showGuideLines, setShowGuideLines] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [showStyleSheet, setShowStyleSheet] = useState(false);
  const [showImageSelection, setShowImageSelection] = useState(false);
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const [availablePhotos, setAvailablePhotos] = useState<any[]>([]);
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
  const onDragEnd = (
    elementId: string,
    newPosition?: { x: number; y: number },
  ) => {
    console.log(elementId, newPosition);
    if (newPosition) {
      setElements(prev => ({
        ...prev,
        [elementId]: { ...prev[elementId], x: newPosition.x, y: newPosition.y },
      }));
    }
    setShowGuideLines(false); // Hide guide lines when dragging ends
  };

  // Function to handle drag start
  const onDragStart = () => {
    setShowGuideLines(true); // Show guide lines when dragging starts
  };

  // Function to update text content
  const onUpdateText = (elementId: string, newText: string) => {
    setElements(prev => ({
      ...prev,
      [elementId]: { ...prev[elementId], text: newText },
    }));
  };

  // Function to update image content
  const onUpdateImage = (elementId: string, newImageUri: string) => {
    setElements(prev => ({
      ...prev,
      [elementId]: { ...prev[elementId], imageUri: newImageUri },
    }));
  };

  // Function to update text style
  const onUpdateTextStyle = (elementId: string, newStyle: TextStyle) => {
    setElements(prev => ({
      ...prev,
      [elementId]: { ...prev[elementId], style: newStyle },
    }));
  };

  // Function to delete an element
  const onDeleteElement = (elementId: string) => {
    console.log('masuk sini');
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
    };
    setElements(prev => ({ ...prev, [newTextElement.id]: newTextElement }));
  };

  const handlePhotoSelect = (imageUri: string) => {
    const newImageElement: CanvasElement = {
      id: String(Date.now()),
      type: 'image',
      imageUri,
      x: 0,
      y: 0,
      width: 150,
      height: 150,
    };
    setElements(prev => ({ ...prev, [newImageElement.id]: newImageElement }));
  };

  const hasAndroidPermission = async () => {
    if (Platform.OS !== 'android') {
      return true;
    }

    const getCheckPermissionPromise = async () => {
      if (Number(Platform.Version) >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }

    const getRequestPermissionPromise = async () => {
      if (Number(Platform.Version) >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  };

  const addImage = async () => {
    try {
      // Check and request permissions for Android
      if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
        console.log('Permission denied to access photo library');
        return;
      }

      // Get photos from camera roll
      const result = await CameraRoll.getPhotos({
        first: 20, // Get recent photos for selection
        assetType: 'Photos',
      });

      console.log({ result });

      if (result.edges.length > 0) {
        setAvailablePhotos(result.edges);
        setShowPhotoPicker(true);
      }
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
  const animatedCanvasStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

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
      setElements(prev => ({ ...prev, [newElement.id]: newElement }));
      setSelectedId(newElement.id); // Select the new copied element
    }
  };

  // Function to handle edit element
  const onEditElement = (elementId: string) => {
    const element = elements[elementId];
    if (element?.type === 'text') {
      setEditingId(elementId);
    } else if (element?.type === 'image') {
      // For images, you might want to open photo picker or image editor
      // For now, we'll just open the photo picker
      addImage();
    }
  };

  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <GestureDetector
            gesture={Gesture.Simultaneous(
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
                      { height: imageHeight, backgroundColor: 'red' },
                      styles.canvasImage,
                    ]}
                    resizeMode="cover"
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
                      <DraggableElement
                        key={el.id}
                        element={el}
                        onDragEnd={newPosition => onDragEnd(el.id, newPosition)}
                        onDragStart={onDragStart}
                        onUpdateText={newText => onUpdateText(el.id, newText)}
                        onUpdateImage={newImageUri =>
                          onUpdateImage(el.id, newImageUri)
                        }
                        canvasWidth={CANVAS_WIDTH}
                        canvasHeight={imageHeight}
                        onEdit={id => setEditingId(id)}
                        onSelect={id => setSelectedId(id)}
                        isSelecting={selectedId === el.id}
                        isEditing={editingId === el.id}
                      />
                    ))}
                  </ImageBackground>
                </ViewShot>
              </Animated.View>
            </View>
          </GestureDetector>

          <View style={styles.floatingAddElementContainer}>
            <Button
              rounded="full"
              variant="secondary"
              icon={<Type color={COLORS.primary} size={20} />}
              onPress={addText}
              size='large'
            />
            <Button
              rounded="full"
              variant="secondary"
              size='large'
              icon={<Images color={COLORS.primary} size={20} />}
              onPress={addImage}
            />
          </View>
          {selectedId && (
            <View style={styles.floatingEditElementContainer}>
              {elements[selectedId]?.type === 'text' && (
                <Button
                  rounded="full"
                  size='large'
                  variant="primary"
                  icon={<Paintbrush color={COLORS.accent} size={20} />}
                  onPress={() => onEditElement(selectedId)}
                />
              )}
              <Button
                rounded="full"
                variant="secondary"
                size='large'
                icon={<Copy color={COLORS.primary} size={20} />}
                onPress={() => onCopyElement(selectedId)}
              />
              <Button
                rounded="full"
                size='large'
                variant="danger"
                icon={<Trash2 color={COLORS.accent} size={20} />}
                onPress={() => {
                  onDeleteElement(selectedId);
                  setSelectedId(undefined);
                }}
              />
            </View>
          )}
        </View>
        {/* Floating Action Buttons */}
        {/* Control Buttons */}
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
              variant="primary"
              title="Background"
              onPress={() => setShowImageSelection(true)}
            />
            <Button
              rounded="full"
              variant="primary"
              title="Clear All"
              onPress={() => setElements({})}
            />
          </View>
          <Button
            variant="secondary"
            title="Save"
            rounded="full"
            leftIcon={<Save color={COLORS.primary} size={20} />}
          />
        </View>
      </SafeAreaView>

      {/* Text Style Bottom Sheet */}
      <TextStyleBottomSheet
        visible={showStyleSheet}
        onClose={() => setShowStyleSheet(false)}
        currentStyle={selectedId ? elements[selectedId].style : undefined}
        onStyleChange={style => onUpdateTextStyle(selectedId!, style)}
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

export default App;
