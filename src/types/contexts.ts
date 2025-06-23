import { ButtonVariant } from './ui';

export interface ConfirmationOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: ButtonVariant;
  cancelVariant?: ButtonVariant;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
}
