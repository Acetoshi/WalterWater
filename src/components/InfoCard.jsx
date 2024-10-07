import { usePOIs } from "../Contexts/PointsOfInterestProvider";
import POIDetails from "./POIDetails";


export default function InfoCard({ point, setIsDisplayed }) {
  const { setTargetPOIPosition } = usePOIs();
  let temps = Math.round((point.distanceKm * 60) / 4);

  const handleClick=()=>{
    setIsDisplayed(false)
    setTargetPOIPosition({ lat: point.lat, lng: point.lon })
  }


  return (
    <article className="info-card">
      <POIDetails point={point}/>
      
      <button
        onClick={handleClick}
        aria-label="view on map"
        role="button"
      >
        view on map
      </button>
    </article>
  );
}
