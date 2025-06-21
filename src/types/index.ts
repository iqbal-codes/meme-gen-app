export interface CanvasElement {
  id: string;
  type: 'text'; // In the future, this could be 'text' | 'image'
  text: string;
  x: number;
  y: number;
  // Text styling properties
  color?: string;
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  fontStyle?: 'normal' | 'italic';
  textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through';
  fontSize?: number;
}

// For the gesture handler context
export type PanGestureContext = {
  startX: number;
  startY: number;
};
