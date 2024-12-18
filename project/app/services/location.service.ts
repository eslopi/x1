import { Geolocation } from '@nativescript/geolocation';
import { ErrorHandler } from '../utils/error-handler';
import { Observable } from '@nativescript/core';
import { LocationType } from '../types/location.types';

export class LocationService extends Observable {
  private static instance: LocationService;
  private watchId: number | null = null;

  private constructor() {
    super();
  }

  static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  async getCurrentLocation(): Promise<LocationType | null> {
    try {
      const hasPermission = await Geolocation.enableLocationRequest();
      if (!hasPermission) {
        throw new Error('Location permission denied');
      }

      const location = await Geolocation.getCurrentLocation({
        desiredAccuracy: 3,
        maximumAge: 5000,
        timeout: 10000
      });

      return {
        latitude: location.latitude,
        longitude: location.longitude,
        timestamp: location.timestamp
      };
    } catch (error) {
      ErrorHandler.handleError(error as Error, 'LocationService.getCurrentLocation');
      return null;
    }
  }

  watchLocation(callback: (location: LocationType) => void): void {
    try {
      this.watchId = Geolocation.watchLocation(
        (location) => {
          callback({
            latitude: location.latitude,
            longitude: location.longitude,
            timestamp: location.timestamp
          });
        },
        (error) => {
          ErrorHandler.handleError(error, 'LocationService.watchLocation');
        },
        {
          desiredAccuracy: 3,
          updateDistance: 10,
          minimumUpdateTime: 1000 * 60 // 1 minute
        }
      );
    } catch (error) {
      ErrorHandler.handleError(error as Error, 'LocationService.watchLocation');
    }
  }

  stopWatchingLocation(): void {
    if (this.watchId !== null) {
      Geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }
}