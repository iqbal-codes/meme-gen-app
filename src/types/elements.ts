import { TextStyle } from 'react-native';

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
  style?: TextStyle; // Optional for image elements
  scale?: number;
  dimensions?: ElementDimensions;
};
