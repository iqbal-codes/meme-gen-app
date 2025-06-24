import React from 'react';
import { View, TextStyle } from 'react-native';
import { Button } from '@/components';
import { AllIconProps } from '@/types';
import styles from '../styles';

interface ButtonOption {
  title?: string;
  value: string;
  icon?: AllIconProps;
  textStyle?: TextStyle;
}

interface ButtonRowProps {
  options: ButtonOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
}

const ButtonRow: React.FC<ButtonRowProps> = ({
  options,
  selectedValue,
  onSelect,
}) => (
  <View style={styles.buttonRow}>
    {options.map((option) => (
      <Button
        key={option.value}
        variant={selectedValue === option.value ? 'primary' : 'secondary'}
        title={option.title}
        icon={option.icon}
        rounded="full"
        textStyle={option.textStyle}
        onPress={() => onSelect(option.value)}
      />
    ))}
  </View>
);

export default ButtonRow;