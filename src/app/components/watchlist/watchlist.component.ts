import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { WatchlistService } from '../../services/watchlist.service';
import { SignInRes } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/store/auth/auth.state';
import { Router } from '@angular/router';
import { selectUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
  standalone: false
})
export class WatchlistComponent implements OnInit, OnDestroy {
  watchlist: Movie[] = [];
  private watchlistSubscription: Subscription = new Subscription();
  isLoading: boolean = false // Optional: for loading state
  isUserSession: SignInRes | null = null; 

  constructor(
    private watchlistService: WatchlistService,
        private store: Store<AuthState>,
        private router: Router
      ) {}

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

    this.store.select(selectUser).subscribe(
      userRes => this.isUserSession = userRes
    )

    if(this.isUserSession == null) {
      this.router.navigate(["/signin"])
    }
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
