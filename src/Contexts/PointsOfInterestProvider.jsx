import { createContext, useContext, useState, useEffect } from "react";
import { getAllPoints } from "../scripts/osmUtilities";
import { usePosition } from "./PositionProvider";

const PointsOfInterest = createContext();

export default function PointsOfInterestProvider({ children }) {
  const { userLocation } = usePosition();

  const storedFilters = localStorage.getItem("userFilters");

  const [userFilters, setUserFilters] = useState(
    storedFilters
      ? {
          water: storedFilters[0] === "1",
          food: storedFilters[1] === "1",
          toilets: storedFilters[2] === "1",
        }
      : {
          water: true,
          food: false,
          toilets: true,
        }
  );

  // store userFilters in localStorage
  useEffect(() => {
    localStorage.setItem(
      "userFilters",
      `${userFilters.water ? 1 : 0}${userFilters.food ? 1 : 0}${
        userFilters.toilets ? 1 : 0
      }`.toString()
    );
  }, [userFilters]);

  const [nearbyPOIs, setNearbyPOIs] = useState([]);
  const [areaPOIs, setAreaPOIs] = useState([]);
  const [POIs, setPOIs] = useState([]);

  // used for the listview to pass the target POI position
  const [targetPOIPosition, setTargetPOIPosition] = useState({
    lat: 0,
    lng: 0,
  });

  // this useEffect fetches POIs data on OSM server
  useEffect(() => {
    getAllPoints(userLocation, 0.1, setNearbyPOIs);
    localStorage.setItem("userLat", userLocation.lat.toString());
    localStorage.setItem("userLon", userLocation.lng.toString());
  }, [userLocation]);

  useEffect(() => {
    const newPOIs = [...nearbyPOIs, ...areaPOIs].filter(
      (point) =>
        (point.tags.amenity === "drinking_water" && userFilters.water) ||
        (point.tags.amenity === "toilets" && userFilters.toilets) ||
        (point.tags.amenity === "restaurant" && userFilters.food)
    );
    setPOIs(() => newPOIs);
  }, [nearbyPOIs, areaPOIs, userFilters]);

  return (
    <PointsOfInterest.Provider
      value={{
        userFilters,
        setUserFilters,
        nearbyPOIs,
        areaPOIs,
        POIs,
        setAreaPOIs,
        targetPOIPosition,
        setTargetPOIPosition,
      }}
    >
      {children}
    </PointsOfInterest.Provider>
  );
}

export function usePOIs() {
  return useContext(PointsOfInterest);
}
