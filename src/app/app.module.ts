import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignoutComponent } from './components/signout/signout.component';
import { variables } from './enviroments/environments';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

// NgRx imports
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Import your reducers and effects
import { authReducer } from './store/auth/auth.reducer';
import { watchlistReducer } from './store/watchlist/watchlist.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { WatchlistEffects } from './store/watchlist/watchlist.effects';
import { AUTH_FEATURE_KEY } from './store/auth/auth.state';

@NgModule({
  declarations: [
    AppComponent,
    MovieSearchComponent,
    SearchResultsComponent,
    WatchlistComponent,
    FavoritesComponent,
    MovieCardComponent,
    HomepageComponent,
    FooterComponent,
    SignupComponent,
    SigninComponent,
    SignoutComponent,
    NavigationComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

    //Root Store
    StoreModule.forRoot({}),

    //Feature Store
    StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer),
    //add more feature keys  

    //Root Effect
    EffectsModule.forRoot([]),

    //Feature Effects
    EffectsModule.forFeature([
      AuthEffects
      //your effects
    ]),

    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode()
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }