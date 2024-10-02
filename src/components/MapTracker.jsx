import { useMap } from "react-leaflet";
import { usePosition } from "../Contexts/PositionProvider";

// This component enables the app to track the center of the map, ie to know where the user is looking.
export default function MapTracker() {
  const map = useMap();
  const { setMapPosition } = usePosition();

  map.on("moveend", () => {
   
    // Track the current map bounds in order to use them as a bounding box for POI search later on
    const bounds = map.getBounds();
    const center = map.getCenter();

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
    });
  });

  return null;
}
