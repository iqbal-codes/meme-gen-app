import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles';

interface StyleSectionProps {
  title: string;
  children: React.ReactNode;
}

const StyleSection: React.FC<StyleSectionProps> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

export default StyleSection;
