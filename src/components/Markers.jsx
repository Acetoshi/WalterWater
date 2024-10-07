import { useCallback } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { usePOIs } from "../Contexts/PointsOfInterestProvider";
import { faucetIcon, toiletIcon, foodIcon } from "../scripts/icons";
import MarkerClusterGroup from "react-leaflet-cluster";
import POIDetails from "./POIDetails";
import "../styles/leafletPopup.css";
import "../styles/leafletMarkerGroup.css";

export default function Markers() {
  const { POIs, } = usePOIs();
  const map = useMap();

  const iconMap = {
    drinking_water: faucetIcon,
    toilets: toiletIcon,
    restaurant: foodIcon,
  };

  // useCallBack needed because of marker clusters
  const handleMarkerClick = useCallback(
    (point) => {
      const zoom = map.getZoom();
      // map.flyTo([point.lat, point.lon], zoom, {
      //   easeLinearity: 0.1,
      //   duration: 0.6,
      // });
      setTargetPOIPosition({ lat: point.lat, lng: point.lon });
      console.log("cuplrit triggered");
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
        POIs.map((point) => (
          <Marker
            key={point.id}
            position={[point.lat, point.lon]}
            icon={iconMap[point.tags.amenity]}
            autoPanOnFocus={false}
            eventHandlers={{
              click: (e) => handleMarkerClick(point),
            }}
          >
            <Popup keepInView={false}>
              <POIDetails point={point} />
            </Popup>
          </Marker>
        ))}
    </MarkerClusterGroup>
  );
}
