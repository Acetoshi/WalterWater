import { useCallback } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { usePosition } from "../Contexts/PositionProvider";
import { faucetIcon, toiletIcon, foodIcon } from "../scripts/icons";
import MarkerClusterGroup from "react-leaflet-cluster";
import POIDetails from "./POIDetails";
import "../styles/leafletPopup.css";
import "../styles/leafletMarkerGroup.css";

export default function Markers({ typeOfAmenity }) {
  const { nearbyPOIs, areaPOIs } = usePosition();
  const map = useMap();

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

  const handleMarkerClick = useCallback((point) => {
    map.flyTo([point.lat, point.lon], map.getZoom(), {
      easeLinearity: 0.001,
      duration: 0.8,
    });
  }, []);

  //TODO : use this reference : https://wiki.openstreetmap.org/wiki/Key:wikimedia_commons to find a way to obtain images from wikimedia.
  return (
    <MarkerClusterGroup
    key={'marker-cluster-group'}
      chunkedLoading
      disableClusteringAtZoom={18}
      spiderfyOnMaxZoom={false}
      polygonOptions={{ stroke: false }}
      maxClusterRadius={110}
    >
      {points &&
        points.map((point) => (
          <Marker
            key={point.id}
            position={[point.lat, point.lon]}
            icon={icon}
            autoPanOnFocus={false}
            eventHandlers={{
              click: (e) => handleMarkerClick(point),
            }}
          >
            {/* // TODO : faire un composant à partir du popup pour mettre les
            données des toilettes en forme. */}
            <Popup>
              <POIDetails point={point} />
            </Popup>
          </Marker>
        ))}
    </MarkerClusterGroup>
  );
}
