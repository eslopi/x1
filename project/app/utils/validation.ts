import { Venue } from '../types';

export const validateVenue = (venue: Partial<Venue>): string[] => {
  const errors: string[] = [];
  
  if (!venue.name?.trim()) {
    errors.push('Name is required');
  }
  
  if (!venue.coordinates?.latitude || !venue.coordinates?.longitude) {
    errors.push('Valid coordinates are required');
  }
  
  if (!venue.type) {
    errors.push('Venue type is required');
  }
  
  return errors;
};

export const validatePhotoUpload = (file: any): string[] => {
  const errors: string[] = [];
  const maxSize = 1024 * 1024; // 1MB
  
  if (file.size > maxSize) {
    errors.push('Photo size must be less than 1MB');
  }
  
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    errors.push('Only JPEG and PNG images are allowed');
  }
  
  return errors;
};