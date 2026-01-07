import { createReducer, on } from '@ngrx/store';
import { initialWatchlistState } from './watchlist.state';
import * as WatchlistActions from './watchlist.actions';

export const watchlistReducer = createReducer(
  initialWatchlistState,

  // Loading watchlist
  on(WatchlistActions.loadWatchlist, state => ({
    ...state,
    loading: true
  })),
  on(WatchlistActions.loadWatchlistSuccess, (state, { movies }) => ({
    ...state,
    movies,
    loading: false
  })),
  on(WatchlistActions.loadWatchlistFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Adding a movie
  on(WatchlistActions.addToWatchlist, state => ({
    ...state,
    loading: true
  })),
  on(WatchlistActions.addToWatchlistSuccess, (state, { movie }) => ({
    ...state,
    movies: [...state.movies, movie],
    loading: false
  })),
  on(WatchlistActions.addToWatchlistFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Removing a movie
  on(WatchlistActions.removeFromWatchlist, state => ({
    ...state,
    loading: true
  })),
  on(WatchlistActions.removeFromWatchlistSuccess, (state, { movieId }) => ({
    ...state,
    movies: state.movies.filter(movie => movie.id !== movieId),
    loading: false
  })),
  on(WatchlistActions.removeFromWatchlistFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
