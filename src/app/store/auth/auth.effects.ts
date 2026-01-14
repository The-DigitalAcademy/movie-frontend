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
      mergeMap(({ credentials }) =>
        from(this.authService.signIn(credentials)).pipe( // Wrap with from()
          map((res: any) => {
            console.log(res)
              return AuthActions.signInSuccess({ user: res })
            }
          ),
          catchError(err => of(AuthActions.signInFailure({ error: err })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: BiskopAuthenticationService
  ) {}
}
