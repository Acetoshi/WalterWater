import { useMap } from "react-leaflet";
import { usePosition } from "../Contexts/PositionProvider";

export default function SearchThisArea() {
  const map = useMap();
  const { userLocation } = usePosition();

  map.on("moveend", () => {
    console.log(map.getCenter());
    console.log(userLocation)
    if (userLocation){
        const distance = map.distance(map.getCenter(), userLocation);
        console.log(distance)
    }

  });


  return <button> search this area </button>;
}
