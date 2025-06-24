import { Platform, PermissionsAndroid } from 'react-native';
import {
  checkCameraRollPermission,
  requestCameraRollPermission,
  ensureCameraRollPermission,
  checkCameraPermission,
  requestCameraPermission,
  checkPermission,
  requestPermission,
  getPermissionRationale,
} from './permissionUtils';
import { PermissionStatus, PermissionType } from '@/types';

// Mock React Native modules
jest.mock('react-native', () => ({
  Platform: {
    OS: 'android',
    Version: '30',
  },
  PermissionsAndroid: {
    PERMISSIONS: {
      READ_EXTERNAL_STORAGE: 'android.permission.READ_EXTERNAL_STORAGE',
      READ_MEDIA_IMAGES: 'android.permission.READ_MEDIA_IMAGES',
      READ_MEDIA_VIDEO: 'android.permission.READ_MEDIA_VIDEO',
      CAMERA: 'android.permission.CAMERA',
    },
    RESULTS: {
      GRANTED: 'granted',
      DENIED: 'denied',
      NEVER_ASK_AGAIN: 'never_ask_again',
    },
    check: jest.fn(),
    request: jest.fn(),
    requestMultiple: jest.fn(),
  },
}));

// Mock console.error to test error handling
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

describe('permissionUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConsoleError.mockClear();
    // Reset Platform.OS to android for most tests
    Platform.OS = 'android';
    Platform.Version = '30';
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  describe('checkCameraRollPermission', () => {
    it('should return true for iOS', async () => {
      Platform.OS = 'ios';

      const result = await checkCameraRollPermission();

      expect(result).toBe(true);
      expect(PermissionsAndroid.check).not.toHaveBeenCalled();
    });

    it('should check READ external storage for Android API < 33', async () => {
      Platform.Version = '30';
      (PermissionsAndroid.check as jest.Mock).mockResolvedValue(true);

      const result = await checkCameraRollPermission();

      expect(result).toBe(true);
      expect(PermissionsAndroid.check).toHaveBeenCalledWith(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    });

    it('should check granular media permissions for Android API >= 33', async () => {
      Platform.Version = '33';
      (PermissionsAndroid.check as jest.Mock)
        .mockResolvedValueOnce(true) // READ_MEDIA_IMAGES
        .mockResolvedValueOnce(true); // READ_MEDIA_VIDEO

      const result = await checkCameraRollPermission();

      expect(result).toBe(true);
      expect(PermissionsAndroid.check).toHaveBeenCalledTimes(2);
      expect(PermissionsAndroid.check).toHaveBeenCalledWith(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      );
      expect(PermissionsAndroid.check).toHaveBeenCalledWith(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      );
    });

    it('should return false if only one granular permission is granted on Android API >= 33', async () => {
      Platform.Version = '33';
      (PermissionsAndroid.check as jest.Mock)
        .mockResolvedValueOnce(true) // READ_MEDIA_IMAGES
        .mockResolvedValueOnce(false); // READ_MEDIA_VIDEO

      const result = await checkCameraRollPermission();

      expect(result).toBe(false);
    });

    it('should handle errors and return false', async () => {
      (PermissionsAndroid.check as jest.Mock).mockRejectedValue(new Error('Permission error'));

      const result = await checkCameraRollPermission();

      expect(result).toBe(false);
      expect(mockConsoleError).toHaveBeenCalledWith(
        'Error checking camera roll permission:',
        expect.any(Error),
      );
    });
  });

  describe('requestCameraRollPermission', () => {
    it('should return granted for iOS', async () => {
      Platform.OS = 'ios';

      const result = await requestCameraRollPermission();

      expect(result).toEqual({
        status: PermissionStatus.GRANTED,
        canAskAgain: false,
      });
    });

    it('should request read external storage for Android API < 33', async () => {
      Platform.Version = '30';
      (PermissionsAndroid.request as jest.Mock).mockResolvedValue(
        PermissionsAndroid.RESULTS.GRANTED,
      );

      const result = await requestCameraRollPermission();

      expect(result).toEqual({
        status: PermissionStatus.GRANTED,
        canAskAgain: false,
      });
      expect(PermissionsAndroid.request).toHaveBeenCalledWith(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    });

    it('should handle denied permission for Android API < 33', async () => {
      Platform.Version = '30';
      (PermissionsAndroid.request as jest.Mock).mockResolvedValue(
        PermissionsAndroid.RESULTS.DENIED,
      );

      const result = await requestCameraRollPermission();

      expect(result).toEqual({
        status: PermissionStatus.DENIED,
        canAskAgain: true,
      });
    });

    it('should handle never ask again for Android API < 33', async () => {
      Platform.Version = '30';
      (PermissionsAndroid.request as jest.Mock).mockResolvedValue(
        PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN,
      );

      const result = await requestCameraRollPermission();

      expect(result).toEqual({
        status: PermissionStatus.DENIED,
        canAskAgain: false,
      });
    });

    it('should request granular permissions for Android API >= 33', async () => {
      Platform.Version = '33';
      (PermissionsAndroid.requestMultiple as jest.Mock).mockResolvedValue({
        [PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES]: PermissionsAndroid.RESULTS.GRANTED,
        [PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO]: PermissionsAndroid.RESULTS.GRANTED,
      });

      const result = await requestCameraRollPermission();

      expect(result).toEqual({
        status: PermissionStatus.GRANTED,
        canAskAgain: false,
      });
    });

    it('should handle partial denial for Android API >= 33', async () => {
      Platform.Version = '33';
      (PermissionsAndroid.requestMultiple as jest.Mock).mockResolvedValue({
        [PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES]: PermissionsAndroid.RESULTS.GRANTED,
        [PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO]: PermissionsAndroid.RESULTS.DENIED,
      });

      const result = await requestCameraRollPermission();

      expect(result).toEqual({
        status: PermissionStatus.DENIED,
        canAskAgain: true,
      });
    });

    it('should handle errors', async () => {
      (PermissionsAndroid.request as jest.Mock).mockRejectedValue(new Error('Request error'));

      const result = await requestCameraRollPermission();

      expect(result).toEqual({
        status: PermissionStatus.DENIED,
        canAskAgain: false,
      });
      expect(mockConsoleError).toHaveBeenCalledWith(
        'Error requesting camera roll permission:',
        expect.any(Error),
      );
    });
  });

  describe('ensureCameraRollPermission', () => {
    it('should return true if permission already granted', async () => {
      Platform.OS = 'ios';

      const result = await ensureCameraRollPermission();

      expect(result).toBe(true);
    });

    it('should request permission if not already granted', async () => {
      (PermissionsAndroid.check as jest.Mock).mockResolvedValue(false);
      (PermissionsAndroid.request as jest.Mock).mockResolvedValue(
        PermissionsAndroid.RESULTS.GRANTED,
      );

      const result = await ensureCameraRollPermission();

      expect(result).toBe(true);
    });

    it('should return false if permission request is denied', async () => {
      (PermissionsAndroid.check as jest.Mock).mockResolvedValue(false);
      (PermissionsAndroid.request as jest.Mock).mockResolvedValue(
        PermissionsAndroid.RESULTS.DENIED,
      );

      const result = await ensureCameraRollPermission();

      expect(result).toBe(false);
    });

    it('should handle errors', async () => {
      (PermissionsAndroid.check as jest.Mock).mockRejectedValue(new Error('Check error'));
      
      const result = await ensureCameraRollPermission();
      
      expect(result).toBe(false);
      expect(mockConsoleError).toHaveBeenCalledWith(
        'Error checking camera roll permission:',
        expect.any(Error)
      );
    });
  });

  describe('checkCameraPermission', () => {
    it('should return true for iOS', async () => {
      Platform.OS = 'ios';

      const result = await checkCameraPermission();

      expect(result).toBe(true);
    });

    it('should check camera permission for Android', async () => {
      (PermissionsAndroid.check as jest.Mock).mockResolvedValue(true);

      const result = await checkCameraPermission();

      expect(result).toBe(true);
      expect(PermissionsAndroid.check).toHaveBeenCalledWith(PermissionsAndroid.PERMISSIONS.CAMERA);
    });

    it('should handle errors', async () => {
      (PermissionsAndroid.check as jest.Mock).mockRejectedValue(new Error('Camera check error'));

      const result = await checkCameraPermission();

      expect(result).toBe(false);
      expect(mockConsoleError).toHaveBeenCalledWith(
        'Error checking camera permission:',
        expect.any(Error),
      );
    });
  });

  describe('requestCameraPermission', () => {
    it('should return granted for iOS', async () => {
      Platform.OS = 'ios';

      const result = await requestCameraPermission();

      expect(result).toEqual({
        status: PermissionStatus.GRANTED,
        canAskAgain: false,
      });
    });

    it('should request camera permission for Android', async () => {
      (PermissionsAndroid.request as jest.Mock).mockResolvedValue(
        PermissionsAndroid.RESULTS.GRANTED,
      );

      const result = await requestCameraPermission();

      expect(result).toEqual({
        status: PermissionStatus.GRANTED,
        canAskAgain: false,
      });
    });

    it('should handle denied camera permission', async () => {
      (PermissionsAndroid.request as jest.Mock).mockResolvedValue(
        PermissionsAndroid.RESULTS.DENIED,
      );

      const result = await requestCameraPermission();

      expect(result).toEqual({
        status: PermissionStatus.DENIED,
        canAskAgain: true,
      });
    });

    it('should handle errors', async () => {
      (PermissionsAndroid.request as jest.Mock).mockRejectedValue(
        new Error('Camera request error'),
      );

      const result = await requestCameraPermission();

      expect(result).toEqual({
        status: PermissionStatus.DENIED,
        canAskAgain: false,
      });
    });
  });

  describe('checkPermission', () => {
    it('should check camera roll permission', async () => {
      Platform.OS = 'ios';

      const result = await checkPermission(PermissionType.CAMERA_ROLL);

      expect(result).toBe(true);
    });

    it('should check camera permission', async () => {
      Platform.OS = 'ios';

      const result = await checkPermission(PermissionType.CAMERA);

      expect(result).toBe(true);
    });

    it('should return false for unknown permission type', async () => {
      const result = await checkPermission('UNKNOWN' as PermissionType);

      expect(result).toBe(false);
    });
  });

  describe('requestPermission', () => {
    it('should request camera roll permission', async () => {
      Platform.OS = 'ios';

      const result = await requestPermission(PermissionType.CAMERA_ROLL);

      expect(result).toEqual({
        status: PermissionStatus.GRANTED,
        canAskAgain: false,
      });
    });

    it('should request camera permission', async () => {
      Platform.OS = 'ios';

      const result = await requestPermission(PermissionType.CAMERA);

      expect(result).toEqual({
        status: PermissionStatus.GRANTED,
        canAskAgain: false,
      });
    });

    it('should return unavailable for unknown permission type', async () => {
      const result = await requestPermission('UNKNOWN' as PermissionType);

      expect(result).toEqual({
        status: PermissionStatus.UNAVAILABLE,
        canAskAgain: false,
      });
    });
  });

  describe('getPermissionRationale', () => {
    it('should return camera roll rationale', () => {
      const result = getPermissionRationale(PermissionType.CAMERA_ROLL);

      expect(result).toBe(
        'This app needs access to your photo library to let you select images for your memes.',
      );
    });

    it('should return camera rationale', () => {
      const result = getPermissionRationale(PermissionType.CAMERA);

      expect(result).toBe('This app needs access to your camera to take photos for your memes.');
    });

    it('should return default rationale for unknown permission type', () => {
      const result = getPermissionRationale('UNKNOWN' as PermissionType);

      expect(result).toBe('This app needs permission to function properly.');
    });
  });
});
