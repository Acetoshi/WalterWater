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

    // this prevents a teleport to NULL island
    if (targetPoint.lat !== 0) {
      map.setZoom(17);
      const bounds = map.getBounds();
      const OLDlatOffset = (mapPosition.bounds.maxLat - mapPosition.bounds.minLat) / 4;
      const latOffset = (bounds.getNorthEast().lat - bounds.getSouthEast().lat) / 4;
      console.log('new:', latOffset, 'old:',OLDlatOffset);
      map.flyTo({ lat: targetPoint.lat + latOffset, lng: targetPoint.lng }, 17, { duration: 1 });
    }
  }, [targetPoint]);
}
