import { usePOIs } from "../Contexts/PointsOfInterestProvider";
import POIDetails from "./POIDetails";

export default function InfoCard({ point, setIsDisplayed, style }) {
  const { setTargetPOIPosition } = usePOIs();

  const handleClick = () => {
    setIsDisplayed(false);
    setTargetPOIPosition({ lat: point.lat, lng: point.lon });
  };

  return (
    <li className="info-card" key={point.id} style={style}>
      <POIDetails point={point} />

      <button
        onClick={handleClick}
        aria-label="view on map"
        role="button"
        className="button-feedback"
      >
        view on map
      </button>
    </li>
  );
}
