import { useMap } from "react-leaflet";
import { usePosition } from "../Contexts/PositionProvider";

// This component enables the app to track the center of the map, ie to know where the user is looking.
export default function MapTracker() {
  const map = useMap();
  const { userLocation, setMapCenter } = usePosition();

  map.on("moveend", () => {
    // console.log(map.getCenter());
    // console.log(userLocation)
    // console.log(map.getBounds())
    // if (userLocation){
    //     const distance = map.distance(map.getCenter(), userLocation);
    //     console.log(distance)
    // }
    setMapCenter(map.getCenter());

  });


  return <button id="search-this-area-button"> search this area </button>;
}
