import React, { useState, useEffect } from 'react';
import { View, Text, StyleProp, TextStyle as RNTextStyle } from 'react-native';
import Button from '../Button';
import BaseBottomSheet from '../BaseBottomSheet';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { Ban, X, Check } from 'lucide-react-native';
import { COLORS } from '../../constants/theme';

export interface TextStyle {
  color: string;
  fontWeight: StyleProp<RNTextStyle['fontWeight']>;
  fontStyle: StyleProp<RNTextStyle['fontStyle']>;
  textDecorationLine: StyleProp<RNTextStyle['textDecorationLine']>;
  fontSize: number;
  backgroundColor?: string; // New property for text highlight
}

const DEFAULT_TEXT_STYLE: TextStyle = {
  color: '#000000',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecorationLine: 'none',
  fontSize: 24,
  backgroundColor: 'transparent', // Default to transparent
};

interface TextStyleBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  currentStyle?: TextStyle;
  onStyleChange: (style: TextStyle) => void;
}

const colors = [
  '#000000', // Black
  '#FFFFFF', // White
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFFF00', // Yellow
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan
  '#FFA500', // Orange
  '#800080', // Purple
];

// Add background colors for text highlight
const highlightColors = [
  'transparent', // No highlight
  ...colors
];

const fontWeights: { title: string; value: RNTextStyle['fontWeight'] }[] = [
  { title: 'Normal', value: 'normal' },
  { title: 'Bold', value: 'bold' },
];

const fontStyles: { title: string; value: RNTextStyle['fontStyle'] }[] = [
  { title: 'Normal', value: 'normal' },
  { title: 'Italic', value: 'italic' },
];

const textDecorations: {
  title: string;
  value: RNTextStyle['textDecorationLine'];
}[] = [
  { title: 'None', value: 'none' },
  { title: 'Underline', value: 'underline' },
  { title: 'Line Through', value: 'line-through' },
];

const TextStyleBottomSheet: React.FC<TextStyleBottomSheetProps> = ({
  visible,
  onClose,
  currentStyle = DEFAULT_TEXT_STYLE,
  onStyleChange,
}) => {
  // Local state to store temporary changes
  const [localStyle, setLocalStyle] = useState<TextStyle>(currentStyle);

  // Update local state when currentStyle changes or when sheet becomes visible
  useEffect(() => {
    if (visible) {
      setLocalStyle(currentStyle);
    }
  }, [visible, currentStyle]);

  const updateLocalStyle = (updates: Partial<TextStyle>) => {
    setLocalStyle(prev => ({ ...prev, ...updates }));
  };

  const handleSave = () => {
    onStyleChange(localStyle);
    onClose();
  };

  const handleCancel = () => {
    setLocalStyle(currentStyle); // Reset to original style
    onClose();
  };

  return (
    <BaseBottomSheet
      visible={visible}
      onClose={handleCancel}
      title="Text Style"
      headerAction={
        <Button
          variant="ghost"
          icon={<X color={COLORS.primary} />}
          onPress={handleCancel}
        />
      }
      maxHeight="70%"
      minHeight="50%"
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Color Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color</Text>
          <View style={styles.colorGrid}>
            {colors.map(color => (
              <Button
                key={color}
                variant={localStyle.color === color ? 'primary' : 'outline'}
                rounded="full"
                iconOnly
                noShadow
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  localStyle.color === color && styles.selectedColor,
                ]}
                onPress={() => updateLocalStyle({ color })}
              />
            ))}
          </View>
        </View>

        {/* Text Highlight Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Text Highlight</Text>
          <View style={styles.colorGrid}>
            {highlightColors.map(bgColor => (
              <Button
                key={bgColor}
                variant={
                  localStyle.backgroundColor === bgColor ? 'primary' : 'outline'
                }
                rounded="full"
                iconOnly
                noShadow
                style={[
                  styles.colorOption,
                  { backgroundColor: bgColor },
                  localStyle.backgroundColor === bgColor &&
                    styles.selectedColor,
                ]}
                icon={
                  bgColor === 'transparent' && (
                    <Ban color={COLORS.destructive} />
                  )
                }
                onPress={() => updateLocalStyle({ backgroundColor: bgColor })}
              />
            ))}
          </View>
        </View>

        {/* Font Weight Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Font Weight</Text>
          <View style={styles.buttonRow}>
            {fontWeights.map(weight => (
              <Button
                key={weight.value}
                variant={
                  localStyle.fontWeight === weight.value ? 'primary' : 'outline'
                }
                title={weight.title}
                rounded="full"
                noShadow
                textStyle={{
                  fontWeight: weight.value,
                }}
                onPress={() => updateLocalStyle({ fontWeight: weight.value })}
              />
            ))}
          </View>
        </View>

        {/* Font Style Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Font Style</Text>
          <View style={styles.buttonRow}>
            {fontStyles.map(style => (
              <Button
                key={style.value}
                variant={
                  localStyle.fontStyle === style.value ? 'primary' : 'outline'
                }
                title={style.title}
                rounded="full"
                noShadow
                textStyle={{
                  fontStyle: style.value,
                }}
                onPress={() => updateLocalStyle({ fontStyle: style.value })}
              />
            ))}
          </View>
        </View>

        {/* Text Decoration Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Text Decoration</Text>
          <View style={styles.buttonRow}>
            {textDecorations.map(decoration => (
              <Button
                key={decoration.value}
                variant={
                  localStyle.textDecorationLine === decoration.value
                    ? 'primary'
                    : 'outline'
                }
                title={decoration.title}
                rounded="full"
                noShadow
                textStyle={
                  decoration.value !== 'none'
                    ? { textDecorationLine: decoration.value as any }
                    : undefined
                }
                onPress={() =>
                  updateLocalStyle({
                    textDecorationLine: decoration.value as any,
                  })
                }
              />
            ))}
          </View>
        </View>

        {/* Save Button Section */}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            variant="outline"
            title="Reset"
            rounded="full"
            block
            onPress={handleCancel}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            variant="primary"
            rounded="full"
            block
            title="Save Changes"
            onPress={handleSave}
          />
        </View>
      </View>
    </BaseBottomSheet>
  );
};

export default TextStyleBottomSheet;
