import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';
import { User } from 'src/app/models/user.model';

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: any;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null
};

export const authReducer = createReducer(
  initialAuthState,

  // When sign in or sign up starts
  on(AuthActions.signIn, AuthActions.signUp, state => ({
    ...state,
    loading: true,
    error: null
  })),

  // When sign in succeeds
  on(AuthActions.signInSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null
  })),

  // When sign up succeeds
  on(AuthActions.signUpSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    loading: false,
    error: null
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
    token: null,
    loading: false,
    error: null
  })),

  // Initialize auth from localStorage
  on(AuthActions.initAuthSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null
  }))
);