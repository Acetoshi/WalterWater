import { createContext, useState, useEffect } from "react";

const PositionContext = createContext();

export default function PositionProvider({ children }) {
  const defaultUserPosition = { lat: 48.86, lng: 2.33 };
  const storedUserPosition = {
    lat: Number(localStorage.getItem("userLat")),
    lng: Number(localStorage.getItem("userLon")),
  };

  const [userLocation, setUserLocation] = useState(
    localStorage.getItem("userLat") === null
      ? defaultUserPosition
      : storedUserPosition
  );

  // memorize last user location if different from the default one
  // needed to always show the user his/her last location on next visit
  useEffect(() => {
    if (
      userLocation.lat !== defaultUserPosition.lat &&
      userLocation.lng !== defaultUserPosition.lng
    ) {
      localStorage.setItem("userLat", userLocation.lat.toString());
      localStorage.setItem("userLon", userLocation.lng.toString());
    }
  }, [userLocation]);

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

export {PositionContext}