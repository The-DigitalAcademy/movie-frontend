import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  movie!: Movie;

  isFavorite = false;
  showReviews = false;
  showReviewForm = false;
  showLoginModal = false;
  isUserLoggedIn = false; // set true if testing login
  // newReview = { rating: 0, text: '' };
  movieDetails: Actor[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private watchlistService: WatchlistService
  ) {}

  ngOnInit(): void {
    this.loadMovie();
  }

  loadMovie(): void {
    const id = this.route.snapshot.paramMap.get('movie_id') ?? '';
    console.log(`Show path var id ${id}`);
    if (id) {
      this.loadMovieDetails(id);
      this.getMovie(id);
    } else {
      console.error('Movie not found with ID:', id);
    }
  }

  getMoviedetail(movieId : string){
  }

  loadMovieDetails(movieId: string): void {
    this.movieService.getMovieActorsByMovieId(movieId).subscribe({
      next: (resp) => {
        console.log(`Movie details loaded: ${JSON.stringify(resp)}`);
        this.movieDetails = resp;
      },
      error: (err) => {
        console.error(`Error getting movie details: ${JSON.stringify(err)}`);
      }
    });
  }

  getMovie(movieid: string){
    this.movieService.getMovieDetail(movieid).subscribe({
      next: (resp) => {
        console.log(`fetching movie ${resp}`);
        this.movie = resp;
      },
      error: (err) => {
        console.log(`DError fetching movie ${err}`);
      }
    })
  }

  /** Watch button */
  watchNow(): void {
    if (this.movie) {
      alert(`🎬 Playing ${this.movie.primaryTitle}...`);
    } else {
      alert('Movie not available');
    }
  }

  /** Toggle favorites */
  toggleFavorite(): void {
    if (!this.movie) return;
    
    if (!this.isFavorite) {
      this.movieService.addFavorite(this.movie);
    } else {
      this.movieService.removeFavorite(this.movie.id);
    }
    this.isFavorite = !this.isFavorite;
  }

    toggleWatchlist(): void {
    if (this.isInWatchlist()) {
      this.removeFromWatchlist();
    } else {
      this.addToWatchlist();
    }
  }

    addToWatchlist(): void {
    this.watchlistService.addToWatchlist(this.movie);
    // this.watchlistToggled.emit(this.movie);
  }

    removeFromWatchlist(): void {
    this.watchlistService.removeFromWatchlist(this.movie.id);
    // this.watchlistToggled.emit(this.movie);
  }

    isInWatchlist(): boolean {
    return this.watchlistService.isInWatchlist(this.movie.id);
  }

  /** Show/hide reviews */
  toggleReviews(): void {
    this.showReviews = !this.showReviews;
  }

  /** Open review form or login modal */
  openReviewForm(): void {
    if (this.isUserLoggedIn) {
      this.showReviewForm = true;
    } else {
      this.showLoginModal = true;
    }
  }

  /** Close login modal */
  closeLoginModal(): void {
    this.showLoginModal = false;
  }

  /** Submit new review (placeholder) */
  submitReview(): void {}
}