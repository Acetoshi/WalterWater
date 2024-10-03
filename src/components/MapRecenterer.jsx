import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { usePosition } from "../Contexts/PositionProvider";

export default function MapRecenterer() {
  const { userLocation, recenterIsNeeded } = usePosition();
  const map = useMap();

  //This enables us to re-center the map on the user when the Recenter Button is clicked
  //See component RecenterButton
  useEffect(() => {
    map.flyTo(userLocation, 15, {duration:1});
  }, [recenterIsNeeded]);

  return null;
}
