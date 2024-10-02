import { useEffect, useState } from "react";
import { usePosition } from "../Contexts/PositionProvider";
import {
  getDistanceFromLatLonInKm,
  getNewPoints,
} from "../scripts/osmUtilities";
import "../styles/searchThisAreaButton.css";

export default function SearchThisArea() {
  const { userLocation, mapPosition, setAreaPOIs, areaPOIs } = usePosition();
  const [buttonIsDisplayed, setButtonIsDisplayed] = useState(false);
  const [requestStatus, setRequestStatus] = useState("ready to fetch");

  const distance = getDistanceFromLatLonInKm(
    userLocation.lat,
    userLocation.lng,
    mapPosition.center.lat,
    mapPosition.center.lng
  );

  useEffect(() => {
    if (Number(distance) >= 5) {
      setButtonIsDisplayed(true);
    } else {
      setButtonIsDisplayed(false);
    }
  }, [userLocation, mapPosition]);

  useEffect(() => {
    if (requestStatus == "data received") {
      setTimeout(() => setRequestStatus("ready to fetch"), 1000);
    }
  }, [requestStatus]);

  const handleSearch = () => {
    getNewPoints(
      userLocation,
      mapPosition.bounds,
      setAreaPOIs,
      setRequestStatus
    );
  };

  return (
    <button
      id="search-this-area-button"
      className={`${buttonIsDisplayed ? "" : "hidden"} 
      ${requestStatus !== "ready to fetch" ? "disabled" : ""
      }`}
      onClick={handleSearch}
      disabled={requestStatus !== "ready to fetch"}
    >
       {(requestStatus==="ready to fetch")&&"search this area"}
       {(requestStatus==="fetching data")&&"fetching data"}
       {(requestStatus==="data received")&&" data received"}
    </button>
  );
}
