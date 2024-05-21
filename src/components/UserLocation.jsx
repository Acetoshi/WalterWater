import { useEffect } from "react";
import { Popup, Marker, useMap } from "react-leaflet";
import { usePosition } from "../Contexts/PositionProvider";
import { walterIcon } from "../scripts/icons";

export default function UserLocation() {
  const { userLocation, setUserLocation } = usePosition();

  useEffect(getUserLocation, []);

  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]),
        () => console.log("Unable to retrieve your location")
      );
    } else {
      console.log("Geolocation not supported");
    }
  }

  const map = useMap();

  useEffect(() => {
    map.setView(userLocation, 15);
  }, [userLocation]);

  return (
    <Marker position={userLocation} icon={walterIcon}>
      <Popup>
        <p>
          Voici ta postion, utilise les filtres pour trouver de l'eau, des
          restaurants ou des toilettes proches de toi!
        </p>
      </Popup>
    </Marker>
  );
}
