import React from 'react';
import { TextInput, TextInputProps, TextStyle } from 'react-native';
import styles from './styles';

interface EditableTextInputProps extends Omit<TextInputProps, 'style'> {
  textStyle?: TextStyle | TextStyle[];
  isEditing?: boolean;
  bordered?: boolean;
}

const EditableTextInput: React.FC<EditableTextInputProps> = ({
  textStyle,
  bordered = true,
  multiline = true,
  autoFocus = true,
  ...props
}) => {
  const inputStyles = [
    styles.input,
    bordered && styles.bordered,
    textStyle,
  ];

  return (
    <TextInput
      style={inputStyles}
      multiline={multiline}
      autoFocus={autoFocus}
      {...props}
    />
  );
};

export default EditableTextInput;