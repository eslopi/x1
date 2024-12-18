import { Geolocation } from '@nativescript/geolocation';
import { ErrorHandler } from './error-handler';

export class GeolocationService {
  static async getCurrentLocation() {
    try {
      const hasPermission = await Geolocation.enableLocationRequest();
      if (!hasPermission) {
        throw new Error('Location permission denied');
      }
      
      return await Geolocation.getCurrentLocation({
        desiredAccuracy: 3,
        maximumAge: 5000,
        timeout: 10000
      });
    } catch (error) {
      ErrorHandler.handleError(error as Error, 'GeolocationService.getCurrentLocation');
      return null;
    }
  }
}