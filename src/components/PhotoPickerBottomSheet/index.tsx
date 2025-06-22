import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import { X } from 'lucide-react-native';
import { BaseBottomSheet, Button } from '..';
import styles from './styles';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { COLORS } from '../../constants/theme';

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
        resizeMode="cover"
      />
    </Pressable>
  );

  return (
    <BaseBottomSheet
      visible={visible}
      onClose={onClose}
      title="Select Photo"
      headerAction={
        <Button
          variant="ghost"
          icon={<X color={COLORS.mutedForeground} />}
          onPress={onClose}
        />
      }
    >
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
