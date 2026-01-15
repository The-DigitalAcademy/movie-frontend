import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WatchlistService } from '../../services/watchlist.service';
import * as WatchlistActions from './watchlist.actions';
import { catchError, from, map, mergeMap, of } from 'rxjs';

@Injectable()
export class WatchlistEffects {
  constructor(
    private actions$: Actions,
    private watchlistService: WatchlistService
  ) {}

  // Load watchlist effect
  loadWatchlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WatchlistActions.loadWatchlist),
      mergeMap(() =>
        this.watchlistService.getWatchlist().pipe(
          map(movies => WatchlistActions.loadWatchlistSuccess({ movies })),
          catchError(error => of(WatchlistActions.loadWatchlistFailure({ error })))
        )
      )
    )
  );

  // Add movie effect
  addToWatchlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WatchlistActions.addToWatchlist),
      map(action => {
        this.watchlistService.addToWatchlist(action.movie);
        return WatchlistActions.addToWatchlistSuccess({ movie: action.movie });
      }),
      catchError(error => of(WatchlistActions.addToWatchlistFailure({ error })))
    )
  );

  // Remove movie effect
  removeFromWatchlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WatchlistActions.removeFromWatchlist),
      map(action => {
        this.watchlistService.removeFromWatchlist(action.movieId);
        return WatchlistActions.removeFromWatchlistSuccess({ movieId: action.movieId });
      }),
      catchError(error => of(WatchlistActions.removeFromWatchlistFailure({ error })))
    )
  );
}
