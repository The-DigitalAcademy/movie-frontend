import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,

  // When sign in or sign up starts
  on(AuthActions.signIn, AuthActions.signUp, state => ({
    ...state,
    loading: true,
    error: null
  })),

  // When sign in or sign up succeeds
  on(AuthActions.signInSuccess, AuthActions.signUpSuccess, (state, { token }) => ({
    ...state,
    token,
    loading: false
  })),

  // When sign in or sign up fails
  on(AuthActions.signInFailure, AuthActions.signUpFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Sign out
  on(AuthActions.signOut, state => ({
    ...state,
    user: null,
    token: null
  }))
);
