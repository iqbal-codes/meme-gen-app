import { Platform, PermissionsAndroid } from 'react-native';
import { PermissionStatus, PermissionResult, PermissionType } from '@/types';

/*
/**
 * Check if the app has camera roll permissions
 * Handles different Android API levels (33+ vs older)
 */
export const checkCameraRollPermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    return true; // iOS handles permissions through Info.plist
  }

  try {
    if (Number(Platform.Version) >= 33) {
      // Android 13+ uses granular media permissions
      const [hasReadMediaImages, hasReadMediaVideo] = await Promise.all([
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
      ]);
      return hasReadMediaImages && hasReadMediaVideo;
    }
    // Android 12 and below use READ_EXTERNAL_STORAGE
    return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
  } catch (error) {
    console.error('Error checking camera roll permission:', error);
    return false;
  }
};

/**
 * Request camera roll permissions
 * Handles different Android API levels (33+ vs older)
 */
export const requestCameraRollPermission = async (): Promise<PermissionResult> => {
  if (Platform.OS !== 'android') {
    return {
      status: PermissionStatus.GRANTED,
      canAskAgain: false,
    };
  }

  try {
    if (Number(Platform.Version) >= 33) {
      // Android 13+ uses granular media permissions
      const statuses = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]);

      const imagesGranted =
        statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
        PermissionsAndroid.RESULTS.GRANTED;
      const videoGranted =
        statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
        PermissionsAndroid.RESULTS.GRANTED;

      if (imagesGranted && videoGranted) {
        return {
          status: PermissionStatus.GRANTED,
          canAskAgain: false,
        };
      }

      const imagesDenied =
        statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
        PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN;
      const videoDenied =
        statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
        PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN;

      return {
        status: PermissionStatus.DENIED,
        canAskAgain: !(imagesDenied || videoDenied),
      };
    }
    // Android 12 and below use READ_EXTERNAL_STORAGE
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return {
        status: PermissionStatus.GRANTED,
        canAskAgain: false,
      };
    }

    return {
      status: PermissionStatus.DENIED,
      canAskAgain: status !== PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN,
    };
  } catch (error) {
    console.error('Error requesting camera roll permission:', error);
    return {
      status: PermissionStatus.DENIED,
      canAskAgain: false,
    };
  }
};

/**
 * Check and request camera roll permission in one call
 * This is the main function you'll use in your components
 */
export const ensureCameraRollPermission = async (): Promise<boolean> => {
  try {
    // First check if we already have permission
    const hasPermission = await checkCameraRollPermission();
    if (hasPermission) {
      return true;
    }

    // If not, request permission
    const result = await requestCameraRollPermission();
    return result.status === PermissionStatus.GRANTED;
  } catch (error) {
    console.error('Error ensuring camera roll permission:', error);
    return false;
  }
};

/**
 * Check camera permission (for future use)
 */
export const checkCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    return true;
  }

  try {
    return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
  } catch (error) {
    console.error('Error checking camera permission:', error);
    return false;
  }
};

/**
 * Request camera permission (for future use)
 */
export const requestCameraPermission = async (): Promise<PermissionResult> => {
  if (Platform.OS !== 'android') {
    return {
      status: PermissionStatus.GRANTED,
      canAskAgain: false,
    };
  }

  try {
    const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return {
        status: PermissionStatus.GRANTED,
        canAskAgain: false,
      };
    }

    return {
      status: PermissionStatus.DENIED,
      canAskAgain: status !== PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN,
    };
  } catch (error) {
    console.error('Error requesting camera permission:', error);
    return {
      status: PermissionStatus.DENIED,
      canAskAgain: false,
    };
  }
};

/**
 * Generic permission checker for any permission type
 */
export const checkPermission = async (permissionType: PermissionType): Promise<boolean> => {
  switch (permissionType) {
    case PermissionType.CAMERA_ROLL:
      return checkCameraRollPermission();
    case PermissionType.CAMERA:
      return checkCameraPermission();
    default:
      return false;
  }
};

/**
 * Generic permission requester for any permission type
 */
export const requestPermission = async (
  permissionType: PermissionType,
): Promise<PermissionResult> => {
  switch (permissionType) {
    case PermissionType.CAMERA_ROLL:
      return requestCameraRollPermission();
    case PermissionType.CAMERA:
      return requestCameraPermission();
    default:
      return {
        status: PermissionStatus.UNAVAILABLE,
        canAskAgain: false,
      };
  }
};

/**
 * Show permission rationale to user
 * You can customize these messages based on your app's needs
 */
export const getPermissionRationale = (permissionType: PermissionType): string => {
  switch (permissionType) {
    case PermissionType.CAMERA_ROLL:
      return 'This app needs access to your photo library to let you select images for your memes.';
    case PermissionType.CAMERA:
      return 'This app needs access to your camera to take photos for your memes.';
    default:
      return 'This app needs permission to function properly.';
  }
};
