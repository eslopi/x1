import { Application } from '@nativescript/core';
import { initializeApp } from './initialization/app.init';

// Initialize and start the application
initializeApp().catch(error => {
  console.error('Application initialization failed:', error);
});