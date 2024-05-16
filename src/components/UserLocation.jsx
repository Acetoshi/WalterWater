import { useState, useEffect } from "react";
import { Popup, Marker, useMap } from "react-leaflet";

export default function UserLocation() {
  const [userLocation, setUserLocation] = useState([48.866,2.33333]);

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
    map.setView(userLocation,16);
  }, [userLocation]);

  return (
    <Marker position={userLocation}>
      <Popup>You are here</Popup>
    </Marker>
  );
}