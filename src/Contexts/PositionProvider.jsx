import { createContext, useContext, useState } from "react";

const PositionContext = createContext();

export default function PositionProvider({ children }) {
  
  const defaultUserPosition = { lat: 48.866, lng: 2.33333 };
  const storedUserPosition = {
    lat: Number(localStorage.getItem("userLat")),
    lng: Number(localStorage.getItem("userLon")),
  };

  const [userLocation, setUserLocation] = useState(
    localStorage.getItem("userLat") === null
      ? defaultUserPosition
      : storedUserPosition
  );

  const [mapPosition, setMapPosition] = useState(
    localStorage.getItem("userLat") === null
      ? { bounds: null, center: defaultUserPosition, distanceFromUser: 0 }
      : { bounds: null, center: storedUserPosition, distanceFromUser: 0 }
  );

  // used for the recenter feature
  const [recenterIsNeeded, setrecenterIsNeeded] = useState("true");

  return (
    <PositionContext.Provider
      value={{
        userLocation,
        setUserLocation,
        mapPosition,
        setMapPosition,
        recenterIsNeeded,
        setrecenterIsNeeded,
      }}
    >
      {children}
    </PositionContext.Provider>
  );
}

export function usePosition() {
  return useContext(PositionContext);
}
