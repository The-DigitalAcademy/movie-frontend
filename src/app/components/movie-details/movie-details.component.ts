import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actor } from 'src/app/models/actor.model';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { WatchlistService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie?: Movie;
  actors: Actor[] = [];

  isFavorite = false;
  showReviews = false;
  showReviewForm = false;
  showLoginModal = false;
  isUserLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private watchlistService: WatchlistService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : 0; // convert string -> number

    if (id <= 0) {
      console.error('Invalid movie ID in route');
      return;
    }

    this.loadMovie(id);
    this.loadActors(id);
  }

  loadMovie(id: number): void {
    this.movieService.getMovieDetail(id).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.isFavorite = this.movieService.isFavorite(movie.id);
      },
      error: (err) => console.error('Error loading movie', err)
    });
  }

  loadActors(id: number): void {
    this.movieService.getMovieActorsByMovieId(id).subscribe({
      next: (actors) => (this.actors = actors),
      error: (err) => console.error('Error loading actors', err)
    });
  }

  // ▶ Watch
  watchNow(): void {
    if (!this.movie) return;
    alert(`🎬 Playing ${this.movie.primaryTitle}...`);
    
  // Open trailer URL in a new browser tab
  window.open(this.movie.trailer, '_blank');
  }

  // ❤️ Favorites
  toggleFavorite(): void {
    if (!this.movie) return;

    if (this.movieService.isFavorite(this.movie.id)) {
      this.movieService.removeFavorite(this.movie.id);
    } else {
      this.movieService.addFavorite(this.movie);
    }

    this.isFavorite = this.movieService.isFavorite(this.movie.id);
  }

  // 📌 Watchlist
  toggleWatchlist(): void {
    if (!this.movie) return;

    if (this.watchlistService.isInWatchlist(this.movie.id)) {
      this.watchlistService.removeFromWatchlist(this.movie.id);
    } else {
      this.watchlistService.addToWatchlist(this.movie);
    }
  }

  isInWatchlist(): boolean {
    return this.movie
      ? this.watchlistService.isInWatchlist(this.movie.id)
      : false;
  }

  // 💬 Reviews
  toggleReviews(): void {
    this.showReviews = !this.showReviews;
  }

  openReviewForm(): void {
    this.isUserLoggedIn
      ? (this.showReviewForm = true)
      : (this.showLoginModal = true);
  }

  closeLoginModal(): void {
    this.showLoginModal = false;
  }

  submitReview(): void {}
}
