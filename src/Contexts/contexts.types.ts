import { Dispatch, ReactNode, SetStateAction } from 'react';

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
  type: 'node';
  id: number;
  lat: number;
  lon: number;
  distance: string;
  walkTime: string;
  tags: {
    amenity: 'drinking_water' | 'toilets' | 'restaurant';
    [key: string]: string; // POIs can have any type of tags
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
  zoomLevel: number;
  distanceFromUser: number;
}

export interface PointsOfInterestContextValue {
  userFilters: UserFilters;
  setUserFilters: Dispatch<SetStateAction<UserFilters>>;
  POIs: Point[];
  fetchPOIs: (center?: string) => Promise<void>;
  targetPOIPosition: { lat: number; lng: number };
  setTargetPOIPosition: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
  requestStatus: 'idle' | 'loading' | 'success' | 'error';
}

export interface PositionContextValue {
  askUserLocation: () => Promise<boolean>;
  userLocation: LatLng;
  setUserLocation: Dispatch<SetStateAction<LatLng>>;
  mapPosition: MapPosition;
  setMapPosition: Dispatch<SetStateAction<MapPosition>>;
}
