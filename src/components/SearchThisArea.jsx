import { useEffect, useState } from "react";
import { usePosition } from "../Contexts/PositionProvider";
import { getDistanceFromLatLonInKm, getNewPoints } from "../scripts/osmUtilities";
import "../styles/searchThisAreaButton.css";

export default function SearchThisArea() {
  const { userLocation, mapPosition, setAreaPOIs, areaPOIs } = usePosition();
  const [buttonIsDisplayed, setButtonIsDisplayed] = useState(false);

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


//TODO : get bounds and launch a search. 

  const handleSearch = ()=>{
    getNewPoints(mapPosition.center,mapPosition.bounds,setAreaPOIs)
    console.log(areaPOIs)
  }

  return (
    <button
      id="search-this-area-button"
      className={buttonIsDisplayed ? "" : "hidden"}
      onClick={handleSearch}
    >
      search this area
    </button>
  );
}
