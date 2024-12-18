import { Permissions } from '@nativescript/core';

export class PermissionsUtil {
  static async requestLocationPermission(): Promise<boolean> {
    try {
      const permission = await Permissions.requestPermission('location');
      return permission === 'authorized';
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  }

  static async requestCameraPermission(): Promise<boolean> {
    try {
      const permission = await Permissions.requestPermission('camera');
      return permission === 'authorized';
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      return false;
    }
  }
}