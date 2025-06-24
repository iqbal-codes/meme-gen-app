import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from './index';
import { COLORS } from '@/constants';

describe('Button Component', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it('renders correctly with default props', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} />
    );
    
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('renders with different variants', () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger'] as const;
    
    variants.forEach(variant => {
      const { getByText } = render(
        <Button title={`${variant} Button`} variant={variant} onPress={mockOnPress} />
      );
      expect(getByText(`${variant} Button`)).toBeTruthy();
    });
  });

  it('renders with different sizes', () => {
    const sizes = ['small', 'medium', 'large'] as const;
    
    sizes.forEach(size => {
      const { getByText } = render(
        <Button title={`${size} Button`} size={size} onPress={mockOnPress} />
      );
      expect(getByText(`${size} Button`)).toBeTruthy();
    });
  });

  it('renders loading state correctly', () => {
    const { getByTestId, queryByText } = render(
      <Button title="Loading Button" loading onPress={mockOnPress} testID="loading-button" />
    );
    
    expect(getByTestId('loading-button')).toBeTruthy();
    expect(queryByText('Loading Button')).toBeNull();
  });

  it('is disabled when disabled prop is true', () => {
    const { getByText } = render(
      <Button title="Disabled Button" disabled onPress={mockOnPress} />
    );
    
    const button = getByText('Disabled Button');
    fireEvent.press(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('is disabled when loading is true', () => {
    const { getByTestId } = render(
      <Button title="Loading Button" loading onPress={mockOnPress} testID="loading-button" />
    );
    
    const button = getByTestId('loading-button');
    fireEvent.press(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('renders as icon-only button', () => {
    const { queryByText } = render(
      <Button icon="plus" onPress={mockOnPress} testID="icon-button" />
    );
    
    expect(queryByText('Test Button')).toBeNull();
  });

  it('renders with left and right icons', () => {
    const { getByText } = render(
      <Button 
        title="Icon Button" 
        leftIcon="chevron-left" 
        rightIcon="chevron-right" 
        onPress={mockOnPress} 
      />
    );
    
    expect(getByText('Icon Button')).toBeTruthy();
  });

  it('renders as block button', () => {
    const { getByText } = render(
      <Button title="Block Button" block onPress={mockOnPress} />
    );
    
    expect(getByText('Block Button')).toBeTruthy();
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const customTextStyle = { fontSize: 20 };
    
    const { getByText } = render(
      <Button 
        title="Custom Button" 
        style={customStyle}
        textStyle={customTextStyle}
        onPress={mockOnPress} 
      />
    );
    
    expect(getByText('Custom Button')).toBeTruthy();
  });

  it('renders with different rounded values', () => {
    const roundedValues = ['none', 'sm', 'md', 'lg', 'xl', 'full'] as const;
    
    roundedValues.forEach(rounded => {
      const { getByText } = render(
        <Button title={`${rounded} Button`} rounded={rounded} onPress={mockOnPress} />
      );
      expect(getByText(`${rounded} Button`)).toBeTruthy();
    });
  });

  it('renders with shadow enabled', () => {
    const { getByText } = render(
      <Button title="Shadow Button" enableShadow onPress={mockOnPress} />
    );
    
    expect(getByText('Shadow Button')).toBeTruthy();
  });

  it('renders with custom icon color', () => {
    const { getByText } = render(
      <Button 
        title="Custom Icon Color" 
        leftIcon="star" 
        iconColor={COLORS.destructive}
        onPress={mockOnPress} 
      />
    );
    
    expect(getByText('Custom Icon Color')).toBeTruthy();
  });
});