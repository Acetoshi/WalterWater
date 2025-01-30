import { useEffect, useState } from "react";
import { getDistanceKm } from "./distances.utils";
import { LatLng } from "@/types/contexts";

// this hook is basically like a use debounce but for distance, it will call a refetch function ONLY IF the center of the map has moved more than the threshold in km

export default function useMapRefetchThreshold(mapCenter: LatLng, threshold: number, refetch:()=>void) {
  const [lastFetchedPosition, setLastFetchedpostion] = useState<LatLng>(mapCenter)

  useEffect(() => {
    const distance = Number(getDistanceKm(mapCenter.lat,mapCenter.lng, lastFetchedPosition.lat,lastFetchedPosition.lng));

    if (distance > threshold) {
      setLastFetchedpostion(mapCenter);
      refetch();
      console.log('should refetch')
    } 
  }, [mapCenter, lastFetchedPosition]);

}