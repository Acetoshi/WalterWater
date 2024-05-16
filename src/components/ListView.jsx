// import Logo from "./assets/demo-files/fonts/icomoon.svg";

const ListView = ({ data }) => {
  console.log(data);
  return (
    <div className="list-view">
      {data.map((item, index) => (
        <div key={index} className="info-card">
          <div className="info-item">
            <img
              src="src/public/robinet.jpg"
              alt="Adresse"
              className="info-logo"
            />
            <div className="info-text">
              <p>Adresse:</p>
              <p>{item.adresse}</p>
            </div>
          </div>
          <div className="info-item">
            <img
              src="src/public/loupe.jpg"
              alt="Distance"
              className="info-logo"
            />
            <div className="info-text">
              <p>Distance:</p>
              <p>{item.distance}</p>
            </div>
          </div>
          <div className="info-item">
            <img
              src="src/public/un-i.jpg"
              alt="Dénivelé"
              className="info-logo"
            />
            <div className="info-text">
              <p>Dénivelé:</p>
              <p>{item.denivele}</p>
            </div>
          </div>
          <div className="info-item">
            <img
              src="src/public/horloge.jpg"
              alt="Temps estimé"
              className="info-logo"
            />
            <div className="info-text">
              <p>Temps estimé:</p>
              <p>{item.temps_estime}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListView;
