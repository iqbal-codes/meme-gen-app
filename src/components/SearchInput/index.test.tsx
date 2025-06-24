import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchInput from './index';
import { COLORS } from '@/constants';

// Mock the Icon component
jest.mock('@react-native-vector-icons/lucide', () => {
  const { Text } = require('react-native');
  return ({ name }: { name: string }) => <Text testID={`icon-${name}`}>{name}</Text>;
});

describe('SearchInput Component', () => {
  const mockOnChangeText = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnSubmitEditing = jest.fn();

  beforeEach(() => {
    mockOnChangeText.mockClear();
    mockOnBlur.mockClear();
    mockOnFocus.mockClear();
    mockOnSubmitEditing.mockClear();
  });

  it('renders correctly with default props', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <SearchInput onChangeText={mockOnChangeText} />
    );
    
    expect(getByPlaceholderText('Search...')).toBeTruthy();
    expect(getByTestId('icon-search')).toBeTruthy();
  });

  it('renders with custom placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchInput
        placeholder="Search templates..."
        onChangeText={mockOnChangeText}
      />
    );
    
    expect(getByPlaceholderText('Search templates...')).toBeTruthy();
  });

  it('applies default props correctly', () => {
    const { getByPlaceholderText } = render(
      <SearchInput onChangeText={mockOnChangeText} />
    );
    
    const input = getByPlaceholderText('Search...');
    expect(input.props.autoCapitalize).toBe('none');
    expect(input.props.autoCorrect).toBe(false);
    expect(input.props.placeholderTextColor).toBe(COLORS.mutedForeground);
  });

  it('applies custom props correctly', () => {
    const { getByPlaceholderText } = render(
      <SearchInput
        onChangeText={mockOnChangeText}
        autoCapitalize="words"
        autoCorrect
        placeholderTextColor="red"
      />
    );
    
    const input = getByPlaceholderText('Search...');
    expect(input.props.autoCapitalize).toBe('words');
    expect(input.props.autoCorrect).toBe(true);
    expect(input.props.placeholderTextColor).toBe('red');
  });

  it('calls onChangeText when text changes', () => {
    const { getByPlaceholderText } = render(
      <SearchInput onChangeText={mockOnChangeText} />
    );
    
    const input = getByPlaceholderText('Search...');
    fireEvent.changeText(input, 'test query');
    expect(mockOnChangeText).toHaveBeenCalledWith('test query');
  });

  it('calls onBlur when input loses focus', () => {
    const { getByPlaceholderText } = render(
      <SearchInput
        onChangeText={mockOnChangeText}
        onBlur={mockOnBlur}
      />
    );
    
    const input = getByPlaceholderText('Search...');
    fireEvent(input, 'blur');
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it('calls onFocus when input gains focus', () => {
    const { getByPlaceholderText } = render(
      <SearchInput
        onChangeText={mockOnChangeText}
        onFocus={mockOnFocus}
      />
    );
    
    const input = getByPlaceholderText('Search...');
    fireEvent(input, 'focus');
    expect(mockOnFocus).toHaveBeenCalled();
  });

  it('calls onSubmitEditing when submit is pressed', () => {
    const { getByPlaceholderText } = render(
      <SearchInput
        onChangeText={mockOnChangeText}
        onSubmitEditing={mockOnSubmitEditing}
      />
    );
    
    const input = getByPlaceholderText('Search...');
    fireEvent(input, 'submitEditing');
    expect(mockOnSubmitEditing).toHaveBeenCalled();
  });

  it('displays the search icon correctly', () => {
    const { getByTestId } = render(
      <SearchInput onChangeText={mockOnChangeText} />
    );
    
    const icon = getByTestId('icon-search');
    expect(icon).toBeTruthy();
    expect(icon.children[0]).toBe('search');
  });

  it('applies custom input styles', () => {
    const customInputStyle = {
      fontSize: 18,
      color: 'blue',
    };

    const { getByPlaceholderText } = render(
      <SearchInput
        onChangeText={mockOnChangeText}
        inputStyle={customInputStyle}
      />
    );
    
    const input = getByPlaceholderText('Search...');
    expect(input.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining(customInputStyle),
      ])
    );
  });

  it('handles value prop correctly', () => {
    const { getByDisplayValue } = render(
      <SearchInput
        value="existing search"
        onChangeText={mockOnChangeText}
      />
    );
    
    expect(getByDisplayValue('existing search')).toBeTruthy();
  });

  it('handles empty value correctly', () => {
    const { getByTestId } = render(
      <SearchInput
        value=""
        onChangeText={mockOnChangeText}
        testID="empty-search"
      />
    );
    
    const input = getByTestId('empty-search');
    expect(input.props.value).toBe('');
  });

  it('passes through additional TextInput props', () => {
    const { getByPlaceholderText } = render(
      <SearchInput
        onChangeText={mockOnChangeText}
        maxLength={50}
        editable={false}
        selectTextOnFocus
        returnKeyType="search"
      />
    );
    
    const input = getByPlaceholderText('Search...');
    expect(input.props.maxLength).toBe(50);
    expect(input.props.editable).toBe(false);
    expect(input.props.selectTextOnFocus).toBe(true);
    expect(input.props.returnKeyType).toBe('search');
  });

  it('renders with testID correctly', () => {
    const { getByTestId } = render(
      <SearchInput
        onChangeText={mockOnChangeText}
        testID="custom-search-input"
      />
    );
    
    expect(getByTestId('custom-search-input')).toBeTruthy();
  });

  it('handles keyboard type correctly', () => {
    const { getByPlaceholderText } = render(
      <SearchInput
        onChangeText={mockOnChangeText}
        keyboardType="email-address"
      />
    );
    
    const input = getByPlaceholderText('Search...');
    expect(input.props.keyboardType).toBe('email-address');
  });

  it('handles secure text entry correctly', () => {
    const { getByPlaceholderText } = render(
      <SearchInput
        onChangeText={mockOnChangeText}
        secureTextEntry
      />
    );
    
    const input = getByPlaceholderText('Search...');
    expect(input.props.secureTextEntry).toBe(true);
  });

  it('handles multiline correctly', () => {
    const { getByPlaceholderText } = render(
      <SearchInput
        onChangeText={mockOnChangeText}
        multiline
      />
    );
    
    const input = getByPlaceholderText('Search...');
    expect(input.props.multiline).toBe(true);
  });
});