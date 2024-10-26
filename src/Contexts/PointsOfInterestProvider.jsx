import { createContext, useContext, useState, useEffect } from "react";
import { usePosition } from "../hooks/usePosition";
import { getPoints } from "../scripts/osmUtilities";

const PointsOfInterest = createContext();

export default function PointsOfInterestProvider({ children }) {
  const { userLocation, mapPosition, recenterIsNeeded } = usePosition();

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

  const [requestStatus, setRequestStatus] = useState("ready to fetch");

  const [areaPOIs, setAreaPOIs] = useState([]);
  const [POIs, setPOIs] = useState([]);

  // used for the listview to pass the target POI position
  const [targetPOIPosition, setTargetPOIPosition] = useState({
    lat: 0,
    lng: 0,
  });

  // store userFilters in localStorage
  useEffect(() => {
    localStorage.setItem(
      "userFilters",
      `${userFilters.water ? 1 : 0}${userFilters.food ? 1 : 0}${
        userFilters.toilets ? 1 : 0
      }`.toString()
    );
  }, [userFilters]);

  useEffect(() => {
    const newPOIs = areaPOIs.filter(
      (point) =>
        (point.tags.amenity === "drinking_water" && userFilters.water) ||
        (point.tags.amenity === "toilets" && userFilters.toilets) ||
        (point.tags.amenity === "restaurant" && userFilters.food)
    );
    setPOIs(() => newPOIs);
  }, [areaPOIs, userFilters]);

  const fetchPOIs = () => {
    getPoints(
      userLocation,
      userFilters,
      mapPosition.bounds,
      setAreaPOIs,
      setRequestStatus
    );
  };

  useEffect(() => {
    // TODO : handle the case where map Position.bounds isn't defined
    const bounds = {
      minLat: userLocation.lat - 0.25,
      maxLat: userLocation.lat + 0.25,
      minLng: userLocation.lng - 0.25,
      maxLng: userLocation.lng + 0.25,
    };
    getPoints(userLocation, userFilters, bounds, setAreaPOIs, setRequestStatus);
  }, [userLocation, recenterIsNeeded]);

  useEffect(() => {
    if (requestStatus === "data received") {
      setTimeout(() => setRequestStatus("ready to fetch"), 1000);
    }
  }, [requestStatus]);

  return (
    <PointsOfInterest.Provider
      value={{
        userFilters,
        setUserFilters,
        areaPOIs,
        POIs,
        fetchPOIs,
        targetPOIPosition,
        setTargetPOIPosition,
        requestStatus,
      }}
    >
      {children}
    </PointsOfInterest.Provider>
  );
}

export function usePOIs() {
  return useContext(PointsOfInterest);
}
