import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import usePOIs from './usePOIs';

export default function usePOIsFocuser() {
  const { targetPoint } = usePOIs();
  const map = useMap();

  // this enables the list view to move the map to a target POI
  useEffect(() => {
    // this prevents a teleport to NULL island
    if (targetPoint.lat !== 0) {
      map.flyTo({ lat: targetPoint.lat, lng: targetPoint.lon }, 17, { duration: 1 });
    }
  }, [targetPoint]);
}
