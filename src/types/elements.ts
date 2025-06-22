import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

// Element-related types
export interface ElementStyle {
  color?: string;
  fontWeight?: StyleProp<TextStyle['fontWeight']>;
  fontStyle?: StyleProp<TextStyle['fontStyle']>;
  textDecorationLine?: StyleProp<TextStyle['textDecorationLine']>;
  fontSize?: number;
  backgroundColor?: string;
  opacity: number;
}

export interface ElementDimensions {
  width: number;
  height: number;
}

export interface MeasuredDimensions extends ElementDimensions {
  measured: boolean;
  timestamp: number;
}

export type CanvasElement = {
  id: string;
  type: 'text' | 'image';
  text?: string; // Optional for image elements
  imageUri?: string; // For image elements
  x: number;
  y: number;
  width?: number; // For image elements
  height?: number; // For image elements
  style?: ElementStyle; // Optional for image elements
  scale?: number;
  dimensions?: ElementDimensions;
};