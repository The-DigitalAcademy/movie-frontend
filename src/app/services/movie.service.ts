import { inject, Injectable } from '@angular/core';
import { ApiResponse, Movie } from '../models/movie.model';
import { variables } from '../enviroments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, toArray } from 'rxjs/operators';
import { Actor } from '../models/actor.model';



@Injectable({
  providedIn: 'root',
})
export class MovieService {
  url = variables.BASE_URL;
  apiKey = variables.API_KEY;
  http = inject(HttpClient);

  // Store movies locally after fetching from API
  private moviesDataSubject = new BehaviorSubject<Movie[]>([]);
  moviesData$ = this.moviesDataSubject.asObservable();

  private favorites: Movie[] = [];

  constructor() {
    // Load initial movies when service is created
    // this.loadMovies();
  }

  // Method to get all movies from API
  getMoviesFromApi(path: string): Observable<ApiResponse> {
    const headers = new HttpHeaders({
      'x-rapidapi-key': this.apiKey,
      'x-rapidapi-host': 'imdb236.p.rapidapi.com',
    });
    const target_url = this.url + `${path}`;
    console.log(`${target_url}`);
    return this.http.get<ApiResponse>(target_url, { headers }).pipe(
      tap(() => {
        toArray();
      })
    );
  }

  // Transform API movie to app Movie format
  public transformApiMovie(movie: Movie) {
    return {
      id: movie.id,
      title: movie.primaryTitle,
      year: movie.startYear,
      imageUrl: movie.primaryImage,
      type: movie.description,
      genres: movie.genres,
      rating: movie.averageRating,
    };
  }

  // Load movies from API
  loadMovies(path: string = '/api/imdb/top250-movies') {
    this.getMoviesFromApi(path)
      .pipe(
        tap((response) => {
          this.moviesDataSubject.next(response.data ?? []);
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Movies loaded successfully:', response.data?.length);
        },
        error: (error) => {
          console.error('Error loading movies:', error);
        },
      });
  }

  // Get all movies (returns Observable)
  getMovies(): Observable<Movie[]> {
    return this.moviesData$;
  }

  // Get current movies synchronously (for immediate access)
  getCurrentMovies(): Movie[] {
    return this.moviesDataSubject.value;
  }

  // Search movies by title or year
  searchMovies(query: string): Observable<Movie[]> {
    if (!query.trim()) {
      return new Observable((observer) => {
        observer.next([]);
        observer.complete();
      });
    }

    return this.moviesData$.pipe(
      map((movies) => {
        const searchTerm = query.toLowerCase();
        return movies.filter(
          (movie) =>
            movie.primaryTitle.toLowerCase().includes(searchTerm) ||
            movie.startYear.toString().includes(searchTerm) ||
            movie.genres.includes(searchTerm)
        );
      })
    );
  }

  // Get movies by genre
  getMoviesByGenre(genre: string): Observable<Movie[]> {
    return this.moviesData$.pipe(
      map((movies) => {
        if (genre === 'all') return movies;
        return movies.filter((movie) => movie.genres.includes(genre));
      })
    );
  }

  // Get movie by ID
  getMovieById(id: string): Movie | undefined {
    return this.getCurrentMovies().find((movie) => movie.id === id);
  }

  // Add movie to favorites
  addFavorite(movie: Movie): void {
    if (!this.favorites.find((fav) => fav.id === movie.id)) {
      this.favorites.push(movie);
      console.log('Added to favorites:', movie);
    }
  }

  // Remove from favorites
  removeFavorite(movieId: string): void {
    this.favorites = this.favorites.filter((movie) => movie.id !== movieId);
  }

  // Get favorite movies
  getFavorites(): Movie[] {
    return this.favorites;
  }

  // Check if movie is in favorites
  isFavorite(movieId: string): boolean {
    return this.favorites.some((movie) => movie.id === movieId);
  }

  getMovieActorsByMovieId(movieId: string) : Observable<Actor[]> {
    const headers = new HttpHeaders({
      'x-rapidapi-key': this.apiKey,
      'x-rapidapi-host': 'imdb236.p.rapidapi.com'
    });
    const target_url = `${this.url}/api/imdb/${movieId}/cast`;
    return this.http.get<Actor[]>(target_url, {headers});
  }

  getMovieDetail(movieid: string) : Observable<Movie> {
        const headers = new HttpHeaders({
      'x-rapidapi-key': this.apiKey,
      'x-rapidapi-host': 'imdb236.p.rapidapi.com'
    });
    const target_url = `${this.url}/api/imdb/${movieid}`;
    return this.http.get<Movie>(target_url, {headers});
  }
}
