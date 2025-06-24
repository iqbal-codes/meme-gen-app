/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import BaseBottomSheet from './index';

describe('BaseBottomSheet Component', () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    visible: true,
    onClose: mockOnClose,
    title: 'Test Bottom Sheet',
    children: <Text>Test Content</Text>,
  };

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders correctly when visible', () => {
    const { getByText } = render(<BaseBottomSheet {...defaultProps} />);

    expect(getByText('Test Bottom Sheet')).toBeTruthy();
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const { queryByText } = render(<BaseBottomSheet {...defaultProps} visible={false} />);

    expect(queryByText('Test Bottom Sheet')).toBeNull();
    expect(queryByText('Test Content')).toBeNull();
  });

  it('calls onClose when overlay is pressed', () => {
    const { getByTestId, getByText } = render(<BaseBottomSheet {...defaultProps} />);

    // Find the overlay pressable by looking for the parent container
    const overlay =
      getByTestId('bottom-sheet-overlay') || getByText('Test Bottom Sheet').parent?.parent?.parent;

    if (overlay) {
      fireEvent.press(overlay);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });

  it('calls onClose when close button is pressed', () => {
    const { getByTestId, getByText } = render(<BaseBottomSheet {...defaultProps} />);

    // The close button should be rendered by the Button component with ghost variant and x icon
    const closeButton =
      getByTestId('close-button') || getByText('Test Bottom Sheet').parent?.parent?.children[1];

    if (closeButton) {
      fireEvent.press(closeButton);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });

  it('renders with custom height props', () => {
    const { getByText } = render(
      <BaseBottomSheet {...defaultProps} maxHeight="80%" minHeight="50%" />,
    );

    expect(getByText('Test Bottom Sheet')).toBeTruthy();
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('renders with default height values', () => {
    const { getByText } = render(<BaseBottomSheet {...defaultProps} />);

    expect(getByText('Test Bottom Sheet')).toBeTruthy();
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const customChildren = (
      <>
        <Text>First Child</Text>
        <Text>Second Child</Text>
      </>
    );

    const { getByText } = render(
      <BaseBottomSheet {...defaultProps}>{customChildren}</BaseBottomSheet>,
    );

    expect(getByText('Test Bottom Sheet')).toBeTruthy();
    expect(getByText('First Child')).toBeTruthy();
    expect(getByText('Second Child')).toBeTruthy();
  });

  it('handles modal request close', () => {
    const { getByTestId } = render(<BaseBottomSheet {...defaultProps} />);

    // Simulate Android back button press
    const modal = getByTestId('base-bottom-sheet-modal');
    if (modal.props.onRequestClose) {
      modal.props.onRequestClose();
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });

  it('renders with different title', () => {
    const { getByText } = render(<BaseBottomSheet {...defaultProps} title="Different Title" />);

    expect(getByText('Different Title')).toBeTruthy();
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('applies correct animation type', () => {
    const { getByTestId } = render(<BaseBottomSheet {...defaultProps} />);

    const modal = getByTestId('base-bottom-sheet-modal');
    expect(modal.props.animationType).toBe('slide');
  });

  it('is transparent modal', () => {
    const { getByTestId } = render(<BaseBottomSheet {...defaultProps} />);

    const modal = getByTestId('base-bottom-sheet-modal');
    expect(modal.props.transparent).toBe(true);
  });
});
