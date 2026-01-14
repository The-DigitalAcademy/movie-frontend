import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Movie } from 'src/app/models/movie.model';
import { SignInRes } from 'src/app/models/user.model';
import { MovieService } from 'src/app/services/movie.service';
import { selectUser } from 'src/app/store/auth/auth.selectors';
import { AuthState } from 'src/app/store/auth/auth.state';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  standalone: false
})
export class FavoritesComponent implements OnInit {
  favorites: Movie[] = [];
  isUserSession: SignInRes | null = null;

  constructor(
    private movieService: MovieService, 
    private store: Store<AuthState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.favorites = this.movieService.getFavorites();

    this.store.select(selectUser).subscribe(
      userRes => this.isUserSession = userRes
    )

    if(this.isUserSession == null) {
      this.router.navigate(["/signin"])
    }
  }

  removeFromFavorites(movieId: string) {
    this.movieService.removeFavorite(movieId);
  }
}
