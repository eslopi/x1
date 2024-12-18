import { FirebaseService } from './firebase.service';
import { Database, DataSnapshot } from '@nativescript/firebase-database';
import { Observable } from '@nativescript/core';

export class DatabaseService extends Observable {
  private static instance: DatabaseService;
  private database: Database;

  private constructor() {
    super();
    try {
      this.database = FirebaseService.getInstance().getDatabase();
      if (!this.database) {
        throw new Error('Database initialization failed');
      }
    } catch (error) {
      console.error('DatabaseService initialization error:', error);
      throw error;
    }
  }

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async getData(path: string): Promise<any> {
    try {
      if (!this.database) {
        throw new Error('Database not initialized');
      }
      const snapshot: DataSnapshot = await this.database.ref(path).once('value');
      return snapshot.val();
    } catch (error) {
      console.error(`Failed to get data from ${path}:`, error);
      throw error;
    }
  }

  watchData(path: string, callback: (data: any) => void): () => void {
    try {
      if (!this.database) {
        throw new Error('Database not initialized');
      }
      const reference = this.database.ref(path);
      const listener = reference.on('value', (snapshot) => {
        callback(snapshot.val());
      }, (error) => {
        console.error(`Error watching data at ${path}:`, error);
      });

      return () => reference.off('value', listener);
    } catch (error) {
      console.error(`Failed to setup data watch at ${path}:`, error);
      throw error;
    }
  }

  async setData(path: string, data: any): Promise<void> {
    try {
      if (!this.database) {
        throw new Error('Database not initialized');
      }
      await this.database.ref(path).set(data);
    } catch (error) {
      console.error(`Failed to set data at ${path}:`, error);
      throw error;
    }
  }
}