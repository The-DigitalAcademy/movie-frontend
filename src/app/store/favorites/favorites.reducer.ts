import { createReducer, on } from '@ngrx/store';
import { initialFavoritesState, FavoritesState } from './favorites.state';
import * as FavoritesActions from './favorites.actions';

export const favoritesReducer = createReducer(
  initialFavoritesState,

  on(FavoritesActions.addToFavorites, (state, { movie }) => ({
    ...state,
    favorites: [...state.favorites, movie]
  })),

  on(FavoritesActions.removeFromFavorites, (state, { movieId }) => ({
    ...state,
    favorites: state.favorites.filter(m => m.id !== movieId)
  }))
);
