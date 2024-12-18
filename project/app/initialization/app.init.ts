import { Application } from '@nativescript/core';
import { initializeLocation } from './location.init';
import { ErrorHandler } from '../utils/error-handler';

export async function initializeApp(): Promise<void> {
  try {
    // Initialize location services
    await initializeLocation();
    
    // Start the application
    Application.run({ moduleName: 'app-root' });
  } catch (error) {
    ErrorHandler.handleError(error as Error, 'App initialization');
  }
}