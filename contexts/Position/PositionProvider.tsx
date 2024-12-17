"use client";
import { createContext, useState, useEffect, ContextType } from "react";
import { ContextProps, LatLng, PositionContextValue } from "../contexts.types";

const defaultUserPosition = { lat: 48.86, lng: 2.33 };
const defaultBounds = { minLat: 48.85, minLng: 2.32, maxLat: 48.87, maxLng: 2.34 }

const defaultContextValue: PositionContextValue = {
  userLocation: defaultUserPosition,
  setUserLocation: () => {},
  mapPosition: {
    bounds: defaultBounds,
    center: defaultUserPosition,
    distanceFromUser: 0,
  },
  setMapPosition: () => {},
};

const PositionContext =
  createContext<PositionContextValue>(defaultContextValue);

export default function PositionProvider({ children }: ContextProps) {
  const storedUserPosition = {
    lat: Number(localStorage.getItem("userLat")),
    lng: Number(localStorage.getItem("userLon")),
  };

  const [userLocation, setUserLocation] = useState<LatLng>(
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
      ? { bounds: defaultBounds, center: defaultUserPosition, distanceFromUser: 0 }
      : { bounds: defaultBounds, center: storedUserPosition, distanceFromUser: 0 }
  );

  return (
    <PositionContext.Provider
      value={{
        userLocation,
        setUserLocation,
        mapPosition,
        setMapPosition,
      }}
    >
      {children}
    </PositionContext.Provider>
  );
}

export { PositionContext };
