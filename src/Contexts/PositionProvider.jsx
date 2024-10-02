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

  const [mapBounds, setMapBounds] = useState(null);

  const [nearbyPOIs, setNearbyPOIs] = useState([]); // POIs stands for Points of Interest
  const [areaPOIs, setAreaPOIs] = useState([]);


  console.log(mapBounds)

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
        mapBounds,
        setMapBounds,
        areaPOIs,
        setAreaPOIs
      }}
    >
      {children}
    </PositionContext.Provider>
  );
}

export function usePosition() {
  return useContext(PositionContext);
}
