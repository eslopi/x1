import { Geolocation } from '@nativescript/geolocation';
import { ErrorHandler } from '../utils/error-handler';

export async function initializeLocation(): Promise<void> {
  try {
    const hasPermission = await Geolocation.enableLocationRequest();
    if (!hasPermission) {
      throw new Error('Location permission denied');
    }
  } catch (error) {
    ErrorHandler.handleError(error as Error, 'Location initialization');
    throw error;
  }
}