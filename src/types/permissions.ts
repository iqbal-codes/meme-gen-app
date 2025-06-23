export enum PermissionType {
  CAMERA_ROLL = 'CAMERA_ROLL',
  CAMERA = 'CAMERA',
}

export enum PermissionStatus {
  GRANTED = 'granted',
  DENIED = 'denied',
  NEVER_ASK_AGAIN = 'never_ask_again',
  UNAVAILABLE = 'unavailable',
}

export interface PermissionResult {
  status: PermissionStatus;
  canAskAgain: boolean;
}
