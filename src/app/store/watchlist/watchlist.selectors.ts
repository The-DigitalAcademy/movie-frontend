import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WatchlistState } from './watchlist.state';

// Feature selector
export const selectWatchlistState = createFeatureSelector<WatchlistState>('watchlist');

// Select all movies
export const selectWatchlistMovies = createSelector(
  selectWatchlistState,
  (state: WatchlistState) => state.movies
);

// Select loading status
export const selectWatchlistLoading = createSelector(
  selectWatchlistState,
  (state: WatchlistState) => state.loading
);

// Select error
export const selectWatchlistError = createSelector(
  selectWatchlistState,
  (state: WatchlistState) => state.error
);

// Check if watchlist is empty
export const selectIsWatchlistEmpty = createSelector(
  selectWatchlistMovies,
  (movies) => movies.length === 0
);
