import { TextStyle } from "../components/TextStyleBottomSheet";

export interface CanvasElement {
  id: string;
  type: 'text'; // In the future, this could be 'text' | 'image'
  text: string;
  x: number;
  y: number;
  style: TextStyle;
}

// For the gesture handler context
export type PanGestureContext = {
  startX: number;
  startY: number;
};
