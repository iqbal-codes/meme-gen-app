import React from 'react';
import { TextInput, View, TextInputProps } from 'react-native';
import Icon from '@react-native-vector-icons/lucide';
import { COLORS } from '@/constants';
import styles from './styles';

interface SearchInputProps extends Omit<TextInputProps, 'style'> {
  containerStyle?: any;
  inputStyle?: any;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search...',
  placeholderTextColor = COLORS.mutedForeground,
  autoCapitalize = 'none',
  autoCorrect = false,
  containerStyle,
  inputStyle,
  ...props
}) => (
  <View style={[styles.container, containerStyle]}>
    <View style={styles.iconWrapper}>
      <Icon name="search" size={24} color={COLORS.mutedForeground} />
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        {...props}
      />
    </View>
  </View>
);

export default SearchInput;
