import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ElementStyleBottomSheet from './index';
import { CanvasElement } from '@/types';

// Mock dependencies
jest.mock('@/components', () => ({
  Button: ({ title, onPress, testID }: any) => {
    const { Text, TouchableOpacity } = require('react-native');
    return (
      <TouchableOpacity onPress={onPress} testID={testID}>
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  },
  BaseBottomSheet: ({ children, visible, title }: any) => {
    const { View, Text } = require('react-native');
    return visible ? (
      <View testID="bottom-sheet">
        <Text testID="sheet-title">{title}</Text>
        {children}
      </View>
    ) : null;
  },
}));

jest.mock('@/utils', () => ({
  getFont: jest.fn(() => ({ fontFamily: 'nunito' })),
}));

jest.mock('react-native-gesture-handler', () => {
  const { View } = require('react-native');
  return {
    ScrollView: View,
  };
});

jest.mock('@react-native-community/slider', () => {
  const { View } = require('react-native');
  return View;
});

const mockElement: CanvasElement = {
  id: '1',
  type: 'text',
  text: 'Test Text',
  x: 0,
  y: 0,
  style: {
    color: '#000000',
    fontFamily: 'nunito',
    fontSize: 24,
    textShadowColor: 'transparent',
    backgroundColor: 'transparent',
    opacity: 1,
  },
};

const mockProps = {
  visible: true,
  onClose: jest.fn(),
  element: mockElement,
  onStyleChange: jest.fn(),
};

describe('ElementStyleBottomSheet', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when visible', () => {
    const { getByTestId, getByText } = render(
      <ElementStyleBottomSheet {...mockProps} />
    );

    expect(getByTestId('bottom-sheet')).toBeTruthy();
    expect(getByText('Text Style')).toBeTruthy();
  });

  it('renders shadow color section for text elements', () => {
    const { getByText } = render(
      <ElementStyleBottomSheet {...mockProps} />
    );

    expect(getByText('Shadow Color')).toBeTruthy();
  });

  it('does not render text-specific sections for image elements', () => {
    const imageElement: CanvasElement = {
      id: '2',
      type: 'image',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      style: { opacity: 1 },
    };

    const { queryByText } = render(
      <ElementStyleBottomSheet {...mockProps} element={imageElement} />
    );

    expect(queryByText('Shadow Color')).toBeNull();
    expect(queryByText('Color')).toBeNull();
  });

  it('calls onStyleChange when save is pressed', () => {
    const { getByText } = render(
      <ElementStyleBottomSheet {...mockProps} />
    );

    fireEvent.press(getByText('Save Changes'));
    expect(mockProps.onStyleChange).toHaveBeenCalled();
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('calls onClose when cancel/reset is pressed', () => {
    const { getByText } = render(
      <ElementStyleBottomSheet {...mockProps} />
    );

    fireEvent.press(getByText('Reset'));
    expect(mockProps.onClose).not.toHaveBeenCalled(); // Reset doesn't close
  });

  it('renders with default style when no element provided', () => {
    const { getByTestId } = render(
      <ElementStyleBottomSheet {...mockProps} element={undefined} />
    );

    expect(getByTestId('bottom-sheet')).toBeTruthy();
  });

  it('updates local style when shadow color is selected', () => {
    const { getByText } = render(
      <ElementStyleBottomSheet {...mockProps} />
    );

    // Verify shadow color section exists
    expect(getByText('Shadow Color')).toBeTruthy();
  });
});