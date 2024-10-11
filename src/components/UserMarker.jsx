import { useEffect } from "react";
import { Popup, Marker, useMap } from "react-leaflet";
import { usePosition } from "../Contexts/PositionProvider";
import { walterIcon } from "../scripts/icons";

export default function UserMarker() {
  const { userLocation} = usePosition();

  const map = useMap();

  useEffect(() => {
    map.setView(userLocation, 15);
  }, [userLocation]);


  return (
    <Marker position={userLocation} icon={walterIcon}>
      <Popup>
        <p>
          This is your position, explorer, use filters to find water or toilets around you.
          Have a great time.
        </p>
      </Popup>
    </Marker>
  );
}
