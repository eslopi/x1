import { Observable } from '@nativescript/core';
import { MAPBOX_ACCESS_TOKEN, DEFAULT_CENTER } from '../config/mapbox';
import { Venue } from '../models/venue';
import { firebase } from '@nativescript/firebase-core';
import { getDatabase } from '@nativescript/firebase-database';

export class MapViewModel extends Observable {
  private _venues: Venue[] = [];
  private _mapboxAccessToken: string = MAPBOX_ACCESS_TOKEN;
  private _latitude: number = DEFAULT_CENTER.lat;
  private _longitude: number = DEFAULT_CENTER.lng;
  private _zoomLevel: number = DEFAULT_CENTER.zoom;

  constructor() {
    super();
    this.loadVenues();
  }

  get venues(): Venue[] {
    return this._venues;
  }

  get mapboxAccessToken(): string {
    return this._mapboxAccessToken;
  }

  get latitude(): number {
    return this._latitude;
  }

  get longitude(): number {
    return this._longitude;
  }

  get zoomLevel(): number {
    return this._zoomLevel;
  }

  async loadVenues() {
    try {
      const database = getDatabase();
      const venuesRef = database.ref('venues');
      
      venuesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        this._venues = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        this.notifyPropertyChange('venues', this._venues);
      });
    } catch (error) {
      console.error('Error loading venues:', error);
    }
  }

  onMapReady(args: any) {
    // Handle map ready event
    console.log('Map is ready');
  }
}