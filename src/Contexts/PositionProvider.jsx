import { createContext, useContext, useState, useEffect } from "react";
import { getPoints } from "../scripts/osmUtilities";

const PositionContext = createContext();

export default function PositionProvider({ children }) {
  const [userLocation, setUserLocation] = useState([48.866, 2.33333]);
  const [nearbyFood, setNearbyFood] = useState([]);
  const [nearbyWater, setNearbyWater] = useState([]);
  const [nearbyToilets, setNearbyToilets] = useState([]);

  useEffect(() => {
    getPoints(userLocation, 0.1, setNearbyFood, '["amenity"="restaurant"]');
    getPoints(
      userLocation,
      0.1,
      setNearbyWater,
      '["amenity"="drinking_water"]'
    );
    getPoints(userLocation, 0.1, setNearbyToilets, '["amenity"="toilets"]');
  }, [userLocation]);

  return (
    <PositionContext.Provider
      value={{
        userLocation,
        setUserLocation,
        nearbyToilets,
        nearbyFood,
        nearbyWater,
      }}
    >
      {children}
    </PositionContext.Provider>
  );
}

export function usePosition() {
  return useContext(PositionContext);
}
