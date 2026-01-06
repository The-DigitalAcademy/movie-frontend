import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { WatchlistService } from '../../services/watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
  standalone: false
})
export class WatchlistComponent implements OnInit, OnDestroy {
  watchlist: Movie[] = [];
  private watchlistSubscription: Subscription = new Subscription();
  isLoading: boolean = false; // Optional: for loading state

  constructor(private watchlistService: WatchlistService) {}

  // Subscribe to watchlist changes on component initialization
  ngOnInit(): void {
    this.isLoading = true;
    this.watchlistSubscription = this.watchlistService.getWatchlist().subscribe(
      movies => {
        this.watchlist = movies;
        this.isLoading = false;
      },
      error => {
        console.error('Error loading watchlist:', error);
        this.isLoading = false;
      }
    );
  }

  // Remove movie from watchlist
  removeFromWatchlist(movieId: string): void {
    this.watchlistService.removeFromWatchlist(movieId);
  }

  // Clear entire watchlist
  clearWatchlist(): void {
    if (confirm('Are you sure you want to clear your entire watchlist?')) {
      this.watchlistService.clearWatchlist();
    }
  }

  // Check if watchlist is empty
  get isEmpty(): boolean {
    return this.watchlist.length === 0;
  }

  // Get watchlist count
  get watchlistCount(): number {
    return this.watchlist.length;
  }

  // Unsubscribe from watchlist changes on component destruction
  ngOnDestroy(): void {
    if (this.watchlistSubscription) {
      this.watchlistSubscription.unsubscribe();
    }
  }
}
