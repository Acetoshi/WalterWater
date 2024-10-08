import { useMap } from "react-leaflet";
import { usePosition } from "../Contexts/PositionProvider";
import { getDistanceFromLatLonInKm } from "../scripts/osmUtilities";
import { useEffect } from "react";

// This component enables the app to track the center of the map, ie to know where the user is looking.
export default function MapTracker({ setMapSelecter }) {
  const map = useMap();
  const { userLocation, setMapPosition } = usePosition();

  useEffect(() => {
    // This is needed to let the user move the map as he/she wishes wthout the open pop-ups anchoring the view
    const handleDragStart = () => {
      map.closePopup();
    };
    map.on("dragstart", handleDragStart);

    // This is needed to close the MapProviderSelecter menu when the map moves
    const handleMoveStart = () => {
      setMapSelecter((mapSelecter) => {
        return { ...mapSelecter, isOpen: false };
      });
    };
    map.on("movestart", handleMoveStart);

    const handleMoveEnd = () => {
      // Track the current map bounds in order to use them as a bounding box for POI search later on
      const bounds = map.getBounds();
      const center = map.getCenter();
      const distance = getDistanceFromLatLonInKm(
        userLocation.lat,
        userLocation.lng,
        center.lat,
        center.lng
      );
      setMapPosition(()=>{return{
        bounds: {
          minLat: bounds._southWest.lat,
          maxLat: bounds._northEast.lat,
          minLng: bounds._southWest.lng,
          maxLng: bounds._northEast.lng,
        },
        center: {
          lat: center.lat,
          lng: center.lng,
        },
        distanceFromUser: distance,
      }});
    }

      map.on("moveend", handleMoveEnd);

      return () => {
        map.off("dragstart", handleDragStart);
        map.off("moveend", handleMoveEnd);
        map.off("movestart", handleMoveStart);
      };
  }, []);

  return null;
}
