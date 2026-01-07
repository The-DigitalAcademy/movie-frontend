import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { BiskopAuthenticationService } from '../../services/biskop-authentication.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';

@Injectable()
export class AuthEffects {
  // Sign In effect
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      mergeMap(({ email, password }) =>
        from(this.authService.signIn(email, password)).pipe( // Wrap with from()
          map((res: any) => {
            console.log(res)
              return AuthActions.signInSuccess({ token: res })
            }
          ),
          catchError(err => of(AuthActions.signInFailure({ error: err })))
        )
      )
    )
  );

  // Sign Up effect
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      mergeMap(({ email, password, firstname }) =>
        from(this.authService.signUp(email, password, firstname)).pipe( // Wrap with from()
          map((res: any) =>
            AuthActions.signUpSuccess({ user: res.user, token: res.token })
          ),
          catchError(err => of(AuthActions.signUpFailure({ error: err })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: BiskopAuthenticationService
  ) {}
}
