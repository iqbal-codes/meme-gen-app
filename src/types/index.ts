export interface CanvasElement {
  id: string;
  type: 'text'; // In the future, this could be 'text' | 'image'
  text: string;
  x: number;
  y: number;
}

// For the gesture handler context
export type PanGestureContext = {
  startX: number;
  startY: number;
};
