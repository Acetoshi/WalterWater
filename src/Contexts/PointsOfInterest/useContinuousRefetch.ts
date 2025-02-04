import { useEffect, useRef } from 'react';
import { MapBounds, MapPosition } from '../contexts.types';
import { useDebounce } from '@/utilities/useDebounce';

// this hook is basically like a use debounce but for distance,
// it will call a refetch function ONLY IF the user is viewing a new area
// basically there are two rectangles : what the user sees, mapPosition.bounds and what was already fetched : lastFetchedBounds
// the second follows the first.
export default function useContinuousRefetch(mapPosition: MapPosition, refetch: () => void) {
  const debouncedMapPosition =useDebounce(mapPosition,1200); // this big delay enables the user to pan across the map easily without being blocked by refetches
  const lastFetchedBounds = useRef<MapBounds>(mapPosition.bounds);

  useEffect(() => {
    const outOfBounds = () => {
      // how far does the user have to look in order to trigger a refecth ?
      // the smaller the number, the more sensible will the refetch be
      const thresholdFactor = 1 / 2;

      const latThreshold = (mapPosition.bounds.maxLat - mapPosition.bounds.minLat) * thresholdFactor;
      const lngThreshold = (mapPosition.bounds.maxLng - mapPosition.bounds.minLng) * thresholdFactor;

      // check if the user has panned out of the bounds of last fetch + a threshold
      if (
        mapPosition.bounds.maxLat > lastFetchedBounds.current.maxLat + latThreshold ||
        mapPosition.bounds.minLat < lastFetchedBounds.current.minLat - latThreshold ||
        mapPosition.bounds.maxLng > lastFetchedBounds.current.maxLng + lngThreshold ||
        mapPosition.bounds.minLng < lastFetchedBounds.current.minLng - lngThreshold
      ) {
        return true;
        // check if the user has zoomed out
      } else if (
        mapPosition.bounds.maxLat > lastFetchedBounds.current.maxLat &&
        mapPosition.bounds.minLat < lastFetchedBounds.current.minLat
      ) {
        return true;
      } else {
        return false;
      }
    };

    if (outOfBounds()) {
      //TODO this will need to be refactored as it's a copy-paste from fetchPOIs
      const preFetchFactor = 1 / 3;
      const latOffset = (mapPosition.bounds.maxLat - mapPosition.bounds.minLat) * preFetchFactor;
      const lngOffset = (mapPosition.bounds.maxLng - mapPosition.bounds.minLng) * preFetchFactor;
      const newFetchedBounds = {
        minLat: mapPosition.bounds.minLat - latOffset,
        minLng: mapPosition.bounds.minLng - lngOffset,
        maxLat: mapPosition.bounds.maxLat + latOffset,
        maxLng: mapPosition.bounds.maxLng + lngOffset,
      };
      lastFetchedBounds.current = newFetchedBounds;
      refetch();
      console.log('refetching')
    }
  }, [debouncedMapPosition]);
}
