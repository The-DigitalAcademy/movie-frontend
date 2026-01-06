import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // BehaviorSubject to track current search results
  private searchResultsSubject = new BehaviorSubject<Movie[]>([]);
  private currentQuerySubject = new BehaviorSubject<string>('');

  // Public observables for components to subscribe to
  searchResults$ = this.searchResultsSubject.asObservable();
  currentQuery$ = this.currentQuerySubject.asObservable();

  // Update search results
  updateSearchResults(results: Movie[]): void {
    this.searchResultsSubject.next(results);
  }

  // Update current search query
  updateCurrentQuery(query: string): void {
    this.currentQuerySubject.next(query);
  }

  // Clear search results
  clearSearch(): void {
    this.searchResultsSubject.next([]);
    this.currentQuerySubject.next('');
  }
}
