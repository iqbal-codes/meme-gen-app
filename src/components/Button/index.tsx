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
import Icon from '@react-native-vector-icons/lucide';
import styles from './styles';
import { COLORS, RADIUS, FONT } from '@/constants/theme';
import {
  ButtonVariant, ButtonSize, ButtonRounded, AllIconProps,
} from '@/types';

export interface ButtonProps {
  onPress?: (e: GestureResponderEvent) => void;
  title?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: AllIconProps;
  rightIcon?: AllIconProps;
  icon?: AllIconProps; // For icon-only buttons
  iconColor?: string; // Custom icon color
  iconOnly?: boolean; // Explicitly make it icon-only (square)
  rounded?: ButtonRounded; // Control border radius
  enableShadow?: boolean; // Disable shadow
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
  iconColor,
  iconOnly = false,
  rounded = 'md',
  enableShadow = false,
  style,
  textStyle,
}) => {
  // Determine if this is an icon-only button
  const isIconOnly = iconOnly || (icon && !title);

  const getButtonStyle = () => {
    const buttonStyles: StyleProp<ViewStyle> = [
      styles.button,
      enableShadow
        ? styles[`${variant}Button`]
        : styles[`${variant}ButtonNoShadow`],
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

  // Get icon color based on variant or custom color
  const getIconColor = () => {
    if (iconColor) return iconColor;

    switch (variant) {
      case 'primary':
        return COLORS.primaryForeground;
      case 'secondary':
        return COLORS.secondaryForeground;
      case 'outline':
      case 'ghost':
        return COLORS.foreground;
      case 'danger':
        return COLORS.destructiveForeground;
      default:
        return COLORS.foreground;
    }
  };

  // Get icon size based on button size
  const getIconSize = () => {
    switch (size) {
      case 'small':
        return FONT.sizes.sm;
      case 'medium':
        return FONT.sizes.base;
      case 'large':
        return FONT.sizes.lg;
      default:
        return FONT.sizes.base;
    }
  };

  const renderIcon = (iconName: AllIconProps) => (
    <Icon
      name={iconName}
      size={getIconSize()}
      color={getIconColor()}
    />
  );

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
      return (
        <View style={styles.iconOnlyContainer}>
          {icon && renderIcon(icon)}
        </View>
      );
    }

    return (
      <View style={styles.contentContainer}>
        {leftIcon && renderIcon(leftIcon)}
        {title && <Text style={getTextStyle()}>{title}</Text>}
        {rightIcon && renderIcon(rightIcon)}
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
