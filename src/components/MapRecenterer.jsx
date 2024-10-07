import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { usePosition } from "../Contexts/PositionProvider";
import { usePOIs } from "../Contexts/PointsOfInterestProvider";

export default function MapRecenterer() {
  const { userLocation, recenterIsNeeded } = usePosition();
  const { targetPOIPosition } = usePOIs();
  const map = useMap();

  //This enables us to re-center the map on the user when the Recenter Button is clicked
  //See component RecenterButton
  useEffect(() => {
    // needed otherwise the open popups would 'refocus" the map
    map.closePopup();
    map.flyTo(userLocation, 15, { duration: 1 });
  }, [recenterIsNeeded]);

  // this enables the list view to move the map to a target POI
  useEffect(() => {
    if (targetPOIPosition.lat !== 0) {
      // this prevents a teleport to NULL island
      //map.closePopup();
      map.flyTo(targetPOIPosition, 18, { duration: 1 });
    }
  }, [targetPOIPosition]);

  return null;
}
