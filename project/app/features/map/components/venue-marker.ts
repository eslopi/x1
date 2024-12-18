import { Observable } from '@nativescript/core';
import { Venue } from '../../../types';

export class VenueMarker extends Observable {
  constructor(private venue: Venue) {
    super();
  }

  getMarkerOptions() {
    return {
      coordinate: {
        lat: this.venue.coordinates.latitude,
        lng: this.venue.coordinates.longitude
      },
      title: this.venue.name,
      subtitle: `${this.venue.type} • ${this.venue.isOpen ? 'Open' : 'Closed'}`,
      selected: false,
      onTap: () => this.notify({ 
        eventName: 'markerTapped',
        object: this,
        venue: this.venue
      })
    };
  }
}