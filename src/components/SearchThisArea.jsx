import { useEffect, useState } from "react";
import { usePosition } from "../Contexts/PositionProvider";
import "../styles/searchThisAreaButton.css";
import { getDistanceFromLatLonInKm } from "../scripts/osmUtilities";

export default function SearchThisArea() {
  const { userLocation, mapCenter } = usePosition();
  const [buttonIsDisplayed, setButtonIsDisplayed] = useState(false);

  const distance = getDistanceFromLatLonInKm(
    userLocation.lat,
    userLocation.lng,
    mapCenter.lat,
    mapCenter.lng
  );

  useEffect(() => {
    if (Number(distance) >= 5) {
      setButtonIsDisplayed(true);
    } else {
      setButtonIsDisplayed(false);
    }
  }, [userLocation, mapCenter]);

  return (
    <button
      id="search-this-area-button"
      className={buttonIsDisplayed ? "" : "hidden"}
    >
      search this area
    </button>
  );
}
