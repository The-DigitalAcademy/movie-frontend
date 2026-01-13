import { AuthState } from './auth/auth.state';
import { WatchlistState } from './watchlist/watchlist.state';

export interface AppState {
  auth: AuthState;
  watchlist: WatchlistState;
}
