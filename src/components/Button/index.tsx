import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View, StyleProp, ViewStyle, TextStyle, } from 'react-native';
import styles from './styles';
import { COLORS } from '../../constants/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  onPress?: () => void;
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: any;
  textStyle?: any;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  block = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    const buttonStyles: StyleProp<ViewStyle> = [styles.button, styles[`${variant}Button`], styles[`${size}Button`]];
    
    if (block) {
      buttonStyles.push(styles.blockButton);
    }
    
    if (disabled) {
      buttonStyles.push(styles.disabledButton);
    }
    
    if (style) {
      buttonStyles.push(style);
    }
    
    return buttonStyles;
  };
  
  const getTextStyle = () => {
    const textStyles: StyleProp<TextStyle> = [styles.text, styles[`${variant}Text`], styles[`${size}Text`]];
    
    if (disabled) {
      textStyles.push(styles.disabledText);
    }
    
    if (textStyle) {
      textStyles.push(textStyle);
    }
    
    return textStyles;
  };
  
  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'ghost' ? COLORS.primary : COLORS.card} 
        />
      ) : (
        <View style={styles.contentContainer}>
          {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
          <Text style={getTextStyle()}>{title}</Text>
          {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;