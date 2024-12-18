import { firebase } from '@nativescript/firebase-core';
import { ErrorHandler } from './error-handler';

export class Analytics {
  static logEvent(eventName: string, params?: Record<string, any>) {
    try {
      firebase.analytics().logEvent(eventName, params);
    } catch (error) {
      ErrorHandler.handleError(error as Error, 'Analytics.logEvent');
    }
  }

  static setUserProperty(name: string, value: string) {
    try {
      firebase.analytics().setUserProperty(name, value);
    } catch (error) {
      ErrorHandler.handleError(error as Error, 'Analytics.setUserProperty');
    }
  }
}