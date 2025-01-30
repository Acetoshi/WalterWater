import usePOIs from '../../../Contexts/PointsOfInterest/usePOIs';
import POIDetails from '../POIDetails/POIDetails';

export default function InfoCard({ point, setIsDisplayed, style }) {
  const { setTargetPOIPosition } = usePOIs();

  const handleClick = () => {
    setIsDisplayed(false);
    setTargetPOIPosition({ lat: point.lat, lng: point.lon });
  };

  return (
    <li className="info-card-container" key={point.id} style={style}>
      <article className="info-card">
        <POIDetails point={point} />

        <button
          onClick={handleClick}
          aria-label="view on map"
          role="button"
          className="button-feedback"
        >
          view on map
        </button>
      </article>
    </li>
  );
}
