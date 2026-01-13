import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { User } from '../models/user.model';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class BiskopAuthenticationService {

  // Observable holding authenticated user data
  user$: Observable<User | null>;

  private afAuth = inject(AngularFireAuth);

  // key used to store fake token
  private TOKEN_KEY = 'auth_token';

  constructor(private router: Router) {
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
   * Create and store a fake token
   * (Later this will come from backend)
   */
  private saveFakeToken(): void {
    const fakeToken = 'FAKE_TOKEN_' + new Date().getTime();
    localStorage.setItem(this.TOKEN_KEY, fakeToken);
  }

  /**
   * Remove token from storage
   */
  private clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
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

      // save fake token after successful signup
      this.saveFakeToken();

      this.router.navigate(['/']);
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
        throw new Error('No user returned after login');
      }

      // save fake token after successful login
      this.saveFakeToken();

      console.log('User logged in:', credential.user.uid);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Sign in error:', error);
    }
  }

  /**
   * Sign in with Google
   */
  async signInWithGoogleAccount(): Promise<void> {
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');

    try {
      const result = await this.afAuth.signInWithPopup(provider);

      if (result.user) {
        // save fake token
        this.saveFakeToken();

        console.log('Google login successful');
        this.router.navigate(['/']);
      }
    } catch (error) {
      console.error('Google auth error:', error);
      throw error;
    }
  }

  /**
   * Sign out user
   */
  async signOut(): Promise<void> {
    try {
      await this.afAuth.signOut();

      // remove token on logout
      this.clearToken();

      this.router.navigate(['/signin']);
      console.log('User logged out');
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
      await this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  /**
   * Check if user is logged in (token-based)
   * This is what Auth Guards will use
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Get current user (one-time)
   */
  getCurrentUser(): Observable<User | null> {
    return this.user$.pipe(take(1));
  }
}
