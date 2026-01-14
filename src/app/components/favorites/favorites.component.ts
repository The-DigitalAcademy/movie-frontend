import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  standalone: false
})

export class FavoritesComponent implements OnInit {
  favorites: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.favorites = this.movieService.getFavorites();
  }

  removeFromFavorites(movieId: string) {
    this.movieService.removeFavorite(movieId);
  }
}
