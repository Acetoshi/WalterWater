import { Marker, Popup, useMap } from "react-leaflet";
import { usePosition } from "../Contexts/PositionProvider";
import { faucetIcon, toiletIcon, foodIcon } from "../scripts/icons";
import wheechairIcon from "../assets/icons/wheelchair.svg";
import moneyIcon from "../assets/icons/money.svg";
import footstepsIcon from "../assets/icons/footsteps.svg";
import timeIcon from "../assets/icons/time.svg";
import "../styles/leafletPopup.css";
import POIDetails from "./POIDetails";

export default function Markers({ typeOfAmenity }) {
  const { nearbyPOIs, areaPOIs } = usePosition();
  const map=useMap()

  let points = [];
  let icon = {};

  const POIs = nearbyPOIs.concat(areaPOIs);

  if (typeOfAmenity === "water") {
    points = POIs.filter((point) => point.tags.amenity === "drinking_water");
    icon = faucetIcon;
  } else if (typeOfAmenity === "toilets") {
    points = POIs.filter((point) => point.tags.amenity === "toilets");
    icon = toiletIcon;
  } else if (typeOfAmenity === "food") {
    points = POIs.filter((point) => point.tags.amenity === "restaurant");
    icon = foodIcon;
  }
  //TODO : use this reference : https://wiki.openstreetmap.org/wiki/Key:wikimedia_commons to find a way to obtain images from wikimedia.
  return (
    <ul>
      {points &&
        points.map((point) => (
          <Marker
            key={point.id}
            position={[point.lat, point.lon]}
            icon={icon}
            autoPanOnFocus={false}
            eventHandlers={{
              click: (e) => {
                map.flyTo([point.lat, point.lon],map.getZoom(),{easeLinearity:0.001, duration:0.8});
              },
            }}
          >
            {/* // TODO : faire un composant à partir du popup pour mettre les
            données des toilettes en forme. */}
            <Popup>
              <POIDetails point={point}/>
            </Popup>
          </Marker>
        ))}
    </ul>
  );
}
