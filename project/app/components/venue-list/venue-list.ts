import { Observable } from '@nativescript/core';
import { Venue } from '../../types';
import { APP_CONSTANTS } from '../../constants';

export class VenueListViewModel extends Observable {
  private _venues: Venue[] = [];
  
  constructor() {
    super();
  }
  
  get venues(): Venue[] {
    return this._venues;
  }
  
  get listHeight(): number {
    return APP_CONSTANTS.VENUE_LIST_HEIGHT;
  }
  
  updateVenues(venues: Venue[]) {
    this._venues = venues;
    this.notifyPropertyChange('venues', venues);
  }
  
  onVenueTap(args: any) {
    const venue = this._venues[args.index];
    this.notify({
      eventName: 'venueTapped',
      object: this,
      venue
    });
  }
}