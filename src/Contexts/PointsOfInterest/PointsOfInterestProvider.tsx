import { createContext, useState, useRef, useEffect } from 'react';
import {
  ContextProps,
  LatLng,
 
  Point,
  PointsOfInterestContextValue,
  RequestStatus,
  TargetPoint,
  UserFilters,
} from '../contexts.types';
import useLocalStorage from '@/utilities/useLocalStorage';
import usePosition from '../Position/usePosition';
import { getPoints } from './fetchPOIs.utils';
import { useDebounce } from '@/utilities/useDebounce';
import useContinuousRefetch from './useContinuousRefetch';



const defaultTargetPoint = { lat: 0, lng: 0, id: 0 };

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
  targetPoint: defaultTargetPoint,
  setTargetPoint: () => {},
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

  const [requestStatus, setRequestStatus] = useState<RequestStatus>('idle');

  const [POIs, setPOIs] = useState<Point[]>([]);

  // used for the listview to pass the target POI position
  const [targetPoint, setTargetPoint] = useState<Point>(defaultTargetPoint);

  // used to keep track of the request state without trigering re-renders, and prevent calling the API multiple times
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
  // TODO : what happens if the user is walking, does the system refetch every 500ms ???
  const debouncedUserLocation = useDebounce(userLocation, 500);
  useEffect(() => {
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
        targetPoint,
        setTargetPoint,
        requestStatus,
      }}
    >
      {children}
    </PointsOfInterestContext.Provider>
  );
}

export { PointsOfInterestContext };
