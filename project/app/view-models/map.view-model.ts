import { Observable } from '@nativescript/core';
import { Venue } from '../types/venue.types';
import { VenueService } from '../services/venue.service';
import { GeolocationService } from '../utils/geolocation';
import { APP_CONFIG } from '../config/app.config';

export class MapViewModel extends Observable {
  private venueService: VenueService;
  private _venues: Venue[] = [];
  private _isLoading = false;
  private _currentLocation: any = null;

  constructor() {
    super();
    this.venueService = VenueService.getInstance();
    this.initializeMap();
  }

  private async initializeMap() {
    try {
      this._currentLocation = await GeolocationService.getCurrentLocation();
      if (this._currentLocation) {
        this.notifyPropertyChange('mapConfig', {
          ...APP_CONFIG.map,
          defaultCenter: {
            lat: this._currentLocation.latitude,
            lng: this._currentLocation.longitude,
            zoom: APP_CONFIG.defaultLocation.zoom
          }
        });
      }
      await this.loadVenues();
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  async loadVenues() {
    try {
      this._isLoading = true;
      this.notifyPropertyChange('isLoading', true);
      
      const venues = await this.venueService.getVenues();
      this._venues = venues;
      this.notifyPropertyChange('venues', venues);
    } catch (error) {
      console.error('Error loading venues:', error);
    } finally {
      this._isLoading = false;
      this.notifyPropertyChange('isLoading', false);
    }
  }

  get venues(): Venue[] {
    return this._venues;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }
}