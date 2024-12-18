import { firebase } from '@nativescript/firebase-core';
import { getDatabase, Database } from '@nativescript/firebase-database';
import { getAuth, Auth } from '@nativescript/firebase-auth';
import { getStorage, Storage } from '@nativescript/firebase-storage';
import { firebaseConfig } from '../config/firebase.config';

export class FirebaseService {
  private static instance: FirebaseService;
  private auth: Auth;
  private database: Database;
  private storage: Storage;

  private constructor() {
    this.initializeFirebase();
    this.auth = getAuth();
    this.database = getDatabase();
    this.storage = getStorage();
  }

  static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  private initializeFirebase() {
    try {
      // Check if Firebase is already initialized
      if (!firebase.apps?.length) {
        // Initialize Firebase with config
        const app = firebase.initializeApp(firebaseConfig);
        
        // Verify initialization
        if (!app) {
          throw new Error('Firebase initialization failed');
        }
      }
    } catch (error) {
      console.error('Firebase initialization error:', error);
      throw error;
    }
  }

  getAuth(): Auth {
    return this.auth;
  }

  getDatabase(): Database {
    return this.database;
  }

  getStorage(): Storage {
    return this.storage;
  }
}