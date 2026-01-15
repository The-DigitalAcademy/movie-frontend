import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SignInReq, SignInRes, SignUpReq, SignUpRes } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { variables } from '../enviroments/environments';

@Injectable({
  providedIn: 'root'
})
export class BiskopAuthenticationService {
  apiUrl: string = `${variables.BASE_URL}/api/auth`;
  //key useed to store fake token
  private TOKEN_KEY = 'auth_token';
  private USER_KEY = 'auth_user';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  /**
   * Sign up with email and password
   */
  signUp(body: SignUpReq): Observable<SignUpRes> {
    return this.http.post<SignUpRes>(`${this.apiUrl}/signup`, body).pipe(
      tap(response => {
        // Generate a temporary token since backend doesn't provide one
        const tempToken = 'AUTH_TOKEN_' + new Date().getTime() + '_' + Math.random();
        this.saveToken(tempToken);
        
        // Save user data (create from request since response only has message)
        const user = { email: body.email, username: body.username };
        this.saveUser(user);
      })
    );
  }

  /**
   * Sign in with email and password
   */
  signIn(body: SignInReq): Observable<SignInRes> {
    return this.http.post<SignInRes>(`${this.apiUrl}/login`, body).pipe(
      tap(response => {
        // Generate a temporary token since backend doesn't provide one
        const tempToken = 'AUTH_TOKEN_' + new Date().getTime() + '_' + Math.random();
        this.saveToken(tempToken);
        
        // Save user data from response
        const user = { 
          email: response.email, 
          username: response.username 
        };
        this.saveUser(user);
      })
    );
  }

  /**
   * Sign out user
   */
  async signOut(): Promise<void> {
    try {
      this.clearToken();
      this.clearUser();
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
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Get stored token
   */
  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Get stored user
   */
  public getStoredUser(): any | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  /**
   * Save token to localStorage
   */
  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Save user to localStorage
   */
  private saveUser(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /**
   * Remove token from storage
   */
  private clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * Remove user from storage
   */
  private clearUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }
}