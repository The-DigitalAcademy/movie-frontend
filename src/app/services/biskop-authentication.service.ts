import { EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { User } from '../models/user.model';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class BiskopAuthenticationService {

  // observable to hold authenticated user daTA.
  user$: Observable<User | null>;

  private afAuth = inject(AngularFireAuth);

  constructor(
    private router: Router,
  ) {
    this.user$ = this.afAuth.authState.pipe(
      map(user => {
        if (!user) return null;

        return {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          emailVerified: user.emailVerified || false,
          lastLogin: Date.now()
        } as User;
      })
    );
  }

  /**
   * Sign up with email and password
   */
  async signUp(email: string, password: string, displayName?: string): Promise<void> {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = credential.user;
      if (user && displayName) {
        await user.updateProfile({ displayName });
      }

      if (user) {
        try {
          // set user then redirect to page.
        } catch (firestoreError) {
          console.warn('Could not save user profile data, but user was created:', firestoreError);
        }
        this.router.navigate(['/']);
      }
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string): Promise<void> {
    try {
      const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
      if (!credential.user) {
        throw new Error('No user returned after authentication');
      }
      console.log('User successfully authenticated:', credential.user.uid);
      try {
      } catch (updateError) {
        console.warn('Could not update user data but login successful:', updateError);
      }
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error('Sign in error:', error);
    }
  }

  async signInWithGoogleAccount(): Promise<void> {
    const googleAuthProvider = new GoogleAuthProvider();
    googleAuthProvider.addScope('email');
    googleAuthProvider.addScope('profile');
    try {
      const result = await this.afAuth.signInWithPopup(googleAuthProvider);
      try {
        if (result.user) {
          console.log(`View user data ${result.user}`)
          this.router.navigate(['/']);
        }
      } catch (loginError) {
        console.log(loginError);
      }
    } catch (error) {
      console.log(`An error occured with google auth ${error}`);
      return Promise.reject(error);
    }
  }

  /**
   * Sign out
   */
  async signOut(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/signin']);
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  /**
   * Reset password
   */
  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(
      map(user => !!user)
    );
  }

  /**
   * Get current user (one-time fetch)
   */
  getCurrentUser(): Observable<User | null> {
    return this.user$.pipe(take(1));
  }

}
