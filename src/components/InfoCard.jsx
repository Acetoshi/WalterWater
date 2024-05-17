const InfoCard = ({ pointOfInterest }) => {
  return (
    <div className="info-card">
      <h3>{pointOfInterest.tags.amenity}</h3>
      <div className="info-item">
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
      </div>
      <div className="info-item">
      <span
            className="icon-emplacement info-logo"
            aria-hidden="true"
          />
        <div className="info-text">
          <p>Distance:</p>
          <p>3.5 km</p>
        </div>
      </div>
      <div className="info-item">
      <span className="icon-slope info-logo" aria-hidden="true"/>
        <div className="info-text">
          <p>Dénivelé:</p>
          <p>500 D+</p>
        </div>
      </div>
      <div className="info-item">
      <span
            className="icon-time info-logo"
            aria-hidden="true"
          />
        <div className="info-text">
          <p>Temps estimé:</p>
          <p>40 minutes</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
