import React, { useState, useEffect } from 'react';
import { View, Text, StyleProp, TextStyle as RNTextStyle } from 'react-native';
import Slider from '@react-native-community/slider';
import Button from '../Button';
import BaseBottomSheet from '../BaseBottomSheet';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import Icons from '@react-native-vector-icons/lucide';
import { COLORS } from '../../constants/theme';
import { CanvasElement, ElementStyle } from '../../types';

const DEFAULT_TEXT_STYLE: ElementStyle = {
  color: '#000000',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecorationLine: 'none',
  fontSize: 24,
  backgroundColor: 'transparent',
  opacity: 1,
};

const DEFAULT_IMAGE_STYLE: ElementStyle = {
  opacity: 1,
};

interface ElementStyleBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  element?: CanvasElement;
  currentStyle?: ElementStyle;
  onStyleChange: (style: ElementStyle) => void;
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

const highlightColors = ['transparent', ...colors];

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

const ElementStyleBottomSheet: React.FC<ElementStyleBottomSheetProps> = ({
  visible,
  onClose,
  element,
  onStyleChange,
}) => {
  const isTextElement = element?.type === 'text';
  const isImageElement = element?.type === 'image';

  const defaultStyle = isTextElement ? DEFAULT_TEXT_STYLE : DEFAULT_IMAGE_STYLE;
  const [localStyle, setLocalStyle] = useState<ElementStyle>(
    element?.style || defaultStyle,
  );

  useEffect(() => {
    if (visible) {
      setLocalStyle(element?.style || defaultStyle);
    }
  }, [visible, element?.style, defaultStyle]);

  const updateLocalStyle = (updates: Partial<ElementStyle>) => {
    setLocalStyle(prev => ({ ...prev, ...updates }));
  };

  const handleSave = () => {
    onStyleChange(localStyle);
    onClose();
  };

  const handleCancel = () => {
    setLocalStyle(element?.style || defaultStyle);
    onClose();
  };

  const handleReset = () => {
    setLocalStyle(defaultStyle);
  };

  const getTitle = () => {
    if (isTextElement) return 'Text Style';
    if (isImageElement) return 'Image Style';
    return 'Element Style';
  };

  return (
    <BaseBottomSheet
      visible={visible}
      onClose={handleCancel}
      title={getTitle()}
      maxHeight="70%"
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Opacity Section - Available for both text and image */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opacity</Text>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={localStyle.opacity}
              onValueChange={value => updateLocalStyle({ opacity: value })}
              minimumTrackTintColor={COLORS.primary}
              maximumTrackTintColor={COLORS.mutedForeground}
              thumbTintColor={COLORS.primary}
              step={0.05}
            />
          </View>
        </View>

        {/* Text-specific sections */}
        {isTextElement && (
          <>
            {/* Color Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Color</Text>
              <View style={styles.colorGrid}>
                {colors.map(color => (
                  <Button
                    key={color}
                    variant={localStyle.color === color ? 'primary' : 'outline'}
                    rounded="full"
                    iconOnly={localStyle.color !== color}
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
                      localStyle.backgroundColor === bgColor
                        ? 'primary'
                        : 'outline'
                    }
                    rounded="full"
                    iconOnly
                    style={[
                      styles.colorOption,
                      { backgroundColor: bgColor },
                      localStyle.backgroundColor === bgColor &&
                        styles.selectedColor,
                    ]}
                    icon={
                      bgColor === 'transparent' && (
                        <Icons name="ban" size={24} color={COLORS.destructive} />
                      )
                    }
                    onPress={() =>
                      updateLocalStyle({ backgroundColor: bgColor })
                    }
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
                      localStyle.fontWeight === weight.value
                        ? 'primary'
                        : 'outline'
                    }
                    title={weight.title}
                    rounded="full"
                    textStyle={{
                      fontWeight: weight.value,
                    }}
                    onPress={() =>
                      updateLocalStyle({ fontWeight: weight.value })
                    }
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
                      localStyle.fontStyle === style.value
                        ? 'primary'
                        : 'outline'
                    }
                    title={style.title}
                    rounded="full"
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
          </>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            variant="secondary"
            title="Reset"
            rounded="full"
            block
            onPress={handleReset}
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

export default ElementStyleBottomSheet;
