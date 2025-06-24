import React, { useState, useEffect } from 'react';
import { View, TextStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, BaseBottomSheet } from '@/components';
import { CanvasElement } from '@/types';
import { getFont } from '@/utils';
import styles from './styles';
import StyleSection from './components/StyleSection';
import ColorGrid from './components/ColorGrid';
import ButtonRow from './components/ButtonRow';
import SliderSection from './components/SliderSection';

import {
  COLOR_OPTIONS,
  COLOR_WITH_TRANSPARENT_OPTIONS,
  DEFAULT_TEXT_STYLE,
  DEFAULT_IMAGE_STYLE,
  TEXT_ALIGN_OPTIONS,
  TEXT_DECORATION_OPTIONS,
  FONT_WEIGHT_OPTIONS,
  FONT_STYLE_OPTIONS,
  FONT_FAMILY_OPTIONS,
} from '../../constants';

interface ElementStyleBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  element?: CanvasElement;
  onStyleChange: (style: TextStyle) => void;
}

const ElementStyleBottomSheet: React.FC<ElementStyleBottomSheetProps> = ({
  visible,
  onClose,
  element,
  onStyleChange,
}) => {
  const isTextElement = element?.type === 'text';
  const isImageElement = element?.type === 'image';
  const defaultStyle = isTextElement ? DEFAULT_TEXT_STYLE : DEFAULT_IMAGE_STYLE;

  const [localStyle, setLocalStyle] = useState<TextStyle>(element?.style || defaultStyle);

  useEffect(() => {
    if (visible) {
      setLocalStyle(element?.style || defaultStyle);
    }
  }, [visible, element?.style, defaultStyle]);

  const updateLocalStyle = (updates: Partial<TextStyle>) => {
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
    <BaseBottomSheet visible={visible} onClose={handleCancel} title={getTitle()}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Opacity Section */}
        <StyleSection title="Opacity">
          <SliderSection
            value={localStyle.opacity as number}
            onValueChange={value => updateLocalStyle({ opacity: value })}
          />
        </StyleSection>

        {/* Text-specific sections */}
        {isTextElement && (
          <>
            {/* Color Section */}
            <StyleSection title="Color">
              <ColorGrid
                colors={COLOR_OPTIONS}
                selectedColor={localStyle.color as string}
                onColorSelect={color => updateLocalStyle({ color })}
              />
            </StyleSection>

            {/* Text Highlight Section */}
            <StyleSection title="Highlight">
              <ColorGrid
                colors={COLOR_WITH_TRANSPARENT_OPTIONS}
                selectedColor={localStyle.backgroundColor as string}
                onColorSelect={color => updateLocalStyle({ backgroundColor: color })}
                showTransparentIcon
              />
            </StyleSection>

            {/* Text Shadow Color Section */}
            <StyleSection title="Shadow Color">
              <ColorGrid
                colors={COLOR_WITH_TRANSPARENT_OPTIONS}
                selectedColor={localStyle.textShadowColor as string}
                onColorSelect={color => updateLocalStyle({ textShadowColor: color })}
                showTransparentIcon
              />
            </StyleSection>

            {/* Font Family Section */}
            <StyleSection title="Family">
              <ButtonRow
                options={FONT_FAMILY_OPTIONS.map(family => ({
                  title: family.title,
                  value: family.value,
                  textStyle: { ...getFont(family.value) },
                }))}
                selectedValue={localStyle.fontFamily as string}
                onSelect={value => updateLocalStyle({ fontFamily: value })}
              />
            </StyleSection>

            {/* Font Weight Section */}
            <StyleSection title="Weight">
              <ButtonRow
                options={FONT_WEIGHT_OPTIONS.map(weight => ({
                  title: weight.title,
                  value: weight.value as string,
                  textStyle: { fontWeight: weight.value },
                }))}
                selectedValue={localStyle.fontWeight as string}
                onSelect={value =>
                  updateLocalStyle({ fontWeight: value as TextStyle['fontWeight'] })
                }
              />
            </StyleSection>

            {/* Font Style Section */}
            <StyleSection title="Style">
              <ButtonRow
                options={FONT_STYLE_OPTIONS.map(style => ({
                  title: style.title,
                  value: style.value as string,
                  textStyle: { fontStyle: style.value },
                }))}
                selectedValue={localStyle.fontStyle as string}
                onSelect={value => updateLocalStyle({ fontStyle: value as TextStyle['fontStyle'] })}
              />
            </StyleSection>

            {/* Text Decoration Section */}
            <StyleSection title="Decoration">
              <ButtonRow
                options={TEXT_DECORATION_OPTIONS.map(decoration => ({
                  title: decoration.title,
                  value: decoration.value as string,
                  textStyle: { textDecorationLine: decoration.value },
                }))}
                selectedValue={localStyle.textDecorationLine as string}
                onSelect={value =>
                  updateLocalStyle({ textDecorationLine: value as TextStyle['textDecorationLine'] })
                }
              />
            </StyleSection>

            {/* Text Align Section */}
            <StyleSection title="Align">
              <ButtonRow
                options={TEXT_ALIGN_OPTIONS.map(align => ({
                  value: align.value as string,
                  icon: align.icon,
                  textStyle: { textAlign: align.value },
                }))}
                selectedValue={localStyle.textAlign as string}
                onSelect={value => updateLocalStyle({ textAlign: value as TextStyle['textAlign'] })}
              />
            </StyleSection>
          </>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button variant="secondary" title="Reset" rounded="full" block onPress={handleReset} />
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
