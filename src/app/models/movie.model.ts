
export interface SimplifiedMovie {
  id: string;
  title: string;
  year: number;
  rating?: number;
  genre?: string;
  imageUrl?: string;
  type: string;
}

export interface ApiResponse {
  status: string;
  data?: Movie[];
  page?: number;
  // Add other API response fields as needed
}


// latest pasted

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface ProductionCompany {
  id: string;
  name: string;
}

export interface Movie {
  id: string;
  url: string;
  primaryTitle: string;
  originalTitle: string;
  type: string;
  description: string;
  primaryImage: string;
  thumbnails: Thumbnail[];
  trailer: string;
  contentRating: string;
  startYear: number;
  endYear: number | null;
  releaseDate: string;
  interests: string[];
  countriesOfOrigin: string[];
  externalLinks: string[];
  spokenLanguages: string[];
  filmingLocations: string[];
  productionCompanies: ProductionCompany[];
  budget: number;
  grossWorldwide: number;
  genres: string[];
  isAdult: boolean;
  runtimeMinutes: number;
  averageRating: number;
  numVotes: number;
  metascore: number;
}

// Alternative with more specific typing for certain fields:
export interface MovieStrict {
  id: string;
  url: string;
  primaryTitle: string;
  originalTitle: string;
  type: 'movie' | 'tvSeries' | 'tvMovie' | 'video' | 'short' | 'documentary'; // More specific type
  description: string;
  primaryImage: string;
  thumbnails: Thumbnail[];
  trailer: string;
  contentRating: string;
  startYear: number;
  endYear: number | null;
  releaseDate: string;
  interests: string[];
  countriesOfOrigin: string[];
  externalLinks: string[];
  spokenLanguages: string[];
  filmingLocations: string[];
  productionCompanies: ProductionCompany[];
  budget: number;
  grossWorldwide: number;
  genres: string[];
  isAdult: boolean;
  runtimeMinutes: number;
  averageRating: number;
  numVotes: number;
  metascore: number;
}
