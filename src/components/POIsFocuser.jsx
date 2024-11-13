import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { usePOIs } from "../hooks/usePOIs";

export default function POIsFocuser() {
  const { targetPOIPosition } = usePOIs();
  const map = useMap();

  // this enables the list view to move the map to a target POI
  useEffect(() => {
    if (targetPOIPosition.lat !== 0) {
      // this prevents a teleport to NULL island
      map.closePopup();
      map.flyTo(targetPOIPosition, 18, { duration: 1 });
    }
  }, [targetPOIPosition]);

  return null;
}
