import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import styles from './styles';
import { COLORS, RADIUS } from '../../constants/theme';
import { ButtonVariant, ButtonSize, ButtonRounded } from '../../types';

export interface ButtonProps {
  onPress?: (e: GestureResponderEvent) => void;
  title?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  icon?: React.ReactNode; // For icon-only buttons
  iconOnly?: boolean; // Explicitly make it icon-only (square)
  rounded?: ButtonRounded; // Control border radius
  noShadow?: boolean; // Disable shadow
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
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
  icon,
  iconOnly = false,
  rounded = 'md',
  noShadow = false,
  style,
  textStyle,
}) => {
  // Determine if this is an icon-only button
  const isIconOnly = iconOnly || (icon && !title);

  const getButtonStyle = () => {
    const buttonStyles: StyleProp<ViewStyle> = [
      styles.button,
      noShadow ? styles[`${variant}ButtonNoShadow`] : styles[`${variant}Button`],
      isIconOnly ? styles[`${size}IconButton`] : styles[`${size}Button`],
      { borderRadius: RADIUS[rounded] }, // Apply rounded prop
    ];

    if (block && !isIconOnly) {
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
    const textStyles: StyleProp<TextStyle> = [
      styles.text,
      styles[`${variant}Text`],
      styles[`${size}Text`],
    ];

    if (disabled) {
      textStyles.push(styles.disabledText);
    }

    if (textStyle) {
      textStyles.push(textStyle);
    }

    return textStyles;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          color={
            variant === 'outline' || variant === 'ghost'
              ? COLORS.primary
              : COLORS.card
          }
        />
      );
    }

    if (isIconOnly) {
      return <View style={styles.iconOnlyContainer}>{icon}</View>;
    }

    return (
      <View style={styles.contentContainer}>
        {leftIcon && <View>{leftIcon}</View>}
        {title && <Text style={getTextStyle()}>{title}</Text>}
        {rightIcon && <View>{rightIcon}</View>}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

export default Button;
