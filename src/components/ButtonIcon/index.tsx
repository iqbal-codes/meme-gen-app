import React from 'react';
import { TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';
import { COLORS } from '../../constants/theme';
import styles from './styles';

export type ButtonIconVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonIconSize = 'small' | 'medium' | 'large';

export interface ButtonIconProps {
  onPress?: () => void;
  variant?: ButtonIconVariant;
  size?: ButtonIconSize;
  disabled?: boolean;
  icon: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  icon,
  style,
}) => {
  const getButtonStyle = () => {
    const buttonStyles: StyleProp<ViewStyle> = [
      styles.button, 
      styles[`${variant}Button`], 
      styles[`${size}Button`]
    ];
    
    if (disabled) {
      buttonStyles.push(styles.disabledButton);
    }
    
    if (style) {
      buttonStyles.push(style);
    }
    
    return buttonStyles;
  };
  
  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>{icon}</View>
    </TouchableOpacity>
  );
};

export default ButtonIcon;