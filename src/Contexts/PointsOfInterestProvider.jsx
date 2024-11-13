import { createContext, useState, useEffect } from "react";
import { usePosition } from "../hooks/usePosition";
import { getPoints } from "../scripts/osmUtilities";

const PointsOfInterestContext = createContext();

export default function PointsOfInterestProvider({ children }) {
  const { userLocation, mapPosition } = usePosition();

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

  const fetchPOIs = async (center) => {
    setRequestStatus("fetching data");
    let bounds = {};
    if (center === "user") {
      bounds = {
        minLat: userLocation.lat - 0.25,
        maxLat: userLocation.lat + 0.25,
        minLng: userLocation.lng - 0.25,
        maxLng: userLocation.lng + 0.25,
      };
    } else {
      bounds = mapPosition.bounds;
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

  useEffect(() => {
    fetchPOIs("user");
  }, [userLocation]);

  // Used to fetch new data everytime the map is moved
  useEffect(() => {
    fetchPOIs();
  }, [mapPosition, userFilters]);

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
