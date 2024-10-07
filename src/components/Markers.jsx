import { useCallback, memo } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { usePOIs } from "../Contexts/PointsOfInterestProvider";
import { faucetIcon, toiletIcon, foodIcon } from "../scripts/icons";
import MarkerClusterGroup from "react-leaflet-cluster";
import POIDetails from "./POIDetails";
import "../styles/leafletPopup.css";
import "../styles/leafletMarkerGroup.css";

const MarkerComponent = memo(({ point, onMarkerClick }) => {
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
});

export default function Markers() {
  const { POIs } = usePOIs();
  const map = useMap();

  // useCallBack needed because of marker clusters
  const handleMarkerClick = useCallback(
    (point) => {
      const zoom = map.getZoom();
      map.flyTo([point.lat, point.lon], zoom, {
        easeLinearity: 1,
        duration: 0.6,
      });
      //setTargetPOIPosition({ lat: point.lat, lng: point.lon });
      console.log(point.id);
    },
    [POIs]
  );

  //TODO : use this reference : https://wiki.openstreetmap.org/wiki/Key:wikimedia_commons to find a way to obtain images from wikimedia.
  return (
    <MarkerClusterGroup
      key={"marker-cluster-group"}
      chunkedLoading
      disableClusteringAtZoom={18}
      spiderfyOnMaxZoom={false}
      polygonOptions={{ stroke: false }}
      maxClusterRadius={110}
    >
      {POIs &&
        POIs.map((point, index) => (
          <MarkerComponent
            key={`${point.id}+${index}`}
            point={point}
            onMarkerClick={handleMarkerClick}
          />
        ))}
    </MarkerClusterGroup>
  );
}
