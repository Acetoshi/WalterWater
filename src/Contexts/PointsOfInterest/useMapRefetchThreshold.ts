import { useEffect, useState } from 'react';
import { getDistanceKm } from '../../utilities/distances.utils';
import { LatLng } from '../contexts.types';

// this hook is basically like a use debounce but for distance,
// it will call a refetch function ONLY IF the center of the map has moved more than the threshold in km

export default function useMapRefetchThreshold(
  mapCenter: LatLng,
  threshold: number,
  refetch: () => void,
) {
  const [lastFetchedPosition, setLastFetchedpostion] =
    useState<LatLng>(mapCenter);

  useEffect(() => {
    const distance = getDistanceKm(
      mapCenter.lat,
      mapCenter.lng,
      lastFetchedPosition.lat,
      lastFetchedPosition.lng,
    );

    if (distance > threshold) {
      setLastFetchedpostion(mapCenter);
      refetch();
    }
  }, [mapCenter, lastFetchedPosition, threshold]);
}
