import { TextStyle } from 'react-native';

// Simplified font family types - only main variants
export type FontFamily =
  | 'montserrat'
  | 'baskerville'
  | 'fredoka'
  | 'nunito'
  | 'roboto';

// Font weight types
export type FontWeight =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

// Font style types
export type FontStyle = 'normal' | 'italic';

// Simplified font configuration - only main fonts
const FONT_CONFIG = {
  // Variable fonts (support dynamic fontWeight)
  variable: {
    montserrat: 'Montserrat',
    baskerville: 'Baskerville',
    nunito: 'Nunito',
    roboto: 'Roboto',
    fredoka: 'Fredoka',
  },
  // Static fonts (require specific font family names)
  static: {
    montserrat: {
      thin: { normal: 'Montserrat-Thin', italic: 'Montserrat-ThinItalic' },
      extralight: {
        normal: 'Montserrat-ExtraLight',
        italic: 'Montserrat-ExtraLightItalic',
      },
      light: { normal: 'Montserrat-Light', italic: 'Montserrat-LightItalic' },
      regular: { normal: 'Montserrat-Regular', italic: 'Montserrat-Italic' },
      medium: {
        normal: 'Montserrat-Medium',
        italic: 'Montserrat-MediumItalic',
      },
      semibold: {
        normal: 'Montserrat-SemiBold',
        italic: 'Montserrat-SemiBoldItalic',
      },
      bold: { normal: 'Montserrat-Bold', italic: 'Montserrat-BoldItalic' },
      extrabold: {
        normal: 'Montserrat-ExtraBold',
        italic: 'Montserrat-ExtraBoldItalic',
      },
      black: { normal: 'Montserrat-Black', italic: 'Montserrat-BlackItalic' },
    },
    fredoka: {
      thin: { normal: 'Fredoka-Thin', italic: 'Fredoka-ThinItalic' },
      extralight: {
        normal: 'Fredoka-ExtraLight',
        italic: 'Fredoka-ExtraLightItalic',
      },
      light: { normal: 'Fredoka-Light', italic: 'Fredoka-LightItalic' },
      regular: { normal: 'Fredoka-Regular', italic: 'Fredoka-Italic' },
      medium: { normal: 'Fredoka-Medium', italic: 'Fredoka-MediumItalic' },
      semibold: {
        normal: 'Fredoka-SemiBold',
        italic: 'Fredoka-SemiBoldItalic',
      },
      bold: { normal: 'Fredoka-Bold', italic: 'Fredoka-BoldItalic' },
      extrabold: {
        normal: 'Fredoka-ExtraBold',
        italic: 'Fredoka-ExtraBoldItalic',
      },
      black: { normal: 'Fredoka-Black', italic: 'Fredoka-BlackItalic' },
    },
    nunito: {
      thin: { normal: 'Nunito-Thin', italic: 'Nunito-ThinItalic' },
      extralight: {
        normal: 'Nunito-ExtraLight',
        italic: 'Nunito-ExtraLightItalic',
      },
      light: { normal: 'Nunito-Light', italic: 'Nunito-LightItalic' },
      regular: { normal: 'Nunito-Regular', italic: 'Nunito-Italic' },
      medium: { normal: 'Nunito-Medium', italic: 'Nunito-MediumItalic' },
      semibold: { normal: 'Nunito-SemiBold', italic: 'Nunito-SemiBoldItalic' },
      bold: { normal: 'Nunito-Bold', italic: 'Nunito-BoldItalic' },
      extrabold: {
        normal: 'Nunito-ExtraBold',
        italic: 'Nunito-ExtraBoldItalic',
      },
      black: { normal: 'Nunito-Black', italic: 'Nunito-BlackItalic' },
    },
    roboto: {
      thin: { normal: 'Roboto-Thin', italic: 'Roboto-ThinItalic' },
      extralight: {
        normal: 'Roboto-ExtraLight',
        italic: 'Roboto-ExtraLightItalic',
      },
      light: { normal: 'Roboto-Light', italic: 'Roboto-LightItalic' },
      regular: { normal: 'Roboto-Regular', italic: 'Roboto-Italic' },
      medium: { normal: 'Roboto-Medium', italic: 'Roboto-MediumItalic' },
      semibold: { normal: 'Roboto-SemiBold', italic: 'Roboto-SemiBoldItalic' },
      bold: { normal: 'Roboto-Bold', italic: 'Roboto-BoldItalic' },
      extrabold: {
        normal: 'Roboto-ExtraBold',
        italic: 'Roboto-ExtraBoldItalic',
      },
      black: { normal: 'Roboto-Black', italic: 'Roboto-BlackItalic' },
    },
    baskerville: {
      thin: { normal: 'Baskerville-Thin', italic: 'Baskerville-ThinItalic' },
      extralight: {
        normal: 'Baskervville-ExtraLight',
        italic: 'Baskervville-ExtraLightItalic',
      },
      light: {
        normal: 'Baskervville-Light',
        italic: 'Baskervville-LightItalic',
      },
      regular: {
        normal: 'Baskervville-Regular',
        italic: 'Baskervville-Italic',
      },
      medium: {
        normal: 'Baskervville-Medium',
        italic: 'Baskervville-MediumItalic',
      },
      semibold: {
        normal: 'Baskervville-SemiBold',
        italic: 'Baskervville-SemiBoldItalic',
      },
      bold: { normal: 'Baskervville-Bold', italic: 'Baskervville-BoldItalic' },
      extrabold: {
        normal: 'Baskervville-ExtraBold',
        italic: 'Baskervville-ExtraBoldItalic',
      },
      black: {
        normal: 'Baskervville-Black',
        italic: 'Baskervville-BlackItalic',
      },
    },
  },
};

