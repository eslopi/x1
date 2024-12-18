export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface OperatingHours {
  day: number;
  open: string;
  close: string;
}

export enum VenueType {
  BAR = 'bar',
  CLUB = 'club',
  THEATER = 'theater',
  RESTAURANT = 'restaurant'
}

export interface Venue {
  id: string;
  name: string;
  type: VenueType;
  coordinates: Coordinates;
  description: string;
  photos: string[];
  rating: number;
  capacity: number;
  currentOccupancy: number;
  operatingHours: OperatingHours[];
  isOpen: boolean;
}