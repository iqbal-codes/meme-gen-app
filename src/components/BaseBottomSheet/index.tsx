import React, { ReactNode } from 'react';
import { View, Text, Modal, Pressable, ScrollView, DimensionValue } from 'react-native';
import styles from './styles';

interface BaseBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  headerAction?: ReactNode;
  children: ReactNode;
  maxHeight?: DimensionValue;
  minHeight?: DimensionValue;
  showScrollIndicator?: boolean;
}

const BaseBottomSheet: React.FC<BaseBottomSheetProps> = ({
  visible,
  onClose,
  title,
  headerAction,
  children,
  maxHeight = '60%',
  minHeight = '40%',
  showScrollIndicator = false,
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
            {headerAction}
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={showScrollIndicator}>
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default BaseBottomSheet;