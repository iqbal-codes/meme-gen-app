import React from 'react';
import { Text, Image, Alert, FlatList, Pressable } from 'react-native';
import BaseBottomSheet from '../BaseBottomSheet';
import styles from './styles';
import { MEME_TEMPLATES } from '../../constants/memeTemplates';
import { MemeTemplate } from '../../types';
import { useConfirmation } from '../../contexts';

interface ImageSelectionBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onImageSelect: (imageUrl: string) => void;
  hasUnsavedChanges: boolean;
}

const ImageSelectionBottomSheet: React.FC<ImageSelectionBottomSheetProps> = ({
  visible,
  onClose,
  onImageSelect,
  hasUnsavedChanges,
}) => {
  const { showConfirmation } = useConfirmation();

  const handleImageSelect = (imageUrl: string) => {
    if (hasUnsavedChanges) {
      showConfirmation({
        title: 'Unsaved Changes',
        message:
          'Changing the background image will clear all elements. Are you sure you want to continue?',
        onConfirm: () => {
          onImageSelect(imageUrl);
          onClose();
        },
      });
    } else {
      onImageSelect(imageUrl);
      onClose();
    }
  };

  const renderItem = ({ item }: { item: MemeTemplate }) => (
    <Pressable
      style={styles.imageOption}
      onPress={() => handleImageSelect(item.imageUrl)}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.templateImage}
        resizeMode="cover"
      />
      <Text style={styles.templateName} numberOfLines={2}>
        {item.name}
      </Text>
    </Pressable>
  );

  return (
    <BaseBottomSheet
      visible={visible}
      onClose={onClose}
      title="Select Background"
      maxHeight="70%"
      minHeight="50%"
    >
      <FlatList
        data={MEME_TEMPLATES}
        numColumns={2}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.container}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </BaseBottomSheet>
  );
};

export default ImageSelectionBottomSheet;
