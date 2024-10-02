import { useEffect, useState } from "react";
import { usePosition } from "../Contexts/PositionProvider";
import "../styles/searchThisAreaButton.css";
import { getDistanceFromLatLonInKm, getNewPoints } from "../scripts/osmUtilities";

export default function SearchThisArea() {
  const { userLocation, mapCenter, mapBounds,setAreaPOIs, areaPOIs } = usePosition();
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


//TODO : get bounds and launch a search. 

  const handleSearch = ()=>{
    getNewPoints(mapCenter,mapBounds,setAreaPOIs)
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
