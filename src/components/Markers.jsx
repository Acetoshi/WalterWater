import { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import { usePosition } from "../Contexts/PositionProvider";
import { faucetIcon, toiletIcon,foodIcon } from "../scripts/icons";
import { getPoints } from "../scripts/osmUtilities";

export default function Markers({ typeOfAmenity, radius }) {
  const { userLocation } = usePosition();
  const [points, setPoints] = useState([]);

  let queryDetails = "";
  let icon = {};

  if (typeOfAmenity === "water") {
    queryDetails = '["amenity"="drinking_water"]';
    icon = faucetIcon;
  } else if (typeOfAmenity === "toilets") {
    queryDetails = '["amenity"="toilets"]';
    icon = toiletIcon;
  } else if (typeOfAmenity === "food") {
    queryDetails = '["amenity"="restaurant"]';
    icon = foodIcon;
  } else {
    queryDetails = '["amenity"="toilets"]';
  }

  useEffect(() => {
    getPoints(userLocation, radius, setPoints, queryDetails);
  }, [userLocation]);

  console.log(points);

  return (
    <ul>
      {points &&
        points.map((point) => (
          <Marker position={[point.lat, point.lon]} icon={icon}>
            // TODO : faire un composant à partir du popup pour mettre les données des toilettes en forme.
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
