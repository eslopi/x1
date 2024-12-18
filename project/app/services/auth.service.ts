import { FirebaseService } from './firebase.service';
import { Auth, User } from '@nativescript/firebase-auth';
import { Observable } from '@nativescript/core';

export class AuthService extends Observable {
  private static instance: AuthService;
  private auth: Auth;

  private constructor() {
    super();
    this.auth = FirebaseService.getInstance().getAuth();
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  async signIn(email: string, password: string): Promise<User> {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    }
  }
}