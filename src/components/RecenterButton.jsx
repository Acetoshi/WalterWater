import { useMap } from "react-leaflet";
import { usePOIs } from "../hooks/usePOIs";
import { usePosition } from "../hooks/usePosition";
import "../styles/recenterButton.css";

export default function RecenterButton() {
  const { userLocation, mapPosition } = usePosition();
  const { fetchPOIs } = usePOIs();
  const map = useMap();

  const handleRecenter = () => {
    // needed otherwise the open popups would 'refocus" the map
    map.closePopup();
    map.flyTo(userLocation, 14, { duration: 1 });
    fetchPOIs("user");
  };

  return (
    <div id="recenter-button-container">
      <button
        id="recenter-button"
        type="button"
        className={
          mapPosition.distanceFromUser >= 0.05 ? "button-feedback" : ""
        }
        onClick={handleRecenter}
        disabled={mapPosition.distanceFromUser <= 0.05}
      >
        <img
          src={
            mapPosition.distanceFromUser >= 0.2
              ? "/icons/recenterWhiteEmpty.png"
              : "/icons/recenterWhiteFull.png"
          }
          alt="recenter the map on your position"
        ></img>
      </button>
    </div>
  );
}
