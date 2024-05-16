import { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import { usePosition } from "../Contexts/PositionProvider";
import { faucetIcon, toiletIcon } from "../scripts/icons";
import { getPoints } from "../scripts/osmUtilities";

export default function Markers({typeOfAmenity,radius}) {
  const { userLocation } = usePosition();
  const [points, setPoints] = useState([]);

  let queryDetails=''
  let icon={}
  let popupcontent=''

if (typeOfAmenity==="water"){
  queryDetails='["amenity"="drinking_water"]';
  icon=faucetIcon;
} else if (typeOfAmenity==="toilets"){
  console.log("toilet query")
  queryDetails='["amenity"="toilets"]';
  icon=toiletIcon;
  popupcontent
} 

  useEffect(() => { getPoints(userLocation,radius,setPoints,queryDetails)}, [userLocation]);

  console.log(points);

  return (
    <ul>
      {points &&
        points.map((point) => (
          <Marker position={[point.lat, point.lon]} icon={icon}>
            <Popup>Eau potable</Popup>
          </Marker>
        ))}
    </ul>
  );
}
