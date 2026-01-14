import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth/auth.actions';
import { BiskopAuthenticationService } from './services/biskop-authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'movie-app';

  constructor(
    private store: Store,
    private authService: BiskopAuthenticationService
  ) {}

  ngOnInit() {
    // Check for stored auth data on app initialization
    const token = this.authService.getToken();
    const user = this.authService.getStoredUser();
    
    if (token && user) {
      console.log('Rehydrating auth state from localStorage');
      // Rehydrate the store with stored user data
      this.store.dispatch(AuthActions.initAuthSuccess({ user }));
    }
  }
}