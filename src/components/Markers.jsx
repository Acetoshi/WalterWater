import { Marker, Popup } from "react-leaflet";
import { usePosition } from "../Contexts/PositionProvider";
import { faucetIcon, toiletIcon, foodIcon } from "../scripts/icons";


export default function Markers({ typeOfAmenity}) {
  const { nearbyPOIs } =
    usePosition();

  let points = [];
  let icon = {};

  if (typeOfAmenity === "water") {
    points = nearbyPOIs.filter(point=>point.tags.amenity==="drinking_water");
    icon = faucetIcon;
  } else if (typeOfAmenity === "toilets") {
    points = nearbyPOIs.filter(point=>point.tags.amenity==="toilets");
    icon = toiletIcon;
  } else if (typeOfAmenity === "food") {
    points = nearbyPOIs.filter(point=>point.tags.amenity==="restaurant");
    icon = foodIcon;
  }

  return (
    <ul>
      {points &&
        points.map((point) => (
          <Marker key={point.id} position={[point.lat, point.lon]} icon={icon}>
            {/* // TODO : faire un composant à partir du popup pour mettre les
            données des toilettes en forme. */}
            <Popup>
              {typeOfAmenity === "water"
                ? "Eau potable"
                : `${JSON.stringify(point.tags)}`}
                
            </Popup>
          </Marker>
        ))}
    </ul>
  );
}
