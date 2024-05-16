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
    map.setView(userLocation,15);
  }, [userLocation]);

  return (
    <Marker position={userLocation} icon={walterIcon}>
      <Popup>Si tu veux voir en local les modifs qui sont dans Github, oui.</Popup>
    </Marker>
  );
}
