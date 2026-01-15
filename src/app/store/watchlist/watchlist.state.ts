import { Movie } from '../../models/movie.model';

export interface WatchlistState {
  movies: Movie[];
  loading: boolean;
  error: any;
}

export const initialWatchlistState: WatchlistState = {
  movies: [],
  loading: false,
  error: null
};
