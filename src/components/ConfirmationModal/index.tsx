import React from 'react';
import { Modal, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import Button from '../Button';
import { ButtonVariant } from '../../types/ui';
import styles from './styles';

export interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: ButtonVariant;
  cancelVariant?: ButtonVariant;
  showCancel?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  onClose: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  cancelVariant = 'secondary',
  showCancel = true,
  onConfirm,
  onCancel,
  onClose,
}) => {
  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const handleBackdropPress = () => {
    if (showCancel) {
      handleCancel();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleBackdropPress}
    >
      <StatusBar
        backgroundColor="rgba(0, 0, 0, 0.5)"
        barStyle="light-content"
      />
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleBackdropPress}
      >
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPress={e => e.stopPropagation()}
        >
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>

            <View style={styles.buttonContainer}>
              {showCancel && (
                <Button
                  title={cancelText}
                  variant={cancelVariant}
                  onPress={handleCancel}
                  style={styles.button}
                  rounded="full"
                  size="small"
                />
              )}
              <Button
                title={confirmText}
                variant={confirmVariant}
                onPress={onConfirm}
                style={[styles.button, showCancel && styles.confirmButton]}
                rounded="full"
                size="small"
              />
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
