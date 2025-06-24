import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Text, TouchableOpacity } from 'react-native';
import { ConfirmationProvider, useConfirmation } from './ConfirmationContext';

// Test component that uses the confirmation context
const TestComponent: React.FC = () => {
  const { showConfirmation } = useConfirmation();

  const handleShowConfirmation = () => {
    showConfirmation({
      title: 'Test Confirmation',
      message: 'Are you sure?',
      onConfirm: jest.fn(),
      onCancel: jest.fn(),
    });
  };

  const handleShowCustomConfirmation = () => {
    showConfirmation({
      title: 'Custom Confirmation',
      message: 'Custom message',
      confirmText: 'Yes',
      cancelText: 'No',
      confirmVariant: 'danger',
      cancelVariant: 'outline',
      showCancel: false,
      onConfirm: jest.fn(),
      onCancel: jest.fn(),
    });
  };

  return (
    <>
      <TouchableOpacity onPress={handleShowConfirmation} testID="show-confirmation">
        <Text>Show Confirmation</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleShowCustomConfirmation} testID="show-custom-confirmation">
        <Text>Show Custom Confirmation</Text>
      </TouchableOpacity>
    </>
  );
};

// Test component without provider
const TestComponentWithoutProvider: React.FC = () => {
  const { showConfirmation } = useConfirmation();

  return (
    <TouchableOpacity onPress={() => showConfirmation({ title: 'Test', message: 'Test' })}>
      <Text>Test</Text>
    </TouchableOpacity>
  );
};

