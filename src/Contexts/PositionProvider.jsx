import { createContext, useContext, useState, useEffect } from "react";
import { getAllPoints } from "../scripts/osmUtilities";

const PositionContext = createContext();

export default function PositionProvider({ children }) {
  const [userLocation, setUserLocation] = useState([48.866, 2.33333]);
  const [nearbyFood, setNearbyFood] = useState([]);
  const [nearbyWater, setNearbyWater] = useState([]);
  const [nearbyToilets, setNearbyToilets] = useState([]);
  const [nearbyPOIs, setNearbyPOIs] = useState([]);

  useEffect(() => {
    getAllPoints(userLocation, 0.1, setNearbyPOIs);
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
