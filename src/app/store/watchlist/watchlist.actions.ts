import { createAction, props } from '@ngrx/store';
import { Movie } from '../../models/movie.model';

// Load Watchlist
export const loadWatchlist = createAction('[Watchlist] Load Watchlist');

export const loadWatchlistSuccess = createAction(
  '[Watchlist] Load Watchlist Success',
  props<{ movies: Movie[] }>()
);

export const loadWatchlistFailure = createAction(
  '[Watchlist] Load Watchlist Failure',
  props<{ error: any }>()
);

// Add movie
export const addToWatchlist = createAction(
  '[Watchlist] Add Movie',
  props<{ movie: Movie }>()
);

export const addToWatchlistSuccess = createAction(
  '[Watchlist] Add Movie Success',
  props<{ movie: Movie }>()
);

export const addToWatchlistFailure = createAction(
  '[Watchlist] Add Movie Failure',
  props<{ error: any }>()
);

// Remove movie
export const removeFromWatchlist = createAction(
  '[Watchlist] Remove Movie',
  props<{ movieId: string }>()
);

export const removeFromWatchlistSuccess = createAction(
  '[Watchlist] Remove Movie Success',
  props<{ movieId: string }>()
);

export const removeFromWatchlistFailure = createAction(
  '[Watchlist] Remove Movie Failure',
  props<{ error: any }>()
);
