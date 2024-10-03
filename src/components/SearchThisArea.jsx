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
      ${requestStatus !== "ready to fetch" ? "disabled" : ""}`}
      onClick={handleSearch}
      disabled={requestStatus !== "ready to fetch"}
    >
      {requestStatus === "ready to fetch" && <p>search this area</p>}
      {requestStatus === "fetching data" && (
        <p>
          <span class="loader"></span> fetching data
        </p>
      )}
      {requestStatus === "data received" && <p>data received</p>}
      {requestStatus === "server error" && <p>server error, try again later</p>}
    </button>
  );
}
