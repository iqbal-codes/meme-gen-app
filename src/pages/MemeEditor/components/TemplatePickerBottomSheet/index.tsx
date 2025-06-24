import React, { useState, useMemo } from 'react';
import {
  Text, Image, FlatList, Pressable, TextInput, View,
} from 'react-native';
import { BaseBottomSheet } from '@/components';
import { COLORS } from '@/constants';
import { useDebounce } from '@/utils';
import styles from './styles';
import { MEME_TEMPLATES } from '../../constants';
import { MemeTemplate } from '@/types';
import { useConfirmation } from '@/contexts';

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
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use the debounce hook with 1 second delay
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  // Filter templates based on debounced search query
  const filteredTemplates = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return MEME_TEMPLATES;
    }
    return MEME_TEMPLATES.filter(template =>
      template.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
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
      title="Select Template"
    >
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search templates..."
          placeholderTextColor={COLORS.mutedForeground}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <FlatList
        data={filteredTemplates}
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
