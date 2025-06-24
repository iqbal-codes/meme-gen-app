import getFont from './fontUtils';
import { FontFamily, FontWeight, FontStyle } from '@/types';

// Mock console.warn to test warning messages
const mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});

describe('fontUtils', () => {
  beforeEach(() => {
    mockConsoleWarn.mockClear();
  });

  afterAll(() => {
    mockConsoleWarn.mockRestore();
  });

  describe('getFont', () => {
    describe('valid font configurations', () => {
      it('should return correct font for montserrat regular normal', () => {
        const result = getFont('montserrat', 'regular', 'normal');
        expect(result).toEqual({ fontFamily: 'Montserrat-Regular' });
      });

      it('should return correct font for montserrat bold italic', () => {
        const result = getFont('montserrat', 'bold', 'italic');
        expect(result).toEqual({ fontFamily: 'Montserrat-BoldItalic' });
      });


      it('should return correct font for nunito light italic', () => {
        const result = getFont('nunito', 'light', 'italic');
        expect(result).toEqual({ fontFamily: 'Nunito-LightItalic' });
      });

      it('should return correct font for roboto semibold normal', () => {
        const result = getFont('roboto', 'semibold', 'normal');
        expect(result).toEqual({ fontFamily: 'Roboto-SemiBold' });
      });

      it('should return correct font for baskerville black italic', () => {
        const result = getFont('baskerville', 'black', 'italic');
        expect(result).toEqual({ fontFamily: 'Baskervville-BlackItalic' });
      });
    });

    describe('default parameters', () => {
      it('should use regular weight and normal style as defaults', () => {
        const result = getFont('montserrat');
        expect(result).toEqual({ fontFamily: 'Montserrat-Regular' });
      });

    });

    describe('fallback behavior', () => {
      it('should fallback to Montserrat-Regular for unknown font family', () => {
        const result = getFont('unknown' as FontFamily);
        expect(result).toEqual({ fontFamily: 'Montserrat-Regular' });
        expect(mockConsoleWarn).toHaveBeenCalledWith(
          "Font family 'unknown' not found, falling back to Montserrat-Regular"
        );
      });

      it('should fallback to regular weight for unknown weight', () => {
        const result = getFont('montserrat', 'unknown' as FontWeight);
        expect(result).toEqual({ fontFamily: 'Montserrat-Regular' });
        expect(mockConsoleWarn).toHaveBeenCalledWith(
          "Font weight 'unknown' not available for 'montserrat', falling back to regular"
        );
      });

      it('should fallback to normal style for unknown style', () => {
        const result = getFont('montserrat', 'bold', 'unknown' as FontStyle);
        expect(result).toEqual({ fontFamily: 'Montserrat-Bold' });
        // Note: No warning is logged because the fallback to normal style succeeds
      });

      it('should handle missing style gracefully', () => {
        // Test a case where the style might not exist
        const result = getFont('montserrat', 'regular', 'italic');
        expect(result).toEqual({ fontFamily: 'Montserrat-Italic' });
      });
    });

    describe('edge cases', () => {
      it('should handle all font families', () => {
        const families: FontFamily[] = ['montserrat', 'nunito', 'roboto', 'baskerville'];
        
        families.forEach(family => {
          const result = getFont(family);
          expect(result.fontFamily).toBeDefined();
          expect(typeof result.fontFamily).toBe('string');
        });
      });

      it('should handle all font weights', () => {
        const weights: FontWeight[] = [
          'thin', 'extralight', 'light', 'regular', 'medium',
          'semibold', 'bold', 'extrabold', 'black'
        ];
        
        weights.forEach(weight => {
          const result = getFont('montserrat', weight);
          expect(result.fontFamily).toBeDefined();
          expect(typeof result.fontFamily).toBe('string');
        });
      });

      it('should handle both font styles', () => {
        const styles: FontStyle[] = ['normal', 'italic'];
        
        styles.forEach(style => {
          const result = getFont('montserrat', 'regular', style);
          expect(result.fontFamily).toBeDefined();
          expect(typeof result.fontFamily).toBe('string');
        });
      });
    });

    describe('specific font family variations', () => {

      it('should handle nunito font variations', () => {
        expect(getFont('nunito', 'extralight', 'normal')).toEqual({ fontFamily: 'Nunito-ExtraLight' });
        expect(getFont('nunito', 'black', 'italic')).toEqual({ fontFamily: 'Nunito-BlackItalic' });
      });

      it('should handle roboto font variations', () => {
        expect(getFont('roboto', 'thin', 'italic')).toEqual({ fontFamily: 'Roboto-ThinItalic' });
        expect(getFont('roboto', 'extrabold', 'normal')).toEqual({ fontFamily: 'Roboto-ExtraBold' });
      });

      it('should handle baskerville font variations (note the different naming)', () => {
        expect(getFont('baskerville', 'regular', 'normal')).toEqual({ fontFamily: 'Baskervville-Regular' });
        expect(getFont('baskerville', 'bold', 'italic')).toEqual({ fontFamily: 'Baskervville-BoldItalic' });
      });
    });

    describe('return type validation', () => {
      it('should return object with fontFamily property', () => {
        const result = getFont('montserrat');
        expect(result).toHaveProperty('fontFamily');
        expect(typeof result.fontFamily).toBe('string');
      });

      it('should not return fontWeight or fontStyle properties for static fonts', () => {
        const result = getFont('montserrat');
        expect(result).not.toHaveProperty('fontWeight');
        expect(result).not.toHaveProperty('fontStyle');
      });
    });
  });
});