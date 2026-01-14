import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BiskopAuthenticationService } from '../services/biskop-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: BiskopAuthenticationService,
    private router: Router
  ) {}

  /**
   * This method runs before route is opened
   */
  canActivate(): boolean {

    // check if user is logged in
    if (this.authService.isLoggedIn()) {
      return true; // allow access
    }


    // if NOT logged in
    console.warn('Access denied. Redirecting to signup.');

    // redirect to signup page
    this.router.navigate(['/signup']);

    return false; // block access
  }
}
