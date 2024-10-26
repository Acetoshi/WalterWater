import { useEffect, useRef } from "react";
import { usePOIs } from "../hooks/usePOIs";
import "../styles/searchThisAreaButton.css";
import { useMap } from "react-leaflet";

// Needed for the user to be able to research POIs somewhere else without loading all the world's POIs in memory
export default function SearchThisArea() {
  const {fetchPOIs, requestStatus} = usePOIs();
  const map = useMap();
  const buttonRef = useRef(null);

  //this is needed to keep the button away from the UI when a popup is opened
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


  return (
    <div id="search-this-area-button-container">
      <button
        id="search-this-area-button"
        ref={buttonRef}
        className={`button-feedback ${
          requestStatus !== "ready to fetch" ? "disabled" : ""
        }`}
        onClick={fetchPOIs}
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
