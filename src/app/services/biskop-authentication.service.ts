import { EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { variables } from '../enviroments/environments';

@Injectable({
  providedIn: 'root'
})
export class BiskopAuthenticationService {
  apiUrl: string = variables.BASE_URL;
  // key used to store fake token
  private TOKEN_KEY = 'auth_token';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}
  
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
  signUp(body: any): Observable<any> {
    // save fake token after successful signup
    this.saveFakeToken();
    return this.http.post<any>(this.apiUrl, body)
  }

  /**
   * Sign in with email and password
   */
  // async signIn(email: string, password: string): Promise<string> {
  //   let credential = null;

  //   try {
  //   } catch (updateError) {
  //     console.warn('Could not update user data but login successful:', updateError);
  //   }
  // }

  /**
   * Sign out user
   */
  async signOut(): Promise<void> {
    try {
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
   * Check if user is logged in
   */
  // isLoggedIn(): Observable<boolean> {
  //   return true;
  // }

  /**
   * Get current user (one-time)
   */
  // getCurrentUser(): Observable<User | null> {
  //   return this.user$.pipe(take(1));
  // }

}
