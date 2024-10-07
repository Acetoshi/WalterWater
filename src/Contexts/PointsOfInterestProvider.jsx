import { createContext, useContext, useState, useEffect } from "react";
import { getAllPoints } from "../scripts/osmUtilities";
import { usePosition } from "./PositionProvider";

const PointsOfInterest = createContext();

export default function PointsOfInterestProvider({ children }) {
  const { userLocation } = usePosition();

  const [userFilters, setUserFilters] = useState({
    water: true,
    toilets: true,
    food: false,
  });
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

  console.log(areaPOIs);

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
