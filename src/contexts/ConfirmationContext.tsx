import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ButtonVariant } from '../types/ui';
// Import the modal component
import { ConfirmationModal } from '../components/ConfirmationModal';

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

interface ConfirmationContextType {
  showConfirmation: (options: ConfirmationOptions) => void;
}

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(
  undefined,
);

export const useConfirmation = (): ConfirmationContextType => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error(
      'useConfirmation must be used within a ConfirmationProvider',
    );
  }
  return context;
};

interface ConfirmationProviderProps {
  children: ReactNode;
}

export const ConfirmationProvider: React.FC<ConfirmationProviderProps> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [options, setOptions] = useState<ConfirmationOptions | null>(null);

  const showConfirmation = (confirmationOptions: ConfirmationOptions) => {
    setOptions(confirmationOptions);
    setIsVisible(true);
  };

  const hideConfirmation = () => {
    setIsVisible(false);
    setOptions(null);
  };

  const handleConfirm = () => {
    options?.onConfirm?.();
    hideConfirmation();
  };

  const handleCancel = () => {
    options?.onCancel?.();
    hideConfirmation();
  };

  return (
    <ConfirmationContext.Provider value={{ showConfirmation }}>
      {children}
      {isVisible && options && (
        <ConfirmationModal
          visible={isVisible}
          title={options.title}
          message={options.message}
          confirmText={options.confirmText}
          cancelText={options.cancelText}
          confirmVariant={options.confirmVariant}
          cancelVariant={options.cancelVariant}
          showCancel={options.showCancel}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onClose={hideConfirmation}
        />
      )}
    </ConfirmationContext.Provider>
  );
};
