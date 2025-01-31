export interface SearchResult {
  display_name: string;
  lat: number;
  lon: number;
  place_id: string;
}

export interface SearchResults {
  entries: SearchResult[];
  displayed: boolean;
}

export interface SelectedResult {
    lat: number;
    lng: number;
    address: string;
  }
