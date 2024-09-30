import { useMap } from "react-leaflet";
import { usePosition } from "../Contexts/PositionProvider";

export default function MapTracker() {
  const map = useMap();
  const { userLocation } = usePosition();

  map.on("moveend", () => {
    console.log(map.getCenter());
    console.log(userLocation)
    console.log(map.getBounds())
    if (userLocation){
        const distance = map.distance(map.getCenter(), userLocation);
        console.log(distance)
    }

  });


  return <button id="search-this-area-button"> search this area </button>;
}
