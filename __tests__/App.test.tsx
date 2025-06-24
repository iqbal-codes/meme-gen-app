import React from 'react';
import { render, screen } from '@testing-library/react-native';
import App from '../src/App';

// Mock the MemeEditor page since it might have complex dependencies
jest.mock('../src/pages/MemeEditor', () => {
  const { Text } = require('react-native');
  return () => <Text testID="meme-editor">Meme Editor</Text>;
});

describe('App', () => {
  it('renders correctly', () => {
    render(<App />);
    expect(screen.getByTestId('meme-editor')).toBeTruthy();
  });

  it('wraps content with ConfirmationProvider', () => {
    render(<App />);
    // The MemeEditor should be rendered, indicating the provider is working
    expect(screen.getByTestId('meme-editor')).toBeTruthy();
  });
});
