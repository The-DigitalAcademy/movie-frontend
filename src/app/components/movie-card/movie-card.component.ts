import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { WatchlistService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
  standalone: false
})
export class MovieCardComponent {
  // Input: Single movie to display
  @Input() movie!: Movie;
  // movies: Movie[] = [];

  // Optional: If you want to show watchlist/favorite buttons
  @Input() showWatchlistButton: boolean = true;
  @Input() showFavoriteButton: boolean = true;

  // Output events for parent component
  @Output() favoriteToggled = new EventEmitter<Movie>();
  @Output() watchlistToggled = new EventEmitter<Movie>();

  constructor(
    private movieService: MovieService,
    private watchlistService: WatchlistService
  ) {}

  // --- FAVORITES MANAGEMENT ---
  addToFavorites(): void {
    this.movieService.addFavorite(this.movie);
    this.favoriteToggled.emit(this.movie);
  }

  removeFromFavorites(): void {
    this.movieService.removeFavorite(this.movie.id);
    this.favoriteToggled.emit(this.movie);
  }

  toggleFavorite(): void {
    if (this.isFavorite()) {
      this.removeFromFavorites();
    } else {
      this.addToFavorites();
    }
  }

  // --- WATCHLIST MANAGEMENT ---
  addToWatchlist(): void {
    this.watchlistService.addToWatchlist(this.movie);
    this.watchlistToggled.emit(this.movie);
  }

  removeFromWatchlist(): void {
    this.watchlistService.removeFromWatchlist(this.movie.id);
    this.watchlistToggled.emit(this.movie);
  }

  toggleWatchlist(): void {
    if (this.isInWatchlist()) {
      this.removeFromWatchlist();
    } else {
      this.addToWatchlist();
    }
  }

  // --- STATUS CHECKS ---
  isFavorite(): boolean {
    return this.movieService.isFavorite(this.movie.id);
  }

  isInWatchlist(): boolean {
    return this.watchlistService.isInWatchlist(this.movie.id);
  }

  // --- IMAGE HANDLING ---
  getMovieImage(): string {
    return (
      this.movie.primaryImage
    ) || 'assets/images/placeholder-movie.jpg';
  }

  // --- TITLE HANDLING ---
  getMovieTitle(): string {
    return (
      this.movie.primaryTitle || 'Unknown Title'
    );
  }

  getMovieGenres(): string {
  return Array.isArray(this.movie.genres)
    ? this.movie.genres.join(', ')
    : this.movie.genres || 'Unknown';
}


  getMovieYear(): string {
  return this.movie.startYear?.toString() || 'Year';
}


  getMovieRating(): string {
  return this.movie.averageRating?.toString() || 'Rating';
}

}