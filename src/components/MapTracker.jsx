import { useMap } from "react-leaflet";
import { usePosition } from "../Contexts/PositionProvider";

// This component enables the app to track the center of the map, ie to know where the user is looking.
export default function MapTracker() {
  const map = useMap();
  const { setMapCenter } = usePosition();

  map.on("moveend", () => {
    setMapCenter(map.getCenter());
  });

  return null;
}
