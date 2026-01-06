import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

const routes: Routes = [
  { path: "", redirectTo:"home", pathMatch:"full"},
  { path: "home", component: HomepageComponent},
  { path: 'search-results', component: SearchResultsComponent, pathMatch:"full" },
  { path: 'watchlist', component: WatchlistComponent, pathMatch:"full"},
  { path: 'movie-search', component: MovieSearchComponent, pathMatch:"full"},
  { path: 'favorites', component: FavoritesComponent, pathMatch:"full"},
  { path: 'MovieCard', component: MovieCardComponent, pathMatch:"full"},
  { path: 'movie-details/:movie_id', component: MovieDetailsComponent, pathMatch:"full" },
  { path: 'signup', component: SignupComponent},
  { path: 'signin', component: SigninComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }