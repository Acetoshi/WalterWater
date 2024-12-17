import { memo } from "react";
import { Marker, Popup } from "react-leaflet";
import { faucetIcon, toiletIcon, foodIcon } from "../utils/markerIcons.util";
// import POIDetails from "./POIDetails";
import CustomMarkerProps from "./CustomMarker.props";
import "./CustomMarker.css";

function CustomMarkerComponent({ point, onMarkerClick }: CustomMarkerProps) {
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
        {/* <POIDetails point={point} /> */}
      </Popup>
    </Marker>
  );
}

const CustomMarker = memo(CustomMarkerComponent);

export default CustomMarker;