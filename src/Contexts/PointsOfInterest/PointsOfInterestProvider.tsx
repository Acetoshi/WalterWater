'use client';
import { createContext, useState, useEffect, useRef } from 'react';
import {
  ContextProps,
  LatLng,
  MapBounds,
  Point,
  PointsOfInterestContextValue,
  UserFilters,
} from '../contexts.types';
import useLocalStorage from '../../utilities/useLocalStorage';
import usePosition from '../Position/usePosition';
import { getPoints } from './fetchPOIs.utils';
import useMapRefetchThreshold from './useMapRefetchThreshold';
import { useDebounce } from '@/utilities/useDebounce';
import { getDistanceKm } from '@/utilities/distances.utils';
import useEffectSkipFirstRender from '@/utilities/useEffectSkipFirstRender';

// Default context value for PointsOfInterestContext
const defaultPointsOfInterestContextValue: PointsOfInterestContextValue = {
  userFilters: {
    water: true,
    food: false,
    toilets: true,
  },
  setUserFilters: () => {},
  POIs: [],
  fetchPOIs: async () => {},
  targetPOIPosition: { lat: 0, lng: 0 },
  setTargetPOIPosition: () => {},
  requestStatus: 'idle',
};

const PointsOfInterestContext = createContext<PointsOfInterestContextValue>(
  defaultPointsOfInterestContextValue,
);

export default function PointsOfInterestProvider({ children }: ContextProps) {
  const { userLocation, mapPosition } = usePosition();

  const [userFilters, setUserFilters] = useLocalStorage<UserFilters>(
    'userFilters',
    {
      water: true,
      food: false,
      toilets: true,
    },
  );

  const [requestStatus, setRequestStatus] = useState<string>('ready to fetch');

  const [POIs, setPOIs] = useState<Point[]>([]);

  // used for the listview to pass the target POI position
  const [targetPOIPosition, setTargetPOIPosition] = useState<LatLng>({
    lat: 0,
    lng: 0,
  });

  const fetching = useRef(false);

  const fetchPOIs = async (center?: string) => {
    if (!fetching.current) {
      fetching.current = true;
      setRequestStatus('fetching data');
      let bounds: MapBounds = mapPosition.bounds;
      if (center === 'user') {
        bounds = {
          minLat: userLocation.lat - 0.25,
          maxLat: userLocation.lat + 0.25,
          minLng: userLocation.lng - 0.25,
          maxLng: userLocation.lng + 0.25,
        };
      }
      try {
        const { success, POIs } = await getPoints(
          userLocation,
          userFilters,
          bounds,
        );

        if (success) {
          setPOIs(POIs);
          setRequestStatus('data received');
        } else {
          setRequestStatus('server error');
        }
      } catch {
        setRequestStatus('server error');
      } finally {
        fetching.current = false;
      }
    }
  };

  // the position is debounced in order not to call the server too often
  const debouncedUserLocation = useDebounce(userLocation, 500);
  useEffectSkipFirstRender(() => {
    fetchPOIs();
  }, [debouncedUserLocation]);

  //Used to fetch new data everytime the map is moved more than the threshold
  // the position is debounced in order not to call the server too often
  const debouncedMapPosition = useDebounce(mapPosition, 500);

  // this threshold will evolve based on the user's zoom level
  const [refetchThreshold, setRefetchThreshold] = useState<number>(5);
  useEffect(() => {
    // calculate new threshold
    const newThreshold =
      getDistanceKm(
        debouncedMapPosition.bounds.maxLat,
        debouncedMapPosition.bounds.maxLng,
        debouncedMapPosition.bounds.minLat,
        debouncedMapPosition.bounds.minLng,
      ) / 2.5;
    setRefetchThreshold(newThreshold);
  }, [debouncedMapPosition.zoomLevel]);

  useMapRefetchThreshold(
    debouncedMapPosition.center,
    refetchThreshold,
    fetchPOIs,
  );

  useEffect(() => {
    fetchPOIs();
  }, [userFilters]);

  return (
    <PointsOfInterestContext.Provider
      value={{
        userFilters,
        setUserFilters,
        POIs,
        fetchPOIs,
        targetPOIPosition,
        setTargetPOIPosition,
        requestStatus,
      }}
    >
      {children}
    </PointsOfInterestContext.Provider>
  );
}

export { PointsOfInterestContext };
