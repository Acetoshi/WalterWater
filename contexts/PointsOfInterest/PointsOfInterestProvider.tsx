"use client";
import { createContext, useState, useEffect } from "react";
import {
  ContextProps,
  LatLng,
  MapBounds,
  Point,
  PointsOfInterestContextValue,
  UserFilters,
} from "../contexts.types";
import useLocalStorage from "@/utilities/useLocalStorage";
import { usePosition } from "../Position/usePosition";
import { getPoints } from "./osmUtilities";

const PointsOfInterestContext =
  createContext<PointsOfInterestContextValue | null>(null);

export default function PointsOfInterestProvider({ children }: ContextProps) {
  const { userLocation, mapPosition } = usePosition();

  const [userFilters, setUserFilters] = useLocalStorage<UserFilters>(
    "userFilters",
    {
      water: true,
      food: false,
      toilets: true,
    }
  );

  const [requestStatus, setRequestStatus] = useState<string>("ready to fetch");

  const [areaPOIs, setAreaPOIs] = useState<Point[]>([]);
  const [POIs, setPOIs] = useState<Point[]>([]);

  // used for the listview to pass the target POI position
  const [targetPOIPosition, setTargetPOIPosition] = useState<LatLng>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    const newPOIs = areaPOIs.filter(
      (point: Point) =>
        (point.tags.amenity === "drinking_water" && userFilters.water) ||
        (point.tags.amenity === "toilets" && userFilters.toilets) ||
        (point.tags.amenity === "restaurant" && userFilters.food)
    );
    setPOIs(() => newPOIs);
  }, [areaPOIs, userFilters]);

  const fetchPOIs = async (center?: string) => {
    setRequestStatus("fetching data");
    let bounds: MapBounds = mapPosition.bounds;
    if (center === "user") {
      bounds = {
        minLat: userLocation.lat - 0.25,
        maxLat: userLocation.lat + 0.25,
        minLng: userLocation.lng - 0.25,
        maxLng: userLocation.lng + 0.25,
      };
    }
    const { success, POIs } = await getPoints(
      userLocation,
      userFilters,
      bounds
    );

    if (success) {
      setAreaPOIs(POIs);
      setRequestStatus("data received");
      //TODO : kill this timeout in the useEffect
      setTimeout(() => setRequestStatus("ready to fetch"), 1000);
    } else {
      setRequestStatus("server error");
    }
  };

  // useEffect(() => {
  //   fetchPOIs("user");
  // }, [userLocation]);

  // Used to fetch new data everytime the map is moved
  // useEffect(() => {
  //   fetchPOIs();
  // }, [mapPosition, userFilters]);

  return (
    <PointsOfInterestContext.Provider
      value={{
        userFilters,
        setUserFilters,
        POIs,
        fetchPOIs,
        targetPOIPosition,
        setTargetPOIPosition,
        requestStatus,
      }}
    >
      {children}
    </PointsOfInterestContext.Provider>
  );
}

export { PointsOfInterestContext };
