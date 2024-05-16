const InfoCard = () => {
  return (
    <div className="info-card">
      <div className="info-item">
        <img src="src/public/robinet.jpg" alt="Adresse" className="info-logo" />
        <div className="info-text">
          <p>Adresse:</p>
          <p>7 rue Cappela - Nantes</p>
        </div>
      </div>
      <div className="info-item">
        <img src="src/public/loupe.jpg" alt="Distance" className="info-logo" />
        <div className="info-text">
          <p>Distance:</p>
          <p>3.5 km</p>
        </div>
      </div>
      <div className="info-item">
        <img src="src/public/un-i.jpg" alt="Dénivelé" className="info-logo" />
        <div className="info-text">
          <p>Dénivelé:</p>
          <p>500 D+</p>
        </div>
      </div>
      <div className="info-item">
        <img src="src/public/horloge.jpg" alt="Temps estimé" className="info-logo" />
        <div className="info-text">
          <p>Temps estimé:</p>
          <p>40 minutes</p>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
