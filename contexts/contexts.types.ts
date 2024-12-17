import { ReactNode } from "react";

export interface ContextProps {
  children: ReactNode;
}

// used in the app
export interface LatLng {
  lat: number;
  lng: number;
}

// used when retrieving data from overpass
export interface Point {
  lat: number;
  lon: number;
  distanceKm: string;
  walkTime: string;
}

export interface UserFilters {
  water: boolean;
  food: boolean;
  toilets: boolean;
}

export interface MapBounds {
  minLat: number;
  minLng: number;
  maxLat: number;
  maxLng: number;
}
