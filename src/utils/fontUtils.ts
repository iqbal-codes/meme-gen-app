import { TextStyle } from 'react-native';
import { FontFamily, FontStyle, FontWeight } from '@/types';

// Simplified font configuration - only main fonts
const FONT_CONFIG = {
  // Variable fonts (support dynamic fontWeight)
  variable: {
    montserrat: 'Montserrat',
    baskerville: 'Baskerville',
    nunito: 'Nunito',
    roboto: 'Roboto',
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

/**
 * Get font style object for the specified family, weight, and style
 */
const getFont = (
  family: FontFamily,
  weight: FontWeight = 'regular',
  style: FontStyle = 'normal',
): Pick<TextStyle, 'fontFamily' | 'fontWeight' | 'fontStyle'> => {
  const staticFont = FONT_CONFIG.static[family];
  if (!staticFont) {
    console.warn(`Font family '${family}' not found, falling back to Montserrat-Regular`);
    return { fontFamily: 'Montserrat-Regular' };
  }

  const weightConfig = staticFont[weight];
  if (!weightConfig) {
    console.warn(`Font weight '${weight}' not available for '${family}', falling back to regular`);
    const regularConfig = staticFont.regular;
    return {
      fontFamily: regularConfig?.[style] || regularConfig?.normal || 'Montserrat-Regular',
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

export default getFont;
