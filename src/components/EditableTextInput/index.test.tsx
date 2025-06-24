import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TextStyle } from 'react-native';
import EditableTextInput from './index';
import { COLORS } from '@/constants';

describe('EditableTextInput Component', () => {
  const mockOnChangeText = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnFocus = jest.fn();

  beforeEach(() => {
    mockOnChangeText.mockClear();
    mockOnBlur.mockClear();
    mockOnFocus.mockClear();
  });

  it('renders correctly with default props', () => {
    const { getByDisplayValue } = render(
      <EditableTextInput
        value="Test text"
        onChangeText={mockOnChangeText}
      />
    );
    
    expect(getByDisplayValue('Test text')).toBeTruthy();
  });

  it('applies default props correctly', () => {
    const { getByDisplayValue } = render(
      <EditableTextInput
        value="Test text"
        onChangeText={mockOnChangeText}
        testID="editable-input"
      />
    );
    
    const input = getByDisplayValue('Test text');
    expect(input.props.multiline).toBe(true);
    expect(input.props.autoFocus).toBe(true);
  });

  it('applies custom props correctly', () => {
    const { getByDisplayValue } = render(
      <EditableTextInput
        value="Test text"
        onChangeText={mockOnChangeText}
        multiline={false}
        autoFocus={false}
        bordered={false}
        testID="editable-input"
      />
    );
    
    const input = getByDisplayValue('Test text');
    expect(input.props.multiline).toBe(false);
    expect(input.props.autoFocus).toBe(false);
  });

  it('calls onChangeText when text changes', () => {
    const { getByDisplayValue } = render(
      <EditableTextInput
        value="Test text"
        onChangeText={mockOnChangeText}
      />
    );
    
    const input = getByDisplayValue('Test text');
    fireEvent.changeText(input, 'New text');
    expect(mockOnChangeText).toHaveBeenCalledWith('New text');
  });

  it('calls onBlur when input loses focus', () => {
    const { getByDisplayValue } = render(
      <EditableTextInput
        value="Test text"
        onChangeText={mockOnChangeText}
        onBlur={mockOnBlur}
      />
    );
    
    const input = getByDisplayValue('Test text');
    fireEvent(input, 'blur');
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it('calls onFocus when input gains focus', () => {
    const { getByDisplayValue } = render(
      <EditableTextInput
        value="Test text"
        onChangeText={mockOnChangeText}
        onFocus={mockOnFocus}
      />
    );
    
    const input = getByDisplayValue('Test text');
    fireEvent(input, 'focus');
    expect(mockOnFocus).toHaveBeenCalled();
  });

  it('applies custom text styles correctly', () => {
    const customStyle: TextStyle = {
      fontSize: 20,
      color: 'red',
      fontWeight: 'bold',
    };

    const { getByDisplayValue } = render(
      <EditableTextInput
        value="Test text"
        onChangeText={mockOnChangeText}
        textStyle={customStyle}
      />
    );
    
    const input = getByDisplayValue('Test text');
    expect(input.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          color: COLORS.foreground,
          textAlignVertical: 'center',
        }),
        expect.objectContaining({
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: COLORS.primary,
        }),
        customStyle,
      ])
    );
  });

  it('applies multiple text styles correctly', () => {
    const customStyles: TextStyle[] = [
      { fontSize: 20 },
      { color: 'red' },
      { fontWeight: 'bold' },
    ];

    const { getByDisplayValue } = render(
      <EditableTextInput
        value="Test text"
        onChangeText={mockOnChangeText}
        textStyle={customStyles}
      />
    );
    
    const input = getByDisplayValue('Test text');
    expect(input.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          color: COLORS.foreground,
          textAlignVertical: 'center',
        }),
        expect.objectContaining({
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: COLORS.primary,
        }),
        customStyles,
      ])
    );
  });

  it('does not apply bordered styles when bordered is false', () => {
    const { getByDisplayValue } = render(
      <EditableTextInput
        value="Test text"
        onChangeText={mockOnChangeText}
        bordered={false}
      />
    );
    
    const input = getByDisplayValue('Test text');
    expect(input.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          color: COLORS.foreground,
          textAlignVertical: 'center',
        }),
      ])
    );
    
    // Should not contain bordered styles
    expect(input.props.style).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          borderWidth: 1,
          borderStyle: 'dashed',
        }),
      ])
    );
  });

  it('handles empty value correctly', () => {
    const { getByTestId } = render(
      <EditableTextInput
        value=""
        onChangeText={mockOnChangeText}
        testID="empty-input"
      />
    );
    
    const input = getByTestId('empty-input');
    expect(input.props.value).toBe('');
  });

  it('handles placeholder correctly', () => {
    const { getByPlaceholderText } = render(
      <EditableTextInput
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Enter text here"
      />
    );
    
    expect(getByPlaceholderText('Enter text here')).toBeTruthy();
  });

  it('passes through additional TextInput props', () => {
    const { getByDisplayValue } = render(
      <EditableTextInput
        value="Test text"
        onChangeText={mockOnChangeText}
        maxLength={10}
        editable={false}
        selectTextOnFocus
      />
    );
    
    const input = getByDisplayValue('Test text');
    expect(input.props.maxLength).toBe(10);
    expect(input.props.editable).toBe(false);
    expect(input.props.selectTextOnFocus).toBe(true);
  });
});