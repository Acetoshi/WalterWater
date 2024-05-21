import { createContext, useContext, useState, useEffect } from "react";
import { getAllPoints } from "../scripts/osmUtilities";

const PositionContext = createContext();

export default function PositionProvider({ children }) {
  const [userLocation, setUserLocation] = useState(
    localStorage.getItem("userLocation") === null
      ? [48.866, 2.33333]
      : localStorage.getItem("userLocation").split(',')
  );
  const [nearbyPOIs, setNearbyPOIs] = useState([]); // POIs stands for Points of Interest

  useEffect(() => {
    getAllPoints(userLocation, 0.1, setNearbyPOIs);
    localStorage.setItem("userLocation", userLocation.toString());
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
