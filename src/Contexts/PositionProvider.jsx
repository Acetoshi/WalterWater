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

  const [mapPosition, setMapPosition] = useState(
    localStorage.getItem("userLat") === null
      ? { bounds: null, center: { lat: 48.866, lng: 2.33333 } }
      : {
          bounds: null,
          center: {
            lat: Number(localStorage.getItem("userLat")),
            lng: Number(localStorage.getItem("userLon")),
          },
        }
  );
  const [nearbyPOIs, setNearbyPOIs] = useState([]); // POIs stands for Points of Interest
  const [areaPOIs, setAreaPOIs] = useState([]);

  // this useEffect fetches POIs data on OSM server
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
        mapPosition,
        setMapPosition,
        areaPOIs,
        setAreaPOIs,
      }}
    >
      {children}
    </PositionContext.Provider>
  );
}

export function usePosition() {
  return useContext(PositionContext);
}
