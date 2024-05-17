import { getDistanceFromLatLonInKm } from "../scripts/osmUtilities.js";
import { usePosition } from "../Contexts/PositionProvider.jsx";

const InfoCard = ({ pointOfInterest }) => {
  const { userLocation } = usePosition();

  let distance = getDistanceFromLatLonInKm(
    userLocation[0],
    userLocation[1],
    pointOfInterest.lat,
    pointOfInterest.lon
  )

  let temps=Math.round(distance * 60 /4);

  return (
    <div className="info-card">
      <h3>{pointOfInterest.tags.amenity}</h3>
      {/* <div className="info-item">
        {pointOfInterest.tags.amenity === "toilets" && (
          <span
            className="icon-etape-importante info-logo"
            aria-hidden="true"
          />
        )}
        <div className="info-text">
          <p>Adresse:</p>
          <p>7 rue Cappela - Nantes</p>
        </div>
      </div> */}
      <div className="info-item">
        <span className="icon-emplacement info-logo" aria-hidden="true" />
        <div className="info-text">
          <p>Distance :</p>
          <p>
            {distance.toString().slice(0, 4)+" km"}
          </p>
        </div>
      </div>
      {/* <div className="info-item">
        <span className="icon-slope info-logo" aria-hidden="true" />
        <div className="info-text">
          <p>Dénivelé:</p>
          <p>500 D+</p>
        </div>
      </div> */}
      <div className="info-item">
        <span className="icon-time info-logo" aria-hidden="true" />
        <div className="info-text">
          <p>Temps estimé:</p>
          <p>{`${temps} mn`}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
