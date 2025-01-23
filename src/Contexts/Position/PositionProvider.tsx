"use client";
import { createContext, useState, useEffect, ContextType } from "react";
import { ContextProps, LatLng, PositionContextValue } from "../contexts.types";
import useLocalStorage from "../../utilities/useLocalStorage";

const defaultUserPosition = { lat: 48.86, lng: 2.33 };
const defaultBounds = {
  minLat: 48.85,
  minLng: 2.32,
  maxLat: 48.87,
  maxLng: 2.34,
};

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
  const [userLocation, setUserLocation] = useLocalStorage<LatLng>(
    "userLatLng",
    defaultUserPosition
  );

  const [mapPosition, setMapPosition] = useLocalStorage("mapPosition", {
    bounds: defaultBounds,
    center: defaultUserPosition,
    distanceFromUser: 0,
  });

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
