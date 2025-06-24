import React from 'react';
import { Image, FlatList, Pressable } from 'react-native';

import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { BaseBottomSheet } from '@/components';
import styles from './styles';

interface PhotoPickerBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  photos: PhotoIdentifier[];
  onPhotoSelect: (imageUri: string) => void;
}

const PhotoPickerBottomSheet: React.FC<PhotoPickerBottomSheetProps> = ({
  visible,
  onClose,
  photos,
  onPhotoSelect,
}) => {
  const renderPhotoItem = ({ item }: { item: PhotoIdentifier }) => (
    <Pressable
      style={styles.photoOption}
      onPress={() => {
        onPhotoSelect(item.node.image.uri);
        onClose();
      }}
    >
      <Image
        source={{ uri: item.node.image.uri }}
        style={styles.photoImage}
        resizeMode="center"
      />
    </Pressable>
  );

  return (
    <BaseBottomSheet visible={visible} onClose={onClose} title="Select Image" >
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
