import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  StyleProp,
  TextStyle as RNTextStyle,
} from 'react-native';
import Button from '../Button';
import styles from './styles';

export interface TextStyle {
  color: string;
  fontWeight: StyleProp<RNTextStyle['fontWeight']>;
  fontStyle: StyleProp<RNTextStyle['fontStyle']>;
  textDecorationLine: StyleProp<RNTextStyle['textDecorationLine']>;
  fontSize: number;
}

interface TextStyleBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  currentStyle: TextStyle;
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

const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 48];

const TextStyleBottomSheet: React.FC<TextStyleBottomSheetProps> = ({
  visible,
  onClose,
  currentStyle,
  onStyleChange,
}) => {
  const updateStyle = (updates: Partial<TextStyle>) => {
    onStyleChange({ ...currentStyle, ...updates });
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <Pressable style={styles.overlay} onPress={onClose} />
        <View style={styles.bottomSheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Text Style</Text>
            <Button title="Done" variant="primary" size="small" onPress={onClose} />
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Color Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Color</Text>
              <View style={styles.colorGrid}>
                {colors.map(color => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      currentStyle.color === color && styles.selectedColor,
                    ]}
                    onPress={() => updateStyle({ color })}
                  />
                ))}
              </View>
            </View>

            {/* Font Size Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Font Size</Text>
              <View style={styles.fontSizeGrid}>
                {fontSizes.map(size => (
                  <TouchableOpacity
                    key={size}
                    style={[styles.fontSizeOption, currentStyle.fontSize === size && styles.selectedFontSize]}
                    onPress={() => updateStyle({ fontSize: size })}
                  >
                    <Text style={styles.fontSizeText}>{size}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Font Weight Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Font Weight</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.styleButton, currentStyle.fontWeight === 'normal' && styles.selectedButton]}
                  onPress={() => updateStyle({ fontWeight: 'normal' })}
                >
                  <Text style={styles.buttonText}>Normal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.styleButton, currentStyle.fontWeight === 'bold' && styles.selectedButton]}
                  onPress={() => updateStyle({ fontWeight: 'bold' })}
                >
                  <Text style={[styles.buttonText, { fontWeight: 'bold' }]}>Bold</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Font Style Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Font Style</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.styleButton, currentStyle.fontStyle === 'normal' && styles.selectedButton]}
                  onPress={() => updateStyle({ fontStyle: 'normal' })}
                >
                  <Text style={styles.buttonText}>Normal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.styleButton, currentStyle.fontStyle === 'italic' && styles.selectedButton]}
                  onPress={() => updateStyle({ fontStyle: 'italic' })}
                >
                  <Text style={[styles.buttonText, { fontStyle: 'italic' }]}>Italic</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Text Decoration Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Text Decoration</Text>
              <View style={styles.buttonColumn}>
                <TouchableOpacity
                  style={[styles.styleButton, currentStyle.textDecorationLine === 'none' && styles.selectedButton]}
                  onPress={() => updateStyle({ textDecorationLine: 'none' })}
                >
                  <Text style={styles.buttonText}>None</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.styleButton, currentStyle.textDecorationLine === 'underline' && styles.selectedButton]}
                  onPress={() => updateStyle({ textDecorationLine: 'underline' })}
                >
                  <Text style={[styles.buttonText, { textDecorationLine: 'underline' }]}>Underline</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.styleButton,
                    currentStyle.textDecorationLine === 'line-through' && styles.selectedButton,
                  ]}
                  onPress={() => updateStyle({ textDecorationLine: 'line-through' })}
                >
                  <Text style={[styles.buttonText, { textDecorationLine: 'line-through' }]}>Strike Through</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default TextStyleBottomSheet;
