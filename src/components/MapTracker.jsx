import { useMap } from "react-leaflet";
import { usePosition } from "../Contexts/PositionProvider";
import { getDistanceFromLatLonInKm } from "../scripts/osmUtilities";

// This component enables the app to track the center of the map, ie to know where the user is looking.
export default function MapTracker() {
  const map = useMap();
  const { userLocation, setMapPosition } = usePosition();


  // This is needed to let the user move the map as he/she wishes wthout the open pop-ups anchoring the view
  map.on("dragstart", () => {
    map.closePopup();
  });

  map.on("moveend", () => {
    // Track the current map bounds in order to use them as a bounding box for POI search later on
    const bounds = map.getBounds();
    const center = map.getCenter();
    const distance = getDistanceFromLatLonInKm(
      userLocation.lat,
      userLocation.lng,
      center.lat,
      center.lng
    );

    setMapPosition({
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
    });
  });

  return null;
}
