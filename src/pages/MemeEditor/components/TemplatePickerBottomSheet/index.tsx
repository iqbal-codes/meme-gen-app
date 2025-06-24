import React, { useState, useMemo } from 'react';
import { Text, Image, FlatList, Pressable } from 'react-native';
import Icon from '@react-native-vector-icons/lucide';
import { BaseBottomSheet, SearchInput } from '@/components';
import { COLORS } from '@/constants';
import { useDebounce } from '@/utils';
import styles from './styles';
import { MEME_TEMPLATES } from '../../constants';
import { MemeTemplate } from '@/types';
import { useConfirmation } from '@/contexts';
import PhotoPickerBottomSheet from '../PhotoPickerBottomSheet';

interface TemplatePickerBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onImageSelect: (imageUrl: string) => void;
  hasUnsavedChanges: boolean;
}

const TemplatePickerBottomSheet: React.FC<TemplatePickerBottomSheetProps> = ({
  visible,
  onClose,
  onImageSelect,
  hasUnsavedChanges,
}) => {
  const { showConfirmation } = useConfirmation();
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Use the debounce hook with 1 second delay
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  // Filter templates based on debounced search query
  const filteredTemplates = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return MEME_TEMPLATES;
    }
    return MEME_TEMPLATES.filter(template =>
      template.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
    );
  }, [debouncedSearchQuery]);

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

  const handlePhotoSelect = (imageUri: string) => {
    setShowPhotoPicker(false);
    handleImageSelect(imageUri);
  };

  const renderItem = ({ item }: { item: MemeTemplate }) => {
    if (item.imageUrl === '') {
      return (
        <Pressable style={styles.uploadOption} onPress={() => setShowPhotoPicker(true)}>
          <Icon name="image-plus" size={30} color={COLORS.primary} />
          <Text style={styles.uploadText} numberOfLines={2}>
            Select from Gallery
          </Text>
        </Pressable>
      );
    }
    return (
      <Pressable style={styles.imageOption} onPress={() => handleImageSelect(item.imageUrl)}>
        <Image source={{ uri: item.imageUrl }} style={styles.templateImage} resizeMode="cover" />
        <Text style={styles.templateName} numberOfLines={2}>
          {item.name}
        </Text>
      </Pressable>
    );
  };

  return (
    <BaseBottomSheet visible={visible} onClose={onClose} title="Select Template">
      <SearchInput
        placeholder="Search templates..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={[{ name: 'Upload from Gallery', imageUrl: '' }, ...filteredTemplates]}
        numColumns={2}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.container}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      <PhotoPickerBottomSheet
        visible={showPhotoPicker}
        onClose={() => setShowPhotoPicker(false)}
        onPhotoSelect={handlePhotoSelect}
      />
    </BaseBottomSheet>
  );
};

export default TemplatePickerBottomSheet;