describe('ConfirmationContext', () => {
  describe('ConfirmationProvider', () => {
    it('renders children correctly', () => {
      const { getByText } = render(
        <ConfirmationProvider>
          <Text>Test Child</Text>
        </ConfirmationProvider>
      );

      expect(getByText('Test Child')).toBeTruthy();
    });

    it('shows confirmation modal when showConfirmation is called', async () => {
      const { getByTestId, getByText } = render(
        <ConfirmationProvider>
          <TestComponent />
        </ConfirmationProvider>
      );

      fireEvent.press(getByTestId('show-confirmation'));

      await waitFor(() => {
        expect(getByText('Test Confirmation')).toBeTruthy();
        expect(getByText('Are you sure?')).toBeTruthy();
        expect(getByText('Confirm')).toBeTruthy();
        expect(getByText('Cancel')).toBeTruthy();
      });
    });

    it('shows confirmation modal with custom options', async () => {
      const { getByTestId, getByText, queryByText } = render(
        <ConfirmationProvider>
          <TestComponent />
        </ConfirmationProvider>
      );

      fireEvent.press(getByTestId('show-custom-confirmation'));

      await waitFor(() => {
        expect(getByText('Custom Confirmation')).toBeTruthy();
        expect(getByText('Custom message')).toBeTruthy();
        expect(getByText('Yes')).toBeTruthy();
        expect(queryByText('No')).toBeNull(); // showCancel is false
      });
    });

    it('hides confirmation modal when confirm is pressed', async () => {
      const mockOnConfirm = jest.fn();
      
      const TestComponentWithMock: React.FC = () => {
        const { showConfirmation } = useConfirmation();

        const handleShowConfirmation = () => {
          showConfirmation({
            title: 'Test Confirmation',
            message: 'Are you sure?',
            onConfirm: mockOnConfirm,
          });
        };

        return (
          <TouchableOpacity onPress={handleShowConfirmation} testID="show-confirmation">
            <Text>Show Confirmation</Text>
          </TouchableOpacity>
        );
      };

      const { getByTestId, getByText, queryByText } = render(
        <ConfirmationProvider>
          <TestComponentWithMock />
        </ConfirmationProvider>
      );

      fireEvent.press(getByTestId('show-confirmation'));

      await waitFor(() => {
        expect(getByText('Test Confirmation')).toBeTruthy();
      });

      fireEvent.press(getByText('Confirm'));

      await waitFor(() => {
        expect(queryByText('Test Confirmation')).toBeNull();
        expect(mockOnConfirm).toHaveBeenCalledTimes(1);
      });
    });

    it('hides confirmation modal when cancel is pressed', async () => {
      const mockOnCancel = jest.fn();
      
      const TestComponentWithMock: React.FC = () => {
        const { showConfirmation } = useConfirmation();

        const handleShowConfirmation = () => {
          showConfirmation({
            title: 'Test Confirmation',
            message: 'Are you sure?',
            onCancel: mockOnCancel,
          });
        };

        return (
          <TouchableOpacity onPress={handleShowConfirmation} testID="show-confirmation">
            <Text>Show Confirmation</Text>
          </TouchableOpacity>
        );
      };

      const { getByTestId, getByText, queryByText } = render(
        <ConfirmationProvider>
          <TestComponentWithMock />
        </ConfirmationProvider>
      );

      fireEvent.press(getByTestId('show-confirmation'));

      await waitFor(() => {
        expect(getByText('Test Confirmation')).toBeTruthy();
      });

      fireEvent.press(getByText('Cancel'));

      await waitFor(() => {
        expect(queryByText('Test Confirmation')).toBeNull();
        expect(mockOnCancel).toHaveBeenCalledTimes(1);
      });
    });

    it('hides confirmation modal when close is called', async () => {
      const { getByTestId, getByText, queryByText } = render(
        <ConfirmationProvider>
          <TestComponent />
        </ConfirmationProvider>
      );

      fireEvent.press(getByTestId('show-confirmation'));

      await waitFor(() => {
        expect(getByText('Test Confirmation')).toBeTruthy();
      });

      // Simulate backdrop press which calls onClose
      const backdrop = getByTestId('confirmation-modal-backdrop');
      fireEvent.press(backdrop);

      await waitFor(() => {
        expect(queryByText('Test Confirmation')).toBeNull();
      });
    });

    it('works without onConfirm callback', async () => {
      const TestComponentWithoutCallback: React.FC = () => {
        const { showConfirmation } = useConfirmation();

        const handleShowConfirmation = () => {
          showConfirmation({
            title: 'Test Confirmation',
            message: 'Are you sure?',
          });
        };

        return (
          <TouchableOpacity onPress={handleShowConfirmation} testID="show-confirmation">
            <Text>Show Confirmation</Text>
          </TouchableOpacity>
        );
      };

      const { getByTestId, getByText, queryByText } = render(
        <ConfirmationProvider>
          <TestComponentWithoutCallback />
        </ConfirmationProvider>
      );

      fireEvent.press(getByTestId('show-confirmation'));

      await waitFor(() => {
        expect(getByText('Test Confirmation')).toBeTruthy();
      });

      fireEvent.press(getByText('Confirm'));

      await waitFor(() => {
        expect(queryByText('Test Confirmation')).toBeNull();
      });
    });

    it('works without onCancel callback', async () => {
      const TestComponentWithoutCallback: React.FC = () => {
        const { showConfirmation } = useConfirmation();

        const handleShowConfirmation = () => {
          showConfirmation({
            title: 'Test Confirmation',
            message: 'Are you sure?',
          });
        };

        return (
          <TouchableOpacity onPress={handleShowConfirmation} testID="show-confirmation">
            <Text>Show Confirmation</Text>
          </TouchableOpacity>
        );
      };

      const { getByTestId, getByText, queryByText } = render(
        <ConfirmationProvider>
          <TestComponentWithoutCallback />
        </ConfirmationProvider>
      );

      fireEvent.press(getByTestId('show-confirmation'));

      await waitFor(() => {
        expect(getByText('Test Confirmation')).toBeTruthy();
      });

      fireEvent.press(getByText('Cancel'));

      await waitFor(() => {
        expect(queryByText('Test Confirmation')).toBeNull();
      });
    });
  });

  describe('useConfirmation hook', () => {
    it('throws error when used outside ConfirmationProvider', () => {
      // Mock console.error to avoid error output in tests
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        render(<TestComponentWithoutProvider />);
      }).toThrow('useConfirmation must be used within a ConfirmationProvider');
      
      consoleSpy.mockRestore();
    });

    it('returns showConfirmation function when used within provider', () => {
      const TestComponentWithProvider: React.FC = () => {
        const { showConfirmation } = useConfirmation();
        
        expect(typeof showConfirmation).toBe('function');
        
        return <Text>Test</Text>;
      };

      render(
        <ConfirmationProvider>
          <TestComponentWithProvider />
        </ConfirmationProvider>
      );
    });
  });
});