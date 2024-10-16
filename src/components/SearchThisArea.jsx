import { useEffect, useState, useRef } from "react";
import { usePosition } from "../Contexts/PositionProvider";
import { usePOIs } from "../Contexts/PointsOfInterestProvider";
import { getNewPoints } from "../scripts/osmUtilities";
import "../styles/searchThisAreaButton.css";
import { useMap } from "react-leaflet";

// Needed for the user to be able to research POIs somewhere else without loading all the world's POIs in memory
export default function SearchThisArea() {
  const map = useMap();
  const { userLocation, mapPosition } = usePosition();
  const { setAreaPOIs, userFilters } = usePOIs();
  const [requestStatus, setRequestStatus] = useState("ready to fetch");
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;

    const handlePopupOpen = () => {
      button.classList.add("hidden");
    };

    const handlePopupClose = () => {
      button.classList.remove("hidden");
    };

    map.on("popupopen", handlePopupOpen);
    map.on("popupclose", handlePopupClose);

    return () => {
      map.off("popupopen", handlePopupOpen);
      map.off("popupclose", handlePopupClose);
    };
  }, [map]);

  useEffect(() => {
    if (requestStatus === "data received") {
      setTimeout(() => setRequestStatus("ready to fetch"), 1000);
    }
  }, [requestStatus]);

  const handleSearch = () => {
    getNewPoints(
      userLocation,
      userFilters,
      mapPosition.bounds,
      setAreaPOIs,
      setRequestStatus
    );
  };

  return (
    <div id="search-this-area-button-container">
      <button
        id="search-this-area-button"
        ref={buttonRef}
        className={`button-feedback ${requestStatus !== "ready to fetch" ? "disabled" : ""}`}
        onClick={handleSearch}
        disabled={requestStatus !== "ready to fetch"}
      >
        {requestStatus === "ready to fetch" && <p>search this area</p>}
        {requestStatus === "fetching data" && (
          <p>
            <span className="loader"></span> fetching data
          </p>
        )}
        {requestStatus === "data received" && <p>data received</p>}
        {requestStatus === "server error" && (
          <p>server error, try again later</p>
        )}
      </button>
    </div>
  );
}
