import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import { CanvasElement } from '../../types';
import styles from './styles';
import { Edit } from 'lucide-react-native';
import { COLORS } from '../../constants/theme';
import ButtonIcon from '../ButtonIcon';

interface DraggableImageProps {
  element: CanvasElement;
  isEditing: boolean;
  isSelecting: boolean;
  onUpdateImage?: (imageUri: string) => void;
  onEdit: (id?: string) => void;
}

const DraggableImage: React.FC<DraggableImageProps> = ({ element, isEditing, isSelecting, onUpdateImage, onEdit }) => {
  const [tempImageUri, setTempImageUri] = useState(element.imageUri || '');

  if (element.type !== 'image' || !element.imageUri) {
    return null;
  }

  const handleImageUriSubmit = () => {
    if (onUpdateImage && tempImageUri.trim()) {
      onUpdateImage(tempImageUri.trim());
      onEdit(); // Exit edit mode
    }
  };

  const handleEditPress = () => {
    setTempImageUri(element.imageUri || '');
    onEdit(element.id);
  };

  return (
    <View style={[styles.imageContainer, isSelecting && styles.bordered]}>
      <Image
        source={{ uri: element.imageUri }}
        style={[
          {
            width: element.width || 150,
            height: element.height || 150,
          },
        ]}
        resizeMode="cover"
      />
    </View>
  );
};

export default DraggableImage;
