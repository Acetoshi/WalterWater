import { useEffect, useState } from 'react';
import { getDistanceKm } from '../../utilities/distances.utils';
import { LatLng, MapBounds, MapPosition } from '../contexts.types';


// this hook is basically like a use debounce but for distance,
// it will call a refetch function ONLY IF the center of the map has moved more than the threshold in km
export default function useContinuousRefetch(mapPosition: MapPosition, refetch: () => void) {
  const [lastFetchedBounds, setLastFetchedBounds] = useState<MapBounds>(mapPosition.bounds); // could this be a ref instead ? // could the whole mapPosition be a ref ?

  useEffect(() => {
    // how far does the user have to look in order to trigger a refecth ?
    // we dn't want the app to continously refetch if the user is staying focused on one zone in particular

    // basically there are two rectangles : what the user sees, mapPosition.bounds and what was already fetched : lastFetchedBounds
    const thresholdFactor = 1 / 2;

    if (
      mapPosition.bounds.maxLat > lastFetchedBounds.maxLat ||
      mapPosition.bounds.minLat < lastFetchedBounds.minLat ||
      mapPosition.bounds.maxLng > lastFetchedBounds.maxLng ||
      mapPosition.bounds.minLng < lastFetchedBounds.minLng
    ) {// about this condition : should the center be the trigger or the sides ? maybe the sides.
      // TODO : i need to be more gentle with the triggering ( maybe widen mapBounds ? )
      
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
      setLastFetchedBounds(newFetchedBounds);
      console.log("needs refetch")
      refetch();
    } else {
      console.log("doesn't need refetch")
    }
  }, [mapPosition]); // TODO : modify the trigger so that it's the map when it stops moving that refetches the POIs
}
