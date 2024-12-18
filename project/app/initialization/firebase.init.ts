import { firebase } from '@nativescript/firebase-core';
import { firebaseConfig } from '../config/firebase.config';
import { ErrorHandler } from '../utils/error-handler';

export async function initializeFirebase(): Promise<void> {
  try {
    if (!firebase.apps?.length) {
      const app = await firebase.initializeApp(firebaseConfig);
      if (!app) {
        throw new Error('Firebase initialization failed');
      }
    }
  } catch (error) {
    ErrorHandler.handleError(error as Error, 'Firebase initialization');
    throw error;
  }
}