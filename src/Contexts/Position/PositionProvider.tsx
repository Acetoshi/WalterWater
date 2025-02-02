'use client';
import { createContext } from 'react';
import { ContextProps, LatLng, PositionContextValue } from '../contexts.types';
import useLocalStorage from '../../utilities/useLocalStorage';

const defaultUserPosition = { lat: 48.86, lng: 2.33 };
const defaultBounds = {
  minLat: 48.85,
  minLng: 2.32,
  maxLat: 48.87,
  maxLng: 2.34,
};

const defaultContextValue: PositionContextValue = {
  askUserLocation: () => new Promise<boolean>((resolve) => resolve),
  userLocation: defaultUserPosition,
  setUserLocation: () => {},
  mapPosition: {
    bounds: defaultBounds,
    center: defaultUserPosition,
    zoomLevel: 14,
    distanceFromUser: 0,
  },
  setMapPosition: () => {},
};

const PositionContext = createContext<PositionContextValue>(defaultContextValue);

export default function PositionProvider({ children }: ContextProps) {
  const [userLocation, setUserLocation] = useLocalStorage<LatLng>('ww_user_lat_lng', defaultUserPosition);

  const [mapPosition, setMapPosition] = useLocalStorage('ww_map_position', {
    bounds: defaultBounds,
    center: defaultUserPosition,
    zoomLevel: 14,
    distanceFromUser: 0,
  });

  const askUserLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        return true;
      } catch {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <PositionContext.Provider
      value={{
        askUserLocation,
        userLocation,
        setUserLocation,
        mapPosition,
        setMapPosition,
      }}
    >
      {children}
    </PositionContext.Provider>
  );
}

export { PositionContext };
