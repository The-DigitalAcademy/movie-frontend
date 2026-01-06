import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { SearchService } from '../../services/search.service';
import { WatchlistService } from '../../services/watchlist.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  standalone: false
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  searchResults: Movie[] = [];
  searchQuery: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private searchService: SearchService,
    private watchlistService: WatchlistService,
    private router: Router
  ) {}

  // Subscribe to search results and query on component initialization
  ngOnInit(): void {
    this.subscriptions.add(
      this.searchService.searchResults$.subscribe(results => {
        this.searchResults = results;
      })
    );

    this.subscriptions.add(
      this.searchService.currentQuery$.subscribe(query => {
        this.searchQuery = query;
      })
    );
  }

  // Check if movie is in watchlist
  isInWatchlist(movieId: string): boolean {
    return this.watchlistService.isInWatchlist(movieId);
  }

  // Toggle movie in watchlist
  toggleWatchlist(movie: Movie): void {
    if (this.isInWatchlist(movie.id)) {
      this.watchlistService.removeFromWatchlist(movie.id);
    } else {
      this.watchlistService.addToWatchlist(movie);
    }
  }

  // Navigate back to home
  goBack(): void {
    this.router.navigate(['/']);
  }

  // Clear subscriptions on component destruction to prevent memory leaks
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
