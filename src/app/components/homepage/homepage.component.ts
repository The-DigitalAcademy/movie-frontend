import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Movie } from 'src/app/models/movie.model';
import { SignInReq, SignInRes } from 'src/app/models/user.model';
import { MovieService } from 'src/app/services/movie.service';
import { signOut } from 'src/app/store/auth/auth.actions';
import { selectUser } from 'src/app/store/auth/auth.selectors';
import { AuthState } from 'src/app/store/auth/auth.state';
import * as AuthActions from "src/app/store/auth/auth.actions";

export interface HeroSlide {
  image: string;
  title: string;
  description?: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  standalone: false
})
export class HomepageComponent implements OnInit, OnDestroy {
  // --- MOVIE LIST & PAGINATION PROPERTIES ---
  fullMovieList: Movie[] = []; // Stores all movies after fetching and sorting
  displayMovies: Movie[] = []; // Stores the 20 movies for the current view (used in HTML)
  
  moviesPerPage: number = 20;
  currentPage: number = 1;

  // Slideshow properties
  heroSlides: HeroSlide[] = [
    {
      image: 'https://static0.colliderimages.com/wordpress/wp-content/uploads/2022/04/The-Shawshank-Redemption.jpg?q=49&fit=crop&w=825&dpr=2',
      title: 'The Shawshack Reddemption',
      description: 'A banker convicted of uxoricide forms a friendship over a quarter century with a hardened convict, while maintaining his innocence and trying to remain hopeful through simple compassion.'
    },
    {
      image: 'https://mshanken.imgix.net/cao/bolt/2022-03/1647463313_godfather0422.jpg',
      title: 'The Godfather',
      description: 'The aging patriarch of an organized crime dynasty transfers control of its clandestine empire to his reluctant son.'
    },
    {
      image: 'https://media.gq.com/photos/5b4dfa2c9eea1c27bfdb9e9b/1:1/w_1295,h_1295,c_limit/10-year-anniversary-the-dark-knight-gq.jpg',
      title: 'The Dark Knight',
      description: 'When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness.'
    }
  ];

  currentSlideIndex = 0;
  private slideInterval: any;

  // Sidebar properties
  isSidebarActive = false;
  isUserSession: SignInRes | null = null;

  constructor(
    private router: Router, 
    private movieService : MovieService,
    private store: Store<AuthState>
  ) {
    
  }

  ngOnInit() {
    this.startAutoSlide();
    this.fetchAndProcessMovies(); 
    this.store.select(selectUser).subscribe(
      userRes => this.isUserSession = userRes
    )
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  // --- CORE DATA HANDLING & SORTING ---

  fetchAndProcessMovies() {
    this.movieService.getMoviesFromApi("/movies").subscribe({
      next: (resp) => {
        let moviesData: Movie[] = [];
        // Safely extract the movie array from response
        if (resp && Array.isArray(resp)) {
          moviesData = resp;
        } 
        else if (resp && resp.data && Array.isArray(resp.data)) {
          moviesData = resp.data;
        } 
        else {
          console.warn('Unexpected response format or no data received:', resp);
        }

        if (moviesData.length > 0) {
          // 1. Sort the full list by latest release year (Descending)
          this.fullMovieList = this.sortMoviesByLatest(moviesData);
          // 2. Display the first page of sorted movies
          this.updateDisplayMovies();
          console.log(`Successfully loaded and sorted ${this.fullMovieList.length} movies.`);
        }
      },
      error: (err) => {
        console.error(`Error getting Movies: ${JSON.stringify(err)}`);
        this.fullMovieList = [];
        this.displayMovies = [];
      }
    });
  }

  private sortMoviesByLatest(movies: Movie[]): Movie[] {
    // Sorts the array by 'startYear' in descending order (latest year first).
    return movies.slice().sort((a, b) => {
      // Safely parse startYear, defaulting to 0 for missing/invalid years.
      const yearA = a.startYear ? parseInt(a.startYear.toString()) : 0;
      const yearB = b.startYear ? parseInt(b.startYear.toString()) : 0;

      // Descending sort by year (b - a for latest first)
      if (yearB !== yearA) {
        return yearB - yearA; 
      }
      
      // Secondary sort by title (A-Z) if years are identical
      return (a.primaryTitle || '').localeCompare(b.primaryTitle || '');
    });
  }

  // --- PAGINATION METHODS ---

  /**
   * Updates the `displayMovies` array based on the current page index.
   */
  updateDisplayMovies(): void {
    const startIndex = (this.currentPage - 1) * this.moviesPerPage;
    const endIndex = startIndex + this.moviesPerPage;
    this.displayMovies = this.fullMovieList.slice(startIndex, endIndex);
  }

  /**
   * Moves to the next page of movies and scrolls to top.
   */
  nextPage(): void {
    if (this.canGoNext()) {
      this.currentPage++;
      this.updateDisplayMovies();
      // Scrolls to the top of the movie grid area
      document.getElementById('movieGrid')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * Moves to the previous page of movies and scrolls to top.
   */
  previousPage(): void {
    if (this.canGoPrevious()) {
      this.currentPage--;
      this.updateDisplayMovies();
      // Scrolls to the top of the movie grid area
      document.getElementById('movieGrid')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * Checks if there are more pages available.
   */
  canGoNext(): boolean {
    const lastMovieIndexOnCurrentPage = this.currentPage * this.moviesPerPage;
    return lastMovieIndexOnCurrentPage < this.fullMovieList.length;
  }
  
  /**
   * Checks if the user is on page 1.
   */
  canGoPrevious(): boolean {
    return this.currentPage > 1;
  }

  /**
   * Calculates the total number of pages.
   */
  get totalPages(): number {
    if (this.fullMovieList.length === 0) return 0;
    return Math.ceil(this.fullMovieList.length / this.moviesPerPage);
  }

  // --- SLIDESHOW & SIDEBAR METHODS (Unchanged) ---
  
  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.heroSlides.length;
  }

  previousSlide() {
    this.currentSlideIndex = this.currentSlideIndex === 0 
      ? this.heroSlides.length - 1 
      : this.currentSlideIndex - 1;
  }

  goToSlide(index: number) {
    this.currentSlideIndex = index;
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  closeSidebar() {
    this.isSidebarActive = false;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.closeSidebar();
  }

  logout() {
    this.store.dispatch(
      AuthActions.signOut()
    )
    this.router.navigate(["./signin"])
  }
}