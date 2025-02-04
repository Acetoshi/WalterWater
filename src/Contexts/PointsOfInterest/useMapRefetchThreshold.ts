import { useEffect, useState } from 'react';
import { getDistanceKm } from '../../utilities/distances.utils';
import { LatLng } from '../contexts.types';

// this hook is basically like a use debounce but for distance,
// it will call a refetch function ONLY IF the center of the map has moved more than the threshold in km

// TODO : memorize bounds of last fetch.
// when the map moves, check if the new bounds are out of the fetched area ( or the new center)
// if so, refetch and update last fetch bounds

export default function useMapRefetchThreshold(mapCenter: LatLng, threshold: number, refetch: () => void) {
  const [lastFetchedPosition, setLastFetchedpostion] = useState<LatLng>(mapCenter);

  useEffect(() => {
    const distance = getDistanceKm(mapCenter.lat, mapCenter.lng, lastFetchedPosition.lat, lastFetchedPosition.lng);

    if (distance > threshold) {
      setLastFetchedpostion(mapCenter);
      refetch();
    }
  }, [mapCenter, lastFetchedPosition, threshold]);
}
