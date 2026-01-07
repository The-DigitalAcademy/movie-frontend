import { Movie } from 'src/app/models/movie.model';

export interface FavoritesState {
  favorites: Movie[];
}

export const initialFavoritesState: FavoritesState = {
  favorites: []
};
