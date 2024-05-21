
const InfoCard = ({ pointOfInterest }) => {

  let temps=Math.round(pointOfInterest.distanceKm * 60 /4);

  return (
    <div className="info-card">
       
      <h3><span className="icon-walter-black info-logo" aria-hidden="true" />{pointOfInterest.tags.amenity}</h3>
      <div className="info-item">
        <span className="icon-emplacement info-logo" aria-hidden="true" />
        <div className="info-text">
          <p>
            {`Distance : ${pointOfInterest.distanceKm} km`}
          </p>
        </div>
      </div>
      <div className="info-item">
        <span className="icon-time info-logo" aria-hidden="true" />
        <div className="info-text">
          <p>{`Temps estimé : ${temps} mn à pied`}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
