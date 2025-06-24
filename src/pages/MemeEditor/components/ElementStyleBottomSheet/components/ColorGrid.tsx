import React from 'react';
import { View } from 'react-native';
import { Button } from '@/components';
import styles from '../styles';

interface ColorGridProps {
  colors: string[];
  selectedColor?: string;
  onColorSelect: (color: string) => void;
  showTransparentIcon?: boolean;
}

const ColorGrid: React.FC<ColorGridProps> = ({
  colors,
  selectedColor,
  onColorSelect,
  showTransparentIcon = false,
}) => (
  <View style={styles.colorGrid}>
    {colors.map((color) => (
      <Button
        key={color}
        variant={selectedColor === color ? 'primary' : 'outline'}
        rounded="full"
        iconOnly
        style={[
          styles.colorOption,
          { backgroundColor: color },
          selectedColor === color && styles.selectedColor,
        ]}
        icon={color === 'transparent' && showTransparentIcon ? 'ban' : undefined}
        onPress={() => onColorSelect(color)}
      />
    ))}
  </View>
);

export default ColorGrid;