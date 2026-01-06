import { NgModule } from '@angular/core';
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
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { variables } from './enviroments/environments';
import { RouterModule } from '@angular/router'
import { NavigationComponent } from './components/navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

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
    AngularFireModule.initializeApp(variables.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
