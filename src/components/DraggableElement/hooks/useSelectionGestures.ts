import { Gesture } from 'react-native-gesture-handler';
import { CanvasElement } from '../../../types';

interface UseSelectionGesturesProps {
  element: CanvasElement;
  isSelecting: boolean;
  onEdit: (id?: string) => void;
  onSelect: (id?: string) => void;
}

const useSelectionGestures = ({
  element,
  isSelecting,
  onEdit,
  onSelect,
}: UseSelectionGesturesProps) => {
  // Single tap gesture to toggle selection mode
  const singleTapGesture = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(1)
    .onStart(() => {
      console.log('Element tapped:', element.id);
      if (isSelecting) {
        // If already selected, enter edit mode on second tap
        onEdit(element.id);
        onSelect(element.id);
      } else {
        // First tap selects the element
        onSelect(element.id);
      }
    });

  return { singleTapGesture };
};

export default useSelectionGestures;