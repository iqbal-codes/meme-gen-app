// Keep template type here as it's simple
export type MemeTemplate = {
  name: string;
  imageUrl: string;
};

// Re-export all types for easy importing
export * from './contexts';
export * from './elements';
export * from './fonts';
export * from './gestures';
export * from './permissions';
export * from './ui';
