import { Observable } from '@nativescript/core';
import { Venue } from '../types/venue.types';

export class VenueService extends Observable {
  private static instance: VenueService;
  private venues: Venue[] = [];

  private constructor() {
    super();
    // Initialize with mock data for demo
    this.venues = [
      {
        id: '1',
        name: 'The Local Bar',
        type: 'BAR',
        coordinates: { latitude: 40.7128, longitude: -74.0060 },
        description: 'Cozy local bar with great atmosphere',
        photos: [],
        rating: 4.5,
        capacity: 100,
        currentOccupancy: 45,
        operatingHours: [],
        isOpen: true
      }
    ];
  }

  static getInstance(): VenueService {
    if (!VenueService.instance) {
      VenueService.instance = new VenueService();
    }
    return VenueService.instance;
  }

  async getVenues(): Promise<Venue[]> {
    return this.venues;
  }

  watchVenues(callback: (venues: Venue[]) => void): () => void {
    callback(this.venues);
    return () => {};
  }
}