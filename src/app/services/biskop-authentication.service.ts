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

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}
  
  /**
   * Sign up with email and password
   */
  signUp(body: any): Observable<any> {
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
   * Sign out
   */
  async signOut(): Promise<void> {
    try {
      this.router.navigate(['/signin']);
      console.log('User signed out successfully');
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
   * Get current user (one-time fetch)
   */
  // getCurrentUser(): Observable<User | null> {
  //   return this.user$.pipe(take(1));
  // }

}
