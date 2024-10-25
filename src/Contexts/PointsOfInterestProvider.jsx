import { createContext, useContext, useState, useEffect } from "react";

const PointsOfInterest = createContext();

export default function PointsOfInterestProvider({ children }) {

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

  const [areaPOIs, setAreaPOIs] = useState([]);
  const [POIs, setPOIs] = useState([]);

  // used for the listview to pass the target POI position
  const [targetPOIPosition, setTargetPOIPosition] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    const newPOIs = areaPOIs.filter(
      (point) =>
        (point.tags.amenity === "drinking_water" && userFilters.water) ||
        (point.tags.amenity === "toilets" && userFilters.toilets) ||
        (point.tags.amenity === "restaurant" && userFilters.food)
    );
    setPOIs(() => newPOIs);
  }, [areaPOIs, userFilters]);

  return (
    <PointsOfInterest.Provider
      value={{
        userFilters,
        setUserFilters,
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
