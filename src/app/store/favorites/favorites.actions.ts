import { createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/models/movie.model';

export const addToFavorites = createAction(
  '[Favorites] Add To Favorites',
  props<{ movie: Movie }>()
);

export const removeFromFavorites = createAction(
  '[Favorites] Remove From Favorites',
  props<{ movieId: string }>()
);
