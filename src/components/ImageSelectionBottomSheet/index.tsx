import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import BaseBottomSheet from '../BaseBottomSheet';
import styles from './styles';
import { MEME_TEMPLATES } from '../../constants/memeTemplates';
import ButtonIcon from '../ButtonIcon';
import { X } from 'lucide-react-native';
import { COLORS } from '../../constants/theme';

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
        'Changing the background image will clear all text elements. Are you sure you want to continue?',
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

  return (
    <BaseBottomSheet
      visible={visible}
      onClose={onClose}
      title="Select Background Image"
      headerAction={<ButtonIcon variant='ghost' icon={<X color={COLORS.primary} />} onPress={onClose} />}
      maxHeight="70%"
      minHeight="50%"
    >
            <View style={styles.imageGrid}>
              {MEME_TEMPLATES.map((template, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.imageOption}
                  onPress={() => handleImageSelect(template.imageUrl)}
                >
                  <Image source={{ uri: template.imageUrl }} style={styles.templateImage} resizeMode="cover" />
                  <Text style={styles.templateName} numberOfLines={2}>
                    {template.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
    </BaseBottomSheet>
  );
};

export default ImageSelectionBottomSheet;
