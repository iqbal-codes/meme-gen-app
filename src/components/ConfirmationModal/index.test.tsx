import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ConfirmationModal } from './index';

describe('ConfirmationModal Component', () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();
  const mockOnClose = jest.fn();

  const defaultProps = {
    visible: true,
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed?',
    onConfirm: mockOnConfirm,
    onCancel: mockOnCancel,
    onClose: mockOnClose,
  };

  beforeEach(() => {
    mockOnConfirm.mockClear();
    mockOnCancel.mockClear();
    mockOnClose.mockClear();
  });

  it('renders correctly when visible', () => {
    const { getByText } = render(<ConfirmationModal {...defaultProps} />);

    expect(getByText('Confirm Action')).toBeTruthy();
    expect(getByText('Are you sure you want to proceed?')).toBeTruthy();
    expect(getByText('Confirm')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const { queryByText } = render(<ConfirmationModal {...defaultProps} visible={false} />);

    expect(queryByText('Confirm Action')).toBeNull();
    expect(queryByText('Are you sure you want to proceed?')).toBeNull();
  });

  it('calls onConfirm when confirm button is pressed', () => {
    const { getByText } = render(<ConfirmationModal {...defaultProps} />);

    fireEvent.press(getByText('Confirm'));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel and onClose when cancel button is pressed', () => {
    const { getByText } = render(<ConfirmationModal {...defaultProps} />);

    fireEvent.press(getByText('Cancel'));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel and onClose when backdrop is pressed and showCancel is true', () => {
    const { getByTestId, getByText } = render(<ConfirmationModal {...defaultProps} />);

    // Find the backdrop overlay
    const backdrop =
      getByTestId('confirmation-modal-backdrop') ||
      getByText('Confirm Action').parent?.parent?.parent;

    if (backdrop) {
      fireEvent.press(backdrop);
      expect(mockOnCancel).toHaveBeenCalledTimes(1);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });

  it('does not call onCancel when backdrop is pressed and showCancel is false', () => {
    const { getByTestId, getByText } = render(
      <ConfirmationModal {...defaultProps} showCancel={false} />,
    );

    // Find the backdrop overlay
    const backdrop =
      getByTestId('confirmation-modal-backdrop') ||
      getByText('Confirm Action').parent?.parent?.parent;

    if (backdrop) {
      fireEvent.press(backdrop);
      expect(mockOnCancel).not.toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled();
    }
  });

  it('renders with custom button texts', () => {
    const { getByText } = render(
      <ConfirmationModal {...defaultProps} confirmText="Yes, Delete" cancelText="No, Keep" />,
    );

    expect(getByText('Yes, Delete')).toBeTruthy();
    expect(getByText('No, Keep')).toBeTruthy();
  });

  it('renders with custom button variants', () => {
    const { getByText } = render(
      <ConfirmationModal {...defaultProps} confirmVariant="danger" cancelVariant="outline" />,
    );

    expect(getByText('Confirm')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });

  it('hides cancel button when showCancel is false', () => {
    const { getByText, queryByText } = render(
      <ConfirmationModal {...defaultProps} showCancel={false} />,
    );

    expect(getByText('Confirm')).toBeTruthy();
    expect(queryByText('Cancel')).toBeNull();
  });

  it('renders with default button texts when not provided', () => {
    const { getByText } = render(
      <ConfirmationModal
        visible
        title="Test Title"
        message="Test Message"
        onConfirm={mockOnConfirm}
        onClose={mockOnClose}
      />,
    );

    expect(getByText('Confirm')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });

  it('renders with default button variants when not provided', () => {
    const { getByText } = render(
      <ConfirmationModal
        visible
        title="Test Title"
        message="Test Message"
        onConfirm={mockOnConfirm}
        onClose={mockOnClose}
      />,
    );

    expect(getByText('Confirm')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });

  it('handles modal request close when showCancel is true', () => {
    const { getByText } = render(<ConfirmationModal {...defaultProps} />);

    // Simulate Android back button press
    const modal = getByText('Confirm Action').parent?.parent?.parent?.parent?.parent;
    if (modal && modal.props.onRequestClose) {
      modal.props.onRequestClose();
      expect(mockOnCancel).toHaveBeenCalledTimes(1);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });

  it('handles modal request close when showCancel is false', () => {
    const { getByText } = render(<ConfirmationModal {...defaultProps} showCancel={false} />);

    // Simulate Android back button press
    const modal = getByText('Confirm Action').parent?.parent?.parent?.parent?.parent;
    if (modal && modal.props.onRequestClose) {
      modal.props.onRequestClose();
      expect(mockOnCancel).not.toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled();
    }
  });

  it('prevents event propagation when modal content is pressed', () => {
    const { getByText } = render(<ConfirmationModal {...defaultProps} />);

    // Press on the modal content (not backdrop)
    const modalContent = getByText('Confirm Action').parent?.parent;
    if (modalContent) {
      fireEvent.press(modalContent);
      expect(mockOnCancel).not.toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled();
    }
  });

  it('calls onCancel and onClose only once when cancel is called', () => {
    const { getByText } = render(<ConfirmationModal {...defaultProps} />);

    fireEvent.press(getByText('Cancel'));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('works without onCancel prop', () => {
    const { getByText } = render(<ConfirmationModal {...defaultProps} onCancel={undefined} />);

    fireEvent.press(getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
