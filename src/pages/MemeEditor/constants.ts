import { TextStyle, ViewStyle } from 'react-native';
import { CanvasElement, AllIconProps, FontFamily, MemeTemplate } from '@/types';

// === ELEMENT DEFAULTS ===
export const DEFAULT_TEXT_ELEMENT: CanvasElement = {
  id: '',
  type: 'text',
  text: 'New Text',
  x: 0,
  y: 0,
  style: {
    opacity: 1,
    color: '#000000',
    fontFamily: 'nunito',
    fontWeight: 'regular',
    fontStyle: 'normal',
    textDecorationLine: 'none',
    fontSize: 24,
    textAlign: 'center',
    textShadowColor: 'transparent',
  },
};

export const DEFAULT_IMAGE_ELEMENT: CanvasElement = {
  id: '',
  type: 'image',
  x: 0,
  y: 0,
  width: 150,
  height: 150,
};

// === STYLE DEFAULTS ===
export const DEFAULT_TEXT_STYLE: TextStyle = {
  color: '#000000',
  fontFamily: 'nunito',
  fontWeight: 'regular',
  fontStyle: 'normal',
  textDecorationLine: 'none',
  fontSize: 24,
  backgroundColor: 'transparent',
  textShadowColor: 'transparent',
  opacity: 1,
};

export const DEFAULT_IMAGE_STYLE: ViewStyle = {
  opacity: 1,
};

// === EDITOR CONFIGURATION ===
export const EDITOR_CONFIG = {
  // Element scaling constraints
  MIN_SCALE: 0.8,
  MAX_SCALE: 3.0,

  // Default text element dimensions
  DEFAULT_TEXT_WIDTH: 100,
  DEFAULT_TEXT_HEIGHT: 36,

  // Default image element dimensions
  DEFAULT_IMAGE_WIDTH: 150,
  DEFAULT_IMAGE_HEIGHT: 150,

  // Rotation snap angles (in degrees)
  SNAP_THRESHOLD: 5,
  ROTATION_THRESHOLD: 5,
  SNAP_ANGLES: [0, 45, 90, 135, 180, 225, 270, 315],

  // Canvas gesture constraints
  MAX_PAN_OFFSET: 200,

  // Image processing settings
  TARGET_PIXEL_COUNT: 1080,
  IMAGE_QUALITY: {
    HIGH: 1,
    EXPORT: 0.9,
  },
  IMAGE_FORMAT: 'jpg' as const,

  // UI slider settings
  SLIDER_STEP: 0.05,
  SLIDER_MIN: 0,
  SLIDER_MAX: 1,

  // Element copy settings
  COPY_OFFSET: 20,

  // Camera roll settings
  CAMERA_ROLL_LIMIT: 5000,
} as const;

// === STYLE OPTIONS ===
export const TEXT_DECORATION_OPTIONS: {
  title: string;
  value: TextStyle['textDecorationLine'];
}[] = [
  { title: 'None', value: 'none' },
  { title: 'Underline', value: 'underline' },
  { title: 'Line Through', value: 'line-through' },
];

export const TEXT_ALIGN_OPTIONS: {
  icon: AllIconProps;
  value: TextStyle['textAlign'];
}[] = [
  { value: 'left', icon: 'align-left' },
  { value: 'center', icon: 'align-center' },
  { value: 'right', icon: 'align-right' },
];

export const FONT_FAMILY_OPTIONS: {
  title: string;
  value: FontFamily;
}[] = [
  { title: 'Nunito', value: 'nunito' },
  { title: 'Montserrat', value: 'montserrat' },
  { title: 'Baskerville', value: 'baskerville' },
  { title: 'Roboto', value: 'roboto' },
];

export const FONT_WEIGHT_OPTIONS: { title: string; value: TextStyle['fontWeight'] }[] = [
  { title: 'Regular', value: 'regular' },
  { title: 'Bold', value: 'bold' },
];

export const FONT_STYLE_OPTIONS: { title: string; value: TextStyle['fontStyle'] }[] = [
  { title: 'Normal', value: 'normal' },
  { title: 'Italic', value: 'italic' },
];

export const COLOR_OPTIONS = [
  '#000000',
  '#FFFFFF',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#00FFFF',
  '#FFA500',
  '#800080',
];

export const COLOR_WITH_TRANSPARENT_OPTIONS = ['transparent', ...COLOR_OPTIONS];

export type EditorConfig = typeof EDITOR_CONFIG;

export const MEME_TEMPLATES: MemeTemplate[] = [
  {
    name: 'Troll Face',
    imageUrl: 'https://i.imgflip.com/1kzr.jpg',
  },
  {
    name: 'Drake Hotline Bling',
    imageUrl: 'https://imgflip.com/s/meme/Drake-Hotline-Bling.jpg',
  },
  {
    name: 'One Does Not Simply',
    imageUrl: 'https://imgflip.com/s/meme/One-Does-Not-Simply.jpg',
  },
  {
    name: 'two buttons',
    imageUrl: 'https://imgflip.com/s/meme/Two-Buttons.jpg',
  },
  {
    name: 'Distracted Boyfriend',
    imageUrl: 'https://imgflip.com/s/meme/Distracted-Boyfriend.jpg',
  },
  {
    name: 'Disaster Girl',
    imageUrl: 'https://imgflip.com/s/meme/Disaster-Girl.jpg',
  },
  {
    name: 'Surprised Pikachu',
    imageUrl: 'https://imgflip.com/s/meme/Surprised-Pikachu.jpg',
  },
  {
    name: 'Waiting Skeleton',
    imageUrl: 'https://imgflip.com/s/meme/Waiting-Skeleton.jpg',
  },
  {
    name: 'Batman Slapping Robin',
    imageUrl: 'https://imgflip.com/s/meme/Batman-Slapping-Robin.jpg',
  },
  {
    name: 'Doge',
    imageUrl: 'https://imgflip.com/s/meme/Doge.jpg',
  },
  {
    name: 'Ancient Aliens',
    imageUrl: 'https://imgflip.com/s/meme/Ancient-Aliens.jpg',
  },
  {
    name: 'Monkey Puppet',
    imageUrl: 'https://imgflip.com/s/meme/Monkey-Puppet.jpg',
  },
  {
    name: 'Futurama Fry',
    imageUrl: 'https://imgflip.com/s/meme/Futurama-Fry.jpg',
  },
  {
    name: 'Finding Neverland',
    imageUrl: 'https://imgflip.com/s/meme/Finding-Neverland.jpg',
  },
];
