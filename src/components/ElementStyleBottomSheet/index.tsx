import React, { useState, useEffect, ReactNode } from 'react';
import {
  View,
  Text,
  TextStyle as RNTextStyle,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, BaseBottomSheet } from '@/components';

import styles from './styles';
import { COLORS } from '@/constants';
import { AllIconProps, CanvasElement, FontFamily } from '@/types';
import { getFont } from '@/utils';

const DEFAULT_TEXT_STYLE: TextStyle = {
  color: '#000000',
  fontFamily: 'nunito',
  fontWeight: 'regular',
  fontStyle: 'normal',
  textDecorationLine: 'none',
  fontSize: 24,
  backgroundColor: 'transparent',
  opacity: 1,
};

const DEFAULT_IMAGE_STYLE: ViewStyle = {
  opacity: 1,
};

interface ElementStyleBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  element?: CanvasElement;
  currentStyle?: TextStyle;
  onStyleChange: (style: TextStyle) => void;
}

const COLOR_OPTIONS = [
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

const COLOR_WITH_TRANSPARENT_OPTIONS = ['transparent', ...COLOR_OPTIONS];

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

const textAigns: {
  icon: AllIconProps;
  value: RNTextStyle['textAlign'];
}[] = [
  { value: 'left', icon: 'align-left' },
  { value: 'center', icon: 'align-center' },
  { value: 'right', icon: 'align-right' },
];

const fontFamily: {
  title: string;
  value: FontFamily;
}[] = [
  { title: 'Nunito', value: 'nunito' },
  { title: 'Montserrat', value: 'montserrat' },
  { title: 'Baskerville', value: 'baskerville' },
  { title: 'Roboto', value: 'roboto' },
  { title: 'Fredoka', value: 'fredoka' },
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
  const [localStyle, setLocalStyle] = useState<TextStyle>(
    element?.style || defaultStyle,
  );

  useEffect(() => {
    if (visible) {
      setLocalStyle(element?.style || defaultStyle);
    }
  }, [visible, element?.style, defaultStyle]);

  const updateLocalStyle = (updates: Partial<TextStyle>) => {
    setLocalStyle((prev) => ({ ...prev, ...updates }));
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
              value={localStyle.opacity as number}
              onValueChange={(value) => updateLocalStyle({ opacity: value })}
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
                {COLOR_OPTIONS.map((color) => (
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
              <Text style={styles.sectionTitle}>Highlight</Text>
              <View style={styles.colorGrid}>
                {COLOR_WITH_TRANSPARENT_OPTIONS.map((color) => (
                  <Button
                    key={color}
                    variant={
                      localStyle.backgroundColor === color
                        ? 'primary'
                        : 'outline'
                    }
                    rounded="full"
                    iconOnly
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      localStyle.backgroundColor === color
                        && styles.selectedColor,
                    ]}
                    icon={color === 'transparent' ? 'ban' : undefined}
                    onPress={() => updateLocalStyle({ backgroundColor: color })}
                  />
                ))}
              </View>
            </View>

            {/* Font Family Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Family</Text>
              <View style={styles.buttonRow}>
                {fontFamily.map((family) => (
                  <Button
                    key={family.value}
                    variant={
                      localStyle.fontFamily === family.value
                        ? 'primary'
                        : 'secondary'
                    }
                    title={family.title}
                    rounded="full"
                    textStyle={{ ...getFont(family.value) }}
                    onPress={() => updateLocalStyle({ fontFamily: family.value })}
                  />
                ))}
              </View>
            </View>

            {/* Font Weight Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Weight</Text>
              <View style={styles.buttonRow}>
                {fontWeights.map((weight) => (
                  <Button
                    key={weight.value}
                    variant={
                      localStyle.fontWeight === weight.value
                        ? 'primary'
                        : 'secondary'
                    }
                    title={weight.title}
                    rounded="full"
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
              <Text style={styles.sectionTitle}>Style</Text>
              <View style={styles.buttonRow}>
                {fontStyles.map((style) => (
                  <Button
                    key={style.value}
                    variant={
                      localStyle.fontStyle === style.value
                        ? 'primary'
                        : 'secondary'
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
              <Text style={styles.sectionTitle}>Decoration</Text>
              <View style={styles.buttonRow}>
                {textDecorations.map((decoration) => (
                  <Button
                    key={decoration.value}
                    variant={
                      localStyle.textDecorationLine === decoration.value
                        ? 'primary'
                        : 'secondary'
                    }
                    title={decoration.title}
                    rounded="full"
                    textStyle={{ textDecorationLine: decoration.value }}
                    onPress={() => updateLocalStyle({
                      textDecorationLine: decoration.value,
                    })}
                  />
                ))}
              </View>
            </View>

            {/* Text Align Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Align</Text>
              <View style={styles.buttonRow}>
                {textAigns.map((align) => (
                  <Button
                    key={align.value}
                    variant={
                      localStyle.textAlign === align.value
                        ? 'primary'
                        : 'secondary'
                    }
                    icon={align.icon}
                    rounded="full"
                    textStyle={{ textAlign: align.value }}
                    onPress={() => updateLocalStyle({
                      textAlign: align.value,
                    })}
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
