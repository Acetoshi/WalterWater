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
  type: "node";
  id: number;
  lat: number;
  lon: number;
  distanceKm: string;
  walkTime: string;
  tags: {
    amenity: "drinking_water" | "toilets" | "restaurant";
    [key: string]: any; // POIs can have any type of tags
  };
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

// Represents the map position state
export interface MapPosition {
  bounds: MapBounds;
  center: LatLng;
  distanceFromUser: number;
}

export interface PointsOfInterestContextValue {
  userFilters: UserFilters;
  setUserFilters: (value: UserFilters) => void;
  POIs: Point[];
  fetchPOIs: (center?: string) => Promise<void>;
  targetPOIPosition: { lat: number; lng: number };
  setTargetPOIPosition: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number }>
  >;
  requestStatus: string;
}

export interface PositionContextValue {
  userLocation: LatLng;
  setUserLocation: (value: LatLng) => void;
  mapPosition: MapPosition;
  setMapPosition: (value: MapPosition) => void;
}
