import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import usePosition from './usePosition';
import { getDistanceKm } from '@/utilities/distances.utils';

// This hook enables the app to track the center of the map, ie to know where the user is looking.
export default function useMapTracker() {
  const map = useMap();
  const { userLocation, setMapPosition } = usePosition();

  useEffect(() => {
    const handleMoveEnd = () => {
      // Track the current map bounds in order to use them as a bounding box for POI search later on
      const bounds = map.getBounds();
      const center = map.getCenter();
      const distance = getDistanceKm(userLocation.lat, userLocation.lng, center.lat, center.lng);
      setMapPosition({
        bounds: {
          minLat: bounds.getSouthEast().lat,
          maxLat: bounds.getNorthWest().lat,
          minLng: bounds.getSouthWest().lng,
          maxLng: bounds.getNorthEast().lng,
        },
        center: {
          lat: center.lat,
          lng: center.lng,
        },
        zoomLevel: map.getZoom(),
        distanceFromUser: distance,
      });
    };

    map.on('moveend', handleMoveEnd);

    return () => {
      map.off('moveend', handleMoveEnd);
    };
  }, [userLocation]);
}
