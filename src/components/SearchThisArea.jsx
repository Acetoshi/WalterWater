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

  console.log(distance);

  useEffect(() => {
    if (Number(distance) >= 5) {
      setButtonIsDisplayed(true);
      console.log("button is visible");
    } else {
      setButtonIsDisplayed(false);
    }
  }, [userLocation, mapCenter]);

  //TODO : get the info : are we far enough form the user's position to display the button ?

  return buttonIsDisplayed ? (
    <button id="search-this-area-button"> search this area </button>
  ) : null;
}
