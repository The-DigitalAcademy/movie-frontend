import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { BiskopAuthenticationService } from '../../services/biskop-authentication.service';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  // Sign In effect
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      mergeMap(({ credentials }) =>
        this.authService.signIn(credentials).pipe(
          map((res: any) => {
            console.log('Sign in success:', res);
            // Create user object from response (username, email, password)
            const user = { 
              email: res.email || credentials.email, 
              username: res.username 
            };
            return AuthActions.signInSuccess({ user });
          }),
          catchError(err => {
            console.error('Sign in error:', err);
            return of(AuthActions.signInFailure({ error: err }));
          })
        )
      )
    )
  );

  // Sign Up effect
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      mergeMap(({ email, password, username }) =>
        this.authService.signUp({ email, password, username }).pipe(
          map((res: any) => {
            console.log('Sign up success:', res);
            // Create a user object from the response
            const user = { email, username };
            return AuthActions.signUpSuccess({ user, token: 'temp_token' });
          }),
          catchError(err => {
            console.error('Sign up error:', err);
            return of(AuthActions.signUpFailure({ error: err }));
          })
        )
      )
    )
  );

  // Sign out effect - clear localStorage
  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOut),
      tap(() => {
        this.authService.signOut();
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: BiskopAuthenticationService
  ) {}
}