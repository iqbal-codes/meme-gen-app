import React, { ReactNode } from 'react';
import { View, Text, Modal, Pressable, DimensionValue } from 'react-native';
import Button from '@/components/Button';
import styles from './styles';

interface BaseBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxHeight?: DimensionValue;
  minHeight?: DimensionValue;
}

const BaseBottomSheet: React.FC<BaseBottomSheetProps> = ({
  visible,
  onClose,
  title,
  children,
  maxHeight = '70%',
  minHeight = '40%',
}) => {
  const bottomSheetStyle = {
    ...styles.bottomSheet,
    maxHeight,
    minHeight,
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <Pressable style={styles.overlay} onPress={onClose} />
        <View style={bottomSheetStyle}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Button variant="ghost" icon="x" onPress={onClose} />
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default BaseBottomSheet;
