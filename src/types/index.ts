import { TextStyle } from "../components/TextStyleBottomSheet";

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
}

export type MemeTemplate = {
  name: string;
  imageUrl: string;
}

// For the gesture handler context
export type PanGestureContext = {
  startX: number;
  startY: number;
};
