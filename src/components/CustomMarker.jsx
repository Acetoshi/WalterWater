import { memo } from "react";
import { Marker, Popup } from "react-leaflet";
import { faucetIcon, toiletIcon, foodIcon } from "../scripts/icons";
import POIDetails from "./map_UI/POIDetails/POIDetails";
import "../styles/leafletPopup.css";

function CustomMarkerComponent({ point, onMarkerClick }) {
  const iconMap = {
    drinking_water: faucetIcon,
    toilets: toiletIcon,
    restaurant: foodIcon,
  };

  return (
    <Marker
      key={point.id}
      position={[point.lat, point.lon]}
      icon={iconMap[point.tags.amenity]}
      autoPanOnFocus={false}
      eventHandlers={{
        click: () => onMarkerClick(point),
      }}
    >
      <Popup keepInView={false} autoPan={false} className={`${point.id}`}>
        <POIDetails point={point} />
      </Popup>
    </Marker>
  );
}

const CustomMarker = memo(CustomMarkerComponent);

export default CustomMarker;
