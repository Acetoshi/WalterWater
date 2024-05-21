import { createContext, useContext, useState, useEffect } from "react";
import {
  getAllPoints,
  getDistanceFromLatLonInKm,
} from "../scripts/osmUtilities";

const PositionContext = createContext();

export default function PositionProvider({ children }) {
  const [userLocation, setUserLocation] = useState([48.866, 2.33333]);
  const [nearbyPOIs, setNearbyPOIs] = useState([]); // POIs stands for Points of Interest

  useEffect(() => {
    getAllPoints(userLocation, 0.1, setNearbyPOIs);
    console.log(nearbyPOIs)
  }, [userLocation]);

  return (
    <PositionContext.Provider
      value={{
        userLocation,
        setUserLocation,
        nearbyPOIs,
      }}
    >
      {children}
    </PositionContext.Provider>
  );
}

export function usePosition() {
  return useContext(PositionContext);
}
