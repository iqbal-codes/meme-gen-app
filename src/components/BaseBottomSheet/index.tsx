import React, { ReactNode } from 'react';
import { View, Text, Modal, Pressable, ScrollView, DimensionValue } from 'react-native';
import Icons from '@react-native-vector-icons/lucide';
import Button from '@/components/Button';
import { COLORS } from '@/constants/theme';
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
            {headerAction || (
              <Button
                variant="ghost"
                icon={<Icons name="x" color={COLORS.primary} size={24} />}
                onPress={onClose}
              />
            )}
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default BaseBottomSheet;
