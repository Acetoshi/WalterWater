import { createContext, useState, useRef } from 'react';
import { ContextProps, LatLng, Point, PointsOfInterestContextValue, UserFilters } from '../contexts.types';
import useLocalStorage from '@/utilities/useLocalStorage';
import usePosition from '../Position/usePosition';
import { getPoints } from './fetchPOIs.utils';
import { useDebounce } from '@/utilities/useDebounce';
import useEffectSkipFirstRender from '@/utilities/useEffectSkipFirstRender';
import useContinuousRefetch from './useContinuousRefetch';

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

const PointsOfInterestContext = createContext<PointsOfInterestContextValue>(defaultPointsOfInterestContextValue);

export default function PointsOfInterestProvider({ children }: ContextProps) {
  const { userLocation, mapPosition } = usePosition();

  const [userFilters, setUserFilters] = useLocalStorage<UserFilters>('ww_user_filters', {
    water: true,
    food: false,
    toilets: true,
  });

  const [requestStatus, setRequestStatus] = useState<string>('ready to fetch');

  const [POIs, setPOIs] = useState<Point[]>([]);

  // used for the listview to pass the target POI position
  const [targetPOIPosition, setTargetPOIPosition] = useState<LatLng>({
    lat: 0,
    lng: 0,
  });

  const fetching = useRef(false);

  const fetchPOIs = async () => {
    if (!fetching.current) {
      fetching.current = true;
      setRequestStatus('loading');
      try {
        const { success, POIs } = await getPoints(userLocation, userFilters, mapPosition.bounds);

        if (success) {
          setPOIs(POIs);
          setRequestStatus('success');
        } else {
          setRequestStatus('error');
        }
      } catch {
        setRequestStatus('error');
      } finally {
        fetching.current = false;
      }
    }
  };

  // the position is debounced in order not to call the server too often
  const debouncedUserLocation = useDebounce(userLocation, 500);
  useEffectSkipFirstRender(() => {
    fetchPOIs();
  }, [debouncedUserLocation, userFilters]);

  useContinuousRefetch(mapPosition, fetchPOIs);

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
