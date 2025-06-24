import React, { useState, useEffect, useCallback } from 'react';
import { Image, FlatList, Pressable } from 'react-native';

import { PhotoIdentifier, CameraRoll } from '@react-native-camera-roll/camera-roll';
import { BaseBottomSheet } from '@/components';
import { ensureCameraRollPermission } from '@/utils';
import { EDITOR_CONFIG } from '../../constants';
import styles from './styles';

interface PhotoPickerBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onPhotoSelect: (imageUri: string) => void;
}

const PhotoPickerBottomSheet: React.FC<PhotoPickerBottomSheetProps> = ({
  visible,
  onClose,
  onPhotoSelect,
}) => {
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
  const [loading, setLoading] = useState(false);

  const loadPhotos = useCallback(async () => {
    if (loading) return;

    setLoading(true);
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

      setPhotos(result.edges);
    } catch (error) {
      console.error('Error accessing photo library:', error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    if (visible) {
      loadPhotos();
    }
  }, [visible, loadPhotos]);

  const renderPhotoItem = ({ item }: { item: PhotoIdentifier }) => (
    <Pressable
      style={styles.photoOption}
      onPress={() => {
        onPhotoSelect(item.node.image.uri);
        onClose();
      }}
    >
      <Image source={{ uri: item.node.image.uri }} style={styles.photoImage} resizeMode="center" />
    </Pressable>
  );

  return (
    <BaseBottomSheet visible={visible} onClose={onClose} title="Select Image">
      <FlatList
        data={photos}
        renderItem={renderPhotoItem}
        keyExtractor={(_, index) => `photo-${index}`}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        columnWrapperStyle={styles.columnWrapper}
      />
    </BaseBottomSheet>
  );
};

export default PhotoPickerBottomSheet;
