export interface Venue {
  id: string;
  name: string;
  type: VenueType;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  description: string;
  photos: string[];
  rating: number;
  capacity: number;
  currentOccupancy: number;
  operatingHours: OperatingHours[];
  isOpen: boolean;
}

export enum VenueType {
  BAR = 'bar',
  CLUB = 'club',
  THEATER = 'theater',
  RESTAURANT = 'restaurant'
}

export interface OperatingHours {
  day: number;
  open: string;
  close: string;
}