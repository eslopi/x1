import { Venue } from '../types/venue.types';
import { ChatMessage } from '../types/chat.types';

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

export const validateMessage = (message: Partial<ChatMessage>): string[] => {
  const errors: string[] = [];

  if (!message.content?.trim() && !message.imageUrl) {
    errors.push('Message must contain text or an image');
  }

  if (message.content && message.content.length > 500) {
    errors.push('Message text cannot exceed 500 characters');
  }

  if (!message.userId || !message.userName) {
    errors.push('User information is required');
  }

  return errors;
};