// Font weight to numeric mapping
const FONT_WEIGHT_MAP: Record<FontWeight, TextStyle['fontWeight']> = {
  thin: '100',
  extralight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
};

// Configuration for font mode (variable vs static)
let USE_VARIABLE_FONTS = false;

/**
 * Set whether to use variable fonts or static fonts
 */
export const setFontMode = (useVariable: boolean) => {
  USE_VARIABLE_FONTS = useVariable;
};

/**
 * Get font style object for the specified family, weight, and style
 */
export const getFont = (
  family: FontFamily,
  weight: FontWeight = 'regular',
  style: FontStyle = 'normal',
): Pick<TextStyle, 'fontFamily' | 'fontWeight' | 'fontStyle'> => {
  // For variable fonts
  if (USE_VARIABLE_FONTS && FONT_CONFIG.variable[family]) {
    return {
      fontFamily: FONT_CONFIG.variable[family],
      fontWeight: FONT_WEIGHT_MAP[weight],
      fontStyle: style,
    };
  }

  // For static fonts
  const staticFont = FONT_CONFIG.static[family];
  if (!staticFont) {
    console.warn(
      `Font family '${family}' not found, falling back to Montserrat-Regular`,
    );
    return { fontFamily: 'Montserrat-Regular' };
  }

  const weightConfig = staticFont[weight];
  if (!weightConfig) {
    console.warn(
      `Font weight '${weight}' not available for '${family}', falling back to regular`,
    );
    const regularConfig = staticFont.regular;
    return {
      fontFamily:
        regularConfig?.[style] || regularConfig?.normal || 'Montserrat-Regular',
    };
  }

  const fontFamily = weightConfig[style] || weightConfig.normal;
  if (!fontFamily) {
    console.warn(
      `Font style '${style}' not available for '${family}' ${weight}, falling back to normal`,
    );
    return { fontFamily: weightConfig.normal || 'Montserrat-Regular' };
  }

  return { fontFamily };
};

/**
 * Convenience function to get font with size
 */
export const getFontWithSize = (
  family: FontFamily,
  weight: FontWeight = 'regular',
  size: number,
  style: FontStyle = 'normal',
): Pick<TextStyle, 'fontFamily' | 'fontWeight' | 'fontStyle' | 'fontSize'> => {
  return {
    ...getFont(family, weight, style),
    fontSize: size,
  };
};

/**
 * Helper function to get Newsreader font with specific optical size
 */
export const getNewsreaderFont = (
  opticalSize: '9pt' | '14pt' | '24pt' | '36pt' | '60pt' = '14pt',
  weight: FontWeight = 'regular',
  style: FontStyle = 'normal',
) => {
  const weightMap = {
    thin: 'ExtraLight',
    extralight: 'ExtraLight',
    light: 'Light',
    regular: 'Regular',
    medium: 'Medium',
    semibold: 'SemiBold',
    bold: 'Bold',
    extrabold: 'ExtraBold',
    black: 'ExtraBold',
  };

  const styleMap = {
    normal: '',
    italic: 'Italic',
  };

  const fontWeight = weightMap[weight];
  const fontStyle = styleMap[style];

  return {
    fontFamily: `Newsreader_${opticalSize}-${fontWeight}${fontStyle}`,
  };
};
