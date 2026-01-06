export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Actor {
  id: string;
  url: string;
  fullName: string;
  primaryImage: string;
  thumbnails: Thumbnail[];
  job: string;
  characters: string[];
}
