import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

// Feature selector
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Select the user object
export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

// Select token
export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);

// Is the user authenticated?
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => !!state.user
);

// Loading state
export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

// Error state
export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);
