import React from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  Pressable,
} from 'react-native';
import BaseBottomSheet from '../BaseBottomSheet';
import styles from './styles';
import { MEME_TEMPLATES } from '../../constants/memeTemplates';
import { X } from 'lucide-react-native';
import { COLORS } from '../../constants/theme';
import { MemeTemplate } from '../../types';
import Button from '../Button';

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
  const handleImageSelect = (imageUrl: string) => {
    if (hasUnsavedChanges) {
      Alert.alert(
        'Unsaved Changes',
        'Changing the background image will clear all elements. Are you sure you want to continue?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Continue',
            style: 'destructive',
            onPress: () => {
              onImageSelect(imageUrl);
              onClose();
            },
          },
        ],
      );
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
      headerAction={
        <Button
          variant="ghost"
          icon={<X color={COLORS.primary} />}
          onPress={onClose}
        />
      }
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
