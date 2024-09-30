import { createContext, useContext, useState, useEffect } from "react";
import { getAllPoints } from "../scripts/osmUtilities";

const PositionContext = createContext();

export default function PositionProvider({ children }) {
  const [userLocation, setUserLocation] = useState(
    localStorage.getItem("userLat") === null
      ? { lat: 48.866, lng: 2.33333 }
      : {
          lat: Number(localStorage.getItem("userLat")),
          lng: Number(localStorage.getItem("userLon")),
        }
  );
  const [mapCenter, setMapCenter] = useState(
    localStorage.getItem("userLat") === null
      ? { lat: 48.866, lng: 2.33333 }
      : {
          lat: Number(localStorage.getItem("userLat")),
          lng: Number(localStorage.getItem("userLon")),
        }
  );

  const [nearbyPOIs, setNearbyPOIs] = useState([]); // POIs stands for Points of Interest

  useEffect(() => {
    getAllPoints(userLocation, 0.1, setNearbyPOIs);
    localStorage.setItem("userLat", userLocation.lat.toString());
    localStorage.setItem("userLon", userLocation.lng.toString());
  }, [userLocation]);

  return (
    <PositionContext.Provider
      value={{
        userLocation,
        setUserLocation,
        nearbyPOIs,
        mapCenter,
        setMapCenter,
      }}
    >
      {children}
    </PositionContext.Provider>
  );
}

export function usePosition() {
  return useContext(PositionContext);
}
