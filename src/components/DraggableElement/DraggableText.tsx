import React from 'react';
import { TextInput, Text, StyleProp, TextStyle as RNTextStyle } from 'react-native';
import { CanvasElement } from '../../types';
import styles from './styles';

interface DraggableTextProps {
  element: CanvasElement;
  isEditing: boolean;
  isSelecting: boolean;
  onUpdateText: (text: string) => void;
  onEdit: (id?: string) => void;
}

const DraggableText: React.FC<DraggableTextProps> = ({
  element,
  isEditing,
  isSelecting,
  onUpdateText,
  onEdit,
}) => {
  if (element.type !== 'text' || !element.text) {
    return null;
  }

  return (
    <>
      {isEditing ? (
        <TextInput
          style={[styles.text, styles.bordered, element.style as StyleProp<RNTextStyle>]}
          value={element.text}
          onChangeText={onUpdateText}
          multiline
          autoFocus
          onBlur={() => onEdit()}
        />
      ) : (
        <Text style={[styles.text, isSelecting && styles.bordered, element.style as StyleProp<RNTextStyle>]}>
          {element.text}
        </Text>
      )}
    </>
  );
};

export default DraggableText;