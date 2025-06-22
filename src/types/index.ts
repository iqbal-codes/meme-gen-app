// Keep template type here as it's simple
export type MemeTemplate = {
  name: string;
  imageUrl: string;
};

// Re-export all types for easy importing
export * from './elements';
export * from './ui';
export * from './gestures';
