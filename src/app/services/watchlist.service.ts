import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  // BehaviorSubject to track watchlist
  private watchlistSubject = new BehaviorSubject<Movie[]>([]);

  // Public observable for components to subscribe to
  watchlist$ = this.watchlistSubject.asObservable();

  constructor() {
    // Load watchlist from localStorage if available
    this.loadWatchlistFromStorage();
  }

  // Get watchlist as observable
  getWatchlist(): Observable<Movie[]> {
    return this.watchlist$;
  }

  // Get current watchlist value
  getCurrentWatchlist(): Movie[] {
    return this.watchlistSubject.value;
  }

  // Add movie to watchlist
  addToWatchlist(movie: Movie): void {
    const currentWatchlist = this.watchlistSubject.value;

    // Check if movie is already in watchlist
    if (!currentWatchlist.find(m => m.id === movie.id)) {
      const updatedWatchlist = [...currentWatchlist, movie];
      this.watchlistSubject.next(updatedWatchlist);
      this.saveWatchlistToStorage(updatedWatchlist);
    }
  }

  // Remove movie from watchlist
  removeFromWatchlist(movieId: string): void {
    const currentWatchlist = this.watchlistSubject.value;
    const updatedWatchlist = currentWatchlist.filter(movie => movie.id !== movieId);
    this.watchlistSubject.next(updatedWatchlist);
    this.saveWatchlistToStorage(updatedWatchlist);
  }

  // Check if movie is in watchlist
  isInWatchlist(movieId: string): boolean {
    return this.watchlistSubject.value.some(movie => movie.id === movieId);
  }

  // Clear entire watchlist
  clearWatchlist(): void {
    this.watchlistSubject.next([]);
    this.saveWatchlistToStorage([]);
  }

  // Save watchlist to localStorage
  private saveWatchlistToStorage(watchlist: Movie[]): void {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }

  // Load watchlist from localStorage
  private loadWatchlistFromStorage(): void {
    const stored = localStorage.getItem('watchlist');
    if (stored) {
      try {
        const watchlist = JSON.parse(stored);
        this.watchlistSubject.next(watchlist);
      } catch (error) {
        console.error('Error loading watchlist from storage:', error);
      }
    }
  }
}
