import { useCallback } from "react";
import CustomMarker from "./CustomMarker";
import { useMap } from "react-leaflet";
import usePOIs from "../Contexts/PointsOfInterest/usePOIs";
import MarkerClusterGroup from "react-leaflet-cluster";
import "../styles/leafletMarkerGroup.css";

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
          <CustomMarker
            key={`${point.id}+${index}`}
            point={point}
            onMarkerClick={handleMarkerClick}
          />
        ))}
    </MarkerClusterGroup>
  );
}
