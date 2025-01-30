import { useEffect } from "react";
import { useMap } from "react-leaflet";
import usePosition from "./usePosition";
import { getDistanceKm } from "../PointsOfInterest/distances.utils";

// This component enables the app to track the center of the map, ie to know where the user is looking.
export default function useMapTracker() {
  const map = useMap();
  const { userLocation, setMapPosition } = usePosition();

  useEffect(() => {
    // This is needed to let the user move the map as he/she wishes wthout the open pop-ups anchoring the view
    const handleDragStart = () => {
      map.closePopup();
    };
    map.on("dragstart", handleDragStart);

    const handleMoveEnd = () => {
      // Track the current map bounds in order to use them as a bounding box for POI search later on
      const bounds = map.getBounds();
      const center = map.getCenter();
      const distance = getDistanceKm(
        userLocation.lat,
        userLocation.lng,
        center.lat,
        center.lng
      );
      setMapPosition(() => {
        return {
          bounds: {
            minLat: bounds._southWest.lat,
            maxLat: bounds._northEast.lat,
            minLng: bounds._southWest.lng,
            maxLng: bounds._northEast.lng,
          },
          center: {
            lat: center.lat,
            lng: center.lng,
          },
          distanceFromUser: distance,
        };
      });
    };

    map.on("moveend", handleMoveEnd);

    return () => {
      map.off("dragstart", handleDragStart);
      map.off("moveend", handleMoveEnd);
    };
  }, [userLocation]);
}
