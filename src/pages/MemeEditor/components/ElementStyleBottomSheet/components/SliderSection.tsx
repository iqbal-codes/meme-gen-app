import React from 'react';
import { View } from 'react-native';
import Slider from '@react-native-community/slider';
import { COLORS } from '@/constants';
import styles from '../styles';
import { EDITOR_CONFIG } from '@/pages/MemeEditor/constants';

interface SliderSectionProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
}

const SliderSection: React.FC<SliderSectionProps> = ({
  value,
  onValueChange,
  minimumValue = EDITOR_CONFIG.SLIDER_MIN,
  maximumValue = EDITOR_CONFIG.SLIDER_MAX,
  step = EDITOR_CONFIG.SLIDER_STEP,
}) => (
  <View style={styles.sliderContainer}>
    <Slider
      style={styles.slider}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      value={value}
      onValueChange={onValueChange}
      minimumTrackTintColor={COLORS.primary}
      maximumTrackTintColor={COLORS.mutedForeground}
      thumbTintColor={COLORS.primary}
      step={step}
    />
  </View>
);

export default SliderSection;