import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import usePOIs from './usePOIs';
import usePosition from '../Position/usePosition';

export default function usePOIsFocuser() {
  const { targetPoint } = usePOIs();
  const { mapPosition } = usePosition();
  const map = useMap();

  // this enables the list view to move the map to a target POI
  useEffect(() => {
    // first, calculate the view height
    const latOffset = (mapPosition.bounds.maxLat - mapPosition.bounds.minLat) / 4;

    if (targetPoint.lat !== 0) {
      // this prevents a teleport to NULL island
      map.closePopup();
      const zoom = map.getZoom();
      map.flyTo({ lat: targetPoint.lat + latOffset, lng: targetPoint.lng }, zoom, { duration: 1 });
    }
  }, [targetPoint]);
}
